"use client";

import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';
import { ConceptDetailPanel } from '@/components/concept/ConceptDetailPanel';
import { motion } from 'framer-motion';
import { Briefcase, Building2, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface OrchardCardProps {
    title: string;
    conceptId: string;
    description: string;
    role: string;
    salary?: string;
    index: number;
    icon?: React.ReactNode;
    metaphor?: string | null;
    deepDive?: string | null;
    question?: string | null;
}

export function OrchardCard({ title, conceptId, description, role, salary, index, icon, metaphor, deepDive, question }: OrchardCardProps) {
    const t = useTranslations();
    const [isExpanded, setIsExpanded] = useState(false);
    const orchardColor = '#F43F5E'; // Rose-500 for a warm sunset feel

    return (
        <div className="h-full min-h-[280px]">
            <UnifiedConceptCard
                variant="orchard"
                title={title}
                index={index}
                isActive={false}
                color={orchardColor}
                visualSlot={
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                        {/* Abstract Background Decoration */}
                        <Briefcase size={120} className="text-rose-900 -rotate-12" />
                    </div>
                }
                deepDiveLabel={t('orchard.card.viewPath')}
                onDeepDive={() => setIsExpanded(prev => !prev)}
            >
                <div className="flex flex-col h-full bg-gradient-to-br from-rose-50/50 to-orange-50/50 -m-5 p-5 md:-m-6 md:p-6 rounded-b-2xl">
                    {/* Header Icon */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 rounded-xl bg-white shadow-sm border border-rose-100 text-rose-500">
                            {icon || <Briefcase size={20} />}
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider text-rose-600/70">
                                {role}
                            </span>
                            {salary && (
                                <span className="block text-[10px] font-mono text-stone-500">
                                    {salary}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                        <p className="text-sm text-stone-600 leading-relaxed font-medium">
                            {description}
                        </p>
                    </div>
                </div>
            </UnifiedConceptCard>
            <ConceptDetailPanel
                isOpen={isExpanded}
                onClose={() => setIsExpanded(false)}
                title={title}
                conceptId={conceptId}
                metaphor={metaphor}
                deepDive={deepDive}
                question={question}
                color="#F43F5E"
            />
        </div>
    );
}
