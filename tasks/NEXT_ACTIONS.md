# 🚀 Next Actions Strategy: The Divide & Conquer Plan

**Date:** 2026-01-30
**Goal:** Marketing Landing Pages (Phase C) & Programs UI

---

## 👨‍💻 @ANTIGRAVITY (Lead Architect)
**Status:** Phase B (Schema) Complete. Support Mode.

### 1. **Oversight & Review**
*   **Context:** The Database Schema is live (tables: `programs`, `curriculum`, `features`).
*   **Role:** Review Swarm's UI implementation for best practices and performance.

---

## 🤖 @SWARM (Agents)
**Focus:** UI Implementation, Server Components, Design System.

### 2. **Marketing Landing Pages (Phase C)**
*   **Context:** We have the data (`getPrograms`), now we need the pages to sell them.
*   **Tasks:**
    *   **US-141 (Routing):** Create `/programs`, `/programs/aiki`, `/programs/aivo`, `/programs/aime`.
    *   **US-142 (Components):** Build `ProgramHero`, `ProgramFeatures`, `ProgramCurriculum`, `ProgramPricing`.
    *   **Design:** "Dark Glass" aesthetic. High-end. Same vibe as DNA View.
    *   **Wiring:** Use `getPrograms` action to fetch real data + `useTranslations` for UI labels.

### 3. **Lead Capture (Growth)**
*   **Tasks:**
    *   **US-146:** Create a `LeadCaptureForm` (Email, Phone, Intent) for the "Apply" flow.

---

## 🚦 Execution Order

1.  **Swarm** spins up for **Phase C (Landing Pages)** immediately using the new `getPrograms` action.
2.  **Swarm** reads `tasks/swarm_phase_c_landing_pages.md` for specific component specs.
