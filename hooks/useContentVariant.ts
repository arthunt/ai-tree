'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getVariant, recordEngagement, recordConversion } from '@/lib/variants/service';
import type { VariantSelection } from '@/lib/variants/types';

/**
 * Hook to get a content variant with automatic locale detection.
 * Returns the variant content or null (caller uses default).
 *
 * Usage:
 *   const variant = useContentVariant('concept:tokenization:title');
 *   const title = variant?.content ?? defaultTitle;
 */
export function useContentVariant(contentKey: string): VariantSelection | null {
  const { locale } = useLanguage();
  const [variant, setVariant] = useState<VariantSelection | null>(null);

  useEffect(() => {
    let cancelled = false;

    getVariant(contentKey, locale).then((v) => {
      if (!cancelled) setVariant(v);
    });

    return () => { cancelled = true; };
  }, [contentKey, locale]);

  return variant;
}

/**
 * Hook to get content with variant override.
 * Provides the resolved content string directly.
 *
 * Usage:
 *   const { content: title } = useContentWithVariant(
 *     'concept:tokenization:title',
 *     concept.title  // default from concept_translations
 *   );
 */
export function useContentWithVariant(
  contentKey: string,
  defaultContent: string
): { content: string; variant: VariantSelection | null } {
  const variant = useContentVariant(contentKey);

  return {
    content: variant?.content ?? defaultContent,
    variant,
  };
}

// Re-export for convenience
export { recordEngagement, recordConversion };
export type { VariantSelection };
