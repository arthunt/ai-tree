"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Brain, Zap, Crown } from 'lucide-react';
import Link from 'next/link';

interface ProgramHeroProps {
    title: string;
    tagline: string;
    description: string;
    price: string;
    color: string;
    programId: string;
    slug: string;
    onApply?: () => void;
}

export function ProgramHero({
    title,
    tagline,
    description,
    price,
    color,
    programId
}: ProgramHeroProps) {
    const Icons: Record<string, any> = {
        aiki: Brain,
        aivo: Zap,
        aime: Crown
    };

    const Icon = Icons[programId] || Brain;

    return (
        <div className="relative overflow-hidden py-24 sm:py-32">
            {/* Ambient Background */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 50% 0%, ${color}, transparent 70%)`
                }}
            />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                >
                    <Icon size={48} style={{ color }} />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6 tracking-tight"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-brand-beige/80 max-w-2xl mx-auto mb-10 font-light"
                >
                    {tagline}
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="#apply"
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full text-lg hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                        Apply Now
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                            Limited Spots
                        </span>
                    </Link>
                    <div className="text-white/60 text-sm">
                        Starting from <span className="text-white font-mono text-lg ml-1">{price}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
