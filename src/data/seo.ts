/**
 * Título, descripción y ruta de cada página.
 * Lo usan el router (en el navegador) y vite.config.ts (al compilar, para generar
 * un HTML propio por página), así que no puede importar nada de React.
 */
export const SITE_URL = 'https://egsolutions.tech';

export const PAGE_SEO = {
  top: {
    path: '/',
    title: 'EG Solutions · Plataformas web, automatizaciones y agentes IA',
    description:
      'Desarrollo web, automatización de procesos con n8n y agentes de IA para negocios en España y México. Código propio y revisión humana, por Elier Garcia.',
  },
  servicios: {
    path: '/servicios',
    title: 'Servicios: desarrollo web, automatización e IA · EG Solutions',
    description:
      'Plataformas web a medida, automatizaciones con n8n e integraciones de agentes de IA. Qué incluye cada servicio y para qué tipo de negocio encaja.',
  },
  proyectos: {
    path: '/proyectos',
    title: 'Proyectos · EG Solutions',
    description:
      'Proyectos reales de EG Solutions: productos propios, automatizaciones en uso y trabajos para clientes, cada uno con su estado y su tecnología.',
  },
  diferencial: {
    path: '/como-trabajo',
    title: 'Cómo trabajo · EG Solutions',
    description:
      'Un método en cuatro pasos con alcance por escrito y revisión humana en los flujos con IA, y la trayectoria de Elier Garcia, ingeniero eléctrico.',
  },
  contacto: {
    path: '/contacto',
    title: 'Contacto · EG Solutions',
    description:
      'Cuéntame tu proyecto o el proceso que te quita horas y te respondo en menos de 24 horas laborables con una primera propuesta. Por email o WhatsApp.',
  },
} as const;

export const NOT_FOUND_SEO = {
  title: 'Página no encontrada · EG Solutions',
  description: 'Esta página no existe. Vuelve al inicio de EG Solutions para ver servicios, proyectos y contacto.',
};

export type PageId = keyof typeof PAGE_SEO;
