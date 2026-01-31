# Dendrix.ai Vision & Strategy: The Living System

**Status:** DEFINITIVE SINGLE POINT OF TRUTH (SPOT)
**Version:** 3.0 (Ratified 2026-02-01)
**Authors:** Antigravity, Swarm, Claude Desktop, Expert Panel (ML/AI, Andragogy, UX/UI, System Architecture)
**Supersedes:**
- V2.1 (2026-01-31)
- `docs/deprecated/AI_TREE_MASTER_REFERENCE_v2_2026_01_30.md`
- `docs/deprecated/MASTER_UX_STRATEGY_v1.md`
- `docs/deprecated/SPOT_SYNTHESIS_v1.md`
- `docs/deprecated/UX_UNIFICATION_ANALYSIS_v1.md`

**Purpose:** This document is the absolute authority on the project's vision, metaphor, and architectural decisions. All other agents and developers must align with this document. If a conflict arises, *this document wins*.

> **Implementation Rules:** See [`docs/DESIGN_SYSTEM_RULES.md`](./DESIGN_SYSTEM_RULES.md) for strict UI/UX enforcement guidelines (Theme, Input, i18n).

---

## The Core Metaphor: From Underground to Harvest

The learner's journey follows the lifecycle of a tree — from the invisible molecular machinery underground, through data compression, conceptual foundations, guided practice in a nursery, deep knowledge in sunlight, real-world application, and finally professional harvest.

