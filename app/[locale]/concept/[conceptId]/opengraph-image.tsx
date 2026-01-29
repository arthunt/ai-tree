import { ImageResponse } from 'next/og';
import treeData from '@/data/tree-concepts.json';

export const runtime = 'edge';
export const alt = 'AI Concept — Dendrix.ai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const levelColors: Record<string, string> = {
  roots: '#10b981',
  trunk: '#f59e0b',
  branches: '#3b82f6',
  leaves: '#8b5cf6',
};

const levelNames: Record<string, Record<string, string>> = {
  et: { roots: 'Juured', trunk: 'Tüvi', branches: 'Oksad', leaves: 'Lehed' },
  en: { roots: 'Roots', trunk: 'Trunk', branches: 'Branches', leaves: 'Leaves' },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; conceptId: string }>;
}) {
  const { locale, conceptId } = await params;
  const concept = treeData.concepts.find((c) => c.id === conceptId);

  if (!concept) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#1e1b4b',
            color: 'white',
            fontSize: '48px',
            fontFamily: 'system-ui',
          }}
        >
          Concept not found
        </div>
      ),
      { ...size }
    );
  }

  const color = levelColors[concept.level] || '#6b7280';
  const levelName = levelNames[locale]?.[concept.level] || concept.level;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)',
          color: 'white',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: branding + level badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}
            >
              🌳
            </div>
            <span style={{ fontSize: '24px', fontWeight: 600, opacity: 0.8 }}>dendrix.ai</span>
          </div>
          <div
            style={{
              padding: '8px 24px',
              borderRadius: '999px',
              background: color,
              fontSize: '18px',
              fontWeight: 700,
            }}
          >
            {levelName}
          </div>
        </div>

        {/* Concept title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {concept.title}
        </div>

        {/* Simple name */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 500,
            opacity: 0.75,
            marginBottom: '32px',
          }}
        >
          {concept.simpleName}
        </div>

        {/* Metaphor preview */}
        <div
          style={{
            fontSize: '22px',
            fontWeight: 400,
            opacity: 0.7,
            lineHeight: 1.5,
            maxWidth: '900px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {concept.metaphor.length > 180
            ? concept.metaphor.substring(0, 180) + '...'
            : concept.metaphor}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: 'auto',
            opacity: 0.6,
            fontSize: '18px',
          }}
        >
          <span>{'★'.repeat(concept.complexity)}</span>
          <span>|</span>
          <span>{locale === 'et' ? 'AI Teadmiste Puu' : 'AI Knowledge Tree'}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
