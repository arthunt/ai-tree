'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TreePine, Map, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_STEPS = 3;

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  const t = useTranslations('welcome');
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const steps = [
    {
      icon: TreePine,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      titleKey: 'step1Title',
      descKey: 'step1Desc',
      items: ['step1Item1', 'step1Item2', 'step1Item3', 'step1Item4'] as const,
      emojis: ['🌱', '🌲', '🌿', '🍃'],
    },
    {
      icon: Map,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      titleKey: 'step2Title',
      descKey: 'step2Desc',
      items: ['step2Item1', 'step2Item2', 'step2Item3'] as const,
      emojis: ['📖', '🗺️', '🔍'],
    },
    {
      icon: Sparkles,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/40',
      titleKey: 'step3Title',
      descKey: 'step3Desc',
      items: ['step3Item1', 'step3Item2', 'step3Item3'] as const,
      emojis: ['⏱️', '✅', '🔄'],
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 text-center border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 min-w-[44px] min-h-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={t('close')}
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
                <div className="text-4xl mb-2">🌳</div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('title')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t('subtitle')}
                </p>
              </div>

              {/* Step content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Step icon + title */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-3 rounded-xl ${currentStep.iconBg}`}>
                        <Icon className={`h-6 w-6 ${currentStep.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                          {t(currentStep.titleKey)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t(currentStep.descKey)}
                        </p>
                      </div>
                    </div>

                    {/* Step items */}
                    <div className="space-y-3 ml-1">
                      {currentStep.items.map((itemKey, i) => (
                        <div key={itemKey} className="flex items-start gap-3">
                          <span className="text-lg flex-shrink-0 mt-0.5">{currentStep.emojis[i]}</span>
                          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {t(itemKey)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer with navigation */}
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === step
                          ? 'w-6 bg-blue-500'
                          : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`${t('stepOf', { current: i + 1, total: TOTAL_STEPS })}`}
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      onClick={handlePrev}
                      className="flex items-center gap-1 px-4 py-2.5 min-h-[44px] text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {t('back')}
                    </button>
                  ) : (
                    <button
                      onClick={handleClose}
                      className="px-4 py-2.5 min-h-[44px] text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                    >
                      {t('skip')}
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                  >
                    {step === TOTAL_STEPS - 1 ? t('getStarted') : t('next')}
                    {step < TOTAL_STEPS - 1 && <ChevronRight className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
