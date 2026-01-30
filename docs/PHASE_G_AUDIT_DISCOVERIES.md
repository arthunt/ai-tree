# Phase G Audit: Discoveries, Issues & Insights

**Date:** 2026-01-30
**Auditors:** Swarm (Functional Tester) + Antigravity (Architecture Specialist)
**Scope:** Full UX flow, evolutionary stages, DNA interactivity, navigation coherence
**Purpose:** Cross-peer review document

---

## Executive Summary

The Phase G "Evolutionary UX" work delivered strong individual components (4 rich DNA visualizations, LOD system, semantic zoom). However, the **system-level user journey is fragmented**. The DNA flow is linear-only with no backward navigation. Five of seven evolutionary stages lack dedicated pages. There is no guided progression between stages, and the navigation creates dead ends.

**Severity Breakdown:**
- CRITICAL: 4 issues
- HIGH: 6 issues
- MEDIUM: 8 issues
- LOW: 3 issues

---

## 1. DNA Flow Issues

### CRITICAL: Linear-Only Simulation (No Step Selection)

**Location:** `components/dna/DNAContext.tsx:165-174`

The DNA simulation is a one-way conveyor belt. Users can only go forward (`nextStep`) or reset everything (`resetSimulation`). There is **no previous step**, **no step selector**, and **no way to click a card to activate its visualization**.

```
Current: idle → tokenization → vectorizing → attention → prediction → idle
Control: [Play] [Pause] [Next ▶] [Reset ⟳]
Missing: [◀ Prev] [Step 1] [Step 2] [Step 3] [Step 4]
```

**Impact:** A user who wants to revisit the Vector Map after seeing Attention must reset and replay the entire simulation from the beginning.

**Evidence:** `DNAContext.tsx` line 165 — `nextStep` only increments the index. No `prevStep` method exists. `DNAComponentCard.tsx` line 44 — `isActive` is tightly bound to `currentStep === myStep`, making cards inert when not on their step.

---

### CRITICAL: Cards Not Independently Viewable

**Location:** `components/dna/DNAComponentCard.tsx:85-146`

Each card's visualization (TokenizationSlicer, VectorMap, AttentionSpotlight, PredictionBarChart) is **only visible when the simulation step matches that card's index**. Clicking a card opens a MicroLesson overlay — it does NOT show the visualization.

**Impact:** Users cannot freely explore the 4 DNA concepts. The only way to see VectorMap is to play the simulation and wait (or skip) to step 2. This makes the page feel like a "slideshow" rather than an "interactive map."

**Recommendation:** Allow cards to be clicked directly to show their visualization, independent of the simulation state. The simulation should be one way to experience the flow, but not the only way.

---

### HIGH: Simulation Ends Abruptly

**Location:** `DNAContext.tsx:198-200`

When the simulation reaches the `prediction` step and then advances to `idle`, `isPlaying` becomes `false`. The page returns to showing all 4 cards with static description text. There is **no completion screen**, no summary, no "what's next" CTA.

**Impact:** Users hit a dead end. They see the prediction, then... nothing changes. No guidance to explore Seed, Tree, or Learning Paths.

**Recommendation:** Add a completion state with a summary of what was learned and clear CTAs: "Explore the Tree" / "Choose Your Path (Seed)" / "Replay".

---

### HIGH: "Deep Dive" Navigates Away Without Return

**Location:** `components/dna/SeedTransition.tsx:19-27`

The "Deep Dive" button on each DNA card triggers a `router.push()` to `/seed?origin={conceptId}`. This is a **hard navigation** — the simulation state is lost. There is no "back to DNA" flow from the Seed page.

**Impact:** Users exploring DNA who click "Deep Dive" are permanently ejected from the simulation. They must manually navigate back and restart.

---

### MEDIUM: Lens Effect Is Confusing

**Location:** `components/dna/DNAView.tsx:56-57`

The entire page div has `onMouseEnter={() => setPlaybackSpeed(0.1)}` and `onMouseLeave(() => setPlaybackSpeed(0.5)}`. This means hovering anywhere on the page slows the simulation to 10x slower. Moving the mouse out speeds it up to 0.5x.

