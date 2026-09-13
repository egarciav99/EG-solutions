import { ProjectCase } from '../types';

export const CASE_STUDIES: ProjectCase[] = [
  {
    id: 'activacion-nacional',
    name: 'Plataforma de Fidelización — Activación de Marca Nacional',
    category: 'Plataforma Web & Fidelización',
    scaleType: 'brand-campaign',
    scaleLabel: 'Campaña masiva de marca',
    clientContext: 'Desarrollado como freelance para la activación nacional de una marca de bebidas durante una temporada deportiva de alto perfil.',
    summary:
      'Ecosistema web omnicanal sin fricción de descarga de app nativa. Los usuarios participan directamente desde el navegador móvil, acumulan puntos mediante dinámicas ligadas al evento deportivo y guardan sus pases de recompensas en Apple Wallet y Google Wallet.',
    problem:
      'Las aplicaciones tradicionales de descarga en campañas masivas sufren una caída drástica en el embudo de conversión (>70% de abandono). Además, el canje presencial en sucursales requería evitar canjes duplicados o capturas de pantalla fraudulentas sin complejizar la operación de los cajeros.',
    solution:
      'Arquitectura web ligera y de carga instantánea con generación dinámica de pases criptográficos para Apple Wallet y Google Wallet. Incorporación de un protocolo antifraude de validación en dos pasos mediante códigos QR de un solo uso con ventana temporal de expiración y verificación de geocerca en sucursal.',
    keyHighlights: [
      'Pases nativos en Apple Wallet y Google Wallet con actualización push en vivo según el estado del evento',
      'Protocolo de validación antifraude en dos pasos para canjes en punto de venta',
      'Panel de control administrativo con analítica de redención y afluencia por sucursal en tiempo real',
      'Cero descargas requeridas: conversión récord desde códigos en empaque y material POP'
    ],
    techStack: [
      'TypeScript',
      'React',
      'Node.js / Express',
      'Firebase Firestore',
      'Apple PassKit API',
      'Google Wallet API',
      'QR criptográfico efímero'
    ],
    architecturePoints: [
      'Generación de certificados .pkpass y tokens JWT de Google Wallet firmados en servidor',
      'Transacciones atómicas en base de datos para impedir doble canje simultáneo en distintas sucursales',
      'Endpoints con limitador de tasa (rate limiting) y cifrado asimétrico para los escáneres de verificación'
    ]
  },
  {
    id: 'duovarietta',
    name: 'DuoVarietta — Carritos de Snacks',
    category: 'Sistema de Cotización y Reservas',
    scaleType: 'small-business',
    scaleLabel: 'Pequeño negocio para eventos',
    clientContext: 'Negocio especializado en carritos de snacks y catering temático para bodas, cumpleaños y eventos corporativos.',
    summary:
      'Plataforma integral de pedidos, cotizador dinámico por número de invitados y sistema de reservas con control de inventario de equipos y fechas en tiempo real.',
    problem:
      'La gestión manual por mensajería instantánea provocaba retrasos de horas en enviar presupuestos, errores frecuentes de doble reserva de un mismo carrito para el mismo fin de semana y falta de visibilidad del stock de insumos por evento.',
    solution:
      'Un cotizador interactivo transparente donde el cliente selecciona tipo de estación, número de personas, horas de servicio y complementos, recibiendo el presupuesto desglosado al instante. Al confirmar, el sistema bloquea automáticamente la disponibilidad del inventario físico y notifica a ambas partes.',
    keyHighlights: [
      'Cotización automática inmediata que redujo el ciclo de cierre de reservas de 24 horas a menos de 5 minutos',
      'Motor de disponibilidad de inventario físico que previene solapamiento de fechas y equipos',
      'Panel simplificado de administración para confirmar depósitos, fechas y logística de montaje',
      'Inversión ajustada y arquitectura sin costos recurrentes inflados, ideal para la escala del negocio'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Firebase Firestore & Storage',
      'Cloud Functions',
      'Integración WhatsApp Business API'
    ],
    architecturePoints: [
      'Algoritmo de bloqueo temporal de fechas con expiración para evitar reservas fantasma',
      'Reglas de seguridad en base de datos que aíslan pedidos y protegen datos de contacto de clientes',
      'Generación automática de contratos de servicio y resúmenes de preparación de insumos en PDF'
    ]
  },
  {
    id: 'coreit-pos',
    name: 'CoreIT Automatización — Hub Operativo',
    category: 'Automatización & Extracción IA',
    scaleType: 'internal-tool',
    scaleLabel: 'Herramienta interna empresarial',
    clientContext: 'Empresa de servicios técnicos y consultoría que procesaba manualmente cientos de facturas y reportes operativos por semana.',
    summary:
      'Hub operativo interno con interfaz operativa de un solo toque para disparar flujos de trabajo críticos de la empresa. Integra un pipeline de extracción de documentos PDF a hojas Excel combinando OCR avanzado con Google Gemini y validación humana en el circuito.',
    problem:
      'La transcripción manual de comprobantes, facturas de compras e informes técnicos a hojas de cálculo consumía más de 20 horas de personal calificado a la semana, con una tasa de error tipográfico del 4-6% en números de serie y montos contables.',
    solution:
      'Pipeline de procesamiento por lotes orquestado con n8n y Python. Los documentos se digitalizan mediante OCR y se estructuran en esquemas JSON estrictos usando Google Gemini. Antes de escribir en la base contable, la interfaz operativa presenta una vista de cotejo donde el operador valida con un solo clic los campos con margen de duda.',
    keyHighlights: [
      'Interfaz operativa simplificada para que cualquier miembro del equipo ejecute flujos sin formación técnica',
      'Pipeline OCR + Google Gemini con salida tipada y control estricto de estructura de datos',
      'Mecanismo human-in-the-loop que resalta valores dudosos para revisión rápida antes del volcado definitivo',
      'Reducción del 85% en tiempo de procesamiento administrativo semanal con trazabilidad total de auditoría'
    ],
    techStack: [
      'Python',
      'Google Gemini API',
      'n8n Workflow Engine',
      'Tesseract / Document OCR',
      'TypeScript & React (UI Operativa)',
      'Exportación estructurada a Excel / Sheets'
    ],
    architecturePoints: [
      'Esquemas de validación JSON Schema con reintento automático ante inconsistencias de formato',
      'Cola de procesamiento asíncrona para soportar lotes de más de 100 documentos sin bloquear la interfaz',
      'Registro inmutable de auditoría: cada fila generada conserva el enlace al documento fuente y el sello de validación humana'
    ]
  }
];