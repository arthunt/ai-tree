# Assignment: Multi-Agent Development Strategy & Architecture

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** High

## Executive Summary
We are transitioning to a Swarm-based multi-agent development environment to accelerate content localization, navigation standardization, and architectural alignment between "Tree Components" (Micro-concepts) and "Training Programs" (Macro-paths).
Your objective is to accept this assignment and orchestrate the necessary sub-agents to execute the following phases.

---

## Phase 1: Content Localization & Swarm Translation Task
**Problem:** Significant portions of the application (specifically the `DNA` view and newer components) contain hardcoded English text. The `messages` files exist but are likely desynchronized.
**Objective:** Establish a "Translation Swarm" to ensure 100% localization coverage.

### Action Items for Agents:
1.  **Audit Agent:**
    *   Scan `components/dna/*.tsx` and `app/**` for hardcoded strings (e.g., "The Mechanism", "Every AI thought follows...").
    *   Compare `messages/en.json` keys against `data/tree-concepts.json` IDs to ensure every concept has `title`, `explanation`, `metaphor`.
2.  **Extraction Agent:**
    *   Extract hardcoded strings into `messages/en.json` using the flattened key convention (e.g., `dna.header.title`).
3.  **Translation Agent:**
    *   Populate `messages/et.json` (and potential future locales) ensuring technical accuracy (AI terminology).

**Deliverable:** A `Localization_Audit.md` report and a PR decoupling hardcoded text.

---

## Phase 2: Navigation & UX Standardization
**Problem:** The `DNA` page (`app/[locale]/dna`) is an island with no navigation. The "Training Programs" (`app/[locale]/learn`) lack visibility in the global header/menu.
**Objective:** Create a Unified Navigation Architecture.

### Action Items for Agents:
1.  **UX Designer Agent:**
    *   Propose a **Global Navigation Bar** that supports:
        *   **Tree View** (Concept Map)
        *   **DNA** (The Mechanism)
        *   **Do** (Training Programs / Learning Paths)
    *   *Constraint:* Must retain the immersive feel of the DNA page while providing escape/navigation routes.
2.  **Implementation Agent:**
    *   Refactor `DNAView.tsx` to accept a `layout` wrapper or include a transparent overlay version of the global nav.

**Deliverable:** A `Navigation_Architecture.md` proposal with component mockups.

---

## Phase 3: Architectural Alignment (Tree vs. Programs)
**Problem:** `tree-concepts.json` (Atoms) and `learning-paths.json` (Playlists) are loosely coupled by string IDs. We need a robust architecture to support "Curriculum generation" and bidirectional referencing.
**Objective:** Formalize the Graph Schema.

### Action Items for Agents:
1.  **Architect Agent:**
    *   Analyze `data/tree-concepts.json` and `data/learning-paths.json`.
    *   Propose a **Graph Schema** where:
        *   **Nodes** = Concepts (with metadata: difficulty, prerequisites).
        *   **Edges** = Dependencies ("Vectors" -> "Attention").
        *   **Paths** = Ordered traversals of the graph.
2.  **API Agent:**
    *   Refactor `getTreeContent.ts` to potentially serve "Program" contexts (e.g., "Show me the sub-tree for 'Prompt Engineering' path only").

**Deliverable:** `Architecture_Schema_Proposal.md`.

---

## Next Steps for Claude-Flow
1.  **Ingest this assignment.**
2.  **Spin up** the Swarm Context (load `data/*.json` and `messages/*.json`).
3.  **Execute Phase 1 (Audit)** immediately as the first proof-of-work.
4.  **Report back** with the Audit File.

**Do not deviate from the "Agentic" approach.** Treat this as orchestrating a team, not just writing code.
