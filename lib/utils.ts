import { TreeLevel } from './types';

export function getLevelColor(levelId: string): string {
  const colors: Record<string, string> = {
    leaves: '#7c3aed',
    branches: '#2563eb',
    trunk: '#78350f',
    roots: '#047857',
  };
  return colors[levelId] || '#4b5563';
}

export function getLevelGradient(levelId: string): string {
  const gradients: Record<string, string> = {
    leaves: 'from-purple-500/10 to-violet-500/5',
    branches: 'from-blue-500/10 to-cyan-500/5',
    trunk: 'from-amber-800/10 to-yellow-700/5',
    roots: 'from-emerald-800/10 to-green-700/5',
  };
  return gradients[levelId] || 'from-gray-500/10 to-gray-400/5';
}

export function getComplexityLabel(complexity: 1 | 2 | 3): string {
  const labels: Record<number, string> = {
    1: 'Algaja',
    2: 'Keskmine',
    3: 'Keeruline',
  };
  return labels[complexity] || 'Keskmine';
}

// Note: This function returns hardcoded Estonian labels for backwards compatibility.
// For proper i18n, components should use the 'complexity' namespace from useTranslations
// Example: t('complexity.beginner'), t('complexity.intermediate'), t('complexity.advanced')

export function getComplexityColor(complexity: 1 | 2 | 3): string {
  const colors: Record<number, string> = {
    1: 'bg-green-100 text-green-900',
    2: 'bg-yellow-100 text-yellow-900',
    3: 'bg-red-100 text-red-900',
  };
  return colors[complexity] || 'bg-gray-100 text-gray-900';
}

export function getLevelIcon(levelId: string): string {
  const icons: Record<string, string> = {
    leaves: '🍃',
    branches: '🌿',
    trunk: '🌲',
    roots: '🌱',
  };
  return icons[levelId] || '📍';
}

export function getReadingTime(concept: { metaphor: string; explanation: string; codeExample?: unknown }): number {
  const wordsPerMinute = 200;
  const text = `${concept.metaphor} ${concept.explanation}`;
  const wordCount = text.split(/\s+/).length;
  const baseTime = Math.ceil(wordCount / wordsPerMinute);
  const codeBonus = concept.codeExample ? 2 : 0;
  return Math.max(1, baseTime + codeBonus);
}
