# The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V3.0)
**Updated:** 2026-02-01

---

## Phase 1: Narrative & Mobile Core (Immediate)

> **Goal:** Fix the broken narrative bridge (Text->Vectors) and make mobile interaction seamless.

- [x] **1.1 Tokenizer "Matrix Reveal" Animation** `@gemini` DONE
    - [x] Implement `TokenizationSlicer` flipping pills to reveal Integer IDs.
    - [x] Add "Vector Preview" state (Numbers morph to coordinates).
    - [x] Sync animation timing with `DNAContext`.
- [x] **1.2 Context-Aware Navigation & Stage System** `@gemini` DONE
    - [x] Create `StageSelector` component with JourneyContext.
    - [x] Create `JourneyContext` for URL-based stage navigation.
    - [x] Create `TransitionManager` component.
    - [x] Align `EvolutionStage` type: replace `'forest'` -> `'fruits' | 'orchard'` (SPOT v2.1).
    - [x] Update StageSelector: add Fruits + Orchard stages, remove Forest.
    - [x] Add ParaglideJS translations for stage labels.
    - [x] Remove `/proto` route references.
    - [x] Create `FloatingInput` component (Bottom-center, expandable).
    - [x] Update `DNAView` to keep Input at **TOP** (Simulation Controller).
    - [x] Update `TreeExplorer`/`Seed` to use `FloatingInput` at **BOTTOM**.
- [x] **1.3 Mobile Layout Upgrade** `@opus` `@swarm` DONE
    - [x] Implement "One Card Per Screen" stream for DNA View (Mobile <768px).
    - [x] Ensure 48px touch targets for all interactions.
    - [x] Add snap scrolling for card-to-card navigation.
- [ ] **1.4 Visual Calibration** BLOCKED by 1.13 (7-stage update)
    - [ ] Verify "Dark Mode" for DNA / "Light Mode" for Tree logic.
    - [ ] Update `StageSelector` to show 7 stages: DNA -> Seed -> Sprout -> Istik -> Tree -> Fruits -> Orchard.
- [x] **1.5 Translation Keys for Phase 1** `@opus` DONE
    - [x] Stage labels ET+EN (DNA/Seed/Sprout/Tree/Fruits/Orchard).
    - [x] FloatingInput placeholder & labels.
    - [x] Mobile navigation hints.
- [x] **1.6 DNA Mobile UX Overhaul** `@opus` `@swarm` P0+P1 DONE
    > Based on specialist review: [`docs/UX_RECOMMENDATIONS.md`](./UX_RECOMMENDATIONS.md)
    - [x] **P0 — Critical**
        - [x] 1.6.1 Step completion badge + contextual message on cards (`DNAComponentCard`)
        - [x] 1.6.2 Always-visible step nav — show dimmed when no data (`DNAStepNav`)
        - [x] 1.6.3 Enlarge nav touch targets (36->44px) + show step names (`DNAStepNav`)
        - [x] 1.6.4 Input length validation — maxLength 500 (`DNAInput`)
    - [x] **P1 — High Impact**
        - [x] 1.6.5 Card visual states: active/complete/inactive with distinct borders
        - [x] 1.6.6 Token tap hint on cards + instructional text (`AttentionSpotlight`)
        - [x] 1.6.7 Card peek view — show 15% of next card (85vw)
        - [x] 1.6.8 Reduce mobile header prominence (h1 -> text-2xl, subtitle -> text-sm)
        - [x] 1.6.9 Desktop layout fix — cards no longer pushed below fold
    - [ ] **P2 — Polish** (deferred)
        - [ ] 1.6.10 Metaphor text prominence increase
        - [ ] 1.6.11 Re-accessible help button for MicroLesson
        - [ ] 1.6.12 Confirm destructive reset action
        - [ ] 1.6.13 Display current input text in DNAStepNav
        - [ ] 1.6.14 Clarify "Deep Dive" -> "Learn More About [Step]"
- [x] **1.7 DNA Step Color Differentiation** `@opus` DONE
    - [x] Apply per-step colors to card active borders, step buttons, progress bar
    - [x] T=teal `#25EDBA`, V=blue `#3B82F6`, A=purple `#A855F7`, P=amber `#F59E0B`
