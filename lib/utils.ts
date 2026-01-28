import { TreeLevel } from './types';

export function getLevelColor(levelId: string): string {
  const colors: Record<string, string> = {
    leaves: '#8b5cf6',
    branches: '#3b82f6',
    trunk: '#92400e',
    roots: '#065f46',
  };
  return colors[levelId] || '#6b7280';
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

export function getComplexityColor(complexity: 1 | 2 | 3): string {
  const colors: Record<number, string> = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-red-100 text-red-800',
  };
  return colors[complexity] || 'bg-gray-100 text-gray-800';
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
