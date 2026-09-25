import { PageLink } from './PageLink';
import { ArrowRight } from 'lucide-react';
import { BRAND_PILLARS, ACTIVE_REGIONS, LANGUAGES } from '../data/constants';
import { CASE_STUDIES } from '../data/projects';
import { heroCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

interface HeroProps {
  onConsultationClick: () => void;
  onExploreProjectsClick: () => void;
}

/** Flujo real del caso destacado (CoreIT), en cuatro pasos. */
const HERO_FLOW = [
  { title: 'Subes el PDF técnico', desc: 'El procedimiento tal como lo tienes hoy.' },
  { title: 'La IA extrae secciones, pasos y campos', desc: 'Dos extracciones en paralelo y un modelo que las audita.' },
  { title: 'Revisión humana antes de generar', desc: 'Corriges textos, campos y límites. Nada sale sin tu visto bueno.', isCritical: true },
  { title: 'Excel listo para capturar', desc: 'Hoja protegida con las celdas de captura desbloqueadas.' },
];

export function Hero({ onConsultationClick, onExploreProjectsClick }: HeroProps) {
  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-steel/30 overflow-hidden bg-near-white" id="top">
      {/* Fondo de cuadrícula técnica y circuito impreso inmediato para evitar retrasos en LCP */}
      <div className="absolute inset-0 pointer-events-none bg-blueprint-grid" aria-hidden="true" />
      <CircuitBackground layout={heroCircuitLayout} priority={true} />

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
              <PageLink
                to="contacto"
                onNavigate={() => onConsultationClick()}
                className="bg-copper hover:opacity-90 text-white text-base font-medium px-6 py-3 rounded transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper shadow-xs cursor-pointer"
                id="hero-iniciar-consulta-btn"
              >
                Iniciar consulta de proyecto
              </PageLink>
              <PageLink
                to="proyectos"
                onNavigate={() => onExploreProjectsClick()}
                className="border border-slate bg-transparent hover:bg-slate/5 text-navy text-base font-medium px-6 py-3 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                id="hero-ver-proyectos-btn"
              >
                Ver proyectos y propuestas
              </PageLink>
            </div>
          </div>

          {/* Columna derecha: producto propio destacado */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="bg-navy text-white rounded-lg p-5 sm:p-6 border border-slate shadow-sm">
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-copper shrink-0" />
                  <span className="text-xs font-semibold tracking-wide text-steel truncate">
                    PRODUCTO PROPIO · {featured.name.split(' — ')[0]}
                  </span>
                </div>
                <span className="text-xs text-steel/80 shrink-0">PDF → Excel</span>
              </div>

              <p className="text-sm text-near-white/85 leading-relaxed mb-4">
                Un procedimiento técnico en PDF convertido en una hoja de trabajo Excel, con una persona revisando antes de generar.
              </p>

              <ol className="space-y-3 mb-5 list-none p-0 m-0">
                {HERO_FLOW.map((step, idx) => (
                  <li
                    key={step.title}
                    className={`p-3 rounded flex items-start gap-3 border ${
                      step.isCritical ? 'bg-slate/70 border-copper' : 'bg-navy border-slate/80'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        step.isCritical ? 'bg-copper text-white' : 'bg-slate text-steel'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-bold text-white block">{step.title}</span>
                      <span className="text-xs text-steel leading-relaxed">{step.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <PageLink
                to="proyectos"
                onNavigate={() => onExploreProjectsClick()}
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium text-copper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded cursor-pointer"
                id="hero-ver-caso-destacado-btn"
              >
                Ver el caso completo
                <ArrowRight className="w-4 h-4" />
              </PageLink>
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
