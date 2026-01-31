# Dendrix.ai Agent Context Primer

**LOAD THIS FIRST.** Then read `docs/VISION_AND_STRATEGY.md`.

## Quick Context

Dendrix.ai is a multilingual AI learning platform (ET+EN). Users learn how AI works through an interactive DNA simulation (T-V-A-P pipeline) and progress through growth stages.

## Ratified Decisions (Non-Negotiable)

| Decision | Verdict |
|----------|---------|
| **Levels** | DNA → Seed → Sprout → Tree → Fruits → Orchard |
| **Theme** | Contextual: DNA=Dark, Tree/Reading=Light |
| **Tree View** | Card-based primary, D3 toggle desktop-only |
| **Input** | DNA=Top fixed, Tree=Bottom floating |
| **Animations** | One hero per step, no ambient, reduced-motion respected |
| **Sprout** | 6 concepts: Tokens, Vectors, Attention, Context Window, Prompting, Hallucination |
| **Final** | Fruits (Applications) → Orchard (Careers/AIKI/AIVO/AIME) |

## Banned Terms

Never use: `Nucleus`, `Forest`, `Seeme`, `Võrs`, `next-intl`

## DNA Model (T-V-A-P)

```
TEXT → [T] → [V] → [A] → [P] → TEXT
       red    green  blue   purple
       #ef4444 #22c55e #3b82f6 #a855f7
       Roots   Trunk  Branches Leaves
```

Order is SACRED. Always T→V→A→P.

## Tech Stack

- Next.js 15 App Router (`app/[locale]/`)
- ParaglideJS for i18n (NOT next-intl)
- Supabase for CMS data
- Framer Motion for animations
- Tailwind CSS
- Vercel deployment

## File Ownership

**Spine files (antigravity only):** DNAContext, DNAView, DNAInput, StageSelector, layout, types

**Parallel-safe:** TokenizationSlicer, VectorMap, AttentionSpotlight, PredictionBarChart, DNAComponentCard, MicroLesson, ConceptCard, mobile/*, messages/*.json

## Memory Namespace

All project context is in `project-truth` namespace:
- `vision-strategy-v2.1` - Full architecture decisions
- `dna-tvap-model` - DNA component details
- `codebase-structure` - File layout
- `agent-protocols` - Rules and constraints
- `quality-gates` - Testing requirements
- `file-ownership-map` - Who can edit what
- `swarm-roles-phase1` - Phase 1 role assignments
- `swarm-roles-phase2` - Phase 2 role assignments
- `backlog-phase-1/2/3` - Task details

## Quality Gates

- DNA View < 100KB bundle
- LCP < 2.5s
- WCAG AA, 48px touch targets
- 100% typed translations ET+EN
- prefers-reduced-motion respected
- Keyboard navigable

## Before Coding

```
1. Read docs/VISION_AND_STRATEGY.md
2. Read docs/AGENT_PROTOCOLS.md
3. Search memory: namespace=project-truth
4. Check .claude-flow/backlog.json for current sprint
5. Verify your file ownership before editing
```
