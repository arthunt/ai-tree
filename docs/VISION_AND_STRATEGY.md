# 🌲 Dendrix.ai Vision & Strategy: The Living System

**Status:** DEFINITIVE SINGLE POINT OF TRUTH (SPOT)
**Version:** 2.1 (Ratified 2026-01-31)
**Authors:** Antigravity, Swarm, Claude Desktop
**Supersedes:** 
- `docs/deprecated/AI_TREE_MASTER_REFERENCE_v2_2026_01_30.md`
- `docs/deprecated/MASTER_UX_STRATEGY_v1.md`
- `docs/deprecated/SPOT_SYNTHESIS_v1.md`
- `docs/deprecated/UX_UNIFICATION_ANALYSIS_v1.md`

**Purpose:** This document is the absolute authority on the project's vision, metaphor, and architectural decisions. All other agents and developers must align with this document. If a conflict arises, *this document wins*.

> **Implementation Rules:** See [`docs/DESIGN_SYSTEM_RULES.md`](./DESIGN_SYSTEM_RULES.md) for strict UI/UX enforcement guidelines (Theme, Input, i18n).

---

## 🏗️ Decision 1: Level Structure
**Verdict:** **Hybrid D (Optimized)**
`DNA (Mechanism) → Seed (Intent) → Sprout (Foundations) → Tree (Knowledge) → Fruits (Applications) → Orchard (Careers)`

**Changes from V1:** 
*   Removed **Nucleus**. (Rationale: Unnecessary onramp step. DNA is already the microscopic starting point).
*   Added **Fruits** between Tree and Orchard. (Rationale: Need a bridge between abstract knowledge (Tree) and career commitment (Orchard). Fruits = "What can I do?" like Writing/Analysis).
*   Renamed **Forest** to **Fruits/Orchard** flow. (Rationale: "Forest" (technical ecosystem) is less relevant to career changers than "Fruits" (applications). Forest content moves to deep-tree branches).

---

## 🎨 Decision 2: Dark vs Light Theme
**Verdict:** **B (Contextual)**
`DNA = Cinematic Dark. Seed = Transitional. Sprout/Tree/Fruits = Content-First Light (Adaptive).`

**Rationale:**
*   **Narrative Power:** DNA is the "wow" moment in the void.
*   **Learning Efficacy:** Sprout/Tree involve 15-30 mins of reading. Light mode is mandatory for cognitive load.
*   **Identity:** The brand is the *growth* from dark (underground) to light (sunlight).

---

## 🌳 Decision 3: Tree View Implementation
**Verdict:** **C (Hybrid)**
`Primary: Card-Based TreeExplorer. Secondary: D3 Map Toggle (Desktop Only).`

**Rationale:**
*   **Mobile Reality:** D3 graphs are unusable on mobile. A unified card grid (Roots/Trunk/Branches tabs) is the only viable mobile-first solution.
*   **Power Users:** The spatial graph *is* valuable for context. Keeping it as an optional "Map View" on desktop satisfies the "Big Picture" need.

---

## 🧠 Decision 4: Input Position
**Verdict:** **B (Context-Dependent)**
`DNA = Top Fixed. Tree/Explorer = Bottom Floating.`

**Changes from V1:**
*   **DNA:** Input stays at **TOP**. Rationale: It's a "Simulation Controller" (like a URL bar or video speed dial). A bottom input conflicts with the Stage Selector and the linear "downward flow" of the cards on mobile.
*   **Tree:** Input moves to **BOTTOM**. Rationale: Here it is a "Search/Ask" tool, unrelated to a specific pipeline.

---

## ✨ Decision 5: Animation Level
**Verdict:** **Nuanced (Magical but Disciplined)**
`One "Hero Animation" per step. No ambient noise.`

**Rationale:**
*   **Hero Moments:** Text flipping to Numbers (Matrix Reveal) and Attention Beams are critical pedagogical tools.
*   **Discipline:** No background particles. No camera pans (use simple fades/slides).
*   **Respect:** `prefers-reduced-motion` must disable all non-essential movement.

---

## 🌱 Decision 6: Sprout Level Content
**Verdict:** **C (Foundations + Control)**
`6 Cards: Tokens, Vectors, Attention, Context Window, Prompting, Hallucination.`

**Rationale:**
*   **Scope:** Enough to have an informed conversation about AI.
*   **Exclusions:** RAG is too advanced (goes to Tree). RICE is too specific (goes to Fruits).

---

## 🍎 Decision 7: Final Level Purpose
**Verdict:** **C (Fruits + Orchard)**
`Fruits (Application) -> Orchard (Career Harvest).`

**Rationale:**
*   **The Bridge:** "Fruits" (AI for Writing, Analysis, etc.) proves the value before the user commits to a career in the "Orchard".
*   **Business Goal:** The "Harvest" is the enrollment in AIKI/AIVO/AIME.

---

## 🚀 Execution Roadmap (Immediate Next Steps)

1.  **Tokenizer:** Implement "Text -> Integer -> Vector" animation. (Phase 1.1)
2.  **Mobile Input:** Deploy Context-Aware Input (Top on DNA, Floating elsewhere). (Phase 1.2)
3.  **Visual Bridge:** Update `StageSelector` to support the new `DNA -> Seed -> Sprout -> Tree -> Fruits -> Orchard` path.
4.  **Tree Explorer:** Begin scaffolding the Card-Based Tree View.

---
*Ratified by System Architecture Team, 2026-01-31.*
