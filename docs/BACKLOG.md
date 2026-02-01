# The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V3.0)
**Updated:** 2026-02-01

---

## 🎯 Next Sprint: Agent Task Assignments

> **Prerequisite complete:** Concept Object schema (2.1), SDK (2.2), and DNA migration (2.3) are done.
> All agents can now use `lib/concepts/api.ts` to read/write concepts.

### `@opus` (Claude Code) — Current Sprint

> Blocks A–D are complete. Next priorities: Phase 6 (i18n polish) and Phase 4 (Sapling refinement).

#### Block A: Seed Interactive Wiring ✅ DONE
> SeedView converted from static server to client SeedWorkspace wrapping SeedProvider + SeedStepNav + SeedHeroAnimation. Cards activate/dim based on phase.

| # | Task | Status | Description |
|---|------|--------|-------------|
| A1 | **3.1.9** Seed View → Interactive | ✅ DONE | SeedView → SeedWorkspace with SeedProvider, SeedStepNav, SeedHeroAnimation. Concept cards below hero. |
| A2 | **3.1.10** Verify DB category values | ✅ DONE | ConceptGrid receives section-filtered arrays (dataset/training/model) from SeedView server component. |
| A3 | **3.1.8** Card ↔ Phase activation | ✅ DONE | ConceptGrid dims/highlights based on SeedContext.phase — dataset active in selection, training in training, model in complete. |
| A4 | **3.1.11** SeedCard deep-dive stub → real | ✅ DONE | SeedConceptCard wrapper with ConceptDetailPanel inline expand for metaphor, deep_dive, question. |
| A5 | **3.1.12** Fix typo "Paramaters" → "Parameters" | ✅ DONE | Fixed in SeedHeroAnimation. |

#### Block B: Seed i18n Sweep ✅ DONE
> All hardcoded Seed strings moved to `messages/en.json` + `messages/et.json`. Server → client i18n prop threading via typed interfaces.

| # | Task | Status | Description |
|---|------|--------|-------------|
| B1 | **6.1.1** SeedView inline i18n object → messages | ✅ DONE | SeedI18n typed interface, props threaded from server component |
| B2 | **6.1.2** SeedHeroAnimation strings → messages | ✅ DONE | SeedHeroI18n interface, 9 strings replaced with i18n refs |
| B3 | **6.1.3** SeedStepNav strings → messages | ✅ DONE | SeedNavI18n interface, STEPS labels + "Reset Run" use i18n |
| B4 | **6.1.4** SeedCard fallback → i18n | ✅ DONE | Uses `seed.card.learnMore` key with fallback |
| B5 | **6.1.5** FruitsCard fallback → i18n | ✅ DONE | Uses `fruits.card.visitApp` key with fallback |
| B6 | **6.1.6** OrchardCard fallback → i18n | ✅ DONE | Uses `orchard.card.viewPath` key with fallback |

#### Block C: Concept Deep-Dive (6.2) ✅ DONE
> ConceptDetailPanel reusable component wired into Seed, Fruits, and Orchard cards.

| # | Task | Status | Description |
|---|------|--------|-------------|
| C1 | **6.2.1** Build `ConceptDetailPanel` | ✅ DONE | `components/concept/ConceptDetailPanel.tsx` — AnimatePresence expand with metaphor, deep_dive, question sections |
| C2 | **6.2.2** Wire into FruitsView | ✅ DONE | FruitsCard toggle + ConceptDetailPanel |
| C3 | **6.2.3** Wire into OrchardView | ✅ DONE | OrchardCard toggle + ConceptDetailPanel |
| C4 | **6.2.4** Wire into SeedView | ✅ DONE | SeedConceptCard wrapper in SeedWorkspace |

#### Block D: Mock Data & Housekeeping ✅ DONE

| # | Task | Status | Description |
|---|------|--------|-------------|
| D1 | Add sapling mock data | ✅ DONE | 4 sapling concepts in mock-data.ts (first-prompt, prompt-refinement, temperature-control, output-evaluation) |
| D2 | Add tree mock data | ✅ DONE | 6 tree concepts in mock-data.ts (history-of-ai, transformer-architecture, rag, fine-tuning, agents, multi-model-systems) |
| D3 | Build check | ✅ DONE | `npm run build` passes with zero TS errors |

