# AI Teadmiste Puu (AI Knowledge Tree)

Interaktiivne presentatsioonrakendus AI kontseptide õpetamiseks ja demostreerimiseks, kasutades puu metafoori.

## 🌳 Ülevaade

See rakendus visualiseerib AI kontseptsioone nelja taseme kaudu (alt üles):

1. **🌱 JUURED** - Fundamentaalne Mehaanika (Tokenid, Vektorid, Attention, Prefill/Decode)
2. **🌲 TÜVI** - Inseneeria ja Arhitektuur (Kontekstitehnika, RAG, Mälu, LoRA, Turvalisus)
3. **🌿 OKSAD** - Rakendamine ja Agendid (AI Agendid, MCP, Keerukuse tasemed)
4. **🍃 LEHED JA VILJAD** - Uuringud ja Trendid (MOE, AGI/ASI, Green AI, Arutlusmudelid)

## ✨ Funktsioonid

### Lightbox Presentatsioonivaade
- **Täismõõtus vaade** - Kliki kaardile, avaneb suur lightbox presentatsiooniks
- **Metafoor + Tehniline** - Mõlemad vaated korraga suures formaadis
- **ESC sulgemiseks** - Vajuta ESC või klõpsa väljaspool
- **Presentatsioonisõbralik** - Ideaalne ekraanijagamiseks ja demoks

### Kolm Vaaterežiimi
1. **Metafoorid** - Lihtsad, kujundlikud selgitused algajatele
2. **Tehniline** - Täpsed tehnilised kirjeldused ekspertidele
3. **Mõlemad** - Näita mõlemat korraga võrdluseks

### Navigatsioon
- **Kokkupandav külgnavigatsioon** - Ava/sulge noolega, alati ekraani ääres
- **Numberdatud tasandid** - 1-Juured → 4-Lehed
- **Sujuv keerimine** - Automaatne snap-to-section
- **Aktiivne jälgimine** - Näitab, millises sektsioonis sa parasjagu oled

## 🚀 Kasutamine

### Jooksuta Arendusrežiimis

```bash
npm run dev
```

Seejärel ava brauseris: `http://localhost:3000/ai-tree`

### Presentation Mode

1. Ava rakendus täisekraanil (F11)
2. Vali sobiv vaaterežiim (Metafoorid/Tehniline/Mõlemad)
3. Kerige läbi tasandite või kasuta külgmist navigatsiooni
4. **Kliki kaardile** → avaneb suur lightbox vaade
5. Presenta lightbox'ist - kõik info selgelt loetav
6. Sule ESC või klõpsates väljaspool

## 📁 Struktuuri Ülevaade

```
app/ai-tree/
├── components/
│   ├── ConceptCard.tsx       # Üksiku kontsepti kaart
│   ├── LevelSection.tsx      # Ühe tasandi sektsioon
│   ├── TreeNavigation.tsx    # Külgmine navigatsioon
│   └── ViewModeToggle.tsx    # Vaaterežiimi lüliti
├── data/
│   └── tree-concepts.json    # Kõik AI kontseptid
├── lib/
│   ├── types.ts              # TypeScript tüübid
│   └── utils.ts              # Abistavad funktsioonid
├── page.tsx                  # Pealehekülg
├── layout.tsx                # Layout wrapper
└── README.md                 # See fail
```

## 🎨 Disain

### Värviskeem
- **Lehed** (Lilla/Violetne `#8b5cf6`) - Uuringud ja trendid
- **Oksad** (Sinine `#3b82f6`) - Rakendused
- **Tüvi** (Pruun `#92400e`) - Inseneeria
- **Juured** (Roheline `#065f46`) - Fundamentaalid

### Tehnoloogiad
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animatsioonid
- **Lucide React** - Ikoonid

## 📝 Sisu Muutmine

Muuda faili `data/tree-concepts.json` et:
- Lisada uusi kontseptsioone
- Muuta olemasolevaid selgitusi
- Uuendada metafoore
- Muuta tasandite kirjeldusi

Formaat:

```json
{
  "id": "unique-id",
  "level": "leaves" | "branches" | "trunk" | "roots",
  "title": "Kontsepti pealkiri",
  "explanation": "Tehniline selgitus",
  "metaphor": "Lihtne metafoor algajatele",
  "icon": "lucide-icon-name",
  "complexity": 1 | 2 | 3
}
```

## 🎯 Kasutamise Näited

### Haridusasutustele
- Kasuta presentatsioonina loengutes
- Üliõpilased saavad iseseisvalt õppida
- Võrrelda metafoore tehnilise sisuga

### Ettevõtetele
- Onboarding uutele töötajatele
- AI kontseptide tutvustamine mitte-tehnilistele osapooltele
- Interaktiivne dokumentatsioon

### Iseõppijatele
- Alusta lehte destpoolt (uusimad trendid)
- Või juurtest (fundamentaalid)
- Lülita režiimide vahel vastavalt oma tasemele

## 🔧 Kohandamine

### Ikooni Muutmine

Ikooni nimi peab olema Lucide React ikoon. Vaata kõiki ikoone: https://lucide.dev/icons/

Muuda `iconMap` objekti failis `components/ConceptCard.tsx`.

### Värvide Muutmine

Muuda värve failides:
- `lib/utils.ts` - Tasandite värvid
- `data/tree-concepts.json` - Põhivärvid konfis

### Animatsioonide Kohandamine

Framer Motion animatsioonid on määratud komponentides. Muuda:
- `initial`, `animate`, `exit` propse
- `transition` konfiguratsioone
- Viivitusi (`delay`)

## 📱 Responsive Design

- **Desktop** (>1024px): Külgmine navigatsioon, 3-veerune grid
- **Tablet** (768-1024px): 2-veerune grid
- **Mobile** (<768px): 1-veerune grid, peidetud külgmine nav

## 🌐 Deployment

Rakendus on staatiline Next.js app ja saab deployda:

- **Vercel** (soovitatud): `vercel deploy`
- **Netlify**: `netlify deploy`
- **Static export**: `npm run build` → deploy `out/` kaust

## 📄 Litsents

See projekt on loodud isiklikuks ja hariduslikuks kasutamiseks.

---

**Loodud spetsialistide tiimi poolt:**
- UX Designer - Kasutajakogemus ja infotearhitektuur
- System Architect - Tehniline arhitektuur ja andmestruktuurid
- Visual Designer - Visuaalne disain ja komponentide süsteem
- Frontend Developer - Implementatsioon ja animatsioonid
