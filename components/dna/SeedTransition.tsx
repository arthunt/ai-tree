"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface SeedTransitionProps {
    color: string;
    conceptId: string;
    locale: string;
    onComplete?: () => void;
}

export function SeedTransition({ color, conceptId, locale, onComplete }: SeedTransitionProps) {
    const router = useRouter();
    const t = useTranslations('dna.seed');

    useEffect(() => {
        // Navigate after animation completes
        const timer = setTimeout(() => {
            router.push(`/${locale}/seed?origin=${conceptId}`);
            onComplete?.();
        }, 1500);

        return () => clearTimeout(timer);
    }, [router, locale, conceptId, onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 backdrop-blur-sm"
            >
                {/* Card to Seed Morph */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Stage 1: Card zooms to center (0-0.3s) */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: [0.5, 1, 1, 0.5],
                            opacity: [0, 1, 1, 0],
                            borderRadius: ['1rem', '1rem', '50%', '50%'],
                        }}
                        transition={{
                            duration: 1.5,
                            times: [0, 0.2, 0.6, 1],
                            ease: "easeInOut"
                        }}
                        className="absolute w-64 h-64 flex items-center justify-center"
                        style={{
                            background: `radial-gradient(circle, ${color}40, transparent)`,
                            border: `2px solid ${color}`,
                        }}
                    >
                        {/* Stage 2: Morph to seed (0.3-0.7s) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{
                                scale: [0, 1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                times: [0, 0.4, 0.7, 0.8],
                                ease: "easeOut"
                            }}
                        >
                            {/* Seed SVG - teardrop shape */}
                            <svg
                                width="120"
                                height="150"
                                viewBox="0 0 120 150"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Teardrop/seed shape */}
                                <motion.path
                                    d="M 60 10 Q 20 40 20 80 Q 20 120 60 140 Q 100 120 100 80 Q 100 40 60 10 Z"
                                    fill={color}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0, 1, 1, 1],
                                        scale: [0, 1, 1, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        times: [0, 0.3, 0.8, 1],
                                    }}
                                />

                                {/* Inner glow pulse */}
                                <motion.circle
                                    cx="60"
                                    cy="75"
                                    r="30"
                                    fill={color}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0, 0.6, 0.3, 0.6, 0],
                                        scale: [0.8, 1, 0.9, 1, 1.2],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        times: [0, 0.3, 0.5, 0.7, 1],
                                        ease: "easeInOut"
                                    }}
                                    style={{ filter: 'blur(15px)' }}
                                />

                                {/* Seed detail line */}
                                <motion.path
                                    d="M 60 10 Q 60 40 60 75"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeOpacity="0.4"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: [0, 1, 1, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        times: [0, 0.5, 0.8, 1],
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* Stage 3: Upward shoot effect (1.2-1.5s) */}
                    <motion.div
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: [0, 0, -200],
                            opacity: [0, 0, 1, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            times: [0, 0.8, 0.9, 1],
                            ease: "easeIn"
                        }}
                        className="absolute"
                    >
                        <div
                            className="w-2 h-32 rounded-full"
                            style={{
                                background: `linear-gradient(to top, ${color}, transparent)`,
                                filter: 'blur(2px)',
                            }}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
                        transition={{
                            duration: 1.5,
                            times: [0, 0.2, 0.8, 1],
                        }}
                        className="absolute bottom-1/4 text-center"
                    >
                        <p className="text-xl md:text-2xl font-light tracking-wider text-white/90">
                            {t('growing')}
                        </p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0, 0.6, 0.6, 0] }}
                            transition={{
                                duration: 1.5,
                                times: [0, 0.3, 0.5, 0.8, 1],
                            }}
                            className="text-sm text-white/60 mt-2"
                        >
                            {t('exploring')}
                        </motion.p>
                    </motion.div>

                    {/* Ambient particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.6, 0],
                                x: [0, (Math.cos(i * Math.PI / 4) * 100)],
                                y: [0, (Math.sin(i * Math.PI / 4) * 100)],
                            }}
                            transition={{
                                duration: 1.2,
                                delay: 0.3 + (i * 0.05),
                                ease: "easeOut"
                            }}
                            className="absolute w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: color,
                                filter: 'blur(1px)',
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
