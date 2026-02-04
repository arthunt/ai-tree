# Dendrix.ai DNA Simulation — Expert Panel & Focus Group Review

**Date:** 2026-02-04  
**Input:** Recording "5_review.mov" (44s) — Iteration 5 of T→V→A→P simulation  
**Sentence:** "Koer on inimese parim" → Prediction: "sõber" (78%) ✅  
**Method:** Frame-by-frame analysis at 4fps (177 frames) through 5 expert lenses + simulated novice focus group  
**Previous Review:** DENDRIX_DNA_EXPERT_REVIEW_SPRINT5.md (based on 4_review.mov)

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices in Estonia. The sentence is "Koer on inimese parim" with predicted next word "sõber" (78%).

This is Sprint 6 review. The previous Sprint 5 review identified 6 priority issues. This review evaluates which fixes landed, what regressed, and what new issues emerged. The expert panel (UX designer, ML educator, Estonian language specialist, mobile engineer, accessibility specialist) and a simulated focus group of 6 novice users reviewed the recording.

---

## SPRINT 5 ISSUE RESOLUTION STATUS

| Sprint 5 Issue | Priority | Status | Notes |
|---|---|---|---|
| P1: Prediction — no input context | 🔴 Critical | ✅ **FIXED** | "Koer on inimese parim ___" + "Mis sõna tuleb järgmisena?" now shown |
| P1: Prediction — culturally unclear words | 🔴 Critical | ✅ **FIXED** | Replaced with sõber/kaaslane/semu/lemmik |
| P1: Prediction — bars too fast | 🔴 Critical | ⚠️ **PARTIALLY FIXED** | Bars appear staggered but static pause is still too short |
| P2: Card layout — active card pushed down | 🔴 Critical | ❌ **NOT FIXED** | Completed steps still stack above active card |
| P3: Vector labels unreadable | 🟠 Medium | ⚠️ **IMPROVED** | Labels are now white text, but font still ~12px |
| P4a: Mirrored token numbers | 🟡 Low | ❌ **NOT FIXED** | Digits still render mirrored during initial animation |
| P4b: 8 tokens shown instead of 4 | 🟡 Low | ✅ **FIXED** | Now shows exactly 4 token badges |
| P4c: Vector count says 8 | 🟡 Low | ❌ **NOT FIXED** | Collapsed V step still says "Kaardistatud 8 koordinaadile" |
| P5: Attention arc thickness | 🟡 Low | ⚠️ **IMPROVED** | Thickness variation is now visible but subtle |
| P6a: "Peata" button position | 🟢 Minor | ❌ **NOT FIXED** | Still appears as full-width button |
| P6b: "Mine Sügavamale" during auto-play | 🟢 Minor | ❌ **NOT FIXED** | Still visible during animation |
| P6c: Bottom nav during simulation | 🟢 Minor | ❌ **NOT FIXED** | DNA nav bar still visible |

**Summary: 3 of 12 issues fully fixed, 3 partially improved, 6 not addressed.**

The prediction step — the simulation's climax — has improved dramatically. The remaining issues are layout, consistency, and polish.

---

## OVERALL VERDICT

Sprint 5 was the hardest sprint because it touched the most critical user experience moment — the prediction "aha!" — and it delivered. The input sentence prompt, the question framing, and the culturally correct word choices make the prediction step genuinely educational for the first time. A novice watching this can now understand what the model is doing.

However, the simulation still has **three categories of unresolved issues**: (1) a data consistency bug ("8 koordinaadile" when showing 4 tokens), (2) the card layout problem that wastes mobile viewport, and (3) the tokenization mirroring glitch that undermines trust. These prevent shipping as a finished product.

The simulation now runs in ~44 seconds (up from 35s). Target should be ~50-55 seconds with the timing adjustments below.

---

## 🔴 PRIORITY 1: DATA CONSISTENCY — "8 koordinaadile" Must Match 4 Tokens

