'use client';

import React from 'react';
import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function McpArchitectureSVG({ className = '' }: { className?: string }) {
  const t = useTranslations('visuals.mcpArchitecture');

  return (
    <div className={`text-gray-900 dark:text-gray-100 ${className}`}>
      <svg
        viewBox="0 0 500 320"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Title */}
        <text x="250" y="25" textAnchor="middle" fontSize="18" fontWeight="600" fill="currentColor">
          {t('title')}
        </text>

        {/* BEFORE MCP (Left side) */}
        <text x="125" y="55" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">
          {t('beforeMcp')}
        </text>

        {/* AI box (left) */}
        <rect x="95" y="75" width="60" height="50" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="125" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">AI</text>

        {/* Tools (left side) */}
        <rect x="30" y="160" width="50" height="35" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="55" y="182" textAnchor="middle" fontSize="11" fill="currentColor">DB1</text>

        <rect x="90" y="160" width="50" height="35" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="115" y="182" textAnchor="middle" fontSize="11" fill="currentColor">DB2</text>

        <rect x="150" y="160" width="50" height="35" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="175" y="182" textAnchor="middle" fontSize="11" fill="currentColor">API1</text>

        <rect x="90" y="210" width="50" height="35" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="115" y="232" textAnchor="middle" fontSize="11" fill="currentColor">API2</text>

        {/* Spaghetti connections */}
        <path d="M 125 125 Q 55 140 55 160" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M 125 125 Q 115 140 115 160" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M 125 125 Q 175 140 175 160" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M 125 125 Q 115 165 115 210" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />

        <text x="125" y="270" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
          {t('customIntegration')}
        </text>
        <text x="125" y="285" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
          {t('forEachTool')}
        </text>

        {/* Divider */}
        <line x1="240" y1="50" x2="240" y2="290" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />

        {/* AFTER MCP (Right side) */}
        <text x="365" y="55" textAnchor="middle" fontSize="14" fontWeight="600" fill="currentColor">
          {t('afterMcp')}
        </text>

        {/* AI box (right) */}
        <rect x="335" y="75" width="60" height="50" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="365" y="105" textAnchor="middle" fontSize="13" fontWeight="600" fill="#3b82f6">AI</text>

        {/* Single clean connection to MCP */}
        <line x1="365" y1="125" x2="365" y2="150" stroke="#3b82f6" strokeWidth="3" />

        {/* MCP Server hub */}
        <rect x="325" y="150" width="80" height="40" rx="6" fill="#3b82f6" fillOpacity="0.9" stroke="#3b82f6" strokeWidth="2" />
        <text x="365" y="175" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">
          {t('mcpServer')}
        </text>

        {/* Clean hub-and-spoke to tools */}
        <rect x="280" y="215" width="50" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="305" y="234" textAnchor="middle" fontSize="10" fill="currentColor">DB1</text>

        <rect x="340" y="215" width="50" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="365" y="234" textAnchor="middle" fontSize="10" fill="currentColor">DB2</text>

        <rect x="400" y="215" width="50" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="425" y="234" textAnchor="middle" fontSize="10" fill="currentColor">API1</text>

        <rect x="340" y="255" width="50" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
        <text x="365" y="274" textAnchor="middle" fontSize="10" fill="currentColor">API2</text>

        {/* Clean connections */}
        <line x1="345" y1="190" x2="305" y2="215" stroke="#3b82f6" strokeWidth="2" />
        <line x1="365" y1="190" x2="365" y2="215" stroke="#3b82f6" strokeWidth="2" />
        <line x1="385" y1="190" x2="425" y2="215" stroke="#3b82f6" strokeWidth="2" />
        <line x1="365" y1="190" x2="365" y2="255" stroke="#3b82f6" strokeWidth="2" />

        {/* Bottom label */}
        <rect x="270" y="300" width="190" height="15" rx="4" fill="#3b82f6" fillOpacity="0.1" />
        <text x="365" y="311" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3b82f6">
          {t('analogy')}
        </text>
      </svg>
    </div>
  );
}
