import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { setLanguageTag, availableLanguageTags, type AvailableLanguageTag } from '@/paraglide/runtime';
import { LanguageProvider } from '@/context/LanguageContext';
import '../globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/lib/useToast';
import { ToastContainer } from '@/components/Toast';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

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
    description: 'Terviklik interaktiivne raamistik AI kontseptide õpetamiseks ja mõistmiseks. Ettevõtluskeskus OÜ õppeplatvorm.',
    keywords: ['AI', 'tehisintellekt', 'masinõpe', 'õppimine', 'AI koolitus', 'tehisintellekt koolitus', 'AI kursus ettevõtjatele', 'AI ümberõpe', 'AI õppeplatvorm', 'Dendrix', 'Ettevõtluskeskus'],
  },
  en: {
    title: 'AI Knowledge Tree | Dendrix.ai',
    description: 'Comprehensive interactive framework for teaching and understanding AI concepts. A learning platform by Ettevõtluskeskus OÜ.',
    keywords: ['AI', 'artificial intelligence', 'machine learning', 'education', 'AI training', 'AI training Estonia', 'AI courses for managers', 'AI reskilling programs', 'learn AI basics', 'Dendrix', 'Ettevõtluskeskus'],
  },
  ru: {
    title: 'Дерево Знаний ИИ | Dendrix.ai',
    description: 'Комплексная интерактивная платформа для изучения и понимания концепций ИИ. Учебная платформа Ettevõtluskeskus OÜ.',
    keywords: ['ИИ', 'искусственный интеллект', 'машинное обучение', 'образование', 'обучение ИИ', 'AI курсы Эстония', 'ИИ курсы', 'обучение ИИ для руководителей', 'курсы искусственного интеллекта Таллинн', 'Dendrix', 'Ettevõtluskeskus'],
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
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
      verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
    }),
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

  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  return (
    <html lang={locale}>
      <head>
        {ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`}
            </Script>
          </>
        )}
      </head>
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
        <Analytics />
      </body>
    </html>
  );
}
