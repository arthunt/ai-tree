# Graph Schema Implementation Checklist

**Project:** AI Tree (Dendrix.ai)
**Task:** Unify tree concepts and learning paths into graph database
**Estimated Time:** 12 days (2.5 weeks)

---

## Phase 1: Schema Creation (Days 1-2)

### Day 1: Database Schema

- [ ] **1.1 Create tables**
  ```bash
  # File: supabase/migrations/20260140_graph_schema.sql
  ```
  - [ ] `tree_levels` table (4 rows: roots, trunk, branches, leaves)
  - [ ] `concept_nodes` table (replaces tree-concepts.json structure)
  - [ ] `learning_path_nodes` table
  - [ ] `concept_edges` table with edge_type enum
  - [ ] Add indexes: `idx_edges_source`, `idx_edges_target`, `idx_edges_type`

- [ ] **1.2 Create validation triggers**
  ```sql
  CREATE TRIGGER trigger_no_cycles ...
  CREATE TRIGGER trigger_validate_hierarchy ...
  ```
  - [ ] `check_prerequisite_cycle()` function
  - [ ] `validate_level_hierarchy()` function
  - [ ] Test: Try inserting circular dependency (should fail)
  - [ ] Test: Try LEAVES→ROOTS prerequisite (should fail)

- [ ] **1.3 Create materialized view**
  ```sql
  CREATE MATERIALIZED VIEW concept_transitive_prerequisites ...
  ```
  - [ ] Recursive CTE for transitive closure
  - [ ] Unique index on (concept_id, prerequisite_id)
  - [ ] Refresh trigger on concept_edges changes

- [ ] **1.4 Deploy to Supabase**
  ```bash
  supabase db push
  supabase db reset # Test from scratch
  ```

### Day 2: Helper Functions

- [ ] **2.1 Create RPC functions**
  ```sql
  CREATE FUNCTION get_path_subtree(p_path_id, p_session_id) ...
  CREATE FUNCTION get_available_concepts(p_session_id) ...
  CREATE FUNCTION validate_path_integrity(p_path_id) ...
  ```
  - [ ] `get_path_subtree()` - Returns path with prerequisites
  - [ ] `get_available_concepts()` - Returns unlocked concepts
  - [ ] `validate_path_integrity()` - Checks missing prerequisites
  - [ ] Test each function with mock data

- [ ] **2.2 Test queries**
  ```sql
  -- Test transitive prerequisites
  SELECT * FROM concept_transitive_prerequisites WHERE concept_id = 'rag';

  -- Test available concepts
  SELECT * FROM get_available_concepts('test-session-uuid');
  ```

---

## Phase 2: Data Migration (Days 3-4)

### Day 3: Migration Script

- [ ] **3.1 Create migration script**
  ```typescript
  // File: scripts/migrate-to-graph.ts
  ```
  - [ ] Read `tree-concepts.json` and `learning-paths.json`
  - [ ] Insert tree_levels (4 records)
  - [ ] Insert concept_nodes (23 records)
  - [ ] Insert prerequisite edges from concept.prerequisites[]
  - [ ] Validate: No broken references
  - [ ] Add error handling and rollback

- [ ] **3.2 Validate seed data**
  ```typescript
  // Before migration: Check for issues
  ```
  - [ ] Check for circular dependencies in JSON
  - [ ] Check for non-existent prerequisite IDs
  - [ ] Check for duplicate concept IDs
  - [ ] Generate validation report

- [ ] **3.3 Run migration (dry-run first)**
  ```bash
  # Dry-run mode (no database changes)
  npm run migrate:graph -- --dry-run

  # Actual migration
  npm run migrate:graph
  ```
  - [ ] Backup existing database
  - [ ] Run dry-run, review logs
  - [ ] Run actual migration
  - [ ] Verify record counts match

### Day 4: Learning Paths Migration

- [ ] **4.1 Migrate learning paths**
  - [ ] Insert learning_path_nodes (5 records)
  - [ ] Insert path→concept edges (contains, with sequence_order)
  - [ ] Insert path→path prerequisites
  - [ ] Validate: All path concepts exist in concept_nodes

