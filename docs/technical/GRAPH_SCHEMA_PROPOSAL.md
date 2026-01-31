# Graph Schema Proposal: Unified Tree Concepts & Learning Paths

**Author:** System Architecture Designer
**Date:** 2026-01-30
**Status:** Proposal
**Purpose:** Unify tree concepts and learning paths into a queryable graph schema

---

## Executive Summary

The AI Tree project currently maintains **two separate data sources**:
1. **tree-concepts.json** - Educational content with prerequisites (23 concepts)
2. **learning-paths.json** - Curated learning sequences (5 paths)
3. **Supabase nodes table** - Phylogenetic tree of AI evolution

These are **loosely coupled** via string-based IDs with no foreign key constraints or graph traversal capabilities. This proposal introduces a **unified graph schema** that enables:

- ✅ "Show me the sub-tree for learning path X" queries
- ✅ Prerequisite chain validation
- ✅ Adaptive learning path generation
- ✅ Progress tracking with concept dependencies
- ✅ Future AI-powered path recommendations

---

## 1. Current State Analysis

### 1.1 Data Structure: tree-concepts.json

```typescript
interface Concept {
  id: string;                    // e.g., "tokens", "vectors", "attention"
  level: 'leaves' | 'branches' | 'trunk' | 'roots';
  title: string;
  simpleName: string;
  explanation: string;
  metaphor: string;
  icon: string;
  complexity: 1 | 2 | 3;
  prerequisites?: string[];      // ⚠️ Loose coupling: ["attention", "vectors"]
  relatedConcepts?: string[];    // ⚠️ Optional, rarely used
  codeExample?: CodeExample;
  visual?: ConceptVisual;
}
```

**Concepts Count:** 23 total
- **Roots (fundamentals):** 8 concepts (tokens, vectors, attention, transformers, etc.)
- **Trunk (engineering):** 8 concepts (context-engineering, RAG, memory, LoRA, etc.)
- **Branches (application):** 4 concepts (AI agents, MCP, complexity-levels, function-calling)
- **Leaves (trends):** 3 concepts (MOE, AGI/ASI, Green AI, reasoning-models)

**Identified Issues:**
- ❌ Prerequisites are string arrays with no validation
- ❌ No circular dependency detection
- ❌ No way to query "all concepts that depend on X"
- ❌ Level hierarchy is implicit, not enforced
- ❌ No relationship types (is-prerequisite vs is-related)

### 1.2 Data Structure: learning-paths.json

```typescript
interface LearningPath {
  id: string;                    // e.g., "ai-fundamentals"
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  concepts: string[];            // ⚠️ Loose coupling: ["tokens", "vectors", "attention"]
  prerequisites: string[];       // ⚠️ Path-level prerequisites
}
```

**Paths Count:** 5 total
- **ai-fundamentals** (6 concepts, 45 min, beginner)
- **prompt-engineering** (5 concepts, 40 min, intermediate)
- **build-rag-apps** (5 concepts, 50 min, intermediate)
- **ai-agents-path** (6 concepts, 55 min, advanced)
- **fine-tuning-path** (6 concepts, 35 min, advanced)

**Identified Issues:**
- ❌ No enforcement that path concepts form a valid prerequisite chain
- ❌ Path prerequisites are IDs of other paths, not validated
- ❌ No way to compute "minimum prerequisite set" for a path
- ❌ Concepts can appear in multiple paths (duplication, no canonicalization)

### 1.3 Current Data Fetching: getTreeContent.ts

```typescript
export async function getTreeContent(locale: string = 'en'): Promise<TreeContentSimple[]> {
  const { data: nodes } = await supabase
    .from('nodes')
    .select(`
      id, parent_id, type,
      node_translations!inner (title, explanation),
      node_metadata (year_introduced, visual_motif, key_paper_title, ...)
    `)
    .eq('node_translations.locale', locale);

  return nodes.map((n: any) => ({
    id: n.id,
    parentId: n.parent_id,  // ⚠️ Single parent only (tree, not DAG)
    title: n.node_translations[0]?.title || n.id,
    type: n.type || 'branch',
    ...
  }));
}
```

**Current Schema (Supabase):**
- `nodes` table: `id`, `parent_id`, `type`, `status`, `complexity`, `year_introduced`
- `node_translations` table: multilingual content
- **Limitation:** Single parent_id means pure tree structure, not DAG (Directed Acyclic Graph)

