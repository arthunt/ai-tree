# AI Tree (Dendrix.ai) - Product Backlog

> **Last Updated:** 2026-01-30
> **Status:** Phase D (Lead Capture) Complete — Polishing & Cleanup
> **Vision:** Public AI learning platform using tree metaphor — no sign-ins, free for all
> **Principles:** KISS, Less is More, Mobile-First, Testing-First (gradual)
> **Tests:** 70 passing (Vitest) + 6 E2E (Playwright) | **Routes:** 7 | **DB:** 30 nodes, 4 DNA concepts (ET + EN)

---

## 🟡 In Progress (Sprint 13 Continued)

*   **Documentation:** Updating `AI_TREE_MASTER_REFERENCE.md`.

---

## 🟢 Completed (Recent)

*   **Guided Paths (Phase F):**
    *   **Intent Filtering:** `TreeView` now highlights matches for `builder`/`thinker`.
    *   **Guide Pulse:** Visual cue for where to start.
*   **UX Repair (Phase E.1):**
    *   **The Lens:** DNA animation control (slow/pause).
    *   **The Seed:** Intent capture page (`/seed`).
    *   **Micro-Lessons:** Popovers for T-V-A-P concepts.
*   **Lead Capture (Phase D):** `leads` table, `LeadCaptureDialog`, i18n.
*   **Marketing Landing Pages (Phase C):** `/programs` catalog and details.

---

## Shipped (Archived)

<details>
<summary>Phase C & D: Programs & Lead Capture (DONE)</summary>

#### US-138: Programs Database Schema
- [x] Create `supabase/migrations/20260135_programs_schema.sql`
- [x] Follow existing RLS pattern (public read)

#### US-139: Seed Program Data
- [x] AIKI: €1590, 6 weeks, 60h, #6366f1
- [x] AIVO: €1290/€900, 4 weeks, 40h, #10b981
- [x] AIME: €2490, 10 weeks, 100h, #8b5cf6
- [x] 4 features per program (ET + EN)
- [x] Curriculum weeks with topics (ET + EN)
- [x] Create `supabase/migrations/20260136_seed_programs.sql`

#### US-140: Programs Server Actions
- [x] `actions/getPrograms.ts`
- [x] `actions/getProgram.ts`
- [x] Type-safe with Supabase types

#### US-141: Programs Route Structure
- [x] `app/[locale]/programs/page.tsx` (Catalog)
- [x] `app/[locale]/programs/[slug]/page.tsx` (Dynamic)

#### US-142: Landing Page Components
- [x] `ProgramHero`, `ProgramFeatures`, `ProgramCurriculum`, `ProgramPricing`, `ProgramFAQ`
- [x] DNA View design: dark, glass cards, glowing accents

#### US-146: Lead Capture System
- [x] `leads` table schema
- [x] `submitLead` server action
- [x] `LeadCaptureDialog` + `ApplyButton`
- [x] Full i18n support
</details>

<details>
<summary>Phase 1-2: Accessibility + Features (DONE)</summary>

- [x] US-001–005: WCAG AA (contrast, keyboard, ARIA, touch targets, dark mode)
- [x] US-009–011: i18n setup (next-intl, /et/, /en/, 100% UI coverage)
- [x] US-012–015: Tokenizer demo, code examples, prerequisite mapping
- [x] 32 hardcoded strings → i18n, 9 concept descriptions improved, 4 data issues fixed
</details>

<details>
<summary>Sprint 1: Growth Enablers (DONE)</summary>

- [x] US-020: Shareable concept URLs with OG meta tags
- [x] US-021: Progress tracking (localStorage)
- [x] US-022: Beginner onboarding path
- [x] US-023: Share buttons in lightbox
- [x] US-024: Mobile navigation menu
</details>

<details>
<summary>Sprint 2: Discovery & Content (DONE)</summary>

- [x] US-025: Search (Cmd+K)
- [x] US-026: 4 Shu concepts (Context Windows, Hallucinations, Temperature, Prompting)
- [x] US-027: 3 Branches concepts (Function Calling, Transformers, Training vs Inference)
- [x] US-028: Time estimates per concept
- [x] US-029: Report issue button
</details>

