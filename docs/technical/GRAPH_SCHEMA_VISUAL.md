# Graph Schema Visual Guide

This document provides visual representations of the proposed graph schema.

---

## 1. Current State vs Proposed State

### Current Architecture (Loose Coupling)

```
┌─────────────────────────────────────────────────────────────┐
│ tree-concepts.json (Source of Truth)                        │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Concept: "tokens"                                       │ │
│ │   prerequisites: []              ◄─── String array     │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ Concept: "vectors"                                  │ │ │
│ │ │   prerequisites: ["tokens"]     ◄─── No validation │ │ │
│ │ │ ┌─────────────────────────────────────────────────┐ │ │ │
│ │ │ │ Concept: "attention"                            │ │ │ │
│ │ │ │   prerequisites: ["tokens", "vectors"]          │ │ │ │
│ │ │ └─────────────────────────────────────────────────┘ │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Runtime lookups only
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ learning-paths.json                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Path: "ai-fundamentals"                                 │ │
│ │   concepts: ["tokens", "vectors", "attention", ...]     │ │
│ │              └─── String IDs, no FK constraint          │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

❌ Issues:
- No referential integrity
- Can't query "what depends on X?"
- Can't detect circular dependencies
- No graph traversal
```

### Proposed Architecture (Graph Database)

```
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Graph Schema                       │
│                                                                  │
│  ┌────────────────┐         ┌────────────────┐                 │
│  │ concept_nodes  │         │  tree_levels   │                 │
│  │ ─────────────  │         │  ────────────  │                 │
│  │ • tokens       │─────┐   │ • roots (1)    │                 │
│  │ • vectors      │     │   │ • trunk (2)    │                 │
│  │ • attention    │     │   │ • branches (3) │                 │
│  │ • rag          │     │   │ • leaves (4)   │                 │
│  └────────────────┘     │   └────────────────┘                 │
│                         │            ▲                          │
│                         │            │ belongs_to_level         │
│                         ▼            │                          │
│              ┌──────────────────────────────┐                  │
│              │     concept_edges            │                  │
│              │     ──────────────           │                  │
│              │ Edge Types:                  │                  │
│              │ • prerequisite (DAG)         │◄─ Cycle detection│
│              │ • related (symmetric)        │                  │
│              │ • contains (path→concept)    │                  │
│              │ • enables (auto-generated)   │                  │
│              └──────────────────────────────┘                  │
│                         ▲                                       │
│                         │                                       │
│  ┌──────────────────────┴───────────────┐                     │
│  │  learning_path_nodes                 │                     │
│  │  ────────────────────                │                     │
│  │  • ai-fundamentals                   │                     │
│  │  • build-rag-apps                    │                     │
│  └──────────────────────────────────────┘                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ concept_transitive_prerequisites (Materialized View)    │  │
│  │ Pre-computed: "all prerequisites of X"                  │  │
│  │ Refresh trigger: ON INSERT/UPDATE/DELETE concept_edges │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

✅ Benefits:
- Foreign key constraints
- Graph queries (transitive closure)
- Cycle detection (triggers)
- Level hierarchy enforcement
```

---

## 2. Example Graph: "Build RAG Apps" Learning Path

### Prerequisite Graph (DAG)

```
                    Learning Path: "build-rag-apps"
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
    [vectors]             [context-             [rag]
   (roots, c=2)          engineering]        (trunk, c=2)
        ▲                (trunk, c=2)              ▲
        │                     ▲                    │
        │                     │              ┌─────┴─────┐
        │                     │              │           │
    [tokens]                  │          [vectors]   [memory]
   (roots, c=1)               │         (roots, c=2) (trunk, c=2)
        ▲                     │              ▲           ▲
        └─────────────────────┴──────────────┘           │
                                                      [vectors]

Legend:
  [concept]
  (level, complexity)
  ─────► prerequisite edge
  ═════► learning path contains
```

### Edge Table Representation

```sql
-- Edges for "build-rag-apps" path
INSERT INTO concept_edges (source_id, target_id, edge_type, sequence_order) VALUES
  ('build-rag-apps', 'vectors',            'contains', 0),
  ('build-rag-apps', 'context-windows',    'contains', 1),
  ('build-rag-apps', 'rag',                'contains', 2),
  ('build-rag-apps', 'memory',             'contains', 3),
  ('build-rag-apps', 'context-engineering','contains', 4);

-- Prerequisite edges (enforces learning order)
INSERT INTO concept_edges (source_id, target_id, edge_type) VALUES
  ('tokens',  'vectors',            'prerequisite'),
  ('vectors', 'context-windows',    'prerequisite'),
  ('vectors', 'rag',                'prerequisite'),
  ('memory',  'rag',                'prerequisite'),
  ('tokens',  'context-engineering','prerequisite');
```

