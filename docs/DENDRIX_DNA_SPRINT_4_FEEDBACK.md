# Dendrix.ai DNA Simulation — Iteration 3 (Sprint 4) Review & Feedback

**Date:** 2025-02-04  
**Reviewer:** Claude (Opus 4.5)  
**Input:** 1 screen recording (39s) — "3_iteratsiooni_tulem.mov"  
**Context:** Builds on Sprint 3 feedback (4 new issues + 9 carry-forward improvements)

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices.

The sentence was changed from "Mets ja puu on elu" to "Koer on inimese parim" as recommended in Sprint 3. Good. However, the prediction outcome was NOT updated to match — this is the most critical bug.

---

## Sprint 4 Progress Summary

| Sprint 3 Issue | Status | Notes |
|---|---|---|
| NEW-1: Card overflow / hide locked cards | ✅ Fixed | Locked cards hidden during simulation. Major improvement. |
| NEW-2: Tokenization "jumps" up | ✅ Fixed | Token IDs now display within the card. No vertical jumping. |
| NEW-3: Attention words hidden below buttons | ⚠️ Better but new issues | Words now visible above arcs. But edge clipping + tooltip truncation. |
| NEW-4: "on" winner → change to "sõber" | ❌ NOT FIXED | This is the #1 bug. Sentence changed but prediction still outputs "on" at 15%. |

---

## 🔴 CRITICAL BUG: Prediction still outputs "on" — must be "sõber"

**What happens:** The sentence is now correctly "Koer on inimese parim" but the prediction step STILL shows:
- Winner: **"on" at 15%**
- Losers: "ja", "kui", "mis"
- VÕITJA display: `"Koer on inimese parim" → "on"`
- Completion card: `VÕITJA ENNUSTUS: "on" 15%`

**Why this is broken:** The entire reason we changed the sentence was to get an intuitive, obvious prediction that creates an "aha!" moment. "Koer on inimese parim ___" → "sõber" is a universally known Estonian proverb. Instead, the model predicts "on" (which already appears IN the sentence as the 2nd word), creating exactly the same confusion we identified in Sprint 3.

**Root cause:** The prediction values appear to be HARDCODED from the old sentence "Mets ja puu on elu", not dynamically generated from the new input. The candidate list ("on", "ja", "kui", "mis") is identical to the previous version. These are generic Estonian function words, not contextual predictions for "Koer on inimese parim".

**Required fix — HARDCODE THE CORRECT PREDICTION VALUES:**

This is a demo simulation, not a live model. The prediction values should be hardcoded to match the educational purpose. Update the prediction data to:

```typescript
// In the prediction step data/config:
const predictionCandidates = [
  { word: "sõber",   probability: 0.78, isWinner: true },
  { word: "seltsiline", probability: 0.09, isWinner: false },
  { word: "kaaslane", probability: 0.07, isWinner: false },
  { word: "abiline",  probability: 0.06, isWinner: false },
];
```

