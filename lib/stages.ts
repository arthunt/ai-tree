/**
 * Centralized Stage Registry — Single Source of Truth
 * Ref: VISION_AND_STRATEGY.md V3.0, Decision 9a
 *
 * All stage metadata lives here. Components import from this file
 * instead of defining their own STAGES arrays.
 */

import {
  Dna, CircleDot, Sprout, Leaf, TreeDeciduous, Cherry, LayoutGrid,
} from 'lucide-react';
import type { EvolutionStage } from '@/lib/concepts/types';

export type { EvolutionStage } from '@/lib/concepts/types';

export interface StageDefinition {
  id: EvolutionStage;
  /** English display label (UI chrome uses i18n keys, this is fallback) */
  label: string;
  /** Short subtitle describing the stage */
  sub: string;
  /** Lucide icon component */
  icon: React.ElementType;
  /** Tailwind text color class */
  color: string;
  /** Tailwind background class (low opacity) */
  bg: string;
  /** Tailwind glow shadow class */
  glow: string;
  /** URL path segment (without locale prefix) */
  href: string;
}

/**
 * The 7-stage evolution journey.
 * Order matters — it represents the learning progression.
 */
export const STAGES: StageDefinition[] = [
  {
    id: 'dna',
    label: 'DNA',
    sub: 'Mechanism',
    icon: Dna,
    color: 'text-brand-teal',
    bg: 'bg-brand-teal/10',
    glow: 'shadow-[0_0_20px_rgba(45,212,191,0.3)]',
    href: '/dna',
  },
  {
    id: 'seed',
    label: 'Seed',
    sub: 'Origins',
    icon: CircleDot,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]',
    href: '/seed',
  },
  {
    id: 'sprout',
    label: 'Sprout',
    sub: 'Emergence',
    icon: Sprout,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]',
    href: '/sprout',
  },
  {
    id: 'sapling',
    label: 'Sapling',
    sub: 'Practice',
    icon: Leaf,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
    href: '/sapling',
  },
  {
    id: 'tree',
    label: 'Tree',
    sub: 'Knowledge',
    icon: TreeDeciduous,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',
    href: '/tree-view',
  },
  {
    id: 'fruits',
    label: 'Fruits',
    sub: 'Applications',
    icon: Cherry,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    glow: 'shadow-[0_0_20px_rgba(251,113,133,0.3)]',
    href: '/fruits',
  },
  {
    id: 'orchard',
    label: 'Orchard',
    sub: 'Careers',
    icon: LayoutGrid,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    glow: 'shadow-[0_0_20px_rgba(192,132,252,0.3)]',
    href: '/orchard',
  },
];

/** Map stage ID to its URL path segment */
export const STAGE_HREF_MAP: Record<EvolutionStage, string> = Object.fromEntries(
  STAGES.map(s => [s.id, s.href])
) as Record<EvolutionStage, string>;

/** Get stage definition by ID */
export function getStageDefinition(id: EvolutionStage): StageDefinition | undefined {
  return STAGES.find(s => s.id === id);
}

/** Ordered list of stage IDs */
export const STAGE_ORDER: EvolutionStage[] = STAGES.map(s => s.id);
