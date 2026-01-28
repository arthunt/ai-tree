'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Code2 } from 'lucide-react';
import { Concept } from '../lib/types';
import { getComplexityColor, getComplexityLabel } from '../lib/utils';
import {
  Users,
  Brain,
  Leaf,
  Bot,
  Plug,
  Layers,
  BookOpen,
  Notebook,
  GraduationCap,
  Shield,
  MapPin,
  Flashlight,
  BookText,
  Blocks,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  brain: Brain,
  leaf: Leaf,
  'chess-knight': Brain,
  bot: Bot,
  plug: Plug,
  layers: Layers,
  stage: Layers,
  'book-open': BookOpen,
  notebook: Notebook,
  'graduation-cap': GraduationCap,
  shield: Shield,
  blocks: Blocks,
  'map-pin': MapPin,
  flashlight: Flashlight,
  'book-text': BookText,
};

interface ConceptLightboxProps {
  concept: Concept | null;
  onClose: () => void;
}

export function ConceptLightbox({ concept, onClose }: ConceptLightboxProps) {
  if (!concept) return null;

  const IconComponent = iconMap[concept.icon] || Brain;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-4xl font-bold mb-2 break-words">{concept.title}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(concept.complexity)} bg-white`}>
                    {getComplexityLabel(concept.complexity)}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Metaphor Section */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border-2 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-900">Lihtne Metafoor</h3>
              </div>
              <p className="text-lg text-purple-900 leading-relaxed italic break-words">
                {concept.metaphor}
              </p>
            </div>

            {/* Technical Section */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Tehniline Selgitus</h3>
              </div>
              <p className="text-lg text-blue-900 leading-relaxed break-words">
                {concept.explanation}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 rounded-b-3xl border-t">
            <p className="text-center text-gray-600">
              Vajuta ESC või klõpsa väljaspool, et sulgeda
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
