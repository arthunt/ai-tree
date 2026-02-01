# Dendrix.ai Translation & Content Principles

**Status:** Authoritative Reference  
**Version:** 1.0  
**Date:** 2026-02-01  
**Scope:** All translatable content across the Dendrix.ai platform  
**Languages:** Estonian (ET, primary), English (EN), Russian (RU)

> This document defines **how** we write and translate content. It is independent of the technical implementation. Whether content lives in JSON files, a database, or a CMS — these principles apply.

---

## Table of Contents

1. [Philosophy: Why Translation Is Not Substitution](#1-philosophy)
2. [The Two Content Layers](#2-two-content-layers)
3. [Six Core Principles](#3-six-core-principles)
4. [Content Field Definitions & Writing Rules](#4-content-fields)
5. [Language-Specific Style Guides](#5-language-guides)
6. [Stage Naming & The Biological Metaphor](#6-stage-naming)
7. [Translation of Pedagogical Concepts](#7-pedagogical-translation)
8. [Content Variant Philosophy](#8-content-variants)
9. [Quality Checklist](#9-quality-checklist)
10. [Complete Worked Examples](#10-worked-examples)

---

## 1. Philosophy: Why Translation Is Not Substitution {#1-philosophy}

Dendrix.ai teaches AI concepts to adults who are often anxious about technology. Every sentence either builds trust or breaks it. Translation is not word replacement — it is **re-creation of the same emotional and pedagogical effect** in a different linguistic context.

### The Golden Rule

> If a native speaker reads the translation and thinks "this was clearly written by someone who speaks my language," we succeeded. If they think "this was translated," we failed.

### Three Audiences, Three Realities

| Language | Primary Audience | Cultural Context |
|:---------|:----------------|:-----------------|
| **Estonian (ET)** | Career changers, trainers, team leads in Estonia | Direct communication valued. English loanwords common in tech. Skeptical of hype. |
| **English (EN)** | International learners, reference language | Expects polished, professional content. Familiar with AI terminology. |
| **Russian (RU)** | Russian-speaking residents of Estonia and the region | Values thorough explanation. Technical vocabulary often borrowed from English. Formal register preferred for educational content. |

### What This Means in Practice

A concept title in English might be playful ("The Recipe Book"). In Estonian, the same playfulness might feel forced — Estonians prefer a **direct metaphor** ("Retseptiraamat") without excessive framing. In Russian, a slightly more **elaborate setup** often works better ("Книга рецептов — откуда ИИ знает, что делать").

---

## 2. The Two Content Layers {#2-two-content-layers}

All translatable content in Dendrix.ai falls into one of two layers:

### Layer 1: UI Chrome (Static)

These are the buttons, labels, navigation items, error messages, and structural text that form the **skeleton** of the interface. They change rarely, are the same for every user, and are managed in static translation files.

**Examples:**
- Navigation labels ("Learning Path", "Concept Map")
- Button text ("Start Learning", "Show More")
- Stage names in the selector ("DNA", "Seed", "Sprout")
- Accessibility labels, tooltips, aria descriptions
- Error messages, empty states
- Brand text, footer content

**Characteristics:**
- Short (1–5 words typically)
- Functional, not narrative
- Must be pixel-perfect in all languages (button widths, menu heights)
- One translation per key — no variants

### Layer 2: Learning Content (Dynamic)

These are the concept explanations, metaphors, hooks, deep-dives, and motivational text that form the **soul** of the learning experience. They may have multiple variants per key, and the "best" version is discovered through measurement.

**Examples:**
- Concept titles ("How AI Reads Text")
- Explanations ("Text is broken into tokens — small chunks the model can process")
- Metaphors ("Like chopping vegetables for a stew")
- Hook questions ("How does the machine start reading?")
- Stage introductions, motivational CTAs
- Program descriptions, career path text

**Characteristics:**
- Longer (sentence to paragraph)
- Narrative, emotional, pedagogical
- May have multiple variants (A/B testing)
- Must be culturally adapted, not just translated

### The Boundary Rule

> **If the text would stay the same regardless of which concept is being shown, it belongs in Layer 1. If the text changes based on the learning content, it belongs in Layer 2.**

Examples of boundary decisions:

| Text | Layer | Reason |
|:-----|:------|:-------|
| "Read more..." | Layer 1 | Same button on every concept card |
| "Introduced in 2017" | Layer 1 | Template string with variable |
| "Tokens are the LEGO blocks of language" | Layer 2 | Content-specific metaphor |
| "Master This Skill" | Layer 1 | Same CTA on every concept |
| "You already use AI. Now understand how it works." | Layer 2 | Landing page hook — may vary |
| "~25 min" | Layer 1 | Duration label, same pattern everywhere |

---

## 3. Six Core Principles {#3-six-core-principles}

### Principle 1: Invitation, Not Description

Every piece of learning content should **invite** the learner forward, not merely describe what they'll find. The difference is between a museum label and a guide who takes your hand.

❌ **Descriptive (bad):**
> "Tokenization is the process of breaking text into smaller units called tokens."

✅ **Inviting (good):**

| Language | Inviting Version |
|:---------|:----------------|
| EN | "Watch your sentence shatter into 47 pieces — and discover why the machine needs it that way." |
| ET | "Vaata, kuidas su lause puruneb 47 tükiks — ja miks masin seda just nii vajab." |
| RU | "Смотрите, как ваше предложение разлетается на 47 частей — и почему машине нужно именно так." |

**The test:** Does the reader feel a tug of curiosity? Would they click "next"?

### Principle 2: One-Breath Explanations

The primary `explanation` field for any concept must be readable in a single breath — approximately **12–18 words** in English, proportionally adjusted for Estonian and Russian. If it takes longer, the content belongs in `deep_dive`.

| Field | Target Length | Purpose |
|:------|:-------------|:--------|
| `title` | 2–6 words | Recognition and recall |
| `explanation` | 12–18 words (EN) | Instant understanding |
| `metaphor` | 10–20 words (EN) | Emotional anchor |
| `question` | 5–10 words (EN) | Curiosity hook |
| `deep_dive` | 50–200 words (EN) | Full understanding |

**Why this matters:** Adult learners in a self-directed platform scan before they commit. If the explanation is a wall of text, they leave. The one-breath version earns the right to offer the deep-dive.

**Examples:**

| Concept | ❌ Too Long | ✅ One Breath |
|:--------|:-----------|:-------------|
| Tokenization (EN) | "The raw input text is broken down into small chunks called tokens. These are the basic units of meaning the AI can process — like individual puzzle pieces that together form the full picture." | "Text shatters into tiny numbered pieces — the only language machines understand." |
| Tokenization (ET) | "Sisendtekst jagatakse väikesteks osadeks, mida nimetatakse tokeniteks. Need on tehisintellekti jaoks tähenduse põhiühikud — nagu pusletükid, mis koos moodustavad tervikliku pildi." | "Tekst puruneb väikesteks numbriteks — ainus keel, mida masinad mõistavad." |
| Tokenization (RU) | "Входной текст разбивается на маленькие фрагменты — токены. Это базовые единицы смысла для ИИ — как кусочки пазла, которые вместе складываются в полную картину." | "Текст рассыпается на крошечные числа — единственный язык, понятный машине." |

### Principle 3: Metaphors Must Land in Every Language

> ⚠️ **Scope boundary:** This principle governs **concept-level** metaphors — the analogies used to explain AI mechanisms to learners. These are independent of the platform's biological growth metaphor (DNA → Tree → Orchard), which applies only to stage structure, visual themes, and progression language. A concept metaphor should be whatever everyday image best conveys the AI concept, regardless of thematic alignment with the platform structure. See also: Vision & Strategy V3.0, "Metaphor Scope Boundary."

A metaphor that works in English may not work in Estonian or Russian. Each language gets its **own** metaphor if the English one doesn't translate naturally. The metaphor must:

1. Be drawn from **everyday experience** (cooking, driving, building — not academic analogies)
2. Be **culturally familiar** to the target audience
3. Create a **vivid sensory image** (visual, tactile, or spatial)
4. Be **accurate enough** that it doesn't mislead about the underlying concept

**Metaphor Adaptation Examples:**

| Concept | EN Metaphor | ET Metaphor | RU Metaphor |
|:--------|:-----------|:-----------|:-----------|
| Tokenization | "Chopping vegetables for a stew" | "Puude saagmine halgudeks — tervik muutub tükkideks, mida ahi vastu võtab" (Chopping wood into logs — the whole becomes pieces the furnace accepts) | "Нарезка овощей для рагу" (Direct translation works — cooking is universal) |
| Embeddings | "GPS coordinates for ideas" | "GPS-koordinaadid mõtetele" (Direct translation works) | "GPS-координаты для идей" (Direct translation works) |
| Attention | "A spotlight in a dark room" | "Prožektor pimedas ruumis" (Direct — spotlight metaphor is universal) | "Прожектор в тёмной комнате" (Direct translation works) |
| Training | "A student studying for an exam — but reading the entire internet" | "Õpilane, kes valmistub eksamiks — aga loeb läbi terve interneti" | "Студент, который готовится к экзамену — но прочитывает весь интернет" |

**When to adapt vs. translate directly:**
- If the metaphor object (stew, spotlight, GPS) exists in the target culture → translate directly
- If the metaphor object is culturally unfamiliar → find a local equivalent
- If the metaphor carries different connotations → replace entirely

### Principle 4: Progressive Disclosure Across Languages

Not all content needs to be translated simultaneously or to the same depth. Translation follows the user journey — **start where users start.**

**Translation Priority Order:**

| Priority | Content | Rationale |
|:---------|:--------|:----------|
| P0 | Landing page, hook, navigation | First contact — determines if user stays |
| P1 | DNA stage (4 concepts) | Core learning experience |
| P1 | Seed stage motivators | Intent selection moment |
| P2 | Sprout stage (6 concepts) | Second learning wave |
| P2 | Nursery stage (4 modules) | Practice is language-sensitive |
| P3 | Tree, Fruits, Orchard | Deep content — users are already committed |
| P4 | Marketing, program details | Conversion content |

### Principle 5: Terminology Consistency

Technical AI terms must be used consistently across the entire platform, within each language. Create and maintain a **term glossary** per language.

**Core Term Glossary:**

| English | Estonian | Russian | Notes |
|:--------|:---------|:--------|:------|
| Token | Token | Токен | Keep English loanword in ET and RU |
| Embedding / Vector | Vektor / Vektormanustus | Вектор / Эмбеддинг | ET prefers "vektor"; RU uses both |
| Attention | Tähelepanumehanism | Механизм внимания | Full term in context; "attention" as loanword in casual reference |
| Prediction | Ennustamine | Предсказание | |
| Hallucination | Hallutsinatsioon | Галлюцинация | Same Latin root works in all three |
| Fine-tuning | Peenhäälestamine | Тонкая настройка / Файнтюнинг | ET has a good native word; RU uses both |
| Prompt | Prompt / Käsklus | Промпт / Запрос | ET: "prompt" in tech context, "käsklus" for beginners; RU: "промпт" dominant |
| Context window | Kontekstiaken | Контекстное окно | |
| Training | Treenimine | Обучение / Тренировка | RU: "обучение" (formal), "тренировка" (informal) |
| Model | Mudel | Модель | |
| Loss function | Kaofunktsioon | Функция потерь | |
| Epoch | Epohh | Эпоха | |
| Backpropagation | Tagasilevitamine | Обратное распространение | ET uses calque; RU uses calque |
| Agent | Agent | Агент | Universal |
| RAG | RAG | RAG | Keep as abbreviation in all languages |

**Rules:**
1. Once a term is chosen for a language, use it **everywhere** — concept cards, deep-dives, navigation, tooltips
2. On first use in any content block, provide the English original in parentheses if the native term is a calque: "Tagasilevitamine (backpropagation)"
3. Never mix terminologies within the same content block
4. If the English loanword is dominant in tech culture (like "prompt", "token"), prefer it over a forced native translation

### Principle 6: Respect the Reader's Intelligence

Adult learners are not children. They bring decades of life experience. Our content should:

- **Never talk down:** Avoid "Simply put..." or "In other words..." — just say it well the first time
- **Never over-explain:** If the metaphor is clear, don't add "What we mean by this is..."
- **Acknowledge complexity:** "This is genuinely difficult — here's why it matters" is better than pretending everything is easy
- **Use the learner's existing knowledge:** "You've already used autocomplete on your phone — prediction works the same way, but with far more context"

**Tone Spectrum:**

| ❌ Too Casual | ✅ Right Tone | ❌ Too Academic |
|:-------------|:-------------|:---------------|
| "So basically, tokens are like, word pieces lol" | "Tokens are word fragments — the smallest meaningful units the model can work with." | "Tokenization is the process of lexical decomposition whereby natural language strings are segmented into subword units." |
| "Täitsa lihtne — tokenid on nagu sõnatükid" | "Tokenid on sõnafragmendid — väiksemad tähenduslikud üksused, millega mudel töötab." | "Tokeniseerimine on leksikaalse dekompositsiooini protsess, mille käigus loomuliku keele stringid segmenteeritakse alamsõnaühikuteks." |

---

## 4. Content Field Definitions & Writing Rules {#4-content-fields}

Every concept in Dendrix.ai has the following translatable fields. Each has a specific purpose and constraints.

### 4.1 `title` — The Name Tag

**Purpose:** Instant recognition. What the learner sees in cards, navigation, and search results.

**Rules:**
- 2–6 words maximum
- Must be understandable without context
- Prefer active, vivid language over technical labels
- May differ between languages if the direct translation is unclear

**Examples:**

| Concept ID | EN `title` | ET `title` | RU `title` |
|:-----------|:----------|:----------|:----------|
| `tokenization` | How AI Reads Text | Kuidas AI teksti loeb | Как ИИ читает текст |
| `embeddings` | Words as Coordinates | Sõnad koordinaatidena | Слова как координаты |
| `attention` | The Focus Mechanism | Fookuse mehanism | Механизм фокуса |
| `prediction` | One Word at a Time | Üks sõna korraga | По одному слову |
| `hallucination` | When AI Makes Things Up | Kui AI välja mõtleb | Когда ИИ выдумывает |
| `context-window` | How Much AI Remembers | Kui palju AI mäletab | Сколько ИИ помнит |

**Note:** These are **concept titles for the learning experience**, not technical definitions. The technical name appears in the concept card's metadata, not the title.

### 4.2 `explanation` — The One-Breath Version

**Purpose:** Immediate understanding. The learner reads this and grasps the core idea.

**Rules:**
- 12–18 words in English; proportionally adjusted per language
- One sentence, maximum two
- Must be self-contained — no "as we saw earlier" references
- Active voice preferred
- Concrete, not abstract

**Template:** `[What it is/does] — [why it matters / what it means for you]`

**Examples:**

| Concept | EN | ET | RU |
|:--------|:---|:---|:---|
| `tokenization` | Text shatters into tiny numbered pieces — the only language machines understand. | Tekst puruneb väikesteks numbriteks — ainus keel, mida masinad mõistavad. | Текст рассыпается на крошечные числа — единственный язык, понятный машине. |
| `attention` | Each word checks every other word to understand context — like a room where everyone listens to everyone. | Iga sõna kontrollib kõiki teisi sõnu, et konteksti mõista — nagu ruum, kus kõik kuulavad kõiki. | Каждое слово проверяет все остальные, чтобы понять контекст — как комната, где все слушают всех. |

### 4.3 `metaphor` — The Emotional Anchor

**Purpose:** Create a vivid sensory image that makes the concept memorable and relatable.

**Rules:**
- Must reference everyday experience (cooking, driving, nature, building)
- Must be accurate enough to not mislead
- Standalone — don't write "It's like..." (the UI frame adds that context)
- Prefer metaphors with **sensory detail** (sight, touch, sound)
- Each language may have a DIFFERENT metaphor if the original doesn't translate

**Template:** `[Familiar object/action] — [specific parallel to the concept]`

**Examples:**

| Concept | EN | ET | RU |
|:--------|:---|:---|:---|
| `tokenization` | Chopping ingredients before cooking — whole sentences become bite-sized pieces the recipe can work with. | Puude lõhkumine — terved palud muutuvad halgudeks, mis ahju mahuvad. | Нарезка продуктов перед готовкой — целые предложения становятся кусочками, с которыми рецепт может работать. |
| `training` | A student studying for exams by reading the entire library — not memorizing pages, but absorbing patterns. | Üliõpilane, kes valmistub eksamiks terve raamatukogu läbi lugedes — mitte pähe õppides, vaid mustreid omandades. | Студент, готовящийся к экзаменам, прочитав всю библиотеку — не заучивая страницы, а впитывая закономерности. |
| `hallucination` | A confident tour guide in a city they've never visited — every answer sounds right, but some streets don't exist. | Enesekindel giid linnas, kus ta pole kunagi käinud — iga vastus kõlab õigesti, aga mõnda tänavat pole olemas. | Уверенный гид в городе, где он никогда не был — каждый ответ звучит правильно, но некоторых улиц не существует. |

### 4.4 `question` — The Curiosity Hook

**Purpose:** Frame the concept as an answer to a question the learner already has (or should have). Drives the "need to know" motivation.

**Rules:**
- Must be a genuine question (ends with ?)
- Written from the **learner's perspective**, not the teacher's
- Should create slight tension or surprise
- 5–10 words

**Examples:**

| Concept | EN | ET | RU |
|:--------|:---|:---|:---|
| `tokenization` | How does the machine start reading? | Kuidas masin lugema hakkab? | Как машина начинает читать? |
| `embeddings` | How does AI know "king" and "queen" are related? | Kuidas AI teab, et "kuningas" ja "kuninganna" on seotud? | Как ИИ знает, что «король» и «королева» связаны? |
| `attention` | How does the model know which words matter most? | Kuidas mudel teab, millised sõnad on kõige olulisemad? | Как модель знает, какие слова важнее? |
| `hallucination` | Why does AI sometimes lie with total confidence? | Miks AI mõnikord täie enesekindlusega valetab? | Почему ИИ иногда уверенно врёт? |
| `context-window` | Why does AI forget what you said 5 minutes ago? | Miks AI unustab, mida sa 5 minutit tagasi ütlesid? | Почему ИИ забывает, что вы сказали 5 минут назад? |

### 4.5 `deep_dive` — The Full Story

**Purpose:** Complete explanation for learners who want to go deeper. Shown in expanded panels or detail views.

**Rules:**
- 50–200 words per language
- Structured as prose, not bullet points
- May reference other concepts by name (cross-linking)
- Should include at least one **concrete example** with real data
- Written in a teaching tone — explaining, not lecturing

### 4.6 `completion_message` — The Reward

**Purpose:** Shown when the learner completes a concept step. Provides closure and momentum.

**Rules:**
- One sentence maximum
- Affirming but not patronizing
- Should hint at what comes next
- Never "Good job!" — instead, state what was accomplished

**Examples:**

| Concept | EN | ET | RU |
|:--------|:---|:---|:---|
| `tokenization` | Text tokenized — every piece now has a unique number. On to meaning. | Tekst tokeniseeritud — igal tükil on nüüd unikaalne number. Edasi tähenduse juurde. | Текст токенизирован — у каждого фрагмента теперь уникальный номер. Дальше — к смыслу. |
| `prediction` | The model made its prediction. This is how every AI response begins. | Mudel tegi oma ennustuse. Nii algab iga AI vastus. | Модель сделала предсказание. Так начинается каждый ответ ИИ. |

### 4.7 `hint` — Contextual Help

**Purpose:** Shown during interactive elements when the learner seems stuck or hasn't interacted.

**Rules:**
- Action-oriented: "Try...", "Click...", "Type..."
- Maximum 15 words
- Specific to the interaction, not the concept

---

## 5. Language-Specific Style Guides {#5-language-guides}

### 5.1 Estonian (ET) — Primary Language

**Register:** Semi-formal. Use "sina" (informal you), not "teie" (formal you). This is an educational platform for adults, not a government form.

**Sentence structure:** Estonian allows flexible word order. Use it for emphasis. Place the most important word first.
- "Tokenid on sõnafragmendid" (neutral) vs. "Sõnafragmendid — seda ongi tokenid" (emphatic)

**English loanwords:** Common in Estonian tech culture. Use them when the Estonian alternative is forced or unclear:
- ✅ "token" (not "sümbolühik")
- ✅ "prompt" (not "käsusisend"), though "käsklus" is acceptable for complete beginners
- ✅ "mudel" (native word, preferred over "model")
- ✅ "treenimine" (native word, preferred over "training")

**Compound words:** Estonian excels at compound words. Use them — they're more natural than multi-word phrases:
- "peenhäälestamine" (fine-tuning) — one word, elegant
- "tagasilevitamine" (backpropagation) — one word, clear
- "kontekstiaken" (context window) — one word, intuitive

**Common traps:**
- Don't translate "AI" as "TI" (tehisintellekt) in casual context — "AI" is universally understood in Estonia
- Don't over-translate technical terms that have no natural Estonian equivalent
- Estonian has 14 grammatical cases — ensure translations use the correct case for the UI context (nominative for labels, partitive for "show X", etc.)

### 5.2 English (EN) — Reference Language

**Register:** Professional-casual. Think "knowledgeable colleague explaining at a whiteboard," not "textbook" and not "tweet."

**Sentence length:** Keep sentences under 20 words for explanations. Deep-dives may use longer sentences but should still prioritize clarity.

**Active voice:** Strongly preferred.
- ✅ "The model predicts the next word"
- ❌ "The next word is predicted by the model"

**Contractions:** Use them naturally — "it's", "don't", "you'll" — except in formal contexts (program descriptions, certificates).

**Punctuation:** Use em-dashes (—) for parenthetical clarity. Avoid semicolons in learner-facing content.

### 5.3 Russian (RU) — Third Language

**Register:** Semi-formal. Use "вы" (formal you) — this is appropriate for educational content for adults in the Baltic region, where Russian-language education tends toward formality.

**Technical vocabulary:** Russian tech culture freely mixes English loanwords and native terms. Prefer whichever is more commonly used:
- "Токен" (loanword, universal) over "лексема" (academic)
- "Промпт" (loanword, dominant in practice) alongside "запрос" (native, more general)
- "Модель" (shares a root — use the Russian word)
- "Обучение" (training — native word, preferred in formal context)

**Sentence structure:** Russian tolerates longer sentences than English but still benefits from concision in educational content. The verb often comes later in the sentence — don't force English word order.

**Grammatical gender:** Ensure technical terms maintain consistent grammatical gender:
- "Модель" is feminine — adjectives and verbs must agree
- "Токен" is masculine
- "Обучение" is neuter

**Common traps:**
- Don't use machine-translation Russian — it often produces grammatically correct but stylistically wooden text
- Russian uses "ИИ" (ИИ = AI) — always use the Cyrillic abbreviation, never the Latin
- Be mindful that some Russian-speaking users in Estonia may be more comfortable with Estonian tech terminology than Russian equivalents

---

## 6. Stage Naming & The Biological Metaphor {#6-stage-naming}

The Dendrix.ai learning journey uses a biological growth metaphor. Each stage has names that must be consistent across all content.

### 6.1 Stage Name Registry

| Stage ID | EN Name | ET Name | RU Name | Metaphor |
|:---------|:--------|:--------|:--------|:---------|
| `dna` | DNA | DNA | ДНК | Molecular machinery underground |
| `seed` | Seed | Seeme | Семя | Compressed potential |
| `sprout` | Sprout | Idu | Росток | Breaking through the surface |
| `sapling` | The Nursery | Puukool | Питомник | Guided cultivation |
| `tree` | Tree | Puu | Дерево | Full knowledge in sunlight |
| `fruits` | Fruits | Viljad | Плоды | Practical harvest |
| `orchard` | Orchard | Viljapuuaed | Сад | Professional ecosystem |

### 6.2 The Nursery Stage (Sapling/Istik/Puukool)

This stage underwent a naming refinement. The internal ID remains `sapling` (for code compatibility), but the **user-facing name** is now:

| Context | EN | ET | RU |
|:--------|:---|:---|:---|
| Stage subtitle | Guided Practice → The Nursery | Juhendatud Praktika → Puukool | Управляемая Практика → Питомник |
| Phase label | The Nursery | Puukool | Питомник |
| Navigation label | The Nursery | Puukool | Питомник |

**The metaphor:** A *puukool* (tree nursery / питомник) is where young seedlings (*istikud* / saplings / *саженцы*) are cultivated under controlled conditions before being planted in the open field. This perfectly mirrors the learning stage: guided practice in a safe sandbox before encountering the full knowledge tree.

**Usage rules:**
- In code and data: always `sapling` (the stage ID)
- In UI labels and content: always "The Nursery" / "Puukool" / "Питомник"
- When referring to the learner's state: "In the nursery, you'll practice..." / "Puukoolis harjutad sa..." / "В питомнике вы будете практиковаться..."

### 6.3 Stage Sublabel Translations

Each stage in the UI shows a sublabel describing the learner's activity. These are Layer 1 (UI chrome) translations:

| Stage | EN Sublabel | ET Sublabel | RU Sublabel |
|:------|:-----------|:-----------|:-----------|
| `dna` | Mechanism | Mehhanism | Механизм |
| `seed` | Data & Training | Andmed ja treenimine | Данные и обучение |
| `sprout` | Emergence | Esilekerkimine | Возникновение |
| `sapling` | The Nursery | Puukool | Питомник |
| `tree` | Knowledge | Teadmised | Знания |
| `fruits` | Applications | Rakendused | Применения |
| `orchard` | Careers | Karjääriteed | Карьерные пути |

### 6.4 Stage Introduction Phrases

Each stage has a short motivational introduction (Layer 2 — may have variants):

| Stage | EN | ET | RU |
|:------|:---|:---|:---|
| `dna` | See what's inside AI. | Vaata, mis on AI sees. | Загляните внутрь ИИ. |
| `seed` | Where knowledge comes from. | Kust teadmised tulevad. | Откуда берутся знания. |
| `sprout` | What emerges from training. | Mis treenimisest tekib. | Что возникает из обучения. |
| `sapling` | Try it yourself — safely. | Proovi ise — turvaliselt. | Попробуйте сами — безопасно. |
| `tree` | Go deep when you're ready. | Mine süvitsi, kui oled valmis. | Углубляйтесь, когда будете готовы. |
| `fruits` | Build something real. | Ehita midagi päris. | Постройте что-то настоящее. |
| `orchard` | Make it your career. | Tee sellest oma amet. | Сделайте это своей профессией. |

---

## 7. Translation of Pedagogical Concepts {#7-pedagogical-translation}

Dendrix.ai uses specific pedagogical terms that must be translated consistently.

### 7.1 Learning Journey Terminology

| English | Estonian | Russian | Usage Context |
|:--------|:---------|:--------|:-------------|
| Learning path | Õpperada | Учебный путь | Navigation, course structure |
| Concept | Kontseptsioon / Mõiste | Концепция / Понятие | Card titles, explanations |
| Concept map | Kontseptsioonikaart | Карта понятий | Tree view navigation |
| Stage | Etapp / Tase | Этап / Уровень | Journey progression |
| Progress | Edenemise | Прогресс | Progress tracking |
| Deep-dive | Süvitsi | Подробнее | Expand buttons |
| Practice | Harjutamine | Практика | Nursery activities |
| Completion | Lõpetamine | Завершение | Progress indicators |

### 7.2 Program Terminology

| English | Estonian | Russian | Usage Context |
|:--------|:---------|:--------|:-------------|
| AI Instructor | AI koolitaja | ИИ инструктор | AIKI program |
| AI Automator | AI automatiseerija | ИИ автоматизатор | AIVO program |
| Career path | Karjääritee | Карьерный путь | Orchard stage |
| Certificate | Tunnistus | Сертификат | Completion documents |
| Cohort | Grupp | Группа / Когорта | Program scheduling |

---

## 8. Content Variant Philosophy {#8-content-variants}

Some content benefits from **multiple versions** that can be tested to find the most effective one. This is the foundation of the variant system.

### 8.1 What Gets Variants

Not everything needs variants. Variants are for content where the **framing** (not the information) affects engagement.

| Content Type | Needs Variants? | Why |
|:-------------|:---------------|:----|
| Concept `title` | ✅ Yes | Different framings attract different learners |
| Concept `explanation` | ⚠️ Maybe | Only if there's a clear alternative framing |
| Concept `metaphor` | ✅ Yes | Metaphor effectiveness varies by audience |
| Concept `question` | ✅ Yes | Different hooks trigger different curiosity |
| UI labels | ❌ No | Consistency > optimization |
| Navigation text | ❌ No | Users need predictability |
| Error messages | ❌ No | Must be reliable |
| Landing page hook | ✅ Yes | High-impact, high-variance |
| Stage introductions | ✅ Yes | Framing affects dropout |
| CTA text | ✅ Yes | Directly measurable |

### 8.2 Variant Naming Convention

Every variant has a `variant_name` that describes its **communication strategy**, not its content:

| Variant Name | Strategy | Example (Tokenization title, ET) |
|:-------------|:---------|:--------------------------------|
| `base` | Neutral, descriptive, safe | "Kuidas AI teksti loeb" |
| `practical` | Connects to daily work/life | "Miks eesti keel on AI-le kallis" |
| `provocative` | Challenges assumptions, creates tension | "Sinu lause koosneb 47 tükist" |
| `personal` | Addresses the learner directly | "Vaata, mida AI sinuga teeb" |
| `emotional` | Connects to feelings/motivations | "Esimene samm AI mõistmisel" |

### 8.3 Variant Writing Rules

1. **All variants of the same key must convey the same core information.** They differ in framing, not facts.
2. **The `base` variant must always exist** and must be the safest, most universally understandable version.
3. **Variants should be meaningfully different** — not synonyms. If you can't articulate why two variants would perform differently, you don't need two variants.
4. **Each language gets its own variants.** Don't translate variant texts — write fresh variants in each language.
5. **Maximum 4 variants per key per language.** More than that creates statistical noise.

### 8.4 Variant Example: Landing Page Hook

The landing page hook is the **highest-impact** variant candidate — it determines whether a visitor continues or leaves.

**Content key:** `landing:hook`

| Variant | EN | ET | RU |
|:--------|:---|:---|:---|
| `base` | You already use AI. Now understand how it works. | Sa juba kasutad AI-d. Nüüd mõista, kuidas see töötab. | Вы уже используете ИИ. Теперь поймите, как он работает. |
| `practical` | AI writes your emails. Shouldn't you know how? | AI kirjutab su e-kirju. Kas sa ei peaks teadma, kuidas? | ИИ пишет ваши письма. Не стоит ли разобраться, как? |
| `provocative` | AI made 47 decisions while you read this sentence. | AI tegi 47 otsust, kuni sa seda lauset lugesid. | ИИ принял 47 решений, пока вы читали это предложение. |
| `personal` | Your next career move might depend on understanding this. | Sinu järgmine karjäärisamm võib sellest sõltuda. | Ваш следующий карьерный шаг может зависеть от понимания этого. |

---

## 9. Quality Checklist {#9-quality-checklist}

Use this checklist before submitting any translation or content update.

### Per-Item Checklist

- [ ] **One-breath test:** Can `explanation` be read aloud in one breath?
- [ ] **Curiosity test:** Does `question` make you want to know the answer?
- [ ] **Metaphor test:** Would a non-technical person visualize something concrete?
- [ ] **Stand-alone test:** Does each field make sense without reading the others?
- [ ] **Tone test:** Does it sound like a knowledgeable colleague, not a textbook?
- [ ] **Length test:** Is `title` ≤ 6 words? Is `explanation` ≤ 18 words (EN)?
- [ ] **Terminology test:** Are technical terms consistent with the glossary?
- [ ] **Cultural test:** Does the metaphor work in the target culture?
- [ ] **UI test:** Does the text fit in the UI element without truncation?

### Per-Language Checklist

- [ ] **Naturalness:** Would a native speaker recognize this as native writing?
- [ ] **Register:** Correct formality level (ET: sina, RU: вы, EN: casual-professional)?
- [ ] **Grammar:** Correct case/gender/number agreement?
- [ ] **No translatese:** No calques or forced translations from English?
- [ ] **Loanwords:** Technical loanwords used appropriately per language guide?

### Per-Stage Checklist

- [ ] **All 3 languages present** for every content key in the stage?
- [ ] **Base variant exists** for every variant-eligible key?
- [ ] **Cross-references valid:** Any mentioned concepts exist in the target stage?
- [ ] **Progressive disclosure:** Can a beginner understand the one-breath version?

---

## 10. Complete Worked Examples {#10-worked-examples}

### Example A: Full Concept Translation — "Attention"

**Concept ID:** `attention`  
**Stage:** DNA  
**Visual Type:** Interactive simulation

| Field | EN | ET | RU |
|:------|:---|:---|:---|
| `title` | The Focus Mechanism | Fookuse mehanism | Механизм фокуса |
| `explanation` | Each word weighs every other word to find which ones matter most for meaning. | Iga sõna kaalub kõiki teisi, et leida, millised tähenduse jaoks kõige rohkem loevad. | Каждое слово взвешивает все остальные, чтобы найти самые важные для смысла. |
| `metaphor` | A spotlight sweeping a dark room — it illuminates the connections between words, revealing which ones need each other most. | Prožektor pimedas ruumis — see valgustab sõnadevahelisi seoseid, näidates, millised üksteist kõige rohkem vajavad. | Прожектор, обшаривающий тёмную комнату — он подсвечивает связи между словами, показывая, какие из них больше всего нуждаются друг в друге. |
| `question` | How does the model know which words matter most? | Kuidas mudel teab, millised sõnad on kõige olulisemad? | Как модель знает, какие слова важнее всего? |
| `completion_message` | Attention mapped. The model now knows which words listen to which. | Tähelepanu kaardistatud. Mudel teab nüüd, millised sõnad milliseid kuulavad. | Внимание размечено. Модель теперь знает, какие слова прислушиваются к каким. |
| `hint` | Click on any word to see its attention connections. | Kliki sõnale, et näha selle tähelepanuseoseid. | Нажмите на любое слово, чтобы увидеть его связи внимания. |

### Example B: Stage Introduction with Variants — "Nursery"

**Content key:** `sapling:intro`

| Variant | EN | ET | RU |
|:--------|:---|:---|:---|
| `base` | Welcome to the Nursery. Here you'll practice with AI in a safe sandbox — no wrong answers, only experiments. | Tere tulemast Puukooli. Siin harjutad AI-ga turvalises liivakastis — valesid vastuseid pole, on ainult katsed. | Добро пожаловать в Питомник. Здесь вы будете практиковаться с ИИ в безопасной песочнице — нет неправильных ответов, только эксперименты. |
| `practical` | Time to get your hands dirty. Write your first prompt and see what happens. | Aeg käed külge panna. Kirjuta oma esimene prompt ja vaata, mis juhtub. | Время запачкать руки. Напишите свой первый промпт и посмотрите, что произойдёт. |
| `personal` | You've seen how AI works. Now prove to yourself that you can direct it. | Sa oled näinud, kuidas AI töötab. Nüüd tõesta endale, et sa oskad seda juhtida. | Вы видели, как работает ИИ. Теперь докажите себе, что вы можете им управлять. |

### Example C: UI Chrome (Layer 1) — No Variants

| Key | EN | ET | RU |
|:----|:---|:---|:---|
| `nav.learning_path` | Learning Path | Õpperada | Учебный путь |
| `nav.concept_map` | Concept Map | Kontseptsioonikaart | Карта понятий |
| `button.start_learning` | Start Learning | Alusta õppimist | Начать обучение |
| `button.show_more` | Show more | Näita rohkem | Показать ещё |
| `button.read_more` | Read more... | Loe lisaks... | Читать далее... |
| `label.time_estimate` | ~{minutes} min | ~{minutes} min | ~{minutes} мин |
| `label.introduced` | Introduced {year} | Kasutusele võetud {year} | Введён в {year} |
| `stages.sub.dna` | Mechanism | Mehhanism | Механизм |
| `stages.sub.seed` | Data & Training | Andmed ja treenimine | Данные и обучение |
| `stages.sub.sprout` | Emergence | Esilekerkimine | Возникновение |
| `stages.sub.sapling` | The Nursery | Puukool | Питомник |
| `stages.sub.tree` | Knowledge | Teadmised | Знания |
| `stages.sub.fruits` | Applications | Rakendused | Применения |
| `stages.sub.orchard` | Careers | Karjääriteed | Карьерные пути |

---

## Appendix A: Decision Log

| Date | Decision | Rationale |
|:-----|:---------|:----------|
| 2026-02-01 | Sapling stage renamed to "Nursery/Puukool/Питомник" in user-facing content | Metaphor consistency: a nursery is where saplings are cultivated |
| 2026-02-01 | Russian register set to "вы" (formal) | Cultural norm for adult education in Baltic region |
| 2026-02-01 | Technical loanwords preferred when dominant in target culture | Avoid forced native translations that no one uses |
| 2026-02-01 | Maximum 4 variants per content key per language | Statistical significance requires focused testing |

---

## Appendix B: Translation Workflow Summary

```
1. Content author writes EN base version
2. Apply one-breath test and quality checklist
3. ET translator creates Estonian version (not translation — re-creation)
4. RU translator creates Russian version (not translation — re-creation)
5. Each translator applies language-specific style guide
6. Quality reviewer checks all three against the checklist
7. If variant-eligible: write 2-3 additional variants per language
8. All variants reviewed for meaningful differentiation
9. Content enters the system (Layer 1 → Paraglide JSON, Layer 2 → Supabase)
```

---

*This document is the authority on translation quality. Technical implementation may change; these principles do not.*
