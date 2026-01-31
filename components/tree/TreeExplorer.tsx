"use client";

import { useState } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { TreeContentSimple } from '@/actions/getTreeContent';
import { TreeVisualization } from './TreeVisualization';
import { TreeGrid } from './TreeGrid';
import { LayoutGrid, Network, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeExplorerProps {
    data: TreeContentSimple[];
    onNodeClick?: (node: TreeContentSimple) => void;
    intent?: string | null;
}

type ViewMode = 'map' | 'grid';

export function TreeExplorer({ data, onNodeClick, intent }: TreeExplorerProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('map');

    // We can add simple translation keys later, hardcoded for now or reuse existing
    const tMap = "Map"; // t('view.map')
    const tGrid = "Grid"; // t('view.grid')

    return (
        <div className="w-full flex flex-col gap-6">
            {/* View Switcher Tabs */}
            <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex gap-1 shadow-inner">
                    <button
                        onClick={() => setViewMode('map')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            viewMode === 'map'
                                ? "bg-white dark:bg-gray-700 text-brand-teal shadow-sm"
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        )}
                    >
                        <Network size={16} />
                        <span>Map</span>
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            viewMode === 'grid'
                                ? "bg-white dark:bg-gray-700 text-brand-teal shadow-sm"
                                : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                        )}
                    >
                        <LayoutGrid size={16} />
                        <span>Grid</span>
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative min-h-[600px] w-full">
                <AnimatePresence mode="wait">
                    {viewMode === 'map' ? (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <TreeVisualization data={data} onNodeClick={onNodeClick} intent={intent} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <TreeGrid data={data} onNodeClick={onNodeClick} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
