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
      className={`inline-flex items-center gap-1 text-xs font-medium text-copper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded ${className}`}
    >
      Ver en vivo
      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="sr-only">(se abre en otra pestaña)</span>
    </a>
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
  const otherCases = CASE_STUDIES.filter((c) => c.id !== featured.id);

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
    <section className="relative py-20 border-b border-steel/30 bg-near-white overflow-hidden" id="proyectos">
      {/* Fondo de circuito impreso decorativo sin invertir */}
      <CircuitBackground layout={secondaryCircuitLayout} flip={false} opacity={0.10} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-4">
            Productos, proyectos y propuestas técnicas
          </h2>
          <p className="text-base text-mid-gray leading-relaxed">
            Productos propios, automatizaciones en uso y proyectos para clientes, cada uno con su estado real: desde prototipos presentados hasta herramientas en producción.
          </p>
        </div>

        {/* 1. CASO PRINCIPAL DESTACADO */}
        <div className="mb-12 border-2 border-slate bg-white rounded-lg p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-navy text-white">
                  {featured.scaleLabel}
                </span>
                <span className="text-xs font-medium text-mid-gray">
                  {featured.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
                {featured.name}
              </h3>

              <div className="text-xs text-slate font-medium mb-4">
                {featured.clientContext} <LiveLink url={featured.liveUrl} className="ml-1" />
              </div>

              <p className="text-navy/90 text-base leading-relaxed mb-6">
                {featured.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {featured.keyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-navy">
                    <span className="mt-1 w-3.5 h-3.5 rounded-full bg-slate text-white flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-steel/40">
                <button
                  onClick={() => setSelectedCase(featured)}
                  className="bg-copper hover:opacity-90 text-white text-sm font-medium px-4 py-2.5 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                  id={`inspect-case-${featured.id}`}
                >
                  {featured.ctaLabel ?? 'Ver arquitectura y solución'}
                </button>
                <button
                  onClick={() => onSelectProjectForDiscussion(featured.name)}
                  className="border border-slate bg-transparent hover:bg-slate/5 text-navy text-sm font-medium px-4 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id={`consult-like-${featured.id}`}
                >
                  Consultar proyecto similar
                </button>
              </div>
            </div>

            {/* Panel de especificación técnica */}
            <div className="lg:col-span-5 bg-navy text-white p-6 rounded border border-slate flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate">
                  <span className="text-xs font-semibold text-steel tracking-wide">
                    {featured.specPanel?.title ?? 'ESPECIFICACIÓN TÉCNICA'}
                  </span>
                  {featured.specPanel?.badge && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-copper" />
                      <span className="text-[11px] text-steel">{featured.specPanel.badge}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {(featured.specPanel?.items ?? featured.architecturePoints.map((text) => ({ title: '', text }))).map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate/40 rounded border border-slate text-xs">
                      {item.title && <div className="text-steel font-semibold mb-1">{item.title}</div>}
                      <div className="text-near-white/85">{item.text}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-steel font-semibold mb-2">Stack implementado:</div>
                <div className="flex flex-wrap gap-1.5">
                  {featured.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate text-near-white border border-steel/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resto de casos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {otherCases.map((project) => (
            <div key={project.id} className="border border-steel/70 bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-near-white border border-steel/40 text-slate">
                    {project.scaleLabel}
                  </span>
                  <span className="text-xs text-mid-gray">{project.category}</span>
                </div>

                <h3 className="text-xl font-bold text-navy mb-2">{project.name}</h3>
                <p className="text-xs text-mid-gray mb-4">
                  {project.clientContext} <LiveLink url={project.liveUrl} className="ml-1" />
                </p>
                <p className="text-sm text-navy leading-relaxed mb-5">{project.summary}</p>

                <div className="space-y-2 mb-6">
                  {project.keyHighlights.slice(0, 3).map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-navy">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-near-white text-slate border border-steel/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCase(project)}
                    className="flex-1 text-center border border-slate hover:bg-slate/5 text-navy text-xs font-medium py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                    id={`inspect-case-${project.id}`}
                  >
                    {project.ctaLabel ?? 'Ver arquitectura'}
                  </button>
                  <button
                    onClick={() => onSelectProjectForDiscussion(project.name)}
                    className="text-xs text-copper hover:underline font-medium px-2 py-2 cursor-pointer"
                  >
                    Consultar similar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
