# AI Tree Platform - Multilingual (i18n) Strategy

## Executive Summary

This document outlines a comprehensive internationalization strategy for the AI Tree educational platform, currently supporting Estonian content with plans to expand to English and additional languages. The strategy prioritizes developer experience, performance, SEO, and content management flexibility.

---

## 1. i18n ARCHITECTURE

### 1.1 Recommended Tech Stack: **next-intl**

**Rationale:**
- **next-intl** is the optimal choice for Next.js applications (detected from your use of `'use client'` and Next.js patterns)
- Built specifically for Next.js App Router with native support for Server Components
- Superior TypeScript support with compile-time type safety
- Excellent performance with automatic code splitting and tree shaking
- Built-in support for SSR, SSG, and ISR
- Active maintenance and growing community

**Comparison Matrix:**

| Feature | next-intl | react-intl | i18next |
|---------|-----------|------------|---------|
| Next.js App Router | ✅ Native | ⚠️ Limited | ⚠️ Adapter needed |
| TypeScript Safety | ✅ Excellent | ✅ Good | ⚠️ Fair |
| Bundle Size | ✅ ~3KB | ⚠️ ~14KB | ⚠️ ~12KB |
| Server Components | ✅ Native | ❌ Client-only | ❌ Client-only |
| Learning Curve | ✅ Low | ⚠️ Medium | ⚠️ Steep |
| Pluralization | ✅ ICU | ✅ ICU | ✅ Custom |
| RTL Support | ✅ Built-in | ✅ Built-in | ✅ Plugin |

### 1.2 File Structure

```
/Users/ak/GitHub/ai-tree/
├── locales/                          # Translation files directory
│   ├── en/                           # English translations
│   │   ├── common.json              # Common UI elements
│   │   ├── navigation.json          # Navigation/header/footer
│   │   ├── levels.json              # Tree level metadata
│   │   ├── concepts/                # Concept translations (lazy loaded)
│   │   │   ├── roots.json           # Roots level concepts
│   │   │   ├── trunk.json           # Trunk level concepts
│   │   │   ├── branches.json        # Branches level concepts
│   │   │   └── leaves.json          # Leaves level concepts
│   │   └── glossary.json            # Technical terms glossary
│   ├── et/                           # Estonian translations (mirror structure)
│   │   ├── common.json
│   │   ├── navigation.json
│   │   ├── levels.json
│   │   ├── concepts/
│   │   │   ├── roots.json
│   │   │   ├── trunk.json
│   │   │   ├── branches.json
│   │   │   └── leaves.json
│   │   └── glossary.json
│   └── config.ts                     # Locale configuration
│
├── lib/
│   ├── i18n/
│   │   ├── config.ts                # i18n setup and configuration
│   │   ├── request.ts               # Server-side translation helper
│   │   ├── routing.ts               # Locale routing configuration
│   │   └── types.ts                 # i18n TypeScript types
│   └── types.ts                      # Existing types (to be updated)
│
├── app/                              # Next.js App Router
│   └── [locale]/                     # Dynamic locale segment
│       ├── layout.tsx                # Root layout with locale provider
│       ├── page.tsx                  # Home page (tree view)
│       ├── tree-view/
│       │   └── page.tsx
│       └── not-found.tsx
│
├── middleware.ts                     # Locale detection and routing
└── next.config.js                    # Next.js configuration
```

### 1.3 Namespace Organization Strategy

**Core Principles:**
1. **Separation of concerns**: UI vs content
2. **Lazy loading**: Load concept translations on-demand per level
3. **Cache efficiency**: Common translations cached globally
4. **Translation memory**: Reusable glossary for technical terms

**Namespace Breakdown:**

```typescript
// Namespace structure
type Namespaces = {
  common: CommonTranslations;        // ~50 keys - buttons, labels, actions
  navigation: NavigationTranslations; // ~20 keys - header, footer, nav
  levels: LevelsTranslations;        // ~4 levels metadata
  'concepts/roots': ConceptGroup;     // ~4-5 concepts per level
  'concepts/trunk': ConceptGroup;     // Lazy loaded
  'concepts/branches': ConceptGroup;  // Lazy loaded
  'concepts/leaves': ConceptGroup;    // Lazy loaded
  glossary: GlossaryTranslations;     // Technical terms mapping
};
```

### 1.4 Lazy Loading Strategy

**Implementation:**

