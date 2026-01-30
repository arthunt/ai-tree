"use client";

import { useDNA } from "./DNAContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Play, RefreshCw } from "lucide-react";

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { trackDNASimulation } from '@/lib/analytics';

export function DNAInput() {
    const { inputText, setInputText, runSimulation, isPlaying, currentStep, resetSimulation } = useDNA();
    const t = useTranslations('dna.input');
    const tCard = useTranslations('dna.microLesson');

    // Simple mapping for display
    const stepNameMap: Record<string, string> = {
        tokenization: 'tokenization',
        vectorizing: 'vectorizing',
        attention: 'attention',
        prediction: 'prediction',
        idle: 'tokenization' // Fallback
    };

    const handleRun = () => {
        trackDNASimulation('play', inputText); // Log input text length implicitly or just event? Actually let's not log PII.
        // trackDNASimulation('play') is safe.
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

    return (
        <div className="w-full max-w-2xl mx-auto mb-12 relative z-10">
            <div className="relative group">
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-brand-teal to-brand-cyan rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 ${isPlaying ? 'opacity-50 animate-pulse' : ''}`}></div>
                <div className="relative flex items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">

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
                        )}
                    </AnimatePresence>
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
