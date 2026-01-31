'use server';

import { getConceptsByStage } from '@/lib/concepts';
import type { ConceptTranslation } from '@/lib/supabase';

/**
 * Get DNA stage content using the unified Concept SDK.
 * Returns data in the legacy ConceptTranslation shape for backward
 * compatibility with DNAView (which expects `concept_id`, not `id`).
 *
 * TODO: Once DNAView migrates to the unified Concept type,
 * replace this with a direct `getStageContent('dna', locale)` call.
 */
export async function getDNAContent(locale: string = 'en'): Promise<ConceptTranslation[]> {
    const concepts = await getConceptsByStage('dna', locale);

    // Map Concept → legacy ConceptTranslation shape
    return concepts.map(c => ({
        concept_id: c.id,
        locale,
        title: c.title,
        explanation: c.explanation,
        metaphor: c.metaphor,
        question: c.question ?? undefined,
    }));
}
