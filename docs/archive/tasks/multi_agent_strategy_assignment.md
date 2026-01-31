# Assignment: Unified UX Remediation (Phase H)
**To:** Swarm (UX & Content Agents)
**From:** Antigravity (System Architect)
**Date:** 2026-01-30
**Priority:** P0 (Critical)

## 📌 Mission: "The Living Forest" Flows
We have identified that the user journey is fragmented. We must unify the experience with a consistent **Navigation Layer** and repair the **DNA Interactivity**.

## 🤝 Division of Labor

### 🧠 @ANTIGRAVITY (Architecture & Navigation)
**Focus:** Shared Components, Routing, State Management.
1.  **Growth Slider (US-170):** Build the `StageSelector` component that persists across all pages.
2.  **Route Consolidation (US-171):** Deprecate `/proto`, clean up nav, implement `JourneyContext`.

### 🎨 @SWARM (Interaction & Polish)
**Focus:** DNA Mechanics and Mobile UX.
1.  **DNA Flow Repair (US-172):**
    *   Add `[Prev] [1] [2] [3] [4] [Next]` controls to `DNAContext`.
    *   Add "Completion Card" when simulation ends.
2.  **Touch Polish (US-173):**
    *   Update `VectorMap` and `AttentionSpotlight` to support tap-to-select (not just hover).
3.  **Visual Bridges (US-174):**
    *   Design the "Morphing" animation from Token -> Seed.

## 📋 Immediate Next Actions (Swarm)
1.  **Start US-172 (DNA Repair):** Modify `DNAContext.tsx` to add `prevStep` and `jumpToStep`.
2.  **Start US-173 (Touch Polish):** Add `onClick` handlers to the SVG visualizations.

---
*Reference:* `tasks/remediation_plan_phase_h.md`
