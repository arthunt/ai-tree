"use client";

import { motion } from 'framer-motion';
import { FruitsCard } from './FruitsCard';

import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import type { Concept } from '@/lib/concepts';
import { Brain, Code, Image as ImageIcon, MessageSquare } from 'lucide-react';

/** Map icon name from DB to React component */
const ICON_MAP: Record<string, React.ReactNode> = {
    MessageSquare: <MessageSquare size={20} />,
    Brain: <Brain size={20} />,
    Code: <Code size={20} />,
    Image: <ImageIcon size={20} />,
};

interface FruitsViewProps {
    concepts: Concept[];
    relatedConcepts?: Concept[];
    locale: string;
}

export function FruitsView({ concepts, relatedConcepts = [], locale }: FruitsViewProps) {
    const t = useTranslations();

    return (
        <div className="min-h-screen relative pb-32 overflow-hidden bg-gradient-to-b from-amber-50 via-white to-stone-50">
            {/* Background Effects (Sunny/Noon Theme) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-300/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-300/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-orange-100 border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
                        {t('fruits.phaseLabel')}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
                        {t('fruits.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        {t('fruits.subtitle')}
                    </p>
                </motion.div>
            </header>

            {/* Application Grid */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {concepts.map((concept, index) => (
                        <motion.div
                            key={concept.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <FruitsCard
                                title={concept.title}
                                conceptId={concept.id}
                                description={concept.explanation}
                                category={concept.subtitle ?? concept.category}
                                index={index}
                                icon={concept.icon ? ICON_MAP[concept.icon] : undefined}
                                metaphor={concept.metaphor}
                                deepDive={concept.deep_dive}
                                question={concept.question}
                                hint={concept.hint}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Related Concepts from Other Stages */}
            {relatedConcepts.length > 0 && (
                <div className="relative z-10 mt-16 mx-4 md:mx-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 p-8 max-w-7xl lg:mx-auto">
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
