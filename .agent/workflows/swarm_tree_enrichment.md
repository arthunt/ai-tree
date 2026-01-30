---
description: Protocol for Swarm Agents to enrich the AI Tree with detailed metadata (dates, papers, use cases)
---

# Swarm Protocol: Tree Enrichment (Metadata Layer)

**Objective:** Enrich the 26 existing Tree Nodes with historical and technical metadata. This enables the "Detail View" in the UI.

## Context
- **Current State:** 26 nodes exist in `nodes` table. Basic titles exist in `concept_translations`.
- **Goal:** Add depth (When? Who? Why?).

## Step 1: Schema Extension (SQL)
Create a migration to add a `node_metadata` table (or extend `concept_translations` if cleaner, but a separate table is preferred for structured data).

**Proposed Schema (`node_metadata`):**
- `node_id` (FK to `nodes.id`)
- `year_introduced` (integer, e.g., 2017)
- `key_paper_title` (text, e.g., "Attention Is All You Need")
- `key_paper_url` (text)
- `primary_use_case` (text, e.g., "Machine Translation")
- `visual_motif` (text, e.g., "triangle", "network", "cloud")

## Step 2: Content Generation
For each of the 26 nodes (e.g., Perceptron, LSTM, Transformer, GPT-4, etc.), generate this metadata.
- **Source:** General knowledge or reliable AI history references.
- **Tone:** Academic but accessible.

## Step 3: Execution
1. Create SQL migration.
2. Generate SQL inserts.
3. Execute via `mcp_supabase-mcp-server_execute_sql`.
4. Verify by fetching metadata for 'transformer' node.

## Handover
- Notify @ANTIGRAVITY when the `node_metadata` table is ready so the UI can be updated to fetch from it.
