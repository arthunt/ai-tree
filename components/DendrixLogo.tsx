'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './DendrixLogo.module.css';

interface DendrixLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

// 19 glowing node circles extracted from the original SVG
// Each has: cx, cy, r, fill color, and optional outer-glow filter
const nodes = [
  { cx: 394.89, cy: 366.23, r: 12.27, fill: '#156981' },
  { cx: 311.92, cy: 389.6,  r: 10.76, fill: '#2597a7' },
  { cx: 483.82, cy: 305.27, r: 10.78, fill: '#8afffa', glow: true },
  { cx: 480.8,  cy: 380.17, r: 9.25,  fill: '#4ffff4', glow: true },
  { cx: 537.7,  cy: 323.26, r: 7.55,  fill: '#7cfcf5', glow: true },
  { cx: 597.52, cy: 328.54, r: 7.55,  fill: '#9cfdf5', glow: true },
  { cx: 412.88, cy: 413.94, r: 8.15,  fill: '#4dfdfd', glow: true },
  { cx: 474.01, cy: 508.21, r: 9.51,  fill: '#50fbfb', glow: true },
  { cx: 547.63, cy: 246.44, r: 10.78, fill: '#2fdaca' },
  { cx: 637.14, cy: 229.65, r: 9.79,  fill: '#a9f9ee' },
  { cx: 703.43, cy: 318.65, r: 12.09, fill: '#0fa5aa' },
  { cx: 650.53, cy: 329.48, r: 11.42, fill: '#3cdace' },
  { cx: 784.07, cy: 361.26, r: 12.2,  fill: '#25edba' },
  { cx: 794.4,  cy: 393.66, r: 12.2,  fill: '#36f1c4' },
  { cx: 765.35, cy: 473.04, r: 11.42, fill: '#33ecd0' },
  { cx: 499.13, cy: 338.97, r: 11.42, fill: '#059aa4' },
  { cx: 799.46, cy: 473.47, r: 10.58, fill: '#53f7f2', glow: true },
  { cx: 735.5,  cy: 450.17, r: 7.79,  fill: '#8bfffc', glow: true },
  { cx: 752.49, cy: 402.8,  r: 7.79,  fill: '#8bfffc', glow: true },
];

export function DendrixLogo({
  className = '',
  size = 200,
  animate = true,
}: DendrixLogoProps) {
  return (
    <motion.div
      className={`${styles.logo} ${className}`}
      style={{ width: size, height: size }}
      initial={animate ? { opacity: 0, scale: 0.95 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Base logo - Next.js Image for optimized loading */}
      <Image
        src="/img/dendrix_logo.svg"
        alt="Dendrix AI Tree Logo"
        width={size}
        height={size}
        className={animate ? styles.treeBody : undefined}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        priority
        unoptimized
      />

      {/* Animated circles overlay - positioned exactly over the base SVG */}
      {animate && (
        <svg
          viewBox="0 0 1078.78 1078.78"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.overlay}
          aria-hidden="true"
        >
          <defs>
            <filter id="dendrix-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="#fff" floodOpacity="0.6" />
              <feComposite in2="blur" operator="in" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>

          {nodes.map((node, i) => (
            <circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.fill}
              filter={node.glow ? 'url(#dendrix-glow)' : undefined}
              className={`${styles.node} ${styles[`node${i}`]}`}
            />
          ))}
        </svg>
      )}
    </motion.div>
  );
}
