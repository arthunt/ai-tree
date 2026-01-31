# Mobile Redesign - Quick Reference Card

## 🎯 The Problem in 3 Points
1. Header = 30% of screen (too big)
2. 1500px scroll distance (3x screen height)
3. No navigation context (users lost)

## ✅ The Solution in 3 Points
1. Progressive bottom sheet (30% → 60% → 90%)
2. Tab-based content (60% less scrolling)
3. Learning journey indicators (progress + nav)

---

## 📱 Three States

```
PREVIEW (30%)     HALF (60%)        FULL (90%)
┌──────────┐      ┌──────────┐      ┌──────────┐
│ Tree     │      │ ⚊⚊⚊     │      │ ⚊⚊⚊ [X] │
│ visible  │      │ [X]  [✓] │      │          │
│          │      │──────────│      │──────────│
│ ┌──────┐ │      │ [Tabs]   │      │ [Tabs]   │
│ │Title │ │      │──────────│      │──────────│
│ │Badge │ │      │          │      │          │
│ │💡"..." │      │ Content  │      │ Full     │
│ │Swipe↑│ │      │ scrolls  │      │ Content  │
│ └──────┘ │      │          │      │          │
└──────────┘      │ ⬅️[2/5]➡️│      │ ⬅️[2/5]➡️│
                  └──────────┘      └──────────┘
```

---

## 🎨 Key Components

```typescript
// 1. Main container
<ConceptBottomSheet
  concept={concept}
  onClose={handleClose}
  onNavigate={handleNavigate}
/>

// 2. Sheet state hook
const { state, setState, handleDragEnd } = useBottomSheet({ onClose });

// 3. Navigation hook
const { handlePanEnd } = useSwipeNavigation({
  onNext: goToNext,
  onPrevious: goToPrevious
});

// 4. Haptic feedback
const { trigger } = useHapticFeedback();
trigger('success'); // On complete
```

---

## 📐 Design Specs

### Heights
- Preview: `30vh` (300px @ 1000px screen)
- Half: `60vh` (600px @ 1000px screen)
- Full: `90vh` (900px @ 1000px screen)

### Touch Targets
- Minimum: `44x44px` (Apple HIG)
- Spacing: `16px` between targets
- Tap area: `min-h-[44px] min-w-[44px]`

### Header Sizes
```css
Preview:  80px  (compact with badges)
Expanded: 60px  (minimal with X + ✓)
```

### Safe Areas
```css
padding-bottom: env(safe-area-inset-bottom);
/* Handles iOS notch + Android nav bar */
```

---

## 🎭 Animations

### Spring Config
```typescript
{ type: 'spring', damping: 30, stiffness: 300 }
```

### Durations
- Sheet slide: `300ms`
- Tab switch: `200ms`
- Content fade: `150ms`

### Easing
```css
transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
```

---

## 🖐️ Gestures

| Gesture | Action | Threshold |
|---------|--------|-----------|
| Swipe Up ⬆️ | Expand | -100px or 500px/s |
| Swipe Down ⬇️ | Collapse/Close | +100px or 500px/s |
| Swipe Left ⬅️ | Next concept | -100px or 500px/s |
| Swipe Right ➡️ | Previous concept | +100px or 500px/s |
| Tap Outside | Close | N/A |

---

## 🎯 Haptic Patterns

```typescript
{
  light: 10ms,              // State changes
  medium: 20ms,             // Navigation edge
  heavy: 30ms,              // Unused
  success: [10, 50, 10],    // Mark complete
  warning: [10, 100, 10, 100], // Prerequisites
  error: [20, 100, 20]      // Error actions
}
```

---

## 📊 Performance Targets

| Metric | Target | Critical? |
|--------|--------|-----------|
| FCP | < 1.5s | ✅ Yes |
| TTI | < 3s | ✅ Yes |
| FPS | 60fps | ✅ Yes |
| Bundle | < 10KB | ⚠️ Medium |

---

## ♿ Accessibility

```typescript
// ARIA attributes
role="dialog"
aria-modal="true"
aria-labelledby="concept-title"
aria-describedby="concept-description"

// Focus management
closeButtonRef.current?.focus(); // On open

// Keyboard support
Escape → Close
ArrowLeft → Previous
ArrowRight → Next
Tab → Cycle through interactive elements
```

---

## 🧪 Testing Checklist

### Devices
- [ ] iPhone SE (smallest screen)
- [ ] iPhone 15 Pro Max (largest + notch)
- [ ] Android (Samsung + Pixel)

### Features
- [ ] 3-state transitions
- [ ] Swipe gestures (all 4 directions)
- [ ] Tab switching
- [ ] Navigation buttons
- [ ] Haptic feedback
- [ ] Landscape orientation

### Accessibility
- [ ] VoiceOver (iOS)
- [ ] TalkBack (Android)
- [ ] Keyboard navigation
- [ ] Reduced motion
- [ ] High contrast

---

## 📦 Files to Create

```
/components/mobile/
├── ConceptBottomSheet.tsx       (Main container)
├── ConceptSheetHeader.tsx       (Adaptive header)
├── ConceptTabNav.tsx            (Tab navigation)
├── ConceptContent.tsx           (Content renderer)
├── ConceptNavigationBar.tsx     (Bottom nav)
└── ConceptSheetHandle.tsx       (Drag handle)

/lib/hooks/
├── useBottomSheet.ts            (State management)
├── useSwipeNavigation.ts        (Horizontal swipe)
├── useHapticFeedback.ts         (Haptics)
└── useMediaQuery.ts             (Responsive)
```

