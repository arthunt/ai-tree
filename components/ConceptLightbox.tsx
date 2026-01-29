'use client';

import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion';
import { X, Check, Circle, ChevronLeft, ChevronRight, Share2, Link2, ChevronDown, Moon, Sun } from 'lucide-react';
import { Concept, TreeLevel } from '../lib/types';
import { getComplexityColor, getComplexityLabel } from '../lib/utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { LightboxSkeleton } from './LightboxSkeleton';
import { useTranslations } from 'next-intl';
import { useToast } from '@/lib/useToast';
import { useTheme } from '@/context/ThemeContext';
import { locales } from '@/i18n';
import { ConceptTabContent } from './mobile/ConceptTabContent';
import {
  Users,
  Brain,
  Leaf,
  Bot,
  Plug,
  Layers,
  BookOpen,
  Notebook,
  GraduationCap,
  Shield,
  MapPin,
  Flashlight,
  BookText,
  Blocks,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  brain: Brain,
  leaf: Leaf,
  'chess-knight': Brain,
  bot: Bot,
  plug: Plug,
  layers: Layers,
  stage: Layers,
  'book-open': BookOpen,
  notebook: Notebook,
  'graduation-cap': GraduationCap,
  shield: Shield,
  blocks: Blocks,
  'map-pin': MapPin,
  flashlight: Flashlight,
  'book-text': BookText,
};

// Level colors for the switcher
const LEVEL_COLORS: Record<string, string> = {
  leaves: 'bg-purple-500',
  branches: 'bg-blue-500',
  trunk: 'bg-amber-700',
  roots: 'bg-emerald-700',
};

