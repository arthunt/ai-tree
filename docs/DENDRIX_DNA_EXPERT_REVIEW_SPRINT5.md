# Dendrix.ai DNA Simulation — Expert Panel & Focus Group Review

**Date:** 2025-02-04  
**Input:** Recording "4_review.mov" (39s) — Iteration 4 of T→V→A→P simulation  
**Sentence:** "Koer on inimese parim" → Prediction: "sõber" (78%) ✅  
**Method:** Frame-by-frame analysis at 4fps through 5 expert lenses + simulated novice focus group

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices in Estonia. The sentence is "Koer on inimese parim" with predicted next word "sõber" (78%).

This review was conducted by an expert panel (UX designer, ML educator, Estonian language specialist, mobile engineer) and a simulated focus group of 6 novice users. Issues are prioritized by the combined weight of their feedback.

---

## OVERALL VERDICT

The simulation has made enormous progress across 4 sprints. The core pipeline works, the sentence change to "Koer on inimese parim" → "sõber" is exactly right, and the educational story finally lands. What remains are **pacing, readability, and layout** issues — the "last 10%" that separates a prototype from a product.

The simulation currently runs in ~35 seconds. Based on the expert consensus and focus group confusion points, it should run in ~55-60 seconds, with the additional time allocated entirely to the prediction step.

---

## 🔴 PRIORITY 1: PREDICTION STEP — Too Fast, Missing Context, Culturally Unclear

**All 5 experts and all 6 focus group participants flagged this step.**

### Timing Analysis (measured at 4fps)

| Phase | Current duration | Required duration |
|---|---|---|
| "MUDEL ARVUTAB..." spinner | ~1.5s | 2.0s (fine) |
| All 4 candidate bars appear + animate | ~0.5s | — (see redesign below) |
| All 4 bars visible with % labels | ~0.75s | 3.0s minimum |
| Losers begin fading (strikethrough) | ~0.5s | 1.5s |
| Only winner visible + VÕITJA reveal | immediate | 2.0s pause before VÕITJA |
| VÕITJA display with sentence | ~4s | 5s+ |

**Total prediction phase: currently ~7s → should be ~14s**

### Problem A: No Input Context Visible During Prediction

> **Focus group participant (Mari, 42, teacher):** "I see these words appearing — sõber, seltsiline, kaaslane — but I forgot what the original sentence was. I don't understand what the model is choosing between."

> **Focus group participant (Tõnis, 28, warehouse worker):** "Wait, what were the words again? I was looking at the colorful dots and arcs, then suddenly there are bar charts. What are they about?"

**The input sentence "Koer on inimese parim" is NOT visible anywhere during the prediction step.** The user saw it at the very beginning (tokenization), then it disappeared for ~20 seconds through vectors and attention. By the time prediction arrives, they've forgotten it.

**Required fix — Add input sentence header ABOVE the prediction bars:**

```
┌─────────────────────────────────────┐
│  P   Ennustamine                 ▷  │
│                                     │
│  Tuginedes kõigele õpitule...       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  "Koer on inimese parim _"  │    │
│  │   Mis sõna tuleb järgmisena? │    │
│  └─────────────────────────────┘    │
│                                     │
│  🏆 sõber      ████████████  78%    │
│  ✕  seltsiline ███           9%     │
│  ✕  kaaslane   ██            7%     │
│  ✕  abiline    ██            6%     │
│                                     │
│  🏆 VÕITJA                          │
│  "...parim" → "sõber" (78%)        │
│                                     │
│  💡 Mudel ennustas järgmise sõna.   │
└─────────────────────────────────────┘
```

The input sentence with a blank underscore `_` creates an **"aha!" quiz moment** — the user reads "Koer on inimese parim ___" and subconsciously fills in "sõber" BEFORE the bars animate. When the model then confirms this, the reaction is "Yes! The AI got it right! I see how it works!"

Without showing the input, the bars are meaningless numbers appearing out of context.

