'use client';

interface StructuredDataProps {
  locale: string;
  conceptCount: number;
}

export function CourseStructuredData({ locale, conceptCount }: StructuredDataProps) {
  const isEt = locale === 'et';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: isEt ? 'AI Teadmiste Puu' : 'AI Knowledge Tree',
    description: isEt
      ? 'Terviklik interaktiivne raamistik AI kontseptide õpetamiseks ja mõistmiseks.'
      : 'Comprehensive interactive framework for teaching and understanding AI concepts.',
    provider: {
      '@type': 'Organization',
      name: 'Dendrix.ai',
      url: baseUrl,
    },
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    isAccessibleForFree: true,
    numberOfCredits: conceptCount,
    educationalLevel: 'Beginner to Advanced',
    teaches: [
      'Tokens', 'Vectors', 'Embeddings', 'Attention Mechanism',
      'Transformers', 'Context Windows', 'RAG', 'AI Agents',
      'Prompt Engineering', 'Fine-tuning', 'AI Security',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      duration: 'PT2H',
      inLanguage: [locale],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ConceptStructuredDataProps {
  locale: string;
  conceptId: string;
  title: string;
  description: string;
  level: string;
  complexity: number;
}

export function ConceptStructuredData({
  locale,
  conceptId,
  title,
  description,
  level,
  complexity,
}: ConceptStructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://dendrix.ai';
  const levelMap: Record<string, string> = {
    roots: 'Beginner',
    trunk: 'Intermediate',
    branches: 'Advanced',
    leaves: 'Expert',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: title,
    description,
    url: `${baseUrl}/${locale}/concept/${conceptId}`,
    inLanguage: locale,
    learningResourceType: 'Interactive Tutorial',
    educationalLevel: levelMap[level] || 'Beginner',
    interactivityType: 'active',
    isAccessibleForFree: true,
    author: {
      '@type': 'Organization',
      name: 'Dendrix.ai',
      url: baseUrl,
    },
    isPartOf: {
      '@type': 'Course',
      name: locale === 'et' ? 'AI Teadmiste Puu' : 'AI Knowledge Tree',
      url: `${baseUrl}/${locale}`,
    },
    educationalAlignment: {
      '@type': 'AlignmentObject',
      alignmentType: 'complexity',
      targetName: `Level ${complexity}/3`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
