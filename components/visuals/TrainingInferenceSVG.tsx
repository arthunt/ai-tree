'use client';

export function TrainingInferenceSVG() {
  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          Training vs Inference — School vs Work
        </text>

        {/* TRAINING Column */}
        <g id="training">
          <rect x="50" y="70" width="330" height="360" fill="#fef3c7" className="dark:fill-yellow-950" stroke="#f59e0b" strokeWidth="3" rx="8"/>

          {/* Header with icon */}
          <text x="215" y="100" fontSize="28" textAnchor="middle">🎓</text>
          <text x="215" y="130" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#d97706">
            TRAINING
          </text>
          <text x="215" y="150" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.8">
            (Learning Phase)
          </text>

          {/* Stats */}
          <g id="training-stats">
            {/* Time */}
            <rect x="70" y="170" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="193" fontSize="13" fontWeight="600" fill="#78350f">Time:</text>
            <text x="260" y="193" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              Weeks to Months
            </text>

            {/* Cost */}
            <rect x="70" y="215" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="238" fontSize="13" fontWeight="600" fill="#78350f">Cost:</text>
            <text x="260" y="238" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              $2M - $100M+
            </text>

            {/* Hardware */}
            <rect x="70" y="260" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="283" fontSize="13" fontWeight="600" fill="#78350f">GPUs:</text>
            <text x="260" y="283" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              1,000s - 10,000s
            </text>

            {/* Data */}
            <rect x="70" y="305" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="328" fontSize="13" fontWeight="600" fill="#78350f">Data:</text>
            <text x="260" y="328" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              Terabytes
            </text>

            {/* Weights */}
            <rect x="70" y="350" width="280" height="35" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="4"/>
            <text x="80" y="373" fontSize="13" fontWeight="600" fill="white">Model Weights:</text>
            <text x="260" y="373" fontSize="15" fontWeight="bold" textAnchor="end" fill="white">
              CHANGING ⚡
            </text>
          </g>

          <text x="215" y="410" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            Learns patterns from billions of examples
          </text>
        </g>

        {/* INFERENCE Column */}
        <g id="inference">
          <rect x="420" y="70" width="330" height="360" fill="#d1fae5" className="dark:fill-emerald-950" stroke="#10b981" strokeWidth="3" rx="8"/>

          {/* Header with icon */}
          <text x="585" y="100" fontSize="28" textAnchor="middle">💼</text>
          <text x="585" y="130" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#065f46">
            INFERENCE
          </text>
          <text x="585" y="150" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.8">
            (Using Phase)
          </text>

          {/* Stats */}
          <g id="inference-stats">
            {/* Time */}
            <rect x="440" y="170" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="193" fontSize="13" fontWeight="600" fill="#064e3b">Time:</text>
            <text x="630" y="193" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              Milliseconds
            </text>

            {/* Cost */}
            <rect x="440" y="215" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="238" fontSize="13" fontWeight="600" fill="#064e3b">Cost:</text>
            <text x="630" y="238" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              $0.002 per query
            </text>

            {/* Hardware */}
            <rect x="440" y="260" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="283" fontSize="13" fontWeight="600" fill="#064e3b">GPUs:</text>
            <text x="630" y="283" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              1 - 8
            </text>

            {/* Data */}
            <rect x="440" y="305" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="328" fontSize="13" fontWeight="600" fill="#064e3b">Data:</text>
            <text x="630" y="328" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              Your prompt
            </text>

            {/* Weights */}
            <rect x="440" y="350" width="280" height="35" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
            <text x="450" y="373" fontSize="13" fontWeight="600" fill="white">Model Weights:</text>
            <text x="630" y="373" fontSize="15" fontWeight="bold" textAnchor="end" fill="white">
              FROZEN 🔒
            </text>
          </g>

          <text x="585" y="410" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            Uses learned patterns to answer your questions
          </text>
        </g>

        {/* Bottom explanation */}
        <rect x="50" y="450" width="700" height="40" fill="#f0fdf4" className="dark:fill-gray-800" stroke="#10b981" strokeWidth="2" rx="6"/>
        <text x="400" y="475" fontSize="13" fontWeight="600" textAnchor="middle" fill="currentColor">
          Training happens once (expensive). Inference happens millions of times per day (cheap &amp; fast).
        </text>
      </svg>
    </div>
  );
}
