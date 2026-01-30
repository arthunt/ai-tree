"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, FileText, Sparkles, GraduationCap } from 'lucide-react';
import { TreeContentSimple } from '@/actions/getTreeContent';
import Link from 'next/link';

interface TreeDetailPanelProps {
    node: TreeContentSimple | null;
    onClose: () => void;
}

export function TreeDetailPanel({ node, onClose }: TreeDetailPanelProps) {
    if (!node) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-l border-gray-200 dark:border-gray-700 shadow-2xl z-50 p-6 overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400">
                        {node.type} NODE
                    </span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Close details"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Title & Description */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        {node.motif && (
                            <span className="text-2xl" role="img" aria-label="motif">
                                {node.motif === 'seed' ? '🌱' :
                                    node.motif === 'network' ? '🕸️' :
                                        node.motif === 'neuron' ? '🧠' : '✨'}
                            </span>
                        )}
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                            {node.title}
                        </h2>
                    </div>

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {node.description || "No description available yet."}
                    </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {node.year && (
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                <span>Introduced</span>
                            </div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {node.year}
                            </div>
                        </div>
                    )}

                    {node.paper && (
                        <div className="col-span-2 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
                                <FileText className="w-4 h-4" />
                                <span>Key Paper</span>
                            </div>
                            <div className="text-base font-medium text-gray-900 dark:text-white truncate">
                                "{node.paper}"
                            </div>
                        </div>
                    )}
                </div>

                {/* Swarm Marketing Integration (Placeholder) */}
                {/* Once Swarm maps nodes to programs, we'll conditionally render this block */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-500/30">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-white dark:bg-indigo-500/20 shadow-sm">
                            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400 mb-1">
                                Master This Skill
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                Want to learn how to prompt and fine-tune {node.title}?
                                Our **AIKI Program** covers this in Week 2.
                            </p>
                            <Link
                                href="/programs/aiki"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-white transition-colors"
                            >
                                View Program <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>

            </motion.div>

            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-40"
            />
        </AnimatePresence>
    );
}
