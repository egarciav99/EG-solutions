import { BRAND_NAME, FOUNDER_NAME, FOUNDER_ROLE, ACTIVE_REGIONS } from '../data/constants';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';
import { BLUEPRINT_STEPS } from '../data/blueprintSteps';
import { Check } from 'lucide-react';

const TRAYECTORIA = [
  { when: '2026', title: 'Máster en Business Analytics & IA', detail: 'INESDI (UNIE). Mejor expediente de la promoción.' },
  { when: '2024 – 2025', title: 'Residente de obra eléctrica', detail: 'Data center de Microsoft (Querétaro): responsable único del frente de exteriores, más de 60 personas. Planta de BMW Group (San Luis Potosí): requisiciones de casi todo el edificio.' },
  { when: '2023 – 2024', title: 'Analista de presupuestos', detail: 'Ofertas técnicas para proyectos industriales, incluida una para Terex ganada y presentada en inglés.' },
  { when: 'Formación', title: 'Grado en Ingeniería Eléctrica', detail: 'TecNM Chihuahua.' },
];

/** Cuándo encaja cada opción; la columna de EG Solutions recoge también los principios de trabajo. */
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
    points: [
      `Hablas directamente con ${FOUNDER_NAME}`,
      'Presupuesto por escrito antes de empezar',
      'La solución más simple que resuelva el problema real',
      'Revisión humana en los flujos con IA',
      'Código documentado y tuyo',
    ],
    fit: 'Encaja si quieres automatizar procesos o unir web, datos e IA con alguien que entienda la operación.',
    highlight: true,
  },
];

export function Differential() {
  return (
    <section className="relative py-20 sm:py-24 bg-near-white overflow-hidden" id="diferencial">
      <CircuitBackground layout={secondaryCircuitLayout} flip={true} opacity={0.08} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">Cómo trabajo</h1>
          <p className="text-lg text-mid-gray leading-relaxed">
            Ingeniería eléctrica aplicada al software: alcance claro, plazos realistas y control en los puntos donde un error sale caro.
          </p>
        </div>

        {/* Sobre mí + trayectoria */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20" id="sobre-mi">
          <div className="lg:col-span-7 bg-white rounded-xl p-7 sm:p-9 shadow-xs ring-1 ring-steel/40">
            <h2 className="text-xl font-bold text-navy mb-5">Sobre mí</h2>
            <div className="space-y-4 text-base text-mid-gray leading-relaxed">
              <p>
                Soy {FOUNDER_NAME}, ingeniero eléctrico. Antes del software dirigí obra eléctrica: en un data center de Microsoft en Querétaro pasé en seis meses de recién llegado a responsable único del frente de exteriores, con más de 60 personas, y en la ampliación de una planta de BMW Group en San Luis Potosí monté un sistema propio para seguir el material de obra que redujo los paros de suministro.
              </p>
              <p>
                En 2026 terminé el Máster en Business Analytics &amp; IA en INESDI con el mejor expediente de la promoción, y hoy desarrollo software desde Madrid con {BRAND_NAME}. De la obra me traje la forma de trabajar; en software, esos puntos de control son la revisión humana en los flujos con IA.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-navy text-white rounded-xl p-7 sm:p-9">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-lg bg-slate flex items-center justify-center text-steel font-bold text-sm">EG</div>
              <div>
                <p className="text-base font-bold text-white">{FOUNDER_NAME}</p>
                <p className="text-xs text-steel">{FOUNDER_ROLE}</p>
              </div>
            </div>
            <ol className="space-y-4 list-none p-0 m-0 text-sm">
              {TRAYECTORIA.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="w-2 h-2 rounded-full bg-copper mt-1.5 shrink-0" />
                  <div>
                    <span className="block text-xs text-steel">{item.when}</span>
                    <span className="block font-semibold text-white">{item.title}</span>
                    <span className="block text-xs text-near-white/70 leading-relaxed">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 pt-5 border-t border-slate text-xs text-steel">
              Madrid · clientes en {ACTIVE_REGIONS} · Español nativo, inglés B2
            </p>
          </div>
        </div>

        {/* Método */}
        <div className="mb-20" id="metodo">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-8">El método, en cuatro pasos</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
            {BLUEPRINT_STEPS.map((step) => (
              <li
                key={step.id}
                className={`rounded-xl p-6 ${step.isCritical ? 'bg-navy text-white' : 'bg-white shadow-xs ring-1 ring-steel/40'}`}
              >
                <span className="w-8 h-8 rounded-full bg-copper/15 text-copper text-sm font-bold flex items-center justify-center mb-4">
                  {step.id + 1}
                </span>
                <h3 className={`text-base font-bold mb-2 ${step.isCritical ? 'text-white' : 'text-navy'}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${step.isCritical ? 'text-near-white/80' : 'text-mid-gray'}`}>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Con quién te conviene trabajar (incluye los principios en la columna de EG Solutions) */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-3">¿Con quién te conviene trabajar?</h2>
          <p className="text-base text-mid-gray mb-8 max-w-2xl">Cada opción tiene su sitio. Así puedes ver si {BRAND_NAME} encaja con lo que necesitas.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMPARATIVA.map(({ title, points, fit, highlight }) => (
              <div
                key={title}
                className={`rounded-xl p-6 flex flex-col ${highlight ? 'bg-navy text-white ring-2 ring-copper' : 'bg-white shadow-xs ring-1 ring-steel/40'}`}
              >
                <h3 className={`text-base font-bold mb-4 ${highlight ? 'text-white' : 'text-navy'}`}>{title}</h3>
                <ul className="space-y-2.5 mb-6 list-none p-0">
                  {points.map((point) => (
                    <li key={point} className={`flex gap-2.5 text-sm ${highlight ? 'text-near-white' : 'text-mid-gray'}`}>
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? 'text-copper' : 'text-steel'}`} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <p className={`mt-auto pt-4 border-t text-sm ${highlight ? 'border-slate text-copper font-semibold' : 'border-steel/40 text-mid-gray'}`}>
                  {fit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
