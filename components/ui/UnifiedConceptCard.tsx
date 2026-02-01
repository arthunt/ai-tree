"use client";

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingNode } from '@/components/ui/GlowingNode';

export type CardVariant = 'dna' | 'seed' | 'sprout' | 'sapling' | 'tree' | 'fruits' | 'orchard';

interface UnifiedConceptCardProps {
    variant: CardVariant;
    title: string;
    index: number;
    description?: string;
    isActive?: boolean;
    isCompleted?: boolean;
    color?: string; // Override color (mostly for DNA nodes)
    children?: ReactNode; // Main content (simulations, body text)
    visualSlot?: ReactNode; // Optional top slot (like GlowingNode)
    onCardClick?: () => void;
    onDeepDive?: () => void;
    deepDiveLabel?: string;
    className?: string;
}

const VARIANT_STYLES: Record<CardVariant, {
    activeBorder: string;
    activeBg: string;
    completedBorder: string;
    completedBg: string;
    defaultBorder: string;
    defaultBg: string;
    nodeSizeActive: number;
    nodeSizeDefault: number;
}> = {
    dna: {
        // DNA uses per-step colors via inline style override (see §8 DESIGN_SYSTEM_RULES)
        activeBorder: 'border-2 ring-2',
        activeBg: '',
        completedBorder: 'border-green-500/30',
        completedBg: 'bg-green-500/5',
        defaultBorder: 'border-white/10',
        defaultBg: 'bg-black/20', // Classic dark DNA feel
        nodeSizeActive: 48,
        nodeSizeDefault: 32
    },
    seed: {
        // Deep Earth: Amber/Stone themes
        activeBorder: 'border-amber-500/60 ring-2 ring-amber-500/20',
        activeBg: 'bg-stone-800/80',
        completedBorder: 'border-amber-600/40',
        completedBg: 'bg-amber-900/20',
        defaultBorder: 'border-stone-700/50',
        defaultBg: 'bg-stone-900/60',
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    },
    sprout: {
        activeBorder: 'border-white/40 ring-2 ring-white/20',
        activeBg: 'bg-white/10',
        completedBorder: 'border-indigo-400/30',
        completedBg: 'bg-indigo-500/10',
        defaultBorder: 'border-white/10',
        defaultBg: 'bg-white/5', // Lighter transitional feel
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    },
    sapling: {
        // Morning Green: Emerald/Teal themes - The Nursery
        activeBorder: 'border-emerald-400/50 ring-2 ring-emerald-400/20',
        activeBg: 'bg-emerald-900/60', // Slightly richer background
        completedBorder: 'border-emerald-500/40',
        completedBg: 'bg-emerald-900/30',
        defaultBorder: 'border-emerald-800/40',
        defaultBg: 'bg-emerald-950/40',
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    },
    tree: {
        // Daylight: Knowledge Architecture - Distinctly lighter
        activeBorder: 'border-sky-400/60 ring-2 ring-sky-400/20',
        activeBg: 'bg-slate-800/90',
        completedBorder: 'border-sky-500/40',
        completedBg: 'bg-sky-900/20',
        defaultBorder: 'border-slate-600/50',
        defaultBg: 'bg-slate-800/60',
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    },
    fruits: {
        // Warm Daylight: Applications - Amber/Orange accents on light base
        activeBorder: 'border-orange-400/60 ring-2 ring-orange-400/20',
        activeBg: 'bg-orange-950/40',
        completedBorder: 'border-orange-500/40',
        completedBg: 'bg-orange-900/20',
        defaultBorder: 'border-orange-200/40',
        defaultBg: 'bg-white/80',
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    },
    orchard: {
        // Golden Hour: Careers - Rose/Sunset accents on warm base
        activeBorder: 'border-rose-400/60 ring-2 ring-rose-400/20',
        activeBg: 'bg-rose-950/40',
        completedBorder: 'border-rose-500/40',
        completedBg: 'bg-rose-900/20',
        defaultBorder: 'border-rose-200/40',
        defaultBg: 'bg-white/80',
        nodeSizeActive: 50,
        nodeSizeDefault: 30
    }
};

