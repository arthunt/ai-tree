import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProgress } from '@/lib/useProgress';

describe('useProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty progress', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.completedConcepts).toEqual([]);
    expect(result.current.completedCount).toBe(0);
  });

  it('marks a concept as completed', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('tokens');
    });
    expect(result.current.isCompleted('tokens')).toBe(true);
    expect(result.current.completedCount).toBe(1);
  });

  it('marks a concept as incomplete', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('tokens');
    });
    act(() => {
      result.current.markAsIncomplete('tokens');
    });
    expect(result.current.isCompleted('tokens')).toBe(false);
    expect(result.current.completedCount).toBe(0);
  });

  it('toggles completion', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.toggleCompleted('vectors');
    });
    expect(result.current.isCompleted('vectors')).toBe(true);
    act(() => {
      result.current.toggleCompleted('vectors');
    });
    expect(result.current.isCompleted('vectors')).toBe(false);
  });

  it('does not duplicate completed concepts', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('tokens');
    });
    act(() => {
      result.current.markAsCompleted('tokens');
    });
    expect(result.current.completedCount).toBe(1);
  });

  it('calculates completion percentage', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('tokens');
      result.current.markAsCompleted('vectors');
    });
    expect(result.current.getCompletionPercentage(10)).toBe(20);
    expect(result.current.getCompletionPercentage(0)).toBe(0);
  });

  it('clears all progress', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('tokens');
      result.current.markAsCompleted('vectors');
    });
    expect(result.current.completedCount).toBe(2);
    act(() => {
      result.current.clearProgress();
    });
    expect(result.current.completedCount).toBe(0);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useProgress());
    act(() => {
      result.current.markAsCompleted('attention');
    });
    const stored = JSON.parse(localStorage.getItem('ai-tree-progress') || '{}');
    expect(stored.completedConcepts).toContain('attention');
  });

  it('restores from localStorage', () => {
    localStorage.setItem(
      'ai-tree-progress',
      JSON.stringify({
        completedConcepts: ['tokens', 'vectors'],
        lastUpdated: new Date().toISOString(),
      })
    );
    const { result } = renderHook(() => useProgress());
    // Wait for the useEffect to load from localStorage
    expect(result.current.completedConcepts).toEqual(['tokens', 'vectors']);
  });
});
