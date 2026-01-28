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

// Pre-computed embeddings for common words (simplified 2D vectors for visualization)
// In reality, these would be 1536-dimensional vectors from OpenAI, etc.
// For demo purposes, we use 10D vectors that we'll reduce to 2D for visualization
const WORD_EMBEDDINGS: Record<string, number[]> = {
  // Animals
  'cat': [0.8, 0.9, 0.7, 0.6, 0.3, 0.2, 0.1, 0.4, 0.5, 0.6],
  'dog': [0.85, 0.88, 0.72, 0.58, 0.32, 0.25, 0.15, 0.42, 0.48, 0.62],
  'kitten': [0.78, 0.92, 0.68, 0.62, 0.28, 0.18, 0.12, 0.38, 0.52, 0.58],
  'puppy': [0.83, 0.90, 0.70, 0.56, 0.30, 0.23, 0.13, 0.40, 0.50, 0.60],
  'mouse': [0.75, 0.85, 0.65, 0.55, 0.25, 0.20, 0.18, 0.35, 0.45, 0.55],
  'bird': [0.70, 0.80, 0.60, 0.50, 0.20, 0.15, 0.25, 0.30, 0.40, 0.50],
  'fish': [0.65, 0.75, 0.55, 0.45, 0.15, 0.10, 0.30, 0.25, 0.35, 0.45],
  'lion': [0.82, 0.86, 0.74, 0.60, 0.35, 0.28, 0.20, 0.45, 0.55, 0.65],
  'tiger': [0.81, 0.87, 0.73, 0.59, 0.34, 0.27, 0.19, 0.44, 0.54, 0.64],

  // Vehicles
  'car': [0.3, 0.2, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2],
  'truck': [0.32, 0.22, 0.88, 0.82, 0.68, 0.62, 0.48, 0.38, 0.32, 0.22],
  'bus': [0.28, 0.18, 0.92, 0.78, 0.72, 0.58, 0.52, 0.42, 0.28, 0.18],
  'bicycle': [0.25, 0.15, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15],
  'motorcycle': [0.33, 0.23, 0.87, 0.83, 0.69, 0.63, 0.49, 0.39, 0.33, 0.23],
  'airplane': [0.20, 0.10, 0.95, 0.70, 0.75, 0.50, 0.60, 0.30, 0.20, 0.10],
  'boat': [0.18, 0.08, 0.88, 0.68, 0.73, 0.48, 0.58, 0.28, 0.18, 0.08],

  // Emotions
  'happy': [0.5, 0.4, 0.3, 0.2, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
  'sad': [0.5, 0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
  'angry': [0.6, 0.5, 0.4, 0.3, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
  'joy': [0.52, 0.42, 0.32, 0.22, 0.88, 0.78, 0.68, 0.58, 0.48, 0.38],
  'excited': [0.55, 0.45, 0.35, 0.25, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35],
  'calm': [0.48, 0.38, 0.28, 0.18, 0.60, 0.70, 0.65, 0.55, 0.50, 0.45],
  'fearful': [0.58, 0.48, 0.38, 0.28, 0.25, 0.35, 0.45, 0.55, 0.60, 0.65],

  // Royalty
  'king': [0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.9, 0.8, 0.7, 0.6],
  'queen': [0.68, 0.58, 0.48, 0.38, 0.52, 0.62, 0.88, 0.78, 0.68, 0.58],
  'prince': [0.72, 0.62, 0.52, 0.42, 0.48, 0.58, 0.85, 0.82, 0.72, 0.62],
  'princess': [0.66, 0.56, 0.46, 0.36, 0.54, 0.64, 0.86, 0.76, 0.66, 0.56],
  'crown': [0.65, 0.55, 0.45, 0.35, 0.50, 0.60, 0.92, 0.75, 0.65, 0.55],
  'throne': [0.69, 0.59, 0.49, 0.39, 0.49, 0.59, 0.90, 0.79, 0.69, 0.59],

  // Food
  'apple': [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.2, 0.3, 0.4, 0.5],
  'banana': [0.42, 0.52, 0.58, 0.68, 0.78, 0.88, 0.22, 0.32, 0.42, 0.52],
  'orange': [0.38, 0.48, 0.62, 0.72, 0.82, 0.92, 0.18, 0.28, 0.38, 0.48],
  'pizza': [0.45, 0.55, 0.55, 0.65, 0.75, 0.85, 0.25, 0.35, 0.45, 0.55],
  'burger': [0.43, 0.53, 0.57, 0.67, 0.77, 0.87, 0.23, 0.33, 0.43, 0.53],

  // Weather
  'sunny': [0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 0.25, 0.35, 0.45],
  'rainy': [0.32, 0.42, 0.52, 0.62, 0.72, 0.82, 0.15, 0.22, 0.32, 0.42],
  'cloudy': [0.33, 0.43, 0.53, 0.63, 0.73, 0.83, 0.55, 0.23, 0.33, 0.43],
  'snowy': [0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.20, 0.20, 0.30, 0.40],

  // Technology
  'computer': [0.2, 0.3, 0.8, 0.9, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  'phone': [0.22, 0.32, 0.78, 0.88, 0.42, 0.52, 0.58, 0.68, 0.78, 0.88],
  'laptop': [0.21, 0.31, 0.79, 0.89, 0.41, 0.51, 0.59, 0.69, 0.79, 0.89],
  'tablet': [0.23, 0.33, 0.77, 0.87, 0.43, 0.53, 0.57, 0.67, 0.77, 0.87],

  // Nature
  'tree': [0.6, 0.7, 0.4, 0.3, 0.5, 0.4, 0.3, 0.8, 0.9, 0.7],
  'flower': [0.58, 0.68, 0.42, 0.32, 0.52, 0.42, 0.32, 0.78, 0.88, 0.68],
  'grass': [0.62, 0.72, 0.38, 0.28, 0.48, 0.38, 0.28, 0.82, 0.92, 0.72],
  'mountain': [0.65, 0.75, 0.35, 0.25, 0.45, 0.35, 0.25, 0.85, 0.95, 0.75],

  // Common words
  'good': [0.5, 0.5, 0.5, 0.5, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3],
  'bad': [0.5, 0.5, 0.5, 0.5, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
  'big': [0.7, 0.7, 0.7, 0.7, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  'small': [0.3, 0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  'hot': [0.6, 0.5, 0.4, 0.3, 0.8, 0.7, 0.9, 0.6, 0.5, 0.4],
  'cold': [0.4, 0.3, 0.2, 0.1, 0.2, 0.3, 0.1, 0.4, 0.5, 0.6],
  'love': [0.55, 0.45, 0.35, 0.25, 0.90, 0.80, 0.70, 0.60, 0.50, 0.40],
  'hate': [0.55, 0.45, 0.35, 0.25, 0.15, 0.25, 0.35, 0.60, 0.70, 0.75],
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

const EXAMPLE_SETS = [
  { label: 'king, queen, prince', words: ['king', 'queen', 'prince'] },
  { label: 'cat, dog, car', words: ['cat', 'dog', 'car'] },
  { label: 'happy, sad, angry', words: ['happy', 'sad', 'angry'] },
  { label: 'apple, banana, pizza', words: ['apple', 'banana', 'pizza'] },
  { label: 'computer, phone, tree', words: ['computer', 'phone', 'tree'] },
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

  const loadExample = (example: typeof EXAMPLE_SETS[0]) => {
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
    const padding = 60;

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

    // Draw connection lines
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for (let i = 0; i < visualPoints.length; i++) {
      for (let j = i + 1; j < visualPoints.length; j++) {
        ctx.beginPath();
        ctx.moveTo(scaleX(visualPoints[i].x), scaleY(visualPoints[i].y));
        ctx.lineTo(scaleX(visualPoints[j].x), scaleY(visualPoints[j].y));
        ctx.stroke();
      }
    }

    // Draw points
    visualPoints.forEach(point => {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      const isHovered = hoveredPoint === point.word;

      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? 12 : 8, 0, 2 * Math.PI);
      ctx.fillStyle = isHovered ? '#3b82f6' : '#6366f1';
      ctx.fill();
      ctx.strokeStyle = isHovered ? '#1d4ed8' : '#4f46e5';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      ctx.font = isHovered ? 'bold 14px system-ui' : '12px system-ui';
      ctx.fillStyle = '#1f2937';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(point.word, x, y - (isHovered ? 20 : 18));
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
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {t('title')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={reset}
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
              aria-label={t('reset')}
              type="button"
            >
              <RotateCcw className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
              aria-label={showInfo ? t('hideInfo') : t('showInfo')}
              aria-expanded={showInfo}
              type="button"
            >
              <Info className="h-5 w-5 text-gray-500 dark:text-gray-400" />
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
              className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: `<strong>${t('infoTitle')}</strong> ${t('infoText')}` }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Fields */}
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="word-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('word')} 1
              </label>
              <input
                id="word-1"
                type="text"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-1"
                className="w-full p-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
              />
              <datalist id="word-suggestions-1">
                {availableWords.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="word-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('word')} 2
              </label>
              <input
                id="word-2"
                type="text"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-2"
                className="w-full p-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
              />
              <datalist id="word-suggestions-2">
                {availableWords.map(word => (
                  <option key={word} value={word} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="word-3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('word')} 3 {t('optional')}
              </label>
              <input
                id="word-3"
                type="text"
                value={word3}
                onChange={(e) => setWord3(e.target.value)}
                placeholder={t('wordPlaceholder')}
                list="word-suggestions-3"
                className="w-full p-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-colors outline-none"
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
            className="w-full md:w-auto px-6 py-3 min-h-[44px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            {t('calculate')}
          </button>
        </div>

        {/* Results Display */}
        {similarities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t('similarityScores')}
            </h4>
            <div className="space-y-3">
              {similarities.map((result, index) => (
                <motion.div
                  key={`${result.word1}-${result.word2}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.word1}
                    </span>
                    <span className="text-gray-400">↔</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {result.word2}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[120px] bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
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
                    <div className="text-right min-w-[80px]">
                      <div className={`text-lg font-bold ${getSimilarityColor(result.similarity)}`}>
                        {Math.round(result.similarity * 100)}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
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
            className="mb-6"
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {t('visualization')}
            </h4>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                onTouchStart={handleCanvasTouch}
                onTouchMove={handleCanvasTouch}
                onTouchEnd={handleCanvasTouchEnd}
                className="w-full h-[300px] cursor-pointer touch-none"
                aria-label={t('visualizationAriaLabel')}
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-3">
                {t('visualizationHint')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Example Sets */}
        {similarities.length === 0 && (
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {t('tryExamples')}
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_SETS.map((example) => (
                <button
                  key={example.label}
                  onClick={() => loadExample(example)}
                  className="px-3 py-1.5 text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
                >
                  {example.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Educational Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400"
      >
        <p>
          {t('disclaimer')}
        </p>
      </motion.div>
    </div>
  );
}
