"use client";

import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { DNAProvider, useDNA, DNAStep } from './DNAContext';
import { DNAFixedHeader } from './DNAFixedHeader';
import { DNAVerticalStack } from './DNAVerticalStack';
import { MicroLesson } from './MicroLesson';
import { DNADeepDiveSheet } from './DNADeepDiveSheet';
import type { Concept } from '@/lib/concepts/types';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { GlobalNav } from '@/components/GlobalNav';
import { StageSelector } from '@/components/StageSelector';

interface DNAViewProps {
    content?: Concept[];
}

export function DNAView({ content = [] }: DNAViewProps) {
    return (
        <DNAProvider>
            <DNAInterface />
        </DNAProvider>
    );
}

function DNAInterface() {
    const t = useTranslations('dna');
    const { setPlaybackSpeed, isComplete, deepDiveStep, closeDeepDive } = useDNA();
    const stackRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;

    // Scroll to a specific card step
    const handleScrollToCard = useCallback((step: DNAStep) => {
        // The DNAVerticalStack handles internal scrolling
        // This is kept for potential header click integration
    }, []);

    return (
        <>
            <GlobalNav transparent />
            <MicroLesson />

            {/* Deep Dive Bottom Sheet */}
            {deepDiveStep && (
                <DNADeepDiveSheet
                    step={deepDiveStep}
                    isOpen={!!deepDiveStep}
                    onClose={closeDeepDive}
                    onNavigateToSeed={() => router.push(`/${locale}/seed`)}
                />
            )}

            <div
                className="relative min-h-screen min-h-screen-dynamic w-full bg-void overflow-x-hidden text-white selection:bg-brand-teal selection:text-bg-void"
                // THE LENS EFFECT: Slow down time when user is exploring
                onMouseEnter={() => setPlaybackSpeed(0.1)}
                onMouseLeave={() => setPlaybackSpeed(0.5)}
            >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[120px] rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </div>

                {/* Fixed Header with Input + Step Nav */}
                <DNAFixedHeader onScrollToCard={handleScrollToCard} />

                {/* Main Content Area */}
                <div ref={stackRef} className="relative z-10 pt-4 px-4">
                    {/* Vertical Accordion Stack - Self-contained with all cards */}
                    <DNAVerticalStack />

                    {/* Progression Hint: Grows into Seed */}
                    {!isComplete && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.7 }}
                            className="mt-16 mb-8 flex flex-col items-center justify-center gap-4 text-brand-teal/50"
                        >
                            <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-teal/50" />
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                                <span className="text-4xl">🌱</span>
                                <span className="text-xs font-mono uppercase tracking-widest">{t('seed.growing')}</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            <StageSelector />
        </>
    );
}
