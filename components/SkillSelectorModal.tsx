'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, Wrench } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { Concept } from '@/lib/types';

interface SkillSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  concepts: Concept[];
  onConceptSelect: (concept: Concept) => void;
}

export function SkillSelectorModal({
  isOpen,
  onClose,
  onSelectLevel,
  concepts,
  onConceptSelect,
}: SkillSelectorModalProps) {
  const t = useTranslations('skillSelector');

  const handleBeginnerClick = () => {
    const tokensConcept = concepts.find(c => c.id === 'tokens');
    if (tokensConcept) {
      onConceptSelect(tokensConcept);
    }
    onClose();
  };

  const handleIntermediateClick = () => {
    // Scroll to trunk level
    const trunkElement = document.getElementById('trunk');
    if (trunkElement) {
      trunkElement.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  const handleAdvancedClick = () => {
    // Scroll to branches level
    const branchesElement = document.getElementById('branches');
    if (branchesElement) {
      branchesElement.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 text-center border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 min-w-[44px] min-h-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={t('close')}
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('title')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('subtitle')}
                </p>
              </div>

              {/* Options */}
              <div className="p-6 space-y-3">
                {/* Beginner */}
                <button
                  onClick={handleBeginnerClick}
                  className="w-full p-4 flex items-start gap-4 rounded-xl border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all text-left group"
                >
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-800 group-hover:bg-green-200 dark:group-hover:bg-green-700 transition-colors">
                    <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('beginner.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('beginner.description')}
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                      {t('beginner.time')}
                    </span>
                  </div>
                </button>

                {/* Intermediate */}
                <button
                  onClick={handleIntermediateClick}
                  className="w-full p-4 flex items-start gap-4 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all text-left group"
                >
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-800 group-hover:bg-blue-200 dark:group-hover:bg-blue-700 transition-colors">
                    <Compass className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('intermediate.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('intermediate.description')}
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                      {t('intermediate.time')}
                    </span>
                  </div>
                </button>

                {/* Advanced */}
                <button
                  onClick={handleAdvancedClick}
                  className="w-full p-4 flex items-start gap-4 rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all text-left group"
                >
                  <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-800 group-hover:bg-purple-200 dark:group-hover:bg-purple-700 transition-colors">
                    <Wrench className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {t('advanced.title')}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {t('advanced.description')}
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-800 px-2 py-1 rounded">
                      {t('advanced.time')}
                    </span>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  {t('skipAndExplore')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
