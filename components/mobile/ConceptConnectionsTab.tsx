'use client';

import { ArrowRight, ArrowDown, Check, Sparkles, Network } from 'lucide-react';
import { Concept } from '@/lib/types';
import { getComplexityColor } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useProgress } from '@/lib/useProgress';
import { LevelIcon } from '../LevelIcon';

interface ConceptConnectionsTabProps {
  concept: Concept;
  allConcepts: Concept[];
  onNavigate?: (conceptId: string) => void;
}

export function ConceptConnectionsTab({
  concept,
  allConcepts,
  onNavigate,
}: ConceptConnectionsTabProps) {
  const tConn = useTranslations('connections');
  const tComplexity = useTranslations('complexity');
  const tData = useTranslations('conceptData');
  const tNav = useTranslations('navigation');
  const { isCompleted: checkIsCompleted } = useProgress();

  // Prerequisites — concepts this one builds on
  const prerequisites = (concept.prerequisites || [])
    .map(id => allConcepts.find(c => c.id === id))
    .filter((c): c is Concept => c !== undefined);

  // Unlocks — concepts that list this one as a prerequisite
  const unlocks = allConcepts.filter(
    c => c.id !== concept.id && c.prerequisites?.includes(concept.id)
  );

  // Same-level siblings (excluding self)
  const siblings = allConcepts.filter(
    c => c.level === concept.level && c.id !== concept.id
  );

  // Depth explanation based on complexity
  const depthExplain =
    concept.complexity === 1
      ? tConn('coreIdeaExplain')
      : concept.complexity === 2
      ? tConn('connectedExplain')
      : tConn('deepDiveExplain');

  return (
    <div className="space-y-5">
      {/* Concept Depth Card */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 rounded-2xl p-5 border border-slate-200/60 dark:border-slate-700/40">
        <div className="flex items-center gap-2 mb-3">
          <Network className="h-4 w-4 text-slate-600 dark:text-slate-400" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {tConn('depthTitle')}
          </h3>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${getComplexityColor(concept.complexity)}`}>
            {tConn('depthLabel')}: {tComplexity(String(concept.complexity))}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {depthExplain}
        </p>
      </section>

      {/* Builds On (Prerequisites) */}
      <section className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border border-amber-200/60 dark:border-amber-800/40">
        <div className="flex items-center gap-2 mb-3">
          <ArrowDown className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
            {tConn('buildsOn')}
          </h3>
        </div>
        {prerequisites.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {prerequisites.map((prereq) => {
              const completed = checkIsCompleted(prereq.id);
              return (
                <button
                  key={prereq.id}
                  onClick={() => onNavigate?.(prereq.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl transition-all min-h-[40px] ${
                    completed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50'
                  }`}
                  type="button"
                >
                  {completed && <Check className="h-3 w-3 flex-shrink-0" />}
                  <span className="font-medium">{tData(`${prereq.id}.simpleName`)}</span>
                  <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-amber-700 dark:text-amber-300 italic">
            {tConn('buildsOnEmpty')}
          </p>
        )}
      </section>

      {/* Unlocks */}
      <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5 border border-emerald-200/60 dark:border-emerald-800/40">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
            {tConn('unlocks')}
          </h3>
        </div>
        {unlocks.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {unlocks.map((unlock) => {
              const completed = checkIsCompleted(unlock.id);
              return (
                <button
                  key={unlock.id}
                  onClick={() => onNavigate?.(unlock.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl transition-all min-h-[40px] ${
                    completed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                  }`}
                  type="button"
                >
                  {completed && <Check className="h-3 w-3 flex-shrink-0" />}
                  <span className="font-medium">{tData(`${unlock.id}.simpleName`)}</span>
                  <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-emerald-700 dark:text-emerald-300 italic">
            {tConn('unlocksEmpty')}
          </p>
        )}
      </section>

      {/* Same Level Siblings */}
      {siblings.length > 0 && (
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-200/60 dark:border-blue-800/40">
          <div className="flex items-center gap-2 mb-3">
            <LevelIcon level={concept.level as 'roots' | 'trunk' | 'branches' | 'leaves'} size={16} />
            <h3 className="text-sm font-bold text-blue-900 dark:text-blue-200">
              {tConn('sameLevel')} — {tNav(`levels.${concept.level}`)}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {siblings.map((sib) => {
              const completed = checkIsCompleted(sib.id);
              return (
                <button
                  key={sib.id}
                  onClick={() => onNavigate?.(sib.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-xl transition-all min-h-[40px] ${
                    completed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                  }`}
                  type="button"
                >
                  {completed && <Check className="h-3 w-3 flex-shrink-0" />}
                  <span className="font-medium">{tData(`${sib.id}.simpleName`)}</span>
                  <ArrowRight className="h-3 w-3 flex-shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
