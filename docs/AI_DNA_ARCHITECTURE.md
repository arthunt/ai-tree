# AI DNA Arhitektuur
## Kaasaegse tehisintellekti minimaalne kontseptuaalne seeme

> *"Nagu bioloogiline DNA koosneb 4 alusest, millest kogu elu on ehitatud, koosneb kaasaegse LLM-i DNA samuti 4 fundamentaalsest komponendist."*

---

## 1. Ülevaade

See dokument kirjeldab **AI DNA** kontseptsiooni - minimaalset visuaalset ja kontseptuaalset raamistikku, millest kasutaja arusaam tehisintellektist saab kasvama hakata.

### 1.1 Eesmärk

Luua ai-tree rakendusele **alternatiivne sissepääsupunkt**, mis:
- Annab kohese ülevaate AI põhimehhanismist
- On piisavalt lihtne, et mõista 30 sekundiga
- Võimaldab süveneda igasse komponenti eraldi
- Toimib "kasvava arusaama" alusena

### 1.2 Metafoor: Seeme ja Kest

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                        ╭─────────────╮                          │
│                       ╱   TEKST      ╲    ← Seemne KEST         │
│                      ╱   (väliselt    ╲      (nähtav osa)       │
│                     │    nähtav)       │                        │
│                     │  ┌───────────┐   │                        │
│                     │  │           │   │                        │
│                     │  │  T-V-A-P  │   │  ← Seemne TUUM         │
│                     │  │   (DNA)   │   │     (sisemine          │
│                     │  │           │   │      mehhanism)        │
│                     │  └───────────┘   │                        │
│                      ╲                ╱                          │
│                       ╲              ╱                           │
│                        ╰────────────╯                           │
│                                                                 │
│   Kasutaja näeb: TEKST sisend → [???] → TEKST väljund           │
│   DNA näitab:    TEKST → [T→V→A→P] → TEKST                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Tekst on seemne kest** - see on väliselt nähtav osa, millega kasutaja suhtleb. Aga tegelik "elu" toimub DNA-s, mis on peidetud kesta all.

---

## 2. AI DNA: 4 Nukleotiidi

### 2.1 Ülevaatlik diagramm

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    TEKST  ──→  [T]  ──→  [V]  ──→  [A]  ──→  [P]  ──→  TEKST   │
│                 │        │        │        │                    │
│              Tokenid  Vektorid  Attention  Prediction           │
│                 │        │        │        │                    │
│              "Lõika"  "Kaardista" "Seosta" "Ennusta"            │
│                                                                 │
│    ─────────────────────────────────────────────────────────    │
│                                                                 │
│    Värvikood:                                                   │
│    🔴 T = #ef4444 (punane)                                      │
│    🟢 V = #22c55e (roheline)                                    │
│    🔵 A = #3b82f6 (sinine)                                      │
│    🟣 P = #a855f7 (lilla)                                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Detailne kirjeldus

#### 🔴 T - Tokeniseerimine (Tokenization)

**Küsimus:** Kuidas teksti lugeda?  
**Metafoor:** Silmad / LEGO klotsid  
**Funktsioon:** Muudab teksti numbriteks, mida arvuti saab töödelda

```
Sisend:  "Tere maailm!"
         ↓
Väljund: [15496, 8421, 2910, 0]

Visualisatsioon:
┌──────┐ ┌───────┐ ┌──────┐ ┌───┐
│ Tere │ │maailm │ │  !   │ │   │
│15496 │ │ 8421  │ │ 2910 │ │ 0 │
└──────┘ └───────┘ └──────┘ └───┘
```

**Miks see oluline on:**
- AI ei "näe" tähti, ainult numbreid
- Tokenite arv = hind ja kiirus
- Eesti keel vajab rohkem tokeneid kui inglise keel

**Seos ai-tree kontseptidega:** `tokens`, `prefill-decode`, `context-windows`

---

#### 🟢 V - Vektorid (Embeddings)

**Küsimus:** Mis see tähendab?  
**Metafoor:** GPS koordinaadid / Tähenduste kaart  
**Funktsioon:** Annab igale tokenile "aadressi" tähendusruumis

