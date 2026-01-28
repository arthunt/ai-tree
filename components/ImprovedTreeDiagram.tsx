'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeLevel, Concept } from '../lib/types';
import { getLevelIcon } from '../lib/utils';
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

interface ImprovedTreeDiagramProps {
  levels: TreeLevel[];
  concepts: Concept[];
  onConceptClick: (concept: Concept) => void;
  showSimpleNames?: boolean;
}

export function ImprovedTreeDiagram({ levels, concepts, onConceptClick, showSimpleNames = false }: ImprovedTreeDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

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

  // Compact sizing to fit on one screen
  const treeWidth = 1000;
  const treeHeight = 700; // Reduced from 1000 to fit on screen
  const levelSpacing = 160; // Reduced from 220 for better fit
  const topPadding = 60; // Reduced padding
  const bottomPadding = 60;

  return (
    <div className="relative w-full flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-gray-50 py-12">
      <svg
        viewBox={`0 0 ${treeWidth} ${treeHeight}`}
        className="w-full h-full max-w-7xl"
        style={{ minHeight: '600px', maxHeight: '700px' }}
      >
        <defs>
          {/* Gradients for connection lines */}
          <linearGradient id="grad-roots-trunk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="grad-trunk-branches" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="grad-branches-leaves" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Connection Lines */}
        {levels.slice(0, -1).map((level, idx) => {
          const nextLevel = levels[idx + 1];
          const currentConcepts = getLevelConcepts(level.id);
          const nextConcepts = getLevelConcepts(nextLevel.id);

          const y1 = bottomPadding + (4 - level.order) * levelSpacing;
          const y2 = bottomPadding + (4 - nextLevel.order) * levelSpacing;

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
                  opacity="0.25"
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
          const y = bottomPadding + (4 - level.order) * levelSpacing;
          const color = getLevelColor(level.id);

          return levelConcepts.map((concept, idx) => {
            const x = (treeWidth / (levelConcepts.length + 1)) * (idx + 1);
            const IconComponent = iconMap[concept.icon] || Brain;
            const isHovered = hoveredNode === concept.id;

            return (
              <g
                key={concept.id}
                transform={`translate(${x}, ${y})`}
                onMouseEnter={() => setHoveredNode(concept.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => onConceptClick(concept)}
                className="cursor-pointer"
              >
                {/* Hover background glow */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.circle
                      initial={{ r: 30, opacity: 0 }}
                      animate={{ r: 60, opacity: 0.2 }}
                      exit={{ r: 30, opacity: 0 }}
                      fill={color}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>

                {/* Main node circle */}
                <motion.circle
                  r={isHovered ? 40 : 28}
                  fill="white"
                  stroke={color}
                  strokeWidth={isHovered ? 4 : 3}
                  className="transition-all duration-200"
                  animate={{
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  initial={{ scale: 0 }}
                  style={{
                    filter: isHovered
                      ? `drop-shadow(0 8px 16px ${color}40)`
                      : `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
                  }}
                />

                {/* Icon */}
                <foreignObject
                  x={isHovered ? -16 : -12}
                  y={isHovered ? -16 : -12}
                  width={isHovered ? 32 : 24}
                  height={isHovered ? 32 : 24}
                  className="pointer-events-none transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-full h-full">
                    <IconComponent
                      size={isHovered ? 22 : 16}
                      style={{ color }}
                    />
                  </div>
                </foreignObject>

                {/* Label - appears on hover */}
                <AnimatePresence>
                  {isHovered && (() => {
                    const displayName = showSimpleNames ? concept.simpleName : concept.title;
                    const textWidth = Math.max(120, displayName.length * 7);
                    const boxWidth = Math.min(textWidth, 180);

                    return (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Background for text */}
                        <rect
                          x={-boxWidth / 2}
                          y="55"
                          width={boxWidth}
                          height="50"
                          rx="8"
                          fill="white"
                          stroke={color}
                          strokeWidth="2"
                          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                        />
                        {/* Title */}
                        <text
                          y="75"
                          textAnchor="middle"
                          className="text-sm font-bold pointer-events-none"
                          fill={color}
                          style={{ fontSize: '13px' }}
                        >
                          {displayName.length > 25
                            ? displayName.substring(0, 22) + '...'
                            : displayName}
                        </text>
                        {/* Hint */}
                        <text
                          y="92"
                          textAnchor="middle"
                          className="text-xs pointer-events-none"
                          fill="#6b7280"
                          style={{ fontSize: '10px' }}
                        >
                          Kliki detailideks
                        </text>
                      </motion.g>
                    );
                  })()}
                </AnimatePresence>

                {/* Small label when not hovered - just first letters */}
                {!isHovered && (
                  <text
                    y="48"
                    textAnchor="middle"
                    className="text-xs font-medium pointer-events-none"
                    fill="#9ca3af"
                    style={{ fontSize: '9px' }}
                  >
                    {(showSimpleNames ? concept.simpleName : concept.title).split(' ')[0].substring(0, 8)}
                  </text>
                )}
              </g>
            );
          });
        })}

        {/* Level Labels - positioned further left */}
        {levels.map((level) => {
          const y = bottomPadding + (4 - level.order) * levelSpacing;
          const color = getLevelColor(level.id);

          return (
            <g key={`label-${level.id}`} transform={`translate(80, ${y})`}>
              {/* Background */}
              <rect
                x="-70"
                y="-30"
                width="140"
                height="60"
                rx="12"
                fill="white"
                stroke={color}
                strokeWidth="2"
                opacity="0.95"
              />
              {/* Emoji */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y="-5"
                style={{ fontSize: '32px' }}
              >
                {getLevelIcon(level.id)}
              </text>
              {/* Number and Name */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                y="18"
                className="text-xs font-bold"
                fill={color}
                style={{ fontSize: '12px' }}
              >
                {level.order}. {level.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
