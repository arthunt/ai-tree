import { getSupabase } from '@/lib/supabase';
import type { ContentVariant, VariantSelection } from './types';

// Session-level cache: same variant for the entire session
const sessionCache = new Map<string, VariantSelection>();

/**
 * Get a content variant for the given key and locale.
 * Returns null if no variants exist (caller should use default content).
 *
 * Variants are session-sticky: the same user sees the same variant
 * throughout their session to avoid confusion and enable clean measurement.
 */
export async function getVariant(
  contentKey: string,
  locale: string
): Promise<VariantSelection | null> {
  const cacheKey = `${contentKey}:${locale}`;

  // 1. Check session cache
  const cached = sessionCache.get(cacheKey);
  if (cached) return cached;

  // 2. Query active variants
  const supabase = getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('content_variants')
      .select('content_key, locale, variant_name, content, weight')
      .eq('content_key', contentKey)
      .eq('locale', locale)
      .eq('is_active', true);

    if (error || !data || data.length === 0) return null;

    // 3. Weighted random selection
    const selected = weightedRandom(data as ContentVariant[]);

    const selection: VariantSelection = {
      content: selected.content,
      variant_name: selected.variant_name,
      content_key: selected.content_key,
      locale: selected.locale,
    };

    // 4. Cache for session
    sessionCache.set(cacheKey, selection);

    // 5. Record impression (fire-and-forget)
    supabase.rpc('record_variant_impression', {
      p_content_key: contentKey,
      p_locale: locale,
      p_variant_name: selected.variant_name,
    }).then(() => { }, () => { });

    return selection;
  } catch {
    return null;
  }
}

/**
 * Record an engagement event for a variant.
 * Call this when the user interacts with the content (click, expand, etc.)
 */
export async function recordEngagement(selection: VariantSelection): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    await supabase.rpc('record_variant_engagement', {
      p_content_key: selection.content_key,
      p_locale: selection.locale,
      p_variant_name: selection.variant_name,
    });
  } catch {
    // Silent fail — measurement should never break UX
  }
}

/**
 * Record a conversion event for a variant.
 * Call this when the user proceeds to the next stage or completes a goal.
 */
export async function recordConversion(selection: VariantSelection): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    await supabase.rpc('record_variant_conversion', {
      p_content_key: selection.content_key,
      p_locale: selection.locale,
      p_variant_name: selection.variant_name,
    });
  } catch {
    // Silent fail
  }
}

/**
 * Clear session cache (e.g., when user changes language)
 */
export function clearVariantCache(): void {
  sessionCache.clear();
}

// ── Utilities ────────────────────────────────

function weightedRandom(variants: ContentVariant[]): ContentVariant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }

  return variants[variants.length - 1]; // Fallback
}
