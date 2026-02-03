# DNA Vertical Card Specification

**Status:** APPROVED — Implementation Ready
**Version:** 1.0
**Created:** 2026-02-03
**Source:** UAT Findings + Expert Panel (Mobile UX, Interaction Design, Cognitive Psychology)
**Parent Document:** `docs/DENDRIX_MASTER_ARCHITECTURE.md` §6.6

---

## Overview

This document specifies the vertical accordion card stack pattern for the DNA stage on mobile devices. It replaces the deprecated horizontal scroll pattern (§6.5) based on UAT findings.

### Key Changes from Current Implementation

| Aspect | Current (Deprecated) | New (V2) |
|--------|---------------------|----------|
| Card movement | Horizontal scroll | Vertical stack |
| Input visibility | Scrolls away | Fixed at top |
| Progress visibility | Hidden on scroll | Always visible |
| Card states | Active only | Locked → Active → Collapsed |
| Deep dive | Full navigation | Bottom sheet popover |
| Mental model | Steps go sideways | Steps go down (tree metaphor) |

---

## Component Architecture

### File Structure

```
components/dna/
├── DNAView.tsx              # Main view (updated)
├── DNAContext.tsx           # State machine (updated)
├── DNAInput.tsx             # Input component (minor updates)
├── DNAStepNav.tsx           # DEPRECATED → DNAFixedHeader.tsx
├── DNAFixedHeader.tsx       # NEW: Fixed input + progress
├── DNAVerticalStack.tsx     # NEW: Accordion container
├── DNAAccordionCard.tsx     # NEW: Individual accordion card
├── DNADeepDiveSheet.tsx     # NEW: Bottom sheet for deep dive
├── DNAOrientationCard.tsx   # NEW: Empty state orientation
├── DNAComponentCard.tsx     # DEPRECATED (keep for desktop fallback)
├── TokenizationSlicer.tsx   # Unchanged
├── VectorMap.tsx            # Unchanged
├── AttentionSpotlight.tsx   # Unchanged
├── PredictionBarChart.tsx   # Unchanged
├── MicroLesson.tsx          # DEPRECATED → DNADeepDiveSheet.tsx
└── CompletionCard.tsx       # Updated for vertical flow
```

---

## State Machine Updates

### DNAContext Changes

```typescript
// New card states
type CardState = 'locked' | 'active' | 'collapsed';

interface DNAContextType {
  // ... existing fields ...

  // NEW: Card state management
  cardStates: Record<DNAStep, CardState>;
  expandCard: (step: DNAStep) => void;
  collapseCard: (step: DNAStep) => void;

  // NEW: Deep dive sheet
  deepDiveStep: DNAStep | null;
  openDeepDive: (step: DNAStep) => void;
  closeDeepDive: () => void;

  // NEW: Orientation
  showOrientation: boolean;
  dismissOrientation: () => void;
}
```

### State Transitions

```
INITIAL STATE (no input):
┌────────────────────────────────────────────┐
│ showOrientation: true                      │
│ cardStates: {                              │
│   tokenization: 'locked',                  │
│   vectorizing: 'locked',                   │
│   attention: 'locked',                     │
│   prediction: 'locked'                     │
│ }                                          │
└────────────────────────────────────────────┘
                    │
                    ▼ (user types + presses play)
┌────────────────────────────────────────────┐
│ showOrientation: false                     │
│ currentStep: 'tokenization'                │
│ cardStates: {                              │
│   tokenization: 'active',    ← Expanded    │
│   vectorizing: 'locked',                   │
│   attention: 'locked',                     │
│   prediction: 'locked'                     │
│ }                                          │
└────────────────────────────────────────────┘
                    │
                    ▼ (step completes / user taps Next)
┌────────────────────────────────────────────┐
│ currentStep: 'vectorizing'                 │
│ cardStates: {                              │
│   tokenization: 'collapsed', ← Summary     │
│   vectorizing: 'active',     ← Expanded    │
│   attention: 'locked',                     │
│   prediction: 'locked'                     │
│ }                                          │
└────────────────────────────────────────────┘
                    │
                    ▼ (user taps collapsed card)
┌────────────────────────────────────────────┐
│ currentStep: 'vectorizing' (unchanged)     │
│ cardStates: {                              │
│   tokenization: 'active',    ← Re-expanded │
│   vectorizing: 'collapsed',  ← Collapsed   │
│   attention: 'locked',                     │
│   prediction: 'locked'                     │
│ }                                          │
└────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. DNAFixedHeader

Fixed header containing input and progress. Replaces DNAStepNav.

```typescript
interface DNAFixedHeaderProps {
  // Inherits from DNAContext
}

// Layout
// - Input field (full width, 48px height)
// - Step buttons [T] [V] [A] [P] with active indicator
// - "Step X of 4" label
// - Progress bar (optional, during playback)
```

**CSS:**
```css
.dna-fixed-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 2. DNAVerticalStack

Container for accordion cards. Manages scroll behavior.

```typescript
interface DNAVerticalStackProps {
  children: React.ReactNode;
  onScrollToCard: (step: DNAStep) => void;
}
```

**Auto-scroll behavior:**
- When `currentStep` changes, scroll to make the active card visible
- Use `scrollIntoView({ behavior: 'smooth', block: 'start' })`

