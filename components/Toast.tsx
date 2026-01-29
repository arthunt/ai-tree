'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Toast as ToastType, useToast } from '@/lib/useToast';
import { useTranslations } from 'next-intl';

const iconMap = {
  success: CheckCircle,
  info: Info,
  error: AlertCircle,
};

const colorMap = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/30',
    border: 'border-green-200 dark:border-green-700',
    text: 'text-green-900 dark:text-green-100',
    icon: 'text-green-600 dark:text-green-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-200 dark:border-blue-700',
    text: 'text-blue-900 dark:text-blue-100',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/30',
    border: 'border-red-200 dark:border-red-700',
    text: 'text-red-900 dark:text-red-100',
    icon: 'text-red-600 dark:text-red-400',
  },
};

function ToastItem({ toast }: { toast: ToastType }) {
  const { dismissToast } = useToast();
  const t = useTranslations('toast');
  const Icon = iconMap[toast.type];
  const colors = colorMap[toast.type];

  useEffect(() => {
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = toast.message;
    document.body.appendChild(announcement);

    return () => {
      document.body.removeChild(announcement);
    };
  }, [toast.message]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`${colors.bg} ${colors.border} ${colors.text} border-2 rounded-xl shadow-lg p-4 flex items-start gap-3 min-w-[300px] max-w-[500px]`}
      role="alert"
      aria-atomic="true"
    >
      <Icon className={`h-5 w-5 ${colors.icon} flex-shrink-0 mt-0.5`} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium break-words">{toast.message}</p>

        {toast.action && (
          <button
            onClick={() => {
              toast.action?.onClick();
              dismissToast(toast.id);
            }}
            className="mt-2 text-sm font-semibold underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        onClick={() => dismissToast(toast.id)}
        className={`${colors.icon} hover:opacity-70 transition-opacity p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current min-h-[24px] min-w-[24px] flex items-center justify-center flex-shrink-0`}
        aria-label={t('closeAriaLabel')}
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div
      className="fixed z-[100] pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {/* Mobile: bottom-center */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop: bottom-right */}
      <div className="hidden md:block fixed bottom-4 right-4 flex flex-col gap-2 items-end pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
