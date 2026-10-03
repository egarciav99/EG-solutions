import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
  CalendarClock,
  Check,
  Database,
  FileSpreadsheet,
  FileText,
  LoaderCircle,
  Mail,
  Play,
  RotateCcw,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Webhook,
  X,
} from 'lucide-react';

type NodeState = 'idle' | 'running' | 'waiting' | 'done' | 'rejected';
type Tone = 'info' | 'ok' | 'warn' | 'muted';

interface FlowNode {
  id: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  detail: string;
  /** Líneas que escribe en el registro al ejecutarse. */
  log: string[];
  ms: number;
  /** Paso que espera a que una persona apruebe. */
  human?: boolean;
}

interface Scenario {
  id: 'factura' | 'lead' | 'linkedin';
  label: string;
  project: string;
  intro: string;
  /** Minutos que lleva hacerlo a mano, para la comparación final. */
  manualMinutes: number;
  nodes: FlowNode[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'factura',
    label: 'Factura PDF a Excel',
    project: 'CoreIT · Hub de automatizaciones',
    intro: 'Llega una factura por correo y sus datos acaban en tu Excel, sin teclear nada.',
    manualMinutes: 12,
    nodes: [
      { id: 'mail', icon: Mail, title: 'Correo', detail: 'factura_0423.pdf', ms: 700, log: ['Nuevo correo de facturacion@electricanorte.es', 'Adjunto detectado: factura_0423.pdf (2 páginas)'] },
      { id: 'pdf', icon: FileText, title: 'Leer PDF', detail: 'Texto y tablas', ms: 900, log: ['Texto extraído: 1.842 caracteres', 'Tabla de conceptos: 4 líneas'] },
      { id: 'ai', icon: Sparkles, title: 'IA extrae', detail: 'Gemini · JSON', ms: 1400, log: ['Campos: proveedor, NIF, fecha, base, IVA, total', 'Confianza media: 0,97'] },
      { id: 'rules', icon: ShieldCheck, title: 'Validar', detail: 'Reglas de negocio', ms: 800, log: ['Base 1.240,00 € + IVA 21 % = 1.500,40 € ✓', 'NIF con formato válido ✓'] },
      { id: 'excel', icon: FileSpreadsheet, title: 'Excel', detail: 'Fila nueva', ms: 700, log: ['Fila añadida en Facturas_2026.xlsx'] },
    ],
  },
  {
    id: 'lead',
    label: 'Nuevo cliente desde la web',
    project: 'El formulario de esta misma web',
    intro: 'Es el flujo real que procesa el formulario de contacto de esta página.',
    manualMinutes: 15,
    nodes: [
      { id: 'form', icon: Webhook, title: 'Formulario', detail: 'POST /api/lead', ms: 600, log: ['Solicitud de Laura M. · Automatizaciones'] },
      { id: 'bots', icon: ShieldCheck, title: 'Antibots', detail: 'Honeypot', ms: 500, log: ['Campo trampa vacío: es una persona ✓'] },
      { id: 'ai', icon: Sparkles, title: 'IA clasifica', detail: 'Urgencia y resumen', ms: 1400, log: ['Urgencia: alta', 'Resumen: "Quiere pasar albaranes en PDF a su ERP"'] },
      { id: 'db', icon: Database, title: 'Guardar', detail: 'Firestore', ms: 700, log: ['Lead guardado con estado "pendiente"'] },
      { id: 'mails', icon: Send, title: 'Avisos', detail: 'Correo x2', ms: 900, log: ['Aviso interno enviado a Elier', 'Confirmación enviada a Laura'] },
    ],
  },
  {
    id: 'linkedin',
    label: 'Post con aprobación humana',
    project: 'Publicación en LinkedIn con aprobación',
    intro: 'La IA redacta, pero nada se publica hasta que una persona lo aprueba. Ahora esa persona eres tú.',
    manualMinutes: 40,
    nodes: [
      { id: 'cron', icon: CalendarClock, title: 'Lunes 9:00', detail: 'Programado', ms: 600, log: ['Disparador semanal activado'] },
      { id: 'ai', icon: Sparkles, title: 'IA redacta', detail: 'Borrador', ms: 1600, log: ['Tema elegido: automatizar facturas', 'Borrador de 612 caracteres listo'] },
      { id: 'human', icon: UserCheck, title: 'Revisión', detail: 'Tú decides', ms: 0, human: true, log: ['Esperando aprobación humana…'] },
      { id: 'post', icon: Share2, title: 'Publicar', detail: 'LinkedIn API', ms: 900, log: ['Publicado en el perfil de EG Solutions'] },
      { id: 'sheet', icon: FileSpreadsheet, title: 'Registro', detail: 'Google Sheets', ms: 600, log: ['Fila añadida en Historial de publicaciones'] },
    ],
  },
];

