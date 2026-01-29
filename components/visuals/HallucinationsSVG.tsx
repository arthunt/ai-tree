'use client';

export function HallucinationsSVG() {
  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 450" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Hallucinations — Confident Fabrications
        </text>

        {/* Problem statement */}
        <text x="400" y="60" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor" opacity="0.8">
          Both responses look equally confident, but one is completely wrong!
        </text>

        {/* WRONG Response Box */}
        <g id="wrong">
          <rect x="50" y="80" width="330" height="180" fill="#fee2e2" className="dark:fill-red-950" stroke="#dc2626" strokeWidth="3" rx="8"/>

          <text x="215" y="105" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            ❌ HALLUCINATION
          </text>

          <text x="70" y="135" fontSize="13" fontWeight="600" fill="currentColor">
            Q: Who built the Eiffel Tower?
          </text>

          <text x="70" y="160" fontSize="13" fill="currentColor">
            A: The Eiffel Tower was built in
          </text>

          {/* Wrong facts with strikethrough effect */}
          <text x="70" y="180" fontSize="13" fontWeight="600" fill="#dc2626">
            1887 by Claude Monet
          </text>
          <line x1="70" y1="177" x2="200" y2="177" stroke="#dc2626" strokeWidth="2"/>

          <text x="70" y="200" fontSize="13" fill="currentColor">
            as part of the World's Fair in Paris.
          </text>

          {/* Confidence bar */}
          <rect x="70" y="220" width="280" height="25" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" rx="4"/>
          <rect x="70" y="220" width="263" height="25" fill="#dc2626" rx="4"/>
          <text x="210" y="238" fontSize="13" fontWeight="bold" textAnchor="middle" fill="white">
            Confidence: 94%
          </text>
        </g>

        {/* CORRECT Response Box */}
        <g id="correct">
          <rect x="420" y="80" width="330" height="180" fill="#d1fae5" className="dark:fill-emerald-950" stroke="#10b981" strokeWidth="3" rx="8"/>

          <text x="585" y="105" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#10b981">
            ✓ CORRECT
          </text>

          <text x="440" y="135" fontSize="13" fontWeight="600" fill="currentColor">
            Q: Who built the Eiffel Tower?
          </text>

          <text x="440" y="160" fontSize="13" fill="currentColor">
            A: The Eiffel Tower was built in
          </text>

          {/* Correct facts */}
          <text x="440" y="180" fontSize="13" fontWeight="600" fill="#10b981">
            1889 by Gustave Eiffel
          </text>

          <text x="440" y="200" fontSize="13" fill="currentColor">
            as part of the World's Fair in Paris.
          </text>

          {/* Confidence bar */}
          <rect x="440" y="220" width="280" height="25" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" rx="4"/>
          <rect x="440" y="220" width="269" height="25" fill="#10b981" rx="4"/>
          <text x="580" y="238" fontSize="13" fontWeight="bold" textAnchor="middle" fill="white">
            Confidence: 96%
          </text>
        </g>

        {/* Comparison arrow */}
        <text x="400" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="currentColor">
          ⚠️ The Problem: Same confidence level!
        </text>

        {/* Explanation box */}
        <rect x="50" y="300" width="700" height="130" fill="#fef3c7" className="dark:fill-yellow-950" stroke="#f59e0b" strokeWidth="2" rx="8"/>

        <text x="400" y="325" fontSize="15" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Why Hallucinations Happen
        </text>

        <text x="70" y="350" fontSize="13" fill="currentColor">
          • LLMs generate text based on patterns, not facts from a database
        </text>

        <text x="70" y="372" fontSize="13" fill="currentColor">
          • They don't know when they're making things up — they just predict likely next words
        </text>

        <text x="70" y="394" fontSize="13" fill="currentColor">
          • High confidence ≠ accurate. The model can be very confident about wrong information
        </text>

        <text x="70" y="416" fontSize="13" fontWeight="600" fill="#d97706">
          ✓ Always verify important facts, especially dates, names, and technical details!
        </text>
      </svg>
    </div>
  );
}
