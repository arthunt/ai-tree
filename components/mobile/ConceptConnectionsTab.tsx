'use client';

import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, MapPin } from 'lucide-react';
import { Concept } from '@/lib/types';
import { getComplexityColor } from '@/lib/utils';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useProgress } from '@/lib/useProgress';

interface ConceptConnectionsTabProps {
  concept: Concept;
  allConcepts: Concept[];
  onNavigate?: (conceptId: string) => void;
}

// Map prerequisite IDs to translation key suffixes (camelCase)
const PREREQ_KEY_MAP: Record<string, string> = {
  tokens: 'fromTokens',
  vectors: 'fromVectors',
  attention: 'fromAttention',
  memory: 'fromMemory',
  'ai-agents': 'fromAiAgents',
  'context-engineering': 'fromContextEngineering',
  rag: 'fromRag',
};

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
  const [showTechnical, setShowTechnical] = useState(false);
  const [expandedPrereq, setExpandedPrereq] = useState<string | null>(null);
  const [expandedUnlock, setExpandedUnlock] = useState<string | null>(null);

  // Derived data
  const prerequisites = (concept.prerequisites || [])
    .map(id => allConcepts.find(c => c.id === id))
    .filter((c): c is Concept => c !== undefined);

  const unlocks = allConcepts.filter(
    c => c.id !== concept.id && c.prerequisites?.includes(concept.id)
  );

  const siblings = allConcepts.filter(
    c => c.level === concept.level && c.id !== concept.id
  );

  const sameLevelConcepts = allConcepts.filter(c => c.level === concept.level);
  const posInLevel = sameLevelConcepts.findIndex(c => c.id === concept.id) + 1;
  const totalInLevel = sameLevelConcepts.length;

  // Level order for the breadcrumb
  const levelOrder = ['roots', 'trunk', 'branches', 'leaves'] as const;
  const currentLevelIdx = levelOrder.indexOf(concept.level as typeof levelOrder[number]);

  // Helper: get the relationship explanation for a prereq → this concept
  const getPrereqExplanation = (prereqId: string): string | null => {
    const key = PREREQ_KEY_MAP[prereqId];
    if (!key) return null;
    try {
      return tConn(`conceptLinks.${concept.id}.${key}`);
    } catch {
      return null;
    }
  };

  // Helper: get the relationship explanation for this concept → unlock
  const getUnlockExplanation = (unlockId: string): string | null => {
    const key = PREREQ_KEY_MAP[concept.id];
    if (!key) return null;
    try {
      return tConn(`conceptLinks.${unlockId}.${key}`);
    } catch {
      return null;
    }
  };

  // Safely get translation, return null if key doesn't exist
  const safeTranslation = (key: string): string | null => {
    try {
      const val = tConn(key);
      // next-intl returns the key itself if not found
      return val === key ? null : val;
    } catch {
      return null;
    }
  };

  const whySimple = safeTranslation(`conceptLinks.${concept.id}.why`);
  const whyTechnical = safeTranslation(`conceptLinks.${concept.id}.whyTechnical`);

  return (
    <div className="space-y-4">
      {/* 1. Position Breadcrumb — where am I? */}
      <div className="flex items-center gap-2 px-1">
        <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
        <div className="flex items-center gap-1 text-xs overflow-x-auto">
          {levelOrder.map((lvl, i) => {
            const isActive = lvl === concept.level;
            const isPast = i < currentLevelIdx;
            return (
              <span key={lvl} className="flex items-center gap-1 flex-shrink-0">
                {i > 0 && <span className="text-gray-300 dark:text-gray-600">›</span>}
                <span className={`px-2 py-0.5 rounded-full transition-colors ${isActive
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold'
                    : isPast
                      ? 'text-gray-500 dark:text-gray-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                  {tNav(`levels.${lvl}`)}
                </span>
              </span>
            );
          })}
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 flex-shrink-0 ml-auto font-medium">
          {posInLevel}/{totalInLevel}
        </span>
      </div>

      {/* 2. Why It Matters — simple one-liner + expandable technical */}
      {whySimple && (
        <section className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/20 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/30">
          <div className="flex items-start gap-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase flex-shrink-0 mt-0.5 ${getComplexityColor(concept.complexity)}`}>
              {tComplexity(String(concept.complexity))}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                {whySimple}
              </p>
              {whyTechnical && (
                <>
                  <button
                    onClick={() => setShowTechnical(!showTechnical)}
                    className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    {tConn('learnMore')}
                    <ChevronDown className={`h-3 w-3 transition-transform ${showTechnical ? 'rotate-180' : ''}`} />
                  </button>
                  {showTechnical && (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-2">
                      {whyTechnical}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 3. Builds On — prerequisites with relationship explanations */}
      <section>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
          {tConn('buildsOn')}
        </h3>
        {prerequisites.length > 0 ? (
          <div className="space-y-1.5">
            {prerequisites.map((prereq) => {
              const completed = checkIsCompleted(prereq.id);
              const explanation = getPrereqExplanation(prereq.id);
              const isExpanded = expandedPrereq === prereq.id;
              return (
                <div key={prereq.id} className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
                  <div className="flex items-center">
                    <button
                      onClick={() => onNavigate?.(prereq.id)}
                      className={`flex-1 flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors min-h-[40px] ${completed
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-800 dark:text-gray-200'
                        } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                      type="button"
                    >
                      {completed && <Check className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />}
                      <span className="font-medium">{tData(`${prereq.id}.simpleName`)}</span>
                      <ArrowRight className="h-3 w-3 opacity-30 flex-shrink-0" />
                    </button>
                    {explanation && (
                      <button
                        onClick={() => setExpandedPrereq(isExpanded ? null : prereq.id)}
                        className="px-3 py-2.5 text-xs text-blue-500 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l border-gray-200/60 dark:border-gray-700/40 flex items-center gap-1"
                        type="button"
                      >
                        {tConn('whyLabel')}
                        <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {isExpanded && explanation && (
                    <div className="px-3 pb-2.5 pt-0 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                      <p className="pt-2">{explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic px-1">
            {tConn('buildsOnEmpty')}
          </p>
        )}
      </section>

      {/* 4. Unlocks — what this concept enables */}
      <section>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
          {tConn('unlocks')}
        </h3>
        {unlocks.length > 0 ? (
          <div className="space-y-1.5">
            {unlocks.map((unlock) => {
              const completed = checkIsCompleted(unlock.id);
              const explanation = getUnlockExplanation(unlock.id);
              const isExpanded = expandedUnlock === unlock.id;
              return (
                <div key={unlock.id} className="rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
                  <div className="flex items-center">
                    <button
                      onClick={() => onNavigate?.(unlock.id)}
                      className={`flex-1 flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors min-h-[40px] ${completed
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-800 dark:text-gray-200'
                        } hover:bg-gray-50 dark:hover:bg-gray-800/50`}
                      type="button"
                    >
                      {completed && <Check className="h-3.5 w-3.5 flex-shrink-0 text-green-500" />}
                      <span className="font-medium">{tData(`${unlock.id}.simpleName`)}</span>
                      <ArrowRight className="h-3 w-3 opacity-30 flex-shrink-0" />
                    </button>
                    {explanation && (
                      <button
                        onClick={() => setExpandedUnlock(isExpanded ? null : unlock.id)}
                        className="px-3 py-2.5 text-xs text-blue-500 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l border-gray-200/60 dark:border-gray-700/40 flex items-center gap-1"
                        type="button"
                      >
                        {tConn('whyLabel')}
                        <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  {isExpanded && explanation && (
                    <div className="px-3 pb-2.5 pt-0 text-xs text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800">
                      <p className="pt-2">{explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 italic px-1">
            {tConn('unlocksEmpty')}
          </p>
        )}
      </section>

      {/* 5. Same Level — subtle, compact row */}
      {siblings.length > 0 && (
        <section>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">
            {tConn('sameLevel', { level: tNav(`levels.${concept.level}`) })}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {siblings.map((sib) => {
              const completed = checkIsCompleted(sib.id);
              return (
                <button
                  key={sib.id}
                  onClick={() => onNavigate?.(sib.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-lg transition-colors ${completed
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  type="button"
                >
                  {completed && <Check className="h-2.5 w-2.5 flex-shrink-0" />}
                  {tData(`${sib.id}.simpleName`)}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