**All 5 experts flagged this. 3/6 focus group noticed.**

### The Problem

The tokenization step correctly shows 4 tokens: [5241] [4551] [1254] [7997]  
The collapsed T step correctly says: "Tekst tükeldatud 4 osaks" ✅  
**BUT the collapsed V step says: "Kaardistatud 8 koordinaadile"** ❌

> **ML Educator:** "This is the single worst data error in the simulation. You show 4 words, explain 4 tokens, plot 4 dots on the scatter — then the summary says 8. A novice will think they missed something. A teacher using this will lose credibility."

> **Focus group participant (Andres, 35, programmer):** "Wait — 4 words became 4 numbers, but then it says 8 coordinates? Did I miss half the words?"

> **Focus group participant (Kersti, 55, retired):** "I didn't notice the number, but now that you point it out — what are the other 4?"

### Required Fix

One-line text change. The collapsed Vector step summary must say:

```
"Kaardistatud 4 koordinaadile"
```

Not 8. This was flagged in Sprint 5 (issue P4c) and not addressed.

**Effort: < 5 minutes.** This is a string literal.

---

## 🔴 PRIORITY 2: TOKEN MIRRORING — Digits Render Backwards During Animation

**4/5 experts flagged. 4/6 focus group noticed.**

### Frame-by-Frame Evidence

| Timepoint | Frame | Token badges display |
|---|---|---|
| ~5.0s | frame_0020 | `2547` `4227` `1524` `1861` — **MIRRORED** |
| ~5.5s | frame_0022 | Same mirrored values during "TÜKKIDE PAKENDAMINE..." |
| ~6.5s | frame_0025 | `5241` `4551` `1254` `7997` — labels transitioning |
| ~7.5s | frame_0030 | `5241` `4551` `1254` `7997` — **CORRECT final values** |

The token badges animate through a phase where digits appear horizontally mirrored (reversed). The "2547" is visually a mirror of "7452" (or similar — the exact flip depends on the CSS transform). This lasts approximately 1-2 seconds.

> **Mobile Engineer:** "This is a CSS `transform: scaleX(-1)` or `rotateY(180deg)` applied during the 'spin' or 'flip' animation. The text inside the badge inherits the parent's transform. Fix: apply `transform: scaleX(-1)` to the text child DURING the parent flip, so the double-negative makes text readable. Or use `will-change: transform` with a clip path."

> **Focus group participant (Tõnis, 28, warehouse worker):** "The numbers were weird at first — like looking in a mirror. Then they fixed themselves. It made me doubt whether the final numbers were right either."

> **Focus group participant (Mari, 42, teacher):** "I saw backwards numbers and thought my phone was glitching."

### Required Fix

```css
/* During flip animation, counter-rotate the text */
.token-badge.flipping .token-text {
  transform: scaleX(-1); /* cancels parent mirror */
  font-family: -apple-system, 'SF Mono', 'Menlo', monospace;
  font-variant-numeric: tabular-nums;
}

/* OR: disable the flip entirely and use a fade/scale animation instead */
@keyframes tokenReveal {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
}
```

**Recommendation: Replace the flip animation with a simpler fade-in + scale-up.** Flips are visually clever but create this mirroring bug on mobile Safari and are disorienting on small screens. A 300ms fade-in achieves the same "reveal" effect without the text legibility risk.

**Effort: ~1 hour**

---

## 🔴 PRIORITY 3: CARD LAYOUT — Active Card Still Buried Below Completed Steps

**4/5 experts. 5/6 focus group.**

### Measured Viewport Usage (iPhone viewport)

When the Prediction step activates (frame_0115):

