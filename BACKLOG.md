# AI Tree (Dendrix.ai) - Product Backlog

> **Last Updated:** 2026-01-28
> **Status:** Active Development (Post-Audit)
> **Vision:** Public AI learning platform using tree metaphor - no sign-ins, free for all
> **Principles:** KISS (Keep It Simple), Less is More, Testing-First (gradual)

---

## Completed Items

### Phase 1: Accessibility Sprint (DONE)
- [x] US-001: Color Contrast Fix (WCAG AA)
- [x] US-002: Keyboard Navigation
- [x] US-003: ARIA Labels
- [x] US-004: Touch Targets (44px minimum)
- [x] US-005: Dark/Light Mode

### Phase 2: Feature Sprint (DONE)
- [x] US-009: i18n Setup (next-intl, /et/, /en/)
- [x] US-010: UI Translations (100% coverage)
- [x] US-011: Content Translation (all 16 concepts)
- [x] US-012: Tokenizer Visualizer
- [x] US-014: Code Examples (6 concepts)
- [x] US-015: Prerequisite Mapping

### Audit Fixes (DONE)
- [x] 32 hardcoded strings → i18n
- [x] 9 concept descriptions improved for Shu-Ha clarity
- [x] 4 data issues fixed (circular deps, complexity levels)
- [x] Accessibility improvements across all components

### Sprint 1: Growth Enablers (DONE)
- [x] US-020: Shareable Concept URLs with OG meta tags
- [x] US-021: Progress Tracking (localStorage)
- [x] US-022: Beginner Onboarding Path
- [x] US-023: Share Buttons in Lightbox
- [x] US-024: Mobile Navigation Menu

---

## Global Definition of Done (DoD)

Every story must meet ALL criteria before closing:

- [ ] **Functional:** Feature works as specified in acceptance criteria
- [ ] **Accessible:** Keyboard navigable + screen reader compatible
- [ ] **Responsive:** Works on mobile (320px) to desktop (1920px)
- [ ] **i18n:** All user-facing text in both ET and EN
- [ ] **Build:** `npm run build` passes without errors
- [ ] **Lint:** `npm run lint` passes
- [ ] **Preview:** Deployed to preview branch and tested
- [ ] **No Regressions:** Existing functionality still works

---

## Sprint 1: Growth Enablers (16h) - CRITICAL

**Goal:** Enable sharing and retention - the two biggest gaps blocking growth.

### US-020: Shareable Concept URLs
**Priority:** P0-Critical | **Effort:** 4h | **Value:** Viral Growth

**User Story:**
> As a teacher, I want to share a direct link to a specific concept, so that my students can access it immediately without navigating.

**Acceptance Criteria:**
- [ ] Route `/[locale]/concept/[conceptId]` exists (e.g., `/et/concept/tokens`)
- [ ] URL opens lightbox directly with that concept
- [ ] Open Graph meta tags generate rich social previews (title, description, image)
- [ ] Clicking outside lightbox navigates to main page with concept highlighted
- [ ] Back button returns to previous page (browser history works)

**Technical Notes:**
- Add dynamic route `app/[locale]/concept/[conceptId]/page.tsx`
- Generate OG images or use concept icon
- Handle invalid conceptIds gracefully (404 or redirect)

---

### US-021: Progress Tracking (localStorage)
**Priority:** P0-Critical | **Effort:** 6h | **Value:** Retention

**User Story:**
> As a learner, I want to see which concepts I've already viewed, so that I can track my learning progress and know where to continue.

**Acceptance Criteria:**
- [ ] Clicking "Mark as Learned" in lightbox saves to localStorage
- [ ] Learned concepts show checkmark badge on cards
- [ ] Header shows progress: "5/16 concepts learned"
- [ ] Progress persists across browser sessions
- [ ] "Clear Progress" option in settings/footer
- [ ] Works without any backend/auth