- [x] **1.8 Accessibility: `prefers-reduced-motion`** `@opus` DONE
    - [x] Add CSS media query to disable infinite animations
    - [x] Wrap Framer Motion animations with motion preference check
- [x] **1.9 i18n: Migrate DNA Hardcoded Strings** `@opus` DONE
    - [x] Move `STEP_COMPLETE_MESSAGES` to translation keys
    - [x] Move `STEP_HINT_MESSAGES` to translation keys
    - [x] Move DNAStepNav labels to translation keys
- [x] **1.10 DNA Desktop: Responsive Input Width** `@opus` DONE
    - [x] Widen to `lg:max-w-full` (match cards grid width)
    - [x] Reduce input vertical padding on desktop
    - [x] Reduce bottom margin
- [x] **1.11 DNA Desktop: Reduce Gap Between Input & Cards** `@opus` DONE
    - [x] Reduce cards container top margin
    - [x] Shrink GlowingNode area
    - [x] Remove dead `DNAFlowDiagram` component
- [x] **1.12 DNA Desktop: GlowingNode Visibility** `@opus` DONE
    - [x] Reduce container height to match node size
    - [x] Node sizes tuned (48/32 active/default)
- [x] **1.13 Remove Non-Functional FloatingInput** `@opus` DONE
    - [x] Remove from Tree page (console.log stub)
    - [x] Remove from Sprout page (toast stub)
    - [x] Remove from Fruits page (toast stub)
    - [x] Remove from Orchard page (toast stub)
    - [x] Remove controlHint overlay from DNA page
    - [x] Keep Seed FloatingInput (functional navigation)
    - [x] Clean up unused `useToast` imports

---

## Phase 2: Concept Object Foundation

> **Goal:** Build the unified data architecture that all stages will use. Ref: VISION_AND_STRATEGY.md Decision 7.

- [ ] **2.1 Supabase Schema: Concept Object Tables** `@opus` `@gemini` P0
    > Create the foundational database schema for the unified concept system.
    - [ ] 2.1.1 Create `concepts` table (id, stage, category, complexity, parent_id, sort_order, visual_type, icon, color, related_program_id, is_published)
    - [ ] 2.1.2 Create `concept_translations` table (concept_id, locale, title, subtitle, explanation, metaphor, question, deep_dive, completion_message, hint)
    - [ ] 2.1.3 Create `concept_relationships` table (source_id, target_id, relationship, strength)
    - [ ] 2.1.4 Add RLS policies for public read access
    - [ ] 2.1.5 Create indexes on (stage, sort_order) and (concept_id, locale)

- [ ] **2.2 TypeScript SDK: Concept API** `@opus` `@gemini` P0
    > Build the client-side SDK for querying concepts.
    - [ ] 2.2.1 Create `lib/concepts/types.ts` — `Concept`, `Stage`, `ConceptRelationship` types
    - [ ] 2.2.2 Create `lib/concepts/api.ts` — `getConceptsByStage()`, `getConcept()`, `getConceptWithRelated()`, `getConceptsByIds()`
    - [ ] 2.2.3 Create `lib/concepts/mock-data.ts` — Mock fallback data matching DB shape
    - [ ] 2.2.4 Create server action `actions/getConcepts.ts` with Supabase query + mock fallback
    - [ ] 2.2.5 Unit tests for SDK functions

- [ ] **2.3 DNA Migration to Concept Objects** `@opus` P1
    > Proof of concept: Migrate DNA's 4 concepts to the new schema.
    - [ ] 2.3.1 Seed `concepts` table with tokenization, embeddings, attention, prediction (stage='dna')
    - [ ] 2.3.2 Seed `concept_translations` for EN + ET
    - [ ] 2.3.3 Update `getDNAContent()` to use new SDK (with fallback to mock)
    - [ ] 2.3.4 Verify DNAView renders correctly with new data source
    - [ ] 2.3.5 Remove old `MOCK_DNA_DATA` from `getDNAContent.ts`

- [ ] **2.4 StageSelector: 7-Stage Update** `@gemini` `@opus` P1
    > Add Istik to the navigation system.
    - [ ] 2.4.1 Update `EvolutionStage` type: add `'istik'`
    - [ ] 2.4.2 Update `StageSelector` component with 7 stages
    - [ ] 2.4.3 Create `/[locale]/istik` route (placeholder page)
    - [ ] 2.4.4 Add translation keys for "Istik" / "Sapling" stage label (EN + ET)
    - [ ] 2.4.5 Update `JourneyContext` stage order

