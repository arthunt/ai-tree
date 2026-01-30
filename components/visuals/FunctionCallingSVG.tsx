'use client';

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

interface FunctionCallingSVGProps {
  className?: string;
}

export function FunctionCallingSVG({ className = '' }: FunctionCallingSVGProps) {
  const t = useTranslations('visuals.functionCalling');
  return (
    <div className={`text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 450 340"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text x="225" y="25" textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">
          {t('title')}
        </text>

        {/* Lifelines */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#3b82f6" />
          </marker>
        </defs>

        {/* USER lifeline */}
        <rect x="50" y="55" width="70" height="35" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="85" y="77" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">
          {t('user')}
        </text>
        <line x1="85" y1="90" x2="85" y2="260" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />

        {/* AI MODEL lifeline */}
        <rect x="185" y="55" width="80" height="35" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="225" y="77" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">
          {t('aiModel')}
        </text>
        <line x1="225" y1="90" x2="225" y2="260" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />

        {/* FUNCTION lifeline */}
        <rect x="315" y="55" width="85" height="35" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="357.5" y="77" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">
          {t('function')}
        </text>
        <line x1="357.5" y1="90" x2="357.5" y2="260" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />

        {/* Message 1: User to AI */}
        <line x1="85" y1="110" x2="220" y2="110" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <rect x="100" y="95" width="110" height="12" fill="white" fillOpacity="0.9" />
        <text x="155" y="104" textAnchor="middle" fontSize="10" fill="currentColor">
          {t('questionExample')}
        </text>

        {/* Message 2: AI to Function (JSON) */}
        <line x1="225" y1="135" x2="350" y2="135" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <rect x="245" y="118" width="95" height="30" rx="4" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="292.5" y="130" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#f59e0b" fontWeight="600">
          {'{get_weather,'}
        </text>
        <text x="292.5" y="142" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#f59e0b" fontWeight="600">
          {'city:"Tallinn"}'}
        </text>

        {/* Message 3: Function to AI (Response) */}
        <line x1="350" y1="175" x2="225" y2="175" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <rect x="245" y="158" width="95" height="30" rx="4" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="292.5" y="170" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#f59e0b" fontWeight="600">
          {'{temp:"5°C",'}
        </text>
        <text x="292.5" y="182" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#f59e0b" fontWeight="600">
          {'rain:true}'}
        </text>

        {/* Message 4: AI to User (Natural language) */}
        <line x1="220" y1="210" x2="85" y2="210" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <rect x="100" y="195" width="115" height="12" fill="white" fillOpacity="0.9" />
        <text x="157.5" y="204" textAnchor="middle" fontSize="10" fill="currentColor">
          {t('answerExample')}
        </text>

        {/* Bottom note */}
        <line x1="50" y1="275" x2="400" y2="275" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        <rect x="80" y="290" width="290" height="38" rx="6" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="225" y="307" textAnchor="middle" fontSize="12" fontWeight="600" fill="#3b82f6">
          {t('aiGenerates')}
        </text>
        <text x="225" y="322" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
          {t('appExecutes')}
        </text>
      </svg>
    </div>
  );
}
