import { BRAND_NAME, FOUNDER_NAME, FOUNDER_ROLE, ACTIVE_REGIONS, LANGUAGES } from '../data/constants';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';
import { Zap, Shield, UserCheck, Compass, ShieldAlert, FileText } from 'lucide-react';

export function Differential() {
  return (
    <section className="relative py-20 border-b border-steel/30 bg-near-white overflow-hidden" id="diferencial">
      {/* Fondo de circuito impreso decorativo invertido */}
      <CircuitBackground layout={secondaryCircuitLayout} flip={true} opacity={0.10} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-4">
            Criterio de ingeniería aplicado al software
          </h2>
          <p className="text-base text-mid-gray leading-relaxed">
            El software defectuoso rara vez falla por falta de librerías, sino por definición imprecisa. La formación en ingeniería eléctrica y supervisión técnica de {FOUNDER_NAME} aporta un rigor poco común en agencias convencionales.
          </p>
        </div>

        {/* Bloque editorial estructurado de Elier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Perfil y formación técnica */}
          <div className="lg:col-span-5 bg-white border border-steel/70 rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-steel/40">
              <div className="w-11 h-11 rounded bg-navy border border-slate flex items-center justify-center text-steel font-bold text-sm">
                EG
              </div>
              <div>
                <h3 className="text-base font-bold text-navy">{FOUNDER_NAME}</h3>
                <p className="text-xs text-mid-gray">{FOUNDER_ROLE}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded bg-near-white border border-steel/40 text-xs font-semibold text-navy">
                <div className="p-1.5 rounded bg-white text-slate border border-steel/40 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <span>Ingeniería eléctrica → Full-stack</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-near-white border border-steel/40 text-xs font-semibold text-navy">
                <div className="p-1.5 rounded bg-white text-copper border border-steel/40 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <span>Tolerancia cero a la fragilidad</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-near-white border border-steel/40 text-xs font-semibold text-navy">
                <div className="p-1.5 rounded bg-white text-slate border border-steel/40 shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span>Práctica independiente, sin intermediarios</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-steel/40 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-navy block">Localización activa:</span>
                <span className="text-mid-gray">{ACTIVE_REGIONS}</span>
              </div>
              <div>
                <span className="font-semibold text-navy block">Comunicación:</span>
                <span className="text-mid-gray">{LANGUAGES}</span>
              </div>
            </div>
          </div>

          {/* Cómo se traduce en la ejecución de tus proyectos */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-steel/70 rounded-lg p-5 sm:p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-navy mb-3 border-l border-l-transparent pl-0">
                Pragmatismo técnico y proporcionalidad
              </h3>
              <div className="flex items-center gap-3 p-3 bg-near-white rounded border border-steel/40">
                <div className="p-1.5 rounded bg-white text-slate border border-steel/40 shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate font-medium leading-relaxed">
                  <strong className="text-navy font-semibold">Principio:</strong> La solución más simple y sostenible para el problema real, nunca la más compleja por lucimiento técnico.
                </div>
              </div>
            </div>

            <div className="bg-white border border-steel/70 rounded-lg p-5 sm:p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-navy mb-3 border-l border-l-transparent pl-0">
                Supervisión humana en puntos críticos (Human-in-the-loop)
              </h3>
              <div className="flex items-center gap-3 p-3 bg-near-white rounded border border-steel/40">
                <div className="p-1.5 rounded bg-white text-copper border border-steel/40 shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate font-medium leading-relaxed">
                  <strong className="text-navy font-semibold">Principio:</strong> Inteligencia artificial acotada por esquemas tipados y respaldada por criterio humano.
                </div>
              </div>
            </div>

            <div className="bg-white border border-steel/70 rounded-lg p-5 sm:p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-navy mb-3 border-l border-l-transparent pl-0">
                Alcance documentado, precio cerrado y responsabilidad
              </h3>
              <div className="flex items-center gap-3 p-3 bg-near-white rounded border border-steel/40">
                <div className="p-1.5 rounded bg-white text-slate border border-steel/40 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm text-slate font-medium leading-relaxed">
                  <strong className="text-navy font-semibold">Principio:</strong> Transparencia contractual y relaciones de largo plazo basadas en confianza técnica demostrada.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparativa analítica honesta: Agencia vs Freelance Junior vs EG Solutions */}
        <div className="bg-navy text-white rounded-lg p-6 sm:p-8 border border-slate shadow-xs">
          <h3 className="text-lg font-bold text-white mb-2">
            La diferencia operativa al trabajar con una práctica de ingeniería independiente
          </h3>
          <p className="text-xs sm:text-sm text-steel mb-6 max-w-2xl">
            Una comparativa objetiva de dinámicas de trabajo para ayudarte a determinar si {BRAND_NAME} es el encaje correcto para tu organización:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate/30 p-4 rounded border border-slate flex flex-col justify-between">
              <div>
                <div className="text-steel font-semibold mb-3">Agencia tradicional</div>
                <div className="flex flex-col gap-2 mb-4">
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Múltiples intermediarios comerciales
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Desarrolladores ajenos al negocio
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Costes de estructura inflados
                  </span>
                </div>
              </div>
              <div className="text-steel/70 pt-2 border-t border-slate">
                Resultado: Poca agilidad y riesgo de desalineación técnica.
              </div>
            </div>

            <div className="bg-slate/30 p-4 rounded border border-slate flex flex-col justify-between">
              <div>
                <div className="text-steel font-semibold mb-3">Desarrollador júnior o generalista</div>
                <div className="flex flex-col gap-2 mb-4">
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Sin experiencia en escalabilidad
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Código frágil sin tipado
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/40 border border-slate/60 text-near-white/90 font-medium">
                    Sin documentación arquitectónica
                  </span>
                </div>
              </div>
              <div className="text-steel/70 pt-2 border-t border-slate">
                Resultado: Deuda técnica y reescrituras costosas a corto plazo.
              </div>
            </div>

            <div className="bg-slate/50 p-4 rounded border border-copper flex flex-col justify-between">
              <div>
                <div className="text-white font-bold mb-3 flex items-center justify-between">
                  <span>{BRAND_NAME}</span>
                  <span className="w-2 h-2 rounded-full bg-copper" />
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  <span className="px-2.5 py-1.5 rounded bg-slate/60 border border-copper/40 text-white font-medium">
                    Interlocución directa con {FOUNDER_NAME}
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/60 border border-copper/40 text-white font-medium">
                    Presupuestos cerrados sin sobrecostes
                  </span>
                  <span className="px-2.5 py-1.5 rounded bg-slate/60 border border-copper/40 text-white font-medium">
                    Arquitecturas sostenibles y tipadas
                  </span>
                </div>
              </div>
              <div className="text-copper pt-2 border-t border-slate font-semibold">
                Resultado: Software en producción, sin intermediarios ni sobrecostes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
