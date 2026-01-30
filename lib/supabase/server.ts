/**
 * Server-side Supabase Client
 * 
 * Use this in:
 * - API routes
 * - Server Components
 * - Server Actions
 * 
 * This client uses the service role key for admin operations.
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Create a server-side Supabase client with service role privileges
 * 
 * ⚠️ WARNING: This client bypasses Row Level Security (RLS)
 * Only use in trusted server-side code, never expose to client
 */
export function createServerClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing server-side Supabase environment variables. Please check .env.local:\n' +
      '- NEXT_PUBLIC_SUPABASE_URL\n' +
      '- SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Get server client singleton (for simple use cases)
 */
let serverClient: ReturnType<typeof createClient<Database>> | null = null

export function getServerClient() {
  if (!serverClient) {
    serverClient = createServerClient()
  }
  return serverClient
}
