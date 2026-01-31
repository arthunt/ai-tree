# Translation File Samples

This document provides complete examples of all translation JSON files for both Estonian (et) and English (en) locales.

---

## Estonian (et) Translations

### locales/et/common.json

```json
{
  "viewFullSize": "Vaata täismõõtus",
  "currentlyHere": "Praegu siin",
  "or": "või",
  "clickHere": "Kliki siia",
  "close": "Sulge",
  "back": "Tagasi",
  "next": "Järgmine",
  "previous": "Eelmine",
  "loading": "Laadimine...",
  "learnMore": "Loe lähemalt",
  "viewModes": {
    "metaphor": "Metafoor",
    "technical": "Tehniline",
    "both": "Mõlemad"
  },
  "changeLanguage": "Vaheta keelt",
  "search": "Otsi",
  "filter": "Filtreeri",
  "all": "Kõik",
  "conceptCount": "{count, plural, =0 {Pole kontseptsioone} =1 {Üks kontseptsioon} other {# kontseptsiooni}}"
}
```

### locales/et/navigation.json

```json
{
  "treeView": "Puu Vaade",
  "classicView": "Klassikaline Vaade",
  "classicViewDesc": "Keritav tasandite vaade detailse sisuga",
  "treeViewDesc": "Interaktiivne puu kõigi kontseptsioonidega",
  "startFromRoots": "Alusta juurtest ja liigu ülespoole või keri vabalt",
  "version": "Versioon",
  "home": "Avaleht",
  "about": "Meist",
  "contact": "Kontakt",
  "menu": "Menüü"
}
```

### locales/et/metadata.json

```json
{
  "title": "AI Teadmiste Puu",
  "description": "Terviklik raamistik AI kontseptide õpetamiseks",
  "subtitle": "Terviklik raamistik AI kontseptide õpetamiseks – alates fundamentaalsetest mehaanikate põhimõtetest kuni kõige uuemate uuringuteni.",
  "footerTagline": "AI Teadmiste Puu – Interaktiivne õppevahend AI kontseptide mõistmiseks",
  "keywords": [
    "AI",
    "tehisintellekt",
    "masinõpe",
    "haridus",
    "õppimine",
    "suurkeelemudelid"
  ],
  "author": "AI Tree Team",
  "seo": {
    "ogTitle": "AI Teadmiste Puu - Õpi AI kontsepte",
    "ogDescription": "Interaktiivne platvorm AI põhimõtete ja kontseptsioonide õppimiseks metafooride ja näidete kaudu",
    "twitterCard": "summary_large_image"
  }
}
```

### locales/et/levels.json

```json
{
  "metadata": {
    "title": "AI Teadmiste Puu",
    "description": "Terviklik raamistik AI kontseptide õpetamiseks"
  },
  "levels": {
    "roots": {
      "name": "JUURED",
      "subtitle": "Fundamentaalne Mehaanika",
      "description": "See on AI 'mootor'. Ilma mõistmata, kuidas masin keelt töötleb, tegutsed pimesi."
    },
    "trunk": {
      "name": "TÜVI",
      "subtitle": "Inseneeria ja Arhitektuur",
      "description": "Tüvi on kandev struktuur, mis toetab kõike muud."
    },
    "branches": {
      "name": "OKSAD",
      "subtitle": "Rakendamine ja Agendid",
      "description": "Oksad on teadmiste praktiline rakendamine."
    },
    "leaves": {
      "name": "LEHED JA VILJAD",
      "subtitle": "Uuringud ja Trendid",
      "description": "See on puu kõige kiiremini muutuv osa. Mis on täna tippteadus, on homme standard."
    }
  }
}
```

### locales/et/glossary.json

