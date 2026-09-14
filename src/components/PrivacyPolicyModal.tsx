import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CONTACT_EMAIL, FOUNDER_NAME } from '../data/constants';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      lastActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy/70 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="bg-white rounded-lg border border-steel/60 max-w-2xl w-full p-6 sm:p-8 shadow-md relative">
        <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-steel/30">
          <div>
            <h3 id="privacy-modal-title" className="text-xl sm:text-2xl font-bold text-navy">
              Política de Privacidad
            </h3>
            <p className="text-xs text-mid-gray mt-1">
              Última actualización: septiembre de 2026
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-1.5 rounded text-mid-gray hover:text-navy hover:bg-near-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate cursor-pointer shrink-0"
            aria-label="Cerrar política de privacidad"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto pr-1 sm:pr-2 space-y-6 text-sm text-navy">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              1. Responsable del tratamiento
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              {FOUNDER_NAME}, bajo la marca EG Solutions. Contacto:{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-slate underline hover:text-navy"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              2. Qué datos se recogen
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              Nombre, correo electrónico, categoría de servicio de interés y el detalle del proyecto que escribas en el formulario de contacto.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              3. Para qué se usan
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-navy leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                <span>Responder a tu consulta y evaluar la viabilidad técnica del proyecto.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                <span>
                  Clasificar automáticamente la consulta mediante un sistema de inteligencia artificial (Google Gemini) para priorizar tiempos de respuesta.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate shrink-0" />
                <span>Enviarte una confirmación de recepción.</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              4. Base legal
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              Tu consentimiento, otorgado al marcar la casilla del formulario de contacto.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              5. Dónde se almacenan los datos
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              Los datos se almacenan en Firebase (Google Cloud), en la región de la Unión Europea, y se procesan mediante servicios de Google bajo sus respectivos acuerdos de tratamiento de datos.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              6. Cuánto tiempo se conservan
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              Hasta 24 meses desde el último contacto, o hasta que se solicite su eliminación.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-mid-gray mb-1.5">
              7. Tus derechos
            </h4>
            <p className="text-xs sm:text-sm text-navy leading-relaxed">
              Puedes solicitar en cualquier momento acceder, rectificar o eliminar tus datos, así como oponerte a su tratamiento, escribiendo a{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-slate underline hover:text-navy"
              >
                {CONTACT_EMAIL}
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-steel/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-mid-gray hover:text-navy transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
