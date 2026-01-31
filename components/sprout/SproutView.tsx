"use client";

import { motion } from 'framer-motion';
import { SproutCard } from './SproutCard';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { StageSelector } from '@/components/StageSelector';

interface SproutViewProps {
    content: any[];
    locale: string;
}

export function SproutView({ content, locale }: SproutViewProps) {
    const getLocalized = (json: any) => {
        return json?.[locale] || json?.['en'] || '';
    };

    return (
        <div className="min-h-screen relative pb-32">
            {/* Background Gradient (Dawn/Sunrise Theme) */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900/50 -z-10" />

            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold tracking-widest uppercase mb-4">
                        Phase 2: Foundations
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-brand-cyan to-brand-teal mb-6">
                        The Sprout
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Before the tree can grow branches, it needs strong roots.
                        Understand the 6 core mechanisms that power every AI model.
                    </p>
                </motion.div>
            </header>

            {/* Masonry Grid */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {content.map((item, index) => (
                        <SproutCard
                            key={item.slug}
                            index={index}
                            title={getLocalized(item.title)}
                            description={getLocalized(item.description)}
                            analogy={getLocalized(item.analogy)}
                            visualType={item.visual_type}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Controls */}
            <StageSelector />
            <FloatingInput position="bottom" placeholder="Ask about these concepts..." />
        </div>
    );
}
