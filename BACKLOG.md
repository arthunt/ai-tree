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

### Sprint 2: Discovery & Content (DONE)
- [x] US-025: Search Functionality (Cmd+K)
- [x] US-026: 4 Critical Shu Concepts (Context Windows, Hallucinations, Temperature, Prompting)
- [x] US-027: 3 Critical Branches Concepts (Function Calling, Transformers, Training vs Inference)
- [x] US-028: Time Estimates Per Concept
- [x] US-029: Report Issue Button

### Sprint 3-4: Polish & Demos (DONE)
- [x] US-030: Vector Similarity Demo (interactive 2D visualization)
- [x] US-031: Loading States & Skeletons (SkeletonCard, LightboxSkeleton, TreeDiagramSkeleton)
- [x] US-032: Basic Analytics (Vercel Analytics with Do Not Track support)

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

---

## 🚨 Sprint 5: UX/UI Audit Fixes (Jan 2026)

> **Audit Date:** 2026-01-28
> **Conducted By:** UX Designer, Learning Designer, Information Architect, Usability Tester, Accessibility Specialist
> **Focus:** Mobile friendliness, toggle confusion, dark mode contrast, learning flow

---

### US-040: Fix ViewModeToggle Label Confusion
**Priority:** P0-Critical | **Effort:** 2h | **Type:** UX/Clarity

**Problem:** ViewModeToggle shows "Eesti keel / Inglise keel / Mõlemad" but actually controls metaphor vs technical content display. Users confuse this with language selection (LanguageSwitcher is separate).

**Solution:**
- Rename labels from "Estonian/English" to "Simple/Technical/Both"
- Update icons to clearly represent content type not language
- Add tooltip explaining what each mode shows

**Acceptance Criteria:**
- [ ] Labels changed: "Lihtne" (Simple) / "Tehniline" (Technical) / "Mõlemad" (Both)
- [ ] Icons: Lightbulb (simple metaphors), Code2 (technical), LayoutGrid (both)
- [ ] Tooltip on hover explains the difference
- [ ] Build passes, translations updated

**Files:** `components/ViewModeToggle.tsx`, `messages/et.json`, `messages/en.json`

---

### US-041: Dark Mode Contrast Fixes (WCAG AA)
**Priority:** P0-Critical | **Effort:** 3h | **Type:** Accessibility

**Problem:** Multiple components use `dark:text-gray-400` which only has ~4.0:1 contrast ratio (WCAG AA requires 4.5:1 for normal text).

**Failing Components:**
| Component | Line | Current | Fix |
|-----------|------|---------|-----|
| TreeNavigation | 81-82, 148, 222 | dark:text-gray-400 | dark:text-gray-300 |
| ConceptLightbox | 429 | dark:text-gray-400 | dark:text-gray-300 |
| SearchModal | 342, 402, 458, 479, 487 | dark:text-gray-400 | dark:text-gray-300 |
| SearchModal (icon) | 478 | dark:text-gray-600 | dark:text-gray-400 (CRITICAL) |

**Acceptance Criteria:**
- [ ] All `dark:text-gray-400` on dark backgrounds upgraded to `dark:text-gray-300`
- [ ] SearchModal no-results icon fixed (dark:text-gray-600 → dark:text-gray-400)
- [ ] Borderline cases (`dark:text-gray-300`) upgraded to `dark:text-gray-200` where practical
- [ ] Manual contrast check passes

**Files:** `TreeNavigation.tsx`, `ConceptLightbox.tsx`, `SearchModal.tsx`, `LevelSection.tsx`

---

### US-042: First-Time User Onboarding
**Priority:** P0-Critical | **Effort:** 4h | **Type:** Onboarding

**Problem:** First-time visitors have no orientation. They don't understand:
- What the platform teaches
- How to navigate (Classic vs Tree view)
- What the toggles do
- Where to start

**Solution:**
- Add welcome modal on first visit (localStorage flag)
- 3-4 slide walkthrough explaining tree metaphor and views
- Interactive tooltip tour pointing to key features
- "Got it" button dismisses, doesn't show again

**Acceptance Criteria:**
- [ ] Welcome modal shows on first visit only
- [ ] Explains: Tree metaphor, View options, Beginner path
- [ ] Dismiss button sets localStorage flag
- [ ] Skip option available
- [ ] Mobile-responsive design

**Files:** New `components/WelcomeModal.tsx`, `app/[locale]/page.tsx`

---

### US-043: Mobile Lightbox Scroll Optimization
**Priority:** P1-High | **Effort:** 3h | **Type:** Mobile UX