**Technical Notes:**
- localStorage key: `ai-tree-progress`
- Schema: `{ viewedConcepts: ['tokens', 'vectors'], lastViewed: 'tokens' }`
- Add ProgressContext similar to ThemeContext

---

### US-022: Beginner Onboarding Path
**Priority:** P0-Critical | **Effort:** 3h | **Value:** Onboarding

**User Story:**
> As a first-time visitor, I want clear guidance on where to start, so that I don't feel overwhelmed by 16 concepts.

**Acceptance Criteria:**
- [ ] Hero section shows "New to AI? Start here →" with arrow to Tokens
- [ ] First 5 concepts in learning path have "Beginner Path" badge
- [ ] Suggested path: Tokens → Vectors → Attention → Context Engineering → RAG
- [ ] Path badges are visually distinct (e.g., green "Start" badge on Tokens)
- [ ] Time estimate shown: "~30 min to complete beginner path"

**Technical Notes:**
- Add `isBeginnerPath: boolean` to concepts or define in separate config
- Badge component with path indicator
- Consider subtle connecting lines between path concepts

---

### US-023: Share Buttons in Lightbox
**Priority:** P1-High | **Effort:** 2h | **Value:** Shareability

**User Story:**
> As a learner who found a concept useful, I want to quickly share it with others, so that I can help spread knowledge.

**Acceptance Criteria:**
- [ ] Lightbox has share button row at bottom
- [ ] Buttons: Copy Link | Twitter/X | LinkedIn | Email
- [ ] Copy Link shows toast notification "Link copied!"
- [ ] Social shares include concept title and description
- [ ] Share URL is the deep link from US-020

**Technical Notes:**
- Use Web Share API where available (mobile)
- Fallback to individual buttons on desktop
- Share text template: "Learn about {concept} on AI Tree: {url}"

---

### US-024: Mobile Navigation Menu
**Priority:** P1-High | **Effort:** 3h | **Value:** Mobile UX

**User Story:**
> As a mobile user, I want to navigate between tree levels without scrolling endlessly, so that I can explore efficiently.

**Acceptance Criteria:**
- [ ] Hamburger menu icon on mobile (< 768px)
- [ ] Slide-out menu shows all 4 levels with concept counts
- [ ] Clicking level scrolls to section and closes menu
- [ ] Current section highlighted in menu
- [ ] Menu is accessible (focus trap, ESC to close)

**Technical Notes:**
- Reuse TreeNavigation content
- Add Sheet/Drawer component or use Framer Motion
- Consider sticky bottom nav as alternative

---

## Sprint 2: Discovery & Content (31h) - HIGH

**Goal:** Make content findable and fill critical content gaps.

### US-025: Search Functionality (Cmd+K)
**Priority:** P1-High | **Effort:** 6h | **Value:** Navigation

**User Story:**
> As a returning user, I want to quickly search for a concept by name, so that I don't have to scroll through all levels.

**Acceptance Criteria:**
- [ ] Cmd+K (Mac) / Ctrl+K (Windows) opens search modal
- [ ] Search button visible in header (magnifying glass icon)
- [ ] Fuzzy search across concept titles, simpleNames, and descriptions
- [ ] Results show matching concepts with level indicator
- [ ] Clicking result opens lightbox
- [ ] Recent searches shown (localStorage)
- [ ] Works in both languages

**Technical Notes:**
- Consider cmdk package or build simple modal
- Client-side search (no API needed with 20-30 concepts)
- Index: title, simpleName, metaphorDescription, technicalDescription

---

### US-026: Add 4 Critical Shu Concepts
**Priority:** P1-High | **Effort:** 8h | **Value:** Content Completeness

**User Story:**
> As a beginner, I need foundational concepts explained, so that I can build a solid understanding before advanced topics.

**Acceptance Criteria:**
- [ ] Add concept: **Context Windows** (roots, complexity 1)
  - Metaphor: "Working memory - like reading a book but only remembering last 5 pages"
  - Prerequisites: tokens
