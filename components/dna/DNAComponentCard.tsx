"use client";

import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';
import { useDNA, DNAStep } from './DNAContext';
import { motion, AnimatePresence } from 'framer-motion';

interface DNAComponentCardProps {
    title: string;
    description: string;
    metaphor: string;
    color: string;
    index: number;
}

export function DNAComponentCard({ title, description, metaphor, color, index }: DNAComponentCardProps) {
    const { currentStep, tokens, vectors } = useDNA();

    // Map index to step for activation logic
    const stepMap: Record<number, DNAStep> = {
        0: 'tokenization',
        1: 'vectorizing',
        2: 'attention',
        3: 'prediction'
    };

    const myStep = stepMap[index];
    const isActive = currentStep === myStep;

    return (
        <div className="flex flex-col h-full relative group">
            {/* Node Visualization */}
            <div className="h-48 relative flex items-center justify-center mb-[-1rem] z-10">
                <GlowingNode
                    color={color}
                    size={isActive ? "lg" : "md"}
                    pulseSpeed={isActive ? "fast" : "slow"}
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
                    <span className="text-xs font-mono uppercase tracking-widest opacity-60" style={{ color }}>
                        {metaphor}
                    </span>
                </div>

                <div className="relative min-h-[100px]">
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
                </div>
            </GlassCard>
        </div>
    );
}
