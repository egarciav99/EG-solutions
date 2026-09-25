import { useEffect, useState } from 'react';
import { NOT_FOUND_SEO, PAGE_SEO, SITE_URL, type PageId } from './data/seo';

/** Páginas del sitio. La clave es el id que usan Header y Footer al navegar. */
export const PAGES = PAGE_SEO;
export type { PageId };
/** Página actual: una de las del sitio o la de "no encontrada". */
export type Route = PageId | 'notfound';

export function pageFromPath(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const found = (Object.keys(PAGES) as PageId[]).find((id) => PAGES[id].path === clean);
  return found ?? 'notfound';
}

function setMeta(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Enrutado mínimo con la History API (sin dependencias). */
export function usePage(): [Route, (id: string) => void] {
  const [page, setPage] = useState<Route>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // El HTML de cada página ya llega con sus etiquetas (se generan al compilar);
  // esto las mantiene al día al navegar sin recargar.
  useEffect(() => {
    const seo = page === 'notfound' ? NOT_FOUND_SEO : PAGES[page];
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    if (page !== 'notfound') {
      setMeta('link[rel="canonical"]', 'href', SITE_URL + PAGES[page].path);
      setMeta('meta[property="og:url"]', 'content', SITE_URL + PAGES[page].path);
    }
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