```
"kuningas" → [0.2, -0.5, 0.8, ..., 0.1]   (1536 dimensiooni)
"kuninganna" → [0.21, -0.48, 0.79, ..., 0.12]  ← LÄHEDAL!
"banaan" → [-0.8, 0.3, -0.2, ..., 0.9]    ← KAUGEL

Visualisatsioon (lihtsustatud 2D):

        kuninganna •
                    \
         kuningas •  } lähedal
                    
                    
                    
                    
            banaan •   kaugel
```

**Miks see oluline on:**
- Võimaldab AI-l "mõista" sarnasust
- Matemaatiline alus semantilisele otsingule
- RAG ja vektorandmebaasid põhinevad sellel

**Seos ai-tree kontseptidega:** `vectors`, `rag`, `memory`

---

#### 🔵 A - Attention (Tähelepanu mehhanism)

**Küsimus:** Millised sõnad on omavahel seotud?  
**Metafoor:** Taskulamp pimedas toas / Fookus  
**Funktsioon:** Leiab seosed sõnade vahel kontekstis

```
Lause: "Mari läks poodi ja TA ostis piima"

Attention küsib: Kellele viitab "TA"?

      Mari   läks   poodi   ja    TA    ostis   piima
        │                         │
        └─────── 0.85 ────────────┘  ← tugev seos!
                                  │
              poodi ── 0.05 ──────┘  ← nõrk seos
                                  │
              piima ── 0.10 ──────┘  ← nõrk seos

Visualisatsioon:
┌──────┐      ┌────┐
│ Mari │◄━━━━━│ TA │  tugev attention (0.85)
└──────┘      └────┘
   ▲             │
   │    ┌────────┘
   │    │
┌──┴───┐│
│poodi ││ nõrk (0.05)
└──────┘▼
```

**Miks see oluline on:**
- Revolutsioneeris NLP 2017 ("Attention is All You Need")
- Võimaldab paralleelset töötlust (vs järjestikune RNN)
- Transformer arhitektuuri süda

**Seos ai-tree kontseptidega:** `attention`, `transformers`, `context-windows`

---

#### 🟣 P - Prediction (Ennustus / Tõenäosusjaotus)

**Küsimus:** Mis sõna tuleb järgmisena?  
**Metafoor:** Arvaja / Järgmise sammu ennustaja  
**Funktsioon:** Arvutab tõenäosused kõigi võimalike järgmiste tokenite jaoks

```
Sisend: "Päike tõuseb hommikul ja loojub"

Väljund (tõenäosusjaotus):
┌────────────┬────────────┐
│   Token    │ Tõenäosus  │
├────────────┼────────────┤
│   õhtul    │    73%     │ ← valitakse (temp=0)
│   läänest  │    12%     │
│  aeglaselt │     8%     │
│   ...      │     7%     │
└────────────┴────────────┘

Temperature mõju:
┌─────────────────────────────────────────────┐
│ temp=0.0  → alati "õhtul" (deterministic)   │
│ temp=0.7  → tavaliselt "õhtul", vahel muu   │
│ temp=1.5  → loov, ootamatud valikud         │
└─────────────────────────────────────────────┘
```

**Miks see oluline on:**
- Kogu LLM eksisteerib selle jaoks
- Temperature kontrollib loovust vs täpsust
- Hallutsinatsioonid tulevad siit (enesekindel vale ennustus)

**Seos ai-tree kontseptidega:** `temperature-sampling`, `hallucinations`, `prompting-basics`

---

## 3. DNA Topeltheliks: Training vs Inference

### 3.1 Kaks Ahela

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ╔═══════════════════════════════════════════════════════╗     │
│   ║                   TRAINING AHEL                       ║     │
│   ║   (miljardid tekstid → kaalude muutmine → kuud)       ║     │
│   ╚═══════════════════════════════════════════════════════╝     │
│         ╲                                           ╱           │
│          ╲  ───────────────────────────────────── ╱             │
│           ╲╱                                     ╲╱              │
│           ╱╲                                     ╱╲              │
│          ╱  ───────────────────────────────────── ╲             │
│         ╱                                           ╲           │
│   ╔═══════════════════════════════════════════════════════╗     │
│   ║                  INFERENCE AHEL                       ║     │
│   ║   (üks küsimus → fikseeritud kaalud → sekundid)       ║     │
│   ╚═══════════════════════════════════════════════════════╝     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Võrdlus

