'use client';

import { useTranslations } from 'next-intl';

export function TransformersSVG() {
  const t = useTranslations('visuals.transformers');

  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('title')}
        </text>

        <text x="400" y="55" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.7">
          {t('subtitle')}
        </text>

        {/* Input Layer */}
        <g id="input">
          <rect x="300" y="80" width="200" height="40" fill="#e5e7eb" className="dark:fill-gray-700" stroke="#6b7280" strokeWidth="2" rx="6"/>
          <text x="400" y="105" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
            {t('inputText')}
          </text>
          <text x="520" y="105" fontSize="12" fill="currentColor" opacity="0.7">{`"Hello world"`}</text>
        </g>

        {/* Arrow down */}
        <defs>
          <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="5" refY="8" orient="auto">
            <polygon points="0 0, 10 0, 5 8" fill="#6b7280" />
          </marker>
          <marker id="arrow-emerald" markerWidth="10" markerHeight="10" refX="5" refY="8" orient="auto">
            <polygon points="0 0, 10 0, 5 8" fill="#065f46" />
          </marker>
        </defs>
        <path d="M 400 125 L 400 145" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-down)"/>

        {/* Token Embedding */}
        <g id="embedding">
          <rect x="300" y="150" width="200" height="40" fill="#f3f4f6" className="dark:fill-gray-800" stroke="#6b7280" strokeWidth="2" rx="6"/>
          <text x="400" y="175" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
            {t('tokenEmbedding')}
          </text>
        </g>

        <path d="M 400 195 L 400 215" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-down)"/>

        {/* Transformer Blocks Container */}
        <rect x="250" y="220" width="300" height="260" fill="#f0fdf4" className="dark:fill-emerald-950" stroke="#065f46" strokeWidth="3" rx="8" strokeDasharray="5,5"/>
        <text x="400" y="245" fontSize="13" fontWeight="600" textAnchor="middle" fill="#065f46">
          {t('blocksLabel')}
        </text>

        {/* Block 1 */}
        <g id="block1">
          <rect x="270" y="255" width="260" height="60" fill="#d1fae5" className="dark:fill-emerald-900" stroke="#065f46" strokeWidth="2" rx="6"/>

          {/* Multi-Head Attention */}
          <rect x="285" y="265" width="230" height="20" fill="#10b981" stroke="#065f46" strokeWidth="1.5" rx="3"/>
          <text x="400" y="280" fontSize="12" fontWeight="600" textAnchor="middle" fill="white">
            {t('multiHeadAttention')}
          </text>

          {/* Feed-Forward */}
          <rect x="285" y="290" width="230" height="20" fill="#f3f4f6" className="dark:fill-gray-700" stroke="#6b7280" strokeWidth="1.5" rx="3"/>
          <text x="400" y="304" fontSize="11" fontWeight="600" textAnchor="middle" fill="currentColor">
            {t('feedForward')}
          </text>
        </g>

        <path d="M 400 320 L 400 335" stroke="#065f46" strokeWidth="2" markerEnd="url(#arrow-emerald)"/>

        {/* Block 2 */}
        <g id="block2">
          <rect x="270" y="340" width="260" height="60" fill="#d1fae5" className="dark:fill-emerald-900" stroke="#065f46" strokeWidth="2" rx="6"/>

          <rect x="285" y="350" width="230" height="20" fill="#10b981" stroke="#065f46" strokeWidth="1.5" rx="3"/>
          <text x="400" y="365" fontSize="12" fontWeight="600" textAnchor="middle" fill="white">
            {t('multiHeadAttention')}
          </text>

          <rect x="285" y="375" width="230" height="20" fill="#f3f4f6" className="dark:fill-gray-700" stroke="#6b7280" strokeWidth="1.5" rx="3"/>
          <text x="400" y="389" fontSize="11" fontWeight="600" textAnchor="middle" fill="currentColor">
            {t('feedForward')}
          </text>
        </g>

        <path d="M 400 405 L 400 420" stroke="#065f46" strokeWidth="2" markerEnd="url(#arrow-emerald)"/>

        {/* Ellipsis for more blocks */}
        <text x="400" y="445" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#065f46">
          ⋮
        </text>

        <text x="400" y="470" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.7">
          {t('repeatedN')}
        </text>

        <path d="M 400 485 L 400 505" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-down)"/>

        {/* Output Probabilities */}
        <g id="output-probs">
          <rect x="300" y="510" width="200" height="40" fill="#f3f4f6" className="dark:fill-gray-800" stroke="#6b7280" strokeWidth="2" rx="6"/>
          <text x="400" y="535" fontSize="14" fontWeight="600" textAnchor="middle" fill="currentColor">
            {t('outputProbs')}
          </text>
        </g>

        <path d="M 400 555 L 400 575" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow-down)"/>

        {/* Next Token */}
        <g id="next-token">
          <rect x="300" y="580" width="200" height="15" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
          <text x="400" y="592" fontSize="12" fontWeight="bold" textAnchor="middle" fill="white">
            {t('nextToken')}
          </text>
        </g>

        {/* Side annotations */}
        <g id="annotations">
          <text x="580" y="285" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationAttention1')}
          </text>
          <text x="580" y="302" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationAttention2')}
          </text>

          <text x="580" y="365" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationFF1')}
          </text>
          <text x="580" y="382" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationFF2')}
          </text>

          <text x="580" y="530" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationOutput1')}
          </text>
          <text x="580" y="547" fontSize="12" fill="currentColor" opacity="0.8">
            {t('annotationOutput2')}
          </text>
        </g>

        {/* Key insight box */}
        <rect x="50" y="510" width="220" height="85" fill="#fef3c7" className="dark:fill-yellow-950" stroke="#f59e0b" strokeWidth="2" rx="6"/>
        <text x="160" y="530" fontSize="13" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('keyInnovation')}
        </text>
        <text x="60" y="550" fontSize="11" fill="currentColor">
          {t('innovation1')}
        </text>
        <text x="60" y="565" fontSize="11" fill="currentColor">
          {t('innovation2')}
        </text>
        <text x="60" y="580" fontSize="11" fill="currentColor">
          {t('innovation3')}
        </text>
        <text x="60" y="593" fontSize="11" fill="currentColor">
          {t('innovation3b')}
        </text>
      </svg>
    </div>
  );
}
