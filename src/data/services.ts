import { ServiceLine } from '../types';

export const SERVICE_LINES: ServiceLine[] = [
  {
    id: 'plataformas-web',
    title: 'Plataformas web a medida',
    summary:
      'Si tu negocio funciona con hojas de cálculo, WhatsApp y herramientas que no encajan, te construyo la web o la herramienta interna que sigue tu forma de trabajar.',
    examples: [
      'Web profesional que convierte visitas en clientes, con el formulario conectado a tu correo o a una hoja de cálculo',
      'Cotizador o sistema de reservas propio, sin pagar suscripciones que no se adaptan a ti',
      'Panel interno para ver pedidos, clientes o cifras en un solo sitio',
    ],
    inquiry: 'Plataformas Web',
    cta: 'Consultar una web',
  },
  {
    id: 'automatizaciones',
    title: 'Automatización de procesos',
    summary:
      'Si tu equipo copia datos de un sitio a otro o revisa documentos a mano cada semana, eso se puede automatizar para que ocurra solo y sin errores.',
    examples: [
      'Pasar los datos de facturas, albaranes o PDFs a Excel o a tu sistema',
      'Conectar CRM, hojas de cálculo, correo y pagos para que se actualicen solos',
      'Avisos por WhatsApp, Slack o correo cuando algo necesita tu atención',
    ],
    inquiry: 'Automatizaciones',
    cta: 'Consultar una automatización',
  },
  {
    id: 'agentes-ia',
    title: 'Agentes de IA',
    summary:
      'La IA puede leer, clasificar y redactar por tu equipo, siempre con una persona que revisa lo importante antes de que llegue al cliente.',
    examples: [
      'Asistente que responde preguntas usando tus propios manuales y documentos',
      'Clasificar correos o solicitudes y preparar un borrador de respuesta',
      'Revisar documentos automáticamente, con aprobación humana antes de enviarlos',
    ],
    inquiry: 'Agentes de IA',
    cta: 'Consultar un agente de IA',
  },
];
