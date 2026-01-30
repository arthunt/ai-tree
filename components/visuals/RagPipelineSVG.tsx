'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function RagPipelineSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.ragPipeline');

  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 700 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="350" y="30" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('title')}
        </text>

        {/* Query box */}
        <rect x="30" y="80" width="100" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
        <text x="80" y="105" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('query')}</text>
        <text x="80" y="125" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('queryExample')}</text>

        {/* Arrow 1 */}
        <path d="M 130 110 L 180 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow1)"/>
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>

        {/* RETRIEVE box */}
        <rect x="180" y="60" width="140" height="100" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2"/>
        <text x="250" y="85" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('retrieve')}</text>
        <text x="250" y="105" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('retrieveStep1')}</text>
        <text x="250" y="122" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('retrieveStep2')}</text>
        <text x="250" y="139" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('retrieveStep3')}</text>

        {/* Document database */}
        <rect x="190" y="180" width="120" height="50" rx="6" fill="#9333ea" fillOpacity="0.15" stroke="#9333ea" strokeWidth="2" strokeDasharray="4,4"/>
        <text x="250" y="200" fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('documentDb')}</text>
        <text x="250" y="216" fontSize="10" fill="currentColor" opacity="0.7" textAnchor="middle">{t('documentDbDesc')}</text>

        {/* Arrow from DB to RETRIEVE */}
        <path d="M 250 180 L 250 160" stroke="#9333ea" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrow-db)"/>
        <defs>
          <marker id="arrow-db" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#9333ea"/>
          </marker>
        </defs>

        {/* Arrow 2 */}
        <path d="M 320 110 L 370 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow2)"/>
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>

        {/* AUGMENT box */}
        <rect x="370" y="60" width="140" height="100" rx="8" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="2"/>
        <text x="440" y="85" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('augment')}</text>
        <text x="440" y="110" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('augmentDesc1')}</text>
        <text x="440" y="127" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('augmentDesc2')}</text>

        {/* Arrow 3 */}
        <path d="M 510 110 L 560 110" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow3)"/>
        <defs>
          <marker id="arrow3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>

        {/* GENERATE box */}
        <rect x="560" y="60" width="120" height="100" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
        <text x="620" y="85" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('generate')}</text>
        <text x="620" y="110" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('generateDesc1')}</text>
        <text x="620" y="127" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('generateDesc2')}</text>

        {/* Final answer */}
        <rect x="540" y="280" width="160" height="80" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
        <text x="620" y="305" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">{t('answer')}</text>
        <text x="620" y="325" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('answerLine1')}</text>
        <text x="620" y="342" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('answerLine2')}</text>
        <text x="620" y="359" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">{t('answerLine3')}</text>

        {/* Arrow from GENERATE to Answer */}
        <path d="M 620 160 L 620 280" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-answer)"/>
        <defs>
          <marker id="arrow-answer" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <polygon points="0 0, 8 4, 0 8" fill="#10b981"/>
          </marker>
        </defs>
      </svg>
    </div>
  );
}
