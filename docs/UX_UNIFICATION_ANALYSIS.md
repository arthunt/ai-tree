# Dendrix.ai UX Unification Analysis

> **Status:** Active Proposal
> **Date:** 2026-01-31
> **Scope:** Full platform UX consistency, mobile-first refactor, narrative progression
> **Affects:** `/dna`, `/seed`, `/tree-view`, `/forest`, landing page (`/et`, `/en`)
> **Priority:** P0 — Foundation for all future feature work

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Audit](#2-current-state-audit)
3. [Problem Inventory](#3-problem-inventory)
4. [Unified Card System](#4-unified-card-system)
5. [Unified Popup System](#5-unified-popup-system)
6. [DNA Page Improvements](#6-dna-page-improvements)
7. [Tree View Rewrite](#7-tree-view-rewrite)
8. [Mobile-First Layout](#8-mobile-first-layout)
9. [Narrative Progression Model](#9-narrative-progression-model)
10. [Implementation Phases](#10-implementation-phases)
11. [File Change Map](#11-file-change-map)
12. [Open Questions](#12-open-questions)

---

## 1. Executive Summary

Dendrix.ai currently has **three disconnected interaction paradigms** across its main surfaces (landing, DNA, tree-view). Each uses different card components, different popup/modal patterns, and different mobile strategies. The tree-view relies on a D3 force graph that is technically impressive but hostile to non-technical learners.

**This document proposes:**

- **One unified card component** used across all surfaces
- **One unified popup/lightbox** based on the landing page's ConceptLightbox (the best mobile UX in the product)
- **Card-based tree explorer** replacing the D3 graph
- **Mobile single-card-per-screen** DNA flow
- **Missing tokenization sub-steps** (text → numbers → vectors bridge)
- **Prediction fallback** ("couldn't predict" graceful message)
- **Narrative growth metaphor** connecting DNA → Seed → Sprout → Tree → Forest

The core principle: **one card language, one popup language, growth metaphor everywhere.**

---

## 2. Current State Audit

### 2.1 Three Surfaces, Three Patterns

| Surface | Route | Card Component | Popup Component | Mobile Strategy | Visual Language |
|---------|-------|---------------|----------------|-----------------|-----------------|
| **Landing** | `/et`, `/en` | `ConceptCard` | `ConceptLightbox` | Draggable bottom sheet, swipe nav | Editorial, encyclopedic |
| **DNA** | `/et/dna` | `DNAComponentCard` | `MicroLesson` | Single-column stack | Cinematic, pipeline |
| **Tree View** | `/et/tree-view` | D3 SVG nodes | `TreeDetailPanel` | Zoom/pan (barely works) | Technical, academic |

### 2.2 Component Inventory

#### Landing Page (`/et`)
- **`ConceptCard`** (`components/ConceptCard.tsx`)
  - Glass-morphism card with icon, title, complexity badge, reading time
  - Completion indicator (green checkmark)
  - Beginner path indicator
  - Metaphor OR technical explanation (toggle)
  - Click opens ConceptLightbox

- **`ConceptLightbox`** (`components/ConceptLightbox.tsx`)
  - **Best mobile UX in the product**
  - Draggable bottom sheet (45%, 70%, 95% height snap points)
  - Swipe down to close, swipe left/right to navigate
  - 4 tabs: Explanation, Visual, Code, Connections
  - In-place locale switching without navigation
  - Keyboard shortcuts (ESC, arrows, 1-4 for tabs)
  - Prev/Next navigation with dot indicators
  - Level picker dropdown

#### DNA Page (`/et/dna`)
- **`DNAComponentCard`** (`components/dna/DNAComponentCard.tsx`)
  - GlowingNode animation above card
  - GlassCard with dynamic intensity (high when active)
  - Embedded visualization (TokenSlicer / VectorMap / Attention / Prediction)
  - "Deep Dive" button triggers SeedTransition overlay
  - Active step gets border glow + ring

- **`MicroLesson`** (`components/dna/MicroLesson.tsx`)
  - Centered modal with backdrop blur
  - Gradient header with noise texture
  - Title, body, metaphor callout
  - "Resume Flow" and "Explore More" CTAs
  - No swipe, no tabs, no navigation between lessons

- **`DNAInput`** (`components/dna/DNAInput.tsx`)
  - Text input with play/pause/reset/skip controls
  - Step selector [< T V A P >] (now always visible)
  - Progress bar during playback
  - Fixed at top of page; scrolls away on mobile

- **Visualizations** (each in `components/dna/`):
  - `TokenizationSlicer` — 4-stage text slicing animation
  - `VectorMap` — 2D SVG scatter plot with tap-to-select
  - `AttentionSpotlight` — Bezier arc diagram with tap-to-select
  - `PredictionBarChart` — 3-stage bar race with winner highlight

#### Tree View (`/et/tree-view`)
- **`TreeView`** (`components/tree/TreeView.tsx`)
  - D3.js hierarchical tree layout
  - SVG with zoom/pan (d3-zoom)
  - Level of Detail (LOD) system via semantic zoom
  - Collapse/expand on click
  - Animated gradients on links
  - **Requires zoom/pan literacy** — unfriendly for non-technical users

- **`TreeDetailPanel`** (`components/tree/TreeDetailPanel.tsx`)
  - Right slide-in panel (full width on mobile, 480px on desktop)
  - Metadata grid (year, paper link)
  - Marketing CTA (related program)
  - Motif emoji icons
  - No tabs, no navigation between nodes

#### Cross-Page
- **`StageSelector`** (`components/StageSelector.tsx`)
  - Fixed bottom center, pill-shaped
  - 5 stages: DNA → Seed → Sprout → Tree → Forest
  - Only shows on evolutionary pages
  - Uses JourneyContext for state

- **`GlobalNav`** (`components/GlobalNav.tsx`)
  - Top navigation bar, transparent option
  - Present on DNA, Tree, Seed pages

### 2.3 Data Flow (DNA Pipeline)

```
User Input Text
    │
    ├── tokenize(text)      → tokens[]        (whitespace split)
    ├── visualTokenize(text) → subTokens[]     (BPE-like visual chunks)
    ├── vectorize(tokens)    → vectors[][]     (2D coordinates)
    ├── calcAttention(tokens) → weights[]      (from/to/strength)
    └── predict()            → predictions[]   (token/probability)

Step Flow: idle → tokenization → vectorizing → attention → prediction → idle
```

### 2.4 Data Structure (Tree View)

```typescript
interface TreeContentSimple {
  id: string;
  title: string;
  description?: string;
  type: 'root' | 'trunk' | 'branch' | 'leaf';
  parentId?: string;
  motif?: string;         // emoji motif
  year?: number;
  paper?: string;
  paperUrl?: string;
  significance?: string;
  relatedProgramId?: string;
  marketingHook?: string;
}
```

---

## 3. Problem Inventory

### P1: Tree View is Too Technical
- D3 force graph requires zoom/pan understanding
- No metaphor — raw circles and lines
- Mobile: barely functional (pinch zoom on SVG)
- Visually disconnected from rest of product
- **User feedback:** "the tech stack for showing tree view is too technical"

### P2: Three Different Card Systems
- `ConceptCard` (landing), `DNAComponentCard` (DNA), D3 nodes (tree) — zero reuse
- Different visual treatments, different interaction patterns
- Cognitive overhead: user must relearn interface on each page

### P3: Three Different Popup Systems
- `ConceptLightbox` (best), `MicroLesson` (decent), `TreeDetailPanel` (minimal)
- ConceptLightbox has tabs, swipe, keyboard nav — others don't
- **User feedback:** "the pop-up is much more usable in the one used under concepts"

### P4: DNA Input Disappears on Mobile
- Input is at the top, scrolls away as user explores cards below
- No context of what text is being processed once you scroll down
- **User feedback:** "text input should either float or switch to the card currently active"

### P5: Mobile DNA Layout — All Cards Visible at Once
- 4 cards stacked vertically; only one is active at a time
- Inactive cards take space but provide no value during playback
- **User feedback:** "on mobile, text on top, each card in the middle with action, last card at bottom"

### P6: Missing Tokenization Sub-steps
- TokenizationSlicer shows: text → cut lines → separated pills → done
- VectorMap shows: 2D scatter plot of coordinates
- **Missing bridge:** text pills → numeric token IDs → coordinate pairs → spatial plot
- **User feedback:** "missing step of visualising, making the blocks of text into numbers (random), and then numbers with text blocks going to the vectors"

### P7: No Prediction Fallback
- PredictionBarChart always shows a winner (mock data guarantees it)
- No graceful degradation for unknown/short inputs
- **User feedback:** "last card should provide some kind of answer at the bottom — at least 'sorry I couldn't get that'"

### P8: VectorMap Missing Intermediate State
- Jumps from token pills to 2D scatter
- Should show: numbers in a matrix/table first, then transform to spatial plot
- **User feedback:** "vectors are showing numbers with text in the matrix first, and then turning into a visual graph of distances"

### P9: No Narrative Thread
- DNA → Seed → Tree feels like three separate products
- Seed page is a dead-end fork (picks intent, dumps to tree)
- No "Sprout" page (growth metaphor gap)
- **User feedback:** "create a consistent, metaphorical/narrative progression — from nucleus, dna, seed, sprout, tree, garden of trees"

---

## 4. Unified Card System

### 4.1 Proposed: `UnifiedConceptCard`

One card component used across ALL surfaces. Location: `components/ui/UnifiedConceptCard.tsx`

```typescript
interface UnifiedConceptCardProps {
  // === Content ===
  title: string;
  description: string;
  metaphor?: string;

  // === Visual ===
  color: string;                    // CSS color or var(--dna-t)
  icon?: string;                    // Lucide icon name
  motif?: string;                   // Emoji motif (tree nodes)
  glowingNode?: boolean;            // DNA-style animated orb above card

  // === Context ===
  level?: 'root' | 'trunk' | 'branch' | 'leaf';
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  year?: number;
  readingTime?: number;

  // === State ===
  isActive?: boolean;               // DNA: current step
  isCompleted?: boolean;            // Landing: user completed this concept
  isBeginnerPath?: boolean;         // Landing: recommended for beginners

  // === Behavior ===
  onClick?: () => void;

  // === Slot: Embedded Visualization ===
  visualization?: React.ReactNode;  // TokenSlicer, VectorMap, etc.
  showVisualization?: boolean;       // Toggle between description and viz
}
```

### 4.2 Visual Treatment by Context

| Context | GlowingNode | Badge | Visualization | Deep Dive |
|---------|-------------|-------|---------------|-----------|
| **DNA page** | Yes | Step label (T/V/A/P) | Embedded when active | SeedTransition |
| **Landing page** | No | Complexity + reading time | None (opens lightbox) | Opens lightbox |
| **Tree view** | No | Level (root/trunk/...) + year | None (opens lightbox) | Opens lightbox |
| **Sprout page** | Yes (small) | Foundational badge | Mini preview | Opens lightbox |

### 4.3 What It Replaces

| Current Component | File | Replaced By |
|-------------------|------|-------------|
| `ConceptCard` | `components/ConceptCard.tsx` | `UnifiedConceptCard` |
| `DNAComponentCard` | `components/dna/DNAComponentCard.tsx` | `UnifiedConceptCard` with `glowingNode=true` |
| D3 SVG circle nodes | `components/tree/TreeView.tsx` | `UnifiedConceptCard` with `level` prop |

---

## 5. Unified Popup System

### 5.1 Proposed: `UnifiedLightbox`

Based on `ConceptLightbox` (the best mobile UX in the product). Location: `components/ui/UnifiedLightbox.tsx`

```typescript
interface UnifiedLightboxProps {
  // === Content (tab-based, show/hide based on availability) ===
  explanation?: string;
  visualization?: React.ReactNode;
  code?: string;
  connections?: React.ReactNode;

  // === Metadata ===
  title: string;
  metaphor?: string;
  icon?: string;
  motif?: string;
  color?: string;
  year?: number;
  paper?: { title: string; url: string };
  significance?: string;
  relatedProgram?: { id: string; hook: string };

  // === Navigation ===
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;
  siblings?: { id: string; title: string }[];

  // === Mobile ===
  draggable?: boolean;              // Bottom sheet behavior (default: true on mobile)
  snapPoints?: number[];            // Sheet height percentages [0.45, 0.70, 0.95]

  // === Features ===
  showTabs?: boolean;               // Default: true if multiple content types
  showCompletion?: boolean;         // Toggle completion state
  showLocaleSwitch?: boolean;       // In-place language switching
}
```

### 5.2 Feature Comparison

| Feature | ConceptLightbox (current) | MicroLesson (current) | TreeDetailPanel (current) | UnifiedLightbox (proposed) |
|---------|--------------------------|----------------------|--------------------------|---------------------------|
| Draggable bottom sheet | Yes | No | No | Yes |
| Swipe navigation | Yes | No | No | Yes |
| Tab system | 4 tabs | No tabs | No tabs | Dynamic tabs |
| Keyboard shortcuts | Yes (ESC, arrows, 1-4) | No | ESC only | Yes |
| In-place locale switch | Yes | No | No | Yes |
| Completion toggle | Yes | No | No | Optional |
| Prev/Next navigation | Yes + dots | No | No | Yes |
| Level picker | Yes | No | No | Optional |
| Year/Paper metadata | No | No | Yes | Yes |
| Related program CTA | No | No | Yes | Yes |
| Metaphor callout | No | Yes | No | Yes |
| Resume/Pause actions | No | Yes ("Resume Flow") | No | Optional |

### 5.3 What It Replaces

| Current Component | File | Replaced By |
|-------------------|------|-------------|
| `ConceptLightbox` | `components/ConceptLightbox.tsx` | `UnifiedLightbox` (minimal changes) |
| `MicroLesson` | `components/dna/MicroLesson.tsx` | `UnifiedLightbox` with resume action |
| `TreeDetailPanel` | `components/tree/TreeDetailPanel.tsx` | `UnifiedLightbox` with metadata |

---

## 6. DNA Page Improvements

### 6.1 Missing Tokenization Bridge (P6, P8)

**Current 4-stage flow in TokenizationSlicer:**

```
Stage 1 (text):        "The king wore a crown"
Stage 2 (cutting):     "The | king | wore | a | crown"    ← glowing cut lines
Stage 3 (separating):  [The] [king] [wore] [a] [crown]   ← pills fly apart
Stage 4 (done):        [The] [king] [wore] [a] [crown]   ← settled pills
```

**Proposed 6-stage flow:**

```
Stage 1 (text):          "The king wore a crown"
Stage 2 (cutting):       "The | king | wore | a | crown"
Stage 3 (pills):         [The] [king] [wore] [a] [crown]
Stage 4 (numbering):     [The→2041] [king→6891] [wore→3847] [a→64] [crown→8823]
                          ↑ Each pill flips to reveal a token ID number
Stage 5 (vectorPreview): [2041→[0.72, 0.31]] [6891→[0.85, 0.79]] ...
                          ↑ Numbers morph into coordinate pairs
Stage 6 (done):          Coordinates ready; smooth handoff to VectorMap card
```

**Metaphor bridge:**
- Stage 3→4: "Each word gets a library card number"
- Stage 4→5: "Library numbers become map coordinates"
- Stage 5→6: "Coordinates reveal where words live in meaning space"

### 6.2 VectorMap Intermediate State (P8)

Before showing the 2D scatter plot, show a brief **number matrix**:

```
Token     ID      x      y
─────────────────────────
The      2041   0.72   0.31
king     6891   0.85   0.79
wore     3847   0.44   0.52
a          64   0.50   0.50
crown    8823   0.82   0.75
```

Then animate: table rows → dots flying to their (x,y) positions on the scatter plot.

### 6.3 Prediction Fallback (P7)

Add graceful degradation to PredictionBarChart:

```typescript
// In PredictionBarChart, when no strong prediction:
if (predictions.length === 0 || predictions[0].probability < 0.1) {
  return (
    <div className="text-center py-8">
      <span className="text-3xl mb-3 block">🤔</span>
      <p className="text-white/60 text-sm mb-2">
        {t('prediction.noResult')}
      </p>
      <p className="text-white/30 text-xs">
        {t('prediction.trySuggestion')}
      </p>
    </div>
  );
}
```

Translation keys:
```json
{
  "prediction": {
    "noResult": "Hmm, I couldn't confidently predict the next word.",
    "trySuggestion": "Try a common phrase like 'Jingle jingle little...' or 'The king wore a...'"
  }
}
```

### 6.4 Input Floating Behavior (P4)

**Mobile (< 768px):**
- Input bar becomes `fixed top-0` with compact height
- Shows: sparkle icon + truncated text + step indicator + pause/play
- Full input expands on tap
- Step selector [T V A P] stays attached below

**Desktop (>= 768px):**
- Current behavior (static, above cards)

---

## 7. Tree View Rewrite

### 7.1 Problem

The D3 force graph (`components/tree/TreeView.tsx`) is:
- 400+ lines of D3 imperative code
- Requires zoom/pan/collapse literacy
- Barely functional on mobile
- Visually disconnected from the card-based DNA experience
- Uses raw SVG circles where other pages use glass cards

### 7.2 Proposed: Card-Based TreeExplorer

Replace the D3 graph with a card grid using the same visual language as DNA.

**New component:** `components/tree/TreeExplorer.tsx`

```
┌─────────────────────────────────────────────┐
│  [GlobalNav]                                │
├─────────────────────────────────────────────┤
│  Breadcrumb: AI > Neural Networks > ...     │
├─────────────────────────────────────────────┤
│  Level Tabs: [🌱 Roots] [🌲 Trunk] [🌿 Branches] [🍃 Leaves]  │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │
│  │ Card │  │ Card │  │ Card │  │ Card │   │
│  │  1   │  │  2   │  │  3   │  │  4   │   │
│  └──────┘  └──────┘  └──────┘  └──────┘   │
│  ┌──────┐  ┌──────┐  ┌──────┐             │
│  │ Card │  │ Card │  │ Card │             │
│  │  5   │  │  6   │  │  7   │             │
│  └──────┘  └──────┘  └──────┘             │
│                                             │
├─────────────────────────────────────────────┤
│  [DNA] [Seed] [Sprout] [Tree] [Forest]     │  ← StageSelector
└─────────────────────────────────────────────┘
```

### 7.3 Card Treatment for Tree Nodes

Each tree node becomes a `UnifiedConceptCard` with:
- **Color by level:** roots=emerald, trunk=amber, branches=blue, leaves=purple
- **Motif emoji** instead of GlowingNode (from existing `motif` field)
- **Year badge** (when available)
- **Click opens UnifiedLightbox** with: explanation tab, metadata (year, paper), significance, related program CTA

### 7.4 Navigation Model

- **Level tabs** filter the grid (show only roots, or trunk, etc.)
- **Breadcrumb** shows hierarchy path (click to navigate up)
- **Card click** → opens lightbox with details
- **"See children"** button in lightbox → filters grid to show child nodes
- **Optional minimap toggle** → shows the D3 overview as a small reference

### 7.5 Mobile Tree View

```
┌─────────────────────┐
│ [← Roots]           │  ← Breadcrumb + back
├─────────────────────┤
│ [🌱][🌲][🌿][🍃]  │  ← Level tabs (scrollable)
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │  Card 1       │  │  ← Full-width cards
│  │  Motif + Title│  │
│  │  Description  │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Card 2       │  │
│  └───────────────┘  │
│  ...                │
│                     │
├─────────────────────┤
│ [DNA Seed Sprout Tree Forest] │
└─────────────────────┘
```

---

## 8. Mobile-First Layout

### 8.1 DNA Page — Card-Per-Screen (P5)

On mobile (< 768px), show ONE active card at a time:

```
┌─────────────────────┐
│ 💫 [Input text...] ▶│  ← Compact input (fixed top)
│ [< T  V  A  P  > ] │  ← Step selector
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │ [GlowingNode] │  │
│  │               │  │
│  │  Tokenization │  │  ← ONLY the active card
│  │  "Chopping    │  │     fills the viewport
│  │   vegetables" │  │
│  │               │  │
│  │  [Viz area]   │  │
│  │  [The][king]  │  │
│  │  [wore][crown]│  │
│  │               │  │
│  │  [Deep Dive →]│  │
│  └───────────────┘  │
│                     │
├─────────────────────┤
│ [DNA Seed Sprout Tree Forest] │
└─────────────────────┘
```

**Interactions:**
- Swipe left/right = navigate steps
- Step buttons [T V A P] = jump to step
- Tap card = opens UnifiedLightbox with full details
- "Deep Dive" = SeedTransition overlay

**Desktop:** Keep current 4-column grid layout.

### 8.2 Prediction Card — Always Show Result (P7)

The last card (Prediction) must always provide closure:

| Input Quality | What Shows |
|--------------|------------|
| Good match (e.g. "jingle jingle little") | Bar chart with winner: `"bells" (99%)` |
| Partial match (e.g. "the king wore") | Bar chart with lower confidence: `"a" (45%)` |
| No match / gibberish | Friendly fallback: "I couldn't predict this — try a common phrase!" |

### 8.3 Consistent Bottom Bar

All evolutionary pages share the same bottom bar structure:

```
[DNA] [Seed] [Sprout] [Tree] [Forest]  ← StageSelector (z-100)
```

DNA page adds its step selector ABOVE this, not conflicting.

---

## 9. Narrative Progression Model

### 9.1 Growth Metaphor

The platform tells a story of growth. Each stage adds complexity while maintaining the card-based visual language.

| Stage | Route | Metaphor | What User Experiences | Card Count |
|-------|-------|----------|----------------------|------------|
| **Nucleus/DNA** | `/dna` | "Decoding the recipe of intelligence" | How AI processes ONE sentence through 4 steps | 4 interactive process cards |
| **Seed** | `/seed` | "Choosing what to grow" | Pick a learning intent (Builder/Thinker/Explorer) | 3 choice cards |
| **Sprout** | `/sprout` (new) | "First concepts taking root" | Core AI building blocks | 4-6 foundational cards |
| **Tree** | `/tree-view` | "The knowledge tree grows" | Full AI concept taxonomy, organized by level | 30+ concept cards |
| **Forest** | `/forest` | "Many trees form a garden" | How concepts connect; community learning | Cluster view of card groups |

### 9.2 AI Minimum Set Per Stage

Each stage teaches the minimum needed to understand the next:

- **DNA:** Text → Tokens → Vectors → Attention → Prediction (the 4 operations)
- **Seed:** Your intent shapes which branches matter
- **Sprout:** Tokens, Vectors, Attention, Context, RAG (5 foundational concepts)
- **Tree:** Full taxonomy: roots (fundamentals), trunk (core architectures), branches (techniques), leaves (applications)
- **Forest:** Connections between concepts, learning paths, community

### 9.3 Transition Animations Between Stages

When navigating via StageSelector:
- **DNA → Seed:** DNA helix morphs into a glowing seed
- **Seed → Sprout:** Seed cracks open, sprout emerges
- **Sprout → Tree:** Sprout grows upward, branches expand
- **Tree → Forest:** Camera pulls back to reveal multiple trees

These can be simple CSS transitions or Framer Motion `layoutId` animations.

---

## 10. Implementation Phases

### Phase 1: Quick Fixes (Current Sprint)

| # | Task | Files | Effort |
|---|------|-------|--------|
| 1.1 | Step selector always visible | `DNAInput.tsx` | **Done** (committed) |
| 1.2 | Add numbering sub-stages to TokenizationSlicer | `TokenizationSlicer.tsx` | Medium |
| 1.3 | Add vector preview sub-stage (number matrix → scatter) | `VectorMap.tsx`, `DNAComponentCard.tsx` | Medium |
| 1.4 | Add prediction fallback message | `PredictionBarChart.tsx`, `messages/*.json` | Small |
| 1.5 | Mobile: single-card-per-screen DNA layout | `DNAView.tsx`, `DNAInput.tsx` | Medium |

### Phase 2: Unified Components

| # | Task | Files | Effort |
|---|------|-------|--------|
| 2.1 | Create `UnifiedConceptCard` component | `components/ui/UnifiedConceptCard.tsx` (new) | Medium |
| 2.2 | Migrate DNA cards to UnifiedConceptCard | `DNAComponentCard.tsx` → adapter | Medium |
| 2.3 | Migrate landing page cards to UnifiedConceptCard | `ConceptCard.tsx` → adapter | Medium |
| 2.4 | Create `UnifiedLightbox` from ConceptLightbox | `components/ui/UnifiedLightbox.tsx` (new) | Large |
| 2.5 | Replace MicroLesson with UnifiedLightbox | `MicroLesson.tsx` | Medium |
| 2.6 | Replace TreeDetailPanel with UnifiedLightbox | `TreeDetailPanel.tsx` | Medium |

### Phase 3: Tree View Rewrite

| # | Task | Files | Effort |
|---|------|-------|--------|
| 3.1 | Create `TreeExplorer` card-based component | `components/tree/TreeExplorer.tsx` (new) | Large |
| 3.2 | Add level tabs (Roots/Trunk/Branches/Leaves) | `TreeExplorer.tsx` | Medium |
| 3.3 | Add breadcrumb navigation | `TreeExplorer.tsx` | Small |
| 3.4 | Wire up card clicks to UnifiedLightbox | `TreeExplorer.tsx` | Small |
| 3.5 | Rewrite tree-view page to use TreeExplorer | `app/[locale]/tree-view/` | Medium |
| 3.6 | Optional: mini-map toggle (keeps D3 as reference) | `TreeExplorer.tsx` | Medium |

### Phase 4: Narrative Polish

| # | Task | Files | Effort |
|---|------|-------|--------|
| 4.1 | Create `/sprout` page (foundational concepts) | `app/[locale]/sprout/` (new) | Medium |
| 4.2 | Stage transition animations | `StageSelector.tsx`, page layouts | Medium |
| 4.3 | Forest page concept clustering | `app/[locale]/forest/` | Large |
| 4.4 | Cross-page progress tracking | `JourneyContext.tsx` | Medium |

---

## 11. File Change Map

### New Files

| File | Purpose |
|------|---------|
| `components/ui/UnifiedConceptCard.tsx` | Shared card component |
| `components/ui/UnifiedLightbox.tsx` | Shared popup/lightbox |
| `components/tree/TreeExplorer.tsx` | Card-based tree explorer |
| `app/[locale]/sprout/page.tsx` | Sprout page (foundational concepts) |
| `app/[locale]/sprout/SproutContent.tsx` | Sprout client component |

### Modified Files

| File | Change |
|------|--------|
| `components/dna/TokenizationSlicer.tsx` | Add stages `numbering` and `vectorPreview` |
| `components/dna/VectorMap.tsx` | Add number matrix intermediate state |
| `components/dna/PredictionBarChart.tsx` | Add fallback UI for unknown inputs |
| `components/dna/DNAView.tsx` | Mobile: single-card view with swipe |
| `components/dna/DNAInput.tsx` | Mobile: compact fixed-top mode |
| `components/dna/DNAComponentCard.tsx` | Refactor to use UnifiedConceptCard |
| `components/ConceptCard.tsx` | Refactor to use UnifiedConceptCard |
| `components/ConceptLightbox.tsx` | Extract core into UnifiedLightbox |
| `components/dna/MicroLesson.tsx` | Replace with UnifiedLightbox |
| `components/tree/TreeDetailPanel.tsx` | Replace with UnifiedLightbox |
| `app/[locale]/tree-view/TreeViewContent.tsx` | Use TreeExplorer instead of TreeView |
| `components/StageSelector.tsx` | Add transition animations |
| `messages/en.json` | Add prediction fallback keys |
| `messages/et.json` | Add prediction fallback keys (Estonian) |

### Files to Deprecate (after migration)

| File | Replaced By |
|------|-------------|
| `components/tree/TreeView.tsx` | `TreeExplorer.tsx` (keep D3 as optional minimap) |
| `components/tree/TreeDetailPanel.tsx` | `UnifiedLightbox` |
| `components/dna/MicroLesson.tsx` | `UnifiedLightbox` |

---

## 12. Open Questions

### For UX Review
1. **Sprout page content:** Which 4-6 concepts are "foundational"? Current beginner path is: tokens, vectors, attention, context-engineering, RAG.
2. **Forest page:** Is this a card cluster view, a network graph, or something else entirely?
3. **D3 minimap:** Keep as optional toggle in tree view, or remove entirely?
4. **Transition animations:** How elaborate should stage-to-stage transitions be?

### For Technical Review
5. **UnifiedConceptCard performance:** Landing page renders 20+ cards. Need virtual scroll?
6. **ConceptLightbox extraction:** How much of the current 600+ line component can be reused vs. rewritten?
7. **Mobile swipe in DNA:** Use Framer Motion gestures or a dedicated carousel library?
8. **Tree data loading:** Current tree loads all nodes at once. Card-based view could lazy-load by level.

### For Product Review
9. **"Sorry I couldn't predict":** Should the fallback suggest specific phrases, or let users discover?
10. **Token IDs:** Use real BPE token IDs (from a lookup table) or random numbers for the visualization?
11. **Seed page intent:** Does the Builder/Thinker/Explorer fork still make sense, or should it be simpler?

---

## Appendix A: Component Dependency Graph

```
UnifiedConceptCard
├── GlassCard (existing, components/ui/)
├── GlowingNode (existing, components/ui/)
├── Lucide icons
└── Framer Motion

UnifiedLightbox
├── Framer Motion (drag, AnimatePresence)
├── ConceptTabContent (existing, components/mobile/)
├── LocaleOverride (extract from ConceptLightbox)
├── Lucide icons
└── ParaglideJS translations

TreeExplorer
├── UnifiedConceptCard
├── UnifiedLightbox
├── Level tabs (new, simple)
├── Breadcrumb (new, simple)
└── Optional: D3 minimap (existing TreeView, simplified)

DNA Pipeline Visualizations (unchanged internally)
├── TokenizationSlicer (+ new stages 4-5)
├── VectorMap (+ number matrix state)
├── AttentionSpotlight
└── PredictionBarChart (+ fallback state)
```

## Appendix B: Color System

| Context | Color Variable | Hex | Usage |
|---------|---------------|-----|-------|
| Tokenization | `--dna-t` | brand-teal | DNA card 1 |
| Vectorizing | `--dna-v` | brand-cyan | DNA card 2 |
| Attention | `--dna-a` | amber/gold | DNA card 3 |
| Prediction | `--dna-p` | purple | DNA card 4 |
| Roots | — | emerald-700 | Tree level |
| Trunk | — | amber-700 | Tree level |
| Branches | — | blue-500 | Tree level |
| Leaves | — | purple-500 | Tree level |

## Appendix C: Translation Keys Needed

```json
{
  "dna": {
    "tokenization": {
      "numbering": "Each word gets a library card number",
      "vectorPreview": "Numbers become map coordinates"
    },
    "prediction": {
      "noResult": "Hmm, I couldn't confidently predict the next word.",
      "trySuggestion": "Try a common phrase like 'Jingle jingle little...' or 'The king wore a...'"
    }
  },
  "treeExplorer": {
    "levelTabs": {
      "roots": "Roots",
      "trunk": "Trunk",
      "branches": "Branches",
      "leaves": "Leaves"
    },
    "breadcrumb": {
      "home": "AI Knowledge Tree"
    },
    "minimap": "Show overview map"
  }
}
```
