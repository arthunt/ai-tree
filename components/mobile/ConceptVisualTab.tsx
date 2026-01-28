'use client';

import { ImageIcon } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const TokenizerDemo = dynamic(() => import('@/components/TokenizerDemo').then(mod => ({ default: mod.TokenizerDemo })), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />,
});

const VectorDemo = dynamic(() => import('@/components/VectorDemo').then(mod => ({ default: mod.VectorDemo })), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl h-64" />,
});

const demoComponents: Record<string, React.ComponentType> = {
  TokenizerDemo,
  VectorDemo,
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
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
          <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
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

  // Demo component
  if (visual.type === 'demo' && visual.component) {
    const DemoComponent = demoComponents[visual.component];
    if (!DemoComponent) {
      return (
        <div className={`p-4 ${className}`}>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Demo component &quot;{visual.component}&quot; not found.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className={`p-4 ${className}`}>
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <DemoComponent />
        </div>
        {visual.caption && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // Image
  if (visual.type === 'image' && visual.src) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // SVG or Diagram
  if ((visual.type === 'svg' || visual.type === 'diagram') && visual.src) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visual.src}
            alt={visual.alt}
            className="w-full h-auto dark:brightness-90"
            loading="lazy"
          />
        </div>
        {visual.caption && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
            {visual.caption}
          </p>
        )}
      </div>
    );
  }

  // Fallback
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
        <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
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