**Problem:** ConceptLightbox uses `max-h-[90vh]` centered modal which creates poor mobile experience:
- Difficult to scroll on small screens
- "Mark as Complete" button hard to reach
- No visual indication more content exists below

**Solution:**
- Use full-screen bottom sheet on mobile (sm breakpoint)
- Add gradient fade at bottom indicating scroll
- Make "Mark as Complete" sticky at bottom on mobile
- Keep centered modal on tablet/desktop

**Acceptance Criteria:**
- [ ] Mobile (<640px): Full-screen bottom sheet layout
- [ ] Scroll indicator (gradient fade) shows when content overflows
- [ ] Action buttons sticky at bottom on mobile
- [ ] Tablet/desktop: Current centered modal preserved
- [ ] Works with on-screen keyboard visible

**Files:** `components/ConceptLightbox.tsx`

---

### US-044: Header Responsive Layout for Tablet
**Priority:** P1-High | **Effort:** 2h | **Type:** Responsive Design

**Problem:** Header has too many controls (Search, TreeView, ViewModeToggle, NameToggle, DarkModeToggle, LanguageSwitcher) that don't collapse gracefully on tablet (768-1024px). Creates multi-row header.

**Solution:**
- On tablet: Keep Search, TreeView, LanguageSwitcher visible
- Move ViewModeToggle, NameToggle, DarkModeToggle into dropdown menu
- Add "Settings" gear icon to access collapsed items

**Acceptance Criteria:**
- [ ] Header stays single row on tablet (iPad 1024px)
- [ ] Settings dropdown contains: View Mode, Name Toggle, Dark Mode
- [ ] Primary controls (Search, TreeView) always visible
- [ ] Desktop (lg+): All controls visible as before

**Files:** `app/[locale]/page.tsx`, new `components/SettingsDropdown.tsx`

---

### US-045: Add Prerequisite Completion Indicators
**Priority:** P1-High | **Effort:** 2h | **Type:** Learning UX

**Problem:** Prerequisites in lightbox show as plain buttons without indicating:
- Which prerequisites user has completed
- Progress toward this concept
- Learning sequence

**Solution:**
- Add checkmark to completed prerequisite pills
- Show progress: "2 of 3 prerequisites completed"
- Highlight first uncompleted as "Start here"

**Acceptance Criteria:**
- [ ] Completed prerequisites show ✓ checkmark
- [ ] Progress counter above prerequisite list
- [ ] First uncompleted prerequisite subtly highlighted
- [ ] Tooltip explains prerequisite importance

**Files:** `components/ConceptLightbox.tsx`

---

### US-046: Fix FAB/Lightbox Z-Index Conflicts
**Priority:** P1-High | **Effort:** 1h | **Type:** Mobile UX

**Problem:** TreeNavigation FAB (fixed bottom-right) can be covered by ConceptLightbox footer on mobile.

**Solution:**
- Hide FAB when lightbox is open on mobile
- Or reposition FAB above lightbox

**Acceptance Criteria:**
- [ ] FAB not visible when lightbox open on mobile
- [ ] FAB returns when lightbox closes
- [ ] No button overlap on small screens

**Files:** `components/TreeNavigation.tsx`, may need lightbox state context

---

### US-047: Add Undo for "Mark as Complete"
**Priority:** P1-High | **Effort:** 2h | **Type:** User Control

**Problem:** No confirmation or undo for marking concept complete. Users might accidentally mark items.

**Solution:**
- Show toast notification with "Undo" button for 5 seconds
- Or add confirmation dialog (less preferred)

**Acceptance Criteria:**
- [ ] Toast appears: "Marked as complete" with Undo button
- [ ] Undo reverses the action within 5 seconds
- [ ] Toast auto-dismisses after 5 seconds
- [ ] Works for both mark and unmark actions

**Files:** `components/ConceptLightbox.tsx`, new `components/Toast.tsx` or use existing

---

### US-048: Improve Beginner Path Visibility
**Priority:** P2-Medium | **Effort:** 3h | **Type:** Learning UX

**Problem:** Beginner path badges are small and easy to miss. No visual flow connecting the 5 concepts.

**Solution:**
- Add "Highlight Beginner Path" toggle
- Show sequential flow: 1 → 2 → 3 → 4 → 5
- Add "Start Learning" CTA that scrolls to first concept

**Acceptance Criteria:**
- [ ] Beginner path toggle in view options
- [ ] When enabled, path concepts have highlighted border
- [ ] Sequential numbers clearly visible
- [ ] Progress counter: "2/5 beginner path completed"

