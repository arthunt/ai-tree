# UX Design System Rules

**Status:** Enforced
**Source:** [`VISION_AND_STRATEGY.md`](./VISION_AND_STRATEGY.md) (V2.1), [`UX_RECOMMENDATIONS.md`](./UX_RECOMMENDATIONS.md), User Testing Feedback
**Last Updated:** 2026-01-31
**Applies to:** All agents (Gemini, Opus, Swarm, Freelance)

> [!IMPORTANT]
> These rules are mandatory for all development. If a conflict arises with any other document, `VISION_AND_STRATEGY.md` wins on architecture, this document wins on UX implementation.

---

## 1. The Narrative Theme Gradient

The application follows a strict visual progression from dark (underground) to light (sunlight). This is the brand identity.

| Stage | Concept | Theme | Background | Text |
| :--- | :--- | :--- | :--- | :--- |
| **DNA** | The Code / Underground | **Cinematic Dark** | `bg-void` (black), neon accents | White on dark |
| **Seed** | The Data & Training | **Deep Earth** | `bg-stone-900` to `bg-amber-950` gradient | White on dark |
| **Sprout** | Emergent Properties | **Dawn / Transitional** | Indigo/violet → morning sky, lighter glass | White → dark adaptive |
| **Istik** | Guided Practice | **Morning Green** | Emerald-tinted glass, `bg-emerald-950` → `bg-teal-900` | White on dark-green |
| **Tree** | The Knowledge | **Daylight / Light** | White, paper, clean surfaces | Dark on light |
| **Fruits** | The Applications | **Warm Daylight** | Warm whites, amber accents | Dark on light |
| **Orchard** | The Careers / Harvest | **Golden Hour** | Warm tones, harvest imagery | Dark on light |

**Rules:**
- Sprout MUST NOT reuse the DNA dark theme (`bg-void`, `slate-900`). It must feel lighter.
- Tree/Fruits/Orchard MUST be content-first light theme (15-30 min reading sessions).
- Each stage's background must be visually distinguishable when navigating via `StageSelector`.

> **Ref:** VISION_AND_STRATEGY Decision 2

---

## 2. Input Field Rules

**Rule:** Never render a visible input with interaction hints ("Press Enter", submit button) unless it is fully functional.

| Condition | Required Behavior |
| :--- | :--- |
| **Functional** | Must have `onSubmit` handler that produces visible feedback |
| **Not yet implemented** | Must be `disabled` with "Coming Soon" label, or hidden entirely |
| **Decorative** | Not allowed. Remove it. |

**Position by stage** (ref: VISION_AND_STRATEGY Decision 4):

