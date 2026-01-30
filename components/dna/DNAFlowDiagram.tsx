"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useDNA, DNAStep } from './DNAContext';

export function DNAFlowDiagram() {
    const { currentStep } = useDNA();

    // Coordinate system: 0-100% width, 50% height
    // Aligned generally with the center of the 4 grid columns
    const positions = {
        tokenization: 12.5,
        vectorizing: 37.5,
        attention: 62.5,
        prediction: 87.5
    };

    // Determine active links based on state
    // If we are at 'vectorizing', the line from T -> V should be active
    const isLinkActive = (from: DNAStep, to: DNAStep) => {
        const order = ['tokenization', 'vectorizing', 'attention', 'prediction'];
        const fromIdx = order.indexOf(from);
        const toIdx = order.indexOf(to);
        const currentIdx = order.indexOf(currentStep);

        // Link is active if we represent the transition to the CURRENT step
        // OR if the current step is past this link
        if (currentStep === to) return true;
        if (currentIdx > toIdx) return true;

        return false;
    };

    // Signal Animation Variants
    const signalVariant = {
        hidden: { pathLength: 0, opacity: 0 },
        active: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: "linear", repeat: Infinity } },
        done: { pathLength: 1, opacity: 0.5 }
    };

    return (
        <div className="w-full h-full relative">
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="grad-t-v" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--dna-t)" />
                        <stop offset="100%" stopColor="var(--dna-v)" />
                    </linearGradient>
                    <linearGradient id="grad-v-a" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--dna-v)" />
                        <stop offset="100%" stopColor="var(--dna-a)" />
                    </linearGradient>
                    <linearGradient id="grad-a-p" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--dna-a)" />
                        <stop offset="100%" stopColor="var(--dna-p)" />
                    </linearGradient>
                </defs>

                {/* Base Line (Faint) */}
                <path
                    d={`M ${positions.tokenization}% 50% L ${positions.prediction}% 50%`}
                    stroke="white"
                    strokeOpacity="0.05"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />

                {/* T -> V Segment */}
                <motion.path
                    d={`M ${positions.tokenization}% 50% L ${positions.vectorizing}% 50%`}
                    stroke="url(#grad-t-v)"
                    strokeWidth="4"
                    fill="none"
                    initial="hidden"
                    animate={isLinkActive('tokenization', 'vectorizing') ? "active" : "hidden"}
                    variants={{
                        hidden: { pathLength: 0, opacity: 0.1 },
                        active: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } }
                    }}
                />

                {/* V -> A Segment */}
                <motion.path
                    d={`M ${positions.vectorizing}% 50% L ${positions.attention}% 50%`}
                    stroke="url(#grad-v-a)"
                    strokeWidth="4"
                    fill="none"
                    initial="hidden"
                    animate={isLinkActive('vectorizing', 'attention') ? "active" : "hidden"}
                    variants={{
                        hidden: { pathLength: 0, opacity: 0.1 },
                        active: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } }
                    }}
                />

                {/* A -> P Segment */}
                <motion.path
                    d={`M ${positions.attention}% 50% L ${positions.prediction}% 50%`}
                    stroke="url(#grad-a-p)"
                    strokeWidth="4"
                    fill="none"
                    initial="hidden"
                    animate={isLinkActive('attention', 'prediction') ? "active" : "hidden"}
                    variants={{
                        hidden: { pathLength: 0, opacity: 0.1 },
                        active: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } }
                    }}
                />

                {/* Signal Packets (Moving Dots) */}
                {currentStep === 'vectorizing' && (
                    <motion.circle r="4" fill="white" filter="url(#glow)">
                        <motion.animateMotion
                            path={`M ${positions.tokenization}% 50% L ${positions.vectorizing}% 50%`}
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                )}
                {currentStep === 'attention' && (
                    <motion.circle r="4" fill="white" filter="url(#glow)">
                        <motion.animateMotion
                            path={`M ${positions.vectorizing}% 50% L ${positions.attention}% 50%`}
                            dur="3s" // Slower for complexity
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                )}
                {currentStep === 'prediction' && (
                    <motion.circle r="4" fill="white" filter="url(#glow)">
                        <motion.animateMotion
                            path={`M ${positions.attention}% 50% L ${positions.prediction}% 50%`}
                            dur="1s" // Fast prediction
                            repeatCount="indefinite"
                        />
                    </motion.circle>
                )}
            </svg>
        </div>
    );
}
