'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { setLanguageTag, languageTag, type AvailableLanguageTag } from '@/paraglide/runtime';

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

  // Set initial language tag
  setLanguageTag(initialLocale);

  const setLocale = useCallback((newLocale: AvailableLanguageTag) => {
    // Update ParaglideJS language tag
    setLanguageTag(newLocale);

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
    locale: initialLocale,
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
