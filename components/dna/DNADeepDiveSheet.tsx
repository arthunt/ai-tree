"use client";

import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import { X, Play, ArrowRight, Lightbulb } from 'lucide-react';
import { DNAStep } from './DNAContext';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useEffect, useState } from 'react';

interface DNADeepDiveSheetProps {
    step: DNAStep;
    isOpen: boolean;
    onClose: () => void;
    onNavigateToSeed: () => void;
}

export function DNADeepDiveSheet({ step, isOpen, onClose, onNavigateToSeed }: DNADeepDiveSheetProps) {
    const t = useTranslations('dna.microLesson'); // Reuse existing keys
    const tCommon = useTranslations('common');
    const controls = useAnimation();
    const [isDragging, setIsDragging] = useState(false);

    // Snap points (percentage of screen height)
    const SNAP_TOP = 0; // Full screen-ish
    const SNAP_CLOSE = 1000; // Off screen

    useEffect(() => {
        if (isOpen) {
            controls.start({ y: 0 });
        } else {
            controls.start({ y: '100%' });
        }
    }, [isOpen, controls]);

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        const velocity = info.velocity.y;
        const offset = info.offset.y;

        // If dragged down significantly or fast
        if (offset > 150 || velocity > 200) {
            onClose();
        } else {
            // Snap back up
            controls.start({ y: 0 });
        }
    };

    if (!isOpen && !isDragging) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sheet */}
                    <motion.div
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={handleDragEnd}
                        initial={{ y: '100%' }}
                        animate={controls}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F0F16] border-t border-white/10 rounded-t-3xl shadow-2xl h-[85vh] flex flex-col"
                    >
                        {/* Drag Handle */}
                        <div className="w-full h-12 flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing">
                            <div className="w-12 h-1.5 rounded-full bg-white/20" />
                        </div>

                        {/* Content Scroll Area */}
                        <div className="flex-1 overflow-y-auto px-6 pb-12">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                    {t(`${step}.title`)}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body Text */}
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300 mb-8">
                                <p>
                                    {t(`${step}.body`)}
                                </p>
                            </div>

                            {/* Metaphor Card */}
                            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6 mb-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Lightbulb size={100} />
                                </div>
                                <div className="flex gap-4 relative z-10">
                                    <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                                        <Lightbulb size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider mb-2">
                                            {tCommon('metaphor')}
                                        </h3>
                                        <p className="text-lg italic text-white/90 leading-relaxed">
                                            &ldquo;{t(`${step}.metaphor`)}&rdquo;
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4 mt-auto">
                                <button
                                    onClick={onClose} // Resume just means close sheet
                                    className="h-14 rounded-xl font-semibold flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 transition-colors"
                                >
                                    <Play size={18} fill="currentColor" />
                                    {t('resume')}
                                </button>
                                <button
                                    onClick={onNavigateToSeed}
                                    className="h-14 rounded-xl font-semibold flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                                >
                                    {t('exploreSeed')}
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
