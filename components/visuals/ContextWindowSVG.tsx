'use client';

export function ContextWindowSVG() {
  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Context Window — Working Memory
        </text>

        {/* Main context window visualization */}
        <g id="window">
          <text x="50" y="75" fontSize="14" fill="currentColor" opacity="0.7">
            Token Flow:
          </text>

          {/* Forgotten zone (grayed out) */}
          <rect x="50" y="90" width="100" height="60" fill="#e5e7eb" className="dark:fill-gray-700" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" rx="4"/>
          <text x="100" y="120" fontSize="13" fontWeight="600" textAnchor="middle" fill="#6b7280">
            Forgotten
          </text>
          <text x="100" y="138" fontSize="11" textAnchor="middle" fill="#6b7280">
            Past limit
          </text>

          {/* Active context (colored) */}
          <rect x="160" y="90" width="380" height="60" fill="#10b981" stroke="#065f46" strokeWidth="3" rx="4"/>
          <text x="350" y="115" fontSize="15" fontWeight="bold" textAnchor="middle" fill="white">
            ACTIVE CONTEXT
          </text>
          <text x="350" y="135" fontSize="12" textAnchor="middle" fill="white" opacity="0.9">
            {`Model can "see" and use this`}
          </text>

          {/* Available space (empty) */}
          <rect x="550" y="90" width="200" height="60" fill="#f3f4f6" className="dark:fill-gray-800" stroke="#6b7280" strokeWidth="2" strokeDasharray="3,3" rx="4"/>
          <text x="650" y="120" fontSize="13" fontWeight="600" textAnchor="middle" fill="#6b7280">
            Available
          </text>
          <text x="650" y="138" fontSize="11" textAnchor="middle" fill="#6b7280">
            Space left
          </text>
        </g>

        {/* Arrow showing direction */}
        <defs>
          <marker id="arrow-flow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#065f46" />
          </marker>
        </defs>
        <path d="M 160 175 L 540 175" stroke="#065f46" strokeWidth="2" markerEnd="url(#arrow-flow)"/>
        <text x="350" y="195" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.7">
          Tokens flow through window →
        </text>

        {/* Model comparisons */}
        <text x="400" y="230" fontSize="16" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Context Window Sizes by Model
        </text>

        {/* GPT-3.5 */}
        <g id="gpt35">
          <rect x="80" y="250" width="140" height="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" rx="4"/>
          <text x="150" y="268" fontSize="13" fontWeight="600" textAnchor="middle" fill="#991b1b">
            GPT-3.5
          </text>
          <text x="150" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#dc2626">
            4K tokens
          </text>
        </g>

        {/* GPT-4 */}
        <g id="gpt4">
          <rect x="240" y="250" width="140" height="40" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" rx="4"/>
          <text x="310" y="268" fontSize="13" fontWeight="600" textAnchor="middle" fill="#9a3412">
            GPT-4
          </text>
          <text x="310" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#ea580c">
            8K tokens
          </text>
        </g>

        {/* GPT-4 Turbo */}
        <g id="gpt4turbo">
          <rect x="400" y="250" width="140" height="40" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" rx="4"/>
          <text x="470" y="268" fontSize="13" fontWeight="600" textAnchor="middle" fill="#713f12">
            GPT-4 Turbo
          </text>
          <text x="470" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#ca8a04">
            128K tokens
          </text>
        </g>

        {/* Claude */}
        <g id="claude">
          <rect x="560" y="250" width="140" height="40" fill="#d1fae5" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="630" y="268" fontSize="13" fontWeight="600" textAnchor="middle" fill="#064e3b">
            Claude 3
          </text>
          <text x="630" y="285" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#065f46">
            200K tokens
          </text>
        </g>

        {/* Visual scale */}
        <text x="400" y="315" fontSize="12" fontWeight="600" textAnchor="middle" fill="currentColor" opacity="0.7">
          Visual scale (1K = 1px width):
        </text>

        <rect x="80" y="325" width="4" height="15" fill="#dc2626"/>
        <rect x="240" y="325" width="8" height="15" fill="#ea580c"/>
        <rect x="400" y="325" width="128" height="15" fill="#ca8a04"/>
        <rect x="560" y="325" width="200" height="15" fill="#065f46"/>

        {/* Bottom explanation */}
        <rect x="50" y="360" width="700" height="30" fill="#f0fdf4" className="dark:fill-gray-800" stroke="#065f46" strokeWidth="2" rx="6"/>
        <text x="400" y="382" fontSize="13" textAnchor="middle" fill="currentColor" opacity="0.9">
          Think of it like RAM: larger context = can remember more of your conversation, but costs more and runs slower.
        </text>
      </svg>
    </div>
  );
}
