'use client';

import { motion } from 'framer-motion';

interface SkeletonCardProps {
  index?: number;
}

export function SkeletonCard({ index = 0 }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <div className="relative h-full min-h-[120px] w-full overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 shadow-md">
        <div className="p-5 h-full flex flex-col animate-pulse">
          {/* Header section */}
          <div className="flex items-start gap-3 mb-3">
            {/* Icon skeleton */}
            <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
              <div className="h-5 w-5" />
            </div>
            <div className="flex-1">
              {/* Title skeleton */}
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2" />
              {/* Badges skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
              </div>
            </div>
          </div>

          {/* Description skeleton */}
          <div className="space-y-2 mb-4 flex-1">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          </div>
        </div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-gray-700/40 to-transparent" />
      </div>
    </motion.div>
  );
}