<details>
<summary>Sprint 3-4: Polish & Demos (DONE)</summary>

- [x] US-030: Vector similarity demo (interactive 2D)
- [x] US-031: Loading states & skeletons
- [x] US-032: Vercel Analytics (GDPR compliant)
</details>

<details>
<summary>Sprint 5: UX/UI Audit Fixes (DONE)</summary>

- [x] US-040: ViewModeToggle label fix (Simple/Technical)
- [x] US-041: Dark mode contrast (WCAG AA)
- [x] US-042: First-time welcome modal
- [x] US-043: Mobile lightbox scroll (bottom sheet)
- [x] US-044: Header tablet layout (SettingsDropdown)
- [x] US-045: Prerequisite completion indicators
- [x] US-046: FAB/Lightbox z-index fix
- [x] US-047: Undo mark complete (toast)
- [x] US-049: Touch targets 44px
- [x] US-054: Toast notification system
</details>

<details>
<summary>Sprint 6: Minimalism & Learning Flow (DONE)</summary>
- [x] US-060: Hero simplification (25 → ~10 elements)
- [x] US-061: Clear value proposition
- [x] US-062: Time estimates in hero & levels
- [x] US-063: Demos after relevant concepts
- [x] US-064: Header controls simplified
- [x] US-065: Rename views (Learning Path / Concept Map)
- [x] US-066: Vector demo touch handlers
- [x] US-067: Collapsible hero on mobile
- [x] US-068: Skill selector modal
</details>

<details>
<summary>Sprint 7: Mobile-First Popup Redesign (DONE)</summary>
- [x] US-070: Explanation tab with persona toggle
- [x] US-071: Visual representation tab
- [x] US-072: Code tab with contextual guidance
- [x] US-073: Concept navigation bar (prev/next, position)
- [x] US-074: Desktop popup alignment with mobile tabs
- [x] US-075: Content data structure extension
</details>

<details>
<summary>Sprint 8: i18n Completion (DONE)</summary>
- [x] US-076: Translate 16 SVG visual components
- [x] US-077: Translate remaining 5 SVG components
- [x] US-078: Translate remaining UI components
</details>

<details>
<summary>Sprint 9: English Content Translation (DONE)</summary>
- [x] US-080: English concept data in i18n message files (23 concepts x 4 fields)
- [x] US-081: Wire 10+ components to useTranslations('conceptData')
- [x] US-082: Translate level data to English
- [x] US-083: Fix remaining hardcoded strings
- [x] US-084: Clean up legacy unused components
- [x] US-085: Translation completeness tests (70 tests)
</details>

<details>
<summary>Untracked Work (shipped, not in original backlog)</summary>
- [x] SEO infrastructure: OG images, structured data, sitemap
- [x] Brand narrative: hero rewrite, journey section, scroll reveals
- [x] Dendrix logo: animated SVG in hero, header branding
- [x] Learning paths: /learn route, Up Next recommendations
- [x] Level celebrations: CelebrationModal on level completion
- [x] Connections tab: 4th tab with progressive disclosure, 23 concepts x EN+ET
- [x] Complexity badges: redefined as concept depth (Core Idea/Connected/Deep Dive)
- [x] In-place language switch: popup stays mounted, content swaps
- [x] Inline header controls: language, theme, view mode as direct buttons
- [x] TokenizerDemo improvements: BPE-like digit splitting
</details>

<details>
<summary>Sprint 10: DNA View Foundation (DONE)</summary>
- [x] US-090: Tech Stack Foundation (Supabase live, lazy client)
- [x] US-091: DNA Visual Components (Living Forest Design)
- [x] US-093: DNA Flow Diagram
- [x] US-095: View Selector & Routing
</details>

<details>
<summary>Sprint 11: DNA Interactivity & Content (DONE)</summary>
- [x] US-100: Interactive DNA Input (Live Tokenization)
- [x] US-101: Dynamic Attention & Prediction (Visualizations)
- [x] US-102: DNA Content Population (4 concepts x EN+ET in Supabase)
- [x] US-103: Tree of Thoughts Population (28 nodes x EN+ET in Supabase)
</details>

