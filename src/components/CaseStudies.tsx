import { useState } from 'react';
import { CASE_STUDIES } from '../data/projects';
import { ProjectCase } from '../types';
import { ShieldCheck, Smartphone, Terminal, X, CheckCircle2, ChevronRight, Layers, Cpu } from 'lucide-react';

interface CaseStudiesProps {
  onSelectProjectForDiscussion: (projectName: string) => void;
}

export function CaseStudies({ onSelectProjectForDiscussion }: CaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);

  const acumulaYardas = CASE_STUDIES[0];
  const duoVarietta = CASE_STUDIES[1];
  const coreIt = CASE_STUDIES[2];

  return (
    <section className="py-20 border-b border-[#A9B7C4]/30 bg-[#F6F7F8]" id="proyectos">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B3242] tracking-tight mb-4">
            Casos de éxito reales
          </h2>
          <p className="text-base text-[#7A828C] leading-relaxed">
            Proyectos en producción que demuestran versatilidad técnica en tres escalas distintas: activación masiva para una marca global, sistema operativo para un pequeño negocio y hub interno de extracción documental con inteligencia artificial.
          </p>
        </div>

        {/* 1. CASO PRINCIPAL DESTACADO: ACUMULA YARDAS (Gran escala de marca) */}
        <div className="mb-12 border-2 border-[#3B4B5C] bg-white rounded-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#2B3242] text-white">
                  {acumulaYardas.scaleLabel}
                </span>
                <span className="text-xs font-medium text-[#7A828C]">
                  {acumulaYardas.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[#2B3242] mb-3">
                {acumulaYardas.name}
              </h3>

              <div className="text-xs text-[#3B4B5C] font-medium mb-4">
                {acumulaYardas.clientContext}
              </div>

              <p className="text-[#2B3242]/90 text-base leading-relaxed mb-6">
                {acumulaYardas.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {acumulaYardas.keyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#2B3242]">
                    <span className="mt-1 w-3.5 h-3.5 rounded-full bg-[#3B4B5C] text-white flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#A9B7C4]/40">
                <button
                  onClick={() => setSelectedCase(acumulaYardas)}
                  className="bg-[#3B4B5C] hover:bg-[#2B3242] text-white text-sm font-medium px-4 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B]"
                  id="inspect-case-acumula-yardas"
                >
                  Inspeccionar arquitectura y solución antifraude
                </button>
                <button
                  onClick={() => onSelectProjectForDiscussion(acumulaYardas.name)}
                  className="border border-[#3B4B5C] hover:bg-[#3B4B5C]/10 text-[#2B3242] text-sm font-medium px-4 py-2.5 rounded transition-colors"
                  id="consult-like-acumula-yardas"
                >
                  Consultar proyecto similar
                </button>
              </div>
            </div>

            {/* Panel de arquitectura esquemática de Acumula Yardas */}
            <div className="lg:col-span-5 bg-[#2B3242] text-white p-6 rounded-md border border-[#3B4B5C] flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#3B4B5C]">
                  <span className="text-xs font-semibold text-[#A9B7C4] tracking-wide">
                    ESPECIFICACIÓN TÉCNICA DE CAMPAÑA
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C77B4B]" />
                    <span className="text-[11px] text-[#A9B7C4]">Alta concurrencia</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-[#1E2430] rounded border border-[#3B4B5C]/60 text-xs">
                    <div className="text-[#A9B7C4] font-semibold mb-1">Sin descarga de App (Web Omnicanal):</div>
                    <div className="text-white/80">Acceso inmediato desde QR en envases Michelob Ultra; retención de usuarios a través de pases directos en Apple Wallet y Google Wallet.</div>
                  </div>

                  <div className="p-3 bg-[#1E2430] rounded border border-[#3B4B5C]/60 text-xs">
                    <div className="text-[#A9B7C4] font-semibold mb-1">Validación Antifraude en Dos Pasos:</div>
                    <div className="text-white/80">Tokens efímeros de canje de 45 segundos de validez vinculados a la geolocalización de cada sucursal participante.</div>
                  </div>

                  <div className="p-3 bg-[#1E2430] rounded border border-[#3B4B5C]/60 text-xs">
                    <div className="text-[#A9B7C4] font-semibold mb-1">Panel de Analítica por Sucursal:</div>
                    <div className="text-white/80">Métricas en vivo de canjes por hora, inventario de promocionales y afluencia comparativa entre sedes.</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#3B4B5C] flex flex-wrap gap-1.5">
                {acumulaYardas.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#3B4B5C] text-[#E2E8F0] px-2 py-0.5 rounded font-normal"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2 y 3. CASOS EN PARALELO CON IDENTIDAD PROPIA (Pequeño Negocio vs Herramienta Interna) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CASO 2: DUOVARIETTA (Pequeño negocio para eventos) */}
          <div className="border border-[#A9B7C4] bg-white rounded-lg p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#3B4B5C] text-white">
                  {duoVarietta.scaleLabel}
                </span>
                <span className="text-xs font-medium text-[#7A828C]">
                  {duoVarietta.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#2B3242] mb-2">
                {duoVarietta.name}
              </h3>

              <div className="text-xs text-[#3B4B5C] font-medium mb-3">
                {duoVarietta.clientContext}
              </div>

              <p className="text-sm text-[#2B3242]/85 leading-relaxed mb-5">
                {duoVarietta.summary}
              </p>

              <div className="space-y-2 mb-6">
                {duoVarietta.keyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#2B3242]">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#3B4B5C] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#A9B7C4]/40">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {duoVarietta.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#F6F7F8] border border-[#A9B7C4]/60 text-[#2B3242] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCase(duoVarietta)}
                  className="text-xs font-semibold text-[#3B4B5C] hover:text-[#2B3242] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
                  id="inspect-case-duovarietta"
                >
                  Ver arquitectura de inventario y cotizador
                </button>
              </div>
            </div>
          </div>

          {/* CASO 3: COREIT AUTOMATIZACIÓN (Hub interno estilo terminal POS) */}
          <div className="border border-[#A9B7C4] bg-white rounded-lg p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#2B3242] text-white flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-[#A9B7C4]" />
                  <span>{coreIt.scaleLabel}</span>
                </span>
                <span className="text-xs font-medium text-[#7A828C]">
                  {coreIt.category}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#2B3242] mb-2">
                {coreIt.name}
              </h3>

              <div className="text-xs text-[#3B4B5C] font-medium mb-3">
                {coreIt.clientContext}
              </div>

              <p className="text-sm text-[#2B3242]/85 leading-relaxed mb-5">
                {coreIt.summary}
              </p>

              <div className="space-y-2 mb-6">
                {coreIt.keyHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#2B3242]">
                    <span className="mt-1 w-2 h-2 rounded-full bg-[#C77B4B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#A9B7C4]/40">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {coreIt.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#F6F7F8] border border-[#A9B7C4]/60 text-[#2B3242] px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCase(coreIt)}
                  className="text-xs font-semibold text-[#3B4B5C] hover:text-[#2B3242] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
                  id="inspect-case-coreit"
                >
                  Ver pipeline OCR + Gemini y terminal POS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Inspector Técnico de Caso de Éxito */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B3242]/70 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-modal-title"
        >
          <div className="bg-white rounded-lg border-2 border-[#3B4B5C] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#A9B7C4]/40">
              <div>
                <span className="text-xs font-semibold text-[#3B4B5C] block">
                  {selectedCase.scaleLabel}
                </span>
                <h3 id="case-modal-title" className="text-xl sm:text-2xl font-bold text-[#2B3242]">
                  {selectedCase.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 text-[#7A828C] hover:text-[#2B3242] hover:bg-[#A9B7C4]/20 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
                id="close-case-modal-btn"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 text-sm text-[#2B3242]">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-[#3B4B5C] mb-1">
                  El desafío operativo del cliente
                </h4>
                <p className="text-[#2B3242]/90 leading-relaxed">
                  {selectedCase.problem}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-[#3B4B5C] mb-1">
                  Arquitectura y solución implementada
                </h4>
                <p className="text-[#2B3242]/90 leading-relaxed mb-3">
                  {selectedCase.solution}
                </p>
                <div className="bg-[#F6F7F8] p-3.5 rounded border border-[#A9B7C4]/40 space-y-2">
                  <div className="text-xs font-semibold text-[#2B3242]">Puntos críticos de arquitectura:</div>
                  {selectedCase.architecturePoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#2B3242]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C77B4B] mt-1 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wide text-[#3B4B5C] mb-2">
                  Stack tecnológico utilizado
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-[#2B3242] text-white px-2.5 py-1 rounded font-normal"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#A9B7C4]/40 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    const name = selectedCase.name;
                    setSelectedCase(null);
                    onSelectProjectForDiscussion(name);
                  }}
                  className="bg-[#3B4B5C] hover:bg-[#2B3242] text-white text-sm font-medium px-4 py-2.5 rounded transition-colors"
                  id="modal-discuss-project-btn"
                >
                  Consultar un proyecto con estos requerimientos
                </button>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-sm text-[#7A828C] hover:text-[#2B3242] px-3 py-2"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