interface ConceptLightboxProps {
  concept: Concept | null;
  onClose: () => void;
  allConcepts?: Concept[];
  levels?: TreeLevel[];
  onNavigate?: (conceptId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function ConceptLightbox({ concept, onClose, allConcepts = [], levels = [], onNavigate, isCompleted = false, onToggleComplete }: ConceptLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('concept');
  const tNav = useTranslations();
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const [activeTab, setActiveTab] = useState<'explanation' | 'visual' | 'code'>('explanation');
  const [showLevelPicker, setShowLevelPicker] = useState(false);

  // Draggable sheet state (mobile only)
  // sheetHeight is in vh units, from 40 to 95
  const [sheetHeight, setSheetHeight] = useState(92);
  const dragY = useMotionValue(0);
  const isDragging = useRef(false);

  // Get sibling concepts for navigation
  const sameLevelConcepts = concept
    ? allConcepts.filter(c => c.level === concept.level)
    : [];
  const levelIndex = concept
    ? sameLevelConcepts.findIndex(c => c.id === concept.id)
    : -1;
  const prevConcept = levelIndex > 0 ? sameLevelConcepts[levelIndex - 1] : null;
  const nextConcept = levelIndex < sameLevelConcepts.length - 1 ? sameLevelConcepts[levelIndex + 1] : null;

  // Derive unique levels from concepts if not provided
  const availableLevels = levels.length > 0
    ? levels
    : [...new Set(allConcepts.map(c => c.level))].map(id => ({
        id: id as TreeLevel['id'],
        name: id,
        subtitle: '',
        description: '',
        color: LEVEL_COLORS[id] || '#666',
        order: id === 'roots' ? 1 : id === 'trunk' ? 2 : id === 'branches' ? 3 : 4,
      }));

  // Reset tab when concept changes
  useEffect(() => {
    if (concept) {
      setActiveTab('explanation');
      setShowLevelPicker(false);
    }
  }, [concept?.id]);

  // Reset sheet height on open
  useEffect(() => {
    if (concept) {
      setSheetHeight(92);
    }
  }, [concept]);

  // Generate shareable URL
  const getShareUrl = () => {
    if (typeof window === 'undefined' || !concept) return '';
    return `${window.location.origin}/${locale}/concept/${concept.id}`;
  };

  // Copy link to clipboard
  const handleCopyLink = async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(t('linkCopied'), 'success', 4000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      showToast(t('linkCopied'), 'success', 4000);
    }
  };

  // Native share (mobile)
  const handleNativeShare = async () => {
    const url = getShareUrl();
    if (navigator.share) {
      try {
        await navigator.share({ title: concept?.title, text: concept?.metaphor, url });
      } catch { /* cancelled */ }
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  // Language switcher
  const switchLanguage = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPathname, { scroll: false });
  };

  // Loading state
  useEffect(() => {
    if (concept) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 200);
      return () => clearTimeout(timer);
    }
  }, [concept]);

  // ESC key + arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showLevelPicker) {
          setShowLevelPicker(false);
        } else {
          onClose();
        }
      }
      if (e.key === 'ArrowLeft' && prevConcept && onNavigate) onNavigate(prevConcept.id);
      if (e.key === 'ArrowRight' && nextConcept && onNavigate) onNavigate(nextConcept.id);
      // Tab shortcuts: 1=explanation, 2=visual, 3=code
      if (e.key === '1' && !e.metaKey && !e.ctrlKey) setActiveTab('explanation');
      if (e.key === '2' && !e.metaKey && !e.ctrlKey) setActiveTab('visual');
      if (e.key === '3' && !e.metaKey && !e.ctrlKey) setActiveTab('code');
    };
    if (concept) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [concept, onClose, prevConcept, nextConcept, onNavigate, showLevelPicker]);

  // Lock body scroll
  useEffect(() => {
    if (concept) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
      };
    }
  }, [concept]);

  // Focus trap
  useEffect(() => {
    if (!concept) return;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = document.querySelectorAll(
        '[role="dialog"] button:not([disabled]), [role="dialog"] [href], [role="dialog"] input:not([disabled]), [role="dialog"] select:not([disabled]), [role="dialog"] textarea:not([disabled]), [role="dialog"] [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [concept]);

  const handleTabSwitch = useCallback((tab: 'explanation' | 'visual' | 'code') => {
    setActiveTab(tab);
  }, []);

  // Handle drag on the handle bar (mobile)
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // If swiped down fast or far enough, close or snap to small
    if (velocity > 500 || offset > 200) {
      if (sheetHeight < 60 || velocity > 1000) {
        // Close if already small or very fast swipe
        onClose();
      } else {
        setSheetHeight(45);
      }
    } else if (velocity < -500 || offset < -100) {
      // Swipe up -> expand to max
      setSheetHeight(95);
    } else {
      // Snap to nearest: calculate new height from drag offset
      const viewportH = window.innerHeight;
      const draggedPx = offset;
      const draggedVh = (draggedPx / viewportH) * 100;
      const newH = Math.min(95, Math.max(35, sheetHeight - draggedVh));

      // Snap to 45, 70, or 95
      const snaps = [45, 70, 95];
      const closest = snaps.reduce((prev, curr) =>
        Math.abs(curr - newH) < Math.abs(prev - newH) ? curr : prev
      );
      setSheetHeight(closest);
    }
    dragY.set(0);
  }, [sheetHeight, onClose, dragY]);

  if (!concept) return null;

  const IconComponent = iconMap[concept.icon] || Brain;
  const translatedLevelName = tNav(`levels.${concept.level}`, { default: concept.level });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-end sm:items-center sm:justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concept-title"
      >
        <motion.div
          ref={sheetRef}
          initial={{ y: '100%', opacity: 0.5, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: '100%', opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white dark:bg-gray-900 w-full sm:max-w-4xl sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden sm:border sm:border-white/10"
          style={{
            height: `${sheetHeight}dvh`,
            maxHeight: 'calc(100dvh - 1rem)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {isLoading ? (
            <LightboxSkeleton />
          ) : (
            <>
              {/* Drag Handle (mobile only) */}
              <motion.div
                className="flex-shrink-0 sm:hidden flex justify-center pt-2 pb-1 cursor-grab active:cursor-grabbing touch-none"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragStart={() => { isDragging.current = true; }}
                onDragEnd={handleDragEnd}
                style={{ y: dragY }}
              >
                <div className="w-10 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
              </motion.div>

              {/* Compact Header */}
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2.5 sm:px-6 sm:py-4 sm:rounded-t-2xl">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0" aria-hidden="true">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 id="concept-title" className="text-sm sm:text-lg font-bold truncate">
                        {concept.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getComplexityColor(concept.complexity)} bg-white`}>
                          {getComplexityLabel(concept.complexity)}
                        </span>
                        <span className="text-white/70 text-[11px] sm:text-xs truncate">
                          {concept.simpleName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {onToggleComplete && (
                      <button
                        onClick={() => {
                          onToggleComplete();
                          if (!isCompleted) {
                            showToast(t('conceptMarkedComplete'), 'success', 5000, {
                              label: t('undo'),
                              onClick: () => onToggleComplete(),
                            });
                          }
                        }}
                        className={`p-2 min-w-[36px] min-h-[36px] rounded-full transition-colors flex items-center justify-center ${
                          isCompleted ? 'bg-green-400/30 text-green-200' : 'hover:bg-white/20 text-white/70'
                        }`}
                        aria-label={isCompleted ? t('completed') : t('markAsComplete')}
                        type="button"
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                      </button>
                    )}
                    {canNativeShare ? (
                      <button
                        onClick={handleNativeShare}
                        className="p-2 min-w-[36px] min-h-[36px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                        aria-label={t('shareNative')}
                        type="button"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCopyLink}
                        className="p-2 min-w-[36px] min-h-[36px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                        aria-label={copied ? t('linkCopied') : t('copyLink')}
                        type="button"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-300" /> : <Link2 className="h-4 w-4" />}
                      </button>
                    )}

                    {/* Divider */}
                    <div className="w-px h-5 bg-white/20 mx-0.5" />

                    {/* Language switcher (compact) */}
                    <div className="flex items-center bg-white/10 rounded-full overflow-hidden">
                      {locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => switchLanguage(loc)}
                          className={`px-2 py-1.5 text-[11px] sm:text-xs font-semibold transition-colors ${
                            loc === locale
                              ? 'bg-white/25 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/10'
                          }`}
                          aria-label={`Switch to ${loc === 'et' ? 'Estonian' : 'English'}`}
                          aria-current={loc === locale ? 'true' : undefined}
                          type="button"
                        >
                          {loc.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Dark mode toggle (compact) */}
                    {themeMounted && (
                      <button
                        onClick={toggleTheme}
                        className="p-2 min-w-[36px] min-h-[36px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center text-white/70 hover:text-white"
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        type="button"
                      >
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </button>
                    )}

                    <button
                      ref={closeButtonRef}
                      onClick={onClose}
                      className="p-2 min-w-[36px] min-h-[36px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                      aria-label={t('closeDialog')}
                      type="button"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Bar */}
              <div className="flex-shrink-0 px-3 py-1.5 sm:px-6 sm:py-2.5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80">
                <div className="flex gap-1 bg-gray-200/80 dark:bg-gray-800 p-1 rounded-xl" role="tablist">
                  <button
                    role="tab"
                    aria-selected={activeTab === 'explanation'}
                    onClick={() => handleTabSwitch('explanation')}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'explanation'
                        ? 'bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {t('explanation')}
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'visual'}
                    onClick={() => handleTabSwitch('visual')}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'visual'
                        ? 'bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {t('visual')}
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'code'}
                    onClick={() => handleTabSwitch('code')}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-3 min-h-[36px] sm:min-h-[40px] text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'code'
                        ? 'bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {t('code')}
                  </button>
                </div>
              </div>

              {/* Scrollable Content with swipe navigation on mobile */}
              <motion.div
                className="flex-1 overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  const threshold = 60;
                  if (info.offset.x < -threshold && nextConcept && onNavigate) {
                    onNavigate(nextConcept.id);
                  } else if (info.offset.x > threshold && prevConcept && onNavigate) {
                    onNavigate(prevConcept.id);
                  }
                }}
              >
                <ConceptTabContent
                  concept={concept}
                  activeTab={activeTab}
                  allConcepts={allConcepts}
                  onNavigate={onNavigate}
                  sheetState="full"
                />
              </motion.div>

              {/* Navigation Bar with dot indicators + level switcher */}
              <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 px-3 sm:px-6 py-2 pb-safe">
                {/* Level switcher + dot indicators */}
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  {/* Level name (clickable to open picker) */}
                  <button
                    onClick={() => setShowLevelPicker(!showLevelPicker)}
                    className="flex items-center gap-1 px-2 py-0.5 text-[11px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    type="button"
                    aria-expanded={showLevelPicker}
                  >
                    <span className={`w-2 h-2 rounded-full ${LEVEL_COLORS[concept.level] || 'bg-gray-400'}`} />
                    {translatedLevelName}
                    <ChevronDown className={`h-3 w-3 transition-transform ${showLevelPicker ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Clickable dot indicators for same-level concepts */}
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  {sameLevelConcepts.map((c, i) => {
                    const isActive = c.id === concept.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => onNavigate?.(c.id)}
                        className={`rounded-full transition-all ${
                          isActive
                            ? 'w-6 h-2.5 bg-blue-500 dark:bg-blue-400'
                            : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                        }`}
                        aria-label={`${c.simpleName} (${i + 1}/${sameLevelConcepts.length})`}
                        aria-current={isActive ? 'true' : undefined}
                        type="button"
                        title={c.simpleName}
                      />
                    );
                  })}
                </div>

                {/* Level picker dropdown */}
                <AnimatePresence>
                  {showLevelPicker && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mb-2"
                    >
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-2 space-y-1">
                        {availableLevels.map((level) => {
                          const levelConcepts = allConcepts.filter(c => c.level === level.id);
                          const isCurrentLevel = concept.level === level.id;
                          const levelName = tNav(`levels.${level.id}`, { default: level.name });
                          return (
                            <div key={level.id}>
                              <div className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold ${
                                isCurrentLevel ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
                              }`}>
                                <span className={`w-2.5 h-2.5 rounded-full ${LEVEL_COLORS[level.id] || 'bg-gray-400'}`} />
                                {levelName}
                              </div>
                              <div className="flex flex-wrap gap-1 pl-5 pb-1">
                                {levelConcepts.map((c) => {
                                  const isCurrent = c.id === concept.id;
                                  return (
                                    <button
                                      key={c.id}
                                      onClick={() => {
                                        onNavigate?.(c.id);
                                        setShowLevelPicker(false);
                                      }}
                                      className={`px-2 py-1 text-[11px] rounded-md transition-colors ${
                                        isCurrent
                                          ? 'bg-blue-500 text-white font-medium'
                                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                      }`}
                                      type="button"
                                    >
                                      {c.simpleName}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Prev / Next buttons */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => prevConcept && onNavigate?.(prevConcept.id)}
                    disabled={!prevConcept}
                    className={`flex items-center gap-1 px-2.5 py-2 min-w-[40px] min-h-[40px] rounded-lg text-sm font-medium transition-colors ${
                      prevConcept
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                    aria-label={prevConcept ? `Previous: ${prevConcept.simpleName}` : 'No previous concept'}
                    type="button"
                  >
                    <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                    {prevConcept && (
                      <span className="hidden sm:inline truncate max-w-[100px] text-xs">
                        {prevConcept.simpleName}
                      </span>
                    )}
                  </button>

                  {/* Center: concept count */}
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                    {levelIndex + 1} / {sameLevelConcepts.length}
                  </span>

                  <button
                    onClick={() => nextConcept && onNavigate?.(nextConcept.id)}
                    disabled={!nextConcept}
                    className={`flex items-center gap-1 px-2.5 py-2 min-w-[40px] min-h-[40px] rounded-lg text-sm font-medium transition-colors ${
                      nextConcept
                        ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                    aria-label={nextConcept ? `Next: ${nextConcept.simpleName}` : 'No next concept'}
                    type="button"
                  >
                    {nextConcept && (
                      <span className="hidden sm:inline truncate max-w-[100px] text-xs">
                        {nextConcept.simpleName}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