<details>
<summary>Sprint 12: Phylogenetic Tree & Data Layer (DONE)</summary>
- [x] US-104: Tree Content — 28 nodes in `nodes` table with hierarchy
- [x] US-110: Interactive Phylogenetic Tree — D3 TreeView with zoom/pan
- [x] US-112: Node Detail View — TreeDetailPanel with metadata, year, paper, motif
- [x] US-114: Content-to-Commerce Mapping — 16 nodes linked to AIKI/AIVO programs
- [x] US-115: Tree Enrichment — `node_metadata` with papers, use cases, visual motifs
- [x] US-116: DNA-to-Tree Bridge — `dna_concept_id` links 4 DNA steps to tree nodes
- [x] US-055: Search result count display (already in SearchModal)
- [x] US-050: Search/copy feedback (toast + result count)
- [x] US-058: TreeNav completion indicators (progress %)
- [x] US-008: E2E smoke tests — 6 Playwright specs (homepage, nav, locale, search, dark mode, mobile)
</details>

---

## Active Sprint: Sprint 13 — UX Repair & "The Seed" (Pivot)

> **Priority:** P0-Critical
> **Goal:** Fix the "Rushing River" problem, implement "The Seed" intent capture, and simplify Tree navigation.
> **Rationale:** "Flashy" features don't matter if users are confused in the first 10 seconds.
> **Focus:** Usability > Features.

---

### PHASE E: UX & Flow Repair (New Priority)

#### US-152: DNA Animation Control ("The Lens")
**Priority:** P0 | **Type:** UX | **Hours:** 6
- [ ] Slow down default animation speed (0.5x).
- [ ] "Hover to Pause/Investigate" interaction.
- [ ] Click opens a "Micro-Lesson" modal for T/V/A/P steps.
- [ ] Explicit "Play/Pause" controls if needed.

#### US-153: "The Seed" Intent Capture
**Priority:** P0 | **Type:** New Feature | **Hours:** 8
- [ ] Create a new intermediate view between DNA and Tree.
- [ ] Visual: Single pulsing seed.
- [ ] Interaction: three choices ("Build", "Teach", "Explore").
- [ ] Outcome: Highlights specific path in the Tree based on choice.

