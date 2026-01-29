# Analytics Implementation - Code Reference

## Core Functions

### lib/analytics.ts

This file contains all privacy-respecting analytics functions. Each function automatically checks for Do Not Track header before sending data.

#### trackConceptOpen()
```typescript
trackConceptOpen(conceptId: string, locale: string): void
```
Tracks when a user opens/views a concept.

**Usage:**
```typescript
import { trackConceptOpen } from '@/lib/analytics';
import { useLocale } from 'next-intl';

function ConceptCard({ conceptId }) {
  const locale = useLocale();

  const handleOpen = () => {
    trackConceptOpen(conceptId, locale);
    // Then navigate to concept...
  };

  return <button onClick={handleOpen}>Open</button>;
}
```

**Data sent to Vercel:**
- `conceptId`: The concept ID (not personally identifiable)
- `locale`: Language code (en, et, etc.)
- Event name: "Concept Opened"

**Privacy:** No PII, respects DNT

---

#### trackSearch()
```typescript
trackSearch(locale: string, resultCount: number): void
```
Tracks when users perform searches (anonymized - no search terms stored).

**Usage:**
```typescript
import { trackSearch } from '@/lib/analytics';
import { useLocale } from 'next-intl';

function SearchBox() {
  const locale = useLocale();

  const handleSearch = (query: string) => {
    const results = performSearch(query);
    // Track that search happened, not what was searched
    trackSearch(locale, results.length);
    showResults(results);
  };

  return <form onSubmit={handleSearch}>...</form>;
}
```

**Data sent to Vercel:**
- `locale`: Language code
- `resultCount`: Number of results (shows search effectiveness)
- Event name: "Search Performed"

**Privacy:** Search query is NOT stored, only count

---

#### trackLanguageChange()
```typescript
trackLanguageChange(fromLocale: string, toLocale: string): void
```
Tracks when users switch between languages.

**Usage:**
```typescript
import { trackLanguageChange } from '@/lib/analytics';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  const handleChange = (newLocale: string) => {
    trackLanguageChange(currentLocale, newLocale);
    router.push(`/${newLocale}`);
  };

  return (
    <select onChange={(e) => handleChange(e.target.value)}>
      <option value="en">English</option>
      <option value="et">Eesti</option>
    </select>
  );
}
```

**Data sent to Vercel:**
- `fromLocale`: Previous language
- `toLocale`: New language
- Event name: "Language Changed"

**Privacy:** Public preference information only

---

#### trackFeatureView()
```typescript
trackFeatureView(featureName: string, locale: string): void
```
Tracks which features/pages users interact with.

**Usage:**
```typescript
import { trackFeatureView } from '@/lib/analytics';

const handleFeatureAccess = (featureName: string) => {
  trackFeatureView(featureName, locale);
};

// Or use automatic tracking with hook (see below)
```

**Data sent to Vercel:**
- `featureName`: Feature accessed (e.g., "tree-view", "concept-page")
- `locale`: Language code
- Event name: "Feature Viewed"

**Privacy:** Feature names only, no personal data

---

#### Utility Functions

```typescript
isDoNotTrackEnabled(): boolean
```
Checks if user has Do Not Track (DNT) enabled. Automatically called by all tracking functions.

```typescript
getAnalyticsContext()
```
Returns safe analytics context (no PII):
- `timestamp`: When the event occurred
- `respectsDNT`: Whether DNT is enabled

---

## React Hook

### lib/hooks/useAnalytics.ts

#### useAnalyticsPageView()
```typescript
useAnalyticsPageView(locale: string): void
```

Automatically tracks page views based on the current pathname. Use this hook in any client component to automatically track visits.

**Usage:**
```typescript
'use client';

import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';

export default function MyPage() {
  const locale = useLocale();

  // Automatically track this page view
  useAnalyticsPageView(locale);

  return <div>Page content</div>;
}
```

**How it works:**
1. Watches for pathname changes
2. Extracts the feature name from the path
3. Sends a "Feature Viewed" event to Vercel
4. Respects Do Not Track header

**Feature name mapping:**
- `/` or `` → "home-page"
- `/tree-view` → "tree-view-page"
- `/concept/123` → "concept-page"
- Other routes → "{first-segment}-page"

**Privacy:** Only URL structure, no parameters

---

## Layout Integration

### app/layout.tsx (MODIFIED)

The root layout includes the Vercel Analytics component:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

