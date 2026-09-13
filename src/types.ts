export interface ProjectCase {
  id: string;
  name: string;
  category: string;
  scaleType: 'brand-campaign' | 'small-business' | 'internal-tool';
  scaleLabel: string;
  clientContext: string;
  summary: string;
  problem: string;
  solution: string;
  keyHighlights: string[];
  techStack: string[];
  architecturePoints: string[];
}

export interface ServiceLine {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  bestFor: string;
  technicalDetails: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  serviceCategory: string;
  details: string;
}

/**
 * Pilar visual del tagline — reemplaza el string plano de BRAND_TAGLINE
 * cuando el Hero necesite fragmentarlo en 3 microtags/íconos.
 */
export interface BrandPillar {
  id: string;
  label: string;
  icon: 'web' | 'automation' | 'ai-agent';
}

export interface BlueprintStep {
  id: number;
  title: string;
  code: string;
  tag: string;
  desc: string;
  detail: string;
  isCritical?: boolean;
}

export interface CircuitTrace {
  id: string;
  points: [number, number][];
  color: 'steel' | 'navy' | 'copper';
  width?: number;
}

export interface CircuitNode {
  id: string;
  cx: number;
  cy: number;
  r: number;
  color: 'steel' | 'navy' | 'copper';
  ring?: boolean;
}

export interface CircuitLayout {
  width: number;
  height: number;
  traces: CircuitTrace[];
  nodes: CircuitNode[];
}

/**
 * Preparado para Fase 1: estados de ejecución async (webhooks n8n, agentes IA).
 * No se usa todavía — evita `any` implícitos cuando conectemos CTAs a automatizaciones.
 */
export type ExecutionState =
  | 'idle'
  | 'transmitting'
  | 'processing'
  | 'success'
  | 'error';

export interface WorkflowStatus {
  step: ExecutionState;
  progressMessage: string;
}