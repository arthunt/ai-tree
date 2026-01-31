# i18n Quick Start Guide

This guide helps you get started with implementing internationalization (i18n) in the AI Tree platform in under 30 minutes.

## Overview

You now have four comprehensive documents:
1. **I18N_ARCHITECTURE.md** - Complete strategy and architecture
2. **IMPLEMENTATION_EXAMPLES.md** - Practical code examples
3. **TRANSLATION_SAMPLES.md** - Sample translation JSON files
4. **MIGRATION_SCRIPT_EXAMPLE.ts** - Automated migration script

## Quick Setup (30 minutes)

### Step 1: Install Dependencies (5 min)

```bash
cd /Users/ak/GitHub/ai-tree

# Install next-intl
npm install next-intl

# Install dev dependencies for testing
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

### Step 2: Run Migration Script (5 min)

```bash
# Create the script
npx ts-node MIGRATION_SCRIPT_EXAMPLE.ts migrate

# This will:
# - Create locales/et/ directory with split translation files
# - Create locales/en/ directory with placeholder translations
# - Generate locales/config.ts
```

**Output structure:**
```
locales/
├── en/
│   ├── common.json
│   ├── navigation.json
│   ├── levels.json
│   ├── glossary.json
│   └── concepts/
│       ├── roots.json
│       ├── trunk.json
│       ├── branches.json
│       └── leaves.json
├── et/
│   └── (same structure)
└── config.ts
```

### Step 3: Create Configuration Files (10 min)

**3.1 Create `lib/i18n/config.ts`**

```typescript
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'et'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'et';