**Files:** `app/[locale]/page.tsx`, `components/ConceptCard.tsx`

---

### US-049: Standardize Touch Targets ✅ DONE
**Priority:** P2-Medium | **Effort:** 1h | **Type:** Accessibility

**Problem:** Share buttons in lightbox use `min-h-[36px]` which is below WCAG 44px recommendation.

**Solution:**
- ~~Audit all touch targets~~
- ~~Update share buttons to min-h-[44px] min-w-[44px]~~
- Document standard in component guidelines

**Acceptance Criteria:**
- [x] All interactive elements minimum 44x44px
- [x] Share buttons updated
- [ ] Consistent across all components

**Files:** `components/ConceptLightbox.tsx` (share buttons section)

**Status:** Share buttons fixed (2026-01-28). Full audit pending.

---

### US-050: Improve Search/Copy Feedback
**Priority:** P2-Medium | **Effort:** 1h | **Type:** UX Polish

**Problem:**
- Copy link shows brief checkmark (2s) - easy to miss
- Search results don't show count

**Solution:**
- Increase copy feedback to 3-4 seconds
- Add toast notification "Link copied!"
- Show search result count

**Acceptance Criteria:**
- [ ] Copy feedback visible for 4 seconds
- [ ] Toast notification appears
- [ ] Search shows "{n} results found"

**Files:** `components/ConceptLightbox.tsx`, `components/SearchModal.tsx`

---

---

## 🚨 Sprint 7: Mobile-First Concept Popup Redesign

> **Created:** 2026-01-28
> **Priority:** P0-Critical
> **Focus:** Mobile-first popup UX with tabbed content, visual mode toggle, navigation
> **Goal:** Transform popup into intuitive mobile learning experience with clear information hierarchy

---

### Epic E007: Mobile-First Concept Popup Redesign
**Total Effort:** 28h | **Priority:** P0-Critical

**Problem Statement:**
Current popup mixes all content types (explanation, visuals, code) in a single scrolling view. Mobile users struggle to:
- Find specific content types quickly
- Understand their position in the learning flow
- Navigate between concepts without closing popup
- Switch between simple and technical explanations

**Solution:** Redesign popup with:
1. **Tab 1: Explanation** - Content with Simple ↔ Technical toggle
2. **Tab 2: Visual** - Diagrams, illustrations, interactive demos
3. **Tab 3: Code** - Code samples with contextual guidance ("why is this here?")
4. **Navigation bar** - Prev/Next with position indicator
5. **Mobile-first** - Designed for touch, optimized for small screens

---

### US-070: Implement Explanation Tab with Persona Toggle
**Priority:** P0-Critical | **Effort:** 6h | **Type:** Mobile UX

**User Story:**
> As a learner, I want to toggle between simple and technical explanations in the same tab, so that I can choose my preferred learning style without switching tabs.

**Acceptance Criteria:**
- [ ] Explanation tab is the default/first tab
- [ ] Toggle switch: "Simple" (metaphor) ↔ "Technical" (detailed)
- [ ] Toggle persists across concepts (localStorage)
- [ ] Smooth animation when switching between modes
- [ ] Both modes show prerequisite indicators
- [ ] Simple mode shows: metaphor, simple analogy, beginner-friendly language
- [ ] Technical mode shows: detailed explanation, terminology, deeper concepts
- [ ] Mobile: Toggle is 44px height, easy thumb reach

**Technical Notes:**
- Extend `ConceptTabContent.tsx` with toggle state
- Store preference in localStorage: `ai-tree-explanation-mode`
- Use Framer Motion for smooth content transition
- Consider "Both" option for desktop (side-by-side)

**Files:** `components/mobile/ConceptTabContent.tsx`, `lib/hooks/useExplanationMode.ts`

---

### US-071: Implement Visual Representation Tab
**Priority:** P0-Critical | **Effort:** 8h | **Type:** Mobile UX

**User Story:**
> As a visual learner, I want a dedicated tab for diagrams and illustrations, so that I can understand concepts through visual representation.

**Acceptance Criteria:**
- [ ] Visual tab shows concept-specific illustrations
- [ ] Support for: static images, SVG diagrams, interactive demos
- [ ] Fallback for concepts without visuals: "Visual coming soon" placeholder
- [ ] Link to existing demos when applicable (Tokenizer, Vector similarity)
- [ ] Mobile-optimized: pinch-to-zoom on images
- [ ] Dark mode support for all visuals
- [ ] Alt text for accessibility
- [ ] Loading skeleton while images load

