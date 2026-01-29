'use client';

import { motion } from 'framer-motion';
import { TreeLevel, Concept } from '../lib/types';
import { getLevelIcon } from '../lib/utils';
import { useTranslations } from 'next-intl';
import {
  Users, Brain, Leaf, Bot, Plug, Layers, BookOpen,
  Notebook, GraduationCap, Shield, MapPin, Flashlight,
  BookText, Blocks, type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  users: Users, brain: Brain, leaf: Leaf, bot: Bot, plug: Plug,
  layers: Layers, stage: Layers, 'book-open': BookOpen,
  notebook: Notebook, 'graduation-cap': GraduationCap, shield: Shield,
  blocks: Blocks, 'map-pin': MapPin, flashlight: Flashlight,
  'book-text': BookText, 'chess-knight': Brain,
};

interface TreeDiagramProps {
  levels: TreeLevel[];
  concepts: Concept[];
  onConceptClick: (concept: Concept) => void;
}

export function TreeDiagram({ levels, concepts, onConceptClick }: TreeDiagramProps) {
  const tLevel = useTranslations('conceptLevels');
  const getLevelConcepts = (levelId: string) =>
    concepts.filter(c => c.level === levelId);

  const getLevelColor = (levelId: string) => {
    const colors: Record<string, string> = {
      roots: '#059669',
      trunk: '#d97706',
      branches: '#2563eb',
      leaves: '#7c3aed',
    };
    return colors[levelId] || '#6b7280';
  };

  // Calculat positions for tree layout
  const treeWidth = 800;
  const treeHeight = 600;
  const levelHeight = treeHeight / 4;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-5xl"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05))' }}
      >
        <defs>
          {/* Gradients for connection lines */}
          <linearGradient id="grad-roots-trunk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="grad-trunk-branches" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="grad-branches-leaves" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        {levels.slice(0, -1).map((level, idx) => {
          const nextLevel = levels[idx + 1];
          const currentConcepts = getLevelConcepts(level.id);
          const nextConcepts = getLevelConcepts(nextLevel.id);

          const y1 = (4 - level.order) * levelHeight + levelHeight / 2;
          const y2 = (4 - nextLevel.order) * levelHeight + levelHeight / 2;

          return currentConcepts.map((_, cIdx) => {
            const x1 = (treeWidth / (currentConcepts.length + 1)) * (cIdx + 1);

            return nextConcepts.map((__, nIdx) => {
              const x2 = (treeWidth / (nextConcepts.length + 1)) * (nIdx + 1);
              const midY = (y1 + y2) / 2;

              const gradientId = `grad-${level.id}-${nextLevel.id}`;

              return (
                <motion.path
                  key={`${level.id}-${cIdx}-${nextLevel.id}-${nIdx}`}
                  d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                  stroke={`url(#${gradientId})`}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: idx * 0.2 }}
                />
              );
            });
          });
        })}

        {/* Concept Nodes */}
        {levels.map((level) => {
          const levelConcepts = getLevelConcepts(level.id);
          const y = (4 - level.order) * levelHeight + levelHeight / 2;
          const color = getLevelColor(level.id);

          return levelConcepts.map((concept, idx) => {
            const x = (treeWidth / (levelConcepts.length + 1)) * (idx + 1);
            const IconComponent = iconMap[concept.icon] || Brain;

            return (
              <g
                key={concept.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => onConceptClick(concept)}
              >
                <motion.circle
                  r="24"
                  fill="white"
                  stroke={color}
                  strokeWidth="3"
                  className="transition-all duration-200 hover:r-28"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: (4 - level.order) * 0.2 + idx * 0.1 }}
                />
                <foreignObject
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  className="pointer-events-none"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <IconComponent size={16} style={{ color }} />
                  </div>
                </foreignObject>

                {/* Label */}
                <text
                  y="45"
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 pointer-events-none"
                  style={{ fontSize: '11px' }}
                >
                  {concept.title}
                </text>
              </g>
            );
          });
        })}

        {/* Level Labels */}
        {levels.map((level) => {
          const y = (4 - level.order) * levelHeight + levelHeight / 2;
          const color = getLevelColor(level.id);

          return (
            <g key={`label-${level.id}`} transform={`translate(50, ${y})`}>
              <text
                className="text-2xl"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {getLevelIcon(level.id)}
              </text>
              <text
                x="30"
                textAnchor="start"
                dominantBaseline="middle"
                className="text-sm font-bold"
                fill={color}
              >
                {level.order}. {tLevel(`${level.id}.name`)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
