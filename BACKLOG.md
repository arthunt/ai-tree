# AI Tree (Dendrix.ai) - Product Backlog

> **Last Updated:** 2026-01-30
> **Status:** Active Development — Sprint 12 (Tree Visualization)
> **Vision:** Public AI learning platform using tree metaphor — no sign-ins, free for all
> **Principles:** KISS, Less is More, Mobile-First, Testing-First (gradual)
> **Tests:** 70 passing (Vitest) | **Build:** 68 pages | **Concepts:** 23 (ET + EN)

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

- [x] US-080: English concept data in i18n message files (23 concepts × 4 fields)
- [x] US-081: Wire 10+ components to useTranslations('conceptData')
- [x] US-082: Translate level data to English
- [x] US-083: Fix remaining hardcoded strings
- [x] US-084: Clean up legacy unused components
- [x] US-085: Translation completeness tests (70 tests)
</details>

<details>
<summary>Untracked Work (shipped, not in original backlog)</summary>

- [x] SEO infrastructure: OG images, structured data, sitemap (`78be026`)
- [x] Brand narrative: hero rewrite, journey section, scroll reveals (`b82fef7`, `36b15ac`)
- [x] Dendrix logo: animated SVG in hero, header branding (`5035b33`, `1b548c8`)
- [x] Learning paths: /learn route, Up Next recommendations (`9ea62dc`)
- [x] Level celebrations: CelebrationModal on level completion (`9ea62dc`)
- [x] Connections tab: 4th tab with progressive disclosure, 23 concepts × EN+ET relationship descriptions (`994f07c`, `29636e5`)
- [x] Complexity badges: redefined as concept depth (Core Idea/Connected/Deep Dive), dark mode fix (`002a95b`)
- [x] In-place language switch: popup stays mounted, content swaps via NextIntlClientProvider (`60f288a`)
- [x] Inline header controls: language, theme, view mode as direct buttons (`3111ad1`)
- [x] TokenizerDemo improvements: BPE-like digit splitting (`c300e62`)
</details>

<details>
<summary>Sprint 10: DNA View Foundation (Architecture Pivot) (DONE)</summary>

- [x] US-090: Tech Stack Foundation (Paraglide + Supabase)
- [x] US-091: DNA Visual Components (Living Forest Design)
- [x] US-093: DNA Flow Diagram
- [x] US-095: View Selector & Routing
</details>

<details>
<summary>Sprint 11: DNA Interactivity (DONE)</summary>

- [x] US-100: Interactive DNA Input (Live Tokenization)
- [x] US-101: Dynamic Attention & Prediction (Visualizations)
- [x] US-102: Content Population (Real Data via Swarm)
- [x] US-103: Tree of Thoughts Population (Swarm)
</details>

---

## Definition of Done

- [ ] Feature works as specified
- [ ] Keyboard navigable + screen reader compatible
- [ ] Works on mobile (320px) to desktop (1920px)
- [ ] All text in both ET and EN (next-intl)
- [ ] `npm run build` passes (68 pages)
- [ ] `npm test` passes (70+ tests)
- [ ] Deployed to preview and tested
- [ ] No regressions

---

## Active Sprint: Sprint 12 — The Phylogenetic Tree (Stage 4: Puu)

> **Priority:** P1-High
> **Goal:** Visualize the "Tree of Thoughts" (26 nodes from Swarm) and connect it to the DNA View.
> **Protocol:** @ANTIGRAVITY builds the D3/ReactFlow Tree. @SWARM handles data updates if needed.

### US-110: Interactive Phylogenetic Tree
**Priority:** P1 | **Type:** Visualization | **Agent:** @ANTIGRAVITY

- [x] `components/tree/TreeView.tsx`: D3/SVG visualization (Basic V1)
- [ ] Refine "Organic" look (Curved lines, glowing nodes)
- [ ] Zoom/Pan controls ("Living Map")

---

### US-111: DNA to Tree Bridge
**Priority:** P1 | **Type:** Navigation | **Agent:** @ANTIGRAVITY

- [ ] "Deep Dive" buttons on DNA cards link to specific Tree Nodes
- [ ] Shared context/progress (Visiting DNA marks Tree node as "Inspected"?)

---

### US-112: Node Detail View (Rich Content)
**Priority:** P2 | **Type:** Feature | **Agent:** @ANTIGRAVITY
- [ ] Implement `TreeDetailPanel.tsx` (Slide-over or Modal)
- [ ] Show Metadata (Year, Paper, Visual Motif)
- [ ] **Marketing Hook:** "Learn more in AIKI..." (See US-114)

---

