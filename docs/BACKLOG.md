# The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V3.0)
**Updated:** 2026-02-01

---

## 🎯 Next Sprint: Agent Task Assignments

> **Prerequisite complete:** Concept Object schema (2.1), SDK (2.2), and DNA migration (2.3) are done.
> All agents can now use `lib/concepts/api.ts` to read/write concepts.

### `@opus` (Claude Code) — Current Sprint

> Blocks A–D, Phase 6, Phase 7 complete. **Current: Phase 8 — Mobile Novice UX (M1 + M2).**

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

### `@gemini` — Available Tasks
| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | **2.7** Unified Card variants | 🔄 IN PROGRESS | Finish remaining: sprout, tree visuals (seed+sapling done) |
| 2 | **9.5.x** DNA microLesson rewrite (EN) | ✅ DONE | Rewrote 4 DNA microLesson titles+body to Invitation style (Principle 1). Metaphor Scope Boundary applied. |
| 3 | **9.5.x** DNA microLesson rewrite (ET, RU) | ⏳ NEXT | Apply same Invitation rewrites to ET and RU locales |

### `@swarm` (Claude Flow) — Available Tasks
| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | E2E smoke tests | ⏳ AVAILABLE | Verify all 7 stage routes render with SDK data |

### Coordination Rules
- **Concept SDK is SPOT** — all agents MUST use `lib/concepts/api.ts`, never query Supabase directly from components
- **Mock data** — when adding new stage concepts, also add mock entries to `lib/concepts/mock-data.ts`
- **Translations** — every concept MUST have EN, ET, and RU translations
- **DB inserts** — use `supabase/migrations/` files, not ad-hoc SQL
- **No hardcoded content** — all new content goes through the Concept Object system
- **Backlog discipline** — MUST mark task IN PROGRESS before starting, DONE when complete
- **Two-layer metaphor** — platform metaphor (biological) does NOT constrain concept metaphors (best-fit pedagogical). See `VISION_AND_STRATEGY.md` → "Metaphor Scope Boundary"

### User Acceptance Testing (UAT) Feedback (Feb 2026) 🆕
> **Goal:** Address friction points identified during Novice User smoke tests.

| # | Priority | Task | Description |
|---|---|------|-------------|
| U1 | ✅ | **4.x.2** Sapling: Connect Real LLM | ~~Replace static mock.~~ Context-aware mock LLM with 6 AI topics + temperature-sensitive responses. |
| U2 | ✅ | **4.x.5** Sapling: UI Layout | ~~Reduce vertical space.~~ Hero pt-32→pt-24, pb-12→pb-8, workspace mb-20→mb-12. |
| U3 | ✅ | **3.x.1** Sprout: Interaction Layer | ~~No interactions.~~ Per-node feedback toasts, progress counter (2/3), completion message + reset button. All i18n EN/ET/RU. |
| U4 | ✅ | **5.x.1** Tree: Performance | ~~Slow/empty on load.~~ Lazy-load TreeVisualization + loading state fallback. |
| U5 | ✅ | **8.M3** Sprout: Theme Fix | ~~Dark background.~~ Fixed to Dawn gradient `from-indigo-800 via-violet-800 to-sky-950` + rose sunrise accent. |
| U6 | ✅ | **8.M5** Accessibility | ~~44px touch targets.~~ Full sweep: landing scrolled buttons, level dots, GlobalNav, StageSelector, footer. |
| U7 | ✅ | **4.x.6** Sapling: Empty State | ~~Empty state label.~~ Already has `readyMessage` + `emptyHint` in PromptSandbox empty state. |
| M1 | ✅ | **4.x.7** Sapling: Mobile Input | ~~Virtual keyboard blocks input.~~ visualViewport API keyboard detection + inline 44px send button + sticky panel. |
| M2 | ✅ | **6.6.1** i18n: Raw Keys | ~~Fix raw keys visible on Landing/DNA.~~ Fixed in Phase 6 i18n sweep + paraglide recompile. |
| M3 | ✅ | **8.M1** Mobile Header | ~~Junkyard header.~~ Mobile: Logo + Start CTA + Hamburger. All controls in slide-down menu. |

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
| 4.x.1 | Sapling i18n sweep | ✅ DONE | Phase 6.3 — typed i18n interface threaded from server to client |
| 4.x.2 | LLM proxy / mock responses | ✅ DONE | UAT U1 — context-aware mock LLM with 6 AI topics + temperature-sensitive responses |
| 4.x.3 | Iteration tracking UI | ⏳ DEFERRED | Show attempt history + improvement metrics |
| 4.x.4 | ConceptDetailPanel for Sapling | ⏳ DEFERRED | Wire ConceptDetailPanel into SaplingWorkspace cards |

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
| 6.3 | Sapling i18n sweep | ✅ DONE | Typed i18n interface threaded from server SaplingView to client SaplingWorkspace |
| 6.4 | Sprout i18n audit | ✅ DONE | All SproutView strings verified — uses `useParaglideTranslations` |
| 6.5 | Tree i18n audit | ✅ DONE | TreeExplorer, TreeDetailPanel updated — `treeExplorer.*` and `treeView.*` keys |
| 6.6 | Full app i18n sweep | ✅ DONE | RelatedConceptsPanel, SeedHeroAnimation tuning phase — all translated |
| 6.7 | Card hardcoding sweep | ✅ DONE | `@opus` — Raw stage names, type labels, English fallbacks replaced with i18n in 7 components (d0f09c6) |
| 6.8 | DNA microLesson rewrite (EN) | ✅ DONE | `@gemini` — Titles→action-oriented, body→invitation style, metaphors→pedagogical best-fit per Principle 1+3 |

