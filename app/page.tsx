'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { LevelSection } from '@/components/LevelSection';
import { TreeNavigation } from '@/components/TreeNavigation';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import treeData from '@/data/tree-concepts.json';
import Link from 'next/link';
import { Network } from 'lucide-react';

export default function AITreePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [activeLevel, setActiveLevel] = useState('roots');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const data = treeData as TreeData;

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = data.levels.map(level => level.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveLevel(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.levels]);

  // Handle ESC key to close lightbox
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.metadata.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{data.metadata.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/tree-view"
                className="flex items-center gap-2 px-4 py-3 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                aria-label="Liigu puu vaate lehele"
              >
                <Network className="h-5 w-5" aria-hidden="true" />
                Puu Vaade
              </Link>
              <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Tree Navigation */}
      <TreeNavigation levels={data.levels} activeLevel={activeLevel} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 -z-10" />
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6" role="img" aria-label="Puu emotiikon">🌳</div>
            <h2 id="hero-heading" className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI Teadmiste Puu
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Terviklik raamistik AI kontseptide õpetamiseks – alates fundamentaalsetest
              mehaanikate põhimõtetest kuni kõige uuemate uuringuteni.
            </p>

            {/* View Options */}
            <div className="flex items-center justify-center gap-4 mb-8" role="navigation" aria-label="Vaate valikud">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <span role="img" aria-label="Raamat">📚</span> Klassikaline Vaade
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Keritav tasandite vaade detailse sisuga
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full inline-block" aria-current="page">
                  Praegu siin
                </div>
              </div>

              <div className="text-2xl text-gray-400 dark:text-gray-600" aria-hidden="true">või</div>

              <Link href="/tree-view" aria-label="Liigu interaktiivsesse puu vaatesse">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 max-w-sm hover:shadow-xl transition-all cursor-pointer">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Network className="h-5 w-5" aria-hidden="true" /> Puu Vaade
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    Interaktiivne puu kõigi kontseptsioonidega
                  </p>
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                    Kliki siia →
                  </div>
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-8 text-sm text-gray-600 dark:text-gray-300 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">1.</span>
                  <span className="text-2xl">🌱</span>
                  <span>Juured</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">2.</span>
                  <span className="text-2xl">🌲</span>
                  <span>Tüvi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">3.</span>
                  <span className="text-2xl">🌿</span>
                  <span>Oksad</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">4.</span>
                  <span className="text-2xl">🍃</span>
                  <span>Lehed</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Alusta juurtest ja liigu ülespoole või keri vabalt
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Level Sections */}
      <main aria-label="AI kontseptide tasandid">
        {data.levels.map((level, index) => {
          const levelConcepts = data.concepts.filter(c => c.level === level.id);
          return (
            <LevelSection
              key={level.id}
              level={level}
              concepts={levelConcepts}
              viewMode={viewMode}
              index={index}
              onConceptClick={setSelectedConcept}
            />
          );
        })}
      </main>

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-400 dark:text-gray-500">
            AI Teadmiste Puu – Interaktiivne õppevahend AI kontseptide mõistmiseks
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-600 mt-2">
            Versioon {data.version} • {data.metadata.created}
          </p>
        </div>
      </footer>
    </div>
  );
}
