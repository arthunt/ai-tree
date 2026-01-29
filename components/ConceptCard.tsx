'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Brain,
  Leaf,
  Bot,
  Plug,
  Layers,
  BookOpen,
  Notebook,
  GraduationCap,
  Shield,
  MapPin,
  Flashlight,
  BookText,
  Blocks,
  Maximize2,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { Concept } from '../lib/types';
import { getComplexityColor, getComplexityLabel, getReadingTime } from '../lib/utils';
import { useTranslations } from 'next-intl';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  brain: Brain,
  leaf: Leaf,
  'chess-knight': Brain,
  bot: Bot,
  plug: Plug,
  layers: Layers,
  stage: Layers,
  'book-open': BookOpen,
  notebook: Notebook,
  'graduation-cap': GraduationCap,
  shield: Shield,
  blocks: Blocks,
  'map-pin': MapPin,
  flashlight: Flashlight,
  'book-text': BookText,
};

// Beginner path: concepts recommended for first-time learners
const BEGINNER_PATH = ['tokens', 'vectors', 'attention', 'context-engineering', 'rag'];

interface ConceptCardProps {
  concept: Concept;
  viewMode: 'metaphor' | 'technical' | 'both';
  index: number;
  onClick: () => void;
  isCompleted?: boolean;
}

export function ConceptCard({ concept, viewMode, index, onClick, isCompleted = false }: ConceptCardProps) {
  const IconComponent = iconMap[concept.icon] || Brain;
  const t = useTranslations('concept');
  const isBeginnerPath = BEGINNER_PATH.includes(concept.id);
  const beginnerPathIndex = BEGINNER_PATH.indexOf(concept.id) + 1;
  const readingTime = getReadingTime(concept);

  const displayText = viewMode === 'technical' ? concept.explanation : concept.metaphor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
    >
      <button
        className={`relative h-full min-h-[120px] w-full overflow-hidden rounded-2xl border bg-white/70 dark:bg-gray-800/60 backdrop-blur-sm hover:bg-white/90 dark:hover:bg-gray-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
          isCompleted
            ? 'border-green-400/60 dark:border-green-500/40 ring-1 ring-green-200/50 dark:ring-green-800/30'
            : 'border-gray-200/60 dark:border-gray-700/50 hover:border-blue-300/60 dark:hover:border-blue-500/30'
        }`}
        onClick={onClick}
        aria-label={`${t('viewDetails')} ${concept.title}`}
        type="button"
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/15 dark:to-purple-400/15 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-colors ring-1 ring-blue-500/10 dark:ring-blue-400/10">
              <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {concept.title}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(concept.complexity)}`}>
                  {getComplexityLabel(concept.complexity)}
                </span>
                <span className="inline-block text-xs px-2 py-1 rounded-full font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  {readingTime} {t('readingTime')}
                </span>
                {isBeginnerPath && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    🚀 {t('beginnerPath')} #{beginnerPathIndex}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
            {displayText}
          </p>

          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50 text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
            <Maximize2 className="h-4 w-4" />
            <span>{t('viewFullSize')}</span>
          </div>
        </div>

        {/* Hover gradient border glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/[0.04] group-hover:to-purple-500/[0.06] transition-all duration-500 pointer-events-none rounded-2xl" />

        {/* Completion indicator */}
        {isCompleted && (
          <div className="absolute top-3 right-3 p-1 bg-green-500/90 backdrop-blur-sm rounded-full shadow-lg ring-2 ring-green-400/30" aria-label={t('completed')}>
            <CheckCircle2 className="h-4 w-4 text-white" />
          </div>
        )}
      </button>
    </motion.div>
  );
}
