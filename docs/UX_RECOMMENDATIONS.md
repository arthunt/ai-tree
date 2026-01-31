# DNA View Mobile UX Recommendations

> Synthesized findings from UX/Interaction Design, Visual/Graphical Design, and Mobile Usability specialist reviews. These are **suggestions** for the design language document — to be refined as we learn from real user interactions.

**Date:** 2026-01-31
**Scope:** DNA page mobile experience (components/dna/*)
**Overall Mobile UX Score:** 6.2/10

---

## Executive Summary

Three specialist reviews identified **5 critical themes** affecting the DNA page mobile experience:

1. **Step completion is invisible** — users don't know when a step finishes or what to do next
2. **Interactive elements are hidden** — clickable tokens have zero visual affordance
3. **Navigation is disorienting** — T/V/A/P letters are cryptic, nav disappears when empty
4. **Visual hierarchy is off** — header dominates, cards feel secondary
5. **Thumb zone ignored** — key buttons sit in hard-to-reach areas

---

## P0 — Critical Fixes (High Impact, Low-Medium Effort)

### 1. On-Card Step Completion Messaging

**Problem:** User feedback: *"It should be kind of a message if it was passed and finished that now you can move to the next step"*

**Solution:** Add a completion badge + contextual message to each card when its step finishes.

**Component:** `DNAComponentCard.tsx`

- Add a state `stepComplete` that fires ~800ms before auto-advance
- Show a top-right badge: checkmark + "Step Complete" in teal
- Show contextual message below the animation:
  - Tokenization: "Text tokenized! Each piece now has a unique ID."
  - Vectorizing: "Tokens vectorized! Similar words cluster together."
  - Attention: "Attention calculated! See which words connect."
  - Prediction: "Prediction complete! Check the top candidate."
- Pulse the "Next" button in DNAStepNav when step is 85%+ complete
- Consider a brief flash/glow on the card border at completion

**Visual treatment:**
```
Badge: bg-brand-teal/20, border-brand-teal/40, rounded-full, backdrop-blur
Text: text-xs font-mono uppercase tracking-wider text-brand-teal
```

### 2. Token Interactivity Discoverability

**Problem:** User feedback: *"It is not understandable that you can click on the tokens to see the linking (and what does the link represent?)"*

**Solution:** Multi-layer discovery system:

**Layer 1 — Visual affordance (always):**
- Add subtle pulsing ring around interactive tokens (`animate-subtle-pulse`)
- Add `cursor-pointer` and `active:scale-95` for tap feedback
- Add tiny dot indicator in top-right corner of each token pill
- File: `TokenizationSlicer.tsx`, `AttentionSpotlight.tsx`

**Layer 2 — First-use coach mark (once):**
- When Tokenization step activates for the first time, show overlay:
  - Hand icon + "Tokens are interactive! Tap any token to see connections."
  - "Got it!" dismissal button
  - Store dismissal in `localStorage('dna-token-coach-mark')`
- File: `DNAComponentCard.tsx`

**Layer 3 — Connection explanation (on tap):**
- When user taps a token, show popup explaining:
  - Which other tokens it attends to
  - Strength bars (percentage)
  - Plain-language explanation: "Stronger connections = more important for context"
- File: New or extend `AttentionSpotlight.tsx`

### 3. Always-Visible Step Navigation

**Problem:** `DNAStepNav` returns `null` when `!hasData` (line 71). Users see no navigation before running their first simulation.

**Solution:**
```tsx
// Replace: if (!hasData) return null;
// With: conditional opacity
const navOpacity = hasData ? 'opacity-100' : 'opacity-30 pointer-events-none';
```

**Additional improvements:**
- Make nav expandable on tap to show full step names (not just T/V/A/P)
- Increase touch targets from 36x36 (w-9 h-9) to 44x44 (w-11 h-11)
- Show current step name prominently: "Step 2 of 4 -- Vectorize"
- Show "Auto-advancing in Xs" countdown when step is near completion

### 4. Input Length Validation

**Problem:** No guard against extremely long input that could crash tokenization.

**Solution:**
- Add `maxLength={500}` to input element
- Show character counter: `{inputText.length}/500`
- File: `DNAInput.tsx` line 88

---

## P1 — High Impact Improvements

### 5. Mobile Visual Hierarchy Rebalance

**Current problem:** Header takes too much space, cards feel secondary.

**Recommendations:**
- Page title: reduce to `text-2xl` on mobile (from `text-3xl`)
- Subtitle: reduce to `text-sm` on mobile (from `text-base`)
- Card title: increase to `text-2xl` (from `text-xl`) — cards should dominate
- Reduce header bottom margin to `mb-4` on mobile (from `mb-6`)
- Dim background glows on mobile: `opacity-[0.03]` (from `opacity-[0.05]`)
- Show 15% of next card by changing `min-w-[90vw]` to `min-w-[85vw]` — helps orientation

### 6. Card Visual States System

Define 5 distinct card states:

| State | Border | Background | Badge | Use |
|-------|--------|------------|-------|-----|
| **Locked** | `border-white/8` | `bg-white/3 opacity-60` | Lock icon | Steps not yet reached |
| **Active** | `border-2 border-brand-teal` | `bg-brand-teal/10` | Spinning indicator | Current step running |
| **Processing** | `border-brand-teal/70` | `bg-brand-teal/10` | Progress ring | Calculating |
| **Complete** | `border-green-500/40` | `bg-green-500/5` | Green checkmark | Step finished |
| **Inactive** | `border-white/15` | `bg-white/8` | None | Visited but not current |

**Current:** Only "active" and "inactive" states exist. Need to add "complete" at minimum.

### 7. Step Color Differentiation

**Problem:** All 4 steps currently render in the same brand-teal. Users can't distinguish steps by color.

**Recommendation:**
```css
--dna-t: #25EDBA;  /* Teal — Tokenization */
--dna-v: #3B82F6;  /* Blue — Vectorizing */
--dna-a: #A855F7;  /* Purple — Attention */
--dna-p: #F59E0B;  /* Amber — Prediction */
```

Apply to: node glow, card active border, step button in DNAStepNav, progress bar color.

### 8. Thumb Zone Optimization

**Problem:** Play button and Next button are in top-right stretch zone.

**Recommendations:**
- Consider swapping breadcrumbs (left) and Next button (right) in DNAStepNav — or test both
- Ensure Reset button has more separation from Next (avoid accidental taps)
- Add "Back to Input" floating button when scrolled down (appears after scrollY > 300)

---

## P2 — Polish & Refinement

### 9. Reduced Motion Support

**No** `prefers-reduced-motion` handling exists. Add:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow, .animate-pulse, .animate-spin-slow {
    animation: none !important;
  }
}
```

Also pass motion preference to Framer Motion components.

### 10. Metaphor Prominence

**Current:** Metaphor text is `text-xs opacity-60 uppercase` — almost invisible.

**Recommendation:** Make it more prominent:
```tsx
<div className="flex items-center gap-2 mt-1">
  <Lightbulb size={14} className="text-brand-teal" />
  <p className="text-sm text-brand-teal/90 font-medium italic">{metaphor}</p>
</div>
```

### 11. Re-accessible Help

**Problem:** MicroLesson tutorial dismissed = help lost forever.

**Recommendations:**
- Add persistent "?" floating button to reopen MicroLesson
- Add "Don't show again" option for returning users
- Store preference in localStorage

### 12. Confirm Destructive Actions

- Wrap `resetSimulation()` in a confirmation dialog
- The reset button clears all progress instantly — too easy to tap accidentally on mobile

### 13. Display Current Input Text

When simulation is running, show truncated input in DNAStepNav:
```
"Analyzing: 'artificial intelligence...'"
```

Helps user remember what they entered without scrolling back to input.

### 14. Deep Dive Button Clarity

**Current:** "Deep Dive" is vague — users don't know what it leads to.

**Change to:** "Learn More About [Step Name]" with an arrow icon.

Add shimmer effect on hover/tap to draw attention.

---

## Animation Choreography Suggestions

### Step Transition Sequence (when moving from step N to N+1):

1. **800ms before advance:** Show completion badge on current card
2. **400ms before advance:** Pulse "Next" button with glow
3. **On advance:** Dim current card border (300ms)
4. **On advance:** Scroll to next card (400ms smooth)
5. **On arrival:** Glow new card border + pulse node (600ms)
6. **On arrival:** Trigger card-internal animation

### Infinite Animation Budget

Current: 3 infinite animations running always (background pulse, node glow, sparkle spin).

**Recommendation:** Pause infinite animations when:
- Tab is inactive (Page Visibility API)
- After 30 seconds of no interaction
- On low-power devices (Battery Status API)

---

## Accessibility Checklist

| Check | Status | Fix |
|-------|--------|-----|
| Touch targets >= 44px | Partial | DNAStepNav buttons need increase (36 -> 44px) |
| Color contrast >= 4.5:1 | Partial | `text-brand-teal/60` on dark is ~3.5:1, increase to `/70` |
| prefers-reduced-motion | Missing | Add CSS + Framer Motion support |
| Screen reader flow | Untested | Add aria-labels to step buttons, announce step changes |
| Focus indicators | Partial | Glass cards don't show focus ring |
| Landscape support | Missing | No landscape-specific styles |

---

## Files Affected by These Recommendations

| Component | Changes | Priority |
|-----------|---------|----------|
| `DNAComponentCard.tsx` | Completion badge, narration, visual states, coach mark | P0+P1 |
| `DNAStepNav.tsx` | Always visible, expandable, larger targets, countdown | P0 |
| `DNAInput.tsx` | Input validation, thumb zone, speed control | P0+P1 |
| `TokenizationSlicer.tsx` | Tap affordance, pulse animation, click handlers | P0 |
| `AttentionSpotlight.tsx` | Tap hints, connection popup | P0 |
| `DNAView.tsx` | Visual hierarchy, card peek, back-to-top FAB | P1 |
| `DNAContext.tsx` | Step completion tracking, pause persistence | P1 |
| `MicroLesson.tsx` | Re-accessible help, don't-show-again | P2 |
| `CompletionCard.tsx` | Enhanced celebration, explicit close | P2 |
| `globals.css` | Reduced motion, custom animations, step colors | P1+P2 |

---

## Next Steps

1. Validate these recommendations against the design language document (from Gemini)
2. Implement P0 fixes (items 1-4)
3. Mobile usability test with 3-5 users
4. Iterate on P1 based on test findings
5. P2 polish pass before launch
