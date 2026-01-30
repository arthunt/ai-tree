'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface DarkModeToggleProps {
  variant?: 'default' | 'transparent';
}

export function DarkModeToggle({ variant = 'default' }: DarkModeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();
  const t = useTranslations('darkMode');

  const isTransparent = variant === 'transparent';

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg ${isTransparent ? 'bg-white/10' : 'bg-gray-100 dark:bg-gray-800'}`}>
        <div className="h-5 w-5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
        isTransparent
          ? 'bg-white/10 hover:bg-white/20 text-white'
          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
      }`}
      aria-label={t('ariaLabel')}
      title={t('toggle')}
      type="button"
    >
      {theme === 'light' ? (
        <Moon className={`h-5 w-5 ${isTransparent ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} aria-hidden="true" />
      ) : (
        <Sun className={`h-5 w-5 ${isTransparent ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`} aria-hidden="true" />
      )}
    </button>
  );
}
