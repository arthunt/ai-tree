"use client";

import { useDNA, DNAStep } from './DNAContext';
import { ChevronRight, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';

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

export function DNAStepNav() {
    const { currentStep, nextStep, jumpToStep, isPlaying, hasData, isComplete } = useDNA();

    // Only show when simulation is active and has data
    if (!hasData || isComplete) return null;

    const currentIndex = ACTIVE_STEPS.indexOf(currentStep);
    const isLastStep = currentStep === 'prediction';

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-40 md:hidden"
        >
            <div className="flex items-center justify-between px-3 py-2 bg-black/80 backdrop-blur-xl border-b border-white/10">
                {/* Step Breadcrumbs */}
                <div className="flex items-center gap-1">
                    {ACTIVE_STEPS.map((step, i) => {
                        const isCurrent = currentStep === step;
                        const isPast = currentIndex > i;
                        return (
                            <div key={step} className="flex items-center">
                                <button
                                    onClick={() => jumpToStep(step)}
                                    className={`
                                        w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center
                                        ${isCurrent
                                            ? 'bg-brand-teal text-black shadow-[0_0_12px_rgba(45,212,191,0.4)]'
                                            : isPast
                                                ? 'bg-white/15 text-brand-teal/80'
                                                : 'bg-white/5 text-white/30'
                                        }
                                    `}
                                >
                                    {STEP_LABELS[step]}
                                </button>
                                {i < ACTIVE_STEPS.length - 1 && (
                                    <ChevronRight size={12} className={`mx-0.5 ${isPast ? 'text-brand-teal/50' : 'text-white/15'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Current Step Name + Next Button */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50 font-mono hidden min-[400px]:inline">
                        {STEP_NAMES[currentStep] || ''}
                    </span>
                    {!isLastStep ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-lg bg-brand-teal/20 hover:bg-brand-teal/30 border border-brand-teal/30 text-brand-teal text-xs font-bold transition-all active:scale-95"
                        >
                            Next
                            <SkipForward size={14} />
                        </button>
                    ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 min-h-[40px] rounded-lg bg-brand-teal/10 border border-brand-teal/20 text-brand-teal/60 text-xs font-bold">
                            Done
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
