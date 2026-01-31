"use client";

import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { motion } from 'framer-motion';
import { ExternalLink, Zap } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface FruitsCardProps {
    title: string;
    description: string;
    category: string;
    index: number;
    icon?: React.ReactNode;
}

export function FruitsCard({ title, description, category, index, icon }: FruitsCardProps) {
    const t = useTranslations();

    return (
        <div className="h-full min-h-[260px]">
            <UnifiedConceptCard
                variant="tree"
                title={title}
                index={index}
                isActive={false} // Fruits are generally static/link cards for now
                visualSlot={
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        {/* Abstract Background Decoration */}
                        <Zap size={120} className="text-emerald-900 rotate-12" />
                    </div>
                }
                deepDiveLabel={t('fruits.card.visitApp') || "Launch App"}
                onDeepDive={() => console.log('Launch', title)} // Placeholder for routing
            >
                <div className="flex flex-col h-full">
                    {/* Header Icon */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-orange-100/50 border border-orange-200/50 text-orange-600">
                            {icon || <Zap size={20} />}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600/60 bg-emerald-50 px-2 py-1 rounded-full">
                            {category}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                        <p className="text-sm text-stone-600 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </UnifiedConceptCard>
        </div>
    );
}
