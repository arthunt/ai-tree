"use client";

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { GlobalNav } from '@/components/GlobalNav';
import { motion } from 'framer-motion';

export default function SaplingView() {
    const t = useTranslations('sprout'); // Using Sprout translations temporarily or add new namespace

    return (
        <div className="min-h-screen bg-emerald-950 text-white selection:bg-emerald-500/30">
            <GlobalNav />

            <main className="pt-24 pb-24 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6"
                >
                    <div className="w-24 h-24 mx-auto bg-emerald-900/50 rounded-full flex items-center justify-center border border-emerald-500/30 shadow-2xl shadow-emerald-900/50">
                        <span className="text-4xl">🌱</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                        Sapling
                    </h1>

                    <p className="text-xl text-emerald-100/70 max-w-2xl mx-auto">
                        Guided Practice & Nursery Stage
                    </p>

                    <div className="inline-block px-6 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/20 text-emerald-300 text-sm font-medium">
                        Coming Soon
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
