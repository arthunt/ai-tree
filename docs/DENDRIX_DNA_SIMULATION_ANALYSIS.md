# Dendrix.ai — DNA Simulation: UX/UI & Animation Analysis

## Gemini CLI Correction Prompt

> **Context for Gemini:** You are working on the Dendrix.ai DNA simulation — a mobile-first educational app that teaches how AI (LLMs) work by walking novice users through 4 steps: **T**okenization → **V**ectors → **A**ttention → **P**rediction. The app uses Estonian cultural metaphors (e.g., "Mets ja puu on elu" — "Forest and tree are life"). The following is a detailed UX/UI and animation analysis based on 5 screen recordings of the current app. **Do NOT refactor the codebase.** Focus on targeted, surgical improvements to the simulation animation, narrative flow, and user experience as described below.

---

## 1. Current Flow Summary (What the 5 Recordings Show)

### Recording 1: Landing → T (Tokenization)
- **Start state:** Input field at top ("Kirjuta midagi"), T→V→A→P pipeline bar, "Kuidas see töötab" (How it works) card with example "Mets ja puu on elu", locked lesson cards below
- **Action:** User taps the example → transitions to T step "Kuidas AI loeb" (How AI reads)
- **Animation:** Text "Mets · ja · puu · on · elu" splits into tokens with dot separators, then scrolls down to show token IDs (4551, 1526...) and "MAATRIKSI NÄITAMINE: TOKEN ID-D"
- **End state:** Shows token numbers, "Mine Sügavamale" (Go Deeper) and "Edasi" (Next) buttons, locked cards below

### Recording 2: T → V (Vectors)
- **Start state:** End of T step with token IDs visible
- **Action:** User taps "Edasi" → scrolls to V step "Sõnadest saavad arvud" (Words become numbers)
- **Animation:** Vector space scatter plot appears — 3 colored dots (gray, orange, cyan) placed in 2D space. Y-axis labeled "mõõde 2"
- **End state:** Static dots on dark canvas, "Peata õppimiseks" (Pause to learn) button at bottom

### Recording 3: V → A (Attention)
- **Start state:** Same vector scatter plot
- **Action:** User taps "Edasi" → scrolls to A step "Punktide ühendamine" (Connecting the dots)
- **Animation:** 5 green dots appear in a horizontal row. Label reads "PAKSUS = OLULISUS" (Thickness = Importance), "puuduta sõna seoste nägemiseks" (touch a word to see connections)
- **End state:** Static green dots, no visible connection lines, no interactivity demonstrated

### Recording 4: A → P (Prediction)
- **Start state:** Attention step with static dots
- **Action:** User taps "Edasi" → scrolls to P step "Järgmise pakkumine" (Next offering/prediction)
- **Animation:** Probability bars appear — "on" (15%), "ja" (12%), "kui" (10%), "mis" (8.0%). Winner icon highlights "on". "Võitja: on" label appears
- **End state:** Prediction bars displayed, "Edasi" button visible below

### Recording 5: P → Completion
- **Start state:** Prediction step with bars
- **Action:** Animation plays out → "Võitja: on" confirmed → transition to completion screen
- **End state:** Confetti animation 🎉, "Simulatsioon lõppenud" (Simulation complete), "Sa uurisid 4-sammulist teekonda tekstist ennustuseni" (You explored the 4-step journey from text to prediction), "VÕITJA ENNUSTUS: 'on' 15%", "Korda uuesti" (Try again) button

---

## 2. Critical Issues Found

### 2.1 🔴 Narrative & Pedagogical Issues

#### ISSUE N-1: The T→V→A→P steps feel disconnected — no visual thread connects them
**Current:** Each step is an independent card. The user scrolls vertically past completed steps (collapsed into summary headers) to reach the next. There is no visual indication that data *flows* from one step to the next.

**Problem for novices:** A beginner cannot see that the output of Tokenization becomes the input of Vectors. The core "aha moment" — that text undergoes a 4-stage transformation — is invisible.

**Fix:** Add a **data-flow bridge animation** between steps. When the user taps "Edasi":
1. The output of the current step (e.g., token IDs `[4551, 1526, ...]`) should visually **animate/morph** into the input of the next step (e.g., dots appearing on the vector map)
2. The T→V→A→P progress bar at the top should light up the next letter with a brief pulse animation
3. A 1-line "connector sentence" should appear between steps: e.g., *"Need numbrid saavad nüüd oma kohad tähenduste kaardil..."* (These numbers now get their place on the meaning map...)

