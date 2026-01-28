'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { PanInfo } from 'framer-motion';

export type SheetState = 'closed' | 'preview' | 'half' | 'full';

interface SheetHeights {
  preview: number;
  half: number;
  full: number;
}

interface UseBottomSheetOptions {
  initialState?: SheetState;
  heights?: Partial<SheetHeights>;
  onStateChange?: (state: SheetState) => void;
  onClose?: () => void;
}

interface UseBottomSheetReturn {
  state: SheetState;
  y: number;
  heights: SheetHeights;
  setState: (state: SheetState) => void;
  open: (initialState?: SheetState) => void;
  close: () => void;
  expand: () => void;
  collapse: () => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  getSnapPoint: () => number;
  isOpen: boolean;
}

const DEFAULT_HEIGHTS: SheetHeights = {
  preview: 30, // 30vh
  half: 60,    // 60vh
  full: 92,    // 92vh (leave space for status bar)
};

// Velocity threshold for flick gestures
const VELOCITY_THRESHOLD = 500;
// Distance threshold for state change
const DISTANCE_THRESHOLD = 50;

export function useBottomSheet(options: UseBottomSheetOptions = {}): UseBottomSheetReturn {
  const {
    initialState = 'closed',
    heights: customHeights,
    onStateChange,
    onClose,
  } = options;

  const heights: SheetHeights = useMemo(() => ({
    ...DEFAULT_HEIGHTS,
    ...customHeights,
  }), [customHeights?.preview, customHeights?.half, customHeights?.full]);

  const [state, setStateInternal] = useState<SheetState>(initialState);
  const previousState = useRef<SheetState>(state);

  // Calculate Y position based on state (inverted because sheet comes from bottom)
  const getYForState = useCallback((s: SheetState): number => {
    switch (s) {
      case 'closed':
        return 100; // Off screen
      case 'preview':
        return 100 - heights.preview;
      case 'half':
        return 100 - heights.half;
      case 'full':
        return 100 - heights.full;
      default:
        return 100;
    }
  }, [heights]);

  const [y, setY] = useState(() => getYForState(initialState));

  // Update Y when state changes
  useEffect(() => {
    setY(getYForState(state));
  }, [state, getYForState]);

  const setState = useCallback((newState: SheetState) => {
    if (newState !== state) {
      previousState.current = state;
      setStateInternal(newState);
      onStateChange?.(newState);

      if (newState === 'closed') {
        onClose?.();
      }
    }
  }, [state, onStateChange, onClose]);

  const open = useCallback((openState: SheetState = 'preview') => {
    setState(openState);
  }, [setState]);

  const close = useCallback(() => {
    setState('closed');
  }, [setState]);

  const expand = useCallback(() => {
    const states: SheetState[] = ['closed', 'preview', 'half', 'full'];
    const currentIndex = states.indexOf(state);
    if (currentIndex < states.length - 1) {
      setState(states[currentIndex + 1]);
    }
  }, [state, setState]);

  const collapse = useCallback(() => {
    const states: SheetState[] = ['closed', 'preview', 'half', 'full'];
    const currentIndex = states.indexOf(state);
    if (currentIndex > 0) {
      setState(states[currentIndex - 1]);
    }
  }, [state, setState]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { velocity, offset } = info;
      const currentY = getYForState(state);
      const draggedY = currentY + (offset.y / window.innerHeight) * 100;

      // Fast flick gesture
      if (Math.abs(velocity.y) > VELOCITY_THRESHOLD) {
        if (velocity.y > 0) {
          // Flicking down - collapse or close
          collapse();
        } else {
          // Flicking up - expand
          expand();
        }
        return;
      }

      // Slow drag - snap to nearest state
      const distanceMoved = Math.abs(offset.y);
      if (distanceMoved < DISTANCE_THRESHOLD) {
        // Not enough movement, stay in current state
        return;
      }

      // Determine target state based on position
      const previewY = getYForState('preview');
      const halfY = getYForState('half');
      const fullY = getYForState('full');

      if (offset.y > 0) {
        // Dragging down
        if (state === 'full' && draggedY > (fullY + halfY) / 2) {
          setState('half');
        } else if (state === 'half' && draggedY > (halfY + previewY) / 2) {
          setState('preview');
        } else if (state === 'preview' && draggedY > previewY + 10) {
          setState('closed');
        }
      } else {
        // Dragging up
        if (state === 'preview' && draggedY < (previewY + halfY) / 2) {
          setState('half');
        } else if (state === 'half' && draggedY < (halfY + fullY) / 2) {
          setState('full');
        }
      }
    },
    [state, getYForState, setState, expand, collapse]
  );

  const getSnapPoint = useCallback((): number => {
    return getYForState(state);
  }, [state, getYForState]);

  return {
    state,
    y,
    heights,
    setState,
    open,
    close,
    expand,
    collapse,
    handleDragEnd,
    getSnapPoint,
    isOpen: state !== 'closed',
  };
}