**Identified Issues:**
- ❌ Tree structure doesn't support concepts with multiple prerequisites
- ❌ No relationship metadata (why is X a prerequisite of Y?)
- ❌ No path representation in the database
- ❌ All relationships are implicit "parent-child", no semantic types

---

## 2. Relationship Analysis

### 2.1 Current Coupling Model

**Method:** String-based ID references
**Validation:** None (runtime lookups only)
**Type Safety:** Partial (TypeScript interfaces, but no DB constraints)

**Example Coupling Chain:**

```
learning-paths.json
  └─ path.concepts = ["tokens", "vectors", "attention"]
       └─ Referenced in tree-concepts.json
            └─ concept.prerequisites = ["tokens", "vectors"]
                 └─ ⚠️ No validation if these IDs exist
```

### 2.2 Identified Gaps

| Gap | Impact | Example |
|-----|--------|---------|
| **Missing prerequisite edges** | Can't query "what must I learn before X?" | `attention` requires `tokens` + `vectors`, but this isn't a navigable graph |
| **No inverse relationships** | Can't query "what can I learn after X?" | No way to find all concepts that depend on `vectors` |
| **No path representation** | Paths are just lists, not graph sub-structures | Can't extract a sub-tree for "ai-fundamentals" path |
| **No relationship types** | All edges are generic "parent-child" | Can't distinguish prerequisite vs related vs alternative |
| **No cycle detection** | Could create circular prerequisites | If A→B→C→A, no validation would catch it |

### 2.3 Example Query Failures

**Query 1:** "Show me the dependency tree for learning RAG"

❌ **Current approach:** Manual traversal of prerequisites array
✅ **With graph schema:** `SELECT * FROM concept_edges WHERE target = 'rag' AND edge_type = 'prerequisite'`

**Query 2:** "What concepts can I unlock after completing 'vectors'?"

❌ **Current approach:** Iterate all concepts, check if 'vectors' is in prerequisites
✅ **With graph schema:** `SELECT target FROM concept_edges WHERE source = 'vectors' AND edge_type = 'enables'`

**Query 3:** "Give me the sub-tree for 'ai-fundamentals' path"

❌ **Current approach:** Fetch path, fetch each concept individually, no tree structure
✅ **With graph schema:** `WITH RECURSIVE path_tree AS (...) SELECT * FROM path_tree`

---

## 3. Proposed Graph Schema

### 3.1 Node Types

| Node Type | Description | Properties | Examples |
|-----------|-------------|------------|----------|
| `concept` | Educational concept | id, level, complexity, title, explanation | "tokens", "vectors", "attention" |
| `learning_path` | Curated learning sequence | id, difficulty, estimated_minutes | "ai-fundamentals", "build-rag-apps" |
| `level` | Tree level grouping | id, order, color | "roots", "trunk", "branches", "leaves" |

**Rationale:** Separating node types enables type-specific queries and validation rules.

### 3.2 Edge Types

| Edge Type | Source → Target | Semantics | Validation Rules |
|-----------|----------------|-----------|------------------|
| `prerequisite` | concept → concept | "Must learn A before B" | Must be acyclic (DAG) |
| `related` | concept → concept | "Similar topic, not required" | Symmetric (if A→B, then B→A) |
| `belongs_to_level` | concept → level | "Concept is in this tree level" | Each concept has exactly 1 level |
| `contains` | learning_path → concept | "Path includes this concept" | Order matters (sequence) |
| `path_prerequisite` | learning_path → learning_path | "Complete path A before path B" | Must be acyclic |
| `enables` | concept → concept | "Inverse of prerequisite" | Auto-generated reverse edge |

**Rationale:** Explicit edge types enable semantic queries ("show prerequisites" vs "show related concepts").

### 3.3 Proposed PostgreSQL Schema

