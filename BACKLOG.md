# AI Tree (Dendrix.ai) - Product Backlog

> **Last Updated:** 2026-01-30
> **Status:** Active Development — Sprint 13 (Programs & Polish)
> **Vision:** Public AI learning platform using tree metaphor — no sign-ins, free for all
> **Principles:** KISS, Less is More, Mobile-First, Testing-First (gradual)
> **Tests:** 70 passing (Vitest) + 6 E2E (Playwright) | **Routes:** 7 | **DB:** 28 nodes, 4 DNA concepts (ET + EN)

---

## Shipped (Archived)

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

## Supabase Schema (Live)

**5 migrations applied:**

| Table | Rows | Description |
|-------|------|-------------|
| `concepts` | 4 | DNA concepts (tokenization, embeddings, attention, prediction) |
| `concept_translations` | 8 | 4 EN + 4 ET |
| `nodes` | 28 | Phylogenetic tree (root → eras → architectures → models) |
| `node_translations` | 56 | 28 EN + 28 ET |
| `node_metadata` | 28 | Year, paper, use case, motif, program link, marketing hooks, DNA bridge |

---

## Definition of Done

- [ ] Feature works as specified
- [ ] Keyboard navigable + screen reader compatible
- [ ] Works on mobile (320px) to desktop (1920px)
- [ ] All text in both ET and EN (next-intl)
- [ ] `npm run build` passes
- [ ] `npm test` passes (70+ tests)
- [ ] Deployed to preview and tested
- [ ] No regressions

---

## Active Sprint: Sprint 13 — ParaglideJS + Supabase CMS + Marketing Pages

> **Priority:** P0-Critical
> **Goal:** 1) Migrate next-intl → ParaglideJS, 2) Programs in Supabase CMS, 3) Marketing landing pages
> **Rationale:** Type-safe i18n, compile-time optimization, "headless CMS" architecture
> **Pricing:** AIKI €1590 | AIVO €1290 (€900 grads) | AIME €2490

---

### PHASE A: ParaglideJS Migration (Days 1-2) — 25h

#### US-130: ParaglideJS Setup
**Priority:** P0 | **Type:** Infrastructure | **Hours:** 4
- [ ] Update `project.inlang/settings.json` with correct plugins
- [ ] Run `npm run paraglide:compile` → typed functions in `paraglide/`
- [ ] Create `lib/paraglide.ts` with language utilities
- [ ] Verify messages compile from existing `messages/*.json`

#### US-131: Middleware & Routing
**Priority:** P0 | **Type:** Infrastructure | **Hours:** 2
- [ ] Replace `next-intl/middleware` → `@inlang/paraglide-next`
- [ ] Update `middleware.ts` for ParaglideJS routing
- [ ] Test `/et/` and `/en/` routes work

#### US-132: Layout Migration
**Priority:** P0 | **Type:** Infrastructure | **Hours:** 2
- [ ] Remove `NextIntlClientProvider` from layout
- [ ] Add ParaglideJS `LanguageProvider`
- [ ] Update `generateMetadata()` to use ParaglideJS

#### US-133: Component Migration (Core - 10 files)
**Priority:** P0 | **Type:** Refactor | **Hours:** 6
- [ ] `app/[locale]/page.tsx`
- [ ] `components/WelcomeModal.tsx`
- [ ] `components/SearchModal.tsx`
- [ ] `components/ConceptLightbox.tsx`
- [ ] `components/ConceptCard.tsx`
- [ ] `components/LevelSection.tsx`
- [ ] Pattern: `useTranslations('ns')` → `import * as m from '@/paraglide/messages'`
- [ ] Pattern: `t('key')` → `m.ns_key()`

#### US-134: Component Migration (UI - 15 files)
**Priority:** P1 | **Type:** Refactor | **Hours:** 4
- [ ] `components/TreeNavigation.tsx`
- [ ] `components/LanguageSwitcher.tsx` (critical!)
- [ ] `components/SettingsDropdown.tsx`
- [ ] `components/ViewModeToggle.tsx`
- [ ] `components/CelebrationModal.tsx`
- [ ] `components/TokenizerDemo.tsx`
- [ ] `components/VectorDemo.tsx`

#### US-135: Component Migration (Pages + SVGs - 30 files)
**Priority:** P1 | **Type:** Refactor | **Hours:** 4
- [ ] `app/[locale]/tree-view/page.tsx`
- [ ] `app/[locale]/dna/page.tsx`
- [ ] `app/[locale]/learn/*.tsx` (3 files)
- [ ] `app/[locale]/concept/[conceptId]/*.tsx` (3 files)
- [ ] `components/mobile/*.tsx` (6 files)
- [ ] `components/visuals/*.tsx` (21 SVG files)

#### US-136: Cleanup next-intl
**Priority:** P1 | **Type:** Cleanup | **Hours:** 1
- [ ] `npm uninstall next-intl`
- [ ] Delete `i18n.ts`
- [ ] Remove all `getMessages`, `getTranslations` imports
- [ ] `npm run build` → 0 errors
- [ ] `npm test` → all pass

