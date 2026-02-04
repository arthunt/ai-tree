# Dendrix.ai DNA Simulation — Expert Panel & Focus Group Review

**Date:** 2026-02-04  
**Input:** Recording "6_review.mov" (39.5s) — Iteration 6 of T→V→A→P simulation  
**Sentence:** "Koer on inimese parim" → Prediction: "sõber" (78%) ✅  
**Method:** Frame-by-frame analysis at 4fps (158 frames) through 5 expert lenses + simulated novice focus group  
**Previous Review:** DENDRIX_DNA_EXPERT_REVIEW_SPRINT6.md (based on 5_review.mov)

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices in Estonia. The sentence is "Koer on inimese parim" with predicted next word "sõber" (78%).

This is Sprint 7 review. The previous Sprint 6 review identified 8 priority issues. This review evaluates which fixes landed, what regressed, and what new confusions emerged. The expert panel (UX designer, ML educator, Estonian language specialist, mobile engineer, accessibility specialist) and a simulated focus group of 6 novice users reviewed the recording.

**User note:** "some improvements but also some confusions"

---

## SPRINT 6 ISSUE RESOLUTION STATUS

| Sprint 6 Issue | Priority | Status | Evidence (frame) | Notes |
|---|---|---|---|---|
| P1: Data consistency — "8 koordinaadile" | 🔴 Critical | ✅ **FIXED** | frame 80,115 | Collapsed V step now correctly says "Kaardistatud 4 koordinaadile" |
| P2: Token mirroring — digits reversed | 🔴 Critical | ⚠️ **IMPROVED** | frame 25 | No more reversed digits, but mid-flip text garbles briefly (word+number overlap) |
| P3: Card layout — active card at Y=260 | 🔴 Critical | ✅ **FIXED** | frame 47,115 | Active card now takes full viewport. Collapsed steps are thin single-line bars |
| P4: Prediction timing — static pause too short | 🟠 Medium | ⚠️ **PARTIALLY FIXED** | frames 117-125 | All bars visible ~2s (was 1.5s). Target was 3s. Still short. |
| P5: Attention arc colors indistinct | 🟠 Medium | ⚠️ **IMPROVED** | frames 80-107 | Arcs now reveal sequentially with clearer thickness variation |
| P6: Starting screen scroll trap | 🟡 Low | ⚠️ **PARTIALLY FIXED** | frame 1 | Step cards still faintly visible below PROOVI box |
| P7: Edasi button orange | 🟡 Low | ❌ **NOT FIXED** | frame 126 | "Edasi" still orange during prediction. More prominent than before |
| P8: Vector scatter extra dots | 🟡 Low | ⚠️ **UNCHANGED** | frame 50 | Small unlabeled dot still visible near "Koer" cluster |

**Summary: 2 critical fixes fully landed (data consistency + card layout), 4 improved, 2 not fixed.** The card layout fix is the single biggest UX improvement since the prediction step redesign.

---

## OVERALL VERDICT

Sprint 7 delivered **the two most impactful structural fixes**: the card layout (active step now fills the viewport) and the data consistency bug ("4 koordinaadile"). The simulation feels significantly more polished and usable.

However, a **new confusion has emerged in the prediction step flow**: the auto-play now pauses abruptly after showing the winner, losers vanish instantly (no fade), and then tapping "Edasi" replays the entire candidate bar animation. Users see the prediction candidates TWICE, which undermines the narrative arc. This was not present in Sprint 6 and is a regression in the prediction step flow.

A second confusion exists in the attention step: **every arc is labeled "TUGEVAIM SEOS" (strongest connection)** as it appears, but only the final arc (parim ↔ inimese) is actually the strongest. Three "strongest" labels in sequence makes the label meaningless.

The simulation runs in ~39.5 seconds — slightly shorter than Sprint 6's 44s. With the prediction flow fix, target should be ~50-55 seconds.

---

## 🔴 PRIORITY 1: PREDICTION FLOW — Double-Showing of Candidates

**All 5 experts flagged. 5/6 focus group confused.**

This is the primary source of "confusions" the user reported. It's a new regression not present in Sprint 6.

### Frame-by-Frame Evidence

