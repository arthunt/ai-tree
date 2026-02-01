"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useContentWithVariant, recordEngagement } from '@/hooks/useContentVariant';

interface ConceptDetailPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    conceptId: string;
    metaphor?: string | null;
    deepDive?: string | null;
    question?: string | null;
    hint?: string | null;
    color?: string;
    className?: string;
}

export function ConceptDetailPanel({
    isOpen,
    onClose,
    title,
    conceptId,
    metaphor,
    deepDive,
    question,
    hint,
    color = '#f59e0b',
    className,
}: ConceptDetailPanelProps) {
    const t = useTranslations();
    const { content: displayTitle, variant: titleVariant } = useContentWithVariant(`concept:${conceptId}:title`, title);
    const { content: displayMetaphor } = useContentWithVariant(`concept:${conceptId}:metaphor`, metaphor ?? '');
    const { content: displayDeepDive } = useContentWithVariant(`concept:${conceptId}:deep_dive`, deepDive ?? '');
    const { content: displayQuestion } = useContentWithVariant(`concept:${conceptId}:question`, question ?? '');
    const hasContent = metaphor || deepDive || question;
    const engagementFired = useRef(false);

    // Record engagement when panel opens (once per mount cycle)
    useEffect(() => {
        if (isOpen && titleVariant && !engagementFired.current) {
            engagementFired.current = true;
            recordEngagement(titleVariant);
        }
        if (!isOpen) engagementFired.current = false;
    }, [isOpen, titleVariant]);

    if (!hasContent) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={cn("overflow-hidden", className)}
                >
                    <div className="pt-4 pb-2 px-1 space-y-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h4
                                className="text-sm font-bold uppercase tracking-wider"
                                style={{ color }}
                            >
                                {displayTitle}
                            </h4>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-lg hover:bg-stone-800/50 text-stone-500 hover:text-stone-300 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Metaphor */}
                        {metaphor && (
                            <div className="flex items-start gap-3 bg-stone-900/50 rounded-xl p-4 border border-stone-800/50">
                                <Lightbulb size={18} className="text-amber-500 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500/70 block mb-1">
                                        {t('conceptDetail.metaphor')}
                                    </span>
                                    <p className="text-sm text-stone-300 leading-relaxed">{displayMetaphor}</p>
                                </div>
                            </div>
                        )}

                        {/* Deep Dive */}
                        {deepDive && (
                            <div className="flex items-start gap-3 bg-stone-900/50 rounded-xl p-4 border border-stone-800/50">
                                <BookOpen size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/70 block mb-1">
                                        {t('conceptDetail.deepDive')}
                                    </span>
                                    <p className="text-sm text-stone-300 leading-relaxed">{displayDeepDive}</p>
                                </div>
                            </div>
                        )}

                        {/* Question + Hint */}
                        {question && (
                            <div className="flex items-start gap-3 bg-stone-900/50 rounded-xl p-4 border border-stone-800/50">
                                <HelpCircle size={18} className="text-blue-400 mt-0.5 shrink-0" />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400/70 block mb-1">
                                        {t('conceptDetail.thinkAboutIt')}
                                    </span>
                                    <p className="text-sm text-stone-300 leading-relaxed">{displayQuestion}</p>
                                    {hint && (
                                        <p className="text-xs text-stone-500 mt-2 italic">{hint}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
