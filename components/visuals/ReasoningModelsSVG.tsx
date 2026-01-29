'use client';

import React from 'react';

interface ReasoningModelsSVGProps {
  className?: string;
}

export function ReasoningModelsSVG({ className = '' }: ReasoningModelsSVGProps) {
  return (
    <div className={`w-full text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 700 450"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text
          x="350"
          y="30"
          className="fill-current"
          fontSize="20"
          fontWeight="700"
          textAnchor="middle"
        >
          Regular LLM vs Reasoning Model
        </text>

        {/* Left side: Regular LLM */}
        <rect
          x="20"
          y="60"
          width="310"
          height="350"
          rx="12"
          className="fill-gray-100 dark:fill-gray-800"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="175"
          y="90"
          className="fill-current"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          Regular LLM
        </text>

        {/* Question */}
        <rect
          x="40"
          y="110"
          width="270"
          height="40"
          rx="6"
          className="fill-purple-100 dark:fill-purple-900"
        />
        <text
          x="175"
          y="135"
          className="fill-current"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Question: 25 × 17 = ?
        </text>

        {/* Arrow down */}
        <text x="168" y="175" className="fill-purple-500" fontSize="28">↓</text>

        {/* Instant answer */}
        <rect
          x="70"
          y="190"
          width="210"
          height="50"
          rx="6"
          className="fill-purple-500"
        />
        <text
          x="175"
          y="215"
          className="fill-white"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          Answer: 425
        </text>
        <text
          x="175"
          y="233"
          className="fill-purple-100"
          fontSize="12"
          textAnchor="middle"
        >
          (sometimes wrong)
        </text>

        {/* Characteristics */}
        <text x="50" y="275" className="fill-current" fontSize="13">
          ⚡ Fast (instant)
        </text>
        <text x="50" y="300" className="fill-current" fontSize="13">
          💰 Cheap
        </text>
        <text x="50" y="325" className="fill-current" fontSize="13">
          ⚠️ No verification
        </text>

        {/* Right side: Reasoning Model */}
        <rect
          x="370"
          y="60"
          width="310"
          height="350"
          rx="12"
          className="fill-gray-100 dark:fill-gray-800"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="525"
          y="90"
          className="fill-current"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          Reasoning Model
        </text>

        {/* Question */}
        <rect
          x="390"
          y="110"
          width="270"
          height="40"
          rx="6"
          className="fill-purple-100 dark:fill-purple-900"
        />
        <text
          x="525"
          y="135"
          className="fill-current"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          Question: 25 × 17 = ?
        </text>

        {/* Reasoning steps */}
        <rect
          x="390"
          y="165"
          width="270"
          height="25"
          rx="4"
          className="fill-purple-200 dark:fill-purple-800"
        />
        <text x="400" y="182" className="fill-current" fontSize="12">
          Step 1: 25 × 10 = 250
        </text>

        <rect
          x="390"
          y="195"
          width="270"
          height="25"
          rx="4"
          className="fill-purple-200 dark:fill-purple-800"
        />
        <text x="400" y="212" className="fill-current" fontSize="12">
          Step 2: 25 × 7 = 175
        </text>

        <rect
          x="390"
          y="225"
          width="270"
          height="25"
          rx="4"
          className="fill-purple-200 dark:fill-purple-800"
        />
        <text x="400" y="242" className="fill-current" fontSize="12">
          Step 3: 250 + 175 = 425
        </text>

        <rect
          x="390"
          y="255"
          width="270"
          height="25"
          rx="4"
          className="fill-purple-300 dark:fill-purple-700"
        />
        <text x="400" y="272" className="fill-current" fontSize="12" fontWeight="600">
          Check: 425 ÷ 25 = 17 ✓
        </text>

        {/* Verified answer */}
        <rect
          x="420"
          y="295"
          width="210"
          height="40"
          rx="6"
          className="fill-purple-600"
        />
        <text
          x="525"
          y="320"
          className="fill-white"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          Answer: 425 ✓
        </text>

        {/* Characteristics */}
        <text x="400" y="360" className="fill-current" fontSize="13">
          🐢 Slower (multi-step)
        </text>
        <text x="400" y="385" className="fill-current" fontSize="13">
          ✅ Verified & accurate
        </text>

        {/* Bottom comparison label */}
        <text
          x="350"
          y="440"
          className="fill-purple-600 dark:fill-purple-400"
          fontSize="14"
          fontWeight="700"
          textAnchor="middle"
        >
          Best for: Math, Code, Logic & Complex Reasoning
        </text>
      </svg>
    </div>
  );
}