---

## Phase 7: Data & UX Consistency

> **Goal:** Centralize stage definitions, enforce consistent navigation across all 7 stages, standardize data fetching patterns. Ref: VISION_AND_STRATEGY.md Decision 9.

- [x] **7.1 Centralized Stage Registry** `@opus` ✅ DONE
    > Ref: Decision 9a. Single source of truth for all stage metadata.
    - [x] 7.1.1 Create `lib/stages.ts` with STAGES array (id, label, sub, icon, color, bg, glow, href, route)
    - [x] 7.1.2 Update `StageSelector.tsx` to import from `lib/stages.ts`
    - [x] 7.1.3 Update `EvolutionTimeline.tsx` to import from `lib/stages.ts` (add missing `sapling` stage)
    - [x] 7.1.4 Update `JourneyContext.tsx` to import stage-to-URL mapping from `lib/stages.ts`

- [x] **7.2 GlobalNav on All Stages** `@opus` ✅ DONE
    > Ref: Decision 8 navigation rules. Every stage must have GlobalNav.
    - [x] 7.2.1 Add GlobalNav to `seed/page.tsx` (transparent, matching Seed dark theme)
    - [x] 7.2.2 Add GlobalNav to `sapling/page.tsx` (transparent, matching Sapling green theme)
    - [x] 7.2.3 Add GlobalNav to `fruits/page.tsx` (light variant)
    - [x] 7.2.4 Add GlobalNav to `orchard/page.tsx` (light variant)

- [x] **7.3 StageSelector on All Stages** `@opus` ✅ DONE
    > Ref: Decision 8 navigation rules. Every stage must have StageSelector.
    - [x] 7.3.1 Add StageSelector to `TreeViewContent.tsx`
    - [x] 7.3.2 DNA page has StageSelector (added to DNAView)

- [x] **7.4 Card Variant Fixes** `@opus` ✅ DONE
    > Ref: Decision 9c. Fruits and Orchard must not use `variant="tree"`.
    - [x] 7.4.1 Add `fruits` variant to `UnifiedConceptCard` (warm daylight theme: amber/orange accents)
    - [x] 7.4.2 Add `orchard` variant to `UnifiedConceptCard` (golden hour theme: rose/sunset accents)
    - [x] 7.4.3 Update `FruitsCard` to use `variant="fruits"`
    - [x] 7.4.4 Update `OrchardCard` to use `variant="orchard"`

