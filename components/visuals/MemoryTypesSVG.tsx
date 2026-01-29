'use client';

import React from 'react';

export function MemoryTypesSVG({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 700 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="350" y="35" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Memory Types
        </text>

        {/* Left panel - Short-Term Memory */}
        <rect x="40" y="70" width="280" height="280" rx="12" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>

        <text x="180" y="105" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Short-Term Memory
        </text>
        <text x="180" y="125" fontSize="12" fill="currentColor" opacity="0.7" textAnchor="middle">
          (Conversation Window)
        </text>

        {/* Message bubbles - newest to oldest */}
        <rect x="60" y="150" width="240" height="40" rx="8" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5"/>
        <text x="180" y="174" fontSize="12" fill="currentColor" textAnchor="middle">Message 5 (newest)</text>

        <rect x="60" y="200" width="240" height="40" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1.5"/>
        <text x="180" y="224" fontSize="12" fill="currentColor" textAnchor="middle">Message 4</text>

        <rect x="60" y="250" width="240" height="40" rx="8" fill="#9333ea" fillOpacity="0.2" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3,3"/>
        <text x="180" y="274" fontSize="12" fill="currentColor" opacity="0.5" textAnchor="middle">Message 3 (fading...)</text>

        {/* Properties */}
        <text x="180" y="310" fontSize="11" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
          ⚡ Limited: last N messages
        </text>
        <text x="180" y="328" fontSize="11" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
          🚀 Fast access
        </text>

        {/* Right panel - Long-Term Memory */}
        <rect x="380" y="70" width="280" height="280" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2"/>

        <text x="520" y="105" fontSize="16" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Long-Term Memory
        </text>
        <text x="520" y="125" fontSize="12" fill="currentColor" opacity="0.7" textAnchor="middle">
          (Database)
        </text>

        {/* Database items */}
        <g>
          <circle cx="420" cy="165" r="8" fill="#9333ea"/>
          <text x="440" y="170" fontSize="12" fill="currentColor">Facts & Knowledge</text>
        </g>

        <g>
          <circle cx="420" cy="195" r="8" fill="#14b8a6"/>
          <text x="440" y="200" fontSize="12" fill="currentColor">User Preferences</text>
        </g>

        <g>
          <circle cx="420" cy="225" r="8" fill="#f59e0b"/>
          <text x="440" y="230" fontSize="12" fill="currentColor">Conversation History</text>
        </g>

        <g>
          <circle cx="420" cy="255" r="8" fill="#10b981"/>
          <text x="440" y="260" fontSize="12" fill="currentColor">Learned Patterns</text>
        </g>

        {/* Database icon */}
        <rect x="460" y="275" width="120" height="15" rx="3" fill="#3b82f6" fillOpacity="0.3"/>
        <rect x="460" y="295" width="120" height="15" rx="3" fill="#3b82f6" fillOpacity="0.3"/>
        <rect x="460" y="315" width="120" height="15" rx="3" fill="#3b82f6" fillOpacity="0.3"/>

        {/* Properties */}
        <text x="520" y="310" fontSize="11" fontWeight="bold" fill="#3b82f6" textAnchor="middle">
          ♾️ Unlimited storage
        </text>
        <text x="520" y="328" fontSize="11" fontWeight="bold" fill="#3b82f6" textAnchor="middle">
          🔍 Search needed
        </text>

        {/* Bidirectional arrow between panels */}
        <path d="M 330 200 L 370 200" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-right)"/>
        <path d="M 370 220 L 330 220" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow-left)"/>

        <defs>
          <marker id="arrow-right" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
          <marker id="arrow-left" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#3b82f6"/>
          </marker>
        </defs>

        <text x="350" y="193" fontSize="10" fill="currentColor" textAnchor="middle">store</text>
        <text x="350" y="233" fontSize="10" fill="currentColor" textAnchor="middle">retrieve</text>
      </svg>
    </div>
  );
}
