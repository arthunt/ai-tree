'use client';

import { ImageIcon } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const svgLoading = () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />;

const TokenizerDemo = dynamic(() => import('@/components/TokenizerDemo').then(mod => ({ default: mod.TokenizerDemo })), {
  loading: svgLoading,
});

const VectorDemo = dynamic(() => import('@/components/VectorDemo').then(mod => ({ default: mod.VectorDemo })), {
  loading: svgLoading,
});

// SVG visual components (lazy-loaded)
const AttentionSVG = dynamic(() => import('@/components/visuals/AttentionSVG').then(mod => ({ default: mod.AttentionSVG })), { loading: svgLoading });
const PrefillDecodeSVG = dynamic(() => import('@/components/visuals/PrefillDecodeSVG').then(mod => ({ default: mod.PrefillDecodeSVG })), { loading: svgLoading });
const ContextWindowSVG = dynamic(() => import('@/components/visuals/ContextWindowSVG').then(mod => ({ default: mod.ContextWindowSVG })), { loading: svgLoading });
const HallucinationsSVG = dynamic(() => import('@/components/visuals/HallucinationsSVG').then(mod => ({ default: mod.HallucinationsSVG })), { loading: svgLoading });
const TrainingInferenceSVG = dynamic(() => import('@/components/visuals/TrainingInferenceSVG').then(mod => ({ default: mod.TrainingInferenceSVG })), { loading: svgLoading });
const TransformersSVG = dynamic(() => import('@/components/visuals/TransformersSVG').then(mod => ({ default: mod.TransformersSVG })), { loading: svgLoading });
const ContextEngineeringSVG = dynamic(() => import('@/components/visuals/ContextEngineeringSVG').then(mod => ({ default: mod.ContextEngineeringSVG })), { loading: svgLoading });
const RagPipelineSVG = dynamic(() => import('@/components/visuals/RagPipelineSVG').then(mod => ({ default: mod.RagPipelineSVG })), { loading: svgLoading });
const MemoryTypesSVG = dynamic(() => import('@/components/visuals/MemoryTypesSVG').then(mod => ({ default: mod.MemoryTypesSVG })), { loading: svgLoading });
const LoraSVG = dynamic(() => import('@/components/visuals/LoraSVG').then(mod => ({ default: mod.LoraSVG })), { loading: svgLoading });
const SecuritySVG = dynamic(() => import('@/components/visuals/SecuritySVG').then(mod => ({ default: mod.SecuritySVG })), { loading: svgLoading });
const TemperatureSVG = dynamic(() => import('@/components/visuals/TemperatureSVG').then(mod => ({ default: mod.TemperatureSVG })), { loading: svgLoading });
const PromptingBasicsSVG = dynamic(() => import('@/components/visuals/PromptingBasicsSVG').then(mod => ({ default: mod.PromptingBasicsSVG })), { loading: svgLoading });
const AgentLoopSVG = dynamic(() => import('@/components/visuals/AgentLoopSVG').then(mod => ({ default: mod.AgentLoopSVG })), { loading: svgLoading });
const McpArchitectureSVG = dynamic(() => import('@/components/visuals/McpArchitectureSVG').then(mod => ({ default: mod.McpArchitectureSVG })), { loading: svgLoading });
const ComplexityLevelsSVG = dynamic(() => import('@/components/visuals/ComplexityLevelsSVG').then(mod => ({ default: mod.ComplexityLevelsSVG })), { loading: svgLoading });
const FunctionCallingSVG = dynamic(() => import('@/components/visuals/FunctionCallingSVG').then(mod => ({ default: mod.FunctionCallingSVG })), { loading: svgLoading });
const MoeSVG = dynamic(() => import('@/components/visuals/MoeSVG').then(mod => ({ default: mod.MoeSVG })), { loading: svgLoading });
const AgiAsiSVG = dynamic(() => import('@/components/visuals/AgiAsiSVG').then(mod => ({ default: mod.AgiAsiSVG })), { loading: svgLoading });
const GreenAiSVG = dynamic(() => import('@/components/visuals/GreenAiSVG').then(mod => ({ default: mod.GreenAiSVG })), { loading: svgLoading });
const ReasoningModelsSVG = dynamic(() => import('@/components/visuals/ReasoningModelsSVG').then(mod => ({ default: mod.ReasoningModelsSVG })), { loading: svgLoading });

const demoComponents: Record<string, React.ComponentType> = {
  TokenizerDemo,
  VectorDemo,
  // SVG visuals
  AttentionSVG,
  PrefillDecodeSVG,
  ContextWindowSVG,
  HallucinationsSVG,
  TrainingInferenceSVG,
  TransformersSVG,
  ContextEngineeringSVG,
  RagPipelineSVG,
  MemoryTypesSVG,
  LoraSVG,
  SecuritySVG,
  TemperatureSVG,
  PromptingBasicsSVG,
  AgentLoopSVG,
  McpArchitectureSVG,
  ComplexityLevelsSVG,
  FunctionCallingSVG,
  MoeSVG,
  AgiAsiSVG,
  GreenAiSVG,
  ReasoningModelsSVG,
};

interface ConceptVisualTabProps {
  concept: Concept;
  className?: string;
}

export function ConceptVisualTab({ concept, className = '' }: ConceptVisualTabProps) {
  const t = useTranslations('concept');
  const visual = concept.visual;

  // No visual data - show placeholder
  if (!visual) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
        <div className="p-4 bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900/30 dark:to-pink-900/30 rounded-2xl mb-4">
          <ImageIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          {t('visualComingSoon')}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[280px]">
          {t('visualComingSoonDesc')}
        </p>
      </div>
    );
  }

  // Component-based visual (demo or svg with component reference)
  if ((visual.type === 'demo' || visual.type === 'svg') && visual.component) {
    const DemoComponent = demoComponents[visual.component];
    if (!DemoComponent) {
      return (
        <div className={`p-4 ${className}`}>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Demo component &quot;{visual.component}&quot; not found.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={`${className}`}>
        <div className="rounded-2xl overflow-hidden">
          <DemoComponent />
        </div>
        {visual.caption && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // Image
  if (visual.type === 'image' && visual.src) {
    return (
      <div className={`${className}`}>
        <div className="rounded-2xl overflow-hidden">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={visual.src}
              alt={visual.alt}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
        {visual.caption && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // SVG or Diagram
  if ((visual.type === 'svg' || visual.type === 'diagram') && visual.src) {
    return (
      <div className={`${className}`}>
        <div className="rounded-2xl overflow-hidden p-4 bg-white dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visual.src}
            alt={visual.alt}
            className="w-full h-auto dark:brightness-90"
            loading="lazy"
          />
        </div>
        {visual.caption && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="p-4 bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900/30 dark:to-pink-900/30 rounded-2xl mb-4">
        <ImageIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        {t('visualComingSoon')}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[280px]">
        {t('visualComingSoonDesc')}
      </p>
    </div>
  );
}