```
Underground (Dark)                    Surface (Dawn)                         Sunlight (Light)
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│   DNA    │→ │   Seed   │→ │  Sprout  │→ │  Istik   │→ │   Tree   │→ │  Fruits  │→ │ Orchard  │
│ Mechanism│  │Data/Train│  │Emergence │  │ Practice │  │Knowledge │  │  Apply   │  │ Harvest  │
│ "How?"   │  │ "From?"  │  │ "What?"  │  │"Can I?"  │  │ "Depth"  │  │ "Use it" │  │ "Career" │
└──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## Decision 1: Level Structure

**Verdict:** **7-Stage Journey (V3)**

`DNA (Mechanism) -> Seed (Data & Training) -> Sprout (Emergent Properties) -> Istik (Guided Practice) -> Tree (Knowledge) -> Fruits (Applications) -> Orchard (Careers)`

**Changes from V2.1:**
* **Added Istik** between Sprout and Tree. (Rationale: Adult learners need a "first agency" moment — hands-on guided practice in a safe sandbox — before encountering the full knowledge tree. Without it, learners drop off between theory and application. The Estonian word "istik" means a grafted sapling cultivated in a *puukool* (tree nursery) — strong but small, not yet bearing fruit.)
* **Redefined Sprout** from "Foundations + Control" to "Emergent Properties". (Rationale: Sprout now covers what *arises* from training — generalization, hallucination, context windows, temperature — rather than repeating DNA mechanics at a higher level.)
* **Redefined Seed** as "Data & Training". (Rationale: The gap between "how one forward pass works" (DNA) and "what the model becomes" (Sprout) is understanding where knowledge comes from: datasets, loss, backpropagation, training runs.)

### Stage Definitions

| Stage | Estonian | ML Concept | Learner Question | Interaction Model |
|:---|:---|:---|:---|:---|
| **DNA** | DNA | Forward pass (T-V-A-P) | "How does one prediction work?" | Interactive simulation |
| **Seed** | Seeme | Data & Training | "Where does AI knowledge come from?" | Training visualization |
| **Sprout** | Idu | Emergent properties | "What does a trained model become?" | Concept cards + light interactions |
| **Istik** | Istik | Guided practice | "Can I actually do this myself?" | Prompt sandbox + feedback loop |
| **Tree** | Puu | Knowledge architecture | "How deep does this go?" | Deep reading + branching exploration |
| **Fruits** | Viljad | Real applications | "What can I build with this?" | Application demos + try-it |
| **Orchard** | Viljapuuaed | Career & ecosystem | "Where does this take me?" | Career paths + program enrollment |

### Andragogy Mapping (Knowles' Adult Learning Principles)

| Principle | Stage | How Addressed |
|:---|:---|:---|
| Need to Know | DNA | "See exactly how AI works — 4 steps" |
| Foundation of Experience | Seed | "It learned from the same internet you use" |
| Self-Concept | Sprout | "I can discuss AI intelligently now" |
| Readiness to Learn | Istik | "I tried it and it worked — I'm ready for more" |
| Orientation to Learning | Tree | "I'll learn what I need for my specific goal" |
| Motivation | Fruits/Orchard | "I can do this professionally" |

### Novice User Concerns Addressed

| Fear | Stage | Resolution |
|:---|:---|:---|
| "AI is magic, I'll never understand" | DNA | Broken into 4 visible, simple steps |
| "Where does it get its knowledge?" | Seed | It's compressed text data — nothing magic |
| "Will it lie to me?" | Sprout | Hallucination explained — and why it happens |
| "Can I actually do this?" | Istik | Yes — try now, safe sandbox, no wrong answers |
| "What would I even use it for?" | Fruits | Concrete tools relevant to your work |
| "Is there a real career here?" | Orchard | Yes — and here's how to start |

---

## Decision 2: Dark vs Light Theme

**Verdict:** **Contextual Gradient (Updated for 7 stages)**

| Stage | Theme | Background | Metaphor |
|:---|:---|:---|:---|
| **DNA** | Cinematic Dark | `bg-void` (black), neon accents | The code underground |
| **Seed** | Deep Earth | Stone-900 → amber-950 gradient | Compression under pressure |
| **Sprout** | Dawn | Indigo/violet → morning sky | First light breaking through |
| **Istik** | Morning Green | Emerald-tinted glass, nursery warmth | Greenhouse / tree nursery |
| **Tree** | Daylight | White, paper, clean surfaces | Full sunlight, reading |
| **Fruits** | Warm Daylight | Warm whites, amber accents | Noon, productivity |
| **Orchard** | Golden Hour | Sunset warmth, harvest tones | Evening, reflection |

**Rationale:**
* **Narrative Power:** DNA is the "wow" moment in the void.
* **Learning Efficacy:** Tree+ stages involve 15-30 mins of reading. Light mode is mandatory for cognitive load.
* **Identity:** The brand *is* the growth from dark (underground) to light (sunlight).
* **Istik addition:** Morning green (emerald/teal tint) represents the controlled nursery environment — warmer than Sprout's dawn, but not yet the full daylight of Tree.

---

## Decision 3: Tree View Implementation

**Verdict:** **C (Hybrid)**
`Primary: Card-Based TreeExplorer. Secondary: D3 Map Toggle (Desktop Only).`

**Rationale:**
* **Mobile Reality:** D3 graphs are unusable on mobile. A unified card grid (Roots/Trunk/Branches tabs) is the only viable mobile-first solution.
* **Power Users:** The spatial graph *is* valuable for context. Keeping it as an optional "Map View" on desktop satisfies the "Big Picture" need.

---

## Decision 4: Input Position

**Verdict:** **B (Context-Dependent, Updated)**

| Stage | Input Position | Role | Status |
|:---|:---|:---|:---|
| **DNA** | Top (inline, relative) | Simulation Controller | Implemented |
| **Seed** | Bottom (fixed) | Goal/question entry | Functional (navigates to Tree) |
| **Istik** | Inline (central) | Prompt Sandbox | Core interaction — not floating |
| **Tree** | Bottom (fixed floating) | Search / Ask tool | Planned |
| **Sprout/Fruits/Orchard** | None | No input needed yet | Removed (Design Rule #2) |

**Changes from V2.1:**
* Removed non-functional FloatingInput from Sprout, Fruits, Orchard, Tree (were stub handlers).
* Seed FloatingInput retained — has real navigation to Tree with intent.
* Istik will have inline prompt sandbox as core interaction (not floating — it IS the page).

---

## Decision 5: Animation Level

**Verdict:** **Nuanced (Magical but Disciplined)**
`One "Hero Animation" per step. No ambient noise.`

**Rationale:**
* **Hero Moments:** Text flipping to Numbers (Matrix Reveal) and Attention Beams are critical pedagogical tools.
* **Discipline:** No background particles. No camera pans (use simple fades/slides).
* **Respect:** `prefers-reduced-motion` must disable all non-essential movement.

---

## Decision 6: Stage Content Definitions

### 6a. DNA Content (4 concepts)
`Tokenization, Vectorization (Embeddings), Attention, Prediction`

Interactive simulation of a single forward pass. The learner types text and watches it flow through 4 pipeline stages.

### 6b. Seed Content (3 phases)
`Dataset -> Training (Compression) -> Model`

**Phase 1 — The Dataset:** Common Crawl, The Pile, data cleaning, bias in data.
**Phase 2 — Training:** Loss function, backpropagation, compute clusters, epochs, overfitting.
**Phase 3 — The Model:** Weights, base model, checkpoints, evaluation.

Hero visualization: A "compression" animation showing massive data being squeezed into a compact model.

### 6c. Sprout Content (6 concepts)
`Generalization, Context Windows, Hallucination, Temperature & Sampling, Representations, Prompting Basics`

What emerges from billions of training steps — the properties that make AI useful *and* dangerous. Each concept is a card with analogy, explanation, and light interactive element.

### 6d. Istik Content (Guided Practice Modules)

The *puukool* (nursery) stage. Learner gets hands-on with AI in a structured, feedback-rich environment.

**Module 1 — First Prompt:** Type a prompt, see the output, understand cause and effect.
**Module 2 — Prompt Refinement:** Same task, three attempts, see improvement through iteration.
**Module 3 — Temperature & Control:** Adjust parameters, see how output changes.
**Module 4 — Evaluation:** Learn to judge AI output quality — accuracy, relevance, safety.

Hero interaction: A split-screen sandbox with prompt input on left, AI output on right, and a feedback/scoring panel.

### 6e. Tree Content (Knowledge Graph)
Full knowledge architecture: Roots (history), Trunk (architectures), Branches (techniques), Leaves (specific models/papers). RAG, fine-tuning, agents, tool use, multi-model systems.

### 6f. Fruits Content (Applications)
Real-world AI applications: Writing, Analysis, Code Generation, Image Generation, Voice.

### 6g. Orchard Content (Careers)
Professional paths: AI Engineer, Prompt Architect, Data Scientist, AI Ethicist, MLOps. Links to AIKI/AIVO/AIME enrollment.

---

## Decision 7: Concept Object Architecture

**Verdict:** **Unified Concept Model — Database-First with Type-Safe SDK**

### The Problem (Current State)

Content is fragmented across the codebase:

| Stage | Data Source | i18n Method | Reusable? |
|:---|:---|:---|:---|
| DNA | `concept_translations` table + mock fallback | DB locale column | Partially |
| Seed | Hardcoded `SEED_STEPS` array in component | Translation keys | No |
| Sprout | `sprout_lessons` table + mock fallback | DB jsonb locale | Partially |
| Tree | `nodes` + `node_translations` + `node_metadata` tables | DB join | Yes |
| Fruits | Hardcoded `APPLICATIONS` array in component | None (English only) | No |
| Orchard | Hardcoded `CAREERS` array in component | None (English only) | No |
| Programs | Static `PROGRAMS` object in `/lib/programs/data.ts` | Inline `{en, et}` | Somewhat |

This creates problems:
1. **Duplication:** Same concept (e.g., "Tokenization") defined separately in DNA cards, Sprout cards, Tree nodes, and learning paths.
2. **i18n inconsistency:** Three different localization patterns (DB column, DB jsonb, ParaglideJS keys).
3. **No cross-referencing:** Can't link a DNA concept to its deeper Tree node or related Program.
4. **Hard to maintain:** Adding a language or concept requires changes in 4+ files.

### The Solution: Unified Concept Object

Every teachable concept in the system is a single `Concept` record in Supabase, with translations, metadata, relationships, and stage assignments.

#### Core Schema

```
concepts
├── id: string (slug, e.g., "tokenization", "backpropagation", "prompt-engineering")
├── stage: enum ('dna' | 'seed' | 'sprout' | 'istik' | 'tree' | 'fruits' | 'orchard')
├── category: string (grouping within stage, e.g., "pipeline", "training", "emergent")
├── complexity: int (1-10, enables progressive disclosure)
├── parent_id: string | null (for tree hierarchy and concept prerequisites)
├── sort_order: int (within stage)
├── visual_type: string ('simulation' | 'card' | 'sandbox' | 'interactive' | 'static')
├── icon: string | null (lucide icon name or emoji)
├── color: string | null (hex, for stage-specific theming)
├── related_program_id: string | null (FK to programs)
├── is_published: boolean
├── created_at, updated_at

