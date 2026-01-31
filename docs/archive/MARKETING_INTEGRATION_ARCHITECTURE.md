# Marketing Integration Architecture
## AI-Tree + AIKI/AIVO/AIME Landing Pages

> **Created:** 2026-01-30  
> **Purpose:** Integrate marketing landing pages for training programs into ai-tree platform
> **Status:** Proposal

---

## 1. Strategic Vision

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         USER JOURNEY FUNNEL                                 │
│                                                                             │
│   ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌──────────┐ │
│   │             │     │             │     │             │     │          │ │
│   │  DISCOVER   │────▶│   LEARN     │────▶│  INTEREST   │────▶│ CONVERT  │ │
│   │             │     │             │     │             │     │          │ │
│   │  Google/    │     │  AI-Tree    │     │  Program    │     │  Sign up │ │
│   │  Social     │     │  (free)     │     │  Landing    │     │  for     │ │
│   │             │     │             │     │  Pages      │     │  Program │ │
│   └─────────────┘     └─────────────┘     └─────────────┘     └──────────┘ │
│                                                                             │
│   Touchpoints:         DNA View          /programs/aiki     Registration   │
│                        Concept Map       /programs/aivo     Form           │
│                        Demos             /programs/aime     Payment        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Why Integrate into AI-Tree?

| Benefit | Description |
|---------|-------------|
| **Shared Authority** | ai-tree SEO benefits marketing pages |
| **Natural Funnel** | Users already learning → ready to go deeper |
| **Unified Analytics** | Track full journey from free to paid |
| **Component Reuse** | Same design system, less duplication |
| **Trust Building** | Free value first, then conversion |

---

## 2. Program Overview & Pricing

### Single Programs

| Program | Code | Duration | Full Price | Path |
|---------|------|----------|------------|------|
| Rakenduslik AI: Kasutajast Instruktoriks | **AIKI** | 6 weeks (60h) | €1,590 | `/programs/aiki` |
| AI Automatiseerimise Moodul | **AIVO** | 4 weeks (40h) | €1,290 | `/programs/aivo` |

**Separate purchase total: €2,880**

### Graduate Discount

| Variant | Price | Savings |
|---------|-------|---------|  
| AIVO with AIKI certificate | €900 | €390 (30%) |

### Purchase Path Comparison

| Path | Calculation | Total | Savings |
|------|-------------|-------|---------|  
| AIKI + AIVO separately (full) | €1,590 + €1,290 | €2,880 | — |
| AIKI → AIVO with grad discount | €1,590 + €900 | **€2,490** | €390 |
| AIME bundle (upfront) | — | **€2,490** | €390 |

### Installment Plans

| Program | Single | Installments | Fee |
|---------|--------|--------------|-----|
| AIKI | €1,590 | 3 × €563 = €1,689 | +€99 (6%) |
| AIVO | €1,290 | 3 × €460 = €1,380 | +€90 (7%) |
| AIME | €2,490 | 4 × €673 = €2,692 | +€202 (8%) |

### AIME Bundle Benefits

```
AIKI graduate gets AIVO at same price as AIME bundle:
   €1,590 + €900 = €2,490 = AIME

AIME bundle advantage:
   ✓ Guaranteed spot in both programs
   ✓ One registration, one payment
   ✓ 10 weeks continuous, no break
```

### Naming Rationale

```
AIKI  = AI + Koolitaja/Instruktor (AI Instructor)
AIVO  = AI + Võimendus/Automatiseerimine (AI Automation)  
AIME  = AI + Meister (AI Master) - Bundle combining both

All follow AI+XX pattern, Estonian roots, memorable
```

---

## 3. Route Architecture

### 3.1 New Routes

```
app/[locale]/
├── page.tsx                      # Existing: ai-tree home
├── dna/                          # Existing: DNA View
├── tree-view/                    # Existing: Concept Map
├── programs/                     # NEW: Marketing hub
│   ├── page.tsx                  # Programs overview & comparison
│   ├── aiki/
│   │   └── page.tsx              # AIKI landing page
│   ├── aivo/
│   │   └── page.tsx              # AIVO landing page
│   ├── aime/
│   │   └── page.tsx              # AIME bundle landing page
│   └── apply/
│       └── page.tsx              # Application/registration form
└── concept/                      # Existing: Concept details
```