| Aspekt | Training | Inference |
|--------|----------|-----------|
| **Sisend** | Miljardid tekstid | Üks küsimus |
| **Kaalud** | Muutuvad (õpivad) | Fikseeritud |
| **Aeg** | Kuud | Sekundid |
| **Maksumus** | Miljonid $ | Sendid |
| **Toimub** | Üks kord (Anthropic/OpenAI) | Iga päring |
| **Analoogia** | 4 aastat ülikooli | Töö tegemine |

---

## 4. Vertikaalne Arhitektuur

### 4.1 Tornvaade

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         VÄLJUND                                 │
│                     "Mulle meeldib..."                          │
│                            ▲                                    │
│                            │                                    │
│    ┌───────────────────────┴───────────────────────────┐        │
│    │                                                   │        │
│    │   🟣 PREDICTION (softmax → tõenäosused)          │        │
│    │      P("meeldib") = 0.42                          │        │
│    │      P("ei") = 0.31                               │        │
│    │      P("on") = 0.15                               │        │
│    │                                                   │        │
│    ├───────────────────────────────────────────────────┤        │
│    │                                                   │        │
│    │   🔵 ATTENTION (96 heads × 96 layers)            │        │
│    │      "Mis on kontekstis oluline?"                 │        │
│    │                                                   │        │
│    ├───────────────────────────────────────────────────┤        │
│    │                                                   │        │
│    │   🟢 EMBEDDINGS (d=1536+)                        │        │
│    │      Iga token → vektor tähendusruumis            │        │
│    │                                                   │        │
│    ├───────────────────────────────────────────────────┤        │
│    │                                                   │        │
│    │   🔴 TOKENIZATION                                │        │
│    │      "Tere" → 15496                               │        │
│    │                                                   │        │
│    └───────────────────────────────────────────────────┘        │
│                            ▲                                    │
│                            │                                    │
│                         SISEND                                  │
│                     "Tere, kuidas..."                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. DNA → Puu Kaardistus

### 5.1 Kuidas DNA seostub ai-tree tasemetega

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DNA KOMPONENT          AI-TREE TASE         KONTSEPTID        │
│   ══════════════         ═══════════          ══════════        │
│                                                                 │
│   🟣 P (Prediction)  ──→  🍃 LEHED       ──→  reasoning-models  │
│                           (Trendid)           moe, agi-asi      │
│                                                                 │
│   🔵 A (Attention)   ──→  🌿 OKSAD       ──→  ai-agents         │
│                           (Rakendused)        mcp, function-    │
│                                               calling           │
│                                                                 │
│   🟢 V (Vektorid)    ──→  🌲 TÜVI        ──→  rag, memory       │
│                           (Inseneeria)        context-eng       │
│                                                                 │
│   🔴 T (Tokenid)     ──→  🌱 JUURED      ──→  tokens, prefill   │
│                           (Fundamentaalid)    context-windows   │
│                                                                 │
│   ─────────────────────────────────────────────────────────     │
│                                                                 │
│   TEKST (kest)       ──→  Kasutajaliides  ──→  prompting-       │
│                           (Sisend/Väljund)     basics,          │
│                                                hallucinations   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Detailne kaardistus

| DNA | Puu tase | Kontseptid | Demos |
|-----|----------|------------|-------|
| 🔴 T | Juured | `tokens`, `prefill-decode`, `context-windows` | TokenizerDemo ✅ |
| 🟢 V | Tüvi | `vectors`, `rag`, `memory`, `context-engineering` | VectorDemo ✅ |
| 🔵 A | Oksad | `attention`, `transformers`, `ai-agents`, `mcp` | AttentionSVG ⚠️ |
| 🟣 P | Lehed | `temperature-sampling`, `hallucinations`, `reasoning-models` | TemperatureSVG ⚠️ |

---

## 6. Rakenduse UX: DNA Sissepääsupunkt