### Problem B: Candidate Words Are Not Culturally Familiar

> **Estonian language specialist:** "seltsiline" is a formal/literary word meaning "companion/social being." A regular Estonian person does not use this word in daily life. "kaaslane" is natural. "abiline" is also somewhat formal."

> **Focus group participant (Kersti, 55, retired):** "Seltsiline? I've never said that word. What does it mean exactly?"

**Required fix — Replace "seltsiline" and "abiline" with everyday Estonian words:**

| Current | Problem | Replacement | Why |
|---|---|---|---|
| sõber (78%) | ✅ Perfect | Keep | Universal, everyone knows it |
| seltsiline (9%) | Too formal/literary | **kaaslane** (9%) | Common word meaning companion |
| kaaslane (7%) | ✅ Good | **semu** (7%) | Colloquial "buddy/pal" — makes the list feel real |
| abiline (6%) | Somewhat formal | **lemmik** (6%) | "Favorite" — plausible completion and universally known |

**Why this matters for the educational purpose:** The novice needs to look at all 4 candidates and think "Oh, these ALL make sense as the next word, but 'sõber' makes the MOST sense." If they can't understand what "seltsiline" means, they can't evaluate whether the model made a reasonable choice.

Alternative set if "semu" feels too colloquial:

| Word | % | Reasoning |
|---|---|---|
| **sõber** | 78% | Best friend — proverb completion |
| **kaaslane** | 9% | Companion — semantically close |
| **lemmik** | 7% | Favorite — plausible but less fitting |
| **tugi** | 6% | Support/pillar — slightly more abstract |

### Problem C: Bars Animate Too Fast to Read

> **UX Expert:** "The bar animation from appearance to full width takes under 500ms. The user cannot track 4 bars moving simultaneously. Standard information design practice is to stagger multi-element animations with at least 400ms between items."

> **Focus group participant (Andres, 35, programmer):** "I'm a developer and even I couldn't read the numbers before the lower three went gray."

**Required fix — Staged prediction reveal:**

```
Phase 1 (2s): Show input sentence with blank: "Koer on inimese parim ___"
             Below: "Mis sõna tuleb järgmisena?" (What word comes next?)
             Let the user think for a moment.

Phase 2 (0.8s each = 3.2s total): Reveal candidates ONE AT A TIME, top to bottom:
  - sõber appears    → bar races to 78%  (pause 0.8s)
  - kaaslane appears → bar fills to 9%   (pause 0.8s)  
  - semu appears     → bar fills to 7%   (pause 0.8s)
  - lemmik appears   → bar fills to 6%   (pause 0.8s)

Phase 3 (2s): All 4 bars visible. User reads and compares.
              NO animation during this phase. Static. Let them absorb.

Phase 4 (1.5s): Losers fade to gray with strikethrough. One by one, bottom-up.
                sõber gets trophy icon and green highlight.

Phase 5 (3s+): VÕITJA section animates in below.
               "Koer on inimese parim" → "sõber" (78%)
               Then explanation: "Mudel ennustas järgmise sõna, 
               kasutades kõike, mida ta miljonitelt tekstidelt õppis."
```

**Total: ~12 seconds for the prediction step.** Currently it's ~3-4 seconds of readable content. This is the climax of the entire simulation — it deserves time.

---

## 🔴 PRIORITY 2: CARD LAYOUT — Completed Steps Push Active Card Down

**4/5 experts and 5/6 focus group participants mentioned this.**

### The Problem

When the prediction step activates, the screen shows (top to bottom):
1. Progress bar (thin, at very top) — fine
2. ← Back arrow + ☰ hamburger — fine
3. **"Sõnadest saavad arvud — Kaardistatud 8 koordinaadile"** (collapsed) — takes ~60px
4. **"Seoste Loomine — 3 seost leitud"** (collapsed) — takes ~60px
5. **Active Ennustamine card** (header + description + animation) — starts at ~220px from top
6. "Peata õppimiseks" button
7. DNA bottom nav bar
8. "Mine Sügavamale" / "Edasi" buttons

