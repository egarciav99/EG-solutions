import { useState, useEffect, useRef } from 'react';
import { CASE_STUDIES } from '../data/projects';
import { ProjectCase } from '../types';
import { ExternalLink, X } from 'lucide-react';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

/** Enlace a la web en producción de un caso (solo si es pública). */
function LiveLink({ url, className = '' }: { url?: string; className?: string }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm font-medium text-copper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded ${className}`}
    >
      Ver en vivo
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="sr-only">(se abre en otra pestaña)</span>
    </a>
  );
}

/** Estado del proyecto ("Producto propio · En uso real"…). */
function StatusBadge({ label, strong = false }: { label: string; strong?: boolean }) {
  return (
    <span
      className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${
        strong ? 'bg-navy text-white' : 'bg-copper/10 text-copper'
      }`}
    >
      {label}
    </span>
  );
}

interface CaseStudiesProps {
  onSelectProjectForDiscussion: (projectName: string) => void;
}

export function CaseStudies({ onSelectProjectForDiscussion }: CaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const mainCases = CASE_STUDIES.filter((c) => c.id !== featured.id && c.scaleType !== 'internal-tool');
  const internalTools = CASE_STUDIES.filter((c) => c.id !== featured.id && c.scaleType === 'internal-tool');

  // Manejo accesible del modal: tecla Escape, retorno de foco y bloqueo de scroll
  useEffect(() => {
    if (!selectedCase) return;

    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    modalCloseButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCase(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      lastActiveElementRef.current?.focus();
    };
  }, [selectedCase]);

  return (
    <section className="relative py-20 sm:py-24 bg-near-white overflow-hidden" id="proyectos">
      <CircuitBackground layout={secondaryCircuitLayout} flip={false} opacity={0.08} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">Proyectos</h1>
          <p className="text-lg text-mid-gray leading-relaxed">
            Productos propios y trabajos para clientes, cada uno con su estado real. Abre cualquier caso para ver cómo está construido.
          </p>
        </div>

        {/* Caso destacado */}
        <article className="mb-8 bg-white rounded-xl shadow-xs ring-1 ring-steel/40 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col">
              <StatusBadge label={featured.scaleLabel} strong />
              <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-4 mb-4">{featured.name}</h2>
              <p className="text-lg text-mid-gray leading-relaxed mb-8">{featured.summary}</p>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setSelectedCase(featured)}
                  className="bg-copper hover:opacity-90 text-white text-sm font-medium px-5 py-3 rounded-lg transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                  id={`inspect-case-${featured.id}`}
                >
                  Ver el caso
                </button>
                <LiveLink url={featured.liveUrl} />
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy text-white p-7 sm:p-10">
              <div className="text-xs font-semibold text-steel tracking-wide mb-5">
                {featured.specPanel?.title ?? 'CÓMO FUNCIONA'}
              </div>
              <ol className="space-y-5 list-none p-0 m-0">
                {(featured.specPanel?.items ?? featured.architecturePoints.map((text) => ({ title: '', text }))).map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-copper/20 text-copper text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="text-sm leading-relaxed">
                      {item.title && <div className="font-semibold text-white">{item.title.replace(/:$/, '')}</div>}
                      <div className="text-near-white/75">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </article>

        {/* Productos y clientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {mainCases.map((project) => (
            <article key={project.id} className="bg-white rounded-xl p-7 shadow-xs ring-1 ring-steel/40 flex flex-col">
              <StatusBadge label={project.scaleLabel} />
              <h2 className="text-xl font-bold text-navy mt-4 mb-3">{project.name}</h2>
              <p className="text-base text-mid-gray leading-relaxed mb-5">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-md bg-near-white text-slate">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-5">
                <button
                  onClick={() => setSelectedCase(project)}
                  className="text-sm font-medium text-navy border border-slate/60 hover:border-navy px-4 py-2 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id={`inspect-case-${project.id}`}
                >
                  Ver el caso
                </button>
                <LiveLink url={project.liveUrl} />
              </div>
            </article>
          ))}
        </div>

        {/* Automatizaciones propias: fila compacta */}
        {internalTools.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">Automatizaciones propias</h2>
            <p className="text-base text-mid-gray mb-6">Las uso a diario en EG Solutions; también se pueden adaptar a tu empresa.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internalTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedCase(tool)}
                  className="text-left bg-white/70 hover:bg-white rounded-xl p-5 ring-1 ring-steel/30 hover:ring-slate/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id={`inspect-case-${tool.id}`}
                >
                  <span className="block text-base font-semibold text-navy mb-1">{tool.name}</span>
                  <span className="block text-sm text-mid-gray leading-relaxed">{tool.summary}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal accesible de inspección técnica */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCase(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
        >
          <div className="bg-white rounded-lg border border-steel/60 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-md relative">
            <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-steel/30">
              <div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-near-white border border-steel/40 text-slate inline-block mb-1.5">
                  {selectedCase.scaleLabel}
                </span>
                <h3 id="case-modal-title" className="text-xl sm:text-2xl font-bold text-navy">
                  {selectedCase.name}
                </h3>
                <p className="text-sm text-mid-gray mt-2">{selectedCase.clientContext}</p>
              </div>
              <button
                ref={modalCloseButtonRef}
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded text-mid-gray hover:text-navy hover:bg-near-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                aria-label="Cerrar ventana de detalles"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-navy">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-2">
                  El reto técnico
                </h4>
                <p className="bg-near-white p-4 rounded border border-steel/40 leading-relaxed text-xs sm:text-sm">
                  {selectedCase.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-2">
                  La solución implementada
                </h4>
                <p className="bg-near-white p-4 rounded border border-steel/40 leading-relaxed text-xs sm:text-sm">
                  {selectedCase.solution}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-2">
                  Puntos clave de arquitectura
                </h4>
                <ul className="space-y-2">
                  {selectedCase.architecturePoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="mt-1 w-3 h-3 rounded-full bg-slate text-white flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-2">
                  Stack tecnológico
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCase.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded bg-near-white text-slate border border-steel/50 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-steel/40 flex flex-wrap items-center justify-end gap-3">
              <LiveLink url={selectedCase.liveUrl} className="mr-auto" />
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 text-xs font-medium text-mid-gray hover:text-navy transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const name = selectedCase.name;
                  setSelectedCase(null);
                  onSelectProjectForDiscussion(name);
                }}
                className="bg-copper hover:opacity-90 text-white text-xs font-medium px-4 py-2 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
              >
                Consultar proyecto con esta arquitectura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