```sql
-- ============================================
-- GRAPH SCHEMA: Nodes
-- ============================================

CREATE TABLE concept_nodes (
  id TEXT PRIMARY KEY,
  level TEXT NOT NULL REFERENCES tree_levels(id),
  title TEXT NOT NULL,
  simple_name TEXT,
  explanation TEXT NOT NULL,
  metaphor TEXT,
  icon TEXT,
  complexity INT CHECK (complexity BETWEEN 1 AND 3),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE learning_path_nodes (
  id TEXT PRIMARY KEY,
  icon TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_minutes INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tree_levels (
  id TEXT PRIMARY KEY CHECK (id IN ('roots', 'trunk', 'branches', 'leaves')),
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  color TEXT,
  order_rank INT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GRAPH SCHEMA: Edges
-- ============================================

CREATE TYPE edge_type AS ENUM (
  'prerequisite',      -- A is required before B
  'related',           -- A is related to B (non-directional)
  'belongs_to_level',  -- Concept belongs to tree level
  'contains',          -- Path contains concept
  'path_prerequisite', -- Path A before Path B
  'enables'            -- Auto-generated inverse of prerequisite
);

CREATE TABLE concept_edges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_id TEXT NOT NULL,
  target_id TEXT NOT NULL,
  edge_type edge_type NOT NULL,

  -- Metadata
  strength FLOAT CHECK (strength BETWEEN 0 AND 1), -- For 'related' edges
  sequence_order INT,                               -- For 'contains' edges
  required BOOLEAN DEFAULT true,                    -- Optional prerequisites?

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  UNIQUE(source_id, target_id, edge_type),
  CHECK (source_id != target_id) -- No self-loops
);

-- Indexes for graph traversal
CREATE INDEX idx_edges_source ON concept_edges(source_id, edge_type);
CREATE INDEX idx_edges_target ON concept_edges(target_id, edge_type);
CREATE INDEX idx_edges_type ON concept_edges(edge_type);

-- ============================================
-- MATERIALIZED VIEW: Transitive Closure
-- ============================================
-- Pre-compute "all prerequisites of X" for fast queries

CREATE MATERIALIZED VIEW concept_transitive_prerequisites AS
WITH RECURSIVE prereq_closure AS (
  -- Base case: direct prerequisites
  SELECT
    target_id AS concept_id,
    source_id AS prerequisite_id,
    1 AS depth
  FROM concept_edges
  WHERE edge_type = 'prerequisite'

  UNION

  -- Recursive case: prerequisites of prerequisites
  SELECT
    pc.concept_id,
    ce.source_id AS prerequisite_id,
    pc.depth + 1
  FROM prereq_closure pc
  JOIN concept_edges ce ON ce.target_id = pc.prerequisite_id
  WHERE ce.edge_type = 'prerequisite'
    AND pc.depth < 10 -- Prevent infinite loops (safety)
)
SELECT DISTINCT concept_id, prerequisite_id, MIN(depth) AS min_depth
FROM prereq_closure
GROUP BY concept_id, prerequisite_id;

CREATE UNIQUE INDEX idx_transitive_prereq ON concept_transitive_prerequisites(concept_id, prerequisite_id);

-- Refresh materialized view after edge changes
CREATE OR REPLACE FUNCTION refresh_transitive_prereq()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY concept_transitive_prerequisites;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_refresh_transitive
AFTER INSERT OR UPDATE OR DELETE ON concept_edges
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_transitive_prereq();
```

### 3.4 Validation Rules (Database Constraints)

```sql
-- ============================================
-- VALIDATION: Acyclic Graph (No Cycles)
-- ============================================

CREATE OR REPLACE FUNCTION check_prerequisite_cycle()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if adding this edge would create a cycle
  IF EXISTS (
    WITH RECURSIVE path AS (
      SELECT target_id AS node FROM concept_edges WHERE source_id = NEW.target_id AND edge_type = 'prerequisite'
      UNION
      SELECT ce.target_id FROM path p JOIN concept_edges ce ON ce.source_id = p.node WHERE ce.edge_type = 'prerequisite'
    )
    SELECT 1 FROM path WHERE node = NEW.source_id
  ) THEN
    RAISE EXCEPTION 'Prerequisite cycle detected: % -> %', NEW.source_id, NEW.target_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_no_cycles
BEFORE INSERT ON concept_edges
FOR EACH ROW
WHEN (NEW.edge_type = 'prerequisite')
EXECUTE FUNCTION check_prerequisite_cycle();

-- ============================================
-- VALIDATION: Level Hierarchy
-- ============================================

CREATE OR REPLACE FUNCTION validate_level_hierarchy()
RETURNS TRIGGER AS $$
DECLARE
  source_level INT;
  target_level INT;
BEGIN
  -- Get level ranks for source and target
  SELECT tl.order_rank INTO source_level
  FROM concept_nodes cn
  JOIN tree_levels tl ON cn.level = tl.id
  WHERE cn.id = NEW.source_id;

  SELECT tl.order_rank INTO target_level
  FROM concept_nodes cn
  JOIN tree_levels tl ON cn.level = tl.id
  WHERE cn.id = NEW.target_id;

  -- Prerequisites must be at same or lower level (roots=1, leaves=4)
  IF source_level > target_level THEN
    RAISE EXCEPTION 'Invalid prerequisite: % (level %) cannot be prerequisite of % (level %)',
      NEW.source_id, source_level, NEW.target_id, target_level;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_hierarchy
BEFORE INSERT ON concept_edges
FOR EACH ROW
WHEN (NEW.edge_type = 'prerequisite')
EXECUTE FUNCTION validate_level_hierarchy();
```

