import { Fragment, useEffect, useRef, useState, type FormEvent } from 'react';
import { Bot, Check, ExternalLink, FileSearch, FileText, Lock, PenLine, Send, ShieldCheck } from 'lucide-react';

/** Demo real del PDF Technical Assistant (el producto en el que se basa esta simulación). */
const REAL_DEMO_URL = 'https://pdf-tech-assistant2.vercel.app/demo';

const DOCS = [
  { name: 'Manual inversor X200.pdf', pages: 64 },
  { name: 'Guía de mantenimiento.pdf', pages: 18 },
  { name: 'Ficha técnica X200.pdf', pages: 4 },
];

interface Tool {
  call: string;
  result: string;
}

interface Answer {
  id: string;
  question: string;
  keywords: string[];
  tools: Tool[];
  text: string;
  cites: string[];
  /** La respuesta es un borrador que una persona tiene que aprobar. */
  needsApproval?: boolean;
  noEvidence?: boolean;
}

const ANSWERS: Answer[] = [
  {
    id: 'corriente',
    question: '¿Cuál es la corriente máxima de entrada?',
    keywords: ['corriente', 'amperio', 'entrada', 'intensidad', 'mppt'],
    tools: [{ call: 'buscar_documentos("corriente máxima de entrada")', result: '2 fragmentos · Ficha técnica, Manual' }],
    text: 'La corriente máxima de entrada del X200 es de 13 A por cada MPPT, con una corriente de cortocircuito de hasta 16 A. Tiene dos MPPT, así que admite dos strings independientes.',
    cites: ['Ficha técnica X200 · p. 2', 'Manual X200 · p. 14, tabla 3'],
  },
  {
    id: 'e07',
    question: '¿Qué hago si aparece el error E07?',
    keywords: ['e07', 'error', 'fallo', 'alarma', 'aislamiento'],
    tools: [{ call: 'buscar_documentos("código de error E07")', result: '3 fragmentos · Manual, Guía de mantenimiento' }],
    text: 'E07 indica aislamiento bajo en el lado de continua (menos de 1 MΩ a tierra). Pasos: 1) abre el seccionador DC; 2) mide el aislamiento de cada string; 3) revisa los conectores MC4 por humedad. Si el error sigue, no rearmes el equipo y avisa a soporte.',
    cites: ['Manual X200 · p. 41', 'Guía de mantenimiento · p. 7'],
  },
  {
    id: 'precio',
    question: '¿Cuánto cuesta el inversor?',
    keywords: ['precio', 'cuesta', 'coste', 'costo', 'vale', 'tarifa', 'euros'],
    tools: [{ call: 'buscar_documentos("precio tarifa X200")', result: '0 fragmentos relevantes' }],
    text: 'No encuentro el precio en los documentos de la empresa. Prefiero decírtelo a inventármelo: consulta la tarifa vigente con el equipo comercial.',
    cites: [],
    noEvidence: true,
  },
  {
    id: 'borrador',
    question: 'Redacta una respuesta a un cliente con el error E07',
    keywords: ['redacta', 'responde', 'cliente', 'correo', 'email', 'borrador'],
    tools: [
      { call: 'buscar_documentos("error E07 solución")', result: '3 fragmentos · Manual, Guía' },
      { call: 'redactar_borrador(tono="cliente")', result: 'Borrador listo para revisión' },
    ],
    text: 'Hola, Marta: el aviso E07 de tu inversor indica un problema de aislamiento en los paneles, normalmente por humedad en algún conector. Por seguridad, no lo reinicies. Un técnico pasará a revisarlo esta semana; te llamamos para concretar la hora. Un saludo.',
    cites: ['Manual X200 · p. 41'],
    needsApproval: true,
  },
];

type AgentMsg = {
  role: 'agent';
  answer: Answer | null;
  toolsShown: number;
  shown: string;
  status: 'thinking' | 'streaming' | 'done';
  approval?: 'pending' | 'approved';
};
type Msg = { role: 'user'; text: string } | AgentMsg;

const FALLBACK =
  'En esta demo respondo solo a las preguntas sugeridas. La versión real responde sobre los PDF de tu empresa, con cualquier pregunta.';

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function match(text: string): Answer | null {
  const q = text.toLowerCase();
  // El borrador va primero: "redacta ... E07" también contiene las palabras de la pregunta del error.
  const ordered = [ANSWERS[3], ...ANSWERS.slice(0, 3)];
  return ordered.find((a) => a.keywords.some((k) => q.includes(k))) ?? null;
}

