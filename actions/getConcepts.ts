'use server';

import { getConceptsByStage, getConcept, getConceptsByIds } from '@/lib/concepts';
import type { Concept, EvolutionStage } from '@/lib/concepts';

/**
 * Server action: get all concepts for a stage.
 * Wraps the SDK for use in Server Components / server actions.
 */
export async function getStageContent(
  stage: EvolutionStage,
  locale: string = 'en'
): Promise<Concept[]> {
  return getConceptsByStage(stage, locale);
}

/**
 * Server action: get a single concept by ID.
 */
export async function getConceptById(
  id: string,
  locale: string = 'en'
): Promise<Concept | null> {
  return getConcept(id, locale);
}

/**
 * Server action: get multiple concepts by IDs.
 */
export async function getConceptsById(
  ids: string[],
  locale: string = 'en'
): Promise<Concept[]> {
  return getConceptsByIds(ids, locale);
}
