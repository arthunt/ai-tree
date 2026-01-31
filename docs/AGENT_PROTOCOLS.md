# 🤖 Agent Protocols & Directives

**Status:** Active
**Target Audience:** Swarm, Claude-flow, Auto-GPT, and Human Developers
**Source of Truth:** `docs/VISION_AND_STRATEGY.md` (V2.1)

---

## 1. The Prime Directive (Read First)

Before writing a single line of code or prose, **you MUST read `docs/VISION_AND_STRATEGY.md`**.

*   **Conflict Resolution:** If any other document (including this one, or old tickets, or `AI_TREE_MASTER_REFERENCE.md`) conflicts with the Vision & Strategy, **the Vision & Strategy wins**.
*   **No "Good Ideas":** Do not invent new levels (e.g., "Nucleus"), new themes, or new interaction patterns without updating the ratified strategy first. We are in **Execution Mode**, not Ideation Mode.

## 2. Universal Truths (Hard Constraints)

These decisions are **RATIFIED** and non-negotiable until V3.0:

1.  **The Levels:** DNA → Seed → Sprout → Tree → Fruits → Orchard.
    *   *Do not mention "Forest" as a main level.*
    *   *Do not mention "Seeme" or "Võrs" (deprecated terms).*

2.  **The Theme:** **Contextual.**
    *   DNA Page = **Dark Mode (Cinematic)**.
    *   Tree/Reading Pages = **Light Mode (Content-First)**.
    *   *Do not force dark mode everywhere.*

3.  **The Input:** **Context-Dependent.**
    *   DNA Page = **Top Input** (Simulation Controller).
    *   Everywhere Else = **Floating Bottom Input**.

4.  **The Tech:** ParaglideJS + Supabase.
    *   *Do not use `next-intl`.*

## 3. Operational Protocols

### 3.1 When Creating New Features
1.  Check `docs/BACKLOG.md` to see where it fits.
2.  Use the `UnifiedConceptCard` pattern (Glass on Dark, Clean on Light).
3.  Ensure `prefers-reduced-motion` is respected for all animations.

### 3.2 When Updating Content
1.  Updates to `concepts` table in Supabase must respect the 6-Level Hierarchy.
2.  Translations must be handled via Paraglide messages (`messages/en.json`).

### 3.3 When Leaving Notes
1.  Do not create new "Analysis" documents unless you found a *critical* blocker.
2.  If you find a blocker, append it to `docs/BACKLOG.md` under "Blockers".

---

*Protocol established 2026-01-31. Failure to follow may result in context wipe.*
