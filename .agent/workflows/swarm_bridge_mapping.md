---
description: Protocol for Swarm Agents to map DNA Process Components to Tree Entities.
---

# Swarm Protocol: DNA-to-Tree Bridge

**Objective:** Create a mapping between the 4 DNA steps (Tokenization, Vectorization, Attention, Prediction) and specific Nodes in the Phylogenetic Tree.

## Context
US-111 requires a "Deep Dive" button on the DNA view that takes the user to a relevant node in the Tree.

## Task
1.  **Analyze Relationship:**
    -   **Tokenization:** Which tree node best represents this? (e.g., `nlp-basics`, `eliza`, or a new node?)
    -   **Vectorization:** Likely `embeddings` or `word2vec` (if exists). If not, maybe `neural-networks`?
    -   **Attention:** Definitely `transformer`.
    -   **Prediction:** Maybe `gpt-1` or `llm`?

2.  **Output:**
    -   Create a simple JSON mapping or SQL update to `node_metadata` (process_link column?).
    -   Or just a JSON file `data/dna-tree-bridge.json`.

3.  **Refine Tree Content:**
    -   If a perfect node doesn't exist (e.g., "Word Embeddings"), create it? (Optional)

## Execution
-   Produce the mapping.
-   @ANTIGRAVITY will use this to add the navigation links.