export default getRequestConfig(async ({ locale }) => {
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

**3.2 Create `middleware.ts`**

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/(en|et)/:path*']
};
```

**3.3 Update `next.config.js`**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['next-intl']
  }
};

module.exports = nextConfig;
```

### Step 4: Restructure App Directory (5 min)

```bash
# Create locale directory structure
mkdir -p app/[locale]

# Move existing pages to locale directory
mv app/page.tsx app/[locale]/page.tsx
mv app/layout.tsx app/[locale]/layout.tsx
mv app/tree-view app/[locale]/tree-view

# If you have other routes, move them too
```

**4.1 Update `app/[locale]/layout.tsx`**

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/locales/${locale}/common.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Step 5: Add Language Switcher (5 min)

Create `components/LanguageSwitcher.tsx` using the example from `IMPLEMENTATION_EXAMPLES.md`:

```typescript
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4" />
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-1 rounded-lg border border-gray-300"
      >
        <option value="et">🇪🇪 Eesti</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </div>
  );
}
```

Add to your header in `app/[locale]/page.tsx`:

```typescript
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// In your header JSX:
<div className="flex items-center gap-4">
  <LanguageSwitcher />
  {/* other header content */}
</div>
```

## Testing Your Implementation

### 1. Start Development Server

```bash
npm run dev
```

### 2. Test URLs

- Estonian: http://localhost:3000/et
- English: http://localhost:3000/en

### 3. Test Language Switching

1. Open http://localhost:3000/et
2. Click language switcher
3. Select "English"
4. Verify URL changes to /en
5. Verify content updates

## Next Steps

### Immediate (Week 1)

1. **Review English translations**
   - Open `locales/en/concepts/*.json`
   - Hire professional translator OR
   - Use DeepL + manual review for concepts

2. **Update component strings**
   - Replace hardcoded Estonian text with `useTranslations()`
   - See `IMPLEMENTATION_EXAMPLES.md` for examples

3. **Add metadata**
   - Update each page with `generateMetadata()` for SEO
   - Add hreflang tags

### Short-term (Week 2-3)

1. **Write tests**
   - Translation completeness tests
   - Component integration tests
   - E2E language switching tests

2. **Optimize performance**
   - Implement lazy loading for concepts
   - Add caching headers

3. **SEO setup**
   - Generate sitemap with locales
   - Add robots.txt
   - Verify Google Search Console

### Long-term (Month 2+)

1. **Add more languages**
   - Russian (ru)
   - Finnish (fi)
   - German (de)

2. **Set up translation management**
   - Consider Localazy or Tolgee
   - Automate translation workflow

3. **Analytics**
   - Track locale usage
   - Monitor bounce rates per locale
   - A/B test translations

## Common Issues & Solutions

### Issue 1: "locale is not defined"

**Solution:** Make sure middleware.ts is in the root directory and matches all paths:

```typescript
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/(en|et)/:path*']
};
```

### Issue 2: Translations not loading

**Solution:** Check import paths in `lib/i18n/config.ts`:

```typescript
messages: (await import(`../../locales/${locale}/common.json`)).default
```

Make sure the path is correct relative to the config file.

### Issue 3: Build errors with next-intl

**Solution:** Add to `next.config.js`:

```javascript
experimental: {
  serverComponentsExternalPackages: ['next-intl']
}
```

### Issue 4: Language switcher not updating content

**Solution:** Ensure you're using `router.push()` and not just changing state:

```typescript
const router = useRouter();
router.push(`/${newLocale}${pathname.replace(`/${locale}`, '')}`);
```

## Validation Checklist

Before deploying:

- [ ] Both locales load without errors
- [ ] Language switcher works in both directions
- [ ] All pages accessible in both languages
- [ ] No missing translation keys
- [ ] SEO metadata present for both locales
- [ ] Tests passing
- [ ] Bundle size acceptable (< +10KB)
- [ ] Performance metrics good (LCP, FID, CLS)

## Getting Help

### Documentation
- **next-intl docs**: https://next-intl-docs.vercel.app/
- **Next.js i18n**: https://nextjs.org/docs/app/building-your-application/routing/internationalization

### Your Project Docs
- `I18N_ARCHITECTURE.md` - Full strategy
- `IMPLEMENTATION_EXAMPLES.md` - Code examples
- `TRANSLATION_SAMPLES.md` - Translation files
- `MIGRATION_SCRIPT_EXAMPLE.ts` - Migration automation

## Success Metrics

Track these after launch:

1. **User Engagement**
   - Time on site per locale
   - Pages per session per locale
   - Bounce rate comparison

2. **Technical Performance**
   - Bundle size increase (target: < 10KB)
   - Time to Interactive (TTI) impact
   - Server response time

3. **Business Metrics**
   - Traffic growth from non-Estonian countries
   - User feedback/surveys
   - SEO rankings in English

## Deployment

### Production Build

```bash
# Build for production
npm run build

# Check bundle analysis
npm run analyze

# Deploy
vercel deploy --prod
# or
netlify deploy --prod
```

### Environment Variables

```bash
# .env.production
NEXT_PUBLIC_DEFAULT_LOCALE=et
NEXT_PUBLIC_SUPPORTED_LOCALES=en,et
```

### CDN Configuration

For Vercel/Netlify, add headers:

```json
{
  "headers": [
    {
      "source": "/locales/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Timeline Summary

| Phase | Duration | Tasks | Outcome |
|-------|----------|-------|---------|
| Setup | 30 min | Install, configure, migrate | Working i18n structure |
| Development | 1-2 weeks | Update components, add translations | Bilingual app |
| Testing | 3-5 days | Write tests, QA | Validated implementation |
| Launch | 1 day | Deploy, monitor | Live bilingual site |
| Optimization | Ongoing | Analytics, refinement | Improved UX |

## Cost Estimate

- **Development time**: 40-60 hours
- **Translation (professional)**: $200-400 for 10,000 words
- **Tools**: Free (next-intl, open-source)
- **Total**: ~$200-400 (if DIY) or ~$3,000-5,000 (if outsourced)

## Final Notes

This implementation follows Next.js App Router best practices and uses `next-intl`, which is:
- ✅ Optimized for Next.js 13+
- ✅ TypeScript-first
- ✅ Server Components compatible
- ✅ Excellent developer experience
- ✅ Production-ready

The architecture is designed to scale from 2 languages to 10+ languages without major refactoring.

---

**You're ready to start!** Begin with Step 1 and follow the guide sequentially. Refer to the detailed documents when you need more context or advanced features.

Good luck! 🚀🌍
