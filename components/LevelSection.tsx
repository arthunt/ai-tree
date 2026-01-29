'use client';

import { motion } from 'framer-motion';
import { TreeLevel, Concept, ViewMode } from '../lib/types';
import { ConceptCard } from './ConceptCard';
import { SkeletonCard } from './SkeletonCard';
import { getLevelGradient } from '../lib/utils';
import { LevelIcon } from './LevelIcon';
import { useTranslations } from 'next-intl';

interface LevelSectionProps {
  level: TreeLevel;
  concepts: Concept[];
  viewMode: ViewMode;
  index: number;
  onConceptClick: (concept: Concept) => void;
  isCompleted?: (conceptId: string) => boolean;
  isLoading?: boolean;
}

export function LevelSection({ level, concepts, viewMode, index, onConceptClick, isCompleted, isLoading = false }: LevelSectionProps) {
  const t = useTranslations('levelSection');
  const tLevel = useTranslations('conceptLevels');
  const levelColors: Record<string, { from: string; to: string; border: string; darkFrom: string; darkTo: string }> = {
    roots: { from: 'from-emerald-50/40', to: 'to-emerald-100/10', border: 'border-emerald-200', darkFrom: 'dark:from-emerald-950/30', darkTo: 'dark:to-emerald-900/10' },
    trunk: { from: 'from-amber-50/40', to: 'to-amber-100/10', border: 'border-amber-200', darkFrom: 'dark:from-amber-950/30', darkTo: 'dark:to-amber-900/10' },
    branches: { from: 'from-blue-50/40', to: 'to-blue-100/10', border: 'border-blue-200', darkFrom: 'dark:from-blue-950/30', darkTo: 'dark:to-blue-900/10' },
    leaves: { from: 'from-purple-50/40', to: 'to-purple-100/10', border: 'border-purple-200', darkFrom: 'dark:from-purple-950/30', darkTo: 'dark:to-purple-900/10' },
  };

  const colors = levelColors[level.id] || levelColors.roots;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative py-16 sm:py-24 border-t-4"
      id={level.id}
      style={{ borderTopColor: level.color }}
      aria-labelledby={`level-heading-${level.id}`}
    >
      {/* Enhanced Background with multiple gradients */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.from} ${colors.to} ${colors.darkFrom} ${colors.darkTo} -z-10`} />

      {/* Decorative side indicator */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 opacity-30"
        style={{
          background: `linear-gradient(to bottom, ${level.color}, transparent)`,
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enhanced Level Header */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="flex items-start gap-4 sm:gap-6 mb-6">
            <div
              className="p-3 sm:p-4 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${level.color}20, ${level.color}10)`,
                border: `2px solid ${level.color}40`,
              }}
              aria-hidden="true"
            >
              <LevelIcon level={level.id as 'roots' | 'trunk' | 'branches' | 'leaves'} size={48} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xl font-bold px-2.5 py-0.5 rounded-lg text-white"
                  style={{ backgroundColor: level.color }}
                  aria-hidden="true"
                >
                  {level.order}
                </span>
                <h2 id={`level-heading-${level.id}`} className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {tLevel(`${level.id}.name`)}
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 font-medium mb-3">
                {tLevel(`${level.id}.subtitle`)}
              </p>
              <p className="text-base text-gray-800 dark:text-gray-300 max-w-3xl leading-relaxed">
                {tLevel(`${level.id}.description`)}
              </p>
            </div>
          </div>

          {/* Concept count indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="h-px flex-1 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent" />
            <span>{t('conceptCount', { count: concepts.length })}</span>
            <div className="h-px flex-1 bg-gradient-to-l from-gray-300 dark:from-gray-600 to-transparent" />
          </div>
        </motion.div>

        {/* Concepts Grid with staggered reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
          aria-label={t('concepts', { level: tLevel(`${level.id}.name`) })}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} role="listitem">
                <SkeletonCard index={idx} />
              </div>
            ))
          ) : (
            concepts.map((concept) => (
              <motion.div key={concept.id} role="listitem" variants={cardVariants}>
                <ConceptCard
                  concept={concept}
                  viewMode={viewMode}
                  index={0}
                  onClick={() => onConceptClick(concept)}
                  isCompleted={isCompleted?.(concept.id) ?? false}
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
