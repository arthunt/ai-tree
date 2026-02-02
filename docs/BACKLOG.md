# The Living System Backlog

**Status:** Active Execution Plan
**Source:** `docs/VISION_AND_STRATEGY.md` (V3.0)
**Updated:** 2026-02-01

---

## 🎯 Next Sprint: Agent Task Assignments

> **Prerequisite complete:** Concept Object schema (2.1), SDK (2.2), and DNA migration (2.3) are done.
> All agents can now use `lib/concepts/api.ts` to read/write concepts.

### `@opus` (Claude Code) — Current Sprint

> Blocks A–D, Phase 5–8 complete. Phases 1–8 done. **Available for Phase 9.4+, 9.6, or icebox items.**

#### Completed Blocks (summary)
- ✅ **Block A** — Seed Interactive Wiring (5 tasks: SeedWorkspace, phase activation, deep-dive, typo fix)
- ✅ **Block B** — Seed i18n Sweep (6 tasks: typed interfaces for Hero, StepNav, all card fallbacks)
- ✅ **Block C** — ConceptDetailPanel (4 tasks: reusable expand wired into Seed, Fruits, Orchard)
- ✅ **Block D** — Mock Data (3 tasks: sapling + tree mock data, build verified)
- ✅ Phase 5 — Content Migration (Fruits, Orchard, Tree, 48 relationships, learning paths)
- ✅ Phase 6 — i18n & Polish (8 tasks: all stages i18n sweep, card hardcoding, microLesson rewrite)
- ✅ Phase 7 — Data & UX Consistency (stage registry, GlobalNav, StageSelector, card variants, data fetching)
- ✅ Phase 8 — Mobile Novice UX (M1–M5: landing header, sapling input, sprout theme, orientation, accessibility)

### `@gemini` — Available Tasks
| # | Task | Status | Description |
|---|------|--------|-------------|
| 1 | **2.7** Unified Card variants | 🔄 IN PROGRESS | Finish remaining: sprout, tree, sapling visuals (seed done) |
| 2 | **9.5.2** DNA microLesson rewrite (ET, RU) | ⏳ NEXT | Apply same Invitation rewrites to ET and RU locales (EN done in 9.5.1) |

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

> Tokenizer animation, 7-stage navigation, mobile layout, DNA UX overhaul, accessibility, i18n migration, desktop polish. 13 tasks completed by `@gemini`, `@opus`, `@swarm`.

---

## Phase 2: Concept Object Foundation ✅ COMPLETE (except 2.7)

> Schema, SDK, DNA migration, StageSelector, Sprout content+alignment, Tree Explorer. 7/8 tasks done by `@opus`, `@gemini`.
> **2.7 Unified Card System** — `@gemini` 🔄 IN PROGRESS: dna+seed variants done, sprout/tree/sapling pending.

---

## Phase 3: Seed & Sprout Content ✅ COMPLETE

> Seed Training Simulation (14 concepts, state machine, 3-phase hero), Sprout Redefinition (6 "Emergent Properties" concepts), full SDK migration. 20 tasks completed by `@gemini`, `@opus`.

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

> Fruits, Orchard, Tree migrated to Concept Objects. 48 cross-stage relationships. Learning paths validated. 5 tasks by `@opus`.

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

## Phase 7: Data & UX Consistency ✅ COMPLETE

> Stage registry (`lib/stages.ts`), GlobalNav + StageSelector on all stages, card variant fixes (fruits/orchard), data fetching standardization. 15 tasks by `@opus`.

---

## Phase 8: Mobile Novice UX ✅ COMPLETE

> Landing header redesign (M1), sapling mobile input fix (M2), sprout theme correction (M3), novice orientation micro-copy (M4), 44px touch target sweep (M5). 15 tasks by `@opus`, `@gemini`.

---

## Phase 9: i18n Two-Layer Architecture 🆕

> **Goal:** Implement the two-layer i18n architecture (Paraglide for UI chrome + Supabase for learning content) with content variants for A/B testing.
> **Ref:** `docs/I18N_TECHNICAL_MIGRATION.md` (technical authority), `docs/I18N_TRANSLATION_PRINCIPLES.md` (content authority)
> **Dependency graph:** Phase 0 → Phase 2 → Phase 3 → Phase 4. Phase 1 is independent. Phase 5 after first experiment.

### Phase 9.0–9.3: i18n Foundation ✅ COMPLETE

> 9.0: Locale unification (RU added to enum + types). 9.1: Paraglide layer extension (landing hooks, seed motivators, stage intros/questions). 9.2: Content variant infrastructure (`content_variants` table, RLS, measurement RPCs). 9.3: Variant serving logic (`getVariant()`, `useContentVariant`, ConceptDetailPanel wired). 18 tasks by `@opus`.

