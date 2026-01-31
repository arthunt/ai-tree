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
- [x] **1.6 DNA Mobile UX Overhaul** `@opus` `@swarm` ✅ P0+P1 DONE
    > Based on specialist review: [`docs/UX_RECOMMENDATIONS.md`](./UX_RECOMMENDATIONS.md)
    - [x] **P0 — Critical** ✅
        - [x] 1.6.1 Step completion badge + contextual message on cards (`DNAComponentCard`)
        - [x] 1.6.2 Always-visible step nav — show dimmed when no data (`DNAStepNav`)
        - [x] 1.6.3 Enlarge nav touch targets (36→44px) + show step names (`DNAStepNav`)
        - [x] 1.6.4 Input length validation — maxLength 500 (`DNAInput`)
    - [x] **P1 — High Impact** ✅
        - [x] 1.6.5 Card visual states: active/complete/inactive with distinct borders
        - [x] 1.6.6 Token tap hint on cards + instructional text (`AttentionSpotlight`)
        - [x] 1.6.7 Card peek view — show 15% of next card (85vw)
        - [x] 1.6.8 Reduce mobile header prominence (h1 → text-2xl, subtitle → text-sm)
        - [x] 1.6.9 Desktop layout fix — cards no longer pushed below fold
    - [ ] **P2 — Polish** (deferred)
        - [ ] 1.6.10 Metaphor text prominence increase
        - [ ] 1.6.11 Re-accessible help button for MicroLesson
        - [ ] 1.6.12 Confirm destructive reset action
        - [ ] 1.6.13 Display current input text in DNAStepNav
        - [ ] 1.6.14 Clarify "Deep Dive" → "Learn More About [Step]"
- [x] **1.7 DNA Step Color Differentiation** `@opus` ✅ DONE
    > Ref: [`docs/DESIGN_SYSTEM_RULES.md`](./DESIGN_SYSTEM_RULES.md) Section 8
    - [x] Apply per-step colors to card active borders, step buttons, progress bar
    - [x] T=teal `#25EDBA`, V=blue `#3B82F6`, A=purple `#A855F7`, P=amber `#F59E0B`
- [x] **1.8 Accessibility: `prefers-reduced-motion`** `@opus` ✅ DONE
    > Ref: [`docs/DESIGN_SYSTEM_RULES.md`](./DESIGN_SYSTEM_RULES.md) Section 7
    - [x] Add CSS media query to disable infinite animations
    - [x] Wrap Framer Motion animations with motion preference check
- [x] **1.9 i18n: Migrate DNA Hardcoded Strings** `@opus` ✅ DONE
    > Ref: [`docs/DESIGN_SYSTEM_RULES.md`](./DESIGN_SYSTEM_RULES.md) Section 3
    - [x] Move `STEP_COMPLETE_MESSAGES` to translation keys
    - [x] Move `STEP_HINT_MESSAGES` to translation keys
    - [x] Move DNAStepNav labels ("Next", "Finish", "Done", "Playing", "Paused") to translation keys
- [ ] **1.10 DNA Desktop: Responsive Input Width** `@opus` 👈 P1
    > Input bar is fixed `max-w-2xl` (672px) — too narrow on wide screens, could be shorter vertically.
    - [ ] Widen to `max-w-4xl` on `lg:` breakpoint (match cards grid width)
    - [ ] Reduce input vertical padding on desktop (`py-3` → `py-2`)
    - [ ] Reduce `mb-12` bottom margin to `mb-4 md:mb-6`
- [ ] **1.11 DNA Desktop: Reduce Gap Between Input & Cards** `@opus` 👈 P1
    > ~350px dead space stacks from input margin + cards margin + GlowingNode container.
    - [ ] Reduce cards container top margin (`mt-12` → `mt-4 md:mt-6`)
    - [ ] Shrink GlowingNode area from `md:h-48` (192px) to `md:h-24` (96px)
    - [ ] Keep mobile `h-24` unchanged (already compact)
- [ ] **1.12 DNA Desktop: GlowingNode Visibility** `@opus` 👈 P1
    > 40-60px dot inside 192px container is barely visible. Node should be larger or container smaller.
    - [ ] Increase desktop node size (`40/60` → `50/70`)
    - [ ] Reduce container height (see 1.11)
    - [ ] Consider adding subtle connecting line between node and card top

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
