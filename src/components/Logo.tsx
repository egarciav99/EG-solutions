export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export function Logo({ className = '', size = 'md', showSubtitle = true }: LogoProps) {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Monograma EG en acero azulado con trazas de circuito y nodo cobre */}
      <div className={`relative shrink-0 ${iconSizes[size]} rounded bg-[#2B3242] p-1.5 flex items-center justify-center border border-[#3B4B5C]`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Fondo sutil cepillado */}
          <rect width="100" height="100" rx="6" fill="#2B3242" />
          
          {/* Trazos de circuito impreso en acero claro */}
          <path
            d="M 15 25 L 35 25 L 45 35 L 75 35"
            stroke="#3B4B5C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 25 75 L 45 75 L 55 65 L 85 65"
            stroke="#3B4B5C"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="15" cy="25" r="3" fill="#A9B7C4" />
          <circle cx="85" cy="65" r="3" fill="#A9B7C4" />
          
          {/* Monograma E */}
          <path
            d="M 22 36 L 46 36 M 22 50 L 40 50 M 22 64 L 46 64 M 22 36 L 22 64"
            stroke="#A9B7C4"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Monograma G con traza conectora */}
          <path
            d="M 76 43 C 74 38 68 36 60 36 C 50 36 48 44 48 50 C 48 56 50 64 60 64 C 70 64 74 58 74 53 L 60 53"
            stroke="#E2E8F0"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Nodo acento cobre/terracota único (#C77B4B) */}
          <circle cx="74" cy="53" r="4.5" fill="#C77B4B" />
          <circle cx="74" cy="53" r="7" stroke="#C77B4B" strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-semibold tracking-tight text-[#2B3242] ${textSizes[size]}`}>
          EG Solutions
        </span>
        {showSubtitle && (
          <span className="text-xs text-[#7A828C] leading-none">
            Estudio técnico · Elier Garcia
          </span>
        )}
      </div>
    </div>
  );
}
