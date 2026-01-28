'use client';

import { Lightbulb, Code2, Terminal, ArrowRight, Check } from 'lucide-react';
import { Concept } from '@/lib/types';
import { SheetState } from '@/lib/hooks/useBottomSheet';
import { CodeBlock } from '@/components/CodeBlock';
import { useTranslations } from 'next-intl';
import { useProgress } from '@/lib/useProgress';

interface ConceptTabContentProps {
  concept: Concept;
  activeTab: 'metaphor' | 'technical' | 'code';
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
  const { isCompleted: checkIsCompleted } = useProgress();

  // Get prerequisite concepts
  const prerequisites = concept.prerequisites
    ? concept.prerequisites
        .map(id => allConcepts.find(c => c.id === id))
        .filter((c): c is Concept => c !== undefined)
    : [];

  // Preview state - show condensed content
  if (sheetState === 'preview') {
    return (
      <div className="p-4">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
          {concept.metaphor}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          ↑ Swipe up for more
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Prerequisites Section - Show in all tabs if present */}
      {prerequisites.length > 0 && activeTab === 'metaphor' && (
        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full transition-colors min-h-[36px] ${
                    isPrereqCompleted
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                  }`}
                >
                  {isPrereqCompleted && <Check className="h-3 w-3" />}
                  <span>{prereq.simpleName}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Metaphor Tab */}
      {activeTab === 'metaphor' && (
        <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-purple-500 dark:bg-purple-600 rounded-lg">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-purple-900 dark:text-purple-200">
              {t('simpleMetaphor')}
            </h3>
          </div>
          <p className="text-purple-900 dark:text-purple-100 leading-relaxed">
            {concept.metaphor}
          </p>
        </section>
      )}

      {/* Technical Tab */}
      {activeTab === 'technical' && (
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-500 dark:bg-blue-600 rounded-lg">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-200">
              {t('technicalExplanation')}
            </h3>
          </div>
          <p className="text-blue-900 dark:text-blue-100 leading-relaxed">
            {concept.explanation}
          </p>
        </section>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && concept.codeExample && (
        <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-slate-600 dark:bg-slate-700 rounded-lg">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-200">
              {t('codeExample')}
            </h3>
          </div>
          <CodeBlock
            code={concept.codeExample.code}
            language={concept.codeExample.language}
            explanation={concept.codeExample.explanation}
          />
        </section>
      )}

      {/* Swipe hint for navigation */}
      {sheetState === 'half' && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 py-2">
          ← Swipe left/right for prev/next concept →
        </p>
      )}
    </div>
  );
}
