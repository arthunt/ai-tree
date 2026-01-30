/**
 * Supabase Client Configuration
 * 
 * This file creates Supabase clients for browser and server-side usage.
 * 
 * Usage:
 * - Browser: import { supabase } from '@/lib/supabase/client'
 * - Server: import { createServerClient } from '@/lib/supabase/server'
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Environment variables (set in .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check .env.local:\n' +
    '- NEXT_PUBLIC_SUPABASE_URL\n' +
    '- NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

/**
 * Browser-side Supabase client
 * Use this for client components and browser-side operations
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Disable automatic session persistence for anonymous learning platform
    persistSession: false,
    autoRefreshToken: false,
  },
})

/**
 * Create a new Supabase client instance
 * Useful when you need isolated client instances
 */
export function createSupabaseClient() {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

// Export types for convenience
export type { Database } from './types'
