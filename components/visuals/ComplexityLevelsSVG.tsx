'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export function ComplexityLevelsSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.complexityLevels');

  return (
    <div className={`text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 400 360"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text x="200" y="25" textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">
          {t('title')}
        </text>

        {/* Bottom tier - LLM (widest) */}
        <path d="M 80 220 L 320 220 L 280 160 L 120 160 Z" fill="#93c5fd" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
        <text x="200" y="185" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">
          {t('llmChat')}
        </text>
        <text x="200" y="205" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.8">
          {t('llmDesc')}
        </text>
        <circle cx="150" cy="193" r="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <path d="M 148 199 L 145 203 L 150 201" fill="none" stroke="#3b82f6" strokeWidth="1.5" />

        {/* Middle tier - Reasoning Model */}
        <path d="M 120 160 L 280 160 L 250 100 L 150 100 Z" fill="#60a5fa" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
        <text x="200" y="120" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">
          {t('reasoningModel')}
        </text>
        <text x="200" y="140" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.8">
          {t('reasoningDesc')}
        </text>
        <ellipse cx="150" cy="127" rx="10" ry="8" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <path d="M 145 123 Q 150 127 155 123" fill="none" stroke="#3b82f6" strokeWidth="1.2" />

        {/* Top tier - Agent (narrowest) */}
        <path d="M 150 100 L 250 100 L 230 50 L 170 50 Z" fill="#2563eb" fillOpacity="0.5" stroke="#1e40af" strokeWidth="2.5" />
        <text x="200" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">
          {t('agentDoer')}
        </text>
        <text x="200" y="87" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.9">
          {t('agentDesc')}
        </text>
        <g transform="translate(150, 70)">
          <rect x="0" y="-3" width="12" height="3" fill="#1e40af" />
          <circle cx="3" cy="-7" r="2" fill="none" stroke="#1e40af" strokeWidth="1.2" />
        </g>

        {/* Divider */}
        <line x1="50" y1="240" x2="350" y2="240" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        {/* Kitchen analogy */}
        <text x="200" y="265" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor">
          {t('kitchenAnalogy')}
        </text>

        <rect x="60" y="280" width="90" height="55" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="105" y="297" textAnchor="middle" fontSize="11" fontWeight="500" fill="currentColor">
          {t('recipeBook')}
        </text>
        <text x="105" y="313" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">(LLM)</text>
        <text x="105" y="328" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">
          {t('providesInfo')}
        </text>

        <rect x="160" y="280" width="80" height="55" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="200" y="297" textAnchor="middle" fontSize="11" fontWeight="500" fill="currentColor">
          {t('headChef')}
        </text>
        <text x="200" y="313" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">({t('reasoning')})</text>
        <text x="200" y="328" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">
          {t('plansMenu')}
        </text>

        <rect x="250" y="280" width="90" height="55" rx="6" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="295" y="297" textAnchor="middle" fontSize="11" fontWeight="600" fill="#3b82f6">
          {t('cook')}
        </text>
        <text x="295" y="313" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">({t('agentLabel')})</text>
        <text x="295" y="328" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">
          {t('makesFood')}
        </text>
      </svg>
    </div>
  );
}
