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

const WIDTH = 380; // Increased width for better padding
const HEIGHT = 240;
const TOKEN_Y = 40;
const MIN_ARC_HEIGHT = 40;
const LABEL_SHOW_DELAY = 1500;

function tokenX(index: number, total: number): number {
    if (total <= 1) return WIDTH / 2;
    const pad = 50; // More horizontal padding (NEW-5)
    const usable = WIDTH - pad * 2;
    return pad + (index / (total - 1)) * usable;
}

function arcPath(x1: number, x2: number): string {
    const midX = (x1 + x2) / 2;
    const dist = Math.abs(x1 - x2);
    // Taller arcs for stronger connections
    const arcH = Math.min(MIN_ARC_HEIGHT + dist * 0.6, 120);
    const cy = TOKEN_Y + arcH; // Curve DOWN (NEW-3)
    return `M ${x1} ${TOKEN_Y} Q ${midX} ${cy} ${x2} ${TOKEN_Y}`;
}

function strengthColor(s: number): string {
    if (s >= 0.8) return "#2DD4BF";    // brand-teal-400
    if (s >= 0.5) return "#22D3EE";    // brand-cyan
    return "#94A3B8";                  // slate-400
}

// Strength level indicator (universal across cultures)
function StrengthIndicator({ strength }: { strength: number }) {
    const bars = 4;
    return (
        <div className="flex gap-0.5 items-end h-3">
            {[...Array(bars)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 rounded-sm ${i / bars < strength ? 'bg-brand-teal' : 'bg-white/10'}`}
                    style={{ height: `${(i + 1) * 25}%` }}
                />
            ))}
        </div>
    );
}

export function AttentionSpotlight({ tokens, weights, isActive }: AttentionSpotlightProps) {
    const t = useTranslations('dna.nav');
    const tAttn = useTranslations('dna.attention');
    const [hoveredToken, setHoveredToken] = useState<number | null>(null);
    const [selectedToken, setSelectedToken] = useState<number | null>(null);

    // Auto-play attention "flashlight" (NEW: improved logic)
    const [demoIndex, setDemoIndex] = useState(0);
    const [isDemoActive, setIsDemoActive] = useState(true);

    const activeToken = selectedToken ?? hoveredToken ?? (isDemoActive ? demoIndex : null);

    // Filter weights relevant to current active token
    const activeWeights = useMemo(() => {
        if (activeToken === null) return [];
        return weights.filter(w => w.fromIndex === activeToken || w.toIndex === activeToken);
    }, [activeToken, weights]);

    // Derived: Strongest connection for the tooltip
    const strongest = activeWeights.length > 0 ? activeWeights.sort((a, b) => b.strength - a.strength)[0] : null;

    useEffect(() => {
        if (!isActive) {
            setDemoIndex(0);
            return;
        }

        // Disable demo on interaction
        if (hoveredToken !== null || selectedToken !== null) {
            setIsDemoActive(false);
        }
    }, [isActive, hoveredToken, selectedToken]);

    // Demo loop
    useEffect(() => {
        if (!isActive || !isDemoActive) return;
        const interval = setInterval(() => {
            setDemoIndex(prev => (prev + 1) % tokens.length);
        }, 2200);
        return () => clearInterval(interval);
    }, [isActive, isDemoActive, tokens.length]);


    if (!isActive) return null;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative">
                <svg
                    width={WIDTH}
                    height={HEIGHT}
                    className="overflow-visible"
                    style={{ pointerEvents: 'none' }}
                >
                    {/* Arcs Layer */}
                    <AnimatePresence>
                        {activeWeights.map((w, i) => {
                            const x1 = tokenX(w.fromIndex, tokens.length);
                            const x2 = tokenX(w.toIndex, tokens.length);
                            const color = strengthColor(w.strength);

                            return (
                                <g key={`${w.fromIndex}-${w.toIndex}`}>
                                    <motion.path
                                        d={arcPath(x1, x2)}
                                        fill="none"
                                        stroke={color}
                                        strokeWidth={w.strength >= 0.8 ? 5 : w.strength >= 0.5 ? 3 : 1.5} // Varied thickness (Expert Review)
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.8 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    {/* Pulse */}
                                    {w.strength > 0.6 && (
                                        <motion.circle
                                            r={3}
                                            fill={color}
                                            initial={{ offsetDistance: "0%" }}
                                            animate={{ offsetDistance: "100%" }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{ offsetPath: `path("${arcPath(x1, x2)}")` }}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </AnimatePresence>

                    {/* Tokens Layer */}
                    {tokens.map((token, i) => {
                        const x = tokenX(i, tokens.length);
                        const isDimmed = activeToken !== null && activeToken !== i && !activeWeights.some(w => w.fromIndex === i || w.toIndex === i);

                        return (
                            <g key={i} style={{ pointerEvents: 'auto' }}>
                                {/* Hit area */}
                                <rect
                                    x={x - 24}
                                    y={0}
                                    width={48}
                                    height={80}
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
                                    r={activeToken === i ? 6 : 4}
                                    fill={isDimmed ? "rgba(255,255,255,0.15)" : "#2DD4BF"}
                                    initial={{ r: 0 }}
                                    animate={{ r: activeToken === i ? 6 : 4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    style={{
                                        filter: activeToken === i ? "drop-shadow(0 0 8px #2DD4BF)" : "none"
                                    }}
                                />

                                {/* Token text - ABOVE the dot (NEW-3) */}
                                <text
                                    x={x}
                                    y={TOKEN_Y - 16}
                                    textAnchor="middle"
                                    fill={isDimmed ? "rgba(255,255,255,0.3)" : "#FFFFFF"}
                                    fontSize={14} // Larger (NEW-5)
                                    fontFamily="monospace"
                                    fontWeight={activeToken === i ? "bold" : "500"}
                                    className="cursor-pointer select-none"
                                >
                                    {token}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Explanation Tooltip: Floating IN THE MIDDLE of arcs */}
                <AnimatePresence>
                    {strongest && activeToken !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute left-1/2 -translate-x-1/2 top-[120px] flex justify-center pointer-events-none z-10"
                        >
                            <div className="bg-slate-900/95 border border-brand-teal/30 backdrop-blur-md rounded-xl p-3 shadow-2xl w-auto whitespace-nowrap">
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <div className="text-[10px] uppercase tracking-wider text-brand-teal/80 font-bold">
                                        TUGEVAIM SEOS
                                    </div>
                                    <StrengthIndicator strength={strongest.strength} />
                                </div>

                                <div className="flex items-center justify-center gap-2 text-sm text-white font-medium">
                                    <span className="text-white/70">{tokens[strongest.fromIndex]}</span>
                                    <span className="text-brand-teal">↔</span>
                                    <span className="text-white font-bold">{tokens[strongest.toIndex]}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-1 text-[10px] font-mono text-white/30 uppercase tracking-widest text-center">
                PAKSUS = OLULISUS
            </div>
        </div>
    );
}
