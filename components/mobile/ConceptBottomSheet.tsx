'use client';

import { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Check, Circle } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useBottomSheet, SheetState } from '@/lib/hooks/useBottomSheet';
import { useSwipeNavigation } from '@/lib/hooks/useSwipeNavigation';
import { usePrefersReducedMotion } from '@/lib/hooks/useMediaQuery';
import { ConceptTabContent } from './ConceptTabContent';
import { ConceptNavBar } from './ConceptNavBar';
import { useTranslations } from 'next-intl';
import { useProgress } from '@/lib/useProgress';

interface ConceptBottomSheetProps {
  concept: Concept | null;
  allConcepts: Concept[];
  onClose: () => void;
  onNavigate?: (conceptId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function ConceptBottomSheet({
  concept,
  allConcepts,
  onClose,
  onNavigate,
  isCompleted = false,
  onToggleComplete,
}: ConceptBottomSheetProps) {
  const t = useTranslations('concept');
  const tConn = useTranslations('connections');
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isCompleted: checkIsCompleted } = useProgress();

  const [activeTab, setActiveTab] = useState<'explanation' | 'visual' | 'code' | 'connections'>('explanation');

  // Get sibling concepts for navigation
  const sameLevelConcepts = concept
    ? allConcepts.filter(c => c.level === concept.level)
    : [];
  const levelIndex = concept
    ? sameLevelConcepts.findIndex(c => c.id === concept.id)
    : -1;
  const prevConcept = levelIndex > 0 ? sameLevelConcepts[levelIndex - 1] : null;
  const nextConcept = levelIndex < sameLevelConcepts.length - 1 ? sameLevelConcepts[levelIndex + 1] : null;

  // Bottom sheet state management
  const {
    state,
    setState,
    open,
    close,
    handleDragEnd: handleSheetDragEnd,
    isOpen,
  } = useBottomSheet({
    initialState: 'closed',
    onClose,
    onStateChange: (newState) => {
      // Haptic feedback only on meaningful transitions
      if ('vibrate' in navigator && !prefersReducedMotion) {
        if (newState === 'closed' || newState === 'full') {
          navigator.vibrate(10);
        }
      }
    },
  });

  // Horizontal swipe for navigation
  const { handleDragEnd: handleSwipeDragEnd, handleDragStart } = useSwipeNavigation({
    onSwipeLeft: () => {
      if (nextConcept && onNavigate) {
        onNavigate(nextConcept.id);
      }
    },
    onSwipeRight: () => {
      if (prevConcept && onNavigate) {
        onNavigate(prevConcept.id);
      }
    },
    enabled: state === 'half' || state === 'full',
  });

  // Open sheet when concept is selected
  useEffect(() => {
    if (concept) {
      open('half');
      setActiveTab('explanation');
    } else {
      close();
    }
  }, [concept, open, close]);

  // Focus management - move focus into dialog when opened
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      const previouslyFocused = document.activeElement as HTMLElement;
      closeButtonRef.current.focus();

      return () => {
        previouslyFocused?.focus();
      };
    }
  }, [isOpen]);

  // Lock body scroll when open (iOS Safari safe)
  useEffect(() => {
    if (isOpen) {
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
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
      if (e.key === 'ArrowLeft' && prevConcept && onNavigate) {
        onNavigate(prevConcept.id);
      }
      if (e.key === 'ArrowRight' && nextConcept && onNavigate) {
        onNavigate(nextConcept.id);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, close, prevConcept, nextConcept, onNavigate]);

  // Memoize sheet height
  const sheetHeight = useMemo(() => {
    switch (state) {
      case 'preview': return '30vh';
      case 'half': return '60vh';
      case 'full': return '92vh';
      default: return '0vh';
    }
  }, [state]);

  // Tab switch handler - auto-expand for content-heavy tabs
  const handleTabSwitch = useCallback((tab: 'explanation' | 'visual' | 'code' | 'connections') => {
    setActiveTab(tab);
    if ((tab === 'visual' || tab === 'code' || tab === 'connections') && state === 'half') {
      setState('full');
    }
  }, [state, setState]);

  if (!concept) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Bottom Sheet */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ y: '100%' }}
            animate={{
              y: 0,
              height: sheetHeight,
            }}
            exit={{ y: '100%' }}
            transition={{
              type: prefersReducedMotion ? 'tween' : 'spring',
              damping: 30,
              stiffness: 300,
              duration: prefersReducedMotion ? 0.1 : undefined,
            }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={state === 'full' ? 0.05 : 0.2}
            onDragEnd={handleSheetDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              maxHeight: '92vh',
              touchAction: 'none',
            }}
          >
            {/* Drag Handle */}
            <div
              className="flex-shrink-0 pt-3 pb-2 cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-10 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mx-auto" />
            </div>

            {/* Header */}
            <div className="flex-shrink-0 px-5 pb-3 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2
                    id="sheet-title"
                    className="text-lg font-bold text-gray-900 dark:text-white truncate"
                  >
                    {concept.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                    {concept.simpleName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Complete button */}
                  {onToggleComplete && (
                    <button
                      onClick={onToggleComplete}
                      className={`p-2 min-w-[44px] min-h-[44px] rounded-full transition-colors ${
                        isCompleted
                          ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                      aria-label={isCompleted ? t('completed') : t('markAsComplete')}
                    >
                      {isCompleted ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </button>
                  )}
                  {/* Close button */}
                  <button
                    ref={closeButtonRef}
                    onClick={close}
                    className="p-2 min-w-[44px] min-h-[44px] rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label={t('closeDialog')}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              {(state === 'half' || state === 'full') && (
                <div className="flex gap-1.5 mt-3 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl" role="tablist">
                  <button
                    role="tab"
                    aria-selected={activeTab === 'explanation'}
                    onClick={() => handleTabSwitch('explanation')}
                    className={`flex-1 py-2.5 px-3 min-h-[44px] text-sm font-semibold rounded-lg transition-all ${
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
                    className={`flex-1 py-2.5 px-3 min-h-[44px] text-sm font-semibold rounded-lg transition-all ${
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
                    className={`flex-1 py-2.5 px-3 min-h-[44px] text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'code'
                        ? 'bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {t('code')}
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeTab === 'connections'}
                    onClick={() => handleTabSwitch('connections')}
                    className={`flex-1 py-2.5 px-3 min-h-[44px] text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'connections'
                        ? 'bg-white dark:bg-gray-700 text-teal-700 dark:text-teal-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tConn('tabLabel')}
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 overflow-y-auto overscroll-contain"
              drag={state === 'half' || state === 'full' ? 'x' : false}
              dragDirectionLock
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDragEnd={handleSwipeDragEnd}
              style={{ touchAction: 'pan-y' }}
            >
              <ConceptTabContent
                concept={concept}
                activeTab={activeTab}
                allConcepts={allConcepts}
                onNavigate={onNavigate}
                sheetState={state}
              />
            </motion.div>

            {/* Navigation Bar */}
            {(state === 'half' || state === 'full') && (
              <ConceptNavBar
                prevConcept={prevConcept}
                nextConcept={nextConcept}
                currentIndex={levelIndex}
                totalCount={sameLevelConcepts.length}
                onNavigate={onNavigate}
                levelName={concept.level}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
