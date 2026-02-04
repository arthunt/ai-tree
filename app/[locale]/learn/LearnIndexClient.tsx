'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useProgress } from '@/lib/useProgress';
import { Brain, MessageSquare, Database, Bot, SlidersHorizontal, Briefcase, ArrowLeft, Clock, BookOpen, ChevronRight, Check } from 'lucide-react';
import pathsData from '@/data/learning-paths.json';
import { GlobalNav } from '@/components/GlobalNav';

const iconMap: Record<string, typeof Brain> = {
  brain: Brain,
  'message-square': MessageSquare,
  database: Database,
  bot: Bot,
  sliders: SlidersHorizontal,
  briefcase: Briefcase,
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400',
};

export function LearnIndexClient() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('learningPaths');
  const { isCompleted } = useProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <GlobalNav />
      <div className="container mx-auto px-4 max-w-5xl py-8 sm:py-16">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Path Cards */}
        <div className="grid gap-6">
          {pathsData.paths.map((path, idx) => {
            const Icon = iconMap[path.icon] || BookOpen;
            const completedCount = path.concepts.filter(id => isCompleted(id)).length;
            const total = path.concepts.length;
            const pct = Math.round((completedCount / total) * 100);
            const isPathDone = completedCount === total;

            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Link
                  href={`/${locale}/learn/${path.id}`}
                  className="group block p-6 sm:p-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/40 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {t(`${path.id}.title`)}
                        </h2>
                        {isPathDone && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded-full">
                            <Check className="h-3 w-3" />
                            {t('completed')}
                          </span>
                        )}
                      </div>

                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {t(`${path.id}.description`)}
                      </p>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[path.difficulty]}`}>
                          {t(path.difficulty)}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {total} {t('concepts')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          ~{path.estimatedMinutes} {t('minutes')}
                        </span>
                      </div>

                      {/* Progress bar */}
                      {completedCount > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>{t('conceptsCompleted', { count: completedCount, total })}</span>
                            <span>{pct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