- [ ] **4.2 Validate integrity**
  ```sql
  -- Check for missing concepts in paths
  SELECT * FROM concept_edges
  WHERE edge_type = 'contains'
    AND target_id NOT IN (SELECT id FROM concept_nodes);
  ```
  - [ ] Run integrity checks
  - [ ] Test transitive prerequisite view is populated
  - [ ] Test cycle detection (manually insert bad edge)

- [ ] **4.3 Create rollback script**
  ```bash
  # File: scripts/rollback-graph.ts
  ```
  - [ ] Drop new tables
  - [ ] Restore JSON-based queries
  - [ ] Test rollback procedure

---

## Phase 3: Refactor Queries (Days 5-8)

### Day 5: Core Data Access Layer

- [ ] **5.1 Create new actions file**
  ```typescript
  // File: actions/getGraphData.ts
  ```
  - [ ] `getConceptGraph(locale)` - Replaces tree-concepts.json import
  - [ ] `getPathSubTree(pathId, sessionId)` - Path with prerequisites
  - [ ] `getAvailableConcepts(sessionId)` - Progress-aware query
  - [ ] `getConceptDependencies(conceptId)` - Prerequisite chain
  - [ ] Add JSDoc comments and types

- [ ] **5.2 Update TypeScript interfaces**
  ```typescript
  // File: lib/types.ts
  ```
  - [ ] Add `GraphNode`, `GraphEdge` interfaces
  - [ ] Add `ConceptGraph`, `PathSubTree` interfaces
  - [ ] Add `UserProgress` interface
  - [ ] Extend existing `Concept` interface

- [ ] **5.3 Keep backward compatibility**
  ```typescript
  // Keep getTreeContent.ts as fallback during transition
  export async function getTreeContent(locale: string) {
    // Add deprecation warning
    console.warn('getTreeContent is deprecated, use getConceptGraph');
    // Call new function internally
  }
  ```

### Day 6: Learning Path Pages

- [ ] **6.1 Refactor learning path page**
  ```typescript
  // File: app/[locale]/learn/[pathId]/page.tsx
  ```
  - [ ] Replace: `import pathsData from '@/data/learning-paths.json'`
  - [ ] Use: `const pathSubTree = await getPathSubTree(pathId, sessionId)`
  - [ ] Update props passed to `LearningPathClient`
  - [ ] Test: Verify paths render correctly

- [ ] **6.2 Update LearningPathClient**
  ```typescript
  // File: app/[locale]/learn/[pathId]/LearningPathClient.tsx
  ```
  - [ ] Accept new `pathSubTree` prop
  - [ ] Display prerequisites for each concept
  - [ ] Show locked/unlocked state (if sessionId provided)
  - [ ] Add prerequisite tooltip/popover

- [ ] **6.3 Test with real data**
  - [ ] Test "ai-fundamentals" path (6 concepts)
  - [ ] Test "build-rag-apps" path (5 concepts)
  - [ ] Verify prerequisite chains display correctly

### Day 7: Concept Pages

- [ ] **7.1 Refactor concept page**
  ```typescript
  // File: app/[locale]/concept/[conceptId]/page.tsx
  ```
  - [ ] Replace: `import treeData from '@/data/tree-concepts.json'`
  - [ ] Use: `const graph = await getConceptGraph(locale)`
  - [ ] Fetch prerequisites from graph
  - [ ] Fetch "what you can learn next" (inverse)

- [ ] **7.2 Update ConceptPageClient**
  ```typescript
  // File: app/[locale]/concept/[conceptId]/ConceptPageClient.tsx
  ```
  - [ ] Add "Prerequisites" section (with links)
  - [ ] Add "Enables learning" section (concepts that depend on this)
  - [ ] Add "Related concepts" section (related edges)
  - [ ] Display level badge (roots/trunk/branches/leaves)

- [ ] **7.3 Test with real data**
  - [ ] Test concept with prerequisites (e.g., "attention")
  - [ ] Test concept without prerequisites (e.g., "tokens")
  - [ ] Verify links work

### Day 8: Progress Tracking Integration

- [ ] **8.1 Update progress tracking**
  ```typescript
  // File: lib/useProgress.ts or new file
  ```
  - [ ] `useAvailableConcepts(sessionId)` hook
  - [ ] Display unlocked concepts count
  - [ ] Show progress bar (completed vs total)

