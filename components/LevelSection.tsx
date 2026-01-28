'use client';

import { motion } from 'framer-motion';
import { TreeLevel, Concept, ViewMode } from '../lib/types';
import { ConceptCard } from './ConceptCard';
import { getLevelGradient, getLevelIcon } from '../lib/utils';
import { useTranslations } from 'next-intl';

interface LevelSectionProps {
  level: TreeLevel;
  concepts: Concept[];
  viewMode: ViewMode;
  index: number;
  onConceptClick: (concept: Concept) => void;
}

export function LevelSection({ level, concepts, viewMode, index, onConceptClick }: LevelSectionProps) {
  const t = useTranslations('levelSection');
  const levelColors: Record<string, { from: string; to: string; border: string; darkFrom: string; darkTo: string }> = {
    roots: { from: 'from-emerald-50/50', to: 'to-emerald-100/20', border: 'border-emerald-200', darkFrom: 'dark:from-emerald-950/50', darkTo: 'dark:to-emerald-900/20' },
    trunk: { from: 'from-amber-50/50', to: 'to-amber-100/20', border: 'border-amber-200', darkFrom: 'dark:from-amber-950/50', darkTo: 'dark:to-amber-900/20' },
    branches: { from: 'from-blue-50/50', to: 'to-blue-100/20', border: 'border-blue-200', darkFrom: 'dark:from-blue-950/50', darkTo: 'dark:to-blue-900/20' },
    leaves: { from: 'from-purple-50/50', to: 'to-purple-100/20', border: 'border-purple-200', darkFrom: 'dark:from-purple-950/50', darkTo: 'dark:to-purple-900/20' },
  };

  const colors = levelColors[level.id] || levelColors.roots;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.2 }}
      className="relative py-20 border-t-4"
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
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.2 + 0.1 }}
          className="mb-12"
        >
          <div className="flex items-start gap-6 mb-6">
            <div
              className="p-4 rounded-2xl shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${level.color}20, ${level.color}10)`,
                border: `2px solid ${level.color}40`,
              }}
              aria-hidden="true"
            >
              <span className="text-6xl">{getLevelIcon(level.id)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-2xl font-bold px-3 py-1 rounded-lg text-white"
                  style={{ backgroundColor: level.color }}
                  aria-hidden="true"
                >
                  {level.order}
                </span>
                <h2 id={`level-heading-${level.id}`} className="text-4xl font-bold text-gray-900 dark:text-white">
                  {level.name}
                </h2>
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 font-medium mb-3">
                {level.subtitle}
              </p>
              <p className="text-gray-800 dark:text-gray-300 max-w-3xl leading-relaxed">
                {level.description}
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

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label={t('concepts', { level: level.name })}>
          {concepts.map((concept, idx) => (
            <div key={concept.id} role="listitem">
              <ConceptCard
                concept={concept}
                viewMode={viewMode}
                index={idx}
                onClick={() => onConceptClick(concept)}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
