'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TreeData, Concept } from '@/lib/types';
import { OrganicTreeDiagram } from '@/components/OrganicTreeDiagram';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { NameToggle } from '@/components/NameToggle';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import treeData from '@/data/tree-concepts.json';

export default function TreeViewPage() {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [showSimpleNames, setShowSimpleNames] = useState(true);
  const data = treeData as TreeData;

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConcept]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Tagasi klassikalisse vaatesse"
              >
                <ArrowLeft className="h-5 w-5 dark:text-gray-300" aria-hidden="true" />
                <span className="font-medium dark:text-gray-300">Klassikaline vaade</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI Teadmiste Puu - Puu Vaade
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kõik kontseptsioonid ühes vaates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <NameToggle showSimpleNames={showSimpleNames} onChange={setShowSimpleNames} />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl" aria-label="Puu vaade">
        {/* Instructions */}
        <section aria-labelledby="instructions-heading">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 id="instructions-heading" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interaktiivne Puu Visualisatsioon
            </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Liigu hiire kontseptsiooni peale, et see suureks kasvaks.
            Kliki detailse vaate avamiseks.
          </p>
          </motion.div>
        </section>

        {/* Tree Diagram */}
        <section aria-labelledby="tree-diagram-heading">
          <h2 id="tree-diagram-heading" className="sr-only">AI kontseptide puu diagramm</h2>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border-2 border-gray-100 dark:border-gray-700">
          <OrganicTreeDiagram
            levels={data.levels}
            concepts={data.concepts}
            onConceptClick={setSelectedConcept}
            showSimpleNames={showSimpleNames}
          />
          </div>
        </section>

        {/* Legend */}
        <section aria-labelledby="legend-heading" className="mt-12 text-center">
          <h2 id="legend-heading" className="sr-only">Puu tasandite legend</h2>
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700" role="list">
            <div className="flex items-center gap-2" role="listitem">
              <span className="text-2xl" role="img" aria-label="Idu emotiikon">🌱</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">1. Juured</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="text-2xl" role="img" aria-label="Kuuse puu emotiikon">🌲</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">2. Tüvi</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="text-2xl" role="img" aria-label="Roheline taim emotiikon">🌿</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">3. Oksad</span>
            </div>
            <div className="flex items-center gap-2" role="listitem">
              <span className="text-2xl" role="img" aria-label="Lehtede emotiikon">🍃</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4. Lehed</span>
            </div>
          </div>
        </section>
      </main>

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
        />
      )}
    </div>
  );
}
