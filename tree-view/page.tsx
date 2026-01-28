'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { TreeData, Concept } from '../lib/types';
import { OrganicTreeDiagram } from '../components/OrganicTreeDiagram';
import { ConceptLightbox } from '../components/ConceptLightbox';
import { NameToggle } from '../components/NameToggle';
import treeData from '../data/tree-concepts.json';

export default function TreeViewPage() {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [showSimpleNames, setShowSimpleNames] = useState(true);
  const data = treeData as TreeData;
  // Using new OrganicTreeDiagram with background image

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/ai-tree"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium">Klassikaline vaade</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AI Teadmiste Puu - Puu Vaade
                </h1>
                <p className="text-sm text-gray-600">Kõik kontseptsioonid ühes vaates</p>
              </div>
            </div>
            <NameToggle showSimpleNames={showSimpleNames} onChange={setShowSimpleNames} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Interaktiivne Puu Visualisatsioon
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Liigu hiire kontseptsiooni peale, et see suureks kasvaks.
            Kliki detailse vaate avamiseks.
          </p>
        </motion.div>

        {/* Tree Diagram */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
          <OrganicTreeDiagram
            levels={data.levels}
            concepts={data.concepts}
            onConceptClick={setSelectedConcept}
            showSimpleNames={showSimpleNames}
          />
        </div>

        {/* Legend */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-sm font-medium text-gray-700">1. Juured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌲</span>
              <span className="text-sm font-medium text-gray-700">2. Tüvi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="text-sm font-medium text-gray-700">3. Oksad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍃</span>
              <span className="text-sm font-medium text-gray-700">4. Lehed</span>
            </div>
          </div>
        </div>
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
