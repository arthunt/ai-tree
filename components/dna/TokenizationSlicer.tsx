"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useDNA } from "./DNAContext";

/**
 * TokenizationSlicer — US-160 Task 1.1
 *
 * Animates text being "physically sliced" into token chunks.
 * Metaphor: "Chopping vegetables for a stew."
 *
 * Stages:
 *  1. Full text appears as a solid string
 *  2. "Knife" slashes appear at split points (glowing cut lines)
 *  3. Chunks separate apart with spring physics
 *  4. Each chunk settles into a token pill
 */

interface TokenizationSlicerProps {
    text: string;
    tokens: string[];
    isActive: boolean;
}

/**
 * BPE-like visual tokenizer. Splits each word into sub-word chunks
 * for a more interesting "slicing" animation than simple whitespace.
 * e.g. "Transformer" → ["Trans", "form", "er"]
 *      "Money" → ["Mon", "ey"]
 *      "AI" → ["AI"]
 */
export function visualTokenize(text: string): string[] {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const subTokens: string[] = [];

    for (const word of words) {
        if (word.length <= 3) {
            // Short words stay whole
            subTokens.push(word);
        } else if (word.length <= 5) {
            // Split into 2 chunks: ~60/40
            const cut = Math.ceil(word.length * 0.6);
            subTokens.push(word.slice(0, cut));
            subTokens.push(word.slice(cut));
        } else {
            // Split into 3 chunks for longer words
            const first = Math.ceil(word.length * 0.4);
            const second = Math.ceil(word.length * 0.7);
            subTokens.push(word.slice(0, first));
            subTokens.push(word.slice(first, second));
            subTokens.push(word.slice(second));
        }
    }

    return subTokens;
}

/**
 * Builds a mapping of which characters belong to which token,
 * tracking the cut positions in the original text.
 */
function buildSliceMap(text: string, subTokens: string[]) {
    const slices: { text: string; startIdx: number; endIdx: number }[] = [];
    let cursor = 0;

    for (const token of subTokens) {
        // Find where this token starts in the original text (skip whitespace)
        while (cursor < text.length && text[cursor] === ' ') {
            cursor++;
        }
        const startIdx = cursor;
        const endIdx = cursor + token.length;
        slices.push({ text: token, startIdx, endIdx });
        cursor = endIdx;
    }

    return slices;
}

type SliceStage = 'text' | 'cutting' | 'separating' | 'done';

export function TokenizationSlicer({ text, tokens, isActive }: TokenizationSlicerProps) {
    const [stage, setStage] = useState<SliceStage>('text');
    const { playbackSpeed } = useDNA();
    const subTokens = visualTokenize(text);
    const slices = buildSliceMap(text, subTokens);

    // Scale factor: higher speed = shorter delays. Clamp to avoid division by zero.
    const scale = useMemo(() => 1 / Math.max(playbackSpeed, 0.05), [playbackSpeed]);

    // Stage progression when active (timings scale with playbackSpeed)
    useEffect(() => {
        if (!isActive) {
            setStage('text');
            return;
        }

        // Stage 1: Show full text
        setStage('text');

        // Stage 2: Show cuts
        const t1 = setTimeout(() => setStage('cutting'), 600 * scale);

        // Stage 3: Separate chunks
        const t2 = setTimeout(() => setStage('separating'), 1500 * scale);

        // Stage 4: Done (pills settled)
        const t3 = setTimeout(() => setStage('done'), 2500 * scale);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [isActive, scale]);

    if (!isActive) return null;

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {/* Stage 1-2: Text with cut lines */}
                {(stage === 'text' || stage === 'cutting') && (
                    <motion.div
                        key="slicing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative font-mono text-lg tracking-wide"
                    >
                        <div className="flex flex-wrap items-center">
                            {slices.map((slice, i) => {
                                // Check if there's a space before this token
                                const needsSpace = i > 0 &&
                                    slices[i - 1].endIdx < slice.startIdx;

                                return (
                                    <span key={i} className="relative inline-flex items-center">
                                        {needsSpace && (
                                            <span className="text-white/20 mx-0.5">·</span>
                                        )}
                                        <span className="text-white">{slice.text}</span>

                                        {/* The "Knife" cut line */}
                                        {stage === 'cutting' && i < slices.length - 1 && (
                                            <motion.span
                                                className="inline-block w-0.5 h-6 mx-px rounded-full"
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{
                                                    scaleY: 1,
                                                    opacity: 1,
                                                    background: [
                                                        'rgba(45, 212, 191, 0)',
                                                        'rgba(45, 212, 191, 1)',
                                                        'rgba(45, 212, 191, 0.6)'
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: i * 0.08,
                                                    ease: "easeOut"
                                                }}
                                                style={{
                                                    boxShadow: '0 0 8px rgba(45, 212, 191, 0.8), 0 0 20px rgba(45, 212, 191, 0.3)'
                                                }}
                                            />
                                        )}
                                    </span>
                                );
                            })}
                        </div>

                        {/* "Slicing..." label */}
                        {stage === 'cutting' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 text-[10px] font-mono uppercase tracking-widest text-brand-teal/50"
                            >
                                ✂️ slicing...
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Stage 3-4: Chunks flying apart into pills */}
                {(stage === 'separating' || stage === 'done') && (
                    <motion.div
                        key="separated"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-2"
                    >
                        {subTokens.map((token, i) => (
                            <motion.span
                                key={i}
                                className="px-2.5 py-1 bg-brand-teal/20 border border-brand-teal/50 rounded-md text-brand-teal font-mono text-sm"
                                initial={{
                                    opacity: 0,
                                    x: 0,
                                    y: -8,
                                    scale: 0.8,
                                    rotate: (Math.random() - 0.5) * 20
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    scale: 1,
                                    rotate: 0
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    delay: i * 0.06
                                }}
                                style={{
                                    boxShadow: stage === 'done'
                                        ? '0 0 10px rgba(45, 212, 191, 0.15)'
                                        : 'none'
                                }}
                            >
                                {token}
                            </motion.span>
                        ))}

                        {/* Token count badge */}
                        <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: subTokens.length * 0.06 + 0.2, type: "spring" }}
                            className="px-2 py-1 text-[10px] font-mono text-white/40 border border-white/10 rounded-md"
                        >
                            {subTokens.length} tokens
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
