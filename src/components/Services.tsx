import { SERVICE_LINES } from '../data/services';
import { Check, Layers, Cpu, Workflow } from 'lucide-react';
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
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mb-3">
                    Plataformas Web y Aplicaciones Operativas
                  </h3>
                  <p className="text-mid-gray text-sm sm:text-base leading-relaxed mb-6">
                    Aplicaciones en TypeScript, React y Node.js adaptadas al flujo comercial de tu empresa: cotizadores en tiempo real, reservas con inventario dinámico y paneles de gestión seguros.
                  </p>
                </div>

                <div className="bg-near-white p-4 rounded border border-steel/50 text-xs text-slate mb-6">
                  <span className="font-semibold block mb-1 text-navy">Garantía técnica de entrega:</span>
                  Código tipado, carga inferior a 1s, sin plantillas genéricas y propiedad total del repositorio.
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
                <h4 className="text-sm font-bold text-navy mb-4">
                  Entregables habituales en esta línea:
                </h4>
                <ul className="space-y-3">
                  {webPlatforms.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-navy">
                      <span className="mt-1 w-4 h-4 rounded-full bg-slate text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

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
                <h3 className="text-xl font-bold text-navy mb-3">
                  Automatización de Procesos Empresariales
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed mb-5">
                  Orquestación de flujos entre plataformas con n8n, webhooks y APIs. Extracción estructurada de documentos (PDF, facturas, contratos) y sincronización bidireccional de datos.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-navy">Casos de automatización directa:</div>
                  {automations.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-navy">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3 bg-near-white rounded border border-steel/40 text-xs text-mid-gray mb-4">
                  <span className="font-semibold text-navy block mb-0.5">Control y tolerancia a fallos:</span>
                  {automations.technicalDetails}
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
                <h3 className="text-xl font-bold text-navy mb-3">
                  Agentes de IA e Integración LLM
                </h3>
                <p className="text-mid-gray text-sm leading-relaxed mb-5">
                  Modelos de lenguaje sujetos a reglas operativas: RAG sobre bases de conocimiento, extracción estructurada con esquemas JSON y validación humana obligatoria.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-navy">Capacidades implementadas:</div>
                  {aiAgents.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-navy">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-copper shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3 bg-near-white rounded border border-steel/40 text-xs text-mid-gray mb-4">
                  <span className="font-semibold text-navy block mb-0.5">Cero alucinaciones sin supervisión:</span>
                  {aiAgents.technicalDetails}
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
