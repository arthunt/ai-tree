# Assignment: Phase F - Polish & Cleanup (The Finish Line)

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** Medium
**Objective:** Ensure the new Programs section is pixel-perfect, responsive, and fully localized.

## Task 1: Mobile Responsiveness Audit (US-150)
**Context:** We built desktop-first recently. Need to ensure 320px-375px screens look good.
**Action Items:**
1.  Check `/programs` grid on mobile.
2.  Check `/programs/[slug]` Hero text sizing on mobile.
3.  Ensure `LeadCaptureDialog` fits on small screens (max-height handling).
4.  Verify `ProgramCurriculum` accordion touch targets.

## Task 2: Localization QA (US-151)
**Context:** We added a lot of new keys.
**Action Items:**
1.  Verify switching between `/et/programs` and `/en/programs` works.
2.  Ensure all pricing/date formats correspond to the locale.
3.  Check that no keys are missing (showing raw key names).

## Task 3: Cleanup
**Action Items:**
1.  If `components/programs/LeadCaptureForm.tsx` exists (old one), delete it. We use `LeadCaptureDialog.tsx` now.
2.  Delete `actions/submitLead.ts` ONLY IF it's an old duplicate (It shouldn't be, we just made it).
3.  Ensure no `console.log` leftovers in the new components.

---

**Deliverable:**
- A polished, production-ready release candidate.
- Report any bugs found/fixed.
