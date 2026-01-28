'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { useProgress } from '@/lib/useProgress';
import { LevelSection } from '@/components/LevelSection';
import { TreeNavigation } from '@/components/TreeNavigation';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { SettingsDropdown } from '@/components/SettingsDropdown';
import { TokenizerDemo } from '@/components/TokenizerDemo';
import { VectorDemo } from '@/components/VectorDemo';
import { SearchModal } from '@/components/SearchModal';
import treeData from '@/data/tree-concepts.json';
import Link from 'next/link';
import { Network, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function AITreePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [activeLevel, setActiveLevel] = useState('roots');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const data = treeData as TreeData;
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const { isCompleted, toggleCompleted, completedCount, getCompletionPercentage, clearProgress } = useProgress();
  const totalConcepts = data.concepts.length;

  // Simulate initial loading state
  useEffect(() => {
    // Set a short delay to show loading state and prevent layout shift
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Handle Cmd+K / Ctrl+K to open search and ESC to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // ESC to close lightbox
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
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-xl hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 transition-all font-medium group"
                aria-label={t('search.buttonLabel')}
              >
                <Search className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200" aria-hidden="true" />
                <span className="hidden sm:inline">{t('search.button')}</span>
                <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
              <Link
                href={`/${locale}/tree-view`}
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                aria-label={t('header.treeViewAriaLabel')}
              >
                <Network className="h-5 w-5" aria-hidden="true" />
                {t('header.treeView')}
              </Link>
              {/* Settings Dropdown - Tablet only (768-1023px) */}
              <div className="hidden md:flex lg:hidden">
                <SettingsDropdown viewMode={viewMode} onViewModeChange={setViewMode} />
              </div>
              {/* Individual Controls - Mobile and Desktop */}
              <div className="md:hidden lg:flex items-center gap-4">
                <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tree Navigation */}
      <TreeNavigation levels={data.levels} activeLevel={activeLevel} completedCount={completedCount} totalConcepts={totalConcepts} isLightboxOpen={selectedConcept !== null} />

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

            {/* Beginner Path CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 mb-8"
            >
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl px-6 py-4 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🚀</span>
                  <h3 className="font-bold text-lg">{t('hero.newToAI')}</h3>
                </div>
                <p className="text-sm text-white/90 mb-3">{t('hero.beginnerPathDesc')}</p>
                <button
                  onClick={() => {
                    const tokensConcept = data.concepts.find(c => c.id === 'tokens');
                    if (tokensConcept) setSelectedConcept(tokensConcept);
                  }}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('hero.startWithTokens')}
                  <span>→</span>
                </button>
              </div>
            </motion.div>

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

      {/* Vector Similarity Demo Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" aria-label="Vector similarity demo">
        <div className="container mx-auto px-4 max-w-7xl">
          <VectorDemo />
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
              isCompleted={isCompleted}
              isLoading={isLoading}
            />
          );
        })}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        concepts={data.concepts}
        onConceptSelect={(concept) => setSelectedConcept(concept)}
      />

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
          isCompleted={isCompleted(selectedConcept.id)}
          onToggleComplete={() => toggleCompleted(selectedConcept.id)}
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
          <div className="mt-4">
            <a
              href="https://github.com/arthunt/ai-tree/issues/new?title=[Feedback]&body=Please%20describe%20your%20feedback%20or%20issue%20here.%0A%0A**Concept%20(if%20applicable):**%20%0A**Issue%20type:**%20Bug%20/%20Enhancement%20/%20Question%20/%20Other"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {t('footer.reportIssue')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