#### Completed (this sprint)
- ✅ **Block A** — Seed Interactive Wiring (SeedWorkspace, phase activation, deep-dive, typo fix)
- ✅ **Block B** — Seed i18n Sweep (typed i18n interfaces for Hero, StepNav, all card fallbacks)
- ✅ **Block C** — ConceptDetailPanel + wired into Fruits, Orchard, Seed cards
- ✅ **Block D** — Sapling + Tree mock data, build verified
- ✅ 5.4.4 Related Concepts Wiring — `getRelatedConceptsForStage()` API + `RelatedConceptsPanel` wired into all 5 stage views
- ✅ 1.6 P2 DNA Polish — metaphor prominence, help button, reset confirm, deep-dive label
- ✅ 5.3 Tree Integration — bridge nodes to concept objects, deep-dive panel
- ✅ 5.5 Learning Paths Migration — validated IDs, updated translations
- ✅ 1.4 Visual Calibration — themes verified, `istik`→`sapling` enum aligned
- ✅ 5.4 Concept Relationships — 48 relationships across all 5 stages
- ✅ 5.1 Fruits Migration
- ✅ 5.2 Orchard Migration
- ✅ 3.2 Sprout Content Redefinition
- ✅ 3.3 Sprout Migration to SDK

### `@gemini` — Current Tasks
| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | **2.7** Unified Card variants | 🔄 IN PROGRESS | Finish remaining: sprout, tree visuals (seed+sapling done) |
| 2 | **3.1** Seed Stage Polish | ✅ DONE | Hero animation, SeedContext, SeedStepNav all created (wiring done by @opus) |
| 3 | **4.1** Sapling Page & Theme | ✅ DONE | SaplingView, SaplingHeroAnimation, Morning Green emerald theme created |
| 4 | **4.2** Prompt Sandbox | ✅ DONE | PromptSandbox component created with input/output panels |
| 5 | **4.3** Sapling Practice Modules | ✅ DONE | 4 guided modules with validation logic (commit `0ca8cb4`) |
| 6 | ~~**5.4.4** Related Concepts Panel~~ | ✅ DONE | Wired by @opus into all 5 stage views |

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

## Phase 1: Narrative & Mobile Core ✅ COMPLETE

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
- [x] **1.6 DNA Mobile UX Overhaul** `@opus` `@swarm` P0+P1+P2 DONE
    > Based on specialist review: [`docs/UX_RECOMMENDATIONS.md`](./UX_RECOMMENDATIONS.md)
    - [x] **P0 — Critical** (1.6.1–1.6.4)
    - [x] **P1 — High Impact** (1.6.5–1.6.9)
    - [x] **P2 — Polish** (1.6.10–1.6.14)
- [x] **1.7 DNA Step Color Differentiation** `@opus` DONE
- [x] **1.8 Accessibility: `prefers-reduced-motion`** `@opus` DONE
- [x] **1.9 i18n: Migrate DNA Hardcoded Strings** `@opus` DONE
- [x] **1.10 DNA Desktop: Responsive Input Width** `@opus` DONE
- [x] **1.11 DNA Desktop: Reduce Gap Between Input & Cards** `@opus` DONE
- [x] **1.12 DNA Desktop: GlowingNode Visibility** `@opus` DONE
- [x] **1.13 Remove Non-Functional FloatingInput** `@opus` DONE

---

## Phase 2: Concept Object Foundation ✅ COMPLETE (except 2.7 card variants)

> **Goal:** Build the unified data architecture that all stages will use. Ref: VISION_AND_STRATEGY.md Decision 7.

- [x] **2.1 Supabase Schema: Concept Object Tables** `@opus` DONE
- [x] **2.2 TypeScript SDK: Concept API** `@opus` DONE
    - [ ] 2.2.5 Unit tests for SDK functions (deferred — tracked in icebox)
