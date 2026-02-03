"use client";

import { useDNA, DNAStep } from "./DNAContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, RefreshCw, SkipForward, Pause, Check, ChevronRight, Gauge, LayoutGrid, LayoutList } from "lucide-react";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { trackDNASimulation } from '@/lib/analytics';
import { useEffect, useRef, useState } from "react";

const ACTIVE_STEPS: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction'];
const BASE_STEP_DURATION = 4000;

// Speed presets: 1x = 4s, 2x = 2s, 3x = 1.33s per step
const SPEED_PRESETS = [
    { label: '1×', value: 1.0 },
    { label: '2×', value: 2.0 },
    { label: '3×', value: 3.0 },
];

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

interface DNAFixedHeaderProps {
    onScrollToCard?: (step: DNAStep) => void;
}

/**
 * DNAFixedHeader — Phase 10
 *
 * Fixed sticky header containing:
 * - Input field with play button
 * - Step breadcrumbs [T] [V] [A] [P]
 * - Progress bar during playback
 * - "Step X of 4" label
 */
export function DNAFixedHeader({ onScrollToCard }: DNAFixedHeaderProps) {
    const {
        inputText,
        setInputText,
        runSimulation,
        isPlaying,
        isPaused,
        togglePause,
        nextStep,
        jumpToStep,
        currentStep,
        resetSimulation,
        playbackSpeed,
        setPlaybackSpeed,
        hasData,
        isComplete,
        completedSteps,
        cardStates,
        viewMode,
        toggleViewMode
    } = useDNA();

    const t = useTranslations('dna.input');
    const tNav = useTranslations('dna.nav');

    const [progress, setProgress] = useState(0);
    const [confirmReset, setConfirmReset] = useState(false);
    const confirmResetTimer = useRef<NodeJS.Timeout | null>(null);

    const currentIndex = ACTIVE_STEPS.indexOf(currentStep);
    const stepCount = currentIndex >= 0 ? currentIndex + 1 : 0;

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

    const handleRun = () => {
        trackDNASimulation('play');
        runSimulation();
    };

    const handleReset = () => {
        if (!confirmReset) {
            setConfirmReset(true);
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

    const handleStepClick = (step: DNAStep) => {
        if (cardStates[step] === 'locked') return;
        jumpToStep(step);
        onScrollToCard?.(step);
    };

    const handleNext = () => {
        nextStep();
        const nextIndex = currentIndex + 1;
        if (nextIndex < ACTIVE_STEPS.length) {
            onScrollToCard?.(ACTIVE_STEPS[nextIndex]);
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10"
        >
            {/* Input Row */}
            <div className="flex items-center gap-2 p-2 md:p-3">
                {/* Sparkle Icon */}
                <div className="pl-2 text-brand-teal flex-shrink-0">
                    <Sparkles size={18} className={isPlaying ? "animate-spin-slow" : ""} />
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => { if (e.target.value.length <= 500) setInputText(e.target.value); }}
                    onKeyDown={handleKeyDown}
                    disabled={isPlaying}
                    maxLength={500}
                    placeholder={t('placeholder')}
                    className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-sm md:text-base py-2 px-2 disabled:opacity-50"
                />

                {/* Control Buttons */}
                <div className="flex gap-1.5 flex-shrink-0">
                    <AnimatePresence mode="wait">
                        {!isPlaying ? (
                            <motion.button
                                key="play"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={handleRun}
                                disabled={!inputText.trim()}
                                className="bg-brand-teal/20 hover:bg-brand-teal/30 text-brand-teal p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed border border-brand-teal/30"
                                aria-label="Play simulation"
                            >
                                <Play size={18} fill="currentColor" />
                            </motion.button>
                        ) : (
                            <>
                                {/* Pause/Resume */}
                                <motion.button
                                    key="pause"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    onClick={togglePause}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all"
                                    aria-label={isPaused ? "Resume" : "Pause"}
                                >
                                    {isPaused ? <Play size={18} /> : <Pause size={18} />}
                                </motion.button>

                                {/* Next Step */}
                                {!isComplete && (
                                    <motion.button
                                        key="next"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        onClick={handleNext}
                                        className="bg-brand-teal/20 hover:bg-brand-teal/30 text-brand-teal p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all border border-brand-teal/30"
                                        aria-label="Next step"
                                    >
                                        <SkipForward size={18} />
                                    </motion.button>
                                )}

                                {/* Reset */}
                                <motion.button
                                    key="reset"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    onClick={handleReset}
                                    className={`p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-all ${confirmReset
                                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-1 ring-red-500/40'
                                        : 'bg-white/10 hover:bg-white/20 text-white/50 hover:text-white/70'
                                        }`}
                                    aria-label={confirmReset ? t('confirmReset') : t('reset')}
                                >
                                    <RefreshCw size={18} className={confirmReset ? 'animate-spin' : ''} />
                                </motion.button>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Step Breadcrumbs + Progress */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-white/5">
                {/* Step Buttons */}
                <div className="flex items-center gap-0.5">
                    {ACTIVE_STEPS.map((step, i) => {
                        const isCurrent = currentStep === step;
                        const isPast = completedSteps.has(step);
                        const isLocked = cardStates[step] === 'locked';

                        return (
                            <div key={step} className="flex items-center">
                                <button
                                    onClick={() => handleStepClick(step)}
                                    disabled={isLocked}
                                    className={`
                                        w-10 h-10 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center
                                        ${isCurrent
                                            ? 'text-black'
                                            : isPast
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : isLocked
                                                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                        }
                                    `}
                                    style={isCurrent ? {
                                        backgroundColor: STEP_COLORS[step],
                                        boxShadow: `0 0 12px ${STEP_COLORS[step]}`
                                    } : undefined}
                                    aria-label={`Step ${i + 1}: ${step}`}
                                    aria-current={isCurrent ? 'step' : undefined}
                                >
                                    {isPast && !isCurrent ? <Check size={14} /> : STEP_LABELS[step]}
                                </button>
                                {i < ACTIVE_STEPS.length - 1 && (
                                    <ChevronRight
                                        size={12}
                                        className={`mx-0.5 ${isPast || isCurrent ? 'text-brand-teal/50' : 'text-white/15'}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Speed Control + Step Counter */}
                <div className="flex items-center gap-3">
                    {/* Speed Control */}
                    {(isPlaying || hasData) && (
                        <div className="flex items-center gap-1">
                            <Gauge size={12} className="text-white/30" />
                            {SPEED_PRESETS.map(({ label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => setPlaybackSpeed(value)}
                                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded transition-all ${playbackSpeed === value
                                        ? 'bg-brand-teal/30 text-brand-teal'
                                        : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                        }`}
                                    aria-label={`Set speed to ${label}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step Counter */}
                    <span className="text-xs text-white/50 font-mono">
                        {hasData || isPlaying
                            ? tNav('stepOf', { current: String(Math.max(1, stepCount)), total: '4' })
                            : ''
                        }
                    </span>

                    {/* Playing/Paused indicator */}
                    {isPlaying && !isPaused && currentStep !== 'idle' && (
                        <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: STEP_COLORS[currentStep] }}>
                            <span
                                className="w-2 h-2 rounded-full animate-pulse"
                                style={{ backgroundColor: STEP_COLORS[currentStep] }}
                            />
                            {tNav('playing')}
                        </span>
                    )}
                    {isPaused && (
                        <span className="text-xs text-white/40 font-mono">
                            {tNav('paused')}
                        </span>
                    )}
                    {isComplete && (
                        <span className="flex items-center gap-1 text-xs text-brand-teal font-mono">
                            <Check size={12} /> {tNav('done')}
                        </span>
                    )}

                    {/* Desktop View Toggle */}
                    <button
                        onClick={toggleViewMode}
                        className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all ml-2"
                        title={viewMode === 'grid' ? "Switch to Stack View" : "Switch to Grid View"}
                    >
                        {viewMode === 'grid' ? (
                            <LayoutList size={14} />
                        ) : (
                            <LayoutGrid size={14} />
                        )}
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            {isPlaying && !isPaused && currentStep !== 'idle' && (
                <div className="h-1.5 w-full bg-white/5">
                    <motion.div
                        className="h-full relative"
                        style={{
                            backgroundColor: STEP_COLORS[currentStep] || 'var(--dna-t)',
                            boxShadow: `0 0 12px ${STEP_COLORS[currentStep]}`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 blur-[2px]" />
                    </motion.div>
                </div>
            )}
        </motion.header>
    );
}
