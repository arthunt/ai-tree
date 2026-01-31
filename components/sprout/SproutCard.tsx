"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Lightbulb, Box } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';

interface SproutCardProps {
    title: string;
    description: string;
    analogy: string;
    index: number;
    visualType: string;
}

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
            className="h-full min-h-[280px]"
        >
            <UnifiedConceptCard
                variant="sprout"
                title={title}
                index={index}
                isActive={isExpanded}
                onCardClick={() => setIsExpanded(!isExpanded)}
                visualSlot={
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                        <span className="text-[8rem] font-bold text-white font-serif select-none">
                            &quot;{title.charAt(0).toUpperCase()}&quot;
                        </span>
                    </div>
                }
            >
                <div className="flex flex-col h-full">
                    {/* Header Icon (kept from original design) */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-2 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/5">
                            <Box className="w-5 h-5 text-indigo-300" />
                        </div>
                    </div>

                    {/* Analogy (Always Visible) */}
                    <div className="mb-4 p-3 rounded-lg bg-black/20 border border-white/5">
                        <div className="flex items-center gap-2 mb-1 text-xs text-brand-gold uppercase tracking-wider font-semibold">
                            <Lightbulb size={12} />
                            <span>{t('sprout.card.analogyLabel')}</span>
                        </div>
                        <p className="text-sm text-gray-300 italic">&quot;{analogy}&quot;</p>
                    </div>

                    {/* Expandable Description */}
                    <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        className="overflow-hidden"
                    >
                        <p className="text-sm text-gray-300 leading-relaxed pt-2 border-t border-white/10">
                            {description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-xs text-indigo-300 font-medium">
                            <BookOpen size={14} />
                            <span>{t('sprout.card.readFull')}</span>
                        </div>
                    </motion.div>

                    {/* Footer / Visual Type Hint */}
                    {!isExpanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center text-xs text-white/30"
                        >
                            <span>{visualType.replace('_', ' ')}</span>
                            <span className="group-hover:text-white transition-colors">{t('sprout.card.tapToLearn')} →</span>
                        </motion.div>
                    )}
                </div>
            </UnifiedConceptCard>
        </motion.div>
    );
}