| Element | Height | Y position |
|---|---|---|
| Status bar | ~44px | 0 |
| Back + hamburger + collapsed V header | ~48px | 44 |
| Collapsed "Kuidas AI loeb — 4 osaks" | ~56px | 92 |
| Collapsed "Sõnadest saavad arvud — 8 koordinaadile" | ~56px | 148 |
| Collapsed "Seoste Loomine — 3 seost leitud" | ~56px | 204 |
| **Active "Ennustamine" card header** | starts at ~260px | 260 |
| Description + "MUDEL ARVUTAB..." | ~120px | |
| Prediction bars | ~200px | |
| **Total content height** | ~580px+ | |
| **Viewport remaining** | ~540px | |

The active card starts at Y=260px. On an iPhone SE (667px viewport), that leaves ~407px for the prediction card content. The prediction section needs ~400-500px minimum (prompt + 4 bars + winner + explanation).

> **UX Expert:** "This was Priority 2 in Sprint 5 and it's still not fixed. The prediction is the emotional climax. Burying it 260px down the screen with three collapsed gray bars above it is like putting the movie's finale behind a credits roll."

> **Focus group participant (Peeter, 62, farmer):** "When the guess part appeared, I had to scroll down. By the time I scrolled, the animation was already halfway done."

> **Focus group participant (Liisa, 22, student):** "The gray boxes at the top — I don't need to see them anymore. They're done. Why are they still there?"

### Required Fix — Two Options

**Option A: Auto-scroll (recommended — least code change)**

On each step transition, `scrollIntoView` the active card to the top of the viewport:

```typescript
useEffect(() => {
  if (activeStepRef.current) {
    activeStepRef.current.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}, [activeStep]);
```

This keeps collapsed steps in the DOM (scrollable upward) but immediately centers the action.

**Option B: Replace collapsed steps with breadcrumb (more work, better UX)**

Replace the three stacked collapse bars with a single compact breadcrumb:

```
T✓ · V✓ · A✓ · P●
```

This saves ~168px of vertical space and eliminates the "gray stack" entirely.

**Effort: Option A ~30 min, Option B ~2 hours**

---

## 🟠 PRIORITY 4: PREDICTION TIMING — Bars Appear Together, Static Pause Too Short

**3/5 experts. 4/6 focus group.**

### Timing Analysis (measured at 4fps)

| Phase | Sprint 5 timing | Sprint 6 current | Sprint 5 target | Gap |
|---|---|---|---|---|
| "MUDEL ARVUTAB..." spinner | ~1.5s | ~2.0s | 2.0s | ✅ Met |
| Input prompt + question visible | 0 (missing) | ~1.5s | 2.0s | ⚠️ Close |
| All 4 bars appear | simultaneous | ~1.5s stagger | 3.2s (0.8s each) | ⚠️ Faster than spec |
| All bars static/readable | ~0.75s | ~1.5s | 3.0s | ❌ Still too short |
| Losers fade + winner highlight | ~0.5s | ~1.0s | 1.5s | ⚠️ Close |
| VÕITJA display | ~4s | ~4s | 5s+ | ⚠️ Close |

**Total prediction phase: currently ~11.5s → target was 14s**

The input prompt and question are now shown — major improvement. But the bars still appear too quickly for novices to read all four words and process the percentages.

> **Focus group participant (Kadri, 38, nurse):** "I saw the bars but only had time to read 'sõber 78%' before the other three went gray. I wanted to read what the other options were."

> **ML Educator:** "The whole educational point of showing 4 candidates is that the user compares them and thinks 'yes, sõber makes most sense.' If they can't read all four, the comparison never happens."

### Required Fix — Extend Static Pause

The key missing phase is a **3-second static pause** where all 4 bars are fully visible with no animation. This was the most important timing spec from Sprint 5.

```typescript
const PREDICTION_TIMING = {
  inputPromptDuration: 2000,    // "Koer on inimese parim ___" — unchanged
  candidateStagger: 800,         // 0.8s between each bar (total 3.2s)
  allVisiblePause: 3000,         // ← THIS IS THE CRITICAL MISSING PAUSE
  loserFadeStagger: 500,         // 0.5s between each loser fading
  preWinnerPause: 1500,          // Before VÕITJA
  winnerDisplayDuration: 5000,   // VÕITJA + explanation
};
```

