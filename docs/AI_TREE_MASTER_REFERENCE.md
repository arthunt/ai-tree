# 🌱 AI-Tree Master Reference & Growth Backlog
## DNA → Seeme → Võrs → Noor Puu → Vanem Puu

> **Version:** 2.0 (The "Living Forest" Update)
> **Created:** 2026-01-30
> **Purpose:** Single source of truth for all agents and swarms working on ai-tree transformation

---

## 📋 Document Structure

1.  [Vision: The Living Forest](#1-vision--philosophy)
2.  [AI DNA Core Concepts (T-V-A-P)](#2-ai-dna-core-concepts)
3.  [Architecture: Headless & Dynamic](#3-technical-architecture)
4.  [Design System: "Less is More" & Adaptive](#4-design-system)
5.  [Growth Stages Overview](#5-growth-stages-overview)
6.  [Stage 1: DNA (Fundamental Components)](#6-stage-1-dna---fundamental-components)
7.  [Stage 2: Seeme (Seed)](#7-stage-2-seeme---seed)
8.  [Stage 3: Võrs (Sprout)](#8-stage-3-võrs---sprout)
9.  [Stage 4: Noor Puu (Young Tree)](#9-stage-4-noor-puu---young-tree)
10. [Stage 5: Vanem Puu (Mature Tree)](#10-stage-5-vanem-puu---mature-tree)
11. [Quality Gates](#11-quality-gates)

---

## 1. Vision & Philosophy

### 1.1 Core Vision: The Living Forest
We are moving beyond a static "Tree" metaphor to a **"Living Forest"** ecosystem.
*   **The Tree** is the reference map (Free).
*   **The Trails** are the learning paths (Paid/Premium).
*   **The Forest** adapts to the user's language, culture, and pace.

### 1.2 Design Principles
| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Less is More** | Stunning simplicity. No clutter. | White space, bold typography, subtle motion. |
| **Problem-First** | Adults learn by solving, not memorizing. | "How to build a chatbot" (Trail) vs "What is a Vector" (Tree). |
| **Global First** | 100+ Languages from Day 1. | RTL support, logical CSS properties, dynamic content. |
| **DNA First** | Start with the mechanism (T-V-A-P). | The "DNA View" is the universal entry point. |

---

## 2. AI DNA Core Concepts

### 2.1 The DNA Model: T-V-A-P
The fundamental model of how modern LLMs work, expressed as 4 "nucleotides":

```
    TEKST  ──→  [T]  ──→  [V]  ──→  [A]  ──→  [P]  ──→  TEKST
    (Shell)      │        │        │        │       (Shell)
              Tokens   Vectors  Attention  Prediction
```

*See `docs/AI_DNA_ARCHITECTURE.md` for full details.*

---

## 3. Technical Architecture (The "Headless" Shift)

### 3.1 Stack Decision
*   **Framework:** Next.js 15 (App Router)
*   **i18n Engine:** **ParaglideJS** (Replacing next-intl for scale & type safety).
*   **Content Engine:** **Supabase** (Headless CMS pattern). Tables: `concepts`, `translations`, `paths`.
*   **Database:** Supabase (PostgreSQL).
*   **Migration:** "Strangler Fig" pattern (New features use new stack, legacy features migrated incrementally).

### 3.2 Database Schema (Supabase)
```sql
-- Core Concepts
create table concepts (
  id text primary key, -- 'vectors'
  category text, -- 'dna', 'tree'
  complexity_level int
);

-- Content (100+ Languages)
create table concept_translations (
  concept_id text references concepts(id),
  locale text, -- 'et', 'en', 'ar', 'jp'...
  title text,
  explanation text,
  metaphor text,
  primary key (concept_id, locale)
);
```

### 3.3 Localization Pipeline
1.  **AI Draft:** LLMs generate initial translations for 100 languages.
2.  **Community Guardian:** Trusted users review/approve translations via a specialized portal.
3.  **Dynamic Fetch:** App fetches approved content based on `/[locale]/...`.

---

## 4. Design System: "Less is More"

### 4.1 Aesthetic Direction
*   **Stunning Minimalism:** High-end, gallery-like feel.
*   **Typography:** Adaptive sizing. Large, confident headings. Readable body text.
*   **Motion:** Subtle, meaningful macro-interactions (e.g., DNA flow). No gratuitous animation.
*   **Color:** The 4 DNA colors (Red, Green, Blue, Purple) are the *only* primary accents. Everything else is monochrome (Black/White/Gray).

### 4.2 UI Components
*   **DNA View:** Linear, horizontal scroll (or vertical on mobile).
*   **Tree View:** Organic, non-linear exploration.
*   **Focus Mode:** When learning a concept, everything else fades away.

---

## 5. Growth Stages Overview

```
   Stage 1        Stage 2       Stage 3        Stage 4        Stage 5
   ════════       ════════      ════════       ════════       ════════
      🧬            🌱             🌿            🌳              🌲
     DNA          SEEME          VÕRS        NOOR PUU      VANEM PUU
   
   Architecture   Basic UI      First        First          Full
   & Setup        Components    Growth       Fruits         Maturity
```

---

## 6. Stage 1: DNA - Fundamental Components (Week 1-2)

> **Goal:** Secure the foundation (Paraglide + Supabase + Design System).

| ID | Deliverable | Status |
|----|-------------|--------|
| REF-001 | Design System "Living Forest" (Figma/Code) | ✅ Done |
| TEC-001 | ParaglideJS Init & Config | ✅ Done |
| TEC-002 | Supabase Schema Setup (Concepts/Trans) | ⏳ In Progress |
| DNA-001 | DNA Architecture Doc | ✅ Done |

---

## 7. Stage 2: Seeme - Seed (Week 3-4)

> **Goal:** Build the DNA View using the NEW architecture.

| ID | Story |
|----|-------|
| SEEME-001 | DNA View Selector (Landing Page) |
| SEEME-002 | DNA Linear Flow Component (Paraglide powered) |
| SEEME-003 | Connect DNA View to Supabase Content |

---

## 8. Stage 3: Võrs - Sprout (Refocused: UX Repair)

> **Goal:** Fix the "Rushing River" problem and create a Guided Journey.

| ID | Story | Status |
|----|-------|--------|
| UX-001 | **The Lens** (DNA Control): Slow motion hover, pause on click, micro-lessons. | ✅ Done |
| UX-002 | **The Seed** (Intent Capture): Build/Think/Explore router. | ✅ Done |
| UX-003 | **Guided Paths**: Tree highlighting based on intent. | ✅ Done |
| VÕRS-001 | Interactive DNA Input (Live Tokenization) | ✅ Done |
| VÕRS-002 | DNA Content Population | ✅ Done |
| VÕRS-003 | Tree of Thoughts Population | ✅ Done |

---

## 9. Stage 4: Noor Puu - Young Tree (Next: Content & Scale)

> **Goal:** 100 Languages & First "Paid" Path structure.

| ID | Story |
|----|-------|
| NOOR-001 | AI Translation Pipeline Pilot (10 languages) |
| NOOR-002 | "Guardian" Review Portal (Minimal) |
| NOOR-003 | First "Trail" Definition (Schema) |

---

## 4.3 User Flow Patterns (The UX "Spine")

The application follows a strict **"Understand -> Choose -> Explore"** flow:

1.  **DNA (The Mechanism):**
    *   **The Lens:** Users control time. Hovering slows the simulation. Clicking pauses it for learning.
    *   **Micro-Lessons:** Bite-sized explanations of T-V-A-P.

2.  **Seed (The Intent):**
    *   Users are intercepted before the Tree.
    *   They "Plant their Intent" (Build vs Understand vs Explore).

3.  **Guided Tree (The Map):**
    *   The Tree adapts to the seed.
    *   **Builders:** See Engineering nodes.
    *   **Thinkers:** See Theory nodes.
    *   **Pulse:** A visual beacon guides the first step.
    *   **Explorer:** The full map is always available as a fallback.

---

## 10. Stage 5: Vanem Puu - Mature Tree (Week 11+)

> **Goal:** Freemium Economy & Global Scale.

| ID | Story |
|----|-------|
| VANEM-001 | User Auth (Save Progress) |
| VANEM-002 | Payment Integration (Stripe) |
| VANEM-003 | 100+ Language Rollout |

---

## 11. Quality Gates

*   **Performance:** DNA View < 100KB initial load (Tree-shaken via Paraglide).
*   **Accessibility:** WCAG AA (inc. RTL support).
*   **Type Safety:** 100% Typed Translations.

---

## 12. Collaboration Protocol (Multi-Agent)

### 12.1 Roles
*   **@ANTIGRAVITY (Lead Agent):**
    *   **Focus:** Core Architecture, Complex Business Logic, "Spine" Components, Critical Path.
    *   **Responsibility:** Design decisions, Framework setup, Difficult refactors.
    *   **Locking:** Owns `app/layout.tsx`, `tailwind.config.js`, and core `lib/` until stabilized.

*   **@SWARM (Claude Flow Agents):**
    *   **Focus:** Content Migration, Test Coverage, Optimization, Isolated Features.
    *   **Responsibility:** Scaling content to 100 languages, writing E2E tests, fixing lint/type errors, performance tuning.
    *   **Execution:** Runs in parallel batches via `claude-flow`.

### 12.2 Engagement Rules
1.  **Architecture First:** Swarm waits for @ANTIGRAVITY to define the pattern (e.g., "Here is the `GlowingNode` component"). Swarm then implements it across 50 variations.
2.  **Test Gaps:** While @ANTIGRAVITY builds features, Swarm proactively fills test gaps (`testgaps` worker).
3.  **Content Decoupling:** Content population (Supabase) is fully delegated to Swarm once the Schema is set.
