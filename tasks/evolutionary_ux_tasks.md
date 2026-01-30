# Assignment: Evolutionary UX Task Force
**Date:** 2026-01-30
**Priority:** Critical (Phase G)

## 🎯 Shared Goal: "The Living Forest"
Transform the static application into a **Biodynamic System** where complexity is managed through **Semantic Zoom** (LODs) and **Rich Visualization** (DNA).

---

## 🤖 @SWARM Tasks (Visuals & Mechanics)
**Focus:** "Juice", Animations, and Concrete Explanations.

### 1. **US-160: DNA Rich Visualizations (Sequential)**
Work on these strictly in order. Do not start the next until the previous is polished.

*   [x] **Task 1.1: The Tokenization Slicer**
    *   **Context:** `components/dna/DNAInput.tsx` (or new component).
    *   **Visual:** When user types, animate the text splitting into chunks.
    *   **Metaphor:** "Chopping vegetables for a stew."
    *   **Action:** Replace the static text display with a framer-motion staged animation.

*   [x] **Task 1.2: The Vector Map**
    *   **Context:** New Component `components/dna/VectorMap.tsx`.
    *   **Visual:** A 2D SVG plot. Randomly place "King" and "Queen" close together, and "Banana" far away.
    *   **Key Concept:** "Meaning is Distance."

*   [x] **Task 1.3: The Attention Spotlight**
    *   **Context:** `components/dna/AttentionVis.tsx`.
    *   **Visual:** Draw curved bezier lines between tokens. Thickness = Importance.
    *   **Action:** Show how "Bank" connects to "River".

*   [x] **Task 1.4: The Probability Bar Chart**
    *   **Context:** `components/dna/PredictionVis.tsx`.
    *   **Visual:** Simple bar chart of top 3 next tokens.
    *   **Action:** Animate a "Strikethrough" on the wrong choices and a "Highlight" on the winner.

### 2. **Mobile Polish**
*   [x] **Task 2.1:** Verify touch targets for all new DNA interactions (44px min). Added `touch-action: none` to TreeView container for proper pan/zoom on touch devices.

---

## 🧠 @ANTIGRAVITY Tasks (Architecture & Logic)
**Focus:** The "Spine", D3 Physics, and State Management.

### 1. **US-162: Metaphorical Abstraction Engine (LOD System)**
*   [x] **Task 1.1: The Encapsulation Logic**
    *   **Context:** `components/tree/TreeView.tsx`.
    *   **Action:** Refactor D3 data processing to support "Encapsulated" nodes (where children are stored in `_children` but the parent node style changes to indicate hidden depth).

*   [x] **Task 1.2: The Bloom Animation** (Implemented via Framer Motion Springs)
    *   **Context:** D3 `enter/update/exit` selections.
    *   **Visual:** When expanding, children should *spring out* from the parent's center coordinates, not just appear.
    *   **Physics:** Add a small "pop" effect.

*   [x] **Task 1.3: The Semantic Zoom**
    *   **Context:** `d3.zoom` event listener.
    *   **Action:** Bind zoom levels to LOD states.
        *   Zoom < 0.5: Show **LOD 2 (Sprout)** (Roots/Trunk only).
        *   Zoom > 1.0: Auto-expand visible nodes to **LOD 3 (Tree)**.

*   [x] **Task 1.4: "Proto" Vibe Default**
    *   **Action:** Set initial state to strictly **LOD 2**. Ensure only the most important 5-10 nodes are visible on load.

---

## ✅ Phase G — Complete (2026-01-30)

All tasks delivered and pushed to `preview`.

| # | Task | Owner | Commit |
|---|------|-------|--------|
| US-160-1 | Tokenization Slicer | Swarm | `f7980f5` |
| US-160-2 | Vector Map | Swarm | `d66dc27` |
| US-160-3 | Attention Spotlight | Swarm | `990cc67` |
| US-160-4 | Prediction Bar Chart | Swarm | `20616da` |
| US-162-1 | Encapsulation Logic | Antigravity | — |
| US-162-2 | Bloom Animation | Antigravity | — |
| US-162-3 | Semantic Zoom | Antigravity | — |
| US-162-4 | Proto Vibe Default | Antigravity | — |
| Task 2.1 | Mobile Polish (touch-action) | Antigravity | — |

**Status:** Feature-complete. The system is Biodynamic. 🌲