### Phase 9.4: Measurement & Analytics (deferred)

> **Depends on:** Phase 9.3 live with first experiment
> **DoD:** Impressions count up in `content_variants` table when concepts are viewed.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.4.1 | Impression tracking | ⏳ DEFERRED | Wire `useContentVariant` to fire `record_variant_impression` RPC on concept view |
| 9.4.2 | Engagement tracking | ⏳ DEFERRED | Wire `useContentVariant` to fire `record_variant_engagement` RPC on card expand / time-on-concept |
| 9.4.3 | Analytics dashboard | ⏳ DEFERRED | Admin view of variant performance |

### Phase 9.5: Content Migration — One-Breath Explanations

> **Depends on:** Phase 9.3 validated
> **Ref:** I18N_TRANSLATION_PRINCIPLES.md "One-Breath Rule" — rewrite 40+ word explanations to 12-18 words.
> **DoD:** All `body` text in target stages aligns with `I18N_TRANSLATION_PRINCIPLES.md` (Action-Oriented, <20 words).

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.5.1 | Rewrite DNA explanations (EN) | ✅ DONE | `@gemini` — 4 microLesson titles+body rewritten to Invitation style |
| 9.5.2 | Rewrite DNA explanations (ET, RU) | ⏳ NEXT | `@gemini` — Apply same Invitation rewrites to ET and RU locales |
| 9.5.3 | Rewrite Seed explanations (14) | ⏳ DEFERRED | 12-18 word versions, long text → `deep_dive` |
| 9.5.4 | Rewrite Sprout explanations (6) | ⏳ DEFERRED | Same pattern |
| 9.5.5 | Rewrite remaining stages | ⏳ DEFERRED | Sapling, Tree, Fruits, Orchard |

### Phase 9.6: Russian Content Parity 🆕

> **Goal:** Ensure no English fallbacks visible when browsing in Russian.
> **DoD:** Full audit of `messages/ru.json` + `concept_translations` (RU) — zero missing keys, zero English fallbacks.

| # | Task | Status | Description |
|---|------|--------|-------------|
| 9.6.1 | Audit ru.json completeness | ⏳ TODO | Compare all keys in en.json vs ru.json, identify gaps |
| 9.6.2 | Audit concept_translations (RU) | ⏳ TODO | Query DB for concepts missing RU translations |
| 9.6.3 | Fill translation gaps | ⏳ TODO | Write missing RU translations (body, metaphor, deep_dive, question) |
| 9.6.4 | Visual smoke test | ⏳ TODO | Browse all 7 stages in RU — no English fallbacks visible |

---

## Icebox / Future

### Features
- [ ] **2.2.5** Unit tests for Concept SDK functions
- [ ] **2.7** Unified Card variants (sprout, tree, sapling) — `@gemini` in progress. DoD: No legacy `FruitsCard.tsx` usage.
- [ ] **Forest View:** Interactive D3/Visx graph for Orchard/Tree deep view — content moves to Tree deep branches.
- [ ] **User Progress Schema:** `user_concept_state` table tracking which nodes a user has "unlocked". DoD: `lib/progress.ts` exists. User can see "3/14 Unlocked" on Seed dashboard.
- [ ] **Admin CMS:** `/admin` route (protected) to view/edit Concept Objects and Translations without SQL. DoD: Simple table view of `concepts` and `concept_translations`.
- [x] **Additional Languages: RU** — Russian locale added (messages/ru.json, paraglide config, all pages). ✅ DONE
- [ ] **Additional Languages: FI, etc.** — Concept Object system designed for unlimited locales.
- [ ] **Metaphor Stress Test:** Verify pedagogical metaphors across cultures. Seed A/B variants in `content_variants` for at least 3 high-traffic concepts.

### Testing & Quality
- [ ] **E2E Smoke Tests:** Playwright tests for critical path (Landing → DNA → Seed → Sapling). DoD: `npm run test:e2e` passes in CI.
- [ ] **Accessibility Audit:** Full WCAG 2.1 AA sweep — color contrast (Seed Deep Earth), keyboard nav. DoD: Lighthouse > 95, tab navigation works in all stages.

### Technical Debt
- [ ] **Remove Mock Data:** Delete `lib/concepts/mock-data.ts` once `api.ts` is fully robust and seeded.
- [ ] **Paraglide Cleanup:** Finalize migration to official Next.js plugin if possible, or document `generate-messages.js` permanently.
- [ ] **Type Strictness:** Enable `strict: true` in `tsconfig.json` and fix resulting errors (long term).