- [ ] **8.2 Add progress indicator to paths**
  ```typescript
  // File: app/[locale]/learn/page.tsx
  ```
  - [ ] Show "X/Y concepts completed" per path
  - [ ] Disable paths with incomplete prerequisites
  - [ ] Add "Start" vs "Continue" button

- [ ] **8.3 Test progress flow**
  - [ ] Complete "tokens" concept
  - [ ] Verify "vectors" unlocks
  - [ ] Complete "vectors"
  - [ ] Verify "attention" unlocks

---

## Phase 4: Validation & Testing (Days 9-12)

### Day 9: Unit Tests

- [ ] **9.1 Test graph queries**
  ```typescript
  // File: tests/graph-queries.test.ts
  ```
  - [ ] Test `getConceptGraph()` returns all concepts
  - [ ] Test `getPathSubTree()` includes prerequisites
  - [ ] Test `getAvailableConcepts()` respects prerequisites
  - [ ] Test transitive closure (RAG requires tokens transitively)

- [ ] **9.2 Test validation rules**
  ```typescript
  // File: tests/graph-validation.test.ts
  ```
  - [ ] Test cycle detection (A→B→C→A should fail)
  - [ ] Test level hierarchy (LEAVES→ROOTS should fail)
  - [ ] Test foreign key constraints (invalid concept ID should fail)
  - [ ] Test unique edge constraint (duplicate edge should fail)

- [ ] **9.3 Test migration script**
  ```typescript
  // File: tests/migration.test.ts
  ```
  - [ ] Test JSON→PostgreSQL migration
  - [ ] Test record counts match
  - [ ] Test rollback script
  - [ ] Test idempotency (run twice, same result)

### Day 10: Integration Tests

- [ ] **10.1 Test learning path flow**
  ```typescript
  // File: tests/e2e/learning-path.test.ts
  ```
  - [ ] Navigate to learning path page
  - [ ] Verify concepts display in sequence
  - [ ] Verify prerequisites show correctly
  - [ ] Click on concept, verify it loads

- [ ] **10.2 Test concept page**
  ```typescript
  // File: tests/e2e/concept-page.test.ts
  ```
  - [ ] Navigate to concept page
  - [ ] Verify prerequisites section
  - [ ] Verify "enables learning" section
  - [ ] Click prerequisite link, verify navigation

- [ ] **10.3 Test progress tracking**
  ```typescript
  // File: tests/e2e/progress.test.ts
  ```
  - [ ] Complete concept, verify progress updates
  - [ ] Verify unlocked concepts appear
  - [ ] Verify path progress percentage

### Day 11: Performance Testing

- [ ] **11.1 Benchmark queries**
  ```typescript
  // File: tests/performance/graph-queries.bench.ts
  ```
  - [ ] Benchmark `getConceptGraph()` (<100ms)
  - [ ] Benchmark `getPathSubTree()` (<50ms)
  - [ ] Benchmark `getAvailableConcepts()` (<50ms)
  - [ ] Benchmark transitive prerequisite view (<10ms)

- [ ] **11.2 Test with large dataset**
  - [ ] Seed 1000 concepts (stress test)
  - [ ] Seed 100 learning paths
  - [ ] Re-run benchmarks
  - [ ] Optimize indexes if needed

- [ ] **11.3 Test materialized view refresh**
  - [ ] Insert 100 new edges
  - [ ] Measure view refresh time (<1s)
  - [ ] Test concurrent refreshes

### Day 12: Final Validation & Documentation

- [ ] **12.1 Code review**
  - [ ] Review all new TypeScript code
  - [ ] Review SQL schema and functions
  - [ ] Review migration scripts
  - [ ] Check for TypeScript errors (`npm run type-check`)

- [ ] **12.2 Update documentation**
  - [ ] Update README.md with graph schema info
  - [ ] Add JSDoc comments to all functions
  - [ ] Create API documentation (Storybook or similar)
  - [ ] Update `AI_TREE_MASTER_REFERENCE.md`