> **Mobile Engineer:** "The active card begins at Y=220px. On an iPhone SE (667px viewport), that means only 450px remain for the card content plus buttons. The prediction bars + VÕITJA section needs at least 500px. The content WILL overflow on small screens."

> **Focus group participant (Liisa, 22, student):** "Every time a new step starts, the thing jumps. The cards fly around. I lose where I am."

### Required Fix — Active Card Always at Top

**Completed steps should scroll UP and ABOVE the viewport, with the active card positioned directly below the breadcrumb/progress bar.** This is the user's specific request and it's the correct mobile pattern.

```
┌─ Progress bar ──────────────────────┐
│  ← Back                 T V A P  ☰  │  ← breadcrumb with step indicators
├──────────────────────────────────────┤
│                                      │
│  [P] Ennustamine              ▷     │  ← Active card starts HERE
│                                      │
│  Description text...                 │
│                                      │
│  "Koer on inimese parim ___"        │
│  Mis sõna tuleb järgmisena?         │
│                                      │
│  🏆 sõber  ████████████████  78%    │
│  ...                                 │
│                                      │
│  ⌂ Peata    [Mine Sügavamale][Edasi]│
└──────────────────────────────────────┘
   ← Completed steps ABOVE the fold
      (scrollable if user wants to review)
```

**Implementation:**

```typescript
// When transitioning to a new step:
const scrollToActiveCard = () => {
  // Option A: Hide completed steps entirely
  // Option B: Scroll container so active card is at top
  const activeCard = document.querySelector(`[data-step="${currentStep}"]`);
  activeCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Better option: Use CSS scroll-snap
.step-container {
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: calc(100vh - 100px); /* below progress bar */
}
.step-card {
  scroll-snap-align: start;
}
```

**The breadcrumb bar at the top should show ALL step indicators** so the user always knows where they are:

```
  T ✓    V ✓    A ✓    P ●
```

This replaces the need for collapsed completed cards to be visible.

---

## 🟡 PRIORITY 3: VECTOR LABELS — "inimese" and "on" Overlap Into Unreadable Mesh

**3/5 experts flagged this. Focus group didn't mention it (they couldn't read the labels at all).**

> **UX Expert:** "The vector scatter is the most visually beautiful step, but the labels are ~10px gray text on a dark background. On a phone, this is illegible. Two labels overlap into 'inimese/on' hybrid text."

> **Focus group participant (Tõnis):** "I saw colorful dots. I think they were words? I couldn't read any of them."

### Required Fixes

1. **Increase label font size to 16px minimum.** Current size appears to be ~10-11px.

2. **Use white text with dark text-shadow** for contrast:
```css
.vector-label {
  font-size: 16px;
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7);
}
```

3. **Add collision avoidance** — offset overlapping labels:
```typescript
// "on" label should appear ABOVE its dot (labelY = dotY - 20)
// "inimese" label should appear BELOW its dot (labelY = dotY + 20)
// "parim" label BELOW its dot (labelY = dotY + 20)
// This prevents the "inimese"/"on" overlap
```

4. **Separate "on" from the cluster.** Currently "on" (a function word) is plotted very close to "inimese" and "parim" (content words). This is semantically wrong — "on" should be far from the other words. Move "on" to the opposite corner of the scatter plot. This also fixes the overlap AND teaches the correct educational concept that function words occupy different semantic space.

**Correct vector positions (conceptual):**
```
         on •           (far top-left — function word, alone)



              Koer •    (mid-right — animate noun)


         inimese •      (bottom-center — clustered with parim)
           parim •      (nearby — semantic pair)
```

---

## 🟡 PRIORITY 4: ATTENTION STEP — Edge Clipping + Arc Layout Needs Work

