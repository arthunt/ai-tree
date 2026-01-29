import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExplanationMode } from '@/lib/hooks/useExplanationMode';

describe('useExplanationMode', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to simple mode', () => {
    const { result } = renderHook(() => useExplanationMode());
    expect(result.current.mode).toBe('simple');
  });

  it('switches to technical mode', () => {
    const { result } = renderHook(() => useExplanationMode());
    act(() => {
      result.current.setMode('technical');
    });
    expect(result.current.mode).toBe('technical');
  });

  it('toggles between modes', () => {
    const { result } = renderHook(() => useExplanationMode());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.mode).toBe('technical');
    act(() => {
      result.current.toggle();
    });
    expect(result.current.mode).toBe('simple');
  });

  it('persists mode to localStorage', () => {
    const { result } = renderHook(() => useExplanationMode());
    act(() => {
      result.current.setMode('technical');
    });
    expect(localStorage.getItem('ai-tree-explanation-mode')).toBe('technical');
  });

  it('restores mode from localStorage', () => {
    localStorage.setItem('ai-tree-explanation-mode', 'technical');
    const { result } = renderHook(() => useExplanationMode());
    expect(result.current.mode).toBe('technical');
  });

  it('ignores invalid localStorage values', () => {
    localStorage.setItem('ai-tree-explanation-mode', 'invalid');
    const { result } = renderHook(() => useExplanationMode());
    expect(result.current.mode).toBe('simple');
  });
});
