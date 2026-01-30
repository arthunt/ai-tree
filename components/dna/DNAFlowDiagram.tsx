'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlowingNode } from '@/components/ui/GlowingNode';

export function DNAFlowDiagram({ className = '' }: { className?: string }) {
    // Hardcoded positions for the diagram layout (0-100 coordinate space)
    const steps = [
        { id: 'input', x: 10, y: 50, label: 'INPUT' },
        { id: 't', x: 30, y: 50, color: 'var(--dna-t)', label: 'TOKEN' },
        { id: 'v', x: 50, y: 50, color: 'var(--dna-v)', label: 'VECTOR' },
        { id: 'a', x: 70, y: 50, color: 'var(--dna-a)', label: 'ATTENTION' },
        { id: 'p', x: 90, y: 50, color: 'var(--dna-p)', label: 'PREDICTION' },
    ];

    return (
        <div className={`w-full aspect-[2/1] md:aspect-[3/1] relative ${className}`}>
            {/* SVG Connection Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Input -> T */}
                <motion.path
                    d="M 10 50 L 30 50"
                    stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeDasharray="4 4"
                />
                {/* T -> V */}
                <motion.path
                    d="M 30 50 L 50 50"
                    stroke="var(--dna-t)" strokeOpacity="0.5" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                {/* V -> A */}
                <motion.path
                    d="M 50 50 L 70 50"
                    stroke="var(--dna-v)" strokeOpacity="0.5" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
                />
                {/* A -> P */}
                <motion.path
                    d="M 70 50 L 90 50"
                    stroke="var(--dna-a)" strokeOpacity="0.5" strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 2.5 }}
                />
            </svg>

            {/* Node Layer - using absolute positioning percentages */}
            {steps.map((step, i) => (
                <div
                    key={step.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
                    style={{ left: `${step.x}%`, top: `${step.y}%` }}
                >
                    {step.id === 'input' ? (
                        <div className="w-3 h-3 bg-white/50 rounded-full" />
                    ) : (
                        <GlowingNode
                            size={i === 1 ? 40 : 40} // Consistent size for now
                            color={step.color}
                            delay={i * 0.5}
                        />
                    )}
                    <span className="text-[10px] md:text-xs font-mono tracking-widest opacity-60 mt-2">
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
