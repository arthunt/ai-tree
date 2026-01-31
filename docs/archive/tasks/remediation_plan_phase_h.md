# Phase H: The Living Forest Flows (Unified UX Remediation)

**Priority:** Critical (P0)
**Goal:** Unify the fragmented "Strong Components" into a "Cohesive Narrative Journey" via explicit navigation and visual consistency.

---

## 🏗️ Architecture & Navigation (Antigravity)

### 1. **US-170: The Growth Slider (Stage Selector)**
**Concept:** A persistent, interactive navigation bar present on all evolutionary pages.
**States:** `[ DNA ] — [ Seed ] — [ Sprout ] — [ Tree ] — [ Forest ]`
**Behavior:**
*   **DNA:** Navigates to `/dna` (Simulation).
*   **Seed:** Navigates to `/seed` (Intent Choice).
*   **Sprout:** Navigates to `/tree-view` AND sets LOD to 2 (Roots+Trunk), zoom to 0.4.
*   **Tree:** Navigates to `/tree-view` AND sets LOD to 3 (Full), zoom to 1.0.
*   **Forest:** (Future) Navigates to `/forest`.

### 2. **US-171: Route & State Consolidation**
**Concept:** Ensure "Backward Compatibility" of the user journey.
*   **JourneyContext:** Implement a simple Global Context (or URL param persistence) to track:
    *   `lastStage`: Where the user came from.
    *   `intent`: Builder/Thinker/Explorer (from Seed).
    *   `simulationState`: Did they finish DNA?
*   **Proto Merge:** Move `/proto` to `/garden` (or deprecated). remove from Main Nav.

---

## 🤖 Visuals & Interactivity (Swarm)

### 3. **US-172: DNA Flow Repair**
**Concept:** Make the DNA simulation explorable, not just a movie.
*   **Step Selector:** Add `[Prev] [1] [2] [3] [4] [Next]` controls to DNA view.
*   **Direct Access:** Clicking a card (e.g., Vector Map) immediately jumps the simulation to that step.
*   **Completion State:** When simulation ends, show a summary card Use visuals like "Token -> Seed Transition".

### 4. **US-173: Mobile Touch Polish**
**Concept:** Ensure complex visualizations work on phones.
*   **Tap-to-Select:** Update `VectorMap` and `AttentionSpotlight` to support tap interactions (not just hover).
*   **Timing Sync:** Ensure Animation durations respect the `playbackSpeed` (Lens Effect).

### 5. **US-174: Visual Bridges (Transitions)**
**Concept:** Show, don't just route.
*   **DNA -> Seed:** Animate the "Winner Prediction" token morphing into the "Seed".
*   **Seed -> Sprout:** Animate the "Seed" rooting into the bottom of the screen before the TreeView fades in.

---

## 📅 Execution Plan

| Agent | Task | Focus |
| :--- | :--- | :--- |
| **Antigravity** | **Growth Slider** | ✅ **COMPLETE** (Built Component, Context, & TreeView Logic). |
| **Swarm** | **DNA Repair** | In Progress (Completion Card Done). Focus on Step Selector. |
| **Swarm** | **Touch Polish** | Fix VectorMap/Attention tap interactions. |
| **Antigravity** | **Proto Merge** | Clean up the legacy route. |
