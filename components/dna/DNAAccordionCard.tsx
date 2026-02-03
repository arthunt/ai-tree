"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, ChevronDown, ChevronRight, Play, ArrowRight } from 'lucide-react';
import { DNAStep, CardState } from './DNAContext';
import { cn } from '@/lib/utils';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface DNAAccordionCardProps {
    step: DNAStep;
    state: CardState;
    title: string;
    description: string;
    summaryText: string;
    lockedText: string;
    color: string;
    visualization: React.ReactNode;
    onExpand: () => void;
    onNext: () => void;
    onDeepDive: () => void;
}

export function DNAAccordionCard({
    step,
    state,
    title,
    description,
    summaryText,
    lockedText,
    color,
    visualization,
    onExpand,
    onNext,
    onDeepDive
}: DNAAccordionCardProps) {
    const t = useTranslations('dna.accordion');

    // Variants for height/opacity transitions
    const cardVariants = {
        locked: {
            height: 64,
            opacity: 0.5,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        collapsed: {
            height: 64,
            opacity: 0.8,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        active: {
            height: "auto",
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        }
    };

    // Stagger content reveal
    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.1, duration: 0.3 }
        }
    };

    // Determine border color based on state
    const borderColor = state === 'active'
        ? color // Active uses the step's brand color
        : state === 'collapsed'
            ? 'rgba(255,255,255,0.1)' // Collapsed is subtle
            : 'rgba(255,255,255,0.05)'; // Locked is very dim

    // Determine shadow for active state
    const shadow = state === 'active'
        ? `0 0 20px ${color}20` // 20% opacity glow
        : 'none';

    return (
        <motion.div
            variants={cardVariants}
            initial={state}
            animate={state}
            className={cn(
                "relative w-full rounded-xl overflow-hidden backdrop-blur-xl border transition-colors duration-300",
                "flex flex-col"
            )}
            style={{
                borderColor,
                boxShadow: shadow,
                backgroundColor: 'rgba(10, 10, 15, 0.6)'
            }}
        >
            {/* Header / Summary Section (Visible in all states) */}
            <button
                onClick={onExpand}
                disabled={state === 'locked' || state === 'active'}
                className={cn(
                    "flex items-center justify-between w-full h-16 px-4 md:px-6 shrink-0 text-left",
                    state === 'collapsed' ? "cursor-pointer hover:bg-white/5" : "cursor-default"
                )}
                aria-expanded={state === 'active'}
                aria-disabled={state === 'locked'}
            >
                <div className="flex items-center gap-4">
                    {/* Icon State */}
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                        state === 'active' ? `bg-[${color}]/20 text-[${color}]` : "bg-white/5 text-white/40"
                    )} style={{
                        backgroundColor: state === 'active' ? `${color}20` : undefined,
                        color: state === 'active' ? color : undefined
                    }}>
                        {state === 'locked' && <Lock size={14} />}
                        {state === 'collapsed' && <Check size={16} className="text-green-400" />}
                        {state === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />}
                    </div>

                    {/* Text State */}
                    <div className="flex flex-col justify-center">
                        <h3 className={cn(
                            "text-sm font-medium transition-colors",
                            state === 'active' ? "text-white" : "text-white/60"
                        )}>
                            {title}
                        </h3>

                        {/* Summary / Locked Label */}
                        <AnimatePresence mode="wait">
                            {state === 'locked' && (
                                <motion.span
                                    key="locked"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-white/30"
                                >
                                    {lockedText || t('locked')}
                                </motion.span>
                            )}
                            {state === 'collapsed' && (
                                <motion.span
                                    key="summary"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-white/50"
                                >
                                    {summaryText}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Collapsed Chevron */}
                {state === 'collapsed' && (
                    <ChevronDown size={16} className="text-white/30" />
                )}
            </button>

            {/* Expanded Content (Active Only) */}
            <AnimatePresence>
                {state === 'active' && (
                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="flex-1 flex flex-col p-4 pt-0 md:p-6 md:pt-0"
                    >
                        {/* Visualization Container */}
                        <div className="w-full min-h-[200px] mb-6 rounded-lg bg-black/20 border border-white/5 overflow-hidden">
                            {visualization}
                        </div>

                        {/* Description (Desktop Only, or if space permits) */}
                        <p className="text-sm text-gray-300 leading-relaxed mb-6 hidden md:block">
                            {description}
                        </p>

                        {/* Action Bar */}
                        <div className="flex items-center gap-3 mt-auto">
                            {/* Deep Dive Button */}
                            <button
                                onClick={onDeepDive}
                                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-white/80"
                            >
                                {t('deeper')}
                                <ChevronRight size={14} className="opacity-60" />
                            </button>

                            {/* Next Button (Primary) */}
                            <button
                                onClick={onNext}
                                className={cn(
                                    "flex-1 h-11 flex items-center justify-center gap-2 rounded-lg transition-all text-sm font-medium text-black",
                                    step === 'prediction' ? "bg-green-400 hover:bg-green-300" : "bg-white hover:bg-gray-100"
                                )}
                            >
                                {step === 'prediction' ? (
                                    <>
                                        {t('goToSeed')}
                                        <ArrowRight size={16} />
                                    </>
                                ) : (
                                    <>
                                        {t('next')}
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
