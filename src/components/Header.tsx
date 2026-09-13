import { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { BRAND_NAME, BRAND_SUBTITLE, ACTIVE_REGIONS } from '../data/constants';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export function Header({ onNavigate, onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#A9B7C4]/40 bg-[#F6F7F8]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] rounded transition-opacity hover:opacity-95"
          id="brand-header-link"
          aria-label={`${BRAND_NAME} — ${BRAND_SUBTITLE}`}
        >
          <Logo size="md" showTagline={true} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block" aria-label="Navegación principal">
          <ul className="flex items-center gap-7 lg:gap-8 list-none p-0 m-0">
            <li>
              <button
                onClick={() => handleNavClick('servicios')}
                className="text-sm font-medium text-[#3B4B5C] hover:text-[#2B3242] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded cursor-pointer"
                id="nav-link-servicios"
              >
                Servicios
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('proyectos')}
                className="text-sm font-medium text-[#3B4B5C] hover:text-[#2B3242] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded cursor-pointer"
                id="nav-link-proyectos"
              >
                Casos de éxito
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('diferencial')}
                className="text-sm font-medium text-[#3B4B5C] hover:text-[#2B3242] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded cursor-pointer"
                id="nav-link-diferencial"
              >
                Cómo trabajo
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contacto')}
                className="text-sm font-medium text-[#3B4B5C] hover:text-[#2B3242] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded cursor-pointer"
                id="nav-link-contacto"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Action & Context */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#7A828C] border-r border-[#A9B7C4]/40 pr-4">
            <span className="w-2 h-2 rounded-full bg-[#C77B4B] inline-block" title="Activo" />
            <span>{ACTIVE_REGIONS}</span>
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-sm font-medium bg-[#C77B4B] hover:opacity-90 text-white px-4 py-2 rounded transition-opacity shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B] cursor-pointer"
            id="header-consultation-btn"
          >
            Consultar proyecto
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3B4B5C] hover:bg-[#A9B7C4]/20 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] cursor-pointer"
            id="mobile-menu-toggle-btn"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden border-t border-[#A9B7C4]/40 bg-[#F6F7F8] px-4 py-5 flex flex-col gap-4"
        >
          <nav aria-label="Navegación móvil">
            <ul className="flex flex-col gap-2 list-none p-0 m-0">
              <li>
                <button
                  onClick={() => handleNavClick('servicios')}
                  className="w-full text-left text-base font-medium text-[#3B4B5C] hover:text-[#2B3242] py-1.5 cursor-pointer"
                  id="mobile-nav-servicios"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('proyectos')}
                  className="w-full text-left text-base font-medium text-[#3B4B5C] hover:text-[#2B3242] py-1.5 cursor-pointer"
                  id="mobile-nav-proyectos"
                >
                  Casos de éxito
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('diferencial')}
                  className="w-full text-left text-base font-medium text-[#3B4B5C] hover:text-[#2B3242] py-1.5 cursor-pointer"
                  id="mobile-nav-diferencial"
                >
                  Cómo trabajo
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('contacto')}
                  className="w-full text-left text-base font-medium text-[#3B4B5C] hover:text-[#2B3242] py-1.5 cursor-pointer"
                  id="mobile-nav-contacto"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </nav>

          <div className="pt-3 border-t border-[#A9B7C4]/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-[#7A828C]">
              <span className="w-2 h-2 rounded-full bg-[#C77B4B] inline-block" />
              <span>Clientes en {ACTIVE_REGIONS}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center text-sm font-medium bg-[#C77B4B] text-white py-2.5 rounded hover:opacity-90 transition-opacity cursor-pointer"
              id="mobile-nav-consultation-btn"
            >
              Consultar proyecto
            </button>
          </div>
        </div>
      )}
    </header>
  );
}