```json
{
  "terms": {
    "tokens": {
      "term": "Tokens",
      "keep_original": true,
      "short_explanation": "Teksti väikseimad ühikud, mida AI töötleb",
      "example": "Sõna 'banaan' jaguneb 3 tokeniks",
      "related": ["embeddings", "tokenization"]
    },
    "embeddings": {
      "term": "Embeddings",
      "keep_original": true,
      "short_explanation": "Vektorid, mis esindavad sõnade tähendusi numbriliselt",
      "related": ["vectors", "semantic-space"]
    },
    "attention": {
      "term": "Attention Mechanism",
      "keep_original": true,
      "short_explanation": "Mehhanism, mis võimaldab mudelil keskenduda lause olulistele osadele",
      "related": ["transformers", "self-attention"]
    },
    "rag": {
      "term": "RAG",
      "expanded": "Retrieval-Augmented Generation",
      "keep_original": true,
      "short_explanation": "AI tehnika, mis otsib asjakohast infot enne vastuse genereerimist",
      "related": ["vector-database", "semantic-search"]
    },
    "lora": {
      "term": "LoRA",
      "expanded": "Low-Rank Adaptation",
      "keep_original": true,
      "short_explanation": "Mudeli tõhus peenhäälestamise meetod",
      "related": ["fine-tuning", "adaptation"]
    },
    "mcp": {
      "term": "MCP",
      "expanded": "Model Context Protocol",
      "keep_original": true,
      "short_explanation": "Standardiseeritud protokoll mudelite ja tööriistade ühendamiseks",
      "related": ["integration", "tools"]
    },
    "agi": {
      "term": "AGI",
      "expanded": "Artificial General Intelligence",
      "keep_original": true,
      "short_explanation": "Üldine tehisintellekt inimtasemel",
      "related": ["asi", "intelligence"]
    },
    "asi": {
      "term": "ASI",
      "expanded": "Artificial Superintelligence",
      "keep_original": true,
      "short_explanation": "Superintellekt, mis ületab inimvõimeid",
      "related": ["agi", "singularity"]
    },
    "moe": {
      "term": "MoE",
      "expanded": "Mixture of Experts",
      "keep_original": true,
      "short_explanation": "Mitme spetsialiseerunud mudeli kombinatsioon",
      "related": ["architecture", "efficiency"]
    },
    "context": {
      "term": "Kontekst",
      "translated": true,
      "short_explanation": "Ümbritsev informatsioon, mis annab promptile tähenduse",
      "related": ["prompt", "context-window"]
    },
    "agent": {
      "term": "Agent",
      "translated": false,
      "short_explanation": "Autonoomne AI süsteem, mis suudab kasutada tööriistu",
      "related": ["autonomy", "tools", "actions"]
    },
    "prompt": {
      "term": "Prompt",
      "translated": false,
      "short_explanation": "Kasutaja sisend või juhis AI mudelile",
      "related": ["prompt-engineering", "instruction"]
    }
  },
  "complexity_levels": {
    "beginner": "Algaja",
    "intermediate": "Keskmine",
    "advanced": "Keeruline"
  },
  "categories": {
    "fundamentals": "Alused",
    "architecture": "Arhitektuur",
    "applications": "Rakendused",
    "research": "Uuringud"
  }
}
```

### locales/et/concepts/roots.json

