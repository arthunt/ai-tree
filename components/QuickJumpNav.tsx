'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function QuickJumpNav() {
  const t = useTranslations('quickJump');

  const scrollToLevels = () => {
    const firstLevel = document.getElementById('roots');
    if (firstLevel) {
      firstLevel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <button
        onClick={scrollToLevels}
        className="flex flex-col items-center gap-2 px-6 py-3 min-h-[44px] bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all group"
        aria-label={t('ariaLabel')}
      >
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {t('startLearning')}
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5 text-blue-600" />
        </motion.div>
      </button>
    </motion.div>
  );
}
