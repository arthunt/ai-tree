"use client";

import { TreeContentSimple } from '@/actions/getTreeContent';
import { motion } from 'framer-motion';
import { LevelIcon } from '@/components/LevelIcon';
import { cn } from '@/lib/utils';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

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
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => onNodeClick?.(item)}
                                    className={cn(
                                        "flex flex-col items-start p-5 rounded-xl text-left transition-all duration-300",
                                        "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
                                        "hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 hover:-translate-y-1",
                                        "group relative overflow-hidden"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full mb-3">
                                        <span className={cn(
                                            "px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider",
                                            item.type === 'trunk' ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                                                item.type === 'branch' ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                                    item.type === 'leaf' ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" :
                                                        "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                        )}>
                                            {t('conceptLevels.' + (TYPE_TO_LEVEL[item.type] || item.type) + '.name')}
                                        </span>
                                    </div>

                                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h4>

                                    {/* Hover Arrow */}
                                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                        →
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