#### US-154: Tree "Guided Paths"
**Priority:** P1 | **Type:** UX | **Hours:** 6
- [ ] "Dim" unrelated nodes based on Seed choice.
- [ ] "Next Step" pulsing indicator on the Tree.
- [ ] Simplify initial zoom level (don't show everything at once).

---

### DEPRECATED / MOVED TO P2 (Was Phase F)

#### Phase F: Polish & Cleanup
- [ ] Mobile responsiveness (US-150)
- [ ] Localization QA (US-151)
- [ ] Cleanup legacy files

#### US-130: ParaglideJS Setup (DONE)
- [x] Update `project.inlang/settings.json` with correct plugins
- [x] Run `npm run paraglide:compile` → typed functions in `paraglide/`
- [x] Create `lib/paraglide.ts` with language utilities
- [x] Verify messages compile from existing `messages/*.json`

#### US-131: Middleware & Routing (DONE)
- [x] Replace `next-intl/middleware` → `@inlang/paraglide-next`
- [x] Update `middleware.ts` for ParaglideJS routing
- [x] Test `/et/` and `/en/` routes work

#### US-132: Layout Migration (DONE)
- [x] Remove `NextIntlClientProvider` from layout
- [x] Add ParaglideJS `LanguageProvider`
- [x] Update `generateMetadata()` to use ParaglideJS

#### US-133: Component Migration (Core - 10 files)
- [ ] `app/[locale]/page.tsx`
- [ ] `components/WelcomeModal.tsx`
- [ ] `components/SearchModal.tsx`
- [ ] `components/ConceptLightbox.tsx`
- [ ] `components/ConceptCard.tsx`
- [ ] `components/LevelSection.tsx`
- [x] DNAView, DNAInput, DNAComponentCard (Completed by Swarm)
- [ ] Pattern: `useTranslations('ns')` → `import * as m from '@/paraglide/messages'`
- [ ] Pattern: `t('key')` → `m.ns_key()`

#### US-134: Component Migration (UI - 15 files)
- [ ] `components/TreeNavigation.tsx`
- [x] `components/LanguageSwitcher.tsx` (Completed)
- [ ] `components/SettingsDropdown.tsx`
- [ ] `components/ViewModeToggle.tsx`
- [ ] `components/CelebrationModal.tsx`
- [ ] `components/TokenizerDemo.tsx`
- [ ] `components/VectorDemo.tsx`

#### US-135: Component Migration (Pages + SVGs - 30 files)
- [x] `app/[locale]/tree-view/page.tsx` (Partially updated with GlobalNav)
- [x] `app/[locale]/dna/page.tsx` (DONE)
- [x] `app/[locale]/programs/*.tsx` (DONE)
- [ ] `app/[locale]/concept/[conceptId]/*.tsx` (3 files)
- [ ] `components/mobile/*.tsx` (6 files)
- [ ] `components/visuals/*.tsx` (21 SVG files)

#### US-136: Cleanup next-intl (Pending)
- [ ] `npm uninstall next-intl`
- [ ] Delete `i18n.ts`
- [ ] Remove all `getMessages`, `getTranslations` imports
- [ ] `npm run build` → 0 errors
- [ ] `npm test` → all pass

#### US-137: ParaglideJS Verification (Pending)
- [ ] Test locale switching
- [ ] Test SSR/SSG both locales
- [ ] TypeScript catches missing translations
- [ ] Update existing i18n tests

---

### PHASE D: Integration & Polish (Day 5)

#### US-111: DNA to Tree Bridge (UI)
- [x] Deep Dive buttons on DNA Cards (DONE)
- [x] Use `node_metadata.dna_concept_id`

#### US-147: Tree → Programs CTAs
- [ ] TreeDetailPanel "Master This Skill" → `/programs/{id}`
- [ ] Track CTA clicks in `cta_interactions`

#### US-121: Bug Fixes
- [ ] Fix `tree-view/page.tsx` imports
- [ ] DNAComponentCard render logic audit
- [ ] TreeView organic curved lines

---

## Backlog (Prioritized)

### P2 — Medium Value

| ID | Story | Type | Notes |
|----|-------|------|-------|
| US-056 | Keyboard shortcuts help modal | Accessibility | Shift+? opens shortcuts list |
| US-048 | Beginner path visibility | Learning UX | Highlight toggle, sequential flow, progress counter |
| US-037 | Related concepts suggestions | Content | Concept cards suggest related topics |

### P3 — Nice to Have

| ID | Story | Type | Notes |
|----|-------|------|-------|
| US-057 | Progressive level disclosure | Learning UX | Lock advanced levels, unlock at 80% |
| US-036 | Glossary/index page | Content | Alphabetical concept glossary |
| US-035 | Print-friendly version | Content | CSS print layout |
| US-052 | Prerequisite validation | Learning UX | Warn before marking concepts with unmet prereqs |
| US-033 | Concept quizzes | Content | Client-side interactive quizzes |
| US-034 | Code playgrounds | Content | CodeSandbox embeds |
| US-038 | Video/animation for Attention | Content | Animated explainer |

---

## Phase 3: The Living Forest (Strategic Roadmap)

> **Vision:** A global, adaptive learning ecosystem.
> **Key Shifts:** Static -> Dynamic, 2 Langs -> 100+ Langs, Map -> Trails (Paid).

### Epic: Scale to 100 Languages
- [ ] AI Translation Agents + "Guardian" Review Portal
- [ ] RTL Support & Fluid Typography

### Epic: "Trails" (Paid Learning Paths)
- [ ] User Auth (Supabase Auth)
- [ ] Define "Trail" schema (Sequence of concepts + Practical Task)
- [ ] Payment Gateway Integration

### Deferred (Only When Needed)
- Server-side progress tracking
- Instructor tools
- Certificates

---

## Commands

```bash
npm run dev          # Local development
npm run build        # Build all pages
npm run lint         # Code style
npm test             # Unit tests (Vitest)
npm run test:e2e     # E2E tests (Playwright)
```

---

*"Iga suur puu algas vaikesest seemnest." / "Every great tree started as a small seed."*
