import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// These environment variables must be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
