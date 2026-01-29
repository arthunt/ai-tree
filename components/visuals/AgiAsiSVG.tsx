'use client';

import React from 'react';

interface AgiAsiSVGProps {
  className?: string;
}

export function AgiAsiSVG({ className = '' }: AgiAsiSVGProps) {
  return (
    <div className={`w-full text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 800 350"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text
          x="400"
          y="30"
          className="fill-current"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          AI Capability Spectrum
        </text>

        {/* Main timeline */}
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
          </linearGradient>
        </defs>

        <line
          x1="80"
          y1="150"
          x2="720"
          y2="150"
          stroke="url(#timelineGradient)"
          strokeWidth="4"
        />

        {/* Narrow AI - Solid line */}
        <circle cx="150" cy="150" r="20" className="fill-purple-600" />
        <text
          x="150"
          y="110"
          className="fill-current"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          Narrow AI
        </text>
        <text
          x="150"
          y="130"
          className="fill-gray-600 dark:fill-gray-400"
          fontSize="13"
          textAnchor="middle"
        >
          (Today)
        </text>
        <text
          x="150"
          y="190"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          ChatGPT
        </text>
        <text
          x="150"
          y="210"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          Siri, AlphaGo
        </text>

        {/* AGI - Dashed line */}
        <line
          x1="150"
          y1="150"
          x2="400"
          y2="150"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8,4"
        />
        <circle cx="400" cy="150" r="20" className="fill-purple-500" />
        <text
          x="400"
          y="110"
          className="fill-current"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          AGI
        </text>
        <text
          x="400"
          y="130"
          className="fill-gray-600 dark:fill-gray-400"
          fontSize="13"
          textAnchor="middle"
        >
          (Future?)
        </text>
        <text
          x="400"
          y="190"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          Good at ALL
        </text>
        <text
          x="400"
          y="210"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          human tasks
        </text>

        {/* ASI - Dotted line with glow */}
        <line
          x1="400"
          y1="150"
          x2="650"
          y2="150"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="2,4"
        />
        <defs>
          <radialGradient id="asiGlow">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <circle cx="650" cy="150" r="30" fill="url(#asiGlow)" />
        <circle cx="650" cy="150" r="20" className="fill-purple-400" />
        <text
          x="650"
          y="100"
          className="fill-current"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          ASI
        </text>
        <text
          x="650"
          y="120"
          className="fill-gray-600 dark:fill-gray-400"
          fontSize="13"
          textAnchor="middle"
        >
          (Hypothetical)
        </text>
        <text
          x="650"
          y="190"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          Surpasses ALL
        </text>
        <text
          x="650"
          y="210"
          className="fill-current"
          fontSize="12"
          textAnchor="middle"
        >
          human capability
        </text>

        {/* "We are here" marker */}
        <polygon
          points="150,250 140,270 160,270"
          className="fill-purple-600"
        />
        <text
          x="150"
          y="295"
          className="fill-purple-600 dark:fill-purple-400"
          fontSize="14"
          fontWeight="700"
          textAnchor="middle"
        >
          We are here
        </text>
      </svg>
    </div>
  );
}
