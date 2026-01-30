'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function AgentLoopSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.agentLoop');

  return (
    <div className={`text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 400 380"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text x="200" y="25" textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">
          {t('title')}
        </text>

        {/* Circular flow */}
        <defs>
          <marker
            id="arrowblue"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
          </marker>
        </defs>

        {/* OBSERVE node (top) */}
        <circle cx="200" cy="80" r="35" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="200" y="85" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">
          {t('observe')}
        </text>

        {/* THINK node (bottom-left) */}
        <circle cx="120" cy="180" r="35" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="120" y="185" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">
          {t('think')}
        </text>

        {/* ACT node (bottom-right) */}
        <circle cx="280" cy="180" r="35" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="280" y="185" textAnchor="middle" fontSize="14" fontWeight="600" fill="#3b82f6">
          {t('act')}
        </text>

        {/* Arrows */}
        <path d="M 180 100 Q 140 130 135 155" fill="none" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowblue)" />
        <path d="M 155 180 L 245 180" fill="none" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowblue)" />
        <path d="M 265 155 Q 240 100 215 90" fill="none" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowblue)" />

        {/* Tool branches from ACT */}
        <line x1="280" y1="215" x2="220" y2="260" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="280" y1="215" x2="280" y2="270" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />
        <line x1="280" y1="215" x2="340" y2="260" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />

        {/* Tool labels */}
        <text x="220" y="280" textAnchor="middle" fontSize="12" fill="currentColor">{t('toolSearch')}</text>
        <text x="280" y="290" textAnchor="middle" fontSize="12" fill="currentColor">{t('toolCode')}</text>
        <text x="340" y="280" textAnchor="middle" fontSize="12" fill="currentColor">{t('toolDatabase')}</text>

        {/* Comparison section */}
        <line x1="50" y1="310" x2="350" y2="310" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        {/* Left: Consultant */}
        <rect x="50" y="325" width="140" height="45" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="120" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill="currentColor">
          {t('consultant')}
        </text>
        <text x="120" y="358" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
          {t('consultantDesc')}
        </text>

        {/* Right: Agent */}
        <rect x="210" y="325" width="140" height="45" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
        <text x="280" y="340" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">
          {t('agent')}
        </text>
        <text x="280" y="358" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
          {t('agentDesc')}
        </text>
      </svg>
    </div>
  );
}
