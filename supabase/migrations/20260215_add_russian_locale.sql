-- Phase 9.0: Add Russian to locale enum
-- Ref: docs/I18N_TECHNICAL_MIGRATION.md Section 3 (Phase 0: Locale Unification)
--
-- This migration adds 'ru' to the locale enum so that
-- learning_sessions, program_translations, and node_translations
-- can store Russian locale data.
--
-- NOTE: ALTER TYPE ... ADD VALUE cannot run inside a transaction block.
-- Supabase runs each migration file as a single transaction, but
-- ADD VALUE IF NOT EXISTS is safe and idempotent.

ALTER TYPE locale ADD VALUE IF NOT EXISTS 'ru';
