'use client';

import { motion } from 'framer-motion';

interface GlowingNodeProps {
    color?: string; // Hex code or CSS var
    size?: number;  // Pixel diameter
    glow?: boolean; // Whether to show the outer glow
    animate?: boolean; // Whether to breathe
    delay?: number; // Animation delay in seconds
    className?: string;
    fillOpacity?: number;
}

export function GlowingNode({
    color = '#25EDBA', // Default to Brand Teal
    size = 20,
    glow = true,
    animate = true,
    delay = 0,
    fillOpacity = 1,
    className = '',
}: GlowingNodeProps) {
    // SVG filter ID must be unique per instance if we were rigorous, 
    // but for simple glows a shared ID usually works or we can randomize it.
    // For simplicity here we use a static ID as the filter definition is generic.
    const filterId = 'node-glow-filter';

    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Shared Filter Definition */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodColor="#fff" floodOpacity="0.6" />
                        <feComposite in2="blur" operator="in" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                </defs>
            </svg>

            <motion.svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                initial={animate ? { opacity: 0.65, scale: 1 } : undefined}
                animate={animate ? { opacity: [0.65, 1, 0.65], scale: [1, 1.15, 1] } : undefined}
                transition={animate ? {
                    duration: 5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: delay
                } : undefined}
                className="overflow-visible"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={(size / 2) - 2} // Slight padding to prevent clipping
                    fill={color}
                    fillOpacity={fillOpacity}
                    filter={glow ? `url(#${filterId})` : undefined}
                />
            </motion.svg>
        </div>
    );
}
