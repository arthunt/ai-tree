"use client";

import { UnifiedConceptCard, CardVariant } from '@/components/ui/UnifiedConceptCard';
import { motion } from 'framer-motion';

const VARIANTS: CardVariant[] = ['dna', 'seed', 'sprout', 'sapling', 'tree'];

export function CardVariantGallery() {
    return (
        <div className="p-8 min-h-screen bg-slate-900 overflow-y-auto">
            <h1 className="text-3xl text-white font-bold mb-8">Unified Card Variants Gallery</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {VARIANTS.map((variant) => (
                    <div key={variant} className="flex flex-col gap-4">
                        <h2 className="text-xl text-white/70 capitalize">{variant} Theme</h2>

                        {/* Active State */}
                        <div className="h-[300px]">
                            <UnifiedConceptCard
                                variant={variant}
                                index={1}
                                title={`${variant.toUpperCase()} Active`}
                                description={`This is an active ${variant} card showing the selected state visual treatment.`}
                                isActive={true}
                                onCardClick={() => { }}
                                deepDiveLabel="Explore"
                                onDeepDive={() => { }}
                            />
                        </div>

                        {/* Default State */}
                        <div className="h-[300px]">
                            <UnifiedConceptCard
                                variant={variant}
                                index={2}
                                title={`${variant.toUpperCase()} Default`}
                                description={`This is a default ${variant} card waiting for interaction.`}
                                isActive={false}
                                onCardClick={() => { }}
                            />
                        </div>

                        {/* Completed State */}
                        <div className="h-[300px]">
                            <UnifiedConceptCard
                                variant={variant}
                                index={3}
                                title={`${variant.toUpperCase()} Done`}
                                description={`This is a completed ${variant} card.`}
                                isActive={false}
                                isCompleted={true}
                                onCardClick={() => { }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