interface LogLine {
  t: number;
  text: string;
  tone: Tone;
}

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const fmtSeconds = (ms: number) => (ms / 1000).toFixed(1).replace('.', ',');

export function AutomationDemo() {
  const [scenarioId, setScenarioId] = useState<Scenario['id']>('factura');
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const [states, setStates] = useState<NodeState[]>(() => scenario.nodes.map(() => 'idle'));
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'rejected'>('idle');
  const [elapsed, setElapsed] = useState(0);

  const runToken = useRef(0);
  const approvalRef = useRef<((ok: boolean) => void) | null>(null);
  const logRef = useRef<HTMLOListElement>(null);

  const reset = (s: Scenario = scenario) => {
    runToken.current++;
    approvalRef.current = null;
    setStates(s.nodes.map(() => 'idle'));
    setLogs([]);
    setStatus('idle');
    setElapsed(0);
  };

  useEffect(() => () => void runToken.current++, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [logs]);

  const run = async () => {
    reset();
    const token = runToken.current;
    const start = performance.now();
    // El tiempo que la persona tarda en decidir no cuenta como tiempo de la automatización.
    let waited = 0;
    const alive = () => runToken.current === token;
    const log = (text: string, tone: Tone = 'info') =>
      setLogs((prev) => [...prev, { t: performance.now() - start, text, tone }]);
    const setNode = (i: number, st: NodeState) => setStates((prev) => prev.map((p, idx) => (idx === i ? st : p)));

    setStatus('running');
    log(`▶ Ejecutando "${scenario.label}"`, 'muted');

    for (let i = 0; i < scenario.nodes.length; i++) {
      const node = scenario.nodes[i];
      if (node.human) {
        setNode(i, 'waiting');
        log(node.log[0], 'warn');
        const waitStart = performance.now();
        const approved = await new Promise<boolean>((resolve) => (approvalRef.current = resolve));
        approvalRef.current = null;
        waited += performance.now() - waitStart;
        if (!alive()) return;
        if (!approved) {
          setNode(i, 'rejected');
          log('✗ Rechazado: el borrador se descarta y no se publica nada', 'warn');
          setElapsed(performance.now() - start - waited);
          setStatus('rejected');
          return;
        }
        log('✓ Aprobado por una persona', 'ok');
        setNode(i, 'done');
        continue;
      }

      setNode(i, 'running');
      await sleep(node.ms * 0.4);
      if (!alive()) return;
      log(`${node.title}: ${node.log[0]}`);
      for (const line of node.log.slice(1)) {
        await sleep(node.ms * 0.3);
        if (!alive()) return;
        log(`${node.title}: ${line}`);
      }
      await sleep(node.ms * 0.3);
      if (!alive()) return;
      setNode(i, 'done');
    }

    const total = performance.now() - start - waited;
    log(`■ Completado en ${fmtSeconds(total)} s${waited ? ' (sin contar la revisión)' : ''}`, 'ok');
    setElapsed(total);
    setStatus('done');
  };

  const selectScenario = (s: Scenario) => {
    setScenarioId(s.id);
    reset(s);
  };

  const waitingIdx = states.indexOf('waiting');
  const doneCount = states.filter((st) => st === 'done').length;

  return (
    <div className="flex flex-col gap-5">
      {/* Selector de escenario */}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Escenario de automatización">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={s.id === scenarioId}
            onClick={() => selectScenario(s)}
            className={`text-sm font-medium px-3.5 py-2 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer ${
              s.id === scenarioId ? 'bg-copper border-copper text-white' : 'border-steel/60 text-slate hover:border-slate bg-card'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Lienzo del flujo */}
        <div className="xl:col-span-8 relative rounded-xl bg-ink text-white p-5 sm:p-6 overflow-hidden ring-1 ring-slate">
          <div className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(var(--color-steel)_1px,transparent_1px),linear-gradient(90deg,var(--color-steel)_1px,transparent_1px)] bg-[size:20px_20px]" aria-hidden="true" />

          <div className="relative flex flex-wrap items-start justify-between gap-3 mb-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-steel">FLUJO · {scenario.project.toUpperCase()}</p>
              <p className="text-sm text-snow/80 mt-1 max-w-md">{scenario.intro}</p>
            </div>
            <button
              type="button"
              onClick={status === 'running' ? () => reset() : run}
              className={`shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer ${
                status === 'running' ? 'bg-slate text-white hover:bg-slate/80' : 'bg-copper text-white hover:opacity-90'
              }`}
              id={`lab-run-${scenario.id}`}
            >
              {status === 'running' ? (
                <>
                  <RotateCcw className="w-4 h-4" aria-hidden="true" /> Reiniciar
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" /> {status === 'idle' ? 'Ejecutar' : 'Ejecutar otra vez'}
                </>
              )}
            </button>
          </div>

          <ol className="relative flex flex-col md:flex-row md:items-stretch list-none p-0 m-0" aria-label="Pasos del flujo">
            {scenario.nodes.map((node, i) => {
              const st = states[i];
              const prevDone = i > 0 && states[i - 1] === 'done';
              const flowing = prevDone && (st === 'running' || st === 'waiting');
              const Icon = node.icon;
              return (
                <li key={node.id} className="flex flex-col md:flex-row md:items-center md:flex-1 min-w-0">
                  {i > 0 && <Connector active={flowing} passed={prevDone && st !== 'idle'} />}
                  <div
                    className={`relative flex md:flex-col items-center md:text-center gap-3 md:gap-2 rounded-lg border px-3 py-3 md:py-4 w-full md:w-auto md:flex-1 transition-all duration-300 ${
                      st === 'idle'
                        ? 'border-slate bg-ink/60 opacity-70'
                        : st === 'running' || st === 'waiting'
                          ? 'border-copper bg-slate/60 shadow-[0_0_0_4px_rgba(199,123,75,0.18)]'
                          : st === 'rejected'
                            ? 'border-steel/60 bg-slate/40'
                            : 'border-copper/60 bg-slate/40'
                    }`}
                    aria-current={st === 'running' || st === 'waiting' ? 'step' : undefined}
                  >
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        st === 'done' ? 'bg-copper text-white' : st === 'idle' ? 'bg-slate text-steel' : 'bg-copper/20 text-copper'
                      }`}
                    >
                      {st === 'running' ? (
                        <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : st === 'done' ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : st === 'rejected' ? (
                        <X className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-white">{node.title}</span>
                      <span className="block text-[11px] text-steel truncate">{node.detail}</span>
                    </span>
                    {node.human && <span className="md:absolute md:-top-2 md:right-2 ml-auto md:ml-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-copper text-white">HUMANO</span>}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Progreso del flujo */}
          {waitingIdx < 0 && (
            <div className="relative mt-6 rounded-lg border border-slate bg-ink/60 p-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-snow/90">
                  {status === 'idle'
                    ? 'Listo para ejecutar'
                    : status === 'running'
                      ? `Paso ${Math.min(doneCount + 1, scenario.nodes.length)} de ${scenario.nodes.length} · ${scenario.nodes[Math.min(doneCount, scenario.nodes.length - 1)].title}`
                      : status === 'done'
                        ? 'Flujo completado'
                        : 'Flujo detenido por revisión humana'}
                </span>
                <span className="text-steel tabular-nums">{Math.round((doneCount / scenario.nodes.length) * 100)} %</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate overflow-hidden">
                <div className="h-full bg-copper rounded-full transition-[width] duration-500" style={{ width: `${(doneCount / scenario.nodes.length) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Panel de aprobación humana */}
          <div aria-live="polite">
            {waitingIdx >= 0 && (
              <div className="relative mt-6 rounded-lg border border-copper bg-slate/60 p-4">
                <p className="text-xs font-semibold text-copper mb-2">BORRADOR PENDIENTE DE TU APROBACIÓN</p>
                <p className="text-sm text-snow/90 leading-relaxed mb-4">
                  "¿Cuántas horas al mes dedica tu equipo a pasar facturas a Excel? Con una automatización bien hecha, cero. Y con una persona revisando lo que la IA no tiene claro. Te cuento cómo lo monto…"
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => approvalRef.current?.(true)}
                    className="inline-flex items-center gap-1.5 bg-copper hover:opacity-90 text-white text-sm font-semibold px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                    id="lab-approve"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" /> Aprobar y publicar
                  </button>
                  <button
                    type="button"
                    onClick={() => approvalRef.current?.(false)}
                    className="inline-flex items-center gap-1.5 border border-steel/60 hover:border-white text-white text-sm font-medium px-4 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" /> Rechazar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Registro y resultado */}
        <div className="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 content-start min-w-0">
          <div className="rounded-xl bg-ink ring-1 ring-slate overflow-hidden flex flex-col">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate">
              <span className="w-2.5 h-2.5 rounded-full bg-slate" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate" />
              <span className="w-2.5 h-2.5 rounded-full bg-copper" />
              <span className="ml-2 text-[11px] text-steel font-mono">registro de ejecución</span>
            </div>
            <ol ref={logRef} className="h-44 xl:h-48 overflow-y-auto p-3 font-mono text-[11.5px] leading-relaxed list-none m-0 space-y-1" aria-live="polite">
              {logs.length === 0 && <li className="text-steel/80 lab-caret">Pulsa Ejecutar</li>}
              {logs.map((l, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-steel/60 shrink-0">{fmtSeconds(l.t).padStart(4, '0')}s</span>
                  <span className={l.tone === 'ok' ? 'text-copper' : l.tone === 'warn' ? 'text-[#E3A57E]' : l.tone === 'muted' ? 'text-steel' : 'text-snow/90'}>{l.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <ResultPanel scenario={scenario} status={status} elapsed={elapsed} />
        </div>
      </div>
    </div>
  );
}

/** Línea entre dos pasos; cuando el flujo pasa por ella, un pulso cobre la recorre. */
function Connector({ active, passed }: { active: boolean; passed: boolean }) {
  return (
    <span className="relative self-center md:self-auto shrink-0 w-px h-6 md:h-px md:w-auto md:min-w-3 md:flex-[0_0_1.25rem] lg:flex-[0_0_1.5rem]" aria-hidden="true">
      <span className={`absolute inset-0 transition-colors duration-300 ${passed ? 'bg-copper' : 'bg-slate'}`} />
      {active && (
        <>
          <span className="md:hidden absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-copper shadow-[0_0_8px_2px_rgba(199,123,75,0.7)] motion-reduce:hidden" style={{ animation: 'lab-flow-y 0.7s linear infinite' }} />
          <span className="hidden md:block absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-copper shadow-[0_0_8px_2px_rgba(199,123,75,0.7)] motion-reduce:hidden" style={{ animation: 'lab-flow-x 0.7s linear infinite' }} />
        </>
      )}
    </span>
  );
}

function ResultPanel({ scenario, status, elapsed }: { scenario: Scenario; status: string; elapsed: number }) {
  const finished = status === 'done' || status === 'rejected';
  return (
    <div className="rounded-xl bg-card ring-1 ring-steel/40 p-4 min-h-[11rem]">
      <p className="text-xs font-semibold text-mid-gray tracking-wide mb-3">RESULTADO</p>
      {!finished && <p className="card-text text-mid-gray">Aquí aparecerá lo que produce el flujo.</p>}

      {status === 'rejected' && (
        <p className="card-text text-navy">
          No se ha publicado nada. <span className="text-mid-gray">Así funciona la revisión humana: la IA propone, tú decides.</span>
        </p>
      )}

      {status === 'done' && scenario.id === 'factura' && (
        <div className="overflow-x-auto">
          <table className="w-full text-[11.5px] text-navy border-collapse">
            <thead>
              <tr className="text-mid-gray text-left">
                <th className="font-semibold py-1 pr-2">Proveedor</th>
                <th className="font-semibold py-1 pr-2 text-right">Base</th>
                <th className="font-semibold py-1 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-steel/30">
                <td className="py-1 pr-2">Suministros Iberia</td>
                <td className="py-1 pr-2 text-right">860,00 €</td>
                <td className="py-1 text-right">1.040,60 €</td>
              </tr>
              <tr className="border-t border-steel/30 bg-copper/10 font-semibold">
                <td className="py-1 pr-2">Eléctrica Norte S.L.</td>
                <td className="py-1 pr-2 text-right">1.240,00 €</td>
                <td className="py-1 text-right">1.500,40 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {status === 'done' && scenario.id === 'lead' && (
        <div className="rounded-lg border border-steel/40 p-3 card-meta text-navy">
          <p className="font-semibold">Nuevo lead · urgencia alta</p>
          <p className="text-mid-gray mt-1">Laura M. quiere pasar albaranes en PDF a su ERP. Responder antes de 24 h.</p>
        </div>
      )}

      {status === 'done' && scenario.id === 'linkedin' && (
        <div className="rounded-lg border border-steel/40 p-3 card-meta text-navy">
          <p className="font-semibold">EG Solutions · ahora</p>
          <p className="text-mid-gray mt-1 line-clamp-2">¿Cuántas horas al mes dedica tu equipo a pasar facturas a Excel?…</p>
          <p className="mt-2 text-copper font-semibold">Publicado ✓</p>
        </div>
      )}

      {status === 'done' && (
        <p className="mt-4 pt-3 border-t border-steel/30 card-meta text-mid-gray">
          Automático: <strong className="text-navy">{fmtSeconds(elapsed)} s</strong> · A mano: <strong className="text-navy">~{scenario.manualMinutes} min</strong>
        </p>
      )}
    </div>
  );
}
