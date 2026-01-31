/**
 * Concept Object API — queries Supabase with mock fallback
 * Ref: VISION_AND_STRATEGY.md V3.0, Decision 7
 */

import { getSupabase } from '@/lib/supabase';
import { MOCK_CONCEPTS } from './mock-data';
import type { Concept, ConceptWithRelated, EvolutionStage } from './types';

/**
 * Join a concept row with its translation into a flat Concept object.
 */
function joinConceptTranslation(row: any): Concept {
  // Supabase !inner join returns an array — extract first (and only) match
  const t = Array.isArray(row.concept_translations)
    ? row.concept_translations[0]
    : row.concept_translations;

  return {
    id: row.id,
    stage: row.stage,
    category: row.category,
    complexity_level: row.complexity_level,
    sort_order: row.sort_order,
    visual_type: row.visual_type ?? 'card',
    icon: row.icon ?? null,
    color: row.color ?? null,
    parent_id: row.parent_id ?? null,
    // Translation fields from the joined relation
    title: t?.title ?? '',
    subtitle: t?.subtitle ?? null,
    explanation: t?.explanation ?? '',
    metaphor: t?.metaphor ?? '',
    question: t?.question ?? null,
    deep_dive: t?.deep_dive ?? null,
    completion_message: t?.completion_message ?? null,
    hint: t?.hint ?? null,
  };
}

/**
 * Get all published concepts for a stage, ordered by sort_order.
 */
export async function getConceptsByStage(
  stage: EvolutionStage,
  locale: string = 'en'
): Promise<Concept[]> {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockConcepts(stage, locale);
  }

  try {
    const { data, error } = await supabase
      .from('concepts')
      .select(`
        *,
        concept_translations!inner (
          title, subtitle, explanation, metaphor, question,
          deep_dive, completion_message, hint
        )
      `)
      .eq('stage', stage)
      .eq('is_published', true)
      .eq('concept_translations.locale', locale)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn(`⚠️ getConceptsByStage(${stage}, ${locale}) fallback to mock`, error);
      return getMockConcepts(stage, locale);
    }

    return data.map(joinConceptTranslation);
  } catch (err) {
    console.error('getConceptsByStage error:', err);
    return getMockConcepts(stage, locale);
  }
}

/**
 * Get a single concept by ID.
 */
export async function getConcept(
  id: string,
  locale: string = 'en'
): Promise<Concept | null> {
  const supabase = getSupabase();
  if (!supabase) {
    return getMockConceptById(id, locale);
  }

  try {
    const { data, error } = await supabase
      .from('concepts')
      .select(`
        *,
        concept_translations!inner (
          title, subtitle, explanation, metaphor, question,
          deep_dive, completion_message, hint
        )
      `)
      .eq('id', id)
      .eq('concept_translations.locale', locale)
      .single();

    if (error || !data) {
      return getMockConceptById(id, locale);
    }

    return joinConceptTranslation(data);
  } catch (err) {
    console.error('getConcept error:', err);
    return getMockConceptById(id, locale);
  }
}

/**
 * Get a concept with its related concepts.
 */
export async function getConceptWithRelated(
  id: string,
  locale: string = 'en'
): Promise<ConceptWithRelated | null> {
  const concept = await getConcept(id, locale);
  if (!concept) return null;

  const supabase = getSupabase();
  const related: ConceptWithRelated['related'] = [];

  if (supabase) {
    try {
      // Get relationships where this concept is the source
      const { data: rels } = await supabase
        .from('concept_relationships')
        .select('target_id, relationship, strength')
        .eq('source_id', id);

      if (rels && rels.length > 0) {
        const targetIds = rels.map((r: any) => r.target_id);
        const targets = await getConceptsByIds(targetIds, locale);
        const targetMap = new Map(targets.map(t => [t.id, t]));

        for (const rel of rels) {
          const target = targetMap.get(rel.target_id);
          if (target) {
            related.push({
              concept: target,
              relationship: rel.relationship,
              strength: rel.strength,
            });
          }
        }
      }
    } catch (err) {
      console.error('getConceptWithRelated relationships error:', err);
    }
  }

  return { ...concept, related };
}

/**
 * Get multiple concepts by their IDs.
 */
