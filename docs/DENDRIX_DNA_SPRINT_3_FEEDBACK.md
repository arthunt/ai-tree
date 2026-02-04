# Dendrix.ai DNA Simulation — Sprint 3 Review & Feedback

**Date:** 2025-02-04
**Reviewer:** Claude (Opus 4.5)
**Input:** 1 screen recording (40s) of Sprint 3 improvements
**Context:** Builds on Iteration 1 (13 issues) and Iteration 2 (9 improvements)

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI. This document serves as both the analysis report AND the executable prompt.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices. The input sentence is currently "Mets ja puu on elu" (Forest and tree are life).

## Sprint 3 Progress Summary

Good progress. Of the 9 improvements requested in Iteration 2:
- 3 are clearly fixed ✅
- 2 are partially improved ⚠️
- 4 remain unchanged or have new related issues ❌

Additionally, the product owner identified **4 new issues** during testing that need immediate attention. These are flagged below as the highest priority items.

---

## What Was Fixed Since Last Review (Keep These)

### ✅ IMPROVE-6 DONE: "MUDEL ARVUTAB..." thinking animation added
Before the prediction bars appear, a spinning/loading animation now shows with text "MUDEL ARVUTAB..." (Model is calculating...). This creates the essential pause that helps users understand the model is "processing." **Good. Keep this.**

### ✅ IMPROVE-4 DONE: "TÄHENDUSRUUM" header replaces axis labels
The vector scatter plot now shows "TÄHENDUSRUUM" (Meaning space) as a header label. The cryptic "mõõde 2" axis label is gone. The GPS metaphor in the description text carries the explanation. **Good. Keep this.**

### ✅ FIX-1 through FIX-8 preserved
Auto-play, step summaries, progress bar, winner animation, completion card, attention arcs — all improvements from previous sprints remain intact. **Good discipline.**

### ⚠️ IMPROVE-1 PARTIALLY DONE: Attention word labels now exist but placement is wrong
Words are now visible in the attention visualization. The "Tugevaim seos: puu → Me..." tooltip appears, showing word relationships. However — see NEW-3 below for the critical placement problem.

### ⚠️ IMPROVE-3 PARTIALLY DONE: Attention arcs centered better
The arc visualization now uses more of the card height, with arcs occupying roughly the middle 60% of the content area. However, the word labels below the arcs are cut off by the buttons — see NEW-3.

---

## 🔴 NEW ISSUES FROM PRODUCT OWNER TESTING (Highest Priority)

These 4 issues were identified by the product owner during hands-on testing on a large-screen device. They represent problems that will be WORSE on smaller screens.

### NEW-1: Cards overflow the viewport ⭐⭐⭐ CRITICAL — Layout

**What happens:** The active step card (e.g., Tokenization) takes up most of the screen with its animation area + "Mine Sügavamale" + "Edasi" buttons + "Peata õppimiseks" button. Below it, three locked cards ("Sõnadest saavad arvud — lukus", "Seoste Loomine — lukus", "Ennustamine — lukus") are stacked. Together with the bottom DNA navigation bar and the browser chrome, the total content exceeds the viewport height even on a LARGE screen.

**Why this matters:** On an iPhone SE (375×667px) or similar small device, only the top half of the active card would be visible. The user would have to scroll just to reach the "Edasi" button. The locked cards take up space but provide zero value during the simulation — they just show "lukus" (locked).

**Required fix:**
1. **During the active simulation, HIDE the locked step cards entirely.** Only show the currently active step card. The progress bar at the top already tells users which step they're on and how many remain.
2. Move "Peata õppimiseks" to a less prominent position — perhaps as a small icon in the top-right corner of the active card, not a full-width button.
3. The active card content (animation area) should have a `max-height` with internal scroll if needed, so it never pushes the "Edasi" button off-screen.
4. Target: The entire active step (header + description + animation + buttons) must fit within `100vh - 120px` (accounting for top nav + bottom nav).

**Implementation approach:**
```tsx
// In the step list component:
{steps.map((step, i) => {
  if (i > currentStepIndex) return null; // Don't render future locked steps
  if (i < currentStepIndex) return <CollapsedStepSummary step={step} />;
  return <ActiveStepCard step={step} />;
})}
```

### NEW-2: Tokenization animation "jumps" up and disappears ⭐⭐⭐ CRITICAL — Animation

**What happens:** When the tokenization step activates, the original words "Mets · ja · puu · on · elu" are visible at a comfortable position in the card. Then the token ID badges appear ("4551", "1526", etc.) and the ENTIRE animation area scrolls/jumps UPWARD, pushing the badges behind the top navigation header. The user sees only "4551" and "1526" peeking out below the header, then the animation completes and text "TOKENITE ID-D" and "TÜKKIDE PAKENDAMINE..." flash briefly before auto-advancing.

**The educational moment is lost.** The user should clearly see: word → token ID transformation happening in place. Instead they see the words, then a visual jump, then the top of some numbers.

