'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackFeatureView } from '@/lib/analytics';

/**
 * Hook to automatically track feature views based on pathname
 * Maps routes to feature names for analytics
 */
export function useAnalyticsPageView(locale: string) {
  const pathname = usePathname();

  useEffect(() => {
    // Remove locale prefix from pathname to get feature name
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const featureName = pathWithoutLocale || 'home';

    // Map routes to readable feature names
    const featureMap: { [key: string]: string } = {
      '': 'home-page',
      '/': 'home-page',
      '/tree-view': 'tree-view-page',
      '/concept/[conceptId]': 'concept-page',
    };

    // Use mapped name or construct from path
    let trackingName = featureMap[pathWithoutLocale];
    if (!trackingName) {
      // Extract feature name from path (e.g., /concept/123 -> concept-page)
      const segments = pathWithoutLocale.split('/').filter(Boolean);
      trackingName = segments[0] ? `${segments[0]}-page` : 'unknown-page';
    }

    trackFeatureView(trackingName, locale);
  }, [pathname, locale]);
}
