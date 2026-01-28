'use client';

/**
 * LevelIcon - SVG icons derived from the Dendrix logo visual language.
 *
 * Design principles:
 * - Color progression: deep navy (roots) → bright cyan (leaves), matching the logo's bottom-to-top gradient
 * - Glowing node circles taken directly from the logo's 19 nodes
 * - Visual complexity increases from roots (simple) to leaves (many nodes)
 * - Glow effects only applied at sizes >= 48px for performance
 * - All colors extracted from the original dendrix_logo.svg palette
 */

interface LevelIconProps {
  level: 'roots' | 'trunk' | 'branches' | 'leaves';
  size?: number;
  className?: string;
}

export function LevelIcon({ level, size = 48, className = '' }: LevelIconProps) {
  const withGlow = size >= 40;
  const id = `lvl-${level}-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      {level === 'roots' && <RootsIcon id={id} withGlow={withGlow} />}
      {level === 'trunk' && <TrunkIcon id={id} withGlow={withGlow} />}
      {level === 'branches' && <BranchesIcon id={id} withGlow={withGlow} />}
      {level === 'leaves' && <LeavesIcon id={id} withGlow={withGlow} />}
    </svg>
  );
}

/* ─── ROOTS: Foundation / Fundamental Mechanics ──────────────────────────────
 * Deep navy/teal. A root network spreading downward with 3 junction nodes.
 * Simple structure = foundational knowledge. */
function RootsIcon({ id, withGlow }: { id: string; withGlow: boolean }) {
  return (
    <>
      <defs>
        {withGlow && (
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood floodColor="#2fdaca" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#015e92" />
          <stop offset="100%" stopColor="#031f5f" />
        </linearGradient>
      </defs>

      {/* Central stem */}
      <path d="M24 6 L24 20" stroke={`url(#${id}-grad)`} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Root branches spreading down */}
      <path d="M24 20 L14 32 M24 20 L24 36 M24 20 L34 32"
        stroke="#0e4f80" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Root tips */}
      <path d="M14 32 L10 40 M14 32 L18 42 M24 36 L20 44 M24 36 L28 44 M34 32 L30 42 M34 32 L38 40"
        stroke="#031f5f" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Junction nodes */}
      <circle cx="24" cy="20" r="3.5" fill="#156981" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="14" cy="32" r="2.5" fill="#2597a7" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="34" cy="32" r="2.5" fill="#2597a7" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="24" cy="36" r="2.5" fill="#059aa4" filter={withGlow ? `url(#${id}-glow)` : undefined} />
    </>
  );
}

/* ─── TRUNK: Engineering & Architecture ──────────────────────────────────────
 * Mid-teal gradient. Solid vertical core with symmetrical connection nodes.
 * Structural strength = engineering foundations. */
