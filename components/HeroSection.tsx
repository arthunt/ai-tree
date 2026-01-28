'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TreeDiagram } from './TreeDiagram';
import { QuickJumpNav } from './QuickJumpNav';
import { TreeLevel, Concept } from '../lib/types';

interface HeroSectionProps {
  levels: TreeLevel[];
  concepts: Concept[];
  onConceptClick: (concept: Concept) => void;
}

export function HeroSection({ levels, concepts, onConceptClick }: HeroSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20 max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl mb-6">🌳</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Teadmiste Puu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Terviklik raamistik AI kontseptide õpetamiseks – alates fundamentaalsetest
            mehaanikate põhimõtetest kuni kõige uuemate uuringuteni.
          </p>

          {/* Tree Overview Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-gray-700 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-5 w-5" />
                Peida puu ülevaade
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5" />
                Näita puu ülevaadet
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Collapsible Tree Diagram */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="container mx-auto px-4 pb-20 max-w-7xl">
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Kõik 16 Kontseptsiooni Ühes Vaates
                  </h2>
                  <p className="text-gray-600">
                    Kliki ükskõik millisele kontseptsioonile, et näha detaile
                  </p>
                </div>
                <TreeDiagram
                  levels={levels}
                  concepts={concepts}
                  onConceptClick={onConceptClick}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Legend */}
      <div className="container mx-auto px-4 pb-12 max-w-7xl">
        <div className="flex items-center justify-center gap-8 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-700">1.</span>
            <span className="text-2xl">🌱</span>
            <span>Juured - Mehaanika</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-700">2.</span>
            <span className="text-2xl">🌲</span>
            <span>Tüvi - Inseneeria</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-700">3.</span>
            <span className="text-2xl">🌿</span>
            <span>Oksad - Rakendused</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-700">4.</span>
            <span className="text-2xl">🍃</span>
            <span>Lehed - Trendid</span>
          </div>
        </div>
      </div>

      {/* Quick Jump Navigation */}
      {!isExpanded && <QuickJumpNav />}
    </section>
  );
}