**Required fix:**
1. The animation must stay WITHIN the visible card area. Set `overflow: hidden` on the card content container.
2. The token IDs should animate IN PLACE — each word visually transforms into its token ID at the same position. No vertical scrolling of the animation area.
3. Sequence should be: 
   - Show: `Mets · ja · puu · on · elu` (words with dot separators)
   - Animate each word flipping/fading to its token ID: `23415 · 267 · 4551 · 1526 · 9182`
   - Brief pause (800ms) to let user read the numbers
   - Show completion summary: "Tekst tükeldatud 6 osaks"
4. The "TÜKKIDE PAKENDAMINE..." and "TOKENITE ID-D" labels should appear INSIDE the card, not above it.

**CSS fix:**
```css
.step-card-content {
  overflow: hidden;
  position: relative;
}
.token-animation-area {
  position: relative; /* not absolute */
  max-height: 200px;
}
```

### NEW-3: Attention word labels hidden below buttons ⭐⭐⭐ CRITICAL — Layout

**What happens:** The Seoste Loomine (Attention) step now has arc connections and word labels — a clear improvement. BUT the word labels sit at the BOTTOM of the arc visualization, and below them are: "PAKSUS = OLULISUS" text → "puuduta sõna seoste nägemiseks" text → "Peata õppimiseks" button → DNA bottom nav → "Mine Sügavamale" / "Edasi" buttons. The word labels are pushed to the very edge of the viewport or completely off-screen.

**The tooltip shows "Tugevaim seos: puu → Me..." — note "Me..." is TRUNCATED.** This should read "puu → Mets" but it's cut off. The most important piece of information in the attention step (which words connect) is hidden and truncated.

**Required fix:**
1. Place word labels ABOVE the arcs, not below. Words at top → arcs curve downward between them. This way the words are always visible regardless of viewport size.
2. Or better: Put the words in a HORIZONTAL ROW at the top of the visualization area, with arcs drawn between them going downward. This is the standard attention visualization layout used in ML education.
3. Fix the tooltip truncation: "Tugevaim seos: puu → Mets" must render completely. Use CSS `white-space: nowrap` and ensure the tooltip container has enough width.
4. Remove or minimize the "puuduta sõna seoste nägemiseks" instruction text — the auto-play mode handles interaction, so this hint is confusing during automated playthrough.

**Suggested layout (top to bottom):**
```
  Mets    ja    puu    on    elu     ← word labels (always visible)
   |      |      |     |      |
   └──────┘      └─────┘      ← arcs below (thickness = importance)
              └────────────────┘

  PAKSUS = OLULISUS                  ← small legend text
```

### NEW-4: "ON" as winner creates confusion — WRONG EXAMPLE SENTENCE ⭐⭐⭐ CRITICAL — Content

**What happens:** After the full T→V→A→P pipeline runs on "Mets ja puu on elu", the prediction step shows the model's guess for the NEXT word. The winner is "on" at 15%. The VÕITJA section shows: `"Mets ja puu on elu" → "on"`.

