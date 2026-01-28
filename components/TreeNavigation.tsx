'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { TreeLevel } from '../lib/types';
import { getLevelIcon } from '../lib/utils';
import { useTranslations } from 'next-intl';

interface TreeNavigationProps {
  levels: TreeLevel[];
  activeLevel: string;
}

export function TreeNavigation({ levels, activeLevel }: TreeNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('navigation');

  const scrollToLevel = (levelId: string) => {
    const element = document.getElementById(levelId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block" aria-label={t('treeLevels')}>
      <motion.div
        animate={{ width: isExpanded ? '280px' : '64px' }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-3">
          {/* Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center min-h-[44px] min-w-[44px] p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors mb-2 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            aria-label={isExpanded ? t('closeNavPanel') : t('openNavPanel')}
            aria-expanded={isExpanded}
            type="button"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Navigation Items */}
          <div className="space-y-2">
            {levels.map((level, index) => {
              const isActive = activeLevel === level.id;
              return (
                <motion.button
                  key={level.id}
                  onClick={() => scrollToLevel(level.id)}
                  className={`
                    w-full flex items-center gap-3 p-3 min-h-[44px] rounded-xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none
                    ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={t('goToLevel', { level: level.name })}
                  aria-current={isActive ? 'location' : undefined}
                  type="button"
                >
                  <div className="flex items-center justify-center w-10 h-10 flex-shrink-0">
                    <span className="text-2xl">{getLevelIcon(level.id)}</span>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex-1 text-left overflow-hidden"
                      >
                        <div className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {level.order}. {level.name}
                        </div>
                        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                          {level.subtitle}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