---

## 4. Graph Query Examples

### 4.1 Get All Prerequisites for a Concept (Direct + Transitive)

```sql
-- Query: What do I need to learn before "RAG"?
SELECT
  cn.id,
  cn.title,
  cn.level,
  ctp.min_depth AS prerequisite_depth
FROM concept_transitive_prerequisites ctp
JOIN concept_nodes cn ON cn.id = ctp.prerequisite_id
WHERE ctp.concept_id = 'rag'
ORDER BY ctp.min_depth ASC, cn.level ASC;
```

**Expected Result:**
```
id       | title    | level | prerequisite_depth
---------|----------|-------|-------------------
vectors  | Vektorid | roots | 1
memory   | Mälu     | trunk | 1
tokens   | Tokenid  | roots | 2
```

### 4.2 Get Sub-Tree for Learning Path

```sql
-- Query: Give me the dependency sub-tree for "ai-fundamentals" path
WITH path_concepts AS (
  SELECT ce.target_id AS concept_id
  FROM concept_edges ce
  WHERE ce.source_id = 'ai-fundamentals'
    AND ce.edge_type = 'contains'
)
SELECT
  cn.id,
  cn.title,
  cn.level,
  COALESCE(
    (SELECT json_agg(json_build_object('id', ctp.prerequisite_id, 'depth', ctp.min_depth))
     FROM concept_transitive_prerequisites ctp
     WHERE ctp.concept_id = cn.id),
    '[]'::json
  ) AS prerequisites
FROM path_concepts pc
JOIN concept_nodes cn ON cn.id = pc.concept_id
ORDER BY cn.level, cn.complexity;
```

### 4.3 Find Unlocked Concepts (Based on Completed Prerequisites)

```sql
-- Query: What concepts can user X learn next?
-- Assumes concept_progress table tracks completed concepts

WITH completed_concepts AS (
  SELECT concept_id FROM concept_progress WHERE session_id = $1 AND status = 'completed'
),
available_concepts AS (
  SELECT cn.id, cn.title, cn.level
  FROM concept_nodes cn
  WHERE cn.id NOT IN (SELECT concept_id FROM completed_concepts) -- Not already completed
    AND NOT EXISTS ( -- All prerequisites are completed
      SELECT 1
      FROM concept_edges ce
      WHERE ce.target_id = cn.id
        AND ce.edge_type = 'prerequisite'
        AND ce.source_id NOT IN (SELECT concept_id FROM completed_concepts)
    )
)
SELECT * FROM available_concepts
ORDER BY level, complexity;
```

### 4.4 Validate Learning Path Integrity

```sql
-- Query: Check if all path concepts have their prerequisites in the path
WITH path_concepts AS (
  SELECT ce.target_id AS concept_id, ce.sequence_order
  FROM concept_edges ce
  WHERE ce.source_id = 'ai-fundamentals' AND ce.edge_type = 'contains'
),
missing_prerequisites AS (
  SELECT
    pc.concept_id,
    prereq.source_id AS missing_prerequisite
  FROM path_concepts pc
  CROSS JOIN LATERAL (
    SELECT ce.source_id
    FROM concept_edges ce
    WHERE ce.target_id = pc.concept_id
      AND ce.edge_type = 'prerequisite'
      AND ce.source_id NOT IN (SELECT concept_id FROM path_concepts)
  ) AS prereq
)
SELECT * FROM missing_prerequisites;
```

---

## 5. TypeScript Interface Definitions

### 5.1 Graph Node Interfaces

