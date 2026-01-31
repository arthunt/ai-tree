# ParaglideJS Migration Guide

## Overview

This document describes the migration from `next-intl` to `@inlang/paraglide-js` for AI Tree (Dendrix.ai).

## Setup (Run Once)

```bash
# Install dependencies
npm install

# This runs paraglide:compile automatically via postinstall
# If needed manually:
npm run paraglide:compile
```

## Key Files Changed

| File | Purpose |
|------|---------|
| `project.inlang/settings.json` | Inlang configuration |
| `middleware.ts` | Locale routing |
| `app/[locale]/layout.tsx` | Root layout without NextIntlClientProvider |
| `context/LanguageContext.tsx` | Client-side language context |
| `lib/paraglide.ts` | Utilities and re-exports |

## Migration Pattern

### Before (next-intl)

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('namespace');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button aria-label={t('buttonLabel')}>
        {t('buttonText')}
      </button>
    </div>
  );
}
```

### After (ParaglideJS)

```tsx
'use client';

import * as m from '@/paraglide/messages';

export function MyComponent() {
  return (
    <div>
      <h1>{m.namespace_title()}</h1>
      <p>{m.namespace_description()}</p>
      <button aria-label={m.namespace_buttonLabel()}>
        {m.namespace_buttonText()}
      </button>
    </div>
  );
}
```

## Key Differences

| next-intl | ParaglideJS |
|-----------|-------------|
| `t('key')` | `m.namespace_key()` |
| `t('nested.key')` | `m.namespace_nested_key()` |
| `useTranslations('ns')` | `import * as m from '@/paraglide/messages'` |
| Runtime lookup | Compile-time functions |
| Bundle all messages | Tree-shake unused messages |

## Handling Interpolation

### Before
```tsx
t('greeting', { name: 'John' })
// messages.json: "greeting": "Hello, {name}!"
```

### After
```tsx
m.namespace_greeting({ name: 'John' })
// Same message format works
```

## Language Switching

### Before
```tsx
import { useRouter, usePathname, useParams } from 'next/navigation';
import { locales } from '@/i18n';

const currentLocale = useParams().locale;
const switchLanguage = (newLocale) => {
  router.replace(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
};
```

### After
```tsx
import { useLanguage } from '@/context/LanguageContext';

const { locale, setLocale } = useLanguage();
const switchLanguage = (newLocale) => {
  setLocale(newLocale);
};
```

## Special Cases

### Deeply Nested Keys

JSON:
```json
{
  "levels": {
    "levelTime": {
      "roots": "~25 min"
    }
  }
}
```

Access:
```tsx
m.levels_levelTime_roots()
```

### Plural Forms

JSON:
```json
{
  "items": "{count, plural, one {item} other {items}}"
}
```

Access:
```tsx
m.namespace_items({ count: 5 })
```

## Files to Migrate

### Priority 0 (Core)
- [x] `middleware.ts`
- [x] `app/[locale]/layout.tsx`
- [ ] `app/[locale]/page.tsx`
- [ ] `components/WelcomeModal.tsx`
- [ ] `components/SearchModal.tsx`
- [ ] `components/ConceptLightbox.tsx`
- [ ] `components/ConceptCard.tsx`
- [ ] `components/LevelSection.tsx`

### Priority 1 (UI)
- [ ] `components/TreeNavigation.tsx`
- [ ] `components/LanguageSwitcher.tsx`
- [ ] `components/SettingsDropdown.tsx`
- [ ] `components/ViewModeToggle.tsx`
- [ ] `components/CelebrationModal.tsx`
- [ ] `components/TokenizerDemo.tsx`
- [ ] `components/VectorDemo.tsx`

### Priority 2 (Pages & SVGs)
- [ ] `app/[locale]/tree-view/page.tsx`
- [ ] `app/[locale]/dna/page.tsx`
- [ ] `app/[locale]/learn/*.tsx`
- [ ] `app/[locale]/concept/[conceptId]/*.tsx`
- [ ] `components/mobile/*.tsx` (6 files)
- [ ] `components/visuals/*.tsx` (21 files)

## Cleanup After Migration

```bash
# Remove next-intl
npm uninstall next-intl

# Delete old i18n config
rm i18n.ts

# Verify build
npm run build
npm test
```

## Troubleshooting

### "Cannot find module '@/paraglide/messages'"

Run `npm run paraglide:compile` to generate the messages.

### TypeScript errors about missing functions

The message key might be:
1. Misspelled
2. Not in `messages/*.json`
3. Compile hasn't run after adding the key

### Language not switching

Check that:
1. `LanguageProvider` wraps your app
2. Cookie `NEXT_LOCALE` is being set
3. Middleware is matching the route

## Benefits After Migration

1. **Type Safety** - TypeScript catches missing translations
2. **Tree Shaking** - Only used messages in bundle
3. **Compile-time** - Faster runtime (no lookup)
4. **Inlang Ecosystem** - Better translation workflow
