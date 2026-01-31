# Concept Visualization Mapping

> Visual specification for all 25 AI Tree concepts.
> Each concept is classified as **Dynamic** (interactive React component), **Inline SVG** (code-generated React SVG), or **Designer SVG** (visual brief for illustrator).

## Summary

| Type | Count | Concepts |
|------|-------|----------|
| **Dynamic Interactive** | 5 | tokens, vectors, attention, context-windows, temperature-sampling |
| **Inline SVG** | 17 | prefill-decode, hallucinations, training-vs-inference, context-engineering, rag, memory, security, prompting-basics, ai-agents, mcp, complexity-levels, function-calling, moe, green-ai, reasoning-models, complexity-levels |
| **Designer SVG** | 3 | transformers, lora, agi-asi |

### Implementation Status

| Status | Symbol | Count |
|--------|--------|-------|
| Exists | :white_check_mark: | 2 (tokens, vectors) |
| Ready to build | :hammer: | 20 |
| Needs design | :art: | 3 |

### Color Palette (by level)

| Level | Primary | Light | Dark |
|-------|---------|-------|------|
| Roots | `#065f46` (emerald-800) | `#ecfdf5` | `#022c22` |
| Trunk | `#92400e` (amber-800) | `#fffbeb` | `#451a03` |
| Branches | `#3b82f6` (blue-500) | `#eff6ff` | `#1e3a5f` |
| Leaves | `#8b5cf6` (violet-500) | `#f5f3ff` | `#2e1065` |

---

## ROOTS — Fundamental Mechanics

### 1. tokens — "Tekstiklotsid"

- **Level:** Roots | **Complexity:** 1 | **Icon:** blocks
- **Visual type:** Dynamic :white_check_mark: (exists: `TokenizerDemo`)
- **Status:** COMPLETE — interactive tokenizer already in production
- **Component:** `components/TokenizerDemo.tsx`

**What it shows:**
User types text, sees it split into colored token blocks in real-time. Token count, estimated cost, and try-examples buttons.

**Interaction:**
- Text input field
- Live tokenization with colored blocks
- Token count + cost estimate
- Example buttons to load sample texts

**Dark mode:** Fully supported via Tailwind dark classes.

---

### 2. vectors — "Tähenduste kaart"

- **Level:** Roots | **Complexity:** 2 | **Icon:** map-pin
- **Visual type:** Dynamic :white_check_mark: (exists: `VectorDemo`)
- **Status:** COMPLETE — interactive vector similarity demo in production
- **Component:** `components/VectorDemo.tsx`
- **Data field:** `visual: { type: "demo", component: "VectorDemo" }`

**What it shows:**
User enters words, sees similarity scores and a 2D scatter plot of word positions in vector space.

**Interaction:**
- 3 word input fields
- "Calculate Similarity" button
- Similarity scores with color-coded bars
- 2D SVG scatter plot with labeled points
- Example buttons

**Dark mode:** Fully supported.

---

### 3. attention — "Fookus"

- **Level:** Roots | **Complexity:** 2 | **Icon:** flashlight
- **Visual type:** Dynamic :hammer:
- **Status:** Ready to build
- **Target component:** `components/AttentionDemo.tsx`

**What it shows:**
Interactive attention heatmap. User types a sentence, then clicks on a word to see which other words it "attends" to, with intensity shown as color strength.

**Layout:**
```
┌─────────────────────────────────────────────┐
│  Input: [Mari läks poodi ja ta ostis piima] │
│                                             │
│  Click a word to see its attention:         │
│                                             │
│  ┌──────┬──────┬───────┬────┬────┬───────┐  │
│  │ Mari │ läks │ poodi │ ja │ ta │ ostis │  │
│  │ ████ │ ██   │ ██   │ █  │████│ ███   │  │
│  └──────┴──────┴───────┴────┴────┴───────┘  │
│                                             │
│  Selected: "ta" → attends to:               │
│  Mari (0.72) ████████████████░░░░           │
│  läks (0.08) ██░░░░░░░░░░░░░░░░░           │
│  ostis (0.15) ████░░░░░░░░░░░░░░░          │
└─────────────────────────────────────────────┘
```

**Interaction:**
- Text input (pre-filled with example sentence)
- Click any word → highlights attention weights to all other words
- Color intensity = attention score (emerald gradient)
- Bar chart showing exact scores per word
- Pre-computed attention weights for demo sentences (no real model needed)

**Color palette:** Emerald shades (`#065f46` → `#ecfdf5`) for heatmap cells.

**Labels:** Word tokens as clickable buttons, score bars with numeric values.

**Dark mode:** Invert heatmap to light-on-dark, use `dark:bg-emerald-900/40` cells.

---

