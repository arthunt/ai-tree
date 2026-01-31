"use client";

import { useDNA, DNAStep } from './DNAContext';
import { ChevronRight, SkipForward, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];

const STEP_LABELS: Record<string, string> = {
    tokenization: 'T',
    vectorizing: 'V',
    attention: 'A',
    prediction: 'P',
};

const STEP_NAMES: Record<string, string> = {
    tokenization: 'Tokenize',
    vectorizing: 'Vectorize',
    attention: 'Attention',
    prediction: 'Predict',
};

interface DNAStepNavProps {
    onScrollToCard?: (index: number) => void;
}

const BASE_STEP_DURATION = 4000;

export function DNAStepNav({ onScrollToCard }: DNAStepNavProps) {
    const { currentStep, nextStep, jumpToStep, isPlaying, isPaused, hasData, isComplete, playbackSpeed, completedSteps } = useDNA();
    const [progress, setProgress] = useState(0);

    const currentIndex = ACTIVE_STEPS.indexOf(currentStep);
    const isLastStep = currentStep === 'prediction';
    const stepCount = currentIndex + 1;

    // Progress bar within current step
    useEffect(() => {
        if (!isPlaying || isPaused || currentStep === 'idle') {
            setProgress(0);
            return;
        }

        const duration = BASE_STEP_DURATION / playbackSpeed;
        const interval = 50;
        const steps = duration / interval;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            setProgress((current / steps) * 100);
        }, interval);

        return () => clearInterval(timer);
    }, [currentStep, isPlaying, isPaused, playbackSpeed]);

    const handleStepClick = (step: DNAStep, index: number) => {
        jumpToStep(step);
        onScrollToCard?.(index);
    };

    const handleNext = () => {
        nextStep();
        if (currentIndex + 1 < ACTIVE_STEPS.length) {
            onScrollToCard?.(currentIndex + 1);
        }
    };

    // Always visible — dimmed when no data
    const navOpacity = hasData ? 'opacity-100' : 'opacity-30 pointer-events-none';

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`sticky top-0 z-40 md:hidden ${navOpacity} transition-opacity`}
        >
            <div className="flex flex-col bg-black/80 backdrop-blur-xl border-b border-white/10">
                {/* Main row: breadcrumbs + action */}
                <div className="flex items-center justify-between px-3 py-2">
                    {/* Step Breadcrumbs */}
                    <div className="flex items-center gap-1">
                        {ACTIVE_STEPS.map((step, i) => {
                            const isCurrent = currentStep === step;
                            const isPast = completedSteps.has(step);
                            return (
                                <div key={step} className="flex items-center">
                                    <button
                                        onClick={() => handleStepClick(step, i)}
                                        className={`
                                            w-11 h-11 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center
                                            ${isCurrent
                                                ? 'bg-brand-teal text-black shadow-[0_0_12px_rgba(45,212,191,0.4)]'
                                                : isPast
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-white/5 text-white/30'
                                            }
                                        `}
                                    >
                                        {isPast && !isCurrent ? <Check size={14} /> : STEP_LABELS[step]}
                                    </button>
                                    {i < ACTIVE_STEPS.length - 1 && (
                                        <ChevronRight size={12} className={`mx-0.5 ${isPast || isCurrent ? 'text-brand-teal/50' : 'text-white/15'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Next Button or Done */}
                    {!isComplete ? (
                        !isLastStep ? (
                            <button
                                onClick={handleNext}
                                className={`flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg bg-brand-teal/20 hover:bg-brand-teal/30 border border-brand-teal/30 text-brand-teal text-sm font-bold transition-all active:scale-95 ${
                                    progress > 85 ? 'animate-pulse shadow-[0_0_16px_rgba(45,212,191,0.4)]' : ''
                                }`}
                            >
                                Next
                                <SkipForward size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg bg-brand-teal text-black text-sm font-bold transition-all active:scale-95"
                            >
                                Finish
                                <Check size={14} />
                            </button>
                        )
                    ) : (
                        <div className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal/60 text-sm font-bold">
                            <Check size={14} /> Done
                        </div>
                    )}
                </div>

                {/* Step progress bar */}
                {isPlaying && !isPaused && currentStep !== 'idle' && (
                    <div className="h-1 w-full bg-white/5">
                        <motion.div
                            className="h-full bg-brand-teal"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                        />
                    </div>
                )}

                {/* Step label with name */}
                <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-white/50 font-mono uppercase tracking-wider">
                            Step {stepCount > 0 ? stepCount : 1} of {ACTIVE_STEPS.length}
                        </span>
                        {currentStep !== 'idle' && (
                            <span className="text-xs text-brand-teal/80 font-semibold mt-0.5">
                                {STEP_NAMES[currentStep]}
                            </span>
                        )}
                    </div>
                    {isPlaying && !isPaused && (
                        <span className="text-[11px] text-brand-teal/60 font-mono flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                            Playing
                        </span>
                    )}
                    {isPaused && (
                        <span className="text-[11px] text-white/40 font-mono">
                            Paused
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