### US-113: Marketing Integration (Foundation)
**Priority:** P2 | **Type:** Infrastructure | **Agent:** @ANTIGRAVITY
- [ ] Implement `lib/programs` (Types, Static Data) ✅ (Exists)
- [ ] Database Schema: `program_leads`, `program_views`
- [ ] Basic "Programs" page (`/programs`)

### US-114: Contextual CTAs (Swarm Intelligence)
**Priority:** P2 | **Type:** Logic | **Agent:** @SWARM
- [ ] Map Tree Nodes to Programs (e.g., Agents -> AIVO)
- [ ] Populate `node_metadata.related_program_id`
- [ ] Generate "Hook Text" for each mapped node

---

### US-104: Tree Content (Completed by Swarm)
**Priority:** Done | **Type:** Content | **Agent:** @SWARM
- [x] Populate `nodes` table (26 items)
- [x] Verify hierarchy (parent_id)

---

### Sprint 12 Execution Plan (Visuals First)

```
[ANTIGRAVITY - The Cartographer]        [SWARM - The Historian]
--------------------------------        -----------------------
1. Tree Visualization (US-110)          (Monitoring Data Quality)
2. Bridge Navigation (US-111)    <----> (Refining Node Descriptions)
3. Detail Views (US-112)
```                                      4. Accessibility Audits
```

---

## Backlog (Prioritized & Agented)

### P1 — High Value

| ID | Story | Type | Notes |
|----|-------|------|-------|
| US-055 | Search result count display | UX Polish | Show "{n} results" as user types |
| US-058 | TreeNav completion indicators | Learning UX | Show completion % per level, not scroll position |
| US-008 | E2E smoke tests (Playwright) | Testing | Basic navigation + lightbox + locale switch |

### P2 — Medium Value

| ID | Story | Type | Notes |
|----|-------|------|-------|
| US-056 | Keyboard shortcuts help modal | Accessibility | Shift+? opens shortcuts list |
| US-048 | Beginner path visibility | Learning UX | Highlight toggle, sequential flow, progress counter |
| US-050 | Search/copy feedback improvement | UX Polish | Longer copy toast, result count |
| US-037 | Related concepts suggestions | Content | Concept cards suggest related topics |

### P3 — Nice to Have

| ID | Story | Type | Notes |
|----|-------|------|-------|
| US-057 | Progressive level disclosure | Learning UX | Lock advanced levels, unlock at 80% |
| US-036 | Glossary/index page | Content | Alphabetical concept glossary |
| US-035 | Print-friendly version | Content | CSS print layout |
| US-052 | Prerequisite validation | Learning UX | Warn before marking concepts with unmet prereqs |

---

## Phase 3: The Living Forest (Strategic Roadmap)

> **Vision:** A global, adaptive learning ecosystem.
> **Key Shifts:** Static -> Dynamic, 2 Langs -> 100+ Langs, Map -> Trails (Paid).

### Epic: Scale to 100 Languages
- [ ] **Infrastructure:** ParaglideJS full migration (replace next-intl entirely)
- [ ] **Pipeline:** AI Translation Agents + "Guardian" Review Portal
- [ ] **UI:** RTL Support & Fluid Typography

### Epic: "Trails" (Paid Learning Paths)
- [ ] **Infrastructure:** User Auth (Supabase Auth)
- [ ] **Content:** Define "Trail" schema (Sequence of concepts + Practical Task)
- [ ] **Commerce:** Payment Gateway Integration

---

## Future Sprints

### Sprint 11: DNA Interactive Demos
- [ ] US-100: Interactive text input for DNA flow
- [ ] US-101: Attention heatmap visualization
- [ ] US-102: Prediction probability display
- [ ] US-103: "Dive deeper" links to concept map

### Sprint 12: DNA ↔ Tree Integration
- [ ] US-110: Seamless DNA/Concept Map navigation
- [ ] US-111: Unified progress tracking
- [ ] US-112: DNA Learning Path in /learn

### Content & Features (Unscheduled)
- [ ] US-033: Concept quizzes (client-side)
- [ ] US-034: Code playgrounds (CodeSandbox embeds)
- [ ] US-038: Video/animation for Attention
- [ ] US-051: Learning pathways system (Beginner/Builder/Researcher)
- [ ] US-053: Rename Classic/Tree views for clarity

### Deferred (Only When Needed)
- Backend infrastructure (Supabase)
- User authentication
- Server-side progress tracking
- Payment/pricing systems
- Instructor tools
- Certificates

---

## Commands

```bash
npm run dev          # Local development
npm run build        # Build (68 pages)
npm run lint         # Code style
npm test             # 70 tests (Vitest)
```

---

*"Iga suur puu algas väikesest seemnest." / "Every great tree started as a small seed."*
