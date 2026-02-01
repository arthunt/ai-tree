"use client";

import { motion } from 'framer-motion';
import { OrchardCard } from './OrchardCard';

import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

import { RelatedConceptsPanel } from '@/components/concept/RelatedConceptsPanel';
import type { Concept } from '@/lib/concepts';
import { Briefcase, Code, LineChart, Cpu, ShieldCheck, Palette } from 'lucide-react';

/** Map icon name from DB to React component */
const ICON_MAP: Record<string, React.ReactNode> = {
    Code: <Code size={20} />,
    Palette: <Palette size={20} />,
    LineChart: <LineChart size={20} />,
    ShieldCheck: <ShieldCheck size={20} />,
    Cpu: <Cpu size={20} />,
};

interface OrchardViewProps {
    concepts: Concept[];
    relatedConcepts?: Concept[];
    locale: string;
}

export function OrchardView({ concepts, relatedConcepts = [], locale }: OrchardViewProps) {
    const t = useTranslations();

    return (
        <div className="min-h-screen relative pb-32 overflow-hidden bg-gradient-to-b from-orange-50 via-rose-50 to-stone-100">
            {/* Background Effects (Sunset Theme) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />

            {/* The Sun / Golden Hour Light Source */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-orange-400/20 to-rose-400/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-bold tracking-widest uppercase mb-4">
                        {t('orchard.phaseLabel')}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
                        {t('orchard.title')}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        {t('orchard.subtitle')}
                    </p>
                </motion.div>
            </header>

            {/* Career Grid */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {concepts.map((career, index) => (
                        <motion.div
                            key={career.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <OrchardCard
                                title={career.title}
                                description={career.explanation}
                                role={career.subtitle ?? career.category}
                                salary={career.hint ?? undefined}
                                index={index}
                                icon={career.icon ? ICON_MAP[career.icon] : undefined}
                                metaphor={career.metaphor}
                                deepDive={career.deep_dive}
                                question={career.question}
                            />
                        </motion.div>
                    ))}

                    {/* "Your Role" Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center min-h-[280px] p-6 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30"
                    >
                        <div className="text-center">
                            <Briefcase className="w-12 h-12 text-rose-300 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-rose-800/60">{t('orchard.yourPath')}</h3>
                            <p className="text-sm text-rose-700/50 mt-1">{t('orchard.growingField')}</p>
                        </div>
                    </motion.div>
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
