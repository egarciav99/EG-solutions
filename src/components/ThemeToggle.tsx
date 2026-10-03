import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme';

/** Botón de modo claro / oscuro. */
export function ThemeToggle({ className = '', id }: { className?: string; id?: string }) {
  const [theme, toggle] = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      id={id}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
      className={`relative w-9 h-9 rounded-full border border-steel/50 text-slate hover:text-copper hover:border-copper/60 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper cursor-pointer overflow-hidden ${className}`}
    >
      <Sun
        className={`w-4 h-4 absolute transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`}
        aria-hidden="true"
      />
      <Moon
        className={`w-4 h-4 absolute transition-all duration-500 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
        aria-hidden="true"
      />
    </button>
  );
}
