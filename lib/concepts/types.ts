/**
 * Concept Object Architecture — TypeScript types
 * Ref: VISION_AND_STRATEGY.md V3.0, Decision 7
 */

export type EvolutionStage =
  | 'dna'
  | 'seed'
  | 'sprout'
  | 'istik'
  | 'tree'
  | 'fruits'
  | 'orchard';

export type ConceptVisualType =
  | 'card'
  | 'interactive'
  | 'sandbox'
  | 'animation'
  | 'diagram'
  | 'timeline';

export type RelationshipType =
  | 'prerequisite'
  | 'deepens'
  | 'applies'
  | 'related'
  | 'part-of';

/** Core concept record (from `concepts` table) */
export interface ConceptRow {
  id: string;
  category: string;
  complexity_level: number;
  stage: EvolutionStage;
  parent_id: string | null;
  sort_order: number;
  visual_type: ConceptVisualType;
  icon: string | null;
  color: string | null;
  related_program_id: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

/** Translation record (from `concept_translations` table) */
export interface ConceptTranslationRow {
  concept_id: string;
  locale: string;
  title: string;
  subtitle: string | null;
  explanation: string;
  metaphor: string;
  question: string | null;
  deep_dive: string | null;
  completion_message: string | null;
  hint: string | null;
}

/** Relationship record (from `concept_relationships` table) */
export interface ConceptRelationshipRow {
  id: string;
  source_id: string;
  target_id: string;
  relationship: RelationshipType;
  strength: number;
  created_at: string;
}

/** Joined concept with its translation for a specific locale */
export interface Concept {
  id: string;
  stage: EvolutionStage;
  category: string;
  complexity_level: number;
  sort_order: number;
  visual_type: ConceptVisualType;
  icon: string | null;
  color: string | null;
  parent_id: string | null;
  // Translation fields (flattened)
  title: string;
  subtitle: string | null;
  explanation: string;
  metaphor: string;
  question: string | null;
  deep_dive: string | null;
  completion_message: string | null;
  hint: string | null;
}

/** Concept with related concepts attached */
export interface ConceptWithRelated extends Concept {
  related: Array<{
    concept: Concept;
    relationship: RelationshipType;
    strength: number;
  }>;
}