### 4. prefill-decode — "Lugemine ja kirjutamine"

- **Level:** Roots | **Complexity:** 2 | **Icon:** book-text
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/PrefillDecodeSVG.tsx`

**What it shows:**
Two-phase process diagram. Left side: "Prefill" (reading) — batch of tokens processed at once. Right side: "Decode" (writing) — tokens generated one by one sequentially.

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   PREFILL (Reading)            DECODE (Writing)         │
│   ─────────────────           ─────────────────         │
│                                                         │
│   ┌─────────────┐            ┌───┐                      │
│   │ ████████████ │    →      │ T1│ → T2 → T3 → T4 →... │
│   │ All tokens   │           └───┘                      │
│   │ at once      │           one by one                 │
│   └─────────────┘                                       │
│                                                         │
│   ⚡ Fast (parallel)          🐢 Slower (sequential)     │
│   GPU utilization: HIGH       GPU utilization: LOW       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key elements:**
- Left panel: Grid of tokens (all highlighted at once)
- Right panel: Tokens appearing one at a time (animated arrow sequence)
- Speed indicators below each phase
- Arrow connecting the two phases

**Color palette:** Emerald for prefill tokens, lighter emerald for decode tokens, gray arrows.

**Labels:**
- "Prefill (Eeltäide)" / "Decode (Dekodeerimine)"
- "All tokens at once" / "One token at a time"
- Speed comparison text

**Dark mode:** Swap backgrounds, use light text, adjust token block colors.

---

### 5. context-windows — "Töömälu"

- **Level:** Roots | **Complexity:** 1 | **Icon:** frame
- **Visual type:** Dynamic :hammer:
- **Status:** Ready to build
- **Target component:** `components/ContextWindowDemo.tsx`

**What it shows:**
Interactive sliding window visualization. A progress bar fills as the user types or loads text. When the "window" is full, older tokens fade out from the left.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  Context Window: GPT-4 (8,192 tokens)           │
│                                                 │
│  ┌───────────────────────────────────────┐      │
│  │ ░░░░░████████████████████████░░░░░░░░ │      │
│  │      ↑ visible context ↑              │      │
│  └───────────────────────────────────────┘      │
│                                                 │
│  Used: 3,412 / 8,192 tokens  [████████░░] 42%  │
│                                                 │
│  [Textarea: type to fill the window...]         │
│                                                 │
│  Model:  [GPT-4 ▾]  ← changes window size      │
│  GPT-3.5: 4K | GPT-4: 8K | Claude: 200K        │
│                                                 │
│  ⚠️ When full, earliest messages are forgotten   │
└─────────────────────────────────────────────────┘
```

**Interaction:**
- Textarea input — token count updates live
- Model selector dropdown (changes max window size)
- Progress bar fills as tokens are added
- When full, left side grays out ("forgotten")
- Comparison bar showing different models' window sizes

**Color palette:** Emerald gradient for the active window region, gray for forgotten regions.

**Dark mode:** Dark input, light progress bar, inverted forgotten region.

---

### 6. hallucinations — "Enesekindlad väljamõeldised"

- **Level:** Roots | **Complexity:** 1 | **Icon:** ghost
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/HallucinationsSVG.tsx`

**What it shows:**
Side-by-side comparison: a confident but wrong AI response vs a correct one. Visual emphasis on how both "look" equally convincing.

**Layout:**
```
┌──────────────────────┬──────────────────────┐
│   ❌ Hallucination    │   ✅ Correct          │
│   ───────────────    │   ─────────────      │
│                      │                      │
│   "Eiffel Tower was  │   "Eiffel Tower was  │
│   built in 1887 by   │   built in 1889 by   │
│   Claude Monet for   │   Gustave Eiffel for │
│   the World's Fair"  │   the World's Fair"  │
│                      │                      │
│   Confidence: 94%    │   Confidence: 96%    │
│   ████████████████░  │   █████████████████░ │
│                      │                      │
│   ⚠ Same confidence! │   ✓ Factually correct│
│                      │                      │
│   Problem: AI does   │   Solution: RAG,     │
│   not check facts    │   grounding, human   │
│                      │   verification       │
└──────────────────────┴──────────────────────┘
```

**Key elements:**
- Two columns with nearly identical confidence bars
- Red tint on left (wrong), green tint on right (correct)
- Highlighted wrong facts (red underline) vs correct facts (green)
- Bottom: problem/solution callout

**Color palette:** Red/rose for hallucination side, green/emerald for correct side.

**Labels:** "Hallucination" / "Correct" headers, inline fact highlights, confidence percentages.

**Dark mode:** Dark card backgrounds, same color-coding logic with adjusted opacity.

---

### 7. training-vs-inference — "Kool vs Töö"

- **Level:** Roots | **Complexity:** 1 | **Icon:** graduation-cap
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/TrainingInferenceSVG.tsx`

