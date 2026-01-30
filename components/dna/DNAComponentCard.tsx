"use client";

import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';
import { useDNA, DNAStep } from './DNAContext';
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
    const { currentStep, tokens, vectors, predictions, attentionWeights } = useDNA();
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
                                key="tokens"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-wrap gap-2"
                            >
                                {tokens.map((t, i) => (
                                    <span key={i} className="px-2 py-1 bg-brand-teal/20 border border-brand-teal/50 rounded text-brand-teal font-mono text-sm">
                                        {t}
                                    </span>
                                ))}
                            </motion.div>
                        ) : isActive && index === 1 ? (
                            <motion.div
                                key="vectors"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-1 font-mono text-[10px] text-green-400 overflow-hidden"
                            >
                                {vectors.slice(0, 5).map((v, i) => (
                                    <div key={i}>[{v.map(n => n.toFixed(2)).join(', ')}]</div>
                                ))}
                            </motion.div>

                        ) : isActive && index === 2 ? (
                            <motion.div
                                key="attention"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative w-full h-32"
                            >
                                {/* Attention "Arc" Visualization */}
                                <div className="absolute inset-0 flex flex-wrap items-end content-end gap-2 pb-2">
                                    {tokens.map((t, i) => (
                                        <span key={i} className="relative z-10 px-1 text-xs bg-black/20 text-white/50 rounded">{t}</span>
                                    ))}
                                </div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                    {attentionWeights.map((w, i) => {
                                        // Simple logic: draw arc from approx token positions
                                        // Since we don't have refs to exact positions, we mock it with percentages
                                        const step = 100 / (tokens.length || 1);
                                        const x1 = (w.fromIndex * step) + (step / 2);
                                        const x2 = (w.toIndex * step) + (step / 2);
                                        const h = 20 + (Math.abs(x1 - x2)); // Arc height

                                        return (
                                            <motion.path
                                                key={i}
                                                d={`M ${x1}% 80% Q ${(x1 + x2) / 2}% ${80 - h}% ${x2}% 80%`}
                                                stroke="var(--dna-a)"
                                                strokeWidth={w.strength * 2}
                                                fill="none"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                animate={{ pathLength: 1, opacity: w.strength }}
                                                transition={{ duration: 1, delay: i * 0.2 }}
                                            />
                                        );
                                    })}
                                </svg>
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
                        className={`mt-6 inline-block text-xs font-bold tracking-wider transition-all border-b border-transparent hover:border-current ${isActive ? 'text-white' : 'text-brand-teal hover:text-brand-cyan'
                            } cursor-pointer bg-transparent`}
                        style={{ alignSelf: 'flex-start' }}
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
