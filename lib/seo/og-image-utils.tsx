import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

type LocaleKey = 'en' | 'et' | 'ru';

interface StageOGConfig {
  emoji: string;
  gradient: string;
  title: { en: string; et: string; ru: string };
  subtitle: { en: string; et: string; ru: string };
  badges: { en: string[]; et: string[]; ru: string[] };
}

export const STAGE_OG_CONFIG: Record<string, StageOGConfig> = {
  dna: {
    emoji: '🧬',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 30%, #312e81 60%, #4338ca 100%)',
    title: {
      en: 'AI DNA — The Mechanism',
      et: 'AI DNA — Mehhanism',
      ru: 'ДНК ИИ — Механизм',
    },
    subtitle: {
      en: 'Watch text transform into predictions: T → V → A → P',
      et: 'Vaata teksti muutumist ennustusteks: T → V → A → P',
      ru: 'Смотрите превращение текста в предсказания: T → V → A → P',
    },
    badges: {
      en: ['Tokenization', 'Vectors', 'Attention', 'Prediction'],
      et: ['Tokeniseerimine', 'Vektorid', 'Tähelepanu', 'Ennustamine'],
      ru: ['Токенизация', 'Векторы', 'Внимание', 'Предсказание'],
    },
  },
  seed: {
    emoji: '🌱',
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 30%, #15803d 60%, #22c55e 100%)',
    title: {
      en: 'The Seed — Training',
      et: 'Seeme — Treenimine',
      ru: 'Семя — Обучение',
    },
    subtitle: {
      en: 'How raw data becomes AI intelligence',
      et: 'Kuidas toorandmed muutuvad AI intelligentsiks',
      ru: 'Как сырые данные становятся интеллектом ИИ',
    },
    badges: {
      en: ['Data', 'Neural Networks', 'Weights', 'Learning'],
      et: ['Andmed', 'Närvivõrgud', 'Kaalud', 'Õppimine'],
      ru: ['Данные', 'Нейросети', 'Веса', 'Обучение'],
    },
  },
  sprout: {
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #064e3b 0%, #047857 30%, #059669 60%, #10b981 100%)',
    title: {
      en: 'The Sprout — Capabilities',
      et: 'Võrse — Võimed',
      ru: 'Росток — Возможности',
    },
    subtitle: {
      en: 'What emerges from AI training',
      et: 'Mis tekib AI treenimisest',
      ru: 'Что возникает из обучения ИИ',
    },
    badges: {
      en: ['Reasoning', 'Context', 'Instructions', 'Creativity'],
      et: ['Arutlemine', 'Kontekst', 'Juhised', 'Loovus'],
      ru: ['Рассуждение', 'Контекст', 'Инструкции', 'Креативность'],
    },
  },
  sapling: {
    emoji: '🌲',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 30%, #3b82f6 60%, #60a5fa 100%)',
    title: {
      en: 'The Sapling — Practice',
      et: 'Istik — Harjutamine',
      ru: 'Саженец — Практика',
    },
    subtitle: {
      en: 'Hands-on prompting sandbox',
      et: 'Praktiline promptimise liivakast',
      ru: 'Практическая песочница промптинга',
    },
    badges: {
      en: ['Prompts', 'Temperature', 'Experiments', 'Skills'],
      et: ['Promptid', 'Temperatuur', 'Katsed', 'Oskused'],
      ru: ['Промпты', 'Температура', 'Эксперименты', 'Навыки'],
    },
  },
  fruits: {
    emoji: '🍎',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 30%, #ea580c 60%, #fb923c 100%)',
    title: {
      en: 'The Fruits — Applications',
      et: 'Viljad — Rakendused',
      ru: 'Плоды — Применение',
    },
    subtitle: {
      en: 'Real-world AI applications and use cases',
      et: 'Praktilised AI rakendused ja kasutusjuhud',
      ru: 'Практическое применение ИИ и кейсы',
    },
    badges: {
      en: ['RAG', 'Agents', 'Code Gen', 'Automation'],
      et: ['RAG', 'Agendid', 'Koodi Gen', 'Automatiseerimine'],
      ru: ['RAG', 'Агенты', 'Генерация кода', 'Автоматизация'],
    },
  },
  orchard: {
    emoji: '🏡',
    gradient: 'linear-gradient(135deg, #581c87 0%, #7c3aed 30%, #8b5cf6 60%, #a78bfa 100%)',
    title: {
      en: 'The Orchard — Careers',
      et: 'Viljapuuaed — Karjäär',
      ru: 'Сад — Карьера',
    },
    subtitle: {
      en: 'AI career paths and professional growth',
      et: 'AI karjääriteed ja professionaalne areng',
      ru: 'Карьерные пути в ИИ и профессиональный рост',
    },
    badges: {
      en: ['Prompt Eng', 'ML Eng', 'PM', 'Research'],
      et: ['Promptija', 'ML Ins', 'PM', 'Uuringud'],
      ru: ['Промпт-инж', 'ML Инж', 'PM', 'Исследования'],
    },
  },
  'tree-view': {
    emoji: '🗺️',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338ca 60%, #6366f1 100%)',
    title: {
      en: 'AI Knowledge Tree',
      et: 'AI Teadmiste Puu',
      ru: 'Дерево Знаний ИИ',
    },
    subtitle: {
      en: 'Complete concept map from tokens to careers',
      et: 'Täielik kontseptsioonide kaart tokenitest karjäärini',
      ru: 'Полная карта концепций от токенов до карьеры',
    },
    badges: {
      en: ['23+ Concepts', 'Interactive', 'Visual', 'Free'],
      et: ['23+ Kontseptsiooni', 'Interaktiivne', 'Visuaalne', 'Tasuta'],
      ru: ['23+ Концепций', 'Интерактивно', 'Визуально', 'Бесплатно'],
    },
  },
  learn: {
    emoji: '📚',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 30%, #0284c7 60%, #38bdf8 100%)',
    title: {
      en: 'AI Learning Paths',
      et: 'AI Õppeteed',
      ru: 'Пути обучения ИИ',
    },
    subtitle: {
      en: 'Structured courses from beginner to advanced',
      et: 'Struktureeritud kursused algajast edasijõudnuni',
      ru: 'Структурированные курсы от начинающего до продвинутого',
    },
    badges: {
      en: ['5 Paths', 'Progress Tracking', 'Self-Paced', 'Free'],
      et: ['5 Rada', 'Edenemise Jälgimine', 'Omas Tempos', 'Tasuta'],
      ru: ['5 Путей', 'Отслеживание', 'В своём темпе', 'Бесплатно'],
    },
  },
};

export function generateStageOGImage(stage: string, locale: string) {
  const config = STAGE_OG_CONFIG[stage];
  if (!config) return null;

  const lang = (locale as LocaleKey) || 'en';

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
        {/* Logo area */}
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
            {config.emoji}
          </div>
          <span style={{ fontSize: '28px', fontWeight: 600, opacity: 0.9 }}>dendrix.ai</span>
        </div>

        {/* Title */}
        <div style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px' }}>
          {config.title[lang]}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 400,
            opacity: 0.85,
            lineHeight: 1.4,
            maxWidth: '900px',
          }}
        >
          {config.subtitle[lang]}
        </div>

        {/* Bottom badges */}
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
    { ...OG_SIZE }
  );
}
