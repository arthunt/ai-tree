"use client";

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Hammer, BookOpen, Compass } from 'lucide-react';
import { GlobalNav } from '@/components/GlobalNav';

function SeedPageContent({ params }: { params: { locale: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin') || 'unknown';
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    const paths = [
        {
            id: 'build',
            icon: Hammer,
            title: "I want to Build",
            desc: "Skip the theory. Show me the code.",
            color: "text-brand-cyan",
            bg: "bg-brand-cyan/10",
            border: "border-brand-cyan/20"
        },
        {
            id: 'teach',
            icon: BookOpen,
            title: "I want to Understand",
            desc: "Explain the concepts clearly.",
            color: "text-brand-teal",
            bg: "bg-brand-teal/10",
            border: "border-brand-teal/20"
        },
        {
            id: 'explore',
            icon: Compass,
            title: "I'm Exploring",
            desc: "Let me wander through the forest.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20"
        }
    ];

    const handleSelect = (pathId: string) => {
        setSelectedPath(pathId);

        // Short delay for animation
        setTimeout(() => {
            router.push(`/${params.locale}/tree-view?intent=${pathId}&origin=${origin}`);
        }, 800);
    };

    return (
        <div className="relative min-h-screen bg-void text-white overflow-hidden flex flex-col items-center justify-center p-6">
            <GlobalNav transparent />

            {/* Background Seed Pulse */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-96 h-96 bg-brand-teal/5 blur-[100px] rounded-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-4xl w-full"
            >
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                        className="w-24 h-24 mx-auto mb-8 relative"
                    >
                        {/* The Actual Seed SVG */}
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
                            <path d="M 50 10 Q 20 40 20 70 Q 20 95 50 95 Q 80 95 80 70 Q 80 40 50 10 Z" fill="var(--dna-t)" />
                        </svg>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Plant your Intent</h1>
                    <p className="text-xl text-gray-400">How would you like to grow?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paths.map((path, i) => (
                        <motion.div
                            key={path.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                        >
                            <button
                                onClick={() => handleSelect(path.id)}
                                className={`w-full text-left transition-all duration-500 transform
                                    ${selectedPath && selectedPath !== path.id ? 'opacity-50 scale-95 blur-[1px]' : ''}
                                    ${selectedPath === path.id ? 'scale-105 ring-2 ring-white/50' : 'hover:scale-105'}
                                `}
                            >
                                <GlassCard className={`p-8 h-full flex flex-col items-center text-center gap-4 ${path.bg} ${path.border} border`}>
                                    <div className={`p-4 rounded-full bg-black/20 ${path.color}`}>
                                        <path.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 text-white">{path.title}</h3>
                                        <p className="text-sm text-gray-400">{path.desc}</p>
                                    </div>
                                </GlassCard>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default function SeedPage({ params }: { params: { locale: string } }) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center text-brand-teal">Initializing Seed...</div>}>
            <SeedPageContent params={params} />
        </Suspense>
    );
}
