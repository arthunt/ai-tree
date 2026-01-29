'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Share2, ChevronRight } from 'lucide-react';
import { LevelIcon } from './LevelIcon';
import { useParams } from 'next/navigation';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'level' | 'all';
  levelId?: string;
  levelName?: string;
  conceptCount: number;
  nextLevelId?: string;
  nextLevelName?: string;
  onNavigateToLevel?: (levelId: string) => void;
}

export function CelebrationModal({
  isOpen,
  onClose,
  type,
  levelId,
  levelName,
  conceptCount,
  nextLevelId,
  nextLevelName,
  onNavigateToLevel,
}: CelebrationModalProps) {
  const t = useTranslations('celebration');
  const params = useParams();
  const locale = params.locale as string;

  const handleShare = async () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const text = type === 'all'
      ? t('allCompleteDesc', { count: conceptCount })
      : t('levelCompleteDesc', { count: conceptCount, level: levelName || '' });
    const url = `${baseUrl}/${locale}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Dendrix.ai', text, url });
      } catch {
        // Share cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
      } catch {
        // Clipboard unavailable
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top */}
            <div className="h-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
              type="button"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>

            <div className="p-8 text-center">
              {/* Animated emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                className="text-6xl mb-4"
              >
                {type === 'all' ? '🌳' : '🎉'}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {type === 'all' ? t('allComplete') : t('levelComplete')}
              </motion.h2>

              {/* Level badge */}
              {type === 'level' && levelId && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <LevelIcon level={levelId as 'roots' | 'trunk' | 'branches' | 'leaves'} size={24} />
                  <span className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {levelName}
                  </span>
                </motion.div>
              )}

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-300 mb-6"
              >
                {type === 'all'
                  ? t('allCompleteDesc', { count: conceptCount })
                  : t('levelCompleteDesc', { count: conceptCount, level: levelName || '' })}
              </motion.p>

              {/* Confetti particles (CSS-only decorations) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: '50%',
                      y: '40%',
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: `${20 + Math.random() * 60}%`,
                      y: `${10 + Math.random() * 80}%`,
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      delay: 0.2 + i * 0.08,
                      ease: 'easeOut',
                    }}
                    className={`absolute w-2 h-2 rounded-full ${
                      ['bg-emerald-400', 'bg-blue-400', 'bg-purple-400', 'bg-amber-400', 'bg-pink-400'][i % 5]
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col gap-3"
              >
                {type === 'level' && nextLevelId && onNavigateToLevel && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToLevel(nextLevelId);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    type="button"
                  >
                    {t('nextLevel', { level: nextLevelName || '' })}
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  type="button"
                >
                  <Share2 className="h-4 w-4" />
                  {t('shareProgress')}
                </button>

                <button
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors py-2"
                  type="button"
                >
                  {t('keepExploring')}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
