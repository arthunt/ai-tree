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

// --- Programs (Supabase) ---

export interface ProgramFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ProgramCurriculum {
  week_number: number;
  hours: number;
  type: 'self-study' | 'group' | 'practice' | 'assessment' | 'pre-work';
  title: string;
  subtitle?: string;
  topics: string[];
}

export interface ProgramFAQ {
  question: string;
  answer: string;
}

export interface Program {
  id: string;
  slug: string;
  code: string;
  color: string;
  icon?: string;
  duration_weeks: number;
  academic_hours: number;
  price_cents: number;
  name: string;
  full_name: string;
  tagline: string;
  description: string; // HTML/Markdown
  target_audience: string;
  outcomes: string[];

  // Computed/joined fields
  features?: ProgramFeature[];
  curriculum?: ProgramCurriculum[];
  faq?: ProgramFAQ[];

  // Pricing variants
  graduate_discount_percent?: number;
  graduate_discount_for?: string;
  installment_count?: number;
  installment_amount_cents?: number;
  is_bundle?: boolean;
  included_programs?: string[];
  bundle_savings_cents?: number;
}

