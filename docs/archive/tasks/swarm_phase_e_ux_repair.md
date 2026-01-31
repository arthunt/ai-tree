# Assignment: Phase E - UX Repair (The Pivot)

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** Critical (P0)
**Objective:** Slow down the experience. Make it teach, not just dazzle.

## Task 1: "The Lens" (DNA Control)
**Context:** The DNA animation is "drinking from a firehose".
**Action Items:**
1.  [x] Modify `components/dna/DNAView.tsx` (Implemented DNAInterface with Lens logic).
2.  [x] Implement `useDNAControl` hook (Refactored `DNAContext` heavily).
3.  [x] **Behavior:**
    *   Default speed: 50% of current.
    *   **On Hover (Container):** Speed drops to 10% (Slow motion).
    *   **On Click (Node):** Animation PAUSES. A "Micro-Lesson" popover appears.

## Task 2: "The Seed" (New View)
**Context:** Users transition from DNA to Tree without understanding *why*.
**Action Items:**
1.  [x] Create `app/[locale]/seed/page.tsx`.
2.  [x] **Visual:** A single, large, pulsing seed in the center of a dark void.
3.  [x] **Interaction:** "Choose your path to plant the seed."
    *   **Builder:** "I want to Build" (Cyan).
    *   **Thinker:** "I want to Understand" (Teal).
    *   **Explorer:** "I'm Exploring" (Purple).

## Task 3: Micro-Lessons
**Context:** Users can't read the DNA T-V-A-P descriptions.
**Action Items:**
1.  [x] Create `components/dna/MicroLesson.tsx`.
2.  [x] Content (Skeleton):
    *   [T]okens: "Like chopping a sentence into LEGO bricks."
    *   [V]ectors: "GPS coordinates in a universe of meaning."
    *   [A]ttention: "Connecting the dots."
    *   [P]rediction: "Guessing the next word."

---

**Architect Note:**
This is a "Stop the Line" moment.
**Status:** ✅ PHASE E COMPLETE.
Marketing Pages (Phase C) can wait. The core product flow is now repaired.
