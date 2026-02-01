"use client";

import { motion } from 'framer-motion';
import { SproutCard } from './SproutCard';
import { SproutHero } from './SproutHero';
import { useSproutContext } from './SproutContext';
import { useEffect } from 'react';

import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import type { Concept } from '@/lib/concepts';

interface SproutViewProps {
    concepts: Concept[];
    relatedConcepts?: Concept[];
    locale: string;
}

export function SproutView({ concepts, relatedConcepts = [], locale }: SproutViewProps) {
    const t = useTranslations();
    const { isComplete } = useSproutContext();

    // Haptic feedback and sound effect on completion
    useEffect(() => {
        if (isComplete) {
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                navigator.vibrate([100, 50, 100]); // Success pattern
            }
        }
    }, [isComplete]);

    return (
        <div className="min-h-screen relative pb-32 overflow-hidden transition-colors duration-[3000ms] ease-in-out">
            {/* Background Gradient (Dawn/Sunrise Transition) */}
            <div
                className={`absolute inset-0 -z-20 transition-opacity duration-[3000ms] ease-in-out ${isComplete
                    ? 'opacity-0'
                    : 'opacity-100'
                    } bg-gradient-to-br from-indigo-800 via-violet-800 to-sky-950`}
            />

            {/* Warm Sunrise Accent (Bottom-up) */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-rose-900/30 via-fuchsia-900/10 to-transparent -z-10 pointer-events-none" />

            {/* Dawn State layer (Appears on completion) */}
            <div
                className={`absolute inset-0 -z-20 transition-opacity duration-[3000ms] ease-in-out ${isComplete
                    ? 'opacity-100'
                    : 'opacity-0'
                    } bg-gradient-to-br from-violet-900 via-fuchsia-900/50 to-indigo-900`}
            />

            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-10" />

            {/* Header */}
            <header className="pt-24 pb-4 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className={`inline-block py-1 px-3 rounded-full border text-xs font-bold tracking-widest uppercase mb-4 transition-colors duration-1000 ${isComplete
                        ? 'bg-fuchsia-500/10 border-fuchsia-400/20 text-fuchsia-300'
                        : 'bg-indigo-500/10 border-indigo-400/20 text-indigo-300'
                        }`}>
                        {t('sprout.phaseLabel')}
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mb-4 sm:mb-6">
                        {t('sprout.title')}
                    </h1>
                    <p className="text-sm sm:text-lg text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
                        {t('sprout.subtitle')}
                    </p>
                </motion.div>
            </header>

            {/* Interactive Hero (Rooting System) */}
            <div className="container mx-auto px-4 mb-16 relative z-10">
                <SproutHero />
            </div>

            {/* Masonry Grid (Revealed after interaction potentially? No, always visible but context helps) */}
            <div className={`container mx-auto px-4 md:px-6 transition-all duration-1000 ${isComplete ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale-[0.5]'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {concepts.map((concept, index) => (
                        <SproutCard
                            key={concept.id}
                            index={index}
                            title={concept.title}
                            description={concept.explanation}
                            analogy={concept.metaphor}
                            visualType={concept.visual_type}
                        />
                    ))}
                </div>
            </div>

            {/* Related Concepts from Other Stages */}
            {relatedConcepts.length > 0 && (
                <div className="container mx-auto px-4 md:px-6 mt-16">
                    <RelatedConceptsPanel
                        concepts={relatedConcepts}
                        locale={locale}
                    />
                </div>
            )}

            {/* Floating Controls */}
            <StageSelector />
        </div>
    );
}
