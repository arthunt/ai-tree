'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';
import { TreeLevel } from '../lib/types';
import { LevelIcon } from './LevelIcon';
import { useTranslations } from 'next-intl';

interface TreeNavigationProps {
  levels: TreeLevel[];
  activeLevel: string;
  completedCount?: number;
  totalConcepts?: number;
  isLightboxOpen?: boolean;
}

export function TreeNavigation({ levels, activeLevel, completedCount = 0, totalConcepts = 0, isLightboxOpen = false }: TreeNavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');

  const scrollToLevel = (levelId: string) => {
    const element = document.getElementById(levelId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const activeIndex = levels.findIndex(l => l.id === activeLevel);
  const progressPercentage = totalConcepts > 0 ? Math.round((completedCount / totalConcepts) * 100) : 0;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile FAB Button */}
        {!isLightboxOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            aria-label={t('openNavPanel')}
            type="button"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              />

              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-label={t('treeLevels')}
              >
                {/* Handle bar */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('treeLevels')}</h2>
                    {totalConcepts > 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {completedCount}/{totalConcepts} {t('conceptsCompleted')} ({progressPercentage}%)
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-11 h-11 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    aria-label={t('closeNavPanel')}
                    type="button"
                  >
                    <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
                  {/* Learning progress bar */}
                  {totalConcepts > 0 && (
                    <div className="mb-3">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {/* Level indicator */}
                  <div className="flex items-center gap-2">
                    {levels.map((level, index) => (
                      <div
                        key={level.id}
                        className={`flex-1 h-2 rounded-full transition-colors ${
                          index <= activeIndex
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="p-4 space-y-2 overflow-y-auto">
                  {levels.map((level) => {
                    const isActive = activeLevel === level.id;
                    return (
                      <button
                        key={level.id}
                        onClick={() => scrollToLevel(level.id)}
                        className={`
                          w-full flex items-center gap-4 p-4 min-h-[56px] rounded-2xl transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none
                          ${isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }
                        `}
                        aria-label={t('goToLevel', { level: level.name })}
                        aria-current={isActive ? 'location' : undefined}
                        type="button"
                      >
                        <LevelIcon level={level.id as 'roots' | 'trunk' | 'branches' | 'leaves'} size={36} />
                        <div className="flex-1 text-left">
                          <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                            {level.order}. {level.name}
                          </div>
                          <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-300'}`}>
                            {level.subtitle}
                          </div>
                        </div>
                        {isActive && (
                          <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                            {t('currentLevel')}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navigation */}
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
                    <LevelIcon level={level.id as 'roots' | 'trunk' | 'branches' | 'leaves'} size={28} />
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
                        <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-300'}`}>
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
    </>
  );
}
