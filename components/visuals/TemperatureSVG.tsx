'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function TemperatureSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.temperature');

  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 750 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="375" y="35" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          {t('title')}
        </text>

        {/* Temperature scale */}
        <defs>
          <linearGradient id="temp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <rect x="100" y="70" width="550" height="30" rx="15" fill="url(#temp-gradient)" opacity="0.3"/>
        <text x="100" y="95" fontSize="14" fontWeight="bold" fill="#3b82f6" textAnchor="middle">0.0</text>
        <text x="375" y="95" fontSize="14" fontWeight="bold" fill="#f59e0b" textAnchor="middle">1.0</text>
        <text x="650" y="95" fontSize="14" fontWeight="bold" fill="#ef4444" textAnchor="middle">2.0</text>

        {/* LOW temperature (0.0-0.3) */}
        <g>
          <rect x="50" y="130" width="200" height="320" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>

          <text x="150" y="160" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('lowLabel')}
          </text>
          <text x="150" y="180" fontSize="12" fill="#3b82f6" textAnchor="middle">
            {t('lowDesc')}
          </text>

          {/* Distribution - peaked */}
          <rect x="80" y="200" width="140" height="90" rx="6" fill="#e0e7ff" className="dark:fill-gray-800" stroke="#3b82f6" strokeWidth="1"/>
          <text x="150" y="220" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">
            {t('probDistribution')}
          </text>

          {/* Bar chart - highly peaked */}
          <rect x="95" y="240" width="15" height="10" fill="#3b82f6" opacity="0.3"/>
          <rect x="115" y="230" width="15" height="20" fill="#3b82f6" opacity="0.5"/>
          <rect x="135" y="215" width="15" height="35" fill="#3b82f6"/>
          <rect x="155" y="230" width="15" height="20" fill="#3b82f6" opacity="0.5"/>
          <rect x="175" y="240" width="15" height="10" fill="#3b82f6" opacity="0.3"/>

          {/* Example output */}
          <rect x="70" y="310" width="160" height="120" rx="8" fill="#dbeafe" className="dark:fill-gray-900" stroke="#3b82f6" strokeWidth="1.5"/>
          <text x="150" y="330" fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('exampleOutput')}
          </text>
          <text x="150" y="350" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('lowExample1')}
          </text>
          <text x="150" y="370" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('lowExample2')}
          </text>
          <text x="150" y="390" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('lowExample3')}
          </text>
          <text x="150" y="415" fontSize="10" fontStyle="italic" fill="#3b82f6" textAnchor="middle">
            {t('lowNote')}
          </text>
        </g>

        {/* MEDIUM temperature (0.7) */}
        <g>
          <rect x="275" y="130" width="200" height="320" rx="12" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

          <text x="375" y="160" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('medLabel')}
          </text>
          <text x="375" y="180" fontSize="12" fill="#f59e0b" textAnchor="middle">
            {t('medDesc')}
          </text>

          {/* Distribution - balanced */}
          <rect x="305" y="200" width="140" height="90" rx="6" fill="#fef3c7" className="dark:fill-gray-800" stroke="#f59e0b" strokeWidth="1"/>
          <text x="375" y="220" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">
            {t('probDistribution')}
          </text>

          {/* Bar chart - balanced */}
          <rect x="320" y="235" width="15" height="15" fill="#f59e0b" opacity="0.4"/>
          <rect x="340" y="228" width="15" height="22" fill="#f59e0b" opacity="0.6"/>
          <rect x="360" y="220" width="15" height="30" fill="#f59e0b"/>
          <rect x="380" y="228" width="15" height="22" fill="#f59e0b" opacity="0.6"/>
          <rect x="400" y="235" width="15" height="15" fill="#f59e0b" opacity="0.4"/>

          {/* Example output */}
          <rect x="295" y="310" width="160" height="120" rx="8" fill="#fef3c7" className="dark:fill-gray-900" stroke="#f59e0b" strokeWidth="1.5"/>
          <text x="375" y="330" fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('exampleOutput')}
          </text>
          <text x="375" y="350" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('medExample1')}
          </text>
          <text x="375" y="370" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('medExample2')}
          </text>
          <text x="375" y="390" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('medExample3')}
          </text>
          <text x="375" y="415" fontSize="10" fontStyle="italic" fill="#f59e0b" textAnchor="middle">
            {t('medNote')}
          </text>
        </g>

        {/* HIGH temperature (1.5-2.0) */}
        <g>
          <rect x="500" y="130" width="200" height="320" rx="12" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>

          <text x="600" y="160" fontSize="15" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('highLabel')}
          </text>
          <text x="600" y="180" fontSize="12" fill="#ef4444" textAnchor="middle">
            {t('highDesc')}
          </text>

          {/* Distribution - flat */}
          <rect x="530" y="200" width="140" height="90" rx="6" fill="#fee2e2" className="dark:fill-gray-800" stroke="#ef4444" strokeWidth="1"/>
          <text x="600" y="220" fontSize="11" fill="currentColor" opacity="0.7" textAnchor="middle">
            {t('probDistribution')}
          </text>

          {/* Bar chart - flat */}
          <rect x="545" y="240" width="15" height="10" fill="#ef4444" opacity="0.6"/>
          <rect x="565" y="237" width="15" height="13" fill="#ef4444" opacity="0.7"/>
          <rect x="585" y="235" width="15" height="15" fill="#ef4444" opacity="0.8"/>
          <rect x="605" y="237" width="15" height="13" fill="#ef4444" opacity="0.7"/>
          <rect x="625" y="240" width="15" height="10" fill="#ef4444" opacity="0.6"/>

          {/* Example output */}
          <rect x="520" y="310" width="160" height="120" rx="8" fill="#fee2e2" className="dark:fill-gray-900" stroke="#ef4444" strokeWidth="1.5"/>
          <text x="600" y="330" fontSize="12" fontWeight="bold" fill="currentColor" textAnchor="middle">
            {t('exampleOutput')}
          </text>
          <text x="600" y="350" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('highExample1')}
          </text>
          <text x="600" y="370" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('highExample2')}
          </text>
          <text x="600" y="390" fontSize="11" fill="currentColor" textAnchor="middle">
            {t('highExample3')}
          </text>
          <text x="600" y="415" fontSize="10" fontStyle="italic" fill="#ef4444" textAnchor="middle">
            {t('highNote')}
          </text>
        </g>
      </svg>
    </div>
  );
}
