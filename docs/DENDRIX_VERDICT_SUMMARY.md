# Dendrix-ux Prototype: Quick Verdict

**Date:** 2026-01-28 | **Analyst:** Research Agent

---

## 🚨 TL;DR

**VERDICT: DISCARD**

The Dendrix-ux prototype is a marketing page for a SaaS product.
AI Tree is an educational platform.

These are **different products** with **conflicting goals**.

---

## The Numbers

| Metric | AI Tree | Dendrix-ux | Winner |
|--------|---------|------------|--------|
| **Educational Content** | 20 concepts, 40+ explanations | 0 concepts | 🌳 AI Tree |
| **Mobile Score** | 9/10 | 3/10 | 🌳 AI Tree |
| **Accessibility** | WCAG AA compliant | Multiple violations | 🌳 AI Tree |
| **Performance** | ~150KB initial | ~500KB+ (Three.js) | 🌳 AI Tree |
| **Learning Value** | HIGH | LOW (2/10) | 🌳 AI Tree |
| **Visual Polish** | Good | Excellent | ⚡ Dendrix |

---

## What Each Product Does

### AI Tree (Current)
**Purpose:** Teach AI concepts to non-technical people
**Audience:** Trainers, team leads, curious learners
**Goal:** "Understand AI to make decisions" (~2 hours)
**Model:** Free, public, no login

### Dendrix-ux (Prototype)
**Purpose:** Sell an AI agent training platform
**Audience:** Developers, enterprise buyers
**Goal:** Impress and convert to sign-up
**Model:** SaaS (pricing, login implied)

---

## Why They Don't Mix

1. **Different Missions**
   - AI Tree: Education → Understanding
   - Dendrix: Marketing → Sales

2. **Different Audiences**
   - AI Tree: Non-technical learners
   - Dendrix: Technical practitioners

3. **Different Philosophy**
   - AI Tree: "KISS", "Less is More", accessibility
   - Dendrix: Spectacle, immersion, "wow factor"

4. **Technical Conflict**
   - AI Tree: Mobile-first, 150KB, WCAG AA
   - Dendrix: Desktop-first, 500KB, 3D (WebGL required)

---

## What to Salvage (15%)

### ✅ Adapt These 3 Elements:

1. **Live Tokenizer Input** ⭐⭐⭐⭐⭐
   - Show tokens appearing as user types
   - Add to TokenizerDemo.tsx
   - Effort: 3h | Value: HIGH

2. **Bento Grid Layout** ⭐⭐⭐⭐
   - Highlight key concepts (2x size)
   - Optional enhancement to LevelSection
   - Effort: 4h | Value: MEDIUM

3. **RAG Before/After Demo** ⭐⭐⭐
   - Show hallucination vs grounded answer
   - Fix misleading "unstable" metaphor
   - Effort: 5h | Value: HIGH

**Total Effort:** 12 hours
**Risk:** Low (isolated changes)

---

## What to Discard (85%)

❌ **3D Neural Network Background**
- Reason: Pure decoration, drains battery, no educational value

❌ **Glassmorphism UI**
- Reason: Poor contrast, violates WCAG AA

❌ **Dark Cyberpunk Theme**
- Reason: Developer aesthetic, not learner-friendly

❌ **"Jitter Mode" Animation**
- Reason: Distracting, teaches wrong mental model

❌ **Fine-Tuning Metrics Card**
- Reason: Beyond AI Tree scope (fundamentals only)

❌ **Login/Pricing Nav**
- Reason: AI Tree is free, no accounts

---

## The Verdict Explained

### Question 1: Same product?
**NO.** Education platform ≠ Marketing page

### Question 2: Does prototype serve learning?
**NO.** Rating: 2/10 (no content, all style)

### Question 3: Mobile usable?
**NO.** 3D canvas, poor contrast, heavy bundle

### Question 4: What to do?
**ARCHIVE it.** It's a beautiful distraction.

---

## Recommended Action

1. ✅ **Archive prototype folder**
   - Move to `/archive/` or delete
   - It served its purpose (design exploration)

2. ✅ **Continue AI Tree development**
   - Current path is correct
   - Sprint 6 (Minimalism) is on target

3. ⚠️ **Optional: Salvage 3 elements**
   - Only if you have 12 hours to spare
   - Not critical for success
   - Creates 3 new user stories

---

## Final Score

**AI Tree:** 9/10 (excellent educational platform)
**Dendrix-ux:** 8/10 (excellent marketing page for wrong product)
**Fit:** 2/10 (incompatible goals, audiences, philosophies)

---

## One Sentence Summary

> The Dendrix-ux prototype is a well-designed marketing page for a SaaS product that doesn't exist, while AI Tree is a working educational platform—keep building AI Tree and archive the prototype.

---

**Full Analysis:** `/docs/DENDRIX_PROTOTYPE_ANALYSIS.md`
**Prepared By:** Research Agent
**Confidence:** 95% (High)
