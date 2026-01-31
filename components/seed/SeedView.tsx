"use client";

import { motion } from 'framer-motion';
import { SeedCard } from './SeedCard';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useToast } from '@/lib/useToast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';

interface SeedViewProps {
    locale: string;
}

export function SeedView({ locale }: SeedViewProps) {
    const t = useTranslations();
    const { showToast } = useToast();
    const [activeStep, setActiveStep] = useState(0);

    const handleSearch = (query: string) => {
        showToast("Analysis complete. Found usage of 'Backpropagation' in 3 papers.", "success");
    };

    // The 3 Phases of the Seed Stage
    const SEED_STEPS = [
        {
            id: 'dataset',
            title: t('seed.steps.dataset.title') || "The Dataset",
            description: t('seed.steps.dataset.desc') || "Raw information collected from the world (Common Crawl, Wikipedia). This is the soil.",
            cards: [
                { title: "Common Crawl", desc: "Petabytes of web data." },
                { title: "The Pile", desc: "Curated academic and code datasets." },
                { title: "Cleaning", desc: "Removing noise and duplicates." }
            ]
        },
        {
            id: 'training',
            title: t('seed.steps.training.title') || "Training (Compression)",
            description: t('seed.steps.training.desc') || "The intense process of compressing data into weights. Maximizing pattern recognition.",
            cards: [
                { title: "Loss Function", desc: "Measuring the error rate." },
                { title: "Backpropagation", desc: "Updating weights to fix errors." },
                { title: "Compute Cluster", desc: "Thousands of GPUs running in parallel." }
            ]
        },
        {
            id: 'model',
            title: t('seed.steps.model.title') || "The Model",
            description: t('seed.steps.model.desc') || "The final compressed artifact. A static file ready to be 'woken up' (inference).",
            cards: [
                { title: "Weights", desc: "The frozen knowledge parameters." },
                { title: "Base Model", desc: "The raw, un-finetuned intelligence." },
                { title: "Checkpoint", desc: "A saved state of the training run." }
            ]
        }
    ];

    return (
        <div className="min-h-screen relative pb-32 overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-amber-950/40">
            {/* Background Effects (Deep Earth Theme) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-800/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold tracking-widest uppercase mb-4">
                        {t('seed.phaseLabel') || "Phase I: The Seed"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        {t('seed.title') || "The Training"}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto leading-relaxed">
                        {t('seed.subtitle') || "Deep underground, raw data is compressed under intense heat into the seed of intelligence."}
                    </p>
                </motion.div>
            </header>

            {/* Step Flow */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
                {SEED_STEPS.map((step, stepIndex) => (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-16 relative"
                    >
                        {/* Step Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border",
                                stepIndex === 0 ? "bg-stone-700 border-stone-600 text-stone-200" :
                                    stepIndex === 1 ? "bg-amber-900/50 border-amber-700 text-amber-200" :
                                        "bg-emerald-900/50 border-emerald-700 text-emerald-200"
                            )}>
                                {stepIndex + 1}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                                <p className="text-stone-400 text-sm max-w-md">{step.description}</p>
                            </div>
                        </div>

                        {/* Step Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {step.cards.map((card, cardIndex) => (
                                <SeedCard
                                    key={card.title}
                                    title={card.title}
                                    description={card.desc}
                                    index={cardIndex}
                                    step={step.id as any}
                                    isActive={false} // Could enable interactivity later
                                />
                            ))}
                        </div>

                        {/* Connector Line (except last) */}
                        {stepIndex < SEED_STEPS.length - 1 && (
                            <div className="absolute left-4 top-full h-16 w-0.5 bg-gradient-to-b from-stone-800 to-transparent -translate-x-1/2 hidden md:block" />
                        )}

                        {/* Mobile connector Arrow */}
                        {stepIndex < SEED_STEPS.length - 1 && (
                            <div className="flex justify-center mt-8 md:hidden opacity-30">
                                <ArrowDown className="text-white animate-bounce" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Floating Controls */}
            <StageSelector />
            <FloatingInput
                position="bottom"
                placeholder={t('seed.inputPlaceholder') || "Query the training data..."}
                onSubmit={handleSearch}
            />
        </div>
    );
}
