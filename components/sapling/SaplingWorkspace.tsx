"use client";

import { useState } from 'react';
import { PromptSandbox } from '@/components/sapling/PromptSandbox';
import { motion } from 'framer-motion';
import { Target, Zap, Thermometer, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

export type ModuleId = 'basics' | 'refinement' | 'temperature' | 'evaluation';

interface ModuleI18n {
    title: string;
    description: string;
    promptTemplate: string;
}

interface SaplingI18n {
    trainingModules: string;
    moduleActive: string;
    moduleStart: string;
    modules: Record<ModuleId, ModuleI18n>;
}

interface Module {
    id: ModuleId;
    icon: any;
    temperature: number;
}

const MODULE_CONFIGS: Module[] = [
    { id: 'basics', icon: Zap, temperature: 0.7 },
    { id: 'refinement', icon: Target, temperature: 0.7 },
    { id: 'temperature', icon: Thermometer, temperature: 0.9 },
    { id: 'evaluation', icon: CheckCircle2, temperature: 0.5 },
];

export function SaplingWorkspace({ locale, i18n }: { locale: string; i18n: SaplingI18n }) {
    const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
    const [prefill, setPrefill] = useState<{ text: string; temp: number } | null>(null);
    const [completedModules, setCompletedModules] = useState<ModuleId[]>([]);
    const [historyCount, setHistoryCount] = useState(0);

    const handleLessonEvent = (type: 'run' | 'temp' | 'rating', value?: any) => {
        if (!activeModule) return;

        if (completedModules.includes(activeModule)) return;

        let isSuccess = false;

        switch (activeModule) {
            case 'basics':
                if (type === 'run' && typeof value === 'string' && value.length > 10) {
                    isSuccess = true;
                }
                break;
            case 'refinement':
                if (type === 'run') {
                    const newCount = historyCount + 1;
                    setHistoryCount(newCount);
                    if (newCount >= 2) isSuccess = true;
                }
                break;
            case 'temperature':
                if (type === 'temp' && typeof value === 'number' && Math.abs(value - 0.7) > 0.1) {
                    isSuccess = true;
                }
                break;
            case 'evaluation':
                if (type === 'rating') {
                    isSuccess = true;
                }
                break;
        }

        if (isSuccess) {
            setCompletedModules(prev => [...prev, activeModule]);
        }
    };

    const handleModuleSelect = (module: Module) => {
        setActiveModule(module.id);
        const moduleI18n = i18n.modules[module.id];
        setPrefill({
            text: moduleI18n.promptTemplate,
            temp: module.temperature,
        });

        const sandbox = document.getElementById('sapling-sandbox');
        if (sandbox) {
            sandbox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="flex flex-col gap-8 lg:gap-16">

            {/* 1. The Sandbox (Interactive Area) */}
            <div id="sapling-sandbox" className="scroll-mt-32">
                <PromptSandbox
                    locale={locale}
                    initialPrompt={prefill?.text}
                    initialTemp={prefill?.temp}
                    onPromptRun={(text) => handleLessonEvent('run', text)}
                    onTempChange={(temp) => handleLessonEvent('temp', temp)}
                    onRating={() => handleLessonEvent('rating')}
                />
            </div>

            {/* 2. Practice Modules List (Curriculum) */}
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-800/50 to-transparent"></div>
                    <h2 className="text-2xl font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <Target size={24} />
                        {i18n.trainingModules}
                    </h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-800/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {MODULE_CONFIGS.map((module) => {
                        const Icon = module.icon;
                        const isActive = activeModule === module.id;
                        const moduleI18n = i18n.modules[module.id];

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
                                    {moduleI18n.title}
                                </h3>

                                <p className="text-sm text-emerald-100/60 leading-relaxed mb-6">
                                    {moduleI18n.description}
                                </p>

                                <div className={cn(
                                    "flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors",
                                    isActive ? "text-emerald-400" : "text-emerald-600 group-hover:text-emerald-400"
                                )}>
                                    {isActive ? i18n.moduleActive : i18n.moduleStart}
                                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </div>

                                {completedModules.includes(module.id) ? (
                                    <div className="absolute top-4 right-4 text-emerald-400 bg-emerald-900/60 backdrop-blur-sm rounded-full p-1 border border-emerald-500/30">
                                        <CheckCircle2 size={16} />
                                    </div>
                                ) : null}

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