**3/5 experts flagged this. 2/6 focus group participants mentioned confusion.**

### Current Issues

1. **"Koer" is at the far left with its dot disconnected.** The word "Koer" appears at the left edge with a tiny gray dot below it, but no arcs connect TO or FROM "Koer". The strongest connections are between "on"↔"Koer" and "inimese"↔"on" and "parim"↔"inimese" — but the arcs only visually cover the right 75% of the card.

2. **"parim" clips at the right edge.** The "m" in "parim" is partially hidden by the card border.

3. **All arcs are the same thickness.** The TUGEVAIM SEOS tooltip says "parim ↔ inimese" is the strongest, and the legend says "PAKSUS = OLULISUS" (thickness = importance), but visually all arcs appear roughly equal in thickness.

> **ML Educator:** "The attention step should show DIFFERENTIAL importance. If all connections look the same, the educational message is 'everything connects to everything equally' — which is wrong. The point is that SOME connections matter much more than others."

### Required Fixes

1. **Add horizontal padding (24px each side)** so edge words don't clip.

2. **Dramatically vary arc thickness:**
   - parim ↔ inimese: **5px** stroke (strongest — semantic pair for the proverb)
   - on ↔ Koer: **3px** stroke (medium — grammatical subject link)
   - inimese ↔ on: **1.5px** stroke (weak — loose grammatical link)

3. **Add arc to/from Koer that is VISIBLE.** Currently "Koer" appears disconnected from the network. At minimum, the "on → Koer" arc should be clearly visible.

4. **Increase word label font size** to 14px minimum (currently ~11px).

---

## 🟡 PRIORITY 5: TOKENIZATION — Mirrored Numbers + 8-vs-4 Token Inconsistency

### Problem A: Some Token IDs Render Backwards

> **Mobile Engineer:** "Several token badges show mirrored/reversed digits. The '7' characters appear as backwards '7'. The '4' in some badges is reversed. This is likely a CSS `transform` or custom font issue specific to iOS Safari."

**Fix:** Use system monospace font and disable any transform/animation that might be causing the mirror:
```css
.token-badge {
  font-family: -apple-system, 'SF Mono', 'Menlo', monospace;
  font-variant-numeric: tabular-nums;
  -webkit-transform: none; /* disable any rotation/flip */
}
```

### Problem B: 8 Tokens Shown but Summary Says "4 osaks"

The tokenization summary (collapsed step) now says "Tekst tükeldatud 4 osaks" but the animation shows 8 token badges in a 4×2 grid. The vector step says "Kaardistatud 8 koordinaadile."

> **ML Educator:** "Either show 4 whole-word tokens (educational simplification, correct for DNA level) or show 8 sub-word tokens (technically accurate). Don't mix: the mismatch between '4 osaks' and 8 visible badges is more confusing than either approach alone."

**Fix: Commit to 4 whole-word tokens.** Display 4 badges in a single row:
```
 [Koer]  [on]  [inimese]  [parim]
  6617   1114    4551      5420
```

Update vector count to match: "Kaardistatud 4 koordinaadile" (not 8).

---

## 🟢 PRIORITY 6: Minor Issues

### 6A: "Peata õppimiseks" Button Position

> **UX Expert:** "This pause button appears as a full-width action button competing with 'Edasi' (Next) for attention. In auto-play mode, the user rarely needs to pause. Make it a small icon (⏸) in the top-right corner of the active card."

### 6B: "Mine Sügavamale" Button During Auto-Play

> **Focus group participant (Liisa):** "What does 'Mine Sügavamale' do? I was afraid to touch anything during the animation."

This button should be HIDDEN during auto-play. Only show it after the simulation completes or when paused.

### 6C: Bottom DNA Navigation Bar During Simulation

The DNA tab bar (DNA · ○ · ψ · ↗ · ☁) takes ~50px of viewport height at the bottom. During the simulation, this space would be better used by the active card content.

