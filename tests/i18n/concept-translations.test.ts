import { describe, it, expect } from 'vitest';
import treeData from '@/data/tree-concepts.json';
import enMessages from '@/messages/en.json';
import etMessages from '@/messages/et.json';

const CONCEPT_FIELDS = ['title', 'simpleName', 'explanation', 'metaphor'] as const;
const LEVEL_FIELDS = ['name', 'subtitle', 'description'] as const;
const LEVEL_IDS = ['roots', 'trunk', 'branches', 'leaves'] as const;

describe('i18n concept translations completeness', () => {
  const conceptIds = treeData.concepts.map(c => c.id);

  describe('conceptData namespace', () => {
    it('en.json has conceptData namespace', () => {
      expect(enMessages.conceptData).toBeDefined();
    });

    it('et.json has conceptData namespace', () => {
      expect(etMessages.conceptData).toBeDefined();
    });

    it('every concept ID has en.json entry with all fields', () => {
      for (const id of conceptIds) {
        const entry = (enMessages.conceptData as Record<string, Record<string, string>>)[id];
        expect(entry, `Missing en.json conceptData.${id}`).toBeDefined();
        for (const field of CONCEPT_FIELDS) {
          expect(entry[field], `Missing en.json conceptData.${id}.${field}`).toBeDefined();
          expect(entry[field].length, `Empty en.json conceptData.${id}.${field}`).toBeGreaterThan(0);
        }
      }
    });

    it('every concept ID has et.json entry with all fields', () => {
      for (const id of conceptIds) {
        const entry = (etMessages.conceptData as Record<string, Record<string, string>>)[id];
        expect(entry, `Missing et.json conceptData.${id}`).toBeDefined();
        for (const field of CONCEPT_FIELDS) {
          expect(entry[field], `Missing et.json conceptData.${id}.${field}`).toBeDefined();
          expect(entry[field].length, `Empty et.json conceptData.${id}.${field}`).toBeGreaterThan(0);
        }
      }
    });

    it('en.json and et.json have the same concept IDs', () => {
      const enIds = Object.keys(enMessages.conceptData).sort();
      const etIds = Object.keys(etMessages.conceptData).sort();
      expect(enIds).toEqual(etIds);
    });

    it(`covers all ${conceptIds.length} concepts`, () => {
      const enIds = Object.keys(enMessages.conceptData);
      expect(enIds.length).toBeGreaterThanOrEqual(conceptIds.length);
      for (const id of conceptIds) {
        expect(enIds, `conceptData missing concept: ${id}`).toContain(id);
      }
    });
  });

  describe('conceptLevels namespace', () => {
    it('en.json has conceptLevels namespace', () => {
      expect(enMessages.conceptLevels).toBeDefined();
    });

    it('et.json has conceptLevels namespace', () => {
      expect(etMessages.conceptLevels).toBeDefined();
    });

    it('every level ID has en.json entry with all fields', () => {
      for (const id of LEVEL_IDS) {
        const entry = (enMessages.conceptLevels as Record<string, Record<string, string>>)[id];
        expect(entry, `Missing en.json conceptLevels.${id}`).toBeDefined();
        for (const field of LEVEL_FIELDS) {
          expect(entry[field], `Missing en.json conceptLevels.${id}.${field}`).toBeDefined();
          expect(entry[field].length, `Empty en.json conceptLevels.${id}.${field}`).toBeGreaterThan(0);
        }
      }
    });

    it('every level ID has et.json entry with all fields', () => {
      for (const id of LEVEL_IDS) {
        const entry = (etMessages.conceptLevels as Record<string, Record<string, string>>)[id];
        expect(entry, `Missing et.json conceptLevels.${id}`).toBeDefined();
        for (const field of LEVEL_FIELDS) {
          expect(entry[field], `Missing et.json conceptLevels.${id}.${field}`).toBeDefined();
          expect(entry[field].length, `Empty et.json conceptLevels.${id}.${field}`).toBeGreaterThan(0);
        }
      }
    });
  });

  describe('codeExplanations namespace', () => {
    const conceptsWithCode = treeData.concepts
      .filter(c => c.codeExample)
      .map(c => c.id);

    it('en.json has codeExplanations namespace', () => {
      expect(enMessages.codeExplanations).toBeDefined();
    });

    it('et.json has codeExplanations namespace', () => {
      expect(etMessages.codeExplanations).toBeDefined();
    });

    it('every concept with code has en.json code explanation', () => {
      for (const id of conceptsWithCode) {
        const value = (enMessages.codeExplanations as Record<string, string>)[id];
        expect(value, `Missing en.json codeExplanations.${id}`).toBeDefined();
        expect(value.length, `Empty en.json codeExplanations.${id}`).toBeGreaterThan(0);
      }
    });

    it('every concept with code has et.json code explanation', () => {
      for (const id of conceptsWithCode) {
        const value = (etMessages.codeExplanations as Record<string, string>)[id];
        expect(value, `Missing et.json codeExplanations.${id}`).toBeDefined();
        expect(value.length, `Empty et.json codeExplanations.${id}`).toBeGreaterThan(0);
      }
    });
  });

  describe('translation quality checks', () => {
    it('en.json and et.json translations are different (not copy-paste)', () => {
      // Check a sample of concepts to ensure English != Estonian
      // Use concepts whose titles differ between EN and ET (avoid acronyms like RAG)
      const sampleIds = ['tokens', 'attention', 'security'];
      for (const id of sampleIds) {
        const en = (enMessages.conceptData as Record<string, Record<string, string>>)[id];
        const et = (etMessages.conceptData as Record<string, Record<string, string>>)[id];
        if (en && et) {
          expect(en.title, `en/et titles should differ for ${id}`).not.toEqual(et.title);
          expect(en.explanation, `en/et explanations should differ for ${id}`).not.toEqual(et.explanation);
        }
      }
    });
  });
});
