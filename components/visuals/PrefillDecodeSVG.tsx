'use client';

export function PrefillDecodeSVG() {
  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Prefill vs Decode — Reading vs Writing
        </text>

        {/* Prefill Phase */}
        <g id="prefill">
          <rect x="50" y="70" width="320" height="180" fill="#d1fae5" className="dark:fill-emerald-900" stroke="#065f46" strokeWidth="3" rx="8"/>

          <text x="210" y="100" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#065f46">
            PREFILL — Reading
          </text>

          {/* Tokens processed in parallel */}
          <rect x="70" y="120" width="60" height="40" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="100" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">Write</text>

          <rect x="140" y="120" width="60" height="40" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="170" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">me</text>

          <rect x="210" y="120" width="60" height="40" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="240" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">a</text>

          <rect x="280" y="120" width="60" height="40" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="310" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">story</text>

          {/* Parallel arrows */}
          <path d="M 100 165 L 100 185" stroke="#065f46" strokeWidth="3" markerEnd="url(#arrow-green)"/>
          <path d="M 170 165 L 170 185" stroke="#065f46" strokeWidth="3" markerEnd="url(#arrow-green)"/>
          <path d="M 240 165 L 240 185" stroke="#065f46" strokeWidth="3" markerEnd="url(#arrow-green)"/>
          <path d="M 310 165 L 310 185" stroke="#065f46" strokeWidth="3" markerEnd="url(#arrow-green)"/>

          <text x="210" y="205" fontSize="14" fontWeight="600" textAnchor="middle" fill="#065f46">
            All processed at once
          </text>

          <text x="210" y="230" fontSize="13" textAnchor="middle" fill="currentColor">
            ⚡ Fast &amp; Parallel
          </text>
          <text x="210" y="248" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            ~50ms for 100 tokens
          </text>
        </g>

        {/* Decode Phase */}
        <g id="decode">
          <rect x="430" y="70" width="320" height="180" fill="#fef3c7" className="dark:fill-yellow-900" stroke="#d97706" strokeWidth="3" rx="8"/>

          <text x="590" y="100" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#d97706">
            DECODE — Writing
          </text>

          {/* Sequential token generation */}
          <rect x="450" y="120" width="60" height="40" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="4"/>
          <text x="480" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">Once</text>

          <path d="M 515 140 L 535 140" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow-orange)"/>

          <rect x="540" y="120" width="60" height="40" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="4"/>
          <text x="570" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">upon</text>

          <path d="M 605 140 L 625 140" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow-orange)"/>

          <rect x="630" y="120" width="60" height="40" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="4"/>
          <text x="660" y="145" fontSize="14" fontWeight="600" textAnchor="middle" fill="white">a</text>

          <path d="M 695 140 L 715 140" stroke="#d97706" strokeWidth="3" markerEnd="url(#arrow-orange)"/>

          <text x="730" y="145" fontSize="20" textAnchor="middle" fill="#d97706">...</text>

          <text x="590" y="180" fontSize="14" fontWeight="600" textAnchor="middle" fill="#d97706">
            One token at a time
          </text>

          <text x="590" y="205" fontSize="13" textAnchor="middle" fill="currentColor">
            🐢 Sequential
          </text>
          <text x="590" y="223" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            ~50ms per token
          </text>
          <text x="590" y="239" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            (100 tokens = 5 seconds)
          </text>
        </g>

        {/* Arrow markers */}
        <defs>
          <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#065f46" />
          </marker>
          <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#d97706" />
          </marker>
        </defs>

        {/* Bottom explanation */}
        <rect x="50" y="280" width="700" height="90" fill="#f0fdf4" className="dark:fill-gray-800" stroke="#065f46" strokeWidth="2" rx="8"/>
        <text x="400" y="310" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">
          Why This Matters
        </text>
        <text x="400" y="335" fontSize="13" textAnchor="middle" fill="currentColor" opacity="0.8">
          Prefill processes your entire prompt instantly (parallel). Decode generates each new word one-by-one (sequential).
        </text>
        <text x="400" y="358" fontSize="13" textAnchor="middle" fill="currentColor" opacity="0.8">
          This is why long responses take time, even though reading your question is instant.
        </text>
      </svg>
    </div>
  );
}
