# Gemini Handoff: Phase 10 — DNA Vertical Accordion Stack

**Date:** 2026-02-03
**From:** @opus (Claude Code)
**To:** @gemini (Antigravity)
**Priority:** P0 (Critical UX Fix)

---

## TL;DR

We're replacing the DNA page's horizontal card scroll with a **vertical accordion stack**. Your job: build the visual components (`DNAAccordionCard`, `DNADeepDiveSheet`). I've done the state management and translations. You do the pretty parts.

---

## Context: Why This Change?

UAT testing revealed critical UX issues on the DNA page:

| Problem | Impact |
|---------|--------|
| Input scrolls away on mobile | User loses context, doesn't know what they typed |
| No orientation before typing | User doesn't know what to do |
| Cards visible before simulation | Confusing — content shows before it's relevant |
| Horizontal scroll unnatural | Mobile users scroll vertically 10x more often |
| "Learn More" navigates away | User loses context, has to start over |

**Expert Panel Validation:** Mobile UX, Interaction Design, and Cognitive Psychology experts all endorsed the vertical accordion pattern.

---

## Documents You MUST Read

1. **`docs/DENDRIX_MASTER_ARCHITECTURE.md`** — §6.6 "Vertical Accordion Stack" (new pattern spec)
2. **`docs/technical/DNA_VERTICAL_CARD_SPECIFICATION.md`** — Full implementation guide
3. **`docs/BACKLOG.md`** — Phase 10 task list with your assignments

---

## What @opus Already Did

### 1. State Management (`components/dna/DNAContext.tsx`)

Added new state and actions for the accordion pattern:

```typescript
// New card states
export type CardState = 'locked' | 'active' | 'collapsed';

// New context fields
cardStates: Record<DNAStep, CardState>;  // Track each card's state
showOrientation: boolean;                 // Show orientation card before input
deepDiveStep: DNAStep | null;            // Which step's deep dive is open

// New actions
expandCard: (step: DNAStep) => void;     // Expand a card (collapses others)
collapseCard: (step: DNAStep) => void;   // Collapse a card
openDeepDive: (step: DNAStep) => void;   // Open bottom sheet
closeDeepDive: () => void;               // Close bottom sheet
dismissOrientation: () => void;          // Hide orientation card
```

**State Flow:**
1. Initial: `showOrientation: true`, all cards `locked`
2. User types + presses play: orientation dismissed, first card `active`
3. Step completes: current card → `collapsed`, next card → `active`
4. User taps collapsed card: that card → `active`, others → `collapsed`

### 2. Translation Keys (`messages/*.json`)