```json
{
  "concepts": [
    {
      "id": "tokens",
      "title": "Tokenid",
      "simpleName": "Tekstiklotsid",
      "explanation": "Teksti väikseimad ühikud AI jaoks. See ei ole sõna, vaid täheühend. Need määravad hinna ja kiiruse.",
      "metaphor": "Lego klotsid. Sõna 'Banaan' ei ole üks tükk, vaid koosneb kolmest klotsist. AI ehitab lauseid klots-klotsi haaval.",
      "extended_explanation": "Tokenid on fundamentaalne kontseptsioon keelemudelite töös. Mudel ei töötle teksti sõnade, vaid tokenite kaupa. Üks token võib olla sõna, sõna osa või isegi kirjavahemärk. Tokeniseerimine sõltub mudelist – GPT-4 kasutab teistsugust tokeniseerimist kui BERT.",
      "technical_details": {
        "typical_token_count": "Inglise keeles on keskmiselt 1 token ≈ 4 tähemärki",
        "cost_implications": "API maksud põhinevad tokenite arvul (sisend + väljund)",
        "context_limits": "Mudeli konteksti aken määratakse tokenites (nt 8K, 32K, 128K tokenit)"
      },
      "examples": [
        {
          "text": "Hello, World!",
          "tokens": ["Hello", ",", " World", "!"],
          "count": 4
        },
        {
          "text": "Tere, Maailm!",
          "tokens": ["T", "ere", ",", " Ma", "ail", "m", "!"],
          "count": 7,
          "note": "Eesti keel võtab rohkem tokeneid kui inglise keel"
        }
      ]
    },
    {
      "id": "vectors",
      "title": "Vektorid (Embeddings)",
      "simpleName": "Tähenduste kaart",
      "explanation": "Sõnade ja tähenduste tõlkimine numbrilisteks koordinaatideks ruumis. Lähedased tähendused asuvad ruumis kõrvuti.",
      "metaphor": "GPS koordinaadid. Sõna 'Kuningas' ja 'Kuninganna' asuvad kaardil lähestikku, nagu Tallinn ja Tartu, aga 'Banaan' on teisel mandril.",
      "extended_explanation": "Vektorid ehk embeddings on numbrilised esitused sõnadest, lausetest või dokumentidest. Need võimaldavad arvutil 'mõista' sõnade tähendusi ja seoseid. Vektorruumis asuvad sarnase tähendusega sõnad lähedal, mis võimaldab semantilist otsimist.",
      "technical_details": {
        "dimensions": "Tavaliselt 384, 768, 1536 või 3072 dimensiooni",
        "similarity": "Arvutatakse kosinussiirkordaja abil",
        "models": "text-embedding-ada-002, sentence-transformers, jne"
      },
      "examples": [
        {
          "concept": "Kuningas - Mees + Naine = Kuninganna",
          "explanation": "Vektori aritmeetika võimaldab analoogiaid"
        },
        {
          "use_case": "Semantiline otsing",
          "explanation": "Leia dokumente tähenduse, mitte märksõnade järgi"
        }
      ]
    },
    {
      "id": "attention",
      "title": "Tähelepanu (Attention Mechanism)",
      "simpleName": "Fookus",
      "explanation": "Mehhanism, mis võimaldab mudelil keskenduda lause olulistele osadele, et mõista seoseid (nt kes on 'ta' lauses).",
      "metaphor": "Taskulamp pimedas toas. AI valgustab korraga ainult neid sõnu, mis on hetkel vastuse andmiseks olulised.",
      "extended_explanation": "Attention mehhanism revolutsioneeris keelemudeleid. See võimaldab mudelil dünaamiliselt otsustada, millised sisendi osad on iga väljundi tokeni jaoks olulised. Self-attention (transformerites) võimaldab igal tokenil 'vaadata' teisi tokeneid ja otsustada, millised on kontekstuaalselt olulised.",
      "technical_details": {
        "types": "Self-attention, cross-attention, multi-head attention",
        "mechanism": "Query-Key-Value süsteem",
        "innovation": "Võimaldab paralleelselt töödelda tervet lauset (erinevalt RNN-idest)"
      }
    },
    {
      "id": "prefill-decode",
      "title": "Eeltäide vs Dekodeerimine",
      "simpleName": "Lugemine ja kirjutamine",
      "explanation": "Kuidas mudel teksti töötleb: algul loeb kiiresti sisse (prefill) ja siis kirjutab aeglaselt välja (decode).",
      "metaphor": "Lugemine vs Kirjutamine. Raamatut silmadega haarata on kiire (prefill), aga sama teksti käsitsi ümber kirjutada on aeglane (decode).",
      "extended_explanation": "LLM-ide töö jagunes kaheks faasiks: prefill (prompt processing) ja decode (token generation). Prefill on paralleelne ja kiire - mudel töötleb kogu prompti korraga. Decode on järjestikune ja aeglane - iga uus token genereeritakse üks korraga, sõltuvalt eelmistest.",
      "technical_details": {
        "prefill_speed": "Paralleelne, GPU-d hästi ära kasutatud",
        "decode_speed": "Järjestikune, 'mällu sidutud' (memory-bound)",
        "optimization": "Speculative decoding, batching, caching"
      }
    }
  ]
}
```

### locales/et/concepts/trunk.json

