import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {NOT_FOUND_SEO, PAGE_SEO, SITE_URL} from './src/data/seo';

const escape = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Etiquetas <head> de una página (sustituyen el bloque <!-- seo --> de index.html). */
function seoTags(title: string, description: string, url: string | null) {
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    url ? `<link rel="canonical" href="${url}" />` : '<meta name="robots" content="noindex" />',
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : '',
  ];
  return tags.filter(Boolean).join('\n');
}

/**
 * Al compilar, genera un HTML por página (dist/servicios/index.html, …) con su título,
 * descripción y canonical, más dist/404.html. Así Google y las vistas previas de
 * LinkedIn o WhatsApp ven los datos correctos sin ejecutar JavaScript.
 */
function pagesHtml(): Plugin {
  const SEO_BLOCK = /<!-- seo:[\s\S]*?<!-- \/seo -->/;
  return {
    name: 'eg-pages-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') this.error('index.html no está en el bundle');
      const base = String(index.source);
      if (!SEO_BLOCK.test(base)) this.error('index.html no tiene el bloque <!-- seo -->');
      const render = (title: string, description: string, url: string | null) =>
        base.replace(SEO_BLOCK, seoTags(title, description, url));

      for (const page of Object.values(PAGE_SEO)) {
        const html = render(page.title, page.description, SITE_URL + page.path);
        if (page.path === '/') index.source = html;
        else this.emitFile({type: 'asset', fileName: `${page.path.slice(1)}/index.html`, source: html});
      }
      this.emitFile({type: 'asset', fileName: '404.html', source: render(NOT_FOUND_SEO.title, NOT_FOUND_SEO.description, null)});
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), pagesHtml()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