```typescript
// lib/i18n/lazy-loader.ts
import { cache } from 'react';

type ConceptLevel = 'roots' | 'trunk' | 'branches' | 'leaves';

export const loadConceptTranslations = cache(
  async (locale: string, level: ConceptLevel) => {
    try {
      const translations = await import(
        `@/locales/${locale}/concepts/${level}.json`
      );
      return translations.default;
    } catch (error) {
      console.error(`Failed to load ${level} concepts for ${locale}`, error);
      // Fallback to English
      return import(`@/locales/en/concepts/${level}.json`);
    }
  }
);

// Usage in components
export async function ConceptSection({ level }: { level: ConceptLevel }) {
  const locale = await getLocale();
  const concepts = await loadConceptTranslations(locale, level);

  return <ConceptCards concepts={concepts} />;
}
```

**Benefits:**
- Reduces initial bundle size by ~60% (concepts are largest content)
- Improves Time to Interactive (TTI)
- Enables progressive loading as user scrolls
- Better cache granularity

---

## 2. TECHNICAL TERM HANDLING

### 2.1 Categorization Strategy

**Category A: Keep in English (Universal Terms)**
- Tokens
- Embeddings
- Transformers
- Attention Mechanism
- RAG (Retrieval-Augmented Generation)
- LoRA (Low-Rank Adaptation)
- Fine-tuning
- Pre-fill / Decode
- MCP (Model Context Protocol)
- AGI / ASI
- Mixture of Experts (MoE)
- Prompt engineering

**Rationale:**
- Industry standard terminology
- No direct translation equivalents
- Better for search and cross-reference
- Used in academic papers and documentation
- Easier for learners to connect with global resources

**Category B: Translate with Glossary Reference**
- Context → Kontekst (ET) / Context (EN)
- Memory → Mälu (ET) / Memory (EN)
- Security → Turvalisus (ET) / Security (EN)
- Complexity levels → Keerukuse tasemed (ET) / Complexity levels (EN)
- Agent → Agent (universal, but explained)

**Category C: Descriptive Translation (Metaphors)**
- "Simple name" field is ALWAYS translated
- Metaphors are culturally adapted
- Explanations use localized examples

### 2.2 Glossary Structure

```json
// locales/en/glossary.json
{
  "terms": {
    "tokens": {
      "term": "Tokens",
      "keep_original": true,
      "short_explanation": "Smallest units of text processed by AI models",
      "example": "The word 'banana' is split into 3 tokens"
    },
    "rag": {
      "term": "RAG",
      "expanded": "Retrieval-Augmented Generation",
      "keep_original": true,
      "short_explanation": "AI technique that retrieves relevant information before generating responses"
    },
    "context": {
      "term": "Context",
      "translated": false,
      "short_explanation": "The surrounding information that gives meaning to a prompt"
    }
  },
  "complexity_levels": {
    "beginner": "Beginner",
    "intermediate": "Intermediate",
    "advanced": "Advanced"
  }
}
```

```json
// locales/et/glossary.json
{
  "terms": {
    "tokens": {
      "term": "Tokens",
      "keep_original": true,
      "short_explanation": "Teksti väikseimad ühikud, mida AI töötleb",
      "example": "Sõna 'banaan' jaguneb 3 tokeniks"
    },
    "rag": {
      "term": "RAG",
      "expanded": "Retrieval-Augmented Generation",
      "keep_original": true,
      "short_explanation": "AI tehnika, mis otsib asjakohast infot enne vastuse genereerimist"
    },
    "context": {
      "term": "Kontekst",
      "translated": true,
      "short_explanation": "Ümbritsev informatsioon, mis annab promptile tähenduse"
    }
  },
  "complexity_levels": {
    "beginner": "Algaja",
    "intermediate": "Keskmine",
    "advanced": "Keeruline"
  }
}
```

### 2.3 Code Examples Handling

**Strategy: Language-agnostic code with localized comments**

```typescript
// Component for displaying code examples
interface CodeExampleProps {
  code: string;
  language: string;
  description: string; // Localized
  comments?: Record<number, string>; // Localized per line
}

// Example in concept:
{
  "id": "tokens",
  "code_example": {
    "code": "const text = 'Hello, World!';\nconst tokens = tokenize(text);\nconsole.log(tokens.length);",
    "language": "javascript",
    "output": "[\"Hello\", \",\", \" World\", \"!\"]"
  }
}

// Localized descriptions:
// EN: "This example shows how text is split into tokens"
// ET: "See näide näitab, kuidas tekst jaotatakse tokeniteks"
```