```json
{
  "concepts": [
    {
      "id": "context-engineering",
      "title": "Kontekstitehnika (Context Engineering)",
      "simpleName": "Lavastus",
      "explanation": "See on 'tüvi', mis hoiab kõike püsti. Erinevus lihtsa promptimise ja süsteemse konteksti loomise vahel (keskkond, reeglid, rollid).",
      "metaphor": "Lavastaja töö. Prompt on näitleja lause. Kontekst on lavakujundus, valgus, kostüümid ja stsenaarium, mis annavad lausele mõtte."
    },
    {
      "id": "rag",
      "title": "RAG (Retrieval-Augmented Generation)",
      "simpleName": "Raamatukogu",
      "explanation": "Mudelile antakse ligipääs 'kinnisele raamatukogule' (ettevõtte andmed), et vähendada hallutsineerimist ja tõsta täpsust.",
      "metaphor": "Avatud raamatuga eksam. AI ei pea fakte peast tuupima, ta võib need usaldusväärsest õpikust järele vaadata."
    },
    {
      "id": "memory",
      "title": "Mälu ja Olekuhaldus",
      "simpleName": "Mälu",
      "explanation": "Kuidas mudel mäletab eelmist vestlust või tegevuse hetkeseisu (state). Ilma selleta alustaks ta iga lauset nullist.",
      "metaphor": "Märkmik. Kui sul on halb mälu, kirjutad olulise üles. AI-l on 'lühimälu' (vestluse aken) ja 'pikk mälu' (andmebaas)."
    },
    {
      "id": "lora",
      "title": "LoRA & Peenhäälestus",
      "simpleName": "Täiendkoolitus",
      "explanation": "Meetodid mudeli 'ümberõpetamiseks' kindla stiili või ülesande jaoks, ilma tervet hiigel-mudelit muutmata.",
      "metaphor": "Kursused. Ülikooli lõpetanu (baasmudel) läheb täiendkoolitusele, et saada spetsialistiks kitsal alal."
    },
    {
      "id": "security",
      "title": "AI Turvalisus",
      "simpleName": "Turvalisus",
      "explanation": "Meetmed prompt injection'i ja andmelekete vastu. 'Tulemüür' AI ja maailma vahel.",
      "metaphor": "Turvamees ööklubis. Kontrollib, kes tohib sisse tulla (sisend) ja mida tohib välja viia (väljund)."
    }
  ]
}
```

### locales/et/concepts/branches.json

```json
{
  "concepts": [
    {
      "id": "ai-agents",
      "title": "AI Agendid",
      "simpleName": "Tegija",
      "explanation": "Autonoomsed süsteemid, mis mitte ainult ei räägi, vaid tegutsevad: kasutavad tööriistu, planeerivad ja täidavad ülesandeid iseseisvalt.",
      "metaphor": "Töömees vs Konsultant. Konsultant (LLM) annab nõu. Töömees (Agent) võtab haamri ja parandab katuse ära."
    },
    {
      "id": "mcp",
      "title": "MCP (Model Context Protocol)",
      "simpleName": "Ühendaja",
      "explanation": "Standardiseeritud viis, kuidas ühendada AI mudelid väliste andmete ja tööriistadega. Väldib 'spageti-koodi' integratsioonides.",
      "metaphor": "USB-C kaabel. Üks ja sama pistik sobib, et ühendada AI ükskõik millise seadmega (andmebaasi või programmiga)."
    },
    {
      "id": "complexity-levels",
      "title": "3 Keerukuse taset",
      "simpleName": "Kolm taset",
      "explanation": "1. LLM (jutustaja), 2. Arutlusmudel (mõtleja), 3. Agent (tegija).",
      "metaphor": "Köögimetafoor: 1. Retseptiraamat (LLM), 2. Peakokk, kes koostab menüü (Arutlus), 3. Kokk, kes reaalselt hakib ja küpsetab (Agent)."
    }
  ]
}
```

### locales/et/concepts/leaves.json

