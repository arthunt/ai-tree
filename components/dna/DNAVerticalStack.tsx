"use client";

import { useRef, useCallback, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useDNA, DNAStep, CardState } from "./DNAContext";
import { DNAOrientationCard } from "./DNAOrientationCard";
import { TokenizationSlicer } from "./TokenizationSlicer";
import { VectorMap } from "./VectorMap";
import { AttentionSpotlight } from "./AttentionSpotlight";
import { PredictionBarChart } from "./PredictionBarChart";
import { CompletionCard } from "./CompletionCard";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { Lock, Check, ChevronDown, ChevronRight, Lightbulb, SkipForward, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DNAVerticalStack — Phase 10
 *
 * Vertical accordion container for the DNA simulation cards.
 * Each card can be: locked, active (expanded), or collapsed.
 *
 * Features:
 * - Auto-scrolls to active card when step advances
 * - Spring physics for expand/collapse animations
 * - Supports reduced motion preferences
 * - Touch-friendly 48px+ hit targets
 */

const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];

// Step colors (Design System Rules §8)
const STEP_COLORS: Record<DNAStep, string> = {
    idle: 'var(--dna-t)',
    tokenization: 'var(--dna-t)',
    vectorizing: 'var(--dna-v)',
    attention: 'var(--dna-a)',
    prediction: 'var(--dna-p)'
};