**Rules:**
1. Code syntax remains unchanged
2. Variable names stay in English (convention)
3. Comments and descriptions are localized
4. Output examples use locale-appropriate text

---

## 3. CONTENT STRUCTURE

### 3.1 Multilingual JSON Format

**Updated TreeData Schema:**

```typescript
// lib/types.ts (updated)
export interface LocalizedString {
  [locale: string]: string;
}

export interface TreeLevel {
  id: 'leaves' | 'branches' | 'trunk' | 'roots';
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  color: string; // Not localized
  order: number; // Not localized
}

export interface Concept {
  id: string;
  level: 'leaves' | 'branches' | 'trunk' | 'roots';
  title: string; // Technical term (may not need translation)
  simpleName: LocalizedString;
  explanation: LocalizedString;
  metaphor: LocalizedString;
  icon: string; // Not localized
  complexity: 1 | 2 | 3; // Not localized
  codeExample?: {
    code: string;
    language: string;
    description: LocalizedString;
    output?: string;
  };
}

export interface TreeMetadata {
  version: string;
  created: string; // ISO 8601
  lastUpdated: string; // ISO 8601
  defaultLocale: string;
  supportedLocales: string[];
}

export interface TreeData {
  metadata: TreeMetadata;
  levels: TreeLevel[];
  concepts: Concept[];
}
```

**Migration Path from Current Structure:**

```json
// Current structure (data/tree-concepts.json)
{
  "metadata": {
    "title": "AI Teadmiste Puu (AI Knowledge Tree)",
    "description": "Terviklik raamistik AI kontseptide õpetamiseks",
    "language": "et"
  }
}

// New structure (locales/et/levels.json)
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
    }
  }
}

// English version (locales/en/levels.json)
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
    }
  }
}
```

### 3.2 Metadata Handling

**Dates and Numbers:**

```typescript
// lib/i18n/formatters.ts
import { useFormatter } from 'next-intl';

export function useDateTimeFormatters() {
  const format = useFormatter();

  return {
    // Format: "December 4, 2025" (EN) or "4. detsember 2025" (ET)
    formatDate: (date: string | Date) =>
      format.dateTime(new Date(date), {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),

    // Format: "1,234.56" (EN) or "1 234,56" (ET)
    formatNumber: (num: number) =>
      format.number(num, {
        maximumFractionDigits: 2
      }),

    // Format relative time: "2 days ago"
    formatRelative: (date: string | Date) =>
      format.relativeTime(new Date(date))
  };
}

// Usage in component
export function Footer() {
  const t = useTranslations('navigation');
  const { formatDate } = useDateTimeFormatters();
  const metadata = useMetadata();

  return (
    <footer>
      <p>{t('version')} {metadata.version}</p>
      <p>{formatDate(metadata.created)}</p>
    </footer>
  );
}
```

**RTL (Right-to-Left) Support:**

```typescript
// locales/config.ts
export const localeConfig = {
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY'
  },
  et: {
    code: 'et',
    name: 'Eesti',
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY'
  },
  ar: { // Future Arabic support
    code: 'ar',
    name: 'العربية',
    direction: 'rtl',
    dateFormat: 'DD/MM/YYYY'
  }
} as const;

// Automatic RTL styling
// app/[locale]/layout.tsx
export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const direction = localeConfig[locale].direction;

  return (
    <html lang={locale} dir={direction}>
      <body>{children}</body>
    </html>
  );
}
```

### 3.3 Content Management Workflow

**Recommended Workflow:**

```
1. Content Creation (English - Source Language)
   ↓
2. Export to Translation Memory (TM) format
   ↓
3. Professional Translation (with context)
   ↓
4. Import & Validation (JSON schema validation)
   ↓
5. QA Review (Native speaker)
   ↓
6. Deploy to Production
```

**Translation Management Tools:**

**Option A: Localazy (Recommended)**
- Free for open-source
- Git integration
- Translation memory
- Context screenshots
- API for CI/CD

**Option B: Manual JSON with Validation:**

