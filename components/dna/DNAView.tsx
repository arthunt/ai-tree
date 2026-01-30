"use client";

import { motion } from 'framer-motion';
import { DNAComponentCard } from '@/components/dna/DNAComponentCard';
import { DNAFlowDiagram } from '@/components/dna/DNAFlowDiagram';
import { DNAProvider, useDNA, DNAStep } from './DNAContext';
import { DNAInput } from './DNAInput';
import { MicroLesson } from './MicroLesson';
import { ConceptTranslation } from '@/lib/supabase';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { GlobalNav } from '@/components/GlobalNav';

interface DNAViewProps {
    content?: ConceptTranslation[];
}

interface DNAInterfaceProps {
    content: ConceptTranslation[];
}

export function DNAView({ content = [] }: DNAViewProps) {
    return (
        <DNAProvider>
            <DNAInterface content={content} />
        </DNAProvider>
    );
}

function DNAInterface({ content }: DNAInterfaceProps) {
    const t = useTranslations('dna');
    const { setPlaybackSpeed, openLesson, togglePause, isPaused } = useDNA();

    // Map concept IDs to colors
    const colorMap: Record<string, string> = {
        tokenization: 'var(--dna-t)',
        embeddings: 'var(--dna-v)',
        attention: 'var(--dna-a)',
        prediction: 'var(--dna-p)'
    };

    const stepMap: Record<number, DNAStep> = {
        0: 'tokenization',
        1: 'vectorizing',
        2: 'attention',
        3: 'prediction'
    };

    return (
        <>
            <GlobalNav transparent />
            <MicroLesson />

            <div
                className="relative min-h-screen min-h-screen-dynamic w-full bg-void overflow-hidden text-white selection:bg-brand-teal selection:text-bg-void"
                // THE LENS EFFECT: Slow down time when user is exploring
                onMouseEnter={() => setPlaybackSpeed(0.1)}
                onMouseLeave={() => setPlaybackSpeed(0.5)}
            >
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[120px] rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
                </div>

                {/* Control Hint Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                >
                    <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 text-white/50 text-xs uppercase tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                        {t('controlHint')}
                    </div>
                </motion.div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen min-h-screen-dynamic p-4 sm:p-8">

                    {/* Header Section */}
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 relative z-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-white to-brand-cyan drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                            {t('header.title')}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            {t('header.subtitle')}
                        </p>
                    </motion.header>

                    {/* INTERACTIVE INPUT */}
                    <div className="relative z-30" onMouseEnter={() => {
                        // Explicitly pause when typing
                        if (!isPaused) togglePause();
                    }}>
                        <DNAInput />
                    </div>

                    {/* Main Flow Visualization */}
                    <div className="relative w-full max-w-7xl mt-12">
                        {/* Connecting Flow Lines (SVG) (Hidden on mobile for now as cards stack) */}
                        <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
                            <DNAFlowDiagram />
                        </div>

                        {/* Cards Grid */}
                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            {content.map((item, index) => (
                                <DNAComponentCard
                                    key={item.concept_id}
                                    title={item.title}
                                    description={item.explanation}
                                    metaphor={item.metaphor}
                                    color={colorMap[item.concept_id] || 'white'}
                                    index={index}
                                    onCardClick={() => openLesson(stepMap[index])}
                                />
                            ))}
                        </div>

                        {/* Progression Hint: Sprouts into Seed */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.7 }}
                            className="mt-24 flex flex-col items-center justify-center gap-4 text-brand-teal/50"
                        >
                            <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-teal/50" />
                            <div className="flex flex-col items-center gap-2 animate-pulse">
                                <span className="text-4xl">🌱</span>
                                <span className="text-xs font-mono uppercase tracking-widest">{t('seed.growing')}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
