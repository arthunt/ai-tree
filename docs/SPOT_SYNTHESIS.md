# Dendrix.ai — SPOT Candidate: Unified Strategy Synthesis

> **Status:** Candidate for Single Point of Truth (SPOT)
> **Date:** 2026-01-31
> **Purpose:** Synthesize ALL existing analyses into one coherent strategy
> **Decision Required:** Team must ratify this as SPOT or select a variant
>
> **Source Documents Analyzed:**
> 1. `docs/MASTER_UX_STRATEGY.md` — Claude Desktop ("Living System" strategy, currently claims SPOT)
> 2. `tasks/ux_overhaul_analysis.md` — Gemini ("Living AI Organism" plan)
> 3. `docs/UX_UNIFICATION_ANALYSIS.md` — Antigravity ("Three Disconnected Paradigms" audit)
> 4. `docs/AI_TREE_MASTER_REFERENCE.md` — Existing SPOT v2.0 ("Living Forest" backlog)
> 5. `docs/LEARNING_DESIGN_ANALYSIS.md` — Learning specialist (Andragogy & cognitive load)
> 6. `docs/LEARNING_DESIGN_VERDICT.md` — Learning specialist (Prototype rejection verdict)
> 7. `docs/AI_DNA_ARCHITECTURE.md` — Original DNA architecture (Estonian, T-V-A-P spec)

---

## Table of Contents

