export interface TreeLevel {
  id: 'leaves' | 'branches' | 'trunk' | 'roots';
  name: string;
  subtitle: string;
  description: string;
  color: string;
  order: number;
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
