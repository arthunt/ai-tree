'use client';

import { useState, useCallback, useEffect } from 'react';

export type ExplanationMode = 'simple' | 'technical';

export function useExplanationMode() {
  const [mode, setModeState] = useState<ExplanationMode>('simple');

  useEffect(() => {
    const saved = localStorage.getItem('ai-tree-explanation-mode');
    if (saved === 'simple' || saved === 'technical') {
      setModeState(saved);
    }
  }, []);

  const setMode = useCallback((newMode: ExplanationMode) => {
    setModeState(newMode);
    localStorage.setItem('ai-tree-explanation-mode', newMode);
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === 'simple' ? 'technical' : 'simple');
  }, [mode, setMode]);

  return { mode, setMode, toggle };
}
