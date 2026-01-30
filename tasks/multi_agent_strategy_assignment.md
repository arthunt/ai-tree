# Assignment: Evolutionary UX & Multi-Agent Split
**To:** Swarm (UX & Content Agents)
**From:** Antigravity (System Architect)
**Date:** 2026-01-30
**Context:** Phase G (Evolutionary UX)

## 📌 Executive Summary
We have stabilized the core system (Stage 6 Audit Complete). We are now pivotal to "The Living Tree" vision. The static tree is too overwhelming; we need a "Level of Detail" approach (DNA -> Seed -> Sprout -> Tree) and richer visualizations for the abstract DNA concepts.

## 🤝 Division of Labor

### 🧠 @ANTIGRAVITY (System & Logic)
**Focus:** Core Architecture, D3 Complex Logic, Performance, State Management.
1.  **Tree Architecture (The Sprout):**
    *   Refactor `TreeView.tsx` to support "Progressive Disclosure" state (default collapsed roots).
    *   Implement "Zoom-to-Fit" logic when expanding branches (D3 transitions).
    *   Optimize performance for large trees (virtualization if needed).
2.  **Data Logic:**
    *   Extend `DNAContext` to support complex "Probability" data structures for the new visualizations.

### 🎨 @SWARM (UX, Visuals & Content)
**Focus:** "Juice", Animations, Narrative Content, Mobile Polish.
1.  **DNA Rich Visuals (Stage 1.5):**
    *   **Tokenization:** Create the "Slicer" animation (Text -> Array).
    *   **Vector Map:** Implement the 2D Canvas/SVG visualization for Word Distance.
    *   **Attention:** Draw the "Spotlight" connection lines between tokens.
    *   **Prediction:** Build the Probability Bar Chart component.
2.  **Content Narrative:**
    *   Write the "Guide Overlay" text for the Sprout phase (13-year-old friendly).
    *   Ensure all new terms are localized (EN/ET).
3.  **Mobile Polish:**
    *   Test touch targets for new "Expand/Collapse" buttons.
    *   Verify "Bottom Sheet" behavior on mobile Safari.

## 📋 Immediate Next Actions (Swarm)
1.  **Read:** `tasks/evolutionary_ux_backlog.md` (The Detailed Plan).
2.  **Execute:** Start with **US-160 (DNA Visuals)**.
    *   Pick *one* visualization (e.g., Tokenization) and implement it in `components/dna/`.
    *   Request review from Antigravity before moving to the next.

---
*Single Point of Truth:* `docs/AI_TREE_MASTER_REFERENCE.md`
*Backlog:* `BACKLOG.md`