### 6.1 Kasutajateekond

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   LANDING LEHT                                                  │
│   ═══════════                                                   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │              🌳 AI Teadmiste Puu                        │   │
│   │                                                         │   │
│   │         Vali oma teekond / Choose your path             │   │
│   │                                                         │   │
│   │   ┌───────────────────┐   ┌───────────────────┐         │   │
│   │   │                   │   │                   │         │   │
│   │   │       🧬          │   │       🌳          │         │   │
│   │   │                   │   │                   │         │   │
│   │   │   DNA VAADE       │   │   PUU VAADE       │         │   │
│   │   │                   │   │                   │         │   │
│   │   │ "Kiire ülevaade"  │   │ "Täielik kaart"   │         │   │
│   │   │    ~5 min         │   │    15+ min        │         │   │
│   │   │                   │   │                   │         │   │
│   │   └───────────────────┘   └───────────────────┘         │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 DNA Vaade Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DNA VAADE (Lineaarne T→V→A→P)                                │
│   ═══════════════════════════════                               │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  📝 SISEND: "Tere, kuidas sul läheb?"                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🔴 TOKENID                                             │   │
│   │  ┌────┐ ┌──────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌───┐         │   │
│   │  │Tere│ │kuidas│ │ sul │ │läheb│ │  ?  │ │...│         │   │
│   │  └────┘ └──────┘ └─────┘ └─────┘ └─────┘ └───┘         │   │
│   │                                    [Süvene →]           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🟢 VEKTORID                                            │   │
│   │      •Tere     •kuidas                                  │   │
│   │           •sul      •läheb                              │   │
│   │                          •?                             │   │
│   │                                    [Süvene →]           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🔵 ATTENTION                                           │   │
│   │  "sul" ←──0.7──→ "läheb"  (tugev seos)                 │   │
│   │  "Tere" ←──0.2──→ "?"     (nõrk seos)                  │   │
│   │                                    [Süvene →]           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  🟣 PREDICTION                                          │   │
│   │  Järgmine sõna: "Hästi" (68%) | "Normaalselt" (21%)    │   │
│   │                                    [Süvene →]           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  📝 VÄLJUND: "Hästi, aitäh küsimast!"                   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │  [🌳 Vaata täielikku puud]   [🔄 Proovi ise]           │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Interaktiivne Demo Mockup

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   🧬 PROOVI ISE: Sisesta tekst ja vaata DNA tööd               │
│   ═══════════════════════════════════════════════               │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │   Sisesta tekst: [Minu nimi on Claude____________]      │   │
│   │                                                         │   │
│   │                              [Analüüsi →]               │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│   ┌────────────────────┬────────────────────────────────────┐   │
│   │                    │                                    │   │
│   │   🔴 T: 5 tokenit  │   Minu│nimi│on│Claude│.           │   │
│   │                    │                                    │   │
│   ├────────────────────┼────────────────────────────────────┤   │
│   │                    │                                    │   │
│   │   🟢 V: 5 vektorit │   [2D kaart punktidega]            │   │
│   │                    │                                    │   │
│   ├────────────────────┼────────────────────────────────────┤   │
│   │                    │                                    │   │
│   │   🔵 A: seosed     │   "nimi" ←→ "Claude" (0.82)       │   │
│   │                    │                                    │   │
│   ├────────────────────┼────────────────────────────────────┤   │
│   │                    │                                    │   │
│   │   🟣 P: ennustus   │   "ja" (45%) | "ning" (23%)       │   │
│   │                    │                                    │   │
│   └────────────────────┴────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Tehniline Implementatsioon

### 7.1 Komponentide Struktuur

```
components/
├── dna/
│   ├── DNAView.tsx              # Peamine DNA vaate container
│   ├── DNAStepToken.tsx         # 🔴 Tokeniseerimise samm
│   ├── DNAStepVector.tsx        # 🟢 Vektorite samm
│   ├── DNAStepAttention.tsx     # 🔵 Attention samm
│   ├── DNAStepPrediction.tsx    # 🟣 Prediction samm
│   ├── DNAInteractiveDemo.tsx   # Interaktiivne demo
│   ├── DNAFlowDiagram.tsx       # T→V→A→P voog
│   └── index.ts
│
├── landing/
│   ├── ViewSelector.tsx         # DNA vs Tree valik
│   └── index.ts
```

### 7.2 TypeScript Tüübid

