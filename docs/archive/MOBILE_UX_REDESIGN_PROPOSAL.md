# Mobile UX Redesign Proposal: ConceptLightbox

## Executive Summary

The current ConceptLightbox modal overwhelms mobile users with vertically stacked content sections, a large sticky header, and limited navigation context. This proposal recommends a **progressive disclosure pattern with bottom-sheet variant** that supports gesture-based navigation, clear learning journey positioning, and reduced cognitive load.

---

## 1. RECOMMENDED PATTERN: Progressive Disclosure Bottom Sheet

### Pattern Selection Reasoning

After analyzing mobile UX patterns against design goals:

| Pattern | Pros | Cons | Score |
|---------|------|------|-------|
| **Bottom Sheet** ✅ | • Familiar mobile gesture<br>• Partial screen (less overwhelming)<br>• Quick dismiss with swipe<br>• Natural for content preview | • Limited space for long content<br>• Can be small for complex concepts | 8/10 |
| Full-Screen Page | • Maximum space<br>• Clear navigation | • Heavy interaction (push nav)<br>• Loses tree context<br>• Harder to scan quickly | 6/10 |
| Tabs/Segmented | • Good content organization<br>• Clear sections | • Requires navigation taps<br>• Still needs space solution | 7/10 |
| Progressive Disclosure | • Reduces overwhelm<br>• Supports scanning | • More interactions needed<br>• Can hide important info | 8/10 |
| Card Stack | • Fun interaction<br>• Clear position | • Unfamiliar for educational content<br>• Harder to reference | 5/10 |

**RECOMMENDATION:** Hybrid approach combining **Progressive Disclosure + Bottom Sheet + Tabs**

---

## 2. MOBILE LAYOUT STRUCTURE

### 2.1 Three-State Bottom Sheet

```
┌─────────────────────────────────┐
│  [Tree visualization remains]   │ ← Context preserved
│  [visible in background]        │
│                                  │
│  ┌─────────────────────────┐   │
│  │ ⚊⚊⚊  (Drag handle)      │   │ STATE 1: Preview (30% height)
│  │ ┌─┐                      │   │ • Title + icon
│  │ └─┘ Concept Title        │   │ • Metaphor (2 lines)
│  │ 🎯 2-3 min • Beginner   │   │ • Complexity badge
│  │                          │   │ • "Swipe up for details"
│  │ 💡 "Think of it as..."  │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘

               ⬇ SWIPE UP

┌─────────────────────────────────┐
│ ⚊⚊⚊                            │
│ [X] Concept Title          [✓]  │ ← Sticky header (compact)
│ 🎯 2-3 min • Beginner           │
│─────────────────────────────────│ STATE 2: Half-screen (60% height)
│ [Metaphor] [Technical] [Code]   │ ← Tabs for content
│                                  │
│ 💡 Metaphor Content              │ ← Scrollable content area
│ "Think of vectors as..."         │
│                                  │
│ ⚠️  Prerequisites (if any)       │
│ [Prerequisite cards]             │
│                                  │
│ [Mark Complete] [Share →]       │ ← Actions
└─────────────────────────────────┘

               ⬇ SWIPE UP

┌─────────────────────────────────┐
│ ⚊⚊⚊ [X]                   [✓]  │ STATE 3: Full-screen (90% height)
│ Concept Title                    │ ← Minimal header
│─────────────────────────────────│
│ [Metaphor] [Technical] [Code]   │ ← Tabs
│                                  │
│ [Full scrollable content]        │
│ • Prerequisites section          │
│ • Metaphor section               │
│ • Technical explanation          │
│ • Code examples                  │
│ • Related concepts               │
│                                  │
│ ⬅️ Previous  [2/5]  Next ➡️     │ ← Navigation footer
│ [Mark Complete] [Share]          │
└─────────────────────────────────┘
```

### 2.2 Header Transformation (Mobile-Optimized)

**BEFORE (Current):**
```tsx
// Takes up 200-250px on mobile
<div className="sticky top-0 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8">
  <div className="flex items-start gap-4">
    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
      <IconComponent className="h-10 w-10" />
    </div>
    <div>
      <h2 className="text-4xl font-bold mb-2">{concept.title}</h2>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Multiple badges + share buttons */}
      </div>
    </div>
  </div>
</div>
```