export async function getConceptsByIds(
  ids: string[],
  locale: string = 'en'
): Promise<Concept[]> {
  if (ids.length === 0) return [];

  const supabase = getSupabase();
  if (!supabase) {
    return ids
      .map(id => getMockConceptById(id, locale))
      .filter((c): c is Concept => c !== null);
  }

  try {
    const { data, error } = await supabase
      .from('concepts')
      .select(`
        *,
        concept_translations!inner (
          title, subtitle, explanation, metaphor, question,
          deep_dive, completion_message, hint
        )
      `)
      .in('id', ids)
      .eq('concept_translations.locale', locale);

    if (error || !data) {
      return ids
        .map(id => getMockConceptById(id, locale))
        .filter((c): c is Concept => c !== null);
    }

    return data.map(joinConceptTranslation);
  } catch (err) {
    console.error('getConceptsByIds error:', err);
    return ids
      .map(id => getMockConceptById(id, locale))
      .filter((c): c is Concept => c !== null);
  }
}

/**
 * Get concepts from OTHER stages that relate to concepts in a given stage.
 * Returns up to `limit` unique cross-stage concepts, sorted by relationship strength.
 */
export async function getRelatedConceptsForStage(
  stage: EvolutionStage,
  locale: string = 'en',
  limit: number = 6
): Promise<Concept[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    // Get all concept IDs in this stage
    const { data: stageConcepts } = await supabase
      .from('concepts')
      .select('id')
      .eq('stage', stage)
      .eq('is_published', true);

    if (!stageConcepts || stageConcepts.length === 0) return [];

    const stageIds = stageConcepts.map((c: any) => c.id);

    // Find relationships where stage concepts are source OR target
    const [{ data: outbound }, { data: inbound }] = await Promise.all([
      supabase
        .from('concept_relationships')
        .select('target_id, strength')
        .in('source_id', stageIds),
      supabase
        .from('concept_relationships')
        .select('source_id, strength')
        .in('target_id', stageIds),
    ]);

    // Collect unique IDs from OTHER stages with max strength
    const strengthMap = new Map<string, number>();
    for (const r of outbound ?? []) {
      if (!stageIds.includes(r.target_id)) {
        strengthMap.set(r.target_id, Math.max(strengthMap.get(r.target_id) ?? 0, r.strength));
      }
    }
    for (const r of inbound ?? []) {
      if (!stageIds.includes(r.source_id)) {
        strengthMap.set(r.source_id, Math.max(strengthMap.get(r.source_id) ?? 0, r.strength));
      }
    }

    if (strengthMap.size === 0) return [];

    // Sort by strength descending, take top N
    const sortedIds = [...strengthMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);

    return getConceptsByIds(sortedIds, locale);
  } catch (err) {
    console.error('getRelatedConceptsForStage error:', err);
    return [];
  }
}

// ── Mock data helpers ──────────────────────────────────────

function getMockConcepts(stage: EvolutionStage, locale: string): Concept[] {
  const stageConcepts = MOCK_CONCEPTS.filter(c => c.stage === stage);
  return stageConcepts.map(c => ({
    ...c,
    title: c.translations[locale]?.title ?? c.translations.en?.title ?? '',
    subtitle: c.translations[locale]?.subtitle ?? c.translations.en?.subtitle ?? null,
    explanation: c.translations[locale]?.explanation ?? c.translations.en?.explanation ?? '',
    metaphor: c.translations[locale]?.metaphor ?? c.translations.en?.metaphor ?? '',
    question: c.translations[locale]?.question ?? c.translations.en?.question ?? null,
    deep_dive: c.translations[locale]?.deep_dive ?? null,
    completion_message: c.translations[locale]?.completion_message ?? null,
    hint: c.translations[locale]?.hint ?? null,
  }));
}

function getMockConceptById(id: string, locale: string): Concept | null {
  const mock = MOCK_CONCEPTS.find(c => c.id === id);
  if (!mock) return null;
  const t = mock.translations[locale] ?? mock.translations.en;
  return {
    ...mock,
    title: t?.title ?? '',
    subtitle: t?.subtitle ?? null,
    explanation: t?.explanation ?? '',
    metaphor: t?.metaphor ?? '',
    question: t?.question ?? null,
    deep_dive: t?.deep_dive ?? null,
    completion_message: t?.completion_message ?? null,
    hint: t?.hint ?? null,
  };
}
