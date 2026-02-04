"use client";

import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { CheckCircle, RotateCcw, Sprout } from 'lucide-react';
import { useDNA } from './DNAContext';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export function CompletionCard() {
    const { jumpToStep, predictions } = useDNA();
    const t = useTranslations('dna');
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;

    // Confetti logic
    const [showConfetti, setShowConfetti] = useState(true);
    const { width, height } = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const winner = predictions.length > 0 ? predictions[0] : null;

    return (
        <div className="relative">
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-[100]">
                    <Confetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={200}
                        gravity={0.15}
                    />
                </div>
            )}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="mt-16 mx-auto max-w-lg"
            >
                <div className="relative bg-black/60 backdrop-blur-xl border border-brand-teal/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(45,212,191,0.1)]">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                        >
                            <CheckCircle size={48} className="text-brand-teal" />
                        </motion.div>
                    </div>

                    <h3 className="text-xl font-bold text-white text-center mb-2">
                        {t('completion.title')}
                    </h3>
                    <p className="text-sm text-gray-400 text-center mb-6">
                        {t('completion.subtitle')}
                    </p>

                    {/* Educational Explanation (Expert Review - Moved Up) */}
                    {winner && (
                        <div className="bg-brand-teal/10 rounded-xl p-4 mb-6 border border-brand-teal/20">
                            <div className="flex gap-2">
                                <span className="text-lg">💡</span>
                                <p className="text-sm text-brand-teal/90 leading-relaxed text-left">
                                    Mudel ennustas järgmise sõna, kasutades kõike, mida ta miljonitelt tekstidelt õppis.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Winner prediction summary */}
                    {winner && (
                        <div className="bg-white/5 rounded-xl p-4 mb-6 text-center">
                            <span className="text-xs text-brand-teal/60 font-mono uppercase tracking-widest">
                                {t('completion.predicted')}
                            </span>
                            <div className="mt-1 text-2xl font-bold text-brand-teal">
                                &ldquo;{winner.token}&rdquo;
                                <span className="text-sm text-brand-teal/60 ml-2">
                                    {Math.round(winner.probability * 100)}%
                                </span>
                            </div>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Korda Uuesti - Now Primary Green (Expert Review) */}
                        <button
                            onClick={() => jumpToStep('tokenization')}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-teal text-black hover:bg-brand-teal/90 transition-all text-sm font-bold min-h-[48px] shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                        >
                            <RotateCcw size={16} />
                            {t('completion.replay')}
                        </button>

                        {/* Explore - Secondary */}
                        <button
                            onClick={() => router.push(`/${locale}/seed`)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-white transition-all text-sm font-medium min-h-[48px]"
                        >
                            <Sprout size={16} />
                            {t('completion.explore')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
