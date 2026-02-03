# Gemini Handoff: Phase 10.x — DNA Speed & Animation Polish

**Date:** 2026-02-03
**From:** @opus (Claude Code)
**To:** @gemini (Antigravity)
**Priority:** P0 (Critical UX Fix)

---

## TL;DR

Phase 10 core is DONE (vertical stack works). But the simulation feels slow and animations need polish. I fixed the timing defaults — you polish the visuals.

---

## What @opus Just Fixed

### Speed Issues Resolved ✅

| Problem | Fix |
|---------|-----|
| `BASE_STEP_DURATION = 6000` (6s) | Changed to `4000` (4s per step) |
| `playbackSpeed = 0.5` (half speed = 12s!) | Changed to `1.0` (4s per step) |
| "Lens Effect" slowed to 0.1x on mouse enter | **REMOVED** — was causing 40s+ steps on desktop |
| No user control over speed | Added 1×/2×/3× buttons in header |

### Files Changed

- `components/dna/DNAContext.tsx` — Updated constants
- `components/dna/DNAView.tsx` — Removed lens effect handlers
- `components/dna/DNAFixedHeader.tsx` — Added speed control UI

---

## Your Tasks (@gemini)

### Task 10.x.4: Card Animation Timing (P0 — Start Here)

**File:** `components/dna/DNAVerticalStack.tsx`

The current spring physics feel sluggish. Tune these values:

```typescript
// Current (line ~154, ~242)
transition={{ type: "spring", stiffness: 200, damping: 20 }}

// Try snappier values:
transition={{ type: "spring", stiffness: 300, damping: 25 }}
```

**Test:** Cards should expand/collapse in ~300ms, not 500ms+.

---

### Task 10.x.5: Progress Indicator Polish (P0)

**File:** `components/dna/DNAFixedHeader.tsx`

The progress bar is subtle. Make it more visible:

1. **Increase height** from `h-1` to `h-1.5` or `h-2`
2. **Add glow** on active: `shadow-[0_0_8px_${color}]`
3. **Pulse effect** when step changes (not just on completion)

**Location:** Lines 297-308 in `DNAFixedHeader.tsx`

```tsx
{/* Progress Bar */}
{isPlaying && !isPaused && currentStep !== 'idle' && (
    <div className="h-1 w-full bg-white/5">  {/* Increase height */}
        <motion.div
            className="h-full"
            style={{
                backgroundColor: STEP_COLORS[currentStep] || 'var(--dna-t)',
                boxShadow: `0 0 8px ${STEP_COLORS[currentStep]}` // Add glow
            }}
            ...
```

---

### Task 10.7: Desktop Grid Toggle (P2)

On desktop (≥1024px), offer a toggle between:
- **Stack** (current vertical accordion) — default
- **Grid** (2×2 layout, one expanded at a time)

**Implementation:**
1. Add state: `const [viewMode, setViewMode] = useState<'stack' | 'grid'>('stack')`
2. Add toggle button in header (desktop only)
3. Conditionally render grid layout in `DNAVerticalStack.tsx`
4. Persist preference in localStorage

---

### Task 10.8: Animation Polish (P2)

1. **Scroll-to-card smoothness** — `DNAVerticalStack.tsx` line 325-330
   - Current: `behavior: 'smooth'`
   - Consider: Custom spring-based scroll using Framer Motion

2. **Stagger reveal** — When simulation starts, cards should stagger-animate in
   - Use `staggerChildren: 0.1` in parent variants

3. **Completion celebration** — `CompletionCard.tsx`
   - Add confetti or subtle particle effect on completion

---

## Speed Control Reference

The new speed control is in the header breadcrumbs row:

```
[T] > [V] > [A] > [P]    ⏱ [1×] [2×] [3×]    Step 2 of 4  ● Playing
```

Speed presets defined in `DNAFixedHeader.tsx`:
```typescript
const SPEED_PRESETS = [
    { label: '1×', value: 1.0 },  // 4s per step
    { label: '2×', value: 2.0 },  // 2s per step
    { label: '3×', value: 3.0 },  // 1.33s per step
];
```

---

## Testing Checklist

- [ ] Desktop: Cards auto-advance without hovering
- [ ] Mobile: Simulation completes in ~16s at 1× (4 steps × 4s)
- [ ] Speed buttons work and persist during session
- [ ] Animations feel snappy, not sluggish
- [ ] Progress bar is clearly visible on dark background

---

## Coordination

- **Commit frequently** to `preview` branch
- **Update `docs/BACKLOG.md`** — mark tasks IN PROGRESS / DONE
- **Push to main** when feature is verified

---

## Quick Start

```bash
# 1. Pull latest
git pull origin preview

# 2. Test the speed fix
npm run dev
# Open http://localhost:3000/en/dna
# Type text, press play — should advance every 4s at 1×

# 3. Start with animation timing
# Edit: components/dna/DNAVerticalStack.tsx
# Change spring stiffness from 200 to 300
```

Good luck! 🚀