**What it shows:**
Two-panel comparison: Training (school/learning phase) vs Inference (work/applying phase). Contrasts cost, time, resources, and process.

**Layout:**
```
┌───────────────────────┬───────────────────────┐
│  🎓 TRAINING          │  💼 INFERENCE          │
│  ──────────────       │  ──────────────       │
│                       │                       │
│  Time: Weeks–Months   │  Time: Milliseconds   │
│  Cost: $2M–$100M+     │  Cost: $0.002/query   │
│  GPUs: 1000s          │  GPUs: 1–8            │
│  Data: Terabytes      │  Data: Your prompt    │
│                       │                       │
│  ┌─────────┐          │  ┌─────────┐          │
│  │ Books   │→ Model   │  │ Prompt  │→ Answer  │
│  │ Web     │  learns  │  │         │  in 2s   │
│  │ Code    │  weights │  │         │          │
│  └─────────┘          │  └─────────┘          │
│                       │                       │
│  Weights: CHANGE      │  Weights: FROZEN      │
│  (learning)           │  (applying)           │
└───────────────────────┴───────────────────────┘
```

**Key elements:**
- Two equal columns with contrasting icons (graduation cap vs briefcase)
- Stat rows: time, cost, GPUs, data (with stark differences highlighted)
- Simple flow diagrams: data→model (training) and prompt→answer (inference)
- Bottom callout: "Weights change" vs "Weights frozen"

**Color palette:** Amber/warm tones for training (effort), emerald/cool for inference (speed).

**Dark mode:** Dark cards, light text, same color logic.

---

### 8. transformers — "Meisterarhitektuur"

- **Level:** Roots | **Complexity:** 2 | **Icon:** cpu
- **Visual type:** Designer SVG :art:
- **Status:** Needs design
- **Target:** `public/img/concepts/transformers.svg`

**What it shows:**
Simplified Transformer architecture diagram based on "Attention is All You Need" paper. Shows the key blocks without overwhelming detail.

**Designer brief:**

```
Architecture (vertical, bottom-to-top):

Input Text
    ↓
[Token Embedding + Positional Encoding]
    ↓
┌─────────────────────────────────────┐
│        TRANSFORMER BLOCK (×N)       │
│  ┌─────────────────────────────┐    │
│  │   Multi-Head Attention      │    │ ← emerald highlight
│  └──────────────┬──────────────┘    │
│                 ↓                   │
│  ┌─────────────────────────────┐    │
│  │   Feed-Forward Network      │    │
│  └──────────────┬──────────────┘    │
│        + Layer Norm + Residual      │
└─────────────────┬───────────────────┘
                  ↓
[Output Probabilities]
    ↓
Next Token
```

**Style notes:**
- Clean, minimal line art (not academic-paper dense)
- Rounded rectangles with subtle shadows
- Emerald accent on attention blocks (the "star" of the architecture)
- Gray/neutral for other blocks
- Labels in clean sans-serif
- Arrows with slight curves, not sharp right angles
- Max width: 600px, aspect ratio ~2:3 (tall)

**Color palette:**
- Attention blocks: `#065f46` fill with `#ecfdf5` text
- FF blocks: `#6b7280` fill with white text
- Arrows: `#9ca3af`
- Background: transparent (works on both light and dark)

**Text labels (bilingual):**
- "Sisend (Input)" → "Token Embedding" → "Multi-Head Attention" → "Feed-Forward" → "Väljund (Output)"

**Dark mode:** Use transparent background. Text should use `currentColor` for CSS-controlled color inversion.

---

## TRUNK — Engineering & Architecture

### 9. context-engineering — "Lavastus"

- **Level:** Trunk | **Complexity:** 2 | **Icon:** stage
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/ContextEngineeringSVG.tsx`

**What it shows:**
Prompt anatomy diagram: a structured prompt broken into labeled sections (system role, context, rules, format, user query).

**Layout:**
```
┌─────────────────────────────────────────────┐
│  PROMPT ANATOMY                             │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🎭 SYSTEM ROLE                      │    │
│  │ "You are a professional email..."   │    │
│  ├─────────────────────────────────────┤    │
│  │ 📋 RULES & CONSTRAINTS              │    │
│  │ • Max 150 words • Formal tone       │    │
│  ├─────────────────────────────────────┤    │
│  │ 📐 OUTPUT FORMAT                    │    │
│  │ Greeting → Context → CTA → Close   │    │
│  ├─────────────────────────────────────┤    │
│  │ 📝 EXAMPLES (Few-shot)              │    │
│  │ Input: ... → Output: ...            │    │
│  ├─────────────────────────────────────┤    │
│  │ 💬 USER QUERY                       │    │
│  │ "Write email about delivery delay"  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ↓ Better context = Better output ↓         │
└─────────────────────────────────────────────┘
```

**Key elements:**
- Stacked sections with distinct color bands
- Each section has an icon + label + example content
- Arrow at bottom pointing to "Better output"

**Color palette:** Amber shades, each section slightly different tone.

**Dark mode:** Dark section backgrounds, lighter borders.

---

### 10. rag — "Raamatukogu"

- **Level:** Trunk | **Complexity:** 2 | **Icon:** book-open
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/RagPipelineSVG.tsx`

