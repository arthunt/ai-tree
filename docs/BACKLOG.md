# The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V3.0)
**Updated:** 2026-02-01

---

## 🎯 Next Sprint: Agent Task Assignments

> **Prerequisite complete:** Concept Object schema (2.1), SDK (2.2), and DNA migration (2.3) are done.
> All agents can now use `lib/concepts/api.ts` to read/write concepts.

### `@opus` (Claude Code) — Next Tasks
| # | Task | Status | Depends On | Description |
|---|------|--------|------------|-------------|
| 1 | **1.6 P2** DNA Polish | ⏳ NEXT | — | Metaphor prominence, help button, reset confirm, deep-dive label |

#### Completed (this sprint)
- ✅ 1.4 Visual Calibration — themes verified, `istik`→`sapling` enum aligned
- ✅ 5.4 Concept Relationships — 48 relationships across all 5 stages (prerequisite, deepens, applies, related)
- ✅ 5.1 Fruits Migration
- ✅ 5.2 Orchard Migration
- ✅ 3.2 Sprout Content Redefinition
- ✅ 3.3 Sprout Migration to SDK

### `@gemini` — Current Tasks
| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | **2.7** Unified Card variants | 🔄 IN PROGRESS | Implement seed, sprout, tree, sapling card variants |
| 2 | **3.1** Seed Stage content | 🔄 IN PROGRESS | SeedView + Deep Earth theme (partially done) |

#### Completed
- ✅ 2.4 7-Stage StageSelector

### `@swarm` (Claude Flow) — Available
| # | Task | Description |
|---|------|-------------|
| 1 | E2E smoke tests | Verify all 7 stage routes render with SDK data |
| 2 | Accessibility audit | WCAG contrast + touch targets across all stages |

### Coordination Rules
- **Concept SDK is SPOT** — all agents MUST use `lib/concepts/api.ts`, never query Supabase directly from components
- **Mock data** — when adding new stage concepts, also add mock entries to `lib/concepts/mock-data.ts`
- **Translations** — every concept MUST have both EN and ET translations
- **DB inserts** — use `supabase/migrations/` files, not ad-hoc SQL
- **No hardcoded content** — all new content goes through the Concept Object system

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
- [x] **1.4 Visual Calibration** `@opus` DONE
    - [x] Verify "Dark Mode" for DNA / "Light Mode" for Tree logic — confirmed progression: DNA/Seed/Sprout/Sapling dark → Fruits/Orchard light.
    - [x] Update `StageSelector` to show 7 stages — already done (2.4). Fixed `istik`→`sapling` enum alignment.
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

- [x] **2.1 Supabase Schema: Concept Object Tables** `@opus` DONE
    > Evolved existing tables + created `concept_relationships`. Migration: `20260202_concept_objects.sql`
    - [x] 2.1.1 ALTER `concepts` table: added stage (enum), parent_id, sort_order, visual_type, icon, color, related_program_id, is_published, timestamps
    - [x] 2.1.2 ALTER `concept_translations` table: added subtitle, deep_dive, completion_message, hint
    - [x] 2.1.3 CREATE `concept_relationships` table (source_id, target_id, relationship, strength)
    - [x] 2.1.4 RLS policies for public read on all 3 tables
    - [x] 2.1.5 Indexes on (stage, sort_order), (parent_id), (locale), (source_id), (target_id)

- [x] **2.2 TypeScript SDK: Concept API** `@opus` DONE
    > `lib/concepts/` — types, api, mock-data, index barrel export + server actions
    - [x] 2.2.1 `lib/concepts/types.ts` — Concept, ConceptWithRelated, EvolutionStage, ConceptVisualType
    - [x] 2.2.2 `lib/concepts/api.ts` — getConceptsByStage(), getConcept(), getConceptWithRelated(), getConceptsByIds()
    - [x] 2.2.3 `lib/concepts/mock-data.ts` — DNA concepts EN+ET matching DB shape
    - [x] 2.2.4 `actions/getConcepts.ts` — server actions wrapping SDK
    - [ ] 2.2.5 Unit tests for SDK functions (deferred — tracked in icebox)

- [x] **2.3 DNA Migration to Concept Objects** `@opus` DONE
    > getDNAContent() now uses getConceptsByStage('dna'). 75-line mock block removed.
    - [x] 2.3.1 DB already has tokenization, embeddings, attention, prediction (stage='dna' backfilled)
    - [x] 2.3.2 concept_translations EN + ET already seeded
    - [x] 2.3.3 getDNAContent() rewritten to use Concept SDK with mock fallback
    - [x] 2.3.4 Build passes, DNAView renders with new data source
    - [x] 2.3.5 Old MOCK_DNA_DATA removed (now in lib/concepts/mock-data.ts)

- [x] **2.4 StageSelector: 7-Stage Update** `@gemini` `@opus` DONE
    > Add Sapling (formerly Istik) to the navigation system.
    - [x] 2.4.1 Update `EvolutionStage` type: add `'sapling'`
    - [x] 2.4.2 Update `StageSelector` component with 7 stages
    - [x] 2.4.3 Create `/[locale]/sapling` route (placeholder page)
    - [x] 2.4.4 Add translation keys for "Sapling" stage label (EN + ET)
    - [x] 2.4.5 Update `JourneyContext` stage order

- [x] **2.5 Sprout Level Content** `@gemini` DONE
    - [x] Create `/sprout` page.
    - [x] Content: Tokens, Vectors, Attention, Context, Prompting, Hallucination.
- [x] **2.6 Sprout Alignment & Design Rules** `@gemini` DONE
    - [x] Create `docs/DESIGN_SYSTEM_RULES.md` (Codified Standards).
    - [x] Enforce Theme: Transitional Dawn (Indigo/Purple).
    - [x] Enforce i18n: Migrate hardcoded strings to `en.json`.