### Query Result: Sub-Tree with Prerequisites

```json
{
  "pathId": "build-rag-apps",
  "concepts": [
    {
      "id": "vectors",
      "title": "Vektorid (Embeddings)",
      "level": "roots",
      "sequenceOrder": 0,
      "prerequisites": ["tokens"],
      "isUnlocked": false  // ← User hasn't completed "tokens" yet
    },
    {
      "id": "context-windows",
      "title": "Konteksti Aknad",
      "level": "roots",
      "sequenceOrder": 1,
      "prerequisites": ["vectors", "tokens"],
      "isUnlocked": false
    },
    {
      "id": "rag",
      "title": "RAG (Retrieval-Augmented Generation)",
      "level": "trunk",
      "sequenceOrder": 2,
      "prerequisites": ["vectors", "memory", "tokens"],
      "isUnlocked": false
    },
    // ...
  ]
}
```

---

## 3. Graph Traversal Examples

### Example 1: Direct Prerequisites

```
Query: "What do I need to learn before RAG?"

              [rag]
               ▲
               │
         ┌─────┴─────┐
         │           │
    [vectors]     [memory]
    (direct)      (direct)
```

```sql
SELECT cn.id, cn.title
FROM concept_edges ce
JOIN concept_nodes cn ON cn.id = ce.source_id
WHERE ce.target_id = 'rag' AND ce.edge_type = 'prerequisite';
```

**Result:** `vectors`, `memory`

---

### Example 2: Transitive Prerequisites (Full Dependency Chain)

```
Query: "What is the COMPLETE prerequisite chain for RAG?"

                  [rag]
                   ▲
            ┌──────┴──────┐
            │             │
        [vectors]      [memory]
        (depth=1)      (depth=1)
            ▲             ▲
            │             │
        [tokens]      [vectors]
        (depth=2)     (depth=2)
            ▲
            │
        [tokens]
        (depth=3)
```

```sql
SELECT cn.id, cn.title, ctp.min_depth
FROM concept_transitive_prerequisites ctp
JOIN concept_nodes cn ON cn.id = ctp.prerequisite_id
WHERE ctp.concept_id = 'rag'
ORDER BY ctp.min_depth;
```

**Result:**
```
id      | title    | min_depth
--------|----------|----------
vectors | Vektorid | 1
memory  | Mälu     | 1
tokens  | Tokenid  | 2
```

---

### Example 3: What Can I Learn Next? (Unlocked Concepts)

```
User Progress:
  ✅ tokens (completed)
  ✅ vectors (completed)
  ❌ attention (not started)
  ❌ memory (not started)

Query: "What concepts are now available to learn?"

Completed:
  [tokens] ───► [vectors]
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
    [attention]           [memory]
    ✅ UNLOCKED          ✅ UNLOCKED
    (all prereqs met)    (all prereqs met)
```

```sql
WITH completed AS (
  SELECT concept_id FROM concept_progress
  WHERE session_id = $1 AND status = 'completed'
)
SELECT cn.id, cn.title, cn.level
FROM concept_nodes cn
WHERE cn.id NOT IN (SELECT * FROM completed)  -- Not already done
  AND NOT EXISTS (  -- All prerequisites completed
    SELECT 1 FROM concept_edges ce
    WHERE ce.target_id = cn.id
      AND ce.edge_type = 'prerequisite'
      AND ce.source_id NOT IN (SELECT * FROM completed)
  );
```

**Result:** `attention`, `memory`

---

## 4. Level Hierarchy Enforcement

```
Tree Levels (order_rank):
  ┌──────────────────────────┐
  │ 4. LEAVES (trends)       │  ◄── Top (most advanced)
  ├──────────────────────────┤
  │ 3. BRANCHES (apps)       │
  ├──────────────────────────┤
  │ 2. TRUNK (engineering)   │
  ├──────────────────────────┤
  │ 1. ROOTS (fundamentals)  │  ◄── Bottom (most basic)
  └──────────────────────────┘

Validation Rule:
  Prerequisites must be at SAME or LOWER level

✅ Valid:
  [vectors] (roots, rank=1) ───► [rag] (trunk, rank=2)
  [memory]  (trunk, rank=2) ───► [rag] (trunk, rank=2)

❌ Invalid:
  [rag] (trunk, rank=2) ───► [tokens] (roots, rank=1)
  ↑ ERROR: Cannot have higher-level prerequisite for lower-level concept
```

