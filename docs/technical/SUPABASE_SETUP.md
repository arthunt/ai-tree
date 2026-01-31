# Supabase Setup Guide for AI-Tree

> **Created:** 2026-01-30  
> **Purpose:** Complete setup guide for Supabase integration

---

## 📋 Quick Setup Checklist

- [ ] Step 1: Get Supabase credentials
- [ ] Step 2: Add credentials to `.env.local`
- [ ] Step 3: Run database schema
- [ ] Step 4: Verify connection
- [ ] Step 5: Test locally

---

## Step 1: Get Supabase Credentials

### 1.1 Open Supabase Dashboard

Go to [supabase.com/dashboard](https://supabase.com/dashboard) and open your ai-tree project.

### 1.2 Find API Settings

Navigate to: **Settings** → **API**

You'll need these 3 values:

| Setting | Location | Description |
|---------|----------|-------------|
| **Project URL** | Top of API page | `https://xxxxx.supabase.co` |
| **anon public** | Project API keys section | Safe for browser use |
| **service_role secret** | Project API keys section | Server-side only! |

### 1.3 Copy the Values

Click the copy button next to each value.

---

## Step 2: Add Credentials to `.env.local`

Edit your `.env.local` file in the project root:

```bash
# In project root
nano .env.local
```

Add these lines (replace with your actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...YOUR_SERVICE_KEY
```

**⚠️ Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

---

## Step 3: Run Database Schema

### 3.1 Open SQL Editor

In Supabase Dashboard: **SQL Editor** → **New query**

### 3.2 Copy & Run Schema

Copy the entire contents of `lib/supabase/schema.sql` and paste into the SQL editor.

Click **Run** (or Cmd+Enter).

### 3.3 Verify Tables Created

Check that these tables appear in **Table Editor**:

- ✅ `learning_sessions`
- ✅ `concept_progress`
- ✅ `dna_progress`
- ✅ `learning_path_progress`
- ✅ `analytics_events`
- ✅ `user_feedback`

---

## Step 4: Verify Connection

### 4.1 Create Test Script

Create a file `scripts/test-supabase.ts`:

```typescript
import { supabase } from '../lib/supabase/client'

async function testConnection() {
  console.log('Testing Supabase connection...')
  
  // Test: Get or create a test session
  const { data, error } = await supabase
    .rpc('get_or_create_session', {
      p_session_token: 'test-connection-' + Date.now(),
      p_locale: 'et'
    })
  
  if (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
  
  console.log('✅ Connection successful!')
  console.log('Session created:', data)
  
  // Cleanup: Delete test session
  if (data?.[0]?.id) {
    await supabase
      .from('learning_sessions')
      .delete()
      .eq('id', data[0].id)
    console.log('🧹 Test session cleaned up')
  }
}

testConnection()
```

### 4.2 Run Test

```bash
npx tsx scripts/test-supabase.ts
```

Expected output:
```
Testing Supabase connection...
✅ Connection successful!
Session created: [{ id: '...', session_token: 'test-...', ... }]
🧹 Test session cleaned up
```

---

## Step 5: Test Locally

### 5.1 Start Dev Server

```bash
npm run dev
```

### 5.2 Check Browser Console

Open http://localhost:3000 and check the browser console for any Supabase errors.

---

## 🏗️ Database Schema Overview

### Tables

| Table | Purpose |
|-------|---------|
| `learning_sessions` | Anonymous user sessions (no sign-in required) |
| `concept_progress` | Which concepts user has viewed/completed |
| `dna_progress` | Progress through T-V-A-P DNA view |
| `learning_path_progress` | Progress in structured learning paths |
| `analytics_events` | Anonymous usage analytics |
| `user_feedback` | Bug reports and suggestions |

### Key Features

1. **Anonymous Learning**: No sign-up required, uses session tokens
2. **Progress Tracking**: Saves which concepts user has viewed
3. **DNA View Support**: Tracks T-V-A-P component exploration
4. **Privacy-First**: No personal data collected

---

## 🔧 Usage Examples

### Get/Create Session

```typescript
import { supabase } from '@/lib/supabase'

// Get or create anonymous session
const { data: session } = await supabase
  .rpc('get_or_create_session', {
    p_session_token: localStorage.getItem('ai-tree-session') || crypto.randomUUID(),
    p_locale: 'et'
  })

// Save session token for later
localStorage.setItem('ai-tree-session', session[0].session_token)
```

### Track Concept View

```typescript
import { supabase } from '@/lib/supabase'

async function trackConceptView(sessionId: string, conceptId: string) {
  const { error } = await supabase
    .from('concept_progress')
    .upsert({
      session_id: sessionId,
      concept_id: conceptId,
      status: 'viewed',
      viewed_at: new Date().toISOString()
    }, {
      onConflict: 'session_id,concept_id'
    })
  
  if (error) console.error('Failed to track view:', error)
}
```

### Track DNA Component

```typescript
import { supabase } from '@/lib/supabase'

async function trackDNAComponent(sessionId: string, componentId: 'T' | 'V' | 'A' | 'P') {
  const { error } = await supabase
    .from('dna_progress')
    .upsert({
      session_id: sessionId,
      component_id: componentId,
      viewed_at: new Date().toISOString()
    }, {
      onConflict: 'session_id,component_id'
    })
  
  if (error) console.error('Failed to track DNA:', error)
}
```

### Get Progress Summary

```typescript
import { supabase } from '@/lib/supabase'

async function getProgressSummary(sessionId: string) {
  const { data, error } = await supabase
    .rpc('get_progress_summary', { p_session_id: sessionId })
  
  if (error) throw error
  
  return data[0]
  // Returns: { total_concepts: 23, viewed_concepts: 5, completed_concepts: 2, dna_components_viewed: 1, total_time_spent: 300 }
}
```

---

## 🚨 Troubleshooting

### "Missing environment variables"

Make sure `.env.local` has all 3 variables and restart the dev server:
```bash
npm run dev
```

### "Permission denied" errors

Check that RLS policies were created. Run this in SQL Editor:
```sql
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public';
```

### "Table not found"

Run the schema SQL again in SQL Editor. Check for any error messages.

### Can't connect to Supabase

1. Check your internet connection
2. Verify the Project URL is correct (no trailing slash)
3. Make sure the API keys are complete (they're long JWT tokens)

---

## 📁 Files Created

```
lib/supabase/
├── client.ts       # Browser-side Supabase client
├── server.ts       # Server-side client (for API routes)
├── types.ts        # TypeScript types for database
├── schema.sql      # SQL to create tables
└── index.ts        # Re-exports all modules

.env.local.example  # Template for environment variables
docs/SUPABASE_SETUP.md  # This guide
```

---

## 🔗 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

*Setup complete! Your ai-tree project is now connected to Supabase.* 🌱