1. [Cross-Document Convergence](#1-cross-document-convergence)
2. [Critical Divergences](#2-critical-divergences)
3. [Gaps No Document Covers](#3-gaps-no-document-covers)
4. [Unified Vision](#4-unified-vision)
5. [Growth Stages (Resolved)](#5-growth-stages-resolved)
6. [Component Architecture (Resolved)](#6-component-architecture-resolved)
7. [DNA Improvements (Resolved)](#7-dna-improvements-resolved)
8. [Tree View Strategy (Resolved)](#8-tree-view-strategy-resolved)
9. [Mobile Strategy (Resolved)](#9-mobile-strategy-resolved)
10. [Learning Design Guardrails](#10-learning-design-guardrails)
11. [Visual Theme (Resolved)](#11-visual-theme-resolved)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Open Decisions](#13-open-decisions)
14. [Document Supersession](#14-document-supersession)

---

## 1. Cross-Document Convergence

These points appear in **3+ documents** and should be treated as settled consensus:

### 1.1 Universal Agreement (All 7 documents)

| Topic | Consensus |
|-------|-----------|
| **T-V-A-P is the core model** | All documents agree on Tokenization → Vectorizing → Attention → Prediction as the DNA pipeline |
| **Growth metaphor is the navigation spine** | DNA → Seed → Sprout → Tree → Forest progression is universal |
| **Tree View needs fundamental change** | Every analysis identifies the D3 force graph as too technical for target users |
| **Unified card component needed** | All 3 UX documents (Desktop, Gemini, Antigravity) propose merging card systems |
| **Missing tokenization bridge** | All UX documents flag the text→numbers→vectors gap |
| **Mobile is broken** | Input scrolls away, cards stack poorly, no thumb-zone design |

### 1.2 Strong Agreement (5+ documents)

| Topic | Consensus | Documents |
|-------|-----------|-----------|
| **Prediction must always respond** | Graceful fallback when prediction fails | Desktop, Gemini, Antigravity |
| **Bottom sheet for mobile popups** | ConceptLightbox pattern is best mobile UX | Antigravity, Learning, Gemini |
| **Single-card-per-screen on mobile DNA** | Stream/swipe layout replaces vertical stack | Desktop, Gemini, Antigravity |
| **Stage selector must be persistent** | Fixed bottom, always visible, z-100 | Desktop, Gemini, Antigravity (now implemented) |
| **"Floating" or "fixed" input on DNA** | Input must not scroll away on mobile | Desktop, Gemini, Antigravity |

### 1.3 Moderate Agreement (3-4 documents)

| Topic | Consensus | Documents |
|-------|-----------|-----------|
| **Dark mode as DNA default** | The "void" aesthetic for DNA is good | Desktop, Gemini, DNA Architecture |
| **ConceptLightbox as popup base** | Existing draggable sheet with tabs is best popup | Antigravity, Learning |
| **Metaphor-first content** | Show simple analogy before technical terms | Learning, DNA Architecture, Master Ref |
| **Progress tracking & celebration** | Users need visible progress, milestone rewards | Learning, Master Ref |

---

## 2. Critical Divergences

These are the points where documents **directly contradict** each other. Each must be resolved.

### 2.1 Dark Mode Everywhere vs. Contextual Theming

| Position | Documents | Argument |
|----------|-----------|----------|
| **Dark mode everywhere** ("Sci-Fi Glass") | Desktop, Gemini | Visual consistency; the DNA void aesthetic should extend to Tree View and all surfaces |
| **Dark DNA + Light concepts** (contextual) | Learning Verdict, Learning Analysis | Dark mode causes 25% slower reading for extended sessions; light mode is better for educational content (2h+ sessions); dark-only excludes 15-20% of learners |
| **Light mode default, dark optional** | Master Reference | "Stunning minimalism" with white space; DNA colors as only accents |

**Resolution Recommendation:**
> **Hybrid approach.** DNA page stays dark (cinematic, short-session, process-focused). Concept exploration pages (Tree, Sprout, landing) use adaptive light/dark with light as default. The card component adapts: glass-on-dark for DNA, elevated-on-light for concepts. This satisfies both the cinematic narrative AND the learning science.

### 2.2 Tree View: Keep D3 vs. Replace Entirely

| Position | Documents | Argument |
|----------|-----------|----------|
| **Replace D3 with card grid** | Antigravity | D3 is hostile to non-technical users; cards are consistent with DNA; mobile-friendly |
| **Reskin D3 with dark/organic theme** | Desktop, Gemini | Keep the graph but make it match DNA aesthetic; organic nodes, glowing gradients |
| **D3 as optional minimap toggle** | Antigravity (compromise) | Card grid as primary, D3 as power-user reference |

**Resolution Recommendation:**
> **Card-based TreeExplorer as primary.** The D3 graph is preserved as an optional "map view" toggle for power users who want spatial overview. This is the only approach that works on mobile AND preserves the visual data for desktop. The card grid uses level tabs (Roots/Trunk/Branches/Leaves) matching the growth metaphor.

### 2.3 Input Position: Top Fixed vs. Bottom Floating

| Position | Documents | Argument |
|----------|-----------|----------|
| **Fixed bottom-center "Floating Brain"** | Desktop, Gemini | Like iMessage/ChatGPT; always accessible; thumb-zone friendly |
| **Fixed top compact bar** | Antigravity | Less disruptive; DNA step selector stays attached; familiar search-bar pattern |

**Resolution Recommendation:**
> **Context-dependent.** On DNA page (simulation), keep input at top (it's a simulation controller, not a chat). On Tree/Sprout/Forest (exploration), use bottom floating input (it's a question to the system). This avoids the UX confusion of a bottom input during a linear pipeline.

### 2.4 Animation Level: "Magical" vs. "Minimal"

| Position | Documents | Argument |
|----------|-----------|----------|
| **Rich 3D animations** ("Matrix reveal", "beams of light", "lottery scroll") | Desktop, Gemini | Wow factor; narrative magic; the "awe" that differentiates Dendrix |
| **Minimal, meaningful animation only** | Learning Verdict, Learning Analysis | 60 animated objects = cognitive catastrophe; decorative animation reduces learning 20-40%; Mayer's Coherence Principle |
| **Subtle, purposeful motion** | Master Reference | "Subtle, meaningful macro-interactions. No gratuitous animation." |

**Resolution Recommendation:**
> **"One meaningful animation per transformation."** Each T-V-A-P step gets ONE signature motion (token flip, vector scatter, attention beams, probability bars). No ambient particles, no background animations during content reading, no competing motion. The Learning Verdict's rejection of 60 animated objects is correct — but one well-crafted animation per step IS educational, not decorative. The 3D token-flip specifically is endorsed by all parties.

### 2.5 Popup System: Unified Lightbox vs. Keep MicroLesson

| Position | Documents | Argument |
|----------|-----------|----------|
| **Single UnifiedLightbox everywhere** | Antigravity | ConceptLightbox is objectively the best mobile UX; tabs, swipe, keyboard nav |
| **MicroLesson for DNA (simpler)** | (implicit in current code) | DNA context is different: it's a simulation pause, not a concept deep-dive |
| **Lightbox with "resume flow" action** | (synthesis) | ConceptLightbox base + a "Resume Simulation" button when opened from DNA |

**Resolution Recommendation:**
> **UnifiedLightbox with context-aware actions.** One component, but when opened from DNA it shows a "Resume Flow" button and auto-focuses the Explanation tab. When opened from Tree it shows tabs + metadata + prev/next navigation. The component interface supports both modes.

---

## 3. Gaps No Document Covers

### 3.1 Accessibility (WCAG)
Only the Learning documents address accessibility seriously. The Desktop and Gemini strategies would CREATE accessibility violations (dark-only, heavy motion, no reduced-motion support). **Every implementation must include `prefers-reduced-motion` media queries and maintain WCAG AA contrast.**

### 3.2 Internationalization Impact on Layout
The DNA Architecture doc covers ET/EN translations, but no document addresses how layout adapts for RTL languages (Arabic), or how card text wraps for longer German/Finnish translations. **The UnifiedConceptCard must handle variable-length text gracefully.**

### 3.3 Performance Budget
No document specifies JS bundle size or animation performance budgets. The Learning Verdict flags Three.js as too heavy (~5MB). **Budget: DNA page < 200KB JS; Tree page < 150KB JS; no WebGL.**

### 3.4 Offline / PWA Behavior
The Master Reference mentions "works offline after first load" but no document specifies how interactive simulations work offline. **DNA simulations are client-side and should work offline. Content from Supabase needs a caching strategy.**

### 3.5 Analytics & Learning Effectiveness Measurement
The Learning Analysis proposes KPIs (completion rate, session duration) but no document shows how to instrument them. **Add analytics events for: stage transitions, card interactions, lightbox opens, completion marks, prediction attempts.**

---

## 4. Unified Vision

### 4.1 The One-Sentence Pitch
> Dendrix.ai is a **living organism simulator** where non-technical adults learn AI by zooming through biological growth stages — from the microscopic DNA of machine thought to the forest of interconnected intelligence.

### 4.2 Design Principles (Merged from all documents)

| # | Principle | Source | Implementation |
|---|-----------|--------|----------------|
| 1 | **DNA First** | Master Ref | T-V-A-P is the universal entry point |
| 2 | **Less is More** | Master Ref, Learning Verdict | Minimal extraneous elements; one animation per transformation |
| 3 | **Problem-First** | Master Ref, Learning Analysis | Adults learn by solving ("How to build a chatbot") not memorizing |
| 4 | **One Card Language** | Desktop, Gemini, Antigravity | Single card and popup component across all surfaces |
| 5 | **Growth Metaphor** | All documents | Every page is a zoom level of the same organism |
| 6 | **Mobile-Thumb-First** | Desktop, Gemini, Antigravity, Learning | Bottom sheets, floating inputs, 48px touch targets |
| 7 | **Graceful Failure** | Desktop, Gemini, Antigravity | System always responds, even with "I couldn't predict that" |
| 8 | **Metaphor Before Technical** | DNA Architecture, Learning Analysis | Show the analogy first, reveal the math on demand |
| 9 | **Global First** | Master Ref | 100+ languages from day 1; RTL support |
| 10 | **Science Over Spectacle** | Learning Verdict | Reject decorative complexity; every element must teach |

### 4.3 The "Zoom Metaphor" (Unified from Desktop + Gemini + Master Ref)

```
ZOOM FAR (x0.1)    → Forest    → Multiple concept trees, community, ecosystem
ZOOM NORMAL (x1)   → Tree      → Full taxonomy, organized by level (card grid)
ZOOM CLOSE (x10)   → Sprout    → Foundational concepts, first principles
ZOOM MICRO (x100)  → Seed      → User intent selection, path choice
ZOOM NANO (x1000)  → DNA       → T-V-A-P pipeline, interactive simulation
```

The user "zooms in" to understand mechanisms, "zooms out" to see structure.

---

## 5. Growth Stages (Resolved)

### 5.1 Stage Definitions

Merged from all documents. Where names conflicted, the most biologically coherent term was chosen:

| Stage | Route | Metaphor | Content | Visual | Duration |
|-------|-------|----------|---------|--------|----------|
| **DNA** | `/dna` | "The recipe of thought" | T-V-A-P interactive simulation | Dark void, neon, cinematic | ~5 min |
| **Seed** | `/seed` | "Choosing what to grow" | Intent capture (Build/Think/Explore) | Golden, crystallized, protected | ~1 min |
| **Sprout** | `/sprout` (new) | "First concepts taking root" | 5 foundational concepts: Tokens, Vectors, Attention, Context, RAG | Fresh green, growing, simple | ~15 min |
| **Tree** | `/tree-view` | "The knowledge tree" | Full taxonomy by level (30+ concepts) | Organic cards, level-tabbed | ~30 min |
| **Forest** | `/forest` | "The ecosystem" | Concept connections, model families, community | Panoramic, interconnected | Future |

### 5.2 Stage-to-Stage Navigation

The StageSelector (`components/StageSelector.tsx`) provides persistent bottom navigation:

```
[🧬 DNA] [🌱 Seed] [🌿 Sprout] [🌳 Tree] [🌲 Forest]
```

Transitions between stages use subtle Framer Motion `layoutId` animations (not 3D camera pans — those violate cognitive load principles).

### 5.3 What Each Stage Teaches (AI Minimum Set)

From DNA Architecture:

| Stage | Teaches | Maps to Tree Level |
|-------|---------|-------------------|
| DNA | How ONE sentence is processed (T→V→A→P) | All levels (mechanism) |
| Seed | What YOU want to learn (intent) | Meta-navigation |
| Sprout | 5 foundational concepts | Roots |
| Tree | Full taxonomy (30+ concepts) | Roots → Trunk → Branches → Leaves |
| Forest | How concepts connect; model families | Cross-cutting |

---

## 6. Component Architecture (Resolved)

### 6.1 UnifiedConceptCard

All three UX documents agree on this. Specification from Antigravity's analysis, adopted:

```typescript
interface UnifiedConceptCardProps {
  // Content
  title: string;
  description: string;
  metaphor?: string;

  // Visual
  color: string;
  icon?: string;
  motif?: string;
  glowingNode?: boolean;        // DNA mode

  // Context
  level?: 'root' | 'trunk' | 'branch' | 'leaf';
  complexity?: 'beginner' | 'intermediate' | 'advanced';

  // State
  isActive?: boolean;
  isCompleted?: boolean;

  // Behavior
  onClick?: () => void;
  visualization?: React.ReactNode;
}
```

**Replaces:** `ConceptCard`, `DNAComponentCard`, D3 SVG circle nodes

**Visual adaptation:**
- DNA page: Glass-on-dark + GlowingNode + embedded viz
- Landing/Sprout: Elevated card + complexity badge + reading time
- Tree: Elevated card + level color + motif emoji + year badge

### 6.2 UnifiedLightbox

Based on existing `ConceptLightbox` (best mobile UX). Specification from Antigravity's analysis:

```typescript
interface UnifiedLightboxProps {
  // Content (tab-based)
  explanation?: string;
  visualization?: React.ReactNode;
  code?: string;
  connections?: React.ReactNode;

  // Metadata
  title: string;
  metaphor?: string;
  year?: number;
  paper?: { title: string; url: string };

  // Navigation
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;

  // Mobile
  draggable?: boolean;
  snapPoints?: number[];        // [0.45, 0.70, 0.95]

  // Context-aware
  showResumeFlow?: boolean;     // DNA mode: "Resume Simulation" CTA
  showCompletion?: boolean;     // Landing/Tree: mark as complete
}
```

**Replaces:** `ConceptLightbox` (minimal changes), `MicroLesson`, `TreeDetailPanel`

### 6.3 TreeExplorer (New)

Replaces D3 force graph as primary Tree View:

```
┌──────────────────────────────────────────────┐
│ GlobalNav                                     │
├──────────────────────────────────────────────┤
│ Breadcrumb: AI > Neural Networks > ...        │
├──────────────────────────────────────────────┤
│ [🌱 Roots] [🌲 Trunk] [🌿 Branches] [🍃 Leaves] │
├──────────────────────────────────────────────┤
│                                               │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Card │  │ Card │  │ Card │  │ Card │     │
│  └──────┘  └──────┘  └──────┘  └──────┘     │
│  ┌──────┐  ┌──────┐                          │
│  │ Card │  │ Card │  [📊 Map View]           │
│  └──────┘  └──────┘                          │
│                                               │
├──────────────────────────────────────────────┤
│ [DNA] [Seed] [Sprout] [Tree] [Forest]        │
└──────────────────────────────────────────────┘
```

- Level tabs filter cards by tree level
- Breadcrumb shows hierarchy path
- Card click → UnifiedLightbox
- "Map View" toggle → shows D3 graph as optional minimap
- Mobile: full-width cards, horizontally scrollable level tabs

---

## 7. DNA Improvements (Resolved)

### 7.1 Tokenization Bridge (All documents agree)

**Current:** Text → Cut → Pills → (gap) → VectorMap

**New 6-stage flow:**

```
Stage 1 (text):        "The king wore a crown"
Stage 2 (cutting):     "The | king | wore | a | crown"
Stage 3 (pills):       [The] [king] [wore] [a] [crown]
Stage 4 (numbering):   [The→2041] [king→6891] [wore→3847] [a→64] [crown→8823]
                        ↑ Pills flip to reveal token IDs ("The Matrix moment")
Stage 5 (vectorPreview): Numbers morph into coordinate pairs
Stage 6 (handoff):     Coordinates animate into VectorMap scatter plot
```

**Metaphor bridge:**
- Stage 3→4: "Each word gets a library card number"
- Stage 4→5: "Library numbers become map coordinates"
- Stage 5→6: "Coordinates show where words live in meaning space"

### 7.2 VectorMap Intermediate State

Before the scatter plot, briefly show a number table:

```
Token     ID      x      y
─────────────────────────
The      2041   0.72   0.31
king     6891   0.85   0.79
wore     3847   0.44   0.52
```

Then animate rows → dots flying to (x,y) positions.

### 7.3 Prediction Fallback

```typescript
if (predictions.length === 0 || predictions[0].probability < 0.1) {
  // Show: "🤔 I couldn't predict the next word. Try 'The king wore a...'"
}
```

This is unanimously agreed upon.

---

## 8. Tree View Strategy (Resolved)

### 8.1 Primary: Card-Based TreeExplorer

- Uses `UnifiedConceptCard` for every concept
- Level tabs replace zoom/pan literacy requirement
- Breadcrumb replaces spatial orientation
- Works identically on mobile and desktop (responsive grid)
- Click opens `UnifiedLightbox` with full concept details

### 8.2 Secondary: D3 Map View (Toggle)

- Available as "Map View" toggle button
- Shows the existing D3 force graph as read-only overview
- Click on D3 node → scrolls card grid to that concept
- Desktop only; hidden on mobile

### 8.3 Theme

- **Light mode default** for concept reading (Learning Analysis evidence: 25% better reading speed)
- Card glass-morphism uses subtle transparency (not heavy blur)
- Level colors: roots=emerald, trunk=amber, branches=blue, leaves=purple
- Dark mode toggle available

---

## 9. Mobile Strategy (Resolved)

### 9.1 DNA Page (Simulation)

**Layout:** Single-card-per-screen with swipe navigation

```
┌─────────────────────┐
│ 💫 [Input...] ▶ [⏸] │  ← Fixed top compact bar
│ [< T  V  A  P  >]   │  ← Step selector
├─────────────────────┤
│                      │
│  ┌────────────────┐  │
│  │ [GlowingNode]  │  │
│  │ Tokenization   │  │  ← ONE active card fills viewport
│  │ [Viz area]     │  │
│  │ [Deep Dive →]  │  │
│  └────────────────┘  │
│                      │
├─────────────────────┤
│ [DNA Seed Sprout Tree Forest] │
└─────────────────────┘
```

- Swipe left/right = navigate steps
- Step buttons [T V A P] = jump to step
- Input stays fixed at top (it's a simulation controller)

### 9.2 Tree/Sprout/Landing (Exploration)

**Layout:** Full-width card list with bottom sheet popup

```
┌─────────────────────┐
│ [GlobalNav]          │
│ [Level tabs]         │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ Card 1          │ │  ← Full-width cards
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ Card 2          │ │
│ └─────────────────┘ │
│ ...                  │
├─────────────────────┤
│ [DNA Seed Sprout Tree Forest] │
└─────────────────────┘
```

- Card click → bottom sheet (UnifiedLightbox at 60% snap)
- Swipe down to close
- 48px minimum touch targets
- Breadcrumb navigation for hierarchy

### 9.3 Touch Targets & Gestures

| Gesture | Action |
|---------|--------|
| Tap card | Open lightbox |
| Swipe left/right (DNA) | Next/prev step |
| Swipe down (lightbox) | Close |
| Swipe left/right (lightbox) | Next/prev concept |
| Long press | Show metaphor tooltip |

---

## 10. Learning Design Guardrails

From the Learning Analysis and Learning Verdict — these are non-negotiable constraints:

### 10.1 Cognitive Load Rules

| Rule | Source | Implementation |
|------|--------|----------------|
| **Max 1-2 information sections visible at once** | Learning Analysis (P0-1) | Accordion/tab in lightbox; metaphor auto-expanded, technical collapsed |
| **No ambient background animation during content reading** | Learning Verdict | Void glow and pulse effects pause/dim when lightbox is open |
| **One animation per transformation** | Learning Verdict (Mayer's Coherence) | Token flip, vector scatter, attention beams, prediction bars — no others |
| **`prefers-reduced-motion` must be respected** | Learning Verdict (WCAG 2.2.2) | All framer-motion animations check media query |

### 10.2 Navigation Rules

| Rule | Source | Implementation |
|------|--------|----------------|
| **Navigation history (breadcrumb)** | Learning Analysis (P0-2) | LightboxState includes `navigationStack[]` |
| **"Back" button from prerequisite** | Learning Analysis | Clicking prerequisite pushes to stack; "← Back to X" always visible |
| **Next-step recommendation after completion** | Learning Analysis (P1-1) | "What's next?" card after marking complete |

### 10.3 Content Rules

| Rule | Source | Implementation |
|------|--------|----------------|
| **Metaphor first, technical on demand** | DNA Architecture, Learning Analysis | Accordion: Metaphor auto-expanded, Technical collapsed |
| **Always provide closure** | Gemini, Antigravity | Prediction always shows a result or friendly fallback |
| **Time estimates visible** | Learning Analysis | Reading time badges on cards |
| **"Why this matters" context** | Learning Analysis (Andragogy) | Each concept card shows real-world application |

### 10.4 What NOT to Do (from Learning Verdict)

These were explicitly rejected after analysis:

| Anti-Pattern | Why Rejected | Reference |
|-------------|--------------|-----------|
| 60 animated 3D objects | Cognitive load catastrophe | Learning Verdict §1 |
| Dark-only theme for extended reading | 25% slower reading speed | Learning Verdict §5 |
| Marketing jargon ("binary soil") | Obscures rather than clarifies | Learning Verdict §3 |
| Heavy glassmorphism (blur > 12px) | Reduces text readability | Learning Verdict §5 |
| Jitter/chaos animations | Motion sickness risk, no learning value | Learning Verdict §3 |

---

## 11. Visual Theme (Resolved)

### 11.1 The Compromise: "Adaptive Organism"

Neither "Sci-Fi Glass everywhere" (Desktop) nor "Light minimalism everywhere" (Master Ref) won. The resolution:

| Context | Theme | Rationale |
|---------|-------|-----------|
| **DNA page** | Dark void, neon accents, glassmorphism | Cinematic, short session (~5 min), process visualization |
| **Seed page** | Dark → transitional (golden tones) | Bridge between DNA and lighter concept pages |
| **Sprout page** | Light default, subtle glass | Reading-focused, foundational learning (15+ min) |
| **Tree page** | Light default, level-colored cards | Extended reading (30+ min); learning science |
| **Forest page** | Adaptive to content | Future; likely light with network visualization |
| **Landing page** | Light with DNA-colored accents | First impression; needs readability |

### 11.2 Color System

From DNA Architecture + Master Reference:

| Token | Variable | Value | Usage |
|-------|----------|-------|-------|
| DNA-T | `--dna-t` | teal/red* | Tokenization step |
| DNA-V | `--dna-v` | cyan/green* | Vectorizing step |
| DNA-A | `--dna-a` | amber/blue* | Attention step |
| DNA-P | `--dna-p` | purple | Prediction step |
| Roots | `--tree-roots` | emerald-700 | Tree: fundamentals |
| Trunk | `--tree-trunk` | amber-700 | Tree: core architectures |
| Branches | `--tree-branches` | blue-500 | Tree: techniques |
| Leaves | `--tree-leaves` | purple-500 | Tree: applications |

*Note: DNA Architecture (Estonian doc) specifies red/green/blue/purple, while the current implementation uses teal/cyan/amber/purple. **The current implementation colors should be kept** as they're already deployed and tested.

---

## 12. Implementation Roadmap

### Phase 1: DNA Narrative Fixes (Current Sprint)

| # | Task | Status | Files |
|---|------|--------|-------|
| 1.1 | Step selector always visible | **Done** | `DNAInput.tsx` |
| 1.2 | Add numbering sub-stages (token IDs) to TokenizationSlicer | Pending | `TokenizationSlicer.tsx` |
| 1.3 | Add number matrix → scatter animation in VectorMap | Pending | `VectorMap.tsx` |
| 1.4 | Add prediction fallback message | Pending | `PredictionBarChart.tsx`, `messages/*.json` |
| 1.5 | Mobile DNA: single-card-per-screen layout | Pending | `DNAView.tsx`, `DNAInput.tsx` |

### Phase 2: Unified Components

| # | Task | Files |
|---|------|-------|
| 2.1 | Create `UnifiedConceptCard` | `components/ui/UnifiedConceptCard.tsx` (new) |
| 2.2 | Migrate DNA cards to UnifiedConceptCard | `DNAComponentCard.tsx` → adapter |
| 2.3 | Migrate landing cards to UnifiedConceptCard | `ConceptCard.tsx` → adapter |
| 2.4 | Create `UnifiedLightbox` from ConceptLightbox | `components/ui/UnifiedLightbox.tsx` (new) |
| 2.5 | Replace MicroLesson with UnifiedLightbox | `MicroLesson.tsx` |
| 2.6 | Replace TreeDetailPanel with UnifiedLightbox | `TreeDetailPanel.tsx` |

### Phase 3: Tree View Rewrite

| # | Task | Files |
|---|------|-------|
| 3.1 | Create card-based `TreeExplorer` | `components/tree/TreeExplorer.tsx` (new) |
| 3.2 | Add level tabs, breadcrumb, card-to-lightbox wiring | `TreeExplorer.tsx` |
| 3.3 | Rewrite tree-view page to use TreeExplorer | `app/[locale]/tree-view/` |
| 3.4 | Add D3 minimap toggle (optional) | `TreeExplorer.tsx` |

### Phase 4: Narrative Polish

| # | Task | Files |
|---|------|-------|
| 4.1 | Create `/sprout` page (5 foundational concepts) | `app/[locale]/sprout/` (new) |
| 4.2 | Stage transition animations (subtle) | `StageSelector.tsx` |
| 4.3 | Navigation history & breadcrumb in lightbox | `UnifiedLightbox.tsx` |
| 4.4 | Next-step recommendation system | `lib/recommendations.ts` (new) |
| 4.5 | Cross-page progress tracking | `JourneyContext.tsx` |

### Phase 5: Future (Forest + Scale)

| # | Task |
|---|------|
| 5.1 | Forest page: concept cluster visualization |
| 5.2 | 100+ language rollout (AI draft → Guardian review) |
| 5.3 | User auth + saved progress |
| 5.4 | Learning paths (paid/premium trails) |

---

## 13. Open Decisions

These require team input before implementation:

### 13.1 Product Decisions

| # | Question | Options | Documents That Weigh In |
|---|----------|---------|------------------------|
| 1 | **Token IDs: real BPE or random?** | Real BPE lookup table vs. random numbers for visualization | Antigravity (asks), Gemini (implies random), DNA Arch (shows real) |
| 2 | **Seed page: keep Build/Think/Explore?** | Keep 3-way fork vs. simplify to 2 (Quick vs. Deep) vs. remove | Antigravity (asks), Master Ref (has it) |
| 3 | **Forest page scope?** | Card clusters vs. network graph vs. defer entirely | All docs mention it, none specify |
| 4 | **Sprout page content?** | Which 5 concepts are "foundational"? | Antigravity (suggests: Tokens, Vectors, Attention, Context, RAG) |

### 13.2 Technical Decisions

| # | Question | Options |
|---|----------|---------|
| 5 | **Mobile DNA swipe library?** | Framer Motion gestures vs. dedicated carousel (embla-carousel) |
| 6 | **Bottom sheet implementation?** | Framer Motion (already used) vs. react-spring-bottom-sheet |
| 7 | **Performance budget enforcement?** | Bundle analyzer in CI vs. manual review |

### 13.3 SPOT Status

| # | Question |
|---|----------|
| 8 | **Does this document become the new SPOT?** If yes, `docs/MASTER_UX_STRATEGY.md` and `docs/AI_TREE_MASTER_REFERENCE.md` should reference it as the authoritative strategy. |

---

## 14. Document Supersession

### 14.1 Current State

`docs/MASTER_UX_STRATEGY.md` (Claude Desktop) currently claims SPOT status and states it "supersedes" `docs/UX_UNIFICATION_ANALYSIS.md` and `tasks/ux_overhaul_analysis.md`. This claim has not been ratified by the team.

### 14.2 Recommendation

If this synthesis is approved:

| Document | New Status |
|----------|------------|
| **This document** (`docs/SPOT_SYNTHESIS.md`) | **Candidate SPOT** (pending ratification) |
| `docs/MASTER_UX_STRATEGY.md` | Superseded by this synthesis (vision incorporated) |
| `tasks/ux_overhaul_analysis.md` | Superseded by this synthesis (plan incorporated) |
| `docs/UX_UNIFICATION_ANALYSIS.md` | Superseded by this synthesis (audit incorporated) |
| `docs/LEARNING_DESIGN_ANALYSIS.md` | **Active reference** (guardrails still apply) |
| `docs/LEARNING_DESIGN_VERDICT.md` | **Active reference** (anti-patterns still apply) |
| `docs/AI_TREE_MASTER_REFERENCE.md` | **Active reference** (backlog & stages still used) |
| `docs/AI_DNA_ARCHITECTURE.md` | **Active reference** (T-V-A-P spec still canonical) |

### 14.3 What This Document Is NOT

- This is **not** a backlog (use `AI_TREE_MASTER_REFERENCE.md` for that)
- This is **not** a learning science paper (use `LEARNING_DESIGN_ANALYSIS.md` for that)
- This is **not** a component specification (detailed interfaces are proposals, not final)
- This **is** the strategic synthesis that resolves contradictions between all other documents

---

*Document created: 2026-01-31*
*Version: 1.0*
*Author: Antigravity (synthesis from 7 source documents)*
*Decision required: Team ratification as SPOT*