```sql
-- Trigger: validate_level_hierarchy()
-- Prevents: LEAVES ──prerequisite──► ROOTS (impossible)
-- Allows:  ROOTS  ──prerequisite──► TRUNK (correct flow)

CREATE TRIGGER trigger_validate_hierarchy
BEFORE INSERT ON concept_edges
FOR EACH ROW
WHEN (NEW.edge_type = 'prerequisite')
EXECUTE FUNCTION validate_level_hierarchy();
```

---

## 5. Cycle Detection

```
❌ INVALID: Circular Dependency

    [A] ──► [B] ──► [C]
     ▲               │
     └───────────────┘
         (CYCLE!)

Trigger: check_prerequisite_cycle()
Error: "Prerequisite cycle detected: C -> A"
```

```sql
-- Before inserting edge C → A, check if path A → C exists
IF EXISTS (
  WITH RECURSIVE path AS (
    SELECT target_id FROM concept_edges WHERE source_id = 'A'
    UNION
    SELECT ce.target_id FROM path p
    JOIN concept_edges ce ON ce.source_id = p.target_id
  )
  SELECT 1 FROM path WHERE target_id = 'C'
) THEN
  RAISE EXCEPTION 'Cycle detected';
END IF;
```

---

## 6. Data Migration Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 1: Schema Creation                                        │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
  [Create tables: concept_nodes, concept_edges, tree_levels]
  [Create triggers: cycle detection, level validation]
  [Create materialized view: transitive_prerequisites]
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 2: Data Migration (JSON → PostgreSQL)                     │
└─────────────────────────────────────────────────────────────────┘
    │
    ├─► 1. Insert tree_levels (4 records)
    │      └─ roots, trunk, branches, leaves
    │
    ├─► 2. Insert concept_nodes (23 records)
    │      └─ Read from tree-concepts.json
    │
    ├─► 3. Insert prerequisite edges
    │      └─ Extract from concept.prerequisites[]
    │      └─ Validate no cycles
    │
    ├─► 4. Insert learning_path_nodes (5 records)
    │      └─ Read from learning-paths.json
    │
    ├─► 5. Insert path→concept edges (contains)
    │      └─ Extract from path.concepts[]
    │      └─ Add sequence_order
    │
    └─► 6. Insert path→path prerequisites
           └─ Extract from path.prerequisites[]
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 3: Refactor Queries                                       │
└─────────────────────────────────────────────────────────────────┘
    │
    ├─► Replace: import treeData from '@/data/tree-concepts.json'
    │   With:     getConceptGraph(locale)
    │
    ├─► Update: LearningPathPage
    │   Use:     getPathSubTree(pathId, sessionId)
    │
    └─► Add: Progress tracking
        Use: getAvailableConcepts(sessionId)
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│ PHASE 4: Validation & Testing                                   │
└─────────────────────────────────────────────────────────────────┘
    ├─► Test: Cycle detection (try to insert A→B→C→A)
    ├─► Test: Level hierarchy (try LEAVES→ROOTS prerequisite)
    ├─► Test: Query performance (transitive prerequisites <50ms)
    └─► Test: UI integration (paths render correctly)
```

---

## 7. API Changes Summary

### Before (JSON-based)

```typescript
// Client-side: Import static JSON
import treeData from '@/data/tree-concepts.json';
import pathsData from '@/data/learning-paths.json';

// Manual prerequisite lookup
const concept = treeData.concepts.find(c => c.id === 'rag');
const prerequisites = concept.prerequisites?.map(id =>
  treeData.concepts.find(c => c.id === id)
);

// ❌ No validation
// ❌ No transitive closure
// ❌ No progress tracking
```

### After (Graph-based)

```typescript
// Server-side: Query graph database
import { getConceptGraph, getPathSubTree, getAvailableConcepts } from '@/actions/getGraphData';

// Get full graph
const graph = await getConceptGraph('et');

// Get path with prerequisites (one query)
const pathSubTree = await getPathSubTree('build-rag-apps', sessionId);
// Returns: concepts with prerequisites[] already resolved

// Get unlocked concepts (based on progress)
const available = await getAvailableConcepts(sessionId);

// ✅ Validated at DB level
// ✅ Transitive closure pre-computed
// ✅ Progress-aware queries
```

---

## 8. Schema ERD (Entity-Relationship Diagram)

```
┌─────────────────────┐
│   tree_levels       │
│ ─────────────────── │
│ PK  id              │──┐
│     name            │  │
│     order_rank      │  │
│     color           │  │
└─────────────────────┘  │
                         │
         ┌───────────────┘
         │
         │  belongs_to_level
         │
