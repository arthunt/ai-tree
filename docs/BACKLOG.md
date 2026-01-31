# 📋 The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V2.1)
**Updated:** 2026-01-31

---

## 🚀 Phase 1: Narrative & Mobile Core (Immediate)

> **Goal:** Fix the broken narrative bridge (Text->Vectors) and make mobile interaction seamless.

- [x] **1.1 Tokenizer "Matrix Reveal" Animation** `@gemini` ✅ DONE
    - [x] Implement `TokenizationSlicer` flipping pills to reveal Integer IDs.
    - [x] Add "Vector Preview" state (Numbers morph to coordinates).
    - [x] Sync animation timing with `DNAContext`.
- [x] **1.2 Context-Aware Navigation & Stage System** `@gemini` ✅ DONE
    - [x] Create `StageSelector` component with JourneyContext.
    - [x] Create `JourneyContext` for URL-based stage navigation.
    - [x] Create `TransitionManager` component.
    - [x] ⚠️ Align `EvolutionStage` type: replace `'forest'` → `'fruits' | 'orchard'` (SPOT v2.1).
    - [x] ⚠️ Update StageSelector: add Fruits + Orchard stages, remove Forest.
    - [x] ⚠️ Add ParaglideJS translations for stage labels.
    - [x] ⚠️ Remove `/proto` route references.
    - [x] Create `FloatingInput` component (Bottom-center, expandable).
    - [x] Update `DNAView` to keep Input at **TOP** (Simulation Controller).
    - [x] Update `TreeExplorer`/`Seed` to use `FloatingInput` at **BOTTOM**.
- [x] **1.3 Mobile Layout Upgrade** `@opus` `@swarm` ✅ DONE
    - [x] Implement "One Card Per Screen" stream for DNA View (Mobile <768px).
    - [x] Ensure 48px touch targets for all interactions.
    - [x] Add snap scrolling for card-to-card navigation.
- [ ] **1.4 Visual Calibration** ⏸️ BLOCKED by 1.2 alignment
    - [ ] Verify "Dark Mode" for DNA / "Light Mode" for Tree logic.
    - [ ] Update `StageSelector` to show: DNA → Seed → Sprout → Tree → Fruits → Orchard.
- [x] **1.5 Translation Keys for Phase 1** `@opus` ✅ DONE
    - [x] Stage labels ET+EN (DNA/Seed/Sprout/Tree/Fruits/Orchard).
    - [x] FloatingInput placeholder & labels.
    - [x] Mobile navigation hints.
- [ ] **1.6 DNA Mobile UX Overhaul** `@opus` `@swarm` 🔄 IN PROGRESS
    > Based on specialist review: [`docs/UX_RECOMMENDATIONS.md`](./UX_RECOMMENDATIONS.md)
    - [ ] **P0 — Critical**
        - [ ] 1.6.1 Step completion badge + contextual message on cards (`DNAComponentCard`)
        - [ ] 1.6.2 Always-visible step nav — show dimmed when no data (`DNAStepNav`)
        - [ ] 1.6.3 Enlarge nav touch targets (36→44px) + show step names (`DNAStepNav`)
        - [ ] 1.6.4 Input length validation — maxLength 500 + counter (`DNAInput`)
    - [ ] **P1 — High Impact**
        - [ ] 1.6.5 Card visual states: active/complete/inactive with distinct borders
        - [ ] 1.6.6 Token tap hint on cards + instructional text (`AttentionSpotlight`)
        - [ ] 1.6.7 Card peek view — show 15% of next card (85vw)
        - [ ] 1.6.8 Reduce mobile header prominence (h1 → text-2xl, subtitle → text-sm)
    - [ ] **P2 — Polish** (deferred)
        - [ ] 1.6.9 `prefers-reduced-motion` support
        - [ ] 1.6.10 Metaphor text prominence increase
        - [ ] 1.6.11 Re-accessible help button for MicroLesson
        - [ ] 1.6.12 Confirm destructive reset action
        - [ ] 1.6.13 Display current input text in DNAStepNav
        - [ ] 1.6.14 Clarify "Deep Dive" → "Learn More About [Step]"

- [ ] **2.3 Sprout Level Content** `@gemini` ✅ DONE
    - [x] Create `/sprout` page.
    - [x] Content: Tokens, Vectors, Attention, Context, Prompting, Hallucination.
    - [x] Content: Tokens, Vectors, Attention, Context, Prompting, Hallucination.

- [x] **2.4 Sprout Alignment & Design Rules** `@gemini` ✅ DONE
    - [x] Create `docs/DESIGN_SYSTEM_RULES.md` (Codified Standards).
    - [x] Enforce Theme: Transitional Dawn (Indigo/Purple).
    - [x] Enforce Input: Wire up to Toast (Coming Soon).
    - [x] Enforce i18n: Migrate hardcoded strings to `en.json`.
    - [x] ⚠️ Fix Header Sizing (Mobile `text-4xl` -> `text-2xl`, etc).
## 🛠️ Phase 2: The Unified Tree (Focus: Tree View)

> **Goal:** Replace the technical D3 graph with a user-friendly Explorer.

- [ ] **2.1 Unified Card System** `@freelance` 👈 OPEN FOR PICKUP
    - [ ] Create `UnifiedConceptCard` (merging DNA/Concept cards).
    - [ ] Implement variants: `SimNode` (Dark/Glass), `KnowledgeNode` (Light/Clean).
- [x] **2.2 Tree Explorer Component** `@gemini` ✅ DONE
    - [x] Create grid layout with tabs: [Roots] [Trunk] [Branches] [Leaves].
    - [x] Implement "Map View" toggle (lazy-loaded D3 graph).
    - [x] Refactor to Server-Side Data Fetching.

## 🍎 Phase 3: The Harvest (Business Integration)

> **Goal:** Connect knowledge to value (Application & Career).

- [ ] **3.1 Fruits Level**
    - [ ] Create `/fruits` page.
    - [ ] Modules: Writing, Analysis, Automation, Image Gen.
- [ ] **3.2 Orchard Level**
    - [ ] Create `/orchard` page.
    - [ ] Career Paths: Instructor, Automator, Developer, Creator.
    - [ ] Links to AIKI/AIVO/AIME programs.

---

## 🧊 Icebox / Future

- [ ] **Forest View:** Technical ecosystem visualization (Multi-model graph).
- [ ] **User Auth:** Tracking progress across stages.
- [ ] **Paraglide Migration:** Complete the i18n stack transition.
