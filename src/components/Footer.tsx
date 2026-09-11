import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#A9B7C4]/40 bg-[#2B3242] text-[#A9B7C4] py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#3B4B5C]">
          <div className="md:col-span-6 space-y-3">
            <div className="brightness-125">
              <Logo size="md" />
            </div>
            <p className="text-xs text-[#A9B7C4] max-w-md leading-relaxed">
              Estudio técnico unipersonal de software e inteligencia artificial liderado por Elier Garcia. Soluciones pragmáticas, código tipado y arquitecturas documentadas para pequeños negocios y marcas en España y México.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2">Secciones</div>
            <div>
              <button
                onClick={() => onNavigate('servicios')}
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Líneas de servicio
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('proyectos')}
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Casos de éxito reales
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('diferencial')}
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Perfil y rigor de ingeniería
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('contacto')}
                className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
              >
                Iniciar consulta
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-semibold text-white mb-2">Contacto directo</div>
            <div className="text-white/90">eliergv.99@gmail.com</div>
            <div className="text-[#A9B7C4]">Soporte técnico y desarrollo activo</div>
            <div className="text-[#A9B7C4] flex items-center gap-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-[#C77B4B]" />
              <span>Clientes en España y México</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A828C]">
          <div>
            © {currentYear} EG Solutions. Todos los derechos reservados.
          </div>
          <div>
            Ingeniería eléctrica aplicada al desarrollo de software y agentes de IA.
          </div>
        </div>
      </div>
    </footer>
  );
}