### 3.2 URL Structure

| URL | Purpose |
|-----|---------|  
| `/et/programs` | Programs overview (compare all) |
| `/et/programs/aiki` | AIKI full landing page |
| `/et/programs/aivo` | AIVO full landing page |
| `/et/programs/aime` | AIME bundle landing page |
| `/et/programs/apply?program=aiki` | Application form |
| `/en/programs/...` | English versions |

---

## 4. Component Architecture

### 4.1 New Marketing Components

```
components/
├── programs/                     # NEW folder
│   ├── ProgramHero.tsx           # Hero section with value prop
│   ├── ProgramFeatures.tsx       # Features/benefits grid
│   ├── ProgramCurriculum.tsx     # Curriculum accordion
│   ├── ProgramPricing.tsx        # Pricing card(s)
│   ├── ProgramTimeline.tsx       # Duration/schedule visual
│   ├── ProgramTestimonials.tsx   # Social proof (future)
│   ├── ProgramFAQ.tsx            # FAQ accordion
│   ├── ProgramCTA.tsx            # Call-to-action sections
│   ├── ProgramComparison.tsx     # Compare programs table
│   ├── LeadCaptureForm.tsx       # Email capture / interest form
│   ├── ApplicationForm.tsx       # Full registration form
│   └── index.ts
├── marketing/                    # NEW folder
│   ├── SocialProof.tsx           # Logos, stats, trust badges
│   ├── BenefitCard.tsx           # Individual benefit display
│   ├── PriceTag.tsx              # Price display with discount
│   ├── CountdownTimer.tsx        # Urgency (optional)
│   └── index.ts
└── shared/                       # Shared components
    ├── SectionHeader.tsx         # Reusable section headers
    ├── Container.tsx             # Max-width container
    └── index.ts
```

### 4.2 Landing Page Structure

```tsx
// Typical landing page structure
<ProgramPage>
  <ProgramHero 
    title="AIKI"
    subtitle="Saa AI koolitajaks 6 nädalaga"
    cta="Kandideeri nüüd"
  />
  
  <SocialProof 
    stats={["50+ lõpetajat", "98% soovitab", "4.9/5 hinnang"]}
  />
  
  <ProgramFeatures 
    features={[...]}
  />
  
  <ProgramCurriculum 
    weeks={curriculum}
  />
  
  <ProgramTimeline 
    duration="6 nädalat"
    hours="90 akadeemilist tundi"
    format="Hübriid (online + kohapeal)"
  />
  
  <ProgramPricing 
    price={1590}
    currency="EUR"
    discount={earlyBird ? 200 : 0}
  />
  
  <ProgramFAQ 
    questions={faq}
  />
  
  <ProgramCTA 
    primary="Kandideeri"
    secondary="Lae alla õppekava"
  />
</ProgramPage>
```

---

## 5. Data Architecture

### 5.1 Program Data Structure

```typescript
// lib/programs/types.ts

export interface Program {
  id: 'aiki' | 'aivo' | 'aime' | 'automation';
  slug: string;
  name: {
    et: string;
    en: string;
  };
  tagline: {
    et: string;
    en: string;
  };
  description: {
    et: string;
    en: string;
  };
  duration: {
    weeks: number;
    hours: number;
    format: 'online' | 'hybrid' | 'in-person';
  };
  pricing: {
    price: number;
    currency: 'EUR';
    earlyBirdDiscount?: number;
    bundleDiscount?: number;
    graduateDiscount?: number;
  };
  features: ProgramFeature[];
  curriculum: CurriculumWeek[];
  prerequisites: string[];
  outcomes: string[];
  targetAudience: string[];
  startDates: Date[];
  maxParticipants: number;
  certificate: {
    type: 'micro-credential' | 'certificate';
    accreditation?: string;
  };
}

export interface ProgramFeature {
  icon: string;
  title: { et: string; en: string };
  description: { et: string; en: string };
}

export interface CurriculumWeek {
  week: number;
  title: { et: string; en: string };
  topics: { et: string[]; en: string[] };
  hours: number;
  type: 'group' | 'self-study' | 'practice';
}
```

