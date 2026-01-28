'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="h-5 w-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      aria-label={theme === 'light' ? 'Lülitu tumedale režiimile' : 'Lülitu heledele režiimile'}
      title={theme === 'light' ? 'Tume režiim' : 'Hele režiim'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
      )}
    </button>
  );
}
