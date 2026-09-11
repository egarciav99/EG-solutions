import { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export function Header({ onNavigate, onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#A9B7C4]/40 bg-[#F6F7F8]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] rounded-sm transition-opacity hover:opacity-90"
          id="brand-header-link"
          aria-label="EG Solutions inicio"
        >
          <Logo size="md" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
          <button
            onClick={() => handleNavClick('servicios')}
            className="text-sm font-medium text-[#2B3242] hover:text-[#3B4B5C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded"
            id="nav-link-servicios"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick('proyectos')}
            className="text-sm font-medium text-[#2B3242] hover:text-[#3B4B5C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded"
            id="nav-link-proyectos"
          >
            Casos de éxito
          </button>
          <button
            onClick={() => handleNavClick('diferencial')}
            className="text-sm font-medium text-[#2B3242] hover:text-[#3B4B5C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded"
            id="nav-link-diferencial"
          >
            Cómo trabajo
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="text-sm font-medium text-[#2B3242] hover:text-[#3B4B5C] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C] px-1 py-1 rounded"
            id="nav-link-contacto"
          >
            Contacto
          </button>
        </nav>

        {/* Right Action & Context */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-[#7A828C] border-r border-[#A9B7C4]/40 pr-4">
            <span className="w-2 h-2 rounded-full bg-[#C77B4B] inline-block" title="Activo" />
            <span>España y México</span>
          </div>

          <button
            onClick={onOpenConsultation}
            className="text-sm font-medium bg-[#3B4B5C] hover:bg-[#2B3242] text-white px-4 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C77B4B]"
            id="header-consultation-btn"
          >
            Consultar proyecto
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2B3242] hover:bg-[#A9B7C4]/20 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4B5C]"
            id="mobile-menu-toggle-btn"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#A9B7C4]/40 bg-[#F6F7F8] px-4 py-5 flex flex-col gap-4">
          <button
            onClick={() => handleNavClick('servicios')}
            className="text-left text-base font-medium text-[#2B3242] py-1.5"
            id="mobile-nav-servicios"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavClick('proyectos')}
            className="text-left text-base font-medium text-[#2B3242] py-1.5"
            id="mobile-nav-proyectos"
          >
            Casos de éxito
          </button>
          <button
            onClick={() => handleNavClick('diferencial')}
            className="text-left text-base font-medium text-[#2B3242] py-1.5"
            id="mobile-nav-diferencial"
          >
            Cómo trabajo
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="text-left text-base font-medium text-[#2B3242] py-1.5"
            id="mobile-nav-contacto"
          >
            Contacto
          </button>

          <div className="pt-3 border-t border-[#A9B7C4]/30 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-[#7A828C]">
              <span className="w-2 h-2 rounded-full bg-[#C77B4B] inline-block" />
              <span>Clientes en España y México</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center text-sm font-medium bg-[#3B4B5C] text-white py-2.5 rounded hover:bg-[#2B3242]"
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
