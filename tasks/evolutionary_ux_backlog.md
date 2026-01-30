# 🧬 Evolutionary UX Backlog
**Goal:** Transform the static tree into a "Level of Detail" exploration journey.

## 1. Evolution Stages
The user should unlock complexity gradually.
*   **Stage 0: DNA (The Mechanics)**
    *   *Current Scale:* 4 Nodes (Token, Vector, Attention, Prediction).
    *   *Goal:* Understand *how* AI thinks.
*   **Stage 1: Seed (The Potential)**
    *   *Concept:* Before the tree grows, what is the *intent*?
    *   *Visual:* A glowing seed pulsating with potential.
    *   *Action:* User selects "Builder", "Thinker", or "Explorer".

### Stage 1.5: DNA Rich Visualizations (Deep Dive)
*   **Tokenization (The "Slicer"):**
    *   *Visual:* Show text string being physically sliced into chunks.
    *   *Example:* "Money" -> `[ "Mo", "ney" ]` or "Jingle Bells" -> `[ "Jin", "gle", " Bells" ]`.
    *   *Metaphor:* Like chopping vegetables for a stew.
*   **Vectorization (The "Map"):**
    *   *Visual:* 2D Plot showing distance between words.
    *   *Interaction:* User types two words, sees them land on the map. Close = Similar (King/Queen). Far = Different (King/Banana).
    *   *Key Concept:* "Meaning is distance."
*   **Attention (The "Spotlight"):**
    *   *Visual:* Lines connecting words with varying thickness/opacity.
    *   *Explanation:* "Bank" in "River Bank" connects strongly to "River". "Bank" in "Bank Account" connects to "Money".
    *   *Goal:* 13-year-old friendly explanation of context.
*   **Prediction (The "Next Step"):**
    *   *Visual:* Bar chart of possible next tokens.
    *   *Animation:* "Jingle, Jingle..." -> List candidates: [Bells (90%), Rocks (5%), Cars (1%)].
    *   *Action:* Visually strike through low probability options, highlight "Bells", and slot it in.

*   **Stage 2: Sprout (The History)**
    *   *Current Scale:* ~3 Eras (Symbolic, Neural, Transformers).
    *   *Goal:* Understand the *lineage*.
    *   *Visual:* Only the Root and the main 3 branches are visible. Everything else is hidden/collapsed.
*   **Stage 3: Sapling (The Architectures)**
    *   *Current Scale:* ~10 Major Nodes (RNN, CNN, GPT-1).
    *   *Action:* Clicking an Era expands to show its key architectures.
*   **Stage 4: Tree (The Ecosystem)**
    *   *Current Scale:* Full 50+ Node View.
    *   *Goal:* Explore the modern landscape (LLaMA, Gemini, Claude).

## 2. Technical Tasks
### A. Interactive Tree (Completed Phase 1)
*   [x] **Expand/Collapse Logic:** Added `collapsedIds` state to `TreeView.tsx`.
*   [x] **Visual Indicators:** Added `+` / `-` icons for expandable nodes.
*   [x] **Spacing:** Increased `nodeSize` to `[200, 180]` to fix overlap.

### B. DNA Flow Polish (Completed Phase 1)
*   [x] **Manual Control:** Added `>>` button to skip steps.
*   [x] **Visual Feedback:** Added Progress Bar to `DNAInput`.

### C. The "Sprout" Implementation (Next)
*   [ ] **Default Collapsed State:** Initialize `TreeView` with all Eras collapsed by default.
*   [ ] **"Zoom to Fit" Animation:** When expanding a branch, auto-zoom to fit the new nodes.
*   [ ] **Curriculum Mode:** A guided tour that expands nodes one by one with a narrative overlay.

### D. Mobile Experience
*   [ ] **Touch Targets:** Ensure the new `+` buttons are 44x44px hit areas.
*   [ ] **Portrait Mode:** D3 Tree is wide. Consider a "List View" fallback for mobile portrait?

---
*Created by Antigravity under "Evolutionary Design" Directive.*