**What it shows:**
RAG pipeline flow: horizontal left-to-right showing the three stages — Retrieve, Augment, Generate.

**Layout:**
```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  "What is Tallinn?"                                       │
│        ↓                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │ RETRIEVE │ →  │   AUGMENT    │ →  │   GENERATE   │     │
│  │          │    │              │    │              │     │
│  │ Embed    │    │ Add docs to  │    │ AI answers   │     │
│  │ query →  │    │ prompt as    │    │ using the    │     │
│  │ Search   │    │ context      │    │ retrieved    │     │
│  │ docs     │    │              │    │ documents    │     │
│  └──────────┘    └──────────────┘    └──────────────┘     │
│        ↑                                    ↓             │
│  ┌──────────┐                     "Tallinn is the         │
│  │ Document │                      capital of Estonia,    │
│  │ Database │                      located on the Gulf    │
│  │ (vectors)│                      of Finland."           │
│  └──────────┘                                             │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

**Key elements:**
- 3 main boxes in a horizontal flow (R → A → G)
- Document database below "Retrieve"
- Final answer below "Generate"
- Arrows connecting all stages

**Color palette:** Amber tones. Retrieve = warm amber, Augment = medium, Generate = golden.

**Dark mode:** Dark boxes with light amber borders.

---

### 11. memory — "Mälu"

- **Level:** Trunk | **Complexity:** 2 | **Icon:** notebook
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/MemoryTypesSVG.tsx`

**What it shows:**
Memory architecture diagram: short-term (conversation window) vs long-term (database storage), showing how they work together.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  AI MEMORY ARCHITECTURE                         │
│                                                 │
│  ┌───────────────────────┐  ┌────────────────┐  │
│  │  SHORT-TERM MEMORY    │  │ LONG-TERM      │  │
│  │  (Conversation)       │  │ MEMORY (DB)    │  │
│  │                       │  │                │  │
│  │  [msg1] [msg2] [msg3] │  │  Facts         │  │
│  │  [msg4] [msg5] [msg6] │←→│  Preferences   │  │
│  │                       │  │  History        │  │
│  │  Limited: last N msgs │  │  Unlimited      │  │
│  │  Fast access          │  │  Search needed  │  │
│  └───────────────────────┘  └────────────────┘  │
│                                                 │
│  Without memory: every message starts from zero │
└─────────────────────────────────────────────────┘
```

**Key elements:**
- Two main containers side by side
- Messages in short-term memory as small blocks (oldest fading)
- Bidirectional arrow between short and long-term
- Properties listed below each type

**Color palette:** Amber. Short-term = lighter (ephemeral), long-term = deeper (persistent).

**Dark mode:** Invert backgrounds.

---

### 12. lora — "Täiendkoolitus"

- **Level:** Trunk | **Complexity:** 3 | **Icon:** graduation-cap
- **Visual type:** Designer SVG :art:
- **Status:** Needs design
- **Target:** `public/img/concepts/lora.svg`

**What it shows:**
Neural network diagram with LoRA adapter layers highlighted. Shows the "bypass" low-rank matrices that get trained while the main network stays frozen.

**Designer brief:**

```
Simplified neural network (3 layers):

    ┌─────────────────────────────────────┐
    │         FROZEN BASE MODEL           │
    │                                     │
    │  Input → [Layer 1] → [Layer 2] → [Layer 3] → Output
    │              ↓            ↓                │
    │          ┌───────┐   ┌───────┐             │
    │          │ LoRA A │   │ LoRA A │            │
    │          │   ↓   │   │   ↓   │             │
    │          │ LoRA B │   │ LoRA B │            │
    │          └───┬───┘   └───┬───┘             │
    │              ↓            ↓                │
    │          (merge back into main path)        │
    └─────────────────────────────────────┘

    Base model: 7 Billion parameters (FROZEN ❄️)
    LoRA adapters: ~1 Million parameters (TRAINED 🔥)
    = 0.01% of total parameters
