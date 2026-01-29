'use client';

export function AttentionSVG() {
  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Attention Mechanism — Focus
        </text>

        {/* Sentence tokens */}
        <text x="50" y="80" fontSize="14" fill="currentColor" opacity="0.7">
          Input sentence:
        </text>

        {/* Token boxes */}
        <g id="tokens">
          <rect x="50" y="100" width="80" height="50" fill="#d1fae5" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="90" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#065f46">Mari</text>

          <rect x="150" y="100" width="80" height="50" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <text x="190" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#374151">läks</text>

          <rect x="250" y="100" width="80" height="50" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <text x="290" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#374151">poodi</text>

          <rect x="350" y="100" width="50" height="50" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <text x="375" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#374151">ja</text>

          <rect x="420" y="100" width="60" height="50" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="4"/>
          <text x="450" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#d97706">ta</text>

          <rect x="500" y="100" width="80" height="50" fill="#d1fae5" stroke="#059669" strokeWidth="2" rx="4"/>
          <text x="540" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#059669">ostis</text>

          <rect x="600" y="100" width="80" height="50" fill="#f3f4f6" stroke="#6b7280" strokeWidth="2" rx="4"/>
          <text x="640" y="130" fontSize="16" fontWeight="600" textAnchor="middle" fill="#374151">piima</text>
        </g>

        {/* Attention arrows */}
        <defs>
          <marker id="arrowhead-strong" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#065f46" />
          </marker>
          <marker id="arrowhead-medium" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#059669" />
          </marker>
        </defs>

        {/* Current word: "ta" */}
        <text x="400" y="190" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
          When processing "ta" (it/she/he):
        </text>

        {/* Strong attention: ta → Mari */}
        <path d="M 450 150 Q 450 220 90 150"
              fill="none"
              stroke="#065f46"
              strokeWidth="4"
              opacity="0.8"
              markerEnd="url(#arrowhead-strong)"/>
        <text x="250" y="240" fontSize="13" fill="#065f46" fontWeight="600">
          Strong (95%) — refers to Mari
        </text>

        {/* Medium attention: ta → ostis */}
        <path d="M 460 150 Q 490 200 540 150"
              fill="none"
              stroke="#059669"
              strokeWidth="3"
              opacity="0.7"
              markerEnd="url(#arrowhead-medium)"/>
        <text x="480" y="210" fontSize="13" fill="#059669" fontWeight="600">
          Medium (72%)
        </text>

        {/* Explanation box */}
        <rect x="50" y="280" width="700" height="100" fill="#f0fdf4" className="dark:fill-gray-800" stroke="#065f46" strokeWidth="2" rx="8"/>
        <text x="400" y="310" fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">
          Attention shows which words are important for understanding each word
        </text>
        <text x="400" y="335" fontSize="13" textAnchor="middle" fill="currentColor" opacity="0.8">
          "ta" (it/she) pays strong attention to "Mari" to know who is being referred to.
        </text>
        <text x="400" y="360" fontSize="13" textAnchor="middle" fill="currentColor" opacity="0.8">
          Arrow thickness = attention strength. This helps the model understand relationships.
        </text>
      </svg>
    </div>
  );
}