**Why these specific values:**
- **"sõber" (friend) at 78%** — completes the proverb "Koer on inimese parim sõber" (A dog is man's best friend). Universally known. High confidence = model looks smart = educational win.
- **"seltsiline" (companion) at 9%** — semantically close alternative. Shows the model considers related concepts.
- **"kaaslane" (partner) at 7%** — another synonym. Demonstrates probability distribution.
- **"abiline" (helper) at 6%** — plausible but less likely. Shows the model ranks options.

**Also update the VÕITJA display to:**
```
🏆 VÕITJA
"Koer on inimese parim" → "sõber" (78%)
```

**And update the completion card to:**
```
VÕITJA ENNUSTUS
"sõber" 78%
```

**Also add an explanation line after the VÕITJA section:**
```
💡 Mudel ennustas järgmise sõna, kasutades
   kõike, mida ta miljonitelt tekstidelt õppis.
```
Translation: "The model predicted the next word using everything it learned from millions of texts."

This single sentence gives the novice the conceptual takeaway: the model learned patterns from data.

---

## 🟡 ISSUE 2: Vector word labels overlap — "parim" and "inimese" merge into unreadable text

**What happens:** In the TÄHENDUSRUUM scatter plot, the words "parim" and "inimese" are plotted as two cyan dots very close together (correct — they ARE semantically related). But their text labels overlap and merge into something that reads like "parimanese" — completely unreadable.

**Current label sizes are too small.** Even the readable labels ("on", "Koer") are small gray/colored text that would be hard to read on a smaller screen.

**Required fix — label collision detection:**

```typescript
// After calculating dot positions, check for label overlap:
function adjustLabelPositions(dots: Array<{x: number, y: number, word: string}>) {
  const MIN_LABEL_DISTANCE = 40; // minimum pixels between label centers
  
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[j].x - dots[i].x;
      const dy = dots[j].y - dots[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < MIN_LABEL_DISTANCE) {
        // Offset labels vertically: one above dot, one below
        dots[i].labelOffsetY = -18; // label above dot
        dots[j].labelOffsetY = +22; // label below dot
      }
    }
  }
}
```

**Additionally:**
1. Increase label font size from current ~10px to at least **14px** (ideally 16px on mobile)
2. Add a subtle dark background behind each label for contrast: `text-shadow: 0 0 4px rgba(0,0,0,0.8)` or a small rounded rect behind the text
3. Use **white** text for all labels, not gray. Gray on dark gray background is hard to read.

---

## 🟡 ISSUE 3: Attention word labels clip at edges + tooltip truncated

**What happens in the attention step (Seoste Loomine):**

1. **"Koer" is pushed to the far left edge** — partially clipped by the card padding. Only "Ko" + half of "e" are reliably visible.
2. **"parim" is pushed to the far right edge** — similarly clipped. Shows as "par" + half of "im".
3. **The tooltip "TUGEVAIM SEOS: parim → inime..."** is TRUNCATED — "inimese" doesn't fit. The most important educational information (which words connect) is cut off.
4. **During the animation, arcs appear to SHIFT LEFT** as new connections animate in. The words "Koer" and "on" slide toward the left edge and eventually off-screen while "inimese" and "parim" become visible. This is disorienting — it looks like words are disappearing.

**Root cause:** The 4 word labels ("Koer", "on", "inimese", "parim") are spaced evenly across the full card width with no padding, so the first and last words hit the edges. And the animation appears to pan/scroll horizontally rather than showing all words simultaneously.

**Required fix:**

1. **Add horizontal padding** of at least 20px on each side so edge words don't clip:
```css
.attention-visualization {
  padding: 0 20px;
}
```

2. **Show ALL word labels simultaneously from the start.** Don't pan or scroll. All 4 words should be visible as fixed anchor points. Only the ARCS should animate (appearing one by one).

3. **Fix the tooltip container:**
```css
.tugevaim-seos-tooltip {
  white-space: nowrap;
  max-width: none; /* or a generous width */
  left: 50%;
  transform: translateX(-50%); /* center it */
}
```

4. **Increase word label font size** to at least 14px. Currently it appears to be ~11px which is too small on mobile.

5. **Consider abbreviating the tooltip format:** Instead of "TUGEVAIM SEOS: parim → inimese" (which is long), use:
```
parim ↔ inimese (tugev)
```
This is shorter and communicates the same thing.

---

## 🟡 ISSUE 4: Tokenization shows 8 tokens — potentially confusing for novices

**What happens:** "Koer on inimese parim" gets tokenized into 8 sub-word tokens (visible as 8 badges: 6617, 1114, some reversed numbers, etc.). The step summary says "Tekst tükeldatud 8 osaks" and "Kaardistatud 8 koordinaadile".

**Why this could confuse novices:** The sentence has 4 visible words, but the system says it was split into 8 pieces. A novice might think: "I can see 4 words. Why does it say 8?"

**This is actually technically accurate** — BPE tokenizers DO split longer words into sub-tokens. "inimese" might become "inim" + "ese" and "parim" might become "par" + "im". BUT for a first-time educational experience, this complexity adds confusion without proportional learning value.

**Two options:**

**Option A (simpler, recommended for MVP):** Simplify to whole-word tokens. Show 4 badges, one per word. Change summary to "Tekst tükeldatud 4 osaks." This matches what the user can see and count.

**Option B (keep 8 tokens, but explain):** Add a brief note: "Pikemad sõnad jagati osadeks, nt 'inimese' → 'inim' + 'ese'" (Longer words were split into parts, e.g. 'inimese' → 'inim' + 'ese'). This teaches sub-word tokenization but adds complexity.

**For now, go with Option A.** The DNA level is for absolute beginners. Sub-word tokenization can be taught at the Sprout level.

---

## 🟢 ISSUE 5 (Minor): Some token ID badges show reversed/mirrored numbers

**What happens:** In the tokenization grid, some badges show numbers that appear mirrored or backwards (e.g., what looks like a reversed "7" and reversed numbers). This may be a font rendering issue with the monospace/code font used for the badges.

**Required fix:** Ensure all token ID numbers use a standard, non-decorative font. Test on iOS Safari specifically, as some monospace fonts render oddly on iOS:
```css
.token-badge {
  font-family: 'SF Mono', 'Menlo', 'Monaco', monospace;
  font-variant-numeric: tabular-nums;
}
```

---

## Implementation Priority for Sprint 5

### 🔴 Priority 1: Fix prediction to show "sõber" at 78% (CRITICAL BUG)
This is the ONLY blocker for the simulation making educational sense. Everything else is visual polish.

### 🟡 Priority 2: Fix vector label overlap (collision detection + larger font)
Quick win. Add the collision offset logic and increase font sizes.

### 🟡 Priority 3: Fix attention word clipping and tooltip truncation
Add padding, center the tooltip, show all words from the start.

### 🟡 Priority 4: Simplify to 4 whole-word tokens
Reduces confusion for beginners. Aligns token count with visible word count.

### 🟢 Priority 5: Fix mirrored token ID numbers
Font rendering issue. Quick CSS fix.

---

## Do Not Break (Carry Forward from All Previous Sprints)

These items are confirmed working in this recording. Verify they still work after changes:

- [x] ~~Locked cards hidden during simulation~~ ✅ NEW in this sprint
- [x] ~~Token animation stays within card~~ ✅ NEW in this sprint  
- [ ] Auto-play flow (one press to start, all 4 steps run automatically)
- [ ] Step collapse summaries with completion info
- [ ] Progress bar at top with step counter (shows colored segments, "2/4")
- [ ] Vector scatter with "TÄHENDUSRUUM" header and word labels
- [ ] Attention arcs with "PAKSUS = OLULISUS" legend
- [ ] Winner trophy animation with X marks on losers
- [ ] "MUDEL ARVUTAB..." thinking animation before prediction bars
- [ ] Confetti completion card "Simulatsioon lõppenud"
- [ ] "Korda uuesti" (Repeat) button on completion card

---

## Quick Reference: Correct Hardcoded Values for "Koer on inimese parim"

### Tokenization (if simplifying to 4 tokens)
| Position | Word | Display Token ID |
|---|---|---|
| 0 | Koer | 6617 |
| 1 | on | 1114 |
| 2 | inimese | 4551 |
| 3 | parim | 5420 |

Summary: "Tekst tükeldatud 4 osaks"

### Vectors
- "Koer" → yellow dot, isolated (animal concept)
- "on" → gray dot, distant from others (function word)
- "inimese" + "parim" → cyan dots, clustered together (semantic pair)
- Add label collision offset so "inimese" and "parim" don't overlap

### Attention (3 connections, appearing one by one)
| # | From | To | Strength | Arc thickness |
|---|---|---|---|---|
| 1 | on | Koer | medium | 2px |
| 2 | inimese | on | medium | 2px |
| 3 | parim | inimese | **strong** | 4px |

Tooltip for strongest: "TUGEVAIM SEOS: parim ↔ inimese"  
Summary: "3 seost leitud"

### Prediction
| Word | Probability | Display |
|---|---|---|
| **sõber** | **78%** | 🏆 Green bar, trophy icon |
| seltsiline | 9% | ✕ Gray, strikethrough |
| kaaslane | 7% | ✕ Gray, strikethrough |
| abiline | 6% | ✕ Gray, strikethrough |

VÕITJA: `"Koer on inimese parim" → "sõber" (78%)`  
Completion: `VÕITJA ENNUSTUS: "sõber" 78%`
