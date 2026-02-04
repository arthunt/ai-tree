"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

/**
 * AttentionSpotlight — US-160 Task 1.3 + Phase 10.x.8 (Attention Explanation)
 *
 * Draws curved bezier arcs between tokens. Thickness = importance.
 * Shows how "Bank" connects to "River" (or "Account") depending on context.
 *
 * NEW: Explains WHY the strongest connection exists with semantic annotations.
 *
 * - Tokens displayed as a row at the bottom
 * - Arcs drawn above with staggered pathLength animation
 * - Hover a token to spotlight its connections (dim others)
 * - Strongest connections glow brighter
 * - Winner arc gets animated explanation label
 */

interface AttentionWeight {
    fromIndex: number;
    toIndex: number;
    strength: number;
    reason?: string; // Why this connection is strong
}

interface AttentionSpotlightProps {
    tokens: string[];
    weights: AttentionWeight[];
    isActive: boolean;
}

const WIDTH = 300;
const HEIGHT = 180; // Increased for explanation label
const TOKEN_Y = HEIGHT - 16;
const MIN_ARC_HEIGHT = 25;
const LABEL_SHOW_DELAY = 1500; // Show explanation after arcs animate

function tokenX(index: number, total: number): number {
    if (total <= 1) return WIDTH / 2;
    const pad = 30;
    const usable = WIDTH - pad * 2;
    return pad + (index / (total - 1)) * usable;
}

function arcPath(x1: number, x2: number): string {
    const midX = (x1 + x2) / 2;
    const dist = Math.abs(x1 - x2);
    const arcH = Math.min(MIN_ARC_HEIGHT + dist * 0.5, HEIGHT - 50);
    const cy = TOKEN_Y - arcH;
    return `M ${x1} ${TOKEN_Y} Q ${midX} ${cy} ${x2} ${TOKEN_Y}`;
}

function strengthColor(s: number): string {
    // Low = dim purple, High = bright teal
    if (s >= 0.8) return "rgb(45, 212, 191)";    // brand-teal
    if (s >= 0.5) return "rgb(34, 211, 238)";     // brand-cyan
    return "rgb(148, 163, 184)";                    // slate-400
}

// Strength level indicator (universal across cultures)
function strengthLevel(s: number): 1 | 2 | 3 {
    if (s >= 0.8) return 3; // Strong
    if (s >= 0.5) return 2; // Medium
    return 1; // Weak
}

