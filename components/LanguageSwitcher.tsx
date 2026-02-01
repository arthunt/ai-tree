'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage, type AvailableLanguageTag } from '@/context/LanguageContext';

/** Locale display metadata — extend this when adding new languages */
const LOCALE_META: Record<string, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  et: { label: 'Estonian', native: 'Eesti' },
  ru: { label: 'Russian', native: 'Русский' },
};

export function LanguageSwitcher() {
  const { locale: currentLocale, setLocale, availableLocales } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const switchLanguage = (newLocale: AvailableLanguageTag) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    setLocale(newLocale);
    setIsOpen(false);
  };

  const current = LOCALE_META[currentLocale] || { label: currentLocale, native: currentLocale.toUpperCase() };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-sm font-medium rounded-lg
          bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.native}`}
        type="button"
      >
        <Globe size={16} />
        <span className="uppercase tracking-wide">{currentLocale}</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl
              bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
              shadow-lg dark:shadow-black/30 overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
          >
            {(availableLocales as readonly string[]).map((locale) => {
              const meta = LOCALE_META[locale] || { label: locale, native: locale.toUpperCase() };
              const isActive = locale === currentLocale;
              return (
                <button
                  key={locale}
                  onClick={() => switchLanguage(locale as AvailableLanguageTag)}
                  role="option"
                  aria-selected={isActive}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors
                    ${isActive
                      ? 'bg-brand-teal/10 text-brand-teal dark:text-brand-cyan font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                >
                  <span>{meta.native}</span>
                  {isActive && <Check size={16} className="text-brand-teal dark:text-brand-cyan" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
