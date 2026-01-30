# Project Backlog & Status

**Last Updated:** 2026-01-30
**Status:** Phase 2 (Bridge Building)

## 🟢 Completed (Recent)
*   **Paraglide Migration (Foundation):**
    *   Setup `middleware.ts`, `layout.tsx`, `paraglide` folder.
    *   Created `useParaglideTranslations` hook for compatibility.
    *   Removed hard `next-intl` lookups.
*   **Localization (Phase 1):**
    *   Extracted all strings from `DNAView`, `DNAInput`, `DNAComponentCard`.
    *   Generated `en.json` and `et.json` with flattened keys.
    *   Verified Estonian translations for technical terms.
*   **Navigation Architecture:**
    *   Created `GlobalNav` component.
    *   Unified `/dna`, `/proto`, and `/learn` under one header.
    *   Restored `/proto` (Organic Tree Logic) as a training view.

## 🟡 In Progress (Swarm Phase 2)
*   **Data Unification:**
    *   Aligning DNA IDs (`tokenization`) with Tree IDs (`tokens`).
*   **The "Seed" Bridge:**
    *   Implementing the visual transition from Mechanism -> Tree.
*   **Paraglide Audit:**
    *   Verifying bundle size impact of the compatibility hook.

## 🔴 Todo (Upcoming)
*   **Stage 3 (Võrs):**
    *   Interactive DNA Input tokenization (real-time).
    *   Visual connection lines between DNA nodes and Tree nodes.
*   **Stage 4 (Noor Puu):**
    *   "Guardian" Translation Portal.
    *   First "Paid" Learning Path implementation.
*   **Infrastructure:**
    *   Supabase Type Generation (Database <-> TypeScript sync).

## 🧊 Icebox (Future/Ideas)
*   3D Tree View (Three.js integration).
*   User Accounts (Auth).
*   Payment Integration (Stripe).
