import { useEffect, useState } from 'react';

// The trip planner and its stop network (~90 KB) load on first use, shared by the stop search and trip panel
let plannerPromise = null;
export const loadPlanner = () => (plannerPromise ??= import('./tripPlanner'));

export function usePlanner(enabled = true) {
  const [planner, setPlanner] = useState(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    loadPlanner().then((mod) => !cancelled && setPlanner(mod));
    return () => {
      cancelled = true;
    };
  }, [enabled]);
  return planner;
}
