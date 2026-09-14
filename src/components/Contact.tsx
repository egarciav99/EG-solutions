import { useState, FormEvent } from 'react';
import { Mail, Check, Copy, Clock, Globe } from 'lucide-react';
import { ContactFormData } from '../types';
import { CONTACT_EMAIL, FOUNDER_NAME, RESPONSE_TIME, TIMEZONES } from '../data/constants';
import { secondaryCircuitLayout } from '../data/circuitLayouts';
import { CircuitBackground } from './CircuitBackground';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface ContactProps {
  initialService?: string;
  initialProjectContext?: string;
}

export function Contact({ initialService = '', initialProjectContext = '' }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    serviceCategory: initialService || 'Plataformas Web',
    details: initialProjectContext ? `Hola ${FOUNDER_NAME}, me gustaría consultar un proyecto con requerimientos similares a: ${initialProjectContext}` : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
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
    <section className="relative py-20 bg-near-white overflow-hidden" id="contacto">
      {/* Fondo de circuito impreso decorativo sin invertir */}
      <CircuitBackground layout={secondaryCircuitLayout} flip={false} opacity={0.10} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy tracking-tight mb-4">
            Iniciar conversación de proyecto
          </h2>
          <p className="text-base text-mid-gray leading-relaxed">
            Sin intermediarios ni llamadas comerciales. Describe el problema operativo y recibirás una respuesta técnica fundamentada en menos de 24 horas laborables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Formulario de contacto directo */}
          <div className="lg:col-span-7 bg-white border border-slate rounded-lg p-6 sm:p-8">
            {isSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate text-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Mensaje recibido correctamente
                </h3>
                <p className="text-sm text-navy/85 max-w-md mx-auto leading-relaxed">
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
                    className="text-xs font-semibold text-slate underline underline-offset-4 hover:text-navy"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="direct-contact-form">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-navy mb-1.5">
                    Tu nombre o el de tu empresa
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza / Estudio Bahl"
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-steel focus:border-slate focus:ring-1 focus:ring-slate focus:outline-none bg-white text-navy"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-navy mb-1.5">
                    Correo electrónico de contacto
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nombre@empresa.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-steel focus:border-slate focus:ring-1 focus:ring-slate focus:outline-none bg-white text-navy"
                  />
                </div>

                <div>
                  <label htmlFor="contact-service" className="block text-xs font-bold text-navy mb-1.5">
                    Línea de servicio principal
                  </label>
                  <select
                    id="contact-service"
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-steel focus:border-slate focus:ring-1 focus:ring-slate focus:outline-none bg-white text-navy"
                  >
                    <option value="Plataformas Web">Plataformas Web a medida (cotizadores, reservas, paneles)</option>
                    <option value="Automatizaciones">Automatizaciones de Procesos (n8n, APIs, documentos)</option>
                    <option value="Agentes de IA">Agentes de IA y LLM (RAG, extracción, validación)</option>
                    <option value="Proyecto Híbrido">Proyecto Híbrido (Web + Automatizaciones + IA)</option>
                    <option value="Auditoría / Consulta">Auditoría técnica o consulta previa</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-details" className="block text-xs font-bold text-navy mb-1.5">
                    ¿Qué problema u oportunidad deseas resolver?
                  </label>
                  <textarea
                    id="contact-details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Describe el contexto actual, qué herramientas usas y qué resultado operativo buscas alcanzar."
                    className="w-full text-sm px-3.5 py-2.5 rounded border border-steel focus:border-slate focus:ring-1 focus:ring-slate focus:outline-none bg-white text-navy"
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="contact-consent"
                    required
                    className="mt-1 w-4 h-4 accent-copper cursor-pointer"
                  />
                  <label htmlFor="contact-consent" className="text-xs text-mid-gray leading-relaxed">
                    Acepto que mis datos se usen para responder a esta consulta, según la{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-slate underline underline-offset-2 hover:text-navy focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate rounded cursor-pointer"
                    >
                      política de privacidad
                    </button>.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-copper hover:opacity-90 text-white text-sm font-medium py-3 px-4 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper disabled:opacity-50 cursor-pointer"
                    id="submit-inquiry-btn"
                  >
                    {isSubmitting ? 'Procesando mensaje...' : `Enviar consulta a ${FOUNDER_NAME}`}
                  </button>
                  <p className="text-[11px] text-mid-gray text-center mt-2.5">
                    Sin compromisos comerciales. Recibirás respuesta técnica directa de {FOUNDER_NAME}.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Información complementaria y canales directos */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tarjeta de contacto directo */}
            <div className="bg-white border border-steel/70 rounded-lg p-6 shadow-xs">
              <h3 className="text-base font-bold text-navy mb-3">
                Canales de comunicación directa
              </h3>

              <div className="space-y-4 text-xs text-navy">
                <div className="p-3 bg-near-white rounded border border-steel/50 flex items-center justify-between">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-2.5 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate rounded"
                  >
                    <Mail className="w-4 h-4 text-slate shrink-0" />
                    <span className="font-medium text-navy">{CONTACT_EMAIL}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-mid-gray hover:text-navy rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate cursor-pointer"
                    title="Copiar correo"
                    aria-label="Copiar correo electrónico"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-slate" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-start gap-2.5 text-mid-gray">
                  <Clock className="w-4 h-4 text-slate shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Tiempo de respuesta habitual:</span>
                    <span>{RESPONSE_TIME}. Si tu solicitud es urgente por un lanzamiento en curso, indícalo en el mensaje.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-mid-gray">
                  <Globe className="w-4 h-4 text-slate shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-navy">Zonas horarias de atención:</span>
                    <span>{TIMEZONES}. Coordinación de llamadas sincronizada según tu país.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Compromiso de presupuesto y alcance */}
            <div className="bg-navy text-white rounded-lg p-6 border border-slate shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-copper" />
                <h4 className="text-xs font-bold uppercase tracking-wide text-steel">
                  Compromiso de transparencia
                </h4>
              </div>
              <p className="text-xs text-near-white/85 leading-relaxed">
                Alcance, pagos y entregables definidos por escrito antes de empezar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </section>
  );
}