### 5.2 Program Data Files

```
data/
├── programs/
│   ├── aiki.json                 # AIKI program data
│   ├── aivo.json                 # AIVO program data
│   ├── aime.json                 # AIME bundle data
│   ├── automation.json           # Automation module data
│   └── index.ts                  # Export all programs
└── tree-concepts.json            # Existing
```

### 5.3 Supabase Tables (New)

```sql
-- Program interest/leads
CREATE TABLE program_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id),
    program_id TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    company TEXT,
    message TEXT,
    source TEXT,                   -- 'landing', 'popup', 'dna-cta'
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new'      -- 'new', 'contacted', 'enrolled', 'declined'
);

-- Program page views (marketing analytics)
CREATE TABLE program_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES learning_sessions(id),
    program_id TEXT NOT NULL,
    page_section TEXT,             -- 'hero', 'pricing', 'curriculum', 'cta'
    time_on_section INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Application submissions
CREATE TABLE program_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES program_leads(id),
    program_id TEXT NOT NULL,
    
    -- Personal info
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    
    -- Background
    current_role TEXT,
    company TEXT,
    experience_level TEXT,         -- 'beginner', 'intermediate', 'advanced'
    motivation TEXT,
    
    -- Preferences
    preferred_start_date DATE,
    payment_method TEXT,           -- 'full', 'installments', 'company'
    
    -- Status
    status TEXT DEFAULT 'submitted', -- 'submitted', 'reviewing', 'accepted', 'enrolled', 'declined'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    notes TEXT
);

-- Enable RLS
ALTER TABLE program_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_applications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow insert" ON program_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON program_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert" ON program_applications FOR INSERT WITH CHECK (true);
```

---

## 6. CTA Integration in AI-Tree

### 6.1 Strategic CTA Placements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   AI-TREE INTERFACE WITH CTA PLACEMENTS                                     │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Header                                        [Programs ▼]         │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   DNA View / Concept Map                                            │   │
│   │                                                                     │   │
│   │   After completing DNA:                                             │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ 🎓 Tahad õpetada teisi? Vaata AIKI programmi →              │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   │   After automation concepts:                                        │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │ ⚡ Automatiseeri oma töövood! Vaata AIVO programmi →         │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                     │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Footer                                                             │   │
│   │  [AIKI] [AIVO] [AIME] [Meist] [Kontakt]                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Contextual CTA Logic

```typescript
// lib/cta/getCTA.ts

interface CTAContext {
  completedConcepts: string[];
  completedDNA: ('T' | 'V' | 'A' | 'P')[];
  currentPage: string;
  timeOnSite: number;
  locale: 'et' | 'en';
}

export function getRelevantCTA(context: CTAContext): CTA | null {
  // After completing DNA → suggest AIKI (teach others)
  if (context.completedDNA.length >= 4) {
    return {
      program: 'aiki',
      message: {
        et: 'Oled AI põhitõed selgeks saanud! Tahad teisi õpetada?',
        en: 'You\'ve mastered AI basics! Want to teach others?'
      },
      cta: { et: 'Vaata AIKI programmi', en: 'View AIKI program' }
    };
  }
  
  // After automation-related concepts → suggest AIVO
  const automationConcepts = ['ai-agents', 'mcp', 'function-calling'];
  const hasAutomation = automationConcepts.some(c => 
    context.completedConcepts.includes(c)
  );
  
  if (hasAutomation) {
    return {
      program: 'aivo',
      message: {
        et: 'Huvitab automatiseerimine? Õpi praktilisi oskusi!',
        en: 'Interested in automation? Learn practical skills!'
      },
      cta: { et: 'Vaata AIVO programmi', en: 'View AIVO program' }
    };
  }
  
  // Long-time user (>10 min) → suggest bundle
  if (context.timeOnSite > 600) {
    return {
      program: 'aime',
      message: {
        et: 'Tõsine huvi AI vastu? AIME pakett annab täieliku ettevalmistuse!',
        en: 'Serious about AI? AIME bundle gives complete preparation!'
      },
      cta: { et: 'Vaata AIME paketti', en: 'View AIME bundle' }
    };
  }
  
  return null;
}
```

