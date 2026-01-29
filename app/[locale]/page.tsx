'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { useProgress } from '@/lib/useProgress';
import { LevelSection } from '@/components/LevelSection';
import { LevelIcon } from '@/components/LevelIcon';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { SettingsDropdown } from '@/components/SettingsDropdown';
import { TokenizerDemo } from '@/components/TokenizerDemo';
import { VectorDemo } from '@/components/VectorDemo';
import { SearchModal } from '@/components/SearchModal';
import { SkillSelectorModal } from '@/components/SkillSelectorModal';
import { DendrixLogo } from '@/components/DendrixLogo';
import treeData from '@/data/tree-concepts.json';
import Link from 'next/link';
import { Network, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function AITreePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [activeLevel, setActiveLevel] = useState('leaves');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSkillSelectorOpen, setIsSkillSelectorOpen] = useState(false);
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

  // Derive active level data for context bar
  const activeLevelData = data.levels.find(l => l.id === activeLevel);

  // Track active section on scroll + header fold
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header - Compact on mobile, shrinks on scroll */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60">
        <div className={`container mx-auto max-w-7xl transition-all duration-300 ${isScrolled ? 'px-3 py-1 sm:px-4 sm:py-1.5' : 'px-3 py-2 sm:px-4 sm:py-3'}`}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 text-left group"
              aria-label="Back to top"
              type="button"
            >
              <DendrixLogo size={isScrolled ? 28 : 36} animate={false} className="flex-shrink-0 transition-all duration-300" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-gray-900 dark:text-white truncate transition-all duration-300 ${isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                    dendrix.ai
                  </span>
                </div>
                {!isScrolled && (
                  <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 truncate">{t('header.description')}</p>
                )}
              </div>
            </button>
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 transition-all font-medium group ${
                  isScrolled
                    ? 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg'
                    : 'w-10 h-10 sm:w-auto sm:h-auto sm:min-w-[44px] sm:min-h-[44px] sm:px-4 sm:py-3 rounded-lg sm:rounded-xl'
                }`}
                aria-label={t('search.buttonLabel')}
              >
                <Search className={`text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
                {!isScrolled && <span className="hidden sm:inline ml-2">{t('search.button')}</span>}
                {!isScrolled && (
                  <kbd className="hidden lg:inline-flex items-center gap-1 ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                )}
              </button>

              {/* Concept Map Button */}
              <Link
                href={`/${locale}/tree-view`}
                className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all font-medium ${
                  isScrolled
                    ? 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg'
                    : 'w-10 h-10 sm:w-auto sm:h-auto sm:min-w-[44px] sm:min-h-[44px] sm:px-4 sm:py-3 rounded-lg sm:rounded-xl'
                }`}
                aria-label={t('header.treeViewAriaLabel')}
              >
                <Network className={isScrolled ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
                {!isScrolled && <span className="hidden sm:inline ml-2">{t('header.treeView')}</span>}
              </Link>

              {/* Consolidated Settings Dropdown - All breakpoints */}
              <SettingsDropdown viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>
        </div>

        {/* Active Level Context Bar - all viewports, visible when scrolled */}
        {isScrolled && activeLevelData && (
          <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-3 py-1 sm:px-4 sm:py-1.5 max-w-7xl flex items-center gap-2">
              <LevelIcon level={activeLevelData.id as 'roots' | 'trunk' | 'branches' | 'leaves'} size={20} />
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                style={{ backgroundColor: activeLevelData.color }}
              >
                {activeLevelData.order}
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{activeLevelData.name}</span>
              <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 truncate">— {activeLevelData.subtitle}</span>
              {/* Quick level jump dots */}
              <div className="ml-auto flex items-center gap-1.5">
                {data.levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => {
                      const el = document.getElementById(level.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    title={level.name}
                    className={`w-2 h-2 rounded-full transition-all ${
                      level.id === activeLevel ? 'w-4 bg-blue-500' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                    aria-label={level.name}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slim Level Indicator - Mobile only, hidden when scrolled (context bar takes over) */}
        {!isScrolled && (
          <div className="sm:hidden border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center px-3 py-1.5 gap-1">
              {data.levels.map((level, index) => {
                const isActive = activeLevel === level.id;
                const isPast = data.levels.findIndex(l => l.id === activeLevel) > index;
                return (
                  <button
                    key={level.id}
                    onClick={() => {
                      const element = document.getElementById(level.id);
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    title={level.name}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm'
                        : isPast
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                    aria-label={`${t('navigation.goToLevel', { level: level.name })} (${level.order}/4)`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span className={`text-xs font-bold ${isActive ? '' : 'opacity-70'}`}>{level.order}</span>
                    <span className="truncate">{level.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-28 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-900 dark:via-blue-950/40 dark:to-purple-950/30 -z-10" />
        {/* Animated radial glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl -z-10 pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.08) 40%, transparent 70%)' }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.75, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Logo + brand */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <DendrixLogo size={80} className="mb-3 sm:mb-4" />
              <span className="text-base sm:text-lg font-semibold tracking-wide text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">
                dendrix.ai
              </span>

              {/* Narrative hook */}
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium mb-3 sm:mb-4">
                {t('hero.hook')}
              </p>

              {/* Main headline */}
              <h2 id="hero-heading" className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('hero.title')}
              </h2>
            </div>

            {/* Value proposition */}
            <p className="text-lg sm:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
              {t('hero.subtitle')}
            </p>

            {/* Single primary CTA */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <button
                onClick={() => setIsSkillSelectorOpen(true)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl text-lg sm:text-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all min-h-[56px]"
              >
                {t('hero.startLearning')}
                <span className="ml-1">→</span>
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('levels.totalTime')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Section — Visual onboarding between hero and levels */}
      <section className="relative py-12 sm:py-20 bg-white dark:bg-gray-900/50 border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {t('journey.title')}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('journey.subtitle')}
            </p>
          </motion.div>

          {/* 4-step visual journey */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { id: 'roots', color: '#10b981', order: 1, key: 'roots' },
              { id: 'trunk', color: '#f59e0b', order: 2, key: 'trunk' },
              { id: 'branches', color: '#3b82f6', order: 3, key: 'branches' },
              { id: 'leaves', color: '#8b5cf6', order: 4, key: 'leaves' },
            ].map((step, idx) => (
              <motion.button
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                onClick={() => {
                  const el = document.getElementById(step.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative p-5 sm:p-6 rounded-2xl border border-gray-200/60 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/40 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left"
                type="button"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.order}
                  </span>
                  <LevelIcon level={step.id as 'roots' | 'trunk' | 'branches' | 'leaves'} size={24} />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1">
                  {t(`journey.${step.key}`)}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t(`journey.${step.key}Desc`)}
                </p>
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 0 20px ${step.color}15, 0 0 40px ${step.color}08` }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Level Sections with Contextual Demos */}
      <main aria-label={t('navigation.levelSections')}>
        {data.levels.map((level, index) => {
          const levelConcepts = data.concepts.filter(c => c.level === level.id);
          return (
            <div key={level.id}>
              <LevelSection
                level={level}
                concepts={levelConcepts}
                viewMode={viewMode}
                index={index}
                onConceptClick={setSelectedConcept}
                isCompleted={isCompleted}
                isLoading={isLoading}
              />

              {/* Tokenizer Demo - after Roots (tokens concept) */}
              {level.id === 'roots' && (
                <section className="py-16 bg-white dark:bg-gray-900" aria-label={t('tokenizer.title')}>
                  <div className="container mx-auto px-4 max-w-7xl">
                    <TokenizerDemo />
                  </div>
                </section>
              )}

              {/* Vector Demo - after Trunk (embeddings concept) */}
              {level.id === 'trunk' && (
                <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" aria-label={t('vectorDemo.title')}>
                  <div className="container mx-auto px-4 max-w-7xl">
                    <VectorDemo />
                  </div>
                </section>
              )}
            </div>
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

      {/* Skill Selector Modal */}
      <SkillSelectorModal
        isOpen={isSkillSelectorOpen}
        onClose={() => setIsSkillSelectorOpen(false)}
        onSelectLevel={(level) => {
          setIsSkillSelectorOpen(false);
        }}
        concepts={data.concepts}
        onConceptSelect={(concept) => setSelectedConcept(concept)}
      />

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
          allConcepts={data.concepts}
          levels={data.levels}
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
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 border-t border-gray-800/50">
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
