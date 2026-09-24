import { BrandPillar } from '../types';

export const BRAND_NAME = 'EG Solutions';

/** Fallback de compatibilidad: SEO, meta tags, alt text. No usar en UI nueva. */
export const BRAND_TAGLINE = 'Plataformas Web · Automatizaciones · Agentes IA';

/** Versión estructurada del tagline para renderizado visual (Hero, Footer). */
export const BRAND_PILLARS: BrandPillar[] = [
  { id: 'web', label: 'Plataformas Web', icon: 'web' },
  { id: 'automation', label: 'Automatizaciones', icon: 'automation' },
  { id: 'ai-agent', label: 'Agentes IA', icon: 'ai-agent' },
];

export const FOUNDER_NAME = 'Elier Garcia';
export const FOUNDER_ROLE = 'Fundador e Ingeniero Principal';

export const CONTACT_EMAIL = 'elier.garcia@egsolutions.tech';
/** Número de WhatsApp Business de EG Solutions. */
export const WHATSAPP_DISPLAY = '+34 604 280 860';
export const WHATSAPP_URL = 'https://wa.me/34604280860';
export const ACTIVE_REGIONS = 'España y México';
export const LANGUAGES = 'Bilingüe (ES / EN)';
export const RESPONSE_TIME = 'Menos de 24 horas en días laborables';
export const TIMEZONES = 'España (CET / UTC+1/2) y México (CST / UTC-6)';