Added for EN, ET, RU:

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
    "accordion": {
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

## Your Tasks (@gemini)

### Task 10.3: DNAAccordionCard (P0 — Start Here)

**File:** `components/dna/DNAAccordionCard.tsx` (create new)

**Props:**
```typescript
interface DNAAccordionCardProps {
  step: DNAStep;                    // 'tokenization' | 'vectorizing' | 'attention' | 'prediction'
  state: CardState;                 // 'locked' | 'active' | 'collapsed'
  title: string;                    // Localized step title
  description: string;              // Localized step description
  summaryText: string;              // Shown when collapsed (e.g., "5 pieces tokenized")
  lockedText: string;               // Shown when locked (e.g., "locked")
  visualization: React.ReactNode;  // TokenizationSlicer, VectorMap, etc.
  onExpand: () => void;            // Called when collapsed card is tapped
  onNext: () => void;              // Called when "Next" button tapped
  onDeepDive: () => void;          // Called when "Go Deeper" button tapped
}
```

**Visual States:**

| State | Height | Visuals | Actions |
|-------|--------|---------|---------|
| **Locked** | 64px | Grayed out, 🔒 icon, "(locked)" label, no border glow | None (or hint on tap) |
| **Active** | Auto (min 280px) | Full color, glowing border, visualization visible | "Go Deeper" + "Next" buttons |
| **Collapsed** | 64px | ✅ icon, summary text, subtle border | Tap to re-expand |

**Animation Requirements:**
- Use Framer Motion for state transitions
- Spring physics for expand/collapse (stiffness: 200, damping: 20)
- Staggered reveal for active state content
- Respect `prefers-reduced-motion`

**Color Scheme (from existing DNA):**
- Locked: `text-white/30`, `border-white/5`
- Active: `border-brand-teal/50`, `shadow-[0_0_20px_rgba(45,212,191,0.2)]`
- Collapsed: `border-white/10`, `text-white/70`

---

### Task 10.5: DNADeepDiveSheet (P1)

**File:** `components/dna/DNADeepDiveSheet.tsx` (create new)

This is a **bottom sheet** that slides up when user taps "Go Deeper". Replaces the old `MicroLesson.tsx` modal.

**Props:**
```typescript
interface DNADeepDiveSheetProps {
  step: DNAStep;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSeed: () => void;    // Navigate to /seed for deeper exploration
}
```

**Behavior:**
- Snap points: 50%, 85%, 95% of screen height
- Drag handle at top (standard iOS/Android pattern)
- Swipe down to dismiss
- Background dims but doesn't block (user can still see DNA page behind)

**Content Structure:**
```
┌──────────────────────────────────┐
│ ━━━━━ (drag handle) ━━━━━        │
│                                  │
│   [Step Icon]                    │
│   STEP TITLE                     │
│                                  │
│   Body text explanation...       │
│                                  │
│   💡 METAPHOR                    │
│   "Like chopping a sentence      │
│    into LEGO bricks."            │
│                                  │
│  ┌────────────┐ ┌────────────┐  │
│  │ Resume ▶   │ │ Seed →     │  │
│  └────────────┘ └────────────┘  │
│                                  │
└──────────────────────────────────┘
```

**Content Source:** Use existing `dna.microLesson.[step]` translations:
- `title` → Sheet title
- `body` → Body text
- `metaphor` → Metaphor block

**Library Suggestion:** Consider using `@gorhom/bottom-sheet` or building with Framer Motion's `useDragControls`.

---

### Task 10.7: Desktop Grid Toggle (P2)

On desktop (≥1024px), optionally show a 2x2 grid instead of vertical stack.

**Requirements:**
- Toggle button in header: [Stack] / [Grid]
- Default: Stack (matches mobile)
- Grid: 2x2 with accordion behavior (one expanded at a time)
- Persist preference in localStorage

---

### Task 10.8: Animation Polish (P2)

- Auto-scroll to active card when step advances
- Smooth spring physics for expand/collapse
- Pulse glow on active card during animation
- Subtle parallax effect on scroll (optional)

---

## Files You'll Work With

**Create:**
- `components/dna/DNAAccordionCard.tsx`
- `components/dna/DNADeepDiveSheet.tsx`

**Reference (don't modify, I'll integrate):**
- `components/dna/DNAContext.tsx` — Use `useDNA()` hook
- `components/dna/TokenizationSlicer.tsx` — Pass as `visualization`
- `components/dna/VectorMap.tsx` — Pass as `visualization`
- `components/dna/AttentionSpotlight.tsx` — Pass as `visualization`
- `components/dna/PredictionBarChart.tsx` — Pass as `visualization`

**Translations:**
- `messages/en.json` — `dna.accordion.*`, `dna.summary.*`
- `messages/et.json` — Same keys
- `messages/ru.json` — Same keys

---

## Design System Reference

From `docs/DENDRIX_MASTER_ARCHITECTURE.md`:

```
DNA Theme: Cinematic Dark
- Background: Deep void (#0a0a0f) with subtle noise
- Cards: Glassmorphism (backdrop-blur-xl, border-white/10)
- Accents: Glowing gradients (brand-teal, brand-purple)
- Motion: Spring physics, organic easing
```

**Touch Targets:** All interactive elements must be ≥48px

**Accessibility:**
- `aria-expanded` for accordion state
- Focus management when card expands
- Screen reader announcements for state changes

---

## Testing Checklist

Before marking tasks complete:

- [ ] Works on mobile (iPhone SE, iPhone 14, Android)
- [ ] Works on tablet (iPad)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets ≥48px
- [ ] No layout shifts during transitions
- [ ] Translations work (switch locale to ET/RU and verify)

---

## Coordination

- **Commit frequently** to `preview` branch
- **Update `docs/BACKLOG.md`** — mark tasks 🔄 IN PROGRESS when starting, ✅ DONE when complete
- **Ping @opus** in commits if you need state changes or have questions

---

## Quick Start

```bash
# 1. Pull latest
git pull origin preview

# 2. Read the spec
open docs/technical/DNA_VERTICAL_CARD_SPECIFICATION.md

# 3. Start with DNAAccordionCard
# Create: components/dna/DNAAccordionCard.tsx

# 4. Test locally
npm run dev
# Open http://localhost:3000/en/dna
```

---

## Questions?

If anything is unclear, check:
1. `docs/technical/DNA_VERTICAL_CARD_SPECIFICATION.md` — Full spec
2. `docs/DENDRIX_MASTER_ARCHITECTURE.md` §6.6 — Visual diagrams
3. Existing code in `components/dna/` — Patterns to follow

Good luck! 🚀
