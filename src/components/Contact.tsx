import { useState, FormEvent } from 'react';
import { Mail, Check, Copy, Clock, Globe } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactProps {
  initialService?: string;
  initialProjectContext?: string;
}

export function Contact({ initialService = '', initialProjectContext = '' }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    serviceCategory: initialService || 'Plataformas Web',
    details: initialProjectContext ? `Hola Elier, me gustaría consultar un proyecto con requerimientos similares a: ${initialProjectContext}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = 'eliergv.99@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;

    setIsSubmitting(true);
    // Simular procesamiento y confirmación transparente
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <section className="py-20 bg-[#F6F7F8]" id="contacto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B3242] tracking-tight mb-4">
            Iniciar conversación de proyecto
          </h2>
          <p className="text-base text-[#7A828C] leading-relaxed">
            Sin formularios interminables ni llamadas comerciales con intermediarios. Cuéntame brevemente qué problema necesitas resolver y recibirás una respuesta técnica fundamentada en menos de 24 horas laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Formulario de contacto directo */}
          <div className="lg:col-span-7 bg-white border border-[#3B4B5C] rounded-lg p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#3B4B5C] text-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#2B3242]">
                  Mensaje recibido correctamente
                </h3>
                <p className="text-sm text-[#2B3242]/85 max-w-md mx-auto leading-relaxed">
                  Gracias por contactar, {formData.name}. He recibido tus notas sobre <strong>{formData.serviceCategory}</strong>. Revisaré la viabilidad técnica y te escribiré a <strong>{formData.email}</strong> con una estimación previa y preguntas de clarificación.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        serviceCategory: 'Plataformas Web',
                        details: '',
                      });
                    }}
                    className="text-xs font-semibold text-[#3B4B5C] underline underline-offset-4 hover:text-[#2B3242]"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="direct-contact-form">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-[#2B3242] mb-1.5">
                    Tu nombre o el de tu empresa
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza / Estudio Bahl"
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-[#A9B7C4] focus:border-[#3B4B5C] focus:ring-1 focus:ring-[#3B4B5C] focus:outline-none bg-white text-[#2B3242]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-[#2B3242] mb-1.5">
                    Correo electrónico de contacto
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nombre@empresa.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-[#A9B7C4] focus:border-[#3B4B5C] focus:ring-1 focus:ring-[#3B4B5C] focus:outline-none bg-white text-[#2B3242]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-xs font-bold text-[#2B3242] mb-1.5">
                    Línea de servicio principal
                  </label>
                  <select
                    id="contact-service"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-[#A9B7C4] focus:border-[#3B4B5C] focus:ring-1 focus:ring-[#3B4B5C] focus:outline-none bg-white text-[#2B3242]"
                  >
                    <option value="Plataformas Web">Plataformas Web a medida (cotizadores, reservas, paneles)</option>
                    <option value="Automatizaciones">Automatizaciones de Procesos (n8n, APIs, documentos)</option>
                    <option value="Agentes de IA">Agentes de IA y LLM (RAG, extracción, validación)</option>
                    <option value="Proyecto Híbrido">Proyecto Híbrido (Web + Automatizaciones + IA)</option>
                    <option value="Auditoría / Consulta">Auditoría técnica o consulta previa</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-xs font-bold text-[#2B3242] mb-1.5">
                    ¿Qué problema u oportunidad deseas resolver?
                  </label>
                  <textarea
                    id="contact-details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe el contexto actual, qué herramientas usas y qué resultado operativo buscas alcanzar."
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-[#A9B7C4] focus:border-[#3B4B5C] focus:ring-1 focus:ring-[#3B4B5C] focus:outline-none bg-white text-[#2B3242]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#3B4B5C] hover:bg-[#2B3242] text-white text-sm font-semibold py-3 px-4 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B] disabled:opacity-50"
                    id="submit-inquiry-btn"
                  >
                    {isSubmitting ? 'Procesando mensaje...' : 'Enviar consulta a Elier Garcia'}
                  </button>
                  <p className="text-[11px] text-[#7A828C] text-center mt-2.5">
                    Sin compromisos comerciales. Recibirás respuesta técnica directa de Elier.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Información complementaria y canales directos */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tarjeta de contacto directo */}
            <div className="bg-white border border-[#A9B7C4] rounded-lg p-6">
              <h3 className="text-base font-bold text-[#2B3242] mb-3">
                Canales de comunicación directa
              </h3>

              <div className="space-y-4 text-xs text-[#2B3242]">
                <div className="p-3 bg-[#F6F7F8] rounded border border-[#A9B7C4]/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#3B4B5C]" />
                    <span className="font-medium">{directEmail}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-[#7A828C] hover:text-[#2B3242] rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3B4B5C]"
                    title="Copiar correo"
                    aria-label="Copiar correo electrónico"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-[#3B4B5C]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-start gap-2.5 text-[#2B3242]/90">
                  <Clock className="w-4 h-4 text-[#3B4B5C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#2B3242]">Tiempo de respuesta habitual:</span>
                    <span>Menos de 24 horas en días laborables. Si tu solicitud es urgente por un lanzamiento en curso, indícalo en el mensaje.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[#2B3242]/90">
                  <Globe className="w-4 h-4 text-[#3B4B5C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#2B3242]">Zonas horarias de atención:</span>
                    <span>España (CET / UTC+1/2) y México (CST / UTC-6). Coordinación de llamadas sincronizada según tu país.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso de presupuesto y alcance */}
            <div className="bg-[#2B3242] text-white rounded-lg p-6 border border-[#3B4B5C]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C77B4B]" />
                <h4 className="text-xs font-bold uppercase tracking-wide text-[#A9B7C4]">
                  Compromiso de transparencia
                </h4>
              </div>
              <p className="text-xs text-white/90 leading-relaxed">
                Toda propuesta incluye un desglose explícito de hitos de entrega, condiciones de pago vinculadas a entregables tangibles y delimitación estricta entre el alcance contratado y solicitudes posteriores. Cero sorpresas de facturación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
