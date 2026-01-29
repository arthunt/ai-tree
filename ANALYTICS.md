# Analytics Implementation - US-032

This document describes the privacy-respecting analytics implementation for AI Tree.

## Overview

AI Tree uses **Vercel Analytics** for privacy-compliant usage tracking. This solution is:

- **Privacy-first**: No personally identifiable information (PII) collected
- **GDPR-compliant**: No cookie consent banner required
- **Built-in**: Integrated with Vercel deployment platform
- **User-respecting**: Honors Do Not Track (DNT) headers
- **Lightweight**: Minimal performance impact

## Architecture

### 1. Vercel Analytics (Automatic)

The `Analytics` component from `@vercel/analytics/react` automatically tracks:

- **Page views**: Which pages users visit
- **Web Vitals**: Performance metrics (LCP, FID, CLS)
- **Geography**: Country-level location data
- **Device info**: Browser and device type
- **Route transitions**: Navigation patterns

This data is collected **without cookies** and respects all privacy regulations.

**Files modified:**
- `/app/layout.tsx` - Added `Analytics` component

### 2. Custom Analytics Events

Additional privacy-respecting events can be tracked via `/lib/analytics.ts`:

#### Available Event Tracking Functions

```typescript
// Track concept opens (which topics are popular)
trackConceptOpen(conceptId: string, locale: string)

// Track searches (no search terms logged - just that a search occurred)
trackSearch(locale: string, resultCount: number)

// Track language preference changes
trackLanguageChange(fromLocale: string, toLocale: string)

// Track feature/page views with readable names
trackFeatureView(featureName: string, locale: string)
```

#### Automatic Page View Tracking

Use the `useAnalyticsPageView` hook to automatically track page views:

```typescript
'use client';

import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';

export default function MyPage() {
  useAnalyticsPageView('en'); // Pass the locale

  return <div>My content</div>;
}
```

## Privacy Safeguards

### Do Not Track Compliance

All custom events respect the Do Not Track (DNT) header:

```typescript
// Users with DNT enabled will NOT have their events tracked
trackConceptOpen('concept-123', 'en');
// → Silently skipped if user has DNT enabled
```

### No PII Collection

The following are **not** tracked:
- User names or email addresses
- IP addresses (country-level only)
- Search query content (only count)
- Personal device identifiers
- Session/user IDs
- Cookies

The following **are** tracked (non-PII):
- Language preference (public URL parameter)
- Page/feature accessed (public URLs)
- Browser type (User-Agent derived)
- Device category (mobile/desktop)
- Timestamp
- Country-level geography

## Integration Guide

### For Page Components

To track when a page is viewed, import and use the hook:

```typescript
'use client';

import { useAnalyticsPageView } from '@/lib/hooks/useAnalytics';
import { useLocale } from 'next-intl';

export default function ConceptPage() {
  const locale = useLocale();
  useAnalyticsPageView(locale);

  return <div>Concept content</div>;
}
```

### For Feature-Specific Tracking

For custom events like concept opens or searches:

```typescript
'use client';

import { trackConceptOpen, trackSearch } from '@/lib/analytics';
import { useLocale } from 'next-intl';

export default function ConceptCard({ conceptId }) {
  const locale = useLocale();

  const handleClick = () => {
    trackConceptOpen(conceptId, locale);
    // Then navigate...
  };

  return <button onClick={handleClick}>Open Concept</button>;
}
```

## Dashboard Access

Vercel Analytics dashboard is available at:
- **Vercel Dashboard** → Project → Analytics tab
- Shows real-time data on usage patterns
- Provides insights into popular content
- Displays Web Vitals performance metrics

## Data Retention

- Vercel Analytics data is retained for **90 days** by default
- Historical data can be exported from the Vercel Dashboard
- No long-term storage of individual events

## Future Enhancements

Optional enhancements that maintain privacy:

1. **Learning Path Tracking** - Which concepts students progress through
2. **Time on Page** - How long users spend on each concept
3. **Navigation Patterns** - How concepts are discovered (search vs. browse)
4. **Device Performance** - Which devices have slowest load times
5. **A/B Testing** - Test different layouts or content structures

All of these can be implemented with the existing infrastructure while maintaining privacy.

## Compliance Checklist

- [x] No PII collection
- [x] GDPR compliant (no cookies needed)
- [x] Respects Do Not Track header
- [x] Privacy policy mentions analytics
- [x] No third-party tracking pixels
- [x] Data encrypted in transit
- [x] No behavioral profiling
- [x] No cross-site tracking
- [x] Minimal performance impact

## Testing

### Verify Analytics is Active

1. Open your app in production (or Vercel preview)
2. Open browser DevTools → Network tab
3. Navigate to a page
4. Look for requests to `v.vercel.com` or `analytics.vercel.com`
5. Should see events logged

### Test Do Not Track

```javascript
// In browser console, simulate DNT:
Object.defineProperty(navigator, 'doNotTrack', { value: '1' });

// Then try tracking - events should be silently skipped
```

## References

- [Vercel Analytics Documentation](https://vercel.com/docs/concepts/analytics)
- [Privacy Policy Template](https://vercel.com/docs/privacy)
- [GDPR Compliance](https://vercel.com/trust)
- [Web Vitals](https://web.dev/vitals/)
