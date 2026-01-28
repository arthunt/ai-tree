'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Circle, ChevronLeft, ChevronRight, Share2, Link2 } from 'lucide-react';
import { Concept } from '../lib/types';
import { getComplexityColor, getComplexityLabel } from '../lib/utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { LightboxSkeleton } from './LightboxSkeleton';
import { useTranslations } from 'next-intl';
import { useToast } from '@/lib/useToast';
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

interface ConceptLightboxProps {
  concept: Concept | null;
  onClose: () => void;
  allConcepts?: Concept[];
  onNavigate?: (conceptId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function ConceptLightbox({ concept, onClose, allConcepts = [], onNavigate, isCompleted = false, onToggleComplete }: ConceptLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('concept');
  const tNav = useTranslations();
  const params = useParams();
  const locale = params.locale as string;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'explanation' | 'visual' | 'code'>('explanation');

  // Get sibling concepts for navigation
  const sameLevelConcepts = concept
    ? allConcepts.filter(c => c.level === concept.level)
    : [];
  const levelIndex = concept
    ? sameLevelConcepts.findIndex(c => c.id === concept.id)
    : -1;
  const prevConcept = levelIndex > 0 ? sameLevelConcepts[levelIndex - 1] : null;
  const nextConcept = levelIndex < sameLevelConcepts.length - 1 ? sameLevelConcepts[levelIndex + 1] : null;

  // Reset tab when concept changes
  useEffect(() => {
    if (concept) {
      setActiveTab('explanation');
    }
  }, [concept?.id]);

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
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevConcept && onNavigate) onNavigate(prevConcept.id);
      if (e.key === 'ArrowRight' && nextConcept && onNavigate) onNavigate(nextConcept.id);
    };
    if (concept) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [concept, onClose, prevConcept, nextConcept, onNavigate]);

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

  if (!concept) return null;

  const IconComponent = iconMap[concept.icon] || Brain;
  const progressPercent = sameLevelConcepts.length > 0 ? ((levelIndex + 1) / sameLevelConcepts.length) * 100 : 0;
  const translatedLevelName = tNav(`levels.${concept.level}`, { default: concept.level });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concept-title"
      >
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white dark:bg-gray-800 w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            maxHeight: 'calc(100dvh - 2rem)',
            height: 'calc(100dvh - 2rem)',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {isLoading ? (
            <LightboxSkeleton />
          ) : (
            <>
              {/* Compact Header */}
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 sm:px-5 sm:py-4 sm:rounded-t-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl flex-shrink-0" aria-hidden="true">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 id="concept-title" className="text-base sm:text-lg font-bold truncate">
                        {concept.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getComplexityColor(concept.complexity)} bg-white`}>
                          {getComplexityLabel(concept.complexity)}
                        </span>
                        <span className="text-white/70 text-xs truncate">
                          {concept.simpleName}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Complete toggle */}
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
                        className={`p-2 min-w-[40px] min-h-[40px] rounded-full transition-colors flex items-center justify-center ${
                          isCompleted ? 'bg-green-400/30 text-green-200' : 'hover:bg-white/20 text-white/70'
                        }`}
                        aria-label={isCompleted ? t('completed') : t('markAsComplete')}
                        type="button"
                      >
                        {isCompleted ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                      </button>
                    )}
                    {/* Share */}
                    {canNativeShare ? (
                      <button
                        onClick={handleNativeShare}
                        className="p-2 min-w-[40px] min-h-[40px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                        aria-label={t('shareNative')}
                        type="button"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleCopyLink}
                        className="p-2 min-w-[40px] min-h-[40px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                        aria-label={copied ? t('linkCopied') : t('copyLink')}
                        type="button"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-300" /> : <Link2 className="h-4 w-4" />}
                      </button>
                    )}
                    {/* Close */}
                    <button
                      ref={closeButtonRef}
                      onClick={onClose}
                      className="p-2 min-w-[40px] min-h-[40px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
                      aria-label={t('closeDialog')}
                      type="button"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Bar */}
              <div className="flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex gap-1 bg-gray-200/80 dark:bg-gray-800 p-1 rounded-xl" role="tablist">
                  <button
                    role="tab"
                    aria-selected={activeTab === 'explanation'}
                    onClick={() => handleTabSwitch('explanation')}
                    className={`flex-1 py-2 px-3 min-h-[40px] text-sm font-semibold rounded-lg transition-all ${
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
                    className={`flex-1 py-2 px-3 min-h-[40px] text-sm font-semibold rounded-lg transition-all ${
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
                    className={`flex-1 py-2 px-3 min-h-[40px] text-sm font-semibold rounded-lg transition-all ${
                      activeTab === 'code'
                        ? 'bg-white dark:bg-gray-700 text-slate-700 dark:text-slate-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {t('code')}
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <ConceptTabContent
                  concept={concept}
                  activeTab={activeTab}
                  allConcepts={allConcepts}
                  onNavigate={onNavigate}
                  sheetState="full"
                />
              </div>

              {/* Navigation Bar */}
              <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 pb-safe">
                <div className="flex items-center justify-between gap-3">
                  {/* Previous button */}
                  <button
                    onClick={() => prevConcept && onNavigate?.(prevConcept.id)}
                    disabled={!prevConcept}
                    className={`flex items-center gap-1.5 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
                      prevConcept
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                    aria-label={prevConcept ? `Previous: ${prevConcept.simpleName}` : 'No previous concept'}
                    type="button"
                  >
                    <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                    {prevConcept && (
                      <span className="hidden sm:inline truncate max-w-[100px]">
                        {prevConcept.simpleName}
                      </span>
                    )}
                  </button>

                  {/* Progress indicator */}
                  <div className="flex-1 min-w-0 flex flex-col items-center gap-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {levelIndex + 1} / {sameLevelConcepts.length} &bull; {translatedLevelName}
                    </div>
                    <div className="w-full max-w-[200px] h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progressPercent}%` }}
                        role="progressbar"
                        aria-valuenow={levelIndex + 1}
                        aria-valuemin={1}
                        aria-valuemax={sameLevelConcepts.length}
                      />
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => nextConcept && onNavigate?.(nextConcept.id)}
                    disabled={!nextConcept}
                    className={`flex items-center gap-1.5 px-3 py-2 min-w-[44px] min-h-[44px] rounded-lg text-sm font-medium transition-colors ${
                      nextConcept
                        ? 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                    }`}
                    aria-label={nextConcept ? `Next: ${nextConcept.simpleName}` : 'No next concept'}
                    type="button"
                  >
                    {nextConcept && (
                      <span className="hidden sm:inline truncate max-w-[100px]">
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
