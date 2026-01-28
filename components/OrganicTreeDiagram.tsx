'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeLevel, Concept } from '../lib/types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface OrganicTreeDiagramProps {
  levels: TreeLevel[];
  concepts: Concept[];
  onConceptClick: (concept: Concept) => void;
  showSimpleNames?: boolean;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
}

const NODE_POSITIONS: Record<string, NodePosition> = {
  // ROOTS (Level 1) - Bottom 25%
  "tokens": { id: "tokens", x: 280, y: 780, xPercent: 20, yPercent: 86.67 },
  "vectors": { id: "vectors", x: 520, y: 800, xPercent: 37.14, yPercent: 88.89 },
  "attention": { id: "attention", x: 760, y: 790, xPercent: 54.29, yPercent: 87.78 },
  "prefill-decode": { id: "prefill-decode", x: 1000, y: 775, xPercent: 71.43, yPercent: 86.11 },

  // TRUNK (Level 2) - Middle 35%
  "security": { id: "security", x: 640, y: 640, xPercent: 45.71, yPercent: 71.11 },
  "lora": { id: "lora", x: 720, y: 590, xPercent: 51.43, yPercent: 65.56 },
  "memory": { id: "memory", x: 660, y: 540, xPercent: 47.14, yPercent: 60.00 },
  "rag": { id: "rag", x: 720, y: 490, xPercent: 51.43, yPercent: 54.44 },
  "context-engineering": { id: "context-engineering", x: 660, y: 440, xPercent: 47.14, yPercent: 48.89 },

  // BRANCHES (Level 3) - Upper-middle 40%
  "complexity-levels": { id: "complexity-levels", x: 480, y: 360, xPercent: 34.29, yPercent: 40.00 },
  "ai-agents": { id: "ai-agents", x: 700, y: 340, xPercent: 50.00, yPercent: 37.78 },
  "mcp": { id: "mcp", x: 920, y: 365, xPercent: 65.71, yPercent: 40.56 },

  // LEAVES (Level 4) - Top 40%
  "green-ai": { id: "green-ai", x: 320, y: 200, xPercent: 22.86, yPercent: 22.22 },
  "moe": { id: "moe", x: 550, y: 160, xPercent: 39.29, yPercent: 17.78 },
  "reasoning-models": { id: "reasoning-models", x: 800, y: 180, xPercent: 57.14, yPercent: 20.00 },
  "agi-asi": { id: "agi-asi", x: 1040, y: 220, xPercent: 74.29, yPercent: 24.44 }
};

export function OrganicTreeDiagram({
  levels,
  concepts,
  onConceptClick,
  showSimpleNames = false
}: OrganicTreeDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const t = useTranslations('organicTree');

  const getLevelColor = (levelId: string) => {
    const colors: Record<string, string> = {
      roots: '#059669',
      trunk: '#d97706',
      branches: '#2563eb',
      leaves: '#7c3aed',
    };
    return colors[levelId] || '#6b7280';
  };

  const getLevelColorRgb = (levelId: string) => {
    const rgbs: Record<string, string> = {
      roots: '5, 150, 105',
      trunk: '217, 119, 6',
      branches: '37, 99, 235',
      leaves: '124, 58, 237',
    };
    return rgbs[levelId] || '107, 114, 128';
  };

  return (
    <div className="relative w-full mx-auto" style={{ maxWidth: '1400px', aspectRatio: '1400 / 900' }}>
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-3xl" />

      {/* Tree background image */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Image
          src="/img/tree-bg.jpg"
          alt="AI Knowledge Tree"
          fill
          className="object-contain opacity-15 mix-blend-multiply"
          style={{ filter: 'blur(0.5px) brightness(1.1)' }}
          priority
        />
      </div>

      {/* Regional color overlays */}
      <div className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-8">
        {/* Leaves overlay - top */}
        <div
          className="absolute left-0 right-0 h-1/4 top-0"
          style={{ background: 'radial-gradient(ellipse at top, #7c3aed, transparent 70%)' }}
        />
        {/* Branches overlay */}
        <div
          className="absolute left-0 right-0 h-1/4 top-1/4"
          style={{ background: 'radial-gradient(ellipse at center, #2563eb, transparent 70%)' }}
        />
        {/* Trunk overlay */}
        <div
          className="absolute left-0 right-0 h-1/4 top-2/4"
          style={{ background: 'radial-gradient(ellipse at center, #d97706, transparent 70%)' }}
        />
        {/* Roots overlay - bottom */}
        <div
          className="absolute left-0 right-0 h-1/4 top-3/4"
          style={{ background: 'radial-gradient(ellipse at bottom, #059669, transparent 70%)' }}
        />
      </div>

      {/* Vignette for focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(255,255,255,0.3) 100%)' }}
      />

      {/* Content layer with nodes */}
      <div className="relative w-full h-full">
        {concepts.map((concept) => {
          const position = NODE_POSITIONS[concept.id];
          if (!position) return null;

          const color = getLevelColor(concept.level);
          const colorRgb = getLevelColorRgb(concept.level);
          const isHovered = hoveredNode === concept.id;
          const displayName = showSimpleNames ? concept.simpleName : concept.title;

          return (
            <motion.button
              key={concept.id}
              className="absolute cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
              style={{
                left: `${position.xPercent}%`,
                top: `${position.yPercent}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: isHovered ? 50 : 10,
              }}
              onMouseEnter={() => setHoveredNode(concept.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onConceptClick(concept)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: concept.complexity * 0.1 }}
              aria-label={`View details for ${displayName}`}
              type="button"
            >
              {/* Node container */}
              <motion.div
                className="relative rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md border-2 px-5 py-3 min-w-[140px] max-w-[220px]"
                style={{
                  borderColor: `rgba(${colorRgb}, 0.3)`,
                  boxShadow: `0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(${colorRgb}, 0.08)`,
                }}
                animate={{
                  y: isHovered ? -4 : 0,
                  scale: isHovered ? 1.05 : 1,
                  borderColor: isHovered ? color : `rgba(${colorRgb}, 0.3)`,
                  boxShadow: isHovered
                    ? `0 12px 24px -4px rgba(${colorRgb}, 0.15), 0 20px 40px -8px rgba(${colorRgb}, 0.1)`
                    : `0 1px 3px rgba(0, 0, 0, 0.06), 0 4px 12px rgba(${colorRgb}, 0.08)`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Glow effect on hover */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-[-2px] rounded-[18px] -z-10"
                    style={{
                      background: `radial-gradient(circle, rgba(${colorRgb}, 0.6), transparent 70%)`,
                      filter: 'blur(8px)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Text content */}
                <div className="text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showSimpleNames ? 'simple' : 'technical'}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className={`font-semibold leading-tight ${
                        showSimpleNames ? 'text-base' : 'text-sm'
                      }`}
                      style={{
                        color: isHovered ? color : '#111827',
                      }}
                    >
                      {displayName}
                    </motion.div>
                  </AnimatePresence>

                  {/* Complexity badge */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                      style={{
                        background: concept.complexity === 1
                          ? '#d1fae5'
                          : concept.complexity === 2
                          ? '#fef3c7'
                          : '#fee2e2',
                        color: concept.complexity === 1
                          ? '#065f46'
                          : concept.complexity === 2
                          ? '#92400e'
                          : '#991b1b',
                      }}
                    >
                      {concept.complexity === 1 ? t('simple') : concept.complexity === 2 ? t('intermediate') : t('advanced')}
                    </motion.div>
                  )}
                </div>

                {/* Hover hint */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-xs text-gray-500 text-center"
                    >
                      {t('clickForDetails')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
