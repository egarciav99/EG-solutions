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
