# i18n Implementation Examples

This document provides practical code examples for implementing internationalization in the AI Tree platform.

## Table of Contents
1. [Configuration Files](#configuration-files)
2. [Middleware Setup](#middleware-setup)
3. [Component Examples](#component-examples)
4. [Hooks and Utilities](#hooks-and-utilities)
5. [Testing Examples](#testing-examples)

---

## Configuration Files

### 1. next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable i18n support
  experimental: {
    serverComponentsExternalPackages: ['next-intl']
  },

  // Optimize for production
  swcMinify: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: []
  },

  // Headers for caching translations
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
  },

  // Redirects for old URLs
  async redirects() {
    return [
      {
        source: '/',
        destination: '/et',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
```

### 2. lib/i18n/config.ts

```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// All supported locales
export const locales = ['en', 'et'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'et';

// Locale configuration
export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  flag: string;
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    dateFormat: 'MM/DD/YYYY',
    flag: '🇬🇧'
  },
  et: {
    code: 'et',
    name: 'Estonian',
    nativeName: 'Eesti',
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    flag: '🇪🇪'
  }
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`../../locales/${locale}/common.json`)).default,
    timeZone: 'Europe/Tallinn',
    now: new Date()
  };
});
```

### 3. middleware.ts

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

export default createMiddleware({
  // All supported locales
  locales,

  // Default locale when none is detected
  defaultLocale,

  // Strategy for locale detection
  localeDetection: true, // Uses Accept-Language header

  // Locale prefix in URL
  // 'as-needed': /et/page or /page (for default locale)
  // 'always': always show /et/page
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except:
  // - API routes
  // - Next.js internals (_next)
  // - Static files (images, fonts, etc.)
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
    '/(en|et)/:path*'
  ]
};
```

---

## Component Examples

### 1. Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { localeConfigs, type Locale } from '@/lib/i18n/config';
import { Globe, Check } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    // Replace locale in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale segment
    const newPathname = segments.join('/');

    router.push(newPathname);
    setIsOpen(false);
  };

  const currentConfig = localeConfigs[locale];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        aria-label={t('changeLanguage')}
      >
        <Globe className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">{currentConfig.flag}</span>
        <span className="text-sm">{currentConfig.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          <div className="py-1">
            {Object.values(localeConfigs).map((config) => (
              <button
                key={config.code}
                onClick={() => handleLocaleChange(config.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  locale === config.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{config.flag}</span>
                  <span>{config.nativeName}</span>
                </span>
                {locale === config.code && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### 2. Updated ConceptCard Component

```typescript
// components/ConceptCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Users,
  Brain,
  Leaf,
  Bot,
  Plug,
  Layers,
  BookOpen,
  Notebook,
  GraduationCap,
  Shield,
  MapPin,
  Flashlight,
  BookText,
  Blocks,
  Maximize2,
  type LucideIcon,
} from 'lucide-react';
import { Concept } from '@/lib/types';
import { getComplexityColor } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  brain: Brain,
  leaf: Leaf,
  'chess-knight': Brain,
  bot: Bot,
  plug: Plug,
  layers: Layers,
  stage: Layers,
  'book-open': BookOpen,
  notebook: Notebook,
  'graduation-cap': GraduationCap,
  shield: Shield,
  blocks: Blocks,
  'map-pin': MapPin,
  flashlight: Flashlight,
  'book-text': BookText,
};

interface ConceptCardProps {
  concept: Concept;
  viewMode: 'metaphor' | 'technical' | 'both';
  index: number;
  onClick: () => void;
}

export function ConceptCard({ concept, viewMode, index, onClick }: ConceptCardProps) {
  const t = useTranslations('common');
  const tGlossary = useTranslations('glossary');

  const IconComponent = iconMap[concept.icon] || Brain;

  const displayText = viewMode === 'technical' ? concept.explanation : concept.metaphor;

  // Get localized complexity label
  const complexityLabel = tGlossary(`complexity_levels.${
    concept.complexity === 1 ? 'beginner' :
    concept.complexity === 2 ? 'intermediate' :
    'advanced'
  }`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white/80 hover:bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <div className="p-5 h-full flex flex-col">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
              <IconComponent className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {concept.title}
              </h3>
              <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getComplexityColor(concept.complexity)}`}>
                {complexityLabel}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
            {displayText}
          </p>

          <div className="flex items-center justify-center gap-2 pt-3 border-t border-gray-200 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
            <Maximize2 className="h-4 w-4" />
            <span>{t('viewFullSize')}</span>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none rounded-xl" />
      </div>
    </motion.div>
  );
}
```

### 3. Updated LevelSection Component

```typescript
// components/LevelSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { TreeLevel, Concept, ViewMode } from '@/lib/types';
import { ConceptCard } from './ConceptCard';
import { getLevelIcon } from '@/lib/utils';

interface LevelSectionProps {
  level: TreeLevel;
  concepts: Concept[];
  viewMode: ViewMode;
  index: number;
  onConceptClick: (concept: Concept) => void;
}

export function LevelSection({
  level,
  concepts,
  viewMode,
  index,
  onConceptClick
}: LevelSectionProps) {
  const tLevels = useTranslations('levels');

  return (
    <section
      id={level.id}
      className="py-16 relative"
      style={{
        background: `linear-gradient(to bottom, ${level.color}08, transparent)`
      }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Level Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{getLevelIcon(level.id)}</span>
            <div>
              <h2
                className="text-4xl font-bold mb-2"
                style={{ color: level.color }}
              >
                {tLevels(`levels.${level.id}.name`)}
              </h2>
              <p className="text-xl text-gray-600">
                {tLevels(`levels.${level.id}.subtitle`)}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-lg max-w-3xl">
            {tLevels(`levels.${level.id}.description`)}
          </p>
        </motion.div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concepts.map((concept, i) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              viewMode={viewMode}
              index={i}
              onClick={() => onConceptClick(concept)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 4. View Mode Toggle Component

```typescript
// components/ViewModeToggle.tsx
'use client';

import { useTranslations } from 'next-intl';
import { ViewMode } from '@/lib/types';
import { BookOpen, Code, Layers } from 'lucide-react';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, onChange }: ViewModeToggleProps) {
  const t = useTranslations('common');

  const modes: Array<{ value: ViewMode; icon: typeof BookOpen; label: string }> = [
    { value: 'metaphor', icon: BookOpen, label: t('viewModes.metaphor') },
    { value: 'technical', icon: Code, label: t('viewModes.technical') },
    { value: 'both', icon: Layers, label: t('viewModes.both') }
  ];

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            viewMode === value
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          title={label}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## Hooks and Utilities

### 1. Date/Number Formatting Hook

```typescript
// lib/i18n/hooks/useFormatters.ts
import { useFormatter, useLocale } from 'next-intl';

export function useFormatters() {
  const format = useFormatter();
  const locale = useLocale();

  return {
    /**
     * Format date with locale-specific formatting
     * @example formatDate('2025-12-04') => "December 4, 2025" (en) or "4. detsember 2025" (et)
     */
    formatDate: (date: string | Date, options?: Intl.DateTimeFormatOptions) => {
      const defaultOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
      };
      return format.dateTime(new Date(date), defaultOptions);
    },

    /**
     * Format number with locale-specific formatting
     * @example formatNumber(1234.56) => "1,234.56" (en) or "1 234,56" (et)
     */
    formatNumber: (num: number, options?: Intl.NumberFormatOptions) => {
      return format.number(num, options);
    },

    /**
     * Format relative time
     * @example formatRelative(new Date(Date.now() - 86400000)) => "yesterday"
     */
    formatRelative: (date: string | Date) => {
      return format.relativeTime(new Date(date));
    },

    /**
     * Format currency
     * @example formatCurrency(100, 'EUR') => "€100.00" (en) or "100,00 €" (et)
     */
    formatCurrency: (amount: number, currency: string = 'EUR') => {
      return format.number(amount, {
        style: 'currency',
        currency
      });
    },

    /**
     * Get current locale
     */
    locale
  };
}
```

### 2. Locale-aware Link Component

```typescript
// components/LocaleLink.tsx
'use client';

import { useLocale } from 'next-intl';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LocaleLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Link component that automatically prefixes href with current locale
 */
export function LocaleLink({ href, children, className, ...props }: LocaleLinkProps) {
  const locale = useLocale();

  // Prefix href with locale if not already prefixed
  const localizedHref = href.startsWith('/')
    ? `/${locale}${href}`
    : href;

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
```

### 3. Lazy Concept Loader

```typescript
// lib/i18n/loaders/conceptLoader.ts
import { cache } from 'react';

export type ConceptLevel = 'roots' | 'trunk' | 'branches' | 'leaves';

interface ConceptData {
  concepts: Array<{
    id: string;
    title: string;
    simpleName: string;
    explanation: string;
    metaphor: string;
  }>;
}

/**
 * Lazy load concept translations by level
 * Uses React cache for deduplication
 */
export const loadConceptTranslations = cache(
  async (locale: string, level: ConceptLevel): Promise<ConceptData> => {
    try {
      const translations = await import(
        `@/locales/${locale}/concepts/${level}.json`
      );
      return translations.default;
    } catch (error) {
      console.error(`Failed to load ${level} concepts for ${locale}`, error);

      // Fallback to English
      if (locale !== 'en') {
        try {
          const fallback = await import(`@/locales/en/concepts/${level}.json`);
          return fallback.default;
        } catch (fallbackError) {
          console.error('Fallback to English also failed', fallbackError);
        }
      }

      // Return empty structure if all fails
      return { concepts: [] };
    }
  }
);

/**
 * Preload concept translations for a level
 * Call this from parent component to start loading early
 */
export function preloadConceptTranslations(locale: string, level: ConceptLevel) {
  void loadConceptTranslations(locale, level);
}
```

---

## Testing Examples

### 1. Translation Completeness Test

```typescript
// lib/i18n/__tests__/translation-completeness.test.ts
import { describe, it, expect } from 'vitest';
import enCommon from '@/locales/en/common.json';
import etCommon from '@/locales/et/common.json';
import enNavigation from '@/locales/en/navigation.json';
import etNavigation from '@/locales/et/navigation.json';
import enLevels from '@/locales/en/levels.json';
import etLevels from '@/locales/et/levels.json';

describe('Translation completeness', () => {
  it('should have matching keys in common.json', () => {
    const enKeys = Object.keys(enCommon).sort();
    const etKeys = Object.keys(etCommon).sort();

    expect(enKeys).toEqual(etKeys);
  });

  it('should have matching keys in navigation.json', () => {
    const enKeys = Object.keys(enNavigation).sort();
    const etKeys = Object.keys(etNavigation).sort();

    expect(enKeys).toEqual(etKeys);
  });

  it('should have matching level keys in levels.json', () => {
    const enLevelKeys = Object.keys(enLevels.levels).sort();
    const etLevelKeys = Object.keys(etLevels.levels).sort();

    expect(enLevelKeys).toEqual(etLevelKeys);
  });

  it('should not have empty string values', () => {
    const checkEmpty = (obj: Record<string, any>, path = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          expect(
            value.trim(),
            `Empty value found at ${currentPath}`
          ).not.toBe('');
        } else if (typeof value === 'object' && value !== null) {
          checkEmpty(value, currentPath);
        }
      }
    };

    checkEmpty(enCommon, 'en.common');
    checkEmpty(etCommon, 'et.common');
  });

  it('should have valid placeholder syntax', () => {
    const checkPlaceholders = (obj: Record<string, any>) => {
      for (const value of Object.values(obj)) {
        if (typeof value === 'string') {
          // Check for {placeholder} syntax
          const placeholders = value.match(/\{(\w+)\}/g);
          if (placeholders) {
            placeholders.forEach(placeholder => {
              expect(placeholder).toMatch(/^\{\w+\}$/);
            });
          }
        } else if (typeof value === 'object' && value !== null) {
          checkPlaceholders(value);
        }
      }
    };

    checkPlaceholders(enCommon);
    checkPlaceholders(etCommon);
  });
});
```

### 2. Component Integration Test

```typescript
// components/__tests__/LanguageSwitcher.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { vi } from 'vitest';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/et/tree-view'
}));

const messages = {
  changeLanguage: 'Change language'
};

describe('LanguageSwitcher', () => {
  it('renders current locale', () => {
    render(
      <NextIntlClientProvider locale="et" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('ET')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(
      <NextIntlClientProvider locale="et" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Eesti')).toBeInTheDocument();
  });

  it('switches locale when option is clicked', async () => {
    render(
      <NextIntlClientProvider locale="et" messages={messages}>
        <LanguageSwitcher />
      </NextIntlClientProvider>
    );

    // Open dropdown
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Click English option
    const englishOption = screen.getByText('English');
    fireEvent.click(englishOption);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/en/tree-view');
    });
  });
});
```

### 3. E2E Language Switching Test

```typescript
// tests/e2e/language-switching.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Language switching', () => {
  test('should switch from Estonian to English', async ({ page }) => {
    await page.goto('/et');

    // Verify Estonian content
    await expect(page.locator('h1')).toContainText('AI Teadmiste Puu');

    // Open language switcher
    await page.click('button[aria-label*="language"]');

    // Click English option
    await page.click('text=English');

    // Wait for navigation
    await page.waitForURL('/en');

    // Verify English content
    await expect(page.locator('h1')).toContainText('AI Knowledge Tree');
  });

  test('should persist language on navigation', async ({ page }) => {
    await page.goto('/en');

    // Navigate to tree view
    await page.click('text=Tree View');

    // Should still be in English
    await expect(page).toHaveURL(/\/en\/tree-view/);
    await expect(page.locator('button[aria-label*="language"]')).toContainText('EN');
  });

  test('should respect browser language preference', async ({ browser }) => {
    const context = await browser.newContext({
      locale: 'et-EE'
    });
    const page = await context.newPage();

    await page.goto('/');

    // Should redirect to Estonian
    await expect(page).toHaveURL(/\/et/);
  });

  test('should show correct complexity labels per locale', async ({ page }) => {
    await page.goto('/et');

    // Check Estonian complexity label
    await expect(page.locator('text=Algaja').first()).toBeVisible();

    // Switch to English
    await page.click('button[aria-label*="language"]');
    await page.click('text=English');

    // Check English complexity label
    await expect(page.locator('text=Beginner').first()).toBeVisible();
  });
});
```

### 4. Visual Regression Test

```typescript
// tests/visual/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual regression - i18n', () => {
  test('Estonian homepage should match snapshot', async ({ page }) => {
    await page.goto('/et');
    await expect(page).toHaveScreenshot('homepage-et.png', {
      fullPage: true
    });
  });

  test('English homepage should match snapshot', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveScreenshot('homepage-en.png', {
      fullPage: true
    });
  });

  test('Language switcher dropdown should match snapshot', async ({ page }) => {
    await page.goto('/et');
    await page.click('button[aria-label*="language"]');

    await expect(page.locator('[role="menu"]')).toHaveScreenshot(
      'language-switcher.png'
    );
  });
});
```

---

## Additional Examples

### 1. Server-side Translation Loading

```typescript
// app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { loadConceptTranslations } from '@/lib/i18n/loaders/conceptLoader';

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  // Load translations server-side
  const t = await getTranslations({ locale, namespace: 'metadata' });

  // Load concepts for all levels
  const concepts = await Promise.all([
    loadConceptTranslations(locale, 'roots'),
    loadConceptTranslations(locale, 'trunk'),
    loadConceptTranslations(locale, 'branches'),
    loadConceptTranslations(locale, 'leaves')
  ]);

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* Render concepts */}
    </div>
  );
}

