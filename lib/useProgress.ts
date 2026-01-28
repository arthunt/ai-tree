'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ai-tree-progress';

export interface ProgressState {
  completedConcepts: string[];
  lastUpdated: string;
}

const initialState: ProgressState = {
  completedConcepts: [],
  lastUpdated: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProgressState;
        setProgress(parsed);
      }
    } catch {
      // Invalid data, use initial state
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when progress changes
  useEffect(() => {
    if (!isLoaded || typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage full or unavailable
    }
  }, [progress, isLoaded]);

  const markAsCompleted = useCallback((conceptId: string) => {
    setProgress(prev => {
      if (prev.completedConcepts.includes(conceptId)) {
        return prev;
      }
      return {
        completedConcepts: [...prev.completedConcepts, conceptId],
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const markAsIncomplete = useCallback((conceptId: string) => {
    setProgress(prev => ({
      completedConcepts: prev.completedConcepts.filter(id => id !== conceptId),
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const toggleCompleted = useCallback((conceptId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedConcepts.includes(conceptId);
      return {
        completedConcepts: isCompleted
          ? prev.completedConcepts.filter(id => id !== conceptId)
          : [...prev.completedConcepts, conceptId],
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const isCompleted = useCallback((conceptId: string) => {
    return progress.completedConcepts.includes(conceptId);
  }, [progress.completedConcepts]);

  const clearProgress = useCallback(() => {
    setProgress(initialState);
  }, []);

  const getCompletionPercentage = useCallback((totalConcepts: number) => {
    if (totalConcepts === 0) return 0;
    return Math.round((progress.completedConcepts.length / totalConcepts) * 100);
  }, [progress.completedConcepts.length]);

  return {
    completedConcepts: progress.completedConcepts,
    completedCount: progress.completedConcepts.length,
    isLoaded,
    markAsCompleted,
    markAsIncomplete,
    toggleCompleted,
    isCompleted,
    clearProgress,
    getCompletionPercentage,
  };
}
