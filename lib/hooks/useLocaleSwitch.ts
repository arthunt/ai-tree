'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

type Messages = Record<string, unknown>;

/**
 * Hook for in-place locale switching without page navigation.
 *
 * When the popup is open, switching language loads the alternate messages
 * and provides them via an override — the component tree stays mounted.
 * When the popup closes, the URL navigates to sync the locale if it changed.
 */
export function useLocaleSwitch() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const urlLocale = params.locale as string;

  // The currently displayed locale (may differ from URL while popup is open)
  const [displayLocale, setDisplayLocale] = useState(urlLocale);
  // Loaded alternate messages (null = use default from provider)
  const [overrideMessages, setOverrideMessages] = useState<Messages | null>(null);
  // Loading state
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Reset when URL locale changes (e.g., after navigation)
  useEffect(() => {
    setDisplayLocale(urlLocale);
    setOverrideMessages(null);
  }, [urlLocale]);

  // Switch locale in-place (no navigation)
  const switchLocaleInPlace = useCallback(async (newLocale: string) => {
    if (newLocale === displayLocale) return;
    if (!locales.includes(newLocale as typeof locales[number])) return;

    if (newLocale === urlLocale) {
      // Switching back to URL locale — just clear override
      setDisplayLocale(urlLocale);
      setOverrideMessages(null);
      return;
    }

    setIsLoadingMessages(true);
    try {
      const messages = (await import(`@/messages/${newLocale}.json`)).default;
      setOverrideMessages(messages);
      setDisplayLocale(newLocale);
    } catch {
      // Fallback: navigate if import fails
      const newPathname = pathname.replace(`/${urlLocale}`, `/${newLocale}`);
      router.replace(newPathname, { scroll: false });
    } finally {
      setIsLoadingMessages(false);
    }
  }, [displayLocale, urlLocale, pathname, router]);

  // Sync URL when popup closes (if locale changed)
  const syncUrlLocale = useCallback(() => {
    if (displayLocale !== urlLocale) {
      const newPathname = pathname.replace(`/${urlLocale}`, `/${displayLocale}`);
      router.replace(newPathname, { scroll: false });
    }
    setOverrideMessages(null);
  }, [displayLocale, urlLocale, pathname, router]);

  // Whether the locale has been overridden from the URL locale
  const isOverridden = displayLocale !== urlLocale;

  return {
    displayLocale,
    overrideMessages,
    isOverridden,
    isLoadingMessages,
    switchLocaleInPlace,
    syncUrlLocale,
  };
}
