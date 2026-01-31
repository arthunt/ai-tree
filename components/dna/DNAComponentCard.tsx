"use client";

import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
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

interface DNAComponentCardProps {
    title: string;
    description: string;
    metaphor?: string;
    color: string;
    index: number;
    onCardClick?: () => void;
}

export function DNAComponentCard({ title, description, metaphor, color, index, onCardClick }: DNAComponentCardProps) {
    const { currentStep, inputText, tokens, subTokens, vectors, predictions, attentionWeights, hasData, completedSteps } = useDNA();
    const params = useParams();
    const locale = params.locale as string;
    const t = useTranslations('dna.card');
    const tSteps = useTranslations('dna.steps');

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
        <div className="h-full relative">
            <UnifiedConceptCard
                variant="dna"
                title={title}
                index={index}
                isActive={isActive}
                isCompleted={isCompleted}
                color={color}
                onCardClick={onCardClick}
                onDeepDive={() => setIsTransitioning(true)}
                deepDiveLabel={deepDiveLabel}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* Metaphor (DNA Specific Header info) */}
                    {metaphor && (
                        <div className="mb-4 -mt-2">
                            <span className="text-xs md:text-sm font-mono uppercase tracking-widest opacity-60" style={{ color }}>
                                {metaphor}
                            </span>
                        </div>
                    )}

                    {/* Simulation Area or Static Description */}
                    <div className="flex-1 min-h-[160px]">
                        <AnimatePresence mode="wait">
                            {isActive && index === 0 ? (
                                <motion.div key="tokens-slicer" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <TokenizationSlicer text={inputText} tokens={subTokens} isActive={isActive} />
                                </motion.div>
                            ) : isActive && index === 1 ? (
                                <motion.div key="vector-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <VectorMap tokens={tokens} vectors={vectors} isActive={isActive} />
                                </motion.div>
                            ) : isActive && index === 2 ? (
                                <motion.div key="attention-spotlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <AttentionSpotlight tokens={tokens} weights={attentionWeights} isActive={isActive} />
                                </motion.div>
                            ) : isActive && index === 3 ? (
                                <motion.div key="prediction-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
                                    <PredictionBarChart predictions={predictions} isActive={isActive} />
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
                    </div>

                    {/* Hints & Completion Messages */}
                    <div>
                        {/* Step Complete Message */}
                        <AnimatePresence>
                            {isCompleted && !isActive && myStep !== 'idle' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20"
                                >
                                    <p className="text-xs font-mono text-green-400/90">
                                        {tSteps(`complete.${myStep}`)}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tap Hint */}
                        {isActive && myStep === 'attention' && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="mt-3 text-center text-[11px] font-mono text-brand-teal/50 uppercase tracking-wider"
                            >
                                {tSteps('hint.attention')}
                            </motion.p>
                        )}
                    </div>
                </div>
            </UnifiedConceptCard>

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