**Visual Content Types:**
| Concept | Visual Type | Status |
|---------|-------------|--------|
| Tokens | Tokenizer Demo (interactive) | ✅ Exists |
| Vectors | Vector Similarity Demo (interactive) | ✅ Exists |
| Attention | Attention heatmap diagram | 🔲 Needs creation |
| RAG | Retrieval flow diagram | 🔲 Needs creation |
| Agents | Agent architecture diagram | 🔲 Needs creation |
| Others | Generic concept illustrations | 🔲 Needs creation |

**Technical Notes:**
- Add `visual` field to concept data structure
- Support types: `image`, `svg`, `demo-component`, `none`
- Lazy load images for performance
- Consider generating simple diagrams with Mermaid or SVG

**Files:** `components/mobile/ConceptVisualTab.tsx`, `lib/types.ts`, `data/tree-concepts.json`

---

### US-072: Implement Code Tab with Contextual Guidance
**Priority:** P0-Critical | **Effort:** 6h | **Type:** Mobile UX

**User Story:**
> As a developer learning AI, I want code examples with clear guidance explaining WHY the code is relevant and HOW to use it, so that I can apply the concept in my projects.

**Acceptance Criteria:**
- [ ] Code tab shows syntax-highlighted code example
- [ ] "Why this code?" expandable section above code
- [ ] "How to use" section below code with practical tips
- [ ] Copy button with toast notification
- [ ] Language indicator (Python, TypeScript, etc.)
- [ ] Line-by-line annotations available (optional)
- [ ] Link to playground/sandbox when available
- [ ] Fallback for concepts without code: "Code example coming soon"

**Guidance Structure:**
```
📖 Why this code?
[Explanation of what this demonstrates and why it matters]

[CODE BLOCK]

💡 How to use
- Tip 1: Practical usage
- Tip 2: Common variations
- Tip 3: When NOT to use this

🔗 Try it: [CodeSandbox link] (optional)
```

**Technical Notes:**
- Extend `codeExample` in concept data to include `whyRelevant` and `howToUse`
- Consider adding `annotations` array for line-by-line explanations
- Mobile: Horizontal scroll for long code lines

**Files:** `components/mobile/ConceptCodeTab.tsx`, `lib/types.ts`, `data/tree-concepts.json`

---

### US-073: Implement Concept Navigation Bar
**Priority:** P0-Critical | **Effort:** 4h | **Type:** Mobile UX

**User Story:**
> As a learner moving through concepts, I want clear navigation showing my position and allowing prev/next navigation, so that I understand my progress and can move freely.

**Acceptance Criteria:**
- [ ] Navigation bar fixed at bottom of popup
- [ ] Shows: ← Prev | Progress dots | Next →
- [ ] Progress indicator shows position in current level (e.g., "3 of 7")
- [ ] Current level name displayed (e.g., "Roots")
- [ ] Swipe gestures: left = next, right = prev (existing)
- [ ] Keyboard shortcuts: ← → arrow keys
- [ ] Haptic feedback on navigation (mobile)
- [ ] Disabled state when at first/last concept in level
- [ ] Option to navigate across levels or within level only

**Visual Design:**
```
┌─────────────────────────────────────┐
│ [← Tokens]  ●●●○○○○  [Vectors →]   │
│           3/7 • Roots               │
└─────────────────────────────────────┘
```

**Technical Notes:**
- Extend existing `ConceptNavBar.tsx`
- Add cross-level navigation toggle
- Store navigation preference in localStorage

**Files:** `components/mobile/ConceptNavBar.tsx`

---

### US-074: Desktop Popup Alignment with Mobile Tabs
**Priority:** P1-High | **Effort:** 4h | **Type:** Responsive

**User Story:**
> As a desktop user, I want the same tabbed experience as mobile, so that the learning experience is consistent across devices.

**Acceptance Criteria:**
- [ ] Desktop popup uses same 3-tab structure
- [ ] Tabs displayed as horizontal pills at top
- [ ] Explanation toggle works same as mobile
- [ ] Visual tab supports larger display
- [ ] Code tab with better horizontal space
- [ ] Navigation integrated (can be less prominent)
- [ ] Keyboard navigation: Tab to switch tabs, arrows for concepts

**Technical Notes:**
- Refactor `ConceptLightbox.tsx` to use shared tab components
- Conditional styling for mobile vs desktop
- Consider side panel for navigation on wide screens

**Files:** `components/ConceptLightbox.tsx`, shared components

---

### US-075: Content Data Structure Extension
**Priority:** P0-Critical | **Effort:** 4h | **Type:** Data

