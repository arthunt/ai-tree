"use client";

import { motion } from 'framer-motion';

export function RootNetwork() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(165, 180, 252, 0)" />
                        <stop offset="50%" stopColor="rgba(165, 180, 252, 0.5)" />
                        <stop offset="100%" stopColor="rgba(165, 180, 252, 0)" />
                    </linearGradient>
                </defs>

                {/* Central Root */}
                <motion.path
                    d="M50,100 C50,80 45,70 50,50 C55,30 50,20 50,0"
                    fill="none"
                    stroke="url(#rootGradient)"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Branching Roots */}
                <motion.path
                    d="M50,80 C30,70 20,60 10,40"
                    fill="none"
                    stroke="url(#rootGradient)"
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.5, ease: "easeOut" }}
                />
                <motion.path
                    d="M50,80 C70,70 80,60 90,40"
                    fill="none"
                    stroke="url(#rootGradient)"
                    strokeWidth="0.3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2.5, delay: 0.7, ease: "easeOut" }}
                />

                {/* Subtle Fibers */}
                <motion.path
                    d="M50,60 C40,55 35,50 30,30"
                    fill="none"
                    stroke="url(#rootGradient)"
                    strokeWidth="0.1"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 1 }}
                />
                <motion.path
                    d="M50,60 C60,55 65,50 70,30"
                    fill="none"
                    stroke="url(#rootGradient)"
                    strokeWidth="0.1"
                    strokeDasharray="1 1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 1.2 }}
                />
            </svg>
        </div>
    );
}
