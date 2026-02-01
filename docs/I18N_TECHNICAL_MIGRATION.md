# Dendrix.ai i18n Technical Migration Plan

**Status:** Implementation Reference  
**Version:** 1.0  
**Date:** 2026-02-01  
**Companion:** `I18N_TRANSLATION_PRINCIPLES.md` (content authority)  
**Aligned with:** `docs/VISION_AND_STRATEGY.md` V3.0 (architectural authority)

> This document describes the **technical changes** required to implement the two-layer i18n architecture with content variants. It is designed to be executed by Gemini agents and human developers in coordination with the Vision & Strategy roadmap.

---

## Table of Contents

1. [Current State Assessment](#1-current-state)
2. [Target Architecture](#2-target-architecture)
3. [Phase 0: Locale Unification](#3-phase-0)
4. [Phase 1: Paraglide Layer Extension](#4-phase-1)
5. [Phase 2: Content Variant Infrastructure](#5-phase-2)
6. [Phase 3: Variant Serving Logic](#6-phase-3)
7. [Phase 4: Measurement & Analytics](#7-phase-4)
8. [Phase 5: Content Migration](#8-phase-5)
9. [Required Changes to Vision & Strategy](#9-vs-changes)
10. [File-by-File Change Registry](#10-file-registry)
11. [Supabase Migration SQL](#11-migration-sql)
12. [TypeScript Interface Changes](#12-typescript)
13. [Testing Strategy](#13-testing)
14. [Rollback Plan](#14-rollback)

---

## 1. Current State Assessment {#1-current-state}

### 1.1 Paraglide (Layer 1 — UI Chrome)

**Status: Functional with workaround.**

The official `@inlang/paraglide-next` plugin is **commented out** in `next.config.js`. Instead, a custom `scripts/generate-messages.js` script flattens the nested JSON in `messages/{locale}.json` into individual JS export functions in `paraglide/messages/`.

| Component | File | Status |
|:----------|:-----|:-------|
| Source translations | `messages/en.json`, `messages/et.json`, `messages/ru.json` | ✅ ~150+ keys per language |
| Compiler script | `scripts/generate-messages.js` | ✅ Custom, works |
| Runtime | `paraglide/runtime.js` | ✅ 3 languages (en, et, ru) |
| Compiled messages | `paraglide/messages.js`, `paraglide/messages/{locale}.js` | ✅ Auto-generated |
| Middleware | `middleware.ts` | ✅ Locale detection, redirect, cookie |
| Context provider | `context/LanguageContext.tsx` | ✅ Syncs URL ↔ Paraglide ↔ React state |
| Layout integration | `app/[locale]/layout.tsx` | ✅ Sets languageTag, validates locale |
| React hook | `hooks/useParaglideTranslations.tsx` | ✅ Namespace-based key lookup |
| Paraglide lib | `lib/paraglide.ts` | ✅ Re-exports, helpers, type definitions |

**Key findings:**
- The `generate-messages.js` script handles `{param}` interpolation via template literals
- Keys are sanitized: dots and hyphens become underscores (`hero.title` → `hero_title`)
- Fallback: if a key is missing in the current locale, English is used
- Build process: `node scripts/generate-messages.js && next build`

**What's missing:**
- New user journey keys (landing hooks, seed motivators, stage introductions)
- The sapling/nursery label update (still "Harjutamine"/"Practice" in some places)
- No variant mechanism in Layer 1 (by design — variants are Layer 2)

### 1.2 Supabase (Layer 2 — Learning Content)

**Status: Partially implemented, two parallel schemas coexist.**

**Schema A (Original — `schema.sql`):**
- `learning_sessions`, `concept_progress`, `dna_progress`, `learning_path_progress`
- `analytics_events`, `user_feedback`
- `locale` enum: `'et' | 'en'` only — **no Russian**

**Schema B (Concept Object — `20260202_concept_objects.sql`):**
- Extends `concepts` table with `stage`, `parent_id`, `sort_order`, `visual_type`, etc.
- `concept_translations` with `locale TEXT` (not enum — RU works here)
- `concept_relationships` for cross-linking
- `evolution_stage` enum: `'dna' | 'seed' | 'sprout' | 'istik' | 'tree' | 'fruits' | 'orchard'`

**Schema C (Marketing — `marketing-schema.sql`):**
- `program_cohorts`, `program_leads`, `program_applications`
- `marketing_page_views`, `cta_interactions`, `discount_codes`
- `program_id` enum: `'aiki' | 'aivo' | 'aime'`

**Schema D (Content Seeds — migrations):**
- `20260130_seed_dna_content.sql` — DNA concepts
- `20260131_seed_tree_content.sql` — Tree content
- `20260201_seed_concepts.sql` — Seed stage concepts
- `20260205_seed_content.sql` — Additional content
- `20260209_russian_translations.sql` — RU translations for ~42 concepts

**Key findings:**
- `concept_translations` uses TEXT for locale (flexible, RU already works)
- `learning_sessions` uses ENUM for locale (rigid, only ET/EN)
- `lib/supabase/types.ts` hardcodes `locale: 'et' | 'en'` — **blocks RU at TypeScript level**
- `lib/supabase.ts` (top-level) provides lazy-initialized client with null safety
- `lib/concepts/api.ts` queries Supabase with mock fallback — **already works for i18n**
- `lib/concepts/mock-data.ts` has ET/EN/RU translations — **more complete than DB**

**What's missing:**
- `content_variants` table (does not exist)
- Russian locale in `locale` enum and TypeScript types
- Variant serving logic (no hook, no selection, no measurement)
- `programs` and `program_translations` tables exist in types but seeding status is unclear

### 1.3 Content Data

| Source | Format | Languages | Status |
|:-------|:-------|:----------|:-------|
| `data/tree-concepts.json` | JSON, 16 concepts | ET only | Legacy, pre-Concept Object |
| `data/learning-paths.json` | JSON, path definitions | Unknown | Legacy |
| `lib/concepts/mock-data.ts` | TypeScript, all DNA concepts | EN, ET, RU | Active fallback |
| `concept_translations` (DB) | SQL, ~42 concepts | EN, ET, RU | Active |
| `messages/*.json` | JSON, ~150+ keys | EN, ET, RU | Active (Layer 1) |

---

## 2. Target Architecture {#2-target-architecture}

### 2.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER REQUEST                              │
│                    (locale from URL/cookie)                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
┌───────────────┐       ┌────────────────────┐
│   LAYER 1     │       │     LAYER 2        │
│   Paraglide   │       │     Supabase       │
│               │       │                    │
│  Static UI    │       │  Dynamic Content   │
│  - Buttons    │       │  - Titles          │
│  - Labels     │       │  - Explanations    │
│  - Navigation │       │  - Metaphors       │
│  - Stage names│       │  - Hooks           │
│  - Errors     │       │  - Deep-dives      │
│  - Tooltips   │       │  - Variants        │
│               │       │                    │
│  Source:      │       │  Source:            │
│  messages/    │       │  concept_           │
│  {locale}.json│       │  translations +    │
│               │       │  content_variants  │
│  Compile-time │       │  Runtime query     │
│  Zero latency │       │  ~50ms latency     │
└───────┬───────┘       └────────┬───────────┘
        │                        │
        ▼                        ▼
┌─────────────────────────────────────────────┐
│              RENDERING LOGIC                 │
│                                              │
│  1. Render Layer 1 immediately (SSR/static)  │
│  2. Check Layer 2 for variant override       │
│  3. If variant exists → use variant          │
│  4. If no variant → Layer 1 is final         │
│  5. Log impression for measurement           │
└──────────────────────────────────────────────┘
```

### 2.2 Fallback Chain

For any translatable content key, the resolution order is:

```
1. content_variants (active, matching locale, weighted random) → HIGHEST PRIORITY
2. concept_translations (matching locale)                      → DEFAULT CONTENT
3. concept_translations (English fallback)                     → LANGUAGE FALLBACK
4. MOCK_DATA (matching locale)                                 → OFFLINE FALLBACK
5. MOCK_DATA (English)                                         → LAST RESORT
6. Key itself (e.g., "tokenization.title")                     → ERROR STATE
```

For Layer 1 (Paraglide) content:

```
1. messages/{current_locale}.json → key found → DONE
2. messages/en.json → key found → DONE
3. Return raw key string → ERROR STATE
```

### 2.3 What Goes Where — Decision Matrix

| Question | Answer → Layer |
|:---------|:--------------|
| Is this a button label, navigation item, or structural element? | Layer 1 (Paraglide) |
| Is this the same text regardless of which concept is shown? | Layer 1 (Paraglide) |
| Does this text change based on learning content? | Layer 2 (Supabase) |
| Might we want to A/B test different versions? | Layer 2 (Supabase) |
| Is this a concept title, explanation, or metaphor? | Layer 2 (Supabase) |
| Is this an error message or form validation? | Layer 1 (Paraglide) |
| Is this a program description or marketing copy? | Layer 2 (Supabase) |
| Is this the stage name shown in StageSelector? | Layer 1 (Paraglide) |
| Is this the stage introduction shown on the stage page? | Layer 2 (Supabase) |

---

## 3. Phase 0: Locale Unification {#3-phase-0}

**Priority:** CRITICAL — blocks all other phases  
**Effort:** Small (~2 hours)  
**Risk:** Low

### Problem

Russian (`'ru'`) is partially supported. It works in:
- `messages/ru.json` ✅
- `paraglide/runtime.js` (availableLanguageTags includes "ru") ✅
- `concept_translations` table (TEXT field, not constrained) ✅
- `mock-data.ts` ✅

It does NOT work in:
- `locale` enum in `schema.sql` (only 'et' | 'en') ❌
- `lib/supabase/types.ts` (hardcoded `'et' | 'en'`) ❌
- `learning_sessions.locale` column ❌
- All marketing schema tables that reference `locale` ❌

### Solution

#### 3.1 Database Migration

```sql
-- Phase 0: Add Russian to locale enum
-- File: supabase/migrations/20260215_add_russian_locale.sql

-- Add 'ru' to the locale enum
ALTER TYPE locale ADD VALUE IF NOT EXISTS 'ru';

-- Verify
SELECT enum_range(NULL::locale);
-- Expected: {et,en,ru}
```

#### 3.2 TypeScript Type Updates

**File: `lib/supabase/types.ts`**

Find every occurrence of `locale: 'et' | 'en'` and replace with `locale: 'et' | 'en' | 'ru'`.

Affected tables in types:
- `learning_sessions` (Row, Insert, Update)
- `program_translations` (Row, Insert, Update)
- `node_translations` (Row, Insert, Update)

Also update:
- `get_or_create_session` function args: `p_locale?: 'et' | 'en'` → `p_locale?: 'et' | 'en' | 'ru'`
- Enums section: `locale: 'et' | 'en'` → `locale: 'et' | 'en' | 'ru'`

#### 3.3 Schema.sql Update

**File: `lib/supabase/schema.sql`**

```sql
-- Update locale enum definition
CREATE TYPE locale AS ENUM ('et', 'en', 'ru');
```

#### 3.4 Marketing Schema Update

**File: `lib/supabase/marketing-schema.sql`**

All references to `locale locale DEFAULT 'et'` are fine (the column type uses the enum, which now includes 'ru').

### Verification

After Phase 0:
- [ ] `SELECT enum_range(NULL::locale)` returns `{et,en,ru}`
- [ ] TypeScript compilation succeeds with no type errors
- [ ] A learning session can be created with `locale: 'ru'`
- [ ] All three language versions of the landing page load correctly

---

## 4. Phase 1: Paraglide Layer Extension {#4-phase-1}

**Priority:** HIGH — improves user journey immediately  
**Effort:** Medium (~4 hours)  
**Risk:** Low  
**Depends on:** Nothing (independent of Phase 0)

### 4.1 New Keys to Add

Add the following keys to `messages/en.json`, `messages/et.json`, and `messages/ru.json`:

```jsonc
// Structure to add (shown in EN; ET and RU values from Translation Principles doc)
{
  "landing": {
    "hook": "You already use AI. Now understand how it works.",
    "subhook": "Dendrix shows AI mechanisms the way biology shows what's inside a cell.",
    "ctaPrimary": "Start with DNA",
    "ctaSecondary": "Explore the map"
  },
  "seed": {
    "motivator": "What do you need?",
    "pathPractical": "How does this change my work?",
    "pathCareer": "A new profession in 6 weeks",
    "pathCurious": "What's actually inside AI?"
  },
  "stageIntro": {
    "dna": "See what's inside AI.",
    "seed": "Where knowledge comes from.",
    "sprout": "What emerges from training.",
    "sapling": "Try it yourself — safely.",
    "tree": "Go deep when you're ready.",
    "fruits": "Build something real.",
    "orchard": "Make it your career."
  },
  "stageQuestion": {
    "dna": "How does one prediction work?",
    "seed": "Where does AI knowledge come from?",
    "sprout": "What does a trained model become?",
    "sapling": "Can I actually do this myself?",
    "tree": "How deep does this go?",
    "fruits": "What can I build with this?",
    "orchard": "Where does this take me?"
  }
}
```

### 4.2 Sapling/Nursery Label Update

Update existing keys in all three language files:

```jsonc
// messages/en.json — update existing keys
{
  "treeView": {
    // ... existing keys ...
    "saplingLabel": "4. The Nursery"  // was "4. Sapling"
  },
  "levels": {
    // ... existing keys ...
    "sapling": "The Nursery"  // was "Sapling" or "Practice"
  }
}

// messages/et.json
{
  "treeView": {
    "saplingLabel": "4. Puukool"  // was "4. Istik" or "4. Taimelavad"
  },
  "levels": {
    "sapling": "Puukool"  // was "Harjutamine" or "Taimelavad"
  }
}

// messages/ru.json
{
  "treeView": {
    "saplingLabel": "4. Питомник"  // was "4. Практика"
  },
  "levels": {
    "sapling": "Питомник"  // was "Практика"
  }
}
```

### 4.3 Stage Sublabel Update

Ensure `stages.sub.*` keys exist and reflect the current naming:

```jsonc
// All three files need these keys
"stages": {
  "sub": {
    "dna": "Mechanism / Mehhanism / Механизм",
    "seed": "Data & Training / Andmed ja treenimine / Данные и обучение",
    "sprout": "Emergence / Esilekerkimine / Возникновение",
    "sapling": "The Nursery / Puukool / Питомник",
    "tree": "Knowledge / Teadmised / Знания",
    "fruits": "Applications / Rakendused / Применения",
    "orchard": "Careers / Karjääriteed / Карьерные пути"
  }
}
```

### 4.4 Build Verification

After adding keys:
1. Run `node scripts/generate-messages.js` — should generate updated `paraglide/messages/*.js`
2. Run `next build` — should compile without errors
3. Check that new keys appear in `paraglide/messages.js` as exported functions
4. Verify all three locales have the new keys (script logs key count)

---

## 5. Phase 2: Content Variant Infrastructure {#5-phase-2}

**Priority:** HIGH — core innovation  
**Effort:** Medium (~6 hours)  
**Risk:** Medium (new table, new query patterns)  
**Depends on:** Phase 0 (locale enum must include 'ru')

### 5.1 New Table: `content_variants`

```sql
-- File: supabase/migrations/20260216_content_variants.sql

-- ============================================================
-- CONTENT VARIANT SYSTEM
-- Enables A/B testing of content across the platform
-- Reference: I18N_TRANSLATION_PRINCIPLES.md, Section 8
-- ============================================================

CREATE TABLE IF NOT EXISTS content_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- What this variant replaces
  -- Convention: "scope:entity:field"
  -- Examples:
  --   "concept:tokenization:title"
  --   "concept:tokenization:explanation"
  --   "concept:attention:metaphor"
  --   "landing:hook"
  --   "sapling:intro"
  --   "stage:dna:intro"
  --   "program:aiki:tagline"
  content_key TEXT NOT NULL,
  locale TEXT NOT NULL,  -- 'en', 'et', 'ru' (TEXT, not enum — future-proof)
  
  -- Variant identity
  variant_name TEXT NOT NULL,  -- 'base', 'practical', 'provocative', 'personal', 'emotional'
  content TEXT NOT NULL,       -- The actual text content
  
  -- Control
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight FLOAT NOT NULL DEFAULT 1.0 CHECK (weight > 0 AND weight <= 10),
  
  -- Measurement (denormalized for query speed)
  impressions INTEGER NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,   -- clicks, "next", expand, time-on-concept
  conversions INTEGER NOT NULL DEFAULT 0,   -- user proceeds to next stage
  
  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by TEXT,  -- author identifier for audit
  
  -- Constraints
  UNIQUE(content_key, locale, variant_name)
);

-- Indexes for serving
CREATE INDEX idx_variants_serving 
  ON content_variants(content_key, locale) 
  WHERE is_active = true;

-- Index for analytics
CREATE INDEX idx_variants_analytics 
  ON content_variants(content_key, locale, variant_name);

-- RLS
ALTER TABLE content_variants ENABLE ROW LEVEL SECURITY;

-- Public read for active variants (client-side serving)
CREATE POLICY "Read active variants" 
  ON content_variants 
  FOR SELECT 
  USING (is_active = true);

-- Admin insert/update (service role only — via server actions)
CREATE POLICY "Admin manage variants" 
  ON content_variants 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Updated_at trigger
CREATE TRIGGER update_content_variants_updated_at
  BEFORE UPDATE ON content_variants
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 5.2 Measurement Functions

```sql
-- Record a variant impression (called when variant is served)
CREATE OR REPLACE FUNCTION record_variant_impression(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET impressions = impressions + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Record a variant engagement (click, expand, "next")
CREATE OR REPLACE FUNCTION record_variant_engagement(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET engagements = engagements + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Record a conversion (user proceeds to next stage)
CREATE OR REPLACE FUNCTION record_variant_conversion(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET conversions = conversions + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

-- Get variant performance summary
CREATE OR REPLACE FUNCTION get_variant_performance(
  p_content_key TEXT,
  p_locale TEXT DEFAULT NULL
) RETURNS TABLE (
  content_key TEXT,
  locale TEXT,
  variant_name TEXT,
  content TEXT,
  impressions INTEGER,
  engagements INTEGER,
  conversions INTEGER,
  engagement_rate FLOAT,
  conversion_rate FLOAT,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cv.content_key,
    cv.locale,
    cv.variant_name,
    cv.content,
    cv.impressions,
    cv.engagements,
    cv.conversions,
    CASE WHEN cv.impressions > 0 
      THEN cv.engagements::FLOAT / cv.impressions 
      ELSE 0 
    END as engagement_rate,
    CASE WHEN cv.impressions > 0 
      THEN cv.conversions::FLOAT / cv.impressions 
      ELSE 0 
    END as conversion_rate,
    cv.is_active
  FROM content_variants cv
  WHERE cv.content_key = p_content_key
    AND (p_locale IS NULL OR cv.locale = p_locale)
  ORDER BY cv.locale, cv.impressions DESC;
END;
$$ LANGUAGE plpgsql;
```

### 5.3 Seed Data: First Experiment

```sql
-- File: supabase/migrations/20260216_seed_first_variants.sql

-- ============================================================
-- FIRST EXPERIMENT: DNA Tokenization Title (Estonian)
-- Tests three framings of the same concept
-- ============================================================

INSERT INTO content_variants (content_key, locale, variant_name, content, weight) VALUES

-- Estonian variants
('concept:tokenization:title', 'et', 'base', 
 'Kuidas AI teksti loeb', 1.0),
('concept:tokenization:title', 'et', 'practical', 
 'Miks eesti keel on AI-le kallis', 1.0),
('concept:tokenization:title', 'et', 'provocative', 
 'Sinu lause koosneb 47 tükist', 1.0),

-- English variants
('concept:tokenization:title', 'en', 'base', 
 'How AI Reads Text', 1.0),
('concept:tokenization:title', 'en', 'practical', 
 'Why Your Language Costs AI More', 1.0),
('concept:tokenization:title', 'en', 'provocative', 
 'Your Sentence Has 47 Pieces', 1.0),

-- Russian variants
('concept:tokenization:title', 'ru', 'base', 
 'Как ИИ читает текст', 1.0),
('concept:tokenization:title', 'ru', 'practical', 
 'Почему русский язык дорого обходится ИИ', 1.0),
('concept:tokenization:title', 'ru', 'provocative', 
 'Ваше предложение состоит из 47 частей', 1.0),

-- ============================================================
-- SECOND EXPERIMENT: Landing Page Hook
-- ============================================================

-- Estonian
('landing:hook', 'et', 'base', 
 'Sa juba kasutad AI-d. Nüüd mõista, kuidas see töötab.', 1.0),
('landing:hook', 'et', 'practical', 
 'AI kirjutab su e-kirju. Kas sa ei peaks teadma, kuidas?', 1.0),
('landing:hook', 'et', 'provocative', 
 'AI tegi 47 otsust, kuni sa seda lauset lugesid.', 1.0),

-- English
('landing:hook', 'en', 'base', 
 'You already use AI. Now understand how it works.', 1.0),
('landing:hook', 'en', 'practical', 
 'AI writes your emails. Shouldn''t you know how?', 1.0),
('landing:hook', 'en', 'provocative', 
 'AI made 47 decisions while you read this sentence.', 1.0),

-- Russian
('landing:hook', 'ru', 'base', 
 'Вы уже используете ИИ. Теперь поймите, как он работает.', 1.0),
('landing:hook', 'ru', 'practical', 
 'ИИ пишет ваши письма. Не стоит ли разобраться, как?', 1.0),
('landing:hook', 'ru', 'provocative', 
 'ИИ принял 47 решений, пока вы читали это предложение.', 1.0)

ON CONFLICT (content_key, locale, variant_name) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = now();
```

---

## 6. Phase 3: Variant Serving Logic {#6-phase-3}

**Priority:** HIGH — connects infrastructure to UI  
**Effort:** Medium (~6 hours)  
**Risk:** Medium (new hook, session management)  
**Depends on:** Phase 2 (content_variants table must exist)

### 6.1 Variant Types

**File: `lib/variants/types.ts`**

```typescript
export interface ContentVariant {
  id: string;
  content_key: string;
  locale: string;
  variant_name: string;
  content: string;
  weight: number;
}

export interface VariantSelection {
  content: string;
  variant_name: string;
  content_key: string;
  locale: string;
}

export type VariantStrategy = 'weighted_random' | 'highest_weight' | 'round_robin';
```

### 6.2 Variant Service

**File: `lib/variants/service.ts`**

```typescript
import { getSupabase } from '@/lib/supabase';
import type { ContentVariant, VariantSelection } from './types';

// Session-level cache: same variant for the entire session
const sessionCache = new Map<string, VariantSelection>();

/**
 * Get a content variant for the given key and locale.
 * Returns null if no variants exist (caller should use default content).
 * 
 * Variants are session-sticky: the same user sees the same variant
 * throughout their session to avoid confusion and enable clean measurement.
 */
export async function getVariant(
  contentKey: string,
  locale: string
): Promise<VariantSelection | null> {
  const cacheKey = `${contentKey}:${locale}`;
  
  // 1. Check session cache
  const cached = sessionCache.get(cacheKey);
  if (cached) return cached;
  
  // 2. Query active variants
  const supabase = getSupabase();
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from('content_variants')
      .select('content_key, locale, variant_name, content, weight')
      .eq('content_key', contentKey)
      .eq('locale', locale)
      .eq('is_active', true);
    
    if (error || !data || data.length === 0) return null;
    
    // 3. Weighted random selection
    const selected = weightedRandom(data as ContentVariant[]);
    
    const selection: VariantSelection = {
      content: selected.content,
      variant_name: selected.variant_name,
      content_key: selected.content_key,
      locale: selected.locale,
    };
    
    // 4. Cache for session
    sessionCache.set(cacheKey, selection);
    
    // 5. Record impression (fire-and-forget)
    supabase.rpc('record_variant_impression', {
      p_content_key: contentKey,
      p_locale: locale,
      p_variant_name: selected.variant_name,
    }).then(() => {}).catch(() => {});
    
    return selection;
  } catch (err) {
    console.error('getVariant error:', err);
    return null;
  }
}

/**
 * Record an engagement event for a variant.
 * Call this when the user interacts with the content (click, expand, etc.)
 */
export async function recordEngagement(selection: VariantSelection): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  
  try {
    await supabase.rpc('record_variant_engagement', {
      p_content_key: selection.content_key,
      p_locale: selection.locale,
      p_variant_name: selection.variant_name,
    });
  } catch (err) {
    console.error('recordEngagement error:', err);
  }
}

/**
 * Record a conversion event for a variant.
 * Call this when the user proceeds to the next stage or completes a goal.
 */
export async function recordConversion(selection: VariantSelection): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  
  try {
    await supabase.rpc('record_variant_conversion', {
      p_content_key: selection.content_key,
      p_locale: selection.locale,
      p_variant_name: selection.variant_name,
    });
  } catch (err) {
    console.error('recordConversion error:', err);
  }
}

/**
 * Clear session cache (e.g., when user changes language)
 */
export function clearVariantCache(): void {
  sessionCache.clear();
}

// ── Utilities ────────────────────────────────

function weightedRandom(variants: ContentVariant[]): ContentVariant {
  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;
  
  for (const variant of variants) {
    random -= variant.weight;
    if (random <= 0) return variant;
  }
  
  return variants[variants.length - 1]; // Fallback
}
```

### 6.3 React Hook

**File: `hooks/useContentVariant.ts`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { getVariant, recordEngagement, type VariantSelection } from '@/lib/variants/service';

/**
 * Hook to get a content variant with automatic locale detection.
 * Returns the variant content or null (caller uses default).
 * 
 * Usage:
 *   const variant = useContentVariant('concept:tokenization:title');
 *   const title = variant?.content ?? defaultTitle;
 */
export function useContentVariant(contentKey: string): VariantSelection | null {
  const { locale } = useLanguage();
  const [variant, setVariant] = useState<VariantSelection | null>(null);
  
  useEffect(() => {
    let cancelled = false;
    
    getVariant(contentKey, locale).then((v) => {
      if (!cancelled) setVariant(v);
    });
    
    return () => { cancelled = true; };
  }, [contentKey, locale]);
  
  return variant;
}

/**
 * Hook to get content with variant override.
 * Provides the resolved content string directly.
 * 
 * Usage:
 *   const title = useContentWithVariant(
 *     'concept:tokenization:title',
 *     m.concept_tokenization_title()  // Paraglide default
 *   );
 */
export function useContentWithVariant(
  contentKey: string, 
  defaultContent: string
): { content: string; variant: VariantSelection | null } {
  const variant = useContentVariant(contentKey);
  
  return {
    content: variant?.content ?? defaultContent,
    variant,
  };
}

// Re-export for convenience
export { recordEngagement, recordConversion } from '@/lib/variants/service';
```

### 6.4 Integration Pattern

How components should use the variant system:

```tsx
// Example: ConceptCard component
import * as m from '@/paraglide/messages';
import { useContentWithVariant, recordEngagement } from '@/hooks/useContentVariant';

function ConceptCard({ concept }: { concept: Concept }) {
  // Layer 2 content from Supabase (concept_translations)
  // with potential variant override from content_variants
  const { content: title, variant } = useContentWithVariant(
    `concept:${concept.id}:title`,
    concept.title  // Default from concept_translations
  );
  
  const handleExpand = () => {
    // Record engagement when user interacts
    if (variant) recordEngagement(variant);
    // ... expand logic
  };
  
  return (
    <div onClick={handleExpand}>
      <h3>{title}</h3>
      <p>{concept.explanation}</p>
    </div>
  );
}
```

---

## 7. Phase 4: Measurement & Analytics {#7-phase-4}

**Priority:** MEDIUM — needed once variants are live  
**Effort:** Small (~3 hours)  
**Risk:** Low  
**Depends on:** Phase 3

### 7.1 Variant Dashboard Query

For an admin dashboard or Supabase Studio analysis:

```sql
-- Performance overview for all active experiments
SELECT 
  content_key,
  locale,
  variant_name,
  LEFT(content, 50) as content_preview,
  impressions,
  engagements,
  conversions,
  ROUND(CASE WHEN impressions > 0 
    THEN (engagements::NUMERIC / impressions) * 100 
    ELSE 0 END, 1) as engagement_pct,
  ROUND(CASE WHEN impressions > 0 
    THEN (conversions::NUMERIC / impressions) * 100 
    ELSE 0 END, 1) as conversion_pct,
  weight
FROM content_variants
WHERE is_active = true
ORDER BY content_key, locale, impressions DESC;
```

### 7.2 Statistical Significance Check

A variant needs approximately **100 impressions per variant** before drawing conclusions. With 3 variants per key, that's ~300 total impressions per content_key per locale.

```sql
-- Find experiments ready for analysis (100+ impressions per variant)
SELECT 
  content_key,
  locale,
  COUNT(*) as variant_count,
  MIN(impressions) as min_impressions,
  MAX(impressions) as max_impressions,
  SUM(impressions) as total_impressions,
  CASE WHEN MIN(impressions) >= 100 THEN 'READY' ELSE 'COLLECTING' END as analysis_status
FROM content_variants
WHERE is_active = true
GROUP BY content_key, locale
ORDER BY total_impressions DESC;
```

### 7.3 Auto-Weight Adjustment (Future)

Once sufficient data is collected, variant weights can be adjusted to favor better-performing variants. This is a **future enhancement** — start with equal weights.

---

## 8. Phase 5: Content Migration {#8-phase-5}

**Priority:** MEDIUM — aligns with V&S Phase 2 (Concept Object Foundation)  
**Effort:** Large (~8 hours)  
**Risk:** Medium  
**Depends on:** Phase 0, Phase 1

### 8.1 Concept Translation Audit

Review all existing `concept_translations` entries against the Translation Principles document:

| Check | Current State | Target State |
|:------|:-------------|:-------------|
| `title` length | Many are technical names (e.g., "Tokenization") | Inviting phrases ≤ 6 words |
| `explanation` length | 30-50 words (too long) | 12-18 words (one breath) |
| `metaphor` quality | Mixed — some good, some academic | All from everyday experience |
| `question` presence | Exists for DNA, missing elsewhere | Required for all concepts |
| `deep_dive` usage | Mostly NULL | Previous `explanation` content moved here |
| `completion_message` | Exists for DNA only | Required for all interactive concepts |
| `hint` | Exists for DNA only | Required for all interactive concepts |

### 8.2 Migration Script: explanation → deep_dive

```sql
-- Move long explanations to deep_dive, replace with one-breath versions
-- This is a TEMPLATE — actual one-breath texts must be written per Translation Principles

-- Step 1: Copy current explanation to deep_dive where deep_dive is NULL
UPDATE concept_translations
SET deep_dive = explanation
WHERE deep_dive IS NULL 
  AND LENGTH(explanation) > 100;  -- Only for long explanations

-- Step 2: Update explanation with one-breath versions
-- (These must be provided from Translation Principles authoring process)
-- Example for tokenization:
UPDATE concept_translations SET explanation = 
  'Text shatters into tiny numbered pieces — the only language machines understand.'
WHERE concept_id = 'tokenization' AND locale = 'en';

UPDATE concept_translations SET explanation = 
  'Tekst puruneb väikesteks numbriteks — ainus keel, mida masinad mõistavad.'
WHERE concept_id = 'tokenization' AND locale = 'et';

UPDATE concept_translations SET explanation = 
  'Текст рассыпается на крошечные числа — единственный язык, понятный машине.'
WHERE concept_id = 'tokenization' AND locale = 'ru';
```

### 8.3 Mock Data Sync

After database updates, sync `lib/concepts/mock-data.ts` to match the new content. The mock data serves as offline fallback and must mirror the database exactly.

---

## 9. Required Changes to Vision & Strategy {#9-vs-changes}

The following additions/modifications are needed in `docs/VISION_AND_STRATEGY.md` V3.0 to align with this migration plan.

### 9.1 Add to Decision 7 (Concept Object Architecture)

**Insert after "Key Design Principles", before "TypeScript SDK":**

```markdown
#### Content Variant Layer

On top of the concept_translations system, a `content_variants` table enables
A/B testing of content framing. Variants do not replace concept_translations —
they override specific fields for measurement purposes.

**Key rules:**
1. Every variant key references a specific concept_translations field
   (e.g., `concept:tokenization:title`)
2. A `base` variant must always exist that matches the concept_translations value
3. Variants are session-sticky — same user sees same variant per session
4. Measurement is built into the table (impressions, engagements, conversions)
5. Maximum 4 variants per key per locale

See `docs/I18N_TRANSLATION_PRINCIPLES.md` for content authoring guidelines
and `docs/I18N_TECHNICAL_MIGRATION.md` for implementation details.
```

### 9.2 Update Decision 7 Key Design Principle 4

**Current:**
> **Translations are always in the database.** No more hardcoded strings, no more inline `{en, et}` objects, no more ParaglideJS for content (ParaglideJS stays for UI chrome — buttons, labels, navigation).

**Update to:**
> **Two-layer translation architecture.** Layer 1 (ParaglideJS) handles UI chrome — buttons, labels, navigation, stage names, structural text. Layer 2 (Supabase `concept_translations` + `content_variants`) handles learning content — titles, explanations, metaphors, hooks, deep-dives. Content variants enable A/B testing of Layer 2 content. See `docs/I18N_TRANSLATION_PRINCIPLES.md` for the authoritative content guidelines.

### 9.3 Add to Decision 1 (Level Structure) — Stage Name Update

**Add row to the "Stage Definitions" table:**

| Stage | Estonian | EN User Label | ET User Label | RU User Label |
|:---|:---|:---|:---|:---|
| **Sapling (Istik)** | Istik | The Nursery | Puukool | Питомник |

**Add note below the table:**
> **Naming convention:** The stage ID in code remains `sapling` (or `istik` in the evolution_stage enum). The user-facing name is "The Nursery" (EN), "Puukool" (ET), "Питомник" (RU). The metaphor: a nursery (puukool) is where young seedlings (istikud/saplings/саженцы) are cultivated under controlled conditions — perfectly mirroring guided practice before the open field of full knowledge.

### 9.4 Add to Execution Roadmap

**Insert into "Next (Phase 2)" section:**

```markdown
5. Implement two-layer i18n architecture (see docs/I18N_TECHNICAL_MIGRATION.md):
   a. Phase 0: Locale unification (add 'ru' to enum and TypeScript types)
   b. Phase 1: Extend Paraglide keys for new user journey
   c. Phase 2: Create content_variants table and measurement functions
   d. Phase 3: Build variant serving hook and integrate with components
```

### 9.5 Add New Document Reference

**Add to the top of the document, after the "Implementation Rules" callout:**

```markdown
> **Translation & i18n:** See [`docs/I18N_TRANSLATION_PRINCIPLES.md`](./I18N_TRANSLATION_PRINCIPLES.md)
> for content writing guidelines and [`docs/I18N_TECHNICAL_MIGRATION.md`](./I18N_TECHNICAL_MIGRATION.md)
> for the two-layer architecture implementation plan.
```

### 9.6 Update the `evolution_stage` Enum Note

**In Decision 7, the Concept Object schema shows:**
```
├── stage: enum ('dna' | 'seed' | 'sprout' | 'istik' | 'tree' | 'fruits' | 'orchard')
```

**Note:** The actual database migration (`20260202_concept_objects.sql`) uses `'istik'` as the enum value. This should be documented as: **code-level ID is `istik` (Estonian) or `sapling` (route), user-facing label is "The Nursery / Puukool / Питомник".**

---

## 10. File-by-File Change Registry {#10-file-registry}

Complete list of files that need changes, organized by phase.

### Phase 0 (Locale Unification)

| File | Change | Type |
|:-----|:-------|:-----|
| `supabase/migrations/20260215_add_russian_locale.sql` | **CREATE** — Add 'ru' to locale enum | SQL migration |
| `lib/supabase/types.ts` | **EDIT** — Replace all `'et' \| 'en'` with `'et' \| 'en' \| 'ru'` | TypeScript |
| `lib/supabase/schema.sql` | **EDIT** — Update locale enum definition to include 'ru' | SQL reference |

### Phase 1 (Paraglide Extension)

| File | Change | Type |
|:-----|:-------|:-----|
| `messages/en.json` | **EDIT** — Add landing, seed, stageIntro, stageQuestion keys; update sapling labels | JSON |
| `messages/et.json` | **EDIT** — Same keys with Estonian content | JSON |
| `messages/ru.json` | **EDIT** — Same keys with Russian content | JSON |

After editing, run `node scripts/generate-messages.js` to regenerate compiled output.

### Phase 2 (Variant Infrastructure)

| File | Change | Type |
|:-----|:-------|:-----|
| `supabase/migrations/20260216_content_variants.sql` | **CREATE** — content_variants table, RLS, indexes | SQL migration |
| `supabase/migrations/20260216_variant_functions.sql` | **CREATE** — measurement RPC functions | SQL migration |
| `supabase/migrations/20260216_seed_first_variants.sql` | **CREATE** — Initial experiment data | SQL migration |
| `lib/supabase/types.ts` | **EDIT** — Add content_variants table types | TypeScript |

### Phase 3 (Variant Serving)

| File | Change | Type |
|:-----|:-------|:-----|
| `lib/variants/types.ts` | **CREATE** — Variant TypeScript interfaces | TypeScript |
| `lib/variants/service.ts` | **CREATE** — Variant selection, caching, measurement | TypeScript |
| `lib/variants/index.ts` | **CREATE** — Re-exports | TypeScript |
| `hooks/useContentVariant.ts` | **CREATE** — React hooks for variant consumption | TypeScript/React |

### Phase 4 (Measurement)

| File | Change | Type |
|:-----|:-------|:-----|
| No new files | Use Supabase Studio or future admin dashboard | — |

### Phase 5 (Content Migration)

| File | Change | Type |
|:-----|:-------|:-----|
| `supabase/migrations/20260217_content_audit.sql` | **CREATE** — explanation → deep_dive migration | SQL migration |
| `lib/concepts/mock-data.ts` | **EDIT** — Sync with updated database content | TypeScript |

### Vision & Strategy Updates

| File | Change | Type |
|:-----|:-------|:-----|
| `docs/VISION_AND_STRATEGY.md` | **EDIT** — See Section 9 of this document | Markdown |
| `docs/I18N_TRANSLATION_PRINCIPLES.md` | **CREATE** — Companion document | Markdown |
| `docs/I18N_TECHNICAL_MIGRATION.md` | **CREATE** — This document | Markdown |

---

## 11. Complete Supabase Migration SQL {#11-migration-sql}

For convenience, all SQL changes consolidated:

```sql
-- ============================================================
-- DENDRIX.AI i18n MIGRATION — COMPLETE SQL
-- Run in order. Each section is idempotent (safe to re-run).
-- ============================================================

-- ── PHASE 0: Locale Unification ──────────────────────────────

ALTER TYPE locale ADD VALUE IF NOT EXISTS 'ru';

-- ── PHASE 2: Content Variants ────────────────────────────────

CREATE TABLE IF NOT EXISTS content_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL,
  locale TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight FLOAT NOT NULL DEFAULT 1.0 CHECK (weight > 0 AND weight <= 10),
  impressions INTEGER NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by TEXT,
  UNIQUE(content_key, locale, variant_name)
);

CREATE INDEX IF NOT EXISTS idx_variants_serving 
  ON content_variants(content_key, locale) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_variants_analytics 
  ON content_variants(content_key, locale, variant_name);

ALTER TABLE content_variants ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Read active variants') THEN
    CREATE POLICY "Read active variants" ON content_variants FOR SELECT USING (is_active = true);
  END IF;
END $$;

-- Measurement functions (see Section 5.2 for full definitions)
-- ... (included above)

-- ── PHASE 2b: Seed First Experiment ──────────────────────────
-- ... (included above in Section 5.3)
```

---

## 12. TypeScript Interface Changes {#12-typescript}

### 12.1 Addition to `lib/supabase/types.ts`

Add inside `Database['public']['Tables']`:

```typescript
content_variants: {
  Row: {
    id: string
    content_key: string
    locale: string
    variant_name: string
    content: string
    is_active: boolean
    weight: number
    impressions: number
    engagements: number
    conversions: number
    created_at: string
    updated_at: string
    created_by: string | null
  }
  Insert: {
    id?: string
    content_key: string
    locale: string
    variant_name: string
    content: string
    is_active?: boolean
    weight?: number
    impressions?: number
    engagements?: number
    conversions?: number
    created_at?: string
    updated_at?: string
    created_by?: string | null
  }
  Update: {
    id?: string
    content_key?: string
    locale?: string
    variant_name?: string
    content?: string
    is_active?: boolean
    weight?: number
    impressions?: number
    engagements?: number
    conversions?: number
    created_at?: string
    updated_at?: string
    created_by?: string | null
  }
}
```

### 12.2 Addition to Functions

```typescript
record_variant_impression: {
  Args: {
    p_content_key: string
    p_locale: string
    p_variant_name: string
  }
  Returns: void
}
record_variant_engagement: {
  Args: {
    p_content_key: string
    p_locale: string
    p_variant_name: string
  }
  Returns: void
}
record_variant_conversion: {
  Args: {
    p_content_key: string
    p_locale: string
    p_variant_name: string
  }
  Returns: void
}
```

---

## 13. Testing Strategy {#13-testing}

### 13.1 Phase 0 Tests

```typescript
// test/i18n/locale-support.test.ts
describe('Locale Support', () => {
  test('all three locales are available in Paraglide', () => {
    expect(availableLanguageTags).toEqual(['en', 'et', 'ru']);
  });
  
  test('middleware redirects unknown locale to default', async () => {
    // Request /fr/some-page → should redirect to /et/some-page
  });
  
  test('locale cookie is set on navigation', async () => {
    // Navigate to /ru/ → NEXT_LOCALE cookie should be 'ru'
  });
});
```

### 13.2 Phase 2 Tests

```typescript
// test/i18n/variants.test.ts
describe('Content Variants', () => {
  test('getVariant returns null when no variants exist', async () => {
    const result = await getVariant('nonexistent:key', 'en');
    expect(result).toBeNull();
  });
  
  test('getVariant returns a variant when available', async () => {
    // Seed test data, then verify
  });
  
  test('session cache returns same variant on repeated calls', async () => {
    const v1 = await getVariant('concept:tokenization:title', 'et');
    const v2 = await getVariant('concept:tokenization:title', 'et');
    expect(v1?.variant_name).toEqual(v2?.variant_name);
  });
  
  test('clearVariantCache resets selection', async () => {
    // Verify that after clear, a new selection is made
  });
  
  test('weightedRandom respects weights', () => {
    // With weight 10 vs weight 0.1, the heavy one should win ~99% of the time
  });
});
```

### 13.3 Integration Tests

```typescript
// test/i18n/integration.test.ts
describe('i18n Integration', () => {
  test('concept card shows variant content when available', async () => {
    // Render ConceptCard with variant data
    // Verify title uses variant content, not default
  });
  
  test('concept card falls back to default when no variant exists', async () => {
    // Render ConceptCard without variant data
    // Verify title uses concept_translations content
  });
  
  test('language switch clears variant cache', async () => {
    // Switch from ET to EN
    // Verify new variants are loaded for EN
  });
});
```

---

## 14. Rollback Plan {#14-rollback}

Each phase can be rolled back independently.

### Phase 0 Rollback
- Enum values cannot be removed in PostgreSQL. However, the 'ru' value being present has no side effects — existing code simply doesn't use it.
- Revert TypeScript type changes in `types.ts`.

### Phase 1 Rollback
- Revert changes to `messages/*.json` files.
- Re-run `node scripts/generate-messages.js`.
- Unused keys in JSON have no runtime impact.

### Phase 2 Rollback
- `DROP TABLE IF EXISTS content_variants CASCADE;`
- `DROP FUNCTION IF EXISTS record_variant_impression;`
- `DROP FUNCTION IF EXISTS record_variant_engagement;`
- `DROP FUNCTION IF EXISTS record_variant_conversion;`
- `DROP FUNCTION IF EXISTS get_variant_performance;`
- Remove TypeScript types from `types.ts`.

### Phase 3 Rollback
- Delete `lib/variants/` directory.
- Delete `hooks/useContentVariant.ts`.
- Components fall back to default content (no variant override).

### Phase 5 Rollback
- Restore `concept_translations.explanation` from `deep_dive` backup.
- Revert `mock-data.ts` changes.

---

## Appendix A: Phase Dependency Graph

```
Phase 0 (Locale) ──────────────────┐
                                    ├──→ Phase 2 (Variant Table) ──→ Phase 3 (Serving) ──→ Phase 4 (Measurement)
Phase 1 (Paraglide) ──────────────┘                                        │
                                                                            │
Phase 5 (Content Migration) ←──────────────────────────────────────────────┘
                                                                            
V&S Updates ← ← ← ← ← ← ← ← ← ← (can happen any time, recommend with Phase 2)
```

**Critical path:** Phase 0 → Phase 2 → Phase 3 → First experiment live  
**Independent:** Phase 1 (can run in parallel with anything)  
**Deferred:** Phase 4, Phase 5 (after first experiment data collected)

---

## Appendix B: Key Content Keys Convention

The `content_key` field in `content_variants` follows a consistent naming convention:

| Pattern | Example | Scope |
|:--------|:--------|:------|
| `concept:{id}:{field}` | `concept:tokenization:title` | Overrides concept_translations field |
| `landing:{element}` | `landing:hook` | Landing page content |
| `stage:{stage}:{element}` | `stage:dna:intro` | Stage-level content |
| `sapling:{element}` | `sapling:intro` | Nursery stage content |
| `program:{code}:{field}` | `program:aiki:tagline` | Program marketing content |
| `cta:{location}:{element}` | `cta:dna_complete:headline` | Call-to-action content |

**Rules:**
- All lowercase
- Colon (`:`) as separator
- No spaces, use hyphens for multi-word segments
- Concept IDs match the `concepts.id` field exactly
- Stage IDs match the route segments (`dna`, `seed`, `sprout`, `sapling`, `tree`, `fruits`, `orchard`)

---

*This document is the technical implementation authority. For content guidelines, see I18N_TRANSLATION_PRINCIPLES.md. For architectural decisions, see VISION_AND_STRATEGY.md.*
