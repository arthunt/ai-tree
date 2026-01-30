"use client";

import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';
import { useDNA, DNAStep } from './DNAContext';
import { TokenizationSlicer } from './TokenizationSlicer';
import { VectorMap } from './VectorMap';
import { AttentionSpotlight } from './AttentionSpotlight';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useState } from 'react';
import { SeedTransition } from './SeedTransition';

interface DNAComponentCardProps {
    title: string;
    description: string;
    metaphor?: string;
    color: string;
    index: number;
    onCardClick?: () => void;
}

export function DNAComponentCard({ title, description, metaphor, color, index, onCardClick }: DNAComponentCardProps) {
    const { currentStep, inputText, tokens, subTokens, vectors, predictions, attentionWeights } = useDNA();
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
            <div className="h-48 relative flex items-center justify-center mb-[-1rem] z-10">
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
                className={`relative flex-1 p-6 pt-10 transition-all duration-500 ${isActive ? 'border-brand-teal/50 ring-1 ring-brand-teal/50 bg-brand-teal/5' : ''}`}
                intensity={isActive ? "high" : "low"}
            >
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ textShadow: isActive ? `0 0 20px ${color}` : 'none' }}>
                        {title}
                    </h3>
                    {metaphor && (
                        <span className="text-xs font-mono uppercase tracking-widest opacity-60" style={{ color }}>
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
                                key="predictions"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-2 w-full"
                            >
                                {predictions.map((p, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs">
                                        <span className="w-12 text-right font-mono text-brand-cyan shrink-0 truncate">
                                            {p.token}
                                        </span>
                                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${p.probability * 100}%` }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                                className="h-full bg-brand-cyan"
                                            />
                                        </div>
                                        <span className="w-8 text-right text-gray-400 font-mono">
                                            {(p.probability * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.p
                                key="static"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-300 leading-relaxed text-sm"
                            >
                                {description}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    {/* Deep Dive Button (Triggers Seed Transition) */}
                    <button
                        onClick={() => setIsTransitioning(true)}
                        className={`mt-6 inline-flex items-center min-h-[44px] px-3 py-2 text-xs font-bold tracking-wider transition-all border-b border-transparent hover:border-current ${isActive ? 'text-white' : 'text-brand-teal hover:text-brand-cyan'
                            } cursor-pointer bg-transparent -ml-3`}
                    >
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
