/**
 * EXAMPLES: How to use Analytics in AI Tree
 *
 * This file shows practical examples of integrating analytics
 * into different parts of the application.
 *
 * Delete this file before production - it's for reference only.
 */

// ============================================
// EXAMPLE 1: Track Concept Page Views
// ============================================

// In: /app/[locale]/concept/[conceptId]/page.tsx
/*
'use client';

import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';
import { trackConceptOpen } from '@/lib/analytics';

export default function ConceptPage({
  params,
}: {
  params: Promise<{ conceptId: string }>;
}) {
  const locale = useLocale();
  const { conceptId } = await params;

  // Automatically track page view
  useAnalyticsPageView(locale);

  // Alternatively, manually track the concept open
  useEffect(() => {
    trackConceptOpen(conceptId, locale);
  }, [conceptId, locale]);

  return <div>{// Your content }}</div>;
}
*/

// ============================================
// EXAMPLE 2: Track Search Functionality
// ============================================

// In: /components/SearchBox.tsx
/*
'use client';

import { useState } from 'react';
import { trackSearch } from '@/lib/analytics';
import { useLocale } from 'next-intl';

export function SearchBox() {
  const locale = useLocale();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform search...
    const results = searchConcepts(query);

    // Track search (no search terms - just count)
    trackSearch(locale, results.length);

    // Then show results...
    setResults(results);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search concepts..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
*/

// ============================================
// EXAMPLE 3: Track Language Changes
// ============================================

// In: /components/LanguageSwitcher.tsx
/*
'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { trackLanguageChange } from '@/lib/analytics';

export function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (newLocale: string) => {
    // Track the language change
    trackLanguageChange(currentLocale, newLocale);

    // Then navigate to the new locale
    router.push(`/${newLocale}`);
  };

  return (
    <select onChange={(e) => handleLanguageChange(e.target.value)}>
      <option value="en">English</option>
      <option value="et">Eesti keel</option>
    </select>
  );
}
*/

// ============================================
// EXAMPLE 4: Automatic Page View Tracking
// ============================================

// In any client component:
/*
'use client';

import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale();

  // This automatically sends a page view event
  // whenever pathname changes
  useAnalyticsPageView(locale);

  return <div>My content</div>;
}
*/

// ============================================
// EXAMPLE 5: Conditional Analytics Based on DNT
// ============================================

// The analytics functions automatically check DNT header
// But you can also check manually:

/*
import { getAnalyticsContext } from '@/lib/analytics';

export function MyComponent() {
  const context = getAnalyticsContext();

  if (context.respectsDNT) {
    console.log('User has Do Not Track enabled');
    // Analytics will be skipped automatically
  }

  return <div>Content</div>;
}
*/

// ============================================
// EXAMPLE 6: Custom Event Tracking
// ============================================

// You can extend /lib/analytics.ts with more events:

/*
import { track } from '@vercel/analytics';

export function trackConceptDownload(conceptId: string, format: string) {
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Concept Downloaded', {
    conceptId,
    format, // 'pdf', 'markdown', etc.
  });
}

export function trackVideoWatch(videoId: string, locale: string) {
  if (isDoNotTrackEnabled()) {
    return;
  }

  track('Video Watched', {
    videoId,
    locale,
  });
}
*/

// ============================================
// IMPORTANT: Privacy Guidelines
// ============================================

/*
NEVER TRACK:
- User names or IDs
- Email addresses
- IP addresses (Vercel handles this privately)
- Search query content
- Personal device identifiers
- Session/user IDs
- Custom user data

DO TRACK:
- Which pages/concepts are viewed
- Language preferences
- Feature usage (feature names only)
- Geographic location (country level only)
- Device type (mobile/desktop)
- Browser information
- Performance metrics

ALWAYS:
- Check for Do Not Track header (automatic in our functions)
- Anonymize data (no personal identifiers)
- Be transparent about what's tracked
- Provide opt-out mechanisms (DNT header)
*/

export {};
