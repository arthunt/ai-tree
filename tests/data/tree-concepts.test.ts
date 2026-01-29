import { describe, it, expect } from 'vitest';
import treeData from '@/data/tree-concepts.json';

describe('tree-concepts.json data integrity', () => {
  it('has required metadata fields', () => {
    expect(treeData.version).toBeDefined();
    expect(treeData.metadata).toBeDefined();
    expect(treeData.metadata.title).toBeDefined();
  });

  it('has 4 levels', () => {
    expect(treeData.levels).toHaveLength(4);
    const levelIds = treeData.levels.map(l => l.id);
    expect(levelIds).toContain('roots');
    expect(levelIds).toContain('trunk');
    expect(levelIds).toContain('branches');
    expect(levelIds).toContain('leaves');
  });

  it('has at least 16 concepts', () => {
    expect(treeData.concepts.length).toBeGreaterThanOrEqual(16);
  });

  it('every concept has required fields', () => {
    for (const concept of treeData.concepts) {
      expect(concept.id).toBeDefined();
      expect(concept.level).toBeDefined();
      expect(concept.title).toBeDefined();
      expect(concept.simpleName).toBeDefined();
      expect(concept.explanation).toBeDefined();
      expect(concept.metaphor).toBeDefined();
      expect(concept.icon).toBeDefined();
      expect(concept.complexity).toBeGreaterThanOrEqual(1);
      expect(concept.complexity).toBeLessThanOrEqual(3);
    }
  });

  it('concept levels are valid', () => {
    const validLevels = ['roots', 'trunk', 'branches', 'leaves'];
    for (const concept of treeData.concepts) {
      expect(validLevels).toContain(concept.level);
    }
  });

  it('prerequisites reference existing concepts', () => {
    const conceptIds = new Set(treeData.concepts.map(c => c.id));
    for (const concept of treeData.concepts) {
      if (concept.prerequisites) {
        for (const prereq of concept.prerequisites) {
          expect(conceptIds.has(prereq)).toBe(true);
        }
      }
    }
  });

  it('every concept has a visual', () => {
    for (const concept of treeData.concepts) {
      expect(concept.visual).toBeDefined();
      expect(concept.visual?.type).toBeDefined();
      expect(concept.visual?.alt).toBeDefined();
    }
  });

  it('concepts are distributed across all levels', () => {
    const byLevel: Record<string, number> = {};
    for (const concept of treeData.concepts) {
      byLevel[concept.level] = (byLevel[concept.level] || 0) + 1;
    }
    expect(Object.keys(byLevel)).toHaveLength(4);
    for (const count of Object.values(byLevel)) {
      expect(count).toBeGreaterThan(0);
    }
  });
});
