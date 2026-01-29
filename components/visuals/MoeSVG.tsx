'use client';

import { useTranslations } from 'next-intl';

interface MoeSVGProps {
  className?: string;
}

export function MoeSVG({ className = '' }: MoeSVGProps) {
  const t = useTranslations('visuals.moe');
  return (
    <div className={`w-full text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 400 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Input Query at top */}
        <rect
          x="140"
          y="20"
          width="120"
          height="40"
          rx="8"
          className="fill-gray-200 dark:fill-gray-700"
        />
        <text
          x="200"
          y="45"
          className="fill-current"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          {t('inputQuery')}
        </text>

        {/* Router Node - highlighted purple */}
        <circle cx="200" cy="120" r="35" className="fill-purple-500" />
        <text
          x="200"
          y="125"
          className="fill-white"
          fontSize="14"
          fontWeight="700"
          textAnchor="middle"
        >
          {t('router')}
        </text>

        {/* Line from Input to Router */}
        <line
          x1="200"
          y1="60"
          x2="200"
          y2="85"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* 8 Expert panels */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x = 30 + i * 47;
          const isActive = i === 2 || i === 5; // Only 2 experts active

          return (
            <g key={i}>
              {/* Expert panel */}
              <rect
                x={x}
                y="200"
                width="40"
                height="60"
                rx="6"
                className={isActive ? 'fill-purple-500' : 'fill-gray-300 dark:fill-gray-600'}
                opacity={isActive ? 1 : 0.4}
              />
              <text
                x={x + 20}
                y="225"
                className={isActive ? 'fill-white' : 'fill-current'}
                fontSize="11"
                fontWeight={isActive ? '700' : '400'}
                textAnchor="middle"
              >
                {t('expert')}
              </text>
              <text
                x={x + 20}
                y="240"
                className={isActive ? 'fill-white' : 'fill-current'}
                fontSize="16"
                fontWeight="700"
                textAnchor="middle"
              >
                {i + 1}
              </text>

              {/* Line from Router to Expert */}
              <line
                x1="200"
                y1="155"
                x2={x + 20}
                y2="200"
                stroke="currentColor"
                strokeWidth={isActive ? '2' : '1'}
                opacity={isActive ? 1 : 0.3}
              />

              {/* Line from Active Expert to Output */}
              {isActive && (
                <line
                  x1={x + 20}
                  y1="260"
                  x2="200"
                  y2="320"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}

        {/* Combined Output at bottom */}
        <rect
          x="100"
          y="320"
          width="200"
          height="50"
          rx="8"
          className="fill-purple-600"
        />
        <text
          x="200"
          y="345"
          className="fill-white"
          fontSize="14"
          fontWeight="600"
          textAnchor="middle"
        >
          {t('combinedOutput')}
        </text>

        {/* Label at bottom */}
        <text
          x="200"
          y="410"
          className="fill-purple-600 dark:fill-purple-400"
          fontSize="16"
          fontWeight="700"
          textAnchor="middle"
        >
          {t('activeExperts')}
        </text>
        <text
          x="200"
          y="435"
          className="fill-current"
          fontSize="13"
          textAnchor="middle"
        >
          {t('fasterCheaper')}
        </text>

        {/* Checkmarks on active experts */}
        <text x="45" y="252" className="fill-white" fontSize="18">✓</text>
        <text x="280" y="252" className="fill-white" fontSize="18">✓</text>
      </svg>
    </div>
  );
}
