# UX Focus Group Review: "The Missing Link"

**Date:** 2026-01-30
**Review Purpose:** Critical assessment of the user journey from DNA to Tree.
**Method:** Simulated focus group with 3 persona types.

---

## 👥 Personas & Critiques

### 1. The Curious Novice ("Elena")
*   **Profile:** 35, Non-tech job. Heard about "AI" but thinks it's magic.
*   **Touchpoint: The DNA View**
    *   **Feedback:** "I open the page and there's this colored flow. It moves so fast! I see 'Tokens' and 'Vectors' flying by. I can't read the descriptions because they scroll away. I feel stupid."
    *   **Pain Point:** **Cognitive Overload.** The animation executes the model *inference* speed, not *learning* speed.
    *   **Quote:** "It's like drinking from a firehose. Can I pause it?"
*   **Touchpoint: The Transition**
    *   **Feedback:** "Okay, I clicked something and now I'm in a 'Tree'. But how did the red/blue dot become a branch? I missed the story."
    *   **Pain Point:** **Broken Metaphor.** The connection between the *mechanism* (DNA) and the *knowledge* (Tree) is missing.

### 2. The AI Enthusiast ("Markus")
*   **Profile:** 24, Jr Developer. Knows basic Python. Wants to build apps.
*   **Touchpoint: The Tree View**
    *   **Feedback:** "It's a cool D3 visualization. But I don't know where to start. There are 30 nodes. I click 'Transformers' and see a paper link. Okay... but how do I *use* it? Where is the code?"
    *   **Pain Point:** **Lack of Practicality.** The tree is an encyclopedia, not a curriculum.
*   **Touchpoint: The Programs**
    *   **Feedback:** "I see these paid courses (AIKI/AIVO). But I haven't tasted the free value yet. Why should I trust you?"
    *   **Pain Point:** **Trust Gap.** Needs a "Sample" or "Bridge" content.

### 3. The UX/Interaction Designer ("Sarah")
*   **Profile:** Senior Product Designer. Obsessed with flow.
*   **Touchpoint: General UI**
    *   **Feedback:** "The dark glass aesthetic is beautiful (Phase C work), but the *affordances* are weak. The DNA stream looks non-interactive. I didn't know I could click the nodes until I accidentally hovered."
    *   **Pain Point:** **Discoverability.**
*   **Touchpoint: The "Seed"**
    *   **Feedback:** "You keep talking about a 'Seed' in the docs, but in the UI, it's just a transition animation. A Seed should be a *state*—a moment of potential where the user sets their intent."
    *   **Pain Point:** **Missing Concept.**

---

## 📉 Core Issues Identified

1.  **The "Rushing River" Problem:** DNA animation is too fast/auto-playing.
2.  **The "Missing Seed" Problem:** No moment where the user "plants" their intent.
3.  **The "Abstract Tree" Problem:** The data visualization is hard to navigate compared to a linear path.

---

## 🛠 Proposed Strategy: "The Gardener's Guide"

### 1. Fix the DNA View (Immediate)
*   **Action:** **Slow down** the default animation by 50%.
*   **Action:** Add a **"Pulse/Pause"** interactions. When hovering a stage (e.g. [T]okne), the flow *slows to a crawl* or stops, and the explanation expands.
*   **Action:** Add **"Coach Marks"** (pulsing rings) showing where to click.

### 2. Implement "The Seed" (New Feature)
*   **Concept:** Between DNA and Tree, introduce a **Seed Stage**.
*   **UI:** A single, glowing seed in the center.
*   **Interaction:** "What do you want to grow?"
    *   [ ] "I want to *build* with AI" (Leads to AIVO/AIME nodes)
    *   [ ] "I want to *teach*/understand AI" (Leads to AIKI nodes)
    *   [ ] "I'm just exploring" (Leads to Root)
*   **Effect:** This "plants" the user in the right part of the Tree.

### 3. Simplify the Tree (The "Trails")
*   **Action:** Default to **"Path View"** (Simplified) instead of "Map View" (Complex).
*   **Action:** Highlight the specific nodes relevant to their "Seed" choice.

---

## 🚦 Revised Priorities (Backlog Impact)

*   **P0 - Critical:** Fix DNA Animation Speed & Readability.
*   **P0 - Critical:** Create "The Seed" Selection Step (User Intent).
*   **P1 - High:** Tree "Guided Paths" (Highlighting).
*   **P2 - Medium:** Mobile Polish (The previous Phase F).

**Recommendation:** Pause "Marketing Polish". Pivot to "UX & Flow Repair".