| Time | Frame | What happens |
|---|---|---|
| ~29.0s | frame 116 | "MUDEL ARVUTAB..." spinner with green loading circle |
| ~29.25s | frame 117 | All 4 bars appear SIMULTANEOUSLY (sõber 78%, kaaslane 9%, semu 7%, lemmik 6%) |
| 29.25–31.0s | frames 117-124 | All bars fully visible — approximately **2 seconds** of reading time |
| ~31.25s | frame 125 | **ABRUPT**: All 3 losers VANISH INSTANTLY. Only sõber remains. Pause ❚❚ + orange "Edasi" appear |
| 31.25–32.0s | frames 125-128 | **AUTO-PLAY PAUSES.** User sees just sõber + "Edasi" button. Confusing dead end. |
| ~32.0s | frame 129 | User taps Edasi → kaaslane bar REAPPEARS, growing from left |
| 32.0–34.5s | frames 129-137 | Bars re-grow one at a time: sõber → kaaslane → semu → lemmik. **Second showing.** |
| 34.5–37.0s | frames 137-146 | All 4 bars visible again. No further animation. No loser fade. No VÕITJA label. |
| ~37.0s | frame 148 | Abrupt jump to completion screen. No transition animation visible. |

### The Three Problems

**1A: Losers vanish instantly (no fade)**

Between frame 124 and 125 (0.25 seconds), all three losing candidates disappear with zero animation. The user sees all four bars, blinks, and three are gone. This is jarring and prevents the "comparison → elimination → winner" narrative.

> **UX Expert:** "The fade-out IS the story. Without it, there's no drama — just a jump cut. The user should WATCH the losers lose."

> **Focus group participant (Andres, 35):** "I was reading 'lemmik' and suddenly there were only two words left. What happened?"

**1B: Auto-play pauses at the wrong moment**

After the losers vanish, the simulation pauses and shows an orange "Edasi" button. This forces the user to interact at the least educational moment — when there's nothing interesting on screen (just sõber's bar with no context).

> **ML Educator:** "The pause-to-advance should come AFTER the winner celebration, not during it. Pausing here breaks the emotional arc."

> **Focus group participant (Kersti, 55):** "I saw the green box with 'Edasi' and thought I had done something wrong. Was I supposed to press it?"

**1C: Tapping Edasi replays the candidates**

After pressing Edasi, the candidates reappear and their bars grow from zero again. The user sees the same information twice with no new insight.

> **Focus group participant (Tõnis, 28):** "I pressed 'Next' and the same bars came back. I thought the phone was replaying. Is it trying again?"

> **Focus group participant (Liisa, 22):** "Wait — did it predict something different the second time? No? Then why show it again?"

### Required Fix — Unified Prediction Flow

The prediction phase should be ONE continuous sequence with no interruption:

```
Phase 1: "MUDEL ARVUTAB..." spinner (2s)
Phase 2: Question + sentence prompt appears (1.5s)
Phase 3: Bars grow ONE AT A TIME with stagger (0.8s each = 3.2s total)
Phase 4: ALL 4 bars STATIC — reading pause (3.0s) ← CRITICAL
Phase 5: Losers FADE one at a time from bottom (0.5s stagger = 1.5s)
Phase 6: VÕITJA label + winner highlight (3s)
Phase 7: Auto-advance to completion (no Edasi needed)
```

**Do NOT pause for user input during the prediction phase.** The auto-play should flow continuously from MUDEL ARVUTAB through to completion. If the user wants to pause, the ❚❚ button is available.

```typescript
const PREDICTION_FLOW = {
  // Phase 1
  computeSpinner: 2000,
  // Phase 2  
  promptReveal: 1500,
  // Phase 3
  candidateStagger: 800,       // 0.8s between each bar (total 3.2s)
  // Phase 4 — THE CRITICAL MISSING PHASE
  allVisiblePause: 3000,       // 3s with ALL bars static
  // Phase 5
  loserFadeStagger: 500,       // 0.5s between each loser fading
  loserFadeDuration: 400,      // each loser fades over 400ms
  // Phase 6
  preWinnerPause: 800,
  winnerDisplayDuration: 3000, // VÕITJA label visible
  // Phase 7
  autoAdvanceDelay: 500,       // then advance to completion
};
// Total: ~16.5 seconds for the full prediction phase
```