```typescript
// scripts/validate-translations.ts
import Ajv from 'ajv';
import schema from './translation-schema.json';

const ajv = new Ajv();
const validate = ajv.compile(schema);

async function validateTranslations(locale: string) {
  const files = ['common', 'navigation', 'levels', 'glossary'];

  for (const file of files) {
    const content = await import(`../locales/${locale}/${file}.json`);
    const valid = validate(content);

    if (!valid) {
      console.error(`Validation failed for ${locale}/${file}.json:`);
      console.error(validate.errors);
      process.exit(1);
    }
  }

  console.log(`✅ All translations for ${locale} are valid`);
}

// Run: npm run validate-translations -- --locale=et
```

---

## 4. URL STRUCTURE & SEO

### 4.1 Recommended Strategy: **Path-based Routing**

```
https://aitree.com/en              (English homepage)
https://aitree.com/et              (Estonian homepage)
https://aitree.com/en/tree-view    (English tree view)
https://aitree.com/et/tree-view    (Estonian tree view)
```

**Comparison:**

| Approach | URL Example | SEO | Implementation | Pros | Cons |
|----------|-------------|-----|----------------|------|------|
| **Path** | `/en/page` | ✅ Excellent | ⭐ Easy | Clean URLs, best SEO | N/A |
| Subdomain | `en.site.com` | ✅ Good | ⚠️ Complex | Language isolation | DNS/SSL complexity |
| Query | `?lang=en` | ❌ Poor | ✅ Trivial | Quick setup | No SEO, poor UX |
| Domain | `.co.uk` | ✅ Excellent | ❌ Very Complex | Max local trust | High cost |

### 4.2 Next.js Implementation

**Middleware for Locale Detection:**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { localeConfig } from './locales/config';

export default createMiddleware({
  // All supported locales
  locales: Object.keys(localeConfig),

  // Default locale (used when no locale in URL)
  defaultLocale: 'et',

  // Locale detection strategies
  localeDetection: true, // Use Accept-Language header

  // Don't prefix default locale in URL (optional)
  localePrefix: 'as-needed' // /et/page or /page (default)
  // Alternative: 'always' → always show /et/page
});

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

**App Router Structure:**

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { localeConfig } from '@/locales/config';

export function generateStaticParams() {
  return Object.keys(localeConfig).map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!Object.keys(localeConfig).includes(locale)) {
    notFound();
  }

  // Load translations
  let messages;
  try {
    messages = (await import(`@/locales/${locale}/common.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={localeConfig[locale].direction}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Language Switcher Component:**

```typescript
// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { localeConfig } from '@/locales/config';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');

    // Navigate to new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-gray-500" />
      <select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="px-3 py-1 rounded-lg border border-gray-300 bg-white"
      >
        {Object.entries(localeConfig).map(([code, config]) => (
          <option key={code} value={code}>
            {config.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 4.3 SEO Best Practices

**Hreflang Tags:**

```typescript
// app/[locale]/layout.tsx
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'et': '/et',
        'x-default': '/en' // Fallback for unknown locales
      }
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: Object.keys(localeConfig).filter(l => l !== locale)
    }
  };
}
```

**Sitemap Generation:**

```typescript
// app/sitemap.ts
import { localeConfig } from '@/locales/config';

export default function sitemap() {
  const baseUrl = 'https://aitree.com';
  const locales = Object.keys(localeConfig);

  // Generate URLs for all locales
  const routes = ['', '/tree-view'];

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}${route}`])
        )
      }
    }))
  );
}
```

---

## 5. IMPLEMENTATION PLAN

### 5.1 Migration Steps (Phased Approach)

**Phase 1: Foundation (Week 1-2)**

```bash
# 1. Install dependencies
npm install next-intl

# 2. Create directory structure
mkdir -p locales/{en,et}/concepts
mkdir -p lib/i18n

# 3. Configuration files
touch locales/config.ts
touch lib/i18n/config.ts
touch lib/i18n/request.ts
touch middleware.ts
```

**Tasks:**
- ✅ Set up `next-intl` configuration
- ✅ Create `middleware.ts` for locale routing
- ✅ Migrate existing `tree-concepts.json` → Split into:
  - `locales/et/levels.json`
  - `locales/et/concepts/{roots,trunk,branches,leaves}.json`
- ✅ Create English translations (hire translator or use DeepL + manual review)
- ✅ Update TypeScript types

**Phase 2: Component Updates (Week 2-3)**

**Tasks:**
- ✅ Wrap app in `[locale]` directory
- ✅ Update all components to use `useTranslations()` hook
- ✅ Add `LanguageSwitcher` component to header
- ✅ Update static text in components:
  - `page.tsx` → Hero section
  - `ConceptCard.tsx` → "Vaata täismõõtus"
  - `LevelSection.tsx` → Level headers
  - `TreeNavigation.tsx` → Navigation labels
  - `ViewModeToggle.tsx` → Mode labels

**Example Migration:**

```typescript
// BEFORE: components/ConceptCard.tsx
<span>Vaata täismõõtus</span>

