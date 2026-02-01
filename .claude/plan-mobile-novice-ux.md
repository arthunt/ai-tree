# Phase 8: Mobile Novice UX — Development Plan

**Goal:** A total novice arriving from Google search on a 360-375px phone
should feel welcomed, oriented, and able to start learning within 10 seconds.

**Source findings:**
- `docs/VISION_AND_STRATEGY.md` V3.0 (Decision 2: themes, Decision 5: animation, Decision 8: nav)
- `docs/BACKLOG.md` UAT items M1, M2, M3, U2, U5, U6, U7
- Mobile audit (Feb 2026)

---

## Current State: What's Broken for Mobile Novice

| # | Problem | Severity | Source |
|---|---------|----------|--------|
| 1 | **Landing header is a junkyard on <400px** — 9 buttons inline (Search, Learn, DNA, Map, ViewMode, EN/ET/RU pills, DarkMode). No hamburger. | P0 | M3, audit |
| 2 | **Landing page has its own language switcher** (inline pills, lines 313-334) that duplicates and conflicts with the new dropdown LanguageSwitcher in GlobalNav | P0 | audit |
| 3 | **Touch targets 40x40px** on landing header — below WCAG 44px minimum | P0 | U6, audit |
| 4 | **Button gaps 6px** on mobile header — mis-tap risk | P1 | audit |
| 5 | **Sapling: keyboard blocks input + Run button** on mobile | P0 | M1 |
| 6 | **Sprout: dark theme** instead of Dawn (indigo/violet) per design system — currently `indigo-900 via-purple-900 to-indigo-950` which looks almost black | P1 | U5 |
| 7 | **No onboarding signal** — novice lands on hero with "НАЧАТЬ ЭВОЛЮЦИЮ" but has zero context about what this app IS or what they'll learn | P1 | vision doc |
| 8 | **Landing page is NOT using GlobalNav** — it has a completely separate custom header, while all other pages use GlobalNav with proper hamburger menu | P0 | audit |

---

## Plan: 5 Work Blocks

### Block M1: Landing Page Mobile Header Redesign (P0)

**File:** `app/[locale]/page.tsx` (lines 210-424)

**Problem:** Landing page uses a custom inline header with 9 controls.
Every other page uses `GlobalNav` with a proper hamburger menu.

**Solution:** Replace the custom header with GlobalNav integration, or
redesign the landing header to use a hamburger pattern on mobile:

1. **Mobile (<md):** Show only: Logo + "Start" CTA + Hamburger (3 items max)
   - Hamburger opens a slide-down with: Search, Language, DarkMode, DNA link, Map link, ViewMode
   - Remove inline language pills entirely — use the dropdown LanguageSwitcher from GlobalNav
2. **Desktop (md+):** Keep current layout but fix touch targets to 44px minimum
3. Fix `gap-1.5` → `gap-2` minimum on the header flex container
4. When scrolled: ultra-minimal — Logo + Hamburger only on mobile

**Key constraints:**
- The landing page has a special `switchLanguage` function (line 115) that handles
  in-place locale switching when a concept lightbox is open. This must be preserved.
- The ViewSelector / WelcomeModal overlay must still work.

### Block M2: Sapling Mobile Input Fix (P0)

**Files:** `components/sapling/SaplingWorkspace.tsx`, `components/sapling/PromptSandbox.tsx`

**Problem:** Virtual keyboard pushes content up, footer blocks "Run" button.
UAT item M1: "CRITICAL: Virtual keyboard blocks input."

**Solution:**
1. Make "Run Prompt" button sticky/floating above keyboard area
2. Use `visualViewport` API to detect keyboard presence and adjust layout
3. Or: move Run button to be inline with the input (right side), not below it
4. Reduce vertical whitespace so Run is above fold even without keyboard

### Block M3: Sprout Theme Correction (P1)

**File:** `components/sprout/SproutView.tsx` (line 26)

**Problem:** Background is `from-indigo-900 via-purple-900 to-indigo-950` —
visually almost black, reads as "DNA dark mode" not "Dawn".

**Design system says:** "Dawn — Indigo/violet → morning sky"
The gradient should feel like a sunrise, not a night sky.

**Solution:** Lighten the gradient to feel like actual dawn:
- `from-indigo-800 via-violet-700 to-sky-800` or similar
- Add warm accent (amber/pink sunrise hint at the bottom)
- Must remain dark enough for white text readability

### Block M4: Novice Orientation Micro-copy (P1)

**Problem:** A novice from Google sees "НАЧАТЬ ЭВОЛЮЦИЮ" but doesn't know:
- What is Dendrix.ai?
- What will they learn?
- How long does it take?
- Is it free?

The hero subtitle says "Master AI fundamentals in ~2 hours" (EN) but it's
generic. A novice on mobile needs a **one-line promise**.

**Solution:** Add a short orientation block between badge and title:
- Visible on mobile, concise
- "Free interactive course. No signup needed."
- Or integrate into existing subtitle with clearer value prop
- Add i18n keys for all 3 locales

### Block M5: Touch Target & Accessibility Sweep (P1)

**Files:** `app/[locale]/page.tsx`, `components/StageSelector.tsx`

1. Audit all buttons on landing page for 44px minimum
2. Fix scrolled-state header controls (currently shrink to 32-36px)
3. Footer navigation buttons → 44px (UAT U6)
4. Verify StageSelector pill heights on mobile
5. Ensure LanguageSwitcher dropdown trigger meets 44px on all viewports

---

## Execution Order

```
M1 (Landing header)  →  most visible, most broken
M2 (Sapling input)   →  P0 blocker for the practice stage
M3 (Sprout theme)    →  visual, quick fix
M4 (Orientation)     →  copy + i18n, small diff
M5 (Touch targets)   →  sweep across files
```

## Out of Scope (for this phase)

- U1 (Sapling real LLM) — requires API integration, separate epic
- U3 (Sprout interactions) — design work needed first
- U4 (Tree perf) — optimization epic
- Auth / progress tracking — Phase 9+
- UnifiedCard remaining variants (sprout/tree/sapling) — @gemini WIP
