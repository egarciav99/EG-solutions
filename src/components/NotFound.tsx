import { ArrowRight } from 'lucide-react';
import { PageLink } from './PageLink';
import type { PageId } from '../router';

/** Página para rutas que no existen (se sirve con estado 404). */
export function NotFound({ onNavigate }: { onNavigate: (id: PageId) => void }) {
  return (
    <section className="py-24 border-b border-steel/30 bg-near-white" id="no-encontrada">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold text-copper mb-3">Error 404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight mb-4">Esta página no existe</h1>
        <p className="text-base text-mid-gray leading-relaxed mb-8">
          Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <PageLink
            to="top"
            onNavigate={onNavigate}
            className="bg-copper hover:opacity-90 text-white text-base font-medium px-6 py-3 rounded transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          >
            Volver al inicio
          </PageLink>
          <PageLink
            to="proyectos"
            onNavigate={onNavigate}
            className="inline-flex items-center justify-center gap-1.5 border border-slate text-navy text-base font-medium px-6 py-3 rounded hover:bg-slate/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate"
          >
            Ver proyectos
            <ArrowRight className="w-4 h-4" />
          </PageLink>
        </div>
      </div>
    </section>
  );
}
