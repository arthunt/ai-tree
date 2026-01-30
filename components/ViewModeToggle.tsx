'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Code2, LayoutGrid } from 'lucide-react';
import { ViewMode } from '../lib/types';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  const t = useTranslations('viewMode');

  const modes: { id: ViewMode; labelKey: string; icon: typeof Lightbulb }[] = [
    { id: 'metaphor', labelKey: 'simple', icon: Lightbulb },
    { id: 'technical', labelKey: 'technical', icon: Code2 },
    { id: 'both', labelKey: 'both', icon: LayoutGrid },
  ];

  return (
    <div
      className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2"
      role="group"
      aria-label={t('ariaLabel')}
    >
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = viewMode === mode.id;
        const label = t(mode.labelKey as 'both' | 'simple' | 'technical');

        return (
          <motion.button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`
              relative px-4 py-3 min-h-[44px] min-w-[44px] rounded-lg font-medium text-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none
              ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={label}
            aria-pressed={isActive}
            aria-current={isActive ? 'true' : undefined}
            type="button"
          >
            {isActive && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