┌─────────────────────┐         ┌─────────────────────┐
│  concept_nodes      │         │ learning_path_nodes │
│ ─────────────────── │         │ ─────────────────── │
│ PK  id              │──┐      │ PK  id              │──┐
│ FK  level           │  │      │     difficulty      │  │
│     title           │  │      │     estimated_min   │  │
│     complexity      │  │      └─────────────────────┘  │
│     explanation     │  │                               │
└─────────────────────┘  │                               │
         ▲               │                               │
         │               │                               │
         │               └──────┐          ┌─────────────┘
         │                      │          │
         │    ┌─────────────────┴──────────┴──────────────────┐
         │    │           concept_edges                        │
         │    │  ───────────────────────────                   │
         └────┤  PK  id                                        │
              │  FK  source_id (concept OR path)               │
              │  FK  target_id (concept OR path)               │
              │      edge_type (prerequisite, contains, ...)   │
              │      sequence_order                            │
              │      strength                                  │
              └────────────────────────────────────────────────┘
                           ▲
                           │
                           │  Referenced by:
                           │
              ┌────────────────────────────────────────────────┐
              │ concept_transitive_prerequisites (MAT VIEW)    │
              │ ────────────────────────────────────────────   │
              │     concept_id                                 │
              │     prerequisite_id                            │
              │     min_depth                                  │
              └────────────────────────────────────────────────┘

Edge Types:
  • prerequisite:      concept → concept (A must be learned before B)
  • related:           concept → concept (A is similar to B)
  • belongs_to_level:  concept → level    (A is in level "roots")
  • contains:          path → concept     (Path includes concept)
  • path_prerequisite: path → path        (Complete path A before B)
  • enables:           concept → concept (Auto-generated inverse)
```

---

## 9. Performance Optimization

### Without Materialized View

```
Query: "Get all prerequisites of RAG (transitive)"

Execution: Recursive CTE (depth-first search)
Time: ~150ms (for 5 levels deep)

WITH RECURSIVE prereq_closure AS (
  SELECT target_id, source_id, 1 AS depth
  FROM concept_edges WHERE edge_type = 'prerequisite'
  UNION
  SELECT pc.target_id, ce.source_id, pc.depth + 1
  FROM prereq_closure pc
  JOIN concept_edges ce ON ce.target_id = pc.source_id
  WHERE ce.edge_type = 'prerequisite'
)
SELECT * FROM prereq_closure WHERE target_id = 'rag';

❌ Slow for deep graphs
❌ Recalculated every query
```

### With Materialized View

```
Query: "Get all prerequisites of RAG (transitive)"

Execution: Simple SELECT from pre-computed view
Time: ~5ms (indexed lookup)

SELECT * FROM concept_transitive_prerequisites
WHERE concept_id = 'rag';

✅ Pre-computed on insert/update
✅ Indexed for fast lookups
✅ Refresh trigger keeps it up-to-date
```

---

## 10. Future Extensions

### Extension 1: Difficulty Ratings

```sql
ALTER TABLE concept_edges
ADD COLUMN difficulty_rating FLOAT CHECK (difficulty_rating BETWEEN 1 AND 5);

-- Example: "vectors" is a HARD prerequisite for "attention"
INSERT INTO concept_edges (source_id, target_id, edge_type, difficulty_rating) VALUES
  ('vectors', 'attention', 'prerequisite', 4.5);
```

### Extension 2: Alternative Prerequisites (OR logic)

```sql
-- "You need EITHER linear algebra OR statistics to learn vectors"
INSERT INTO concept_edges (source_id, target_id, edge_type, required) VALUES
  ('linear-algebra', 'vectors', 'prerequisite', false),  -- Optional
  ('statistics',     'vectors', 'prerequisite', false);  -- Optional

-- Updated validation: At least ONE of the optional prerequisites
```

### Extension 3: Concept Versioning

```sql
CREATE TABLE concept_versions (
  concept_id TEXT REFERENCES concept_nodes(id),
  version INT,
  title TEXT,
  explanation TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (concept_id, version)
);

-- Query historical versions
SELECT * FROM concept_versions WHERE concept_id = 'rag' ORDER BY version DESC;
```

---

**End of Visual Guide**

For implementation details, see:
- `docs/GRAPH_SCHEMA_PROPOSAL.md` - Full technical specification
- `docs/AI_TREE_MASTER_REFERENCE.md` - Project master reference
