'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TreeDiagramSkeleton } from '@/components/TreeDiagramSkeleton';
import { NameToggle } from '@/components/NameToggle';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';
import { useParams, useSearchParams } from 'next/navigation';
import { getTreeContent, TreeContentSimple } from '@/actions/getTreeContent';
import { GlobalNav } from '@/components/GlobalNav';
import { StageSelector } from '@/components/StageSelector';
import { TreeExplorer } from '@/components/tree/TreeExplorer';
import { TreeDetailPanel } from '@/components/tree/TreeDetailPanel';


interface TreeViewContentProps {
    initialData: TreeContentSimple[];
}

export function TreeViewContent({ initialData }: TreeViewContentProps) {
    const [selectedNode, setSelectedNode] = useState<TreeContentSimple | null>(null);
    const [showSimpleNames, setShowSimpleNames] = useState(true);
    const t = useTranslations();
    const searchParams = useSearchParams();
    const targetNodeId = searchParams.get('node');

    // Use initial data directly
    const [treeDataState] = useState<TreeContentSimple[]>(initialData);

    // Auto-select node from query param
    useEffect(() => {
        if (targetNodeId && initialData) {
            const found = initialData.find(n => n.id === targetNodeId);
            if (found) setSelectedNode(found);
        }
    }, [targetNodeId, initialData]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedNode) {
                setSelectedNode(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedNode]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <GlobalNav
                extraControls={<NameToggle showSimpleNames={showSimpleNames} onChange={setShowSimpleNames} />}
            />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 max-w-7xl" aria-label={t('treeView.ariaLabel')}>

                {/* Title Section (Moved from Header) */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('treeView.title')}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        {t('treeView.description')}
                    </p>
                </div>

                {/* Helper Text */}
                <section className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('treeView.instructionsTitle')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {t('treeView.instructionsText')}
                    </p>
                </section>

                {/* Tree Diagram */}
                <section aria-labelledby="tree-diagram-heading">
                    <h2 id="tree-diagram-heading" className="sr-only">{t('treeView.diagramAriaLabel')}</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border-2 border-gray-100 dark:border-gray-700 overflow-hidden min-h-[600px]">
                        <TreeExplorer
                            data={treeDataState}
                            intent={searchParams.get('intent')}
                            onNodeClick={setSelectedNode}
                        />
                    </div>
                </section>

                {/* Legend */}
                <section aria-labelledby="legend-heading" className="mt-12 text-center">
                    <h2 id="legend-heading" className="sr-only">{t('treeView.legendHeading')}</h2>
                    <div className="inline-flex items-center gap-8 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700" role="list">
                        <div className="flex items-center gap-2" role="listitem">
                            <span className="text-2xl" role="img" aria-label={t('treeView.rootsEmoji')}>🌱</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('treeView.rootsLabel')}</span>
                        </div>
                        <div className="flex items-center gap-2" role="listitem">
                            <span className="text-2xl" role="img" aria-label={t('treeView.trunkEmoji')}>🌲</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('treeView.trunkLabel')}</span>
                        </div>
                        <div className="flex items-center gap-2" role="listitem">
                            <span className="text-2xl" role="img" aria-label={t('treeView.branchesEmoji')}>🌿</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('treeView.branchesLabel')}</span>
                        </div>
                        <div className="flex items-center gap-2" role="listitem">
                            <span className="text-2xl" role="img" aria-label={t('treeView.leavesEmoji')}>🍃</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('treeView.leavesLabel')}</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Detail Panel */}
            <TreeDetailPanel
                node={selectedNode}
                onClose={() => setSelectedNode(null)}
            />

            {/* Stage Navigation */}
            <StageSelector />
        </div>
    );
}
