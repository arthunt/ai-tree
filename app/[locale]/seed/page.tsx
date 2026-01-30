"use client";

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { GlobalNav } from '@/components/GlobalNav';

const PATHS = [
    {
        key: 'builder' as const,
        icon: '🔨',
        gradient: 'from-brand-teal to-emerald-400',
        glow: 'brand-teal',
        href: '/tree-view?focus=branches',
    },
    {
        key: 'thinker' as const,
        icon: '🧠',
        gradient: 'from-purple-400 to-indigo-400',
        glow: 'purple-400',
        href: '/dna',
    },
    {
        key: 'explorer' as const,
        icon: '🌍',
        gradient: 'from-brand-cyan to-blue-400',
        glow: 'brand-cyan',
        href: '/tree-view',
    },
];

function SeedPageContent() {
    const params = useParams();
    const locale = params.locale as string;
    const router = useRouter();
    const t = useTranslations('dna.seedPath');
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    const handleSelect = (path: typeof PATHS[number]) => {
        setSelectedPath(path.key);
        setTimeout(() => {
            router.push(`/${locale}${path.href}`);
        }, 600);
    };

    return (
        <div className="relative min-h-screen w-full bg-void overflow-hidden text-white flex flex-col items-center justify-center">
            <GlobalNav transparent />

            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 blur-[180px] rounded-full" />
            </div>

            {/* Pulsing Seed */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 1.2 }}
                className="relative z-10 mb-16"
            >
                <div className="relative">
                    {/* Outer glow ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-[-30px] rounded-full bg-brand-teal/20 blur-xl"
                    />
                    {/* Inner glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-[-10px] rounded-full bg-brand-teal/30 blur-md"
                    />
                    {/* The seed */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-teal via-emerald-300 to-brand-cyan flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.3)]"
                    >
                        <span className="text-4xl select-none">🌱</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative z-10 text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-brand-teal via-white to-brand-cyan">
                    {t('title')}
                </h1>
                <p className="text-lg text-gray-400">{t('subtitle')}</p>
            </motion.div>

            {/* Path Choices */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative z-10 flex flex-col sm:flex-row gap-6 px-4 w-full max-w-3xl"
            >
                {PATHS.map((path, i) => (
                    <motion.button
                        key={path.key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + i * 0.15 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelect(path)}
                        className={`flex-1 group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all cursor-pointer
                            ${selectedPath && selectedPath !== path.key ? 'opacity-40 scale-95 blur-[1px]' : ''}
                            ${selectedPath === path.key ? 'ring-2 ring-white/50 scale-105' : ''}
                        `}
                    >
                        {/* Hover glow */}
                        <div className={`absolute inset-0 bg-${path.glow}/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl`} />

                        <div className="relative z-10">
                            <span className="text-4xl mb-4 block">{path.icon}</span>
                            <h3 className={`text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${path.gradient}`}>
                                {t(`${path.key}.label`)}
                            </h3>
                            <p className="text-sm text-gray-400">
                                {t(`${path.key}.description`)}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}

export default function SeedPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-void flex items-center justify-center text-brand-teal">...</div>}>
            <SeedPageContent />
        </Suspense>
    );
}
