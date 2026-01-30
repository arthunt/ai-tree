"use client";

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ProgramFeature } from '@/lib/types';

interface ProgramFeaturesProps {
    features: ProgramFeature[];
    color: string;
}

export function ProgramFeatures({ features, color }: ProgramFeaturesProps) {
    // Dynamic icon mapping
    const getIcon = (iconName: string) => {
        // @ts-ignore
        const Icon = Icons[iconName] || Icons.Star;
        return Icon;
    };

    return (
        <div className="py-20 bg-black/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = getIcon(feature.icon);

                        return (
                            <motion.div
                                key={feature.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all group"
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-white/10"
                                    style={{ color }}
                                >
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
