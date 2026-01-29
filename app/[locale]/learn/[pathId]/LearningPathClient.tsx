'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useProgress } from '@/lib/useProgress';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { Concept, TreeLevel } from '@/lib/types';
import {
  ArrowLeft, Clock, BookOpen, Check, Circle, ChevronRight,
  Brain, MessageSquare, Database, Bot, SlidersHorizontal,
} from 'lucide-react';

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  'message-square': MessageSquare,
  database: Database,
  bot: Bot,
  sliders: SlidersHorizontal,
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
};

interface LearningPathClientProps {
  pathId: string;
  path: {
    id: string;
    icon: string;
    difficulty: string;
    estimatedMinutes: number;
    concepts: string[];
    prerequisites: string[];
  };
  concepts: Concept[];
  allConcepts: Concept[];
  levels: TreeLevel[];
  locale: string;
}

export function LearningPathClient({ pathId, path, concepts, allConcepts, levels, locale }: LearningPathClientProps) {
  const t = useTranslations('learningPaths');
  const tData = useTranslations('conceptData');
  const { isCompleted, toggleCompleted } = useProgress();
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  const Icon = iconMap[path.icon] || BookOpen;
  const completedCount = concepts.filter(c => isCompleted(c.id)).length;
  const total = concepts.length;
  const pct = Math.round((completedCount / total) * 100);
  const isPathDone = completedCount === total;

  // Find the next uncompleted concept
  const nextConcept = concepts.find(c => !isCompleted(c.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 max-w-4xl py-8 sm:py-16">
        {/* Breadcrumb */}
        <Link
          href={`/${locale}/learn`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToPaths')}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t(`${pathId}.title`)}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                {t(`${pathId}.longDescription`)}
              </p>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[path.difficulty]}`}>
              {t(path.difficulty)}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <BookOpen className="h-4 w-4" />
              {total} {t('concepts')}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              ~{path.estimatedMinutes} {t('minutes')}
            </span>
          </div>

          {/* Progress */}
          <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/50">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {t('progress')}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {t('conceptsCompleted', { count: completedCount, total })}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Path complete banner */}
        {isPathDone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 text-center"
          >
            <div className="text-3xl mb-2">🎉</div>
            <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-1">
              {t('pathComplete')}
            </h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-4">
              {t('pathCompleteDesc')}
            </p>
            <Link
              href={`/${locale}/learn`}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {t('exploreMore')}
            </Link>
          </motion.div>
        )}

        {/* Concept List */}
        <div className="space-y-3">
          {concepts.map((concept, idx) => {
            const done = isCompleted(concept.id);
            const isNext = !done && concept.id === nextConcept?.id;

            return (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => setSelectedConcept(concept)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all group ${
                    done
                      ? 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : isNext
                      ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm'
                      : 'border-gray-200/60 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step number / status */}
                    <div className="flex-shrink-0">
                      {done ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isNext
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-semibold text-sm sm:text-base ${
                          done
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'
                        } transition-colors`}>
                          {tData(`${concept.id}.title`)}
                        </h3>
                        {isNext && (
                          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 rounded-full uppercase">
                            {t('nextConcept')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {tData(`${concept.id}.simpleName`)}
                      </p>
                    </div>

                    {/* Action */}
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        {!isPathDone && nextConcept && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() => setSelectedConcept(nextConcept)}
              className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {completedCount > 0 ? t('continuePath') : t('startPath')}
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
          allConcepts={allConcepts}
          levels={levels}
          onNavigate={(conceptId) => {
            const c = allConcepts.find(x => x.id === conceptId);
            if (c) setSelectedConcept(c);
          }}
          isCompleted={isCompleted(selectedConcept.id)}
          onToggleComplete={() => toggleCompleted(selectedConcept.id)}
        />
      )}
    </div>
  );
}
