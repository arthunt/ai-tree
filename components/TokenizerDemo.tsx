'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';

interface Token {
  text: string;
  id: string;
  color: string;
}

const TOKEN_COLORS = [
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
];

export function TokenizerDemo() {
  const [inputText, setInputText] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  // Simple tokenization that splits by spaces and punctuation
  const tokens = useMemo(() => {
    if (!inputText.trim()) return [];

    // Split by spaces and punctuation while keeping the punctuation
    const tokenTexts = inputText.match(/\w+|[^\w\s]/g) || [];

    return tokenTexts.map((text, index) => ({
      text,
      id: `${text}-${index}`,
      color: TOKEN_COLORS[index % TOKEN_COLORS.length],
    }));
  }, [inputText]);

  const tokenCount = tokens.length;

  // Rough cost estimation (GPT-4 pricing: ~$0.03 per 1K tokens for input)
  const estimatedCost = tokenCount > 0 ? (tokenCount / 1000) * 0.03 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Tokeniseerija Demo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vaata, kuidas AI näeb teksti
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Näita infot"
          >
            <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Mis on tokenid?</strong> Keelemudelid ei näe teksti nii nagu meie.
                Nad jagavad teksti väiksemateks tükkideks ehk <em>tokeniteks</em>.
                Token võib olla sõna, sõna osa või isegi üks tärk. See demo näitab lihtsustatud versiooni!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text Input */}
        <div className="mb-6">
          <label htmlFor="tokenizer-input" className="sr-only">
            Sisesta tekst tokeniseerimiseks
          </label>
          <textarea
            id="tokenizer-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Kirjuta midagi, et näha kuidas AI tokeniseerib teksti..."
            className="w-full min-h-[120px] p-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none outline-none"
            rows={4}
          />
        </div>

        {/* Token Display */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tokenid:
            </h4>
            {tokenCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tokenCount} {tokenCount === 1 ? 'token' : 'tokenid'}
                </span>
              </motion.div>
            )}
          </div>

          <div className="min-h-[100px] p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            {tokens.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm italic">
                Tokenid ilmuvad siia...
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {tokens.map((token, index) => (
                    <motion.span
                      key={token.id}
                      initial={{ opacity: 0, scale: 0, y: -20 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: 'spring',
                          stiffness: 500,
                          damping: 25,
                          delay: index * 0.02,
                        }
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      className={`px-3 py-1.5 rounded-lg font-mono text-sm font-medium ${token.color} shadow-sm`}
                    >
                      {token.text}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {tokenCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Hinnanguline maksumus (GPT-4)
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ~${estimatedCost.toFixed(6)}
              </p>
            </div>

            <div className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
              <p>
                <strong>Näpunäide:</strong> Pikemad tekstid = rohkem tokeneid = kõrgem hind.
                Õpi optimeerima oma prompte!
              </p>
            </div>
          </motion.div>
        )}

        {/* Example Prompts */}
        {!inputText && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Proovi näiteid:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Tere, maailm!',
                'Kunstlik intelligentsus',
                'Machine learning is fascinating',
                'AI õppimine on põnev',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setInputText(example)}
                  className="px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Educational Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400"
      >
        <p>
          See on lihtsustatud tokeniseerija. Päris keelemudelid kasutavad
          keerukamaid meetodeid nagu BPE (Byte Pair Encoding) või WordPiece.
        </p>
      </motion.div>
    </div>
  );
}
