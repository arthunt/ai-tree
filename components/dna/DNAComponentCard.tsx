'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlowingNode } from '@/components/ui/GlowingNode';

interface DNAComponentCardProps {
    title: string;
    description: string;
    metaphor?: string;
    color: string;
    index?: number;
}

export function DNAComponentCard({
    title,
    description,
    metaphor,
    color,
    index = 0
}: DNAComponentCardProps) {
    return (
        <GlassCard className="w-full max-w-md p-8 flex flex-col gap-6" intensity="high">
            {/* Header with Node Icon */}
            <div className="flex items-center gap-4">
                <GlowingNode size={40} color={color} delay={index * 0.2} />
                <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <p className="text-lg text-gray-200 leading-relaxed font-light">
                    {description}
                </p>

                {metaphor && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-brand-cyan/80 font-mono uppercase tracking-wider mb-2">
                            THE METAPHOR
                        </p>
                        <p className="text-gray-300 italic">
                            "{metaphor}"
                        </p>
                    </div>
                )}
            </div>

            {/* Footer/Action (Placeholder) */}
            <div className="mt-auto pt-6 flex justify-end">
                <button className="text-sm font-semibold text-brand-teal hover:text-brand-cyan transition-colors">
                    EXPLORE DEEPER →
                </button>
            </div>
        </GlassCard>
    );
}