- [x] **7.5 Data Fetching Standardization** `@opus` ✅ DONE
    > Ref: Decision 9b. All stages should use the same SDK pattern.
    - [x] 7.5.1 Migrate DNA page to `getStageContent('dna', locale)` — removed `getDNAContent()` adapter
    - [x] 7.5.2 Removed deprecated `getSproutContent()` (confirmed zero imports)
    - [x] 7.5.3 Audited all 7 pages: consistent ISR/`generateStaticParams`/`getStageContent` patterns

---

## Phase 8: Mobile Novice UX 🆕

> **Goal:** A total novice arriving from Google search on a 360–375px phone should feel welcomed, oriented, and able to start learning within 10 seconds.
> **Ref:** `VISION_AND_STRATEGY.md` V3.0 — Decision 2 (themes), Decision 5 (animation), Decision 8 (nav). UAT items M1, M3, U5, U6, U7.
> **Detailed plan:** `.claude/plan-mobile-novice-ux.md`

### Block M1: Landing Page Mobile Header Redesign `@opus` ✅ DONE

> **Problem:** Landing page uses a custom inline header with 9 controls (Search, Learn, DNA, Map, ViewMode, EN/ET/RU pills, DarkMode). Every other page uses `GlobalNav` with a proper hamburger menu. Touch targets are 40px (below WCAG 44px minimum), gaps are 6px (mis-tap risk).
> **File:** `app/[locale]/page.tsx` (lines 210–424)

| # | Task | Status | Description |
|---|------|--------|-------------|
| M1.1 | Mobile header: 3-item max | ✅ DONE | Mobile: Logo + Start CTA + Hamburger. All other controls in hamburger menu. |
| M1.2 | Remove inline language pills | ✅ DONE | Replaced with dropdown LanguageSwitcher inside hamburger menu. |
| M1.3 | Desktop touch targets | ✅ DONE | All 7 scrolled-state buttons: 36px → 44px minimum. |
| M1.4 | Scrolled state | ✅ DONE | Mobile scrolled: Logo + Hamburger only (CTA hidden when scrolled). |

### Block M2: Sapling Mobile Input Fix `@opus` ✅ DONE

> **Problem:** Virtual keyboard pushes content up, footer blocks "Run" button. UAT item M1: "CRITICAL: Virtual keyboard blocks input."
> **Files:** `components/sapling/SaplingWorkspace.tsx`, `components/sapling/PromptSandbox.tsx`

| # | Task | Status | Description |
|---|------|--------|-------------|
| M2.1 | Floating Run button | ✅ DONE | Inline 44px send button + visualViewport keyboard offset on left panel. |
| M2.2 | Reduce vertical whitespace | ✅ DONE | Hero pt-32→pt-24, pb-12→pb-8, workspace mb-20→mb-12. |
| M2.3 | Empty state label | ✅ DONE | `readyMessage` + `emptyHint` keys rendered in empty sandbox state. |

### Block M3: Sprout Theme Correction (P1) — available for `@gemini` or `@swarm`

> **Problem:** Background is `from-indigo-900 via-purple-900 to-indigo-950` — visually near-black, reads as "DNA dark mode" not "Dawn". Design system says: "Dawn — Indigo/violet → morning sky."
> **File:** `components/sprout/SproutView.tsx` (line 28)

| # | Task | Status | Description |
|---|------|--------|-------------|
| M3.1 | Lighten gradient to sunrise | ✅ DONE | Change to `from-indigo-800 via-violet-800 to-sky-950` or similar. Must feel like actual dawn, not night sky. |
| M3.2 | Warm accent hint | ✅ DONE | Add subtle amber/pink sunrise hint at the bottom edge. Must remain dark enough for white text readability. |