**Impact:** Users may not understand why the simulation seems frozen when they hover. There's no visual indicator explaining the lens effect. The tooltip at the bottom (`controlHint`) is easy to miss.

---

### MEDIUM: Flow Diagram Not Interactive

**Location:** `components/dna/DNAFlowDiagram.tsx`

The SVG flow lines connecting the 4 cards are purely decorative. They light up as steps progress but cannot be clicked to jump between steps.

**Recommendation:** Make flow segments clickable to jump to that step, reinforcing the "interactive map" metaphor.

---

## 2. Missing Evolutionary Stage Pages

### CRITICAL: Only 2 of 7 Stages Have Dedicated Pages

**Source:** `tasks/evolutionary_ux_backlog.md` defines 7 stages.

| Stage | Name | Dedicated Page | Status |
|-------|------|---------------|--------|
| 0 | DNA (Mechanics) | `/dna` | EXISTS |
| 1 | Seed (Potential) | `/seed` | EXISTS |
| 2 | Sprout (History) | — | MISSING (uses `/tree-view` LOD) |
| 3 | Sapling (Architectures) | — | MISSING (uses `/tree-view` LOD) |
| 4 | Tree (Ecosystem) | — | MISSING (uses `/tree-view`) |
| 5 | Garden (specific models) | — | NOT BUILT |
| 6 | Forest (multi-tree) | — | NOT BUILT |

**Current navigation links:** Tree View, DNA, Programs, Proto — none of these are "Sprout", "Sapling", "Garden", or "Forest".

**Impact:** The evolutionary metaphor is conceptually rich but only manifests in 2 pages. The "Level of Detail" zoom in TreeView partially implements Sprout→Tree transitions, but there's no narrative, no guided discovery, no dedicated experience for each stage.

---

### CRITICAL: No Guided Stage Progression

There is no mechanism to guide users through stages in order. The navigation bar offers 4 flat links (Tree View, DNA, Programs, Proto). A user arriving for the first time has no idea that DNA should come before Seed, or that the Tree has multiple "zoom levels" of understanding.

**What exists:**
- Landing page has a 4-step "Journey" visual (Roots → Trunk → Branches → Leaves) — but these scroll to sections on the same page, not to evolutionary stages
- ViewSelector modal (first visit) offers "DNA View" or "Tree View" — no stage context
- SeedTransition navigates DNA → Seed, but it's hidden behind a button

**What's missing:**
- Stage indicator (e.g., "Stage 2 of 7: Sprout")
- Stage unlock/progression system
- "Next Stage" and "Previous Stage" navigation
- Stage overview/map page

---

### HIGH: "Proto" Page Purpose Unclear

**Location:** `app/[locale]/proto/page.tsx`

The Proto page exists in the nav but its relationship to the evolutionary stages is unclear. It appears to be an organic tree diagram prototype (OrganicTreeDiagram component). It's positioned as a nav item alongside DNA and Tree View, suggesting it's a separate experience — but it could serve as the "Large Tree with blooms" stage.

**Recommendation:** Either integrate Proto into the stage progression (as "Stage 4: Tree" or "Stage 5: Garden") or remove it from main navigation to reduce confusion.

---

## 3. Navigation & Journey Coherence

### HIGH: No Clear User Journey Path

**Current navigation options from any page:**
```
GlobalNav: [← Back] [Tree] [DNA] [Programs] [Proto] [🌐 Lang] [🌙 Dark]
```

**The problem:** These are presented as equal peers, but they represent different depths of the same concept. DNA should lead to Seed, which should lead to Sprout/Tree, which should lead to Garden/Forest. Instead, a user can jump from DNA to Proto to Programs with no context.

**Recommended journey:**
```
Landing → DNA (understand mechanics)
       → Seed (choose intent)
       → Sprout (see simple tree)
       → Sapling (explore architectures)
       → Tree (full ecosystem)
       → Garden (specific models)
       → Forest (compare ecosystems)
```

---

### HIGH: Landing Page Journey Disconnected from Stages

**Location:** `app/[locale]/page.tsx`