**Why this is confusing for novices:**
1. **"on" already appears IN the sentence** (it's the 4th word). A novice will think: "The AI just repeated a word from the input? That doesn't seem smart."
2. **15% confidence is very low.** The learner expects the AI to be impressive. 15% makes the model look uncertain and unintelligent. The educational message should be "look how well the model predicts!" not "the model barely has a clue."
3. **There's no explanation of what the prediction means.** The user doesn't understand that the model is predicting what comes AFTER the last word "elu". They might think the model is predicting a word WITHIN the sentence.
4. **The sentence is a complete thought.** "Forest and tree are life" has no natural continuation, so ANY predicted next word will feel arbitrary.

**This is the single most important issue in the entire simulation.** The prediction step is the climax — the payoff for the user watching T→V→A. If it feels arbitrary, the entire lesson fails.

**Required fix — CHANGE THE EXAMPLE SENTENCE:**

Replace "Mets ja puu on elu" with a sentence that has an **obvious, intuitive next word.** The best example sentence has these properties:
- Short (4-5 words)
- The next word is universally known/expected
- High prediction confidence (60%+)
- The predicted word does NOT already appear in the sentence
- Keeps the Estonian nature/life theme if possible

**Recommended options (in priority order):**

| # | Input sentence | Expected next word | Why it works |
|---|---|---|---|
| 1 | **"Koer on inimese parim"** | **"sõber"** (friend) | Universally known phrase. "Dog is man's best → friend." Very high confidence. "sõber" doesn't appear in input. |
| 2 | **"Päike tõuseb igal"** | **"hommikul"** (morning) | Natural completion. "Sun rises every → morning." Obvious to everyone. |
| 3 | **"Talvel sajab valget"** | **"lund"** (snow) | "In winter falls white → snow." Nature theme preserved. Very intuitive. |
| 4 | **"Lapsed mängivad õues ja"** | **"naeravad"** (laugh) | "Children play outside and → laugh." Human warmth, natural completion. |

**Option 1 is strongly recommended** because:
- "Koer on inimese parim ___" is a universally known proverb completion
- Even someone who has never used AI can verify: "Yes, the model is right, the next word IS 'sõber'!"
- This creates a powerful "aha!" moment — the whole purpose of the simulation
- Confidence can be displayed at 78% or higher, making the AI look capable

**Additional fix for the prediction step (applies regardless of sentence):**

Add an EXPLANATION card below the winner, inside the visible area (above the buttons):

```
🏆 VÕITJA

"Koer on inimese parim" → "sõber" (78%)

💡 Mudel luges lauset ja ennustas, milline sõna 
   tuleb JÄRGMISENA. Ta on "lugenud" miljoneid 
   tekste ja õppinud, et "parim" järel tuleb 
   enamasti "sõber".
```

Translation: "The model read the sentence and predicted which word comes NEXT. It has 'read' millions of texts and learned that after 'parim' usually comes 'sõber'."

This explanation:
- Clarifies that the model predicts the NEXT word (not a word within)
- Explains WHY this word was chosen (learned from data)
- Connects to the larger LLM concept (trained on millions of texts)
- Gives the user the "aha!" moment of understanding

---

## Previously Requested Improvements — Status Update

| ID | Issue | Status | Notes |
|---|---|---|---|
| IMPROVE-1 | Attention word labels | ⚠️ Partial | Labels exist but hidden below viewport — see NEW-3 |
| IMPROVE-2 | More attention connections | ❌ Unchanged | Still 2 arcs. Need 4-5 with varied thickness |
| IMPROVE-3 | Attention empty space | ⚠️ Partial | Better but words still cut off — see NEW-3 |
| IMPROVE-4 | "mõõde 2" axis label | ✅ Fixed | Now shows "TÄHENDUSRUUM" |
| IMPROVE-5 | "TOKEN ID-D" truncation | ❌ Unchanged | Still truncated. Hard to read during the jump (NEW-2) |
| IMPROVE-6 | "MUDEL ARVUTAB..." animation | ✅ Fixed | Spinner + text appears before bars |
| IMPROVE-7 | Prediction result sentence | ❌ Unchanged | No "sentence → word" display in visible area |
| IMPROVE-8 | "Peata õppimiseks" button | ❌ Unchanged | Still a full-width prominent button |
| IMPROVE-9 | Bottom nav during simulation | ❌ Unchanged | DNA nav still fully visible, takes viewport space |

---

## Implementation Priority

**Sprint 4 must focus on exactly 4 things (in this order):**

### Priority 1: Change the example sentence (NEW-4)
This is the content foundation. Everything else builds on it. Switch to "Koer on inimese parim" → "sõber" and add the explanation card. This changes tokenization (5 tokens instead of 6), vectors, attention connections, and prediction outcomes — so do this FIRST before adjusting layouts.

### Priority 2: Fix card overflow — hide locked cards (NEW-1)
This is the structural fix that makes everything else fit. Hide future locked cards during simulation. This immediately frees ~200px of vertical space.

### Priority 3: Fix tokenization animation staying in-view (NEW-2)
With the overflow fixed, ensure the token animation plays within the visible card area. No upward jumping.

### Priority 4: Fix attention word label placement (NEW-3)
Words above arcs, arcs curve downward. Tooltip not truncated. With locked cards hidden (Priority 2), there's now room for this to display properly.

---

## Do Not Break (Carry Forward)

These items are working. Verify they still work after Sprint 4 changes:
- [ ] Auto-play flow (one press to start, all 4 steps run automatically)
- [ ] Step collapse summaries with completion info
- [ ] Progress bar at top with step counter
- [ ] Vector scatter with word labels and "puu"/"Mets" clustering  
- [ ] Attention arcs with "PAKSUS = OLULISUS" legend
- [ ] Winner trophy animation with X marks on losers
- [ ] Confetti completion card "Simulatsioon lõppenud"
- [ ] "MUDEL ARVUTAB..." thinking animation before prediction bars

---

## Quick Reference: New Sentence Token Map

If changing to "Koer on inimese parim":

| Position | Word | Approx Token ID | Color |
|---|---|---|---|
| 0 | Koer | 38521 | Green |
| 1 | on | 1526 | Blue |
| 2 | inimese | 72844 | Yellow |
| 3 | parim | 15673 | Orange |

Expected prediction: "sõber" at 78% confidence

Attention connections (suggested, thickest first):
1. **parim → sõber** (strongest — collocation)
2. **inimese → parim** (strong — "inimese parim" = human's best)
3. **Koer → inimese** (medium — subject-object)
4. **on → parim** (weak — grammatical link)

Vector clustering: "inimese" and "parim" should cluster (semantic pair). "Koer" somewhat close. "on" far away (function word).
