'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { LevelSection } from '@/components/LevelSection';
import { TreeNavigation } from '@/components/TreeNavigation';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { TokenizerDemo } from '@/components/TokenizerDemo';
import treeData from '@/data/tree-concepts.json';
import Link from 'next/link';
import { Network } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function AITreePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [activeLevel, setActiveLevel] = useState('roots');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const data = treeData as TreeData;
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = data.levels.map(level => level.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveLevel(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.levels]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConcept]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('header.title')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('header.description')}</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/tree-view`}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                aria-label={t('header.treeViewAriaLabel')}
              >
                <Network className="h-5 w-5" aria-hidden="true" />
                {t('header.treeView')}
              </Link>
              <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Tree Navigation */}
      <TreeNavigation levels={data.levels} activeLevel={activeLevel} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 -z-10" />
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6" role="img" aria-label={t('hero.treeEmoji')}>🌳</div>
            <h2 id="hero-heading" className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('hero.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              {t('hero.subtitle')}
            </p>

            {/* View Options */}
            <div className="flex items-center justify-center gap-4 mb-8" role="navigation" aria-label={t('navigation.viewOptions')}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span role="img" aria-label={t('hero.bookEmoji')}>📚</span> {t('hero.classicViewTitle')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {t('hero.classicViewDescription')}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full inline-block" aria-current="page">
                  {t('hero.currentPage')}
                </div>
              </div>

              <div className="text-2xl text-gray-400 dark:text-gray-600" aria-hidden="true">{t('hero.or')}</div>

              <Link href={`/${locale}/tree-view`} aria-label={t('header.treeViewAriaLabel')}>
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 max-w-sm hover:shadow-xl transition-all cursor-pointer">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Network className="h-5 w-5" aria-hidden="true" /> {t('hero.treeViewTitle')}
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    {t('hero.treeViewDescription')}
                  </p>
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                    {t('hero.clickHere')}
                  </div>
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">1.</span>
                  <span className="text-2xl">🌱</span>
                  <span>{t('levels.roots')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">2.</span>
                  <span className="text-2xl">🌲</span>
                  <span>{t('levels.trunk')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">3.</span>
                  <span className="text-2xl">🌿</span>
                  <span>{t('levels.branches')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">4.</span>
                  <span className="text-2xl">🍃</span>
                  <span>{t('levels.leaves')}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                {t('hero.startFromRoots')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tokenizer Demo Section */}
      <section className="py-16 bg-white dark:bg-gray-900" aria-label="Tokeniseerija demo">
        <div className="container mx-auto px-4 max-w-7xl">
          <TokenizerDemo />
        </div>
      </section>

      {/* Level Sections */}
      <main aria-label={t('navigation.levelSections')}>
        {data.levels.map((level, index) => {
          const levelConcepts = data.concepts.filter(c => c.level === level.id);
          return (
            <LevelSection
              key={level.id}
              level={level}
              concepts={levelConcepts}
              viewMode={viewMode}
              index={index}
              onConceptClick={setSelectedConcept}
            />
          );
        })}
      </main>

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
          allConcepts={data.concepts}
          onNavigate={(conceptId) => {
            const concept = data.concepts.find(c => c.id === conceptId);
            if (concept) {
              setSelectedConcept(concept);
            }
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-400 dark:text-gray-500">
            {t('footer.description')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-600 mt-2">
            {t('footer.version')} {data.version} • {data.metadata.created}
          </p>
        </div>
      </footer>
    </div>
  );
}