**User Story:**
> As a content creator, I need an extended data structure that supports the new tab content, so that I can populate all tabs properly.

**Acceptance Criteria:**
- [ ] Concept type extended with new fields
- [ ] All existing concepts migrated to new structure
- [ ] Validation for required vs optional fields
- [ ] TypeScript types updated
- [ ] Sample content for 3-5 concepts as template

**New Data Structure:**
```typescript
interface Concept {
  // Existing fields...

  // NEW: Extended explanation
  explanation: {
    simple: string;      // Metaphor/beginner-friendly
    technical: string;   // Detailed/terminology
  };

  // NEW: Visual content
  visual?: {
    type: 'image' | 'svg' | 'demo' | 'diagram';
    src?: string;        // For image/svg
    component?: string;  // For demo (e.g., 'TokenizerDemo')
    alt: string;
    caption?: string;
  };

  // NEW: Extended code example
  codeExample?: {
    code: string;
    language: string;
    whyRelevant: string;    // NEW
    howToUse: string[];     // NEW: Array of tips
    annotations?: {         // NEW: Optional line annotations
      line: number;
      text: string;
    }[];
    playgroundUrl?: string; // NEW
  };
}
```

**Technical Notes:**
- Migrate existing `metaphor` → `explanation.simple`
- Migrate existing `explanation` → `explanation.technical`
- Add migration script for data transformation

**Files:** `lib/types.ts`, `data/tree-concepts.json`, `scripts/migrate-concepts.ts`

---

### Sprint 7 Summary

| Story | Points | Priority | Status | Dependencies |
|-------|--------|----------|--------|--------------|
| US-075 Data Structure | 4h | P0-Critical | 🔲 Pending | None (start here) |
| US-070 Explanation Tab | 6h | P0-Critical | 🔲 Pending | US-075 |
| US-071 Visual Tab | 8h | P0-Critical | 🔲 Pending | US-075 |
| US-072 Code Tab | 6h | P0-Critical | 🔲 Pending | US-075 |
| US-073 Navigation Bar | 4h | P0-Critical | 🔲 Pending | None |
| US-074 Desktop Alignment | 4h | P1-High | 🔲 Pending | US-070, US-071, US-072 |

**Total:** 32h | **Critical Path:** US-075 → US-070/071/072 (parallel) → US-074

**Recommended Order for Swarm:**
1. **US-075** (Data Structure) - Must be first, enables all others
2. **US-070, US-071, US-072** (Tabs) - Can run in parallel after US-075
3. **US-073** (Navigation) - Can run in parallel with tabs
4. **US-074** (Desktop) - Final integration after tabs complete

**Swarm Agent Assignment:**
| Story | Agent Type | Model |
|-------|------------|-------|
| US-075 | system-architect | sonnet |
| US-070 | mobile-dev | sonnet |
| US-071 | mobile-dev | sonnet |
| US-072 | coder | sonnet |
| US-073 | mobile-dev | haiku |
| US-074 | coder | sonnet |

---

## Backlog (Future)

### Content & Features
- [ ] US-033: Concept quizzes (client-side) - 16h
- [ ] US-034: Code playgrounds (CodeSandbox embeds) - 24h
- [ ] US-035: Print-friendly version - 4h
- [ ] US-036: Glossary/index page - 6h
- [ ] US-037: Related concepts suggestions - 8h
- [ ] US-038: Video/animation for Attention - 16h
- [ ] US-051: Learning pathways system (Beginner/Builder/Researcher) - 8h
- [ ] US-052: Prerequisite validation before marking complete - 4h
- [ ] US-053: Rename Classic/Tree views for clarity - 2h

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

### Previous Sprint (Sprint 2) - COMPLETED
**Duration:** 1 week | **Capacity:** 23h | **Velocity:** 23h

| Story | Points | Status |
|-------|--------|--------|
| US-025 Search (Cmd+K) | 6h | ✅ Done |
| US-026 4 Shu Concepts | 8h | ✅ Done |
| US-027 3 Branches Concepts | 6h | ✅ Done |
| US-028 Time Estimates | 2h | ✅ Done |
| US-029 Report Issue | 1h | ✅ Done |

### Previous Sprint (Sprint 3-4) - COMPLETED
**Duration:** 2 weeks | **Capacity:** 20h | **Velocity:** 20h

| Story | Points | Status |
|-------|--------|--------|
| US-030 Vector Similarity Demo | 12h | ✅ Done |
| US-031 Loading States | 4h | ✅ Done |
| US-032 Basic Analytics | 4h | ✅ Done |

**Sprint Goal:** Polish & interactive demos. ✅ Achieved