**Fix:** Fade out the bottom nav when the simulation is running. Fade it back in when the simulation completes or is paused.

---

## FOCUS GROUP TRANSCRIPT HIGHLIGHTS

Six simulated novice users (ages 22-62, no AI experience, native Estonian speakers) watched the recording once and described their experience:

### What They Understood ✅

**Mari (42, teacher):** "I get that the computer breaks up the words into numbers, then puts them on a map, then looks for connections, then guesses the next word. It's like reading by following patterns."

**Andres (35, programmer):** "The overall flow makes sense. Four steps: tokenize, embed, attend, predict. The proverb completion is a clever choice."

**Kersti (55, retired):** "The dog saying! I knew the answer before the computer showed it. That made me feel like I understood something."

### Where They Got Lost ❌

**Tõnis (28, warehouse worker):** "The dots-on-a-map part [vectors] — I saw dots but couldn't read what they said. It went too fast. I don't know what 'TÄHENDUSRUUM' means."

**Liisa (22, student):** "When the bars appeared at the end [prediction], I saw 'sõber' flash by but I didn't realize those were the computer's guesses until after it was done. There was no setup — no 'Okay, now the model will guess.'"

**Peeter (62, farmer):** "I got confused every time the cards changed. One card flies up, another appears. I lost track of what step I was on."

**Kadri (38, nurse):** "I didn't know 'seltsiline' was a word choice the computer considered. I thought it was a label or category or something. 'Sõber' is clear. The others — I'm not sure."

### Focus Group Consensus

| Aspect | Rating (1-5) | Key Quote |
|---|---|---|
| Overall concept understood | 3.8 | "I get the general idea of 4 steps" |
| Input sentence choice | 4.5 | "The dog proverb — everyone knows it" |
| Tokenization step clarity | 3.2 | "Numbers appeared, some were backwards" |
| Vector step clarity | 2.0 | "Dots I couldn't read" |
| Attention step clarity | 2.8 | "Lines between words, some thicker? Not sure" |
| Prediction step clarity | 2.5 | "Too fast. Didn't realize it was showing guesses" |
| Prediction "aha!" moment | 3.5 | "Once I saw 'sõber' I got it, but it took a second" |
| Card transitions comfort | 2.2 | "Jumpy. Things fly around." |
| Would use again? | 3.8 | "Yes, if it were slower and I could read everything" |

### Top 3 Focus Group Requests

1. **"Show me what the computer is trying to guess BEFORE it guesses"** (5/6 participants)
2. **"Make it slower at the end — I need time to read"** (5/6)
3. **"Stop the cards from jumping around"** (4/6)

---

## IMPLEMENTATION PRIORITY ORDER

```
Sprint 5 Scope (in exact order):
═══════════════════════════════

1. PREDICTION REDESIGN ................... ~3 hours
   a. Add "Koer on inimese parim ___" above bars
   b. Add "Mis sõna tuleb järgmisena?"
   c. Reveal candidates one-by-one (0.8s stagger)
   d. 3-second static pause after all bars visible
   e. Replace "seltsiline"/"abiline" with "semu"/"lemmik"
      (or "kaaslane"/"lemmik"/"tugi")
   f. Add explanation line after VÕITJA

2. CARD LAYOUT — ACTIVE AT TOP ........... ~2 hours
   a. On step transition, scroll so active card
      is at Y=0 (below progress bar)
   b. Completed steps above the fold (hidden/scrolled)
   c. Or: Replace collapsed step bars with compact
      breadcrumb: T✓ V✓ A✓ P●

3. VECTOR LABELS ....................... ~1 hour
   a. Increase font to 16px white bold
   b. Move "on" dot away from "inimese"/"parim"
   c. Add text-shadow for contrast

4. TOKENIZATION CLEANUP ................. ~1 hour
   a. Fix mirrored numbers (font issue)
   b. Show 4 tokens, not 8
   c. Fix vector count "Kaardistatud 4 koordinaadile"

5. ATTENTION ARC THICKNESS ............... ~30 min
   a. Vary thickness (5px / 3px / 1.5px)
   b. Add 24px horizontal padding
   c. Ensure "Koer" has visible arc connection

6. MINOR UI CLEANUP .................... ~30 min
   a. Move "Peata" to small ⏸ icon
   b. Hide "Mine Sügavamale" during auto-play
   c. Hide bottom nav during simulation
```