#### ISSUE N-2: Estonian cultural metaphor is underused
**Current:** The example sentence "Mets ja puu on elu" is culturally resonant but only appears once. After tokenization, the actual words disappear and are replaced by abstract numbers/dots.

**Problem:** The metaphorical power is lost. A user learning about AI should see their familiar sentence *throughout* the journey.

**Fix:** Keep the original words visible in each step:
- **T step:** `Mets · ja · puu · on · elu` → show IDs below each word (already done ✅)
- **V step:** Label the dots on the scatter plot with the actual words ("mets", "puu", "elu" near orange dots, "ja", "on" near gray dots)
- **A step:** Use the actual words as node labels instead of abstract green dots
- **P step:** Show "After 'Mets ja puu on elu', the next word is..." — make it clear the prediction relates to the user's sentence

#### ISSUE N-3: "Punktide ühendamine" (A step) says "0 seost leitud" (0 connections found)
**Current:** When the A step completes and collapses, its summary reads "0 seost leitud" (0 connections found). The attention animation shows dots but no visible connection lines.

**Problem:** This is the most confusing step. Attention IS about finding connections. Showing "0 connections" directly contradicts the concept being taught.

**Fix:**
1. The attention animation MUST draw connection lines between words with varying thickness (thickness = importance)
2. Auto-animate at least one connection (e.g., the "puu" → "elu" connection with a thick line, "ja" → "on" with a thin line)
3. The collapsed summary should read something like "3 seost leitud" (3 connections found), not 0

#### ISSUE N-4: The Prediction step label "Järgmise pakkumine" is awkward
**Current:** "Järgmise pakkumine" literally means "next offering" — it sounds like an e-commerce checkout, not a prediction.

**Fix:** Change to **"Järgmise sõna ennustus"** (Next word prediction) or simply **"Ennustamine"** (Prediction). This aligns with the architecture document which uses "Ennustus / Tõenäosusjaotus".

---

### 2.2 🟡 Animation & Visual Issues

#### ISSUE A-1: Vector scatter plot is too static and unclear
**Current:** 3 small colored dots on a near-black canvas. No labels, no axes titles, no animation of dots appearing. The dots just exist. "mõõde 2" label on Y-axis is tiny and cryptic.

**Problem:** A novice user has no idea what they're looking at. The GPS metaphor from the architecture doc ("GPS coordinates in meaning space") is completely invisible.

**Fix:**
1. **Animate dot entrance:** Each word's dot should fly in from the token card above, one by one, with a brief trail effect
2. **Label each dot** with its word ("mets", "puu", "elu" = close together as semantically related; "ja", "on" = separate as function words)
3. **Show proximity = meaning:** Draw a faint circle around "mets" + "puu" + "elu" cluster with a label: *"Sarnased mõisted — lähestikku!"* (Similar concepts — close together!)
4. **Replace cryptic axis labels:** Instead of "mõõde 2", use "Tähendusruum" (Meaning Space) as the chart title. Remove axis labels entirely — they confuse novices without adding value
5. **Add a brief animation** where "mets" and "puu" dots visually attract each other (slight pulse/glow when close), while "ja" floats far away

#### ISSUE A-2: Attention step animation has no visual connections
**Current:** 5 green dots in a horizontal row. "PAKSUS = OLULISUS" label. Text says "puuduta sõna seoste nägemiseks" (touch a word to see connections) but no connections are visible in the recording.

**Problem:** This is the HEART of the transformer mechanism. Without visible lines between words, the concept is not taught at all. The "flashlight in a dark room" metaphor from the architecture doc is completely absent.