- [x] **2.3 DNA Migration to Concept Objects** `@opus` DONE
- [x] **2.4 StageSelector: 7-Stage Update** `@gemini` `@opus` DONE
- [x] **2.5 Sprout Level Content** `@gemini` DONE
- [x] **2.6 Sprout Alignment & Design Rules** `@gemini` DONE
- [ ] **2.7 Unified Card System** `@gemini` 🔄 IN PROGRESS
    > UnifiedConceptCard created with dna variant. Seed variant added. Sprout, tree, sapling variants pending.
    - [x] Create `UnifiedConceptCard` (merging DNA/Concept cards).
    - [x] Implement variant: `dna` (Dark/Glass with per-step colors).
    - [x] Implement variant: `seed` (Deep Earth).
    - [ ] Implement variant: `sprout` (Dawn/Transitional).
    - [ ] Implement variant: `tree` (Light/Clean).
    - [ ] Implement variant: `sapling` (Morning Green / Sandbox).
- [x] **2.8 Tree Explorer Component** `@gemini` DONE

---

## Phase 3: Seed & Sprout Content ✅ COMPLETE

> **Goal:** Build the Seed stage and redefine Sprout for the new 7-stage journey. Ref: VISION_AND_STRATEGY.md Decision 6b/6c.

- [x] **3.1 Seed Stage: Training Simulation** `@gemini` `@opus` ✅ DONE
    > Ref: VISION_AND_STRATEGY.md Decision 6b (Interactive Training Run).
    - [x] 3.1.1 Create Seed concepts in DB ✅ 14 concepts in `concepts` table
    - [x] 3.1.2 Create `SeedView` (Basic shell with Deep Earth theme)
    - [x] 3.1.3 Create `SeedContext` (State Machine: `selection` -> `processing` -> `training` -> `complete`)
    - [x] 3.1.4 Implement `SeedStepNav` (Sticky navigation for the 3 phases)
    - [x] 3.1.5 Hero: "Ingestion Dashboard" (Data source selection buttons)
    - [x] 3.1.6 Hero: "Training Loop" (Canvas particles + loss curve visualization)
    - [x] 3.1.7 Hero: "Checkpoint" (Model solidification with stats)
    - [x] 3.1.8 Wiring: Concept cards highlight/activate based on simulation state `@opus`
    - [x] 3.1.9 Wire SeedView: wrap in SeedProvider + render SeedStepNav + SeedHeroAnimation `@opus`
    - [x] 3.1.10 Verify DB category values (`data`/`training`/`model`) for seed concepts `@opus`
    - [x] 3.1.11 Replace SeedCard `console.log` onDeepDive with real expand behavior `@opus`
    - [x] 3.1.12 Fix typo "Paramaters" → "Parameters" in SeedHeroAnimation `@opus`

- [x] **3.2 Sprout Content Redefinition** `@opus` DONE
    > Migration: `20260204_sprout_concepts.sql`. 6 concepts with "Emergent Properties" framing.
    - [x] 3.2.1 Create new Sprout concepts in DB
    - [x] 3.2.2 Add translations EN + ET with metaphors, explanations, and questions
    - [x] 3.2.3 Update sprout page to use `getStageContent('sprout')` via Concept SDK
    - [x] 3.2.4 Old `getSproutContent()` + `MOCK_SPROUT_DATA` superseded
    - [x] 3.2.5 Sprout page metadata updated: "Emergent properties" framing

- [x] **3.3 Sprout Migration to Concept Objects** `@opus` DONE
    > SproutView now consumes Concept[] from SDK.
    - [x] 3.3.1 6 new sprout concepts in concepts table
    - [x] 3.3.2 SproutView updated: `concepts: Concept[]` prop
    - [x] 3.3.3 Mock fallback in lib/concepts/mock-data.ts covers all 6 sprout concepts EN+ET

---

## Phase 4: Sapling (Guided Practice) 🔄 IN PROGRESS

> **Goal:** Build the nursery stage — the learner's first hands-on experience with AI. Ref: VISION_AND_STRATEGY.md Decision 6d.
> Note: "Istik" has been renamed to "Sapling" throughout the codebase.

- [x] **4.1 Sapling Page & Theme** `@gemini` `@opus` ✅ DONE
    - [x] 4.1.1 Create `/[locale]/sapling/page.tsx` with Morning Green theme
    - [x] 4.1.2 Create `SaplingView` component with emerald-tinted glass aesthetic
    - [x] 4.1.3 SaplingHeroAnimation with nursery/greenhouse visual elements
    - [x] 4.1.4 Page translations EN + ET (hardcoded locale check — needs i18n migration)