| Stage | Input Position | Role |
| :--- | :--- | :--- |
| **DNA** | Top (inline, relative) | Simulation Controller |
| **Seed** | Bottom (fixed) | Goal/question entry (navigates to Tree) |
| **Istik** | Inline (central) | Prompt Sandbox — core interaction, not floating |
| **Tree** | Bottom (fixed floating) | Search / Ask tool |
| **Sprout/Fruits/Orchard** | None | No input (Design Rule #2 — removed stubs) |

**Validation:**
- `maxLength={500}` on all text inputs
- Show character counter when > 80% full
- Disable submit when input is empty or whitespace-only

---

## 3. Internationalization (i18n)

**Rule:** Zero hardcoded user-facing strings in any component.

- All UI text: `useParaglideTranslations()` hook with `t('namespace.key')` pattern
- DB content (Supabase): stored as `jsonb` (`{ en: "...", et: "..." }`), rendered via `getLocalized(json, locale)`
- Labels like "Analogy", "Phase 2: Foundations", "Tap to learn", "Read full lesson" are violations — must use translation keys

**Namespaces:**
- `dna.*` — DNA page strings
- `sprout.*` — Sprout page strings
- `common.*` — Shared UI (buttons, labels, navigation)
- `stages.*` — Stage names and descriptions

---

## 4. Typography Scale

Consistent sizing prevents the "header too big / cards too small" problems.

| Element | Mobile | Tablet (sm) | Desktop (md+) |
| :--- | :--- | :--- | :--- |
| **Page title (h1)** | `text-2xl` | `text-4xl` | `text-5xl` |
| **Page subtitle** | `text-sm` | `text-lg` | `text-xl` |
| **Card title** | `text-xl` | `text-xl` | `text-2xl` |
| **Card body** | `text-sm` | `text-sm` | `text-base` |
| **Labels / meta** | `text-xs` | `text-xs` | `text-sm` |
| **Mono / code** | `text-[10px]` | `text-xs` | `text-xs` |

**Rules:**
- Page title must never exceed `text-5xl` (no `text-7xl`).
- Header section margin-bottom: `mb-4` mobile, `mb-8` desktop max.
- Cards should visually dominate over headers on all breakpoints.

---

## 5. Spacing & Layout

| Pattern | Mobile | Desktop |
| :--- | :--- | :--- |
| **Page top padding** | `pt-14` (clear GlobalNav) | `pt-16` |
| **Page bottom padding** | `pb-24` (clear StageSelector + FloatingInput) | `pb-20` |
| **Content max-width** | Full width with `px-4` | `max-w-7xl mx-auto` |
| **Card gap** | `gap-4` | `gap-8` (md), `gap-12` (lg) |

**Rules:**
- Never use `min-h-screen` + `justify-center` on content containers — it pushes content below the fold.
- Content flows top-down naturally. Vertical centering is only for empty/loading states.
- Bottom floating elements (StageSelector, FloatingInput) must not overlap card content.

---

## 6. Card System

### 6a. Layout by Stage

| Stage | Mobile Layout | Desktop Layout |
| :--- | :--- | :--- |
| **DNA** | Horizontal snap scroll, one card per view (`min-w-[85vw]`, `snap-x`) | 4-column grid (`lg:grid-cols-4`) |
| **Seed** | Vertical stack (Process Flow) | 3-column grid (Dataset -> Training -> Model) |
| **Istik** | Vertical stack (Guided Modules) | Split-screen sandbox (Prompt left, Output right) |
| **Sprout** | Vertical stack, one column | 3-column grid (`lg:grid-cols-3`) |
| **Tree** | Card list with tabs | Card grid + optional D3 map toggle |

### 6b. Card Visual States

All card components must support these states with distinct visual treatment:

| State | Border | Background | Badge |
| :--- | :--- | :--- | :--- |
| **Inactive** | `border-white/10` | `bg-white/5` | None |
| **Active** | `border-2 border-brand-teal/60 ring-2 ring-brand-teal/30` | `bg-brand-teal/5` | Pulse indicator |
| **Completed** | `border-green-500/30` | `bg-green-500/5` | Green checkmark |

### 6c. Step Completion UX (DNA-specific)

When a simulation step finishes:
1. Show completion badge (green checkmark, top-right corner)
2. Show contextual message ("Text tokenized! Each piece has a unique ID.")
3. Pulse the "Next" button when step progress > 85%
4. Transition to completed card state before advancing

> **Ref:** UX_RECOMMENDATIONS.md P0 items 1-3

### 6d. Shared Card Rules

- Touch target: minimum **44px** (WCAG 2.5.5) for all interactive elements
- Click-to-expand cards must have visible affordance ("Tap to learn" or chevron)
- Deep Dive / navigation buttons: minimum `min-h-[48px]` with clear label + arrow icon
- Card content must never be clipped without a scroll indicator

---

## 7. Animation Rules

> **Ref:** VISION_AND_STRATEGY Decision 5

**Principle:** "Magical but Disciplined" — one hero animation per step, no ambient noise.

| Allowed | Not Allowed |
| :--- | :--- |
| Hero animations (tokenizer reveal, attention beams) | Background particles |
| Staggered card entry (`delay: index * 0.1`) | Camera pans / parallax |
| Completion badge spring animation | Multiple infinite animations stacking |
| Progress bar transitions | Decorative infinite pulses on non-interactive elements |

**Rules:**
- `prefers-reduced-motion`: Must disable all non-essential animation (CSS + Framer Motion)
- Pause infinite animations when tab is inactive (Page Visibility API)
- Maximum 2 concurrent infinite animations on screen
- All animations must have `will-change` or `transform` optimization

**Required CSS:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow, .animate-pulse, .animate-spin-slow {
    animation: none !important;
  }
}
```

---

## 8. Color System

### Brand Colors (global)
- `brand-teal`: `#2DD4BF` — primary accent
- `brand-cyan`: `#22D3EE` — secondary accent
- `brand-gold`: amber/gold — analogy highlights

