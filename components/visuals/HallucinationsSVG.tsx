'use client';

import { useTranslations } from 'next-intl';

export function HallucinationsSVG() {
  const t = useTranslations('visuals.hallucinations');

  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('title')}
        </text>

        {/* Problem statement */}
        <text x="400" y="60" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor" opacity="0.8">
          {t('subtitle')}
        </text>

        {/* WRONG Response Box */}
        <g id="wrong">
          <rect x="50" y="80" width="330" height="180" fill="#fee2e2" className="dark:fill-red-950" stroke="#dc2626" strokeWidth="3" rx="8"/>
          <text x="215" y="105" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            {t('hallucination')}
          </text>
          <text x="70" y="135" fontSize="13" fontWeight="600" fill="currentColor">
            {t('question')}
          </text>
          <text x="70" y="160" fontSize="13" fill="currentColor">
            {t('answerStart')}
          </text>
          <text x="70" y="180" fontSize="13" fontWeight="600" fill="#dc2626">
            {t('wrongFact')}
          </text>
          <line x1="70" y1="177" x2="200" y2="177" stroke="#dc2626" strokeWidth="2"/>
          <text x="70" y="200" fontSize="13" fill="currentColor">
            {t('answerEnd')}
          </text>
          <rect x="70" y="220" width="280" height="25" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" rx="4"/>
          <rect x="70" y="220" width="263" height="25" fill="#dc2626" rx="4"/>
          <text x="210" y="238" fontSize="13" fontWeight="bold" textAnchor="middle" fill="white">
            {t('confidence94')}
          </text>
        </g>

        {/* CORRECT Response Box */}
        <g id="correct">
          <rect x="420" y="80" width="330" height="180" fill="#d1fae5" className="dark:fill-emerald-950" stroke="#10b981" strokeWidth="3" rx="8"/>
          <text x="585" y="105" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#10b981">
            {t('correct')}
          </text>
          <text x="440" y="135" fontSize="13" fontWeight="600" fill="currentColor">
            {t('question')}
          </text>
          <text x="440" y="160" fontSize="13" fill="currentColor">
            {t('answerStart')}
          </text>
          <text x="440" y="180" fontSize="13" fontWeight="600" fill="#10b981">
            {t('correctFact')}
          </text>
          <text x="440" y="200" fontSize="13" fill="currentColor">
            {t('answerEnd')}
          </text>
          <rect x="440" y="220" width="280" height="25" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" rx="4"/>
          <rect x="440" y="220" width="269" height="25" fill="#10b981" rx="4"/>
          <text x="580" y="238" fontSize="13" fontWeight="bold" textAnchor="middle" fill="white">
            {t('confidence96')}
          </text>
        </g>

        {/* Problem callout */}
        <text x="400" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('problem')}
        </text>

        {/* Explanation box */}
        <rect x="50" y="300" width="700" height="130" fill="#fef3c7" className="dark:fill-yellow-950" stroke="#f59e0b" strokeWidth="2" rx="8"/>
        <text x="400" y="325" fontSize="15" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('whyTitle')}
        </text>
        <text x="70" y="350" fontSize="13" fill="currentColor">
          {t('reason1')}
        </text>
        <text x="70" y="372" fontSize="13" fill="currentColor">
          {t('reason2')}
        </text>
        <text x="70" y="394" fontSize="13" fill="currentColor">
          {t('reason3')}
        </text>
        <text x="70" y="416" fontSize="13" fontWeight="600" fill="#d97706">
          {t('tip')}
        </text>
      </svg>
    </div>
  );
}