```typescript
// Base interface for all graph nodes
interface GraphNode {
  id: string;
  created_at: string;
}

// Concept node
interface ConceptNode extends GraphNode {
  level: 'roots' | 'trunk' | 'branches' | 'leaves';
  title: string;
  simpleName?: string;
  explanation: string;
  metaphor?: string;
  icon?: string;
  complexity: 1 | 2 | 3;

  // Rich content (stored separately)
  codeExample?: CodeExample;
  visual?: ConceptVisual;
}

// Learning path node
interface LearningPathNode extends GraphNode {
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
}

// Tree level node
interface TreeLevel extends GraphNode {
  id: 'roots' | 'trunk' | 'branches' | 'leaves';
  name: string;
  subtitle: string;
  description: string;
  color: string;
  orderRank: number;
}
```

### 5.2 Graph Edge Interfaces

```typescript
type EdgeType =
  | 'prerequisite'
  | 'related'
  | 'belongs_to_level'
  | 'contains'
  | 'path_prerequisite'
  | 'enables';

interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  edgeType: EdgeType;

  // Metadata (optional)
  strength?: number;        // 0-1 for 'related' edges
  sequenceOrder?: number;   // For 'contains' edges
  required?: boolean;       // For optional prerequisites

  createdAt: string;
}

// Type-safe edge constructors
interface PrerequisiteEdge extends Omit<GraphEdge, 'edgeType'> {
  edgeType: 'prerequisite';
  required: boolean;
}

interface ContainsEdge extends Omit<GraphEdge, 'edgeType'> {
  edgeType: 'contains';
  sequenceOrder: number;
}

interface RelatedEdge extends Omit<GraphEdge, 'edgeType'> {
  edgeType: 'related';
  strength: number; // Similarity score
}
```

### 5.3 Query Result Interfaces

```typescript
// Result for transitive prerequisite queries
interface ConceptWithPrerequisites {
  id: string;
  title: string;
  level: string;
  prerequisites: Array<{
    id: string;
    title: string;
    depth: number; // How many hops away
  }>;
}

// Result for path sub-tree queries
interface PathSubTree {
  pathId: string;
  concepts: Array<{
    id: string;
    title: string;
    level: string;
    sequenceOrder: number;
    prerequisites: string[];
    isUnlocked: boolean; // Based on completed concepts
  }>;
}

// Result for progress tracking
interface UserProgress {
  sessionId: string;
  completedConcepts: string[];
  availableConcepts: Array<{
    id: string;
    title: string;
    level: string;
    allPrerequisitesMet: boolean;
  }>;
  suggestedNextConcepts: ConceptNode[];
}
```

---

## 6. Refactoring getTreeContent.ts

### 6.1 Current Issues

```typescript
// ❌ CURRENT: Returns flat array, no relationships
export async function getTreeContent(locale: string): Promise<TreeContentSimple[]> {
  const { data: nodes } = await supabase
    .from('nodes')
    .select('id, parent_id, type, ...'); // Single parent only

  return nodes.map(n => ({
    id: n.id,
    parentId: n.parent_id, // ⚠️ Can't represent multiple prerequisites
    ...
  }));
}
```

### 6.2 Proposed Refactoring

```typescript
// ✅ NEW: Returns graph structure with relationships

export interface ConceptGraph {
  nodes: ConceptNode[];
  edges: GraphEdge[];
  levels: TreeLevel[];
}

export async function getConceptGraph(
  locale: string = 'en'
): Promise<ConceptGraph> {
  // Fetch nodes
  const { data: concepts } = await supabase
    .from('concept_nodes')
    .select('*');

  // Fetch edges
  const { data: edges } = await supabase
    .from('concept_edges')
    .select('*');

  // Fetch levels
  const { data: levels } = await supabase
    .from('tree_levels')
    .select('*')
    .order('order_rank', { ascending: true });

  return {
    nodes: concepts || [],
    edges: edges || [],
    levels: levels || []
  };
}

// Query for learning path sub-tree
export async function getPathSubTree(
  pathId: string,
  sessionId?: string
): Promise<PathSubTree> {
  const { data } = await supabase.rpc('get_path_subtree', {
    p_path_id: pathId,
    p_session_id: sessionId
  });

  return data;
}

// Query for available next concepts
export async function getAvailableConcepts(
  sessionId: string
): Promise<ConceptNode[]> {
  const { data } = await supabase.rpc('get_available_concepts', {
    p_session_id: sessionId
  });

  return data;
}
```

### 6.3 Supabase RPC Functions

