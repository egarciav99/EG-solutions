import { BlueprintStep } from '../types';

export const BLUEPRINT_STEPS: BlueprintStep[] = [
  {
    id: 0,
    title: 'Levantamiento y alcance técnico',
    code: 'ESTRUCTURA_01',
    tag: 'Ingeniería previa',
    desc: 'Definición exacta de requerimientos, modelo de datos y riesgos. Presupuesto cerrado.',
    detail: 'Formación en supervisión de obra aplicada a la estimación técnica: plazos reales, no optimistas.',
  },
  {
    id: 1,
    title: 'Desarrollo web y orquestación',
    code: 'DESARROLLO_02',
    tag: 'TypeScript & n8n',
    desc: 'Plataformas reactivas, APIs limpias y flujos de integración automáticos.',
    detail: 'Manejo estricto de excepciones, idempotencia en transacciones y cero dependencias superfluas.',
  },
  {
    id: 2,
    title: 'Agentes IA y validación humana',
    code: 'SUPERVISIÓN_03',
    tag: 'Human-in-the-loop',
    desc: 'LLMs restringidos a esquemas JSON con punto de cotejo humano antes de impactar datos reales.',
    detail: 'El nodo de cobre representa la supervisión técnica que previene fallos y alucinaciones.',
    isCritical: true,
  },
  {
    id: 3,
    title: 'Despliegue, seguridad y auditoría',
    code: 'DESPLIEGUE_04',
    tag: 'Producción real',
    desc: 'Infraestructura documentada, protección contra fraude y monitorización.',
    detail: 'Entrega llave en mano con propiedad total del código y canales directos de soporte.',
  },
];
