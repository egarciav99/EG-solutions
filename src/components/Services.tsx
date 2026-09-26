import { SERVICE_LINES } from '../data/services';
import { Layers, Workflow, Sparkles, Check } from 'lucide-react';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

const ICONS: Record<string, typeof Layers> = {
  'plataformas-web': Layers,
  automatizaciones: Workflow,
  'agentes-ia': Sparkles,
};

export function Services({ onSelectServiceForInquiry }: ServicesProps) {
  return (
    <section className="relative py-20 sm:py-24 bg-near-white overflow-hidden" id="servicios">
      <CircuitBackground layout={secondaryCircuitLayout} flip={true} opacity={0.08} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">Qué puedo hacer por tu negocio</h1>
          <p className="text-lg text-mid-gray leading-relaxed">
            Tres formas de quitarte trabajo manual. El código es tuyo y el alcance queda por escrito antes de empezar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICE_LINES.map((service) => {
            const Icon = ICONS[service.id] ?? Layers;
            return (
              <article key={service.id} className="bg-white rounded-xl p-7 shadow-xs ring-1 ring-steel/40 flex flex-col">
                <div className="w-11 h-11 rounded-lg bg-copper/10 text-copper flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-bold text-navy mb-3">{service.title}</h2>
                <p className="text-base text-mid-gray leading-relaxed mb-6">{service.summary}</p>
                <ul className="space-y-3 mb-8 list-none p-0">
                  {service.examples.map((example) => (
                    <li key={example} className="flex gap-3 text-sm text-navy leading-relaxed">
                      <Check className="w-4 h-4 text-copper shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onSelectServiceForInquiry(service.inquiry)}
                  className="mt-auto w-full bg-navy hover:bg-slate text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                  id={`service-cta-${service.id}`}
                >
                  {service.cta}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
