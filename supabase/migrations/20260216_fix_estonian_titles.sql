-- Migration: Fix Estonian Concept Titles
-- Date: 2026-02-01
-- Description: Corrects missing diacritics in concept titles (Enesetahelepanu -> Enesetähelepanu, Uldistamine -> Üldistamine).

-- Attention (Enesetähelepanu)
UPDATE concept_translations
SET title = 'Enesetähelepanu'
WHERE concept_id = 'attention' AND locale = 'et';

-- Generalization (Üldistamine)
UPDATE concept_translations
SET title = 'Üldistamine'
WHERE concept_id = 'generalization' AND locale = 'et';
