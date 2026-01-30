'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface ConceptNavBarProps {
  prevConcept: Concept | null;
  nextConcept: Concept | null;
  currentIndex: number;
  totalCount: number;
  onNavigate?: (conceptId: string) => void;
  levelName: string;
}

export function ConceptNavBar({
  prevConcept,
  nextConcept,
  currentIndex,
  totalCount,
  onNavigate,
  levelName,
}: ConceptNavBarProps) {
  const t = useTranslations();
  const tData = useTranslations('conceptData');

  // Calculate progress percentage
  const progressPercent = ((currentIndex + 1) / totalCount) * 100;

  // Get translated level name with fallback
  const translatedLevelName = t(`levels.${levelName}`, { default: levelName });

  return (
    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 pb-safe">
      <div className="flex items-center justify-between gap-3">
        {/* Previous button */}
        <button
          onClick={() => prevConcept && onNavigate?.(prevConcept.id)}
          disabled={!prevConcept}
          className={`flex items-center gap-1.5 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
            prevConcept
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
          }`}
          aria-label={prevConcept ? `Previous: ${tData(`${prevConcept.id}.simpleName`)}` : 'No previous concept'}
        >
          <ChevronLeft className="h-4 w-4 flex-shrink-0" />
          {prevConcept && (
            <span className="hidden xs:inline truncate max-w-[80px]">
              {tData(`${prevConcept.id}.simpleName`)}
            </span>
          )}
        </button>

        {/* Progress indicator */}
        <div className="flex-1 min-w-0 flex flex-col items-center gap-1.5">
          {/* Text indicator */}
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {currentIndex + 1} / {totalCount} • {translatedLevelName}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalCount}
              aria-label={`Concept ${currentIndex + 1} of ${totalCount}`}
            />
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={() => nextConcept && onNavigate?.(nextConcept.id)}
          disabled={!nextConcept}
          className={`flex items-center gap-1.5 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
            nextConcept
              ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
          }`}
          aria-label={nextConcept ? `Next: ${tData(`${nextConcept.id}.simpleName`)}` : 'No next concept'}
        >
          {nextConcept && (
            <span className="hidden xs:inline truncate max-w-[80px]">
              {tData(`${nextConcept.id}.simpleName`)}
            </span>
          )}
          <ChevronRight className="h-4 w-4 flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
