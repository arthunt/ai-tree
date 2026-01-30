---
description: Protocol for Swarm Agents to map Tree Nodes to Paid Programs (AIKI/AIVO) for contextual marketing.
---

# Swarm Protocol: Content-to-Commerce Mapping

**Objective:** analyze each of the 26 AI Tree Nodes and determine if they strongly relate to a paid program (AIKI, AIVO, or AIME).

## Context
- **AIKI:** "AI Instructor" (Basics, Prompting, Teaching). Keywords: LLMs, Transformers, Prompting, Hallucination, RAG.
- **AIVO:** "AI Automation" (Agents, Tools, APIs). Keywords: Agents, APIs, Fine-tuning, Tools, Vision, Speech.
- **AIME:** Bundle (Both).

## Task 1: Schema Update
Add optional columns to `node_metadata`:
- `related_program_id` (text: 'aiki', 'aivo', or null)
- `marketing_hook` (text: Short teaser, e.g., "Master prompting this model in AIKI")

## Task 2: Analysis & Mapping
For each node, decide:
1. **Is there a direct link?**
   - *Example:* "Transformer" -> AIKI (Week 2 covers T-V-A-P).
   - *Example:* "AI Agent" -> AIVO.
   - *Example:* "Perceptron" -> Null (Too theoretical/historical).

2. **Generate Hook (Estonian/English):**
   - Keep it subtle. "Seda teemat õpetame süvitsi AIKI programmis."

## Task 3: Execution
- Generate SQL update statements.
- Apply to `node_metadata`.

## Handover
- @ANTIGRAVITY will display these hooks in the `TreeDetailPanel` button.
