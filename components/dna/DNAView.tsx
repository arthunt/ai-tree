"use client";

import { motion } from 'framer-motion';
import { DNAComponentCard } from '@/components/dna/DNAComponentCard';
import { DNAFlowDiagram } from '@/components/dna/DNAFlowDiagram';
import { DNAProvider } from './DNAContext';
import { DNAInput } from './DNAInput';
import { ConceptTranslation } from '@/lib/supabase';

interface DNAViewProps {
    content?: ConceptTranslation[];
}

export function DNAView({ content = [] }: DNAViewProps) {
    // Map concept IDs to colors
    const colorMap: Record<string, string> = {
        tokenization: 'var(--dna-t)',
        embeddings: 'var(--dna-v)',
        attention: 'var(--dna-a)',
        prediction: 'var(--dna-p)'
    };

    return (
        <DNAProvider>
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
                        className="text-center mb-16 relative z-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-white to-brand-cyan drop-shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                            The Mechanism
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                            Every AI thought follows the same <span className="text-white font-medium">4-step journey</span>.
                            <br className="hidden sm:block" />
                            From raw text to meaning, and back again.
                        </p>
                    </motion.header>

                    {/* INTERACTIVE INPUT */}
                    <DNAInput />

                    {/* Main Flow Visualization */}
                    <div className="relative w-full max-w-7xl">
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
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DNAProvider>
    );
}
