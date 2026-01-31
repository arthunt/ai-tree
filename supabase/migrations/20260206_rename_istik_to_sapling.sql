-- ============================================================
-- Rename evolution_stage enum value: 'istik' -> 'sapling'
-- Aligns DB with codebase convention (English stage names)
-- ============================================================

-- PostgreSQL allows renaming enum values directly (PG 10+)
ALTER TYPE evolution_stage RENAME VALUE 'istik' TO 'sapling';