```json
{
  "concepts": [
    {
      "id": "moe",
      "title": "Mixture of Experts (MOE)",
      "simpleName": "Konsiilium",
      "explanation": "Ühe suure mudeli asemel töötavad koos mitu spetsialiseerunud 'eksperti'. Iga päringu jaoks aktiveeritakse vaid vajalikud osad, säästes ressursse.",
      "metaphor": "Arstide konsiilium. Selle asemel, et üks perearst teaks kõike, suunatakse sind kardioloogi või neuroloogi juurde vastavalt sümptomile."
    },
    {
      "id": "agi-asi",
      "title": "AGI ja ASI",
      "simpleName": "Superintellekt",
      "explanation": "Teekond inimtaseme intellekti (AGI) ja superintellekti (ASI) suunas. Mudelid, mis suudavad üldistada ja ületada inimvõimeid kõigis valdkondades.",
      "metaphor": "Üliõpilane vs Einstein vs Superintellekt. Tänane AI on nagu tark tudeng. AGI on nagu geenius. ASI on midagi, mis ületab inimlikud võimed kõigis valdkondades."
    },
    {
      "id": "green-ai",
      "title": "Green AI (Jätkusuutlikkus)",
      "simpleName": "Roheline AI",
      "explanation": "Fookus energiatõhususele. Kuidas treenida ja jooksutada mudeleid väiksema süsiniku jalajäljega.",
      "metaphor": "Elektriauto. Sama sihtkoht (tulemus), aga kütusekulu ja keskkonnakahju on kordades väiksem."
    },
    {
      "id": "reasoning-models",
      "title": "Spetsialiseeritud Arutlusmudelid",
      "simpleName": "Mõtleja",
      "explanation": "Mudelid, mis on treenitud spetsiifiliselt mõtlema samm-sammult (nt o1 seeria), et lahendada keerulisi loogika- ja matemaatikaülesandeid.",
      "metaphor": "Maletaja. Ta ei tee käiku kohe, vaid mõtleb peas läbi 10 võimalikku sammu ette."
    }
  ]
}
```

---

## English (en) Translations

### locales/en/common.json

```json
{
  "viewFullSize": "View full size",
  "currentlyHere": "Currently here",
  "or": "or",
  "clickHere": "Click here",
  "close": "Close",
  "back": "Back",
  "next": "Next",
  "previous": "Previous",
  "loading": "Loading...",
  "learnMore": "Learn more",
  "viewModes": {
    "metaphor": "Metaphor",
    "technical": "Technical",
    "both": "Both"
  },
  "changeLanguage": "Change language",
  "search": "Search",
  "filter": "Filter",
  "all": "All",
  "conceptCount": "{count, plural, =0 {No concepts} =1 {One concept} other {# concepts}}"
}
```

### locales/en/navigation.json

```json
{
  "treeView": "Tree View",
  "classicView": "Classic View",
  "classicViewDesc": "Scrollable level view with detailed content",
  "treeViewDesc": "Interactive tree with all concepts",
  "startFromRoots": "Start from roots and move upward or scroll freely",
  "version": "Version",
  "home": "Home",
  "about": "About",
  "contact": "Contact",
  "menu": "Menu"
}
```

### locales/en/metadata.json

```json
{
  "title": "AI Knowledge Tree",
  "description": "A comprehensive framework for teaching AI concepts",
  "subtitle": "A complete framework for teaching AI concepts – from fundamental mechanics to cutting-edge research.",
  "footerTagline": "AI Knowledge Tree – Interactive learning tool for understanding AI concepts",
  "keywords": [
    "AI",
    "artificial intelligence",
    "machine learning",
    "education",
    "learning",
    "LLMs"
  ],
  "author": "AI Tree Team",
  "seo": {
    "ogTitle": "AI Knowledge Tree - Learn AI Concepts",
    "ogDescription": "Interactive platform for learning AI fundamentals and concepts through metaphors and examples",
    "twitterCard": "summary_large_image"
  }
}
```

### locales/en/levels.json

```json
{
  "metadata": {
    "title": "AI Knowledge Tree",
    "description": "A comprehensive framework for teaching AI concepts"
  },
  "levels": {
    "roots": {
      "name": "ROOTS",
      "subtitle": "Fundamental Mechanics",
      "description": "This is the AI 'engine'. Without understanding how machines process language, you're operating blind."
    },
    "trunk": {
      "name": "TRUNK",
      "subtitle": "Engineering and Architecture",
      "description": "The trunk is the supporting structure that holds everything else up."
    },
    "branches": {
      "name": "BRANCHES",
      "subtitle": "Applications and Agents",
      "description": "Branches are the practical application of knowledge."
    },
    "leaves": {
      "name": "LEAVES AND FRUIT",
      "subtitle": "Research and Trends",
      "description": "This is the fastest-changing part of the tree. What's cutting-edge research today becomes standard tomorrow."
    }
  }
}
```

### locales/en/glossary.json