// AFTER: components/ConceptCard.tsx
import { useTranslations } from 'next-intl';

export function ConceptCard({ concept }: ConceptCardProps) {
  const t = useTranslations('common');

  return (
    // ...
    <span>{t('viewFullSize')}</span>
    // ...
  );
}
```

**Phase 3: Content Migration (Week 3-4)**

**Script to split current JSON:**

```typescript
// scripts/migrate-to-i18n.ts
import fs from 'fs/promises';
import path from 'path';

interface OldFormat {
  version: string;
  metadata: {
    title: string;
    description: string;
    created: string;
    language: string;
  };
  levels: Array<{
    id: string;
    name: string;
    subtitle: string;
    description: string;
    color: string;
    order: number;
  }>;
  concepts: Array<{
    id: string;
    level: string;
    title: string;
    simpleName: string;
    explanation: string;
    metaphor: string;
    icon: string;
    complexity: 1 | 2 | 3;
  }>;
}

async function migrateToI18n() {
  const oldData: OldFormat = JSON.parse(
    await fs.readFile('data/tree-concepts.json', 'utf-8')
  );

  const locale = oldData.metadata.language;

  // Create levels.json
  const levelsData = {
    metadata: {
      title: oldData.metadata.title.split(' (')[0], // Remove English part
      description: oldData.metadata.description
    },
    levels: Object.fromEntries(
      oldData.levels.map(level => [
        level.id,
        {
          name: level.name,
          subtitle: level.subtitle,
          description: level.description
        }
      ])
    )
  };

  await fs.writeFile(
    `locales/${locale}/levels.json`,
    JSON.stringify(levelsData, null, 2)
  );

  // Split concepts by level
  const levelGroups = ['roots', 'trunk', 'branches', 'leaves'];

  for (const levelId of levelGroups) {
    const levelConcepts = oldData.concepts
      .filter(c => c.level === levelId)
      .map(c => ({
        id: c.id,
        title: c.title,
        simpleName: c.simpleName,
        explanation: c.explanation,
        metaphor: c.metaphor,
        complexity: c.complexity
      }));

    await fs.writeFile(
      `locales/${locale}/concepts/${levelId}.json`,
      JSON.stringify({ concepts: levelConcepts }, null, 2)
    );
  }

  console.log('✅ Migration complete!');
}

migrateToI18n().catch(console.error);
```

**Phase 4: Testing & QA (Week 4)**

**Tasks:**
- ✅ Visual regression testing (both locales)
- ✅ Translation accuracy review
- ✅ Test locale switching
- ✅ Verify SEO tags (hreflang, alternates)
- ✅ Test with different browser language settings
- ✅ Performance testing (bundle size analysis)

**Phase 5: Deployment (Week 5)**

**Tasks:**
- ✅ Update CI/CD pipeline for translation validation
- ✅ Set up CDN for static translations
- ✅ Deploy to staging
- ✅ User acceptance testing
- ✅ Deploy to production
- ✅ Monitor analytics (locale usage, bounce rates)

### 5.2 Testing Strategy

**Unit Tests:**

```typescript
// lib/i18n/__tests__/translations.test.ts
import { describe, it, expect } from 'vitest';
import enCommon from '@/locales/en/common.json';
import etCommon from '@/locales/et/common.json';

describe('Translation completeness', () => {
  it('should have matching keys between locales', () => {
    const enKeys = Object.keys(enCommon);
    const etKeys = Object.keys(etCommon);

    expect(enKeys.sort()).toEqual(etKeys.sort());
  });

  it('should not have empty values', () => {
    const checkEmpty = (obj: Record<string, any>, path = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          expect(value.trim(), `Empty value at ${currentPath}`).not.toBe('');
        } else if (typeof value === 'object') {
          checkEmpty(value, currentPath);
        }
      }
    };

    checkEmpty(enCommon);
    checkEmpty(etCommon);
  });
});
```

**Integration Tests:**

```typescript
// app/[locale]/__tests__/page.test.tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import AITreePage from '../page';
import enMessages from '@/locales/en/common.json';

