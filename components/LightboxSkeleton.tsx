'use client';

import { motion } from 'framer-motion';

export function LightboxSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-t-3xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon skeleton */}
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <div className="h-10 w-10" />
            </div>
            <div className="flex-1 min-w-0">
              {/* Title skeleton */}
              <div className="h-9 bg-white/30 rounded-md w-2/3 mb-3" />
              {/* Badges skeleton */}
              <div className="flex items-center gap-3">
                <div className="h-7 bg-white/30 rounded-full w-20" />
                <div className="h-7 bg-white/30 rounded-full w-24" />
              </div>
            </div>
          </div>
          {/* Close button skeleton */}
          <div className="p-3 bg-white/20 rounded-full">
            <div className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-8 space-y-6">
        {/* Section 1 skeleton */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500 dark:bg-purple-600 rounded-lg">
              <div className="h-6 w-6" />
            </div>
            <div className="h-7 bg-purple-300 dark:bg-purple-700 rounded w-40" />
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-purple-200 dark:bg-purple-800 rounded w-full" />
            <div className="h-5 bg-purple-200 dark:bg-purple-800 rounded w-full" />
            <div className="h-5 bg-purple-200 dark:bg-purple-800 rounded w-3/4" />
          </div>
        </div>

        {/* Section 2 skeleton */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
              <div className="h-6 w-6" />
            </div>
            <div className="h-7 bg-blue-300 dark:bg-blue-700 rounded w-48" />
          </div>
          <div className="space-y-2">
            <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded w-full" />
            <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded w-full" />
            <div className="h-5 bg-blue-200 dark:bg-blue-800 rounded w-5/6" />
          </div>
        </div>

        {/* Section 3 skeleton */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/30 dark:to-slate-800/20 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-600 dark:bg-slate-700 rounded-lg">
              <div className="h-6 w-6" />
            </div>
            <div className="h-7 bg-slate-300 dark:bg-slate-700 rounded w-36" />
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-b-3xl border-t dark:border-gray-700">
        <div className="flex items-center justify-center gap-4">
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl w-40" />
        </div>
      </div>

      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent pointer-events-none" />
    </div>
  );
}
