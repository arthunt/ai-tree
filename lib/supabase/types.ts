/**
 * Supabase Database Types
 * 
 * This file defines TypeScript types for the ai-tree database schema.
 * 
 * To regenerate from Supabase:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      /**
       * Anonymous learning sessions
       * Tracks progress without requiring sign-in
       */
      learning_sessions: {
        Row: {
          id: string
          session_token: string
          created_at: string
          updated_at: string
          last_active_at: string
          locale: 'et' | 'en'
          preferences: Json
        }
        Insert: {
          id?: string
          session_token: string
          created_at?: string
          updated_at?: string
          last_active_at?: string
          locale?: 'et' | 'en'
          preferences?: Json
        }
        Update: {
          id?: string
          session_token?: string
          created_at?: string
          updated_at?: string
          last_active_at?: string
          locale?: 'et' | 'en'
          preferences?: Json
        }
      }
      
      /**
       * Concept completion tracking
       * Tracks which concepts a session has viewed/completed
       */
      concept_progress: {
        Row: {
          id: string
          session_id: string
          concept_id: string
          status: 'viewed' | 'completed' | 'bookmarked'
          viewed_at: string
          completed_at: string | null
          time_spent_seconds: number
        }
        Insert: {
          id?: string
          session_id: string
          concept_id: string
          status?: 'viewed' | 'completed' | 'bookmarked'
          viewed_at?: string
          completed_at?: string | null
          time_spent_seconds?: number
        }
        Update: {
          id?: string
          session_id?: string
          concept_id?: string
          status?: 'viewed' | 'completed' | 'bookmarked'
          viewed_at?: string
          completed_at?: string | null
          time_spent_seconds?: number
        }
      }
      
      /**
       * DNA component progress
       * Tracks progress through T-V-A-P DNA view
       */
      dna_progress: {
        Row: {
          id: string
          session_id: string
          component_id: 'T' | 'V' | 'A' | 'P'
          viewed_at: string
          explored_at: string | null
          demo_completed: boolean
        }
        Insert: {
          id?: string
          session_id: string
          component_id: 'T' | 'V' | 'A' | 'P'
          viewed_at?: string
          explored_at?: string | null
          demo_completed?: boolean
        }
        Update: {
          id?: string
          session_id?: string
          component_id?: 'T' | 'V' | 'A' | 'P'
          viewed_at?: string
          explored_at?: string | null
          demo_completed?: boolean
        }
      }
      
      /**
       * Learning path progress
       * Tracks which learning paths a session is following
       */
      learning_path_progress: {
        Row: {
          id: string
          session_id: string
          path_id: string
          started_at: string
          completed_at: string | null
          current_step: number
          total_steps: number
        }
        Insert: {
          id?: string
          session_id: string
          path_id: string
          started_at?: string
          completed_at?: string | null
          current_step?: number
          total_steps: number
        }
        Update: {
          id?: string
          session_id?: string
          path_id?: string
          started_at?: string
          completed_at?: string | null
          current_step?: number
          total_steps?: number
        }
      }
      
      /**
       * Analytics events (anonymous)
       * For understanding how users interact with the platform
       */
      analytics_events: {
        Row: {
          id: string
          session_id: string | null
          event_type: string
          event_data: Json
          created_at: string
          page_path: string | null
          referrer: string | null
          user_agent: string | null
        }
        Insert: {
          id?: string
          session_id?: string | null
          event_type: string
          event_data?: Json
          created_at?: string
          page_path?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
        Update: {
          id?: string
          session_id?: string | null
          event_type?: string
          event_data?: Json
          created_at?: string
          page_path?: string | null
          referrer?: string | null
          user_agent?: string | null
        }
      }
      
      /**
       * Feedback/issues reported by users
       */
      user_feedback: {
        Row: {
          id: string
          session_id: string | null
          feedback_type: 'bug' | 'suggestion' | 'content_error' | 'general'
          concept_id: string | null
          message: string
          email: string | null
          status: 'new' | 'reviewed' | 'resolved' | 'wont_fix'
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          session_id?: string | null
          feedback_type: 'bug' | 'suggestion' | 'content_error' | 'general'
          concept_id?: string | null
          message: string
          email?: string | null
          status?: 'new' | 'reviewed' | 'resolved' | 'wont_fix'
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          session_id?: string | null
          feedback_type?: 'bug' | 'suggestion' | 'content_error' | 'general'
          concept_id?: string | null
          message?: string
          email?: string | null
          status?: 'new' | 'reviewed' | 'resolved' | 'wont_fix'
          created_at?: string
          resolved_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      /**
       * Get or create anonymous session
       */
      get_or_create_session: {
        Args: {
          p_session_token: string
          p_locale?: 'et' | 'en'
        }
        Returns: {
          id: string
          session_token: string
          created_at: string
          locale: 'et' | 'en'
          preferences: Json
        }
      }
      
      /**
       * Get session progress summary
       */
      get_progress_summary: {
        Args: {
          p_session_id: string
        }
        Returns: {
          total_concepts: number
          viewed_concepts: number
          completed_concepts: number
          dna_components_viewed: number
          total_time_spent: number
        }
      }
    }
    Enums: {
      concept_status: 'viewed' | 'completed' | 'bookmarked'
      dna_component: 'T' | 'V' | 'A' | 'P'
      feedback_type: 'bug' | 'suggestion' | 'content_error' | 'general'
      feedback_status: 'new' | 'reviewed' | 'resolved' | 'wont_fix'
      locale: 'et' | 'en'
    }
  }
}

// Convenience type exports
export type LearningSession = Database['public']['Tables']['learning_sessions']['Row']
export type ConceptProgress = Database['public']['Tables']['concept_progress']['Row']
export type DNAProgress = Database['public']['Tables']['dna_progress']['Row']
export type LearningPathProgress = Database['public']['Tables']['learning_path_progress']['Row']
export type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Row']
export type UserFeedback = Database['public']['Tables']['user_feedback']['Row']

// Insert types
export type InsertLearningSession = Database['public']['Tables']['learning_sessions']['Insert']
export type InsertConceptProgress = Database['public']['Tables']['concept_progress']['Insert']
export type InsertDNAProgress = Database['public']['Tables']['dna_progress']['Insert']
export type InsertAnalyticsEvent = Database['public']['Tables']['analytics_events']['Insert']
export type InsertUserFeedback = Database['public']['Tables']['user_feedback']['Insert']