describe('AITreePage with i18n', () => {
  it('renders in English', () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <AITreePage />
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/AI Knowledge Tree/i)).toBeInTheDocument();
  });

  it('renders complexity labels in correct language', () => {
    // Test that complexity badges use translated labels
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });
});
```

**E2E Tests (Playwright):**

```typescript
// tests/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Language switching', () => {
  test('should switch from Estonian to English', async ({ page }) => {
    await page.goto('/et');

    // Verify Estonian content
    await expect(page.locator('h1')).toContainText('AI Teadmiste Puu');

    // Switch language
    await page.selectOption('select[name="language"]', 'en');

    // Verify English content
    await expect(page.locator('h1')).toContainText('AI Knowledge Tree');

    // Verify URL changed
    await expect(page).toHaveURL('/en');
  });

  test('should persist language choice on navigation', async ({ page }) => {
    await page.goto('/en');
    await page.click('a[href="/en/tree-view"]');

    // Should still be in English
    await expect(page).toHaveURL('/en/tree-view');
  });
});
```

---

## 6. PERFORMANCE OPTIMIZATION

### 6.1 Bundle Size Analysis

**Before i18n:**
```
Page                              Size     First Load JS
┌ ○ /                            2.5 kB         85 kB
└ ○ /tree-view                   3.2 kB         86 kB
```

**After i18n (optimized):**
```
Page                              Size     First Load JS
┌ ○ /[locale]                    2.8 kB         88 kB  (+3 kB)
├ ○ /[locale]/tree-view          3.5 kB         89 kB  (+3 kB)
└ ○ /[locale]/concepts/[level]   2.1 kB         87 kB  (lazy loaded)
```

### 6.2 Caching Strategy

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/locales/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

### 6.3 Lazy Loading Implementation

```typescript
// components/ConceptSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function ConceptSection({ levelId }: { levelId: string }) {
  const [concepts, setConcepts] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && !concepts) {
      // Load concepts only when section is in viewport
      import(`@/locales/${locale}/concepts/${levelId}.json`)
        .then(module => setConcepts(module.default));
    }
  }, [inView, levelId, concepts]);

  return (
    <div ref={ref}>
      {concepts ? (
        <ConceptGrid concepts={concepts} />
      ) : (
        <LoadingSkeleton />
      )}
    </div>
  );
}
```

---

## 7. FUTURE CONSIDERATIONS

### 7.1 Additional Languages

**Priority order (based on AI education market):**
1. ✅ Estonian (current)
2. ✅ English (Phase 1)
3. 🔄 Russian (large Estonian-speaking audience)
4. 🔄 Finnish (similar market to Estonia)
5. 🔄 German (strong tech education market)
6. 🔄 French
7. 🔄 Spanish

### 7.2 Content Management System (CMS)

**When to add CMS:**
- More than 3 languages
- Non-technical content editors
- Frequent content updates

**Recommended options:**
- **Tolgee**: Open-source, i18n-focused, Git-based
- **Localazy**: Developer-friendly, good for educational content
- **Strapi**: Full-featured headless CMS with i18n plugin

### 7.3 Machine Translation + Human Review

```typescript
// scripts/auto-translate.ts
import { Translator } from 'deepl-node';

const translator = new Translator(process.env.DEEPL_API_KEY!);

async function autoTranslate(
  sourceLocale: string,
  targetLocale: string,
  namespace: string
) {
  const source = await import(`../locales/${sourceLocale}/${namespace}.json`);
  const translations: Record<string, string> = {};

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'string') {
      const result = await translator.translateText(
        value,
        sourceLocale,
        targetLocale,
        {
          formality: 'default',
          tagHandling: 'html'
        }
      );
      translations[key] = result.text + ' [AUTO]'; // Mark for review
    }
  }

  return translations;
}
```

---

## 8. COMPLETE CODE EXAMPLES

### 8.1 Updated page.tsx with i18n

```typescript
// app/[locale]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TreeData, ViewMode, Concept } from '@/lib/types';
import { LevelSection } from '@/components/LevelSection';
import { TreeNavigation } from '@/components/TreeNavigation';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { ConceptLightbox } from '@/components/ConceptLightbox';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import Link from 'next/link';
import { Network } from 'lucide-react';

interface AITreePageProps {
  treeData: TreeData;
}