const STEP_LABELS: Record<DNAStep, string> = {
    idle: '',
    tokenization: 'T',
    vectorizing: 'V',
    attention: 'A',
    prediction: 'P'
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

interface AccordionCardProps {
    step: DNAStep;
    state: CardState;
    onExpand: () => void;
    onNext: () => void;
    onDeepDive: () => void;
}

function AccordionCard({ step, state, onExpand, onNext, onDeepDive }: AccordionCardProps) {
    const {
        inputText,
        tokens,
        subTokens,
        vectors,
        attentionWeights,
        predictions,
        currentStep,
        isComplete,
        isPaused,
        isPlaying,
        togglePause
    } = useDNA();

    const t = useTranslations('dna');
    const tNav = useTranslations('dna.nav');
    const tAccordion = useTranslations('dna.accordion');
    const tSummary = useTranslations('dna.summary');
    const tMicro = useTranslations('dna.microLesson');

    // Accessibility: respect reduced motion preference
    const prefersReducedMotion = useReducedMotion();

    const isLocked = state === 'locked';
    const isActive = state === 'active';
    const isCollapsed = state === 'collapsed';

    const isCurrentlyAnimating = currentStep === step;
    const isLastStep = step === 'prediction';

    // Get summary text for collapsed state
    const getSummaryText = () => {
        switch (step) {
            case 'tokenization':
                return tSummary('tokenization', { count: String(subTokens.length) });
            case 'vectorizing':
                return tSummary('vectorizing', { count: String(vectors.length) });
            case 'attention':
                return tSummary('attention', { count: String(attentionWeights.length) });
            case 'prediction':
                const winner = predictions[0];
                if (winner) {
                    return tSummary('prediction', {
                        token: winner.token,
                        percent: String(Math.round(winner.probability * 100))
                    });
                }
                return '';
            default:
                return '';
        }
    };

    // Get step title and description
    const getStepTitle = () => tMicro(`${step}.title` as any);
    const getStepBody = () => tMicro(`${step}.body` as any);

    // Render visualization based on step
    const renderVisualization = () => {
        switch (step) {
            case 'tokenization':
                return (
                    <TokenizationSlicer
                        text={inputText}
                        tokens={tokens}
                        isActive={isCurrentlyAnimating || isActive}
                    />
                );
            case 'vectorizing':
                return (
                    <VectorMap
                        tokens={tokens}
                        vectors={vectors}
                        isActive={isCurrentlyAnimating || isActive}
                    />
                );
            case 'attention':
                return (
                    <AttentionSpotlight
                        tokens={tokens}
                        weights={attentionWeights}
                        isActive={isCurrentlyAnimating || isActive}
                    />
                );
            case 'prediction':
                return (
                    <PredictionBarChart
                        predictions={predictions}
                        isActive={isCurrentlyAnimating || isActive}
                        contextText={inputText}
                    />
                );
            default:
                return null;
        }
    };

    const color = STEP_COLORS[step];
    const label = STEP_LABELS[step];

    // Animation variants that respect reduced motion
    const cardTransition = prefersReducedMotion
        ? { duration: 0.01 }
        : { type: "spring", stiffness: 300, damping: 25 };

    const expandTransition = prefersReducedMotion
        ? { duration: 0.01 }
        : { type: "spring", stiffness: 300, damping: 25 };

    return (
        <motion.div
            layout={!prefersReducedMotion}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cardTransition}
            className={`
                relative rounded-2xl border transition-all overflow-hidden
                focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-black
                ${isLocked
                    ? 'bg-white/[0.02] border-white/5 opacity-50'
                    : isActive
                        ? 'bg-black/60 backdrop-blur-xl border-opacity-50'
                        : 'bg-black/40 backdrop-blur-md border-white/10 hover:bg-black/50 cursor-pointer'
                }
            `}
            style={{
                borderColor: isActive ? color : undefined,
                boxShadow: isActive ? `0 0 30px ${color}30` : undefined
            }}
            onClick={isCollapsed ? onExpand : undefined}
            role={isCollapsed ? "button" : "region"}
            aria-expanded={isActive}
            aria-label={getStepTitle()}
            tabIndex={isCollapsed ? 0 : -1}
            onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    if (isCollapsed) {
                        onExpand();
                    } else if (isActive) {
                        onNext();
                    }
                }
            }}
        >
            {/* Header Row - Always visible, tappable when active to advance */}
            <div
                className={`
                    flex items-center gap-3 p-4
                    ${isActive ? 'border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors' : ''}
                `}
                onClick={isActive ? (e) => {
                    e.stopPropagation();
                    onNext();
                } : undefined}
                role={isActive ? "button" : undefined}
                aria-label={isActive ? tAccordion('next') : undefined}
            >
                {/* Step Badge */}
                <div
                    className={`
                        w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold font-mono flex-shrink-0
                        ${isLocked
                            ? 'bg-white/5 text-white/20'
                            : isActive
                                ? 'text-black'
                                : 'text-black'
                        }
                    `}
                    style={{
                        backgroundColor: isLocked ? undefined : color,
                        boxShadow: isActive ? `0 0 15px ${color}60` : undefined
                    }}
                >
                    {isLocked ? <Lock size={14} /> : isCollapsed ? <Check size={14} /> : label}
                </div>

                {/* Title + Status */}
                <div className="flex-1 min-w-0">
                    <h3
                        id={`step-title-${step}`}
                        className={`
                            text-sm font-semibold truncate
                            ${isLocked ? 'text-white/30' : 'text-white'}
                        `}
                    >
                        {getStepTitle()}
                    </h3>
                    {isCollapsed && (
                        <p className="text-xs text-white/50 truncate mt-0.5">
                            {getSummaryText()}
                        </p>
                    )}
                    {isLocked && (
                        <p className="text-xs text-white/20 mt-0.5">
                            {tAccordion('locked')}
                        </p>
                    )}
                </div>

                {/* Expand/Collapse/Skip Indicator */}
                {!isLocked && (
                    <div className={`flex-shrink-0 flex items-center gap-1.5 ${isActive ? 'text-white/50' : 'text-white/30'}`}>
                        {isActive ? (
                            <>
                                <span className="text-[10px] font-medium uppercase tracking-wider hidden sm:block">
                                    {tAccordion('tapToSkip')}
                                </span>
                                <SkipForward size={16} />
                            </>
                        ) : (
                            <ChevronRight size={20} />
                        )}
                    </div>
                )}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={expandTransition}
                        className="overflow-hidden"
                        role="region"
                        aria-labelledby={`step-title-${step}`}
                    >
                        <div className="p-4 pt-2 space-y-4">
                            {/* Description */}
                            <p className="text-sm text-white/60 leading-relaxed">
                                {getStepBody()}
                            </p>

                            {/* Visualization area with floating pause button */}
                            <div className="py-4 relative">
                                {/* Main visualization */}
                                <div className="w-full flex justify-center pb-10">
                                    {renderVisualization()}
                                </div>

                                {/* Floating Pause/Continue Button (overlay at bottom) */}
                                <AnimatePresence>
                                    {isPlaying && (
                                        <motion.button
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            onClick={togglePause}
                                            className={cn(
                                                "absolute bottom-4 left-1/2 -translate-x-1/2",
                                                "w-10 h-10 rounded-full flex items-center justify-center",
                                                "backdrop-blur-sm transition-all shadow-lg",
                                                isPaused
                                                    ? "bg-brand-teal text-black hover:bg-brand-teal/90"
                                                    : "bg-black/60 text-white/70 hover:bg-black/80 hover:text-white border border-white/10"
                                            )}
                                            aria-label={isPaused ? tAccordion('resume') : tAccordion('pauseToLearn')}
                                        >
                                            {isPaused ? <ChevronRight size={20} className="ml-0.5" /> : <Pause size={20} />}
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                {/* Go Deeper Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeepDive();
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    aria-label={tAccordion('deeper')}
                                    style={{ display: isPlaying ? 'none' : 'flex' }}
                                >
                                    <Lightbulb size={16} aria-hidden="true" />
                                    {tAccordion('deeper')}
                                </button>

                                {/* Next / Finish Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNext();
                                    }}
                                    aria-label={isLastStep && isComplete ? tNav('finish') : tAccordion('next')}
                                    className="flex-1 py-3 px-4 rounded-xl text-black text-sm font-semibold transition-all min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: `0 0 20px ${color}40`,
                                        display: isPlaying ? 'none' : 'block' // Sprint 7: Hide during auto-play
                                    }}
                                >
                                    {isLastStep && isComplete
                                        ? tNav('finish')
                                        : tAccordion('next')
                                    }
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function DNAVerticalStack() {
    const {
        cardStates,
        showOrientation,
        currentStep,
        expandCard,
        nextStep,
        openDeepDive,
        isComplete,
        hasData,
        viewMode,
        runSimulation,
        dismissOrientation,
        isPlaying
    } = useDNA();

    const stackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<Record<DNAStep, HTMLDivElement | null>>({
        idle: null,
        tokenization: null,
        vectorizing: null,
        attention: null,
        prediction: null
    });

    // Auto-scroll to active card when step changes
    useEffect(() => {
        if (currentStep === 'idle') return;

        const cardEl = cardRefs.current[currentStep];
        if (cardEl) {
            // Delay to let the accordion animation start, then scroll
            setTimeout(() => {
                // Get the card's position relative to the viewport
                const rect = cardEl.getBoundingClientRect();
                const headerHeight = 140; // Fixed header height (approx)
                const targetY = window.scrollY + rect.top - headerHeight; // Flush with header to hide previous cards

                // Only scroll if card is not already in good view
                if (rect.top < headerHeight || rect.bottom > window.innerHeight) {
                    window.scrollTo({
                        top: Math.max(0, targetY),
                        behavior: 'smooth'
                    });
                }
            }, 300); // Increased delay for layout stabilization
        }
    }, [currentStep]);

    const handleScrollToCard = useCallback((step: DNAStep) => {
        const cardEl = cardRefs.current[step];
        if (cardEl) {
            const rect = cardEl.getBoundingClientRect();
            const headerHeight = 140;
            const targetY = window.scrollY + rect.top - headerHeight - 16;
            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
            });
        }
    }, []);

    const handleExpand = useCallback((step: DNAStep) => {
        expandCard(step);
        handleScrollToCard(step);
    }, [expandCard, handleScrollToCard]);

    const handleNext = useCallback(() => {
        nextStep();
        // The useEffect above will handle scrolling to the new active card
    }, [nextStep]);

    const { locale } = useParams();
    const isEt = locale === 'et';
    const isRu = locale === 'ru';

    // Localized Example Prompt (Nature/Animals for Estonia)
    const examplePrompt = isEt
        ? "Koer on inimese parim"
        : isRu
            ? "Лес и дерево"
            : "The king wore a crown";

    const handleUseExample = () => {
        // Force the input update immediately
        dismissOrientation();
        runSimulation(examplePrompt);
    };

    const currentStepIndex = ACTIVE_STEPS.indexOf(currentStep);

    return (
        <div ref={stackRef} className={cn(
            "w-full mx-auto space-y-3 pb-8",
            viewMode === 'grid' ? "max-w-4xl" : "max-w-lg"
        )}>
            {/* Orientation Card (first-time users) */}
            <AnimatePresence>
                {showOrientation && (
                    <DNAOrientationCard
                        onDismiss={dismissOrientation}
                        examplePrompt={examplePrompt}
                        onUseExample={handleUseExample}
                    />
                )}
            </AnimatePresence>

            {/* Grid vs Stack Layout */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className={cn(
                    "transition-all",
                    viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0" : "space-y-3"
                )}
            >
                {/* Step Cards */}
                {ACTIVE_STEPS.map((step, index) => {
                    // NEW-1: Hide future locked cards during simulation, AND hide all cards on idle start screen
                    if ((currentStep === 'idle' && !isComplete) || (isPlaying && index > currentStepIndex)) {
                        return null;
                    }

                    return (
                        <div
                            key={step}
                            ref={(el) => { cardRefs.current[step] = el; }}
                            className={cn(
                                "scroll-mt-24 transition-all",
                                viewMode === 'grid' ? "col-span-1" : "col-span-1"
                            )}
                        >
                            <AccordionCard
                                step={step}
                                state={cardStates[step]}
                                onExpand={() => handleExpand(step)}
                                onNext={handleNext}
                                onDeepDive={() => openDeepDive(step)}
                            />
                        </div>
                    );
                })}
            </motion.div>

            {/* Completion Card (after prediction step) */}
            <AnimatePresence>
                {isComplete && hasData && (
                    <CompletionCard />
                )}
            </AnimatePresence>
        </div>
    );
}
