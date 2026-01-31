"use client";

import { motion } from 'framer-motion';
import { SproutCard } from './SproutCard';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { StageSelector } from '@/components/StageSelector';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useToast } from '@/lib/useToast';

interface SproutViewProps {
    content: any[];
    locale: string;
}

export function SproutView({ content, locale }: SproutViewProps) {
    const t = useTranslations();
    const { showToast } = useToast();

    const getLocalized = (json: any) => {
        return json?.[locale] || json?.['en'] || '';
    };

    const handleSearch = (query: string) => {
        showToast(
            "Sprout search coming soon",
            "info"
        );
    };

    return (
        <div className="min-h-screen relative pb-32 overflow-hidden">
            {/* Background Gradient (Dawn/Sunrise Theme - Transitional) */}
            {/* Moving from Data (Dark) to Light. Indigo/Violet to indicate early morning. */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 -z-10" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 -z-10" />

            {/* Header */}
            <header className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-bold tracking-widest uppercase mb-4">
                        {t('sprout.phaseLabel')}
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 mb-4 sm:mb-6">
                        {t('sprout.title')}
                    </h1>
                    <p className="text-sm sm:text-lg text-indigo-200/80 max-w-2xl mx-auto leading-relaxed">
                        {t('sprout.subtitle')}
                    </p>
                </motion.div>
            </header>

            {/* Masonry Grid */}
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {content.map((item, index) => (
                        <SproutCard
                            key={item.slug}
                            index={index}
                            title={getLocalized(item.title)}
                            description={getLocalized(item.description)}
                            analogy={getLocalized(item.analogy)}
                            visualType={item.visual_type}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Controls */}
            <StageSelector />
            <FloatingInput
                position="bottom"
                placeholder={t('sprout.inputPlaceholder') || "Ask about these concepts..."}
                onSubmit={handleSearch}
            />
        </div>
    );
}
