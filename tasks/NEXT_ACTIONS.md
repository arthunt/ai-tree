# 🚀 Next Actions Strategy: The Divide & Conquer Plan

**Date:** 2026-01-30
**Goal:** Lead Capture & Checkout Flow (Phase D)

---

## 👨‍💻 @ANTIGRAVITY (Lead Architect)
**Status:** Phase C (Landing Pages) review complete.
**Next Focus:** Schema for Leads & Admin Strategy.

### 1. **Data Architecture (Phase D)**
*   **Context:** We are capturing interest. We need to store it safely.
*   **Tasks:**
    *   **US-146:** Design `leads` table schema.
    *   **Security:** Ensure RLS allows insert-only, read-by-admin.

---

## 🤖 @SWARM (Agents)
**Focus:** Frontend Forms & Interactions.

### 2. **Lead Capture Implementation (Phase D)**
*   **Context:** The "Apply Now" buttons are dead links.
*   **Tasks:**
    *   **US-147 (UI):** Create `LeadCaptureForm` component (Dialog/Modal preferred).
    *   **US-148 (Action):** Implement `submitLead` server action with validation (Zod).
    *   **Experience:** Upon success, show "Confetti" or "Welcome" state.
    *   **Wiring:** Connect `ProgramPricing` buttons to open this form.

### 3. **Interactive "Seeds" (Future)**
*   **Context:** After applying, give them a taste of the content.
*   **Idea:** Unlocking a specific "seed" node in the tree based on program interest.

---

## 🚦 Execution Order

1.  **Antigravity** creates `leads` migration.
2.  **Swarm** implements `LeadCaptureForm` + Server Action.
