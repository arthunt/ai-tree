'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function LoraSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.lora');

  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 650 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="325" y="35" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('title')}
        </text>

        {/* Base model label */}
        <text x="150" y="75" fontSize="13" fontWeight="bold" fill="#6b7280" textAnchor="middle">
          {t('baseModel')}
        </text>
        <text x="150" y="93" fontSize="13" fontWeight="bold" fill="#3b82f6">
          {t('frozen')}
        </text>

        {/* LoRA adapter label */}
        <text x="500" y="75" fontSize="13" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
          {t('loraAdapters')}
        </text>
        <text x="500" y="93" fontSize="13" fontWeight="bold" fill="#ef4444">
          {t('trained')}
        </text>

        {/* Layer 1 - Frozen */}
        <rect x="80" y="120" width="140" height="60" rx="8" fill="#9ca3af" fillOpacity="0.3" stroke="#6b7280" strokeWidth="2"/>
        <text x="150" y="145" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('layer')} 1</text>
        <text x="150" y="164" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">{t('frozenWeights')}</text>

        {/* LoRA adapter 1 */}
        <g>
          <path d="M 220 150 Q 290 90, 360 150" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
          <rect x="260" y="70" width="50" height="30" rx="4" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
          <text x="285" y="90" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">A</text>
          <rect x="320" y="70" width="50" height="30" rx="4" fill="#fb923c" fillOpacity="0.3" stroke="#fb923c" strokeWidth="2"/>
          <text x="345" y="90" fontSize="12" fontWeight="bold" fill="#fb923c" textAnchor="middle">B</text>
          <circle cx="360" cy="150" r="12" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
          <text x="360" y="155" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">+</text>
        </g>

        {/* Layer 2 - Frozen */}
        <rect x="80" y="215" width="140" height="60" rx="8" fill="#9ca3af" fillOpacity="0.3" stroke="#6b7280" strokeWidth="2"/>
        <text x="150" y="240" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('layer')} 2</text>
        <text x="150" y="259" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">{t('frozenWeights')}</text>

        {/* LoRA adapter 2 */}
        <g>
          <path d="M 220 245 Q 290 185, 360 245" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
          <rect x="260" y="165" width="50" height="30" rx="4" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
          <text x="285" y="185" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">A</text>
          <rect x="320" y="165" width="50" height="30" rx="4" fill="#fb923c" fillOpacity="0.3" stroke="#fb923c" strokeWidth="2"/>
          <text x="345" y="185" fontSize="12" fontWeight="bold" fill="#fb923c" textAnchor="middle">B</text>
          <circle cx="360" cy="245" r="12" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
          <text x="360" y="250" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">+</text>
        </g>

        {/* Layer 3 - Frozen */}
        <rect x="80" y="310" width="140" height="60" rx="8" fill="#9ca3af" fillOpacity="0.3" stroke="#6b7280" strokeWidth="2"/>
        <text x="150" y="335" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('layer')} 3</text>
        <text x="150" y="354" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">{t('frozenWeights')}</text>

        {/* LoRA adapter 3 */}
        <g>
          <path d="M 220 340 Q 290 280, 360 340" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="5,5"/>
          <rect x="260" y="260" width="50" height="30" rx="4" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
          <text x="285" y="280" fontSize="12" fontWeight="bold" fill="#f59e0b" textAnchor="middle">A</text>
          <rect x="320" y="260" width="50" height="30" rx="4" fill="#fb923c" fillOpacity="0.3" stroke="#fb923c" strokeWidth="2"/>
          <text x="345" y="280" fontSize="12" fontWeight="bold" fill="#fb923c" textAnchor="middle">B</text>
          <circle cx="360" cy="340" r="12" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2"/>
          <text x="360" y="345" fontSize="14" fontWeight="bold" fill="#10b981" textAnchor="middle">+</text>
        </g>

        {/* Main flow arrows */}
        <path d="M 150 180 L 150 215" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-main)"/>
        <path d="M 150 275 L 150 310" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-main2)"/>

        <defs>
          <marker id="arrow-main" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#6b7280"/>
          </marker>
          <marker id="arrow-main2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#6b7280"/>
          </marker>
        </defs>

        {/* Efficiency callout */}
        <rect x="420" y="180" width="190" height="120" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
        <text x="515" y="205" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('whyLora')}
        </text>
        <text x="515" y="230" fontSize="12" fill="currentColor" textAnchor="middle">
          {t('benefit1')}
        </text>
        <text x="515" y="250" fontSize="12" fill="currentColor" textAnchor="middle">
          {t('benefit2')}
        </text>
        <text x="515" y="270" fontSize="12" fill="currentColor" textAnchor="middle">
          {t('benefit3')}
        </text>
        <text x="515" y="290" fontSize="12" fill="currentColor" textAnchor="middle">
          {t('benefit4')}
        </text>

        {/* Input/Output labels */}
        <text x="150" y="105" fontSize="11" fill="currentColor" opacity="0.6" textAnchor="middle">{t('input')}</text>
        <text x="150" y="390" fontSize="11" fill="currentColor" opacity="0.6" textAnchor="middle">{t('output')}</text>
        <path d="M 150 95 L 150 120" stroke="currentColor" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow-in)"/>
        <path d="M 150 370 L 150 385" stroke="currentColor" strokeWidth="1" opacity="0.3" markerEnd="url(#arrow-out)"/>

        <defs>
          <marker id="arrow-in" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="currentColor" opacity="0.3"/>
          </marker>
          <marker id="arrow-out" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="currentColor" opacity="0.3"/>
          </marker>
        </defs>
      </svg>
    </div>
  );
}
