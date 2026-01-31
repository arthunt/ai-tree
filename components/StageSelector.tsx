"use client";

import { motion } from 'framer-motion';
import { Dna, CircleDot, Sprout, TreeDeciduous, Cherry, LayoutGrid, Leaf } from 'lucide-react';
import { useJourney, EvolutionStage } from '@/lib/contexts/JourneyContext';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const STAGES: { id: EvolutionStage; label: string; icon: React.ElementType }[] = [
    { id: 'dna', label: 'DNA', icon: Dna },
    { id: 'seed', label: 'Seed', icon: CircleDot },
    { id: 'sprout', label: 'Sprout', icon: Sprout },
    { id: 'sapling', label: 'Sapling', icon: Leaf },
    { id: 'tree', label: 'Tree', icon: TreeDeciduous },
    { id: 'fruits', label: 'Fruits', icon: Cherry },
    { id: 'orchard', label: 'Orchard', icon: LayoutGrid },
];

export function StageSelector() {
    const { currentStage, setStage } = useJourney();
    const pathname = usePathname();
    // Only show on evolutionary pages
    const isEvolutionaryPage =
        pathname?.includes('/dna') ||
        pathname?.includes('/seed') ||
        pathname?.includes('/sprout') ||
        pathname?.includes('/sapling') ||
        pathname?.includes('/tree-view') ||
        pathname?.includes('/fruits') ||
        pathname?.includes('/orchard');

    if (!isEvolutionaryPage) return null;

    return (

        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pointer-events-auto max-w-[calc(100vw-32px)] overflow-x-auto scrollbar-hide flex items-center gap-1 p-1.5 bg-gray-900/90 backdrop-blur-md border border-white/10 rounded-full shadow-2xl ring-1 ring-white/5 text-white"
            >
                {STAGES.map((item) => {
                    const isActive = currentStage === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setStage(item.id)}
                            className={cn(
                                "relative px-4 py-3 md:py-2 rounded-full flex items-center gap-2 transition-all duration-300 group outline-none shrink-0",
                                isActive
                                    ? "bg-white/10 text-white shadow-inner"
                                    : "text-white/40 hover:text-white/80 hover:bg-white/5"
                            )}
                        >
                            {/* Active Indicator Dot */}
                            {isActive && (
                                <motion.div
                                    layoutId="stage-active-bg"
                                    className="absolute inset-0 bg-white/10 rounded-full border border-white/10"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            {/* Icon */}
                            <Icon size={20} className="relative z-10" />

                            {/* Label (Hidden on mobile unless active?) */}
                            <span className={cn(
                                "relative z-10 text-xs font-medium tracking-wide hidden sm:block",
                                isActive ? "opacity-100" : "opacity-0 w-0 overflow-hidden group-hover:w-auto group-hover:opacity-100 transition-all"
                            )}>
                                {item.label}
                            </span>

                            {/* Mobile Label (Active Only) */}
                            <span className={cn(
                                "relative z-10 text-xs font-medium tracking-wide sm:hidden",
                                isActive ? "scale-100 w-auto ml-1" : "scale-0 w-0 opacity-0 hidden"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
}
