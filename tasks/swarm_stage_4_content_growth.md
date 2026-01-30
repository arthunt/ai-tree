# 🌳 Stage 4: Content Growth & Marketing Integration

**Lead:** @ANTIGRAVITY (Architecture)
**Execution:** @SWARM (Content & Reach)

> **Goal:** Now that the "Mechanism" (DNA -> Seed -> Tree) is fixed, we must fill it with valuable content and connect it to the business (Programs).

---

## 🤖 Swarm Assignment (Batch 1)

### 1. Content Population ("The Gardeners")
**Context:** The Tree has structural nodes, but lacks deep content for the "Detail Panel".
**Tasks:**
*   [ ] **Populate 10 Key Nodes:** Update `node_translations` and `node_metadata` for:
    *   *Roots:* Vectors, Tokenization (Align with DNA view).
    *   *Trunk:* Pre-training, Fine-tuning, RLHF.
    *   *Branches:* RAG, Agents, Function Calling.
    *   *Leaves:* Green AI, Reasoning Models.
*   [ ] **Add "Deep Dive" Papers:** Find and add real Arxiv links/titles to `node_metadata.key_paper_title` for these nodes.
*   [ ] **Visual Motifs:** Ensure every node has a correct `visual_motif` icon assigned in the DB.

### 2. Marketing Integration ("The Bridges")
**Context:** Users exploring the tree need to potential to become students.
**Tasks:**
*   [ ] **Link Programs:** Update `node_metadata.related_program_id`:
    *   *Vectors/Tokenization* -> `aiki` (AI for Leaders).
    *   *RAG/Agents* -> `aivo` (AI for Builders).
*   [ ] **Marketing Hooks:** Write compelling 1-sentence hooks for `marketing_hook_en` and `marketing_hook_et`.
    *   *Example:* "Want to build this? Build your first RAG app in Week 3 of AIVO."

### 3. Verification ("The Auditors")
**Context:** Ensure nothing broke during the UX pivot.
**Tasks:**
*   [ ] **E2E Test Update:** Update Playwright tests to handle the new `/seed` flow intermediate step.
*   [ ] **Translation Check:** meaningful check of Estonian strings in `treeView` and `dna`.

---

## 👨‍💻 Antigravity Focus (Concurrent)

*   **System Stability:** Monitoring the D3 performance with more nodes.
*   **SEO Architecture:** Ensuring dynamic OG images work for deep-linked nodes.
*   **Analytics:** Setting up the conversion funnel tracking (Landing -> DNA -> Seed -> Tree -> Program).
