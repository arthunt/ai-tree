"use client";

import { motion } from 'framer-motion';
import { OrchardCard } from './OrchardCard';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useToast } from '@/lib/useToast';
import { Briefcase, Code, LineChart, Cpu, ShieldCheck, Palette } from 'lucide-react';

interface OrchardViewProps {
    locale: string;
}

export function OrchardView({ locale }: OrchardViewProps) {
    const t = useTranslations();
    const { showToast } = useToast();

    const handleSearch = (query: string) => {
        showToast(
            "Career path search coming soon",
            "info"
        );
    };

    // Dummy Data for Career Paths
    const CAREERS = [
        {
            title: "AI Engineer",
            role: "Engineering",
            salary: "$120k - $250k",
            description: "Build and deploy the models that power intelligent applications. Requires Python, PyTorch/TensorFlow.",
            icon: <Code size={20} />
        },
        {
            title: "Prompt Architect",
            role: "Design / Logic",
            salary: "$90k - $180k",
            description: "Craft and optimize the instructions that guide LLMs to desired outputs. High creativity required.",
            icon: <Palette size={20} />
        },
        {
            title: "Data Scientist",
            role: "Science",
            salary: "$110k - $200k",
            description: "Analyze vast datasets to find patterns and train predictive models.",
            icon: <LineChart size={20} />
        },
        {
            title: "AI Ethicist",
            role: "Policy",
            salary: "$100k - $190k",
            description: "Ensure AI systems are fair, unbiased, and safe for humanity.",
            icon: <ShieldCheck size={20} />
        },
        {
            title: "ML Ops Specialist",
            role: "Operations",
            salary: "$130k - $240k",
            description: "Manage the infrastructure and pipelines that keep AI models running in production.",
            icon: <Cpu size={20} />
        }
    ];

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
                        {t('orchard.phaseLabel') || "Phase IV: The Orchard"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight">
                        {t('orchard.title') || "Career Paths"}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
                        {t('orchard.subtitle') || "Cultivate your future. Explore the professional opportunities growing in the AI ecosystem."}
                    </p>
                </motion.div>
            </header>

            {/* Career Grid */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {CAREERS.map((career, index) => (
                        <motion.div
                            key={career.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <OrchardCard
                                title={career.title}
                                description={career.description}
                                role={career.role}
                                salary={career.salary}
                                index={index}
                                icon={career.icon}
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
                            <h3 className="text-lg font-bold text-rose-800/60">Your Path?</h3>
                            <p className="text-sm text-rose-700/50 mt-1">The field is growing every day.</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Controls */}
            <StageSelector />
            <FloatingInput
                position="bottom"
                placeholder={t('orchard.inputPlaceholder') || "Enter your skills..."}
                onSubmit={handleSearch}
            />
        </div>
    );
}
