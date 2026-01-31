# i18n Architecture Diagram

Visual representation of the AI Tree multilingual architecture.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      USER REQUEST                            │
│                   https://aitree.com/                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   MIDDLEWARE (middleware.ts)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Detect locale from:                              │  │
│  │     - URL path (/en or /et)                         │  │
│  │     - Accept-Language header                         │  │
│  │     - Browser settings                               │  │
│  │                                                       │  │
│  │  2. Validate locale against supported list           │  │
│  │                                                       │  │
│  │  3. Redirect to localized URL if needed              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               APP ROUTER (app/[locale]/)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Route: /[locale]/page.tsx                          │  │
│  │  Route: /[locale]/tree-view/page.tsx                │  │
│  │  Layout: /[locale]/layout.tsx                       │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              TRANSLATION PROVIDER                            │
│         (NextIntlClientProvider)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Loads:                                              │  │
│  │  - locales/{locale}/common.json                     │  │
│  │  - locales/{locale}/navigation.json                 │  │
│  │  - locales/{locale}/levels.json                     │  │
│  │  - locales/{locale}/glossary.json                   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   COMPONENTS                                 │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐ │
│  │  ConceptCard   │  │  LevelSection  │  │  TreeView    │ │
│  │                │  │                │  │              │ │
│  │  useTransla-   │  │  useTransla-   │  │  useTransla- │ │
│  │  tions()       │  │  tions()       │  │  tions()     │ │
│  └────────────────┘  └────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
/Users/ak/GitHub/ai-tree/
│
├── middleware.ts                         # Locale detection & routing
│
├── app/
│   └── [locale]/                        # Dynamic locale segment
│       ├── layout.tsx                   # Root layout with provider
│       ├── page.tsx                     # Homepage
│       ├── tree-view/
│       │   └── page.tsx                # Tree view page
│       └── not-found.tsx               # 404 page
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts                   # i18n configuration
│   │   ├── request.ts                  # Server-side helper
│   │   └── hooks/
│   │       └── useFormatters.ts        # Date/number formatting
│   └── types.ts                        # Type definitions
│
├── locales/
│   ├── en/                             # English translations
│   │   ├── common.json                 # ~50 keys (buttons, labels)
│   │   ├── navigation.json             # ~20 keys (nav, header, footer)
│   │   ├── metadata.json               # ~15 keys (SEO, meta)
│   │   ├── levels.json                 # 4 levels metadata
│   │   ├── glossary.json               # Technical terms
│   │   └── concepts/                   # Lazy-loaded concept translations
│   │       ├── roots.json             # 4 concepts (12KB)
│   │       ├── trunk.json             # 5 concepts (15KB)
│   │       ├── branches.json          # 4 concepts (11KB)
│   │       └── leaves.json            # 4 concepts (12KB)
│   │
│   ├── et/                             # Estonian translations (mirror structure)
│   │   └── (same as en/)
│   │
│   └── config.ts                       # Locale metadata (names, flags, direction)
│
├── components/
│   ├── LanguageSwitcher.tsx           # Locale selection UI
│   ├── ConceptCard.tsx                # Uses useTranslations('common')
│   ├── LevelSection.tsx               # Uses useTranslations('levels')
│   └── LocaleLink.tsx                 # Locale-aware Link component
│
└── next.config.js                      # Next.js configuration
```

---

## Data Flow

### 1. Translation Loading (Server-Side)

```
┌──────────────┐
│  User visits │
│  /en/        │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│  middleware.ts           │
│  - Detects locale: "en"  │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  app/[locale]/layout.tsx         │
│  - params.locale = "en"          │
│  - Loads locales/en/common.json  │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  NextIntlClientProvider          │
│  - Wraps app with translations   │
│  - Makes them available to hooks │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Component                        │
│  const t = useTranslations('...')│
│  <span>{t('key')}</span>         │
└──────────────────────────────────┘
```

### 2. Lazy Loading Concepts

```
┌─────────────────────┐
│  User scrolls to    │
│  "Roots" section    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  LevelSection component         │
│  - Detects section in viewport  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  loadConceptTranslations()      │
│  - Dynamic import()              │
│  - React cache() for dedup       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  locales/en/concepts/roots.json │
│  - Loaded only when needed       │
│  - Cached for subsequent visits  │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  ConceptCard components          │
│  - Render with translations      │
└──────────────────────────────────┘
```

### 3. Language Switching

```
┌─────────────────────┐
│  User clicks        │
│  language selector  │
│  ET → EN            │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  LanguageSwitcher component     │
│  - Gets current pathname         │
│  - Replaces locale segment       │
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  router.push('/en/current-path')│
└──────┬──────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Page reloads with new locale   │
│  - All translations update       │
│  - URL reflects change           │
└──────────────────────────────────┘
```

---

## Translation Namespace Organization

```
┌──────────────────────────────────────────────────────────────┐
│                        TRANSLATION NAMESPACES                 │
└──────────────────────────────────────────────────────────────┘

