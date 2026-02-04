import { generateStageOGImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og-image-utils';

export const runtime = 'edge';
export const alt = 'The Sapling - Practice Prompting AI | Dendrix.ai';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateStageOGImage('sapling', locale);
}