### Current Sprint (Sprint 5) - UX/UI AUDIT FIXES
**Duration:** 1-2 weeks | **Capacity:** 24h | **Start:** 2026-01-28

| Story | Points | Priority | Status |
|-------|--------|----------|--------|
| US-040 ViewModeToggle Labels | 2h | P0-Critical | ✅ Done |
| US-041 Dark Mode Contrast | 3h | P0-Critical | ✅ Done |
| US-042 First-Time Onboarding | 4h | P0-Critical | 🔲 Pending |
| US-043 Mobile Lightbox Scroll | 3h | P1-High | ✅ Done |
| US-044 Header Tablet Layout | 2h | P1-High | ✅ Done |
| US-045 Prerequisite Indicators | 2h | P1-High | ✅ Done |
| US-046 FAB/Lightbox Z-Index | 1h | P1-High | ✅ Done |
| US-047 Undo Mark Complete | 2h | P1-High | ✅ Done |
| US-054 Toast Notifications | 3h | P1-High | ✅ Done |

**Sprint Goal:** Fix critical UX issues identified in audit - improve mobile experience, fix toggle confusion, WCAG compliance.

**Recommended Order:**
1. US-040 (toggle labels) - Quick win, high confusion
2. US-041 (contrast) - Accessibility compliance
3. US-046 (z-index) - Quick fix
4. US-043 (mobile lightbox) - Major mobile improvement
5. US-045 (prerequisites) - Learning flow
6. US-044 (header) - Tablet experience
7. US-047 (undo) - User control
8. US-042 (onboarding) - New user experience

---

## Commands Reference

```bash
npm run dev          # Local development
npm run build        # Build for production
npm run lint         # Check code style
npm test             # Run tests (when configured)
```

---

## 🔍 Swarm Review Findings (2026-01-28)

> **Review Date:** 2026-01-28
> **Agents:** UX/UI Designer, Learning Designer, Information Architect, Translator, Usability Tester
> **Total Issues Found:** 68 issues across 5 domains

### Completed During Review
- ✅ US-040: ViewModeToggle labels fixed ("Lihtne/Tehniline/Mõlemad")
- ✅ US-041: Dark mode contrast (11 instances fixed to WCAG AA)
- ✅ US-049: Touch targets (share buttons 36px → 44px)
- ✅ Translation: Estonian localization improvements (vectorDemo, advanced levels)

### Completed During Implementation Sprint
- ✅ US-043: Mobile lightbox scroll (body scroll lock, iOS momentum scrolling, safe-area support)
- ✅ US-044: Header tablet layout (SettingsDropdown component for 768-1023px)
- ✅ US-045: Prerequisite completion indicators (checkmarks, progress counter, "Start here")
- ✅ US-046: FAB/Lightbox z-index (FAB hidden when lightbox open)
- ✅ US-047: Undo mark complete (toast notification with 5s undo action)
- ✅ US-054: Toast notification system (ToastProvider, ToastContainer, 4s/5s durations)

### New Issues Identified (Not in Original Backlog)

#### US-054: Toast Notification System
**Priority:** P1-High | **Effort:** 3h | **Type:** UX Feedback

**Problem:** No centralized feedback mechanism. Copy link shows brief checkmark (2s), mark complete has no toast.

**Acceptance Criteria:**
- [ ] Implement toast notification system (e.g., react-hot-toast)
- [ ] Toast appears for copy actions (4s duration)
- [ ] Toast appears for mark complete with Undo button
- [ ] Accessible with aria-live regions

---

#### US-055: Search Result Count Display
**Priority:** P2-Medium | **Effort:** 1h | **Type:** UX Polish

**Problem:** Search results don't show count until results are displayed in footer.

**Acceptance Criteria:**
- [ ] Show "{n} results" immediately as user types
- [ ] Empty state shows "No results found"

---

#### US-056: Keyboard Shortcuts Help Modal
**Priority:** P2-Medium | **Effort:** 2h | **Type:** Accessibility

**Problem:** Power users don't know available shortcuts (⌘K, ESC, arrows).

**Acceptance Criteria:**
- [ ] Shift+? opens keyboard shortcuts modal
- [ ] List all shortcuts: ⌘K (search), ESC (close), ↑↓ (navigate)
- [ ] Modal is accessible

---

#### US-057: Progressive Level Disclosure
**Priority:** P3-Low | **Effort:** 8h | **Type:** Learning UX

**Problem:** All 4 levels visible immediately, overwhelming for beginners.

