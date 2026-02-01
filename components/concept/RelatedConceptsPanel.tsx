"use client";

import { GlassCard } from '@/components/ui/GlassCard';
import type { Concept, EvolutionStage } from '@/lib/concepts/types';
import { ArrowRight, Link as LinkIcon, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface RelatedConceptsPanelProps {
    concepts: Concept[];
    locale: string;
    className?: string;
    onConceptClick?: (id: string) => void;
}

const STAGE_THEMES: Record<EvolutionStage, { border: string; bg: string; text: string; icon: string }> = {
    dna: { border: 'border-cyan-500/30', bg: 'bg-cyan-950/30', text: 'text-cyan-400', icon: 'text-cyan-500' },
    seed: { border: 'border-amber-500/30', bg: 'bg-amber-950/30', text: 'text-amber-400', icon: 'text-amber-500' },
    sprout: { border: 'border-indigo-400/30', bg: 'bg-indigo-950/30', text: 'text-indigo-300', icon: 'text-indigo-400' },
    sapling: { border: 'border-emerald-500/30', bg: 'bg-emerald-950/30', text: 'text-emerald-400', icon: 'text-emerald-500' },
    tree: { border: 'border-sky-500/30', bg: 'bg-sky-950/30', text: 'text-sky-400', icon: 'text-sky-500' },
    fruits: { border: 'border-red-500/30', bg: 'bg-red-950/30', text: 'text-red-400', icon: 'text-red-500' },
    orchard: { border: 'border-yellow-500/30', bg: 'bg-yellow-950/30', text: 'text-yellow-400', icon: 'text-yellow-500' }
};

export function RelatedConceptsPanel({ concepts, locale, className, onConceptClick }: RelatedConceptsPanelProps) {
    if (!concepts || concepts.length === 0) return null;

    return (
        <div className={cn("w-full", className)}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Network size={18} className="text-white/60" />
                </div>
                <h3 className="text-lg font-bold text-white/80 uppercase tracking-widest text-sm">
                    {locale === 'et' ? 'Seotud Mõisted' : 'Related Concepts'}
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {concepts.map((concept) => {
                    const theme = STAGE_THEMES[concept.stage] || STAGE_THEMES.dna;

                    return (
                        <GlassCard
                            key={concept.id}
                            className={cn(
                                "p-4 cursor-pointer group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
                                theme.bg,
                                theme.border
                            )}
                            intensity="low"
                            onClick={() => onConceptClick?.(concept.id)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={cn("text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/20 border border-white/5", theme.text)}>
                                    {concept.stage}
                                </span>
                                <ArrowRight size={14} className={cn("opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300", theme.icon)} />
                            </div>

                            <h4 className="text-base font-bold text-white/90 leading-tight mb-2 group-hover:text-white transition-colors">
                                {concept.title}
                            </h4>

                            <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                                {concept.explanation}
                            </p>

                            <div className={cn(
                                "absolute -bottom-10 -right-10 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none",
                                theme.text.replace('text', 'bg')
                            )} />
                        </GlassCard>
                    );
                })}
            </div>
        </div>
    );
}
