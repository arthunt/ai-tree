import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/lib/useToast';
import { ToastContainer } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as { title: string; description: string };

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: locale === 'et'
      ? ['AI', 'tehisintellekt', 'masinõpe', 'õppimine', 'AI koolitus', 'Dendrix']
      : ['AI', 'artificial intelligence', 'machine learning', 'education', 'AI training', 'Dendrix'],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        et: `${BASE_URL}/et`,
        en: `${BASE_URL}/en`,
        'x-default': `${BASE_URL}/et`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'et' ? 'et_EE' : 'en_US',
      url: `${BASE_URL}/${locale}`,
      title: metadata.title,
      description: metadata.description,
      siteName: 'Dendrix.ai',
      images: [
        {
          url: `${BASE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    metadataBase: new URL(BASE_URL),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ToastProvider>
              {children}
              <ToastContainer />
            </ToastProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
