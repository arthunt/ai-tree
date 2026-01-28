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
  type LucideIcon,
} from 'lucide-react';
import { Concept } from '../lib/types';
import { getComplexityColor, getComplexityLabel } from '../lib/utils';
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

interface ConceptCardProps {
  concept: Concept;
  viewMode: 'metaphor' | 'technical' | 'both';
  index: number;
  onClick: () => void;
}

export function ConceptCard({ concept, viewMode, index, onClick }: ConceptCardProps) {
  const IconComponent = iconMap[concept.icon] || Brain;
  const t = useTranslations('concept');

  const displayText = viewMode === 'technical' ? concept.explanation : concept.metaphor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
    >
      <button
        className="relative h-full min-h-[120px] w-full overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-left focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        onClick={onClick}
        aria-label={`${t('viewDetails')} ${concept.title}`}
        type="button"
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 group-hover:from-blue-100 group-hover:to-purple-100 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-colors">
              <IconComponent className="h-5 w-5 text-blue-700 dark:text-blue-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {concept.title}
              </h3>
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(concept.complexity)}`}>
                {getComplexityLabel(concept.complexity)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4 flex-1">
            {displayText}
          </p>

          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700 text-blue-700 dark:text-blue-400 text-sm font-medium group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
            <Maximize2 className="h-4 w-4" />
            <span>{t('viewFullSize')}</span>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none rounded-xl" />
      </button>
    </motion.div>
  );
}
