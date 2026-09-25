import { BRAND_NAME, FOUNDER_NAME, FOUNDER_ROLE, ACTIVE_REGIONS } from '../data/constants';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';
import { BLUEPRINT_STEPS } from '../data/blueprintSteps';
import { Compass, ShieldAlert, FileText } from 'lucide-react';

const TRAYECTORIA = [
  { when: '2026', title: 'Máster en Business Analytics & IA', detail: 'INESDI (UNIE). Mejor expediente de la promoción.' },
  { when: '2024 – 2025', title: 'Residente de obra eléctrica', detail: 'Data center de Microsoft (Querétaro) y nave de BMW Group (San Luis Potosí). Hasta 60 personas a cargo.' },
  { when: '2023 – 2024', title: 'Analista de presupuestos', detail: 'Ofertas técnicas para proyectos industriales, incluida una para Terex ganada y presentada en inglés.' },
  { when: 'Formación', title: 'Grado en Ingeniería Eléctrica', detail: 'TecNM Chihuahua.' },
];

const PRINCIPIOS = [
  {
    title: 'Pragmatismo técnico',
    text: 'La solución más simple y sostenible para el problema real, nunca la más compleja por lucimiento técnico.',
    Icon: Compass,
    copper: false,
  },
  {
    title: 'Supervisión humana en puntos críticos',
    text: 'IA acotada por esquemas tipados y respaldada por criterio humano antes de tocar datos reales.',
    Icon: ShieldAlert,
    copper: true,
  },
  {
    title: 'Alcance documentado y responsabilidad',
    text: 'Transparencia contractual y relaciones de largo plazo basadas en confianza técnica demostrada.',
    Icon: FileText,
    copper: false,
  },
];

