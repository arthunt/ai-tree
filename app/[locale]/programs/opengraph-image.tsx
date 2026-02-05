import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TITLES: Record<string, string> = {
  en: 'AI Training Programs',
  et: 'AI Koolitusprogrammid',
  ru: 'Программы обучения AI',
};

const SUBTITLES: Record<string, string> = {
  en: 'Professional AI training by Ettev\u00f5tluskeskus O\u00dc',
  et: 'Professionaalne AI koolitus Ettev\u00f5tluskeskus O\u00dc-lt',
  ru: '\u041f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u043e\u0435 \u043e\u0431\u0443\u0447\u0435\u043d\u0438\u0435 AI \u043e\u0442 Ettev\u00f5tluskeskus O\u00dc',
};

export default async function OGImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale as 'en' | 'et' | 'ru') || 'en';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #7c3aed 70%, #a855f7 100%)',
          color: 'white',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
            }}
          >
            \ud83c\udf93
          </div>
          <span style={{ fontSize: '28px', fontWeight: 600, opacity: 0.9 }}>dendrix.ai</span>
        </div>

        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          {TITLES[lang]}
        </div>

        <div style={{ fontSize: '28px', fontWeight: 400, opacity: 0.85, lineHeight: 1.4, maxWidth: '900px' }}>
          {SUBTITLES[lang]}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', flexWrap: 'wrap' }}>
          {['AIKI', 'AIVO', 'AIME'].map((code) => (
            <div
              key={code}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.2)',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {code}
            </div>
          ))}
          <div
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              background: 'rgba(255,255,255,0.1)',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            HAKA \u2713
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