The landing page has a "4-step journey" section (Roots → Trunk → Branches → Leaves) which scrolls to **content sections on the same page**. This is a different metaphor from the evolutionary stages (DNA → Seed → Sprout → Tree → Garden → Forest).

Two competing metaphors:
1. **Tree parts** (Roots/Trunk/Branches/Leaves) — used on landing page
2. **Growth stages** (DNA/Seed/Sprout/Tree/Garden/Forest) — used in backlog

These need to be reconciled. Currently they create confusion about the user's mental model.

---

### MEDIUM: Seed Page Has No Return Flow

**Location:** `app/[locale]/seed/SeedPageClient.tsx`

After choosing Builder/Thinker/Explorer, the Seed page navigates to `/tree-view?intent={path}`. But:
- There's no "go back to Seed" from Tree View
- There's no "go back to DNA" from Seed
- The `?origin={conceptId}` parameter from DNA Deep Dive is received but not used visually

**Impact:** The progression feels like a one-way funnel, not an explorable map.

---

### MEDIUM: Search Modal Disconnected from Stages

**Location:** `components/SearchModal.tsx`

The search modal (Cmd+K) searches concepts but doesn't indicate which stage/level a concept belongs to. Finding "Transformer" in search doesn't tell you it's a "Trunk" concept or "Stage 3: Sapling" content.

---

## 4. Component-Level Issues

### MEDIUM: VectorMap Hover Not Touch-Friendly

**Location:** `components/dna/VectorMap.tsx`

The VectorMap relies entirely on `onMouseEnter/onMouseLeave` for showing token labels and nearest-neighbor distance lines. On mobile (touch devices), there's no tap interaction.

**Impact:** Mobile users see dots but can't discover what they represent.

**Recommendation:** Add tap-to-select behavior — tap a point to show its label, tap another point to show distance between them. Tap empty space to deselect.

---

### MEDIUM: AttentionSpotlight Hover Not Touch-Friendly

**Location:** `components/dna/AttentionSpotlight.tsx`

Same issue as VectorMap. The spotlight effect (dimming unconnected arcs) requires mouse hover. Touch devices get no interaction.

**Recommendation:** Tap token to spotlight, tap again to deselect.

---

### MEDIUM: TokenizationSlicer Animation Timings Fixed

**Location:** `components/dna/TokenizationSlicer.tsx:87-111`

The slicer has hardcoded timeouts (600ms, 1500ms, 2500ms) that don't respect the simulation's `playbackSpeed`. If the simulation is slowed to 0.1x (lens effect), the slicer still completes its animation in 2.5s — potentially finishing before the step advances.

**Recommendation:** Make internal animation timings proportional to `BASE_STEP_DURATION / playbackSpeed`.

---

### MEDIUM: PredictionBarChart Same Timing Issue

**Location:** `components/dna/PredictionBarChart.tsx:43-56`

Same as above — hardcoded timeouts (1200ms, 2200ms) don't respect playback speed.

---

### LOW: DNAFlowDiagram Hidden on Mobile

**Location:** `components/dna/DNAView.tsx:106`

The flow diagram connecting the 4 cards is `hidden lg:block`. On tablets and phones, there's no visual indication that the 4 cards are connected in a sequence.

---

### LOW: No Keyboard Navigation for DNA Steps

Users cannot use arrow keys to advance/reverse steps. Only the mouse/touch buttons work.

---

### LOW: MicroLesson Content Sparse

**Location:** `components/dna/MicroLesson.tsx`

The lesson overlay shows title, body, and metaphor from translation keys. The content is educational but brief. There are no interactive elements, quizzes, or links to deeper content within the lesson.

---

## 5. Architecture Insights

### Missing Pages Inventory

Pages that should exist based on the evolutionary metaphor:

| Page | Route | Purpose | Complexity |
|------|-------|---------|------------|
| **Sprout** | `/sprout` | Simple tree with roots + trunk only. First "tree" experience. Interactive expand/collapse tutorial. | Medium |
| **Sapling** | `/sapling` | 3 Era branches visible (Symbolic, Neural, Transformer). Click to explore. | Medium |
| **Full Tree** | `/tree` (or enhanced `/tree-view`) | All 50+ nodes. The current tree-view with LOD polish. | Low (exists) |
| **Garden** | `/garden` | Specific models (GPT-4, Claude, LLaMA). Comparison cards. Performance metrics. | High |
| **Forest** | `/forest` | Multiple trees side by side. Compare AI domains (NLP, Vision, Robotics). | High |