```

**Style notes:**
- Main network path: thick gray line (frozen, no training)
- LoRA branches: thin amber/orange lines (active, being trained)
- Use snowflake icon for frozen layers, flame for trained
- Show parameter count comparison (7B frozen vs 1M trained)
- Clean line art, rounded nodes
- Max width: 600px, aspect ratio ~3:2

**Color palette:**
- Frozen layers: `#6b7280` (gray)
- LoRA adapters: `#f59e0b` (amber) with `#fffbeb` fill
- Active training indicator: `#ef4444` (red/flame)

**Dark mode:** Transparent background, `currentColor` text.

---

### 13. security — "Turvalisus"

- **Level:** Trunk | **Complexity:** 2 | **Icon:** shield
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/SecuritySVG.tsx`

**What it shows:**
AI security threat map showing the three main attack vectors and their defenses.

**Layout:**
```
┌────────────────────────────────────────────────┐
│           AI SECURITY LAYERS                   │
│                                                │
│  INPUT                AI                OUTPUT  │
│  ─────               ─────              ────── │
│                                                │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Prompt   │ →  │  MODEL   │ →  │ Data     │  │
│  │ Injection│    │          │    │ Leakage  │  │
│  └──────────┘    └──────────┘    └──────────┘  │
│       🛡️               🛡️              🛡️       │
│  Input         Guardrails      Output          │
│  Validation    & Alignment     Filtering       │
│                                                │
│  ┌────────────────────────────────────────┐    │
│  │ 💉 Injection: "Ignore instructions..." │    │
│  │ 🔓 Jailbreak: "Pretend you are..."     │    │
│  │ 📤 Leakage: Exposing training data     │    │
│  └────────────────────────────────────────┘    │
└────────────────────────────────────────────────┘
```

**Key elements:**
- Three zones: Input → Model → Output
- Shield icons at each boundary
- Attack examples in bottom callout box
- Defense labels under each shield

**Color palette:** Amber base. Red accents for threats, green for defenses.

**Dark mode:** Dark background, bright shield/defense indicators.

---

### 14. temperature-sampling — "Loovuse nupp"

- **Level:** Trunk | **Complexity:** 1 | **Icon:** thermometer
- **Visual type:** Dynamic :hammer:
- **Status:** Ready to build
- **Target component:** `components/TemperatureDemo.tsx`

**What it shows:**
Interactive slider (0 → 2) that controls "temperature". As user slides, the displayed output changes from deterministic/repetitive to creative/chaotic. Shows a probability distribution bar that shifts from peaked (low temp) to flat (high temp).

**Layout:**
```
┌──────────────────────────────────────────────┐
│  TEMPERATURE CONTROL                         │
│                                              │
│  Prompt: "The cat sat on the ____"           │
│                                              │
│  Temperature: [═══════●════] 0.7             │
│               0.0          2.0               │
│                                              │
│  Token probabilities:                        │
│  mat    ████████████████████ 45%             │
│  chair  █████████████       28%             │
│  roof   ██████              14%             │
│  moon   ████                 8%             │
│  cloud  ██                   5%             │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │ 🧊 0.0: "mat mat mat mat mat"         │  │
│  │ 🎯 0.3: "mat. It was warm and soft."  │  │
│  │ 🎨 0.7: "mat, watching the birds."    │  │
│  │ 🌀 1.5: "quantum bicycle of dreams!"  │  │
│  │ 🔥 2.0: "xylophone carpet nebula!!"   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Low = Predictable    High = Creative        │
└──────────────────────────────────────────────┘
```

**Interaction:**
- Slider from 0 to 2 (step 0.1)
- Probability bars animate as temperature changes
- At low temp: top bar dominates (peaked distribution)
- At high temp: bars even out (flat distribution)
- Example outputs change based on slider position
- Pre-computed outputs for each temperature range

**Color palette:** Amber. Cool blue at low temp, warm orange at high temp (gradient on slider track).

**Dark mode:** Dark background, light text, same color gradient logic.

---

### 15. prompting-basics — "Heade küsimuste esitamine"

- **Level:** Trunk | **Complexity:** 1 | **Icon:** message-square
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/PromptingBasicsSVG.tsx`

**What it shows:**
Side-by-side: bad prompt vs good prompt, with annotated principles. Shows how specificity transforms the output quality.

**Layout:**
```
┌──────────────────────┬──────────────────────┐
│  ❌ BAD PROMPT        │  ✅ GOOD PROMPT       │
│  ───────────         │  ────────────        │
│                      │                      │
│  "Tell me about      │  "List 3 quick       │
│   food"              │   vegetarian recipes  │
│                      │   under 30 min with   │
│                      │   20g+ protein.       │
│                      │   Format as numbered  │
│                      │   list."              │
│                      │                      │
│  Result: 🤷 vague    │  Result: 🎯 precise  │
│  generic essay       │  actionable list      │
│  about food history  │  you can cook tonight │
│                      │                      │
├──────────────────────┴──────────────────────┤
│                                             │
│  5 PRINCIPLES:                              │
│  1. Be specific (goal)                      │
│  2. Give context (background)               │
│  3. Set format (list, table, JSON)          │
│  4. Use examples (few-shot)                 │
│  5. Break complex tasks (chain-of-thought)  │
└─────────────────────────────────────────────┘
```

