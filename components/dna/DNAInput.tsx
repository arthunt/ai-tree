"use client";

import { useDNA, DNAStep } from "./DNAContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, RefreshCw, SkipForward, SkipBack, Pause } from "lucide-react";

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { trackDNASimulation } from '@/lib/analytics';
import { useEffect, useRef, useState } from "react";

const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];
const BASE_STEP_DURATION = 4000;

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

export function DNAInput() {
    const { inputText, setInputText, runSimulation, isPlaying, isPaused, togglePause, nextStep, prevStep, jumpToStep, currentStep, resetSimulation, playbackSpeed, hasData } = useDNA();
    const t = useTranslations('dna.input');
    const tCard = useTranslations('dna.microLesson');

    // Progress Bar State
    const [progress, setProgress] = useState(0);

    // Simple mapping for display
    const stepNameMap: Record<string, string> = {
        tokenization: 'tokenization',
        vectorizing: 'vectorizing',
        attention: 'attention',
        prediction: 'prediction',
        idle: 'tokenization'
    };

    const handleRun = () => {
        trackDNASimulation('play');
        runSimulation();
    };

    const [confirmReset, setConfirmReset] = useState(false);
    const confirmResetTimer = useRef<NodeJS.Timeout | null>(null);

    const handleReset = () => {
        if (!confirmReset) {
            setConfirmReset(true);
            // Auto-dismiss after 2s if user doesn't confirm
            confirmResetTimer.current = setTimeout(() => setConfirmReset(false), 2000);
            return;
        }
        if (confirmResetTimer.current) clearTimeout(confirmResetTimer.current);
        setConfirmReset(false);
        trackDNASimulation('reset');
        resetSimulation();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isPlaying && inputText) {
            handleRun();
        }
    };

    // Progress Bar Logic
    useEffect(() => {
        if (!isPlaying || isPaused || currentStep === 'idle') {
            setProgress(0);
            return;
        }

        const duration = BASE_STEP_DURATION / playbackSpeed;
        const interval = 50; // Update every 50ms
        const steps = duration / interval;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            setProgress((current / steps) * 100);
        }, interval);

        return () => clearInterval(timer);
    }, [currentStep, isPlaying, isPaused, playbackSpeed]);

    return (
        <div className="w-full max-w-2xl lg:max-w-full mx-auto mb-2 md:mb-3 relative z-10">
            <div className="relative group">
                {/* Background Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-teal to-brand-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isPlaying ? 'opacity-50 animate-pulse' : ''}`}></div>

                <div className="relative flex flex-col bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden">

                    {/* Top Row: Input & Controls */}
                    <div className="flex items-center p-2">
                        <div className="pl-3 md:pl-4 text-brand-teal">
                            <Sparkles size={18} className={isPlaying ? "animate-spin-slow" : ""} />
                        </div>

                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => { if (e.target.value.length <= 500) setInputText(e.target.value); }}
                            onKeyDown={handleKeyDown}
                            disabled={isPlaying}
                            maxLength={500}
                            placeholder={t('placeholder')}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-base md:text-lg py-2 md:py-3 px-3 md:px-4 disabled:opacity-50"
                        />

                        <div className="flex gap-2">
                            <AnimatePresence mode="wait">
                                {!isPlaying ? (
                                    <motion.button
                                        key="play"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        onClick={handleRun}
                                        disabled={!inputText.trim()}
                                        className="bg-white/10 hover:bg-white/20 text-brand-teal p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <Play size={20} fill="currentColor" />
                                    </motion.button>
                                ) : (
                                    <>
                                        {/* Pause/Play Toggle */}
                                        <motion.button
                                            key="pause"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            onClick={togglePause}
                                            className="bg-white/10 hover:bg-white/20 text-white p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl transition-all"
                                        >
                                            {isPaused ? <Play size={20} /> : <Pause size={20} />}
                                        </motion.button>

                                        {/* Next Step Manual Advance */}
                                        <motion.button
                                            key="next"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            onClick={nextStep}
                                            className="bg-white/10 hover:bg-white/20 text-brand-teal p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl transition-all"
                                            title="Next Step"
                                        >
                                            <SkipForward size={20} />
                                        </motion.button>

                                        {/* Reset (tap-to-confirm) */}
                                        <motion.button
                                            key="reset"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            onClick={handleReset}
                                            className={`p-3 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl transition-all ${
                                                confirmReset
                                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-1 ring-red-500/40'
                                                    : 'bg-white/10 hover:bg-white/20 text-white/50 hover:text-white/70'
                                            }`}
                                            title={confirmReset ? t('confirmReset') : t('reset')}
                                        >
                                            <RefreshCw size={20} className={confirmReset ? 'animate-spin' : ''} />
                                        </motion.button>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Progress Bar (Only when playing) */}
                    {isPlaying && (
                        <div className="h-1 w-full bg-white/5 relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full"
                                style={{ backgroundColor: STEP_COLORS[currentStep] || 'var(--dna-t)' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                            />
                        </div>
                    )}

                    {/* Step Selector (hidden on mobile — shown in sticky DNAStepNav instead) */}
                    <div className={`hidden md:flex items-center justify-center gap-1.5 md:gap-1 px-3 py-2 border-t border-white/5 transition-opacity ${!isPlaying && !hasData ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                            {/* Prev */}
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 'tokenization' || currentStep === 'idle'}
                                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                title="Previous step"
                            >
                                <SkipBack size={14} />
                            </button>

                            {/* Step Buttons [T] [V] [A] [P] */}
                            {ACTIVE_STEPS.map((step, i) => {
                                const isCurrentStep = currentStep === step;
                                const stepIndex = ACTIVE_STEPS.indexOf(currentStep);
                                const isPast = stepIndex > i || (currentStep === 'idle' && hasData);
                                return (
                                    <button
                                        key={step}
                                        onClick={() => jumpToStep(step)}
                                        className={`
                                            w-10 h-10 md:w-8 md:h-8 rounded-lg text-xs font-bold font-mono transition-all
                                            ${isCurrentStep
                                                ? 'text-black'
                                                : isPast
                                                    ? 'bg-white/10 text-brand-teal/80 hover:bg-white/20'
                                                    : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/60'
                                            }
                                        `}
                                        style={isCurrentStep ? { backgroundColor: STEP_COLORS[step], boxShadow: `0 0 12px ${STEP_COLORS[step]}` } : undefined}
                                        title={step}
                                    >
                                        {STEP_LABELS[step]}
                                    </button>
                                );
                            })}

                            {/* Next */}
                            <button
                                onClick={nextStep}
                                disabled={currentStep === 'idle' && !isPlaying}
                                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                title="Next step"
                            >
                                <SkipForward size={14} />
                            </button>
                        </div>
                </div>
            </div>

            {/* Helper Text (hidden on mobile to save space) */}
            <div className="mt-3 hidden md:flex justify-between px-4 text-xs text-brand-teal/60 font-mono">
                <span>{t('interactiveMode')}</span>
                <AnimatePresence>
                    {isPlaying && (
                        <motion.span
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={currentStep}
                        >
                            {t('status', { step: tCard(`${stepNameMap[currentStep] || 'tokenization'}.title`) })}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