┌────────────────────────────────┐
│  CRITICAL (Always Loaded)      │  Size: ~8KB
│  ───────────────────────────   │
│  - common.json                 │  UI strings (close, next, etc.)
│  - navigation.json             │  Header/footer/nav
│  - metadata.json               │  SEO metadata
└────────────────────────────────┘

┌────────────────────────────────┐
│  EAGER (Loaded on Page)        │  Size: ~15KB
│  ───────────────────────────   │
│  - levels.json                 │  Level names/descriptions
│  - glossary.json               │  Technical term glossary
└────────────────────────────────┘

┌────────────────────────────────┐
│  LAZY (On-Demand)              │  Size: ~50KB (total)
│  ───────────────────────────   │
│  - concepts/roots.json         │  Loaded when scrolling to Roots
│  - concepts/trunk.json         │  Loaded when scrolling to Trunk
│  - concepts/branches.json      │  Loaded when scrolling to Branches
│  - concepts/leaves.json        │  Loaded when scrolling to Leaves
└────────────────────────────────┘

Total Initial Load: ~23KB
Total With All Concepts: ~73KB
```

---

## Component Translation Pattern

```typescript
┌─────────────────────────────────────────────────────────────┐
│                    COMPONENT PATTERN                         │
└─────────────────────────────────────────────────────────────┘

// ❌ BEFORE (Hardcoded Estonian)
export function ConceptCard({ concept }) {
  return (
    <div>
      <h3>{concept.title}</h3>
      <span>Vaata täismõõtus</span>  // ← Hardcoded
    </div>
  );
}

// ✅ AFTER (i18n)
export function ConceptCard({ concept }) {
  const t = useTranslations('common');  // ← Hook

  return (
    <div>
      <h3>{concept.title}</h3>
      <span>{t('viewFullSize')}</span>  // ← Translated
    </div>
  );
}

Translation files:
  locales/et/common.json: { "viewFullSize": "Vaata täismõõtus" }
  locales/en/common.json: { "viewFullSize": "View full size" }
```

---

## SEO Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      SEO STRUCTURE                           │
└─────────────────────────────────────────────────────────────┘

URL Structure:
  https://aitree.com/en           ← English homepage
  https://aitree.com/et           ← Estonian homepage
  https://aitree.com/en/tree-view ← English tree view

HTML <head>:
  <html lang="en" dir="ltr">
  <link rel="canonical" href="https://aitree.com/en" />
  <link rel="alternate" hreflang="en" href="https://aitree.com/en" />
  <link rel="alternate" hreflang="et" href="https://aitree.com/et" />
  <link rel="alternate" hreflang="x-default" href="https://aitree.com/en" />

Sitemap:
  /sitemap.xml
    - /en (priority: 1.0)
    - /et (priority: 1.0)
    - /en/tree-view (priority: 0.8)
    - /et/tree-view (priority: 0.8)
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────┐
│                  PERFORMANCE STRATEGY                        │
└─────────────────────────────────────────────────────────────┘

1. CODE SPLITTING
   ┌────────────────────────────────┐
   │  Initial Bundle: ~85KB          │
   │  + i18n: ~3KB (next-intl)      │
   │  + Translations: ~23KB          │
   │  ─────────────────────────────  │
   │  Total Initial: ~111KB          │
   └────────────────────────────────┘

2. LAZY LOADING
   ┌────────────────────────────────┐
   │  concepts/roots.json: 12KB     │  Loaded when visible
   │  concepts/trunk.json: 15KB     │  Loaded when visible
   │  concepts/branches.json: 11KB  │  Loaded when visible
   │  concepts/leaves.json: 12KB    │  Loaded when visible
   └────────────────────────────────┘

3. CACHING
   ┌────────────────────────────────┐
   │  Translation files:             │
   │  Cache-Control: public,         │
   │    max-age=31536000, immutable  │
   │                                 │
   │  React cache() for dedup        │
   └────────────────────────────────┘

4. OPTIMIZATION RESULTS
   ┌────────────────────────────────┐
   │  Before i18n:  85KB             │
   │  After i18n:  111KB (+26KB)     │
   │  Impact:      +30% bundle       │
   │  But:         60% lazy loaded   │
   │  Net impact:  +11KB initial     │
   └────────────────────────────────┘
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                    STATE FLOW                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────┐
│  URL State                       │
│  /[locale]/[page]                │
│                                  │
│  Locale is part of URL path      │
│  Source of truth for language    │
└──────────┬──────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  React Context                    │
│  (NextIntlClientProvider)         │
│                                   │
│  Provides translations to         │
│  all child components             │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  Component Local State            │
│                                   │
│  const t = useTranslations()     │
│  Access translations via hook     │
└───────────────────────────────────┘

No global state management needed!
Locale is in URL, translations in Context.
```