export default function AITreePage({ treeData }: AITreePageProps) {
  const t = useTranslations('navigation');
  const tMeta = useTranslations('metadata');
  const tCommon = useTranslations('common');

  const [viewMode, setViewMode] = useState<ViewMode>('both');
  const [activeLevel, setActiveLevel] = useState('roots');
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = treeData.levels.map(level => level.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveLevel(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [treeData.levels]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedConcept]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {tMeta('title')}
              </h1>
              <p className="text-sm text-gray-600">{tMeta('description')}</p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="/tree-view"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                <Network className="h-5 w-5" />
                {t('treeView')}
              </Link>
              <ViewModeToggle viewMode={viewMode} onChange={setViewMode} />
            </div>
          </div>
        </div>
      </header>

      {/* Tree Navigation */}
      <TreeNavigation levels={treeData.levels} activeLevel={activeLevel} />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-8xl mb-6">🌳</div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {tMeta('title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              {tMeta('subtitle')}
            </p>

            {/* View Options */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span>📚</span> {t('classicView')}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {t('classicViewDesc')}
                </p>
                <div className="text-xs text-gray-500 bg-green-100 px-3 py-1 rounded-full inline-block">
                  {tCommon('currentlyHere')}
                </div>
              </div>

              <div className="text-2xl text-gray-400">{tCommon('or')}</div>

              <Link href="/tree-view">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-6 max-w-sm hover:shadow-xl transition-all cursor-pointer">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Network className="h-5 w-5" /> {t('treeView')}
                  </h3>
                  <p className="text-sm text-white/90 mb-4">
                    {t('treeViewDesc')}
                  </p>
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full inline-block">
                    {tCommon('clickHere')} →
                  </div>
                </div>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-8 text-sm text-gray-600 flex-wrap justify-center">
                {treeData.levels.map((level, index) => (
                  <div key={level.id} className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-700">{index + 1}.</span>
                    <span className="text-2xl">{getLevelIcon(level.id)}</span>
                    <span>{level.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                {t('startFromRoots')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Level Sections */}
      <main>
        {treeData.levels.map((level, index) => {
          const levelConcepts = treeData.concepts.filter(c => c.level === level.id);
          return (
            <LevelSection
              key={level.id}
              level={level}
              concepts={levelConcepts}
              viewMode={viewMode}
              index={index}
              onConceptClick={setSelectedConcept}
            />
          );
        })}
      </main>

      {/* Concept Lightbox */}
      {selectedConcept && (
        <ConceptLightbox
          concept={selectedConcept}
          onClose={() => setSelectedConcept(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <p className="text-gray-400">
            {tMeta('footerTagline')}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {t('version')} {treeData.metadata.version} • {treeData.metadata.created}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper function (to be moved to utils)
function getLevelIcon(levelId: string): string {
  const icons: Record<string, string> = {
    leaves: '🍃',
    branches: '🌿',
    trunk: '🌲',
    roots: '🌱',
  };
  return icons[levelId] || '📍';
}
```

### 8.2 Translation Files

```json
// locales/en/common.json
{
  "viewFullSize": "View full size",
  "currentlyHere": "Currently here",
  "or": "or",
  "clickHere": "Click here",
  "close": "Close",
  "back": "Back",
  "next": "Next",
  "previous": "Previous",
  "loading": "Loading..."
}
```

```json
// locales/et/common.json
{
  "viewFullSize": "Vaata täismõõtus",
  "currentlyHere": "Praegu siin",
  "or": "või",
  "clickHere": "Kliki siia",
  "close": "Sulge",
  "back": "Tagasi",
  "next": "Järgmine",
  "previous": "Eelmine",
  "loading": "Laadimine..."
}
```

```json
// locales/en/navigation.json
{
  "treeView": "Tree View",
  "classicView": "Classic View",
  "classicViewDesc": "Scrollable level view with detailed content",
  "treeViewDesc": "Interactive tree with all concepts",
  "startFromRoots": "Start from roots and move upward or scroll freely",
  "version": "Version"
}
```

```json
// locales/en/metadata.json
{
  "title": "AI Knowledge Tree",
  "description": "A comprehensive framework for teaching AI concepts",
  "subtitle": "A complete framework for teaching AI concepts – from fundamental mechanics to cutting-edge research.",
  "footerTagline": "AI Knowledge Tree – Interactive learning tool for understanding AI concepts"
}
```

```json
// locales/en/concepts/roots.json
{
  "concepts": [
    {
      "id": "tokens",
      "title": "Tokens",
      "simpleName": "Text Blocks",
      "explanation": "The smallest units of text for AI. These aren't words, but character combinations. They determine cost and speed.",
      "metaphor": "Lego blocks. The word 'Banana' isn't one piece, but consists of three blocks. AI builds sentences block by block."
    },
    {
      "id": "vectors",
      "title": "Vectors (Embeddings)",
      "simpleName": "Meaning Map",
      "explanation": "Translating words and meanings into numerical coordinates in space. Similar meanings are located close together in space.",
      "metaphor": "GPS coordinates. The words 'King' and 'Queen' are close on the map, like Tallinn and Tartu, but 'Banana' is on another continent."
    },
    {
      "id": "attention",
      "title": "Attention Mechanism",
      "simpleName": "Focus",
      "explanation": "A mechanism that allows the model to focus on important parts of a sentence to understand relationships (e.g., who is 'he' in a sentence).",
      "metaphor": "Flashlight in a dark room. AI illuminates only those words that are currently important for giving an answer."
    },
    {
      "id": "prefill-decode",
      "title": "Prefill vs Decode",
      "simpleName": "Reading and Writing",
      "explanation": "How a model processes text: first it reads quickly (prefill) and then writes slowly (decode).",
      "metaphor": "Reading vs Writing. Scanning a book with your eyes is fast (prefill), but rewriting the same text by hand is slow (decode)."
    }
  ]
}
```

---

## 9. CHECKLIST FOR IMPLEMENTATION

### Pre-Implementation
- [ ] Choose i18n library (`next-intl` recommended)
- [ ] Define supported locales (en, et, ...)
- [ ] Decide on URL structure (path-based recommended)
- [ ] Set up translation workflow (manual vs TMS)

### Development
- [ ] Install `next-intl` and configure
- [ ] Create `middleware.ts` for locale routing
- [ ] Set up directory structure (`locales/`, `lib/i18n/`)
- [ ] Migrate current `tree-concepts.json` to split structure
- [ ] Create English translations
- [ ] Update TypeScript types
- [ ] Wrap app in `[locale]` directory
- [ ] Update all components with `useTranslations()`
- [ ] Add `LanguageSwitcher` component
- [ ] Implement lazy loading for concepts
- [ ] Add metadata (hreflang, alternates)

### Testing
- [ ] Unit tests for translation completeness
- [ ] Integration tests for locale switching
- [ ] E2E tests with Playwright
- [ ] Visual regression testing
- [ ] Performance testing (bundle size)
- [ ] SEO validation (hreflang, sitemap)

### Deployment
- [ ] Update CI/CD for translation validation
- [ ] Configure CDN caching for translations
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Deploy to production
- [ ] Monitor analytics

### Post-Launch
- [ ] Gather user feedback
- [ ] Track locale usage patterns
- [ ] Plan for additional languages
- [ ] Consider CMS integration
- [ ] Document translation workflow

---

## 10. RESOURCES & REFERENCES

### Documentation
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

### Tools
- **Translation**: DeepL, Google Translate (for drafts)
- **TMS**: Localazy, Tolgee, Crowdin
- **Testing**: Playwright, Vitest
- **Analytics**: Google Analytics (locale dimension)

### Best Practices
- [W3C Internationalization](https://www.w3.org/International/)
- [Mozilla l10n Guide](https://mozilla-l10n.github.io/localizer-documentation/)
- [Google i18n Checklist](https://developers.google.com/international)

---

## Conclusion

This i18n strategy provides a scalable, performant, and maintainable approach to multilingual support for the AI Tree platform. The phased implementation plan allows for gradual migration while maintaining current functionality. The use of `next-intl` ensures excellent developer experience and performance, while the lazy loading strategy keeps bundle sizes minimal.

**Key Takeaways:**
1. **Path-based routing** (`/en`, `/et`) for best SEO
2. **Lazy load concepts** by tree level for performance
3. **Keep technical terms in English** with glossary
4. **Metadata localization** with proper formatting
5. **5-week phased implementation** for safe migration

**Next Steps:**
1. Review and approve this strategy
2. Hire translator for English content (or use DeepL + review)
3. Begin Phase 1 implementation
4. Set up staging environment for testing
5. Plan marketing for English launch

---

**Document Version:** 1.0
**Last Updated:** 2026-01-28
**Author:** Claude (Anthropic)
**Status:** Draft - Awaiting Approval