**AFTER (Mobile-First):**
```tsx
// STATE 1 (Preview): 80px compact header
<div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-t-3xl">
  <div className="flex items-center gap-3">
    <div className="p-2 bg-white/20 rounded-xl">
      <IconComponent className="h-6 w-6" />
    </div>
    <div className="flex-1 min-w-0">
      <h2 className="text-xl font-bold truncate">{concept.title}</h2>
      <div className="flex items-center gap-2 text-xs">
        <span className="badge">{complexity}</span>
        <span>{readingTime}</span>
      </div>
    </div>
    <button className="p-2" aria-label="Close">
      <X className="h-5 w-5" />
    </button>
  </div>
</div>

// STATE 2/3 (Expanded): 60px minimal header
<div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b shadow-sm">
  <div className="flex items-center justify-between px-4 py-3">
    <button onClick={onClose} className="p-2">
      <X className="h-5 w-5" />
    </button>
    <h2 className="text-lg font-semibold truncate flex-1 text-center px-4">
      {concept.title}
    </h2>
    <button onClick={onToggleComplete} className="p-2">
      {isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5" />}
    </button>
  </div>
</div>
```

### 2.3 Content Organization with Tabs

**Tab Structure (Reduces Scrolling):**

```tsx
// Replace vertical stacking with horizontal tabs
<div className="border-b border-gray-200 dark:border-gray-700 sticky top-[60px] bg-white dark:bg-gray-800 z-10">
  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
    <TabButton active={activeTab === 'metaphor'} onClick={() => setActiveTab('metaphor')}>
      <Lightbulb className="h-4 w-4" />
      <span>Simple</span>
    </TabButton>
    <TabButton active={activeTab === 'technical'} onClick={() => setActiveTab('technical')}>
      <Code2 className="h-4 w-4" />
      <span>Technical</span>
    </TabButton>
    {concept.codeExample && (
      <TabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
        <Terminal className="h-4 w-4" />
        <span>Code</span>
      </TabButton>
    )}
  </div>
</div>

{/* Content panels with smooth transitions */}
<div className="p-4 space-y-4">
  <AnimatePresence mode="wait">
    {activeTab === 'metaphor' && (
      <motion.div key="metaphor" {...tabAnimation}>
        {prerequisites.length > 0 && <PrerequisitesSection />}
        <MetaphorSection content={concept.metaphor} />
      </motion.div>
    )}
    {activeTab === 'technical' && (
      <motion.div key="technical" {...tabAnimation}>
        <TechnicalSection content={concept.explanation} />
      </motion.div>
    )}
    {activeTab === 'code' && concept.codeExample && (
      <motion.div key="code" {...tabAnimation}>
        <CodeExampleSection example={concept.codeExample} />
      </motion.div>
    )}
  </AnimatePresence>
</div>
```

---

## 3. NAVIGATION ELEMENTS

### 3.1 Position Indicator (Learning Journey Context)

