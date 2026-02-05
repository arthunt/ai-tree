import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type LocaleKey = 'en' | 'et' | 'ru';

interface ProgramOG {
  gradient: string;
  title: Record<LocaleKey, string>;
  subtitle: Record<LocaleKey, string>;
  badges: Record<LocaleKey, string[]>;
}

const PROGRAM_OG: Record<string, ProgramOG> = {
  aiki: {
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #2563eb 70%, #3b82f6 100%)',
    title: {
      en: 'AIKI \u2014 AI Instructor',
      et: 'AIKI \u2014 AI Koolitaja',
      ru: 'AIKI \u2014 AI \u0418\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440',
    },
    subtitle: {
      en: 'Become an AI instructor in 6 weeks',
      et: 'Saa AI koolitajaks 6 n\u00e4dalaga',
      ru: '\u0421\u0442\u0430\u043d\u044c\u0442\u0435 AI-\u0438\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u043e\u0440\u043e\u043c \u0437\u0430 6 \u043d\u0435\u0434\u0435\u043b\u044c',
    },
    badges: {
      en: ['6 Weeks', '60h', 'Certificate', 'HAKA'],
      et: ['6 N\u00e4dalat', '60h', 'Tunnistus', 'HAKA'],
      ru: ['6 \u041d\u0435\u0434\u0435\u043b\u044c', '60\u0447', '\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043a\u0430\u0442', 'HAKA'],
    },
  },
  aivo: {
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 30%, #22c55e 70%, #4ade80 100%)',
    title: {
      en: 'AIVO \u2014 AI Automation',
      et: 'AIVO \u2014 AI Automatiseerimine',
      ru: 'AIVO \u2014 AI \u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044f',
    },
    subtitle: {
      en: 'Master AI automation in 4 weeks',
      et: 'Omanda AI automatiseerimine 4 n\u00e4dalaga',
      ru: '\u041e\u0441\u0432\u043e\u0439\u0442\u0435 AI \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u044e \u0437\u0430 4 \u043d\u0435\u0434\u0435\u043b\u0438',
    },
    badges: {
      en: ['4 Weeks', '40h', 'Practical', 'HAKA'],
      et: ['4 N\u00e4dalat', '40h', 'Praktiline', 'HAKA'],
      ru: ['4 \u041d\u0435\u0434\u0435\u043b\u0438', '40\u0447', '\u041f\u0440\u0430\u043a\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439', 'HAKA'],
    },
  },
  aime: {
    gradient: 'linear-gradient(135deg, #581c87 0%, #7c3aed 30%, #a855f7 70%, #c084fc 100%)',
    title: {
      en: 'AIME \u2014 AI Master Bundle',
      et: 'AIME \u2014 AI Meistri Pakett',
      ru: 'AIME \u2014 \u041c\u0430\u0441\u0442\u0435\u0440-\u043f\u0430\u043a\u0435\u0442 AI',
    },
    subtitle: {
      en: 'Complete AI mastery: AIKI + AIVO combined',
      et: 'T\u00e4ielik AI meisterlikkus: AIKI + AIVO koos',
      ru: '\u041f\u043e\u043b\u043d\u043e\u0435 \u043c\u0430\u0441\u0442\u0435\u0440\u0441\u0442\u0432\u043e AI: AIKI + AIVO \u0432\u043c\u0435\u0441\u0442\u0435',
    },
    badges: {
      en: ['10 Weeks', '100h', 'Best Value', 'HAKA'],
      et: ['10 N\u00e4dalat', '100h', 'Parim Hind', 'HAKA'],
      ru: ['10 \u041d\u0435\u0434\u0435\u043b\u044c', '100\u0447', '\u041b\u0443\u0447\u0448\u0430\u044f \u0446\u0435\u043d\u0430', 'HAKA'],
    },
  },
};

export default async function OGImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const lang = (locale as LocaleKey) || 'en';
  const config = PROGRAM_OG[slug] || PROGRAM_OG.aiki;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: config.gradient,
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
          <span style={{ fontSize: '16px', fontWeight: 400, opacity: 0.6, marginLeft: '8px' }}>by Ettev\u00f5tluskeskus</span>
        </div>

        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          {config.title[lang]}
        </div>

        <div style={{ fontSize: '28px', fontWeight: 400, opacity: 0.85, lineHeight: 1.4, maxWidth: '900px' }}>
          {config.subtitle[lang]}
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: 'auto', flexWrap: 'wrap' }}>
          {config.badges[lang].map((badge) => (
            <div
              key={badge}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.2)',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
