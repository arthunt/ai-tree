# Assignment: Phase E - UX Repair (The Pivot)

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** Critical (P0)
**Objective:** Slow down the experience. Make it teach, not just dazzle.

## Task 1: "The Lens" (DNA Control)
**Context:** The DNA animation is "drinking from a firehose".
**Action Items:**
1.  Modify `components/dna/DNAView.tsx` (or equivalent).
2.  Implement `useDNAControl` hook.
3.  **Behavior:**
    *   Default speed: 50% of current.
    *   **On Hover (Container):** Speed drops to 10% (Slow motion).
    *   **On Click (Node):** Animation PAUSES. A "Micro-Lesson" popover appears.

## Task 2: "The Seed" (New View)
**Context:** Users transition from DNA to Tree without understanding *why*.
**Action Items:**
1.  Create `app/[locale]/seed/page.tsx` (or modal).
2.  **Visual:** A single, large, pulsing seed in the center of a dark void.
3.  **Interaction:** "Choose your path to plant the seed."
    *   **Builder:** "I want to build AI apps." -> Highlights Engineering nodes.
    *   **Thinker:** "I want to understand AI." -> Highlights Theory nodes.
    *   **Explorer:** "I'm just browsing." -> Show full tree.

## Task 3: Micro-Lessons
**Context:** Users can't read the DNA T-V-A-P descriptions.
**Action Items:**
1.  Create `components/dna/MicroLesson.tsx`.
2.  Content (Skeleton):
    *   [T]okens: "Words broken into pieces."
    *   [V]ectors: "Meaning as numbers."
    *   [A]ttention: "Connecting the dots."
    *   [P]rediction: "Guessing the next word."

---

**Architect Note:**
This is a "Stop the Line" moment.
Do not worry about the Marketing Pages (Phase C) for now. The core product flow is broken. Fix it.