**Effort: ~30 minutes** (timing constants only)

---

## 🟠 PRIORITY 5: ATTENTION STEP — Strong Improvement, Minor Polish Needed

**2/5 experts. 2/6 focus group.**

### What's Working Well ✅

The attention step is now the best it has ever been:

1. **Sequential arc reveal** — arcs appear one at a time with the strongest last. Focus group could follow the progression.
2. **"TUGEVAIM SEOS" tooltip** with specific pair (e.g., "parim ↔ inimese") — educational and clear.
3. **"PAKSUS = OLULISUS"** label at the bottom — explains the visual encoding directly. Excellent addition since Sprint 5.
4. **Words positioned horizontally** — Koer, on, inimese, parim displayed on a horizontal axis with arcs above. Much clearer than the scatter layout.

> **Focus group participant (Andres, 35):** "The lines between words — I get it now. Thicker line means stronger connection. 'parim' and 'inimese' makes sense — 'inimese parim' is one phrase."

> **Focus group participant (Mari, 42):** "This was my favorite part. I could see which words belong together."

### Remaining Issues

**5A: Arc colors are hard to distinguish**

The three arcs use similar green/teal tones. With varying thickness as the only differentiator, colorblind users (8% of males) cannot distinguish importance without relying on line thickness alone.

> **Accessibility Specialist:** "Add a secondary encoding. Either use distinct colors (green/yellow/gray) OR add dashed/dotted styles for weaker connections."

**5B: "Koer" appears disconnected**

In frames 80-85, the first arc revealed is "on ↔ Koer" but visually "Koer" sits at the far left edge with "on" next to it. The arc between them is short and flat, making it look like a decorative element rather than a meaningful connection.

> **Estonian Language Specialist:** "Pedagogically, 'Koer' is the subject of the sentence. It should feel central, not peripheral. Consider showing 'Koer → on' as the first arc FROM Koer rather than TO Koer."

### Required Fix

