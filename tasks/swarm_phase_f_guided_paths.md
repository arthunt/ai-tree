# Assignment: Phase F - Guided Paths (Sprint 13 Continued)

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** P1 (High)
**Objective:** Use the intent captured in "The Seed" to simplify the Tree View.

## Task 1: Tree View Highlighting Logic (US-154)
**Context:** The Tree View (`tree-view/page.tsx`) receives `?intent=builder` (or thinker/explorer).
**Action Items:**
1.  [x] Read the `intent` query param in `TreeView.tsx`.
2.  [x] Pass this intent to the filtering/highlighting logic (D3 or React Flow).
3.  [x] **Behavior:**
    *   **Builder:** Highlight practical nodes (e.g., Transformers, Function Calling, API). Dim theoretical nodes.
    *   **Thinker:** Highlight theoretical nodes (e.g., Perceptrons, Attention, Vectors). Dim practical nodes.
    *   **Explorer:** Show all nodes (default).

## Task 2: "Guide Pulse"
**Context:** Users need to know where to start.
**Action Items:**
1.  [x] Add a `pulsing` effect to the "Root" node or the first highlighted node in the path. (Implemented pulse on root/trunk/highlighted leaves)
2.  [x] Ensure invalid or unknown intents default to "Explorer" (Show All).

## Task 3: Cleanup Phase E
**Context:** Ensure we didn't break legacy routes.
**Action Items:**
1.  [x] Verify `/dna` still works without coming from home. (Confirmed flow: DNA -> Seed -> Tree)
2.  [x] Verify `tree-view` still works without params. (Confirmed fallback to "Show All").

---

**Architect Note:**
**Status:** ✅ PHASE F COMPLETE.
This completes the "UX Repair" arc. Once this is done, the user can flow from DNA -> Seed -> Tailored Tree.
