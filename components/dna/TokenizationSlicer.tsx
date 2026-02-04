"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useDNA } from "./DNAContext";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

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

type SliceStage = 'text' | 'cutting' | 'separating' | 'numbering' | 'done';

export function TokenizationSlicer({ text, tokens, isActive }: TokenizationSlicerProps) {
    const [stage, setStage] = useState<SliceStage>('text');
    const { playbackSpeed } = useDNA();
    const t = useTranslations('dna.animation');
    const subTokens = visualTokenize(text);
    const slices = buildSliceMap(text, subTokens);

    // Scale factor: higher speed = shorter delays.
    const scale = useMemo(() => 1 / Math.max(playbackSpeed, 0.05), [playbackSpeed]);

    // Simple deterministic hash for "BPE-like" token IDs
    const getTokenId = (token: string) => {
        let hash = 0;
        for (let i = 0; i < token.length; i++) {
            hash = token.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash % 10000) + 1000; // 4-digit ID
    };

    // Stage progression
    useEffect(() => {
        if (!isActive) {
            setStage('text');
            return;
        }

        let mounted = true;
        const timeouts: NodeJS.Timeout[] = [];

        const schedule = (nextStage: SliceStage, delay: number) => {
            const t = setTimeout(() => {
                if (mounted) setStage(nextStage);
            }, delay * scale);
            timeouts.push(t);
        };

        // Reset
        setStage('text');

        // Timeline (Slower for educational clarity)
        schedule('cutting', 800);    // Cuts appear slower
        schedule('separating', 2000); // Chunks fly apart
        schedule('numbering', 4500);  // "Matrix Moment": Flip to numbers (delayed to let user see tokens)
        schedule('done', 8000);       // Ready for next step (Vectors)

        return () => {
            mounted = false;
            timeouts.forEach(clearTimeout);
        };
    }, [isActive, scale]);

    if (!isActive) return null;

    return (
        <div className="w-full relative overflow-hidden" style={{ minHeight: '140px' }}>
            <AnimatePresence mode="wait">
                {/* Stage 1-2: Text with cut lines */}
                {(stage === 'text' || stage === 'cutting') && (
                    <motion.div
                        key="slicing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col items-center justify-center font-mono text-lg tracking-wide"
                    >
                        <div className="flex flex-wrap items-center justify-center">
                            {slices.map((slice, i) => {
                                const needsSpace = i > 0 && slices[i - 1].endIdx < slice.startIdx;
                                return (
                                    <span key={i} className="relative inline-flex items-center">
                                        {needsSpace && <span className="text-white/20 mx-0.5">·</span>}
                                        <span className="text-white">{slice.text}</span>
                                        {stage === 'cutting' && i < slices.length - 1 && (
                                            <motion.span
                                                className="absolute right-0 top-0 bottom-0 w-1 md:w-0.5 h-full rounded-full bg-brand-teal shadow-[0_0_12px_rgba(45,212,191,1)] z-10"
                                                initial={{ scaleY: 0, opacity: 0 }}
                                                animate={{ scaleY: 1, opacity: 1 }}
                                                transition={{ duration: 0.2, delay: i * 0.05 }}
                                            />
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                        {stage === 'cutting' && (
                            <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute bottom-2 text-xs font-mono text-brand-teal/60 uppercase tracking-widest"
                            >
                                {t('slicing')}
                            </motion.span>
                        )}
                    </motion.div>
                )}

                {/* Stage 3-5: Tokens -> Numbers -> Done */}
                {(stage === 'separating' || stage === 'numbering' || stage === 'done') && (
                    <motion.div
                        key="tokens"
                        className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-wrap gap-3 justify-center perspective-1000">
                            {subTokens.map((token, i) => (
                                <div key={i} className="relative h-10 min-w-[60px]" style={{ perspective: '1000px' }}>
                                    <motion.div
                                        className="w-full h-full relative preserve-3d"
                                        initial={{ rotateX: 0 }}
                                        animate={{
                                            rotateX: stage === 'numbering' || stage === 'done' ? 180 : 0,
                                            y: stage === 'done' ? [0, -4, 0] : 0 // Gentle float at end
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.3, // Slower staggered flip (300ms)
                                            type: "spring",
                                            stiffness: 180,
                                            damping: 20
                                        }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        {/* FRONT: Text Token */}
                                        <div className="absolute inset-0 backface-hidden flex items-center justify-center px-3 bg-brand-teal/10 border border-brand-teal/30 rounded-lg text-brand-teal font-mono text-sm shadow-sm backdrop-blur-sm">
                                            {token}
                                        </div>

                                        {/* BACK: Token ID (The Matrix Reveal) */}
                                        <div
                                            className="absolute inset-0 backface-hidden flex items-center justify-center px-3 bg-brand-purple/20 border border-brand-purple/50 rounded-lg text-brand-purple font-mono font-bold text-sm shadow-[0_0_15px_rgba(168,85,247,0.3)] backdrop-blur-md"
                                            style={{ transform: 'rotateX(180deg)' }}
                                        >
                                            {getTokenId(token)}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Status Label (Inside container to avoid jump) */}
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-2 left-0 right-0 text-center"
                        >
                            {stage === 'separating' && (
                                <span className="text-xs font-mono text-brand-teal/80 uppercase tracking-widest">{t('packaging')}</span>
                            )}
                            {stage === 'numbering' && (
                                <span className="text-xs font-mono text-brand-purple uppercase tracking-widest animate-pulse">{t('reveal')}</span>
                            )}
                            {stage === 'done' && (
                                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{t('ready')}</span>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
