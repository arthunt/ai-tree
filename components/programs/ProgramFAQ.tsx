"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { ProgramFAQ } from '@/lib/types';

interface ProgramFAQListProps {
    faq: ProgramFAQ[];
}

export function ProgramFAQList({ faq }: ProgramFAQListProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="py-20 bg-zinc-950">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-white mb-12">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faq.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-white/5 border border-white/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold text-white">{item.question}</span>
                                {openIndex === index ? (
                                    <Minus size={20} className="text-gray-400" />
                                ) : (
                                    <Plus size={20} className="text-gray-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
