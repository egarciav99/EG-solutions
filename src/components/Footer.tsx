import { Logo } from './Logo';
import { CONTACT_EMAIL } from '../data/constants';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#A9B7C4]/30 bg-[#3B4B5C] text-[#A9B7C4] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#A9B7C4]/20">
          <div className="md:col-span-6 space-y-4">
            <div>
              <Logo size="md" variant="on-dark" showTagline={true} />
            </div>
            <p className="text-xs text-[#A9B7C4] max-w-md leading-relaxed">
              Estudio boutique de Web Intelligence & Automation liderado por Elier Garcia. Plataformas web a medida, orquestación de procesos con n8n e integraciones de agentes de IA con rigor de ingeniería y supervisión humana.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2 tracking-wide">Navegación</div>
            <nav aria-label="Navegación del pie de página">
              <ul className="space-y-2 list-none p-0 m-0">
                <li>
                  <button
                    onClick={() => onNavigate('servicios')}
                    className="text-[#A9B7C4] hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Líneas de servicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('proyectos')}
                    className="text-[#A9B7C4] hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Casos de éxito reales
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('diferencial')}
                    className="text-[#A9B7C4] hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Cómo trabajo (Rigor técnico)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contacto')}
                    className="text-[#A9B7C4] hover:text-white transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
                  >
                    Iniciar consulta directa
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2 tracking-wide">Contacto directo</div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white font-medium block hover:text-[#C77B4B] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <div className="text-[#A9B7C4]">Estudio unipersonal · Sin intermediarios</div>
            <div className="text-[#A9B7C4] flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#C77B4B]" />
              <span>Clientes en España y México</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9B7C4]/80">
          <div>
            © {currentYear} EG Solutions. Plataformas Web · Automatizaciones · Agentes IA.
          </div>
          <div>
            Web Intelligence & Automation · Elier Garcia
          </div>
        </div>
      </div>
    </footer>
  );
}