# 🚀 Next Actions Strategy: The Pivot (UX Repair)

**Date:** 2026-01-30
**Goal:** Fix the Fundamental Flow (DNA -> Seed -> Tree)
**Motivation:** Focus group feedback indicated cognitive overload and broken metaphors.

---

## 👨‍💻 @ANTIGRAVITY (Lead Architect)
**Status:** Architecture Pivot.
**Focus:** Implementing "The Lens" and "The Seed" logic.

### 1. **UX Architecture (Phase E)**
*   **Context:** The current "Rushing River" DNA view is unusable for novices.
*   **Tasks:**
    *   **US-152:** Implement `DNAControlContext` (Global state for flow speed/pause).
    *   **Refactor:** Update `DNAView` to respect this context (slow down on hover).
    *   **US-153:** Build `SeedSelectionView` (The "Missing Link" page).

---

## 🤖 @SWARM (Agents)
**Focus:** Visuals & Interaction.

### 2. **Visual Components**
*   **Context:** We need new visuals for the Seed and the Controls.
*   **Tasks:**
    *   **Seed Visual:** A pulsing, living seed component (SVG/Framer).
    *   **Micro-Lessons:** Small popovers for DNA steps (T/V/A/P) explaining what's happening.

---

## 🚦 Execution Order

1.  **Antigravity** sets up the `DNAControlContext` and slows down the river.
2.  **Swarm** creates the `SeedSelectionView` components.