const COMPARATIVA = [
  {
    title: 'Agencia',
    points: ['Equipo amplio y varios perfiles', 'Capacidad para proyectos grandes', 'Más capas entre tú y quien programa'],
    fit: 'Encaja si necesitas muchas manos a la vez o un servicio integral de marketing y desarrollo.',
    highlight: false,
  },
  {
    title: 'Freelance generalista',
    points: ['Rápido para encargos concretos', 'Precio ajustado', 'Menos foco en procesos y datos del negocio'],
    fit: 'Encaja para webs sencillas o cambios puntuales.',
    highlight: false,
  },
  {
    title: BRAND_NAME,
    points: [`Hablas directamente con ${FOUNDER_NAME}`, 'Presupuesto por escrito antes de empezar', 'Código tipado, documentado y tuyo'],
    fit: 'Encaja si quieres automatizar procesos o unir web, datos e IA con alguien que entienda la operación.',
    highlight: true,
  },
];

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

        {/* Sobre mí */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16" id="sobre-mi">
          <div className="lg:col-span-7 bg-white border border-steel/70 rounded-lg p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-navy mb-4">Sobre mí</h3>
            <div className="space-y-4 text-sm sm:text-base text-mid-gray leading-relaxed">
              <p>
                Soy {FOUNDER_NAME}, ingeniero eléctrico. Antes de dedicarme al software dirigí obra eléctrica: en un data center de Microsoft en Querétaro pasé en seis meses de recién llegado a responsable del frente, coordinando hasta 60 personas, y en una nave de BMW Group en San Luis Potosí monté un sistema propio para seguir el material de obra.
              </p>
              <p>
                Antes fui analista de presupuestos, donde preparé y presenté en inglés la oferta de un proyecto industrial para Terex que acabamos ganando. En 2026 terminé el Máster en Business Analytics &amp; IA en INESDI con el mejor expediente de la promoción, y hoy desarrollo software desde Madrid con {BRAND_NAME}.
              </p>
              <p>
                De la obra me traje la forma de trabajar: alcance claro antes de empezar, plazos realistas y puntos de control donde un error sale caro. En software, esos puntos de control son la revisión humana en los flujos con IA.
              </p>
            </div>
          </div>
        </div>

          <div className="lg:col-span-5 bg-navy text-white border border-slate rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate">
              <div className="w-11 h-11 rounded bg-slate border border-steel/40 flex items-center justify-center text-steel font-bold text-sm">
                EG
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{FOUNDER_NAME}</h3>
                <p className="text-xs text-steel">{FOUNDER_ROLE}</p>
              </div>
              <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
              <p className="text-sm text-mid-gray leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

            <ol className="space-y-4 list-none p-0 m-0 text-sm">
              {TRAYECTORIA.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-copper mt-1.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-steel">{item.when}</span>
                    <span className="block font-semibold text-white">{item.title}</span>
                    <span className="block text-xs text-near-white/75 leading-relaxed">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 pt-4 border-t border-slate grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="font-semibold text-white block">Localización:</span>
                <span className="text-steel">Madrid · clientes en {ACTIVE_REGIONS}</span>
              </div>
              <div>
                <span className="font-semibold text-white block">Idiomas:</span>
                <span className="text-steel">Español nativo · Inglés B2</span>
              </div>
            </div>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0 m-0">
            {BLUEPRINT_STEPS.map((step) => (
              <li
                key={step.id}
                className={`rounded-lg p-5 sm:p-6 shadow-xs border ${
                  step.isCritical ? 'bg-navy text-white border-copper' : 'bg-white border-steel/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold text-copper">
                    Paso {step.id + 1}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      step.isCritical ? 'bg-copper/20 text-copper' : 'bg-near-white border border-steel/40 text-slate'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>
                <h4 className={`text-base font-bold mb-2 ${step.isCritical ? 'text-white' : 'text-navy'}`}>{step.title}</h4>
                <p className={`text-sm leading-relaxed mb-3 ${step.isCritical ? 'text-near-white/85' : 'text-mid-gray'}`}>{step.desc}</p>
                <p className={`text-xs leading-relaxed pt-3 border-t ${step.isCritical ? 'text-steel border-slate' : 'text-slate border-steel/40'}`}>
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Principios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {PRINCIPIOS.map(({ title, text, Icon, copper }) => (
            <div key={title} className="bg-white border border-steel/70 rounded-lg p-5 sm:p-6 shadow-xs">
              <div className={`w-9 h-9 rounded bg-near-white border border-steel/40 flex items-center justify-center mb-3 ${copper ? 'text-copper' : 'text-slate'}`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-navy mb-2">{title}</h3>
              <p className="text-sm text-mid-gray leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* El método, paso a paso */}
        <div className="mb-16" id="metodo">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-navy tracking-tight mb-2">El método, paso a paso</h3>
            <p className="text-base text-mid-gray leading-relaxed">
              Cuatro fases en cada proyecto. La revisión humana está marcada porque es donde la IA puede equivocarse.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5 list-none p-0 m-0">
            {BLUEPRINT_STEPS.map((step) => (
              <li
                key={step.id}
                className={`rounded-lg p-5 sm:p-6 shadow-xs border ${
                  step.isCritical ? 'bg-navy text-white border-copper' : 'bg-white border-steel/70'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-semibold text-copper">
                    Paso {step.id + 1}
                  </span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                      step.isCritical ? 'bg-copper/20 text-copper' : 'bg-near-white border border-steel/40 text-slate'
                    }`}
                  >
                    {step.tag}
                  </span>
                </div>
                <h4 className={`text-base font-bold mb-2 ${step.isCritical ? 'text-white' : 'text-navy'}`}>{step.title}</h4>
                <p className={`text-sm leading-relaxed mb-3 ${step.isCritical ? 'text-near-white/85' : 'text-mid-gray'}`}>{step.desc}</p>
                <p className={`text-xs leading-relaxed pt-3 border-t ${step.isCritical ? 'text-steel border-slate' : 'text-slate border-steel/40'}`}>
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Comparativa: cuándo encaja cada forma de trabajar */}
        <div className="bg-navy text-white rounded-lg p-6 sm:p-8 border border-slate shadow-xs">
          <h3 className="text-lg font-bold text-white mb-2">
            ¿Con quién te conviene trabajar?
          </h3>
          <p className="text-xs sm:text-sm text-steel mb-6 max-w-2xl">
            Cada opción tiene su sitio. Esta comparativa sirve para ver si {BRAND_NAME} encaja con lo que necesitas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {COMPARATIVA.map(({ title, points, fit, highlight }) => (
              <div
                key={title}
                className={`p-4 rounded border flex flex-col justify-between ${highlight ? 'bg-slate/50 border-copper' : 'bg-slate/30 border-slate'}`}
              >
                <div>
                  <div className={`mb-3 flex items-center justify-between ${highlight ? 'text-white font-bold' : 'text-steel font-semibold'}`}>
                    <span>{title}</span>
                    {highlight && <span className="w-2 h-2 rounded-full bg-copper" />}
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {points.map((point) => (
                      <span
                        key={point}
                        className={`px-2.5 py-1.5 rounded border font-medium ${highlight ? 'bg-slate/60 border-copper/40 text-white' : 'bg-slate/40 border-slate/60 text-near-white/90'}`}
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`pt-2 border-t border-slate ${highlight ? 'text-copper font-semibold' : 'text-steel/80'}`}>
                  {fit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
