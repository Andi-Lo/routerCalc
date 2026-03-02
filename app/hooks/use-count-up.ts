'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a numeric value from its previous state to the new target
 * using requestAnimationFrame and an ease-out curve.
 *
 * @param target - The target value to animate towards (in mm).
 * @param duration - Animation duration in ms. Defaults to 600.
 * @returns The current animated display value.
 */
export function useCountUp(target: number, duration = 600): number {
  const [displayed, setDisplayed] = useState(target);
  const from = useRef(target);
  const rafId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    // Cancel any in-progress animation
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);

    const startValue = from.current;
    const delta = target - startValue;

    // Nothing to animate
    if (delta === 0) return;

    startTime.current = null;

    const step = (timestamp: number) => {
      if (startTime.current === null) startTime.current = timestamp;

      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic: decelerate towards the end
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayed(startValue + delta * eased);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(step);
      } else {
        setDisplayed(target);
        from.current = target;
      }
    };

    rafId.current = requestAnimationFrame(step);

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      from.current = target;
    };
  }, [target, duration]);

  return displayed;
}