concept_translations
├── concept_id: FK → concepts.id
├── locale: enum ('en' | 'et' | ...)
├── title: string
├── subtitle: string | null
├── explanation: text (the "What")
├── metaphor: text | null (the "Like a...")
├── question: text | null (the "Hook" — drives curiosity)
├── deep_dive: text | null (extended content for detail panels)
├── completion_message: text | null (shown after step/concept completes)
├── hint: text | null (contextual help during interaction)

concept_relationships
├── source_id: FK → concepts.id
├── target_id: FK → concepts.id
├── relationship: enum ('prerequisite' | 'builds-on' | 'related' | 'deepens' | 'applies')
├── strength: float (0-1, for weighted graph traversal)
```

#### Key Design Principles

1. **One concept, one record.** "Tokenization" exists once in `concepts`, with translations for each locale. It can appear in DNA (as simulation card), Sprout (as foundation card), Tree (as knowledge node), and learning paths — all referencing the same ID.

2. **Stage assignment determines rendering.** The `stage` field determines which page owns the concept. The `visual_type` field determines how it renders (simulation, card, sandbox, etc.).

3. **Relationships enable cross-linking.** A DNA concept can link to its Tree deepening. A Sprout concept can link to its Istik practice module. A Tree node can link to its Program enrollment.

4. **Translations are always in the database.** No more hardcoded strings, no more inline `{en, et}` objects, no more ParaglideJS for content (ParaglideJS stays for UI chrome — buttons, labels, navigation).

5. **Fallback chain.** Server actions query Supabase first, fall back to `MOCK_DATA` for offline development. Mock data follows the exact same shape as the DB response.

#### TypeScript SDK

```typescript
// lib/concepts/types.ts
interface Concept {
  id: string;
  stage: Stage;
  category: string;
  complexity: number;
  parentId: string | null;
  sortOrder: number;
  visualType: 'simulation' | 'card' | 'sandbox' | 'interactive' | 'static';
  icon: string | null;
  color: string | null;
  relatedProgramId: string | null;
  // Joined translation (current locale)
  title: string;
  subtitle: string | null;
  explanation: string;
  metaphor: string | null;
  question: string | null;
  deepDive: string | null;
  completionMessage: string | null;
  hint: string | null;
  // Joined relationships
  prerequisites: string[];    // concept IDs
  relatedConcepts: string[];  // concept IDs
}

