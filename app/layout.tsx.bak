import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Teadmiste Puu | AI Knowledge Tree',
  description: 'Terviklik interaktiivne raamistik AI kontseptide õpetamiseks ja mõistmiseks. Comprehensive interactive framework for teaching and understanding AI concepts.',
  keywords: ['AI', 'machine learning', 'education', 'Estonian', 'tehisintellekt', 'õppimine'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="et">
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
