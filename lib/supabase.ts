import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-initialized Supabase client — avoids build-time crash when env vars
// are not yet available (e.g. during `next build` static page collection).
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  _supabase = createClient(url, key);
  return _supabase;
}

// Keep backward-compat export (returns null-safe client)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) {
      // Return a stub that makes .from().select() etc. return empty results
      if (prop === 'from') {
        return () => ({
          select: () => ({ in: () => ({ eq: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }) }),
        });
      }
      return undefined;
    }
    return (client as unknown as Record<string, unknown>)[prop as string];
  },
});

// Type definitions for the DNA Architecture

export type DNAComponentType = 'T' | 'V' | 'A' | 'P';

export interface Concept {
  id: string;
  category: 'dna' | 'tree' | 'root'; // 'root' | 'trunk' | 'branch' | 'leaf' | 'dna'
  complexity_level: number;
}

export interface ConceptTranslation {
  concept_id: string;
  locale: string;
  title: string;
  explanation: string; // The "What"
  metaphor: string;    // The "Like a..."
  question?: string;   // The "Hook"
}

// Helper specific to DNA components which always have these 4 IDs
export const DNA_IDS = ['tokenization', 'embeddings', 'attention', 'prediction'] as const;
