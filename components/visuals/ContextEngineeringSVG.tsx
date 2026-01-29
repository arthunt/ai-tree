'use client';

import React from 'react';

export function ContextEngineeringSVG({ className = '' }: { className?: string }) {
  return (
    <div className={`${className} text-gray-900 dark:text-gray-100`}>
      <svg viewBox="0 0 600 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Background */}
        <rect x="0" y="0" width="600" height="500" fill="transparent" />

        {/* Title */}
        <text x="300" y="30" fontSize="22" fontWeight="bold" fill="currentColor" textAnchor="middle">
          Prompt Anatomy
        </text>

        {/* System Role - Purple */}
        <rect x="80" y="60" width="440" height="70" rx="8" fill="#9333ea" fillOpacity="0.2" stroke="#9333ea" strokeWidth="2"/>
        <circle cx="110" cy="95" r="18" fill="#9333ea" fillOpacity="0.3"/>
        <text x="110" y="100" fontSize="16" fill="#9333ea" textAnchor="middle" fontWeight="bold">S</text>
        <text x="145" y="85" fontSize="14" fontWeight="bold" fill="currentColor">System Role</text>
        <text x="145" y="105" fontSize="12" fill="currentColor" opacity="0.8">You are an expert data analyst...</text>

        {/* Rules & Constraints - Blue */}
        <rect x="80" y="145" width="440" height="70" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="110" cy="180" r="18" fill="#3b82f6" fillOpacity="0.3"/>
        <text x="110" y="185" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">R</text>
        <text x="145" y="170" fontSize="14" fontWeight="bold" fill="currentColor">Rules & Constraints</text>
        <text x="145" y="190" fontSize="12" fill="currentColor" opacity="0.8">Only use data from 2024. Be concise.</text>

        {/* Output Format - Teal */}
        <rect x="80" y="230" width="440" height="70" rx="8" fill="#14b8a6" fillOpacity="0.2" stroke="#14b8a6" strokeWidth="2"/>
        <circle cx="110" cy="265" r="18" fill="#14b8a6" fillOpacity="0.3"/>
        <text x="110" y="270" fontSize="16" fill="#14b8a6" textAnchor="middle" fontWeight="bold">F</text>
        <text x="145" y="255" fontSize="14" fontWeight="bold" fill="currentColor">Output Format</text>
        <text x="145" y="275" fontSize="12" fill="currentColor" opacity="0.8">Return JSON: {`{result: ..., confidence: ...}`}</text>

        {/* Examples - Amber */}
        <rect x="80" y="315" width="440" height="70" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
        <circle cx="110" cy="350" r="18" fill="#f59e0b" fillOpacity="0.3"/>
        <text x="110" y="355" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">E</text>
        <text x="145" y="340" fontSize="14" fontWeight="bold" fill="currentColor">Examples / Few-shot</text>
        <text x="145" y="360" fontSize="12" fill="currentColor" opacity="0.8">{`Input: "Q1 sales" → Output: {...}`}</text>

        {/* User Query - Green */}
        <rect x="80" y="400" width="440" height="50" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
        <circle cx="110" cy="425" r="18" fill="#10b981" fillOpacity="0.3"/>
        <text x="110" y="430" fontSize="16" fill="#10b981" textAnchor="middle" fontWeight="bold">Q</text>
        <text x="145" y="430" fontSize="14" fontWeight="bold" fill="currentColor">{`User Query: "Analyze Q4 performance"`}</text>

        {/* Arrow and conclusion */}
        <path d="M 300 460 L 300 485" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)"/>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
            <polygon points="0 0, 10 5, 0 10" fill="#f59e0b"/>
          </marker>
        </defs>
        <text x="300" y="498" fontSize="13" fontWeight="bold" fill="#f59e0b" textAnchor="middle">
          Better context = Better output
        </text>
      </svg>
    </div>
  );
}
