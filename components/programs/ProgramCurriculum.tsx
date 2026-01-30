"use client";

import { motion } from 'framer-motion';
import { ProgramCurriculum } from '@/lib/types';
import { Calendar, Clock } from 'lucide-react';

interface ProgramCurriculumProps {
    curriculum: ProgramCurriculum[];
    color: string;
}

export function ProgramCurriculumList({ curriculum, color }: ProgramCurriculumProps) {
    return (
        <div className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
                        Curriculum
                    </h2>
                    <p className="text-gray-400">Step-by-step to mastery</p>
                </div>

                <div className="space-y-4">
                    {curriculum.map((week, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
                        >
                            <div className="absolute left-0 top-0 w-1 h-full transition-all group-hover:h-full h-0" style={{ backgroundColor: color }} />

                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0 md:w-48 flex flex-col justify-center border-r border-white/5 pr-6">
                                    <span
                                        className="text-xs font-bold uppercase tracking-wider mb-1"
                                        style={{ color }}
                                    >
                                        Week {week.week_number}
                                    </span>
                                    <div className="flex items-center gap-2 text-white/50 text-sm mt-2">
                                        <Clock size={14} />
                                        <span>{week.hours}h</span>
                                        <span className="w-1 h-1 rounded-full bg-white/20" />
                                        <span className="capitalize">{week.type}</span>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {week.title}
                                    </h3>
                                    {week.subtitle && (
                                        <p className="text-sm text-gray-400 mb-4 italic">
                                            {week.subtitle}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {week.topics?.map((topic, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-black/30 rounded-full text-xs text-brand-beige/70 border border-white/5"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
