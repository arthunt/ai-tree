'use client';

import { Lightbulb, Code2, ArrowRight, Check } from 'lucide-react';
import { Concept } from '@/lib/types';
import { SheetState } from '@/lib/hooks/useBottomSheet';
import { useExplanationMode } from '@/lib/hooks/useExplanationMode';
import { ConceptVisualTab } from './ConceptVisualTab';
import { ConceptCodeTab } from './ConceptCodeTab';
import { ConceptConnectionsTab } from './ConceptConnectionsTab';
import { useTranslations } from 'next-intl';
import { useProgress } from '@/lib/useProgress';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptTabContentProps {
  concept: Concept;
  activeTab: 'explanation' | 'visual' | 'code' | 'connections';
  allConcepts: Concept[];
  onNavigate?: (conceptId: string) => void;
  sheetState: SheetState;
}

export function ConceptTabContent({
  concept,
  activeTab,
  allConcepts,
  onNavigate,
  sheetState,
}: ConceptTabContentProps) {
  const t = useTranslations('concept');
  const tData = useTranslations('conceptData');
  const { isCompleted: checkIsCompleted } = useProgress();
  const { mode, setMode } = useExplanationMode();

  // Get prerequisite concepts
  const prerequisites = concept.prerequisites
    ? concept.prerequisites
        .map(id => allConcepts.find(c => c.id === id))
        .filter((c): c is Concept => c !== undefined)
    : [];

  // Preview state - show condensed content
  if (sheetState === 'preview') {
    return (
      <div className="p-5">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {tData(`${concept.id}.metaphor`)}
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <AnimatePresence mode="wait">
        {/* Explanation Tab */}
        {activeTab === 'explanation' && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-5"
          >
            {/* Simple/Technical Toggle */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setMode('simple')}
                aria-pressed={mode === 'simple'}
                className={`px-6 py-2.5 min-h-[44px] rounded-full font-medium transition-all ${
                  mode === 'simple'
                    ? 'bg-purple-500 dark:bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('simpleMode')}
              </button>
              <button
                onClick={() => setMode('technical')}
                aria-pressed={mode === 'technical'}
                className={`px-6 py-2.5 min-h-[44px] rounded-full font-medium transition-all ${
                  mode === 'technical'
                    ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t('technicalMode')}
              </button>
            </div>

            {/* Content with fade animation */}
            <AnimatePresence mode="wait">
              {mode === 'simple' ? (
                <motion.section
                  key="simple"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-purple-500 dark:bg-purple-600 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-purple-900 dark:text-purple-200">
                      {t('simpleMetaphor')}
                    </h3>
                  </div>
                  <p className="text-purple-900 dark:text-purple-100 leading-loose text-[15px]">
                    {tData(`${concept.id}.metaphor`)}
                  </p>
                </motion.section>
              ) : (
                <motion.section
                  key="technical"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-500 dark:bg-blue-600 rounded-lg">
                      <Code2 className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-200">
                      {t('technicalExplanation')}
                    </h3>
                  </div>
                  <p className="text-blue-900 dark:text-blue-100 leading-loose text-[15px]">
                    {tData(`${concept.id}.explanation`)}
                  </p>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Prerequisites Section */}
            {prerequisites.length > 0 && (
              <section className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                    {t('learnFirst')}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {prerequisites.map((prereq) => {
                    const isPrereqCompleted = checkIsCompleted(prereq.id);
                    return (
                      <button
                        key={prereq.id}
                        onClick={() => onNavigate?.(prereq.id)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 text-sm rounded-full transition-colors min-h-[44px] ${
                          isPrereqCompleted
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {isPrereqCompleted && <Check className="h-3 w-3" />}
                        <span>{tData(`${prereq.id}.simpleName`)}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </motion.div>
        )}

        {/* Visual Tab */}
        {activeTab === 'visual' && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ConceptVisualTab concept={concept} />
          </motion.div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ConceptCodeTab concept={concept} />
          </motion.div>
        )}

        {/* Connections Tab */}
        {activeTab === 'connections' && (
          <motion.div
            key="connections"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <ConceptConnectionsTab
              concept={concept}
              allConcepts={allConcepts}
              onNavigate={onNavigate}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
