'use client';

import { motion } from 'framer-motion';

export function TreeDiagramSkeleton() {
  return (
    <div className="relative w-full mx-auto animate-pulse" style={{ maxWidth: '1400px', aspectRatio: '1400 / 900' }}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent" />

      {/* Content layer with skeleton nodes */}
      <div className="relative w-full h-full p-8">
        {/* Leaves level - top */}
        <div className="absolute top-[15%] left-0 right-0 flex justify-around px-12">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={`leaf-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-16 w-40"
            />
          ))}
        </div>

        {/* Branches level - upper middle */}
        <div className="absolute top-[40%] left-0 right-0 flex justify-around px-20">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={`branch-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.4 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-16 w-40"
            />
          ))}
        </div>

        {/* Trunk level - lower middle */}
        <div className="absolute top-[60%] left-0 right-0 flex justify-around px-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={`trunk-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.7 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-16 w-40"
            />
          ))}
        </div>

        {/* Roots level - bottom */}
        <div className="absolute top-[85%] left-0 right-0 flex justify-around px-20">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={`root-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 1.0 }}
              className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-16 w-40"
            />
          ))}
        </div>

        {/* Loading text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg"
          >
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Loading tree...
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
