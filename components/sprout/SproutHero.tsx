"use client";

import { motion } from 'framer-motion';
import { useSproutContext } from './SproutContext';
import { RootSystem } from './RootSystem';
import { ContextNode } from './ContextNode';
import { useRef, useState } from 'react';

export function SproutHero() {
    const { growthLevel, isComplete } = useSproutContext();
    const containerRef = useRef<HTMLDivElement>(null);

    // Nodes to connect (Static list for now, could be passed as props)
    const contextNodes = [
        { id: 'ctx-1', label: 'Context', x: -120, y: -80 },
        { id: 'ctx-2', label: 'Grammar', x: 120, y: -80 },
        { id: 'ctx-3', label: 'Facts', x: 0, y: 140 },
    ];

    return (
        <div ref={containerRef} className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Roots */}
            <RootSystem growthLevel={growthLevel} />

            {/* Central Seed (Drop Zone) */}
            <motion.div
                className="relative z-20 w-32 h-32 rounded-full bg-indigo-950 border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.3)]"
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 20px rgba(99,102,241,0.3)",
                        "0 0 40px rgba(99,102,241,0.6)",
                        "0 0 20px rgba(99,102,241,0.3)"
                    ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {isComplete ? (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-4xl"
                    >
                        🌱
                    </motion.div>
                ) : (
                    <div className="text-center text-xs text-indigo-300 font-mono">
                        <div>DORMANT</div>
                        <div className="opacity-50">SEED</div>
                    </div>
                )}
            </motion.div>

            {/* Floating Context Nodes */}
            {contextNodes.map(node => (
                <ContextNode
                    key={node.id}
                    id={node.id}
                    label={node.label}
                    initialX={node.x}
                    initialY={node.y}
                />
            ))}

            {/* Guide Text */}
            {!isComplete && growthLevel === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
                    className="absolute bottom-10 text-center text-sm text-indigo-200/60"
                >
                    Drag nodes to feed the seed
                </motion.div>
            )}
        </div>
    );
}
