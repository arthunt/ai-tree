"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { STAGES } from '@/lib/stages';

interface EvolutionTimelineProps {
    locale: string;
}

export function EvolutionTimeline({ locale }: EvolutionTimelineProps) {
    return (
        <div className="w-full py-12">
            {/* Mobile: Vertical List / Desktop: Horizontal Timeline */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">

                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-brand-teal/50 via-blue-500/30 to-purple-500/30 -z-10" />

                {STAGES.map((stage, index) => {
                    const Icon = stage.icon;
                    return (
                        <Link
                            key={stage.id}
                            href={`/${locale}${stage.href}`}
                            className="group relative flex flex-col items-center gap-3 w-full md:w-auto"
                        >
                            {/* Icon Container */}
                            <motion.div
                                whileHover={{ scale: 1.1, y: -5 }}
                                className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md transition-all duration-300",
                                    stage.bg,
                                    stage.color,
                                    "group-hover:border-white/30 group-hover:shadow-xl"
                                )}
                            >
                                <Icon size={32} />

                                {/* Hover Glow */}
                                <div className={cn(
                                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                                    stage.bg
                                )} />
                            </motion.div>

                            {/* Labels */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-white group-hover:text-brand-teal transition-colors">
                                    {stage.label}
                                </h3>
                                <div className="flex items-center gap-1 justify-center text-xs uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">
                                    <span>{stage.sub}</span>
                                    <ArrowRight size={10} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                                </div>
                            </div>

                            {/* Connector (Mobile) */}
                            {index < STAGES.length - 1 && (
                                <div className="md:hidden w-0.5 h-8 bg-white/10 my-2" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
