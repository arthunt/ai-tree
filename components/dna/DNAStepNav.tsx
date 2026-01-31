"use client";

import { useDNA, DNAStep } from './DNAContext';
import { ChevronRight, SkipForward, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];

const STEP_LABELS: Record<string, string> = {
    tokenization: 'T',
    vectorizing: 'V',
    attention: 'A',
    prediction: 'P',
};

// Step colors (Design System Rules §8)
const STEP_COLORS: Record<string, string> = {
    tokenization: 'var(--dna-t)',
    vectorizing: 'var(--dna-v)',
    attention: 'var(--dna-a)',
    prediction: 'var(--dna-p)',
};

interface DNAStepNavProps {
    onScrollToCard?: (index: number) => void;
}

const BASE_STEP_DURATION = 4000;

export function DNAStepNav({ onScrollToCard }: DNAStepNavProps) {
    const { currentStep, nextStep, jumpToStep, isPlaying, isPaused, hasData, isComplete, playbackSpeed, completedSteps, inputText } = useDNA();
    const [progress, setProgress] = useState(0);
    const t = useTranslations('dna.nav');

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
                                                ? 'text-black'
                                                : isPast
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : 'bg-white/5 text-white/30'
                                            }
                                        `}
                                        style={isCurrent ? { backgroundColor: STEP_COLORS[step], boxShadow: `0 0 12px ${STEP_COLORS[step]}` } : undefined}
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
                                {t('next')}
                                <SkipForward size={14} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg bg-brand-teal text-black text-sm font-bold transition-all active:scale-95"
                            >
                                {t('finish')}
                                <Check size={14} />
                            </button>
                        )
                    ) : (
                        <div className="flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal/60 text-sm font-bold">
                            <Check size={14} /> {t('done')}
                        </div>
                    )}
                </div>

                {/* Step progress bar */}
                {isPlaying && !isPaused && currentStep !== 'idle' && (
                    <div className="h-1 w-full bg-white/5">
                        <motion.div
                            className="h-full"
                            style={{ backgroundColor: STEP_COLORS[currentStep] || 'var(--dna-t)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                        />
                    </div>
                )}

                {/* Step label with name + input text */}
                <div className="flex items-center justify-between px-3 py-1.5 border-t border-white/5">
                    <div className="flex flex-col min-w-0 flex-1 mr-2">
                        <span className="text-[11px] text-white/50 font-mono uppercase tracking-wider">
                            {t('stepOf', { current: String(stepCount > 0 ? stepCount : 1), total: String(ACTIVE_STEPS.length) })}
                        </span>
                        {currentStep !== 'idle' && (
                            <span className="text-xs font-semibold mt-0.5" style={{ color: STEP_COLORS[currentStep] || 'var(--dna-t)', opacity: 0.8 }}>
                                {t(`stepName.${currentStep}`)}
                            </span>
                        )}
                        {inputText && (
                            <span className="text-[10px] text-white/30 truncate mt-0.5">
                                &ldquo;{inputText.length > 40 ? inputText.slice(0, 40) + '...' : inputText}&rdquo;
                            </span>
                        )}
                    </div>
                    {isPlaying && !isPaused && (
                        <span className="text-[11px] font-mono flex items-center gap-1.5" style={{ color: STEP_COLORS[currentStep] || 'var(--dna-t)', opacity: 0.6 }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: STEP_COLORS[currentStep] || 'var(--dna-t)' }} />
                            {t('playing')}
                        </span>
                    )}
                    {isPaused && (
                        <span className="text-[11px] text-white/40 font-mono">
                            {t('paused')}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
