import type { AnchorHTMLAttributes } from 'react';
import { PAGES, type PageId } from '../router';

interface PageLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: PageId;
  onNavigate: (id: PageId) => void;
}

/**
 * Enlace real (<a href>) a una página del sitio: Google lo sigue y se puede abrir en otra pestaña.
 * Un clic normal navega sin recargar; con Ctrl/Cmd/Mayús o botón central, el navegador hace lo suyo.
 */
export function PageLink({ to, onNavigate, onClick, children, ...rest }: PageLinkProps) {
  return (
    <a
      href={PAGES[to].path}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onNavigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
