import { useState } from 'react';
import { SERVICE_LINES } from '../data/services';
import { Check, Layers, Cpu, Workflow } from 'lucide-react';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceName: string) => void;
}

export function Services({ onSelectServiceForInquiry }: ServicesProps) {
  const [activeTab, setActiveTab] = useState<string>('plataformas-web');

  return (
    <section className="py-20 border-b border-[#A9B7C4]/30 bg-[#F6F7F8]" id="servicios">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Encabezado sin eyebrow mayúscula ni frase vacía */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B3242] tracking-tight mb-4">
            Líneas de servicio especializadas
          </h2>
          <p className="text-base text-[#7A828C] leading-relaxed">
            Tres áreas de intervención técnica con entregables concretos, especificación detallada y código propietario. Sin dependencias opacas ni costes recurrentes forzados.
          </p>
        </div>

        {/* Presentación asimétrica con jerarquía visual real */}
        <div className="space-y-10">
          {/* Servicio 1: Plataformas Web a Medida (Bloque principal destacado) */}
          <div className="border border-[#3B4B5C] bg-white rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4B5C] mb-2">
                    <Layers className="w-4 h-4 text-[#3B4B5C]" />
                    <span>Desarrollo de software a medida</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#2B3242] mb-3">
                    Plataformas Web y Aplicaciones Operativas
                  </h3>
                  <p className="text-[#2B3242]/85 text-sm sm:text-base leading-relaxed mb-6">
                    Sitios y herramientas construidos con TypeScript, React y Node.js adaptados con precisión al flujo comercial de tu empresa: desde cotizadores con cálculo instantáneo hasta sistemas de reservas que bloquean inventario físico en tiempo real.
                  </p>
                </div>

                <div className="bg-[#F6F7F8] p-4 rounded border border-[#A9B7C4]/40 text-xs text-[#3B4B5C] mb-6">
                  <span className="font-semibold block mb-1 text-[#2B3242]">Garantía técnica de entrega:</span>
                  Código tipado en TypeScript, cero plantillas prefabricadas, carga inferior a 1 segundo y propiedad total del repositorio por parte del cliente.
                </div>

                <div>
                  <button
                    onClick={() => onSelectServiceForInquiry('Plataformas Web')}
                    className="inline-flex items-center justify-center bg-[#3B4B5C] hover:bg-[#2B3242] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B]"
                    id="service-cta-plataformas"
                  >
                    Consultar plataforma web
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#F6F7F8] p-6 rounded-md border border-[#A9B7C4]/50">
                <h4 className="text-sm font-bold text-[#2B3242] mb-4">
                  Entregables habituales en esta línea:
                </h4>
                <ul className="space-y-3">
                  {SERVICE_LINES[0].deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2B3242]">
                      <span className="mt-1 w-4 h-4 rounded-full bg-[#3B4B5C] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-[#A9B7C4]/40 text-xs text-[#7A828C]">
                  <span className="font-semibold text-[#2B3242] block mb-1">Para quién es idóneo:</span>
                  {SERVICE_LINES[0].bestFor}
                </div>
              </div>
            </div>
          </div>

          {/* Servicios 2 y 3 en estructura técnica dividida (Automatizaciones y Agentes IA) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Servicio 2: Automatizaciones */}
            <div className="border border-[#A9B7C4] bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4B5C] mb-2">
                  <Workflow className="w-4 h-4 text-[#3B4B5C]" />
                  <span>Integración de sistemas y n8n</span>
                </div>
                <h3 className="text-xl font-bold text-[#2B3242] mb-3">
                  Automatización de Procesos Empresariales
                </h3>
                <p className="text-[#2B3242]/85 text-sm leading-relaxed mb-5">
                  Conexión y orquestación de datos entre plataformas dispares mediante n8n, webhooks y APIs. Especializado en extracción automática de documentos (PDF, facturas, contratos) y sincronización contable.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-[#2B3242]">Casos de automatización directa:</div>
                  {SERVICE_LINES[1].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#2B3242]">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#3B4B5C] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3 bg-[#F6F7F8] rounded border border-[#A9B7C4]/40 text-xs text-[#7A828C] mb-4">
                  <span className="font-semibold text-[#2B3242] block mb-0.5">Control y tolerancia a fallos:</span>
                  {SERVICE_LINES[1].technicalDetails}
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry('Automatizaciones')}
                  className="w-full text-center border border-[#3B4B5C] hover:bg-[#3B4B5C]/10 text-[#2B3242] text-sm font-medium py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
                  id="service-cta-automatizaciones"
                >
                  Consultar automatización
                </button>
              </div>
            </div>

            {/* Servicio 3: Agentes de IA */}
            <div className="border border-[#A9B7C4] bg-white rounded-lg p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#3B4B5C] mb-2">
                  <Cpu className="w-4 h-4 text-[#C77B4B]" />
                  <span>IA aplicada y esquemas estructurados</span>
                </div>
                <h3 className="text-xl font-bold text-[#2B3242] mb-3">
                  Agentes de IA e Integración LLM
                </h3>
                <p className="text-[#2B3242]/85 text-sm leading-relaxed mb-5">
                  Implementación de modelos de lenguaje ajustados a reglas operativas estrictas: sistemas RAG sobre bases de conocimiento internas, extracción tipada y asistentes de consulta con control humano en puntos críticos.
                </p>

                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-[#2B3242]">Capacidades implementadas:</div>
                  {SERVICE_LINES[2].deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#2B3242]">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-[#C77B4B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3 bg-[#F6F7F8] rounded border border-[#A9B7C4]/40 text-xs text-[#7A828C] mb-4">
                  <span className="font-semibold text-[#2B3242] block mb-0.5">Cero alucinaciones sin supervisión:</span>
                  {SERVICE_LINES[2].technicalDetails}
                </div>

                <button
                  onClick={() => onSelectServiceForInquiry('Agentes de IA')}
                  className="w-full text-center border border-[#3B4B5C] hover:bg-[#3B4B5C]/10 text-[#2B3242] text-sm font-medium py-2.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
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
