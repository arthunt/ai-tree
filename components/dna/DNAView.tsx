'use client';

import React from 'react';
import { motion } from 'framer-motion';
// import { useTranslations } from '@/lib/paraglide/runtime'; // TODO: Update import once Paraglide runtime is fully set up
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';
import { DNAFlowDiagram } from '@/components/dna/DNAFlowDiagram';
import { DNAComponentCard } from '@/components/dna/DNAComponentCard';

import { ConceptTranslation } from '@/lib/supabase';

interface DNAViewProps {
    content?: ConceptTranslation[];
}

export function DNAView({ content = [] }: DNAViewProps) {
    // const t = useTranslations(); // Placeholder for i18n

    // Map concept IDs to colors
    const colorMap: Record<string, string> = {
        tokenization: 'var(--dna-t)',
        embeddings: 'var(--dna-v)',
        attention: 'var(--dna-a)',
        prediction: 'var(--dna-p)'
    };

    return (
        <div className="relative min-h-screen w-full bg-void overflow-hidden text-white selection:bg-brand-teal selection:text-bg-void">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-teal/5 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/5 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">

                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 max-w-2xl"
                >
                    <div className="inline-flex items-center justify-center gap-3 mb-4">
                        <GlowingNode size={32} color="var(--brand-teal)" />
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-cyan">
                            Dendrix DNA
                        </h1>
                    </div>
                    <p className="text-lg text-gray-400 font-light">
                        Understanding the building blocks of Artificial Intelligence.
                    </p>
                </motion.header>

                {/* Main Content Area - Horizontal Scroll Snap Container (Future) */}
                <main className="w-full max-w-6xl">
                    <GlassCard className="w-full p-8 md:p-12 min-h-[400px] flex items-center justify-center border-white/5">
                        <div className="text-center">
                            <p className="text-gray-500 mb-6 font-mono text-sm">SYSTEM ARCHITECTURE</p>
                            <DNAFlowDiagram />
                        </div>
                    </GlassCard>

                    {/* Cards Section - Dynamic */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.map((item, index) => (
                            <DNAComponentCard
                                key={item.concept_id}
                                title={item.title}
                                description={item.explanation}
                                metaphor={item.metaphor}
                                color={colorMap[item.concept_id] || 'white'}
                                index={index}
                            />
                        ))}
                    </div>
                </main>

                {/* Footer Navigation */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-16 text-gray-600 text-sm"
                >
                    <p>Scroll to explore the mechanism</p>
                </motion.footer>

            </div>
        </div>
    );
}