### DNA Step Colors
Each DNA pipeline step has a distinct color for visual differentiation:

| Step | CSS Variable | Color | Usage |
| :--- | :--- | :--- | :--- |
| Tokenization | `--dna-t` | `#25EDBA` (Teal) | Node glow, active border, step button |
| Vectorizing | `--dna-v` | `#3B82F6` (Blue) | Same |
| Attention | `--dna-a` | `#A855F7` (Purple) | Same |
| Prediction | `--dna-p` | `#F59E0B` (Amber) | Same |

### Contrast Requirements
- Body text on dark: minimum `white/70` (not `white/50` or `white/60`)
- Brand-teal on dark: minimum `/70` opacity for WCAG 4.5:1
- Interactive elements must have visible focus ring (`ring-2 ring-brand-teal/50`)

---

## 9. Navigation

- **GlobalNav**: Fixed top, transparent over hero sections, solid on scroll
- **StageSelector**: Fixed bottom, visible on all evolutionary pages (DNA through Orchard)
- **DNAStepNav** (mobile): Sticky `top-0`, always visible (dimmed when no data, never hidden)
- **Desktop step controls**: Inline below input, never floating

**Rules:**
- No page may have both StageSelector and FloatingInput overlapping — stack them with spacing
- Mobile sticky nav must not obscure card content — cards need `scroll-mt-28` or equivalent

---

## 10. Accessibility Baseline

| Check | Requirement | Status |
| :--- | :--- | :--- |
| Touch targets | >= 44px all interactive elements | Enforced on DNA, pending on Sprout |
| Color contrast | >= 4.5:1 for body text | Partial — audit needed |
| `prefers-reduced-motion` | Disable non-essential animation | Not yet implemented |
| Screen reader | `aria-label` on icon-only buttons, step announcements | Not yet implemented |
| Focus indicators | Visible `ring` on all focusable elements | Partial |
| Keyboard navigation | Tab through all interactive elements | Not tested |
| Landscape mode | No horizontal overflow, no clipped content | Not tested |

---

## 11. Component Reuse Strategy

**Current state:** DNA and Sprout use separate card implementations. This is a known gap.

| Component | Used By | Shared? |
| :--- | :--- | :--- |
| `GlassCard` | DNA cards | Available but not used by Sprout |
| `GlowingNode` | DNA cards | DNA-specific |
| `FloatingInput` | Seed only | Shared (removed from Sprout/Tree/Fruits/Orchard — stubs) |
| `StageSelector` | All stage pages | Shared |
| `GlobalNav` | All pages | Shared |
| `SproutCard` | Sprout only | Not shared — inline glass effects |
| `DNAComponentCard` | DNA only | Not shared — simulation-specific |

**Target (Phase 2.1):** Create `UnifiedConceptCard` with variants:
- `SimNode` (Dark/Glass) for DNA
- `KnowledgeNode` (Light/Clean) for Tree
- `FoundationNode` (Transitional) for Sprout

**Until 2.1:** New cards must use `GlassCard` as base and follow the visual states from section 6b.

---

## Enforcement Checklist (for all PRs)

Before merging any UI change:

- [ ] No hardcoded user-facing strings (i18n rule)
- [ ] No non-functional interactive elements (input rule)
- [ ] Touch targets >= 44px
- [ ] Theme matches stage (dark/transitional/light)
- [ ] Typography follows scale (section 4)
- [ ] No `min-h-screen` + `justify-center` on content containers
- [ ] Bottom padding clears floating nav elements
- [ ] `prefers-reduced-motion` respected (when animation rule is implemented)
- [ ] Card states follow section 6b visual system