#### US-137: ParaglideJS Verification
**Priority:** P1 | **Type:** Testing | **Hours:** 2
- [ ] Test locale switching
- [ ] Test SSR/SSG both locales
- [ ] TypeScript catches missing translations
- [ ] Update existing i18n tests

---

### PHASE B: Supabase CMS for Programs (Days 2-3) — 7h

#### US-138: Programs Database Schema
**Priority:** P0 | **Type:** Infrastructure | **Hours:** 2
```sql
programs                  -- id, slug, color, duration, price, discounts
program_translations      -- name, tagline, description (ET + EN)
program_features          -- icon, sort_order
feature_translations      -- title, description (ET + EN)
program_curriculum        -- week_number, hours, type
curriculum_translations   -- title, topics[] (ET + EN)
```
- [ ] Create `supabase/migrations/20260135_programs_schema.sql`
- [ ] Follow existing RLS pattern (public read)

#### US-139: Seed Program Data
**Priority:** P0 | **Type:** Data | **Hours:** 2
- [ ] AIKI: €1590, 6 weeks, 60h, #6366f1
- [ ] AIVO: €1290/€900, 4 weeks, 40h, #10b981
- [ ] AIME: €2490, 10 weeks, 100h, #8b5cf6
- [ ] 4 features per program (ET + EN)
- [ ] Curriculum weeks with topics (ET + EN)
- [ ] Create `supabase/migrations/20260136_seed_programs.sql`

#### US-140: Programs Server Actions
**Priority:** P1 | **Type:** Feature | **Hours:** 3
- [ ] `actions/getPrograms.ts`
- [ ] `actions/getProgram.ts`
- [ ] `actions/getProgramCurriculum.ts`
- [ ] Type-safe with Supabase types

---

### PHASE C: Marketing Landing Pages (Days 3-5) — 35h

#### US-141: Programs Route Structure
**Priority:** P0 | **Type:** Foundation | **Hours:** 4
- [ ] `app/[locale]/programs/page.tsx` (overview)
- [ ] `app/[locale]/programs/aiki/page.tsx`
- [ ] `app/[locale]/programs/aivo/page.tsx`
- [ ] `app/[locale]/programs/aime/page.tsx`
- [ ] `app/[locale]/programs/apply/page.tsx`
- [ ] Programs link in header nav

#### US-142: Landing Page Components
**Priority:** P1 | **Type:** Components | **Hours:** 12
- [ ] `components/programs/ProgramHero.tsx`
- [ ] `components/programs/ProgramFeatures.tsx`
- [ ] `components/programs/ProgramCurriculum.tsx`
- [ ] `components/programs/ProgramPricing.tsx`
- [ ] `components/programs/ProgramFAQ.tsx`
- [ ] `components/programs/ProgramCTA.tsx`
- [ ] `components/programs/ProgramComparison.tsx`
- [ ] DNA View design: dark, glass cards, glowing accents

#### US-143: AIKI Landing Page
**Priority:** P1 | **Type:** Page | **Hours:** 6
- [ ] Hero: "Saa AI koolitajaks 6 nädalaga"
- [ ] Features: T-V-A-P, 4C teaching, portfolio, certificate
- [ ] Curriculum: Week 0-5
- [ ] Pricing: €1590 / 3×€563
- [ ] FAQ: 5-7 questions

#### US-144: AIVO Landing Page
**Priority:** P1 | **Type:** Page | **Hours:** 5
- [ ] Hero: "Automatiseeri töövood AI-ga"
- [ ] Graduate discount banner: 30% = €900
- [ ] Features: Zapier, Make, OpenAI API
- [ ] Curriculum: Week 0-4
- [ ] Dual pricing: full vs graduate

#### US-145: AIME Landing Page
**Priority:** P1 | **Type:** Page | **Hours:** 5
- [ ] Hero: "Täielik AI kompetents"
- [ ] Value comparison: same as grad path
- [ ] Combined 10-week curriculum
- [ ] Pricing comparison table

#### US-146: Lead Capture Form
**Priority:** P1 | **Type:** Feature | **Hours:** 3
- [ ] `components/programs/LeadCaptureForm.tsx`
- [ ] Fields: email, name, phone, programs[]
- [ ] Supabase `program_leads` insert
- [ ] UTM tracking

---

### PHASE D: Integration & Polish (Day 5)

#### US-111: DNA to Tree Bridge (UI)
**Priority:** P1 | **Type:** Navigation | **Hours:** 2
- [ ] "Deep Dive" buttons on DNA cards → Tree nodes
- [ ] Use `node_metadata.dna_concept_id`

#### US-147: Tree → Programs CTAs
**Priority:** P1 | **Type:** Integration | **Hours:** 2
- [ ] TreeDetailPanel "Master This Skill" → `/programs/{id}`
- [ ] Track CTA clicks in `cta_interactions`

#### US-121: Bug Fixes
**Priority:** P2 | **Type:** Maintenance | **Hours:** 2
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