```sql
-- RPC: Get path sub-tree with prerequisites
CREATE OR REPLACE FUNCTION get_path_subtree(
  p_path_id TEXT,
  p_session_id UUID DEFAULT NULL
)
RETURNS TABLE (
  concept_id TEXT,
  title TEXT,
  level TEXT,
  sequence_order INT,
  prerequisites JSON,
  is_unlocked BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  WITH path_concepts AS (
    SELECT ce.target_id AS concept_id, ce.sequence_order
    FROM concept_edges ce
    WHERE ce.source_id = p_path_id AND ce.edge_type = 'contains'
  ),
  completed_concepts AS (
    SELECT concept_id FROM concept_progress
    WHERE session_id = p_session_id AND status = 'completed'
  )
  SELECT
    cn.id AS concept_id,
    cn.title,
    cn.level,
    pc.sequence_order,
    COALESCE(
      (SELECT json_agg(ctp.prerequisite_id)
       FROM concept_transitive_prerequisites ctp
       WHERE ctp.concept_id = cn.id),
      '[]'::json
    ) AS prerequisites,
    CASE
      WHEN NOT EXISTS (
        SELECT 1 FROM concept_edges ce
        WHERE ce.target_id = cn.id
          AND ce.edge_type = 'prerequisite'
          AND ce.source_id NOT IN (SELECT concept_id FROM completed_concepts)
      ) THEN true
      ELSE false
    END AS is_unlocked
  FROM path_concepts pc
  JOIN concept_nodes cn ON cn.id = pc.concept_id
  ORDER BY pc.sequence_order;
END;
$$ LANGUAGE plpgsql;
```

---

## 7. Migration Strategy

### 7.1 Phase 1: Schema Creation (Week 1)

1. Run new schema SQL (concept_nodes, concept_edges, tree_levels)
2. Add validation triggers (cycle detection, level hierarchy)
3. Create materialized views (transitive closure)

### 7.2 Phase 2: Data Migration (Week 1-2)

```typescript
// Migration script: tree-concepts.json → PostgreSQL
import treeData from '@/data/tree-concepts.json';
import pathsData from '@/data/learning-paths.json';
import { supabase } from '@/lib/supabase';

async function migrateTreeData() {
  // 1. Insert tree levels
  const levels = treeData.levels.map(level => ({
    id: level.id,
    name: level.name,
    subtitle: level.subtitle,
    description: level.description,
    color: level.color,
    order_rank: level.order
  }));
  await supabase.from('tree_levels').insert(levels);

  // 2. Insert concepts
  const concepts = treeData.concepts.map(concept => ({
    id: concept.id,
    level: concept.level,
    title: concept.title,
    simple_name: concept.simpleName,
    explanation: concept.explanation,
    metaphor: concept.metaphor,
    icon: concept.icon,
    complexity: concept.complexity
  }));
  await supabase.from('concept_nodes').insert(concepts);

  // 3. Insert prerequisite edges
  const prerequisiteEdges = treeData.concepts
    .filter(c => c.prerequisites && c.prerequisites.length > 0)
    .flatMap(concept =>
      concept.prerequisites!.map(prereqId => ({
        source_id: prereqId,
        target_id: concept.id,
        edge_type: 'prerequisite',
        required: true
      }))
    );
  await supabase.from('concept_edges').insert(prerequisiteEdges);

  // 4. Insert learning paths
  const paths = pathsData.paths.map(path => ({
    id: path.id,
    icon: path.icon,
    difficulty: path.difficulty,
    estimated_minutes: path.estimatedMinutes
  }));
  await supabase.from('learning_path_nodes').insert(paths);

  // 5. Insert path-concept edges
  const pathEdges = pathsData.paths.flatMap(path =>
    path.concepts.map((conceptId, index) => ({
      source_id: path.id,
      target_id: conceptId,
      edge_type: 'contains',
      sequence_order: index
    }))
  );
  await supabase.from('concept_edges').insert(pathEdges);

  // 6. Insert path prerequisites
  const pathPrereqEdges = pathsData.paths
    .filter(p => p.prerequisites && p.prerequisites.length > 0)
    .flatMap(path =>
      path.prerequisites.map(prereqPathId => ({
        source_id: prereqPathId,
        target_id: path.id,
        edge_type: 'path_prerequisite'
      }))
    );
  await supabase.from('concept_edges').insert(pathPrereqEdges);
}
```

### 7.3 Phase 3: Refactor Queries (Week 2-3)

- Replace direct tree-concepts.json imports with `getConceptGraph()`
- Update learning path pages to use `getPathSubTree()`
- Add progress tracking with `getAvailableConcepts()`
- Update DNA view integration (see docs/AI_DNA_ARCHITECTURE.md)