---

## 7. i18n Structure

### 7.1 New Message Keys

```json
// messages/et.json - add to existing
{
  "programs": {
    "nav": {
      "title": "Programmid",
      "overview": "Kõik programmid",
      "aiki": "AIKI - AI Koolitaja",
      "aivo": "AIVO - AI Automatiseerimine",
      "aime": "AIME - Meistripakett",
      "automation": "Automatiseerimise moodul"
    },
    "common": {
      "duration": "Kestus",
      "price": "Hind",
      "startDate": "Algus",
      "apply": "Kandideeri",
      "download": "Lae alla õppekava",
      "learnMore": "Loe lähemalt",
      "weeks": "nädalat",
      "hours": "akadeemilist tundi",
      "earlyBird": "Varajase broneeringu soodustus",
      "limited": "Piiratud kohtade arv",
      "certificate": "Tunnistus",
      "format": "Formaat"
    },
    "overview": {
      "title": "AI Koolitusprogrammid",
      "subtitle": "Vali endale sobiv tee AI valdkonda",
      "compare": "Võrdle programme"
    },
    "aiki": {
      "title": "AIKI",
      "fullName": "AI Koolitaja Programm",
      "tagline": "Saa AI koolitajaks 6 nädalaga",
      "description": "Põhjalik programm neile, kes soovivad...",
      "features": { ... },
      "curriculum": { ... },
      "faq": { ... }
    },
    "aivo": {
      "title": "AIVO",
      "fullName": "AI Automatiseerimise Programm",
      "tagline": "Automatiseeri töövood AI-ga",
      "description": "Praktiline programm...",
      ...
    },
    "aime": {
      "title": "AIME",
      "fullName": "AI Meistripakett",
      "tagline": "Täielik AI kompetents",
      "description": "AIKI + AIVO ühes paketis...",
      "savings": "Säästad {amount}€ võrreldes eraldi ostmisega",
      ...
    },
    "apply": {
      "title": "Kandideeri programmile",
      "subtitle": "Täida vorm ja võtame sinuga ühendust",
      "fields": { ... },
      "submit": "Saada avaldus",
      "success": "Avaldus saadetud! Võtame ühendust 24h jooksul."
    },
    "cta": {
      "afterDNA": "Tahad õpetada teisi?",
      "afterAutomation": "Automatiseeri oma töövood!",
      "general": "Vii oma AI oskused järgmisele tasemele"
    }
  }
}
```

---

## 8. SEO & Meta Tags

### 8.1 Program Page Meta

