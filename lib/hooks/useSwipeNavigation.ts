'use client';

import { useCallback, useRef } from 'react';
import { PanInfo } from 'framer-motion';

interface UseSwipeNavigationOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  velocityThreshold?: number;
  enabled?: boolean;
}

interface UseSwipeNavigationReturn {
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragStart: () => void;
  isDragging: boolean;
}

const DEFAULT_THRESHOLD = 50; // pixels
const DEFAULT_VELOCITY_THRESHOLD = 300; // pixels per second

export function useSwipeNavigation(
  options: UseSwipeNavigationOptions = {}
): UseSwipeNavigationReturn {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = DEFAULT_THRESHOLD,
    velocityThreshold = DEFAULT_VELOCITY_THRESHOLD,
    enabled = true,
  } = options;

  const isDraggingRef = useRef(false);

  const handleDragStart = useCallback(() => {
    isDraggingRef.current = true;
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      isDraggingRef.current = false;

      if (!enabled) return;

      const { velocity, offset } = info;
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);

      // Determine if this is a horizontal or vertical swipe
      const isHorizontal = absX > absY;

      if (isHorizontal) {
        // Horizontal swipe
        const isSignificant = absX > threshold || Math.abs(velocity.x) > velocityThreshold;

        if (isSignificant) {
          if (offset.x < 0 && onSwipeLeft) {
            onSwipeLeft();
          } else if (offset.x > 0 && onSwipeRight) {
            onSwipeRight();
          }
        }
      } else {
        // Vertical swipe
        const isSignificant = absY > threshold || Math.abs(velocity.y) > velocityThreshold;

        if (isSignificant) {
          if (offset.y < 0 && onSwipeUp) {
            onSwipeUp();
          } else if (offset.y > 0 && onSwipeDown) {
            onSwipeDown();
          }
        }
      }
    },
    [enabled, threshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]
  );

  return {
    handleDragEnd,
    handleDragStart,
    isDragging: isDraggingRef.current,
  };
}