```tsx
// Bottom navigation bar (Safe area aware)
<div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t shadow-lg pb-safe">
  {/* Progress through concept sequence */}
  <div className="px-4 py-2 border-b">
    <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
      <BookOpen className="h-4 w-4" />
      <span>Beginner Path</span>
      <div className="flex items-center gap-1 ml-2">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`h-1.5 w-6 rounded-full ${
              step < currentPosition ? 'bg-green-500' :
              step === currentPosition ? 'bg-blue-500' :
              'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="font-medium">{currentPosition}/5</span>
    </div>
  </div>

  {/* Navigation controls */}
  <div className="flex items-center justify-between px-4 py-3 gap-4">
    <button
      onClick={onPrevious}
      disabled={!hasPrevious}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center"
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="text-sm font-medium">Previous</span>
    </button>

    <button
      onClick={onNext}
      disabled={!hasNext}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed flex-1 justify-center"
    >
      <span className="text-sm font-medium">Next</span>
      <ArrowRight className="h-4 w-4" />
    </button>
  </div>
</div>
```

### 3.2 Back Navigation Pattern

**Option A: Swipe Down (Primary)**
- Natural mobile gesture
- Works from any scroll position
- Visual feedback with drag handle

**Option B: Tap Outside (Secondary)**
- Familiar modal pattern
- No learning curve

**Option C: X Button (Fallback)**
- Always visible in header
- Clear affordance

```tsx
// Swipe-down-to-close implementation
const { height: sheetHeight } = useDragControls({
  onDragEnd: (velocity, distance) => {
    if (velocity > 500 || distance > 150) {
      onClose(); // Close if swiped down with force
    }
  }
});
```

---

## 4. GESTURE INTERACTIONS

### 4.1 Core Gestures

| Gesture | Action | Visual Feedback |
|---------|--------|-----------------|
| **Swipe Up** | Expand sheet (Preview → Half → Full) | Sheet slides up, content fades in |
| **Swipe Down** | Collapse/Close sheet | Sheet slides down, haptic feedback |
| **Swipe Left** | Next concept (if available) | Card slides left, next card enters |
| **Swipe Right** | Previous concept (if available) | Card slides right, prev card enters |
| **Tap Outside** | Close sheet (dismiss) | Sheet shrinks with fade out |
| **Pinch In** | Collapse to preview state | Smooth scale transition |

### 4.2 Implementation Details

```tsx
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion';

function ConceptBottomSheet({ concept, onClose, onNavigate }) {
  const y = useMotionValue(0);
  const [sheetState, setSheetState] = useState<'preview' | 'half' | 'full'>('preview');

  // Calculate sheet height based on state
  const heights = {
    preview: window.innerHeight * 0.3,
    half: window.innerHeight * 0.6,
    full: window.innerHeight * 0.9
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const velocity = info.velocity.y;
    const offset = info.offset.y;

    // Swipe down to close (when in preview state)
    if (sheetState === 'preview' && (velocity > 500 || offset > 150)) {
      onClose();
      return;
    }

    // Swipe down to collapse
    if (offset > 100) {
      const newState = sheetState === 'full' ? 'half' : 'preview';
      setSheetState(newState);
      animate(y, heights[newState]);
    }

    // Swipe up to expand
    if (offset < -100) {
      const newState = sheetState === 'preview' ? 'half' : 'full';
      setSheetState(newState);
      animate(y, heights[newState]);
    }
  };

  // Horizontal swipe for navigation
  const handleSwipeX = (event: MouseEvent | TouchEvent, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) > 500 && Math.abs(info.offset.x) > threshold) {
      if (velocity < 0) {
        onNavigate('next'); // Swipe left = next
      } else {
        onNavigate('previous'); // Swipe right = previous
      }
    }
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{ y, height: heights[sheetState] }}
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl"
    >
      {/* Drag handle */}
      <div className="flex justify-center py-3">
        <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>

      {/* Content */}
      {/* ... */}
    </motion.div>
  );
}
```

### 4.3 Haptic Feedback (iOS/Android)

```tsx
// Add haptic feedback on key interactions
const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10]
    };
    navigator.vibrate(patterns[type]);
  }
};

// Usage
onStateChange={() => {
  triggerHaptic('light'); // When expanding/collapsing
}};

onComplete={() => {
  triggerHaptic('success'); // When marking as complete
}};
```

---

## 5. ANIMATION & TRANSITION SUGGESTIONS

### 5.1 Sheet Animations

```tsx
// Smooth spring animations for natural feel
const sheetVariants = {
  preview: {
    y: '70%',
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  half: {
    y: '40%',
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  },
  full: {
    y: '10%',
    transition: { type: 'spring', damping: 30, stiffness: 300 }
  }
};

// Tab transitions
const tabAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 }
};

// Content fade-in as sheet expands
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### 5.2 Micro-interactions

1. **Prerequisite badges**: Scale up on hover, pulse if incomplete
2. **Tab switches**: Underline slides with accent color
3. **Complete button**: Checkmark animates in with success color
4. **Share buttons**: Icons bounce on tap
5. **Scroll indicators**: Fade in/out based on scroll position

```tsx
// Example: Prerequisite badge animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  animate={!isCompleted ? {
    boxShadow: [
      '0 0 0 0 rgba(245, 158, 11, 0.4)',
      '0 0 0 10px rgba(245, 158, 11, 0)'
    ]
  } : {}}
  transition={{ duration: 1.5, repeat: Infinity }}
>
  {/* Badge content */}
</motion.button>
```

---

## 6. SPECIFIC CSS/COMPONENT CHANGES

### 6.1 New Components to Create

