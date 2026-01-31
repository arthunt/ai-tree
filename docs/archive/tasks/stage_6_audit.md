# 🔍 Stage 6: The Grand Audit (Pre-Launch)
**Lead:** @ANTIGRAVITY
**Execution:** Split Force (Antigravity + Swarm)

> **Goal:** Ensure "Production Readiness" by verifying System Health (Antigravity) and User Experience (Swarm) before we declare the app V1.0.

---

## 👨‍💻 Antigravity (System & Code Health)
**Focus:** Reliability, Performance, Security.

### 1. **Dead Code Elimination**
*   **Context:** We removed `next-intl` and refactored the Tree. There might be leftover files (e.g., `messages/*.json` keys that are no longer used).
*   **Task:** [x] Scan for unused components, hooks, or translation keys. Cleanup `lib/utils` if needed.

### 2. **Security & RLS Verification**
*   **Context:** We added `leads` and `programs` tables.
*   **Task:** [x] Verify RLS policies are strictly `ENABLE ROW LEVEL SECURITY`.
    *   `leads`: INSERT (public anon), SELECT (service_role only).
    *   `programs`: SELECT (public anon).
    *   `nodes`: SELECT (public anon).

### 3. **Performance Check**
*   **Context:** Tree View is heavy. Reference `us-west-1` latency.
*   **Task:**
    *   [x] Review `generateStaticParams` for Tree/Programs.
    *   [x] Check `next.config.js` image optimization domains.

---

## 🤖 Swarm (User & Content Quality)
**Focus:** "Pixel Perfect" & "Human Feel".

### 4. **The "Fresh Eyes" Walkthrough**
*   **Context:** We need to simulate a NEW user (no cache, no localStorage).
*   **Tasks:**
    *   **Flow:** Landing -> DNA -> Seed (Builder) -> Tree -> Node -> Program CTA.
    *   **Check:** Does the "Pulse" animation guide them correctly? Is the "Master This Skill" link working?

### 5. **Content Tone & Links**
*   **Context:** "The Gardeners" added a lot of content fast.
*   **Tasks:**
    *   **Link Rot:** Click every `arxiv.org` link in the Tree.
    *   **Tone:** Ensure Estonian translations aren't "robotic" (e.g., "Mets" for Forest, not "Puistu").

### 6. **Visual Regression (Mobile)**
*   **Task:** Verify the "Bottom Sheet" on mobile doesn't conflict with the Safari browser bar (100vh vs 100dvh).

---

## 🚦 Execution Plan
1.  **Antigravity** runs script audits (Security/Code).
2.  **Swarm** performs manual/visual walkthroughs.
