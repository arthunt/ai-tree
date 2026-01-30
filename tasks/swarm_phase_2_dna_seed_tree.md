# Assignment: Phase 2 - The DNA-Seed-Tree Bridge

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** Critical
**Objective:** Establish the narrative bridge between the Mechanism (DNA), the Seed (Concept Origin), and the Forest (Tree of Knowledge).

## Context
We have successfully localized the DNA view and restored the Proto Tree view. We effectively have two islands: `/dna` (The Mechanism) and `/proto` (The Context).
We are missing the connective tissue: the **Seed**.
The user goal is: *"reach the dna-seed-tree progression in a very simple and easy to grasp way of thinking."*

## The Narrative Flow
1.  **DNA (The Mechanism):** User understands T-V-A-P.
2.  **Seed (The Bridge):** User sees how "Attention" (DNA component) grows into "Transformers" (Tree Root).
3.  **Tree (The Forest):** User explores the ecosystem.

---

## Task 1: Data Unification (The "DNA" Impedance Mismatch)
**Problem:**
*   `DNA` components use IDs: `tokenization`, `embeddings`, `attention`, `prediction`.
*   `Tree` concepts use IDs: `tokens`, `vectors`, `attention` (match), `prediction` (maybe?).
*   This mismatch prevents simple linking.

**Action Items for Swarm:**
1.  **Schema Auditor:**
    *   Analyze `data/tree-concepts.json` and `messages/*.json`.
    *   Propose a **Unified ID Map**.
    *   *Constraint:* Do NOT break the localized DNA messages.
2.  **Migration Agent:**
    *   Update `data/tree-concepts.json` to include `dna_id` field (or alias) where appropriate.
    *   Update `OrganicTreeDiagram.tsx` to handle highlighting based on DNA IDs if passed via URL params.

---

## Task 2: The "Seed" Transition
**Problem:** Clicking "Deep Dive" in DNA View currently jumps abruptly to a text-heavy Tree View. It lacks magic.

**Action Items for Swarm:**
1.  **UX Motion Agent:**
    *   Create a simple **"Seed Transition"** component.
    *   *Behavior:* When clicking "Deep Dive" on "Attention":
        1.  Show the "Attention" DNA Card isolating.
        2.  Morph it into a "Seed" (visual motif).
        3.  "Plant" it into the Tree (navigate to `/proto?highlight=attention`).

2.  **Implementation Agent:**
    *   Modify `DNAComponentCard.tsx` to trigger this transition instead of a hard link.

---

## Task 3: Paraglide Verification (The "SV" Audit)
**Problem:** We migrated to Paraglide but rely on a compatibility hook (`useParaglideTranslations`) that disables tree-shaking.

**Action Items for Swarm:**
1.  **Audit Agent:**
    *   Scan `hooks/useParaglideTranslations.tsx`.
    *   Report on the trade-off: **Dev Velocity** (Hook) vs **Bundle Size** (Direct Import).
    *   *Decision:* If bundle size is < 200KB, keep the hook. If > 200KB, create a plan to refactor to `m.keys()`.
    *   *Immediate Action:* Verify `messages/et.json` has decent coverage for the new "Seed" concepts.

---

## Deliverables
1.  **`Unified_ID_Map.md`**: The mapping document.
2.  **`Seed_Transition.tsx`**: The new motion component.
3.  **Refactored `DNAComponentCard.tsx`**: Using the transition.
4.  **`Paraglide_Audit_Report.md`**: Size vs Velocity verdict.

**Execution Mode:**
Use `claude-flow` to spin up agents for Task 1 and Task 3 in parallel. Task 2 requires Task 1 completion.
