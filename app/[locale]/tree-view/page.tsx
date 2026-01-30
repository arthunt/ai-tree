'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TreeDiagramSkeleton } from '@/components/TreeDiagramSkeleton';
import { NameToggle } from '@/components/NameToggle';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { getTreeContent, TreeContentSimple } from '@/actions/getTreeContent';
import { TreeView } from '@/components/tree/TreeView';
import { TreeDetailPanel } from '@/components/tree/TreeDetailPanel';

export default function TreeViewPage() {
  const [selectedNode, setSelectedNode] = useState<TreeContentSimple | null>(null);
  const [showSimpleNames, setShowSimpleNames] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [treeDataState, setTreeDataState] = useState<TreeContentSimple[]>([]);
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const searchParams = useSearchParams();
  const targetNodeId = searchParams.get('node');

  // Fetch real data
  useEffect(() => {
    async function init() {
      const data = await getTreeContent(locale);
      setTreeDataState(data);
      setIsLoading(false);

      // Auto-select node from query param
      if (targetNodeId) {
        const found = data.find(n => n.id === targetNodeId);
        if (found) setSelectedNode(found);
      }
    }
    init();
  }, [locale, targetNodeId]);

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
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/${locale}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t('header.classicViewAriaLabel')}
              >
                <ArrowLeft className="h-5 w-5 dark:text-gray-300" aria-hidden="true" />
                <span className="font-medium dark:text-gray-300">{t('header.classicView')}</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('treeView.title')}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('treeView.description')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <NameToggle showSimpleNames={showSimpleNames} onChange={setShowSimpleNames} />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl" aria-label={t('treeView.ariaLabel')}>
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
            {isLoading ? (
              <TreeDiagramSkeleton />
            ) : (
              <TreeView
                data={treeDataState}
                onNodeClick={setSelectedNode}
              />
            )}
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

    </div>
  );
}