**Fix:**
1. **Auto-play an attention demo** (don't wait for user interaction): Animate a "flashlight" spotlight sweeping from one word to another
2. **Draw connection lines** between dots with varying thickness. Example: thick line from "TA" → "Mari" (strong connection), thin line from "TA" → "poodi" (weak connection). For our sentence: thick line "puu" → "elu", medium "mets" → "puu", thin "ja" → various
3. **Show attention weights** as numbers on the lines (e.g., 0.85, 0.05)
4. **Color the lines** from dim gray (low attention) to bright green/cyan (high attention)
5. **The dots should be labeled** with the actual words from the input sentence

#### ISSUE A-3: Token animation is too fast and lacks educational pauses
**Current:** Words split into tokens quickly. The token IDs appear in monospace font. The "MAATRIKSI NÄITAMINE: TOKEN ID-D" text is cut off (truncated).

**Fix:**
1. **Slow down token splitting:** Each word should separate with a visible "snap" animation (like LEGO blocks breaking apart), with a 300ms delay between each
2. **Show the number appearing below each word** one-by-one (not all at once) with a brief highlight glow
3. **Fix the truncated text:** "MAATRIKSI NÄITAMINE: TOKEN ID-D" should fully read "MAATRIKSI NÄITAMINE: TOKEN ID-DEK" or whatever the full label is. Check for text overflow/truncation on mobile viewport
4. **Add a count indicator:** "5 tükki" (5 pieces) or "5 tokenit" (5 tokens) to reinforce that the sentence was split into exactly 5 parts

#### ISSUE A-4: Prediction bars need more dramatic "winner" animation
**Current:** Probability bars appear with percentages. "Võitja: on" appears as text. The confetti on the completion screen is nice but comes too late.

**Fix:**
1. **Animate bars growing** from left to right, sequentially (largest first or alphabetically), with a race-like feeling
2. **Highlight the winner** with a golden glow/pulse effect and a brief scale-up animation before showing "Võitja"
3. **Show the "thinking" process:** Before bars appear, briefly show a "Mudel arvutab..." (Model is calculating...) spinner for 1-2 seconds, then bars race in
4. **Connect back to the sentence:** Below the winner, show the complete prediction: *"Mets ja puu on elu → **on** (15%)"* — so the user sees the full chain

---

### 2.3 🟢 UX & Navigation Issues

#### ISSUE U-1: The "Peata õppimiseks" (Pause to learn) button is confusing
**Current:** The button appears in every step but its function is unclear. Does it pause the auto-play? Does it open a learning modal? The icon (⏸) suggests pause.

**Fix:** Either:
- **Option A:** Rename to "Selgitus" (Explanation) and open a brief tooltip/modal with the metaphor explanation from the architecture doc
- **Option B:** Remove it entirely if auto-play can be paused by simply tapping the card area

#### ISSUE U-2: Locked cards below the active step create false hierarchy
**Current:** Below the active simulation, locked cards show "Kuidas AI loeb — lukus", "Sõnadest saavad arvud — lukus", etc. These look like they're separate lessons to unlock, not steps in the same simulation.

**Problem:** Users might think they need to complete something else to "unlock" these. In reality, they're just the next steps in the T→V→A→P flow.

**Fix:**
1. **During simulation:** Hide the locked cards entirely. Only show the active step card
2. **After simulation completes:** Show all 4 steps as a completed checklist (already done on the completion screen ✅)
3. **Alternative:** Keep them visible but change "lukus" (locked) to a number: "Samm 2/4", "Samm 3/4" etc., making it clear these are sequential steps, not separate locked content

#### ISSUE U-3: The top T→V→A→P progress bar disappears after leaving the landing page
**Current:** The landing page shows a nice `T → V → A → P` pipeline bar below the input field. Once the simulation starts, this bar vanishes and is replaced by back arrow + hamburger menu.

**Fix:** Keep a **mini progress indicator** at the top during the entire simulation. Show which step is active:
```
[T] → V → A → P     (T is green/highlighted, others are gray)
T → [V] → A → P     (V is highlighted)
T → V → [A] → P     (A is highlighted)
T → V → A → [P]     (P is highlighted)
```
This gives users constant awareness of where they are in the 4-step journey.

#### ISSUE U-4: No way to go back to a previous step during simulation
**Current:** Once a step is completed and collapsed (showing the summary), tapping it shows a `>` chevron but it's unclear if it expands. The back arrow `←` seems to go back to the landing page.

**Fix:** Make completed step headers expandable. Tapping "Kuidas AI loeb — Tekst tükeldatud 6 osaks" should smoothly expand the T step card to show the tokenization animation again (in completed state).

#### ISSUE U-5: Bottom navigation tabs are not contextually relevant during DNA simulation
**Current:** The bottom bar shows `DNA · ○ · ψ · ↗ · ☁` icons during the entire simulation. Only "DNA" is highlighted.

**Problem:** The other icons (which presumably represent other Dendrix levels: Sprout, Tree, Fruits, Orchard) are irrelevant during the DNA simulation and distract from the focused learning experience.

**Fix:**
- **Option A:** During active simulation, minimize the bottom bar or hide inactive tabs (show only "DNA" with a subtle progress indicator)
- **Option B:** Replace the bottom bar during simulation with the T→V→A→P step navigator, making it the primary navigation method

---

## 3. Animation Improvement Specifications

### 3.1 Global Animation Principles

| Principle | Current | Target |
|-----------|---------|--------|
| **Pacing** | Too fast, no educational pauses | 300-500ms between sub-animations, 1s pause between steps |
| **Continuity** | Steps are independent cards | Data visually flows from one step to the next |
| **Labels** | Abstract (dots, numbers) | Always show original words alongside technical representation |
| **Metaphors** | Mentioned in text only | Visually enacted (LEGO breaking, GPS dots, flashlight sweep) |
| **Interactivity** | Promised but not delivered (Attention touch) | Auto-play first, then allow interactive exploration |

### 3.2 Step-by-Step Animation Timeline

#### Phase 0: Input (0-1s)
- User sees "Mets ja puu on elu" in the input field
- Taps play → text "lifts" from input field and floats to center stage

#### Phase 1: Tokenization (1-5s)
1. **[0-1s]** Whole sentence visible: `Mets ja puu on elu`
2. **[1-3s]** Separator dots appear between words, each word gets a subtle border (LEGO block metaphor)
3. **[3-4s]** Below each word, a number fades in: `Mets[15496] · ja[8421] · puu[2910] · on[...] · elu[...]`
4. **[4-5s]** Counter: "5 tokenit leitud" (5 tokens found)
5. **Pause:** User can tap "Edasi" or it auto-continues after 3s

#### Phase 2: Vectors (5-10s)
1. **[0-1s]** Bridge animation: Token blocks "compress" into dots and fly toward a 2D canvas
2. **[1-3s]** Dots land on their coordinates one by one. Each dot is labeled with its word
3. **[3-5s]** "mets", "puu", "elu" cluster together (small attractive animation). "ja", "on" drift apart
4. **[4-5s]** Faint circle highlights the cluster: "Sarnased tähendused = lähedased punktid" (Similar meanings = close points)

#### Phase 3: Attention (10-16s)
1. **[0-1s]** Bridge: Dots reorganize into a horizontal word line with labeled nodes
2. **[1-4s]** Flashlight sweep: A spotlight highlights one word, then lines draw to connected words with varying thickness
3. **[4-6s]** All connections visible simultaneously. Strongest connections glow brighter
4. **[5-6s]** Summary count: "3 tugevat seost leitud" (3 strong connections found)

#### Phase 4: Prediction (16-22s)
1. **[0-1s]** Bridge: Connection network collapses into a "thinking" animation
2. **[1-2s]** "Mudel arvutab..." loading animation
3. **[2-5s]** Probability bars race in from left. "on" bar shoots ahead
4. **[5-6s]** Winner highlight: "on" bar pulses golden, "Võitja!" label appears
5. **[6s]** Complete sentence: `Mets ja puu on elu → **on** (15%)`

#### Phase 5: Completion (22-25s)
1. Confetti animation (already exists ✅)
2. Full pipeline summary with all 4 steps visible
3. "Korda uuesti" and "Mine sügavamale" buttons

---

## 4. Specific Code Changes Required

> **IMPORTANT:** These are surgical fixes. Do NOT refactor the component structure or state management. Only modify animation parameters, text content, and CSS within existing components.

### 4.1 Text/Label Fixes (Highest Priority — Zero Risk)

```
CHANGE 1: "Järgmise pakkumine" → "Ennustamine" (or "Järgmise sõna ennustus")
CHANGE 2: Fix truncated "MAATRIKSI NÄITAMINE: TOKEN ID-D" → full text
CHANGE 3: "0 seost leitud" → Show actual count of connections rendered (min 2-3)
CHANGE 4: Add word labels to vector scatter plot dots
CHANGE 5: Add word labels to attention step dots
```

### 4.2 Animation Timing Fixes (Medium Priority — Low Risk)

```
CHANGE 6: Token split animation — increase delay between each word separation to 300ms (from ~100ms)
CHANGE 7: Token ID appearance — stagger by 200ms per token (from simultaneous)
CHANGE 8: Vector dot entrance — animate one by one with 400ms delay (from instant)
CHANGE 9: Prediction bars — animate growth sequentially with 300ms stagger
CHANGE 10: Add 1-2s educational pause between each step transition
```

### 4.3 Visual Connection Fixes (High Priority — Medium Risk)

```
CHANGE 11: Attention step — draw SVG/Canvas lines between word nodes with varying strokeWidth
CHANGE 12: Attention step — auto-play connection animation (don't require user touch on first pass)
CHANGE 13: Vector step — draw faint circle around semantically similar word clusters
CHANGE 14: Add "bridge animation" between steps (output of step N morphs into input of step N+1)
```

### 4.4 UX Navigation Fixes (Medium Priority — Medium Risk)

```
CHANGE 15: Keep T→V→A→P mini-progress indicator visible during entire simulation
CHANGE 16: Hide locked step cards during active simulation (or re-label as "Samm 2/4")
CHANGE 17: Make completed step headers expandable/collapsible
CHANGE 18: Clarify or remove "Peata õppimiseks" button
```

---

## 5. Priority Order for Implementation

### Sprint 1 — Quick Wins (Text & Labels)
1. Fix "Järgmise pakkumine" → "Ennustamine"
2. Fix truncated token matrix label
3. Add word labels to Vector and Attention dots
4. Fix "0 seost leitud" bug in Attention summary

### Sprint 2 — Animation Polish
5. Slow down token splitting + stagger IDs
6. Animate vector dots one-by-one with labels
7. Animate prediction bars sequentially
8. Add educational pauses between steps

### Sprint 3 — Core Visual Improvements
9. Draw attention connection lines (SVG/Canvas) with auto-play
10. Add semantic clustering circle in Vector step
11. Add bridge/morph animations between T→V, V→A, A→P transitions

### Sprint 4 — Navigation UX
12. Persistent T→V→A→P progress indicator
13. Expandable completed step cards
14. Clean up bottom navigation during simulation

---

## 6. Reference: Estonian Labels & Translations

| Component | Current Label (ET) | Corrected Label (ET) | English |
|-----------|-------------------|---------------------|---------|
| T step | Kuidas AI loeb | ✅ Keep | How AI reads |
| V step | Sõnadest saavad arvud | ✅ Keep | Words become numbers |
| A step | Punktide ühendamine | ✅ Keep | Connecting the dots |
| P step | Järgmise pakkumine | **Ennustamine** | Prediction |
| A summary | 0 seost leitud | **N seost leitud** (dynamic) | N connections found |
| Token matrix | MAATRIKSI NÄITAMINE: TOKEN ID-D | **Fix truncation** | Matrix display: Token IDs |
| Pause btn | Peata õppimiseks | **Selgitus** or remove | Explanation |
| Connector T→V | (missing) | "Numbrid saavad nüüd aadressi..." | Numbers now get addresses... |
| Connector V→A | (missing) | "Vaatame, kuidas sõnad seostuvad..." | Let's see how words connect... |
| Connector A→P | (missing) | "Mudel ennustab järgmist sõna..." | Model predicts next word... |

---

## 7. Quality Checklist for Verification

After implementing changes, verify each of the following:

- [ ] **T step:** Words split one-by-one with visible delay. IDs appear staggered. Count shows "5 tokenit"
- [ ] **V step:** All dots labeled with words. Semantic cluster is visually grouped. No cryptic axis labels
- [ ] **A step:** Auto-animated connection lines with varying thickness. Summary shows ≥2 connections found
- [ ] **P step:** Label reads "Ennustamine" not "Järgmise pakkumine". Bars animate sequentially. Winner has golden pulse
- [ ] **Flow:** Data visually bridges between steps. Connector sentences appear between each transition
- [ ] **Progress:** T→V→A→P indicator visible throughout simulation, highlighting current step
- [ ] **Completion:** Shows full sentence + prediction in context. Confetti works ✅
- [ ] **Mobile:** No text truncation. All animations smooth at 60fps. Touch targets ≥ 44px

---

*Analysis prepared by UX/UI & Front-end Animation specialist. Based on 5 screen recordings of dendrix.ai DNA simulation (mobile view, 4 Feb 2026).*