### 7.4 Phase 4: Validation & Testing (Week 3-4)

- Verify no circular dependencies
- Test transitive prerequisite queries
- Validate level hierarchy enforcement
- Performance test with 1000+ concepts (future scalability)

---

## 8. Benefits & ROI

### 8.1 Immediate Benefits

| Benefit | Impact | Example |
|---------|--------|---------|
| **Type-safe relationships** | Catches broken references at insert-time | If concept "XYZ" doesn't exist, prerequisite edge fails |
| **Queryable graph** | Complex queries in one SQL statement | "Show all concepts I can learn next" in 50ms |
| **Cycle detection** | Prevents broken learning paths | Can't create A→B→C→A |
| **Level enforcement** | Maintains tree integrity | Leaves can't be prerequisites of roots |

### 8.2 Future Capabilities

- ✅ **AI-powered recommendations:** "Users who learned X also learned Y"
- ✅ **Adaptive paths:** Generate custom paths based on progress
- ✅ **Skill gap analysis:** "To reach goal X, you need to learn [A, B, C]"
- ✅ **Prerequisite optimization:** "Skip redundant prerequisites"
- ✅ **Multi-language support:** Graph structure is language-agnostic

---

## 9. Architecture Decision Records (ADR)

### ADR-001: Use PostgreSQL Graph Schema Over JSON Files

**Context:** Need to query relationships between concepts and paths
**Decision:** Migrate to PostgreSQL with explicit edge types
**Rationale:**
- SQL enables complex graph queries (transitive closure)
- Database constraints prevent data corruption
- Supabase already in use (no new dependencies)
- JSON files remain as seed data source

**Consequences:**
- ✅ Type-safe relationships
- ✅ Better query performance
- ❌ Requires data migration
- ❌ More complex schema

### ADR-002: Use Materialized View for Transitive Prerequisites

**Context:** Recursive queries can be slow for deep graphs
**Decision:** Pre-compute transitive closure in materialized view
**Rationale:**
- Prerequisites rarely change (content updates are infrequent)
- Materialized view can be refreshed on-demand
- Queries become O(1) instead of O(n) depth

**Consequences:**
- ✅ Fast queries (<10ms)
- ✅ Simple API for clients
- ❌ Slightly stale data (refresh required)
- ❌ Extra storage (~10KB per 100 concepts)

### ADR-003: Support DAG (Not Strict Tree) for Concept Prerequisites

**Context:** Some concepts have multiple prerequisites (e.g., RAG needs vectors + memory)
**Decision:** Use edge table instead of single parent_id column
**Rationale:**
- Real learning dependencies are DAG, not tree
- Edge table supports multiple prerequisites
- Enables "alternative paths" (learn A or B)

**Consequences:**
- ✅ Accurate prerequisite modeling
- ✅ Future-proof for complex relationships
- ❌ More complex queries (joins required)
- ❌ Need cycle detection

---

## 10. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Migration breaks existing UI** | High | Medium | Keep JSON files as fallback during migration |
| **Performance degradation** | Medium | Low | Use materialized views + indexes |
| **Circular dependencies in seed data** | High | Medium | Add validation script before migration |
| **Complex queries confuse developers** | Low | High | Provide helper functions + examples |

---

## 11. Next Steps

1. **Review this proposal** with team (1 day)
2. **Validate with sample data** (create 5 test concepts + 2 paths) (1 day)
3. **Implement Phase 1** (schema creation) (2 days)
4. **Run migration script** (Phase 2) (2 days)
5. **Refactor getTreeContent.ts** (Phase 3) (3 days)
6. **Integration testing** (Phase 4) (3 days)

**Total Estimated Time:** 12 days (2.5 weeks)

---

## 12. Questions for Discussion

1. Should we keep tree-concepts.json as source of truth, or make database canonical?
2. Do we need versioning for concept content (track changes over time)?
3. Should "related concepts" be symmetric (if A→B, then B→A)?
4. How to handle soft prerequisites (recommended but not required)?
5. Should we add concept difficulty ratings (beyond complexity 1-3)?

---

**End of Proposal**
For implementation guidance, see:
- `docs/AI_TREE_MASTER_REFERENCE.md` - Master reference
- `docs/AI_DNA_ARCHITECTURE.md` - DNA model integration
- `BACKLOG.md` - Sprint planning
