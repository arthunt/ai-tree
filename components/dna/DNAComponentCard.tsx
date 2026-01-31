"use client";

import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';
import { useDNA, DNAStep } from './DNAContext';
import { TokenizationSlicer } from './TokenizationSlicer';
import { VectorMap } from './VectorMap';
import { AttentionSpotlight } from './AttentionSpotlight';
import { PredictionBarChart } from './PredictionBarChart';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useState } from 'react';
import { SeedTransition } from './SeedTransition';
import { Check, ArrowRight } from 'lucide-react';

interface DNAComponentCardProps {
    title: string;
    description: string;
    metaphor?: string;
    color: string;
    index: number;
    onCardClick?: () => void;
}

const STEP_COMPLETE_MESSAGES: Record<DNAStep, string> = {
    tokenization: 'Text tokenized! Each piece has a unique ID.',
    vectorizing: 'Tokens vectorized! Similar words cluster together.',
    attention: 'Attention mapped! See which words connect.',
    prediction: 'Prediction complete! Check the top candidate.',
    idle: ''
};

const STEP_HINT_MESSAGES: Record<DNAStep, string> = {
    tokenization: '',
    vectorizing: '',
    attention: 'Tap a token to see its connections',
    prediction: '',
    idle: ''
};

export function DNAComponentCard({ title, description, metaphor, color, index, onCardClick }: DNAComponentCardProps) {
    const { currentStep, inputText, tokens, subTokens, vectors, predictions, attentionWeights, hasData, completedSteps } = useDNA();
    const params = useParams();
    const locale = params.locale as string;
    const t = useTranslations('dna.card');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const nodeMapping: Record<number, string> = {
        0: 'tokens',
        1: 'vectors',
        2: 'attention',
        3: 'temperature-sampling'
    };

    // Map index to step for activation logic
    const stepMap: Record<number, DNAStep> = {
        0: 'tokenization',
        1: 'vectorizing',
        2: 'attention',
        3: 'prediction'
    };

    const myStep = stepMap[index];
    const isActive = currentStep === myStep;
    const isCompleted = completedSteps.has(myStep);
    const deepDiveLabel = t('deepDive');

    return (
        <div
            className={`flex flex-col h-full relative group ${onCardClick ? 'cursor-pointer' : ''}`}
            onClick={(e) => {
                // Prevent click if clicking the button
                if ((e.target as HTMLElement).closest('button')) return;
                onCardClick?.();
            }}
        >
            {/* Node Visualization */}
            <div className="h-24 md:h-48 relative flex items-center justify-center mb-[-1rem] z-10">
                <GlowingNode
                    color={color}
                    size={isActive ? 60 : 40}
                />
                {isActive && (
                    <div className={`absolute inset-0 bg-${color}/20 blur-3xl rounded-full animate-pulse`}></div>
                )}
            </div>

            {/* Card Content */}
            <GlassCard
                className={`relative flex-1 p-5 md:p-6 pt-8 md:pt-10 transition-all duration-500 ${
                    isActive
                        ? 'border-2 border-brand-teal/60 ring-2 ring-brand-teal/30 bg-brand-teal/5'
                        : isCompleted
                            ? 'border-green-500/30 bg-green-500/5'
                            : 'border-white/10'
                }`}
                intensity={isActive ? "high" : "low"}
            >
                {/* Completion Badge */}
                <AnimatePresence>
                    {isCompleted && !isActive && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-500/20 border-2 border-green-500/60 flex items-center justify-center z-20"
                        >
                            <Check size={14} className="text-green-400" strokeWidth={3} />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{ textShadow: isActive ? `0 0 20px ${color}` : 'none' }}>
                        {title}
                    </h3>
                    {metaphor && (
                        <span className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-60" style={{ color }}>
                            {metaphor}
                        </span>
                    )}
                </div>

                <div className="relative min-h-[100px] flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                        {isActive && index === 0 ? (
                            <motion.div
                                key="tokens-slicer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <TokenizationSlicer
                                    text={inputText}
                                    tokens={subTokens}
                                    isActive={isActive}
                                />
                            </motion.div>
                        ) : isActive && index === 1 ? (
                            <motion.div
                                key="vector-map"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <VectorMap
                                    tokens={tokens}
                                    vectors={vectors}
                                    isActive={isActive}
                                />
                            </motion.div>
                        ) : isActive && index === 2 ? (
                            <motion.div
                                key="attention-spotlight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <AttentionSpotlight
                                    tokens={tokens}
                                    weights={attentionWeights}
                                    isActive={isActive}
                                />
                            </motion.div>
                        ) : isActive && index === 3 ? (
                            <motion.div
                                key="prediction-chart"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full"
                            >
                                <PredictionBarChart
                                    predictions={predictions}
                                    isActive={isActive}
                                />
                            </motion.div>
                        ) : (
                            <motion.p
                                key="static"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-300 leading-relaxed text-sm md:text-base"
                            >
                                {description}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Step Complete Message (shown on card when step finishes) */}
                    <AnimatePresence>
                        {isCompleted && !isActive && STEP_COMPLETE_MESSAGES[myStep] && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20"
                            >
                                <p className="text-xs font-mono text-green-400/90">
                                    {STEP_COMPLETE_MESSAGES[myStep]}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tap Hint (e.g. "Tap a token to see connections" for Attention step) */}
                    {isActive && STEP_HINT_MESSAGES[myStep] && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="mt-3 text-center text-[11px] font-mono text-brand-teal/50 uppercase tracking-wider"
                        >
                            {STEP_HINT_MESSAGES[myStep]}
                        </motion.p>
                    )}

                    {/* Deep Dive Button - 48px minimum touch target */}
                    <button
                        onClick={() => setIsTransitioning(true)}
                        className={`mt-4 inline-flex items-center gap-1.5 min-h-[48px] px-3 py-2 text-xs font-bold tracking-wider transition-all border-b border-transparent hover:border-current ${isActive ? 'text-white' : 'text-brand-teal hover:text-brand-cyan'
                            } cursor-pointer bg-transparent -ml-3`}
                    >
                        <ArrowRight size={14} />
                        {deepDiveLabel}
                    </button>
                </div>
            </GlassCard>

            {/* Seed Transition Overlay */}
            {isTransitioning && (
                <SeedTransition
                    color={color}
                    conceptId={nodeMapping[index]}
                    locale={locale}
                    onComplete={() => setIsTransitioning(false)}
                />
            )}
        </div>
    );
}
