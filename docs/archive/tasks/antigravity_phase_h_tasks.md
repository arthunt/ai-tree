# Assignment: Phase H - Antigravity Tasks
**Date:** 2026-01-30
**Status:** Active
**Focus:** Route Consolidation, Legacy Cleanup, & Visual Bridges.

## 📋 Task List

### 1. Route Consolidation (US-171)
*   [ ] **Migrate Proto to Forest:**
    *   Rename `app/[locale]/proto` to `app/[locale]/forest`.
    *   Rename Component `OrganicTreeDiagram` -> `ForestView`.
    *   Update `StageSelector` to uncomment the "Forest" button.
*   ✅ **Clean Navigation:**
    *   Update `GlobalNav` to remove "Proto" link.
    *   Ensure `JourneyContext` routes `forest` stage to `/forest` (or `/garden` if we prefer).

### 2. Transition Architecture (US-174)
*   [ ] **Create `TransitionManager`:**
    *   A headless component that listens to `JourneyContext` state changes.
    *   Mounts full-screen overlays for transitions (e.g., DNA->Seed).
*   [ ] **Implement "Token -> Seed" Bridge:**
    *   When `previousStage === 'dna'` and `currentStage === 'seed'`:
    *   Play animation of a "Glowing Token" flying to the center and becoming the "Seed".

### 3. Verification
*   [ ] Verify the full `DNA -> Seed -> Sprout -> Tree -> Forest` flow works without page reloads (or with smooth routing).

---

## 🛠 Execution Order
1.  ✅ **Rename/Move Proto:** `mv app/[locale]/proto app/[locale]/forest`
2.  ✅ **Update Context:** Fix logic in `JourneyContext.tsx` for `forest`.
3.  ✅ **Update UI:** Enable Forest button in `StageSelector.tsx`.
4.  ✅ **Create TransitionManager:** Scaffold the component.
