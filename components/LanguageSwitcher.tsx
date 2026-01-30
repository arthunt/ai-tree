'use client';

import { motion } from 'framer-motion';
import { useLanguage, type AvailableLanguageTag } from '@/context/LanguageContext';
import * as m from '@/paraglide/messages';

const locales: AvailableLanguageTag[] = ['et', 'en'];

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale } = useLanguage();

  const switchLanguage = (newLocale: AvailableLanguageTag) => {
    if (newLocale === currentLocale) return;
    setLocale(newLocale);
  };

  return (
    <div className="relative inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`relative px-4 py-2 min-h-[44px] text-sm font-medium transition-colors rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
              isActive
                ? 'text-white'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
            aria-label={locale === 'et' ? m.navigation_switchToEstonian() : m.navigation_switchToEnglish()}
            aria-current={isActive ? 'true' : undefined}
            type="button"
          >
            {isActive && (
              <motion.div
                layoutId="language-switcher-bg"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{locale.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
