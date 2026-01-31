"use client";

import { motion } from 'framer-motion';
import { FruitsCard } from './FruitsCard';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useToast } from '@/lib/useToast';
import { Brain, Code, Image as ImageIcon, MessageSquare } from 'lucide-react';

interface FruitsViewProps {
    content?: any[]; // Allow external content, but we'll seed mock data initially
    locale: string;
}

export function FruitsView({ content, locale }: FruitsViewProps) {
    const t = useTranslations();
    const { showToast } = useToast();

    const handleSearch = (query: string) => {
        showToast(
            "Harvest search coming soon",
            "info"
        );
    };

    // Dummy Data for visual scaffolding
    const APPLICATIONS = [
        {
            title: "AIKI",
            description: "AI-powered creative writing assistant. Generate stories, poems, and scripts with context-aware suggestions.",
            category: "Creative",
            icon: <MessageSquare size={20} />
        },
        {
            title: "AIVO",
            description: "Voice synthesis and audio generation engine. Create lifelike speech from text in multiple languages.",
            category: "Audio",
            icon: <Brain size={20} />
        },
        {
            title: "CodeGen",
            description: "Intelligent code completion and refactoring tool. Supports TypeScript, Python, and Rust.",
            category: "Development",
            icon: <Code size={20} />
        },
        {
            title: "Visionary",
            description: "Text-to-image generation pipeline. Create stunning visuals from natural language prompts.",
            category: "Visual",
            icon: <ImageIcon size={20} />
        }
    ];

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
                        {t('fruits.phaseLabel') || "The Harvest"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
                        {t('fruits.title') || "Applications"}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        {t('fruits.subtitle') || "Explore real-world applications powered by the intelligence grown from the tree."}
                    </p>
                </motion.div>
            </header>

            {/* Application Grid */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {APPLICATIONS.map((app, index) => (
                        <motion.div
                            key={app.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <FruitsCard
                                title={app.title}
                                description={app.description}
                                category={app.category}
                                index={index}
                                icon={app.icon}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Controls */}
            <StageSelector />
            <FloatingInput
                position="bottom"
                placeholder={t('fruits.inputPlaceholder') || "Search applications..."}
                onSubmit={handleSearch}
            />
        </div>
    );
}
