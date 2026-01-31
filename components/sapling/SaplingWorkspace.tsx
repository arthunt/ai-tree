"use client";

import { useState } from 'react';
import { PromptSandbox } from '@/components/sapling/PromptSandbox';
import { motion } from 'framer-motion';
import { Target, Zap, Thermometer, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

export type ModuleId = 'basics' | 'refinement' | 'temperature' | 'evaluation';

interface Module {
    id: ModuleId;
    title: string;
    description: string;
    icon: any;
    promptTemplate: string;
    temperature?: number;
}

const MODULES: Module[] = [
    {
        id: 'basics',
        title: 'First Prompt',
        description: 'Learn the cause-and-effect of basic prompting.',
        icon: Zap,
        promptTemplate: 'Write a short poem about a robot learning to garden.',
        temperature: 0.7
    },
    {
        id: 'refinement',
        title: 'Refinement',
        description: 'Iterate on your prompt to get better results.',
        icon: Target,
        promptTemplate: 'Write a funny haiku about a robot gardener who loves carrots.',
        temperature: 0.7
    },
    {
        id: 'temperature',
        title: 'Temperature',
        description: 'Experiment with randomness and creativity.',
        icon: Thermometer,
        promptTemplate: 'Invent 5 new names for a futuristic fruit.',
        temperature: 0.9
    },
    {
        id: 'evaluation',
        title: 'Evaluation',
        description: 'Judge the quality and safety of AI outputs.',
        icon: CheckCircle2,
        promptTemplate: 'Explain quantum physics to a 5-year-old using emojis.',
        temperature: 0.5
    }
];

export function SaplingWorkspace({ locale }: { locale: string }) {
    const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
    const [prefill, setPrefill] = useState<{ text: string; temp: number } | null>(null);

    const handleModuleSelect = (module: Module) => {
        setActiveModule(module.id);
        setPrefill({
            text: module.promptTemplate,
            temp: module.temperature || 0.7
        });

        // Scroll to sandbox
        const sandbox = document.getElementById('sapling-sandbox');
        if (sandbox) {
            sandbox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col gap-16">

            {/* 1. The Sandbox (Interactive Area) */}
            <div id="sapling-sandbox" className="scroll-mt-32">
                <PromptSandbox
                    locale={locale}
                    initialPrompt={prefill?.text}
                    initialTemp={prefill?.temp}
                />
            </div>

            {/* 2. Practice Modules List (Curriculum) */}
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-800/50 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={24} />
                        {locale === 'et' ? 'Treeningmoodulid' : 'Training Modules'}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-800/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MODULES.map((module) => {
                        const Icon = module.icon;
                        const isActive = activeModule === module.id;

                        return (
                            <GlassCard
                                key={module.id}
                                className={cn(
                                    "p-6 cursor-pointer transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden",
                                    isActive
                                        ? "bg-emerald-900/40 border-emerald-500/50 ring-1 ring-emerald-500/20"
                                        : "bg-emerald-950/20 border-emerald-800/30 hover:border-emerald-600/50 hover:bg-emerald-900/30"
                                )}
                                onClick={() => handleModuleSelect(module)}
                            >
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                    isActive
                                        ? "bg-emerald-500 text-emerald-950"
                                        : "bg-emerald-900/50 text-emerald-400 group-hover:bg-emerald-800/50 group-hover:text-emerald-300"
                                )}>
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>

                                <h3 className={cn(
                                    "text-lg font-bold mb-2 transition-colors",
                                    isActive ? "text-white" : "text-emerald-100 group-hover:text-white"
                                )}>
                                    {module.title}
                                </h3>

                                <p className="text-sm text-emerald-100/60 leading-relaxed mb-6">
                                    {module.description}
                                </p>

                                <div className={cn(
                                    "flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                                    isActive ? "text-emerald-400" : "text-emerald-600 group-hover:text-emerald-400"
                                )}>
                                    {isActive ? 'Active' : 'Start Module'}
                                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </div>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-glow"
                                        className="absolute inset-0 bg-emerald-500/5 pointer-events-none"
                                    />
                                )}
                            </GlassCard>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
