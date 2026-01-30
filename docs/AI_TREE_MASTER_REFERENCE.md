# 🌱 AI-Tree Master Reference & Growth Backlog
## DNA → Seeme → Võrs → Noor Puu → Vanem Puu

> **Version:** 1.0  
> **Created:** 2026-01-30  
> **Authors:** Claude + Alek  
> **Purpose:** Single source of truth for all agents and swarms working on ai-tree transformation

---

## 📋 Document Structure

1. [Vision & Philosophy](#1-vision--philosophy)
2. [AI DNA Core Concepts](#2-ai-dna-core-concepts)
3. [Current State Analysis](#3-current-state-analysis)
4. [Growth Stages Overview](#4-growth-stages-overview)
5. [Stage 1: DNA (Fundamental Components)](#5-stage-1-dna---fundamental-components)
6. [Stage 2: Seeme (Seed)](#6-stage-2-seeme---seed)
7. [Stage 3: Võrs (Sprout)](#7-stage-3-võrs---sprout)
8. [Stage 4: Noor Puu (Young Tree)](#8-stage-4-noor-puu---young-tree)
9. [Stage 5: Vanem Puu (Mature Tree)](#9-stage-5-vanem-puu---mature-tree)
10. [Technical Architecture](#10-technical-architecture)
11. [Agent Assignment Matrix](#11-agent-assignment-matrix)
12. [Quality Gates](#12-quality-gates)
13. [Appendices](#13-appendices)

---

## 1. Vision & Philosophy

### 1.1 Core Vision

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   "Kasutaja arusaam AI-st kasvab nagu puu -                            │
│    alates DNA-st, läbi seemne, võrse, kuni täiskasvanud puuni."         │
│                                                                         │
│   "User's understanding of AI grows like a tree -                       │
│    from DNA, through seed, sprout, to mature tree."                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Design Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Kasvav arusaam** | Knowledge grows organically | Progressive disclosure, unlock by learning |
| **Lihtne → Keeruline** | Simple to complex | DNA view first, tree view for depth |
| **Visuaalne → Tehniline** | Visual before technical | Metaphors, diagrams, then code |
| **Aktiivne õpe** | Active learning | Demos, exercises, not just reading |
| **Isiklik tempo** | Personal pace | No time limits, save progress |

### 1.3 Target Users

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   PRIMARY USERS (Prioritized):                                          │
│                                                                         │
│   1. 🎓 ADULT LEARNERS (Career Reskilling)                              │
│      - Professionals wanting AI literacy                                │
│      - Time-constrained, need efficient paths                           │
│      - ~2 hours total investment target                                 │
│                                                                         │
│   2. 👨‍🏫 AI INSTRUCTORS (Training Programs)                              │
│      - Need structured curriculum                                       │
│      - Require teaching materials                                       │
│      - Want shareable concept links                                     │
│                                                                         │
│   3. 👨‍💻 DEVELOPERS (Practical Application)                               │
│      - Already technical, need AI specifics                             │
│      - Want code examples                                               │
│      - Value technical depth                                            │
│                                                                         │
│   4. 🌍 GENERAL PUBLIC (AI Awareness)                                   │
│      - Curious about AI                                                 │
│      - No technical background                                          │
│      - Need metaphor-first approach                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. AI DNA Core Concepts

### 2.1 The DNA Model: T-V-A-P

The fundamental model of how modern LLMs work, expressed as 4 "nucleotides":

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│    TEKST  ──→  [T]  ──→  [V]  ──→  [A]  ──→  [P]  ──→  TEKST           │
│    (kest)       │        │        │        │       (kest)               │
│              Tokenid  Vektorid  Attention  Prediction                   │
│                 │        │        │        │                            │
│              "Lõika"  "Kaardista" "Seosta" "Ennusta"                    │
│                                                                         │
│    ─────────────────────────────────────────────────────────────────    │
│                                                                         │
│    VÄRVIKOOD:                                                           │
│    🔴 T = #ef4444 (punane)    - Tokeniseerimine                        │
│    🟢 V = #22c55e (roheline)  - Vektorid/Embeddings                    │
│    🔵 A = #3b82f6 (sinine)    - Attention mehhanism                    │
│    🟣 P = #a855f7 (lilla)     - Prediction/Ennustus                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 DNA Component Details

#### 🔴 T - Tokeniseerimine (Tokenization)

| Aspect | Value |
|--------|-------|
| **Küsimus** | Kuidas teksti lugeda? |
| **Metafoor** | Silmad / LEGO klotsid |
| **Funktsioon** | Muudab teksti numbriteks |
| **Visualisatsioon** | Tokenizer Demo (exists) |
| **Seotud kontseptid** | `tokens`, `prefill-decode`, `context-windows` |
| **Interaktiivne demo** | ✅ Olemas |

#### 🟢 V - Vektorid (Embeddings)

| Aspect | Value |
|--------|-------|
| **Küsimus** | Mis see tähendab? |
| **Metafoor** | GPS koordinaadid / Tähenduste kaart |
| **Funktsioon** | Annab tähenduse matemaatilise aadressi |
| **Visualisatsioon** | Vector Demo (exists) |
| **Seotud kontseptid** | `vectors`, `rag`, `memory` |
| **Interaktiivne demo** | ✅ Olemas |

#### 🔵 A - Attention (Tähelepanu)

| Aspect | Value |
|--------|-------|
| **Küsimus** | Millised sõnad on seotud? |
| **Metafoor** | Taskulamp pimedas toas |
| **Funktsioon** | Leiab seosed kontekstis |
| **Visualisatsioon** | AttentionSVG (exists) |
| **Seotud kontseptid** | `attention`, `transformers`, `context-engineering` |
| **Interaktiivne demo** | 🔲 Puudub (P2) |

#### 🟣 P - Prediction (Ennustus)

| Aspect | Value |
|--------|-------|
| **Küsimus** | Mis tuleb järgmisena? |
| **Metafoor** | Arvaja |
| **Funktsioon** | Arvutab tõenäosusjaotuse |
| **Visualisatsioon** | TemperatureSVG (partial) |
| **Seotud kontseptid** | `temperature-sampling`, `hallucinations`, `prompting-basics` |
| **Interaktiivne demo** | 🔲 Puudub (P2) |

### 2.3 DNA → Puu Kaardistus

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   DNA KOMPONENT          AI-TREE TASE         KONTSEPTID                │
│   ══════════════         ═══════════          ══════════                │
│                                                                         │
│   🔴 T (Tokenid)     ──→  🌱 JUURED       ──→  tokens, prefill          │
│                           (Fundamentaalid)     context-windows          │
│                                                                         │
│   🟢 V (Vektorid)    ──→  🌲 TÜVI        ──→  rag, memory               │
│                           (Inseneeria)        context-eng               │
│                                                                         │
│   🔵 A (Attention)   ──→  🌿 OKSAD       ──→  ai-agents                 │
│                           (Rakendused)        mcp, function-calling     │
│                                                                         │
│   🟣 P (Prediction)  ──→  🍃 LEHED       ──→  reasoning-models          │
│                           (Trendid)           moe, agi-asi              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Current State Analysis

### 3.1 Existing Assets Inventory

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| **Core UI** | 18 | ✅ Stable | LevelSection, ConceptCard, etc. |
| **Mobile** | 7 | ✅ Stable | ConceptBottomSheet, tabs |
| **Visuals (SVG)** | 21 | ✅ Translated | All concepts have visuals |
| **Demos** | 2 | ✅ Working | TokenizerDemo, VectorDemo |

### 3.2 Content (23 concepts)

| Level | Concepts | Status |
|-------|----------|--------|
| **Roots (4)** | tokens, vectors, attention, transformers | ✅ Complete |
| **Trunk (7)** | prefill-decode, context-windows, hallucinations, temperature-sampling, prompting-basics, context-engineering, training-vs-inference | ✅ Complete |
| **Branches (6)** | rag, memory, lora, security, function-calling, complexity-levels | ✅ Complete |
| **Leaves (6)** | moe, agi-asi, green-ai, reasoning-models, ai-agents, mcp | ✅ Complete |

### 3.3 Gap Analysis

```
┌─────────────────────────────────────────────────────────────────────────┐
│ WHAT EXISTS                      │ WHAT'S MISSING                       │
├──────────────────────────────────┼──────────────────────────────────────┤
│ ✅ Tree View (full hierarchy)    │ 🔲 DNA View (linear T→V→A→P)         │
│ ✅ Concept popups with tabs      │ 🔲 DNA-first landing option          │
│ ✅ Tokenizer Demo                │ 🔲 Attention Demo                    │
│ ✅ Vector Demo                   │ 🔲 Prediction Demo                   │
│ ✅ 21 SVG visuals                │ 🔲 DNA component visuals             │
│ ✅ Progress tracking             │ 🔲 DNA-based progress                │
│ ✅ Skill selector (3 paths)      │ 🔲 DNA path option                   │
│ ✅ i18n infrastructure           │ 🔲 English concept content           │
│ ✅ Learning paths page           │ 🔲 DNA-integrated paths              │
└──────────────────────────────────┴──────────────────────────────────────┘
```

---

## 4. Growth Stages Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                         GROWTH STAGES                                   │
│                                                                         │
│   Stage 1        Stage 2       Stage 3        Stage 4        Stage 5   │
│   ════════       ════════      ════════       ════════       ════════  │
│                                                                         │
│      🧬            🌱             🌿            🌳              🌲       │
│      DNA          SEEME          VÕRS        NOOR PUU      VANEM PUU   │
│                                                                         │
│   Fundamental    Basic UI      First        First          Full        │
│   Concepts       Components    Growth       Fruits         Maturity    │
│                                                                         │
│   ──────────────────────────────────────────────────────────────────   │
│                                                                         │
│   Timeline:                                                             │
│   Week 1-2      Week 3-4      Week 5-6      Week 7-10     Week 11+    │
│                                                                         │
│   Effort:                                                               │
│   20h           30h           40h           60h            80h+        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Stage Summary

| Stage | Name | Goal | Key Deliverable | Total Hours |
|-------|------|------|-----------------|-------------|
| 1 | DNA | Define fundamentals | AI_DNA_ARCHITECTURE.md | 20h |
| 2 | Seeme | Basic DNA UI | DNAView component | 30h |
| 3 | Võrs | Interactive growth | DNA demos + linking | 40h |
| 4 | Noor Puu | First integration | DNA ↔ Tree navigation | 60h |
| 5 | Vanem Puu | Full maturity | Complete learning ecosystem | 80h+ |

---

## 5. Stage 1: DNA - Fundamental Components

> **Status:** ✅ Complete  
> **Timeline:** Week 1-2  
> **Total Effort:** 20h

### 5.1 Deliverables

| ID | Deliverable | Status | Owner |
|----|-------------|--------|-------|
| DNA-001 | AI_DNA_ARCHITECTURE.md | ✅ Done | researcher |
| DNA-002 | DNA component TypeScript types | 🔲 Todo | architect |
| DNA-003 | DNA color palette CSS vars | 🔲 Todo | designer |
| DNA-004 | DNA → Tree mapping data | 🔲 Todo | coder |
| DNA-005 | UX wireframes for DNA view | 🔲 Todo | designer |

---

## 6. Stage 2: Seeme (Seed)

> **Status:** 🔲 Not Started  
> **Timeline:** Week 3-4  
> **Total Effort:** 30h

### 6.1 User Stories

| ID | Story | Priority | Effort |
|----|-------|----------|--------|
| SEEME-001 | As a user, I want to see the DNA view option on landing | P0 | 4h |
| SEEME-002 | As a user, I want to see T→V→A→P linear flow | P0 | 8h |
| SEEME-003 | As a user, I want to click each DNA component | P0 | 4h |
| SEEME-004 | As a user, I want to see component details on click | P0 | 6h |
| SEEME-005 | As a user, I want to switch between DNA and Tree views | P1 | 4h |
| SEEME-006 | As a user, I want DNA progress tracking | P1 | 4h |

### 6.2 Component Structure

```
components/
├── dna/
│   ├── DNAView.tsx              # Main DNA view container
│   ├── DNAFlowDiagram.tsx       # T→V→A→P flow visualization
│   ├── DNAComponentCard.tsx     # Individual component card
│   ├── DNAStepIndicator.tsx     # Progress indicator
│   ├── DNAShell.tsx             # Text input/output shell
│   └── index.ts
├── landing/
│   ├── ViewSelector.tsx         # DNA vs Tree selector
│   └── index.ts
```

---

## 7. Stage 3: Võrs (Sprout)

> **Status:** 🔲 Not Started  
> **Timeline:** Week 5-6  
> **Total Effort:** 40h

### 7.1 User Stories

| ID | Story | Priority | Effort |
|----|-------|----------|--------|
| VÕRS-001 | As a user, I want an interactive input box to try DNA flow | P0 | 8h |
| VÕRS-002 | As a user, I want to see live tokenization of my input | P0 | 4h |
| VÕRS-003 | As a user, I want to see attention visualization | P1 | 12h |
| VÕRS-004 | As a user, I want to see prediction probabilities | P1 | 8h |
| VÕRS-005 | As a user, I want "Dive deeper" to link to tree concepts | P0 | 4h |
| VÕRS-006 | As a user, I want breadcrumbs showing DNA→Tree path | P1 | 4h |

### 7.2 New Demo Components

| Component | Purpose | Priority | Effort |
|-----------|---------|----------|--------|
| AttentionDemo.tsx | Attention heatmap visualization | P1 | 12h |
| PredictionDemo.tsx | Probability distribution display | P1 | 8h |
| DNAInteractiveFlow.tsx | Combined interactive demo | P0 | 8h |

---

## 8. Stage 4: Noor Puu (Young Tree)

> **Status:** 🔲 Not Started  
> **Timeline:** Week 7-10  
> **Total Effort:** 60h

### 8.1 User Stories

| ID | Story | Priority | Effort |
|----|-------|----------|--------|
| NOOR-001 | As a user, I want seamless navigation between DNA and Tree | P0 | 8h |
| NOOR-002 | As a user, I want DNA progress to reflect in Tree progress | P0 | 6h |
| NOOR-003 | As a user, I want DNA concepts highlighted in Tree view | P0 | 4h |
| NOOR-004 | As a user, I want "DNA Path" in Learning Paths | P0 | 6h |
| NOOR-005 | As a user, I want DNA component detail pages | P1 | 12h |
| NOOR-006 | As a user, I want DNA quizzes | P2 | 16h |
| NOOR-007 | As a user, I want completion certificates | P2 | 8h |

---

## 9. Stage 5: Vanem Puu (Mature Tree)

> **Status:** 🔲 Not Started  
> **Timeline:** Week 11+  
> **Total Effort:** 80h+

### 9.1 User Stories

| ID | Story | Priority | Effort |
|----|-------|----------|--------|
| VANEM-001 | As an instructor, I want to export DNA materials as PDF | P1 | 16h |
| VANEM-002 | As a user, I want personalized learning recommendations | P2 | 20h |
| VANEM-003 | As a user, I want gamification (badges, streaks) | P2 | 16h |
| VANEM-004 | As a user, I want collaborative learning (share progress) | P2 | 20h |
| VANEM-005 | As an admin, I want content management system | P3 | 40h |
| VANEM-006 | As a user, I want offline mode (PWA) | P3 | 24h |

---

## 10. Technical Architecture

### 10.1 File Structure (Target State)

```
ai-tree/
├── app/
│   └── [locale]/
│       ├── page.tsx                 # Landing with ViewSelector
│       ├── dna/
│       │   ├── page.tsx             # DNA View
│       │   └── [componentId]/
│       │       └── page.tsx         # DNA Component Detail
│       ├── tree-view/
│       │   └── page.tsx             # Tree View (existing)
│       ├── concept/
│       │   └── [conceptId]/
│       │       └── page.tsx         # Concept Detail (existing)
│       └── learn/
│           ├── page.tsx             # Learning Paths
│           └── dna/
│               └── page.tsx         # DNA Learning Path
├── components/
│   ├── dna/                         # NEW
│   │   ├── DNAView.tsx
│   │   ├── DNAFlowDiagram.tsx
│   │   ├── DNAComponentCard.tsx
│   │   ├── DNAInteractiveFlow.tsx
│   │   ├── AttentionDemo.tsx
│   │   ├── PredictionDemo.tsx
│   │   └── index.ts
│   ├── landing/                     # NEW
│   │   ├── ViewSelector.tsx
│   │   └── index.ts
│   ├── mobile/                      # Existing
│   ├── visuals/                     # Existing
│   └── [existing components]
├── lib/
│   ├── dna-types.ts                 # NEW
│   ├── dna-data.ts                  # NEW
│   ├── useDNAProgress.ts            # NEW
│   └── [existing]
├── data/
│   ├── tree-concepts.json           # Existing
│   └── dna-components.json          # NEW
├── styles/
│   └── dna-theme.css                # NEW
└── messages/
    ├── en.json                      # Add DNA keys
    └── et.json                      # Add DNA keys
```

### 10.2 Performance Budget

| Metric | Target | Current | DNA Impact |
|--------|--------|---------|------------|
| LCP | < 2.5s | 1.8s | +0.2s (acceptable) |
| FID | < 100ms | 45ms | +10ms (acceptable) |
| CLS | < 0.1 | 0.05 | No change |
| Bundle Size | < 150KB | 98KB | +20KB (acceptable) |

---

## 11. Agent Assignment Matrix

### 11.1 Stage 2: Seeme (30h)

| Task | Agent Type | Model | Priority |
|------|------------|-------|----------|
| SEEME-001: ViewSelector | coder | sonnet | P0 |
| SEEME-002: DNAFlowDiagram | coder | sonnet | P0 |
| SEEME-003: Click handlers | coder | haiku | P0 |
| SEEME-004: Component details | coder | sonnet | P0 |
| SEEME-005: View switching | coder | haiku | P1 |
| SEEME-006: Progress tracking | coder | haiku | P1 |
| Testing | tester | sonnet | P0 |
| Review | reviewer | sonnet | P0 |

### 11.2 Swarm Configurations

```bash
# Stage 2 Swarm (Small team, tight control)
npx @claude-flow/cli@latest swarm init \
  --topology hierarchical \
  --max-agents 6 \
  --strategy specialized

# Stage 4 Swarm (Larger team, more collaboration)
npx @claude-flow/cli@latest swarm init \
  --topology hierarchical-mesh \
  --max-agents 10 \
  --strategy specialized
```

---

## 12. Quality Gates

### 12.1 Definition of Done (DoD)

Every task must meet ALL criteria:

- [ ] **Functional:** Works as specified
- [ ] **Accessible:** WCAG AA compliant
- [ ] **Responsive:** 320px to 1920px
- [ ] **i18n:** ET + EN translations
- [ ] **Build:** `npm run build` passes
- [ ] **Lint:** `npm run lint` passes
- [ ] **Tests:** Unit tests written and passing
- [ ] **Preview:** Deployed to preview branch
- [ ] **Review:** Code reviewed and approved

### 12.2 Testing Requirements

| Level | Coverage Target | Tools |
|-------|----------------|-------|
| Unit | > 70% | Vitest |
| Integration | Key flows | Vitest + Testing Library |
| E2E | Critical paths | Playwright |
| Accessibility | WCAG AA | axe-core |
| Performance | Lighthouse > 90 | Lighthouse CI |

---

## 13. Appendices

### 13.1 Glossary

| Term | Estonian | Definition |
|------|----------|------------|
| DNA | DNA | The 4 fundamental components of AI (T-V-A-P) |
| Seeme | Seed | Initial state, basic structure |
| Võrs | Sprout | First interactive growth |
| Noor Puu | Young Tree | Integrated system with first features |
| Vanem Puu | Mature Tree | Full ecosystem with all features |
| Kest | Shell | The visible text layer (input/output) |
| Tuum | Core | The internal DNA mechanism |

### 13.2 Color Reference

| Component | Hex | Tailwind | RGB |
|-----------|-----|----------|-----|
| T (Tokens) | #ef4444 | red-500 | 239, 68, 68 |
| V (Vectors) | #22c55e | green-500 | 34, 197, 94 |
| A (Attention) | #3b82f6 | blue-500 | 59, 130, 246 |
| P (Prediction) | #a855f7 | purple-500 | 168, 85, 247 |
| Shell | #6b7280 | gray-500 | 107, 114, 128 |

### 13.3 Related Documents

| Document | Location | Purpose |
|----------|----------|---------|
| BACKLOG.md | /BACKLOG.md | Sprint-level tasks |
| CLAUDE.md | /CLAUDE.md | Agent configuration |
| AI_DNA_ARCHITECTURE.md | /docs/ | DNA model specification |
| tree-concepts.json | /data/ | Concept content |

---

## 📝 Document Maintenance

This document should be updated when:

1. A stage is completed
2. New requirements are discovered
3. Technical decisions change
4. Agent assignments are modified

**Last Updated:** 2026-01-30  
**Next Review:** After Stage 2 completion  
**Owner:** @alek

---

*"Iga suur puu algas väikesest seemnest."*  
*"Every great tree started as a small seed."*
