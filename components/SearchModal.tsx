'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, Command } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { getLevelColor } from '@/lib/utils';
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

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  concepts: Concept[];
  onConceptSelect: (concept: Concept) => void;
}

interface SearchResult {
  concept: Concept;
  score: number;
  matchedField: string;
}

const RECENT_SEARCHES_KEY = 'ai-tree-recent-searches';
const MAX_RECENT_SEARCHES = 5;

export function SearchModal({ isOpen, onClose, concepts, onConceptSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('search');
  const tConcept = useTranslations('concept');
  const tData = useTranslations('conceptData');

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch {
          setRecentSearches([]);
        }
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  };

  // Fuzzy search implementation
  const fuzzySearch = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 0);

    const results: SearchResult[] = concepts.map(concept => {
      let score = 0;
      let matchedField = '';

      // Use translated text for search
      const title = tData(`${concept.id}.title`);
      const simpleName = tData(`${concept.id}.simpleName`);
      const metaphor = tData(`${concept.id}.metaphor`);
      const explanation = tData(`${concept.id}.explanation`);

      // Search in title
      const titleLower = title.toLowerCase();
      searchTerms.forEach(term => {
        if (titleLower.includes(term)) {
          score += 10;
          matchedField = 'title';
        }
      });

      // Search in simpleName
      const simpleNameLower = simpleName.toLowerCase();
      searchTerms.forEach(term => {
        if (simpleNameLower.includes(term)) {
          score += 8;
          if (!matchedField) matchedField = 'simpleName';
        }
      });

      // Search in metaphor
      const metaphorLower = metaphor.toLowerCase();
      searchTerms.forEach(term => {
        if (metaphorLower.includes(term)) {
          score += 6;
          if (!matchedField) matchedField = 'metaphor';
        }
      });

      // Search in explanation
      const explanationLower = explanation.toLowerCase();
      searchTerms.forEach(term => {
        if (explanationLower.includes(term)) {
          score += 4;
          if (!matchedField) matchedField = 'explanation';
        }
      });

      // Partial matching bonus
      const allText = `${titleLower} ${simpleNameLower} ${metaphorLower} ${explanationLower}`;
      searchTerms.forEach(term => {
        for (let i = 0; i < allText.length - term.length + 1; i++) {
          const substring = allText.substring(i, i + term.length);
          if (substring === term) {
            score += 2;
          }
        }
      });

      return { concept, score, matchedField };
    });

    return results
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, concepts]);

  // Handle concept selection
  const handleSelectConcept = (concept: Concept) => {
    saveRecentSearch(query);
    onConceptSelect(concept);
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  // Handle recent search click
  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    inputRef.current?.focus();
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            Math.min(prev + 1, fuzzySearch.length - 1)
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (fuzzySearch.length > 0 && selectedIndex < fuzzySearch.length) {
            handleSelectConcept(fuzzySearch[selectedIndex].concept);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, fuzzySearch, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = document.querySelectorAll(
        '.search-modal button:not([disabled]), .search-modal [href], .search-modal input:not([disabled])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="search-modal bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[70vh] overflow-hidden flex flex-col"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('placeholder')}
                className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                aria-label={t('inputLabel')}
                aria-describedby="search-instructions"
              />
              <div className="flex items-center gap-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                <Command className="h-3 w-3" aria-hidden="true" />
                <span>K</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                aria-label={t('close')}
                type="button"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p id="search-instructions" className="sr-only">
              {t('instructions')}
            </p>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {query.trim() === '' ? (
              /* Recent Searches & Popular */
              <div className="p-4 space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                          {t('recentSearches')}
                        </h3>
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 underline"
                        type="button"
                      >
                        {t('clearRecent')}
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentSearchClick(search)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
                          type="button"
                        >
                          <Clock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {t('popularConcepts')}
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {concepts.slice(0, 5).map((concept) => {
                      const IconComponent = iconMap[concept.icon] || Brain;
                      const levelColor = getLevelColor(concept.level);
                      return (
                        <button
                          key={concept.id}
                          onClick={() => handleSelectConcept(concept)}
                          className="w-full text-left px-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-3 group"
                          type="button"
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${levelColor}20` }}
                          >
                            <IconComponent
                              className="h-4 w-4"
                              style={{ color: levelColor }}
                              aria-hidden="true"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {tData(`${concept.id}.title`)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-300 truncate">
                              {tData(`${concept.id}.simpleName`)}
                            </div>
                          </div>
                          <div
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: `${levelColor}20`,
                              color: levelColor
                            }}
                          >
                            {t(`level.${concept.level}`)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : fuzzySearch.length > 0 ? (
              /* Search Results */
              <div className="flex flex-col h-full">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('resultsCount', { count: fuzzySearch.length })}
                  </p>
                </div>
                <div ref={resultsRef} className="p-2 overflow-y-auto">
                  {fuzzySearch.map((result, index) => {
                  const { concept } = result;
                  const IconComponent = iconMap[concept.icon] || Brain;
                  const levelColor = getLevelColor(concept.level);
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={concept.id}
                      onClick={() => handleSelectConcept(concept)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 group ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      type="button"
                      aria-selected={isSelected}
                    >
                      <div
                        className={`p-2 rounded-lg transition-transform ${
                          isSelected ? 'scale-110' : ''
                        }`}
                        style={{ backgroundColor: `${levelColor}20` }}
                      >
                        <IconComponent
                          className="h-5 w-5"
                          style={{ color: levelColor }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {tData(`${concept.id}.title`)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-300 truncate">
                          {tData(`${concept.id}.simpleName`)} • {tData(`${concept.id}.metaphor`).slice(0, 60)}...
                        </div>
                      </div>
                      <div
                        className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
                        style={{
                          backgroundColor: `${levelColor}20`,
                          color: levelColor
                        }}
                      >
                        {t(`level.${concept.level}`)}
                      </div>
                    </button>
                  );
                })}
                </div>
              </div>
            ) : (
              /* No Results */
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-300 dark:text-gray-400 mx-auto mb-3" aria-hidden="true" />
                <p className="text-gray-500 dark:text-gray-300">{t('noResults')}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t('tryDifferent')}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↑</kbd>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↓</kbd>
                  <span>{t('navigate')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↵</kbd>
                  <span>{t('select')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">ESC</kbd>
                  <span>{t('close')}</span>
                </div>
              </div>
              <div className="text-xs">
                {fuzzySearch.length > 0 && query && (
                  <span>{t('resultsCount', { count: fuzzySearch.length })}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
