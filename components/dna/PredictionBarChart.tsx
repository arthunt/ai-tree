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
    contextText?: string;
}

type Stage = "thinking" | "context" | "reveal" | "pause" | "eliminating" | "winner";

// Confidence ring component... (unchanged)
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

export function PredictionBarChart({ predictions, isActive, contextText }: PredictionBarChartProps) {
    const [stage, setStage] = useState<Stage>("thinking");
    const [visibleCount, setVisibleCount] = useState(0);
    const { playbackSpeed } = useDNA();
    const t = useTranslations('dna.prediction');

    // Take top entries
    const top = predictions.slice(0, 4);
    const winnerIdx = 0;

    const scale = useMemo(() => 1 / Math.max(playbackSpeed, 0.05), [playbackSpeed]);

    useEffect(() => {
        if (!isActive) {
            setStage("thinking");
            setVisibleCount(0);
            return;
        }

        setStage("thinking");
        setVisibleCount(0);

        // Timeline (Expert Review Specs)
        const timeline = [
            { t: 0, fn: () => setStage("thinking") },
            { t: 1500, fn: () => setStage("context") }, // Show question
            // Staggered reveal of bars
            { t: 3500, fn: () => { setStage("reveal"); setVisibleCount(1); } },
            { t: 4300, fn: () => setVisibleCount(2) },
            { t: 5100, fn: () => setVisibleCount(3) },
            { t: 5900, fn: () => setVisibleCount(4) },
            // Pause for comparison
            { t: 6700, fn: () => setStage("pause") },
            // Eliminate
            { t: 9700, fn: () => setStage("eliminating") },
            // Winner
            { t: 11200, fn: () => setStage("winner") }
        ];

        const timeouts: NodeJS.Timeout[] = [];
        timeline.forEach(({ t, fn }) => {
            timeouts.push(setTimeout(fn, t * scale));
        });

        return () => timeouts.forEach(clearTimeout);
    }, [isActive, scale]);

    if (!isActive || top.length === 0) return null;

    const maxProb = Math.max(...top.map(p => p.probability), 0.01);

    // Thinking Spinner
    if (stage === "thinking") {
        return (
            <div className="w-full h-40 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-8 h-8">
                    <motion.div
                        className="absolute inset-0 border-2 border-brand-teal rounded-full overflow-hidden"
                        style={{ borderRightColor: 'transparent', borderTopColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xs font-mono text-brand-teal uppercase tracking-widest">
                    Mudel arvutab...
                </motion.span>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4 pt-2">
            {/* Phase 1: Context Header (Expert Review Request) */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4"
            >
                <div className="text-sm text-white/60 mb-1">Mis sõna tuleb järgmisena?</div>
                <div className="text-lg font-medium text-white">
                    "Koer on inimese parim <span className="text-brand-teal border-b-2 border-brand-teal/50 inline-block w-12 text-center animate-pulse">___</span>"
                </div>
            </motion.div>

            {/* Candidates */}
            <div className="space-y-3">
                {top.map((p, i) => {
                    const isWinner = i === winnerIdx;
                    // Visibility logic
                    if (stage === "reveal" && i >= visibleCount) return null;

                    const isEliminated = !isWinner && (stage === "eliminating" || stage === "winner");
                    const barWidth = (p.probability / maxProb) * 100;

                    return (
                        <motion.div
                            key={`${p.token}-${i}`}
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isEliminated ? 0.35 : 1,
                                x: 0
                            }}
                        >
                            <ConfidenceRing
                                probability={p.probability}
                                isWinner={isWinner && stage === "winner"}
                                isEliminated={isEliminated && stage === "winner"}
                            />

                            <div className="w-20 shrink-0 relative">
                                <span className={isWinner && stage === "winner" ? "text-brand-teal font-bold" : "text-white/80"}>
                                    {p.token}
                                </span>
                                {isEliminated && (
                                    <motion.div
                                        className="absolute top-1/2 left-0 right-4 h-px bg-red-400/60"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        style={{ transformOrigin: "left" }}
                                    />
                                )}
                            </div>

                            <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full ${isWinner && stage === "winner" ? "bg-brand-teal" : "bg-brand-cyan/70"}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${barWidth}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>

                            <div className="w-10 text-right text-xs font-mono text-white/40">
                                {Math.round(p.probability * 100)}%
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Winner Explanation */}
            <AnimatePresence>
                {stage === "winner" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-4 border-t border-white/10 mt-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy size={14} className="text-brand-teal" />
                            <span className="text-xs font-mono text-brand-teal uppercase tracking-wider">VÕITJA</span>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                            Mudel ennustas sõna <span className="text-brand-teal font-bold">"{top[0].token}"</span>, kuna see esineb treeningandmetes selles kontekstis kõige sagedamini.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
