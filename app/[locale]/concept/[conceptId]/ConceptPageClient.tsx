'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { Concept, TreeLevel } from '@/lib/types';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface ConceptPageClientProps {
  conceptId: string;
  locale: string;
  concepts: Concept[];
  levels: TreeLevel[];
}

export function ConceptPageClient({
  conceptId,
  locale,
  concepts,
  levels,
}: ConceptPageClientProps) {
  const router = useRouter();
  const t = useTranslations();
  const tData = useTranslations('conceptData');
  const tLevel = useTranslations('conceptLevels');
  const [concept, setConcept] = useState<Concept | null>(null);

  useEffect(() => {
    const foundConcept = concepts.find(c => c.id === conceptId);
    if (foundConcept) {
      setConcept(foundConcept);
    }
  }, [conceptId, concepts]);

  const handleClose = () => {
    // Navigate back to main page
    router.push(`/${locale}`);
  };

  const handleNavigate = (newConceptId: string) => {
    // Navigate to the new concept's shareable URL
    router.push(`/${locale}/concept/${newConceptId}`);
  };

  // Show loading state briefly while concept loads
  if (!concept) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🌳</div>
          <p className="text-gray-600 dark:text-gray-400">{t('loading.default')}</p>
        </motion.div>
      </div>
    );
  }

  // Get level info for context
  const level = levels.find(l => l.id === concept.level);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Minimal header with back button */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-4">
            <button
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{t('concept.backToTree')}</span>
            </button>
            <div className="flex-1" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {level ? tLevel(`${level.id}.name`) : ''} • {tData(`${concept.id}.title`)}
            </span>
          </div>
        </div>
      </header>

      {/* Background with subtle blur */}
      <div className="fixed inset-0 bg-black/20 dark:bg-black/40 -z-10" />

      {/* Lightbox - always visible on this page */}
      <ConceptLightbox
        concept={concept}
        onClose={handleClose}
        allConcepts={concepts}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
