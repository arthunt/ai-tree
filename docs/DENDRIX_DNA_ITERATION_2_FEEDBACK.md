# Dendrix.ai DNA Simulation — Iteration 2 Review & Gemini Feedback

**Date:** 2025-02-04
**Reviewer:** Claude (Opus 4.5)
**Input:** 3 screen recordings of improved DNA simulation
**Context:** Compare against 13 issues identified in Iteration 1 analysis

---

## Gemini CLI Prompt

Copy everything below this line and paste directly into Gemini CLI. This document serves as both the analysis report AND the executable prompt.

---

You are improving the Dendrix.ai DNA simulation — a mobile-first educational tool that teaches how LLMs work through a 4-step pipeline: T (Tokenization) → V (Vectors) → A (Attention) → P (Prediction). The target audience is complete AI novices. The input sentence is "Mets ja puu on elu" (Forest and tree are life).

## What Was Fixed (Good Work — Keep These)

These improvements from Iteration 1 are working well. Do NOT regress on any of these:

### ✅ FIX-1: Auto-play flow works
The user now only pushes once (to start) and the entire T→V→A→P simulation runs automatically. This is a major UX win. Each step auto-transitions to the next. **Keep this behavior.**

### ✅ FIX-2: "Ennustamine" label correct
The prediction step now correctly shows "Ennustamine" (Prediction) instead of the awkward "Järgmise pakkumine". **Keep this.**

### ✅ FIX-3: Attention connections now render
The Seoste Loomine (Attention) step now shows cyan arc connections between dots, with "PAKSUS = OLULISUS" (Thickness = Importance) label and "puuduta sõna seoste nägemiseks" (touch a word to see connections) hint. The collapsed summary now shows "2 seost leitud" instead of "0 seost leitud". **Major improvement. Keep this, but see IMPROVE-3 below.**

### ✅ FIX-4: Vector dots have word labels
The scatter plot now labels dots with their words: "elu", "puu", "Mets", "on". "puu" and "Mets" cluster together, which correctly demonstrates that similar meanings land close together. **Good. Keep this.**

### ✅ FIX-5: Prediction winner animation works
The winning prediction "on" (15%) gets a trophy icon and green highlight. Losing candidates ("ja", "kui", "mis") get X marks and gray out. "Võitja: on" displays clearly. **Good dramatic effect. Keep this.**

### ✅ FIX-6: Completion card is clear
"Simulatsioon lõppenud" with "Sa uurisid 4-sammulist teekonda tekstist ennustuseni" and confetti animation. All 4 steps show green checkmarks with summaries. **Keep this.**

### ✅ FIX-7: Step summary headers informative
Each completed step collapses to show its result:
- "Kuidas AI loeb" → "Tekst tükeldatud 6 osaks"
- "Sõnadest saavad arvud" → "Kaardistatud 10 koordinaadile"
- "Seoste Loomine" → "2 seost leitud"
- "Ennustamine" → Võitja: "on" (15%)

### ✅ FIX-8: Blue progress bar at top
A blue horizontal progress bar appears at the top of the screen during simulation with colored step segments and a "2/4" indicator. **Good directional fix for progress awareness.**

---

## What Still Needs Work (Priority Order)

### IMPROVE-1: Attention dots MUST have word labels ⭐ CRITICAL

**Current state:** The Seoste Loomine (Attention) step shows 4 small dots in a horizontal row at the bottom of the card with 2 cyan arcs connecting them. The dots have NO text labels.

**Problem:** Without word labels, the user cannot see WHICH words are connecting to which. The entire educational value of the attention step depends on seeing that "puu" connects strongly to "elu" (tree → life) but "ja" barely connects to anything. Right now it's just abstract dots and lines — meaningless to a novice.

**Required fix:**
1. Add the word text ("Mets", "ja", "puu", "on", "elu") directly below each dot, using the same font size as the prediction bar labels
2. All 5 words from the input MUST be present as dots. Currently only 4 dots are visible — one word is missing
3. The word labels should be colored to match their token step colors or be white text on the dark background

