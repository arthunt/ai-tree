# I18n Compliance Audit Report

**Date:** 2026-02-01
**Status:** DRAFT
**Scope:** DNA & Seed Stages (EN, ET, RU)

## 1. Executive Summary

The audit reveals a **strong functional implementation** of internationalization but a **divergence from the "Narrative Quality" principles** defined in `I18N_TRANSLATION_PRINCIPLES.md`. 
While the mechanism works (all languages display correctly), the *soul* of the content—the "Invitation" and specific "Metaphor Adaptations"—has drifted. 
Specifically, the "Cooking" metaphor for Tokenization (suggested in principles) has been universally replaced by "LEGO bricks," which, while effective, contradicts the "Culturally Adapted" principle (Principle 3). 
Furthermore, the "Invitation vs. Description" (Principle 1) rule is partially violated in the DNA micro-lessons, which skew towards dry description.

---

## 2. Specialist Reviews

### 🗣️ Narrative Strategist Perspective
> *"Are we telling a story or reading a manual?"*

**Findings:**
*   **Principle 1 (Invitation):** FAILED.
    *   *Current (EN):* "Words broken into pieces. Language models don't read words like we do..."
    *   *Principle Goal:* "Watch your sentence shatter into 47 pieces..."
    *   *Critique:* The current text describes the process rather than inviting the user to witness it. It feels like a textbook definition.
*   **Principle 3 (Metaphors):** PASS (Clarified).
    *   *Observation:* Tokenization uses "LEGO bricks" across EN, ET, and RU.
    *   *Clarification:* Initial audit flagged this as a potential thematic issue. However, per the **Metaphor Scope Boundary** update in `VISION_AND_STRATEGY.md`, concept metaphors should NOT be forced into the biological theme. "LEGO" is a valid pedagogical metaphor.
    *   *Action:* No change needed for the metaphor itself.
*   **Principle 2 (One-Breath):** PASS.
    *   most explanations are concise (15-20 words).

### 🎨 UX Designer Perspective
> *"Does the interface respect the learner?"*

**Findings:**
*   **Principle 4 (Progressive Disclosure):** PASS.
    *   The "MicroLesson" format is an excellent implementation of this. It gives a 2-sentence intro before the interactive demo.
*   **Boundaries (Layer 1 vs Layer 2):** PASS.
    *   UI chrome ("Next", "Back") is perfectly separated from content.
*   **Visual Consistency:**
    *   *Issue:* The `VectorDemo` input fields in Estonian were previously missing (fixed in recent commit).
    *   *Observation:* Colors for "Vectors" and "Embeddings" were mismatched in the code (`DNAView`), causing visual dissonance. This was patched, but highlights a risk of terminology drift affecting UI.

### 👶 Novice User Persona ("Mart", 45, Career Changer)
> *"Do I feel stupid reading this?"*

**Findings:**
*   **Tone Check:** PASS.
    *   The tone is helpful and not condescending. "Like guessing the end of a sentence" is a relatable way to explain Prediction.
*   **Confusion Points:**
    *   The term "Embeddings" is used in the Title (`DNAView`), but "Vectors" is often used in the explanation.
    *   *EN:* "Embeddings (Vectors)" -> *Body:* "Meaning as numbers."
    *   *Critique:* This dual naming ("Embeddings (Vectors)") is a bit heavy for a title. Principle 4.1 suggests "Words as Coordinates" as a title, keeping "Embeddings" for the metadata. The current implementation uses the technical term in the title, which is slight friction.

---

## 3. Gap Analysis

| Principle | Violation | Location | Severity |
|:----------|:----------|:---------|:---------|
| **1. Invitation** | Titles use technical labels ("Tokenization") instead of inviting hooks ("How AI Reads"). | `messages/*.json` (`microLesson` titles) | Medium |
| **1. Invitation** | Explanations are descriptive ("Words broken into pieces") not active ("Watch words break"). | `messages/*.json` (`microLesson` body) | Medium |
| **3. Metaphor** | Used "LEGO" everywhere instead of adapted organic metaphors (Cooking/Wood). | `messages/*.json` (`metaphor`) | Low (LEGO is fine, but Principles were ignored) |
| **4.Terminology** | Title uses "Embeddings (Vectors)" instead of Principle-suggested "Words as Coordinates". | `messages/*.json` (`vectorizing.title`) | Low |

---

## 4. Recommendations & Action Plan

To fully align with the `I18N_TRANSLATION_PRINCIPLES.md`, we recommend a **Content Refresh Sprint**:

1.  **Rewrite Titles (P1):** Change `microLesson` titles to be "Action-Oriented".
    *   *Tokenization* -> "How AI Reads" / "Teksti purustamine"
    *   *Embeddings* -> "Words to Numbers" / "Sõnadest saavad arvud"
2.  **Inject "Invitation" (P1):** Rewrite the body text of the 4 DNA steps to be active.
    *   *Old:* "Words broken into pieces."
    *   *New:* "Text shatters into tiny numbered pieces — the only language machines understand." (Directly from Principles).
3.  **Metaphor Status:** KEEP "LEGO". Do not replace with organic metaphors (per Metaphor Scope Boundary).

---

### Suggested Next Tasks

*   [x] **Task 11.1:** Content Rewrite - DNA Titles & Body (Apply Principle 1 "Invitation"). ✅ DONE by `@gemini` (EN). ET/RU pending as backlog 6.8/9.5.x.
*   [ ] **Task 11.2:** Metaphor Validation - Ensure NO forced biological metaphors exist in other concepts (Reverse Audit). See Vision & Strategy V3.0 → "Metaphor Scope Boundary".
