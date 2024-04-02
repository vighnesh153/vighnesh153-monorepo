import { EffectCallback, useEffect } from 'react';

/**
 * a modified useEffect hook that only runs once.
 * @param effect
 */
export function useEffectOnce(effect: EffectCallback) {
  useEffect(effect, []);
}