```typescript
// lib/dna-types.ts

export type DNAComponentId = 'T' | 'V' | 'A' | 'P';

export interface DNAComponent {
  id: DNAComponentId;
  name: string;
  fullName: string;
  question: string;
  metaphor: string;
  color: string;
  colorHex: string;
  relatedConcepts: string[];  // ai-tree concept IDs
  interactiveDemo?: boolean;
}

export const DNA_COMPONENTS: DNAComponent[] = [
  {
    id: 'T',
    name: 'Tokenid',
    fullName: 'Tokeniseerimine',
    question: 'Kuidas teksti lugeda?',
    metaphor: 'Silmad / LEGO klotsid',
    color: 'red',
    colorHex: '#ef4444',
    relatedConcepts: ['tokens', 'prefill-decode', 'context-windows'],
    interactiveDemo: true
  },
  {
    id: 'V',
    name: 'Vektorid',
    fullName: 'Embeddings',
    question: 'Mis see tähendab?',
    metaphor: 'GPS koordinaadid',
    color: 'green',
    colorHex: '#22c55e',
    relatedConcepts: ['vectors', 'rag', 'memory'],
    interactiveDemo: true
  },
  {
    id: 'A',
    name: 'Attention',
    fullName: 'Tähelepanu mehhanism',
    question: 'Mis on oluline?',
    metaphor: 'Taskulamp pimedas toas',
    color: 'blue',
    colorHex: '#3b82f6',
    relatedConcepts: ['attention', 'transformers', 'context-engineering'],
    interactiveDemo: false
  },
  {
    id: 'P',
    name: 'Prediction',
    fullName: 'Ennustus',
    question: 'Mis tuleb järgmisena?',
    metaphor: 'Arvaja',
    color: 'purple',
    colorHex: '#a855f7',
    relatedConcepts: ['temperature-sampling', 'hallucinations', 'prompting-basics'],
    interactiveDemo: false
  }
];

export interface DNAViewState {
  activeStep: DNAComponentId | null;
  completedSteps: DNAComponentId[];
  inputText: string;
}
```

### 7.3 Routing Muudatus

```typescript
// app/[locale]/page.tsx muudatused

// Lisa state vaatevaliku jaoks
const [viewMode, setViewMode] = useState<'selector' | 'dna' | 'tree'>('selector');

// Esimesel külastusel näita valikut
useEffect(() => {
  const savedView = localStorage.getItem('ai-tree-view-preference');
  if (savedView) {
    setViewMode(savedView as 'dna' | 'tree');
  }
}, []);

// Renderda vastavalt valikule
{viewMode === 'selector' && <ViewSelector onSelect={setViewMode} />}
{viewMode === 'dna' && <DNAView onSwitchToTree={() => setViewMode('tree')} />}
{viewMode === 'tree' && <TreeView onSwitchToDNA={() => setViewMode('dna')} />}
```

---

## 8. i18n Tõlked

### 8.1 Eesti keeles (messages/et.json)

```json
{
  "dna": {
    "title": "AI DNA",
    "subtitle": "Kuidas tehisintellekt tegelikult töötab",
    "viewSelector": {
      "title": "Vali oma teekond",
      "dnaOption": "DNA Vaade",
      "dnaDescription": "Kiire ülevaade ~5 min",
      "treeOption": "Puu Vaade", 
      "treeDescription": "Täielik kaart 15+ min"
    },
    "components": {
      "T": {
        "name": "Tokenid",
        "fullName": "Tokeniseerimine",
        "question": "Kuidas teksti lugeda?",
        "metaphor": "Silmad / LEGO klotsid",
        "explanation": "Muudab teksti numbriteks, mida arvuti saab töödelda"
      },
      "V": {
        "name": "Vektorid",
        "fullName": "Embeddings",
        "question": "Mis see tähendab?",
        "metaphor": "GPS koordinaadid",
        "explanation": "Annab igale tokenile aadressi tähendusruumis"
      },
      "A": {
        "name": "Attention",
        "fullName": "Tähelepanu mehhanism",
        "question": "Mis on oluline?",
        "metaphor": "Taskulamp pimedas toas",
        "explanation": "Leiab seosed sõnade vahel kontekstis"
      },
      "P": {
        "name": "Prediction",
        "fullName": "Ennustus",
        "question": "Mis tuleb järgmisena?",
        "metaphor": "Arvaja",
        "explanation": "Arvutab tõenäosused järgmiste tokenite jaoks"
      }
    },
    "flow": {
      "input": "Sisend",
      "output": "Väljund",
      "shell": "Tekst (kest)",
      "core": "DNA (tuum)"
    },
    "actions": {
      "dive": "Süvene",
      "tryIt": "Proovi ise",
      "switchToTree": "Vaata puud",
      "back": "Tagasi"
    }
  }
}
```

