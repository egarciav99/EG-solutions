export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'on-dark';
  showTagline?: boolean;
}

export function Logo({
  className = '',
  size = 'md',
  variant = 'light',
  showTagline = false,
}: LogoProps) {
  // Dimensiones estrictas respetando la proporción original (1580 x 938)
  const imageHeights = {
    sm: 'h-8',
    md: 'h-10 sm:h-11',
    lg: 'h-14 sm:h-16',
  };

  const isDark = variant === 'on-dark';

  return (
    <div className={`inline-flex items-center gap-4 ${className}`}>
      {/* Margen de seguridad alrededor del logotipo respetando proporción original */}
      <div
        className={`flex items-center justify-center transition-all ${
          isDark
            ? 'bg-[#F6F7F8] p-2 sm:p-2.5 rounded border border-[#A9B7C4]/40 shadow-xs'
            : 'p-1'
        }`}
      >
        <img
          src="/logo-eg.png"
          alt="EG Solutions"
          width="108"
          height="64"
          className={`${imageHeights[size]} w-auto object-contain select-none`}
          style={{ aspectRatio: '1580 / 938' }}
          loading="eager"
          decoding="async"
        />
      </div>

      {showTagline && (
        <div className="hidden lg:flex flex-col border-l border-[#A9B7C4]/50 pl-3">
          <span className={`text-xs font-semibold tracking-tight ${isDark ? 'text-white' : 'text-[#2B3242]'}`}>
            Plataformas Web · Automatizaciones · Agentes IA
          </span>
        </div>
      )}
    </div>
  );
}