---

## DO NOT BREAK (Carry Forward)

These are all working and must be preserved:
- [x] Auto-play flow (one press to start)
- [x] "sõber" at 78% as winner ← NEW THIS SPRINT, critical to keep
- [x] "MUDEL ARVUTAB..." thinking animation
- [x] Step collapse summaries
- [x] Progress bar at top
- [x] Vector scatter with TÄHENDUSRUUM header
- [x] Attention arcs with TUGEVAIM SEOS tooltip
- [x] Winner trophy + loser X marks
- [x] Confetti + "Simulatsioon lõppenud" completion
- [x] "Korda uuesti" replay button

---

## QUICK REFERENCE: Updated Hardcoded Values

### Prediction Candidates (UPDATED)

```typescript
const predictionCandidates = [
  { word: "sõber",    probability: 0.78, isWinner: true  },
  { word: "kaaslane",  probability: 0.09, isWinner: false },
  { word: "semu",      probability: 0.07, isWinner: false },
  { word: "lemmik",    probability: 0.06, isWinner: false },
];
```

Alternative (if "semu" is too colloquial):
```typescript
const predictionCandidates = [
  { word: "sõber",    probability: 0.78, isWinner: true  },
  { word: "kaaslane",  probability: 0.09, isWinner: false },
  { word: "lemmik",    probability: 0.07, isWinner: false },
  { word: "tugi",      probability: 0.06, isWinner: false },
];
```

### Prediction Step Text Content

```typescript
// Before bars appear:
const inputPrompt = `"Koer on inimese parim ___"`;
const questionText = "Mis sõna tuleb järgmisena?";

// After winner reveal:
const winnerExplanation = `💡 Mudel ennustas järgmise sõna, kasutades kõike, mida ta miljonitelt tekstidelt õppis.`;
// Translation: "The model predicted the next word using everything it learned from millions of texts."
```

### Animation Timing Constants

```typescript
const PREDICTION_TIMING = {
  inputPromptDuration: 2000,    // Show "Koer on inimese parim ___" 
  candidateStagger: 800,         // 0.8s between each candidate appearing
  allVisiblePause: 3000,         // 3s static display of all bars
  loserFadeStagger: 500,         // 0.5s between each loser fading
  preWinnerPause: 1500,          // 1.5s after losers fade, before VÕITJA
  winnerDisplayDuration: 5000,   // 5s minimum for VÕITJA + explanation
};
```

### Tokenization (4 whole-word tokens)

```
[Koer: 6617]  [on: 1114]  [inimese: 4551]  [parim: 5420]
```
Summary: "Tekst tükeldatud 4 osaks"  
Vector summary: "Kaardistatud 4 koordinaadile"

### Vector Positions (corrected — "on" separated)

```
"on"      → { x: 0.15, y: 0.20 }  // Far top-left (function word)
"Koer"    → { x: 0.65, y: 0.35 }  // Mid-right (animate noun)
"inimese" → { x: 0.45, y: 0.72 }  // Bottom-center cluster
"parim"   → { x: 0.55, y: 0.80 }  // Near "inimese" (semantic pair)
```

### Attention Connections (3 arcs with varied thickness)

| # | From → To | Thickness | Animation order |
|---|---|---|---|
| 1 | on → Koer | 3px (medium) | 1st (appears first) |
| 2 | inimese ↔ on | 1.5px (weak) | 2nd |
| 3 | parim ↔ inimese | **5px (strong)** | 3rd (most dramatic, appears last) |
