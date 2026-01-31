# Assignment: Phase D - Lead Capture & "The First Step"

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** High
**Objective:** Turn visitors into leads. Implement the "Apply" flow.

## Context
The landing pages are live. "Apply Now" currently does nothing.
We are **not** taking credit cards yet. We are capturing "Intent to Enroll" (Leads).

## Task 1: Component - `LeadCaptureDialog`
**Action Items:**
1.  Create `components/programs/LeadCaptureDialog.tsx`.
    *   **Trigger:** Should be triggered by "Apply Now" or "Secure Your Spot".
    *   **Fields:**
        *   Name (Required)
        *   Email (Required, email validation)
        *   Phone (Optional)
        *   Goals/Notes (Optional textarea)
    *   **Visuals:** Dark glass modal.
    *   **State:** Loading, Success, Error.

## Task 2: Server Action - `submitLead`
**Action Items:**
1.  Create `actions/submitLead.ts`.
2.  **Validation:** Use `zod` to validate input.
3.  **Database:** Insert into `leads` table (Schema will be provided by Architect).
4.  **Return:** `{ success: true }` or `{ error: string }`.

## Task 3: Integration
**Action Items:**
1.  Update `components/programs/ProgramPricing.tsx`:
    *   Make it a Client Component (if not already, or extract the button).
    *   Add state `isApplyOpen`.
    *   Render `<LeadCaptureDialog>` when true.
    *   Pass `program_id` to the dialog.

## Task 4: The "Success" Moment
**Action Items:**
1.  Visual Feedback: Upon success, show a "Welcome to the Tribe" message.
2.  (Optional) Fire confetti.

---

**Architect Note:**
I will handle the `leads` table migration (`20260137_leads_schema.sql`).
You focus on the UI and Action logic.
