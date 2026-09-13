import { useState, useEffect, useRef } from 'react';
import { CASE_STUDIES } from '../data/projects';
import { ProjectCase } from '../types';
import { X } from 'lucide-react';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

interface CaseStudiesProps {
  onSelectProjectForDiscussion: (projectName: string) => void;
}

export function CaseStudies({ onSelectProjectForDiscussion }: CaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const brandActivation = CASE_STUDIES.find((c) => c.id === 'activacion-nacional') ?? CASE_STUDIES[0];
  const duoVarietta = CASE_STUDIES.find((c) => c.id === 'duovarietta') ?? CASE_STUDIES[1];
  const coreIt = CASE_STUDIES.find((c) => c.id === 'coreit-pos') ?? CASE_STUDIES[2];

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
            Casos de éxito reales
          </h2>
          <p className="text-base text-mid-gray leading-relaxed">
            Proyectos en producción que demuestran versatilidad técnica: activación masiva de alcance nacional, sistema operativo para eventos y extracción documental con IA.
          </p>
        </div>

        {/* 1. CASO PRINCIPAL DESTACADO: Activación Nacional de Marca */}
        <div className="mb-12 border-2 border-slate bg-white rounded-lg p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-navy text-white">
                  {brandActivation.scaleLabel}
                </span>
                <span className="text-xs font-medium text-mid-gray">
                  {brandActivation.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-3">
                {brandActivation.name}
              </h3>

              <div className="text-xs text-slate font-medium mb-4">
                {brandActivation.clientContext}
              </div>

              <p className="text-navy/90 text-base leading-relaxed mb-6">
                {brandActivation.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {brandActivation.keyHighlights.map((item, idx) => (
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
                  onClick={() => setSelectedCase(brandActivation)}
                  className="bg-copper hover:opacity-90 text-white text-sm font-medium px-4 py-2.5 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                  id="inspect-case-national-activation"
                >
                  Inspeccionar arquitectura y solución antifraude
                </button>
                <button
                  onClick={() => onSelectProjectForDiscussion(brandActivation.name)}
                  className="border border-slate bg-transparent hover:bg-slate/5 text-navy text-sm font-medium px-4 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id="consult-like-national-activation"
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
                    ESPECIFICACIÓN TÉCNICA DE CAMPAÑA
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-copper" />
                    <span className="text-[11px] text-steel">Alta concurrencia</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-slate/40 rounded border border-slate text-xs">
                    <div className="text-steel font-semibold mb-1">Sin descarga de App (Web Omnicanal):</div>
                    <div className="text-near-white/85">
                      Acceso instantáneo vía QR en empaques; retención del 98% sin fricción de instalación en tiendas.
                    </div>
                  </div>

                  <div className="p-3 bg-slate/40 rounded border border-slate text-xs">
                    <div className="text-steel font-semibold mb-1">Apple Wallet & Google Wallet:</div>
                    <div className="text-near-white/85">
                      Pases dinámicos con firma criptográfica en servidor y balance sincronizado en tiempo real.
                    </div>
                  </div>

                  <div className="p-3 bg-slate/40 rounded border border-slate text-xs">
                    <div className="text-steel font-semibold mb-1">Validación Antifraude en Dos Pasos:</div>
                    <div className="text-near-white/85">
                      QR efímero de 60s con geocercas y verificación criptográfica para canje seguro en tienda.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-steel font-semibold mb-2">Stack implementado:</div>
                <div className="flex flex-wrap gap-1.5">
                  {brandActivation.techStack.map((tech, idx) => (
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

        {/* Casos 2 y 3: DuoVarietta y CoreIT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* DuoVarietta */}
          <div className="border border-steel/70 bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-near-white border border-steel/40 text-slate">
                  {duoVarietta.scaleLabel}
                </span>
                <span className="text-xs text-mid-gray">{duoVarietta.category}</span>
              </div>

              <h3 className="text-xl font-bold text-navy mb-2">{duoVarietta.name}</h3>
              <p className="text-xs text-mid-gray mb-4">{duoVarietta.clientContext}</p>
              <p className="text-sm text-navy leading-relaxed mb-5">{duoVarietta.summary}</p>

              <div className="space-y-2 mb-6">
                {duoVarietta.keyHighlights.slice(0, 3).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-navy">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {duoVarietta.techStack.map((tech, idx) => (
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
                  onClick={() => setSelectedCase(duoVarietta)}
                  className="flex-1 text-center border border-slate hover:bg-slate/5 text-navy text-xs font-medium py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id="inspect-case-duovarietta"
                >
                  Ver arquitectura del cotizador
                </button>
                <button
                  onClick={() => onSelectProjectForDiscussion(duoVarietta.name)}
                  className="text-xs text-copper hover:underline font-medium px-2 py-2 cursor-pointer"
                >
                  Consultar similar
                </button>
              </div>
            </div>
          </div>

          {/* CoreIT Automatización */}
          <div className="border border-steel/70 bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-near-white border border-steel/40 text-slate">
                  {coreIt.scaleLabel}
                </span>
                <span className="text-xs text-mid-gray">{coreIt.category}</span>
              </div>

              <h3 className="text-xl font-bold text-navy mb-2">{coreIt.name}</h3>
              <p className="text-xs text-mid-gray mb-4">{coreIt.clientContext}</p>
              <p className="text-sm text-navy leading-relaxed mb-5">{coreIt.summary}</p>

              <div className="space-y-2 mb-6">
                {coreIt.keyHighlights.slice(0, 3).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-navy">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {coreIt.techStack.map((tech, idx) => (
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
                  onClick={() => setSelectedCase(coreIt)}
                  className="flex-1 text-center border border-slate hover:bg-slate/5 text-navy text-xs font-medium py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id="inspect-case-coreit"
                >
                  Ver pipeline OCR + Gemini
                </button>
                <button
                  onClick={() => onSelectProjectForDiscussion(coreIt.name)}
                  className="text-xs text-copper hover:underline font-medium px-2 py-2 cursor-pointer"
                >
                  Consultar similar
                </button>
              </div>
            </div>
          </div>
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
