---
description: Protocol for Claude-Flow Swarm Agents to populate Supabase with AI DNA content
---

# Swarm Protocol: DNA Content Population

**Objective:** Populate the `concepts` and `concept_translations` tables in Supabase with high-quality educational content for the 4 DNA stages (Tokenization, Vectorization, Attention, Prediction).

## Context
- **Project:** AI Tree (Dendrix.ai)
- **Architecture:** Next.js 15 + Supabase + ParaglideJS
- **Languages:** English (en) [Source], Estonian (et) [Target]
- **Tables:** 
  - `concepts` (id, category, complexity_level)
  - `concept_translations` (concept_id, locale, title, explanation, metaphor)

## Step 1: Analyze Schema
Read `docs/AI_TREE_MASTER_REFERENCE.md` to understand the T-V-A-P model and the database schema definition.

## Step 2: Generate SQL Content
Create a SQL migration file (e.g., `supabase/migrations/20260130_seed_dna_content.sql`) that inserts the data.
**Content Requirements:**
- **Tokenization:** Explaining how text becomes numbers. Metaphor: "Chopping vegetables for a stew."
- **Vectorization:** Explaining meaning as coordinates. Metaphor: "GPS coordinates for ideas."
- **Attention:** Explaining context and relationships. Metaphor: "A spotlight in a dark room."
- **Prediction:** Explaining probability. Metaphor: "Autosuggest on steroids."

## Step 3: Execution
Use the `mcp_supabase-mcp-server_execute_sql` tool to run the INSERT statements.

## Step 4: Validation
Visit `/en/dna` and `/et/dna` to verify the content appears (the App has a fallback to Mock data, so you must specifically check that the DB query in `actions/getDNAContent.ts` is succeeding).