**Key elements:**
- Two columns: bad vs good prompt (red vs green tint)
- Arrow showing result difference
- Bottom panel: 5 numbered principles

**Color palette:** Amber base. Red for bad, green for good, numbered items in amber.

**Dark mode:** Dark card backgrounds, same color-coding.

---

## BRANCHES — Applications & Agents

### 16. ai-agents — "Tegija"

- **Level:** Branches | **Complexity:** 2 | **Icon:** bot
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/AgentLoopSVG.tsx`

**What it shows:**
The agent loop cycle: Observe → Think → Act → Observe (with tool usage).

**Layout:**
```
┌───────────────────────────────────────────────┐
│              AGENT LOOP                       │
│                                               │
│           ┌──────────┐                        │
│           │  OBSERVE  │ ← Result              │
│           └────┬─────┘                        │
│                ↓                              │
│           ┌──────────┐                        │
│           │  THINK   │ Decide next action     │
│           └────┬─────┘                        │
│                ↓                              │
│           ┌──────────┐                        │
│      ┌────│   ACT    │────┐                   │
│      ↓    └──────────┘    ↓                   │
│  ┌───────┐           ┌───────┐                │
│  │Search │           │ Code  │  ← Tools       │
│  └───────┘           └───────┘                │
│                                               │
│  vs CONSULTANT (LLM): only gives advice       │
│  vs AGENT: takes action and delivers results  │
└───────────────────────────────────────────────┘
```

**Key elements:**
- Circular loop with 3 nodes (Observe/Think/Act)
- Tool branches from "Act" node
- Bottom comparison: consultant vs agent

**Color palette:** Blue (`#3b82f6`) for main loop, lighter blue for tool branches.

**Dark mode:** Dark background, bright blue accents.

---

### 17. mcp — "Ühendaja"

- **Level:** Branches | **Complexity:** 2 | **Icon:** plug
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/McpArchitectureSVG.tsx`

**What it shows:**
MCP architecture: AI Client ↔ MCP Server ↔ Various tools/databases. Emphasizes the "universal connector" concept.

**Layout:**
```
┌─────────────────────────────────────────────────┐
│  BEFORE MCP              AFTER MCP              │
│                                                 │
│  AI ──custom── DB1       AI ──┐                 │
│  AI ──custom── DB2            │                 │
│  AI ──custom── API1      MCP Protocol           │
│  AI ──custom── API2          │                 │
│                          ┌───┴───┐              │
│  (Each needs its         │  MCP  │              │
│   own integration)       │Server │              │
│                          └───┬───┘              │
│                          ┌───┼───┐              │
│                         DB  API  Tool           │
│                                                 │
│  "Like USB-C: one cable for everything"         │
└─────────────────────────────────────────────────┘
```

**Key elements:**
- Left: spaghetti connections (before MCP)
- Right: clean hub-and-spoke (after MCP)
- MCP server as central node
- Tool icons (database, API, file system)

**Color palette:** Blue. Messy connections in gray/red, clean MCP in blue.

**Dark mode:** Dark background, bright blue for MCP elements.

---

### 18. complexity-levels — "Kolm taset"

- **Level:** Branches | **Complexity:** 1 | **Icon:** layers
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/ComplexityLevelsSVG.tsx`

**What it shows:**
Three-tier pyramid showing the three levels of AI capability: LLM (narrator), Reasoning Model (thinker), Agent (doer).

**Layout:**
```
┌───────────────────────────────────────────┐
│                                           │
│              ┌─────────┐                  │
│              │  AGENT  │  3. Doer         │
│              │  🛠️     │  Takes action    │
│              ├─────────┤                  │
│          ┌───┴─────────┴───┐              │
│          │ REASONING MODEL │  2. Thinker  │
│          │     🧠         │  Plans steps  │
│          ├─────────────────┤              │
│      ┌───┴─────────────────┴───┐          │
│      │        LLM              │  1. Chat │
│      │        💬              │  Answers  │
│      └─────────────────────────┘          │
│                                           │
│  Kitchen analogy:                         │
│  1. Recipe book  2. Head chef  3. Cook    │
└───────────────────────────────────────────┘
```

**Key elements:**
- 3-layer pyramid (bottom widest, top smallest)
- Each layer: icon, label, one-line description
- Kitchen analogy at bottom
- Each tier gets progressively darker blue

