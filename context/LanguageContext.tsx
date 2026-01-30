'use client';

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { setLanguageTag, languageTag, type AvailableLanguageTag, availableLanguageTags } from '@/paraglide/runtime';

interface LanguageContextType {
  locale: AvailableLanguageTag;
  setLocale: (locale: AvailableLanguageTag) => void;
  availableLocales: readonly AvailableLanguageTag[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: AvailableLanguageTag;
}

export function LanguageProvider({ children, initialLocale }: LanguageProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [currentLocale, setCurrentLocale] = useState<AvailableLanguageTag>(initialLocale);

  // Sync languageTag with URL locale on every navigation (including client-side)
  useEffect(() => {
    const urlLocale = params.locale as string;
    if (urlLocale && availableLanguageTags.includes(urlLocale as AvailableLanguageTag)) {
      setLanguageTag(urlLocale as AvailableLanguageTag);
      setCurrentLocale(urlLocale as AvailableLanguageTag);
    }
  }, [params.locale]);

  // Also set on initial mount
  setLanguageTag(currentLocale);

  const setLocale = useCallback((newLocale: AvailableLanguageTag) => {
    // Update ParaglideJS language tag
    setLanguageTag(newLocale);
    setCurrentLocale(newLocale);

    // Navigate to the new locale path
    const segments = pathname.split('/');
    if (segments[1] === 'et' || segments[1] === 'en') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || '/';

    // Use router.push for client-side navigation
    router.push(newPath);
  }, [pathname, router]);

  const value: LanguageContextType = {
    locale: currentLocale,
    setLocale,
    availableLocales: ['en', 'et'] as const,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Re-export for convenience
export { languageTag };
export type { AvailableLanguageTag };