**Code pattern:** In `DNAStepAttention.tsx`, wherever dots are rendered, add a `<text>` or label element below each dot circle using the token text from the input. Example:
```
{tokens.map((token, i) => (
  <g key={i}>
    <circle cx={positions[i].x} cy={dotY} r={6} fill={colors[i]} />
    <text x={positions[i].x} y={dotY + 18} textAnchor="middle" fill="white" fontSize="12">
      {token}
    </text>
  </g>
))}
```

### IMPROVE-2: Show MORE attention connections ⭐ HIGH

**Current state:** Only 2 arcs are drawn for a 5-word sentence. The summary says "2 seost leitud".

**Problem:** With 5 words, there should be multiple meaningful connections visible. 2 connections is too few to demonstrate the concept of "which words attend to which other words." It looks like the model barely found anything interesting.

**Required fix:**
1. Generate at least 4-5 connection arcs for the 5-word input
2. Vary the arc thickness more dramatically: the strongest connection (e.g., "puu" → "elu") should be 3-4x thicker than the weakest (e.g., "ja" → "on")
3. Update the summary count accordingly: "5 seost leitud" instead of "2 seost leitud"
4. The arcs should appear one-by-one with a 400ms stagger delay, starting from the strongest connection

### IMPROVE-3: Attention visualization has too much empty space ⭐ HIGH

**Current state:** The attention card has a large empty black area above the dots. The dots and arcs are compressed into the bottom ~25% of the card.

**Required fix:**
1. Move the dot row and arcs to the vertical CENTER of the visualization area
2. Use the full available height for the arc curves — taller arcs for stronger connections
3. The visualization should fill at least 60% of the card's content area

### IMPROVE-4: Vector axis label "mõõde 2" is still cryptic ⭐ MEDIUM

**Current state:** Y-axis shows "mõõde 2" (dimension 2). No x-axis label. For a novice, "mõõde 2" means nothing.

**Required fix:** Either:
- **Option A (preferred):** Remove axis labels entirely. Add a card subtitle: "Tähendusruum" (Meaning space) — the GPS metaphor in the description text is sufficient explanation
- **Option B:** Change "mõõde 2" to "tähendus" (meaning) for y-axis and add "kontekst" (context) for x-axis — at least these are words a novice can relate to

### IMPROVE-5: Token label "MAATRIKS: TOKEN ID-D" still appears truncated ⭐ MEDIUM

**Current state:** During the tokenization animation, the label "MAATRIKS: TOKEN ID-D" appears at the top of the card. The text ends with "ID-D" which looks cut off — it should probably read "TOKEN ID-DEK" (Token IDs) or "TOKEN ID-D MAP" or similar.

**Required fix:**
1. Check the actual intended full text for this label and ensure it renders completely without truncation on a 390px-wide mobile viewport
2. If it's "MAATRIKS: TOKEN ID-D" and that IS the full text, it's grammatically incomplete in Estonian. The correct form would be "MAATRIKS: TOKEN ID-d" (lowercase 'd' for plural marker) or better: "TOKENITE ID-KOODID" (Token ID codes)

### IMPROVE-6: Add "thinking" animation before prediction bars ⭐ MEDIUM

**Current state:** The prediction bars appear directly after the attention step completes. There's no transitional moment showing the model "calculating."

**Required fix:**
1. Before showing the bars, display a brief 1.5-second "Mudel arvutab..." (Model is calculating...) animation with a subtle pulsing or processing indicator
2. Then animate the bars racing in from left to right, appearing one by one with 300ms stagger delay
3. This adds narrative drama and teaches that prediction requires computation

### IMPROVE-7: Connect the prediction result back to the original sentence ⭐ MEDIUM

**Current state:** The prediction shows "Võitja: on" at 15%. But there's no visual connection to the original input sentence.

**Required fix:** After the winner is revealed, show the complete prediction chain below the winner:

