"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BookOpen, Lightbulb, Box } from 'lucide-react';

interface SproutCardProps {
    title: string;
    description: string;
    analogy: string;
    index: number;
    visualType: string;
}

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function SproutCard({ title, description, analogy, index, visualType }: SproutCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const t = useTranslations();

    // Stagger animation based on index
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            className={cn(
                "relative group cursor-pointer transition-all duration-300",
                "h-full min-h-[280px]",
                isExpanded ? "z-20 scale-105" : "z-10 hover:-translate-y-2"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Glass Background - Lighter/Transitional Theme */}
            <div className={cn(
                "absolute inset-0 rounded-3xl backdrop-blur-xl transition-all duration-300",
                "border border-white/10 shadow-lg",
                isExpanded
                    ? "bg-white/10 ring-1 ring-white/20 shadow-2xl"
                    : "bg-white/5 group-hover:bg-white/10"
            )} />

            {/* Content Container */}
            <div className="relative p-6 h-full flex flex-col">

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10rem] font-bold text-white/5 font-serif select-none dark:text-white/5">
                        &quot;{title.charAt(0).toUpperCase()}&quot;
                    </span>
                </div>
                {/* Header: Icon & Title */}
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-teal/20 to-brand-cyan/20 border border-white/5">
                        <Box className="w-6 h-6 text-brand-cyan" />
                    </div>
                    <span className="text-xs font-mono text-white/40">#{String(index + 1).padStart(2, '0')}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

                {/* Body Content */}
                <div className="flex-1">
                    {/* Analogy (Always Visible) */}
                    <div className="mb-4 p-3 rounded-lg bg-black/20 border border-white/5">
                        <div className="flex items-center gap-2 mb-1 text-xs text-brand-gold uppercase tracking-wider font-semibold">
                            <Lightbulb size={12} />
                            <span>{t('sprout.card.analogyLabel')}</span>
                        </div>
                        <p className="text-sm text-gray-300 italic">&quot;{analogy}&quot;</p>
                    </div>

                    {/* Description (Visible on Expand) */}
                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                            {description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-brand-teal font-medium">
                            <BookOpen size={14} />
                            <span>{t('sprout.card.readFull')}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Visual Type Indicator */}
                {!isExpanded && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/30">
                        <span>{visualType.replace('_', ' ')}</span>
                        <span className="group-hover:text-white transition-colors">{t('sprout.card.tapToLearn')} →</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
