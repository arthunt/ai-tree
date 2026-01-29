'use client';

import React from 'react';

interface GreenAiSVGProps {
  className?: string;
}

export function GreenAiSVG({ className = '' }: GreenAiSVGProps) {
  return (
    <div className={`w-full text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 600 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text
          x="300"
          y="30"
          className="fill-current"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          Green AI: Energy Efficiency
        </text>

        {/* Section 1: Training Cost */}
        <text
          x="30"
          y="70"
          className="fill-current"
          fontSize="15"
          fontWeight="600"
        >
          Training Cost
        </text>

        {/* GPT-3 bar */}
        <rect
          x="30"
          y="85"
          width="460"
          height="35"
          rx="4"
          className="fill-red-400 dark:fill-red-500"
        />
        <text x="40" y="107" className="fill-white" fontSize="13" fontWeight="600">
          GPT-3: $4.6M
        </text>

        {/* LLaMA bar */}
        <rect
          x="30"
          y="130"
          width="230"
          height="35"
          rx="4"
          className="fill-yellow-400 dark:fill-yellow-500"
        />
        <text x="40" y="152" className="fill-gray-900" fontSize="13" fontWeight="600">
          LLaMA: $1.5M
        </text>

        {/* Mistral bar */}
        <rect
          x="30"
          y="175"
          width="80"
          height="35"
          rx="4"
          className="fill-emerald-500"
        />
        <text x="40" y="197" className="fill-white" fontSize="13" fontWeight="600">
          Mistral: $0.5M
        </text>

        {/* Section 2: CO2 Emissions */}
        <text
          x="30"
          y="250"
          className="fill-current"
          fontSize="15"
          fontWeight="600"
        >
          CO₂ Emissions
        </text>

        {/* 502 tons bar */}
        <rect
          x="30"
          y="265"
          width="420"
          height="35"
          rx="4"
          className="fill-red-400 dark:fill-red-500"
        />
        <text x="40" y="287" className="fill-white" fontSize="13" fontWeight="600">
          502 tons CO₂
        </text>

        {/* 120 tons bar */}
        <rect
          x="30"
          y="310"
          width="100"
          height="35"
          rx="4"
          className="fill-emerald-500"
        />
        <text x="40" y="332" className="fill-white" fontSize="13" fontWeight="600">
          120 tons
        </text>

        {/* Green leaf accent */}
        <text x="140" y="335" className="fill-emerald-500" fontSize="24">🍃</text>

        {/* Section 3: Inference Cost */}
        <text
          x="30"
          y="385"
          className="fill-current"
          fontSize="15"
          fontWeight="600"
        >
          Inference Cost (per query)
        </text>

        {/* $0.03 bar */}
        <rect
          x="30"
          y="400"
          width="300"
          height="35"
          rx="4"
          className="fill-orange-400"
        />
        <text x="40" y="422" className="fill-white" fontSize="13" fontWeight="600">
          Old: $0.03/query
        </text>

        {/* $0.0002 bar */}
        <rect
          x="30"
          y="445"
          width="20"
          height="35"
          rx="4"
          className="fill-emerald-500"
        />
        <text x="60" y="467" className="fill-current" fontSize="13" fontWeight="600">
          New: $0.0002/query
        </text>

        {/* Arrow showing reduction */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" className="fill-emerald-600" />
          </marker>
        </defs>
        <line
          x1="490"
          y1="100"
          x2="490"
          y2="190"
          stroke="#10b981"
          strokeWidth="3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="520"
          y="150"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="14"
          fontWeight="700"
        >
          90% reduction
        </text>

        {/* Bottom message */}
        <rect
          x="150"
          y="485"
          width="300"
          height="10"
          rx="5"
          className="fill-emerald-500"
        />
        <text
          x="300"
          y="485"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontSize="14"
          fontWeight="700"
          textAnchor="middle"
        >
          Same quality, fraction of the cost
        </text>
      </svg>
    </div>
  );
}