**Acceptance Criteria:**
- [ ] Optional "guided mode" locks advanced levels
- [ ] Unlock at 80% completion of previous level
- [ ] Clear visual indication of locked/unlocked state

---

#### US-058: TreeNavigation Shows Scroll Position Not Completion
**Priority:** P2-Medium | **Effort:** 3h | **Type:** Learning UX

**Problem:** Level progress indicator shows scroll position, not actual concept completion.

**Acceptance Criteria:**
- [ ] Show completion percentage per level (e.g., "Roots: 3/5")
- [ ] Color coding: gray=not started, blue=in progress, green=completed
- [ ] Keep active level indicator separate from completion

---

### Information Architecture Issues (Documented)

| Issue | Current State | Recommended Fix |
|-------|---------------|-----------------|
| Terminology confusion | ViewMode/NameToggle/View seem related | Rename to ContentDisplay, use "View" only for pages |
| Header overload | 8 controls compete for space | Group into Settings dropdown on tablet |
| No breadcrumbs | Users lose context between pages | Add "AI Tree / Classic View" breadcrumb |
| Search can bypass prerequisites | Beginners find advanced concepts | Show prerequisite warnings in search results |

---

## ✅ Sprint 6: Minimalism & Learning Flow (Jan 2026) - COMPLETE

> **Review Date:** 2026-01-28
> **Completed:** 2026-01-28
> **Based On:** Comprehensive UX Review (5 specialist agents)
> **Goal:** Reduce clutter by 60%, improve learning flow, respect adult learners' time
> **Report:** `/docs/UX_COMPREHENSIVE_REVIEW.md`
> **Commits:** `d2cc48a` (P0), `dcfe43d` (P1)

---

### ✅ US-060: Hero Section Simplification - COMPLETE
**Priority:** P0-Critical | **Effort:** 4h | **Type:** Minimalism

**Problem:** Hero has 25 competing elements causing decision paralysis.

**Solution:** Removed giant emoji, view option cards, level preview strip. Added inline emoji with title, skill selector modal.

**Acceptance Criteria:**
- [x] Hero reduced from 25 to ~10 elements
- [x] Remove: Giant emoji, view option cards, level preview
- [x] Add: Skill selector modal (New to AI? / Exploring / Building)
- [x] Single primary CTA: "Start Learning"
- [x] Mobile: Hero fits in one screen (not 1.4 screens)

**Files:** `app/[locale]/page.tsx`

---

### ✅ US-061: Add Clear Value Proposition - COMPLETE
**Priority:** P0-Critical | **Effort:** 2h | **Type:** Andragogy

**Problem:** Current subtitle was a feature, not a benefit.

**Solution:** "Understand AI well enough to make informed decisions. Master the fundamentals in ~2 hours."

**Acceptance Criteria:**
- [x] Hero subtitle focuses on user benefit, not feature
- [x] Value is clear within 5 seconds
- [x] Both ET and EN translations updated
- [x] Optional: Add "Who this is for" line

**Files:** `messages/en.json`, `messages/et.json`, `app/[locale]/page.tsx`

---

### ✅ US-062: Add Time Estimates to Hero & Levels - COMPLETE
**Priority:** P0-Critical | **Effort:** 2h | **Type:** Andragogy

**Problem:** Adults value their time. No prominent time estimates visible.

**Solution:** Added "Complete path: ~2 hours" to hero, level time estimates (~25-35 min each).

**Acceptance Criteria:**
- [x] Hero shows total time: "Complete learning path: ~2 hours"
- [x] Each level header shows time estimate
- [x] Beginner path shows: "~30 minutes"
- [x] Translations in both languages

**Files:** `app/[locale]/page.tsx`, `messages/*.json`

---

### ✅ US-063: Move Demos After Relevant Concepts - COMPLETE
**Priority:** P1-High | **Effort:** 3h | **Type:** Learning Design

**Problem:** Demos appeared BEFORE learning content - like giving calculator before teaching math.

**Solution:** Moved Tokenizer Demo after Roots level, Vector Demo after Trunk level.

**Acceptance Criteria:**
- [x] Tokenizer Demo appears after Roots level
- [x] Vector Demo appears after Trunk level
- [x] Demos have contextual placement
- [x] Mobile scroll depth reduced by ~1 screen

**Files:** `app/[locale]/page.tsx`

---

### ✅ US-064: Simplify Header Controls - COMPLETE
**Priority:** P1-High | **Effort:** 2h | **Type:** Minimalism

**Problem:** Header had 7 controls competing for space.

**Solution:** Consolidated to Settings dropdown with Language, View Mode, Theme. Header now has 3-4 controls.

