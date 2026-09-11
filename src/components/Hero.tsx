import { useState } from 'react';
import { ShieldCheck, Cpu, Sliders, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onConsultationClick: () => void;
  onExploreProjectsClick: () => void;
}

export function Hero({ onConsultationClick, onExploreProjectsClick }: HeroProps) {
  const [activeBlueprintNode, setActiveBlueprintNode] = useState<number>(2);

  const blueprintSteps = [
    {
      id: 0,
      title: 'Levantamiento y alcance técnico',
      code: 'ESTRUCTURA_01',
      tag: 'Ingeniería previa',
      desc: 'Definición exacta de requerimientos, modelo de datos y riesgos. Sin ambigüedad: presupuesto cerrado y separación estricta entre alcance pactado y adiciones.',
      detail: 'Formación en supervisión de obra aplicada a la estimación técnica: plazos reales, no optimistas.'
    },
    {
      id: 1,
      title: 'Desarrollo web y orquestación',
      code: 'DESARROLLO_02',
      tag: 'TypeScript & n8n',
      desc: 'Plataformas reactivas, APIs limpias y flujos de integración automáticos. Código estructurado y tipado de extremo a extremo.',
      detail: 'Manejo estricto de excepciones, idempotencia en transacciones y cero dependencias superfluas.'
    },
    {
      id: 2,
      title: 'Agentes IA y validación humana',
      code: 'SUPERVISIÓN_03',
      tag: 'Human-in-the-loop',
      desc: 'Modelos de lenguaje restringidos a esquemas JSON con punto de cotejo humano antes de cualquier impacto en bases de datos o cuentas contables.',
      detail: 'Punto crítico: el nodo de cobre representa la supervisión técnica que previene fallos y alucinaciones.'
    },
    {
      id: 3,
      title: 'Despliegue, seguridad y auditoría',
      code: 'DESPLIEGUE_04',
      tag: 'Producción real',
      desc: 'Infraestructura documentada, protección contra fraude y monitorización. El proyecto queda en manos del cliente con trazabilidad completa.',
      detail: 'Entrega llave en mano con propiedad total del código y canales directos de soporte.'
    }
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#A9B7C4]/30 overflow-hidden bg-[#F6F7F8]" id="top">
      {/* Sutil fondo de cuadrícula milimetrada técnica tipo blueprint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(#A9B7C4 1px, transparent 1px), linear-gradient(90deg, #A9B7C4 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Columna de texto principal */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-[#3B4B5C]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B4B5C] inline-block" />
              <span>Estudio unipersonal liderado por Elier Garcia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2B3242] leading-[1.18] mb-6">
              Desarrollo web, automatización de procesos y agentes de IA con rigor de ingeniería
            </h1>

            <p className="text-base sm:text-lg text-[#2B3242]/90 leading-relaxed max-w-2xl mb-8">
              Combino formación en ingeniería eléctrica y supervisión técnica con desarrollo full-stack moderno. Construyo plataformas a medida, flujos con n8n e integraciones de IA para pequeños negocios y marcas de gran escala en España y México, con código tipado, arquitecturas auditadas y trato directo sin intermediarios.
            </p>

            {/* Acciones principales */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onConsultationClick}
                className="bg-[#3B4B5C] hover:bg-[#2B3242] text-white text-base font-semibold px-6 py-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B] shadow-sm"
                id="hero-iniciar-consulta-btn"
              >
                Iniciar consulta de proyecto
              </button>
              <button
                onClick={onExploreProjectsClick}
                className="border border-[#3B4B5C] hover:bg-[#3B4B5C]/10 text-[#2B3242] text-base font-semibold px-6 py-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
                id="hero-ver-proyectos-btn"
              >
                Ver casos de éxito reales
              </button>
            </div>

            {/* Principios de entrega directa */}
            <div className="pt-8 border-t border-[#A9B7C4]/50 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-sm font-semibold text-[#2B3242] mb-1">
                  Pragmatismo técnico
                </div>
                <div className="text-xs text-[#7A828C] leading-normal">
                  La solución más simple y sostenible para el problema real, sin inflar tecnologías ni costos recurrentes.
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B3242] mb-1">
                  Trato directo
                </div>
                <div className="text-xs text-[#7A828C] leading-normal">
                  Planificas y trabajas con quien escribe el código. Sin directores de cuenta ni traspasos con fricción.
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2B3242] mb-1">
                  Presupuesto cerrado
                </div>
                <div className="text-xs text-[#7A828C] leading-normal">
                  Fases de entrega documentadas y separación nítida entre alcance pactado y requerimientos adicionales.
                </div>
              </div>
            </div>
          </div>

          {/* Columna interactiva: Blueprint esquemático de ingeniería */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="bg-[#2B3242] text-white rounded-lg p-5 sm:p-6 border border-[#3B4B5C] shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#3B4B5C]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C77B4B]" />
                  <span className="text-xs font-semibold tracking-wide text-[#A9B7C4]">
                    ESQUEMA DE ARQUITECTURA TÉCNICA
                  </span>
                </div>
                <span className="text-xs text-[#A9B7C4]/80">
                  Control de flujo
                </span>
              </div>

              {/* Trazas de circuito interactivas */}
              <div className="space-y-3 mb-6">
                {blueprintSteps.map((step) => {
                  const isActive = activeBlueprintNode === step.id;
                  const isCopper = step.id === 2; // Nodo crítico de supervisión

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveBlueprintNode(step.id)}
                      className={`w-full text-left p-3 rounded transition-all flex items-start gap-3 border ${
                        isActive
                          ? isCopper
                            ? 'bg-[#3B4B5C]/70 border-[#C77B4B]'
                            : 'bg-[#3B4B5C]/70 border-[#A9B7C4]'
                          : 'bg-[#2B3242] hover:bg-[#3B4B5C]/30 border-[#3B4B5C]/80'
                      }`}
                      id={`blueprint-node-${step.id}`}
                      aria-pressed={isActive}
                    >
                      <div className="pt-0.5 shrink-0">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isCopper
                              ? 'bg-[#C77B4B] text-white'
                              : isActive
                              ? 'bg-[#A9B7C4] text-[#2B3242]'
                              : 'bg-[#3B4B5C] text-[#A9B7C4]'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white truncate">
                            {step.title}
                          </span>
                          <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium shrink-0 ${
                            isCopper ? 'bg-[#C77B4B]/20 text-[#C77B4B]' : 'bg-[#3B4B5C] text-[#A9B7C4]'
                          }`}>
                            {step.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#A9B7C4] mt-1 line-clamp-2 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detalle del nodo seleccionado */}
              <div className="bg-[#1E2430] p-3.5 rounded border border-[#3B4B5C]/60 text-xs">
                <div className="text-[#A9B7C4] font-medium mb-1 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C77B4B]" />
                  <span>Principio de ingeniería aplicado:</span>
                </div>
                <div className="text-white/90 leading-relaxed">
                  {blueprintSteps[activeBlueprintNode].detail}
                </div>
              </div>
            </div>

            {/* Ficha técnica compacta */}
            <div className="mt-4 p-4 rounded bg-[#EAECEF] border border-[#A9B7C4]/50 flex items-center justify-between text-xs text-[#2B3242]">
              <div>
                <span className="font-semibold block text-[#2B3242]">Perfil profesional:</span>
                <span className="text-[#7A828C]">Ingeniería Eléctrica + Full-Stack</span>
              </div>
              <div className="text-right">
                <span className="font-semibold block text-[#2B3242]">Idiomas:</span>
                <span className="text-[#7A828C]">Español e Inglés nativo/profesional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