```
/components/mobile/
├── ConceptBottomSheet.tsx       (Main bottom sheet container)
├── ConceptSheetHeader.tsx       (Sticky header with states)
├── ConceptTabNav.tsx            (Tab navigation)
├── ConceptNavigationBar.tsx     (Bottom nav with position)
├── ConceptSheetHandle.tsx       (Drag handle with state indicator)
└── hooks/
    ├── useBottomSheet.ts        (Sheet state management)
    ├── useSwipeNavigation.ts    (Horizontal swipe for prev/next)
    └── useHapticFeedback.ts     (Cross-platform haptics)
```

### 6.2 ConceptLightbox Modifications

```tsx
// Add mobile detection and conditional rendering
'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { ConceptBottomSheet } from './mobile/ConceptBottomSheet';

export function ConceptLightbox(props: ConceptLightboxProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isMobile) {
    return <ConceptBottomSheet {...props} />;
  }

  // Desktop modal (keep existing implementation)
  return <DesktopConceptModal {...props} />;
}
```

### 6.3 Key CSS Utilities

```css
/* tailwind.config.js additions */
module.exports = {
  theme: {
    extend: {
      spacing: {
        'safe': 'env(safe-area-inset-bottom)', // iOS safe area
      },
      height: {
        'sheet-preview': '30vh',
        'sheet-half': '60vh',
        'sheet-full': '90vh',
      },
      zIndex: {
        'sheet': '1000',
        'sheet-backdrop': '999',
      }
    }
  },
  plugins: [
    // Add scrollbar-hide utility
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ]
}
```

### 6.4 Accessibility Enhancements

```tsx
// ARIA live region for state changes
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="concept-title"
  aria-describedby="concept-description"
  aria-live="polite" // Announce state changes
>
  {/* Sheet content */}
</div>

// Keyboard navigation (desktop fallback)
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch(e.key) {
      case 'ArrowLeft':
        onNavigate('previous');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [onNavigate, onClose]);

// Focus management
const sheetRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen && sheetRef.current) {
    // Move focus to first interactive element
    const firstButton = sheetRef.current.querySelector('button');
    firstButton?.focus();
  }
}, [isOpen]);
```

---

## 7. IMPLEMENTATION ROADMAP

### Phase 1: Core Bottom Sheet (Week 1)
- [ ] Create `useBottomSheet` hook with 3-state logic
- [ ] Build `ConceptBottomSheet` component
- [ ] Implement drag-to-collapse/expand
- [ ] Add responsive height calculations
- [ ] Test on iOS Safari, Chrome Android

### Phase 2: Content Tabs (Week 1-2)
- [ ] Create `ConceptTabNav` component
- [ ] Implement tab state management
- [ ] Add smooth content transitions
- [ ] Optimize content rendering (lazy load code examples)

### Phase 3: Navigation & Position (Week 2)
- [ ] Build `ConceptNavigationBar` component
- [ ] Implement concept sequence detection
- [ ] Add progress indicators
- [ ] Integrate with existing concept navigation logic

### Phase 4: Gestures & Polish (Week 2-3)
- [ ] Implement horizontal swipe navigation
- [ ] Add haptic feedback
- [ ] Fine-tune animations (60fps target)
- [ ] Add loading states and error boundaries

### Phase 5: Testing & Optimization (Week 3)
- [ ] Cross-device testing (iOS 15+, Android 10+)
- [ ] Performance profiling (Lighthouse mobile score)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] A/B test with users (completion rates)

---

## 8. EXPECTED OUTCOMES

### Quantitative Improvements
- **Reduced Time to Comprehension**: 40% faster scanning with preview state
- **Increased Engagement**: 25% more concepts viewed per session
- **Higher Completion Rates**: 30% more users marking concepts complete
- **Lower Bounce Rate**: 20% fewer exits during concept reading

### Qualitative Improvements
- **Cognitive Load**: Less overwhelming with progressive disclosure
- **Orientation**: Clear position in learning journey
- **Discoverability**: Gesture hints teach navigation patterns
- **Accessibility**: Better screen reader support, larger touch targets

### Performance Metrics
- **First Contentful Paint**: < 1.5s on 3G
- **Time to Interactive**: < 3s on mobile
- **Animation Frame Rate**: Consistent 60fps
- **Bundle Size Impact**: +8KB gzipped (acceptable for UX gain)

