'use client';

import { useParaglideTranslations as useTranslations } from '@/hooks/useParaglideTranslations';

export function TrainingInferenceSVG() {
  const t = useTranslations('visuals.trainingInference');

  return (
    <div className="w-full text-gray-900 dark:text-gray-100">
      <svg viewBox="0 0 800 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="400" y="30" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">
          {t('title')}
        </text>

        {/* TRAINING Column */}
        <g id="training">
          <rect x="50" y="70" width="330" height="360" fill="#fef3c7" className="dark:fill-yellow-950" stroke="#f59e0b" strokeWidth="3" rx="8"/>

          {/* Header with icon */}
          <text x="215" y="100" fontSize="28" textAnchor="middle">🎓</text>
          <text x="215" y="130" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#d97706">
            {t('trainingTitle')}
          </text>
          <text x="215" y="150" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.8">
            {t('trainingPhase')}
          </text>

          {/* Stats */}
          <g id="training-stats">
            {/* Time */}
            <rect x="70" y="170" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="193" fontSize="13" fontWeight="600" fill="#78350f">{t('time')}:</text>
            <text x="260" y="193" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              {t('trainingTime')}
            </text>

            {/* Cost */}
            <rect x="70" y="215" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="238" fontSize="13" fontWeight="600" fill="#78350f">{t('cost')}:</text>
            <text x="260" y="238" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              {t('trainingCost')}
            </text>

            {/* Hardware */}
            <rect x="70" y="260" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="283" fontSize="13" fontWeight="600" fill="#78350f">GPUs:</text>
            <text x="260" y="283" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              {t('trainingGpus')}
            </text>

            {/* Data */}
            <rect x="70" y="305" width="280" height="35" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" rx="4"/>
            <text x="80" y="328" fontSize="13" fontWeight="600" fill="#78350f">{t('data')}:</text>
            <text x="260" y="328" fontSize="14" fontWeight="bold" textAnchor="end" fill="#78350f">
              {t('trainingData')}
            </text>

            {/* Weights */}
            <rect x="70" y="350" width="280" height="35" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="4"/>
            <text x="80" y="373" fontSize="13" fontWeight="600" fill="white">{t('modelWeights')}:</text>
            <text x="260" y="373" fontSize="15" fontWeight="bold" textAnchor="end" fill="white">
              {t('weightsChanging')}
            </text>
          </g>

          <text x="215" y="410" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            {t('trainingDesc')}
          </text>
        </g>

        {/* INFERENCE Column */}
        <g id="inference">
          <rect x="420" y="70" width="330" height="360" fill="#d1fae5" className="dark:fill-emerald-950" stroke="#10b981" strokeWidth="3" rx="8"/>

          {/* Header with icon */}
          <text x="585" y="100" fontSize="28" textAnchor="middle">💼</text>
          <text x="585" y="130" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#065f46">
            {t('inferenceTitle')}
          </text>
          <text x="585" y="150" fontSize="14" textAnchor="middle" fill="currentColor" opacity="0.8">
            {t('inferencePhase')}
          </text>

          {/* Stats */}
          <g id="inference-stats">
            {/* Time */}
            <rect x="440" y="170" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="193" fontSize="13" fontWeight="600" fill="#064e3b">{t('time')}:</text>
            <text x="630" y="193" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              {t('inferenceTime')}
            </text>

            {/* Cost */}
            <rect x="440" y="215" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="238" fontSize="13" fontWeight="600" fill="#064e3b">{t('cost')}:</text>
            <text x="630" y="238" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              {t('inferenceCost')}
            </text>

            {/* Hardware */}
            <rect x="440" y="260" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="283" fontSize="13" fontWeight="600" fill="#064e3b">GPUs:</text>
            <text x="630" y="283" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              {t('inferenceGpus')}
            </text>

            {/* Data */}
            <rect x="440" y="305" width="280" height="35" fill="#6ee7b7" stroke="#10b981" strokeWidth="2" rx="4"/>
            <text x="450" y="328" fontSize="13" fontWeight="600" fill="#064e3b">{t('data')}:</text>
            <text x="630" y="328" fontSize="14" fontWeight="bold" textAnchor="end" fill="#064e3b">
              {t('inferenceData')}
            </text>

            {/* Weights */}
            <rect x="440" y="350" width="280" height="35" fill="#10b981" stroke="#065f46" strokeWidth="2" rx="4"/>
            <text x="450" y="373" fontSize="13" fontWeight="600" fill="white">{t('modelWeights')}:</text>
            <text x="630" y="373" fontSize="15" fontWeight="bold" textAnchor="end" fill="white">
              {t('weightsFrozen')}
            </text>
          </g>

          <text x="585" y="410" fontSize="12" textAnchor="middle" fill="currentColor" opacity="0.8">
            {t('inferenceDesc')}
          </text>
        </g>

        {/* Bottom explanation */}
        <rect x="50" y="450" width="700" height="40" fill="#f0fdf4" className="dark:fill-gray-800" stroke="#10b981" strokeWidth="2" rx="6"/>
        <text x="400" y="475" fontSize="13" fontWeight="600" textAnchor="middle" fill="currentColor">
          {t('explanation')}
        </text>
      </svg>
    </div>
  );
}
