"use client";

import { useDNA, DNAStep } from "./DNAContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, RefreshCw, SkipForward, Pause } from "lucide-react";

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { trackDNASimulation } from '@/lib/analytics';
import { useEffect, useState } from "react";

const STEP_ORDER: DNAStep[] = ['tokenization', 'vectorizing', 'attention', 'prediction', 'idle'];
const BASE_STEP_DURATION = 4000;

export function DNAInput() {
    const { inputText, setInputText, runSimulation, isPlaying, isPaused, togglePause, nextStep, currentStep, resetSimulation, playbackSpeed } = useDNA();
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

    const handleReset = () => {
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
        <div className="w-full max-w-2xl mx-auto mb-12 relative z-10">
            <div className="relative group">
                {/* Background Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-teal to-brand-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isPlaying ? 'opacity-50 animate-pulse' : ''}`}></div>

                <div className="relative flex flex-col bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Top Row: Input & Controls */}
                    <div className="flex items-center p-2">
                        <div className="pl-4 text-brand-teal">
                            <Sparkles size={20} className={isPlaying ? "animate-spin-slow" : ""} />
                        </div>

                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isPlaying}
                            placeholder={t('placeholder')}
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 text-lg py-3 px-4 disabled:opacity-50"
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
                                        className="bg-white/10 hover:bg-white/20 text-brand-teal p-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
                                            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all"
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
                                            className="bg-white/10 hover:bg-white/20 text-brand-teal p-3 rounded-xl transition-all"
                                            title="Next Step"
                                        >
                                            <SkipForward size={20} />
                                        </motion.button>

                                        {/* Reset */}
                                        <motion.button
                                            key="reset"
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            onClick={handleReset}
                                            className="bg-white/10 hover:bg-white/20 text-red-400 p-3 rounded-xl transition-all"
                                        >
                                            <RefreshCw size={20} />
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
                                className="absolute top-0 left-0 h-full bg-brand-teal box-shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Helper Text */}
            <div className="mt-3 flex justify-between px-4 text-xs text-brand-teal/60 font-mono">
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