**Color palette:** Blue gradient from light (LLM) to deep (Agent).

**Dark mode:** Inverted — darkest at base, lightest at top.

---

### 19. function-calling — "AI-le käte andmine"

- **Level:** Branches | **Complexity:** 2 | **Icon:** plug-2
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/FunctionCallingSVG.tsx`

**What it shows:**
Sequence diagram: User → AI → Function → AI → User. Shows the structured JSON call in the middle.

**Layout:**
```
┌────────────────────────────────────────────────┐
│  FUNCTION CALLING SEQUENCE                     │
│                                                │
│  USER          AI MODEL         FUNCTION       │
│   │               │                │           │
│   │──"What's the──→│                │           │
│   │   weather?"   │                │           │
│   │               │                │           │
│   │               │──{get_weather──→│           │
│   │               │  city:"Tallinn"}│           │
│   │               │                │           │
│   │               │←──{temp: "5°C"─│           │
│   │               │    rain: true}  │           │
│   │               │                │           │
│   │←─"It's 5°C ──│                │           │
│   │   and rainy"  │                │           │
│   │               │                │           │
│                                                │
│  AI doesn't execute — it generates the call    │
│  Your app executes the function                │
└────────────────────────────────────────────────┘
```

**Key elements:**
- 3 vertical lifelines (User, AI, Function)
- Arrows with labeled messages
- JSON snippets on the function calls
- Bottom note about execution model

**Color palette:** Blue lifelines, amber JSON snippets.

**Dark mode:** Light lifelines on dark background.

---

## LEAVES — Research & Trends

### 20. moe — "Konsiilium"

- **Level:** Leaves | **Complexity:** 2 | **Icon:** users
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/MoeSVG.tsx`

**What it shows:**
Router directing input to selected expert panels. Only 2-3 of N experts activate per query.

**Layout:**
```
┌────────────────────────────────────────────────┐
│  MIXTURE OF EXPERTS                            │
│                                                │
│  Input: "How does photosynthesis work?"        │
│                    ↓                           │
│              ┌──────────┐                      │
│              │  ROUTER  │  (Selects 2 of 8)    │
│              └────┬─────┘                      │
│           ┌───────┼───────┐                    │
│           ↓       ↓       ↓                    │
│      ┌────────┐ ┌────┐ ┌────┐ ┌────┐          │
│      │Biology │ │Math│ │Code│ │Lang│  ...      │
│      │Expert  │ │    │ │    │ │    │           │
│      │  ✅    │ │ ░░ │ │ ░░ │ │ ░░ │          │
│      └────┬───┘ └────┘ └────┘ └────┘          │
│           ↓                                    │
│      ┌─────────────────────┐                   │
│      │  Combined Output    │                   │
│      └─────────────────────┘                   │
│                                                │
│  Active: 2/8 experts → Faster + Cheaper        │
└────────────────────────────────────────────────┘
```

**Key elements:**
- Input at top
- Router node (purple highlighted)
- 4-8 expert panels (only 1-2 highlighted as active)
- Inactive experts grayed out
- Combined output at bottom
- Efficiency note

**Color palette:** Purple (`#8b5cf6`). Active experts bright, inactive dimmed.

**Dark mode:** Dark background, bright purple for active experts.

---

### 21. agi-asi — "Superintellekt"

- **Level:** Leaves | **Complexity:** 3 | **Icon:** brain
- **Visual type:** Designer SVG :art:
- **Status:** Needs design
- **Target:** `public/img/concepts/agi-asi.svg`

**What it shows:**
Capability spectrum from current Narrow AI through AGI to ASI. Horizontal timeline/spectrum with milestones.

**Designer brief:**

```
Horizontal spectrum (left to right):

  NARROW AI          AGI              ASI
  (Today)           (Future?)        (Hypothetical)
  ───●────────────────●─ ─ ─ ─ ─ ─ ─ ●
  │                   │               │
  Good at ONE task    Good at ALL     Surpasses ALL
  Chess, translation  human tasks     human capability
  Image recognition   Generalizes     Self-improving
                      across domains

  Examples:
  ChatGPT, Siri      Not yet          Theoretical
  AlphaGo            achieved

  ← We are here
```

**Style notes:**
- Horizontal spectrum/timeline layout
- Gradient from solid (known) to dashed (uncertain/hypothetical)
- Three major milestone nodes
- Current position marker ("We are here")
- Below each node: capabilities + examples
- Purple gradient intensifying toward ASI
- Max width: 700px, aspect ratio ~3:1

**Color palette:**
- Narrow AI: `#a78bfa` (light purple)
- AGI: `#8b5cf6` (medium purple)
- ASI: `#6d28d9` (deep purple) with glow effect

