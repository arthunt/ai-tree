'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Word {
  text: string;
  vector: number[];
}

interface SimilarityResult {
  word1: string;
  word2: string;
  similarity: number;
}

interface VisualizationPoint {
  word: string;
  x: number;
  y: number;
}

// Pre-computed embeddings for common words (simplified 10D vectors for visualization)
// In reality, these would be 1536-dimensional vectors from OpenAI, etc.
// These vectors are optimized to produce cosine similarities matching human intuition:
//   Same category (cat/dog): ~85%  |  Unrelated (cat/car): ~8%
//   Opposites (happy/sad): ~39%    |  Related (crown/king): ~79%
const WORD_EMBEDDINGS: Record<string, number[]> = {
  // Animals
  'cat':        [0.93, 0.91, 0.10, 0.04, 0.76, 0.02, 0.64, 0.04, 0.00, 0.05],
  'dog':        [0.97, 0.99, 0.21, 0.27, 0.51, 0.62, 0.08, 0.04, 0.05, 0.17],
  'kitten':     [0.89, 0.94, 0.46, 0.62, 0.93, 0.53, 0.96, 0.34, 0.19, 0.53],
  'puppy':      [0.85, 0.84, 0.00, 0.15, 0.10, 0.44, 0.35, 0.30, 0.25, 0.41],
  'mouse':      [0.58, 0.30, 0.04, 0.01, 0.21, 0.75, 0.67, 0.02, 0.38, 0.79],
  'bird':       [0.67, 0.31, 0.40, 0.06, 0.38, 0.15, 0.01, 0.03, 0.00, 0.85],
  'fish':       [0.06, 0.97, 0.01, 0.32, 0.02, 0.17, 0.01, 0.06, 0.00, 0.01],
  'lion':       [0.10, 0.99, 0.32, 0.82, 0.63, 0.63, 0.34, 0.01, 0.01, 0.33],
  'tiger':      [0.29, 0.96, 0.00, 0.90, 0.75, 0.98, 0.03, 0.02, 0.03, 0.00],

  // Vehicles
  'car':        [0.01, 0.01, 0.39, 0.85, 0.01, 0.03, 0.04, 0.86, 0.03, 0.00],
  'truck':      [0.02, 0.03, 0.63, 0.88, 0.07, 0.01, 0.00, 0.26, 0.00, 0.02],
  'bus':        [0.12, 0.15, 0.74, 0.81, 0.04, 0.09, 0.49, 0.67, 0.12, 0.03],
  'bicycle':    [0.52, 0.16, 0.97, 0.71, 0.49, 0.34, 0.45, 0.66, 0.49, 0.39],
  'motorcycle': [0.65, 0.02, 0.80, 0.83, 0.05, 0.30, 0.06, 0.66, 0.28, 0.07],
  'airplane':   [0.34, 0.06, 0.04, 0.96, 0.21, 0.01, 0.83, 0.64, 0.04, 0.01],
  'boat':       [0.08, 0.03, 0.41, 0.78, 0.40, 0.40, 0.73, 0.70, 0.72, 0.17],

  // Emotions
  'happy':      [0.08, 0.30, 0.02, 0.02, 0.92, 0.63, 0.77, 0.01, 0.70, 0.73],
  'sad':        [0.65, 0.25, 0.89, 0.08, 0.74, 0.09, 0.02, 0.01, 0.00, 0.01],
  'angry':      [0.09, 0.03, 0.93, 0.98, 0.82, 0.06, 0.97, 0.11, 0.07, 0.04],
  'joy':        [0.54, 0.30, 0.07, 0.13, 0.68, 0.98, 0.68, 0.15, 0.53, 0.66],
  'excited':    [0.58, 0.42, 0.42, 0.30, 0.64, 0.58, 0.53, 0.03, 0.47, 0.74],
  'calm':       [0.81, 0.92, 0.27, 0.78, 0.09, 0.48, 0.74, 0.46, 0.94, 0.37],
  'fearful':    [0.37, 0.17, 0.78, 0.63, 0.57, 0.15, 0.48, 0.77, 0.42, 0.10],

  // Royalty
  'king':       [0.00, 0.01, 0.00, 0.04, 0.01, 0.00, 0.96, 0.35, 0.02, 0.03],
  'queen':      [0.17, 0.12, 0.26, 0.00, 0.00, 0.07, 0.98, 0.03, 0.08, 0.00],
  'prince':     [0.72, 0.62, 0.49, 0.14, 0.22, 0.69, 0.56, 0.67, 0.75, 0.70],
  'princess':   [0.86, 0.68, 0.21, 0.30, 0.73, 0.56, 0.27, 0.09, 0.92, 0.59],
  'crown':      [0.02, 0.00, 0.24, 0.08, 0.09, 0.08, 0.93, 0.50, 0.64, 0.51],
  'throne':     [0.00, 0.10, 0.00, 0.00, 0.07, 0.00, 0.97, 0.34, 0.85, 0.02],

  // Food
  'apple':      [0.00, 0.94, 0.17, 0.01, 0.05, 0.93, 0.25, 0.39, 0.19, 0.65],
  'banana':     [0.01, 0.80, 0.00, 0.01, 0.00, 0.41, 0.01, 0.13, 0.33, 0.30],
  'orange':     [0.01, 0.86, 0.55, 0.01, 0.32, 0.96, 0.40, 0.51, 0.68, 0.97],
  'pizza':      [0.01, 0.08, 0.21, 0.07, 0.02, 0.94, 0.04, 0.03, 0.99, 0.96],
  'burger':     [0.06, 0.04, 0.00, 0.18, 0.02, 0.58, 0.22, 0.23, 0.49, 0.95],

  // Weather
  'sunny':      [0.02, 0.77, 0.58, 0.83, 0.05, 0.14, 0.38, 0.89, 0.09, 0.32],
  'rainy':      [0.61, 0.52, 0.30, 0.06, 0.44, 0.08, 0.12, 0.24, 0.73, 0.60],
  'cloudy':     [0.09, 0.15, 0.22, 0.40, 0.85, 0.09, 0.57, 0.64, 0.68, 0.71],
  'snowy':      [0.87, 0.08, 0.26, 0.07, 0.96, 0.85, 0.12, 0.31, 0.33, 0.93],

  // Technology
  'computer':   [0.00, 0.01, 0.04, 0.04, 0.00, 0.01, 0.08, 0.48, 0.82, 0.01],
  'phone':      [0.07, 0.93, 0.86, 0.00, 0.03, 0.76, 0.52, 0.24, 0.10, 0.01],
  'laptop':     [0.05, 0.02, 0.37, 0.01, 0.00, 0.04, 0.06, 0.40, 0.86, 0.31],
  'tablet':     [0.63, 0.94, 0.84, 0.08, 0.55, 0.78, 0.68, 0.56, 0.25, 0.27],

  // Nature
  'tree':       [0.89, 0.01, 0.00, 0.80, 0.90, 0.03, 0.04, 0.02, 0.31, 0.86],
  'flower':     [0.38, 0.21, 0.02, 0.04, 0.86, 0.14, 0.34, 0.02, 0.66, 0.92],
  'grass':      [0.01, 0.26, 0.00, 0.76, 0.57, 0.21, 0.00, 0.34, 0.40, 0.84],
  'mountain':   [0.96, 0.16, 0.84, 0.02, 0.46, 0.18, 0.37, 0.21, 0.96, 0.85],

  // Common words
  'good':       [0.27, 0.94, 0.45, 0.20, 0.21, 0.50, 0.59, 0.14, 0.05, 0.10],
  'bad':        [0.71, 0.04, 0.10, 0.74, 0.73, 0.06, 0.11, 0.50, 0.84, 0.37],
  'big':        [0.79, 0.56, 0.87, 0.79, 0.77, 0.01, 0.12, 0.00, 0.74, 0.47],
  'small':      [0.25, 0.37, 0.06, 0.12, 0.90, 0.88, 0.32, 0.27, 0.01, 0.84],
  'hot':        [0.80, 0.11, 0.05, 0.06, 0.72, 0.51, 0.10, 0.36, 0.34, 0.35],
  'cold':       [0.04, 0.08, 0.16, 0.93, 0.06, 0.26, 0.92, 0.29, 0.81, 0.00],
  'love':       [0.11, 0.19, 0.93, 0.79, 0.07, 0.96, 0.51, 0.19, 0.98, 0.34],
  'hate':       [0.01, 0.65, 0.04, 0.08, 0.40, 0.04, 0.35, 0.05, 0.08, 0.47],
};