- [ ] Add concept: **Hallucinations** (roots, complexity 1)
  - Metaphor: "Confident fabrications - student who guesses when unsure"
  - Prerequisites: tokens
- [ ] Add concept: **Temperature & Sampling** (trunk, complexity 1)
  - Metaphor: "Creativity dial - low = calculator, high = artist"
  - Prerequisites: tokens
- [ ] Add concept: **Prompting Basics** (trunk, complexity 1)
  - Metaphor: "Asking good questions - vague vs specific"
  - Prerequisites: tokens
- [ ] All concepts have both ET and EN translations
- [ ] All concepts have appropriate icons

**Technical Notes:**
- Extends tree-concepts.json
- Update messages files for new concepts
- Verify prerequisites don't create cycles

---

### US-027: Add 3 Critical Branches Concepts
**Priority:** P1-High | **Effort:** 6h | **Value:** Content Depth

**User Story:**
> As an intermediate learner, I need practical application concepts, so that I can build real solutions.

**Acceptance Criteria:**
- [ ] Add concept: **Function Calling** (branches, complexity 2)
  - Metaphor: "Giving AI hands - letting it use tools"
  - Prerequisites: ai-agents
  - Code example: OpenAI function calling
- [ ] Add concept: **Transformers** (roots, complexity 2)
  - Metaphor: "The architecture behind all modern AI"
  - Prerequisites: attention, vectors
- [ ] Add concept: **Training vs Inference** (roots, complexity 1)
  - Metaphor: "School vs Work - learning vs applying"
  - Prerequisites: tokens
- [ ] All concepts have both ET and EN translations

**Technical Notes:**
- Function Calling should reference tools.json pattern
- Transformers is technically roots but placed after attention

---

### US-028: Time Estimates Per Concept
**Priority:** P2-Medium | **Effort:** 2h | **Value:** User Planning

**User Story:**
> As a learner with limited time, I want to know how long each concept takes to read, so that I can plan my learning.

**Acceptance Criteria:**
- [ ] Each concept card shows reading time (e.g., "3 min")
- [ ] Lightbox shows reading time
- [ ] Time calculated: ~200 words/min average
- [ ] Concepts with code examples add +2 min

**Technical Notes:**
- Add `readingTimeMinutes` to tree-concepts.json
- Or calculate dynamically from description length + code presence

---

### US-029: Report Issue Button
**Priority:** P2-Medium | **Effort:** 1h | **Value:** Feedback Loop

**User Story:**
> As a user who found an error, I want to easily report it, so that content quality improves.

**Acceptance Criteria:**
- [ ] Footer has "Report Issue" link
- [ ] Link goes to GitHub Issues with pre-filled template
- [ ] Template includes: concept name, issue type (typo/error/unclear/other)
- [ ] Works without GitHub account (shows issue tracker)

**Technical Notes:**
- Use GitHub issue URL template parameters
- Template: `?title=[Concept: X] &body=**Concept:**%0A**Issue:**%0A**Suggestion:**`

---

## Sprint 3-4: Polish & Demos (47h) - MEDIUM

### US-030: Vector Similarity Demo
**Priority:** P2-Medium | **Effort:** 12h | **Value:** Interactivity

**User Story:**
> As a learner, I want to interactively explore vector similarity, so that I can understand embeddings intuitively.

**Acceptance Criteria:**
- [ ] Input 3 words and see similarity scores
- [ ] 2D visualization showing word distances
- [ ] Pre-loaded examples: "king, queen, prince" / "cat, dog, car"
- [ ] Explanation of what similarity means
- [ ] Works client-side (no API needed)

**Technical Notes:**
- Use pre-computed embeddings for common words
- Or simple TF-IDF/word2vec-lite for demo purposes
- Canvas or D3.js for visualization

---

