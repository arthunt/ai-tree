"use client";

import { useState } from 'react';
import { PromptSandbox } from '@/components/sapling/PromptSandbox';
import { motion } from 'framer-motion';
import { Target, Zap, Thermometer, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';

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
                    {MODULE_CONFIGS.map((module, index) => {
                        const Icon = module.icon;
                        const isActive = activeModule === module.id;
                        const isCompleted = completedModules.includes(module.id);
                        const moduleI18n = i18n.modules[module.id];

                        return (
                            <div key={module.id} className="min-h-[220px]">
                                <UnifiedConceptCard
                                    variant="sapling"
                                    title={moduleI18n.title}
                                    index={index}
                                    description={moduleI18n.description}
                                    isActive={isActive}
                                    isCompleted={isCompleted}
                                    onCardClick={() => handleModuleSelect(module)}
                                    color="#10B981" // Emerald-500 override if needed
                                    visualSlot={
                                        <div className="absolute top-4 right-4 text-emerald-300 opacity-80 bg-emerald-900/20 p-2 rounded-xl border border-emerald-500/20">
                                            <Icon size={20} />
                                        </div>
                                    }
                                >
                                    <div className="mt-auto pt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-400/60">
                                        <span>{isActive ? i18n.moduleActive : i18n.moduleStart}</span>
                                        {isActive && <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                    </div>
                                </UnifiedConceptCard>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
