import { BlueprintStep } from '../types';

export const BLUEPRINT_STEPS: BlueprintStep[] = [
  {
    id: 0,
    title: 'Entiendo tu proceso',
    tag: 'Alcance',
    desc: 'Vemos juntos qué hay que resolver y te doy alcance, plazo y presupuesto por escrito.',
  },
  {
    id: 1,
    title: 'Construyo la solución',
    tag: 'Desarrollo',
    desc: 'Web, automatización o IA, con avances que puedes probar durante el desarrollo.',
  },
  {
    id: 2,
    title: 'Revisión humana donde la IA puede fallar',
    tag: 'Control',
    desc: 'La IA propone y una persona valida antes de tocar datos reales o llegar a tus clientes.',
    isCritical: true,
  },
  {
    id: 3,
    title: 'Entrega y soporte',
    tag: 'Producción',
    desc: 'Lo pongo en marcha y lo dejo documentado. El código es tuyo y me escribes directamente si algo falla.',
  },
];
