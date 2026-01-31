"use client";

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlowingNode } from '@/components/ui/GlowingNode';

export type CardVariant = 'dna' | 'sprout' | 'tree';

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
    tree: {
        activeBorder: 'border-emerald-500/60',
        activeBg: 'bg-white/40',
        completedBorder: 'border-emerald-600/30',
        completedBg: 'bg-emerald-100/20',
        defaultBorder: 'border-stone-200/50',
        defaultBg: 'bg-white/30', // Very light, paper-like
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
    const cardColor = color || (variant === 'dna' ? '#00FFFF' : (variant === 'sprout' ? '#A78BFA' : '#10B981')); // Default fallbacks

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
                            className="text-xl md:text-2xl font-bold text-white mb-1 transition-all"
                            style={{ textShadow: isActive ? `0 0 15px ${cardColor}40` : 'none' }}
                        >
                            {title}
                        </h3>
                        <span className="text-xs font-mono text-white/30 pt-1">#{String(index + 1).padStart(2, '0')}</span>
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