- [x] **4.2 Prompt Sandbox Component** `@opus` `@gemini` ✅ DONE
    > Core interaction: user types prompt, sees AI output, gets feedback.
    - [x] 4.2.1 `PromptSandbox` component with input and output panels
    - [x] 4.2.2 `SaplingWorkspace` wrapping sandbox + concept cards
    - [ ] 4.2.3 Implement local LLM proxy or mock response system (deferred — currently mock)
    - [x] 4.2.4 Mobile layout: vertical stack
    - [ ] 4.2.5 Iteration tracking — show improvement across attempts (deferred)

- [x] **4.3 Sapling Practice Modules** `@gemini` `@opus` ✅ DONE
    > Ref: VISION_AND_STRATEGY.md Decision 6d. Validation logic added in commit `0ca8cb4`.
    - [x] 4.3.1 Module 1 — First Prompt: basic cause-and-effect
    - [x] 4.3.2 Module 2 — Prompt Refinement: same task, 3 attempts, see improvement
    - [x] 4.3.3 Module 3 — Temperature & Control: adjust params, see output changes
    - [x] 4.3.4 Module 4 — Evaluation: judge output quality (accuracy, relevance, safety)
    - [x] 4.3.5 Create concepts in DB with `visual_type: 'sandbox'`
    - [x] 4.3.6 Mock data EN + ET in mock-data.ts

### 4.x Sapling Polish (Remaining)
| # | Task | Status | Description |
|---|------|--------|-------------|
| 4.x.1 | Sapling i18n sweep | ⏳ NEXT | Replace hardcoded `locale === 'et'` checks with proper message keys |
| 4.x.2 | LLM proxy / mock responses | ⏳ NEXT | Connect PromptSandbox to actual AI response system |
| 4.x.3 | Iteration tracking UI | ⏳ NEXT | Show attempt history + improvement metrics |
| 4.x.4 | ConceptDetailPanel for Sapling | ⏳ NEXT | Wire ConceptDetailPanel into SaplingWorkspace cards |

---

## Phase 5: Content Migration & Cross-Linking ✅ COMPLETE

> **Goal:** Move all hardcoded content to Concept Objects and enable cross-stage relationships.

- [x] **5.1 Fruits Migration** `@opus` DONE
- [x] **5.2 Orchard Migration** `@opus` DONE
- [x] **5.3 Tree Integration** `@opus` DONE
- [x] **5.4 Concept Relationships** `@opus` DONE
- [x] **5.5 Learning Paths Migration** `@opus` DONE

---

## Phase 6: i18n & Polish

> **Goal:** Complete multilingual support and cross-stage UX consistency.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 6.1 | Seed i18n sweep | ✅ DONE | Block B — typed i18n interfaces threaded from server to client |
| 6.2 | ConceptDetailPanel | ✅ DONE | Block C — reusable expand wired into Seed, Fruits, Orchard |
| 6.3 | Sapling i18n sweep | ⏳ NEXT | Replace hardcoded locale checks in SaplingView with proper message keys |
| 6.4 | Sprout i18n audit | ⏳ NEXT | Verify all SproutView strings use translation keys |
| 6.5 | Tree i18n audit | ⏳ NEXT | Verify TreeView/TreeExplorer use translation keys |

---

## Icebox / Future

- [ ] **2.2.5** Unit tests for Concept SDK functions
- [ ] **2.7** Unified Card variants (sprout, tree, sapling) — `@gemini` in progress
- [ ] **Forest View:** Technical ecosystem visualization (Multi-model graph) — content moves to Tree deep branches.
- [ ] **User Auth:** Tracking progress across stages (uses `learning_sessions` + `concept_progress` tables).
- [ ] **Paraglide Migration:** Complete the ParaglideJS i18n stack transition for UI chrome.
- [ ] **Additional Languages:** Concept Object system designed for unlimited locales — add RU, FI, etc.
- [ ] **Admin CMS:** Simple admin panel for editing concepts, translations, and relationships in Supabase.
- [ ] **E2E Tests:** Smoke tests for all 7 stage routes.
- [ ] **Accessibility Audit:** WCAG contrast + touch targets across all stages.
