-- ============================================================
-- CONTENT VARIANT SYSTEM
-- Enables A/B testing of content across the platform
-- Reference: docs/I18N_TRANSLATION_PRINCIPLES.md, Section 8
-- Reference: docs/I18N_TECHNICAL_MIGRATION.md, Phase 2
-- ============================================================

CREATE TABLE IF NOT EXISTS content_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key TEXT NOT NULL,
  locale TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  weight FLOAT NOT NULL DEFAULT 1.0 CHECK (weight > 0 AND weight <= 10),
  impressions INTEGER NOT NULL DEFAULT 0,
  engagements INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by TEXT,
  UNIQUE(content_key, locale, variant_name)
);

CREATE INDEX IF NOT EXISTS idx_variants_serving
  ON content_variants(content_key, locale) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_variants_analytics
  ON content_variants(content_key, locale, variant_name);

ALTER TABLE content_variants ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Read active variants') THEN
    CREATE POLICY "Read active variants" ON content_variants FOR SELECT USING (is_active = true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin manage variants') THEN
    CREATE POLICY "Admin manage variants" ON content_variants FOR ALL USING (auth.role() = 'service_role');
  END IF;
END $$;

-- Measurement functions

CREATE OR REPLACE FUNCTION record_variant_impression(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET impressions = impressions + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION record_variant_engagement(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET engagements = engagements + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION record_variant_conversion(
  p_content_key TEXT,
  p_locale TEXT,
  p_variant_name TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE content_variants
  SET conversions = conversions + 1,
      updated_at = now()
  WHERE content_key = p_content_key
    AND locale = p_locale
    AND variant_name = p_variant_name
    AND is_active = true;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_variant_performance(
  p_content_key TEXT,
  p_locale TEXT DEFAULT NULL
) RETURNS TABLE (
  content_key TEXT,
  locale TEXT,
  variant_name TEXT,
  content TEXT,
  impressions INTEGER,
  engagements INTEGER,
  conversions INTEGER,
  engagement_rate FLOAT,
  conversion_rate FLOAT,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    cv.content_key,
    cv.locale,
    cv.variant_name,
    cv.content,
    cv.impressions,
    cv.engagements,
    cv.conversions,
    CASE WHEN cv.impressions > 0
      THEN cv.engagements::FLOAT / cv.impressions
      ELSE 0
    END as engagement_rate,
    CASE WHEN cv.impressions > 0
      THEN cv.conversions::FLOAT / cv.impressions
      ELSE 0
    END as conversion_rate,
    cv.is_active
  FROM content_variants cv
  WHERE cv.content_key = p_content_key
    AND (p_locale IS NULL OR cv.locale = p_locale)
  ORDER BY cv.locale, cv.impressions DESC;
END;
$$ LANGUAGE plpgsql;
