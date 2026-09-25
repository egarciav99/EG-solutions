import { ArrowRight } from 'lucide-react';
import { SERVICE_LINES } from '../data/services';
import { CASE_STUDIES } from '../data/projects';
import { BLUEPRINT_STEPS } from '../data/blueprintSteps';
import { PageLink } from './PageLink';
import type { PageId } from '../router';

interface HomePreviewsProps {
  onNavigate: (pageId: PageId) => void;
}

function SeeMore({ label, to, onNavigate, id }: { label: string; to: PageId; onNavigate: (id: PageId) => void; id: string }) {
  return (
    <PageLink
      to={to}
      onNavigate={onNavigate}
      id={id}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-copper hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded cursor-pointer"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </PageLink>
  );
}

/** Resumen de cada página en la portada: lo esencial, con enlace al detalle. */
export function HomePreviews({ onNavigate }: HomePreviewsProps) {
  const featured = CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((c) => c.id !== featured.id).slice(0, 2);

  return (
    <>
      {/* Servicios */}
      <section className="py-16 border-b border-steel/30 bg-near-white" id="resumen-servicios">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">Qué hago</h2>
              <p className="text-base text-mid-gray leading-relaxed">
                Tres líneas de trabajo, pensadas para negocios que necesitan resultados concretos, no herramientas genéricas.
              </p>
            </div>
            <SeeMore label="Ver servicios en detalle" to="servicios" onNavigate={onNavigate} id="home-ver-servicios" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICE_LINES.map((s) => (
              <PageLink
                key={s.id}
                to="servicios"
                onNavigate={onNavigate}
                className="block text-left bg-white border border-steel/60 rounded-lg p-6 shadow-xs hover:border-slate transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
              >
                <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed">{s.summary}</p>
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-16 border-b border-steel/30 bg-[#F6F7F8]" id="resumen-proyectos">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">Proyectos</h2>
              <p className="text-base text-mid-gray leading-relaxed">
                Productos propios, automatizaciones en uso y proyectos para clientes, cada uno con su estado real.
              </p>
            </div>
            <SeeMore label={`Ver los ${CASE_STUDIES.length} proyectos`} to="proyectos" onNavigate={onNavigate} id="home-ver-proyectos" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[featured, ...others].map((c, idx) => (
              <PageLink
                key={c.id}
                to="proyectos"
                onNavigate={onNavigate}
                className={`block text-left rounded-lg p-6 shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer ${
                  idx === 0 ? 'bg-navy text-white border border-slate hover:border-copper' : 'bg-white border border-steel/60 hover:border-slate'
                }`}
              >
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-3 ${
                    idx === 0 ? 'bg-copper text-white' : 'bg-near-white border border-steel/40 text-slate'
                  }`}
                >
                  {c.scaleLabel}
                </span>
                <h3 className={`text-lg font-bold mb-2 ${idx === 0 ? 'text-white' : 'text-navy'}`}>{c.name}</h3>
                <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-near-white/85' : 'text-mid-gray'}`}>{c.summary}</p>
              </PageLink>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="py-16 border-b border-steel/30 bg-near-white" id="resumen-como-trabajo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-2">Cómo trabajo</h2>
              <p className="text-base text-mid-gray leading-relaxed">
                Un método de cuatro pasos, con revisión humana donde la IA puede equivocarse.
              </p>
            </div>
            <SeeMore label="Ver el método completo" to="diferencial" onNavigate={onNavigate} id="home-ver-metodo" />
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 m-0">
            {BLUEPRINT_STEPS.map((step) => (
              <li key={step.id} className="bg-white border border-steel/60 rounded-lg p-5 shadow-xs">
                <span className="text-xs font-semibold text-copper">Paso {step.id + 1} · {step.tag}</span>
                <h3 className="text-base font-bold text-navy mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-mid-gray leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="py-16 bg-navy text-white" id="resumen-contacto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">¿Tienes un proceso que te quita horas?</h2>
            <p className="text-base text-near-white/80 leading-relaxed">
              Cuéntamelo en unas líneas y te respondo en menos de 24 horas laborables con una primera propuesta.
            </p>
          </div>
          <PageLink
            to="contacto"
            onNavigate={onNavigate}
            id="home-cta-contacto"
            className="shrink-0 bg-copper hover:opacity-90 text-white text-base font-medium px-6 py-3 rounded transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
          >
            Consultar proyecto
          </PageLink>
        </div>
      </section>
    </>
  );
}
