import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Teadmiste Puu | AI Knowledge Tree',
  description: 'Terviklik interaktiivne raamistik AI kontseptide õpetamiseks ja mõistmiseks',
};

export default function AITreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