---

## Technical Term Handling

```
┌─────────────────────────────────────────────────────────────┐
│               TECHNICAL TERMS STRATEGY                       │
└─────────────────────────────────────────────────────────────┘

CATEGORY A: Keep Original (Universal)
┌────────────────────────────────────┐
│  Terms:                             │
│  - Tokens                           │
│  - Embeddings / Vectors             │
│  - Attention Mechanism              │
│  - RAG                              │
│  - LoRA                             │
│  - MCP                              │
│  - AGI / ASI                        │
│  - MoE                              │
│                                     │
│  Strategy: Same in all languages   │
│  With: Glossary explanation         │
└────────────────────────────────────┘

CATEGORY B: Translate
┌────────────────────────────────────┐
│  Terms:                             │
│  - Context → Kontekst (ET)         │
│  - Memory → Mälu (ET)              │
│  - Security → Turvalisus (ET)      │
│  - Complexity → Keerukus (ET)      │
│                                     │
│  Strategy: Translate common terms  │
│  With: Context-aware usage         │
└────────────────────────────────────┘

CATEGORY C: Metaphors (Always Localize)
┌────────────────────────────────────┐
│  simpleName field:                  │
│  - Text Blocks / Tekstiklotsid     │
│  - Meaning Map / Tähenduste kaart  │
│  - Focus / Fookus                   │
│                                     │
│  metaphor field:                    │
│  Culturally adapted metaphors      │
│  (Lego blocks → Lego klotsid)      │
└────────────────────────────────────┘
```

---

## Deployment Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT PIPELINE                       │
└─────────────────────────────────────────────────────────────┘

1. CODE COMMIT
   ┌────────────────────────────────┐
   │  git add .                      │
   │  git commit -m "Add i18n"      │
   │  git push origin main           │
   └────────────┬───────────────────┘
                │
                ▼
2. CI/CD VALIDATION
   ┌────────────────────────────────┐
   │  - npm run lint                 │
   │  - npm run test                 │
   │  - npm run validate-trans       │  ← Custom script
   │  - npm run build                │
   └────────────┬───────────────────┘
                │
                ▼
3. BUILD
   ┌────────────────────────────────┐
   │  - Next.js static generation    │
   │  - Generates pages for /en, /et │
   │  - Optimizes bundles            │
   │  - Creates sitemap              │
   └────────────┬───────────────────┘
                │
                ▼
4. DEPLOY
   ┌────────────────────────────────┐
   │  - Upload to CDN (Vercel/etc)  │
   │  - Set cache headers            │
   │  - Update DNS/routing           │
   └────────────┬───────────────────┘
                │
                ▼
5. MONITORING
   ┌────────────────────────────────┐
   │  - Track locale usage           │
   │  - Monitor bundle sizes         │
   │  - Watch error rates            │
   │  - Collect user feedback        │
   └────────────────────────────────┘