**Acceptance Criteria:**
- [x] Header reduced to 3-4 primary controls
- [x] Settings dropdown contains: Language, View Mode, Theme
- [x] Search shows icon only on mobile (remove ⌘K badge)
- [x] Mobile header fits comfortably

**Files:** `app/[locale]/page.tsx`, `components/SettingsDropdown.tsx`

---

### ✅ US-065: Rename View Terminology - COMPLETE
**Priority:** P1-High | **Effort:** 1h | **Type:** Information Architecture

**Problem:** "Classic View" sounded outdated. "Tree View" was abstract.

**Solution:** "Classic View" → "Learning Path", "Tree View" → "Concept Map"

**Acceptance Criteria:**
- [x] All references to "Classic View" changed to "Learning Path"
- [x] All references to "Tree View" changed to "Concept Map"
- [x] Both ET and EN translations updated
- [x] URL paths unchanged (backward compatibility)

**Files:** `messages/en.json`, `messages/et.json`

---

### ✅ US-066: Add Vector Demo Touch Handlers - COMPLETE
**Priority:** P1-High | **Effort:** 2h | **Type:** Mobile UX

**Problem:** Vector Demo canvas only had mouse handlers. Mobile users couldn't interact.

**Solution:** Added onTouchStart, onTouchMove, onTouchEnd handlers with 25px touch targets.

**Acceptance Criteria:**
- [x] Vector demo responds to touch on mobile
- [x] Point hover shows tooltip on tap (with 1.5s persistence)
- [x] Touch targets enlarged (25px) for better mobile UX
- [x] No conflicts with page scroll (touch-none class)

**Files:** `components/VectorDemo.tsx`

---

### ✅ US-067: Collapsible Hero on Mobile - COMPLETE
**Priority:** P2-Medium | **Effort:** 3h | **Type:** Mobile UX

**Problem:** Hero took 1.4 screens on mobile.

**Solution:** Added collapsible hero with "Show more/less" toggle on mobile. Collapsed view shows title + time estimate.

**Acceptance Criteria:**
- [x] Mobile hero can be collapsed/expanded
- [x] Collapsed view shows title + time + expand button
- [x] "Show more/less" buttons with chevron icons
- [x] Content hidden on mobile when collapsed, always visible on desktop

**Files:** `app/[locale]/page.tsx`, `messages/*.json`

---

### ✅ US-068: Add Skill-Level Selector Modal - COMPLETE
**Priority:** P2-Medium | **Effort:** 4h | **Type:** Learning Design

**Problem:** No personalized entry point for different experience levels.

**Solution:** Created SkillSelectorModal with three paths: Beginner (opens Tokens), Intermediate (scrolls to Trunk), Advanced (scrolls to Branches).

**Acceptance Criteria:**
- [x] Skill selector modal opens via "Start Learning" CTA
- [x] 3 options with descriptions and time estimates
- [x] Each option routes to appropriate starting point
- [x] Full translations in ET and EN
- [x] "Skip and explore freely" option

**Files:** `components/SkillSelectorModal.tsx`, `app/[locale]/page.tsx`, `messages/*.json`

---

### Sprint 6 Summary

| Story | Points | Priority | Status |
|-------|--------|----------|--------|
| US-060 Hero Simplification | 4h | P0-Critical | 🔲 Pending |
| US-061 Value Proposition | 2h | P0-Critical | 🔲 Pending |
| US-062 Time Estimates | 2h | P0-Critical | 🔲 Pending |
| US-063 Move Demos | 3h | P1-High | 🔲 Pending |
| US-064 Header Simplify | 2h | P1-High | 🔲 Pending |
| US-065 Rename Views | 1h | P1-High | 🔲 Pending |
| US-066 Vector Touch | 2h | P1-High | 🔲 Pending |
| US-067 Collapsible Hero | 3h | P2-Medium | 🔲 Pending |
| US-068 Skill Selector | 4h | P2-Medium | 🔲 Pending |

**Total:** 23h | **Sprint Goal:** 60% clutter reduction, better learning flow

**Recommended Order:**
1. US-061 (value prop) - Quick win, major impact
2. US-062 (time estimates) - Quick win, adult learner need
3. US-060 (hero simplify) - Core minimalism goal
4. US-065 (rename views) - Quick terminology fix
5. US-064 (header simplify) - Extends existing SettingsDropdown
6. US-063 (move demos) - Better pedagogical flow
7. US-066 (vector touch) - Mobile fix
8. US-067, US-068 - If time permits

---

*Less is More. The best code is the code you don't write.*