// lib/concepts/api.ts
getConceptsByStage(stage: Stage, locale: string): Promise<Concept[]>
getConcept(id: string, locale: string): Promise<Concept | null>
getConceptWithRelated(id: string, locale: string): Promise<ConceptWithRelated>
getConceptsByIds(ids: string[], locale: string): Promise<Concept[]>
getLearningPath(pathId: string, locale: string): Promise<Concept[]>
```

#### Migration Strategy

The migration from hardcoded content to the Concept Object system happens in phases:

**Phase A — Schema & SDK (Foundation)**
1. Create `concepts`, `concept_translations`, `concept_relationships` tables in Supabase.
2. Build TypeScript SDK (`lib/concepts/`) with server actions and mock fallbacks.
3. Seed database with existing DNA concepts (already partially in `concept_translations`).

**Phase B — DNA Migration (Proof of Concept)**
1. Migrate DNA's 4 concepts to the new schema (they're already closest to the target shape).
2. Update `getDNAContent()` to use the new SDK.
3. Verify rendering, i18n, and fallback behavior.

**Phase C — Sprout + Seed Migration**
1. Migrate Sprout's 6 concepts to the new schema.
2. Create Seed's concepts (Dataset, Training, Model + sub-concepts).
3. Update server actions for both stages.

**Phase D — Tree Integration**
1. Tree's `nodes` table already has translations and metadata. Create a bridge:
   - Tree nodes reference `concept_id` where applicable.
   - Deep-dive on a tree node shows the full Concept Object content.
2. Merge `node_translations` fields into `concept_translations` where concepts overlap.

**Phase E — Fruits, Orchard, Istik**
1. Move hardcoded `APPLICATIONS` and `CAREERS` to `concepts` table with appropriate stages.
2. Create Istik practice modules as concepts with `visual_type: 'sandbox'`.

**Phase F — Cross-Linking**
1. Populate `concept_relationships` table.
2. Enable "Related concepts" panels in all stages.
3. Learning paths reference concept IDs from the unified table.

---

## Decision 8: StageSelector & Navigation

**Verdict:** Updated for 7 stages.

The `StageSelector` component and `EvolutionStage` type must reflect:
`'dna' | 'seed' | 'sprout' | 'istik' | 'tree' | 'fruits' | 'orchard'`

The stage selector appears on all stage pages. Each stage has:
- Icon (emoji or lucide icon)
- Label (localized via ParaglideJS for UI chrome)
- Route (`/[locale]/dna`, `/[locale]/seed`, etc.)
- Theme indicator (visual dot showing dark/dawn/light progression)

---

## Execution Roadmap

### Immediate (Phase 1 — in progress)
1. ~~Tokenizer Matrix Reveal animation~~ DONE
2. ~~Mobile layout and navigation~~ DONE
3. ~~DNA step colors, i18n, accessibility~~ DONE
4. ~~Remove non-functional FloatingInput~~ DONE

### Next (Phase 2 — Concept Object Foundation)
1. Design and create Supabase schema for Concept Object system.
2. Build TypeScript SDK with server actions and mock fallbacks.
3. Migrate DNA concepts as proof of concept.
4. Update StageSelector for 7 stages (add Istik).

### Then (Phase 3 — Seed & Sprout Content)
1. Build Seed stage (Data & Training) with 3-phase visualization.
2. Redefine Sprout content (Emergent Properties) using Concept Objects.
3. Migrate Sprout from hardcoded content to database.

### Then (Phase 4 — Istik)
1. Design Istik sandbox interaction model.
2. Build prompt sandbox component with feedback loop.
3. Create Istik practice modules as Concept Objects.

### Then (Phase 5 — Fruits, Orchard, Cross-Linking)
1. Migrate Fruits and Orchard content to Concept Objects.
2. Build concept relationship graph.
3. Enable cross-stage linking and "Related concepts" panels.

---
*Ratified by Expert Panel (ML/AI, Andragogy, UX/UI, System Architecture), 2026-02-01.*
