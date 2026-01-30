# 🚀 Next Actions Strategy: The Divide & Conquer Plan

**Date:** 2026-01-30
**Goal:** Parallel execution of "Strategic Architecture" (Programs) and "UX Refinement" (The Bridge).

---

## 👨‍💻 @ANTIGRAVITY (Lead Architect)
**Focus:** Infrastructure, Database Schema, Critical Logic.

### 1. **Programs Architecture (Phase B)**
*   **Context:** We need to move from hardcoded "Coming Soon" text to a dynamic "Course Catalog" backend to support AIKI, AIVO, AIME.
*   **Tasks:**
    *   **US-138: Database Schema:** Design and apply `supabase/migrations/20260135_programs_schema.sql` (Programs, Features, Curriculum).
    *   **US-139: Seed Data:** Populate the tables with the initial datasets (prices, descriptions, curriculum types).
    *   **US-140: Server Actions:** Implement type-safe `getPrograms` and `getProgramCurriculum` loaders.

**Why me?** Database design impacts the entire application lifecycle and requires careful relational modeling.

---

## 🤖 @SWARM (Agents)
**Focus:** Visuals, Components, Data Mapping, Verification.

### 2. **The DNA-Seed-Tree Bridge (Phase 2)**
*   **Context:** The `/dna` page feels disconnected. Clicking "Deep Dive" needs to feel like carrying a seed to the forest.
*   **Tasks:**
    *   **US-111 (Visuals):** Create the `SeedTransition.tsx` component (Framer Motion flight animation).
    *   **Data Unification:** Map `dna_id` ("tokenization") -> `tree_id` ("tokens") in `tree-concepts.json`.
    *   **Wiring:** detailed in `tasks/swarm_phase_2_dna_seed_tree.md`.

### 3. **Paraglide Optimization (Maintenance)**
*   **Context:** Ensure our localization stack isn't bloating the app.
*   **Tasks:**
    *   **US-137:** Audit `useParaglideTranslations` hook vs direct import.
    *   **Report:** Provide a go/no-go on refactoring all components to direct `m.*` calls.

---

## 🚦 Execution Order

1.  **Antigravity** starts **US-138 (Schema)** immediately.
2.  **Swarm** spins up for **Phase 2 (Bridge)** in parallel.
3.  **Sync:** Once Schema is live, Antigravity hands off **Phase C (Landing Pages)** to Swarm to build the UI using the new data.
