"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * PredictionBarChart — US-160 Task 1.4
 *
 * Shows top next-token predictions as a bar chart.
 * 3-stage animation:
 *   1. Bars grow in from zero (staggered)
 *   2. Low-probability candidates get a strikethrough + fade
 *   3. Winner highlights with a glow pulse
 *
 * "Jingle, Jingle..." → [Bells (99%), Balls (0.5%), Smells (0.5%)]
 * Bells wins. Others struck through.
 */

interface Prediction {
    token: string;
    probability: number;
}

interface PredictionBarChartProps {
    predictions: Prediction[];
    isActive: boolean;
}

type Stage = "growing" | "eliminating" | "winner";

export function PredictionBarChart({ predictions, isActive }: PredictionBarChartProps) {
    const [stage, setStage] = useState<Stage>("growing");

    // Take top entries (already sorted by probability desc from context)
    const top = predictions.slice(0, 4);
    const winnerIdx = 0; // First is highest probability

    useEffect(() => {
        if (!isActive) {
            setStage("growing");
            return;
        }

        setStage("growing");

        // Stage 2: strikethrough losers after bars finish growing
        const t1 = setTimeout(() => setStage("eliminating"), 1200);

        // Stage 3: highlight winner
        const t2 = setTimeout(() => setStage("winner"), 2200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [isActive]);

    if (!isActive || top.length === 0) return null;

    const maxProb = Math.max(...top.map(p => p.probability), 0.01);

    return (
        <div className="w-full space-y-2.5">
            {top.map((p, i) => {
                const isWinner = i === winnerIdx;
                const isEliminated = !isWinner && stage !== "growing";
                const barWidth = (p.probability / maxProb) * 100;

                return (
                    <motion.div
                        key={`${p.token}-${i}`}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: isEliminated && stage === "winner" ? 0.35 : 1,
                            x: 0
                        }}
                        transition={{
                            opacity: { duration: 0.4 },
                            x: { delay: i * 0.08, duration: 0.3 }
                        }}
                    >
                        {/* Token label */}
                        <div className="w-16 shrink-0 text-right relative">
                            <span
                                className={`font-mono text-xs transition-colors duration-300 ${
                                    isWinner && stage === "winner"
                                        ? "text-brand-teal font-bold"
                                        : isEliminated
                                            ? "text-white/30"
                                            : "text-brand-cyan"
                                }`}
                            >
                                {p.token}
                            </span>

                            {/* Strikethrough line */}
                            {isEliminated && (
                                <motion.div
                                    className="absolute top-1/2 left-0 right-0 h-px bg-red-400/60"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: (i - 1) * 0.1,
                                        ease: "easeOut"
                                    }}
                                    style={{ transformOrigin: "left" }}
                                />
                            )}
                        </div>

                        {/* Bar track */}
                        <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden relative">
                            {/* Bar fill */}
                            <motion.div
                                className={`h-full rounded-full relative ${
                                    isWinner && stage === "winner"
                                        ? "bg-brand-teal"
                                        : isEliminated
                                            ? "bg-white/10"
                                            : "bg-brand-cyan/70"
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${barWidth}%` }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                {/* Winner glow pulse */}
                                {isWinner && stage === "winner" && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-brand-teal/50"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.6, 0] }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: 2,
                                            ease: "easeInOut"
                                        }}
                                    />
                                )}
                            </motion.div>
                        </div>

                        {/* Percentage */}
                        <motion.span
                            className={`w-12 text-right font-mono text-[11px] tabular-nums transition-colors duration-300 ${
                                isWinner && stage === "winner"
                                    ? "text-brand-teal font-bold"
                                    : isEliminated
                                        ? "text-white/20"
                                        : "text-gray-400"
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                        >
                            {(p.probability * 100).toFixed(p.probability >= 0.1 ? 0 : 1)}%
                        </motion.span>

                        {/* Winner badge */}
                        <AnimatePresence>
                            {isWinner && stage === "winner" && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0, x: -8 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    className="text-brand-teal text-sm"
                                >
                                    ✓
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}

            {/* "Next token selected" label */}
            <AnimatePresence>
                {stage === "winner" && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[10px] font-mono uppercase tracking-widest text-brand-teal/40 pt-1"
                    >
                        → next token: <span className="text-brand-teal/70 font-bold">{top[0]?.token}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