- [x] **2.5 Sprout Level Content** `@gemini` DONE
    - [x] Create `/sprout` page.
    - [x] Content: Tokens, Vectors, Attention, Context, Prompting, Hallucination.
- [x] **2.6 Sprout Alignment & Design Rules** `@gemini` DONE
    - [x] Create `docs/DESIGN_SYSTEM_RULES.md` (Codified Standards).
    - [x] Enforce Theme: Transitional Dawn (Indigo/Purple).
    - [x] Enforce i18n: Migrate hardcoded strings to `en.json`.
- [ ] **2.7 Unified Card System** `@gemini` IN PROGRESS
    > UnifiedConceptCard created with dna/sprout/tree variants. Needs Istik variant.
    - [x] Create `UnifiedConceptCard` (merging DNA/Concept cards).
    - [x] Implement variant: `dna` (Dark/Glass with per-step colors).
    - [ ] Implement variant: `sprout` (Dawn/Transitional).
    - [ ] Implement variant: `tree` (Light/Clean).
    - [ ] Implement variant: `istik` (Morning Green / Sandbox).
- [x] **2.8 Tree Explorer Component** `@gemini` DONE
    - [x] Create grid layout with tabs: [Roots] [Trunk] [Branches] [Leaves].
    - [x] Implement "Map View" toggle (lazy-loaded D3 graph).
    - [x] Refactor to Server-Side Data Fetching.

---

## Phase 3: Seed & Sprout Content (7-Stage Alignment)

> **Goal:** Build the Seed stage and redefine Sprout for the new 7-stage journey. Ref: VISION_AND_STRATEGY.md Decision 6b/6c.

- [ ] **3.1 Seed Stage: Data & Training** `@gemini` `@opus` P0
    > Ref: VISION_AND_STRATEGY.md Decision 6b.
    - [ ] 3.1.1 Create Seed concepts in DB: `dataset`, `common-crawl`, `the-pile`, `data-cleaning`, `bias-in-data`, `loss-function`, `backpropagation`, `compute-cluster`, `epochs`, `overfitting`, `weights`, `base-model`, `checkpoints`, `evaluation`
    - [ ] 3.1.2 Create `SeedView` component with Deep Earth theme (stone-900 -> amber-950)
    - [ ] 3.1.3 Implement 3-phase layout: Dataset -> Training -> Model
    - [ ] 3.1.4 Design "Compression" hero animation (data shrinking into model)
    - [ ] 3.1.5 Add concept translations EN + ET
    - [ ] 3.1.6 Server action `getSeedContent()` using Concept SDK
    - [ ] 3.1.7 Replace hardcoded `SEED_STEPS` in `SeedView.tsx` with DB content

- [ ] **3.2 Sprout Content Redefinition** `@gemini` `@opus` P1
    > Ref: VISION_AND_STRATEGY.md Decision 6c. Sprout shifts from "Foundations" to "Emergent Properties".
    - [ ] 3.2.1 Create new Sprout concepts in DB: `generalization`, `context-windows`, `hallucination`, `temperature-sampling`, `representations`, `prompting-basics`
    - [ ] 3.2.2 Add translations EN + ET with metaphors and explanations
    - [ ] 3.2.3 Update `getSproutContent()` to use Concept SDK
    - [ ] 3.2.4 Remove hardcoded `MOCK_SPROUT_DATA`
    - [ ] 3.2.5 Update Sprout page subtitle/description to reflect "Emergent Properties" framing

- [ ] **3.3 Sprout Migration to Concept Objects** `@opus` P2
    > Migrate existing sprout_lessons data to unified concepts table.
    - [ ] 3.3.1 Map existing sprout_lessons rows to concepts table entries
    - [ ] 3.3.2 Update SproutView to render from Concept SDK
    - [ ] 3.3.3 Verify rendering with both DB and mock fallback

---

## Phase 4: Istik (Guided Practice)

> **Goal:** Build the nursery stage — the learner's first hands-on experience with AI. Ref: VISION_AND_STRATEGY.md Decision 6d.