```json
{
  "terms": {
    "tokens": {
      "term": "Tokens",
      "keep_original": true,
      "short_explanation": "Smallest units of text processed by AI models",
      "example": "The word 'banana' is split into 3 tokens",
      "related": ["embeddings", "tokenization"]
    },
    "embeddings": {
      "term": "Embeddings",
      "keep_original": true,
      "short_explanation": "Vectors that represent word meanings numerically",
      "related": ["vectors", "semantic-space"]
    },
    "attention": {
      "term": "Attention Mechanism",
      "keep_original": true,
      "short_explanation": "Mechanism allowing models to focus on important parts of input",
      "related": ["transformers", "self-attention"]
    },
    "rag": {
      "term": "RAG",
      "expanded": "Retrieval-Augmented Generation",
      "keep_original": true,
      "short_explanation": "AI technique that retrieves relevant information before generating responses",
      "related": ["vector-database", "semantic-search"]
    },
    "lora": {
      "term": "LoRA",
      "expanded": "Low-Rank Adaptation",
      "keep_original": true,
      "short_explanation": "Efficient method for fine-tuning models",
      "related": ["fine-tuning", "adaptation"]
    },
    "mcp": {
      "term": "MCP",
      "expanded": "Model Context Protocol",
      "keep_original": true,
      "short_explanation": "Standardized protocol for connecting models and tools",
      "related": ["integration", "tools"]
    },
    "agi": {
      "term": "AGI",
      "expanded": "Artificial General Intelligence",
      "keep_original": true,
      "short_explanation": "General intelligence at human level",
      "related": ["asi", "intelligence"]
    },
    "asi": {
      "term": "ASI",
      "expanded": "Artificial Superintelligence",
      "keep_original": true,
      "short_explanation": "Superintelligence exceeding human capabilities",
      "related": ["agi", "singularity"]
    },
    "moe": {
      "term": "MoE",
      "expanded": "Mixture of Experts",
      "keep_original": true,
      "short_explanation": "Combination of multiple specialized models",
      "related": ["architecture", "efficiency"]
    },
    "context": {
      "term": "Context",
      "translated": false,
      "short_explanation": "Surrounding information that gives meaning to a prompt",
      "related": ["prompt", "context-window"]
    },
    "agent": {
      "term": "Agent",
      "translated": false,
      "short_explanation": "Autonomous AI system capable of using tools",
      "related": ["autonomy", "tools", "actions"]
    },
    "prompt": {
      "term": "Prompt",
      "translated": false,
      "short_explanation": "User input or instruction to an AI model",
      "related": ["prompt-engineering", "instruction"]
    }
  },
  "complexity_levels": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  },
  "categories": {
    "fundamentals": "Fundamentals",
    "architecture": "Architecture",
    "applications": "Applications",
    "research": "Research"
  }
}
```

### locales/en/concepts/roots.json

