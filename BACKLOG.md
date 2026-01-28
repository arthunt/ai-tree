# AI Tree (Dendrix.ai) - Product Backlog

> **Last Updated:** 2026-01-28
> **Status:** Active Development
> **Vision:** Public AI learning platform using tree metaphor - no sign-ins, free for all
> **Principles:** KISS (Keep It Simple), Less is More, Testing-First (gradual)

---

## Project Philosophy

### What We ARE Building
- Public educational content about AI concepts
- Beautiful, accessible visualization of AI knowledge
- Multilingual support (Estonian + English)
- Interactive demonstrations to aid learning
- Shareable, embeddable content

### What We Are NOT Building (Yet)
- User accounts / authentication
- Server-side progress tracking
- Payment / pricing systems
- Social features requiring accounts
- Complex backend infrastructure

### KISS Infrastructure
```
GitHub → Vercel (Preview + Production)
    ↓
Static Next.js Site
    ↓
JSON Content (no database needed)
```

---

## Epics Overview (Simplified)

| Epic ID | Name | Priority | Status | Hours |
|---------|------|----------|--------|-------|
| E001 | Accessibility & UX Fixes | P0-Critical | not_started | 26h |
| E002 | Testing Foundation | P0-Critical | not_started | 12h |
| E003 | Multilingual (i18n) | P1-High | not_started | 24h |
| E004 | Interactive Demonstrations | P2-Medium | not_started | 32h |
| E005 | Content Expansion | P2-Medium | not_started | 20h |
| E006 | Client-Side Progress | P3-Nice-to-have | not_started | 16h |

**Total: ~130 hours** (down from 382h by removing auth/backend complexity)

---

## E001: Accessibility & UX Fixes

### Description
Fix critical accessibility issues for public users. WCAG compliance enables wider audience reach.

### User Stories

#### US-001: Color Contrast Fix
- **Priority:** P0-Critical
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Fix color contrast for WCAG AA compliance.
- **Acceptance Criteria:**
  - [ ] All text meets 4.5:1 contrast ratio
  - [ ] Tested with WebAIM contrast checker
- **Dependencies:** None

#### US-002: Keyboard Navigation
- **Priority:** P0-Critical
- **Status:** not_started
- **Estimate:** 6h
- **Description:** Enable keyboard-only navigation.
- **Acceptance Criteria:**
  - [ ] All interactive elements focusable
  - [ ] Logical tab order
  - [ ] Focus states visible
- **Dependencies:** None

#### US-003: ARIA Labels
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Add screen reader support.
- **Acceptance Criteria:**
  - [ ] All icons have aria-labels
  - [ ] Toggle switch has proper ARIA
  - [ ] 3D canvas has text alternative
- **Dependencies:** None

#### US-004: Mobile Responsiveness
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 6h
- **Description:** Improve mobile experience.
- **Acceptance Criteria:**
  - [ ] Typography scales properly
  - [ ] Touch targets 44px minimum
  - [ ] Works on iOS Safari + Chrome Android
- **Dependencies:** None

#### US-005: Dark/Light Mode
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 6h
- **Description:** Add theme toggle.
- **Acceptance Criteria:**
  - [ ] CSS variables for theming
  - [ ] Toggle in header
  - [ ] Respects system preference
  - [ ] Saved to localStorage
- **Dependencies:** US-001

---

## E002: Testing Foundation (Gradual)

### Description
Minimal testing setup that grows with the project. Start simple, expand as needed.

### User Stories

#### US-006: Basic Test Infrastructure
- **Priority:** P0-Critical
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Set up Vitest for unit tests.
- **Acceptance Criteria:**
  - [ ] Vitest configured
  - [ ] 1 example test passing
  - [ ] npm test script works
- **Dependencies:** None

#### US-007: Component Test Examples
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Add tests for 2-3 key components.
- **Acceptance Criteria:**
  - [ ] ConceptCard renders correctly
  - [ ] ViewModeToggle works
  - [ ] Test coverage report available
- **Dependencies:** US-006

#### US-008: E2E Smoke Test
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Single Playwright test for critical path.
- **Acceptance Criteria:**
  - [ ] Homepage loads
  - [ ] Can navigate to concept
  - [ ] Runs in CI
- **Dependencies:** US-006

---

## E003: Multilingual (i18n)

### Description
Add English support while keeping Estonian as default.

### User Stories

#### US-009: i18n Setup
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Configure next-intl with path-based routing.
- **Acceptance Criteria:**
  - [ ] /et and /en routes work
  - [ ] Language switcher component
  - [ ] Default to Estonian
- **Dependencies:** None

#### US-010: UI Translations
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Translate navigation and UI elements.
- **Acceptance Criteria:**
  - [ ] All buttons/labels in both languages
  - [ ] Date formatting localized
