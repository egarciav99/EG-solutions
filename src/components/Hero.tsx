import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_PILLARS, ACTIVE_REGIONS, LANGUAGES } from '../data/constants';
import { BLUEPRINT_STEPS } from '../data/blueprintSteps';
import { heroCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

interface HeroProps {
  onConsultationClick: () => void;
  onExploreProjectsClick: () => void;
}

export function Hero({ onConsultationClick, onExploreProjectsClick }: HeroProps) {
  const [activeBlueprintNode, setActiveBlueprintNode] = useState<number>(2);

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-steel/30 overflow-hidden bg-near-white" id="top">
      {/* Fondo de cuadrícula técnica y circuito impreso animado */}
      <div className="absolute inset-0 pointer-events-none bg-blueprint-grid" aria-hidden="true" />
      <CircuitBackground layout={heroCircuitLayout} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Columna de texto principal */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Pilares de marca desglosados */}
            <div className="inline-flex flex-wrap items-center gap-2 mb-5 px-3 py-1.5 rounded border border-steel/60 bg-white/80 w-fit text-xs font-medium text-slate shadow-xs">
              {BRAND_PILLARS.map((pillar, idx) => (
                <div key={pillar.id} className="flex items-center gap-2">
                  {idx === 0 && <span className="w-2 h-2 rounded-full bg-copper inline-block shrink-0" />}
                  {idx > 0 && <span className="w-1 h-1 rounded-full bg-steel inline-block shrink-0" />}
                  <span>{pillar.label}</span>
                </div>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-navy leading-[1.18] mb-6">
              Código sólido. <span className="text-copper">Operaciones inteligentes.</span>
            </h1>

            <p className="text-base sm:text-lg text-mid-gray leading-relaxed max-w-2xl mb-8">
              Plataformas web, automatización de procesos y agentes de IA para negocios en {ACTIVE_REGIONS}. Código propio, sin agencias de por medio.
            </p>

            {/* Acciones principales - Botón primario cobre y secundario borde pizarra */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onConsultationClick}
                className="bg-copper hover:opacity-90 text-white text-base font-medium px-6 py-3 rounded transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper shadow-xs cursor-pointer"
                id="hero-iniciar-consulta-btn"
              >
                Iniciar consulta de proyecto
              </button>
              <button
                onClick={onExploreProjectsClick}
                className="border border-slate bg-transparent hover:bg-slate/5 text-navy text-base font-medium px-6 py-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                id="hero-ver-proyectos-btn"
              >
                Ver proyectos y propuestas
              </button>
            </div>
          </div>

          {/* Columna interactiva: Blueprint esquemático de ingeniería */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="bg-navy text-white rounded-lg p-5 sm:p-6 border border-slate shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-copper" />
                  <span className="text-xs font-semibold tracking-wide text-steel">
                    ESQUEMA DE ARQUITECTURA TÉCNICA
                  </span>
                </div>
                <span className="text-xs text-steel/80">
                  Control de flujo
                </span>
              </div>

              {/* Trazas de circuito interactivas */}
              <div className="space-y-3 mb-6">
                {BLUEPRINT_STEPS.map((step) => {
                  const isActive = activeBlueprintNode === step.id;
                  const isCopper = Boolean(step.isCritical);

                  return (
                    <button
                      key={step.id}
                      onClick={() => setActiveBlueprintNode(step.id)}
                      className={`w-full text-left p-3 rounded transition-all flex items-start gap-3 border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel ${
                        isActive
                          ? isCopper
                            ? 'bg-slate/70 border-copper'
                            : 'bg-slate/70 border-steel'
                          : 'bg-navy hover:bg-slate/30 border-slate/80'
                      }`}
                      id={`blueprint-node-${step.id}`}
                      aria-pressed={isActive}
                    >
                      <div className="pt-0.5 shrink-0">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isCopper
                              ? 'bg-copper text-white'
                              : isActive
                              ? 'bg-steel text-navy'
                              : 'bg-slate text-steel'
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
                            isCopper ? 'bg-copper/20 text-copper' : 'bg-slate text-steel'
                          }`}>
                            {step.tag}
                          </span>
                        </div>
                        <p className="text-xs text-steel mt-1 line-clamp-2 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detalle del nodo seleccionado con animación AnimatePresence */}
              <div className="bg-navy p-3.5 rounded border border-slate text-xs min-h-[76px]">
                <div className="text-steel font-medium mb-1.5 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-copper" />
                  <span>Principio de ingeniería aplicado:</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBlueprintNode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="text-white/90 leading-relaxed"
                  >
                    {BLUEPRINT_STEPS[activeBlueprintNode].detail}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Ficha técnica compacta */}
            <div className="mt-4 p-4 rounded bg-white border border-steel/50 flex items-center justify-between text-xs text-navy shadow-xs">
              <div>
                <span className="font-semibold block text-navy">Perfil diferencial:</span>
                <span className="text-mid-gray">Ingeniería Eléctrica + Full-Stack</span>
              </div>
              <div className="text-right">
                <span className="font-semibold block text-navy">Mercados & Idiomas:</span>
                <span className="text-mid-gray">{ACTIVE_REGIONS} · {LANGUAGES}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