### 8.2 Inglise keeles (messages/en.json)

```json
{
  "dna": {
    "title": "AI DNA",
    "subtitle": "How AI actually works",
    "viewSelector": {
      "title": "Choose your path",
      "dnaOption": "DNA View",
      "dnaDescription": "Quick overview ~5 min",
      "treeOption": "Tree View",
      "treeDescription": "Complete map 15+ min"
    },
    "components": {
      "T": {
        "name": "Tokens",
        "fullName": "Tokenization",
        "question": "How to read text?",
        "metaphor": "Eyes / LEGO blocks",
        "explanation": "Converts text to numbers that computers can process"
      },
      "V": {
        "name": "Vectors",
        "fullName": "Embeddings",
        "question": "What does it mean?",
        "metaphor": "GPS coordinates",
        "explanation": "Gives each token an address in meaning space"
      },
      "A": {
        "name": "Attention",
        "fullName": "Attention Mechanism",
        "question": "What's important?",
        "metaphor": "Flashlight in dark room",
        "explanation": "Finds relationships between words in context"
      },
      "P": {
        "name": "Prediction",
        "fullName": "Probability Distribution",
        "question": "What comes next?",
        "metaphor": "Fortune teller",
        "explanation": "Calculates probabilities for next tokens"
      }
    },
    "flow": {
      "input": "Input",
      "output": "Output",
      "shell": "Text (shell)",
      "core": "DNA (core)"
    },
    "actions": {
      "dive": "Dive deeper",
      "tryIt": "Try it yourself",
      "switchToTree": "View tree",
      "back": "Back"
    }
  }
}
```

---

## 9. Kokkuvõte: DNA kui Kasvav Arusaam

### 9.1 Filosoofia

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   KASUTAJA TEEKOND (kasvav arusaam):                            │
│                                                                 │
│   1. NÄEB teksti (kest)                                         │
│      "AI vastab mu küsimustele"                                 │
│         │                                                       │
│         ▼                                                       │
│   2. AVASTAB DNA (T-V-A-P)                                      │
│      "Ahaa, tekst muudetakse numbriteks ja tagasi"              │
│         │                                                       │
│         ▼                                                       │
│   3. SÜVENEB igasse komponenti                                  │
│      "Vektorid on nagu GPS koordinaadid tähendusele"            │
│         │                                                       │
│         ▼                                                       │
│   4. NÄEB seoseid (puu)                                         │
│      "RAG kasutab vektoreid, et leida dokumente"                │
│         │                                                       │
│         ▼                                                       │
│   5. RAKENDAB teadmisi                                          │
│      "Saan nüüd ise prompte paremini kirjutada"                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 Põhimõtted

1. **Lihtne → Keeruline**: DNA on lihtsaim võimalik mudel, millest saab kasvada
2. **Visuaalne → Tehniline**: Esmalt pildid, siis kood
3. **Metafoorid → Terminid**: Esmalt "silmad", siis "tokeniseerimine"
4. **Passiivne → Aktiivne**: Esmalt vaata, siis proovi ise

### 9.3 Järgmised sammud

1. [ ] Implementeerida `ViewSelector` komponent
2. [ ] Implementeerida `DNAView` põhistruktuur
3. [ ] Lisada interaktiivsed demot T ja V jaoks
4. [ ] Ühendada DNA komponendid puu kontseptidega
5. [ ] Testida kasutajatega

---

## 10. Viited

- **ai-tree projekt**: `/Users/ak/GitHub/ai-tree`
- **Olemasolevad kontseptid**: `data/tree-concepts.json`
- **Tokenizer demo**: `components/TokenizerDemo.tsx`
- **Vector demo**: `components/VectorDemo.tsx`
- **Attention visualisatsioon**: `components/visuals/AttentionSVG.tsx`

