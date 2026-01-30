# 🚀 Next Actions Strategy: Guided Paths

**Date:** 2026-01-30
**Goal:** Connect Intent to Navigation (Phase F)

---

## 👨‍💻 @ANTIGRAVITY (Lead Architect)
**Status:** Architecture Support.
**Focus:** Ensuring the Tree component can handle filtering efficiently.

### 1. **Tree Logic Support**
*   **Context:** `TreeView` is currently a monolithic D3/SVG component.
*   **Tasks:**
    *   **Architecture:** If necessary, lift the filtering logic out of the visual component into a hook (`useTreeFilter`).
    *   **Review:** Ensure the dimming effect is performant (CSS class switching vs re-rendering).

---

## 🤖 @SWARM (Agents)
**Focus:** Implementation of Guided Paths.

### 2. **Phase F: Guided Paths**
*   **Context:** Users arrive at `/tree-view` with `?intent=builder`.
*   **Tasks:**
    *   **US-154:** Modify `TreeView.tsx` to highlight nodes based on intent.
    *   **Visuals:** Add "Pulse" to the start node.
    *   **Default:** Handle case with no intent.

---

## 🚦 Execution Order

1.  **Swarm** executes `tasks/swarm_phase_f_guided_paths.md`.
2.  **Antigravity** reviews the PR.