### US-031: Loading States & Skeletons
**Priority:** P2-Medium | **Effort:** 4h | **Value:** UX Polish

**User Story:**
> As a user on slow connection, I want visual feedback while content loads, so that I know the app is working.

**Acceptance Criteria:**
- [ ] Concept cards show skeleton while loading
- [ ] Lightbox shows skeleton for content
- [ ] Tree diagram shows loading state
- [ ] No layout shift when content loads

---

### US-032: Basic Analytics
**Priority:** P2-Medium | **Effort:** 4h | **Value:** Insights

**User Story:**
> As a platform maintainer, I want to understand usage patterns, so that I can improve content.

**Acceptance Criteria:**
- [ ] Vercel Analytics or Plausible configured
- [ ] Track: page views, concept opens, language preference
- [ ] No personally identifiable information collected
- [ ] Privacy-respecting (GDPR compliant)

---

## Backlog (Future)

### Content & Features
- [ ] US-033: Concept quizzes (client-side) - 16h
- [ ] US-034: Code playgrounds (CodeSandbox embeds) - 24h
- [ ] US-035: Print-friendly version - 4h
- [ ] US-036: Glossary/index page - 6h
- [ ] US-037: Related concepts suggestions - 8h
- [ ] US-038: Video/animation for Attention - 16h

### Testing
- [ ] US-006: Basic Test Infrastructure (Vitest) - 4h
- [ ] US-007: Component Test Examples - 4h
- [ ] US-008: E2E Smoke Test (Playwright) - 4h

### Deferred (Only When Needed)
- Backend infrastructure (Supabase)
- User authentication
- Server-side progress tracking
- Payment/pricing systems

---

## Value-Impact Matrix

```
                    HIGH IMPACT
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    │   US-020 URLs      │   US-021 Progress  │
    │   US-022 Onboard   │   US-025 Search    │
    │   US-023 Share     │   US-026 Concepts  │
    │                    │                    │
LOW ├────────────────────┼────────────────────┤ HIGH
EFFORT│                    │                    │ EFFORT
    │   US-024 Mobile    │   US-030 Vector    │
    │   US-028 Time      │   US-027 Branches  │
    │   US-029 Report    │   US-031 Loading   │
    │                    │                    │
    └────────────────────┼────────────────────┘
                         │
                    LOW IMPACT
```

**Priority Order (Value/Effort ratio):**
1. US-020: Shareable URLs (10x - viral growth enabler)
2. US-022: Onboarding (10x - reduces bounce rate)
3. US-023: Share Buttons (8x - amplifies US-020)
4. US-021: Progress (8x - retention driver)
5. US-024: Mobile Nav (6x - 50%+ users on mobile)

---

## Sprint Planning

### Previous Sprint (Sprint 1) - COMPLETED
**Duration:** 1 week | **Capacity:** 16h | **Velocity:** 18h

| Story | Points | Status |
|-------|--------|--------|
| US-020 Shareable URLs | 4h | ✅ Done |
| US-021 Progress Tracking | 6h | ✅ Done |
| US-022 Beginner Path | 3h | ✅ Done |
| US-023 Share Buttons | 2h | ✅ Done |
| US-024 Mobile Nav | 3h | ✅ Done |

### Current Sprint (Sprint 2)
**Duration:** 1 week | **Capacity:** 23h

| Story | Points | Status |
|-------|--------|--------|
| US-025 Search (Cmd+K) | 6h | In Progress |
| US-026 4 Shu Concepts | 8h | In Progress |
| US-027 3 Branches Concepts | 6h | In Progress |
| US-028 Time Estimates | 2h | Pending |
| US-029 Report Issue | 1h | Pending |

**Sprint Goal:** Make content discoverable and fill critical content gaps.

---

## Commands Reference

```bash
npm run dev          # Local development
npm run build        # Build for production
npm run lint         # Check code style
npm test             # Run tests (when configured)
```

---

*Less is More. The best code is the code you don't write.*
