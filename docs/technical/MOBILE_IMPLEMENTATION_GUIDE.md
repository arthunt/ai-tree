# Mobile Implementation Guide: ConceptBottomSheet

## Quick Start

This guide provides production-ready code snippets for implementing the mobile bottom sheet redesign.

---

## 1. Hook: useBottomSheet

```typescript
// /lib/hooks/useBottomSheet.ts
import { useState, useCallback, useRef, useEffect } from 'react';
import { useMotionValue, useTransform, animate, PanInfo } from 'framer-motion';

type SheetState = 'preview' | 'half' | 'full';

interface UseBottomSheetOptions {
  onClose?: () => void;
  defaultState?: SheetState;
}

export function useBottomSheet({ onClose, defaultState = 'preview' }: UseBottomSheetOptions = {}) {
  const [state, setState] = useState<SheetState>(defaultState);
  const y = useMotionValue(0);
  const isDragging = useRef(false);

  // Calculate heights based on viewport
  const heights = {
    preview: typeof window !== 'undefined' ? window.innerHeight * 0.3 : 300,
    half: typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600,
    full: typeof window !== 'undefined' ? window.innerHeight * 0.9 : 900,
  };

  // Transform for backdrop opacity
  const backdropOpacity = useTransform(
    y,
    [0, heights.preview],
    [0.8, 0]
  );

  // Animate to specific state
  const animateToState = useCallback((newState: SheetState) => {
    setState(newState);
    animate(y, heights[newState], {
      type: 'spring',
      damping: 30,
      stiffness: 300,
    });
  }, [y, heights]);

  // Handle drag end
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Swipe down to close from preview state
    if (state === 'preview' && (velocity > 500 || offset > 150)) {
      onClose?.();
      return;
    }

    // Swipe down to collapse
    if (offset > 100 && velocity > -500) {
      const newState = state === 'full' ? 'half' : state === 'half' ? 'preview' : 'preview';
      animateToState(newState);
      return;
    }

    // Swipe up to expand
    if (offset < -100 && velocity < 500) {
      const newState = state === 'preview' ? 'half' : state === 'half' ? 'full' : 'full';
      animateToState(newState);
      return;
    }

    // Snap back to current state
    animateToState(state);
  }, [state, onClose, animateToState]);

  // Initialize to default state
  useEffect(() => {
    animateToState(defaultState);
  }, [animateToState, defaultState]);

  return {
    state,
    setState: animateToState,
    y,
    heights,
    backdropOpacity,
    handleDragEnd,
    isDragging: isDragging.current,
  };
}
```

---

## 2. Hook: useSwipeNavigation

```typescript
// /lib/hooks/useSwipeNavigation.ts
import { useCallback } from 'react';
import { PanInfo } from 'framer-motion';

interface UseSwipeNavigationOptions {
  onNext?: () => void;
  onPrevious?: () => void;
  threshold?: number; // pixels
  velocityThreshold?: number; // pixels/sec
}

export function useSwipeNavigation({
  onNext,
  onPrevious,
  threshold = 100,
  velocityThreshold = 500,
}: UseSwipeNavigationOptions) {

  const handlePanEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocityX = info.velocity.x;
    const offsetX = info.offset.x;

    // Check if swipe meets threshold
    if (Math.abs(velocityX) < velocityThreshold && Math.abs(offsetX) < threshold) {
      return; // Not a strong enough swipe
    }

    // Swipe left = next
    if (velocityX < 0 || offsetX < -threshold) {
      onNext?.();
      // Trigger haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
    // Swipe right = previous
    else if (velocityX > 0 || offsetX > threshold) {
      onPrevious?.();
      // Trigger haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    }
  }, [onNext, onPrevious, threshold, velocityThreshold]);

  return { handlePanEnd };
}
```

---

## 3. Hook: useHapticFeedback

