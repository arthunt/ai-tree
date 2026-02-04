"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

/**
 * VectorMap — US-160 Task 1.2
 *
 * A 2D SVG plot showing tokens as points in "meaning space".
 * Key concept: "Meaning is Distance."
 *
 * - Points animate from center [0.5, 0.5] to their target positions
 * - Faint grid lines reinforce the "Coordinate System" metaphor
 * - Hover reveals the token word
 * - Semantically similar words cluster together (King/Queen close, Banana far)
 */

interface VectorMapProps {
    tokens: string[];
    vectors: number[][];
    isActive: boolean;
}

const SIZE = 280;
const PADDING = 28;
const INNER = SIZE - PADDING * 2;
const CENTER_X = SIZE / 2;
const CENTER_Y = SIZE / 2;

// Map a 0-1 value to SVG coordinate space
function toSvg(val: number): number {
    return PADDING + val * INNER;
}

// Assign a color based on vector position (cluster visualization)
function pointColor(x: number, y: number): string {
    // Top-right cluster = royalty (gold)
    if (x > 0.6 && y > 0.6) return "#fbbf24";
    // Bottom-left cluster = nature (green)
    if (x < 0.4 && y < 0.4) return "#34d399";
    // Bottom-right cluster = AI (cyan)
    if (x > 0.6 && y < 0.4) return "#22d3ee";
    // Default = white
    return "#a3a3a3";
}

export function VectorMap({ tokens, vectors, isActive }: VectorMapProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const t = useTranslations('dna.visualization');

    // Active index: selected (tap) takes priority over hovered (mouse)
    const activeIndex = selectedIndex ?? hoveredIndex;

    if (!isActive || vectors.length === 0) return null;

    return (
        <div className="w-full flex flex-col items-center">
            <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="overflow-visible"
            >
                {/* Background */}
                <rect
                    x={PADDING}
                    y={PADDING}
                    width={INNER}
                    height={INNER}
                    fill="rgba(255,255,255,0.02)"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={0.5}
                    rx={4}
                    onClick={() => setSelectedIndex(null)}
                />

                {/* Grid lines */}
                {[0.25, 0.5, 0.75].map((v) => (
                    <g key={v}>
                        {/* Vertical */}
                        <line
                            x1={toSvg(v)}
                            y1={PADDING}
                            x2={toSvg(v)}
                            y2={SIZE - PADDING}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth={0.5}
                            strokeDasharray="4 4"
                        />
                        {/* Horizontal */}
                        <line
                            x1={PADDING}
                            y1={toSvg(v)}
                            x2={SIZE - PADDING}
                            y2={toSvg(v)}
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth={0.5}
                            strokeDasharray="4 4"
                        />
                    </g>
                ))}

                {/* Axis labels */}
                <text
                    x={SIZE / 2}
                    y={SIZE - 4}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize={8}
                    fontFamily="monospace"
                >
                    {t('dimension1')}
                </text>
                <text
                    x={6}
                    y={SIZE / 2}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize={8}
                    fontFamily="monospace"
                    transform={`rotate(-90, 6, ${SIZE / 2})`}
                >
                    {t('dimension2')}
                </text>

                {/* Distance line between active point and nearest neighbor */}
                {activeIndex !== null && vectors.length > 1 && (() => {
                    const hv = vectors[activeIndex];
                    let nearestIdx = -1;
                    let nearestDist = Infinity;
                    vectors.forEach((v, i) => {
                        if (i === activeIndex) return;
                        const d = Math.sqrt((v[0] - hv[0]) ** 2 + (v[1] - hv[1]) ** 2);
                        if (d < nearestDist) {
                            nearestDist = d;
                            nearestIdx = i;
                        }
                    });
                    if (nearestIdx < 0) return null;
                    const nv = vectors[nearestIdx];
                    return (
                        <g>
                            {/* Neighbor Highlight Ring */}
                            <motion.circle
                                cx={toSvg(nv[0])}
                                cy={toSvg(1 - nv[1])}
                                r={10}
                                fill="none"
                                stroke="rgba(45, 212, 191, 0.4)"
                                strokeWidth={2}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                            {/* Connection Line */}
                            <motion.line
                                x1={toSvg(hv[0])}
                                y1={toSvg(1 - hv[1])}
                                x2={toSvg(nv[0])}
                                y2={toSvg(1 - nv[1])}
                                stroke="rgb(45, 212, 191)"
                                strokeWidth={2.5}
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0.5 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </g>
                    );
                })()}

                {/* Data points */}
                {vectors.map((v, i) => {
                    const tx = toSvg(v[0]);
                    // Flip Y so high values are at top
                    const ty = toSvg(1 - v[1]);
                    const color = pointColor(v[0], v[1]);
                    const isHighlighted = activeIndex === i;

                    return (
                        <g key={i}>
                            {/* Glow ring on hover/select */}
                            {isHighlighted && (
                                <motion.circle
                                    cx={tx}
                                    cy={ty}
                                    r={14}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={1}
                                    opacity={0.3}
                                    initial={{ r: 6, opacity: 0 }}
                                    animate={{ r: 14, opacity: 0.3 }}
                                />
                            )}

                            {/* The point */}
                            <motion.circle
                                cx={tx}
                                cy={ty}
                                r={isHighlighted ? 6 : 4.5}
                                fill={color}
                                opacity={isHighlighted ? 1 : 0.85}
                                initial={{ cx: CENTER_X, cy: CENTER_Y, r: 0, opacity: 0 }}
                                animate={{
                                    cx: tx,
                                    cy: ty,
                                    r: isHighlighted ? 6 : 4.5,
                                    opacity: isHighlighted ? 1 : 0.85
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 14,
                                    delay: i * 0.4 // Slower one-by-one appearance
                                }}
                                style={{
                                    filter: isHighlighted
                                        ? `drop-shadow(0 0 6px ${color})`
                                        : `drop-shadow(0 0 3px ${color})`,
                                    cursor: "pointer"
                                }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
                            />

                            {/* Token label - Persistent */}
                            <motion.g
                                initial={{ opacity: 0, y: 4 }}
                                animate={{
                                    opacity: isHighlighted ? 1 : 0.7,
                                    y: 0,
                                    scale: isHighlighted ? 1.1 : 1
                                }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                            >
                                {/* Label background (only active) */}
                                {isHighlighted && (
                                    <rect
                                        x={tx - 24}
                                        y={ty - 24}
                                        width={48}
                                        height={16}
                                        rx={4}
                                        fill="rgba(0,0,0,0.8)"
                                        stroke={color}
                                        strokeWidth={0.5}
                                    />
                                )}
                                <text
                                    x={tx}
                                    y={isHighlighted ? ty - 13 : ty + 12}
                                    textAnchor="middle"
                                    fill={isHighlighted ? "white" : "rgba(255,255,255,0.6)"}
                                    fontSize={isHighlighted ? 10 : 9}
                                    fontFamily="monospace"
                                    fontWeight={isHighlighted ? "bold" : "normal"}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {tokens[i]}
                                </text>
                            </motion.g>
                        </g>
                    );
                })}
            </svg>

            {/* "Meaning is Distance" label */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: vectors.length * 0.1 + 0.3 }}
                className="mt-1 text-[10px] font-mono uppercase tracking-widest text-brand-teal/40"
            >
                {t('meaningDistance')}
            </motion.div>
        </div>
    );
}