```json
{
  "concepts": [
    {
      "id": "tokens",
      "title": "Tokens",
      "simpleName": "Text Blocks",
      "explanation": "The smallest units of text for AI. These aren't words, but character combinations. They determine cost and speed.",
      "metaphor": "Lego blocks. The word 'Banana' isn't one piece, but consists of three blocks. AI builds sentences block by block.",
      "extended_explanation": "Tokens are a fundamental concept in how language models work. Models don't process text by words, but by tokens. A token can be a word, part of a word, or even punctuation. Tokenization depends on the model – GPT-4 uses different tokenization than BERT.",
      "technical_details": {
        "typical_token_count": "In English, 1 token ≈ 4 characters on average",
        "cost_implications": "API costs are based on token count (input + output)",
        "context_limits": "Model context window is measured in tokens (e.g., 8K, 32K, 128K tokens)"
      },
      "examples": [
        {
          "text": "Hello, World!",
          "tokens": ["Hello", ",", " World", "!"],
          "count": 4
        },
        {
          "text": "Tere, Maailm!",
          "tokens": ["T", "ere", ",", " Ma", "ail", "m", "!"],
          "count": 7,
          "note": "Estonian takes more tokens than English"
        }
      ]
    },
    {
      "id": "vectors",
      "title": "Vectors (Embeddings)",
      "simpleName": "Meaning Map",
      "explanation": "Translating words and meanings into numerical coordinates in space. Similar meanings are located close together in space.",
      "metaphor": "GPS coordinates. The words 'King' and 'Queen' are close on the map, like Tallinn and Tartu, but 'Banana' is on another continent.",
      "extended_explanation": "Vectors or embeddings are numerical representations of words, sentences, or documents. They allow computers to 'understand' word meanings and relationships. In vector space, words with similar meanings are located close together, enabling semantic search.",
      "technical_details": {
        "dimensions": "Typically 384, 768, 1536, or 3072 dimensions",
        "similarity": "Calculated using cosine similarity",
        "models": "text-embedding-ada-002, sentence-transformers, etc."
      },
      "examples": [
        {
          "concept": "King - Man + Woman = Queen",
          "explanation": "Vector arithmetic enables analogies"
        },
        {
          "use_case": "Semantic search",
          "explanation": "Find documents by meaning, not keywords"
        }
      ]
    },
    {
      "id": "attention",
      "title": "Attention Mechanism",
      "simpleName": "Focus",
      "explanation": "A mechanism that allows the model to focus on important parts of a sentence to understand relationships (e.g., who is 'he' in a sentence).",
      "metaphor": "Flashlight in a dark room. AI illuminates only those words that are currently important for giving an answer.",
      "extended_explanation": "The attention mechanism revolutionized language models. It allows models to dynamically decide which input parts are important for each output token. Self-attention (in transformers) allows each token to 'look at' other tokens and decide which are contextually important.",
      "technical_details": {
        "types": "Self-attention, cross-attention, multi-head attention",
        "mechanism": "Query-Key-Value system",
        "innovation": "Enables parallel processing of entire sentences (unlike RNNs)"
      }
    },
    {
      "id": "prefill-decode",
      "title": "Prefill vs Decode",
      "simpleName": "Reading and Writing",
      "explanation": "How a model processes text: first it reads quickly (prefill) and then writes slowly (decode).",
      "metaphor": "Reading vs Writing. Scanning a book with your eyes is fast (prefill), but rewriting the same text by hand is slow (decode).",
      "extended_explanation": "LLM work is divided into two phases: prefill (prompt processing) and decode (token generation). Prefill is parallel and fast - the model processes the entire prompt at once. Decode is sequential and slow - each new token is generated one at a time, depending on previous ones.",
      "technical_details": {
        "prefill_speed": "Parallel, good GPU utilization",
        "decode_speed": "Sequential, memory-bound",
        "optimization": "Speculative decoding, batching, caching"
      }
    }
  ]
}
```

### locales/en/concepts/trunk.json

```json
{
  "concepts": [
    {
      "id": "context-engineering",
      "title": "Context Engineering",
      "simpleName": "Stage Direction",
      "explanation": "This is the 'trunk' that holds everything up. The difference between simple prompting and systematic context creation (environment, rules, roles).",
      "metaphor": "Stage director's work. The prompt is an actor's line. Context is the stage design, lighting, costumes, and script that give the line meaning."
    },
    {
      "id": "rag",
      "title": "RAG (Retrieval-Augmented Generation)",
      "simpleName": "Library",
      "explanation": "The model is given access to a 'private library' (company data) to reduce hallucinations and increase accuracy.",
      "metaphor": "Open-book exam. AI doesn't have to memorize facts, it can look them up in a reliable textbook."
    },
    {
      "id": "memory",
      "title": "Memory and State Management",
      "simpleName": "Memory",
      "explanation": "How the model remembers previous conversation or current activity state. Without this, it would start every sentence from scratch.",
      "metaphor": "Notebook. If you have bad memory, you write down important things. AI has 'short-term memory' (conversation window) and 'long-term memory' (database)."
    },
    {
      "id": "lora",
      "title": "LoRA & Fine-tuning",
      "simpleName": "Additional Training",
      "explanation": "Methods for 'retraining' a model for a specific style or task without changing the entire giant model.",
      "metaphor": "Courses. A university graduate (base model) goes to additional training to become a specialist in a narrow field."
    },
    {
      "id": "security",
      "title": "AI Security",
      "simpleName": "Security",
      "explanation": "Measures against prompt injection and data leaks. A 'firewall' between AI and the world.",
      "metaphor": "Bouncer at a nightclub. Checks who can come in (input) and what can go out (output)."
    }
  ]
}
```

