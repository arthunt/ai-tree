"use client";

import { motion } from 'framer-motion';
import { Lightbulb, MousePointerClick, ArrowRight } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface DNAOrientationCardProps {
    onDismiss: () => void;
    examplePrompt: string;
    onUseExample: () => void;
}

export function DNAOrientationCard({ onDismiss, examplePrompt, onUseExample }: DNAOrientationCardProps) {
    const t = useTranslations('dna.orientation');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md mx-auto rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-purple/10 border border-white/10 p-6 flex flex-col items-center text-center backdrop-blur-md shadow-2xl"
        >
            <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal mb-4 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                <Lightbulb size={24} />
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
                {t('title')}
            </h2>

            <p className="text-sm text-white/70 mb-6 max-w-[280px] leading-relaxed">
                {t('instruction')}
            </p>

            {/* Example Prompt */}
            <button
                onClick={onUseExample}
                className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-brand-teal/20 hover:border-brand-teal/40 transition-all group text-left relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-brand-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-1 relative z-10">
                    <span className="text-[10px] font-bold text-brand-teal uppercase tracking-wider">
                        {t('example')}
                    </span>
                    <motion.span
                        className="text-xs text-brand-teal flex items-center gap-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        {t('tapToTry')} <MousePointerClick size={12} />
                    </motion.span>
                </div>
                <p className="text-white/90 italic font-medium relative z-10 pr-8">
                    &ldquo;{examplePrompt}&rdquo;
                </p>

                <div className="absolute right-4 bottom-4 text-white/10 group-hover:text-white/30 transition-colors">
                    <ArrowRight size={16} />
                </div>
            </button>

            {/* Visual Flow Indicator */}
            <div className="mt-8 flex items-center gap-3 text-xs font-mono font-bold text-white/20">
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">T</div>
                <span className="opacity-50">→</span>
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">V</div>
                <span className="opacity-50">→</span>
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">A</div>
                <span className="opacity-50">→</span>
                <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">P</div>
            </div>
        </motion.div>
    );
}