- [ ] **2.7 Unified Card System** `@gemini` 🔄 IN PROGRESS
    > UnifiedConceptCard created with dna/sprout/tree variants. Needs Istik variant.
    - [x] Create `UnifiedConceptCard` (merging DNA/Concept cards).
    - [x] Implement variant: `dna` (Dark/Glass with per-step colors).
    - [ ] Implement variant: `sprout` (Dawn/Transitional).
    - [ ] Implement variant: `tree` (Light/Clean).
    - [ ] Implement variant: `seed` (Deep Earth) <!-- Added for completion -->
    - [ ] Implement variant: `sapling` (Morning Green / Sandbox).
- [x] **2.8 Tree Explorer Component** `@gemini` DONE
    - [x] Create grid layout with tabs: [Roots] [Trunk] [Branches] [Leaves].
    - [x] Implement "Map View" toggle (lazy-loaded D3 graph).
    - [x] Refactor to Server-Side Data Fetching.

---

## Phase 3: Seed & Sprout Content (7-Stage Alignment)

> **Goal:** Build the Seed stage and redefine Sprout for the new 7-stage journey. Ref: VISION_AND_STRATEGY.md Decision 6b/6c.

- [ ] **3.1 Seed Stage: Data & Training** `@gemini` `@opus` 🔄 IN PROGRESS
    > Ref: VISION_AND_STRATEGY.md Decision 6b.
    - [ ] 3.1.1 Create Seed concepts in DB: `dataset`, `common-crawl`, `the-pile`, `data-cleaning`, `bias-in-data`, `loss-function`, `backpropagation`, `compute-cluster`, `epochs`, `overfitting`, `weights`, `base-model`, `checkpoints`, `evaluation`
    - [ ] 3.1.2 Create `SeedView` component with Deep Earth theme (stone-900 -> amber-950)
    - [ ] 3.1.3 Implement 3-phase layout: Dataset -> Training -> Model
    - [ ] 3.1.4 Design "Compression" hero animation (data shrinking into model)
    - [ ] 3.1.5 Add concept translations EN + ET
    - [ ] 3.1.6 Server action `getSeedContent()` using Concept SDK
    - [ ] 3.1.7 Replace hardcoded `SEED_STEPS` in `SeedView.tsx` with DB content

- [x] **3.2 Sprout Content Redefinition** `@opus` DONE
    > Migration: `20260204_sprout_concepts.sql`. 6 concepts with "Emergent Properties" framing.
    - [x] 3.2.1 Create new Sprout concepts in DB: `generalization`, `context-windows`, `hallucination`, `temperature-sampling`, `representations`, `prompting-basics`
    - [x] 3.2.2 Add translations EN + ET with metaphors, explanations, and questions
    - [x] 3.2.3 Update sprout page to use `getStageContent('sprout')` via Concept SDK
    - [x] 3.2.4 Old `getSproutContent()` + `MOCK_SPROUT_DATA` superseded (sprout_lessons table still exists)
    - [x] 3.2.5 Sprout page metadata updated: "Emergent properties" framing

- [x] **3.3 Sprout Migration to Concept Objects** `@opus` DONE
    > SproutView now consumes Concept[] from SDK. Legacy sprout_lessons table preserved but unused.
    - [x] 3.3.1 6 new sprout concepts in concepts table replace sprout_lessons data
    - [x] 3.3.2 SproutView updated: `concepts: Concept[]` prop, maps explanation→description, metaphor→analogy
    - [x] 3.3.3 Mock fallback in lib/concepts/mock-data.ts covers all 6 sprout concepts EN+ET

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

- [x] **5.1 Fruits Migration** `@opus` DONE
    > Migration: `20260203_fruits_orchard_content.sql`. FruitsView now server-fetches from SDK.
    - [x] 5.1.1 Move `APPLICATIONS` array to concepts table (stage='fruits'): aiki, aivo, codegen, visionary
    - [x] 5.1.2 Add translations EN + ET (title, subtitle/category, explanation, metaphor)
    - [x] 5.1.3 Update `FruitsView` to use Concept SDK via `getStageContent('fruits')`
    - [x] 5.1.4 Remove hardcoded APPLICATIONS array; icon mapping via `ICON_MAP`

- [x] **5.2 Orchard Migration** `@opus` DONE
    > Same migration file. OrchardView now server-fetches; salary stored in `hint` field.
    - [x] 5.2.1 Move `CAREERS` array to concepts table (stage='orchard'): ai-engineer, prompt-architect, data-scientist, ai-ethicist, mlops-specialist
    - [x] 5.2.2 Add translations EN + ET (title, subtitle/role, explanation, metaphor, hint/salary)
    - [x] 5.2.3 Update `OrchardView` to use Concept SDK via `getStageContent('orchard')`
    - [x] 5.2.4 Remove hardcoded CAREERS array; icon mapping via `ICON_MAP`

- [ ] **5.3 Tree Integration** `@gemini` `@opus` P2
    > Bridge existing `nodes` table with concepts system.
    - [ ] 5.3.1 Add `concept_id` FK column to `nodes` table
    - [ ] 5.3.2 Link overlapping tree nodes to concept records
    - [ ] 5.3.3 Enable deep-dive panel on tree nodes to show full concept content

- [x] **5.4 Concept Relationships** `@opus` DONE
    > 48 relationships populated across all 5 stages.
    - [x] 5.4.1 Define prerequisite relationships (tokenization→embeddings→attention→prediction chain, + cross-stage)
    - [x] 5.4.2 Define cross-stage deepening (DNA→Seed→Sprout→Fruits→Orchard flow)
    - [x] 5.4.3 Define application links (Sprout→Fruits applies, Fruits→Orchard career links)
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
