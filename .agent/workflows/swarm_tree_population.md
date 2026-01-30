---
description: Protocol for Swarm Agents to populate Supabase with AI Phylogenetic Tree content
---

# Swarm Protocol: Tree of Thoughts Population

**Objective:** Populate the `nodes` table in Supabase with the evolutionary history of AI (The Phylogenetic Tree).

## Context
- **Project:** AI Tree (Dendrix.ai)
- **View:** `/tree` (The main visualization)
- **Metaphor:** "Living Fossils" and "Evolutionary Branches"

## Step 1: Analyze Schema
Read `docs/AI_TREE_MASTER_REFERENCE.md` to understand the `nodes` table schema (id, parent_id, name, type, status).

## Step 2: Generate SQL Content
Create a SQL migration file (e.g., `supabase/migrations/20260130_seed_tree_content.sql`).
**Content Hierarchy (Evolutionary Tree):**
1.  **Root:** "The Algorithm" (Ancient Ancestor)
2.  **Branch 1: Rule-Based (Extinct)**
    -   ELIZA
    -   Expert Systems
3.  **Branch 2: Neural Networks (The Survivors)**
    -   **Perceptrons** (Simple cells)
    -   **RNNs / LSTMs** (Memory - "Living Fossils")
    -   **CNNs** (Vision)
4.  **Branch 3: Transformers (The Dominant Species)**
    -   "Attention Is All You Need" (The Mutation)
    -   BERT (Encoder-only)
    -   GPT-1 -> GPT-2 -> GPT-3 -> GPT-4 (Decoder-only)
    -   Claude / Gemini (Modern Giants)

**Data Requirements:**
-   `type`: 'architecture' | 'model'
-   `status`: 'active' | 'legacy' | 'deprecated'
-   `complexity`: 1-10

## Step 3: Execution
Use the `mcp_supabase-mcp-server_execute_sql` tool to insert this data.
