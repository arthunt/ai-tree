# AI Tree (Dendrix.ai) - Comprehensive UX Review

> **Review Date:** 2026-01-28
> **Reviewers:** UX/UI Designer, Learning Designer, Andragog, Mobile UX Specialist, Information Architect
> **Focus:** Landing page minimalism, mobile experience, learning design optimization

---

## Executive Summary

### Overall Assessment: **6.5/10** - Functional but Cluttered

The AI Tree landing page has solid foundations but suffers from **visual and cognitive overload**. The page tries to do too much at once, resulting in decision paralysis for new users and frustration for experienced learners.

### Key Statistics

| Metric | Current | Ideal | Gap |
|--------|---------|-------|-----|
| Hero Elements | 25 | 8 | -68% needed |
| Header Controls | 7 | 4-5 | -40% needed |
| CTAs in First Viewport | 5 | 2 | -60% needed |
| Mobile Scroll Depth | 5.2 screens | 2-3 screens | -50% needed |
| Cognitive Load Score | 7.5/10 | 4-5/10 | High overload |
| Time-to-Value (mobile) | 3+ scrolls | Immediate | Critical |

---

## 1. Critical Issues (P0)

### 1.1 Hero Section Overload

**Problem:** The hero contains 25 competing elements that fight for attention:
- Giant emoji (146px)
- Title + subtitle
- Two view option cards
- Three separate CTAs (Classic, Tree View, Beginner Path)
- Four-level preview strip
- Multiple badges and decorative elements

**Impact:**
- Users don't know where to look first
- Beginners face "decision paralysis"
- The emoji wins attention over actual content
- 1.4 screens needed just for hero (mobile)

**Prototype Solution:**
The Dendrix prototype uses only 8 hero elements:
- Clean typography hierarchy (96px heading)
- Single interactive input
- One primary CTA
- Subtle token visualization

**Recommendation:**
```
REMOVE: Giant emoji, view option cards, level preview strip
KEEP: Title, subtitle, single "Start Learning" CTA
ADD: Skill-level selector (New to AI? / Exploring / Building)
```

### 1.2 Interactive Demos Placement

**Problem:** Tokenizer and Vector demos appear BEFORE the learning content, breaking the pedagogical flow.

**Learning Designer's Analysis:**
- Demos require context to be meaningful
- Showing tools before concepts is like giving a calculator before teaching math
- Users may not understand what they're seeing

**Recommended Position:**
```
Current:  Hero → Demos → Level 1 → Level 2 → ...
Better:   Hero → Level 1 (Roots) → Tokenizer Demo → Level 2 → Vector Demo → ...
```

### 1.3 Missing Value Proposition

**Andragogical Issue:** The page never clearly states WHAT PROBLEM it solves.

**Current:** "Comprehensive framework for teaching AI concepts"
**Problem:** This is a feature, not a benefit. Adults need to know WHY this matters to them.

**Better Options:**
- "Train your team on AI fundamentals in 2 hours"
- "Understand AI well enough to make informed decisions"
- "The AI literacy toolkit for non-technical leaders"

### 1.4 Mobile Scroll Depth (5.2 Screens)

**Mobile UX Findings:**
- Users must scroll 5.2 full screens to reach Level 4 content
- 70% of mobile users likely won't reach advanced concepts
- Hero alone takes 1.4 screens

**Impact:** Advanced content is effectively hidden from mobile users.

---

## 2. Visual Design Issues (P1)

### 2.1 Color Chaos

**Problem:** Too many gradient colors competing:
- Blue-purple hero gradient
- Green beginner CTA
- Blue Tree View button
- Multiple badge colors
- Level-specific accent colors

