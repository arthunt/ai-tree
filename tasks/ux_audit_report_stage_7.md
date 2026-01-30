# 🕵️‍♂️ UX/Architecture Audit: The "Living Forest" Flow

**Date:** 2026-01-30
**Auditor:** Antigravity (Specialist & Functional Tester)
**Status:** DRAFT (For Peer Review)

---

## 1. Executive Summary
**Verdict:** The current application has strong *individual components* (DNA, Tree, Seed) but fails to deliver a cohesive *narrative journey*. The transitions are abrupt, and the "Growth" metaphor is hidden behind implicit interactions (zoom) rather than explicit, explorable stages.

**Key Issue:** "The interactive map is not switchable to other views."
Users cannot easily toggle between "Sprout", "Tree", and "Forest" perspectives. The LOD system is technically impressive but accessible only via semantic zoom, which is undiscoverable for many users.

---

## 2. The "Messy" Flow Analysis

### Current State
1.  `/dna` (Standalone) -> No clear path forward.
2.  `/seed` (Menu) -> Pushes to `/tree-view`.
3.  `/tree-view` (Monolith) -> Loads in "Sprout" mode (LOD 2), expands to "Tree" (LOD 3) on zoom.

### The Friction Points
*   **Gap 1 (DNA -> Seed):** There is no clear bridge. DNA feels like a tech demo, disconnected from the "Intent" selection in Seed.
*   **Gap 2 (Seed -> Tree):** The `/seed` page is a "Selector Menu" (Builder/Thinker), not a visualization of a seed growing. It jumps immediately to a complex D3 graph.
*   **Gap 3 (Sprout Visibility):** The "Sprout" stage (LOD 2) is the default view effectively, but the user doesn't *know* it's a sprout. They just see a small tree. There is no visual cue saying "Stage: Sprout - Zoom to Grow".
*   **Missing Stages:**
    *   **Small Tree (Blooms):** Concepts springing to life.
    *   **Forest:** The ecosystem view (multiple programs/trees).

---

## 3. Interaction & "Switchability" Audit

### Issue: Implicit vs. Explicit Control
The current `TreeView.tsx` relies on **Semantic Zoom** (Scroll wheel / Pinch).
*   **Pro:** Natural for explorers.
*   **Con:** Terrible for "Understanding Dynamics". A user cannot simple click "Show me the Forest" or "Show me the Sprout".
*   **Mobile:** Touch gestures for zoom conflict with scrolling (fixed via `touch-action: none` but still invisible).

### Missing "Lenses"
The user requests specific views:
1.  **Seed View:** Potentially growing roots?
2.  **Sprout View:** Quick growth/unfolding.
3.  **Small Tree:** Focus on *branches* (Concepts).
4.  **Large Tree:** Focus on *depth* (Research Papers).
5.  **Forest:** Focus on *breadth* (Programs).

### "Proto" Legacy Route
*   **Observation:** The `/proto` route exists but uses an entirely different component (`OrganicTreeDiagram`) than the main application (`TreeView`).
*   **Issue:** Fragmented codebase. We have two tree implementations. The "Large Tree" visualization the user wants might be this "Proto" logic, but it should be a state of the main `TreeView`, not a separate legacy page.

---

## 4. Visual Consistency (Aesthetics)
*   **DNA:** Dark, Neon, Particle-heavy (Future Tech).
*   **Seed:** Soft, Organic, Pulsing (Nature).
*   **Tree:** Geometric, D3 Lines (Data Viz).
*   **Inconsistency:** The transition from the organic "Pulsing Seed" (`/seed`) to the rigid "D3 Tree" (`/tree-view`) is jarring. The Tree needs more "organic" feel or the Seed needs more "data" feel.

---

## 5. Recommendations (The "Evolutionary" Roadmap)

### A. The "Growth Slider" (Navigation Fix)
Instead of relied *only* on zoom, add an explicit **Stage Selector** (Bottom or Top UI) on the `/tree-view` page:
`[ DNA ] — [ Seed ] — [ Sprout ] — [ Tree ] — [ Forest ]`
*   **Clicking "Sprout":** Resets zoom to LOD 2.
*   **Clicking "Tree":** Auto-zooms to LOD 3.
*   **Clicking "Forest":** Zooms out to LOD 4 (New View).

### B. Route Consolidation vs. distinct Pages
*   **Refactor:** The request implies *separate pages*.
*   **Proposal:**
    *   `/evolution/seed` (The current Intent page, but visualized).
    *   `/evolution/sprout` (Animation of growth).
    *   `/evolution/tree` (The explorer).
    *   `/evolution/forest` (The landscape).
    *   **OR:** A single `/map` route with a strictly controlled state machine.

### C. Visual Bridges
*   **From DNA:** Animating the "Winner Prediction" token turning into the "Seed".
*   **From Seed:** Animating the Seed rooting into the ground (Transition to TreeView).

---

## 6. Next Steps for Swarm
1.  **Prototype the "Stage Selector"**: HTML/CSS mockup of the 5-stage navigation.
2.  **Design "Forest" View**: What does it look like? (Multiple trees? Or just a map of Programs?)
