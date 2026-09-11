export function Differential() {
  return (
    <section className="py-20 border-b border-[#A9B7C4]/30 bg-[#F6F7F8]" id="diferencial">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B3242] tracking-tight mb-4">
            Criterio de ingeniería aplicado al software
          </h2>
          <p className="text-base text-[#7A828C] leading-relaxed">
            La mayoría del software defectuoso no falla por falta de librerías, sino por falta de rigor en la definición del problema. Mi trasfondo en ingeniería eléctrica y supervisión técnica moldea una forma de construir software radicalmente distinta a la de una agencia convencional.
          </p>
        </div>

        {/* Bloque editorial estructurado de Elier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Perfil y formación técnica */}
          <div className="lg:col-span-5 bg-white border border-[#3B4B5C] rounded-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-[#A9B7C4]/40">
              <div className="w-10 h-10 rounded bg-[#2B3242] flex items-center justify-center text-white font-bold text-sm">
                EG
              </div>
              <div>
                <h3 className="text-base font-bold text-[#2B3242]">Elier Garcia</h3>
                <p className="text-xs text-[#7A828C]">Fundador e Ingeniero Principal</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#2B3242]/90 leading-relaxed">
              <p>
                Me formé en <strong>ingeniería eléctrica</strong> y trabajé en <strong>supervisión técnica de obra</strong> antes de volcarme de lleno al desarrollo de software full-stack (Python, TypeScript, React, Firebase) y a la implementación de modelos de lenguaje.
              </p>
              <p>
                En una obra eléctrica no existen los atajos: un cable mal dimensionado o una protección mal calculada inutilizan la instalación o provocan un incendio. Ese mismo principio de <strong>tolerancia cero a la fragilidad</strong> lo aplico a cada base de datos, cada flujo de automatización y cada token de autenticación.
              </p>
              <p>
                Opero como <strong>estudio unipersonal</strong>: cuando me confías un proyecto, no lo delego a becarios ni a perfiles júnior remotos. Todo el código, las decisiones de infraestructura y el soporte directo están en mis manos.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#A9B7C4]/40 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-[#2B3242] block">Localización activa:</span>
                <span className="text-[#7A828C]">España y México</span>
              </div>
              <div>
                <span className="font-semibold text-[#2B3242] block">Comunicación:</span>
                <span className="text-[#7A828C]">Bilingüe (ES / EN)</span>
              </div>
            </div>
          </div>

          {/* Cómo se traduce en la ejecución de tus proyectos */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-[#A9B7C4] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#2B3242] mb-2">
                Pragmatismo técnico y proporcionalidad
              </h3>
              <p className="text-sm text-[#2B3242]/85 leading-relaxed mb-3">
                No todos los proyectos necesitan microservicios en Kubernetes ni suscripciones de software infladas. Para un negocio local de eventos, una arquitectura reactiva ligera en Firebase y Cloud Functions es mil veces más económica, rápida y confiable. Para una campaña nacional como Michelob Ultra, se diseña un sistema de alta concurrencia con tokens criptográficos efímeros.
              </p>
              <div className="text-xs text-[#3B4B5C] font-medium">
                Principio: La solución más simple y sostenible para el problema real, nunca la más compleja por lucimiento técnico.
              </div>
            </div>

            <div className="bg-white border border-[#A9B7C4] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#2B3242] mb-2">
                Supervisión humana en puntos críticos (Human-in-the-loop)
              </h3>
              <p className="text-sm text-[#2B3242]/85 leading-relaxed mb-3">
                Los modelos de IA son extraordinarios analizando documentos y redactando resúmenes estructurados, pero jamás deben tomar decisiones monetarias o contables a ciegas. Todos los pipelines de IA que desarrollo incluyen umbrales de confianza y pantallas ergonómicas de validación humana antes de tocar bases de datos productivas.
              </p>
              <div className="text-xs text-[#3B4B5C] font-medium">
                Principio: Inteligencia artificial acotada por esquemas tipados y respaldada por criterio humano.
              </div>
            </div>

            <div className="bg-white border border-[#A9B7C4] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#2B3242] mb-2">
                Alcance documentado, precio cerrado y responsabilidad
              </h3>
              <p className="text-sm text-[#2B3242]/85 leading-relaxed mb-3">
                Antes de escribir una sola línea de código, recibes una especificación técnica de qué está incluido, qué es trabajo adicional y qué dependencias existen. Los errores imputables al diseño de software se corrigen sin trasladar el coste ni el riesgo al cliente.
              </p>
              <div className="text-xs text-[#3B4B5C] font-medium">
                Principio: Transparencia contractual y relaciones de largo plazo basadas en confianza técnica demostrada.
              </div>
            </div>
          </div>
        </div>

        {/* Comparativa analítica honesta: Agencia vs Freelance Junior vs EG Solutions */}
        <div className="bg-[#2B3242] text-white rounded-lg p-6 sm:p-8 border border-[#3B4B5C]">
          <h3 className="text-lg font-bold text-white mb-2">
            La diferencia operativa al trabajar con un estudio de ingeniería unipersonal
          </h3>
          <p className="text-xs sm:text-sm text-[#A9B7C4] mb-6 max-w-2xl">
            Una comparativa objetiva de dinámicas de trabajo para ayudarte a determinar si EG Solutions es el encaje correcto para tu organización:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#1E2430] p-4 rounded border border-[#3B4B5C]/80 flex flex-col justify-between">
              <div>
                <div className="text-[#A9B7C4] font-semibold mb-2">Agencia tradicional</div>
                <div className="text-white/80 space-y-2 mb-4 leading-relaxed">
                  <div>Múltiples capas de intermediación: hablas con un ejecutivo comercial que retransmite tus necesidades a un gestor, quien a su vez asigna a desarrolladores que no conocen tu negocio.</div>
                  <div>Costes de estructura inflados que se transfieren a tu factura mensual.</div>
                </div>
              </div>
              <div className="text-[#A9B7C4]/70 pt-2 border-t border-[#3B4B5C]/60">
                Resultado: Poca agilidad y riesgo de desalineación técnica.
              </div>
            </div>

            <div className="bg-[#1E2430] p-4 rounded border border-[#3B4B5C]/80 flex flex-col justify-between">
              <div>
                <div className="text-[#A9B7C4] font-semibold mb-2">Desarrollador júnior o generalista</div>
                <div className="text-white/80 space-y-2 mb-4 leading-relaxed">
                  <div>Tarifas iniciales aparentemente bajas pero sin experiencia en manejo de excepciones, escalabilidad o seguridad antifraude.</div>
                  <div>Código difícil de mantener, sin documentación arquitectónica ni control estricto de tipos.</div>
                </div>
              </div>
              <div className="text-[#A9B7C4]/70 pt-2 border-t border-[#3B4B5C]/60">
                Resultado: Deuda técnica y reescrituras costosas a los pocos meses.
              </div>
            </div>

            <div className="bg-[#3B4B5C]/40 p-4 rounded border border-[#C77B4B] flex flex-col justify-between">
              <div>
                <div className="text-white font-bold mb-2 flex items-center justify-between">
                  <span>EG Solutions</span>
                  <span className="w-2 h-2 rounded-full bg-[#C77B4B]" />
                </div>
                <div className="text-white/90 space-y-2 mb-4 leading-relaxed">
                  <div>Interlocución técnica directa con Elier Garcia: quien evalúa la viabilidad es quien diseña la base de datos y escribe el código.</div>
                  <div>Rigor de ingeniería en presupuestos, plazos realistas y arquitecturas sostenibles en el tiempo.</div>
                </div>
              </div>
              <div className="text-[#C77B4B] pt-2 border-t border-[#3B4B5C] font-semibold">
                Resultado: Software en producción, sin intermediarios ni sobrecostes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