**Dark mode:** Transparent background, light text, glow effect more visible.

---

### 22. green-ai — "Roheline AI"

- **Level:** Leaves | **Complexity:** 2 | **Icon:** leaf
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/GreenAiSVG.tsx`

**What it shows:**
Energy/compute comparison between small and large models. Horizontal bar chart showing training cost, carbon footprint, and inference cost.

**Layout:**
```
┌────────────────────────────────────────────────┐
│  AI ENERGY FOOTPRINT                           │
│                                                │
│  Training Cost:                                │
│  GPT-3    ████████████████████████  $4.6M     │
│  BLOOM    █████████████            $2.4M      │
│  LLaMA 2  ████████                 $1.5M      │
│  Mistral  ███                      $0.5M      │
│                                                │
│  CO₂ Emissions (Training):                     │
│  GPT-3    ████████████████  502 tons           │
│  LLaMA 2  ████████          270 tons           │
│  Mistral  ████              120 tons           │
│                                                │
│  Inference (per query):                        │
│  Large    ████████  $0.03                      │
│  Medium   ████      $0.005                     │
│  Small    ██        $0.0002                    │
│                                                │
│  🌱 Same quality, fraction of the cost         │
└────────────────────────────────────────────────┘
```

**Key elements:**
- Three horizontal bar chart sections
- Comparative bars with labels and values
- Green/leaf accent color
- Bottom takeaway message

**Color palette:** Green/emerald gradient from large (dark, more energy) to small (bright green, efficient).

**Dark mode:** Dark background, bright green bars.

---

### 23. reasoning-models — "Mõtleja"

- **Level:** Leaves | **Complexity:** 2 | **Icon:** chess-knight
- **Visual type:** Inline SVG :hammer:
- **Status:** Ready to build
- **Target component:** `components/visuals/ReasoningModelsSVG.tsx`

**What it shows:**
Chain-of-thought process: question → step-by-step reasoning → self-check → answer. Contrasted with instant (regular LLM) response.

**Layout:**
```
┌────────────────────────────────────────────────┐
│                                                │
│  REGULAR LLM              REASONING MODEL      │
│  ───────────              ───────────────      │
│                                                │
│  Q: "What is               Q: "What is         │
│   25 × 17?"                 25 × 17?"          │
│      ↓                         ↓               │
│  "425" ← instant           Step 1: 25 × 10    │
│  (sometimes wrong)            = 250            │
│                            Step 2: 25 × 7     │
│                               = 175            │
│                            Step 3: 250 + 175   │
│                               = 425            │
│                            Check: 425 ÷ 25     │
│                               = 17 ✓           │
│                               ↓                │
│                            "425" ← verified    │
│                                                │
│  ⚡ Fast, cheap             🧠 Slower, better  │
│  Best for: simple tasks    Best for: math,     │
│                            code, logic         │
└────────────────────────────────────────────────┘
```

**Key elements:**
- Two columns: instant vs step-by-step
- Step chain on the right with numbered steps
- Self-check step (verification)
- Bottom comparison: speed vs accuracy trade-off

**Color palette:** Purple. Regular LLM = light purple, Reasoning = deep purple with step highlights.

**Dark mode:** Dark cards, bright step indicators.

---

## Implementation Roadmap

### Phase 1: Inline SVGs (17 concepts)
Build as React components in `components/visuals/`. Each exports a responsive SVG that adapts to dark mode via Tailwind classes. Wire into `ConceptVisualTab` via the `visual` field in `tree-concepts.json`.

### Phase 2: Dynamic Demos (3 new)
Build `AttentionDemo`, `ContextWindowDemo`, and `TemperatureDemo` as interactive React components similar to existing `TokenizerDemo`/`VectorDemo`. Register in the `demoComponents` map in `ConceptVisualTab`.

### Phase 3: Designer SVGs (3 concepts)
Create visual briefs from this document for: `transformers`, `lora`, `agi-asi`. Output as optimized SVGs in `public/img/concepts/`. Reference via `visual.src` in JSON.

### Data Integration
For each concept, add a `visual` field to `tree-concepts.json`:

```json
// Inline SVG component
"visual": {
  "type": "svg",
  "component": "PrefillDecodeSVG",
  "alt": "Prefill vs Decode phases diagram",
  "caption": "Two phases of LLM text processing"
}

// Dynamic demo
"visual": {
  "type": "demo",
  "component": "AttentionDemo",
  "alt": "Interactive attention mechanism demo",
  "caption": "Click words to see attention weights"
}

// Designer SVG file
"visual": {
  "type": "image",
  "src": "/img/concepts/transformers.svg",
  "alt": "Transformer architecture diagram",
  "caption": "The architecture behind all modern LLMs"
}
```