export function AttentionSpotlight({ tokens, weights, isActive }: AttentionSpotlightProps) {
    const t = useTranslations('dna.nav');
    const tAttn = useTranslations('dna.attention');
    const [hoveredToken, setHoveredToken] = useState<number | null>(null);
    const [selectedToken, setSelectedToken] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    // Active token: selected (tap) takes priority over hovered (mouse)
    const activeToken = selectedToken ?? hoveredToken;

    // Find the strongest connection (the "winner")
    const strongestConnection = useMemo(() => {
        if (weights.length === 0) return null;
        return weights.reduce((max, w) => w.strength > max.strength ? w : max, weights[0]);
    }, [weights]);

    // Show explanation after animation completes
    useEffect(() => {
        if (!isActive) {
            setShowExplanation(false);
            return;
        }
        const timer = setTimeout(() => setShowExplanation(true), LABEL_SHOW_DELAY);
        return () => clearTimeout(timer);
    }, [isActive, weights]);

    // Pre-compute which arcs connect to the active token
    const connectedArcs = useMemo(() => {
        if (activeToken === null) return null;
        return new Set(
            weights
                .filter(w => w.fromIndex === activeToken || w.toIndex === activeToken)
                .map((_, i) => weights.indexOf(_))
        );
    }, [activeToken, weights]);

    // Token indices that are connected to the active one
    const connectedTokens = useMemo(() => {
        if (activeToken === null) return null;
        const set = new Set<number>();
        set.add(activeToken);
        for (const w of weights) {
            if (w.fromIndex === activeToken) set.add(w.toIndex);
            if (w.toIndex === activeToken) set.add(w.fromIndex);
        }
        return set;
    }, [activeToken, weights]);

    if (!isActive || tokens.length === 0) return null;

    return (
        <div className="w-full flex flex-col items-center">
            <svg
                width={WIDTH}
                height={HEIGHT}
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="overflow-visible"
            >
                {/* Arcs */}
                {weights.map((w, i) => {
                    const x1 = tokenX(w.fromIndex, tokens.length);
                    const x2 = tokenX(w.toIndex, tokens.length);
                    const color = strengthColor(w.strength);
                    const isHighlighted = connectedArcs === null || connectedArcs.has(i);
                    const opacity = connectedArcs === null
                        ? Math.max(0.3, w.strength)
                        : isHighlighted ? Math.max(0.5, w.strength) : 0.06;

                    return (
                        <g key={`arc-group-${i}`}>
                            <motion.path
                                id={`arc-${i}`}
                                d={arcPath(x1, x2)}
                                stroke={color}
                                strokeWidth={Math.max(1.5, w.strength * 5)}
                                fill="none"
                                strokeLinecap="round"
                                opacity={opacity}
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: 1,
                                    opacity
                                }}
                                transition={{
                                    pathLength: {
                                        duration: 1.0,
                                        delay: i * 0.2,
                                        ease: "easeOut"
                                    },
                                    opacity: { duration: 0.2 }
                                }}
                                style={{
                                    filter: isHighlighted && w.strength > 0.7
                                        ? `drop-shadow(0 0 6px ${color})`
                                        : "none"
                                }}
                            />
                            {/* Traveling Pulse for strong connections */}
                            {isActive && w.strength > 0.6 && (
                                <motion.circle
                                    r={3}
                                    fill={color}
                                    initial={{ offsetDistance: "0%" }}
                                    animate={{ offsetDistance: "100%" }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.2 + 0.5
                                    }}
                                    style={{
                                        offsetPath: `path('${arcPath(x1, x2)}')`,
                                        opacity: isHighlighted ? 1 : 0.1
                                    }}
                                />
                            )}
                        </g>
                    );
                })}

                {/* Token labels at bottom */}
                {tokens.map((token, i) => {
                    const x = tokenX(i, tokens.length);
                    const isDimmed = connectedTokens !== null && !connectedTokens.has(i);
                    const connectionCount = weights.filter(w => w.fromIndex === i || w.toIndex === i).length;

                    return (
                        <g key={`token-${i}`}>
                            {/* Hit area (invisible, larger for touch) */}
                            <rect
                                x={x - 22}
                                y={TOKEN_Y - 10}
                                width={44}
                                height={24}
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredToken(i)}
                                onMouseLeave={() => setHoveredToken(null)}
                                onClick={() => setSelectedToken(selectedToken === i ? null : i)}
                            />

                            {/* Token dot */}
                            <motion.circle
                                cx={x}
                                cy={TOKEN_Y}
                                r={activeToken === i ? 5 : 3}
                                fill={isDimmed ? "rgba(255,255,255,0.15)" : "rgb(45, 212, 191)"}
                                initial={{ r: 0 }}
                                animate={{ r: activeToken === i ? 5 : 3 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                style={{
                                    filter: activeToken === i
                                        ? "drop-shadow(0 0 6px rgb(45, 212, 191))"
                                        : "none"
                                }}
                            />

                            {/* Token text */}
                            <motion.text
                                x={x}
                                y={TOKEN_Y + 14}
                                textAnchor="middle"
                                fill={isDimmed ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)"}
                                fontSize={9}
                                fontFamily="monospace"
                                fontWeight={activeToken === i ? "bold" : "normal"}
                                initial={{ opacity: 0, y: TOKEN_Y + 20 }}
                                animate={{
                                    opacity: isDimmed ? 0.2 : 1,
                                    y: TOKEN_Y + 14
                                }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                className="cursor-pointer select-none"
                                onMouseEnter={() => setHoveredToken(i)}
                                onMouseLeave={() => setHoveredToken(null)}
                                onClick={() => setSelectedToken(selectedToken === i ? null : i)}
                            >
                                {token}
                            </motion.text>

                            {/* Strength badge on hover */}
                            <AnimatePresence>
                                {activeToken === i && connectionCount > 0 && (
                                    <motion.text
                                        x={x}
                                        y={TOKEN_Y - 16}
                                        textAnchor="middle"
                                        fill="rgb(45, 212, 191)"
                                        fontSize={8}
                                        fontFamily="monospace"
                                        initial={{ opacity: 0, y: TOKEN_Y - 10 }}
                                        animate={{ opacity: 1, y: TOKEN_Y - 16 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        {t('connections', { count: String(connectionCount) })}
                                    </motion.text>
                                )}
                            </AnimatePresence>
                        </g>
                    );
                })}

                {/* Strongest Connection Explanation Label */}
                <AnimatePresence>
                    {showExplanation && strongestConnection && activeToken === null && (
                        <motion.g
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Background pill */}
                            <rect
                                x={WIDTH / 2 - 70}
                                y={8}
                                width={140}
                                height={24}
                                rx={12}
                                fill="rgba(45, 212, 191, 0.15)"
                                stroke="rgba(45, 212, 191, 0.3)"
                                strokeWidth={1}
                            />
                            {/* Explanation text */}
                            <text
                                x={WIDTH / 2}
                                y={24}
                                textAnchor="middle"
                                fill="rgb(45, 212, 191)"
                                fontSize={9}
                                fontFamily="monospace"
                            >
                                {tAttn('strongestLink', {
                                    from: tokens[strongestConnection.fromIndex] || '?',
                                    to: tokens[strongestConnection.toIndex] || '?'
                                })}
                            </text>
                            {/* Strength indicator dots */}
                            <g transform={`translate(${WIDTH / 2 + 50}, 20)`}>
                                {[1, 2, 3].map(level => (
                                    <circle
                                        key={level}
                                        cx={level * 8}
                                        cy={0}
                                        r={3}
                                        fill={level <= strengthLevel(strongestConnection.strength)
                                            ? "rgb(45, 212, 191)"
                                            : "rgba(255,255,255,0.2)"
                                        }
                                    />
                                ))}
                            </g>
                        </motion.g>
                    )}
                </AnimatePresence>
            </svg>

            {/* Legend + Tap Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: weights.length * 0.15 + 0.5 }}
                className="mt-1 flex flex-col items-center gap-1"
            >
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-teal/40">
                    {t('thicknessLabel')}
                </span>
                {selectedToken === null && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] font-mono text-brand-teal/60"
                    >
                        {t('tapToSpotlight')}
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
}
