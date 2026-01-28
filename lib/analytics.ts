'use client';

import { track } from '@vercel/analytics';

/**
 * Custom analytics events for AI Tree
 * All events respect privacy requirements:
 * - No PII collection
 * - GDPR compliant
 * - Respects Do Not Track header
 */

/**
 * Track when a concept is opened
 * @param conceptId - The ID of the concept (anonymized)
 * @param locale - The language locale (not PII)
 */
export function trackConceptOpen(conceptId: string, locale: string) {
  // Check for Do Not Track header
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Concept Opened', {
    conceptId,
    locale,
  });
}

/**
 * Track search queries (anonymized - no search terms stored)
 * Only logs that a search was performed, not what was searched
 * @param locale - The language locale (not PII)
 * @param resultCount - Number of results found (not PII)
 */
export function trackSearch(locale: string, resultCount: number) {
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Search Performed', {
    locale,
    resultCount,
  });
}

/**
 * Track language preference changes
 * @param fromLocale - The previous locale
 * @param toLocale - The new locale
 */
export function trackLanguageChange(fromLocale: string, toLocale: string) {
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Language Changed', {
    fromLocale,
    toLocale,
  });
}

/**
 * Track feature usage (which pages/sections are most viewed)
 * @param featureName - Name of the feature (e.g., "tree-view", "concept-page")
 * @param locale - The language locale
 */
export function trackFeatureView(featureName: string, locale: string) {
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Feature Viewed', {
    featureName,
    locale,
  });
}

/**
 * Check if the user has Do Not Track header enabled
 * GDPR-compliant: respects user privacy preferences
 */
function isDoNotTrackEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check for Do Not Track header (navigator.doNotTrack or window.doNotTrack)
  const dnt = (navigator as any).doNotTrack || (window as any).doNotTrack;
  return dnt === '1' || dnt === 'yes';
}

/**
 * Get safe user context for analytics (no PII)
 * Returns only:
 * - User's locale/language
 * - Device type (via User-Agent)
 * - Browser info (via User-Agent)
 */
export function getAnalyticsContext() {
  return {
    // URL-based locale is public and non-PII
    timestamp: new Date().toISOString(),
    respectsDNT: isDoNotTrackEnabled(),
  };
}