```typescript
// /lib/hooks/useHapticFeedback.ts
import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

const patterns: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [10, 50, 10],
  warning: [10, 100, 10, 100],
  error: [20, 100, 20],
};

export function useHapticFeedback() {
  const trigger = useCallback((type: HapticType = 'light') => {
    if ('vibrate' in navigator) {
      navigator.vibrate(patterns[type]);
    }
  }, []);

  const canVibrate = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  return { trigger, canVibrate };
}
```

---

## 4. Component: ConceptBottomSheet

```typescript
// /components/mobile/ConceptBottomSheet.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Circle } from 'lucide-react';
import { Concept } from '@/lib/types';
import { useBottomSheet } from '@/lib/hooks/useBottomSheet';
import { useSwipeNavigation } from '@/lib/hooks/useSwipeNavigation';
import { useHapticFeedback } from '@/lib/hooks/useHapticFeedback';
import { ConceptSheetHeader } from './ConceptSheetHeader';
import { ConceptTabNav } from './ConceptTabNav';
import { ConceptContent } from './ConceptContent';
import { ConceptNavigationBar } from './ConceptNavigationBar';
import { useState } from 'react';

interface ConceptBottomSheetProps {
  concept: Concept | null;
  onClose: () => void;
  allConcepts?: Concept[];
  onNavigate?: (conceptId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function ConceptBottomSheet({
  concept,
  onClose,
  allConcepts = [],
  onNavigate,
  isCompleted = false,
  onToggleComplete,
}: ConceptBottomSheetProps) {
  const { state, setState, y, heights, backdropOpacity, handleDragEnd } = useBottomSheet({ onClose });
  const [activeTab, setActiveTab] = useState<'metaphor' | 'technical' | 'code'>('metaphor');
  const { trigger: haptic } = useHapticFeedback();

  // Find current concept position in sequence
  const currentIndex = allConcepts.findIndex(c => c.id === concept?.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allConcepts.length - 1;

  // Navigation handlers
  const handlePrevious = () => {
    if (hasPrevious && onNavigate) {
      onNavigate(allConcepts[currentIndex - 1].id);
      haptic('light');
    }
  };

  const handleNext = () => {
    if (hasNext && onNavigate) {
      onNavigate(allConcepts[currentIndex + 1].id);
      haptic('light');
    }
  };

  const { handlePanEnd: handleSwipe } = useSwipeNavigation({
    onNext: handleNext,
    onPrevious: handlePrevious,
  });

  if (!concept) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="concept-title"
      >
        {/* Backdrop */}
        <motion.div
          style={{ opacity: backdropOpacity }}
          onClick={onClose}
          className="absolute inset-0 bg-black"
        />

        {/* Sheet */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          onPanEnd={handleSwipe}
          style={{
            y,
            height: state === 'preview' ? heights.preview : state === 'half' ? heights.half : heights.full,
          }}
          className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Drag Handle */}
          <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
            <motion.div
              animate={{
                width: state === 'preview' ? 48 : state === 'half' ? 36 : 24,
                backgroundColor: state === 'preview' ? '#9ca3af' : state === 'half' ? '#3b82f6' : '#10b981',
              }}
              className="h-1 rounded-full"
            />
          </div>

          {/* Header */}
          <ConceptSheetHeader
            concept={concept}
            state={state}
            onClose={onClose}
            isCompleted={isCompleted}
            onToggleComplete={() => {
              onToggleComplete?.();
              haptic('success');
            }}
          />

          {/* Tabs (visible in half/full states) */}
          {state !== 'preview' && (
            <ConceptTabNav
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                haptic('light');
              }}
              hasCodeExample={!!concept.codeExample}
            />
          )}

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
            <ConceptContent
              concept={concept}
              activeTab={activeTab}
              state={state}
              allConcepts={allConcepts}
              onNavigate={onNavigate}
            />
          </div>

          {/* Navigation Bar (visible in half/full states) */}
          {state !== 'preview' && (
            <ConceptNavigationBar
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              currentPosition={currentIndex + 1}
              totalCount={allConcepts.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## 5. Component: ConceptSheetHeader

```typescript
// /components/mobile/ConceptSheetHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { X, CheckCircle, Circle, Brain } from 'lucide-react';
import { Concept } from '@/lib/types';
import { getComplexityColor, getComplexityLabel, getReadingTime } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface ConceptSheetHeaderProps {
  concept: Concept;
  state: 'preview' | 'half' | 'full';
  onClose: () => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function ConceptSheetHeader({
  concept,
  state,
  onClose,
  isCompleted,
  onToggleComplete,
}: ConceptSheetHeaderProps) {
  const t = useTranslations('concept');
  const readingTime = getReadingTime(concept);

  if (state === 'preview') {
    // Large preview header
    return (
      <motion.div
        layout
        className="px-4 pb-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 id="concept-title" className="text-xl font-bold mb-2 line-clamp-2">
              {concept.title}
            </h2>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className={`px-2 py-1 rounded-full font-medium ${getComplexityColor(concept.complexity)} bg-white`}>
                {getComplexityLabel(concept.complexity)}
              </span>
              <span className="px-2 py-1 rounded-full font-medium bg-white/90 text-blue-900">
                {readingTime} {t('readingTime')}
              </span>
            </div>
          </div>
        </div>

        {/* Preview text */}
        <p className="text-sm mt-3 line-clamp-2 opacity-90">
          💡 {concept.metaphor}
        </p>

        {/* Call to action */}
        <div className="text-center mt-3 text-xs opacity-75">
          ↑ {t('swipeUpForDetails')}
        </div>
      </motion.div>
    );
  }

  // Compact header for half/full states
  return (
    <motion.div
      layout
      className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3"
    >
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onClose}
          className="p-2 min-h-[44px] min-w-[44px] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label={t('closeDialog')}
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold truncate flex-1 text-center px-2">
          {concept.title}
        </h2>

        <button
          onClick={onToggleComplete}
          className="p-2 min-h-[44px] min-w-[44px] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label={isCompleted ? t('markedComplete') : t('markAsComplete')}
        >
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
```

---

## 6. Component: ConceptTabNav

```typescript
// /components/mobile/ConceptTabNav.tsx
'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Code2, Terminal } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ConceptTabNavProps {
  activeTab: 'metaphor' | 'technical' | 'code';
  onTabChange: (tab: 'metaphor' | 'technical' | 'code') => void;
  hasCodeExample: boolean;
}

export function ConceptTabNav({ activeTab, onTabChange, hasCodeExample }: ConceptTabNavProps) {
  const t = useTranslations('concept');

  const tabs = [
    { id: 'metaphor', label: t('simpleTab'), icon: Lightbulb },
    { id: 'technical', label: t('technicalTab'), icon: Code2 },
    ...(hasCodeExample ? [{ id: 'code', label: t('codeTab'), icon: Terminal }] : []),
  ] as const;

  return (
    <div className="sticky top-[60px] z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as typeof activeTab)}
              className={`flex-1 min-w-[100px] py-3 px-4 flex items-center justify-center gap-2 transition-colors relative ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 7. Component: ConceptNavigationBar

```typescript
// /components/mobile/ConceptNavigationBar.tsx
'use client';

import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ConceptNavigationBarProps {
  hasPrevious: boolean;
  hasNext: boolean;
  currentPosition: number;
  totalCount: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function ConceptNavigationBar({
  hasPrevious,
  hasNext,
  currentPosition,
  totalCount,
  onPrevious,
  onNext,
}: ConceptNavigationBarProps) {
  const t = useTranslations('concept');

  return (
    <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe">
      {/* Progress Indicator */}
      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <BookOpen className="h-4 w-4" />
          <span>{t('progress')}</span>

          {/* Progress dots */}
          <div className="flex items-center gap-1 ml-2">
            {Array.from({ length: Math.min(totalCount, 10) }).map((_, i) => {
              const isCompleted = i < currentPosition - 1;
              const isCurrent = i === currentPosition - 1;

              return (
                <div
                  key={i}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    isCompleted
                      ? 'bg-green-500'
                      : isCurrent
                      ? 'bg-blue-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              );
            })}
          </div>

          <span className="font-medium">
            {currentPosition}/{totalCount}
          </span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center min-h-[48px] transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">{t('previous')}</span>
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center min-h-[48px] transition-colors hover:bg-blue-600"
        >
          <span className="text-sm font-medium">{t('next')}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
```

---

## 8. Responsive Detection

```typescript
// /lib/hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
```

---

## 9. Updated ConceptLightbox (Router)

```typescript
// /components/ConceptLightbox.tsx
'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { ConceptBottomSheet } from './mobile/ConceptBottomSheet';
import { Concept } from '@/lib/types';

interface ConceptLightboxProps {
  concept: Concept | null;
  onClose: () => void;
  allConcepts?: Concept[];
  onNavigate?: (conceptId: string) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function ConceptLightbox(props: ConceptLightboxProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Use bottom sheet on mobile, keep existing modal on desktop
  if (isMobile) {
    return <ConceptBottomSheet {...props} />;
  }

  // Keep existing desktop implementation
  return (
    // ... existing code ...
  );
}
```

---

## 10. Tailwind Config Updates

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe': 'env(safe-area-inset-bottom)',
      },
      height: {
        'sheet-preview': '30vh',
        'sheet-half': '60vh',
        'sheet-full': '90vh',
      },
      zIndex: {
        'sheet': 1000,
        'sheet-backdrop': 999,
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.pb-safe': {
          'padding-bottom': 'env(safe-area-inset-bottom)',
        },
      });
    },
  ],
};
```

---

## 11. Translations

```json
// messages/en.json (add to concept section)
{
  "concept": {
    // ... existing translations ...
    "swipeUpForDetails": "Swipe up for details",
    "simpleTab": "Simple",
    "technicalTab": "Technical",
    "codeTab": "Code",
    "progress": "Learning Path",
    "previous": "Previous",
    "next": "Next"
  }
}
```

---

## Testing Checklist

### Manual Testing
- [ ] Test on iPhone SE (smallest screen)
- [ ] Test on iPhone 15 Pro Max (largest)
- [ ] Test on Android (Samsung, Pixel)
- [ ] Test in landscape orientation
- [ ] Test with iOS safe areas (notch)
- [ ] Test with Android navigation bar
- [ ] Test drag gestures (smooth 60fps)
- [ ] Test swipe navigation
- [ ] Test haptic feedback
- [ ] Test with VoiceOver/TalkBack
- [ ] Test with Reduce Motion enabled

### Performance Testing
```bash
# Lighthouse mobile audit
npx lighthouse https://your-site.com --preset=perf --view

# Bundle size impact
npx next build --analyze
```

### Accessibility Testing
```bash
# Run axe DevTools
npx @axe-core/cli https://your-site.com --mobile
```

---

## Deployment Strategy

### Phase 1: Feature Flag (Week 1)
```typescript
// Enable for internal testing only
const USE_MOBILE_SHEET = process.env.NEXT_PUBLIC_MOBILE_SHEET === 'true';

if (isMobile && USE_MOBILE_SHEET) {
  return <ConceptBottomSheet {...props} />;
}
```

### Phase 2: Gradual Rollout (Week 2-3)
```typescript
// Enable for 10% of mobile users
const USE_MOBILE_SHEET = Math.random() < 0.1;
```

### Phase 3: Full Launch (Week 4)
```typescript
// Enable for all mobile users
if (isMobile) {
  return <ConceptBottomSheet {...props} />;
}
```

---

**Last Updated:** 2026-01-28
**Status:** Ready for Implementation
