import { useEffect, useState } from 'react';

/** Páginas del sitio. La clave es el id que usan Header y Footer al navegar. */
export const PAGES = {
  top: { path: '/', title: 'EG Solutions · Plataformas web, automatizaciones y agentes IA' },
  servicios: { path: '/servicios', title: 'Servicios · EG Solutions' },
  proyectos: { path: '/proyectos', title: 'Proyectos · EG Solutions' },
  diferencial: { path: '/como-trabajo', title: 'Cómo trabajo · EG Solutions' },
  contacto: { path: '/contacto', title: 'Contacto · EG Solutions' },
} as const;

export type PageId = keyof typeof PAGES;

export function pageFromPath(pathname: string): PageId {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const found = (Object.keys(PAGES) as PageId[]).find((id) => PAGES[id].path === clean);
  return found ?? 'top';
}

/** Enrutado mínimo con la History API (sin dependencias). */
export function usePage(): [PageId, (id: string) => void] {
  const [page, setPage] = useState<PageId>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.title = PAGES[page].title;
  }, [page]);

  const navigate = (id: string) => {
    const target: PageId = id in PAGES ? (id as PageId) : 'top';
    if (target !== page) {
      window.history.pushState(null, '', PAGES[target].path);
      setPage(target);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return [page, navigate];
}