**Effort: ~2 hours** (requires restructuring the prediction step's state machine to remove the intermediate pause)

---

## 🔴 PRIORITY 2: ATTENTION — "TUGEVAIM SEOS" Shown for Every Arc

**4/5 experts flagged. 3/6 focus group confused.**

### Frame-by-Frame Evidence

| Time | Frame | Arc shown | Tooltip text |
|---|---|---|---|
| ~20.0s | frame 80 | Koer ↔ on (thin arc) | "TUGEVAIM SEOS 🔊 on ↔ Koer" |
| ~22.5s | frame 90 | on ↔ inimese (medium arc) | "TUGEVAIM SEOS 🔊 inimese ↔ on" |
| ~26.75s | frame 107 | parim ↔ inimese (thick arc) | "TUGEVAIM SEOS 🔊 parim ↔ inimese" |

Every single arc — whether thin, medium, or thick — is labeled **"TUGEVAIM SEOS"** (strongest connection). This directly contradicts the visual encoding: if the arcs have different thicknesses to represent different strengths, and "PAKSUS = OLULISUS" explains that thicker = more important, then calling ALL of them "strongest" destroys the educational message.

> **ML Educator:** "This is the single biggest pedagogical error in this sprint. You spend effort showing thickness variation and then say 'they're all the strongest.' A student would reasonably conclude that the thickness is decorative."

> **Estonian Language Specialist:** "The first arc (on ↔ Koer) is a weak grammatical connection — 'on' is just a copula. Labeling it 'TUGEVAIM SEOS' alongside the genuinely strong 'parim ↔ inimese' makes both labels meaningless."

> **Focus group participant (Mari, 42):** "Each line said 'strongest connection' so I stopped reading it. They can't all be strongest."

> **Focus group participant (Kadri, 38):** "If they're all strongest, then none of them is. The label didn't help me."

### Required Fix — Differentiated Arc Labels

Use three distinct labels that match the arc thickness:

```typescript
const ARC_LABELS = [
  { pair: "on ↔ Koer",       label: "SEOS",           strength: "weak"   },
  { pair: "inimese ↔ on",    label: "SEOS",           strength: "medium" },
  { pair: "parim ↔ inimese", label: "TUGEVAIM SEOS",  strength: "strong" },
];
```

Alternative approach: Use "SEOS 1/3", "SEOS 2/3", "TUGEVAIM SEOS 3/3" to show progression.

Only the FINAL arc should be labeled "TUGEVAIM SEOS". Earlier arcs should use "SEOS" (connection) or "NÕRGEM SEOS" (weaker connection).

**Effort: ~30 minutes** (string change in the arc reveal config)

---

## 🟠 PRIORITY 3: PREDICTION TIMING — Bars Appear Simultaneously, Not Staggered

**3/5 experts. 4/6 focus group.**

### Evidence

In frame 117, all 4 candidate bars appear in a single frame (within 0.25s). The Sprint 6 review specified a 0.8s stagger between each bar, producing a 3.2-second "building" reveal where the user can read each candidate as it appears.

The current simultaneous appearance means the user sees all 4 options at once — information overload for novices who need to process each word individually.

> **Focus group participant (Peeter, 62):** "Four bars hit me all at once. I read 'sõber' and then tried to find the others but they were already there."

> **Focus group participant (Kadri, 38):** "If they showed up one by one, I could have thought about each one. Instead it was like a wall of information."

### Required Fix

```typescript
// Bars should grow one at a time:
// t=0ms:   sõber bar grows to 78%
// t=800ms: kaaslane bar grows to 9%
// t=1600ms: semu bar grows to 7%
// t=2400ms: lemmik bar grows to 6%
// t=2400ms+: allVisiblePause (3000ms) begins
```

**Effort: ~1 hour** (animate each bar's width transition with staggered delays)

---

## 🟠 PRIORITY 4: TOKEN FLIP — Mid-Flip Text Garble

**2/5 experts. 2/6 focus group.**

### Frame Evidence

Frame 25 shows the token flip mid-transition:
- Tokens 1-2: Already flipped to "5241" and "4551" ✅
- Token 3: Shows garbled "in1254se" — the word "inimese" and number "1254" are overlapping ⚠️
- Token 4: Still shows "parim" (hasn't started flipping)

The sequential flip (one token at a time) is a big improvement over Sprint 6's simultaneous flip with mirrored digits. The digit reversal is GONE ✅. However, each token has a ~0.5 second window where old text and new text overlap during the 3D rotation, producing unreadable characters.

> **Mobile Engineer:** "This is a CSS backface-visibility issue. The front face (word) and back face (number) are both visible during the flip midpoint. Fix: set `backface-visibility: hidden` on BOTH faces, or use a simpler crossfade animation."

> **Focus group participant (Tõnis, 28):** "The numbers weren't backwards this time! But for a split second each one looked garbled. Not as bad as before."

### Required Fix

```css
/* Option A: Fix the 3D flip */
.token-front, .token-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Option B: Replace flip with crossfade (recommended) */
@keyframes tokenFlip {
  0%   { opacity: 1; } /* word visible */
  45%  { opacity: 1; }
  50%  { opacity: 0; } /* instant swap at midpoint */
  55%  { opacity: 1; } /* number visible */
  100% { opacity: 1; }
}
```

**Effort: ~45 minutes**

---

## 🟠 PRIORITY 5: ORANGE "EDASI" BUTTON — Wrong Color, Wrong Moment

**3/5 experts. 3/6 focus group.**

### Evidence

Frame 125-127: The "Edasi" button appears in bright orange/amber during the prediction phase. This is prominent and dissonant:

1. **Color mismatch**: Orange = warning/caution in standard UI patterns. "Next" should be green (positive/go) or brand purple
2. **Appears at wrong time**: Shows up during the prediction winner display, breaking auto-play flow
3. **Competes with content**: The bright orange bar draws the eye away from the prediction result

> **UX Expert:** "An orange button screaming 'EDASI' during the prediction climax is like a fire alarm going off during the movie's ending. It's the wrong signal at the wrong time."

> **Focus group participant (Liisa, 22):** "The big orange button scared me. I thought something went wrong."

### Required Fix

- During auto-play: **Hide** the Edasi button entirely. The simulation should flow without requiring user interaction.
- On pause: Show Edasi in **green** (#22c55e) or brand purple
- On completion: Show "Korda uuesti" (Replay) in green

**Effort: ~20 minutes**

---

## 🟡 PRIORITY 6: COMPLETION SCREEN — Explanation Line Below Fold

**1/5 experts. 2/6 focus group.**

### What's Working ✅

The completion screen is significantly improved:
- "Simulatsioon lõppenud" with green checkmark ✅
- "Sa uurisid 4-sammulist teekonda tekstist ennustuseni" ✅
- "VÕITJA ENNUSTUS" with "sõber" 78% in large text ✅
- Confetti animation (frames 155-158) ✅
- Collapsed P step shows "Võitja: 'sõber' (78%)" — excellent contextual summary ✅ NEW

### Remaining Issues

**6A: Explanation line partially cut off**

Frame 148 shows the bottom of the completion card:
```
"Mudel ennustas järgmise sõna, kasutades kõike, mida ta..."
```
The text is visible but cut off by the DNA nav bar. The full sentence is the educational payoff — it must be fully readable without scrolling.

**6B: "Korda uuesti" (Replay) not visible**

No replay button appears in any completion screen frame. A user who wants to watch again has no obvious path.

**6C: DNA nav bar still visible**

The bottom nav bar with "DNA" and other icons continues to consume ~50px of viewport space during the simulation.

### Required Fix

- Move explanation line UP, above the fold (before VÕITJA ENNUSTUS, or immediately after it)
- Add "Korda uuesti" button below the explanation line, visible without scrolling
- Consider hiding DNA nav bar during simulation (frees ~50px)

**Effort: ~45 minutes**

---

## 🟡 PRIORITY 7: VECTOR SCATTER — Unlabeled Dot Persists

**1/5 experts. 2/6 focus group.**

### Evidence

Frame 50 (zoomed) shows 4 labeled word dots plus a small unlabeled gray dot near the "Koer"/"parim" cluster. This was flagged in Sprint 6 and remains unchanged.

> **Focus group participant (Kadri, 38):** "That little dot near 'Koer' — is it another word? Something the computer is thinking about?"

### Required Fix

Remove the unlabeled dot, or label it with a word if it represents something meaningful. No visual element should exist without explanation in an educational tool.

**Effort: ~15 minutes**

---

## 🟢 MAJOR IMPROVEMENTS — What Sprint 7 Got Right

These represent significant progress and must be preserved:

### 1. Card Layout Revolution ⭐

The single biggest UX improvement across all sprints. The active step now fills the viewport:

| Sprint 6 | Sprint 7 |
|---|---|
| 3 collapsed cards above active (168px) | 1-2 thin summary bars (~48-96px) |
| Active card starts at Y=260 | Active card starts at Y=~140 |
| Prediction buried below fold | Prediction fully visible |
| User must scroll during animations | No scrolling needed |

> **UX Expert:** "This is the fix that makes the simulation usable on mobile. The active step IS the screen now."

### 2. Data Consistency Fixed ⭐

"Kaardistatud 4 koordinaadile" throughout — matching the 4 tokens shown in T step. This was the most embarrassing bug and it's gone.

### 3. Token Flip Improved

Sequential word→number flip with no digit reversal. The flip animation has a brief garble (~0.3s per token) but no longer shows backwards numbers. This is a major trust improvement.

### 4. Collapsed Step Summaries Enhanced

The collapsed P step now shows "Võitja: 'sõber' (78%)" — an excellent contextual summary that reinforces the educational message even in collapsed state.

### 5. Attention Description Text

"Prožektor käib üle ruumi, leides, millised sõnad on üksteisele kõige olulisemad." — Clear, approachable Estonian description of what attention does.

### 6. Vector Description Text

"Iga sõna saab GPS-koordinaadi tähenduste universumis. Sarnased mõisted maanduvad lähestikku." — Excellent GPS metaphor for vector embeddings.

---

## FOCUS GROUP TRANSCRIPT HIGHLIGHTS

Six simulated novice users (ages 22-62, no AI experience, native Estonian speakers) watched the recording once and described their experience:

### What They Understood ✅

**Mari (42, teacher):** "This is SO much better than last time. I could see everything on the screen — no more scrolling around. The sentence, the guess options, the connections — all right there in front of me."

**Andres (35, programmer):** "The pipeline is clear: words → numbers → map → connections → guess. The layout fix makes a huge difference. I could follow along without losing my place."

**Kersti (55, retired):** "I loved seeing the thick and thin lines again [attention]. And the end screen with 'sõber' in big letters — it felt like the computer really figured it out."

### Where They Got Confused ❌

**Tõnis (28, warehouse worker):** "The guess part confused me. I saw four words, then three disappeared, then I pressed an orange button, and they came back?! I thought it was starting over."

**Liisa (22, student):** "I pressed 'Edasi' during the guess and the bars came back from zero. Was it predicting again? Did it get a different answer? No — same answer. Why show it twice?"

**Peeter (62, farmer):** "The lines — each one said 'strongest connection.' If the first one is strongest and the second one is also strongest and the third is ALSO strongest... then what's the point of the label?"

**Kadri (38, nurse):** "I liked the word map with GPS coordinates — that was clear. But the strongest-connection labels confused me. Only one can be strongest, right?"

**Mari (42, teacher):** "The orange button was jarring. Everything else was dark and calm, then suddenly BRIGHT ORANGE. I thought I broke something."

**Andres (35, programmer):** "Minor thing: during the token numbers appearing, there's a split second where the letters and numbers overlap. Not as bad as the backwards numbers from before, but still a little messy."

### Focus Group Consensus

| Aspect | Sprint 6 | Sprint 7 | Change | Key Quote |
|---|---|---|---|---|
| Overall concept understood | 4.3 | **4.5** | +0.2 | "Pipeline is clear, layout is great" |
| Input sentence choice | 4.5 | **4.5** | — | "Perfect example sentence" |
| Tokenization step clarity | 3.5 | **3.8** | +0.3 | "Words flip to numbers — makes sense (small garble)" |
| Vector step clarity | 3.0 | **3.5** | +0.5 | "GPS coordinates in meaning universe — I get it" |
| Attention step clarity | 3.8 | **3.3** | −0.5 ⚠️ | "Liked the arcs BUT 'strongest' label on every one confused me" |
| Prediction step clarity | 4.0 | **3.2** | −0.8 ⚠️ | "Saw the bars, they vanished, pressed button, saw them again??" |
| Prediction "aha!" moment | 4.3 | **3.8** | −0.5 ⚠️ | "Aha moment was diluted by seeing it twice" |
| Card transitions comfort | 2.8 | **4.2** | +1.4 ⭐ | "No more scrolling! Everything was right there." |
| Would use again? | 4.5 | **4.3** | −0.2 | "Yes but fix the double-prediction thing" |

### Key Insight: Regressions in Prediction & Attention

The card layout improvement (+1.4) is a massive win. But the prediction flow regression (−0.8) and attention labeling confusion (−0.5) mean the NET educational clarity has slightly decreased. **The prediction flow bug is the single item preventing this sprint from being the best yet.** Fix Priority 1 and 2, and scores will jump significantly.

### Top 3 Focus Group Requests

1. **"Don't show the prediction bars twice — show them once, let me read them, then pick the winner"** (5/6)
2. **"Only call the last connection 'strongest' — the others should just be 'connection'"** (4/6)
3. **"Get rid of the orange button during the prediction"** (3/6)

---

## IMPLEMENTATION PRIORITY ORDER

```
Sprint 7 Scope (in exact order):
═══════════════════════════════════

1. PREDICTION FLOW FIX .................... ~2 hours
   a. Remove the intermediate pause + Edasi during prediction
   b. Make prediction phase ONE continuous auto-play sequence
   c. Add staggered loser FADE (400ms per bar, 500ms stagger)
   d. Add VÕITJA label before auto-advance to completion
   e. Do NOT show candidates twice
   
2. ATTENTION LABEL FIX ................... ~30 min
   a. Arc 1 tooltip: "SEOS" (not "TUGEVAIM SEOS")
   b. Arc 2 tooltip: "SEOS"
   c. Arc 3 tooltip: "TUGEVAIM SEOS" (strongest — only this one)
   
3. PREDICTION BAR STAGGER ................ ~1 hour
   a. Bars appear one at a time (800ms delay between each)
   b. Each bar grows from 0 to full width over 400ms
   c. After all 4 visible: 3-second reading pause
   
4. TOKEN FLIP GARBLE ..................... ~45 min
   a. Add backface-visibility: hidden to flip faces
   b. OR replace with crossfade animation
   c. Test on iOS Safari
   
5. EDASI BUTTON CLEANUP .................. ~20 min
   a. Hide Edasi during auto-play entirely
   b. If shown (on pause), use green not orange
   c. Completion: show green "Korda uuesti" button
   
6. COMPLETION SCREEN POLISH .............. ~45 min
   a. Move explanation line above the fold
   b. Add visible "Korda uuesti" button
   c. Consider hiding DNA nav during simulation

7. VECTOR SCATTER DOT .................... ~15 min
   a. Remove unlabeled gray dot near Koer cluster
```

**Total estimated effort: ~6 hours**

---

## DO NOT BREAK (Carry Forward — Extended List)

All of these must be preserved across sprints:

### Core Flow
- [x] Auto-play flow (one press to start from PROOVI button)
- [x] T→V→A→P pipeline sequence
- [x] Pause ❚❚ button available at all times

### Tokenization Step
- [x] Words displayed first: "Koer", "on", "inimese", "parim" as badges
- [x] Sequential flip: words → numbers one at a time
- [x] Correct token IDs: 5241, 4551, 1254, 7997
- [x] "TÜKKIDE PAKENDAMINE..." loading label
- [x] "TOKENITE ID-D" label after flip
- [x] "VALMIS VEKTORISEERIMISEKS" transition label ← NEW ✅

### Vector Step
- [x] "Sõnadest saavad arvud" header with V badge
- [x] GPS metaphor description ← NEW ✅
- [x] TÄHENDUSRUUM scatter with 4 labeled dots
- [x] "on" positioned far from content word cluster
- [x] "Kaardistatud 4 koordinaadile" summary (NOT 8) ← FIXED ✅

### Attention Step
- [x] "Seoste Loomine" header with A badge
- [x] Spotlight metaphor description ← NEW ✅
- [x] Words on horizontal axis: Koer, on, inimese, parim
- [x] Sequential arc reveal (weak → medium → strong)
- [x] Arc thickness variation (PAKSUS = OLULISUS)
- [x] "PAKSUS = OLULISUS" label at bottom
- [x] "3 seost leitud" in collapsed summary

### Prediction Step
- [x] "Ennustamine" header with P badge
- [x] "MUDEL ARVUTAB..." spinner
- [x] "Mis sõna tuleb järgmisena?" question
- [x] "Koer on inimese parim ___" sentence prompt
- [x] sõber 78%, kaaslane 9%, semu 7%, lemmik 6% candidates
- [x] sõber is winner

### Completion
- [x] Confetti animation
- [x] "Simulatsioon lõppenud" with green checkmark
- [x] "Sa uurisid 4-sammulist teekonda tekstist ennustuseni"
- [x] "VÕITJA ENNUSTUS" with "sõber" 78%
- [x] Explanation line: "Mudel ennustas järgmise sõna..." ← NEW ✅
- [x] Collapsed P shows "Võitja: 'sõber' (78%)" ← NEW ✅

### Layout (NEW ✅)
- [x] Active step fills viewport
- [x] Collapsed steps are thin single-line summary bars
- [x] Progress indicator "2/4" at top right
- [x] Step-specific colored badges (T=green, V=blue, A=purple, P=orange)

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
T summary: "Tekst tükeldatud 4 osaks" ✅  
V summary: "Kaardistatud 4 koordinaadile" ✅ FIXED  
A summary: "3 seost leitud" ✅  
P summary: "Võitja: 'sõber' (78%)" ✅ NEW  

### Attention Arcs (3 arcs, sequential reveal)

```typescript
const attentionArcs = [
  { pair: ["on", "Koer"],       strength: 0.3, label: "SEOS"          },  // ← FIX
  { pair: ["inimese", "on"],    strength: 0.5, label: "SEOS"          },  // ← FIX
  { pair: ["parim", "inimese"], strength: 0.9, label: "TUGEVAIM SEOS" },  // ← ONLY this one
];
```

### Timing Constants (UPDATED TARGETS)

```typescript
const PREDICTION_TIMING = {
  computeSpinner: 2000,        // "MUDEL ARVUTAB..."
  promptReveal: 1500,          // "Koer on inimese parim ___"
  candidateStagger: 800,       // 0.8s between each bar appearing
  allVisiblePause: 3000,       // ← CRITICAL: 3s static display
  loserFadeStagger: 500,       // 0.5s between each loser fading
  loserFadeDuration: 400,      // each loser fades over 400ms
  preWinnerPause: 800,         // before VÕITJA label
  winnerDisplayDuration: 3000, // VÕITJA + highlight
  autoAdvanceDelay: 500,       // then → completion
};
// TOTAL: ~16.5 seconds (currently ~10s)
// NO intermediate pause. NO Edasi button. Continuous flow.
```

---

## SPRINT-OVER-SPRINT PROGRESS

| Metric | Sprint 5 (4_review) | Sprint 6 (5_review) | Sprint 7 (6_review) | Trend |
|---|---|---|---|---|
| Simulation duration | ~35s | ~44s | ~39.5s | ↘️ Shorter (needs lengthening) |
| Focus group overall | 3.8 | 4.3 | **4.5** | ↗️ Incremental improvement |
| Prediction clarity | 2.5 | 4.0 | **3.2** ⚠️ | ↘️ REGRESSION (double-show bug) |
| Attention clarity | 2.8 | 3.8 | **3.3** ⚠️ | ↘️ REGRESSION (label confusion) |
| Card comfort | 2.2 | 2.8 | **4.2** ⭐ | ↗️↗️ Massive improvement |
| "Would use again?" | 3.8 | 4.5 | **4.3** | ↘️ Slight dip from confusions |

### Analysis

Sprint 7 shows a clear **two-step-forward, one-step-back** pattern. The structural improvements (card layout, data consistency) are the best the simulation has ever been. But the prediction flow regression cancels out some of the gains.

The good news: the regressions are fixable in Priority 1 and 2 (prediction flow + attention labels), estimated at ~2.5 hours. Once those land, the simulation will be at its highest quality ever — with the structural improvements AND the smooth prediction flow.

**Expert consensus: Fix Priority 1-3 (prediction flow + labels + stagger) and this simulation is shippable.** The remaining issues (P4-P7) are polish items that can be addressed post-launch.