function TrunkIcon({ id, withGlow }: { id: string; withGlow: boolean }) {
  return (
    <>
      <defs>
        {withGlow && (
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feFlood floodColor="#3cdace" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
        <linearGradient id={`${id}-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0e90a3" />
          <stop offset="50%" stopColor="#088da4" />
          <stop offset="100%" stopColor="#05326f" />
        </linearGradient>
      </defs>

      {/* Trunk body */}
      <rect x="19" y="6" width="10" height="36" rx="3" fill={`url(#${id}-grad)`} />

      {/* Internal structure lines */}
      <path d="M21 14 L27 14 M21 24 L27 24 M21 34 L27 34"
        stroke="#015e92" strokeWidth="1" opacity="0.4" />

      {/* Connection nodes on sides - architecture attachment points */}
      <circle cx="16" cy="14" r="2.5" fill="#059aa4" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="32" cy="14" r="2.5" fill="#059aa4" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="16" cy="24" r="2.5" fill="#0fa5aa" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="32" cy="24" r="2.5" fill="#0fa5aa" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="16" cy="34" r="2.5" fill="#2fdaca" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="32" cy="34" r="2.5" fill="#2fdaca" filter={withGlow ? `url(#${id}-glow)` : undefined} />
    </>
  );
}

/* ─── BRANCHES: Application & Agents ─────────────────────────────────────────
 * Cyan gradients. Paths splitting outward with bright endpoint nodes.
 * Branching structure = distributed applications & agents. */
function BranchesIcon({ id, withGlow }: { id: string; withGlow: boolean }) {
  return (
    <>
      <defs>
        {withGlow && (
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#50fbfb" floodOpacity="0.6" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
        <linearGradient id={`${id}-grad1`} x1="50%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#088da4" />
          <stop offset="100%" stopColor="#3cdace" />
        </linearGradient>
        <linearGradient id={`${id}-grad2`} x1="50%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#088da4" />
          <stop offset="100%" stopColor="#3cdace" />
        </linearGradient>
      </defs>

      {/* Central stem */}
      <line x1="24" y1="42" x2="24" y2="24" stroke="#088da4" strokeWidth="2.5" strokeLinecap="round" />

      {/* Branch paths */}
      <path d="M24 30 Q18 26 12 22" stroke={`url(#${id}-grad1)`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 30 Q30 26 36 22" stroke={`url(#${id}-grad2)`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 24 Q17 18 10 14" stroke={`url(#${id}-grad1)`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 24 Q31 18 38 14" stroke={`url(#${id}-grad2)`} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M24 24 L24 10" stroke="#24b9ad" strokeWidth="2" strokeLinecap="round" />

      {/* Junction node */}
      <circle cx="24" cy="30" r="2.5" fill="#24b9ad" />

      {/* Branch endpoint nodes - active agents */}
      <circle cx="12" cy="22" r="3" fill="#3cdace" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="36" cy="22" r="3" fill="#3cdace" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="10" cy="14" r="3" fill="#4dfdfd" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="38" cy="14" r="3" fill="#4dfdfd" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="24" cy="10" r="3" fill="#50fbfb" filter={withGlow ? `url(#${id}-glow)` : undefined} />
    </>
  );
}

/* ─── LEAVES: Research & Trends ──────────────────────────────────────────────
 * Brightest cyan/white. Scattered glowing nodes like the logo's canopy.
 * Many small nodes = cutting-edge, rapidly evolving knowledge. */
function LeavesIcon({ id, withGlow }: { id: string; withGlow: boolean }) {
  return (
    <>
      <defs>
        {withGlow && (
          <filter id={`${id}-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#ffffff" floodOpacity="0.7" />
            <feComposite in2="blur" operator="in" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>

      {/* Subtle connection lines from center */}
      <path d="M24 30 L18 22 M24 30 L30 22 M24 30 L24 18
               M24 30 L14 28 M24 30 L34 28
               M18 22 L14 14 M30 22 L34 14 M24 18 L24 10"
        stroke="#24b9ad" strokeWidth="0.8" opacity="0.3" />

      {/* Center anchor */}
      <circle cx="24" cy="30" r="2" fill="#3cdace" />

      {/* Inner ring of nodes */}
      <circle cx="18" cy="22" r="2.8" fill="#4dfdfd" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="30" cy="22" r="2.8" fill="#50fbfb" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="24" cy="18" r="2.8" fill="#53f7f2" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="14" cy="28" r="2.8" fill="#7cfcf5" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="34" cy="28" r="2.8" fill="#8bfffc" filter={withGlow ? `url(#${id}-glow)` : undefined} />

      {/* Outer ring - brightest, like logo canopy tips */}
      <circle cx="14" cy="14" r="2.5" fill="#8afffa" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="34" cy="14" r="2.5" fill="#9cfdf5" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="24" cy="10" r="2.5" fill="#a9f9ee" filter={withGlow ? `url(#${id}-glow)` : undefined} />

      {/* Edge accent nodes */}
      <circle cx="8" cy="20" r="2" fill="#8bfffc" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="40" cy="20" r="2" fill="#8bfffc" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="10" cy="34" r="1.8" fill="#7cfcf5" filter={withGlow ? `url(#${id}-glow)` : undefined} />
      <circle cx="38" cy="34" r="1.8" fill="#7cfcf5" filter={withGlow ? `url(#${id}-glow)` : undefined} />
    </>
  );
}
