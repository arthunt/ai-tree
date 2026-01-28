import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Teadmiste Puu - Puu Vaade | AI Knowledge Tree',
  description: 'Interaktiivne puu visualisatsioon kõigist AI kontseptsioonidest ühes vaates',
};

export default function TreeViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
