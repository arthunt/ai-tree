"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDNA, DNAStep, CardState } from "./DNAContext";
import { DNAOrientationCard } from "./DNAOrientationCard";
import { TokenizationSlicer } from "./TokenizationSlicer";
import { VectorMap } from "./VectorMap";
import { AttentionSpotlight } from "./AttentionSpotlight";
import { PredictionBarChart } from "./PredictionBarChart";
import { CompletionCard } from "./CompletionCard";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { Lock, Check, ChevronDown, ChevronRight, Lightbulb } from "lucide-react";

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
        isComplete
    } = useDNA();

    const t = useTranslations('dna');
    const tNav = useTranslations('dna.nav');
    const tAccordion = useTranslations('dna.accordion');
    const tSummary = useTranslations('dna.summary');
    const tMicro = useTranslations('dna.microLesson');

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
                return tSummary('vectorizing', { count: String(vectors.length * 2) });
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
                    />
                );
            default:
                return null;
        }
    };

    const color = STEP_COLORS[step];
    const label = STEP_LABELS[step];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`
                relative rounded-2xl border transition-all overflow-hidden
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
            role={isCollapsed ? "button" : undefined}
            aria-expanded={isActive}
            tabIndex={isCollapsed ? 0 : undefined}
            onKeyDown={(e) => {
                if (isCollapsed && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onExpand();
                }
            }}
        >
            {/* Header Row - Always visible */}
            <div className={`
                flex items-center gap-3 p-4
                ${isActive ? 'border-b border-white/5' : ''}
            `}>
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
                    <h3 className={`
                        text-sm font-semibold truncate
                        ${isLocked ? 'text-white/30' : 'text-white'}
                    `}>
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

                {/* Expand/Collapse Indicator */}
                {!isLocked && (
                    <div className="text-white/30 flex-shrink-0">
                        {isActive ? (
                            <ChevronDown size={20} />
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-2 space-y-4">
                            {/* Description */}
                            <p className="text-sm text-white/60 leading-relaxed">
                                {getStepBody()}
                            </p>

                            {/* Visualization */}
                            <div className="py-4 flex justify-center">
                                {renderVisualization()}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                {/* Go Deeper Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeepDive();
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all min-h-[48px]"
                                >
                                    <Lightbulb size={16} />
                                    {tAccordion('deeper')}
                                </button>

                                {/* Next / Finish Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNext();
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl text-black text-sm font-semibold transition-all min-h-[48px]"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow: `0 0 20px ${color}40`
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
        hasData
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
            // Small delay to let the accordion animation start
            setTimeout(() => {
                cardEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [currentStep]);

    const handleScrollToCard = useCallback((step: DNAStep) => {
        const cardEl = cardRefs.current[step];
        if (cardEl) {
            cardEl.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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

    return (
        <div ref={stackRef} className="w-full max-w-lg mx-auto space-y-3 pb-8">
            {/* Orientation Card (shown before any input) */}
            <AnimatePresence>
                {showOrientation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <DNAOrientationCard />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Step Cards */}
            {ACTIVE_STEPS.map((step) => (
                <div
                    key={step}
                    ref={(el) => { cardRefs.current[step] = el; }}
                    className="scroll-mt-24"
                >
                    <AccordionCard
                        step={step}
                        state={cardStates[step]}
                        onExpand={() => handleExpand(step)}
                        onNext={handleNext}
                        onDeepDive={() => openDeepDive(step)}
                    />
                </div>
            ))}

            {/* Completion Card */}
            <AnimatePresence>
                {isComplete && hasData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                    >
                        <CompletionCard />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
