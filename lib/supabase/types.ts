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
          locale: 'et' | 'en' | 'ru'
          preferences: Json
        }
        Insert: {
          id?: string
          session_token: string
          created_at?: string
          updated_at?: string
          last_active_at?: string
          locale?: 'et' | 'en' | 'ru'
          preferences?: Json
        }
        Update: {
          id?: string
          session_token?: string
          created_at?: string
          updated_at?: string
          last_active_at?: string
          locale?: 'et' | 'en' | 'ru'
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
      /**
       * Programs (Commercial Offering)
       */
      programs: {
        Row: {
          id: string
          slug: string
          code: string
          color: string
          icon: string | null
          duration_weeks: number
          academic_hours: number
          price_cents: number
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          slug: string
          code: string
          color?: string
          icon?: string | null
          duration_weeks: number
          academic_hours: number
          price_cents: number
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          code?: string
          color?: string
          icon?: string | null
          duration_weeks?: number
          academic_hours?: number
          price_cents?: number
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }

      program_translations: {
        Row: {
          program_id: string
          locale: 'et' | 'en' | 'ru'
          name: string
          full_name: string
          tagline: string | null
          description: string | null
          target_audience: string | null
          outcomes: string[] | null
        }
        Insert: {
          program_id: string
          locale: 'et' | 'en' | 'ru'
          name: string
          full_name: string
          tagline?: string | null
          description?: string | null
          target_audience?: string | null
          outcomes?: string[] | null
        }
        Update: {
          program_id?: string
          locale?: 'et' | 'en' | 'ru'
          name?: string
          full_name?: string
          tagline?: string | null
          description?: string | null
          target_audience?: string | null
          outcomes?: string[] | null
        }
      }

      /**
       * Leads (Potential Students)
       */
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          goals: string | null
          program_id: string
          status: 'new' | 'contacted' | 'converted'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          goals?: string | null
          program_id: string
          status?: 'new' | 'contacted' | 'converted'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          goals?: string | null
          program_id?: string
          status?: 'new' | 'contacted' | 'converted'
          created_at?: string
        }
      }

      /**
       * Tree Nodes (Philosophy: Roots -> Trunk -> Branches -> Leaves)
       */
      nodes: {
        Row: {
          id: string
          parent_id: string | null
          type: 'root' | 'era' | 'architecture' | 'model'
          created_at: string
          order_index: number
        }
        Insert: {
          id: string
          parent_id?: string | null
          type: 'root' | 'era' | 'architecture' | 'model'
          created_at?: string
          order_index?: number
        }
        Update: {
          id?: string
          parent_id?: string | null
          type?: 'root' | 'era' | 'architecture' | 'model'
          created_at?: string
          order_index?: number
        }
      }

      /**
       * Node Translations (i18n)
       */
      node_translations: {
        Row: {
          id: string
          node_id: string
          locale: 'et' | 'en' | 'ru'
          display_name: string
          description: string | null
          significance: string | null
          metaphor: string | null
        }
        Insert: {
          id?: string
          node_id: string
          locale: 'et' | 'en' | 'ru'
          display_name: string
          description?: string | null
          significance?: string | null
          metaphor?: string | null
        }
        Update: {
          id?: string
          node_id?: string
          locale?: 'et' | 'en' | 'ru'
          display_name?: string
          description?: string | null
          significance?: string | null
          metaphor?: string | null
        }
      }

      /**
       * Node Metadata (Enrichment + Marketing)
       */
      node_metadata: {
        Row: {
          node_id: string
          year_introduced: number | null
          visual_motif: string | null
          key_paper_title: string | null
          key_paper_url: string | null
          related_program_id: 'aiki' | 'aivo' | 'aime' | null
          marketing_hook_en: string | null
          marketing_hook_et: string | null
        }
        Insert: {
          node_id: string
          year_introduced?: number | null
          visual_motif?: string | null
          key_paper_title?: string | null
          key_paper_url?: string | null
          related_program_id?: 'aiki' | 'aivo' | 'aime' | null
          marketing_hook_en?: string | null
          marketing_hook_et?: string | null
        }
        Update: {
          node_id?: string
          year_introduced?: number | null
          visual_motif?: string | null
          key_paper_title?: string | null
          key_paper_url?: string | null
          related_program_id?: 'aiki' | 'aivo' | 'aime' | null
          marketing_hook_en?: string | null
          marketing_hook_et?: string | null
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
          p_locale?: 'et' | 'en' | 'ru'
        }
        Returns: {
          id: string
          session_token: string
          created_at: string
          locale: 'et' | 'en' | 'ru'
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
      locale: 'et' | 'en' | 'ru'
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