---

## 11. Agent & Swarm Instructions

### 11.1 For All Agents Working on DNA Features

When working on any DNA-related task, agents MUST:

1. **Read this document first** - Understand T-V-A-P model before coding
2. **Use defined colors** - Only use the 4 DNA colors from Section 2.1
3. **Follow type definitions** - Use `DNAComponentId` and related types
4. **Link to tree concepts** - Every DNA component links to existing concepts
5. **Support both languages** - ET + EN translations required

### 11.2 Key Principles for Implementation

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   DNA IMPLEMENTATION RULES:                                             │
│                                                                         │
│   1. T-V-A-P ORDER IS SACRED                                            │
│      Always display in this order: Tokens → Vectors → Attention → P    │
│                                                                         │
│   2. TEXT IS THE SHELL                                                  │
│      Input text and output text frame the DNA visualization            │
│                                                                         │
│   3. EACH COMPONENT IS A GATEWAY                                        │
│      Clicking any DNA component should allow "diving deeper" to        │
│      related tree concepts                                              │
│                                                                         │
│   4. PROGRESS IS CUMULATIVE                                             │
│      DNA progress should add to (not replace) tree progress            │
│                                                                         │
│   5. DEMOS ARE ESSENTIAL                                                │
│      T and V have demos (reuse existing), A and P need new ones        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 11.3 Component Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| View Components | `DNA[Name].tsx` | `DNAView.tsx`, `DNAFlowDiagram.tsx` |
| Demo Components | `[Name]Demo.tsx` | `AttentionDemo.tsx`, `PredictionDemo.tsx` |
| Hooks | `useDNA[Name].ts` | `useDNAProgress.ts` |
| Types | `dna-[name].ts` | `dna-types.ts` |
| Data | `dna-[name].json` | `dna-components.json` |
| Styles | `dna-[name].css` | `dna-theme.css` |

### 11.4 Testing Requirements

Every DNA component must have:

```typescript
// Example test structure
describe('DNAComponentCard', () => {
  it('renders with correct color for each component', () => {});
  it('shows correct icon', () => {});
  it('displays translated content', () => {});
  it('handles click to expand', () => {});
  it('links to related tree concepts', () => {});
  it('is keyboard navigable', () => {});
  it('is accessible (WCAG AA)', () => {});
});
```

### 11.5 Cross-References

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **AI_TREE_MASTER_REFERENCE.md** | Full backlog & stages | Sprint planning |
| **BACKLOG.md** | Existing sprint tasks | Daily work |
| **CLAUDE.md** | Agent configuration | Swarm setup |
| **tree-concepts.json** | Concept data | DNA linking |

---

## 12. Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   🧬 AI DNA QUICK REFERENCE                                             │
│                                                                         │
│   MODEL: TEKST → [T] → [V] → [A] → [P] → TEKST                         │
│                                                                         │
│   COMPONENTS:                                                           │
│   🔴 T = Tokenid     #ef4444   "Kuidas teksti lugeda?"                 │
│   🟢 V = Vektorid    #22c55e   "Mis see tähendab?"                     │
│   🔵 A = Attention   #3b82f6   "Mis on oluline?"                       │
│   🟣 P = Prediction  #a855f7   "Mis tuleb järgmisena?"                 │
│                                                                         │
│   DEMOS:                                                                │
│   T → TokenizerDemo (✅ exists)                                         │
│   V → VectorDemo (✅ exists)                                            │
│   A → AttentionDemo (🔲 needed)                                         │
│   P → PredictionDemo (🔲 needed)                                        │
│                                                                         │
│   GROWTH STAGES:                                                        │
│   1. DNA (docs)     → 2. Seeme (UI)     → 3. Võrs (demos)              │
│   → 4. Noor Puu (integration) → 5. Vanem Puu (ecosystem)               │
│                                                                         │
│   FILES:                                                                │
│   components/dna/*.tsx   lib/dna-*.ts   data/dna-*.json                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

*Dokument loodud: 2026-01-30*  
*Versioon: 1.1*  
*Autor: Claude + Alek*  
*Seotud: AI_TREE_MASTER_REFERENCE.md*
