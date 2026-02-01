"use client";

import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { Database, Zap, Box } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface SeedCardProps {
    title: string;
    description: string;
    index: number;
    step: 'dataset' | 'training' | 'model'; // The 3 phases of the Seed
    isActive?: boolean;
    isCompleted?: boolean;
    onCardClick?: () => void;
}

export function SeedCard({
    title,
    description,
    index,
    step,
    isActive,
    isCompleted,
    onCardClick
}: SeedCardProps) {
    const t = useTranslations();

    // Deep Earth Theme Colors by Step
    const stepColors = {
        dataset: '#78716C', // Stone-500 (Raw Material)
        training: '#D97706', // Amber-600 (Heat/Compression)
        model: '#10B981',    // Emerald-500 (Life/Result)
    };

    const stepIcons = {
        dataset: <Database size={40} className="text-stone-400 opacity-20" />,
        training: <Zap size={40} className="text-amber-500 opacity-20" />,
        model: <Box size={40} className="text-emerald-500 opacity-20" />
    };

    const color = stepColors[step];

    return (
        <div className="h-full">
            <UnifiedConceptCard
                variant="dna" // Use DNA variant for dark mode base
                title={title}
                index={index}
                description={description}
                isActive={isActive}
                isCompleted={isCompleted}
                color={color}
                onCardClick={onCardClick}
                visualSlot={
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Background Icon Watermark */}
                        {stepIcons[step]}
                    </div>
                }
                deepDiveLabel={t('seed.card.learnMore')}
                onDeepDive={() => console.log('Deep dive into:', title)}
                className="bg-stone-900/40 backdrop-blur-md" // Darker override
            />
        </div>
    );
}