### locales/en/concepts/branches.json

```json
{
  "concepts": [
    {
      "id": "ai-agents",
      "title": "AI Agents",
      "simpleName": "Doer",
      "explanation": "Autonomous systems that don't just talk, but act: use tools, plan, and complete tasks independently.",
      "metaphor": "Worker vs Consultant. A consultant (LLM) gives advice. A worker (Agent) takes a hammer and fixes the roof."
    },
    {
      "id": "mcp",
      "title": "MCP (Model Context Protocol)",
      "simpleName": "Connector",
      "explanation": "A standardized way to connect AI models with external data and tools. Avoids 'spaghetti code' in integrations.",
      "metaphor": "USB-C cable. The same plug works to connect AI to any device (database or program)."
    },
    {
      "id": "complexity-levels",
      "title": "3 Complexity Levels",
      "simpleName": "Three Levels",
      "explanation": "1. LLM (storyteller), 2. Reasoning model (thinker), 3. Agent (doer).",
      "metaphor": "Kitchen metaphor: 1. Recipe book (LLM), 2. Head chef who composes menu (Reasoning), 3. Cook who actually chops and bakes (Agent)."
    }
  ]
}
```

### locales/en/concepts/leaves.json

```json
{
  "concepts": [
    {
      "id": "moe",
      "title": "Mixture of Experts (MoE)",
      "simpleName": "Council",
      "explanation": "Instead of one large model, multiple specialized 'experts' work together. For each query, only the necessary parts are activated, saving resources.",
      "metaphor": "Medical council. Instead of one general practitioner knowing everything, you're referred to a cardiologist or neurologist depending on symptoms."
    },
    {
      "id": "agi-asi",
      "title": "AGI and ASI",
      "simpleName": "Superintelligence",
      "explanation": "Journey toward human-level intelligence (AGI) and superintelligence (ASI). Models that can generalize and exceed human capabilities in all domains.",
      "metaphor": "Student vs Einstein vs Superintelligence. Today's AI is like a smart student. AGI is like a genius. ASI is something that exceeds human capabilities in all domains."
    },
    {
      "id": "green-ai",
      "title": "Green AI (Sustainability)",
      "simpleName": "Green AI",
      "explanation": "Focus on energy efficiency. How to train and run models with a smaller carbon footprint.",
      "metaphor": "Electric car. Same destination (result), but fuel consumption and environmental damage are orders of magnitude lower."
    },
    {
      "id": "reasoning-models",
      "title": "Specialized Reasoning Models",
      "simpleName": "Thinker",
      "explanation": "Models specifically trained to think step-by-step (e.g., o1 series) to solve complex logic and math problems.",
      "metaphor": "Chess player. Doesn't make a move immediately, but thinks through 10 possible steps ahead in their mind."
    }
  ]
}
```

---

## Translation Guidelines

### 1. Consistency Rules

- **Technical terms**: Always use the same translation for technical terms within a locale
- **Tone**: Maintain consistent informal/formal tone across all content
- **Metaphors**: Adapt metaphors to be culturally relevant (don't translate literally)
- **Examples**: Use locale-specific examples where appropriate

### 2. Quality Checks

Before finalizing translations:
- [ ] All keys match between locales
- [ ] No empty string values
- [ ] Placeholder syntax is consistent ({variable})
- [ ] Technical terms match glossary
- [ ] Metaphors are culturally appropriate
- [ ] No machine translation artifacts
- [ ] Native speaker review completed

### 3. Translation Memory

Maintain a translation memory document for:
- Repeated phrases
- Technical term mappings
- Style guide decisions
- Metaphor adaptations

---

## Usage in Code

```typescript
// Import translation
import { useTranslations } from 'next-intl';

// Use in component
const t = useTranslations('concepts.roots');
const concept = t('concepts.0'); // Access tokens concept

// Or for structured access
const tGlossary = useTranslations('glossary.terms');
const tokenTerm = tGlossary('tokens.term'); // "Tokens"
const tokenExplanation = tGlossary('tokens.short_explanation');
```

---

These sample translation files provide a complete starting point for implementing i18n in the AI Tree platform. All technical content is preserved while allowing for localized metaphors and explanations.
