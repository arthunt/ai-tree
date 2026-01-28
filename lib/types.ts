export interface TreeLevel {
  id: 'leaves' | 'branches' | 'trunk' | 'roots';
  name: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
}

export interface CodeExample {
  language: 'python' | 'javascript' | 'typescript';
  code: string;
  explanation: string;
  whyRelevant?: string;
  howToUse?: string[];
  annotations?: CodeAnnotation[];
  playgroundUrl?: string;
}

export interface CodeAnnotation {
  line: number;
  text: string;
}

export interface ConceptVisual {
  type: 'image' | 'svg' | 'demo' | 'diagram';
  src?: string;
  component?: string;
  alt: string;
  caption?: string;
}

export interface Concept {
  id: string;
  level: 'leaves' | 'branches' | 'trunk' | 'roots';
  title: string;
  simpleName: string;
  explanation: string;
  metaphor: string;
  icon: string;
  complexity: 1 | 2 | 3;
  prerequisites?: string[];
  relatedConcepts?: string[];
  codeExample?: CodeExample;
  visual?: ConceptVisual;
}

export interface TreeData {
  version: string;
  metadata: {
    title: string;
    description: string;
    created: string;
    language: string;
  };
  levels: TreeLevel[];
  concepts: Concept[];
}

export type ViewMode = 'metaphor' | 'technical' | 'both';
