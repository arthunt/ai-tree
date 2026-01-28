'use client';

import { motion } from 'framer-motion';
import { TreeLevel, Concept, ViewMode } from '../lib/types';
import { ConceptCard } from './ConceptCard';
import { getLevelGradient, getLevelIcon } from '../lib/utils';

interface LevelSectionProps {
  level: TreeLevel;
  concepts: Concept[];
  viewMode: ViewMode;
  index: number;
  onConceptClick: (concept: Concept) => void;
}

export function LevelSection({ level, concepts, viewMode, index, onConceptClick }: LevelSectionProps) {
  const levelColors: Record<string, { from: string; to: string; border: string }> = {
    roots: { from: 'from-emerald-50/50', to: 'to-emerald-100/20', border: 'border-emerald-200' },
    trunk: { from: 'from-amber-50/50', to: 'to-amber-100/20', border: 'border-amber-200' },
    branches: { from: 'from-blue-50/50', to: 'to-blue-100/20', border: 'border-blue-200' },
    leaves: { from: 'from-purple-50/50', to: 'to-purple-100/20', border: 'border-purple-200' },
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
    >
      {/* Enhanced Background with multiple gradients */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.from} ${colors.to} -z-10`} />

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
            >
              <span className="text-6xl">{getLevelIcon(level.id)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-2xl font-bold px-3 py-1 rounded-lg text-white"
                  style={{ backgroundColor: level.color }}
                >
                  {level.order}
                </span>
                <h2 className="text-4xl font-bold text-gray-900">
                  {level.name}
                </h2>
              </div>
              <p className="text-xl text-gray-600 font-medium mb-3">
                {level.subtitle}
              </p>
              <p className="text-gray-700 max-w-3xl leading-relaxed">
                {level.description}
              </p>
            </div>
          </div>

          {/* Concept count indicator */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
            <span>{concepts.length} kontseptsiooni</span>
            <div className="h-px flex-1 bg-gradient-to-l from-gray-300 to-transparent" />
          </div>
        </motion.div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept, idx) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              viewMode={viewMode}
              index={idx}
              onClick={() => onConceptClick(concept)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
