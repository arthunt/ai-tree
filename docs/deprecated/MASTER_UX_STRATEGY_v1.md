# Master UX/UI Strategy: The Living System

> **Status:** Ratified Strategy
> **Date:** 2026-01-31
> **Supersedes:** `docs/UX_UNIFICATION_ANALYSIS.md`, `tasks/ux_overhaul_analysis.md`
> **Authors:** Antigravity (Architecture), Swarm (UX), Claude Desktop (Strategy)

## 1. Executive Summary: The "Living System" Shift
We are moving Dendrix.ai from a fragmented set of tools (simulation vs. graph vs. list) into a single **"Living System"** metaphor. The user isn't using an app; they are interacting with a digital organism at different levels of magnification.

*   **The Core Metaphor:** Zooming into an organism.
    *   **Zoom In (x1000):** The **Nucleus/DNA** (The mathematical spark).
    *   **Zoom Mid (x100):** The **Sprout/Organs** (The functional components).
    *   **Zoom Out (x1):** The **Tree/Body** (The structured knowledge).
    *   **Zoom Far (x0.1):** The **Forest/Ecosystem** (The connected community).

## 2. Universal Interaction Patterns (The "Single Truth")

### 2.1 The Unified Card System
We will adopt a **single card architecture** across the entire platform. Every concept—whether a DNA operation, a Tree node, or a Seed choice—is a **Card**.

*   **Visual Style:** "Sci-Fi Glass". Dark mode default, neon accents (`var(--dna-teal)`, `var(--dna-purple)`), backdrop blur (`backdrop-blur-xl`), and thin borders (`border-white/10`).
*   **Interaction:**
    *   **Desktop:** Cards arranged in grid or flow. Hover for details. Click for "Deep Dive".
    *   **Mobile:** **Vertical Stream** (like TikTok/Reels) or **Stacked Sheet** (like Maps). One focus item at a time.
*   **Implementation:** `UnifiedConceptCard.tsx` (merging `ConceptCard`, `DNAComponentCard`).

### 2.2 The "Floating Brain" Input
Input is no longer a "search bar" at the top. It is the **voice of the user** talking to the organism.
*   **Position:** Fixed bottom-center (floating fab).
*   **Behavior:** Persists across "Zoom Levels". You can ask a question in the **Tree View**, and "Zoom In" to the **DNA View** to see how it's processed.

### 2.3 The "Magical Bridge" (Micro-Narratives)
Every data transformation must be visualized, not told.
*   **Tokenization:** Text flips 3D-style to reveal **Integer IDs** (The "Matrix" moment), then dissolves into **Vectors**.
*   **Attention:** Vectors shoot beams of light to connect with relevant neighbors.
*   **Prediction:** A "Lottery Scroll" of possible next words, settling on the winner.
*   **Tree Navigation:** Smooth camera pans (Zoom In/Out), not page loads.

## 3. The Refactoring Roadmap

### Phase 1: Fixing the Narrative Gaps (Immediate)
1.  **Tokenizer:** Add the "Integer ID" visualization step. (Text -> Numbers -> Vectors).
2.  **Mobile Input:** Deploy the "Floating Brain" input.
3.  **DNA Mobile:** Switch to "Stream Layout" (one active card focus).
4.  **Prediction:** Add "Try Again / I'm Confused" fallback state.

### Phase 2: unifying the Visuals (Medium Term)
5.  **Tree View Dark Mode:** Reskin the D3 graph to match the DNA "Void" aesthetic. Replace white sidebar with Glass Sheet.
6.  **Card Unification:** Factor out `UnifiedConceptCard` and apply everywhere.
7.  **Sprout View:** Create the "Sprout" level (Foundational Concepts: Model, Weights, Inference).

### Phase 3: The Connected Ecosystem (Long Term)
8.  **The Forest:** A new view showing multiple Trees (different model families: LLMs, Diffusers, etc.).
9.  **Continuity:** "Zoom" transitions between routes.

## 4. Key Decisions & Agreements
*   **Styles:** We create a "Sci-Fi Organism" theme. The "Technical Whiteboard" style of the current Tree View is deprecated.
*   **Mobile First:** All new interactions must be thumb-driven. (Bottom sheets, Floating inputs).
*   **Graceful Failure:** The AI must always respond, even if it fails to predict (e.g. "I learned nothing from that").

---

**Next Immediate Action:** Execute Phase 1.1 (Tokenizer Integer Visualization).
