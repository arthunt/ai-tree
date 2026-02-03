"use client";

import { TreeContentSimple } from '@/actions/getTreeContent';
import { motion } from 'framer-motion';
import { LevelIcon } from '@/components/LevelIcon';
import { cn } from '@/lib/utils';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { UnifiedConceptCard } from '@/components/ui/UnifiedConceptCard';

interface TreeGridProps {
    data: TreeContentSimple[];
    onNodeClick?: (node: TreeContentSimple) => void;
}

const LEVELS = ['roots', 'trunk', 'branches', 'leaves'];

const TYPE_TO_LEVEL: Record<string, string> = {
    root: 'roots',
    trunk: 'trunk',
    branch: 'branches',
    leaf: 'leaves',
};

export function TreeGrid({ data, onNodeClick }: TreeGridProps) {
    const t = useTranslations();
    if (!data.length) return null;

    // Group contents by Level
    const groupedData = LEVELS.reduce((acc, level) => {
        acc[level] = data.filter(item => {
            // Infer level from type or hierarchy? 
            // The Simple Content might not have 'level' explicit property other than type?
            // Let's assume 'type' maps to level roughly: root->roots, trunk->trunk, etc.
            // Or we check the data structure. 'type' is 'root', 'trunk', 'branch', 'leaf'.
            if (level === 'roots') return item.type === 'root';
            if (level === 'trunk') return item.type === 'trunk';
            if (level === 'branches') return item.type === 'branch';
            if (level === 'leaves') return item.type === 'leaf';
            return false;
        });
        return acc;
    }, {} as Record<string, TreeContentSimple[]>);

    return (
        <div className="w-full space-y-12 py-8">
            {LEVELS.map((level) => {
                const items = groupedData[level];
                if (!items?.length) return null;

                return (
                    <section key={level} className="space-y-6">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <LevelIcon level={level as any} size={28} />
                            <h3 className="text-xl font-bold capitalize text-gray-900 dark:text-white">
                                {t('conceptLevels.' + level + '.name')}
                            </h3>
                            <span className="text-sm text-gray-500 font-mono">
                                ({items.length})
                            </span>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="h-full"
                                >
                                    <UnifiedConceptCard
                                        variant="tree"
                                        title={item.title}
                                        index={index}
                                        description={t('conceptLevels.' + (TYPE_TO_LEVEL[item.type] || item.type) + '.name')} // Using type name as subtitle/description
                                        onCardClick={() => onNodeClick?.(item)}
                                        visualSlot={
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                                <LevelIcon level={TYPE_TO_LEVEL[item.type] as any || 'leaves'} size={80} />
                                            </div>
                                        }
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
