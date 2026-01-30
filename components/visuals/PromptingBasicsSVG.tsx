'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function PromptingBasicsSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.promptingBasics');

  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 750 550" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="375" y="35" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('title')}
        </text>

        {/* Bad example - left side */}
        <g>
          <rect x="50" y="70" width="300" height="200" rx="12" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>

          <text x="200" y="100" fontSize="16" fontWeight="bold" fill="#ef4444" textAnchor="middle">
            {t('badPrompt')}
          </text>

          {/* Bad prompt text */}
          <rect x="70" y="120" width="260" height="50" rx="6" fill="#fee2e2" className="dark:fill-gray-900" stroke="#ef4444" strokeWidth="1.5"/>
          <text x="200" y="145" fontSize="13" fill="currentColor" textAnchor="middle">
            {t('badExample')}
          </text>

          {/* Arrow */}
          <path d="M 200 170 L 200 185" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-bad)"/>
          <defs>
            <marker id="arrow-bad" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#ef4444"/>
            </marker>
          </defs>

          {/* Vague result */}
          <rect x="70" y="195" width="260" height="60" rx="6" fill="#fca5a5" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3"/>
          <text x="200" y="215" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">
            {t('badResult1')}
          </text>
          <text x="200" y="232" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">
            {t('badResult2')}
          </text>
          <text x="200" y="249" fontSize="11" fill="currentColor" opacity="0.8" textAnchor="middle">
            {t('badResult3')}
          </text>
        </g>

        {/* Good example - right side */}
        <g>
          <rect x="400" y="70" width="300" height="200" rx="12" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>

          <text x="550" y="100" fontSize="16" fontWeight="bold" fill="#10b981" textAnchor="middle">
            {t('goodPrompt')}
          </text>

          {/* Good prompt text */}
          <rect x="420" y="120" width="260" height="50" rx="6" fill="#d1fae5" className="dark:fill-gray-900" stroke="#10b981" strokeWidth="1.5"/>
          <text x="550" y="137" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('goodExample1')}
          </text>
          <text x="550" y="153" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('goodExample2')}
          </text>

          {/* Arrow */}
          <path d="M 550 170 L 550 185" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-good)"/>
          <defs>
            <marker id="arrow-good" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#10b981"/>
            </marker>
          </defs>

          {/* Precise result */}
          <rect x="420" y="195" width="260" height="60" rx="6" fill="#6ee7b7" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5"/>
          <text x="550" y="212" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('goodResult1')}
          </text>
          <text x="550" y="229" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('goodResult2')}
          </text>
          <text x="550" y="246" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('goodResult3')}
          </text>
        </g>

        {/* VS label */}
        <text x="375" y="175" fontSize="20" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
          VS
        </text>

        {/* Bottom section - 5 Principles */}
        <rect x="50" y="300" width="650" height="220" rx="12" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

        <text x="375" y="335" fontSize="18" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('principlesTitle')}
        </text>

        {/* Principle 1 */}
        <g>
          <circle cx="90" cy="370" r="22" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
          <text x="90" y="377" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle">1</text>
          <text x="130" y="365" fontSize="13" fontWeight="bold" fill="currentColor">{t('principle1')}</text>
          <text x="130" y="382" fontSize="11" fill="currentColor" opacity="0.8">{t('principle1Desc')}</text>
        </g>

        {/* Principle 2 */}
        <g>
          <circle cx="410" cy="370" r="22" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
          <text x="410" y="377" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle">2</text>
          <text x="450" y="365" fontSize="13" fontWeight="bold" fill="currentColor">{t('principle2')}</text>
          <text x="450" y="382" fontSize="11" fill="currentColor" opacity="0.8">{t('principle2Desc')}</text>
        </g>

        {/* Principle 3 */}
        <g>
          <circle cx="90" cy="425" r="22" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
          <text x="90" y="432" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle">3</text>
          <text x="130" y="420" fontSize="13" fontWeight="bold" fill="currentColor">{t('principle3')}</text>
          <text x="130" y="437" fontSize="11" fill="currentColor" opacity="0.8">{t('principle3Desc')}</text>
        </g>

        {/* Principle 4 */}
        <g>
          <circle cx="410" cy="425" r="22" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
          <text x="410" y="432" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle">4</text>
          <text x="450" y="420" fontSize="13" fontWeight="bold" fill="currentColor">{t('principle4')}</text>
          <text x="450" y="437" fontSize="11" fill="currentColor" opacity="0.8">{t('principle4Desc')}</text>
        </g>

        {/* Principle 5 */}
        <g>
          <circle cx="250" cy="480" r="22" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
          <text x="250" y="487" fontSize="16" fontWeight="bold" fill="#f59e0b" textAnchor="middle">5</text>
          <text x="290" y="475" fontSize="13" fontWeight="bold" fill="currentColor">{t('principle5')}</text>
          <text x="290" y="492" fontSize="11" fill="currentColor" opacity="0.8">{t('principle5Desc')}</text>
        </g>
      </svg>
    </div>
  );
}