// Calculate cosine similarity between two vectors
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}

// Simple PCA to reduce dimensions to 2D for visualization
function reduce2D(vectors: number[][]): [number, number][] {
  if (vectors.length === 0) return [];

  // Center the data
  const means = new Array(vectors[0].length).fill(0);
  vectors.forEach(vec => {
    vec.forEach((val, i) => {
      means[i] += val / vectors.length;
    });
  });

  const centered = vectors.map(vec =>
    vec.map((val, i) => val - means[i])
  );

  // Use first two principal components (simplified)
  // In practice, we'd compute eigenvectors, but for demo we'll use projections
  return centered.map(vec => {
    const x = vec.slice(0, 5).reduce((sum, val) => sum + val, 0) / 5;
    const y = vec.slice(5, 10).reduce((sum, val) => sum + val, 0) / 5;
    return [x, y];
  });
}

const EXAMPLE_WORDS = [
  ['king', 'queen', 'prince'],
  ['cat', 'dog', 'car'],
  ['happy', 'sad', 'angry'],
  ['apple', 'banana', 'pizza'],
  ['computer', 'phone', 'tree'],
];

export function VectorDemo() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [similarities, setSimilarities] = useState<SimilarityResult[]>([]);
  const [visualPoints, setVisualPoints] = useState<VisualizationPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = useTranslations('vectorDemo');

  const exampleSets = useMemo(() => EXAMPLE_WORDS.map((words, i) => ({
    label: t(`exampleLabel${i + 1}`),
    words: t(`exampleWords${i + 1}`).split(', '),
  })), [t]);

  const availableWords = useMemo(() => Object.keys(WORD_EMBEDDINGS).sort(), []);

  const calculateSimilarities = () => {
    const words = [word1.toLowerCase().trim(), word2.toLowerCase().trim(), word3.toLowerCase().trim()].filter(w => w);

    if (words.length < 2) {
      return;
    }

    const results: SimilarityResult[] = [];
    const vectors: number[][] = [];
    const validWords: string[] = [];

    // Get vectors for valid words
    words.forEach(word => {
      if (WORD_EMBEDDINGS[word]) {
        vectors.push(WORD_EMBEDDINGS[word]);
        validWords.push(word);
      }
    });

    // Calculate pairwise similarities
    for (let i = 0; i < validWords.length; i++) {
      for (let j = i + 1; j < validWords.length; j++) {
        const similarity = cosineSimilarity(vectors[i], vectors[j]);
        results.push({
          word1: validWords[i],
          word2: validWords[j],
          similarity: similarity,
        });
      }
    }

    setSimilarities(results);

    // Prepare visualization
    if (validWords.length > 0) {
      const reduced = reduce2D(vectors);
      const points: VisualizationPoint[] = validWords.map((word, i) => ({
        word,
        x: reduced[i][0],
        y: reduced[i][1],
      }));
      setVisualPoints(points);
    } else {
      setVisualPoints([]);
    }
  };

  const loadExample = (example: { label: string; words: string[] }) => {
    setWord1(example.words[0] || '');
    setWord2(example.words[1] || '');
    setWord3(example.words[2] || '');
    setSimilarities([]);
    setVisualPoints([]);
  };

  const reset = () => {
    setWord1('');
    setWord2('');
    setWord3('');
    setSimilarities([]);
    setVisualPoints([]);
  };

  const getSimilarityColor = (similarity: number): string => {
    if (similarity > 0.7) return 'text-green-600 dark:text-green-400';
    if (similarity > 0.4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSimilarityLabel = (similarity: number): string => {
    if (similarity > 0.7) return t('similarityHigh');
    if (similarity > 0.4) return t('similarityMedium');
    return t('similarityLow');
  };

  // Draw visualization on canvas
  useEffect(() => {
    if (!canvasRef.current || visualPoints.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;
    const padding = 50;

    // Detect dark mode
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find min/max for scaling
    const xValues = visualPoints.map(p => p.x);
    const yValues = visualPoints.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    // Scale function
    const scaleX = (x: number) => padding + ((x - minX) / xRange) * (width - 2 * padding);
    const scaleY = (y: number) => padding + ((maxY - y) / yRange) * (height - 2 * padding);

    // Draw connection lines with similarity labels
    for (let i = 0; i < visualPoints.length; i++) {
      for (let j = i + 1; j < visualPoints.length; j++) {
        const x1 = scaleX(visualPoints[i].x);
        const y1 = scaleY(visualPoints[i].y);
        const x2 = scaleX(visualPoints[j].x);
        const y2 = scaleY(visualPoints[j].y);

        // Find similarity for this pair
        const sim = similarities.find(
          s => (s.word1 === visualPoints[i].word && s.word2 === visualPoints[j].word) ||
               (s.word1 === visualPoints[j].word && s.word2 === visualPoints[i].word)
        );
        const simVal = sim ? sim.similarity : 0;

        // Line color based on similarity
        const lineColor = simVal > 0.7
          ? (isDark ? 'rgba(74, 222, 128, 0.6)' : 'rgba(34, 197, 94, 0.5)')
          : simVal > 0.4
          ? (isDark ? 'rgba(250, 204, 21, 0.5)' : 'rgba(234, 179, 8, 0.4)')
          : (isDark ? 'rgba(248, 113, 113, 0.4)' : 'rgba(239, 68, 68, 0.3)');

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = simVal > 0.7 ? 3 : 2;
        ctx.setLineDash(simVal < 0.4 ? [6, 4] : []);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Similarity label on midpoint
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const label = `${Math.round(simVal * 100)}%`;

        ctx.font = '600 11px system-ui';
        const textMetrics = ctx.measureText(label);
        const labelPadX = 4;
        const labelPadY = 2;

        // Background pill for label
        ctx.fillStyle = isDark ? 'rgba(30, 30, 40, 0.85)' : 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.roundRect(
          midX - textMetrics.width / 2 - labelPadX,
          midY - 7 - labelPadY,
          textMetrics.width + labelPadX * 2,
          14 + labelPadY * 2,
          6
        );
        ctx.fill();

        ctx.fillStyle = simVal > 0.7
          ? (isDark ? '#4ade80' : '#16a34a')
          : simVal > 0.4
          ? (isDark ? '#facc15' : '#ca8a04')
          : (isDark ? '#f87171' : '#dc2626');
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, midX, midY);
      }
    }

    // Draw points with glow
    visualPoints.forEach(point => {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      const isHovered = hoveredPoint === point.word;
      const radius = isHovered ? 14 : 10;

      // Glow effect
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, 2 * Math.PI);
        ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.15)';
        ctx.fill();
      }

      // Circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = isHovered ? '#3b82f6' : '#6366f1';
      ctx.fill();
      ctx.strokeStyle = isHovered ? '#1d4ed8' : '#4f46e5';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // White inner dot
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();

      // Label with background
      ctx.font = isHovered ? 'bold 13px system-ui' : '12px system-ui';
      const labelText = point.word;
      const tm = ctx.measureText(labelText);
      const lx = x;
      const ly = y - radius - 10;

      ctx.fillStyle = isDark ? 'rgba(30, 30, 40, 0.85)' : 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.roundRect(lx - tm.width / 2 - 4, ly - 8, tm.width + 8, 16, 4);
      ctx.fill();

      ctx.fillStyle = isDark ? '#e5e7eb' : '#1f2937';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText, lx, ly);
    });
  }, [visualPoints, hoveredPoint]);

  // Handle canvas hover
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (visualPoints.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;
    const padding = 60;

    const xValues = visualPoints.map(p => p.x);
    const yValues = visualPoints.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    const scaleX = (x: number) => padding + ((x - minX) / xRange) * (width - 2 * padding);
    const scaleY = (y: number) => padding + ((maxY - y) / yRange) * (height - 2 * padding);

    // Check if mouse is near any point
    let foundHover = false;
    for (const point of visualPoints) {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

      if (distance < 15) {
        setHoveredPoint(point.word);
        foundHover = true;
        break;
      }
    }

    if (!foundHover) {
      setHoveredPoint(null);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredPoint(null);
  };

  // Handle canvas touch for mobile devices
  const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (visualPoints.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    if (!touch) return;

    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;
    const padding = 60;

    const xValues = visualPoints.map(p => p.x);
    const yValues = visualPoints.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const xRange = maxX - minX || 1;
    const yRange = maxY - minY || 1;

    const scaleX = (x: number) => padding + ((x - minX) / xRange) * (width - 2 * padding);
    const scaleY = (y: number) => padding + ((maxY - y) / yRange) * (height - 2 * padding);

    // Check if touch is near any point
    let foundHover = false;
    for (const point of visualPoints) {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      const distance = Math.sqrt((touchX - x) ** 2 + (touchY - y) ** 2);

      // Use larger touch target (25px) for better mobile UX
      if (distance < 25) {
        setHoveredPoint(point.word);
        foundHover = true;
        break;
      }
    }

    if (!foundHover) {
      setHoveredPoint(null);
    }
  };

  const handleCanvasTouchEnd = () => {
    // Keep the hovered point visible briefly on touch end for better UX
    setTimeout(() => {
      setHoveredPoint(null);
    }, 1500);
  };

  const hasValidWords = useMemo(() => {
    const words = [word1, word2, word3].filter(w => w.trim());
    return words.length >= 2 && words.every(w => WORD_EMBEDDINGS[w.toLowerCase().trim()]);
  }, [word1, word2, word3]);

  return (
    <div className="w-full">
      <div className="space-y-4 p-4">
        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h3>
          </div>
          <div className="flex gap-1">
            <button
              onClick={reset}
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
              aria-label={t('reset')}
              type="button"
            >
              <RotateCcw className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
              aria-label={showInfo ? t('hideInfo') : t('showInfo')}
              aria-expanded={showInfo}
              type="button"
            >
              <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <p className="text-xs text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<strong>${t('infoTitle')}</strong> ${t('infoText')}` }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Fields - stacked on mobile, row on wider */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="word-1" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('word')} 1
              </label>
              <input
                id="word-1"
                type="text"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-1"
                className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
              />
              <datalist id="word-suggestions-1">
                {availableWords.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="word-2" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('word')} 2
              </label>
              <input
                id="word-2"
                type="text"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-2"
                className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
              />
              <datalist id="word-suggestions-2">
                {availableWords.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="word-3" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('word')} 3 {t('optional')}
              </label>
              <input
                id="word-3"
                type="text"
                value={word3}
                onChange={(e) => setWord3(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-3"
                className="w-full px-3 py-2.5 text-sm rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
              />
              <datalist id="word-suggestions-3">
                {availableWords.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </div>
          </div>

          <button
            onClick={calculateSimilarities}
            disabled={!hasValidWords}
            className="w-full px-4 py-2.5 min-h-[44px] text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {t('calculate')}
          </button>
        </div>

        {/* Results Display */}
        {similarities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('similarityScores')}
            </h4>
            <div className="space-y-2">
              {similarities.map((result, index) => (
                <motion.div
                  key={`${result.word1}-${result.word2}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.word1}
                    </span>
                    <span className="text-gray-400">↔</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.word2}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.similarity * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`h-full ${
                          result.similarity > 0.7
                            ? 'bg-green-500'
                            : result.similarity > 0.4
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className="text-right min-w-[56px]">
                      <div className={`text-base font-bold ${getSimilarityColor(result.similarity)}`}>
                        {Math.round(result.similarity * 100)}%
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">
                        {getSimilarityLabel(result.similarity)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Visualization */}
        {visualPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t('visualization')}
            </h4>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200 dark:border-purple-800">
              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                onTouchStart={handleCanvasTouch}
                onTouchMove={handleCanvasTouch}
                onTouchEnd={handleCanvasTouchEnd}
                className="w-full h-[220px] sm:h-[280px] cursor-pointer touch-none"
                aria-label={t('visualizationAriaLabel')}
              />
              <p className="text-[10px] text-gray-600 dark:text-gray-400 text-center mt-2">
                {t('visualizationHint')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Example Sets */}
        {similarities.length === 0 && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {t('tryExamples')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exampleSets.map((example) => (
                <button
                  key={example.label}
                  onClick={() => loadExample(example)}
                  className="px-2.5 py-1.5 text-xs text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Educational Note */}
        <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
