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
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
            </div>

            <div className="space-y-4">
                {/* Node Visualization */}
                <div className="h-48 relative flex items-center justify-center mb-[-1rem] z-10">
                    <GlowingNode
                        color={color}
                        size={isActive ? 60 : 40}
                    />
                    {isActive && (
                        <div className={`absolute inset-0 bg-${color}/20 blur-3xl rounded-full animate-pulse`}></div>
                    )}
                </div>          <p className="text-lg text-gray-200 leading-relaxed font-light">
                    {description}
                </p>

                {metaphor && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-sm text-brand-cyan/80 font-mono uppercase tracking-wider mb-2">
                            THE METAPHOR
                        </p>
                        <p className="text-gray-300 italic">
                            &ldquo;{metaphor}&rdquo;
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-auto pt-6 flex justify-end">
                <button
                    className="text-sm font-semibold text-brand-teal hover:text-brand-cyan transition-colors"
                    type="button"
                >
                    EXPLORE DEEPER &rarr;
                </button>
            </div>
        </GlassCard>
    );
}
