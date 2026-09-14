import { SERVICE_LINES } from '../data/services';
import { Layers, Cpu, Workflow, Clock, ShieldCheck, FileCheck } from 'lucide-react';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export function Services({ onSelectServiceForInquiry }: ServicesProps) {
  const webPlatforms = SERVICE_LINES.find((s) => s.id === 'plataformas-web') ?? SERVICE_LINES[0];
  const automations = SERVICE_LINES.find((s) => s.id === 'automatizaciones') ?? SERVICE_LINES[1];
  const aiAgents = SERVICE_LINES.find((s) => s.id === 'agentes-ia') ?? SERVICE_LINES[2];

  return (
    <section className="relative py-20 border-b border-steel/30 bg-near-white overflow-hidden" id="servicios">
      {/* Fondo de circuito impreso decorativo invertido */}
      <CircuitBackground layout={secondaryCircuitLayout} flip={true} opacity={0.10} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encabezado sin eyebrow mayúscula ni frase vacía */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-4">
            Líneas de servicio especializadas
          </h2>
          <p className="text-base text-mid-gray leading-relaxed">
            Tres áreas de intervención técnica con entregables concretos, especificación detallada y código propietario. Sin dependencias opacas ni costes recurrentes forzados.
          </p>
        </div>

        {/* Presentación estructurada con detalle cobre puntual y fondo blanco */}
        <div className="space-y-10">
          {/* Servicio 1: Plataformas Web a Medida (Bloque principal destacado) */}
          <div className="border border-steel/70 border-t-2 border-t-copper bg-white rounded-lg p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate mb-2">
                    <div className="w-7 h-7 rounded bg-near-white border border-steel/40 flex items-center justify-center text-slate">
                      <Layers className="w-4 h-4 text-slate" />
                    </div>
                    <span>Desarrollo de software a medida</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mb-5 border-l border-l-transparent pl-0">
                    Plataformas Web y Aplicaciones Operativas
                  </h3>
                </div>

                <div className="bg-near-white p-4 rounded border border-steel/50 mb-6 flex items-center gap-3">
                  <div className="p-2 rounded bg-white border border-steel/40 text-copper shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-navy block mb-0.5">Carga inferior a 1 segundo</span>
                    <span className="text-mid-gray">Código tipado, sin plantillas y propiedad total.</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => onSelectServiceForInquiry('Plataformas Web')}
                    className="inline-flex items-center justify-center bg-copper hover:opacity-90 text-white text-sm font-medium px-5 py-2.5 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer"
                    id="service-cta-plataformas"
                  >
                    Consultar plataforma web
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 bg-near-white p-6 rounded border border-steel/50">
                <h4 className="text-sm font-bold text-navy mb-4 border-l border-l-transparent pl-0">
                  Entregables habituales en esta línea:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {webPlatforms.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded border border-steel/40 text-xs text-navy font-medium leading-snug flex items-center"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-steel/40 text-xs text-mid-gray">
                  <span className="font-semibold text-navy block mb-1">Para quién es idóneo:</span>
                  {webPlatforms.bestFor}
                </div>
              </div>
            </div>
          </div>

          {/* Servicios 2 y 3 en estructura técnica dividida (Automatizaciones y Agentes IA) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Servicio 2: Automatizaciones */}
            <div className="border border-steel/70 border-t-2 border-t-copper bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate mb-2">
                  <div className="w-7 h-7 rounded bg-near-white border border-steel/40 flex items-center justify-center text-slate">
                    <Workflow className="w-4 h-4 text-slate" />
                  </div>
                  <span>Integración de sistemas y n8n</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-5 border-l border-l-transparent pl-0">
                  Automatización de Procesos Empresariales
                </h3>

                <div className="mb-6">
                  <div className="text-xs font-bold text-navy mb-3">Casos de automatización directa:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {automations.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-near-white rounded border border-steel/40 text-xs text-navy font-medium leading-snug flex items-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-3.5 bg-near-white rounded border border-steel/40 flex items-center gap-3 mb-4">
                  <div className="p-1.5 rounded bg-white border border-steel/40 text-slate shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium text-navy">
                    Trazabilidad completa con reintentos exponenciales
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry('Automatizaciones')}
                  className="w-full text-center border border-slate bg-transparent hover:bg-slate/5 text-navy text-sm font-medium py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id="service-cta-automatizaciones"
                >
                  Consultar automatización
                </button>
              </div>
            </div>

            {/* Servicio 3: Agentes de IA */}
            <div className="border border-steel/70 border-t-2 border-t-copper bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate mb-2">
                  <div className="w-7 h-7 rounded bg-near-white border border-steel/40 flex items-center justify-center text-slate">
                    <Cpu className="w-4 h-4 text-slate" />
                  </div>
                  <span>IA aplicada y esquemas estructurados</span>
                </div>
                <h3 className="text-xl font-bold text-navy mb-5 border-l border-l-transparent pl-0">
                  Agentes de IA e Integración LLM
                </h3>

                <div className="mb-6">
                  <div className="text-xs font-bold text-navy mb-3">Capacidades implementadas:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {aiAgents.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-near-white rounded border border-steel/40 text-xs text-navy font-medium leading-snug flex items-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="p-3.5 bg-near-white rounded border border-steel/40 flex items-center gap-3 mb-4">
                  <div className="p-1.5 rounded bg-white border border-steel/40 text-copper shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-medium text-navy">
                    Validación humana con esquemas JSON
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry('Agentes de IA')}
                  className="w-full text-center border border-slate bg-transparent hover:bg-slate/5 text-navy text-sm font-medium py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer"
                  id="service-cta-agentes-ia"
                >
                  Consultar agentes de IA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
