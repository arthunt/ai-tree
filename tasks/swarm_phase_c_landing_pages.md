# Assignment: Phase C - Marketing Landing Pages (The Harvest)

**To:** Claude-Flow
**From:** Antigravity (Lead Architect)
**Date:** 2026-01-30
**Priority:** High
**Objective:** Build high-conversion, stunning landing pages for AIKI, AIVO, and AIME using the new Supabase `programs` data.

## Context
The backend is ready. PROD Database has `programs`, `program_features`, `program_curriculum` tables populated with English and Estonian content.
Server Action `getProgram(slug)` returns the full nested object.
Your job is to build the **frontend**.

## Design Direction
**"The Night Forest"**
*   **Vibe:** Premium, Dark Mode, Glowing Accents (Glassmorphism).
*   **Colors:** Use the program colors defined in DB (`#6366f1` for AIKI, etc.) for glows/borders.
*   **Typography:** Large, confident headers.
*   **Motion:** Subtle fade-ins on scroll.

---

## Task 1: Route Structure (Skeleton)
**Action Items for Swarm:**
1.  **Routing Agent:**
    *   Create `app/[locale]/programs/page.tsx` (Catalog/Index).
    *   Create `app/[locale]/programs/[slug]/page.tsx` (Dynamic Program Page).
    *   *Note:* Do not create separate folders for aiki/aivo/aime. Use dynamic routing `[slug]`.

2.  **Navigation Agent:**
    *   Update `GlobalNav.tsx` to include "Programs" link (already there? verify links to `/programs`).

---

## Task 2: Component Architecture
**Action Items for Swarm:**
1.  **Component Agent:**
    *   Create reusable components in `components/programs/`:
        *   `ProgramHero.tsx`: H1 title, tagline, "Apply" button, background glow.
        *   `ProgramFeatures.tsx`: Grid of 4 features (icon + title + desc).
        *   `ProgramCurriculum.tsx`: Accordion or list of weeks (Week 1: DNA...).
        *   `ProgramPricing.tsx`: Price card, installments, discount badges.
        *   `ProgramFAQ.tsx`: Simple accordion.

2.  **Integration Agent:**
    *   In `[slug]/page.tsx`:
        *   Call `await getProgram(slug, locale)`.
        *   Handle 404 if null.
        *   Pass data to components.
        *   Generate Metadata (title, description) dynamically.

---

## Task 3: The "Catalog" Page
**Action Items for Swarm:**
1.  **Catalog Agent:**
    *   In `programs/page.tsx`:
    *   Call `await getPrograms(locale)`.
    *   Display 3 cards (AIKI, AIVO, AIME) side-by-side.
    *   "Compare" section (Simple table).

---

## Technical Constraints
*   **Server Components:** All pages must be Server Components.
*   **Icons:** Use `lucide-react`. Map string `icon` from DB (e.g., 'Brain') to actual component.
*   **Locales:** Ensure it works for both `/en` and `/et`.

## Deliverables
1.  Working `/programs` page.
2.  Working `/programs/aiki` page.
3.  Components committed to `components/programs/`.

**Execution Mode:**
Use `claude-flow` to execute Task 1 & 2 in parallel.
