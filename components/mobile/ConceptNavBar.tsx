'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useTranslations } from 'next-intl';

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

  return (
    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 pb-safe">
      <div className="flex items-center justify-between gap-2">
        {/* Previous button */}
        <button
          onClick={() => prevConcept && onNavigate?.(prevConcept.id)}
          disabled={!prevConcept}
          className={`flex items-center gap-1 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
            prevConcept
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
          aria-label={prevConcept ? `Previous: ${prevConcept.simpleName}` : 'No previous concept'}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden xs:inline truncate max-w-[60px]">
            {prevConcept?.simpleName || 'Prev'}
          </span>
        </button>

        {/* Progress indicator */}
        <div className="flex flex-col items-center">
          {/* Dots */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalCount, 7) }).map((_, i) => {
              // Show dots smartly if more than 7
              if (totalCount <= 7) {
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentIndex
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : i < currentIndex
                        ? 'bg-blue-300 dark:bg-blue-700'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              }
              // For more than 7, show first 2, ellipsis, current area, ellipsis, last 2
              if (i === 0 || i === 1) {
                const showIndex = i;
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      showIndex === currentIndex
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : showIndex < currentIndex
                        ? 'bg-blue-300 dark:bg-blue-700'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              }
              if (i === 2) {
                return <span key={i} className="text-xs text-gray-400">…</span>;
              }
              if (i === 3) {
                return (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"
                  />
                );
              }
              if (i === 4) {
                return <span key={i} className="text-xs text-gray-400">…</span>;
              }
              if (i >= 5) {
                const showIndex = totalCount - (7 - i);
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      showIndex === currentIndex
                        ? 'bg-blue-500 dark:bg-blue-400'
                        : showIndex < currentIndex
                        ? 'bg-blue-300 dark:bg-blue-700'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                );
              }
              return null;
            })}
          </div>
          {/* Text indicator */}
          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {currentIndex + 1} / {totalCount} • {t(`levels.${levelName}`)}
          </span>
        </div>

        {/* Next button */}
        <button
          onClick={() => nextConcept && onNavigate?.(nextConcept.id)}
          disabled={!nextConcept}
          className={`flex items-center gap-1 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
            nextConcept
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
          }`}
          aria-label={nextConcept ? `Next: ${nextConcept.simpleName}` : 'No next concept'}
        >
          <span className="hidden xs:inline truncate max-w-[60px]">
            {nextConcept?.simpleName || 'Next'}
          </span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
