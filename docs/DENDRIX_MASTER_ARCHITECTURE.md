c# Dendrix.ai Master Architecture
## Single Point of Truth — Platform Design & Implementation Guide

**Document ID:** DENDRIX_MASTER_ARCHITECTURE_v1.0  
**Version:** 1.0  
**Created:** January 31, 2026  
**Status:** CANONICAL — Single Source of Truth  
**Supersedes:** All previous architectural documents  
**Purpose:** Unified reference for UI/UX, information architecture, and implementation

---

## Document Synthesis

This document synthesizes and reconciles three architectural analyses:

| Source | Focus | Key Contribution |
|--------|-------|------------------|
| **UX Overhaul Analysis** (Antigravity/Swarm) | Visual metaphor | "Living Organism" design language |
| **UX Unification Analysis** (Swarm) | Component architecture | UnifiedCard/UnifiedLightbox system |
| **Learning Architecture** (Claude) | User journey | Growth levels & specialization paths |

Where documents conflict, this master document provides the authoritative resolution.

---

## Table of Contents

1. [Vision & Principles](#1-vision--principles)
2. [Growth Model (Information Architecture)](#2-growth-model-information-architecture)
3. [Visual Design System](#3-visual-design-system)
4. [Component Architecture](#4-component-architecture)
5. [Route Structure](#5-route-structure)
6. [DNA Level — Deep Dive](#6-dna-level--deep-dive)
7. [Sprout Level — Deep Dive](#7-sprout-level--deep-dive)
8. [Tree Level — Deep Dive](#8-tree-level--deep-dive)
9. [Fruits & Orchard Levels](#9-fruits--orchard-levels)
10. [Mobile-First Implementation](#10-mobile-first-implementation)
11. [Program Integration](#11-program-integration)
12. [Implementation Phases](#12-implementation-phases)
13. [File Architecture](#13-file-architecture)
14. [Open Questions & Decisions](#14-open-questions--decisions)

---

## 1. Vision & Principles

### 1.1 The Core Insight

> **"Don't teach AI. Let understanding grow."**

Dendrix.ai transforms AI education from a technical curriculum into an organic discovery experience. Users don't study AI—they watch it grow from DNA to a living tree.

### 1.2 The North Star Metaphor

Every screen must feel like a **zoom level of the same living organism**:

```
                    🔬 MICROSCOPIC                    🌍 MACROSCOPIC
                         │                                │
    ┌────────────────────┼────────────────────────────────┼────────────────┐
    │                    │                                │                │
    │    🧬 DNA     →    🌱 Sprout    →    🌳 Tree    →    🏡 Orchard     │
    │    (cell)          (seedling)        (organism)      (ecosystem)     │
    │                    │                                │                │
    └────────────────────┼────────────────────────────────┼────────────────┘
                         │                                │
                    "How it works"               "Where I can grow"
```

### 1.3 Design Principles

| Principle | Implementation | Anti-Pattern |
|-----------|----------------|--------------|
| **Organism, not Documentation** | Dark, glowing, organic visuals | White backgrounds, academic layouts |
| **Card-Based Everything** | Same card component across all levels | Different UI patterns per page |
| **Progressive Disclosure** | Show complexity only when requested | Dump all information at once |
| **Mobile-First** | Design for thumb, adapt for mouse | Desktop-first, mobile as afterthought |
| **Metaphor Before Technical** | "Memory" before "Context Window" | Technical jargon as default |
| **Closure at Every Step** | Always provide feedback/result | Silent completion, no confirmation |

### 1.4 The Transformation Promise

| From (Current) | To (Target) |
|----------------|-------------|
| Documentation Browser | Living Organism Simulator |
| Technical Diagrams | Organic Visualizations |
| Academic Sidebar Panels | Immersive Card Lightboxes |
| Disconnected Pages | Seamless Zoom Levels |
| "Learn AI" | "Grow with AI" |

---

## 2. Growth Model (Information Architecture)

### 2.1 The Five Levels

```
LEVEL           USER QUESTION                    TIME        COMPLEXITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧬 DNA          "How does AI actually work?"     ~10 min     Foundational
                 T-V-A-P mechanics
                 
🌱 SPROUT       "How do I communicate with AI?"  ~30 min     Practical
                 Prompting, temperature, context
                 
🌳 TREE         "What technologies exist?"       ~60 min     Comprehensive
                 RAG, agents, embeddings, MCP
                 
🍎 FRUITS       "What can I DO with AI?"         ~30 min     Applied
                 Writing, analysis, automation
                 
🏡 ORCHARD      "Where can I GROW from here?"    Ongoing     Career
                 Specialization paths

```

### 2.2 Level Relationships

```
                                    🏡 ORCHARD
                              (Specialization Paths)
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
         🎓 Instructor          ⚡ Automator              🎮 Operator
         📊 Analyst             ✍️ Creator               🔧 Developer
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │
                                  🍎 FRUITS
                            (Practical Applications)
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
           Writing              Analysis                 Automation
           Research             Creative                 Assistance
              │                        │                        │
              └────────────────────────┼────────────────────────┘
                                       │
                                   🌳 TREE
                            (Technologies & Techniques)
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                  RAG              Agents              MCP
               Embeddings       Fine-tuning         Functions
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       │
                                  🌱 SPROUT
                              (Communication Skills)
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
               Temperature         Prompting           Context
                  Roles          Instructions         Examples
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       │
                                   🧬 DNA
                              (How AI Works)
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
               [T] Tokens        [A] Attention      [P] Prediction
               [V] Vectors             │
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       │
                                   ════════
                                    ROOTS
                              (Foundation: T-V-A-P)
```

### 2.3 Key Architectural Decisions

| Decision | Resolution | Rationale |
|----------|------------|-----------|
| **Where does RAG belong?** | 🌳 TREE (technology) | RAG is a technique, not an application |
| **Where do programs appear?** | 🏡 ORCHARD (linked) | Training comes after awareness, not before |
| **Is there a "Seed" level?** | **NO** — Merged into Sprout | Simplifies navigation, reduces cognitive load |
| **Is there a "Forest" level?** | **NO** — Merged into Orchard | Community/ecosystem = career paths |
| **What replaces tree-view?** | Card-based TreeExplorer | D3 graph is too technical for target users |

---

## 3. Visual Design System

### 3.1 The "Living Organism" Aesthetic

All levels share a consistent dark, organic, glowing visual language:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  VISUAL CONSTANTS (All Levels)                                              │
│                                                                             │
│  Background:     Deep void (#0a0a0f) with subtle noise texture              │
│  Cards:          Glassmorphism (backdrop-blur-xl, border-white/10)          │
│  Text:           White with opacity hierarchy (100%, 70%, 40%)              │
│  Accents:        Glowing gradients, not solid colors                        │
│  Motion:         Organic easing (spring physics), not linear                │
│  Depth:          Layered glass panels, not flat surfaces                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Color System by Level

| Level | Primary | Accent | Glow | Meaning |
|-------|---------|--------|------|---------|
| 🧬 DNA | Deep Purple `#6366f1` | Violet `#8b5cf6` | Purple | Foundation, genetic |
| 🌱 Sprout | Fresh Green `#22c55e` | Lime `#84cc16` | Green | Growth, beginning |
| 🌳 Tree | Forest Teal `#14b8a6` | Cyan `#06b6d4` | Teal | Structure, knowledge |
| 🍎 Fruits | Warm Orange `#f97316` | Amber `#f59e0b` | Orange | Harvest, outcomes |
| 🏡 Orchard | Rich Brown `#92400e` | Gold `#eab308` | Gold | Mastery, career |

### 3.3 DNA Component Colors (T-V-A-P)

| Component | Color | CSS Variable | Hex |
|-----------|-------|--------------|-----|
| **Tokens** | Teal | `--dna-t` | `#14b8a6` |
| **Vectors** | Cyan | `--dna-v` | `#06b6d4` |
| **Attention** | Amber | `--dna-a` | `#f59e0b` |
| **Prediction** | Purple | `--dna-p` | `#8b5cf6` |

### 3.4 Typography

```
Headings:     Inter, bold, tracking-tight
Body:         Inter, normal, leading-relaxed  
Code:         JetBrains Mono, light
Numbers:      Tabular numerals for alignment
```

### 3.5 Spacing & Touch Targets

```
Minimum touch target:    48px × 48px
Card padding:            24px (mobile), 32px (desktop)
Card gap:                16px (mobile), 24px (desktop)
Section spacing:         64px (mobile), 96px (desktop)
```

---

## 4. Component Architecture

### 4.1 The Two Universal Components

The entire platform uses exactly **two** primary UI components:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  1. UnifiedConceptCard                                                      │
│     └── Used for: DNA steps, Sprout concepts, Tree nodes, Fruit apps,      │
│                   Orchard paths, Program cards                              │
│                                                                             │
│  2. UnifiedLightbox                                                         │
│     └── Used for: All detail views, deep dives, explanations               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 UnifiedConceptCard

**Location:** `components/ui/UnifiedConceptCard.tsx`

```typescript
interface UnifiedConceptCardProps {
  // === Content ===
  title: string;
  description: string;
  metaphor?: string;                // Simple explanation

  // === Visual ===
  color: string;                    // Level/component color
  icon?: string;                    // Lucide icon name
  motif?: string;                   // Emoji for tree nodes
  glowingNode?: boolean;            // Animated orb (DNA cards)

  // === Context ===
  level?: 'dna' | 'sprout' | 'tree' | 'fruits' | 'orchard';
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  readingTime?: number;
  year?: number;                    // For tree nodes

  // === State ===
  isActive?: boolean;               // Currently selected/processing
  isCompleted?: boolean;            // User has learned this
  isLocked?: boolean;               // Requires prerequisite

  // === Behavior ===
  onClick?: () => void;

  // === Embedded Content ===
  visualization?: React.ReactNode;  // Interactive demo
  showVisualization?: boolean;
}
```

**Visual States:**

| State | Visual Treatment |
|-------|------------------|
| Default | Glass card, subtle border |
| Hover | Increased glow, slight lift |
| Active | Border glow ring, visualization visible |
| Completed | Green checkmark badge, reduced glow |
| Locked | Dimmed, lock icon, no hover effects |

### 4.3 UnifiedLightbox

**Location:** `components/ui/UnifiedLightbox.tsx`

Based on the landing page's `ConceptLightbox` (the best mobile UX in the product).

```typescript
interface UnifiedLightboxProps {
  // === Content (tabs, show based on availability) ===
  explanation?: string;
  visualization?: React.ReactNode;
  code?: string;
  connections?: React.ReactNode;

  // === Metadata ===
  title: string;
  metaphor?: string;
  icon?: string;
  color?: string;
  year?: number;
  paper?: { title: string; url: string };
  relatedProgram?: { id: string; name: string; hook: string };

  // === Navigation ===
  onPrev?: () => void;
  onNext?: () => void;
  onClose: () => void;
  siblings?: { id: string; title: string }[];

  // === Mobile Behavior ===
  draggable?: boolean;              // Bottom sheet (default: true on mobile)
  snapPoints?: number[];            // [0.45, 0.70, 0.95]

  // === Features ===
  showTabs?: boolean;
  showCompletion?: boolean;
  showLocaleSwitch?: boolean;
}
```

**Mobile Behavior:**
- Draggable bottom sheet with snap points (45%, 70%, 95%)
- Swipe down to close
- Swipe left/right to navigate siblings
- Keyboard shortcuts (ESC, arrows, 1-4 for tabs)

### 4.4 Component Replacement Map

| Current Component | Location | Replaced By |
|-------------------|----------|-------------|
| `ConceptCard` | `components/ConceptCard.tsx` | `UnifiedConceptCard` |
| `DNAComponentCard` | `components/dna/DNAComponentCard.tsx` | `UnifiedConceptCard` + `glowingNode` |
| D3 SVG nodes | `components/tree/TreeView.tsx` | `UnifiedConceptCard` grid |
| `ConceptLightbox` | `components/ConceptLightbox.tsx` | `UnifiedLightbox` (refactored) |
| `MicroLesson` | `components/dna/MicroLesson.tsx` | `UnifiedLightbox` |
| `TreeDetailPanel` | `components/tree/TreeDetailPanel.tsx` | `UnifiedLightbox` |

---

## 5. Route Structure

### 5.1 Complete Route Map

```
/                               → Landing (choose your path)
│
├── /dna                        → 🧬 DNA Level (T-V-A-P)
│   ├── /dna/tokens
│   ├── /dna/vectors
│   ├── /dna/attention
│   └── /dna/prediction
│
├── /learn
│   ├── /learn/basics           → 🌱 Sprout Level (Prompting)
│   │   ├── /learn/basics/temperature
│   │   ├── /learn/basics/instructions
│   │   ├── /learn/basics/roles
│   │   └── /learn/basics/context
│   │
│   └── /learn/techniques       → 🌳 Tree Level (Technologies)
│       ├── /learn/techniques/embeddings
│       ├── /learn/techniques/rag
│       ├── /learn/techniques/fine-tuning
│       ├── /learn/techniques/functions
│       ├── /learn/techniques/mcp
│       └── /learn/techniques/agents
│
├── /applications               → 🍎 Fruits Level (Use Cases)
│   ├── /applications/writing
│   ├── /applications/analysis
│   ├── /applications/automation
│   ├── /applications/creative
│   ├── /applications/assistant
│   └── /applications/learning
│
├── /paths                      → 🏡 Orchard Level (Careers)
│   ├── /paths/instructor
│   ├── /paths/automation
│   ├── /paths/analyst
│   ├── /paths/creator
│   ├── /paths/developer
│   └── /paths/operator
│
├── /programs                   → Training Programs (from Orchard)
│   ├── /programs/aiki
│   ├── /programs/aivo
│   ├── /programs/aime
│   └── /programs/apply
│
└── /tree-view                  → Legacy (redirect to /learn/techniques)
```

### 5.2 Navigation Components

**Global Navigation Bar:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Dendrix Logo]          DNA  |  Learn ▼  |  Applications  |  Paths        │
│                                   └── Basics (Sprout)                       │
│                                   └── Techniques (Tree)                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Level Progress Indicator:**
```
DNA ─────●───── Sprout ─────○───── Tree ─────○───── Fruits ─────○───── Orchard
         ↑
    You are here
```

**Breadcrumbs:**
```
Home > Learn > Techniques > RAG
```

---

## 6. DNA Level — Deep Dive

### 6.1 The T-V-A-P Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  INPUT ───→ [T] ───→ [V] ───→ [A] ───→ [P] ───→ OUTPUT                     │
│  "Hello"    │        │        │        │       "Hi there!"                  │
│             │        │        │        │                                    │
│          Tokens   Vectors  Attention Prediction                             │
│          "Slice"  "Map"    "Connect" "Guess"                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Missing Tokenization Bridge (Critical Fix)

**Current Flow (4 stages):**
```
Text → Cut → Separated Pills → Done
```

**Required Flow (6 stages):**
```
Stage 1 (text):          "The king wore a crown"
Stage 2 (cutting):       "The | king | wore | a | crown"
Stage 3 (pills):         [The] [king] [wore] [a] [crown]
Stage 4 (numbering):     [The→2041] [king→6891] [wore→3847] [a→64] [crown→8823]
                          ↑ Pills flip 3D to reveal token IDs
Stage 5 (vectorPreview): [2041→[0.72, 0.31]] [6891→[0.85, 0.79]] ...
                          ↑ IDs morph into coordinate pairs
Stage 6 (done):          Coordinates ready for VectorMap
```

**Metaphor Bridge:**
- Stage 3→4: "Each word gets a library card number"
- Stage 4→5: "Library numbers become map coordinates"
- Stage 5→6: "Coordinates reveal where words live in meaning space"

### 6.3 VectorMap Intermediate State

Before scatter plot, show number matrix:

```
Token     ID      x      y
─────────────────────────
The      2041   0.72   0.31
king     6891   0.85   0.79
wore     3847   0.44   0.52
a          64   0.50   0.50
crown    8823   0.82   0.75
```

Then animate: rows → dots flying to (x,y) positions.

### 6.4 Prediction Fallback (Critical Fix)

Always provide closure:

| Input Quality | Display |
|--------------|---------|
| Strong match | Bar chart with winner: `"bells" (99%)` |
| Partial match | Bar chart with lower confidence: `"a" (45%)` |
| No match | Friendly message: "I couldn't predict this — try a common phrase!" |

### 6.5 Mobile DNA Layout — DEPRECATED

> **⚠️ SUPERSEDED:** See §6.6 "Vertical Accordion Stack" for the current mobile DNA pattern.
> The horizontal scroll pattern below is deprecated as of 2026-02-03 UAT.

~~**Single-card-per-screen (horizontal):**~~

```
[DEPRECATED — see §6.6 for vertical stack pattern]
```

---

### 6.6 Vertical Accordion Stack (V2 — Ratified 2026-02-03) 🆕

> **Source:** UAT Feb 2026 + Expert Panel (Mobile UX, Interaction Design, Cognitive Psychology)
> **Ref:** `docs/technical/DNA_VERTICAL_CARD_SPECIFICATION.md` for implementation details

**Rationale:** Vertical scrolling is the most natural mobile gesture (10x more frequent than horizontal). The accordion pattern keeps context visible, reduces cognitive load, and aligns with the tree metaphor (growing "downward" into deeper understanding).

#### 6.6.1 Layout Structure

```
┌──────────────────────────────────────┐
│ FIXED HEADER (always visible)        │
│ ┌──────────────────────────────────┐ │
│ │ [💫] Type any text...       [▶]  │ │  ← Input field
│ └──────────────────────────────────┘ │
│ [T] [V] [A] [P]  •  Step 2 of 4     │  ← Progress + breadcrumbs
├──────────────────────────────────────┤
│                                      │
│ SCROLLABLE VERTICAL STACK            │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ ✅ TOKENIZATION                   │ │
│ │ "Text tokenized! 5 pieces."      │ │  ← Collapsed (completed)
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ ● VECTORIZATION ─────────────────│ │
│ │                                  │ │
│ │     [VectorMap Visualization]    │ │  ← Expanded (active)
│ │                                  │ │
│ │  "Words become GPS coordinates"  │ │
│ │                                  │ │
│ │  ┌────────────┐ ┌────────────┐  │ │
│ │  │ 📖 Deeper  │ │ ⏭️ Next    │  │ │
│ │  └────────────┘ └────────────┘  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 🔒 ATTENTION                     │ │
│ │ "Connect the dots" (locked)      │ │  ← Locked (upcoming)
│ └──────────────────────────────────┘ │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │ 🔒 PREDICTION                    │ │
│ │ "Guess the next word" (locked)   │ │  ← Locked (upcoming)
│ └──────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

#### 6.6.2 Card States

| State | Visual | Behavior |
|-------|--------|----------|
| **Locked** | Grayed out, 🔒 icon, "locked" label | Tap does nothing (or shows hint) |
| **Active** | Full height, colored border, visualization visible | Tap "Next" advances, tap "Deeper" opens bottom sheet |
| **Collapsed** | Minimal height, ✅ icon, summary text | Tap re-expands for review |

#### 6.6.3 Interaction Flow

1. **Initial state:** First card (Tokenization) active, others locked
2. **User types text, presses ▶:** Simulation starts, tokenization animates
3. **Step completes:** Card auto-collapses with summary, next card expands
4. **Tap collapsed card:** Re-expands for review (doesn't restart simulation)
5. **Tap "📖 Deeper":** Opens bottom sheet (not full navigation)
6. **Tap "⏭️ Next":** Manual advance to next step

#### 6.6.4 Bottom Sheet for Deep Dive

Instead of navigating away from DNA, "Deeper" opens a draggable bottom sheet:

```
┌──────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓ (dimmed background) ▓▓▓▓▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
├──────────────────────────────────────┤
│ ┌──────────────────────────────────┐ │
│ │ ━━━━━ (drag handle) ━━━━━        │ │
│ │                                  │ │
│ │    VECTORIZATION DEEP DIVE       │ │  ← Bottom Sheet
│ │                                  │ │
│ │  Every word gets a GPS coord...  │ │
│ │                                  │ │
│ │  💡 Metaphor: "Like giving each  │ │
│ │     word a seat in a theater"    │ │
│ │                                  │ │
│ │  [Resume ▶]     [Go to Seed →]   │ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Bottom sheet behavior:**
- Snap points: 50%, 85%, 95% of screen
- Swipe down to dismiss
- "Resume" closes sheet, continues simulation
- "Go to Seed" navigates to `/seed` (deep concept exploration)

#### 6.6.5 Benefits (Expert Panel Validation)

| Perspective | Benefit |
|-------------|---------|
| **Mobile UX** | Thumb zone optimized, natural vertical scroll |
| **Interaction Design** | Accordion pattern = clear state, one focus |
| **Cognitive Psychology** | Progress visible, reduces working memory load |
| **Tree Metaphor** | Growing "downward" = deeper understanding |

#### 6.6.6 Desktop Behavior

On desktop (≥1024px), the vertical stack can optionally switch to a 2x2 or 1x4 grid, but the accordion behavior (one expanded at a time) remains. Fixed header stays at top.

---

### 6.7 DNA Orientation & Empty States 🆕

> **Source:** UAT Feb 2026 — "No orientation before typing" finding
> **Principle:** §1.3 "Closure at Every Step"

#### 6.7.1 Before Simulation Starts

When user lands on `/dna` with no input:

```
┌──────────────────────────────────────┐
│ [💫] Type anything to begin...  [▶] │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────────┐│
│  │      💡 HOW THIS WORKS           ││
│  │                                  ││
│  │  Type any text above and press   ││
│  │  ▶ to see how AI reads it.       ││
│  │                                  ││
│  │  Watch your words transform      ││
│  │  through 4 steps: T → V → A → P  ││
│  │                                  ││
│  │  Try: "The king wore a crown"    ││
│  └──────────────────────────────────┘│
│                                      │
│ ┌────────────────────────────────────┐
│ │ 🔒 T: Tokenization (locked)        │
│ │ 🔒 V: Vectorization (locked)       │
│ │ 🔒 A: Attention (locked)           │
│ │ 🔒 P: Prediction (locked)          │
│ └────────────────────────────────────┘
└──────────────────────────────────────┘
```

**Key elements:**
- **Orientation card** in place of active step explaining what to do
- **All 4 step cards locked** with preview labels
- **Example prompt** to reduce blank-page anxiety

#### 6.7.2 Translation Keys Needed

```json
{
  "dna": {
    "orientation": {
      "title": "How This Works",
      "instruction": "Type any text above and press ▶ to see how AI reads it.",
      "description": "Watch your words transform through 4 steps: T → V → A → P",
      "example": "Try: \"The king wore a crown\""
    },
    "locked": {
      "tokenization": "Tokenization (locked)",
      "vectorizing": "Vectorization (locked)",
      "attention": "Attention (locked)",
      "prediction": "Prediction (locked)"
    }
  }
}
```

---

## 7. Sprout Level — Deep Dive

### 7.1 The Four Fundamentals

```
┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐
│ 🌡️      │  │ 📝      │  │ 🎭      │  │ 📚      │
│ Temp.   │→→│ Instruct│→→│ Role    │→→│ Context │
│         │  │         │  │         │  │         │
│Creative │  │ Clear   │  │ Persona │  │ Examples│
│vs Safe  │  │ Request │  │ + Voice │  │ + Facts │
└─────────┘  └─────────┘  └─────────┘  └─────────┘
```

### 7.2 RICE Framework

```
R - Role        "You are a helpful writing assistant..."
I - Instruction "Write a professional email..."
C - Context     "The recipient is my manager..."
E - Examples    "Here's an example of the tone I want..."
```

### 7.3 Interactive Demos

| Card | Demo Type | Interaction |
|------|-----------|-------------|
| Temperature | Slider | Drag to see output variability |
| Instructions | Before/After | Toggle to compare clarity |
| Roles | Comparison | Same prompt, different roles |
| Context | With/Without | See quality difference |

### 7.4 Success Criteria

User can write a prompt that includes:
- Appropriate role
- Clear instruction
- Relevant context
- Gets consistently good results

---

## 8. Tree Level — Deep Dive

### 8.1 Card-Based TreeExplorer (Replaces D3)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [GlobalNav]                                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Breadcrumb: AI > Neural Networks > Transformers                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  Level Tabs: [🌱 Roots] [🌲 Trunk] [🌿 Branches] [🍃 Leaves]                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                    │
│  │ 🧠       │  │ 🔗       │  │ 📊       │  │ 🤖       │                    │
│  │ RAG      │  │ Embed-   │  │ Fine-    │  │ Agents   │                    │
│  │          │  │ dings    │  │ tuning   │  │          │                    │
│  │ 2020     │  │ 2018     │  │ 2019     │  │ 2023     │                    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Level progress indicator]                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Tree Node Card Treatment

Each tree node uses `UnifiedConceptCard` with:
- **Motif emoji** (not GlowingNode)
- **Year badge** when available
- **Level color** (roots=emerald, trunk=amber, branches=blue, leaves=purple)
- **Click opens UnifiedLightbox** with explanation, metadata, connections

### 8.3 Navigation Model

- **Level tabs** filter the grid
- **Breadcrumb** shows hierarchy
- **Card click** → opens lightbox
- **"See children"** in lightbox → filters to child nodes

### 8.4 D3 Graph Status

**Decision:** Keep D3 as optional "technical view" toggle, but default to card-based explorer.

---

## 9. Fruits & Orchard Levels

### 9.1 Fruits — Applications

| Category | Icon | Examples |
|----------|------|----------|
| **Writing** | ✍️ | Blog posts, emails, documentation, code |
| **Analysis** | 🔍 | Research, data analysis, summarization |
| **Automation** | ⚡ | Workflows, repetitive tasks, reporting |
| **Creative** | 🎨 | Images, audio, brainstorming |
| **Assistant** | 🤝 | Customer service, sales, onboarding |
| **Learning** | 📚 | Tutoring, training, skill development |

### 9.2 Orchard — Specialization Paths

| Path | Icon | Description | Key Skills |
|------|------|-------------|------------|
| **AI Instructor** | 🎓 | Teaches others to use AI | Pedagogy, communication |
| **AI Automator** | ⚡ | Builds automated workflows | Zapier, Make, APIs |
| **AI Analyst** | 📊 | Extracts insights from data | RAG, research |
| **AI Creator** | ✍️ | Produces content with AI | Prompting, editing |
| **AI Developer** | 🔧 | Builds custom AI applications | Agents, coding |
| **AI Operator** | 🎮 | Manages and optimizes AI systems | Monitoring, QA |

### 9.3 AI Operator (Emerging Role)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  🎮 AI OPERATOR — The Emerging Role                                         │
│                                                                             │
│  As organizations deploy more AI systems, they need people who can          │
│  keep them running smoothly. Like DevOps, but for AI.                       │
│                                                                             │
│  Responsibilities:                                                          │
│  • Monitor AI system performance and reliability                            │
│  • Manage prompt libraries and versions                                     │
│  • Track and optimize AI costs (tokens, API calls)                          │
│  • Ensure output quality and consistency                                    │
│  • Handle edge cases and failures                                           │
│  • Coordinate between AI tools and business processes                       │
│                                                                             │
│  This role doesn't exist widely yet, but will become essential.             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Mobile-First Implementation

### 10.1 Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Thumb Zone** | Primary actions in bottom 40% of screen |
| **Single Focus** | One card per screen on mobile |
| **Swipe Navigation** | Left/right to navigate siblings |
| **Bottom Sheet** | All detail views as draggable sheets |
| **Fixed Input** | Text input always accessible (DNA) |
| **48px Targets** | Minimum touch target size |

### 10.2 Responsive Breakpoints

```css
/* Mobile first */
.card-grid {
  grid-template-columns: 1fr;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### 10.3 DNA Mobile Layout

```
┌─────────────────────┐
│ [Fixed Input Bar]   │  ← Compact, always visible
│ [T] [V] [A] [P]     │  ← Step selector
├─────────────────────┤
│                     │
│  ┌───────────────┐  │
│  │               │  │
│  │  ACTIVE CARD  │  │  ← Full viewport card
│  │   (only one)  │  │
│  │               │  │
│  │ [Visualization]│  │
│  │               │  │
│  │ [Deep Dive →] │  │
│  │               │  │
│  └───────────────┘  │
│                     │
├─────────────────────┤
│ [Progress: ●○○○○]   │
└─────────────────────┘

Swipe ← → to navigate steps
```

---

## 11. Program Integration

### 11.1 Where Programs Appear

Programs appear **only in the Orchard level**, connected to specialization paths:

```
/paths/instructor  →  "Want to teach professionally?"  →  /programs/aiki
/paths/automation  →  "Want to automate workflows?"   →  /programs/aivo
/paths/*           →  "Want complete mastery?"        →  /programs/aime
```

### 11.2 CTA Strategy

| Level | CTA | Destination |
|-------|-----|-------------|
| DNA | "Understand more?" | Next DNA step or Sprout |
| Sprout | "Master these skills?" | Tree level |
| Tree | "Apply this knowledge?" | Fruits level |
| Fruits | "Where can this lead?" | Orchard level |
| Orchard | "Ready to go pro?" | Programs |

### 11.3 Contextual CTAs

After completing DNA:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ✅ DNA Complete!                                                           │
│                                                                             │
│  You understand how AI works. What's next?                                  │
│                                                                             │
│  [🌱 Learn to Communicate → Sprout]   [🌳 Explore Technologies → Tree]     │
│                                                                             │
│  Want to teach others? [Explore AI Instructor path →]                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Implementation Phases

### Phase 1: Critical Fixes (Week 1)

| # | Task | Priority |
|---|------|----------|
| 1.1 | Tokenization numbering sub-stages | P0 |
| 1.2 | Vector matrix intermediate state | P0 |
| 1.3 | Prediction fallback message | P0 |
| 1.4 | Mobile single-card DNA layout | P0 |
| 1.5 | Fixed mobile input bar | P0 |

### Phase 2: Unified Components (Week 2)

| # | Task | Priority |
|---|------|----------|
| 2.1 | Create `UnifiedConceptCard` | P0 |
| 2.2 | Create `UnifiedLightbox` | P0 |
| 2.3 | Migrate DNA cards | P1 |
| 2.4 | Migrate landing page cards | P1 |
| 2.5 | Replace MicroLesson | P1 |
| 2.6 | Replace TreeDetailPanel | P1 |

### Phase 3: Sprout Level (Week 3)

| # | Task | Priority |
|---|------|----------|
| 3.1 | Create `/learn/basics` route | P0 |
| 3.2 | Temperature demo | P1 |
| 3.3 | Instructions comparison | P1 |
| 3.4 | Roles demo | P1 |
| 3.5 | Context demo | P1 |

### Phase 4: Tree Level Rewrite (Week 4)

| # | Task | Priority |
|---|------|----------|
| 4.1 | Create `TreeExplorer` component | P0 |
| 4.2 | Level tabs (Roots/Trunk/Branches/Leaves) | P0 |
| 4.3 | Breadcrumb navigation | P1 |
| 4.4 | Wire up UnifiedLightbox | P1 |
| 4.5 | Optional D3 minimap toggle | P2 |

### Phase 5: Fruits & Orchard (Week 5-6)

| # | Task | Priority |
|---|------|----------|
| 5.1 | Create `/applications` routes | P1 |
| 5.2 | Create `/paths` routes | P1 |
| 5.3 | Connect to programs | P1 |
| 5.4 | Specialization self-assessment | P2 |

### Phase 6: Polish (Ongoing)

| # | Task | Priority |
|---|------|----------|
| 6.1 | Level transition animations | P2 |
| 6.2 | Progress tracking | P2 |
| 6.3 | Achievement system | P3 |
| 6.4 | Community features | P3 |

---

## 13. File Architecture

### 13.1 New Files to Create

```
components/
├── ui/
│   ├── UnifiedConceptCard.tsx      ← NEW
│   └── UnifiedLightbox.tsx         ← NEW
├── tree/
│   └── TreeExplorer.tsx            ← NEW (replaces TreeView)
└── levels/
    ├── LevelProgress.tsx           ← NEW
    └── LevelTransition.tsx         ← NEW

app/[locale]/
├── learn/
│   ├── basics/                     ← NEW (Sprout)
│   │   ├── page.tsx
│   │   └── [topic]/page.tsx
│   └── techniques/                 ← NEW (Tree)
│       ├── page.tsx
│       └── [topic]/page.tsx
├── applications/                   ← NEW (Fruits)
│   ├── page.tsx
│   └── [category]/page.tsx
└── paths/                          ← NEW (Orchard)
    ├── page.tsx
    └── [path]/page.tsx
```

### 13.2 Files to Modify

| File | Change |
|------|--------|
| `components/dna/TokenizationSlicer.tsx` | Add stages 4-5 (numbering, vectorPreview) |
| `components/dna/VectorMap.tsx` | Add matrix intermediate state |
| `components/dna/PredictionBarChart.tsx` | Add fallback UI |
| `components/dna/DNAView.tsx` | Mobile single-card layout |
| `components/dna/DNAInput.tsx` | Compact fixed-top mode |

### 13.3 Files to Deprecate

| File | Replaced By | Action |
|------|-------------|--------|
| `components/tree/TreeView.tsx` | `TreeExplorer` | Keep as optional toggle |
| `components/tree/TreeDetailPanel.tsx` | `UnifiedLightbox` | Delete |
| `components/dna/MicroLesson.tsx` | `UnifiedLightbox` | Delete |

---

## 14. Open Questions & Decisions

### 14.1 Resolved Decisions

| Question | Decision | Rationale |
|----------|----------|-----------|
| RAG location | Tree (technology) | It's a technique, not an application |
| Seed level | Merged into Sprout | Reduces navigation complexity |
| Forest level | Merged into Orchard | Ecosystem = career community |
| D3 tree view | Keep as toggle | Some users may prefer technical view |
| Program placement | Orchard only | Training after awareness |

### 14.2 Open for Discussion

| Question | Options | Recommendation |
|----------|---------|----------------|
| Token IDs | Real BPE IDs vs random | Real IDs for authenticity |
| Transition animations | Simple fades vs elaborate morphs | Start simple, enhance later |
| Sprout foundational concepts | 4 vs 6 concepts | 4 (matches DNA pattern) |
| D3 minimap in TreeExplorer | Include vs omit | Include as optional toggle |
| Completion tracking | Local vs Supabase | Supabase for cross-device sync |

### 14.3 Needs User Testing

- Single-card mobile DNA layout
- Bottom sheet vs modal lightbox
- Level tab navigation in TreeExplorer
- Specialization self-assessment quiz

---

## Appendix A: Translation Keys Needed

```json
{
  "dna": {
    "tokenization": {
      "numbering": "Each word gets a library card number",
      "vectorPreview": "Numbers become map coordinates"
    },
    "prediction": {
      "noResult": "Hmm, I couldn't confidently predict the next word.",
      "trySuggestion": "Try a common phrase like 'The king wore a...'"
    }
  },
  "levels": {
    "dna": "DNA",
    "sprout": "Sprout",
    "tree": "Tree",
    "fruits": "Fruits",
    "orchard": "Orchard"
  },
  "treeExplorer": {
    "tabs": {
      "roots": "Roots",
      "trunk": "Trunk",
      "branches": "Branches",
      "leaves": "Leaves"
    }
  },
  "paths": {
    "instructor": "AI Instructor",
    "automator": "AI Automator",
    "analyst": "AI Analyst",
    "creator": "AI Creator",
    "developer": "AI Developer",
    "operator": "AI Operator"
  }
}
```

---

## Appendix B: Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Program Architecture | `/mnt/project/AI_EDUCATOR_PROGRAM_ARCHITECTURE_v1_0.md` | AIKI curriculum |
| Sales Materials Guide | `/mnt/project/AI_INSTRUCTOR_SALES_MATERIALS_GUIDE_v1_0.md` | Marketing content |
| Marketing Integration | `docs/MARKETING_INTEGRATION_ARCHITECTURE.md` | Program landing pages |
| Curriculum Bundle | `/mnt/project/curriculum_bundle_ai_meister_est.md` | AIME curriculum |

---

## Appendix C: Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-31 | Claude | Initial synthesis of all architectural documents |

---

**Document Status:** CANONICAL — Single Source of Truth  
**Review Cycle:** Monthly or after major feature releases  
**Owner:** Dendrix.ai Product Team

---

*"Every tree was once a seed that decided to grow."*
