import { useState } from 'react';
import { Logo } from './Logo';
import { CONTACT_EMAIL } from '../data/constants';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-steel/30 bg-slate text-steel py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-steel/20">
          <div className="md:col-span-6 space-y-4">
            <div>
              <Logo size="md" variant="on-dark" showTagline={true} />
            </div>
            <p className="text-xs text-steel max-w-md leading-relaxed">
              Práctica independiente liderada por Elier Garcia. Plataformas web a medida, orquestación de procesos con n8n e integraciones de agentes de IA con rigor de ingeniería y supervisión humana.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2 tracking-wide">Navegación</div>
            <nav aria-label="Navegación del pie de página">
              <ul className="space-y-2 list-none p-0 m-0">
                <li>
                  <button
                    onClick={() => onNavigate('servicios')}
                    className="text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Líneas de servicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('proyectos')}
                    className="text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Proyectos y propuestas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('diferencial')}
                    className="text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Cómo trabajo (Rigor técnico)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contacto')}
                    className="text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Iniciar consulta directa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-steel hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Política de privacidad
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2 tracking-wide">Contacto directo</div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white font-medium block hover:text-copper transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="text-steel">Práctica independiente · Sin intermediarios</div>
            <div className="text-steel flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-copper" />
              <span>Clientes en España y México</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-steel/80">
          <div>
            © {currentYear} EG Solutions. Plataformas Web · Automatizaciones · Agentes IA.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-steel">
              Programa de aceleración respaldado por mentorDay
            </span>
            <a
              href="https://mentorday.es/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded"
              aria-label="Beca aprobada por mentorDay — visitar mentorday.es"
            >
              <img
                src="/sello-mentorday.png"
                alt="Sello de beca aprobada por mentorDay"
                className="h-16 w-auto"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>

      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </footer>
  );
}