### 3. DNAAccordionCard

Individual card with three visual states.

```typescript
interface DNAAccordionCardProps {
  step: DNAStep;
  state: CardState;
  title: string;
  summaryText: string;      // Shown when collapsed
  lockedText: string;       // Shown when locked
  visualization: React.ReactNode;
  onExpand: () => void;
  onNext: () => void;
  onDeepDive: () => void;
}
```

**Visual states:**

| State | Height | Content | Actions |
|-------|--------|---------|---------|
| Locked | 64px | Icon + title + "(locked)" | None (or show hint on tap) |
| Active | Auto (min 280px) | Full viz + metaphor + buttons | "Deeper" / "Next" |
| Collapsed | 64px | ✅ icon + title + summary | Tap to re-expand |

**Animation:**
```typescript
// Framer Motion variants
const cardVariants = {
  locked: { height: 64, opacity: 0.5 },
  active: { height: 'auto', opacity: 1 },
  collapsed: { height: 64, opacity: 0.9 }
};
```

### 4. DNADeepDiveSheet

Bottom sheet for deep dive content. Replaces MicroLesson modal.

```typescript
interface DNADeepDiveSheetProps {
  step: DNAStep;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSeed: () => void;
}
```

**Snap points:** [0.5, 0.85, 0.95]

**Content structure:**
1. Drag handle
2. Step title (large)
3. Body text (explanation)
4. Metaphor block (styled)
5. Actions: "Resume ▶" / "Go to Seed →"

### 5. DNAOrientationCard

Empty state card shown before simulation starts.

```typescript
interface DNAOrientationCardProps {
  onDismiss: () => void;
  examplePrompt: string;
}
```

**Content:**
- "💡 HOW THIS WORKS" header
- Instruction text
- Example prompt (tappable to auto-fill input)
- "T → V → A → P" visualization

---

## Translation Keys

Add to `messages/en.json`:

```json
{
  "dna": {
    "orientation": {
      "title": "How This Works",
      "instruction": "Type any text above and press ▶ to see how AI reads it.",
      "description": "Watch your words transform through 4 steps: T → V → A → P",
      "example": "Try: \"The king wore a crown\"",
      "tapToTry": "Tap to try this example"
    },
    "card": {
      "locked": "locked",
      "next": "Next",
      "deeper": "Go Deeper",
      "resume": "Resume",
      "goToSeed": "Explore in Seed"
    },
    "summary": {
      "tokenization": "Text tokenized into {count} pieces",
      "vectorizing": "Mapped to {count} coordinates",
      "attention": "{count} connections found",
      "prediction": "Winner: \"{token}\" ({percent}%)"
    }
  }
}
```

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (<768px) | Vertical accordion stack (this spec) |
| Tablet (768-1023px) | Vertical accordion stack |
| Desktop (≥1024px) | 2x2 grid OR vertical stack (user preference) |

**Desktop toggle:**
- Add "Layout" toggle in header: [Stack] / [Grid]
- Default: Stack (matches mobile)
- Grid: 2x2 with one card expanded at a time

---

## Accessibility

- **Focus management:** When card expands, focus moves to first interactive element
- **Aria-expanded:** Cards use `aria-expanded` for accordion state
- **Screen reader:** Announce step transitions ("Step 2 of 4: Vectorization")
- **Reduced motion:** Use `prefers-reduced-motion` to disable animations
- **Touch targets:** All buttons ≥48px

---

## Implementation Order

### Phase 1: Core Structure (P0)
1. Create `DNAFixedHeader.tsx`
2. Create `DNAVerticalStack.tsx`
3. Create `DNAAccordionCard.tsx`
4. Update `DNAContext.tsx` with card states

### Phase 2: Content & States (P0)
5. Create `DNAOrientationCard.tsx`
6. Implement locked/active/collapsed visuals
7. Wire up auto-advance + auto-scroll

### Phase 3: Deep Dive (P1)
8. Create `DNADeepDiveSheet.tsx`
9. Wire "Go Deeper" button
10. Deprecate `MicroLesson.tsx`

### Phase 4: Polish (P2)
11. Add desktop grid toggle
12. Animation polish
13. Accessibility audit

---

## Migration Notes

### Files to Update
- `components/dna/DNAView.tsx` — Replace grid with vertical stack
- `components/dna/DNAContext.tsx` — Add card state management
- `components/dna/DNAInput.tsx` — Move into DNAFixedHeader
- `messages/*.json` — Add translation keys

### Files to Deprecate
- `components/dna/DNAStepNav.tsx` → `DNAFixedHeader.tsx`
- `components/dna/MicroLesson.tsx` → `DNADeepDiveSheet.tsx`
- `components/dna/DNAComponentCard.tsx` — Keep for desktop fallback only

### Breaking Changes
- Mobile DNA layout completely changes
- MicroLesson modal becomes bottom sheet
- Step navigation moves from bottom to top

---

## References

- Parent: `docs/DENDRIX_MASTER_ARCHITECTURE.md` §6.6
- Design System: `docs/DESIGN_SYSTEM_RULES.md`
- Vision: `docs/VISION_AND_STRATEGY.md` §Decision 4 (Input Position)
- UAT Report: UAT Feb 2026 (this document is the implementation spec)