### Block M4: Novice Orientation Micro-copy `@opus` ✅ DONE

> **Problem:** A novice from Google sees "НАЧАТЬ ЭВОЛЮЦИЮ" but doesn't know what Dendrix.ai is, what they'll learn, how long it takes, or if it's free.
> **File:** `app/[locale]/page.tsx` (hero section)

| # | Task | Status | Description |
|---|------|--------|-------------|
| M4.1 | Add orientation block | ✅ DONE | "Free interactive course. No signup needed." between badge and title. |
| M4.2 | i18n keys for 3 locales | ✅ DONE | `landing.orientation` in EN/ET/RU. |

### Block M5: Touch Target & Accessibility Sweep `@opus` ✅ DONE

> **Ref:** UAT U6, WCAG 2.5.5. All interactive elements must be ≥44×44px.
> **Files:** `app/[locale]/page.tsx`, `components/StageSelector.tsx`, `components/GlobalNav.tsx`

| # | Task | Status | Description |
|---|------|--------|-------------|
| M5.1 | Landing page button audit | ✅ DONE | All 7 scrolled-state buttons + mobile CTA + hamburger: `min-w-[44px] min-h-[44px]`. |
| M5.2 | StageSelector pills | ✅ DONE | `min-h-[44px]` on all stage buttons. |
| M5.3 | LanguageSwitcher trigger | ✅ DONE | `min-h-[44px]` on trigger button. |
| M5.4 | Footer navigation | ✅ DONE | Footer link: `min-h-[44px]`. |

---

## Phase 9: i18n Two-Layer Architecture 🆕

> **Goal:** Implement the two-layer i18n architecture (Paraglide for UI chrome + Supabase for learning content) with content variants for A/B testing.
> **Ref:** `docs/I18N_TECHNICAL_MIGRATION.md` (technical authority), `docs/I18N_TRANSLATION_PRINCIPLES.md` (content authority)
> **Dependency graph:** Phase 0 → Phase 2 → Phase 3 → Phase 4. Phase 1 is independent. Phase 5 after first experiment.

### Phase 9.0: Locale Unification (CRITICAL — blocks all other phases) `@opus`

> **Problem:** `'ru'` is missing from `locale` ENUM in `schema.sql`, hardcoded `'et' | 'en'` in `lib/supabase/types.ts` and `lib/programs/types.ts`. Blocks Russian users from creating learning sessions.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.0.1 | Fix locale enum in schema.sql | ✅ DONE | `CREATE TYPE locale AS ENUM ('et', 'en', 'ru')` |
| 9.0.2 | Fix types in lib/supabase/types.ts | ✅ DONE | Replace all `'et' \| 'en'` → `'et' \| 'en' \| 'ru'` (12 occurrences) |
| 9.0.3 | Fix Locale in lib/programs/types.ts | ✅ DONE | `Locale = 'et' \| 'en' \| 'ru'`, `LocalizedString` add `ru` |
| 9.0.4 | Create Supabase migration | ✅ DONE | `ALTER TYPE locale ADD VALUE IF NOT EXISTS 'ru'` |
| 9.0.5 | Build verification | ✅ DONE | `npm run build` passes with zero TS errors |

### Phase 9.1: Paraglide Layer Extension (independent) `@opus` or `@gemini`

> **Problem:** Missing user journey keys (landing hooks, seed motivators, stage introductions, stage questions).
> **Ref:** I18N_TECHNICAL_MIGRATION.md Section 4, I18N_TRANSLATION_PRINCIPLES.md worked examples.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.1.1 | Add landing hook keys | ✅ DONE | `landing.hook`, `landing.subhook`, `landing.ctaPrimary`, `landing.ctaSecondary` in EN/ET/RU |
| 9.1.2 | Add seed motivator keys | ✅ DONE | `seed.motivator`, `seed.pathPractical`, `seed.pathCareer`, `seed.pathCurious` in EN/ET/RU |
| 9.1.3 | Add stageIntro keys | ✅ DONE | `stageIntro.{stage}` for all 7 stages in EN/ET/RU |
| 9.1.4 | Add stageQuestion keys | ✅ DONE | `stageQuestion.{stage}` for all 7 stages in EN/ET/RU |
| 9.1.5 | Recompile paraglide | ✅ DONE | `node scripts/generate-messages.js` |

