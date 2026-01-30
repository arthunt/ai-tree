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

## Active Sprint: Sprint 13 — Programs & Polish

> **Priority:** P1-High
> **Goal:** Create the `/programs` page (AIKI/AIVO/AIME) and connect Tree CTAs to it. Fix known bugs.

### US-120: Programs Page
**Priority:** P1 | **Type:** Page | **Agent:** @ANTIGRAVITY

- [ ] Create `app/[locale]/programs/page.tsx` — list all 3 programs
- [ ] Create `app/[locale]/programs/[programId]/page.tsx` — program detail
- [ ] Wire TreeDetailPanel "Master This Skill" CTA to `/programs/{id}`
- [ ] i18n: program names, descriptions, pricing in ET + EN

**Note:** `lib/programs/` (types, data, pricing) already exists.

---

### US-111: DNA to Tree Bridge (UI)
**Priority:** P1 | **Type:** Navigation | **Agent:** @ANTIGRAVITY

- [ ] "Deep Dive" buttons on DNA cards link to specific Tree Nodes
- [ ] Use `node_metadata.dna_concept_id` to resolve target node
- [ ] Shared progress: visiting DNA marks Tree node as "Inspected"

**Note:** Database bridge is ready. UI wiring remains.

---

### US-121: Bug Fixes & Cleanup
**Priority:** P1 | **Type:** Maintenance | **Agent:** @ANTIGRAVITY

- [ ] Fix `tree-view/page.tsx` missing `useSearchParams` import
- [ ] Audit DNAComponentCard.tsx for render logic issues (lines 159-189)
- [ ] US-110 refinement: organic curved lines, glowing nodes in TreeView

---

### US-113: Marketing Integration
**Priority:** P2 | **Type:** Infrastructure | **Agent:** @ANTIGRAVITY

- [ ] Database Schema: `program_leads` table (track interest clicks)
- [ ] Database Schema: `program_views` table (track page views)
- [ ] Analytics: Track CTA clicks from TreeDetailPanel

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
