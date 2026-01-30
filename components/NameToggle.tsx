'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Heart } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface NameToggleProps {
  showSimpleNames: boolean;
  onChange: (showSimple: boolean) => void;
}

export function NameToggle({ showSimpleNames, onChange }: NameToggleProps) {
  const t = useTranslations('nameToggle');

  return (
    <div
      className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl shadow-md p-1 border border-gray-200 dark:border-gray-700"
      role="group"
      aria-label={t('ariaLabel')}
    >
      <button
        onClick={() => onChange(true)}
        className={`relative px-4 py-3 min-h-[44px] min-w-[44px] rounded-lg font-medium transition-all flex items-center gap-2 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none ${
          showSimpleNames
            ? 'text-white'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
        aria-label={t('simple')}
        aria-pressed={showSimpleNames}
        aria-current={showSimpleNames ? 'true' : undefined}
        type="button"
      >
        {showSimpleNames && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <Heart className="h-4 w-4 relative z-10" />
        <span className="relative z-10 text-sm">{t('simple')}</span>
      </button>

      <button
        onClick={() => onChange(false)}
        className={`relative px-4 py-3 min-h-[44px] min-w-[44px] rounded-lg font-medium transition-all flex items-center gap-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
          !showSimpleNames
            ? 'text-white'
            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
        }`}
        aria-label={t('technical')}
        aria-pressed={!showSimpleNames}
        aria-current={!showSimpleNames ? 'true' : undefined}
        type="button"
      >
        {!showSimpleNames && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <GraduationCap className="h-4 w-4 relative z-10" />
        <span className="relative z-10 text-sm">{t('technical')}</span>
      </button>
    </div>
  );
}