### Phase 9.2: Content Variant Infrastructure `@opus`

> **Depends on:** Phase 9.0
> **Creates:** `content_variants` table, RLS policies, indexes, measurement functions.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.2.1 | Create content_variants migration | ✅ DONE | Table + indexes + RLS per I18N_TECHNICAL_MIGRATION.md Section 5 |
| 9.2.2 | Add content_variants TypeScript types | ✅ DONE | Types in lib/supabase/types.ts per Section 12 |
| 9.2.3 | Create measurement functions | ✅ DONE | `record_variant_impression`, `record_variant_engagement`, `record_variant_conversion` |
| 9.2.4 | Seed first experiment data | ✅ DONE | Tokenization title variants (base/practical/provocative) in ET |
| 9.2.5 | Update V&S doc | ✅ DONE | Apply Section 9 changes to VISION_AND_STRATEGY.md |

### Phase 9.3: Variant Serving Logic `@opus`

> **Depends on:** Phase 9.2

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.3.1 | Create lib/variants/service.ts | ✅ DONE | `getVariant()` with weighted random + session cache |
| 9.3.2 | Create hooks/useContentVariant.ts | ✅ DONE | React hook wrapping variant service |
| 9.3.3 | Wire into ConceptDetailPanel | ✅ DONE | Title, metaphor, deepDive, question all variant-aware via `useContentWithVariant`. Engagement tracking on panel open. |

### Phase 9.4: Measurement & Analytics (deferred)

> **Depends on:** Phase 9.3 live with first experiment

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.4.1 | Impression tracking | ⏳ DEFERRED | Log which variant was shown |
| 9.4.2 | Engagement tracking | ⏳ DEFERRED | Log card expand / time-on-concept |
| 9.4.3 | Analytics dashboard | ⏳ DEFERRED | Admin view of variant performance |

### Phase 9.5: Content Migration — One-Breath Explanations (deferred)

> **Depends on:** Phase 9.3 validated
> **Ref:** I18N_TRANSLATION_PRINCIPLES.md "One-Breath Rule" — rewrite 40+ word explanations to 12-18 words.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.5.1 | Rewrite DNA explanations (4) | ⏳ DEFERRED | 12-18 word versions, long text → `deep_dive` |
| 9.5.2 | Rewrite Sprout explanations (6) | ⏳ DEFERRED | Same pattern |
| 9.5.3 | Rewrite Seed explanations (14) | ⏳ DEFERRED | Same pattern |
| 9.5.4 | Rewrite remaining stages | ⏳ DEFERRED | Sapling, Tree, Fruits, Orchard |

---

## Icebox / Future

- [ ] **2.2.5** Unit tests for Concept SDK functions
- [ ] **2.7** Unified Card variants (sprout, tree, sapling) — `@gemini` in progress
- [ ] **Forest View:** Technical ecosystem visualization (Multi-model graph) — content moves to Tree deep branches.
- [ ] **User Auth:** Tracking progress across stages (uses `learning_sessions` + `concept_progress` tables).
- [ ] **Paraglide Migration:** Complete the ParaglideJS i18n stack transition for UI chrome.
- [x] **Additional Languages: RU** — Russian locale added (messages/ru.json, paraglide config, all pages). ✅ DONE
- [ ] **Additional Languages: FI, etc.** — Concept Object system designed for unlimited locales.
- [ ] **Admin CMS:** Simple admin panel for editing concepts, translations, and relationships in Supabase.
- [ ] **E2E Tests:** Smoke tests for all 7 stage routes.
- [ ] **Accessibility Audit:** WCAG contrast + touch targets across all stages.