```
"Mets ja puu on elu" → järgmine sõna: "on" (15%)
```

This closes the narrative loop — the user sees their original sentence and the AI's next-word prediction together, which is the core educational payoff.

### IMPROVE-8: "Peata õppimiseks" button is still unclear ⭐ LOW

**Current state:** The button appears in every step. Its function (pause? learn more?) remains ambiguous.

**Required fix:** Since the simulation now auto-plays, this button presumably pauses it. Rename to one of:
- "⏸ Peata" (Pause) — simple and clear
- "⏸ Peata simulatsiooni" (Pause simulation) — more explicit
- Remove entirely if the simulation can be paused by tapping the card

### IMPROVE-9: Bottom navigation still visible during simulation ⭐ LOW

**Current state:** The bottom bar showing `DNA · ○ · ψ · ↗ · ☁` remains visible during the entire simulation. The other icons are not relevant during the DNA experience.

**Required fix:** During active simulation, either:
- Fade the bottom bar to 30% opacity (subtle but de-emphasized)
- Or collapse it to just show the "DNA" label with the current step indicator

---

## Summary Table: Original Issues vs Current State

| ID | Issue | Status | Notes |
|----|-------|--------|-------|
| N-1 | Steps feel disconnected | ⚠️ Partial | Auto-play works, but no data-flow bridge animation between steps |
| N-2 | Metaphor underused | ⚠️ Partial | V step has labels ✅, A step missing labels ❌, P has word labels ✅ |
| N-3 | "0 seost leitud" | ✅ Fixed | Now "2 seost leitud" — but should be more (see IMPROVE-2) |
| N-4 | Wrong prediction label | ✅ Fixed | "Ennustamine" correct |
| A-1 | Vector plot static | ⚠️ Partial | Word labels added ✅, clustering visible ✅, axis still cryptic ❌ |
| A-2 | No attention connections | ✅ Fixed | Arcs render, but need word labels (IMPROVE-1) and more arcs (IMPROVE-2) |
| A-3 | Token too fast | ⚠️ Partial | "MAATRIKS" text still truncated (IMPROVE-5) |
| A-4 | Prediction needs drama | ✅ Mostly | Winner trophy + gray-out works, missing "thinking" phase (IMPROVE-6) |
| U-1 | "Peata õppimiseks" unclear | ❌ Open | Same button, same label (IMPROVE-8) |
| U-2 | Locked cards confusing | ⚠️ Partial | Still shows "lukus" during step 1, but cards collapse nicely after completion |
| U-3 | Progress bar disappears | ✅ Fixed | Blue progress bar with step indicator now visible at top |
| U-4 | Can't go back | ⚠️ Unclear | Completed cards show chevron, but expandability not confirmed |
| U-5 | Bottom nav irrelevant | ❌ Open | Still fully visible during simulation (IMPROVE-9) |

---

## Implementation Priority for This Iteration

**Do these FIRST (they affect educational clarity the most):**
1. IMPROVE-1 — Word labels on attention dots
2. IMPROVE-2 — More attention connections (4-5 arcs)
3. IMPROVE-3 — Center the attention visualization, use full card height

**Do these SECOND (polish and narrative):**
4. IMPROVE-4 — Remove/fix axis labels on vectors
5. IMPROVE-5 — Fix truncated "MAATRIKS" label
6. IMPROVE-6 — Add "thinking" animation before prediction
7. IMPROVE-7 — Show prediction in context of original sentence

**Do these LAST (low impact):**
8. IMPROVE-8 — Rename "Peata õppimiseks" button
9. IMPROVE-9 — Minimize bottom nav during simulation

---

## Reminder: Do NOT Break These Working Features

- Auto-play flow (user pushes once, all 4 steps run)
- Word labels on vector dots
- Cyan arc connections in attention step
- Trophy + gray-out winner animation in prediction
- Confetti + completion card
- Blue progress bar at top
- Step summary headers with results
- "Ennustamine" label