- [ ] **4.1 Istik Page & Theme** `@gemini` `@opus` P0
    - [ ] 4.1.1 Create `/[locale]/istik/page.tsx` with Morning Green theme
    - [ ] 4.1.2 Create `IstikView` component with emerald-tinted glass aesthetic
    - [ ] 4.1.3 Design nursery/greenhouse visual elements
    - [ ] 4.1.4 Add page translations EN + ET

- [ ] **4.2 Prompt Sandbox Component** `@opus` `@gemini` P0
    > Core interaction: user types prompt, sees AI output, gets feedback.
    - [ ] 4.2.1 Design split-screen layout: prompt input (left) + output display (right)
    - [ ] 4.2.2 Create `PromptSandbox` component with input, output panel, feedback scoring
    - [ ] 4.2.3 Implement local LLM proxy or mock response system for sandbox
    - [ ] 4.2.4 Add "iteration" tracking — show improvement across attempts
    - [ ] 4.2.5 Mobile layout: vertical stack (prompt top, output bottom)

- [ ] **4.3 Istik Practice Modules** `@gemini` `@opus` P1
    > Ref: VISION_AND_STRATEGY.md Decision 6d.
    - [ ] 4.3.1 Module 1 — First Prompt: basic cause-and-effect
    - [ ] 4.3.2 Module 2 — Prompt Refinement: same task, 3 attempts, see improvement
    - [ ] 4.3.3 Module 3 — Temperature & Control: adjust params, see output changes
    - [ ] 4.3.4 Module 4 — Evaluation: judge output quality (accuracy, relevance, safety)
    - [ ] 4.3.5 Create concepts in DB with `visual_type: 'sandbox'`
    - [ ] 4.3.6 Add translations EN + ET

---

## Phase 5: Content Migration & Cross-Linking

> **Goal:** Move all hardcoded content to Concept Objects and enable cross-stage relationships.

- [ ] **5.1 Fruits Migration** `@opus` P1
    - [ ] 5.1.1 Move `APPLICATIONS` array to concepts table (stage='fruits')
    - [ ] 5.1.2 Add translations EN + ET
    - [ ] 5.1.3 Update `FruitsView` to use Concept SDK
    - [ ] 5.1.4 Remove hardcoded data from component

- [ ] **5.2 Orchard Migration** `@opus` P1
    - [ ] 5.2.1 Move `CAREERS` array to concepts table (stage='orchard')
    - [ ] 5.2.2 Add translations EN + ET
    - [ ] 5.2.3 Update `OrchardView` to use Concept SDK
    - [ ] 5.2.4 Remove hardcoded data from component

- [ ] **5.3 Tree Integration** `@gemini` `@opus` P2
    > Bridge existing `nodes` table with concepts system.
    - [ ] 5.3.1 Add `concept_id` FK column to `nodes` table
    - [ ] 5.3.2 Link overlapping tree nodes to concept records
    - [ ] 5.3.3 Enable deep-dive panel on tree nodes to show full concept content

- [ ] **5.4 Concept Relationships** `@opus` P2
    > Populate the relationship graph.
    - [ ] 5.4.1 Define prerequisite relationships (e.g., tokenization -> vectors -> attention)
    - [ ] 5.4.2 Define cross-stage deepening (e.g., DNA:tokenization deepens-into Tree:tokenization-process)
    - [ ] 5.4.3 Define application links (e.g., Tree:transformers applies-to Fruits:code-gen)
    - [ ] 5.4.4 Build "Related Concepts" panel component
    - [ ] 5.4.5 Update learning paths to reference concept IDs from unified table

- [ ] **5.5 Learning Paths Migration** `@opus` P2
    - [ ] 5.5.1 Move `data/learning-paths.json` concept references to use unified concept IDs
    - [ ] 5.5.2 Validate all concept IDs exist in database
    - [ ] 5.5.3 Add path-level translations to DB

---

## Icebox / Future

- [ ] **Forest View:** Technical ecosystem visualization (Multi-model graph) — content moves to Tree deep branches.
- [ ] **User Auth:** Tracking progress across stages (uses `learning_sessions` + `concept_progress` tables).
- [ ] **Paraglide Migration:** Complete the ParaglideJS i18n stack transition for UI chrome.
- [ ] **Additional Languages:** Concept Object system designed for unlimited locales — add RU, FI, etc.
- [ ] **Admin CMS:** Simple admin panel for editing concepts, translations, and relationships in Supabase.