### Data Flow Architecture

```
Currently:
  Landing ──┐
  DNA ──────┤──→ Seed ──→ TreeView ──→ Concept
  Proto ────┘
  Programs (standalone)
  Learn (standalone)

Should be:
  Landing ──→ DNA ──→ Seed ──→ Sprout ──→ Sapling ──→ Tree ──→ Garden ──→ Forest
                                                         ↕
                                                    Concept Detail
                                                         ↕
                                                  Learning Paths ──→ Programs
```

### State Management Gap

Currently, each page manages its own state independently:
- DNA: `DNAContext` (simulation state) — lost on navigation
- Seed: Local component state (intent selection) — lost on navigation
- Tree: `TreeView` internal state (zoom level, collapsed nodes) — lost on navigation

There's no **cross-page progression state** tracking which stages a user has completed, what their selected intent is, or where they are in the journey.

**Recommendation:** Implement a `JourneyContext` or localStorage-based progression tracker that persists stage completion across pages.

---

## 6. Prioritized Recommendations

### P0 — Critical (fix before next release)

1. **Add step selector to DNA page** — 4 clickable buttons/tabs above the cards allowing direct access to any visualization
2. **Add completion screen to DNA simulation** — show summary + CTAs when simulation ends
3. **Add "Previous Step" button to DNA controls** — alongside Next/Skip

### P1 — High (next sprint)

4. **Create dedicated Sprout page** — simplified tree with tutorial overlay
5. **Create dedicated Sapling page** — 3-era tree with expand interaction
6. **Add stage progression indicator** — persistent breadcrumb/progress bar showing stage position
7. **Add touch interaction to VectorMap and AttentionSpotlight** — tap-to-select pattern
8. **Reconcile the two metaphors** — align "Roots/Trunk/Branches/Leaves" with "DNA/Seed/Sprout/Tree/Garden/Forest"
9. **Add journey state persistence** — localStorage tracker for stage completion

### P2 — Medium (backlog)

10. **Create Garden page** — model comparison view
11. **Create Forest page** — multi-domain tree comparison
12. **Make DNA flow diagram interactive** — click segments to jump to steps
13. **Sync visualization animation timings with playback speed**
14. **Add keyboard navigation for DNA steps** (arrow keys)
15. **Add return navigation** — "Back to DNA" from Seed, "Back to Seed" from Tree
16. **Show stage context in search results**
17. **Enhance MicroLesson with interactive elements**

### P3 — Low (nice to have)

18. **Add mobile flow indicators** — show card sequence on small screens
19. **Add stage unlock animations** — celebrate progression
20. **Proto page integration** — decide: stage page or remove from nav
21. **Add keyboard shortcuts for simulation control** (space = pause, arrow keys = step)

---

## 7. Cross-Peer Review Questions

For the reviewing team to discuss:

1. **Metaphor alignment:** Should we keep both "tree parts" (Roots/Trunk/Branches/Leaves) AND "growth stages" (DNA/Seed/Sprout/Tree/Garden/Forest)? Or consolidate into one?

2. **Stage gating:** Should stages unlock progressively (complete DNA to unlock Seed) or remain freely navigable?

3. **Tree View scope:** Should the current Tree View remain a single page with LOD zoom, or should Sprout/Sapling/Tree be 3 separate pages with different default zoom levels?

4. **Proto page:** Keep as experimental playground, integrate as a stage, or remove?

5. **Mobile strategy:** The DNA visualizations are hover-heavy. Do we invest in full tap interactions, or accept that DNA is a desktop-first experience with simplified mobile views?

6. **State persistence:** How much cross-page state should we maintain? Full journey state in context/localStorage, or keep pages independent?

---

*Document generated for cross-peer analysis. All file references are from the `preview` branch as of 2026-01-30.*
