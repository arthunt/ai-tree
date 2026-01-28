'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Code2, LayoutGrid } from 'lucide-react';
import { ViewMode } from '../lib/types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  const modes: { id: ViewMode; label: string; icon: typeof Lightbulb }[] = [
    { id: 'metaphor', label: 'Metafoorid', icon: Lightbulb },
    { id: 'technical', label: 'Tehniline', icon: Code2 },
    { id: 'both', label: 'Mõlemad', icon: LayoutGrid },
  ];

  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-2">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = viewMode === mode.id;

        return (
          <motion.button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`
              relative px-4 py-2 rounded-lg font-medium text-sm transition-all
              ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900'}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeBackground"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {mode.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
