"use client";

import { SeedProvider, useSeed } from './SeedContext';
import { SeedHeroAnimation } from './SeedHeroAnimation';
import { SeedStepNav } from './SeedStepNav';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Concept } from '@/lib/concepts/types';

interface SeedWorkspaceProps {
    locale: string;
    datasetConcepts: Concept[];
    trainingConcepts: Concept[];
    modelConcepts: Concept[];
    i18n: any;
}

function ConceptGrid({ title, concepts, active }: { title: string; concepts: Concept[]; active: boolean }) {
    if (concepts.length === 0) return null;

    return (
        <motion.div
            className={cn(
                "mb-12 last:mb-0 transition-opacity duration-1000",
                active ? "opacity-100" : "opacity-30 blur-[1px] grayscale"
            )}
            layout
        >
            <h3 className={cn(
                "text-xl font-bold mb-6 uppercase tracking-wider pl-1 border-l-4 transition-colors",
                active ? "text-amber-500 border-amber-500" : "text-stone-700 border-stone-800"
            )}>
                {title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {concepts.map((concept) => (
                    <div key={concept.id} className="h-[280px]">
                        <UnifiedConceptCard
                            variant="seed"
                            index={concept.sort_order}
                            title={concept.title}
                            description={concept.explanation}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function SeedContent({ datasetConcepts, trainingConcepts, modelConcepts, i18n }: Omit<SeedWorkspaceProps, 'locale'>) {
    const { phase } = useSeed();

    // Determine which section is active based on phase
    const isDatasetActive = phase === 'selection' || phase === 'processing' || phase === 'complete';
    const isTrainingActive = phase === 'training' || phase === 'complete';
    const isModelActive = phase === 'complete';

    return (
        <div className="max-w-7xl mx-auto px-6 relative z-10 pb-20">
            <SeedHeroAnimation />
            <SeedStepNav />

            <div className="mt-12">
                <ConceptGrid
                    title={i18n.dataset}
                    concepts={datasetConcepts}
                    active={isDatasetActive}
                />

                <ConceptGrid
                    title={i18n.training}
                    concepts={trainingConcepts}
                    active={isTrainingActive}
                />

                <ConceptGrid
                    title={i18n.model}
                    concepts={modelConcepts}
                    active={isModelActive}
                />
            </div>
        </div>
    );
}

export function SeedWorkspace(props: SeedWorkspaceProps) {
    return (
        <SeedProvider>
            <SeedContent {...props} />
        </SeedProvider>
    );
}
