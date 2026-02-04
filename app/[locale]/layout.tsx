import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { setLanguageTag, availableLanguageTags, type AvailableLanguageTag } from '@/paraglide/runtime';
import { LanguageProvider } from '@/context/LanguageContext';
import '../globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/lib/useToast';
import { ToastContainer } from '@/components/Toast';

import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Available locales for static generation
const locales = availableLanguageTags;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

// Metadata translations (loaded statically since ParaglideJS compiles to functions)
const metadataTranslations: Record<string, { title: string; description: string; keywords: string[] }> = {
  et: {
    title: 'AI Teadmiste Puu | Dendrix.ai',
    description: 'Terviklik interaktiivne raamistik AI kontseptide õpetamiseks ja mõistmiseks.',
    keywords: ['AI', 'tehisintellekt', 'masinõpe', 'õppimine', 'AI koolitus', 'Dendrix'],
  },
  en: {
    title: 'AI Knowledge Tree | Dendrix.ai',
    description: 'Comprehensive interactive framework for teaching and understanding AI concepts.',
    keywords: ['AI', 'artificial intelligence', 'machine learning', 'education', 'AI training', 'Dendrix'],
  },
  ru: {
    title: 'Дерево Знаний ИИ | Dendrix.ai',
    description: 'Комплексная интерактивная платформа для изучения и понимания концепций искусственного интеллекта.',
    keywords: ['ИИ', 'искусственный интеллект', 'машинное обучение', 'образование', 'обучение ИИ', 'Dendrix'],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataTranslations[locale as keyof typeof metadataTranslations] || metadataTranslations.en;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        et: `${BASE_URL}/et`,
        ru: `${BASE_URL}/ru`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'et' ? 'et_EE' : locale === 'ru' ? 'ru_RU' : 'en_US',
      url: `${BASE_URL}/${locale}`,
      title: meta.title,
      description: meta.description,
      siteName: 'Dendrix.ai',
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    metadataBase: new URL(BASE_URL),
  };
}

import { JourneyProvider } from '@/lib/contexts/JourneyContext';
import { StageSelector } from '@/components/StageSelector';
import { TransitionManager } from '@/components/TransitionManager';

// ... (keep existing imports)

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!availableLanguageTags.includes(locale as AvailableLanguageTag)) {
    notFound();
  }

  // Set the language tag for ParaglideJS (server-side)
  setLanguageTag(locale as AvailableLanguageTag);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <LanguageProvider initialLocale={locale as AvailableLanguageTag}>
          <ThemeProvider>
            <ToastProvider>
              <Suspense fallback={null}>
                <JourneyProvider>
                  {children}
                  <StageSelector />
                  <TransitionManager />
                  <ToastContainer />
                </JourneyProvider>
              </Suspense>
            </ToastProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
