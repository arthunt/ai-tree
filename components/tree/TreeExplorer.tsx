"use client";

import { useState, lazy, Suspense } from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { TreeContentSimple } from '@/actions/getTreeContent';
import { TreeGrid } from './TreeGrid';

const TreeVisualization = lazy(() => import('./TreeVisualization').then(m => ({ default: m.TreeVisualization })));
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
    const t = useTranslations();
    const [viewMode, setViewMode] = useState<ViewMode>('map');

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
                        <span>{t('treeExplorer.map')}</span>
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
                        <span>{t('treeExplorer.grid')}</span>
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
                            <Suspense fallback={<div className="w-full h-[500px] sm:h-[700px] bg-void/50 border border-white/10 rounded-xl flex items-center justify-center"><span className="text-white/40 text-sm font-mono animate-pulse">Loading map...</span></div>}>
                                <TreeVisualization data={data} onNodeClick={onNodeClick} intent={intent} />
                            </Suspense>
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