- **Dependencies:** US-009

#### US-011: Content Translation
- **Priority:** P1-High
- **Status:** not_started
- **Estimate:** 12h
- **Description:** Translate all 16 concepts to English.
- **Acceptance Criteria:**
  - [ ] All concepts have English metaphors
  - [ ] Technical terms handled consistently
  - [ ] Quality reviewed
- **Dependencies:** US-009

---

## E004: Interactive Demonstrations

### Description
Add interactive elements to help understand AI concepts.

### User Stories

#### US-012: Tokenizer Visualizer
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 12h
- **Description:** Interactive tokenization demo.
- **Acceptance Criteria:**
  - [ ] Text input field
  - [ ] Real-time token display
  - [ ] Token count shown
- **Dependencies:** None

#### US-013: Concept Connection Map
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Visual map showing concept relationships.
- **Acceptance Criteria:**
  - [ ] Prerequisites shown
  - [ ] Related concepts linked
  - [ ] Interactive navigation
- **Dependencies:** None

#### US-014: Code Examples
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 12h
- **Description:** Add code snippets to relevant concepts.
- **Acceptance Criteria:**
  - [ ] Syntax highlighting
  - [ ] Copy button
  - [ ] Python/JavaScript examples
- **Dependencies:** None

---

## E005: Content Expansion

### Description
Gradually add more AI concepts to the tree.

### User Stories

#### US-015: Prerequisite Mapping
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 4h
- **Description:** Add prerequisites field to concepts.
- **Acceptance Criteria:**
  - [ ] JSON schema updated
  - [ ] Prerequisites shown in UI
- **Dependencies:** None

#### US-016: 4-6 New Root Concepts
- **Priority:** P2-Medium
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Add fundamental concepts.
- **Acceptance Criteria:**
  - [ ] Transformer Architecture
  - [ ] Loss Functions
  - [ ] Each has metaphor + technical
- **Dependencies:** US-015

#### US-017: Learning Paths (Static)
- **Priority:** P3-Nice-to-have
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Define suggested learning sequences.
- **Acceptance Criteria:**
  - [ ] Beginner path defined
  - [ ] Practitioner path defined
  - [ ] Paths displayed in UI
- **Dependencies:** US-015

---

## E006: Client-Side Progress (Optional)

### Description
Local progress tracking using localStorage - no backend needed.

### User Stories

#### US-018: Local Progress Storage
- **Priority:** P3-Nice-to-have
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Save progress in localStorage.
- **Acceptance Criteria:**
  - [ ] Concept completion checkboxes
  - [ ] Progress persists across sessions
  - [ ] Clear progress option
- **Dependencies:** None

#### US-019: Progress Visualization
- **Priority:** P3-Nice-to-have
- **Status:** not_started
- **Estimate:** 8h
- **Description:** Show progress visually.
- **Acceptance Criteria:**
  - [ ] Progress bar per level
  - [ ] Overall percentage
  - [ ] Export/import progress (JSON)
- **Dependencies:** US-018

---

## DEFERRED (When Actually Needed)

These items are documented but intentionally NOT scheduled:

### Backend Infrastructure (DEFERRED)
- **Supabase setup** - Only if we need user accounts
- **Authentication** - Only if we need sign-ins
- **Server-side progress** - Only if localStorage isn't enough
- **API routes** - Only if we need server logic

### Advanced Features (DEFERRED)
- **Quizzes with scoring** - Could be client-side first
- **Certificates** - Only if we need verification
- **Instructor tools** - Only if we have instructors
- **Social features** - Only if we want community

---

## Development Workflow

### Branch Strategy (Simple)
```
main           → Production (auto-deploy to Vercel)
preview        → Staging for review
feature/*      → Feature branches → PR to preview
```

### Testing Strategy (Gradual)
```
Week 1-2: Just Vitest setup + 2-3 component tests
Week 3-4: Add E2E smoke test
Later:    Expand coverage as needed (aim for 60%, not 100%)
```

### Deployment
```
Push to main     → Vercel Production
Push to preview  → Vercel Preview
PR opened        → Vercel Preview (auto)
```

---

## Definition of Done (Simplified)

- [ ] Code works locally
- [ ] Basic tests pass (when applicable)
- [ ] Accessible (keyboard + screen reader basics)
- [ ] Works on mobile
- [ ] Works in both languages (when i18n is set up)
- [ ] Deployed to preview for review

---

## Quick Reference

### Commands
```bash
npm run dev          # Local development
npm test             # Run tests
npm run build        # Build for production
npm run lint         # Check code style
```

### Key Files
```
/data/tree-concepts.json    # All content
/BACKLOG.md                 # This file
/CLAUDE.md                  # Agent instructions
```

---

*Remember: The best code is the code you don't write. Keep it simple.*
