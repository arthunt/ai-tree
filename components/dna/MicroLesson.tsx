"use client";

import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useDNA } from './DNAContext';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function MicroLesson() {
    const { activeLesson, closeLesson, togglePause } = useDNA();
    const t = useTranslations('dna.microLesson');

    if (!activeLesson || activeLesson === 'idle') return null;

    const title = t(`${activeLesson}.title`);
    const body = t(`${activeLesson}.body`);
    const metaphor = t(`${activeLesson}.metaphor`);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLesson}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-zinc-900 border border-white/10 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="h-32 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 relative overflow-hidden flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white relative z-10">{title}</h2>
                    <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[200%] bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
                </div>

                <div className="p-8">
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        {body}
                    </p>

                    <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-8">
                        <p className="text-sm text-brand-teal font-mono uppercase tracking-widest mb-2">{t('metaphorLabel')}</p>
                        <p className="text-gray-400 italic">&quot;{metaphor}&quot;</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => {
                                closeLesson();
                                togglePause();
                            }}
                            className="flex-1 py-3 min-h-[48px] bg-white text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <Play size={18} fill="currentColor" />
                            {t('resumeFlow')}
                        </button>
                        <button
                            onClick={closeLesson}
                            className="flex-1 py-3 min-h-[48px] bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                        >
                            {t('exploreMore')}
                        </button>
                    </div>
                </div>

                <button
                    onClick={closeLesson}
                    className="absolute top-4 right-4 p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white/50 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </motion.div>
        </div>
    );
}
