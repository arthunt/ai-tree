'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { useProgress } from '@/lib/useProgress';
import { LevelSection } from '@/components/LevelSection';
import { LevelIcon } from '@/components/LevelIcon';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { TreeNavigation } from '@/components/TreeNavigation';
import { TokenizerDemo } from '@/components/TokenizerDemo';
import { VectorDemo } from '@/components/VectorDemo';
import { SearchModal } from '@/components/SearchModal';
import { SkillSelectorModal } from '@/components/SkillSelectorModal';
import { WelcomeModal } from '@/components/WelcomeModal';
import { ViewSelector } from '@/components/landing/ViewSelector';
import { EvolutionTimeline } from '@/components/landing/EvolutionTimeline';
import { DendrixLogo } from '@/components/DendrixLogo';
import treeData from '@/data/tree-concepts.json';
import Link from 'next/link';
import { Network, Search, Moon, Sun, Lightbulb, Code2, GraduationCap, ChevronRight, Menu, X } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { availableLanguageTags as locales } from '@/paraglide/runtime';
import { useLocaleSwitch } from '@/lib/hooks/useLocaleSwitch';
import { CourseStructuredData } from '@/components/StructuredData';
import { CelebrationModal } from '@/components/CelebrationModal';

export default function AITreePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('metaphor');
  const [activeLevel, setActiveLevel] = useState('leaves');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSkillSelectorOpen, setIsSkillSelectorOpen] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const data = treeData as TreeData;
  const t = useTranslations();
  const tLevel = useTranslations('conceptLevels');
  const params = useParams();
  const locale = params.locale as string;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const { isCompleted, toggleCompleted, completedCount, getCompletionPercentage, clearProgress, completedConcepts } = useProgress();
  const totalConcepts = data.concepts.length;
  const tCelebration = useTranslations('celebration');

  // In-place locale switching (no remount when popup is open)
  const {
    displayLocale,
    overrideMessages,
    isOverridden: isLocaleOverridden,
    switchLocaleInPlace,
    syncUrlLocale,
  } = useLocaleSwitch();

  // Celebration state
  const [celebration, setCelebration] = useState<{
    type: 'level' | 'all';
    levelId?: string;
    levelName?: string;
    conceptCount: number;
    nextLevelId?: string;
    nextLevelName?: string;
  } | null>(null);
  const [celebratedLevels, setCelebratedLevels] = useState<Set<string>>(new Set());
  const [celebratedAll, setCelebratedAll] = useState(false);

  // Detect level/tree completion
  useEffect(() => {
    if (completedConcepts.length === 0) return;

    // Check if all concepts are completed
    if (!celebratedAll && completedConcepts.length === totalConcepts) {
      setCelebratedAll(true);
      setCelebration({
        type: 'all',
        conceptCount: totalConcepts,
      });
      return;
    }

    // Check each level
    for (const level of data.levels) {
      if (celebratedLevels.has(level.id)) continue;
      const levelConcepts = data.concepts.filter(c => c.level === level.id);
      const allDone = levelConcepts.every(c => completedConcepts.includes(c.id));
      if (allDone && levelConcepts.length > 0) {
        setCelebratedLevels(prev => new Set([...prev, level.id]));
        const levelOrder = level.order;
        const nextLevel = data.levels.find(l => l.order === levelOrder + 1);
        setCelebration({
          type: 'level',
          levelId: level.id,
          levelName: tLevel(`${level.id}.name`),
          conceptCount: levelConcepts.length,
          nextLevelId: nextLevel?.id,
          nextLevelName: nextLevel ? tLevel(`${nextLevel.id}.name`) : undefined,
        });
        break;
      }
    }
  }, [completedConcepts, totalConcepts, data.levels, data.concepts, celebratedLevels, celebratedAll, tLevel]);

  // View mode icons — toggle between simple (metaphor) and technical
  const viewModeIcons: Record<ViewMode, { icon: typeof Lightbulb; next: ViewMode }> = {
    metaphor: { icon: Lightbulb, next: 'technical' },
    technical: { icon: Code2, next: 'metaphor' },
    both: { icon: Lightbulb, next: 'technical' },
  };

  const switchLanguage = (newLocale: string) => {
    if (selectedConcept) {
      // Popup is open — swap content in place, no navigation
      switchLocaleInPlace(newLocale);
    } else {
      // No popup — navigate normally
      if (newLocale === locale) return;
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.replace(newPathname, { scroll: false });
    }
  };

  // Simulate initial loading state
  useEffect(() => {
    // Set a short delay to show loading state and prevent layout shift
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show welcome modal on first visit
  useEffect(() => {
    try {
      const hasSeenWelcome = localStorage.getItem('ai-tree-welcome-seen');
      if (!hasSeenWelcome) {
        // Small delay so the page renders first
        const timer = setTimeout(() => setIsWelcomeOpen(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // On popup close, sync URL if locale was overridden
  const handleLightboxClose = () => {
    setSelectedConcept(null);
    if (isLocaleOverridden) {
      syncUrlLocale();
    }
  };

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
      // ESC to close lightbox or mobile menu
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        else if (selectedConcept) setSelectedConcept(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConcept, isMobileMenuOpen]);

  // Close mobile menu on scroll and close desktop lang dropdown on outside click
  useEffect(() => {
    const handleScrollForMenu = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById('landing-lang-dropdown');
      if (dropdown && !dropdown.classList.contains('hidden') && !(e.target as Element)?.closest?.('.relative')) {
        dropdown.classList.add('hidden');
      }
    };
    window.addEventListener('scroll', handleScrollForMenu, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScrollForMenu);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Structured Data for SEO */}
      <CourseStructuredData locale={locale} conceptCount={totalConcepts} />

      {/* Header - Mobile: Logo + Start + Hamburger. Desktop: full controls. */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-gray-800/60">
        <div className={`container mx-auto max-w-7xl transition-all duration-300 ${isScrolled ? 'px-3 py-1 sm:px-4 sm:py-1.5' : 'px-3 py-2 sm:px-4 sm:py-3'}`}>
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 sm:gap-3 min-w-0 text-left group"
              aria-label={t('navigation.backToTop')}
              type="button"
            >
              <DendrixLogo size={isScrolled ? 28 : 36} animate={false} className="flex-shrink-0 transition-all duration-300" />
              <div className="min-w-0">
                <span className={`font-bold text-gray-900 dark:text-white truncate transition-all duration-300 ${isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                  dendrix.ai
                </span>
                {!isScrolled && (
                  <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 truncate">{t('header.description')}</p>
                )}
              </div>
            </button>

            {/* Mobile: Start CTA + Hamburger (md:hidden) */}
            <div className="flex items-center gap-2 md:hidden">
              {!isScrolled && (
                <Link
                  href={`/${locale}/dna`}
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] px-4 py-2 bg-brand-teal text-black font-bold text-sm rounded-xl hover:bg-brand-cyan transition-colors"
                >
                  {t('landing.ctaPrimary')}
                </Link>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                type="button"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
              </button>
            </div>

            {/* Desktop controls (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 transition-all font-medium group ${isScrolled
                  ? 'min-w-[44px] min-h-[44px] rounded-lg'
                  : 'min-w-[44px] min-h-[44px] px-4 py-3 rounded-xl'
                  }`}
                aria-label={t('search.buttonLabel')}
              >
                <Search className={`text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden="true" />
                {!isScrolled && <span className="ml-2">{t('search.button')}</span>}
                {!isScrolled && (
                  <kbd className="hidden lg:inline-flex items-center gap-1 ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                )}
              </button>

              {/* Learning Paths Button */}
              <Link
                href={`/${locale}/learn`}
                className={`flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg transition-all font-medium ${isScrolled
                  ? 'min-w-[44px] min-h-[44px] rounded-lg'
                  : 'min-w-[44px] min-h-[44px] px-4 py-3 rounded-xl'
                  }`}
                aria-label={t('learningPaths.title')}
              >
                <GraduationCap className={isScrolled ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
                {!isScrolled && <span className="ml-2">{t('learningPaths.title')}</span>}
              </Link>

              {/* DNA View Button */}
              <Link
                href={`/${locale}/dna`}
                className={`flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-teal font-bold transition-all ${isScrolled
                  ? 'min-w-[44px] min-h-[44px] rounded-lg'
                  : 'min-w-[44px] min-h-[44px] px-4 py-3 rounded-xl'
                  }`}
                aria-label="DNA View"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5" /><path d="M17 12h5" /><path d="M7 12a5 5 0 0 1 5-5 5 5 0 0 1 5 5" /></svg>
                </div>
                {!isScrolled && <span className="ml-2">DNA</span>}
              </Link>

              {/* Concept Map Button */}
              <Link
                href={`/${locale}/tree-view`}
                className={`flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-all font-medium ${isScrolled
                  ? 'min-w-[44px] min-h-[44px] rounded-lg'
                  : 'min-w-[44px] min-h-[44px] px-4 py-3 rounded-xl'
                  }`}
                aria-label={t('header.treeViewAriaLabel')}
              >
                <Network className={isScrolled ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
                {!isScrolled && <span className="ml-2">{t('header.treeView')}</span>}
              </Link>

              {/* View Mode Toggle */}
              {(() => {
                const { icon: ViewIcon, next } = viewModeIcons[viewMode];
                const modeLabelKey = viewMode === 'metaphor' ? 'simple' : 'technical';
                const modeLabel = t(`viewMode.${modeLabelKey}` as 'viewMode.simple' | 'viewMode.technical');
                return (
                  <button
                    onClick={() => setViewMode(next)}
                    className={`flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all ${isScrolled
                      ? 'min-w-[44px] min-h-[44px] rounded-lg'
                      : 'min-w-[44px] min-h-[44px] px-3 py-2.5 rounded-xl'
                      }`}
                    aria-label={`${t('settings.viewMode')}: ${modeLabel}`}
                    title={`${t('settings.viewMode')}: ${modeLabel}`}
                    type="button"
                  >
                    <ViewIcon className={`text-gray-700 dark:text-gray-300 ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    {!isScrolled && <span className="ml-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">{modeLabel}</span>}
                  </button>
                );
              })()}

              {/* Language Switcher — dropdown that preserves lightbox in-place switching */}
              <div className="relative">
                <button
                  onClick={() => {
                    const el = document.getElementById('landing-lang-dropdown');
                    if (el) el.classList.toggle('hidden');
                  }}
                  className={`flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors ${isScrolled
                    ? 'min-w-[44px] min-h-[44px] px-2 rounded-lg text-xs'
                    : 'min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl text-sm'
                    }`}
                  aria-label={`Language: ${displayLocale.toUpperCase()}`}
                  type="button"
                >
                  <span className="uppercase tracking-wide">{displayLocale}</span>
                </button>
                <div id="landing-lang-dropdown" className="hidden absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-50 overflow-hidden">
                  {locales.map((loc) => {
                    const nativeName: Record<string, string> = { en: 'English', et: 'Eesti', ru: 'Русский' };
                    return (
                      <button
                        key={loc}
                        onClick={() => {
                          switchLanguage(loc);
                          document.getElementById('landing-lang-dropdown')?.classList.add('hidden');
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${loc === displayLocale
                          ? 'bg-brand-teal/10 text-brand-teal dark:text-brand-cyan font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        type="button"
                      >
                        {nativeName[loc] || loc.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dark Mode Toggle */}
              {themeMounted && (
                <button
                  onClick={toggleTheme}
                  className={`flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all ${isScrolled
                    ? 'min-w-[44px] min-h-[44px] rounded-lg'
                    : 'min-w-[44px] min-h-[44px] rounded-xl'
                    }`}
                  aria-label={t('darkMode.ariaLabel')}
                  type="button"
                >
                  {theme === 'light' ? (
                    <Moon className={`text-gray-700 dark:text-gray-300 ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                  ) : (
                    <Sun className={`text-gray-700 dark:text-gray-300 ${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <nav className="flex flex-col p-4 gap-1">
                {/* Search */}
                <button
                  onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                  type="button"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                  <span>{t('search.button')}</span>
                  <kbd className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">⌘K</kbd>
                </button>

                {/* Learning Paths */}
                <Link
                  href={`/${locale}/learn`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <GraduationCap className="h-5 w-5 text-blue-500" />
                  <span>{t('learningPaths.title')}</span>
                </Link>

                {/* DNA View */}
                <Link
                  href={`/${locale}/dna`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-brand-teal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h5" /><path d="M17 12h5" /><path d="M7 12a5 5 0 0 1 5-5 5 5 0 0 1 5 5" /></svg>
                  </div>
                  <span>DNA</span>
                </Link>

                {/* Concept Map */}
                <Link
                  href={`/${locale}/tree-view`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Network className="h-5 w-5 text-gray-500" />
                  <span>{t('header.treeView')}</span>
                </Link>

                {/* View Mode */}
                {(() => {
                  const { icon: ViewIcon, next } = viewModeIcons[viewMode];
                  const modeLabelKey = viewMode === 'metaphor' ? 'simple' : 'technical';
                  const modeLabel = t(`viewMode.${modeLabelKey}` as 'viewMode.simple' | 'viewMode.technical');
                  return (
                    <button
                      onClick={() => { setViewMode(next); setIsMobileMenuOpen(false); }}
                      className="flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
                      type="button"
                    >
                      <ViewIcon className="h-5 w-5 text-gray-500" />
                      <span>{t('settings.viewMode')}: {modeLabel}</span>
                    </button>
                  );
                })()}

                {/* Divider */}
                <div className="h-px my-2 bg-gray-200 dark:bg-gray-700" />

                {/* Settings row: Language + Dark mode */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('settings.language')}</span>
                  <div className="flex items-center gap-2">
                    {/* Language pills using switchLanguage to preserve lightbox behavior */}
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLanguage(loc)}
                          className={`px-3 py-2 min-h-[44px] text-xs font-semibold transition-colors ${loc === displayLocale
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          aria-label={`Switch to ${loc.toUpperCase()}`}
                          type="button"
                        >
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Dark mode toggle */}
                    {themeMounted && (
                      <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={t('darkMode.ariaLabel')}
                        type="button"
                      >
                        {theme === 'light' ? (
                          <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        ) : (
                          <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

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
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{tLevel(`${activeLevelData.id}.name`)}</span>
              <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-400 truncate">— {tLevel(`${activeLevelData.id}.subtitle`)}</span>
              {/* Quick level jump dots */}
              <div className="ml-auto flex items-center gap-1.5">
                {data.levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => {
                      const el = document.getElementById(level.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    title={tLevel(`${level.id}.name`)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={tLevel(`${level.id}.name`)}
                    type="button"
                  >
                    <span className={`block rounded-full transition-all ${level.id === activeLevel ? 'w-4 h-2 bg-blue-500' : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'}`} />
                  </button>
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
                    title={tLevel(`${level.id}.name`)}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 min-h-[44px] rounded text-xs font-medium transition-all ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm'
                      : isPast
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    aria-label={`${t('navigation.goToLevel', { level: tLevel(`${level.id}.name`) })} (${level.order}/4)`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span className={`text-xs font-bold ${isActive ? '' : 'opacity-70'}`}>{level.order}</span>
                    <span className="truncate">{tLevel(`${level.id}.name`)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Tree Navigation */}
      <TreeNavigation
        levels={data.levels}
        activeLevel={activeLevel}
        completedCount={completedCount}
        totalConcepts={totalConcepts}
        isLightboxOpen={selectedConcept !== null}
        concepts={data.concepts}
        completedConcepts={completedConcepts}
      />

      {/* HERO SECTION: The Narrative Entry (Dark Mode / DNA Theme) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white" aria-labelledby="hero-heading">

        {/* Ambient Void Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/10 blur-[120px] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-teal/30 bg-brand-teal/5 text-brand-teal text-xs font-mono tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
              {t('landing.systemBadge')}
            </div>

            {/* Orientation Text (Novice Guidance) */}
            <p className="text-brand-teal/90 font-medium mb-4 tracking-wide">
              {t('landing.orientation')}
            </p>

            {/* Main Headline */}
            <h1 id="hero-heading" className="text-5xl md:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              {t('landing.hook')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t('landing.subhook')}
            </p>

            {/* Primary CTA */}
            <Link
              href={`/${locale}/dna`}
              className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-brand-teal px-10 font-medium text-black shadow-[0_0_40px_rgba(45,212,191,0.4)] transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              <span className="mr-2 text-lg font-bold">{t('landing.ctaPrimary')}</span>
              <ChevronRight className="transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-6 text-sm text-gray-600">
              {t('landing.beginJourney')}
            </p>
          </motion.div>

          {/* The Timeline Map (Replaces 'Journey' section) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-24 md:mt-32 w-full"
          >
            <div className="flex items-center gap-4 mb-8 justify-center opacity-50">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-white">{t('landing.evolutionaryPath')}</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-white" />
            </div>

            <EvolutionTimeline locale={locale} />
          </motion.div>
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

              {/* Interactive Demos - after Roots (tokens & vectors are roots concepts) */}
              {level.id === 'roots' && (
                <>
                  <section className="py-16 bg-white dark:bg-gray-900" aria-label={t('tokenizer.title')}>
                    <div className="container mx-auto px-4 max-w-7xl">
                      <TokenizerDemo />
                    </div>
                  </section>
                  <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900" aria-label={t('vectorDemo.title')}>
                    <div className="container mx-auto px-4 max-w-7xl">
                      <VectorDemo />
                    </div>
                  </section>
                </>
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

      {/* Welcome Modal (first visit) */}
      {/* <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => {
          setIsWelcomeOpen(false);
          try {
            localStorage.setItem('ai-tree-welcome-seen', 'true');
          } catch {
            // localStorage unavailable
          }
        }}
      /> */}

      {/* View Selector (Replaces Welcome Modal for Sprint 10) */}
      <ViewSelector
        isOpen={isWelcomeOpen} // Reusing the welcome open state for now as it handles the "first visit" logic nicely
        onClose={() => {
          setIsWelcomeOpen(false);
          try {
            localStorage.setItem('ai-tree-welcome-seen', 'true');
          } catch { }
        }}
        locale={locale}
      />

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={celebration !== null}
        onClose={() => setCelebration(null)}
        type={celebration?.type || 'level'}
        levelId={celebration?.levelId}
        levelName={celebration?.levelName}
        conceptCount={celebration?.conceptCount || 0}
        nextLevelId={celebration?.nextLevelId}
        nextLevelName={celebration?.nextLevelName}
        onNavigateToLevel={(levelId) => {
          const el = document.getElementById(levelId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={handleLightboxClose}
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
          displayLocale={displayLocale}
          overrideMessages={overrideMessages}
          onSwitchLocale={switchLocaleInPlace}
        />
      )}

      {/* Learning Paths CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 border-t border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/40 mb-4">
              <GraduationCap className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {t('learningPaths.title')}
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {t('learningPaths.subtitle')}
            </p>
            <Link
              href={`/${locale}/learn`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t('learningPaths.startPath')}
              <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 border-t border-gray-800/50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Why Dendrix — subtle origin story */}
          <div className="max-w-lg mx-auto text-center mb-8 pb-8 border-b border-gray-800/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-600 mb-2">
              {t('brand.footerTitle')}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
              {t('brand.footerStory')}
            </p>
          </div>

          <div className="text-center">
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
                className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                {t('footer.reportIssue')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