- Use 3 distinct shades: strongest arc = bright green (#22c55e), medium = muted green (#86efac), weakest = gray (#9ca3af)
- Or add dash pattern: strongest = solid, medium = dashed, weakest = dotted

**Effort: ~1 hour**

---

## 🟡 PRIORITY 6: STARTING SCREEN UX — Good But Has a Scroll Trap

**2/5 experts. 3/6 focus group.**

### The Problem

Frame 1 shows the starting screen with:
- Input field at top: "Kirjuta midagi (nt 'Miks taevas on sini')"
- T V A P progress indicators
- "Kuidas see töötab" section with explanation
- A prompt box: **PROOVI: "KOER ON INIMESE PARIM"** with "Puuduta selle näite proovimiseks"
- Below fold: "Kuidas AI loeb" and "Sõnadest saavad arvud" headers visible

The PROOVI prompt box is the critical call-to-action. It's well-designed with clear instruction text. However:

> **UX Expert:** "Below the CTA box I can see 'Kuidas AI loeb' and 'Sõnadest saavad arvud' which are the collapsed step cards. A curious user might scroll DOWN to explore these instead of tapping the green example prompt. The first-time experience should funnel directly to the example, not give them other things to poke at."

> **Focus group participant (Tõnis, 28):** "I saw other sections below and started scrolling down before I realized I should tap the green box."

### Required Fix

Consider hiding the step cards entirely until the simulation starts. The starting screen should show ONLY: input field + "Kuidas see töötab" explanation + PROOVI button. Nothing below the fold.

**Effort: ~30 minutes**

---

## 🟡 PRIORITY 7: EDASI/MINE SÜGAVAMALE BUTTON STYLING

**1/5 experts. 2/6 focus group.**

### Observation

The "Edasi" button color changed between contexts:
- Before simulation: **bright green** (#22c55e)
- After prediction/during steps: **amber/orange** (#f59e0b)

> **UX Expert:** "Green = go/positive. Orange = warning/caution. Using orange for 'Next' during the simulation subtly signals 'are you sure?' rather than 'keep going!' The button should be green throughout, or use the brand purple."

Additionally, "Mine Sügavamale" (Go Deeper) is still visible as a secondary button alongside "Edasi" during auto-play. Sprint 5 recommended hiding it during animation.

### Required Fix

- Standardize "Edasi" to green (#22c55e) or brand purple throughout
- Hide "Mine Sügavamale" during auto-play (show only after completion or on pause)

**Effort: ~20 minutes**

---

## 🟡 PRIORITY 8: VECTOR SCATTER LAYOUT — Labels Readable But Clustered

**2/5 experts. 3/6 focus group.**

### Improvement Since Sprint 5

The vector scatter now shows 4 word dots correctly labeled: "inimese", "Koer", "parim", "on". The "TÄHENDUSRUUM" header is present. "on" is positioned in the bottom-left, separated from the semantic cluster — correctly representing that function words sit far from content words.

### Remaining Issue

"Koer" and an additional gray dot appear very close together (frames 50-60). It's unclear what the gray dots represent — are they intermediary animation artifacts, or do they represent something meaningful?

> **ML Educator:** "If there are extra dots, explain them or remove them. Unexplained visual elements in an educational tool create confusion, not curiosity."

> **Focus group participant (Kadri, 38):** "I saw some extra dots near 'Koer'. Are those other words? Other meanings?"

The word labels are white on dark background — improved from Sprint 5. Font size is approximately 12-13px, which is readable on larger phones but tight on iPhone SE.

### Required Fix

- Remove any unlabeled/decorative dots from the scatter
- Increase word label font to 14-16px
- Ensure minimum 24px spacing between any two labels

**Effort: ~1 hour**

---

## 🟢 PRIORITY 9: COMPLETION SCREEN — Works Well

**Positive feedback from all experts and focus group.**

### What's Working ✅

- "Simulatsioon lõppenud" with green checkmark — clear completion signal
- "Sa uurisid 4-sammulist teekonda tekstist ennustuseni" — excellent summary in plain Estonian
- "VÕITJA ENNUSTUS" with "sõber" 78% in large prominent text
- Confetti animation (visible in frames 158-162) — celebratory without being excessive
- All 4 collapsed steps visible above with green checkmarks and summaries

> **Focus group participant (Kersti, 55):** "The confetti made me smile. And I could see all four steps completed — I felt like I learned something."

> **Focus group participant (Peeter, 62):** "'Sa uurisid 4-sammulist teekonda' — I understand that. Four steps, from text to prediction. That's what happened."

### Minor Enhancement

The completion screen doesn't show a "Korda uuesti" (Replay) button in the visible viewport — it may be below the fold or appear with delay. Ensure the replay option is immediately visible.

**Also missing: the explanation line.** Sprint 5 specified:
```
💡 Mudel ennustas järgmise sõna, kasutades kõike, mida ta miljonitelt tekstidelt õppis.
```
This is not visible in any frame of the completion screen. This single sentence is the educational payoff — it connects the technical pipeline to the human-understandable concept of "learning from texts."

### Required Fix

- Ensure "Korda uuesti" button is visible without scrolling
- Add the explanation line below VÕITJA ENNUSTUS

**Effort: ~30 minutes**

---

## FOCUS GROUP TRANSCRIPT HIGHLIGHTS

Six simulated novice users (ages 22-62, no AI experience, native Estonian speakers) watched the recording once and described their experience:

### What They Understood ✅

**Mari (42, teacher):** "This time it made sense! I saw the sentence at the top, then the four options appeared. 'Sõber' is obviously the right word — and the computer got it right. I understand that AI works by guessing the most likely next word."

**Andres (35, programmer):** "The whole pipeline is clear now. Break into tokens, map to a space, find connections, predict. The proverb trick is brilliant — you KNOW the answer, so when the AI gets it right, you feel the mechanism."

**Kersti (55, retired):** "I liked the thick and thin lines part [attention]. And the final guess — I saw 'kaaslane' and 'semu' and thought 'hmm, those could work too' before 'sõber' won. That was fun."

### Where They Got Lost ❌

**Tõnis (28, warehouse worker):** "The numbers were backwards for a second [token mirroring], which was weird. And then later it said 8 coordinates but I only counted 4 dots."

**Liisa (22, student):** "I wish the four options stayed visible longer. I was still reading 'lemmik' when they started fading."

**Peeter (62, farmer):** "The gray boxes at the top keep pushing the interesting stuff down. I had to scroll during the guess part."

**Kadri (38, nurse):** "Some extra dots on the map that I didn't understand. And the numbers changed — why does it show different numbers at different times?"

### Focus Group Consensus

| Aspect | Sprint 5 | Sprint 6 | Change | Key Quote |
|---|---|---|---|---|
| Overall concept understood | 3.8 | **4.3** | +0.5 | "I get how AI predicts words now" |
| Input sentence choice | 4.5 | **4.5** | — | "Koer on inimese parim — perfect" |
| Tokenization step clarity | 3.2 | **3.5** | +0.3 | "4 words, 4 numbers — makes sense (except the flip)" |
| Vector step clarity | 2.0 | **3.0** | +1.0 | "4 dots on a map, similar words are close" |
| Attention step clarity | 2.8 | **3.8** | +1.0 | "Thick lines = strong connections — I liked this" |
| Prediction step clarity | 2.5 | **4.0** | +1.5 | "I saw the question, the options, and the winner" |
| Prediction "aha!" moment | 3.5 | **4.3** | +0.8 | "I knew it was sõber before the computer showed it!" |
| Card transitions comfort | 2.2 | **2.8** | +0.6 | "Still jumpy but less than before" |
| Would use again? | 3.8 | **4.5** | +0.7 | "Definitely. I'd show this to my colleagues." |

### Top 3 Focus Group Requests

1. **"Fix the backwards numbers — it looks broken"** (4/6 participants)
2. **"Keep the four word options visible longer"** (5/6)
3. **"Get rid of the gray boxes above when I'm in the guessing part"** (4/6)

---

## IMPLEMENTATION PRIORITY ORDER

```
Sprint 6 Scope (in exact order):
═══════════════════════════════

1. DATA CONSISTENCY FIX .................. ~5 minutes
   a. Change "8 koordinaadile" → "4 koordinaadile" 
   
2. TOKEN MIRRORING FIX ................... ~1 hour
   a. Replace flip animation with fade-in + scale
   b. OR counter-rotate text during flip
   c. Test on iOS Safari specifically

3. CARD LAYOUT — ACTIVE AT TOP ........... ~30 min (Option A)
   a. scrollIntoView active step on transition
   b. Smooth scroll behavior
   c. Test on iPhone SE viewport

4. PREDICTION STATIC PAUSE ............... ~30 min
   a. Add 3-second allVisiblePause constant
   b. Ensure all 4 bars remain fully visible for 3s
   c. Only THEN begin loser fading

5. COMPLETION SCREEN ADDITIONS ........... ~30 min
   a. Add explanation: "Mudel ennustas järgmise sõna..."
   b. Ensure "Korda uuesti" is visible without scroll

6. ATTENTION ARC COLORS .................. ~1 hour
   a. Three distinct colors: bright/muted/gray
   b. OR solid/dashed/dotted line styles
   c. Remove any unlabeled dots from vector scatter

7. BUTTON CONSISTENCY ................... ~20 min
   a. "Edasi" → green everywhere
   b. Hide "Mine Sügavamale" during auto-play
   c. Hide bottom DNA nav during simulation

8. STARTING SCREEN CLEANUP .............. ~30 min
   a. Hide step cards below PROOVI button
   b. Focus funnel: input + explanation + CTA only
```

**Total estimated effort: ~5 hours**

---

## DO NOT BREAK (Carry Forward from Sprint 5)

All of these survived Sprint 5 development and must continue to be preserved:

- [x] Auto-play flow (one press to start)
- [x] "sõber" at 78% as winner
- [x] "Koer on inimese parim ___" input prompt during prediction ← NEW ✅
- [x] "Mis sõna tuleb järgmisena?" question text ← NEW ✅
- [x] Culturally correct candidates: sõber/kaaslane/semu/lemmik ← NEW ✅
- [x] 4 token badges (not 8) ← NEW ✅
- [x] "Tekst tükeldatud 4 osaks" tokenization summary ← NEW ✅
- [x] "MUDEL ARVUTAB..." thinking animation
- [x] Step collapse summaries with green checkmarks
- [x] Progress bar at top (T V A P with step indicators)
- [x] Vector scatter with TÄHENDUSRUUM header
- [x] Attention arcs with TUGEVAIM SEOS tooltip
- [x] "PAKSUS = OLULISUS" label on attention step ← NEW ✅
- [x] Winner trophy + loser fading
- [x] Confetti + "Simulatsioon lõppenud" completion
- [x] "Sa uurisid 4-sammulist teekonda tekstist ennustuseni" completion text

---

## QUICK REFERENCE: Values That Must Not Change

### Prediction Candidates (CONFIRMED CORRECT)

```typescript
const predictionCandidates = [
  { word: "sõber",    probability: 0.78, isWinner: true  },
  { word: "kaaslane",  probability: 0.09, isWinner: false },
  { word: "semu",      probability: 0.07, isWinner: false },
  { word: "lemmik",    probability: 0.06, isWinner: false },
];
```

### Tokenization (4 whole-word tokens — CONFIRMED)

```
[Koer: 5241]  [on: 4551]  [inimese: 1254]  [parim: 7997]
```
Summary: "Tekst tükeldatud 4 osaks" ✅  
Vector summary: **"Kaardistatud 4 koordinaadile"** ← FIX NEEDED (currently says 8)

### Timing Constants (UPDATED TARGETS)

```typescript
const PREDICTION_TIMING = {
  inputPromptDuration: 2000,    // "Koer on inimese parim ___" 
  candidateStagger: 800,         // 0.8s between each bar appearing
  allVisiblePause: 3000,         // ← ADD THIS: 3s static display
  loserFadeStagger: 500,         // 0.5s between each loser fading
  preWinnerPause: 1500,          // Before VÕITJA
  winnerDisplayDuration: 5000,   // VÕITJA + explanation
};
```

---

## SPRINT-OVER-SPRINT PROGRESS

| Metric | Sprint 4 (3_review) | Sprint 5 (4_review) | Sprint 6 (5_review) | Trend |
|---|---|---|---|---|
| Simulation duration | ~30s | ~35s | ~44s | ↗️ Getting closer to target 55s |
| Focus group overall score | ~3.0 est. | 3.8 | **4.3** | ↗️ Significant improvement |
| Prediction clarity | ~2.0 est. | 2.5 | **4.0** | ↗️↗️ Dramatic improvement |
| Attention clarity | ~2.0 est. | 2.8 | **3.8** | ↗️ Strong improvement |
| Card comfort | ~2.0 est. | 2.2 | **2.8** | ↗️ Improving but still lowest score |
| "Would use again?" | ~3.0 est. | 3.8 | **4.5** | ↗️ Near-ready for public use |

The trajectory is clear: **the simulation is converging toward a shippable product.** One more sprint focusing on the Priority 1-4 fixes above should bring it across the finish line.