// Generate static params for all locales
export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'et' }];
}

// Generate metadata for SEO
export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'et': '/et',
        'x-default': '/en'
      }
    }
  };
}
```

### 2. Translation File Structure Example

```
locales/
├── en/
│   ├── common.json              (viewFullSize, close, loading, etc.)
│   ├── navigation.json          (treeView, classicView, etc.)
│   ├── metadata.json            (title, description, etc.)
│   ├── levels.json              (level names, subtitles, descriptions)
│   ├── glossary.json            (technical terms with explanations)
│   └── concepts/
│       ├── roots.json           (4 concepts: tokens, vectors, attention, prefill-decode)
│       ├── trunk.json           (5 concepts: context, RAG, memory, LoRA, security)
│       ├── branches.json        (4 concepts: agents, MCP, complexity-levels)
│       └── leaves.json          (4 concepts: MoE, AGI/ASI, Green AI, reasoning)
└── et/
    └── (same structure)
```

---

## Performance Tips

1. **Lazy load translations**: Only load what you need
2. **Use Server Components**: Load translations on server when possible
3. **Cache translations**: Use React cache() for deduplication
4. **Split by namespace**: Don't load all translations at once
5. **Preload critical translations**: Use preload functions for above-the-fold content

---

## Common Patterns

### Pattern 1: Pluralization

```typescript
// locales/en/common.json
{
  "conceptCount": "{count, plural, =0 {No concepts} =1 {One concept} other {# concepts}}"
}

// Usage
const t = useTranslations('common');
<span>{t('conceptCount', { count: concepts.length })}</span>
```

### Pattern 2: Rich Text

```typescript
// locales/en/common.json
{
  "welcomeMessage": "Welcome to <bold>AI Tree</bold>. Start learning <link>here</link>."
}

// Usage
const t = useTranslations('common');
<p>
  {t.rich('welcomeMessage', {
    bold: (chunks) => <strong>{chunks}</strong>,
    link: (chunks) => <a href="/en">{chunks}</a>
  })}
</p>
```

### Pattern 3: Nested Keys

```typescript
// locales/en/metadata.json
{
  "seo": {
    "title": "AI Knowledge Tree",
    "description": "Learn AI concepts",
    "keywords": ["AI", "machine learning", "education"]
  }
}

// Usage
const t = useTranslations('metadata.seo');
<title>{t('title')}</title>
```

---

This document provides all the practical code you need to implement i18n in the AI Tree platform. Refer to the main architecture document for strategic decisions and planning.