- [ ] **12.3 Deployment checklist**
  - [ ] Run final migration on staging
  - [ ] Test on staging environment
  - [ ] Backup production database
  - [ ] Run migration on production
  - [ ] Monitor for errors (24h)

- [ ] **12.4 Rollback plan**
  - [ ] Document rollback procedure
  - [ ] Keep JSON files as fallback
  - [ ] Test rollback on staging
  - [ ] Communicate rollback plan to team

---

## Post-Implementation

### Week 3: Monitor & Optimize

- [ ] Monitor query performance (Supabase dashboard)
- [ ] Monitor error rates (Sentry or similar)
- [ ] Collect user feedback on new features
- [ ] Optimize slow queries (add indexes if needed)

### Week 4: Deprecate Old Code

- [ ] Remove direct JSON imports from codebase
- [ ] Remove `getTreeContent.ts` (keep as git history)
- [ ] Update all import statements
- [ ] Remove deprecated warnings

### Future: Extend Schema

- [ ] Add concept versioning (track content changes)
- [ ] Add difficulty ratings for edges
- [ ] Add alternative prerequisites (OR logic)
- [ ] Add user-generated learning paths
- [ ] Add AI-powered path recommendations

---

## Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Migration breaks UI | Keep JSON files as fallback, gradual rollout |
| Performance degradation | Use materialized views, add indexes |
| Circular dependencies in seed data | Run validation script before migration |
| Complex queries confuse developers | Provide helper functions + examples |
| Rollback issues | Test rollback procedure on staging first |

---

## Success Criteria

✅ **Must Have (P0)**
- [ ] All 23 concepts migrated to database
- [ ] All 5 learning paths migrated
- [ ] No data loss (record counts match)
- [ ] Learning path pages render correctly
- [ ] Concept pages show prerequisites

✅ **Should Have (P1)**
- [ ] Progress tracking with unlocked concepts
- [ ] Transitive prerequisite queries <50ms
- [ ] Cycle detection works
- [ ] Level hierarchy enforced

✅ **Nice to Have (P2)**
- [ ] "What can I learn next?" feature
- [ ] Prerequisite graph visualization
- [ ] Path integrity validation tool
- [ ] Admin UI for managing graph

---

## Files to Create/Modify

### New Files
```
supabase/migrations/
  └── 20260140_graph_schema.sql

scripts/
  ├── migrate-to-graph.ts
  ├── rollback-graph.ts
  └── validate-graph.ts

actions/
  └── getGraphData.ts

tests/
  ├── graph-queries.test.ts
  ├── graph-validation.test.ts
  ├── migration.test.ts
  └── e2e/
      ├── learning-path.test.ts
      ├── concept-page.test.ts
      └── progress.test.ts

docs/
  ├── GRAPH_SCHEMA_PROPOSAL.md (✅ created)
  ├── GRAPH_SCHEMA_VISUAL.md (✅ created)
  └── GRAPH_SCHEMA_IMPLEMENTATION.md (✅ created)
```

### Modified Files
```
lib/types.ts
app/[locale]/learn/[pathId]/page.tsx
app/[locale]/learn/[pathId]/LearningPathClient.tsx
app/[locale]/concept/[conceptId]/page.tsx
app/[locale]/concept/[conceptId]/ConceptPageClient.tsx
app/[locale]/learn/page.tsx
lib/useProgress.ts
actions/getTreeContent.ts (mark as deprecated)
```

---

## Questions Before Starting

1. **Database access:** Do we have Supabase credentials for staging/production?
2. **Testing strategy:** Should we use Playwright or Cypress for E2E tests?
3. **Rollout plan:** Gradual rollout or big-bang migration?
4. **Monitoring:** Should we add custom metrics for query performance?
5. **Backup:** What's the backup retention policy for production?

---

**Next Steps:**
1. Review this checklist with team
2. Set up project board (GitHub Projects or Jira)
3. Assign tasks to team members
4. Start Day 1: Schema Creation

**For technical details, refer to:**
- `docs/GRAPH_SCHEMA_PROPOSAL.md` - Full specification
- `docs/GRAPH_SCHEMA_VISUAL.md` - Visual diagrams
- `docs/AI_TREE_MASTER_REFERENCE.md` - Project reference