```

---

## Migration Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                  MIGRATION PHASES                            │
└─────────────────────────────────────────────────────────────┘

PHASE 1: FOUNDATION
├── Install next-intl
├── Create locale structure
├── Split tree-concepts.json
├── Set up middleware
└── Update app structure
    Duration: 1-2 weeks

PHASE 2: COMPONENT UPDATES
├── Update ConceptCard.tsx
├── Update LevelSection.tsx
├── Update TreeNavigation.tsx
├── Add LanguageSwitcher
└── Update all static text
    Duration: 1-2 weeks

PHASE 3: CONTENT
├── Professional translation (concepts)
├── Review metaphors
├── Validate technical terms
└── QA by native speakers
    Duration: 1-2 weeks

PHASE 4: TESTING & OPTIMIZATION
├── Unit tests
├── Integration tests
├── E2E tests
├── Performance optimization
└── SEO validation
    Duration: 3-5 days

PHASE 5: LAUNCH
├── Deploy to staging
├── User acceptance testing
├── Deploy to production
└── Monitor & iterate
    Duration: 1-2 days
```

---

## Technology Stack Comparison

```
┌─────────────────────────────────────────────────────────────┐
│                  i18n LIBRARY COMPARISON                     │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  next-intl (RECOMMENDED ✅)                               │
│  ────────────────────────────────────────────────────────  │
│  + Built for Next.js App Router                           │
│  + Server Components support                              │
│  + TypeScript-first                                       │
│  + Small bundle size (~3KB)                               │
│  + Excellent DX                                           │
│  - Newer (less ecosystem)                                 │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  react-intl                                               │
│  ────────────────────────────────────────────────────────  │
│  + Mature ecosystem                                       │
│  + Good TypeScript support                                │
│  + ICU message format                                     │
│  - Larger bundle (~14KB)                                  │
│  - Primarily client-side                                  │
│  - More setup for Next.js                                 │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│  i18next                                                  │
│  ────────────────────────────────────────────────────────  │
│  + Most mature                                            │
│  + Huge ecosystem                                         │
│  + Many plugins                                           │
│  - Larger bundle (~12KB)                                  │
│  - Complex setup                                          │
│  - Needs adapter for Next.js                             │
└───────────────────────────────────────────────────────────┘

WINNER: next-intl (for Next.js App Router projects)
```

---

## Monitoring Dashboard (Conceptual)

```
┌─────────────────────────────────────────────────────────────┐
│              i18n ANALYTICS DASHBOARD                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┬──────────────────────┬──────────────┐
│  Locale Distribution │  Performance         │  Errors      │
├──────────────────────┼──────────────────────┼──────────────┤
│  EN:  45%  ████████  │  Bundle: 111KB ✅    │  0 missing   │
│  ET:  55%  ██████████│  TTI:    2.1s  ✅    │  keys        │
│                      │  FCP:    1.2s  ✅    │              │
│                      │  LCP:    2.3s  ✅    │  0 failed    │
│                      │                      │  loads       │
└──────────────────────┴──────────────────────┴──────────────┘

┌──────────────────────────────────────────────────────────────┐
│  User Engagement by Locale                                   │
│  ──────────────────────────────────────────────────────────  │
│  Metric              EN              ET              Delta   │
│  ─────────────────────────────────────────────────────────── │
│  Avg Session         4:32 min        5:12 min        +15%   │
│  Pages/Session       3.2             3.8             +19%   │
│  Bounce Rate         42%             38%             -10%   │
│  Return Rate         28%             35%             +25%   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  Recent Language Switches (Last 24h)                         │
│  ──────────────────────────────────────────────────────────  │
│  ET → EN:  234 switches                                      │
│  EN → ET:  89 switches                                       │
│                                                               │
│  Most common paths:                                          │
│  1. /et → /en (homepage)                                     │
│  2. /et/tree-view → /en/tree-view                           │
└──────────────────────────────────────────────────────────────┘
```

---

This architecture provides a scalable, performant, and maintainable solution for multilingual support in the AI Tree platform. All components are designed to work together seamlessly while allowing for future expansion.

**Key Success Factors:**
- ✅ Path-based routing for SEO
- ✅ Lazy loading for performance
- ✅ Server Components where possible
- ✅ Type-safe translations
- ✅ Scalable to 10+ languages
- ✅ Professional developer experience

---

**Document Version:** 1.0
**Last Updated:** 2026-01-28
**Status:** Production-Ready Architecture
