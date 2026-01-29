import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Dendrix.ai — AI Knowledge Tree';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEt = locale === 'et';

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
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            🌳
          </div>
          <span style={{ fontSize: '28px', fontWeight: 600, opacity: 0.9 }}>dendrix.ai</span>
        </div>

        {/* Title */}
        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          {isEt ? 'AI Teadmiste Puu' : 'AI Knowledge Tree'}
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: '28px', fontWeight: 400, opacity: 0.85, lineHeight: 1.4, maxWidth: '800px' }}>
          {isEt
            ? 'Mõista AI-d piisavalt, et teha teadlikke otsuseid. Omanda põhitõed ~2 tunniga.'
            : 'Understand AI well enough to make informed decisions. Master the fundamentals in ~2 hours.'}
        </div>

        {/* Bottom badges */}
        <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
          {['Roots', 'Trunk', 'Branches', 'Leaves'].map((level) => (
            <div
              key={level}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.15)',
                fontSize: '18px',
                fontWeight: 600,
              }}
            >
              {level}
            </div>
          ))}
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.15)',
              fontSize: '18px',
              fontWeight: 600,
              marginLeft: 'auto',
            }}
          >
            23 {isEt ? 'kontseptsiooni' : 'concepts'}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