export function UnifiedConceptCard({
    variant,
    title,
    index,
    description,
    isActive = false,
    isCompleted = false,
    color,
    children,
    visualSlot,
    onCardClick,
    onDeepDive,
    deepDiveLabel = "Explore",
    className
}: UnifiedConceptCardProps) {

    const styles = VARIANT_STYLES[variant];
    const cardColor = color || (
        variant === 'dna' ? '#00FFFF' :
            variant === 'seed' ? '#F59E0B' :     // Amber
                variant === 'sprout' ? '#A78BFA' :    // Indigo/Purple
                    variant === 'sapling' ? '#10B981' :   // Emerald
                        variant === 'fruits' ? '#F97316' :    // Orange
                            variant === 'orchard' ? '#F43F5E' :   // Rose
                                '#38BDF8' // Tree (Sky Blue for Daylight)
    );

    return (
        <div
            className={cn("flex flex-col h-full relative group transition-all duration-300", className, { 'cursor-pointer': !!onCardClick })}
            onClick={(e) => {
                // Prevent click if clicking internal buttons
                if ((e.target as HTMLElement).closest('button')) return;
                onCardClick?.();
            }}
        >
            {/* Visual Header Slot (Glowing Node or Number) */}
            <div className="h-12 md:h-14 relative flex items-center justify-center mb-[-0.75rem] z-10 pointer-events-none">
                {visualSlot ? visualSlot : (
                    <>
                        <GlowingNode
                            color={cardColor}
                            size={isActive ? styles.nodeSizeActive : styles.nodeSizeDefault}
                        />
                        {isActive && (
                            <div className={cn("absolute inset-0 blur-3xl rounded-full animate-pulse", `bg-[${cardColor}]/20`)} style={{ backgroundColor: `${cardColor}20` }}></div>
                        )}
                    </>
                )}
            </div>

            {/* Main Card Shell */}
            <GlassCard
                className={cn(
                    "relative flex-1 p-5 md:p-6 pt-8 md:pt-10 transition-all duration-500 flex flex-col",
                    isActive ? styles.activeBorder : (isCompleted ? styles.completedBorder : styles.defaultBorder),
                    isActive ? styles.activeBg : (isCompleted ? styles.completedBg : styles.defaultBg)
                )}
                intensity={isActive ? "high" : "medium"}
                style={isActive && variant === 'dna' && color ? {
                    borderColor: `${color}99`,
                    boxShadow: `0 0 16px ${color}4D`,
                    backgroundColor: `${color}0D`,
                } : undefined}
            >
                {/* Completion Badge */}
                <AnimatePresence>
                    {isCompleted && !isActive && (
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0 }}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-green-500/20 border-2 border-green-500/60 flex items-center justify-center z-20"
                        >
                            <Check size={14} className="text-green-400" strokeWidth={3} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Title Section */}
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <h3
                            className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 transition-all leading-tight"
                            style={{ textShadow: isActive ? `0 0 15px ${cardColor}40` : 'none' }}
                        >
                            {title}
                        </h3>
                        <span className="text-[10px] md:text-xs font-mono text-white/30 pt-1 shrink-0">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                </div>

                {/* Children / Content Area */}
                <div className="flex-1 relative min-h-[100px] flex flex-col justify-between">
                    {children ? children : (
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {description}
                        </p>
                    )}

                    {/* Deep Dive Action */}
                    {onDeepDive && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDeepDive();
                            }}
                            className={cn(
                                "mt-4 inline-flex items-center gap-1.5 min-h-[48px] px-0 py-2 text-xs font-bold tracking-wider transition-all bg-transparent -ml-1",
                                isActive ? "text-white" : "text-brand-teal/80 hover:text-brand-cyan"
                            )}
                            style={{ color: isActive ? 'white' : cardColor }}
                        >
                            <ArrowRight size={14} />
                            {deepDiveLabel}
                        </button>
                    )}
                </div>
            </GlassCard>
        </div>
    );
}
