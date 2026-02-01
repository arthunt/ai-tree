"use client";

import { useSeed, SeedPhase } from './SeedContext';
import { ChevronRight, RotateCcw, Check, BrainCircuit, Database, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SeedNavI18n {
    ingestion: string;
    training: string;
    model: string;
    resetRun: string;
}

export function SeedStepNav({ i18n }: { i18n: SeedNavI18n }) {
    const { phase, progress, reset } = useSeed();

    const STEPS = [
        { id: 'selection', label: i18n.ingestion, icon: Database },
        { id: 'training', label: i18n.training, icon: BrainCircuit },
        { id: 'complete', label: i18n.model, icon: Layers },
    ] as const;

    // Helper to determine step status
    const getStepStatus = (stepId: string) => {
        const phases: SeedPhase[] = ['selection', 'processing', 'training', 'complete'];
        const currentIndex = phases.indexOf(phase === 'processing' ? 'selection' : phase);
        const stepIndex = phases.indexOf(stepId as SeedPhase);

        if (phase === 'complete') return 'complete';
        if (currentIndex > stepIndex) return 'complete';
        if (currentIndex === stepIndex) return 'active';
        return 'pending';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-40 w-full backdrop-blur-xl bg-stone-950/80 border-b border-amber-900/20"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Steps Visualizer */}
                <div className="flex items-center gap-2 md:gap-4">
                    {STEPS.map((step, i) => {
                        const status = getStepStatus(step.id);
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-500",
                                    status === 'active' ? "bg-amber-900/40 border-amber-500/50 text-amber-200" :
                                        status === 'complete' ? "bg-amber-950/40 border-amber-900/30 text-amber-500" :
                                            "bg-transparent border-transparent text-stone-600"
                                )}>
                                    <Icon size={16} className={status === 'active' ? "animate-pulse" : ""} />
                                    <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline-block">
                                        {step.label}
                                    </span>
                                </div>

                                {i < STEPS.length - 1 && (
                                    <ChevronRight size={14} className="text-stone-800 ml-2 md:ml-4" />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Progress or Reset Action */}
                <div className="flex items-center gap-4">
                    {phase === 'training' && (
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-amber-500">
                                {Math.round(progress)}%
                            </span>
                            <div className="w-24 h-1.5 bg-stone-900 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-amber-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {phase === 'complete' && (
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                            <RotateCcw size={14} />
                            {i18n.resetRun}
                        </button>
                    )}
                </div>
            </div>

            {/* Global Progress Bar just under nav */}
            {phase === 'training' && (
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-amber-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            )}
        </motion.div>
    );
}
