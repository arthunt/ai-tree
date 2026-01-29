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

export function getComplexityColor(complexity: 1 | 2 | 3): string {
  const colors: Record<number, string> = {
    1: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    2: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    3: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  };
  return colors[complexity] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
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