---

## 9. ALTERNATIVE CONSIDERATIONS

### If Bottom Sheet Feels Too Complex

**Fallback Pattern: Accordion-Style Full-Screen Modal**

```tsx
// Simpler alternative maintaining current modal structure
<motion.div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto">
  {/* Compact header - always visible */}
  <CompactHeader concept={concept} onClose={onClose} />

  {/* Collapsible sections with animated expand/collapse */}
  <div className="p-4 space-y-3">
    <CollapsibleSection title="Simple Explanation" icon={Lightbulb} defaultOpen>
      <p>{concept.metaphor}</p>
    </CollapsibleSection>

    <CollapsibleSection title="Technical Details" icon={Code2}>
      <p>{concept.explanation}</p>
    </CollapsibleSection>

    {concept.codeExample && (
      <CollapsibleSection title="Code Example" icon={Terminal}>
        <CodeBlock {...concept.codeExample} />
      </CollapsibleSection>
    )}
  </div>

  {/* Bottom navigation */}
  <NavigationBar />
</motion.div>
```

**Pros:**
- Simpler to implement (2-3 days vs 2-3 weeks)
- Less cognitive load than tabs
- Still reduces scrolling via collapse

**Cons:**
- Less engaging interaction
- No gestural learning
- Doesn't leverage bottom-sheet familiarity

---

## 10. DESIGN SYSTEM INTEGRATION

### New Design Tokens

```tsx
// theme/mobile.ts
export const mobileSheet = {
  heights: {
    preview: '30vh',
    half: '60vh',
    full: '90vh',
  },
  transitions: {
    sheet: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
    content: 'opacity 0.2s ease-in-out',
  },
  zIndex: {
    backdrop: 999,
    sheet: 1000,
    header: 1001,
  },
  dragHandle: {
    width: '48px',
    height: '4px',
    color: 'gray.300',
    activeColor: 'blue.500',
  },
};
```

### Component Variants

```tsx
// Button variants for mobile contexts
const buttonVariants = {
  mobile: {
    minHeight: '48px', // Meets touch target size
    minWidth: '48px',
    fontSize: '16px', // Prevents iOS zoom on focus
    padding: '12px 24px',
  },
  mobileCompact: {
    minHeight: '44px',
    minWidth: '44px',
    fontSize: '14px',
    padding: '10px 20px',
  },
};
```

---

## 11. USER TESTING PLAN

### Prototype Testing (Pre-Development)

**Interactive Figma Prototype:**
1. **Task 1**: Find and read "Vectors" concept
2. **Task 2**: Navigate to next concept in beginner path
3. **Task 3**: Mark a concept as complete
4. **Task 4**: Share a concept

**Success Metrics:**
- Task completion rate > 85%
- Time on task < 45 seconds
- SUS score > 75

### Beta Testing (Post-Development)

**Cohort:** 50 mobile users (25 iOS, 25 Android)

**A/B Test:**
- **Group A**: New bottom sheet design
- **Group B**: Current modal (control)

**Metrics to Track:**
- Concepts viewed per session
- Average session duration
- Completion button clicks
- Share actions
- Exit rate during concept viewing

---

## 12. CONCLUSION & RECOMMENDATION

The **Progressive Disclosure Bottom Sheet** pattern best serves mobile users of the AI Tree learning platform by:

1. ✅ **Reducing cognitive overwhelm** with 3-state progressive disclosure
2. ✅ **Supporting quick scanning** via preview state and tabs
3. ✅ **Enabling one-handed use** with gesture-based navigation
4. ✅ **Providing clear context** with position indicators
5. ✅ **Maintaining engagement** with smooth animations and haptic feedback

**Next Steps:**
1. Validate design with 5-user prototype test
2. Begin Phase 1 implementation (bottom sheet core)
3. Iterate based on user feedback during beta
4. Roll out gradually with feature flag

**Timeline:** 3 weeks development + 1 week testing = **4 weeks to production**

**Resources Required:**
- 1 Frontend Engineer (full-time)
- 1 UX Designer (20% for testing support)
- Access to mobile device lab (iOS 15+, Android 10+)

---

**Document Version:** 1.0
**Author:** Mobile UX Design Team
**Date:** 2026-01-28
**Status:** Awaiting Stakeholder Review
