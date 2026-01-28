'use client';

import { useState } from 'react';
import { Terminal, BookOpen, Lightbulb, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Concept } from '@/lib/types';
import { CodeBlock } from '@/components/CodeBlock';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

interface ConceptCodeTabProps {
  concept: Concept;
  className?: string;
}

export function ConceptCodeTab({ concept, className = '' }: ConceptCodeTabProps) {
  const t = useTranslations('concept');
  const [whyExpanded, setWhyExpanded] = useState(true);
  const codeExample = concept.codeExample;

  // No code example - show placeholder
  if (!codeExample) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
          <Terminal className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
          {t('codeComingSoon')}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[280px]">
          {t('codeComingSoonDesc')}
        </p>
      </div>
    );
  }

  const whyText = codeExample.whyRelevant || codeExample.explanation;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Why this code? - Collapsible section */}
      {whyText && (
        <section className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700 overflow-hidden">
          <button
            onClick={() => setWhyExpanded(!whyExpanded)}
            className="w-full flex items-center justify-between gap-2 p-4 min-h-[44px] text-left"
            aria-expanded={whyExpanded}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-emerald-500 dark:bg-emerald-600 rounded-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-200">
                {t('whyThisCode')}
              </h3>
            </div>
            {whyExpanded ? (
              <ChevronUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            ) : (
              <ChevronDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            )}
          </button>
          <AnimatePresence initial={false}>
            {whyExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 pb-4">
                  <p className="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">
                    {whyText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Code Block */}
      <section className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <CodeBlock
          code={codeExample.code}
          language={codeExample.language}
          explanation=""
        />
      </section>

      {/* How to use */}
      {codeExample.howToUse && codeExample.howToUse.length > 0 && (
        <section className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-amber-500 dark:bg-amber-600 rounded-lg">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-200">
              {t('howToUse')}
            </h3>
          </div>
          <ul className="space-y-2">
            {codeExample.howToUse.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-100">
                <span className="text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0">•</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Try it out */}
      {codeExample.playgroundUrl && (
        <a
          href={codeExample.playgroundUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-4 min-h-[44px] bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
        >
          <span>{t('tryItOut')}</span>
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}