export function AgentDemo() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const token = useRef(0);

  useEffect(() => () => void token.current++, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const updateLast = (fn: (m: AgentMsg) => AgentMsg) =>
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (!last || last.role !== 'agent') return prev;
      return [...prev.slice(0, -1), fn(last)];
    });

  const ask = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    const my = ++token.current;
    const alive = () => token.current === my;
    const answer = match(question);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setBusy(true);
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: question }, { role: 'agent', answer, toolsShown: 0, shown: '', status: 'thinking' }]);

    for (let i = 0; i < (answer?.tools.length ?? 0); i++) {
      await sleep(reduce ? 150 : 900);
      if (!alive()) return;
      updateLast((m) => ({ ...m, toolsShown: i + 1 }));
    }
    await sleep(reduce ? 100 : 500);
    if (!alive()) return;

    const full = answer?.text ?? FALLBACK;
    if (reduce) {
      updateLast((m) => ({ ...m, shown: full }));
    } else {
      updateLast((m) => ({ ...m, status: 'streaming' }));
      for (let n = 0; n < full.length; n += 3) {
        await sleep(14);
        if (!alive()) return;
        updateLast((m) => ({ ...m, shown: full.slice(0, n + 3) }));
      }
    }
    updateLast((m) => ({ ...m, shown: full, status: 'done', approval: answer?.needsApproval ? 'pending' : undefined }));
    setBusy(false);
  };

  const approveAt = (index: number) =>
    setMessages((prev) => prev.map((m, i) => (i === index && m.role === 'agent' ? { ...m, approval: 'approved' } : m)));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  const asked = new Set(messages.filter((m) => m.role === 'user').map((m) => (m as { text: string }).text));
  const suggestions = ANSWERS.filter((a) => !asked.has(a.question));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden ring-1 ring-steel/40 bg-card">
      {/* Documentos de la empresa */}
      <aside className="lg:col-span-4 bg-ink text-white p-5 sm:p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg bg-copper/20 text-copper flex items-center justify-center">
            <Bot className="w-5 h-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold">Asistente técnico</p>
            <p className="text-xs text-steel">Empresa demo · Solar Norte</p>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-wide text-steel mb-2">DOCUMENTOS INDEXADOS</p>
          <ul className="space-y-1.5 list-none p-0 m-0">
            {DOCS.map((d) => (
              <li key={d.name} className="flex items-center gap-2 text-xs text-snow/85 bg-slate/40 rounded-md px-2.5 py-2">
                <FileText className="w-3.5 h-3.5 text-copper shrink-0" aria-hidden="true" />
                <span className="truncate flex-1">{d.name}</span>
                <span className="text-steel shrink-0">{d.pages} p.</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="space-y-2 text-xs text-snow/80 list-none p-0 m-0 mt-auto">
          <li className="flex gap-2">
            <ShieldCheck className="w-4 h-4 text-copper shrink-0" aria-hidden="true" /> Responde solo con lo que encuentra en los documentos
          </li>
          <li className="flex gap-2">
            <Lock className="w-4 h-4 text-copper shrink-0" aria-hidden="true" /> Cada empresa ve solo sus PDF
          </li>
          <li className="flex gap-2">
            <PenLine className="w-4 h-4 text-copper shrink-0" aria-hidden="true" /> Lo que llega al cliente lo aprueba una persona
          </li>
        </ul>
      </aside>

      {/* Chat */}
      <div className="lg:col-span-8 flex flex-col min-w-0">
        <div ref={scrollRef} className="h-[24rem] overflow-y-auto p-4 sm:p-5 space-y-4" aria-live="polite">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <span className="w-12 h-12 rounded-full bg-copper/10 text-copper flex items-center justify-center mb-3">
                <FileSearch className="w-6 h-6" aria-hidden="true" />
              </span>
              <p className="card-title text-navy">Pregúntale a la documentación</p>
              <p className="card-text text-mid-gray max-w-sm mt-1">Elige una pregunta. Verás cómo busca en los PDF, cita la página y admite cuando no sabe algo.</p>
            </div>
          )}

          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[85%] bg-copper text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5">{m.text}</p>
              </div>
            ) : (
              <Fragment key={i}>
                <AgentBubble msg={m} onApprove={() => approveAt(i)} />
              </Fragment>
            ),
          )}
        </div>

        <div className="border-t border-steel/30 p-3 sm:p-4 space-y-3">
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  disabled={busy}
                  onClick={() => ask(a.question)}
                  className="text-xs text-left font-medium px-3 py-1.5 rounded-full border border-steel/60 text-slate hover:border-copper hover:text-copper transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                >
                  {a.question}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={onSubmit} className="flex gap-2">
            <label htmlFor="lab-agent-input" className="sr-only">
              Escribe tu pregunta
            </label>
            <input
              id="lab-agent-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe una pregunta sobre el inversor…"
              autoComplete="off"
              maxLength={200}
              className="flex-1 min-w-0 text-sm bg-near-white text-navy placeholder:text-mid-gray rounded-lg px-3.5 py-2.5 border border-steel/50 focus:outline-none focus:ring-2 focus:ring-copper"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Enviar pregunta"
              className="shrink-0 w-11 rounded-lg bg-copper text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
          <p className="text-[11px] text-mid-gray">
            Demo simulada: no se envía nada a ningún servidor.{' '}
            <a href={REAL_DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-copper font-medium hover:underline inline-flex items-center gap-0.5">
              Probar el producto real
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function AgentBubble({ msg, onApprove }: { msg: AgentMsg; onApprove: () => void }) {
  const a = msg.answer;
  return (
    <div className="flex gap-2.5 max-w-[92%]">
      <span className="w-7 h-7 rounded-full bg-ink text-copper flex items-center justify-center shrink-0 mt-0.5">
        <Bot className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        {/* Herramientas que usa el agente */}
        {a?.tools.slice(0, msg.toolsShown).map((t) => (
          <div key={t.call} className="font-mono text-[11px] rounded-md bg-near-white border border-steel/40 px-2.5 py-1.5 text-mid-gray">
            <span className="text-copper">→</span> {t.call}
            <span className="block text-navy/85">
              <Check className="w-3 h-3 inline -mt-0.5 text-copper" aria-hidden="true" /> {t.result}
            </span>
          </div>
        ))}

        {msg.status === 'thinking' && (
          <div className="flex items-center gap-1 px-3 py-2.5 rounded-2xl bg-near-white w-fit" aria-label="El agente está pensando">
            {[0, 150, 300].map((d) => (
              <span key={d} className="w-1.5 h-1.5 rounded-full bg-mid-gray animate-bounce" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        )}

        {msg.shown && (
          <div
            className={`text-sm leading-relaxed rounded-2xl rounded-tl-sm px-4 py-3 ${
              msg.approval ? 'bg-card border-2 border-dashed border-copper/60 text-navy' : 'bg-near-white text-navy'
            }`}
          >
            {msg.approval && <p className="text-[11px] font-bold text-copper mb-1.5">BORRADOR · NO ENVIADO</p>}
            <span className={msg.status === 'streaming' ? 'lab-caret' : ''}>{msg.shown}</span>
            {!a && msg.status === 'done' && (
              <a href={REAL_DEMO_URL} target="_blank" rel="noopener noreferrer" className="block mt-2 text-copper font-medium hover:underline">
                Probar la demo real →
              </a>
            )}
          </div>
        )}

        {msg.status === 'done' && a && (
          <div className="flex flex-wrap gap-1.5">
            {a.noEvidence && <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-steel/25 text-slate">Sin evidencia en los documentos</span>}
            {a.cites.map((c) => (
              <span key={c} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-copper/10 text-copper inline-flex items-center gap-1">
                <FileText className="w-3 h-3" aria-hidden="true" /> {c}
              </span>
            ))}
          </div>
        )}

        {msg.approval === 'pending' && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-1.5 bg-copper hover:opacity-90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" aria-hidden="true" /> Aprobar y enviar
            </button>
            <span className="text-[11px] text-mid-gray">La IA no envía nada por su cuenta.</span>
          </div>
        )}
        {msg.approval === 'approved' && (
          <p className="text-xs font-semibold text-copper inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Enviado a Marta tras revisión humana
          </p>
        )}
      </div>
    </div>
  );
}