This automatically starts tracking:
- Page views
- Web Vitals (LCP, FID, CLS)
- Geography
- Device information

No additional configuration needed.

---

## Package Dependency

### package.json (MODIFIED)

```json
{
  "dependencies": {
    "@vercel/analytics": "^1.3.0"
  }
}
```

Install with: `npm install`

---

## Common Integration Patterns

### Pattern 1: Auto-track a Page
```typescript
'use client';
import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';

export default function ConceptPage() {
  const locale = useLocale();
  useAnalyticsPageView(locale);
  return <div>Content</div>;
}
```

### Pattern 2: Track User Actions
```typescript
'use client';
import { trackConceptOpen, trackSearch } from '@/lib/analytics';
import { useLocale } from 'next-intl';

export function InteractiveComponent() {
  const locale = useLocale();

  return (
    <div>
      <button onClick={() => trackConceptOpen('concept-123', locale)}>
        Open Concept
      </button>
    </div>
  );
}
```

### Pattern 3: Track with Results
```typescript
'use client';
import { trackSearch } from '@/lib/analytics';

const results = performSearch(query);
trackSearch(locale, results.length);
```

### Pattern 4: Lazy Loading (if needed)
```typescript
'use client';
import dynamic from 'next/dynamic';

// Can dynamically load analytics-heavy components
const SearchResults = dynamic(() => import('./SearchResults'), {
  loading: () => <LoadingSpinner />
});
```

---

## Privacy Implementation Details

### Do Not Track Compliance

All functions check DNT before sending data:

```typescript
function isDoNotTrackEnabled(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const dnt = (navigator as any).doNotTrack || window.doNotTrack;
  return dnt === '1' || dnt === 'yes';
}
```

If user has DNT enabled, events are silently skipped (no tracking).

### Data Anonymization

No PII is sent:
- No user IDs or names
- No email addresses
- No IP addresses (Vercel handles this server-side)
- No search query content
- Only public information (locale, concept IDs)

---

## Testing & Debugging

### Verify Analytics Code

```bash
# Check for compilation errors
npm run type-check

# Build to verify
npm run build
```

### Test in Development

```bash
npm run dev

# Open DevTools Console and check:
# 1. No TypeScript errors
# 2. useAnalyticsPageView calls don't error
# 3. trackX() functions don't error when called
```

### Test Do Not Track

```javascript
// In browser console, simulate DNT:
Object.defineProperty(navigator, 'doNotTrack', { value: '1' });

// Try to track:
import { trackConceptOpen } from '@/lib/analytics';
trackConceptOpen('test', 'en');
// Should silently skip (no event sent)
```

### Monitor in Production

1. Deploy to Vercel
2. Open Vercel Dashboard
3. Go to Analytics tab
4. Should see real-time events coming in
5. Check Network tab (look for analytics.vercel.com requests)

---

## Performance Considerations

### Bundle Size Impact
- @vercel/analytics: ~20KB gzipped
- analytics.ts functions: ~2KB
- useAnalytics hook: ~1KB
- Total impact: <25KB to bundle

### Runtime Performance
- Analytics requests are async (non-blocking)
- Minimal impact on page load
- Web Vitals monitored by Vercel (helps identify issues)

### Recommendations
- Monitor Web Vitals in dashboard
- Use lazy loading for heavy components
- Consider code splitting for routes

---

## Common Issues & Solutions

### "Cannot find module '@vercel/analytics'"
**Solution:** Run `npm install` to install dependencies

### Analytics not showing in Vercel Dashboard
**Solution:** Only production/preview deployments track. Local dev won't show data. Deploy to Vercel first.

### DNT breaking analytics
**Solution:** This is intentional! Users with DNT enabled won't be tracked (privacy-respecting).

### TypeScript errors in analytics functions
**Solution:** Ensure 'use client' directive is present in components using these functions

---

## References

- Vercel Analytics: https://vercel.com/docs/concepts/analytics
- Web Vitals: https://web.dev/vitals/
- Do Not Track: https://en.wikipedia.org/wiki/Do_Not_Track
- GDPR: https://gdpr.eu
- Privacy: https://vercel.com/docs/privacy

---

## Next Steps

1. Deploy to Vercel
2. Monitor analytics dashboard for 24-48 hours
3. Identify popular content (top concepts)
4. Identify performance issues (Web Vitals)
5. Optimize based on usage patterns
