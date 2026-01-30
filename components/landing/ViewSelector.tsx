'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Network, Dna } from 'lucide-react';
import Link from 'next/link';

interface ViewSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
}

export function ViewSelector({ isOpen, onClose, locale }: ViewSelectorProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-2xl"
                >
                    <GlassCard className="p-8 md:p-12 border-white/10 bg-gray-900/90" intensity="high">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-white mb-3">Choose Your Path</h2>
                            <p className="text-gray-400">How do you want to explore AI today?</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* DNA View Option */}
                            <Link
                                href={`/${locale}/dna`}
                                onClick={onClose}
                                className="group relative flex flex-col items-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand-teal/50 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-brand-teal/20 flex items-center justify-center mb-4 text-brand-teal group-hover:scale-110 transition-transform">
                                    <Dna size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The DNA</h3>
                                <p className="text-sm text-gray-400 text-center mb-4">
                                    Quick Overview (5 min)<br />
                                    Understand the core mechanism.
                                </p>
                                <span className="text-xs font-mono text-brand-teal uppercase tracking-widest border border-brand-teal/30 px-3 py-1 rounded-full">
                                    Recommended Start
                                </span>
                            </Link>

                            {/* Tree View Option */}
                            <button
                                onClick={onClose}
                                className="group relative flex flex-col items-center p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                                    <Network size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Tree</h3>
                                <p className="text-sm text-gray-400 text-center mb-4">
                                    Full Exploration (15+ min)<br />
                                    Deep dive into all concepts.
                                </p>
                                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest border border-blue-400/30 px-3 py-1 rounded-full">
                                    Deep Dive
                                </span>
                            </button>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
