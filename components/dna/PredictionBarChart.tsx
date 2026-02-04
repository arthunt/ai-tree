"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useDNA } from "./DNAContext";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { Trophy, Target, X } from "lucide-react";

/**
 * PredictionBarChart — US-160 Task 1.4 + Phase 10.x.8 (Cultural Clarity)
 *
 * Shows top next-token predictions with universal visual metaphors.
 * 3-stage animation:
 *   1. Bars grow in from zero (staggered) + confidence rings appear
 *   2. Low-probability candidates get a strikethrough + fade + X icon
 *   3. Winner highlights with trophy icon and glow pulse
 *
 * Cultural considerations:
 * - Trophy/target icons are universally understood (sports, games)
 * - Confidence rings (like loading/progress) work across cultures
 * - X mark for elimination is universal
 * - Percentages shown as visual proportion, not just numbers
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

// Confidence ring component - universal visual metaphor
function ConfidenceRing({ probability, isWinner, isEliminated }: { probability: number; isWinner: boolean; isEliminated: boolean }) {
    const circumference = 2 * Math.PI * 10;
    const strokeDashoffset = circumference * (1 - probability);

    return (
        <svg width={28} height={28} className="flex-shrink-0">
            {/* Background ring */}
            <circle
                cx={14}
                cy={14}
                r={10}
                fill="none"
                stroke={isEliminated ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.1)"}
                strokeWidth={3}
            />
            {/* Progress ring */}
            <motion.circle
                cx={14}
                cy={14}
                r={10}
                fill="none"
                stroke={isWinner ? "rgb(45, 212, 191)" : isEliminated ? "rgba(255,255,255,0.1)" : "rgb(34, 211, 238)"}
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
            {/* Center icon/text */}
            {isWinner ? (
                <Trophy
                    x={7}
                    y={7}
                    width={14}
                    height={14}
                    className="text-brand-teal"
                    style={{ color: "rgb(45, 212, 191)" }}
                />
            ) : isEliminated ? (
                <X
                    x={7}
                    y={7}
                    width={14}
                    height={14}
                    style={{ color: "rgba(248, 113, 113, 0.6)" }}
                />
            ) : (
                <Target
                    x={7}
                    y={7}
                    width={14}
                    height={14}
                    style={{ color: "rgb(34, 211, 238)" }}
                />
            )}
        </svg>
    );
}

export function PredictionBarChart({ predictions, isActive }: PredictionBarChartProps) {
    const [stage, setStage] = useState<Stage>("growing");
    const { playbackSpeed } = useDNA();
    const t = useTranslations('dna.prediction');

    // Take top entries (already sorted by probability desc from context)
    const top = predictions.slice(0, 4);
    const winnerIdx = 0; // First is highest probability

    // Scale factor: higher speed = shorter delays. Clamp to avoid division by zero.
    const scale = useMemo(() => 1 / Math.max(playbackSpeed, 0.05), [playbackSpeed]);

    useEffect(() => {
        if (!isActive) {
            setStage("growing");
            return;
        }

        setStage("growing");

        // Stage 2: strikethrough losers after bars finish growing
        const t1 = setTimeout(() => setStage("eliminating"), 1200 * scale);

        // Stage 3: highlight winner
        const t2 = setTimeout(() => setStage("winner"), 2200 * scale);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [isActive, scale]);

    if (!isActive || top.length === 0) return null;

    const maxProb = Math.max(...top.map(p => p.probability), 0.01);

    return (
        <div className="w-full space-y-3">
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
                        {/* Confidence Ring (universal visual metaphor) */}
                        <ConfidenceRing
                            probability={p.probability}
                            isWinner={isWinner && stage === "winner"}
                            isEliminated={isEliminated && stage === "winner"}
                        />

                        {/* Token label */}
                        <div className="w-14 shrink-0 relative">
                            <span
                                className={`font-mono text-xs transition-colors duration-300 ${isWinner && stage === "winner"
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
                                        delay: (i - 1) * 0.3,
                                        ease: "easeOut"
                                    }}
                                    style={{ transformOrigin: "left" }}
                                />
                            )}
                        </div>

                        {/* Bar track */}
                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
                            {/* Bar fill */}
                            <motion.div
                                className={`h-full rounded-full relative ${isWinner && stage === "winner"
                                    ? "bg-brand-teal"
                                    : isEliminated
                                        ? "bg-white/10"
                                        : "bg-brand-cyan/70"
                                    }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${barWidth}%` }}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.3, // Slower sequential growth
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
                            className={`w-12 text-right font-mono text-[11px] tabular-nums transition-colors duration-300 ${isWinner && stage === "winner"
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
                    </motion.div>
                );
            })}

            {/* "Winner selected" label with trophy */}
            <AnimatePresence>
                {stage === "winner" && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center justify-center gap-2 pt-2"
                    >
                        <Trophy size={14} className="text-brand-teal" />
                        <span className="text-[11px] font-mono text-brand-teal/70">
                            {t('winner')}: <span className="text-brand-teal font-bold">{top[0]?.token}</span>
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