---

## 🚀 4-Week Timeline

```
Week 1: Core Sheet
├─ useBottomSheet hook
├─ ConceptBottomSheet component
├─ Drag gestures
└─ Safe area support

Week 2: Content + Nav
├─ Tab navigation
├─ Content transitions
├─ Navigation bar
└─ Concept sequencing

Week 3: Polish
├─ Horizontal swipe
├─ Haptic feedback
├─ 60fps animations
└─ Loading states

Week 4: Testing
├─ Cross-device testing
├─ Accessibility audit
├─ Performance profiling
└─ A/B test setup
```

---

## 📈 Success Metrics

### Primary KPIs (3 months)
- Mobile engagement: **+25%** (concepts viewed per session)
- Completion rate: **+30%** (concepts marked complete)
- Bounce rate: **-20%** (exits during concept view)
- NPS: **+10 points** (mobile user satisfaction)

### How to Measure
```typescript
// Analytics tracking
analytics.track('concept_sheet_expanded', {
  conceptId: concept.id,
  fromState: 'preview',
  toState: 'half',
  timeInPreview: 3.2
});

analytics.track('concept_navigation_gesture', {
  type: 'swipe_left',
  fromConcept: 'vectors',
  toConcept: 'attention'
});

analytics.track('concept_marked_complete', {
  conceptId: concept.id,
  timeSpent: 45,
  tabsViewed: ['metaphor', 'technical']
});
```

---

## 🎨 Tailwind Classes

### Common Patterns
```tsx
// Bottom sheet container
className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl"

// Drag handle
className="w-12 h-1 bg-gray-300 rounded-full"

// Tab button
className="flex-1 py-3 px-4 flex items-center justify-center gap-2 relative"

// Touch target (minimum 44x44px)
className="p-2 min-h-[44px] min-w-[44px]"

// Safe area padding
className="pb-safe"

// Hide scrollbar
className="overflow-y-auto scrollbar-hide"
```

---

## 🔧 Quick Fixes

### Problem: Animations lag on old devices
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const transition = prefersReducedMotion
  ? { duration: 0 }
  : { type: 'spring', damping: 30, stiffness: 300 };
```

### Problem: Sheet doesn't respect safe area
```css
/* Add to Tailwind config */
pb-safe: {
  'padding-bottom': 'env(safe-area-inset-bottom)'
}
```

### Problem: Gestures conflict with scrolling
```typescript
// Only handle swipe if not vertically scrolling
const handlePan = (e, info) => {
  if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
    return; // Vertical scroll, ignore
  }
  // Handle horizontal swipe
};
```

---

## 📝 Code Snippets

### Responsive Detection
```typescript
const isMobile = useMediaQuery('(max-width: 768px)');

if (isMobile) {
  return <ConceptBottomSheet {...props} />;
}
return <DesktopModal {...props} />;
```

### State Management
```typescript
const [state, setState] = useState<'preview' | 'half' | 'full'>('preview');

const handleExpand = () => {
  const next = state === 'preview' ? 'half' : 'full';
  setState(next);
  haptic('light');
};
```

### Swipe Detection
```typescript
const handleDragEnd = (e, info) => {
  const { velocity, offset } = info;

  if (velocity.y > 500 || offset.y > 150) {
    onClose(); // Swipe down to close
  } else if (velocity.y < -500 || offset.y < -150) {
    expandToNextState(); // Swipe up to expand
  }
};
```

---

## 🎓 Learning Resources

### Framer Motion (Animations)
- Docs: https://www.framer.com/motion/
- Gestures: https://www.framer.com/motion/gestures/

### Mobile UX Patterns
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/
- Material Design: https://m3.material.io/

### Accessibility
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Mobile a11y: https://www.w3.org/WAI/mobile/

---

## 🆘 Troubleshooting

### Sheet doesn't slide smoothly
- Check: Are you using `transform` instead of `top`?
- Check: Is `will-change: transform` applied?
- Check: Are animations hardware-accelerated?

### Gestures not working
- Check: Is `drag="y"` on the sheet container?
- Check: Are `dragConstraints` set correctly?
- Check: Is `onDragEnd` handler attached?

### Safe area not working
- Check: Is `viewport-fit=cover` in `<meta>` tag?
- Check: Is `env(safe-area-inset-bottom)` in CSS?
- Check: Is device running iOS 11+ or Android 9+?

### Haptic feedback not working
- Check: Is `navigator.vibrate` supported?
- Check: Is vibration enabled in device settings?
- Check: Is device on silent mode? (iOS blocks vibration)

---

## 📞 Support

**Documentation:**
- Full proposal: `MOBILE_UX_REDESIGN_PROPOSAL.md`
- UI diagrams: `MOBILE_UI_STATES_DIAGRAM.md`
- Code guide: `MOBILE_IMPLEMENTATION_GUIDE.md`
- Summary: `MOBILE_REDESIGN_SUMMARY.md`

**Total:** 21,000+ words with code examples

---

**Version:** 1.0
**Last Updated:** 2026-01-28
**Print this card and keep it handy during development!**
