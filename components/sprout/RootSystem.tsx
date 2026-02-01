"use client";

import { motion } from 'framer-motion';

interface RootSystemProps {
    growthLevel: number; // 0 to 100
}

export function RootSystem({ growthLevel }: RootSystemProps) {
    // Normalize growth segments
    const phase1 = Math.min(Math.max(growthLevel / 33, 0), 1); // Central Root
    const phase2 = Math.min(Math.max((growthLevel - 33) / 33, 0), 1); // Branches
    const phase3 = Math.min(Math.max((growthLevel - 66) / 34, 0), 1); // Fibers

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
            <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="rootGradientDynamic" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(165, 180, 252, 0)" />
                        <stop offset="50%" stopColor="rgba(165, 180, 252, 0.6)" />
                        <stop offset="100%" stopColor="rgba(165, 180, 252, 0.1)" />
                    </linearGradient>
                </defs>

                {/* Phase 1: Central Root (0-33%) */}
                <motion.path
                    d="M50,100 C50,80 45,70 50,50 C55,30 50,20 50,0"
                    fill="none"
                    stroke="url(#rootGradientDynamic)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Phase 2: Branching Roots (33-66%) */}
                <motion.path
                    d="M50,80 C30,70 20,60 10,40"
                    fill="none"
                    stroke="url(#rootGradientDynamic)"
                    strokeWidth="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                    d="M50,80 C70,70 80,60 90,40"
                    fill="none"
                    stroke="url(#rootGradientDynamic)"
                    strokeWidth="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase2 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Phase 3: Subtle Fibers (66-100%) */}
                <motion.path
                    d="M50,60 C40,55 35,50 30,30"
                    fill="none"
                    stroke="url(#rootGradientDynamic)"
                    strokeWidth="0.2"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                    d="M50,60 C60,55 65,50 70,30"
                    fill="none"
                    stroke="url(#rootGradientDynamic)"
                    strokeWidth="0.2"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: phase3 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </svg>
        </div>
    );
}
