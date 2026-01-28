'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Code2, Terminal, ArrowRight } from 'lucide-react';
import { Concept } from '../lib/types';
import { getComplexityColor, getComplexityLabel, getLevelColor } from '../lib/utils';
import { useEffect, useRef } from 'react';
import { CodeBlock } from './CodeBlock';
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
  allConcepts?: Concept[];
  onNavigate?: (conceptId: string) => void;
}

export function ConceptLightbox({ concept, onClose, allConcepts = [], onNavigate }: ConceptLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (concept) {
      document.addEventListener('keydown', handleEscape);
      // Focus the close button when lightbox opens
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [concept, onClose]);

  // Focus trap
  useEffect(() => {
    if (!concept) return;

    const focusableElements = document.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [concept]);

  if (!concept) return null;

  const IconComponent = iconMap[concept.icon] || Brain;

  // Get prerequisite concepts
  const prerequisites = concept.prerequisites
    ? concept.prerequisites
        .map(id => allConcepts.find(c => c.id === id))
        .filter((c): c is Concept => c !== undefined)
    : [];

  // Handle prerequisite navigation
  const handlePrerequisiteClick = (conceptId: string) => {
    if (onNavigate) {
      onNavigate(conceptId);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concept-title"
        aria-describedby="concept-content"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl" aria-hidden="true">
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 id="concept-title" className="text-4xl font-bold mb-2 break-words">{concept.title}</h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(concept.complexity)} bg-white`}>
                    {getComplexityLabel(concept.complexity)}
                  </span>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="p-3 min-h-[44px] min-w-[44px] hover:bg-white/20 rounded-full transition-colors flex items-center justify-center focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 focus:outline-none"
                aria-label="Sulge dialoogi aken"
                type="button"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div id="concept-content" className="p-8 space-y-6">
            {/* Prerequisites Section */}
            {prerequisites.length > 0 && (
              <section className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-700" aria-labelledby="prerequisites-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-500 dark:bg-amber-600 rounded-lg" aria-hidden="true">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <h3 id="prerequisites-heading" className="text-2xl font-bold text-amber-900 dark:text-amber-200">Õpi enne</h3>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-300 mb-4">
                  Nende teemade mõistmine aitab sul seda kontseptsiooni paremini omandada:
                </p>
                <div className="flex flex-wrap gap-3">
                  {prerequisites.map((prereq) => {
                    const levelColor = getLevelColor(prereq.level);
                    return (
                      <button
                        key={prereq.id}
                        onClick={() => handlePrerequisiteClick(prereq.id)}
                        className="group flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:outline-none min-h-[44px]"
                        style={{
                          backgroundColor: `${levelColor}20`,
                          borderColor: levelColor,
                          borderWidth: '2px'
                        }}
                        aria-label={`Navigate to ${prereq.title}`}
                      >
                        <span
                          className="font-semibold"
                          style={{ color: levelColor }}
                        >
                          {prereq.simpleName}
                        </span>
                        <ArrowRight
                          className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                          style={{ color: levelColor }}
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Metaphor Section */}
            <section className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700" aria-labelledby="metaphor-heading">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-500 dark:bg-purple-600 rounded-lg" aria-hidden="true">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 id="metaphor-heading" className="text-2xl font-bold text-purple-900 dark:text-purple-200">Lihtne Metafoor</h3>
              </div>
              <p className="text-lg text-purple-900 dark:text-purple-100 leading-relaxed italic break-words">
                {concept.metaphor}
              </p>
            </section>

            {/* Technical Section */}
            <section className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700" aria-labelledby="technical-heading">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg" aria-hidden="true">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h3 id="technical-heading" className="text-2xl font-bold text-blue-900 dark:text-blue-200">Tehniline Selgitus</h3>
              </div>
              <p className="text-lg text-blue-900 dark:text-blue-100 leading-relaxed break-words">
                {concept.explanation}
              </p>
            </section>

            {/* Code Example Section */}
            {concept.codeExample && (
              <section className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/30 dark:to-slate-800/20 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700" aria-labelledby="code-heading">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-600 dark:bg-slate-700 rounded-lg" aria-hidden="true">
                    <Terminal className="h-6 w-6 text-white" />
                  </div>
                  <h3 id="code-heading" className="text-2xl font-bold text-slate-900 dark:text-slate-200">Koodinäide</h3>
                </div>
                <CodeBlock
                  code={concept.codeExample.code}
                  language={concept.codeExample.language}
                  explanation={concept.codeExample.explanation}
                />
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-b-3xl border-t dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Vajuta ESC või klõpsa väljaspool, et sulgeda
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
