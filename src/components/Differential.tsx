import { BRAND_NAME, FOUNDER_NAME, FOUNDER_ROLE, ACTIVE_REGIONS, LANGUAGES } from '../data/constants';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

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

            <div className="space-y-4 text-sm text-mid-gray leading-relaxed">
              <p>
                Me formé en <strong className="text-navy font-semibold">ingeniería eléctrica</strong> y trabajé en <strong className="text-navy font-semibold">supervisión técnica de obra</strong> antes de volcarme al desarrollo full-stack (Python, TypeScript, React, Firebase) y modelos de lenguaje.
              </p>
              <p>
                En supervisión técnica no existen atajos: un cálculo erróneo invalida la instalación. Ese principio de <strong className="text-navy font-semibold">tolerancia cero a la fragilidad</strong> rige cada base de datos, flujo de automatización y regla de seguridad.
              </p>
              <p>
                <strong className="text-navy font-semibold">Práctica independiente</strong>: sin intermediarios ni traspaso a perfiles júnior. Planificación, arquitectura, código y soporte directo en una sola mano responsable.
              </p>
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
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-steel/70 rounded-lg p-6 shadow-xs">
              <h3 className="text-lg font-bold text-navy mb-2">
                Pragmatismo técnico y proporcionalidad
              </h3>
              <p className="text-sm text-mid-gray leading-relaxed mb-3">
                Evito complejidades innecesarias. Para un negocio de eventos, una arquitectura reactiva y económica es óptima. Para una activación nacional, se despliega alta concurrencia y validación criptográfica.
              </p>
              <div className="text-xs text-slate font-medium">
                Principio: La solución más simple y sostenible para el problema real, nunca la más compleja por lucimiento técnico.
              </div>
            </div>

            <div className="bg-white border border-steel/70 rounded-lg p-6 shadow-xs">
              <h3 className="text-lg font-bold text-navy mb-2">
                Supervisión humana en puntos críticos (Human-in-the-loop)
              </h3>
              <p className="text-sm text-mid-gray leading-relaxed mb-3">
                Los LLMs destacan procesando información, pero no deben ejecutar transacciones críticas a ciegas. Todos mis pipelines incorporan umbrales de confianza y validación humana previa.
              </p>
              <div className="text-xs text-slate font-medium">
                Principio: Inteligencia artificial acotada por esquemas tipados y respaldada por criterio humano.
              </div>
            </div>

            <div className="bg-white border border-steel/70 rounded-lg p-6 shadow-xs">
              <h3 className="text-lg font-bold text-navy mb-2">
                Alcance documentado, precio cerrado y responsabilidad
              </h3>
              <p className="text-sm text-mid-gray leading-relaxed mb-3">
                Especificación previa antes de codificar: delimitación de hitos, alcance pactado y dependencias. Los fallos atribuibles a diseño se asumen sin trasladar costes al cliente.
              </p>
              <div className="text-xs text-slate font-medium">
                Principio: Transparencia contractual y relaciones de largo plazo basadas en confianza técnica demostrada.
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
                <div className="text-steel font-semibold mb-2">Agencia tradicional</div>
                <div className="text-near-white/80 space-y-2 mb-4 leading-relaxed">
                  <div>Múltiples intermediarios: hablas con comerciales que derivan a desarrolladores ajenos a tu negocio.</div>
                  <div>Costes de estructura inflados que se cargan a tu factura mensual.</div>
                </div>
              </div>
              <div className="text-steel/70 pt-2 border-t border-slate">
                Resultado: Poca agilidad y riesgo de desalineación técnica.
              </div>
            </div>

            <div className="bg-slate/30 p-4 rounded border border-slate flex flex-col justify-between">
              <div>
                <div className="text-steel font-semibold mb-2">Desarrollador júnior o generalista</div>
                <div className="text-near-white/80 space-y-2 mb-4 leading-relaxed">
                  <div>Tarifas iniciales bajas pero sin experiencia en escalabilidad, seguridad ni tolerancia a fallos.</div>
                  <div>Código frágil, sin documentación arquitectónica ni control estricto de tipos.</div>
                </div>
              </div>
              <div className="text-steel/70 pt-2 border-t border-slate">
                Resultado: Deuda técnica y reescrituras costosas a corto plazo.
              </div>
            </div>

            <div className="bg-slate/50 p-4 rounded border border-copper flex flex-col justify-between">
              <div>
                <div className="text-white font-bold mb-2 flex items-center justify-between">
                  <span>{BRAND_NAME}</span>
                  <span className="w-2 h-2 rounded-full bg-copper" />
                </div>
                <div className="text-near-white/90 space-y-2 mb-4 leading-relaxed">
                  <div>Interlocución directa con {FOUNDER_NAME}: quien evalúa la viabilidad es quien programa la solución.</div>
                  <div>Rigor de ingeniería en presupuestos cerrados, plazos realistas y arquitecturas sostenibles.</div>
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
