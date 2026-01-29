'use client';

import React from 'react';

export function SecuritySVG({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 700 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="350" y="35" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          AI Security: Defense in Depth
        </text>

        {/* INPUT ZONE */}
        <g>
          <rect x="40" y="80" width="180" height="280" rx="12" fill="#ef4444" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="3"/>
          <text x="130" y="110" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">
            INPUT ZONE
          </text>

          {/* Shield */}
          <path d="M 130 130 L 110 150 L 110 180 Q 110 200, 130 210 Q 150 200, 150 180 L 150 150 Z"
                fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="130" y="173" fontSize="20" fill="#10b981" textAnchor="middle">🛡️</text>

          {/* Threat */}
          <rect x="50" y="230" width="160" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
          <text x="130" y="250" fontSize="13" fontWeight="bold" fill="#ef4444" textAnchor="middle">
            Threat
          </text>
          <text x="130" y="267" fontSize="11" fill="currentColor" textAnchor="middle">
            Prompt Injection
          </text>

          {/* Defense */}
          <rect x="50" y="295" width="160" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="130" y="315" fontSize="13" fontWeight="bold" fill="#10b981" textAnchor="middle">
            Defense
          </text>
          <text x="130" y="332" fontSize="11" fill="currentColor" textAnchor="middle">
            Input Validation
          </text>
        </g>

        {/* Arrow 1 */}
        <path d="M 220 200 L 260 200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow1)"/>
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>

        {/* MODEL ZONE */}
        <g>
          <rect x="260" y="80" width="180" height="280" rx="12" fill="#ef4444" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="3"/>
          <text x="350" y="110" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">
            MODEL ZONE
          </text>

          {/* Shield */}
          <path d="M 350 130 L 330 150 L 330 180 Q 330 200, 350 210 Q 370 200, 370 180 L 370 150 Z"
                fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="350" y="173" fontSize="20" fill="#10b981" textAnchor="middle">🛡️</text>

          {/* Threat */}
          <rect x="270" y="230" width="160" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
          <text x="350" y="250" fontSize="13" fontWeight="bold" fill="#ef4444" textAnchor="middle">
            Threat
          </text>
          <text x="350" y="267" fontSize="11" fill="currentColor" textAnchor="middle">
            Jailbreak Attempts
          </text>

          {/* Defense */}
          <rect x="270" y="295" width="160" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="350" y="315" fontSize="13" fontWeight="bold" fill="#10b981" textAnchor="middle">
            Defense
          </text>
          <text x="350" y="332" fontSize="11" fill="currentColor" textAnchor="middle">
            Guardrails
          </text>
        </g>

        {/* Arrow 2 */}
        <path d="M 440 200 L 480 200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow2)"/>
        <defs>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>

        {/* OUTPUT ZONE */}
        <g>
          <rect x="480" y="80" width="180" height="280" rx="12" fill="#ef4444" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="3"/>
          <text x="570" y="110" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">
            OUTPUT ZONE
          </text>

          {/* Shield */}
          <path d="M 570 130 L 550 150 L 550 180 Q 550 200, 570 210 Q 590 200, 590 180 L 590 150 Z"
                fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="570" y="173" fontSize="20" fill="#10b981" textAnchor="middle">🛡️</text>

          {/* Threat */}
          <rect x="490" y="230" width="160" height="50" rx="6" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
          <text x="570" y="250" fontSize="13" fontWeight="bold" fill="#ef4444" textAnchor="middle">
            Threat
          </text>
          <text x="570" y="267" fontSize="11" fill="currentColor" textAnchor="middle">
            Data Leakage
          </text>

          {/* Defense */}
          <rect x="490" y="295" width="160" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
          <text x="570" y="315" fontSize="13" fontWeight="bold" fill="#10b981" textAnchor="middle">
            Defense
          </text>
          <text x="570" y="332" fontSize="11" fill="currentColor" textAnchor="middle">
            Output Filtering
          </text>
        </g>

        {/* Bottom summary */}
        <rect x="100" y="385" width="500" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
        <text x="350" y="408" fontSize="14" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Layered Security Approach
        </text>
        <text x="350" y="426" fontSize="12" fill="currentColor" opacity="0.8" textAnchor="middle">
          Multiple defense layers protect against different attack vectors
        </text>
      </svg>
    </div>
  );
}