```typescript
// app/[locale]/programs/aiki/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  
  return {
    title: locale === 'et' 
      ? 'AIKI - AI Koolitaja Programm | Ettevõtluskeskus'
      : 'AIKI - AI Instructor Program | Ettevõtluskeskus',
    description: locale === 'et'
      ? 'Saa AI koolitajaks 6 nädalaga. 90 akadeemilist tundi, praktiline õpe, tunnistus.'
      : 'Become an AI instructor in 6 weeks. 90 academic hours, practical learning, certificate.',
    openGraph: {
      title: 'AIKI - AI Koolitaja Programm',
      description: 'Saa AI koolitajaks 6 nädalaga',
      images: ['/og/aiki.png'],
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}/programs/aiki`,
      languages: {
        'et': '/et/programs/aiki',
        'en': '/en/programs/aiki',
      },
    },
  };
}
```

### 8.2 Structured Data (JSON-LD)

```typescript
// Course schema for Google
const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AIKI - AI Koolitaja Programm",
  "description": "Saa AI koolitajaks 6 nädalaga",
  "provider": {
    "@type": "Organization",
    "name": "Ettevõtluskeskus OÜ",
    "url": "https://ettevotluskeskus.ee"
  },
  "offers": {
    "@type": "Offer",
    "price": "1590",
    "priceCurrency": "EUR"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "blended",
    "duration": "P6W"
  }
};
```

---

## 9. Implementation Plan

### Phase 1: Foundation (Week 1) - 20h
| Task | Effort | Priority |
|------|--------|----------|
| Create route structure | 4h | P0 |
| Create program data files (JSON) | 6h | P0 |
| Add Supabase tables | 2h | P0 |
| Add i18n keys | 4h | P0 |
| Create base components | 4h | P0 |

### Phase 2: Landing Pages (Week 2) - 30h
| Task | Effort | Priority |
|------|--------|----------|
| Programs overview page | 6h | P0 |
| AIKI landing page | 8h | P0 |
| AIVO landing page | 6h | P0 |
| AIME bundle page | 6h | P1 |
| Automation module page | 4h | P1 |

### Phase 3: Forms & Tracking (Week 3) - 20h
| Task | Effort | Priority |
|------|--------|----------|
| Lead capture form | 4h | P0 |
| Application form | 6h | P0 |
| Analytics integration | 4h | P1 |
| UTM tracking | 2h | P1 |
| Email notifications | 4h | P2 |

### Phase 4: Integration (Week 4) - 15h
| Task | Effort | Priority |
|------|--------|----------|
| CTA components in ai-tree | 6h | P1 |
| Header navigation update | 2h | P1 |
| Footer links | 2h | P1 |
| Contextual CTA logic | 5h | P2 |

---

## 10. Visual Design Guidelines

### 10.1 Program Colors

```css
:root {
  /* Program brand colors */
  --aiki-primary: #6366f1;      /* Indigo - education/teaching */
  --aiki-secondary: #818cf8;
  
  --aivo-primary: #10b981;      /* Emerald - automation/efficiency */
  --aivo-secondary: #34d399;
  
  --aime-primary: #8b5cf6;      /* Violet - premium/mastery */
  --aime-secondary: #a78bfa;
  
  --automation-primary: #f59e0b; /* Amber - tools/building */
  --automation-secondary: #fbbf24;
}
```

### 10.2 Landing Page Sections

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  HERO (full viewport)                                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Program Logo/Name                                                   │   │
│  │  Tagline (big, bold)                                                 │   │
│  │  Key stats: Duration | Hours | Price                                 │   │
│  │  [Primary CTA] [Secondary CTA]                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  SOCIAL PROOF                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  "50+ lõpetajat"   "98% soovitab"   "4.9/5 hinnang"                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PROBLEM/SOLUTION                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  "Kas tunned, et..." → "AIKI annab sulle..."                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FEATURES (3-4 cards)                                                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                           │
│  │ Feature │ │ Feature │ │ Feature │ │ Feature │                           │
│  │    1    │ │    2    │ │    3    │ │    4    │                           │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘                           │
│                                                                             │
│  CURRICULUM (expandable weeks)                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Week 1: Introduction to AI Training     [+]                        │   │
│  │  Week 2: T-V-A-P Model Deep Dive         [+]                        │   │
│  │  Week 3: ...                             [+]                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PRICING                                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │              ┌─────────────────────┐                                │   │
│  │              │  €1,590             │                                │   │
│  │              │  Early bird: €1,390 │                                │   │
│  │              │  [Kandideeri]       │                                │   │
│  │              └─────────────────────┘                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FAQ (accordion)                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Q: Kas on eeltingimusi?                                            │   │
│  │  Q: Milline on tunnistus?                                           │   │
│  │  Q: Kas saan maksta osadena?                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FINAL CTA                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  "Valmis alustama?"                                                  │   │
│  │  [Kandideeri nüüd]  [Lae alla õppekava]                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 11. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page views → Lead conversion | >5% | Supabase analytics |
| Lead → Application conversion | >30% | Application form |
| Application → Enrollment | >50% | Manual tracking |
| ai-tree user → Program interest | >2% | CTA click tracking |
| Time on landing page | >2 min | Analytics |
| Curriculum download rate | >15% | Download tracking |

---

## 12. Next Steps

1. **Review this architecture** with stakeholders
2. **Create program JSON data** from existing curricula
3. **Design landing page mockups** (Figma/code)
4. **Implement Phase 1** foundation
5. **Iterate based on feedback**

---

*"Free learning builds trust. Paid programs build careers."*