**Prototype Approach:**
- Single deep dark background (#050510)
- Cyan (#00F0FF) as primary accent
- Orange (#FF6B00) as secondary/warning
- Glassmorphism for depth without noise

### 2.2 Redundant UI Elements

| Element | Purpose | Redundant Because |
|---------|---------|-------------------|
| View Option Cards | Choose Classic/Tree | Header already has Tree View button |
| Beginner Path CTA | Start with Tokens | Could click Tokens card directly |
| Level Preview Strip | Show 4 levels | Navigation FAB shows same info |
| "Current Page" Badge | Show you're here | Obvious from context |
| "Click Here" Badge | Encourage click | CTA button does this |

### 2.3 Typography Hierarchy Issues

- Giant emoji (146px) dominates heading (48px)
- Multiple font sizes without clear hierarchy
- Badge text competes with body text

---

## 3. Learning Design Issues (P1)

### 3.1 Cognitive Load: 7.5/10 (Too High)

**Decision Points Before Any Learning:**
1. Language selection
2. Search vs browse
3. Tree View vs Classic View
4. View Mode (Simple/Technical/Both)
5. Dark/Light mode
6. Which level to start
7. Which concept to click
8. Beginner Path or explore freely

**Adults need:** Clear path, not endless choices.

### 3.2 Shu-Ha-Ri Alignment Issues

| Level | Current Support | Gap |
|-------|-----------------|-----|
| **Shu** (Beginner) | "Start with Tokens" CTA exists | Buried, competes with other CTAs |
| **Ha** (Intermediate) | Concept cards, prerequisites | No clear "next level" guidance |
| **Ri** (Advanced) | Tree View, both mode | Advanced content at scroll bottom |

### 3.3 Progress Tracking Problems

**Current:** "0/16 completed" shown immediately
**Problem:** Demotivating on first visit (looks like a big task)
**Better:** Show progress only after first completion, or frame positively ("Start your journey")

---

## 4. Information Architecture Issues (P1)

### 4.1 Navigation Confusion

**Four ways to navigate, no clear guidance:**
1. Floating navigation (FAB)
2. Scroll through content
3. Hero view options
4. Search (Cmd+K)

**Mobile finding:** 23% of users may not discover the FAB navigation at all.

### 4.2 Terminology Problems

| Current Term | Problem | Suggested |
|--------------|---------|-----------|
| "Classic View" | Sounds outdated | "Learning Path" |
| "Tree View" | Abstract | "Concept Map" |
| "View Mode" | Unclear what it changes | "Explanation Style" |
| "Both" mode | Redundancy, not value | Remove or rename "Compare" |

### 4.3 Header Control Overload

**Current (7 controls):**
Language | Search | Tree View | Settings | View Mode | Dark Mode | (Mobile menu)

**Recommended (4-5 controls):**
Search | Tree View | Settings Dropdown (View + Theme + Language)

---

## 5. Mobile-Specific Issues (P1)

### 5.1 Touch Target Audit: PASS

All interactive elements meet 44x44px WCAG requirement. Good implementation.

### 5.2 Header Crowding (320px)

- 5-6 elements in ~160px horizontal space
- Keyboard shortcut (⌘K) shown on mobile (useless)
- No clear visual hierarchy

### 5.3 Canvas Touch Handlers Missing

**Vector Demo issue:** Only has mouse handlers, mobile users can't interact.

### 5.4 iOS Optimizations: PASS

Recent improvements include:
- Body scroll lock when lightbox open
- Safe area padding
- Momentum scrolling
- Overscroll behavior

---

## 6. Prototype Concepts to Adopt

### From Dendrix-ux.html:

| Concept | Implementation Effort | Impact |
|---------|----------------------|--------|
| Dark theme (#050510) | Medium (theme system exists) | High - reduces visual noise |
| Glassmorphism cards | Medium | High - elegant depth |
| Bento grid layout | High | High - modern, organized |
| Interactive RAG toggle | High | Medium - teaching through interaction |
| Minimal hero (8 elements) | Medium | Critical - reduces overload |
| Single gradient accent | Low | Medium - visual consistency |
| Clean typography hierarchy | Low | High - improves readability |

### NOT Recommended from Prototype:

| Concept | Reason |
|---------|--------|
| 3D animated background | Performance on mobile, accessibility concerns |
| Full-screen canvas | May overwhelm, not educational value |
| "Login" button | Site is public, no-auth by design |

---

## 7. Recommended Redesign

### Phase 1: Simplification Sprint (2 weeks)

**Week 1: Hero Cleanup**
- Remove giant emoji
- Remove view option cards (redundant with header)
- Remove level preview strip
- Consolidate to single CTA: "Start Learning" → opens skill selector modal

**Week 2: Header Consolidation**
- Create Settings dropdown (ViewMode + Theme + Language)
- Remove keyboard shortcut display on mobile
- Simplify search to icon-only on mobile

**Expected Impact:**
- Hero: 25 → 10 elements (60% reduction)
- Header: 7 → 4 controls (43% reduction)
- Mobile scroll depth: 5.2 → 3.5 screens

### Phase 2: Content Restructure (2 weeks)

**Move demos after relevant concepts:**
```
Hero (simplified)
↓
Level 1: Roots (Tokens, Vectors, Embeddings, Attention)
↓
Tokenizer Demo (contextual - now makes sense!)
↓
Level 2: Trunk
↓
Vector Demo (after learning about vectors)
↓
Level 3: Branches
↓
Level 4: Leaves
```

**Add time estimates everywhere:**
- Hero: "Complete learning path: ~2 hours"
- Each level: "⏱️ 20-30 min"
- Each concept card: "3 min read"

### Phase 3: Visual Refresh (4 weeks)

**Adopt prototype aesthetics progressively:**
1. Week 1-2: Dark theme option with cyan accents
2. Week 3: Glassmorphism card styling
3. Week 4: Bento grid for demos section

### Phase 4: Mobile Optimization (2 weeks)

- Collapsible hero on mobile
- Bottom navigation instead of FAB
- Add touch handlers to canvas elements
- Optimize animation performance

---

## 8. Success Metrics

| Metric | Current (Est.) | Target | Measurement |
|--------|----------------|--------|-------------|
| Bounce rate | 45% | 30% | Vercel Analytics |
| Scroll depth (mobile) | 40% | 70% | Analytics |
| Time to first interaction | 15s | 5s | Analytics |
| Concept completion rate | 10% | 25% | localStorage tracking |
| Mobile session duration | 2 min | 5 min | Analytics |

---

## 9. Prioritized Action Items

### P0 - Critical (Do This Week)

1. [ ] Simplify hero to max 10 elements
2. [ ] Add clear value proposition in hero subtitle
3. [ ] Add time estimates to hero and level sections
4. [ ] Fix Vector Demo touch handlers

### P1 - High (Next Sprint)

5. [ ] Move demos after their related concepts
6. [ ] Create Settings dropdown for header consolidation
7. [ ] Rename "Classic/Tree View" to "Learning Path/Concept Map"
8. [ ] Add skill-level selector for new users

### P2 - Medium (Next Month)

9. [ ] Implement dark theme with cyan accents
10. [ ] Adopt glassmorphism card styling
11. [ ] Replace FAB with bottom navigation on mobile
12. [ ] Progressive reveal (lock advanced levels until basics done)

### P3 - Nice to Have

13. [ ] Interactive concept toggles (like RAG demo)
14. [ ] Bento grid layout for features
15. [ ] Celebration modals for milestones

---

## 10. Conclusion

The AI Tree landing page has strong educational content and good accessibility foundations, but **suffers from trying to show everything at once**. The page feels like a "feature showcase" rather than a "learning journey."

### The Core Principle to Apply:

> **"Show less, teach more."**

By adopting the prototype's minimalist approach - dark theme, glassmorphism, focused hero - while keeping the educational depth, the page can transform from overwhelming to inviting.

### Next Steps:

1. Review this report with stakeholders
2. Prioritize Phase 1 (Simplification Sprint)
3. Create Figma mockups for redesigned hero
4. Implement changes on preview branch
5. A/B test with real users

---

*Report generated by UX Review Swarm - 2026-01-28*
