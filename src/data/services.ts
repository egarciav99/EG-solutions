import { ServiceLine } from '../types';

export const SERVICE_LINES: ServiceLine[] = [
  {
    id: 'plataformas-web',
    title: 'Plataformas Web a Medida',
    summary:
      'Desarrollo de sitios y aplicaciones web construidas específicamente para el flujo operativo de tu negocio, sin plantillas rígidas ni código inflado.',
    deliverables: [
      'Cotizadores dinámicos con desglose instantáneo de precios y condiciones',
      'Sistemas de reservas con validación de inventario y disponibilidad en tiempo real',
      'Catálogos interactivos con filtrado reactivo y gestión de variantes',
      'Paneles de administración internos con métricas clave y exportación de datos'
    ],
    bestFor: 'Negocios que necesitan digitalizar ventas o gestión sin la fricción de herramientas genéricas de suscripción que no encajan en su modelo.',
    technicalDetails: 'Construido en TypeScript con React, Tailwind CSS y backend en Node.js o Firebase. Código tipado de punta a punta, tiempos de carga inferiores a 1 segundo y foco absoluto en usabilidad móvil y escritorio.'
  },
  {
    id: 'automatizaciones',
    title: 'Automatizaciones de Procesos',
    summary:
      'Orquestación de tareas repetitivas entre diferentes herramientas y sistemas mediante n8n, webhooks y APIs, eliminando el trabajo manual propenso a errores.',
    deliverables: [
      'Extracción y estructuración de datos desde facturas, albaranes, recibos y PDFs',
      'Sincronización bidireccional entre CRM, ERP, hojas de cálculo y pasarelas de pago',
      'Alertas automáticas en mensajería interna (Slack, Teams, WhatsApp) con botones de acción',
      'Tratamiento, validación y formateo de datos masivos antes de su almacenamiento'
    ],
    bestFor: 'Equipos que pierden horas semanales copiando datos entre plataformas o procesando documentos en papel y hojas de cálculo.',
    technicalDetails: 'Flujos implementados en servidores privados de n8n o funciones serverless. Control de errores con reintentos exponenciales, registro detallado de eventos para auditoría y trazabilidad completa de cada ejecución.'
  },
  {
    id: 'agentes-ia',
    title: 'Agentes de IA y LLM Aplicados',
    summary:
      'Implementación de agentes inteligentes integrados en tus herramientas cotidianas para analizar información, redactar respuestas fundamentadas y asistir al equipo humano.',
    deliverables: [
      'Sistemas RAG (Retrieval-Augmented Generation) conectados a la base de conocimiento o manuales internos de tu empresa',
      'Pipelines de extracción y clasificación inteligente de consultas o solicitudes de clientes',
      'Módulos de validación y control de coherencia en procesos con supervisión humana (human-in-the-loop)',
      'Asistentes de primera línea que consultan bases de datos en tiempo real antes de responder'
    ],
    bestFor: 'Empresas que quieren aprovechar modelos de lenguaje para ganar velocidad operativa sin comprometer la precisión ni la privacidad de sus datos.',
    technicalDetails: 'Integración con modelos de frontera (Google Gemini, OpenAI, Claude) con esquemas de salida forzados (JSON Schema), almacenamiento vectorial seguro y puntos explícitos de revisión humana para decisiones críticas.'
  }
];
