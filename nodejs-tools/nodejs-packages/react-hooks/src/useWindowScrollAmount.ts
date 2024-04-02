import { useCallback, useRef, useState } from 'react';
import { debounce } from '@vighnesh153/utils';
import { useEffectOnce } from './useEffectOnce';

interface ScrollAmount {
  scrollX: number;
  scrollY: number;
}

export interface UseWindowScrollAmountProps {
  initialScrollAmount?: ScrollAmount;
  debounceUpdateDuration?: number;
}

/**
 * Calculates the window's scroll amount
 *
 * @param initialScrollAmount used to initialize the scrollAmount
 * @param debounceUpdateDuration debounce duration for the `scroll` handler
 */
export function useWindowScrollAmount({
  initialScrollAmount = {
    scrollX: 0,
    scrollY: 0,
  },
  debounceUpdateDuration = 100,
}: UseWindowScrollAmountProps = {}) {
  const scrollAmountRef = useRef<ScrollAmount>(initialScrollAmount);
  const [scrollAmount, setScrollAmount] = useState<ScrollAmount>(initialScrollAmount);
  const debouncedSetScrollAmount = useCallback(debounce(setScrollAmount, debounceUpdateDuration), [
    debounceUpdateDuration,
  ]);

  useEffectOnce(() => {
    function scrollHandler() {
      const newScrollAmount = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      } satisfies ScrollAmount;
      scrollAmountRef.current = newScrollAmount;
      debouncedSetScrollAmount(newScrollAmount);
    }

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return { scrollAmount, scrollAmountRef };
}
