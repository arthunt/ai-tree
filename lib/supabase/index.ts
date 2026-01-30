/**
 * Supabase Module Index
 * 
 * Re-exports all Supabase utilities for convenient importing:
 * 
 * import { supabase, createServerClient } from '@/lib/supabase'
 * import type { LearningSession, ConceptProgress } from '@/lib/supabase'
 */

// Client exports
export { supabase, createSupabaseClient } from './client'
export { createServerClient, getServerClient } from './server'

// Type exports
export type {
  Database,
  LearningSession,
  ConceptProgress,
  DNAProgress,
  LearningPathProgress,
  AnalyticsEvent,
  UserFeedback,
  InsertLearningSession,
  InsertConceptProgress,
  InsertDNAProgress,
  InsertAnalyticsEvent,
  InsertUserFeedback,
} from './types'
