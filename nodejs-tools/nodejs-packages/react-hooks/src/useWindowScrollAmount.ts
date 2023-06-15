import { useCallback, useRef, useState } from 'react';
import { IScrollAmount } from '@vighnesh153/types';
import { debounce } from '@vighnesh153/utils';
import { useEffectOnce } from './useEffectOnce';

export interface UseWindowScrollAmountProps {
  initialScrollAmount?: IScrollAmount;
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
  const scrollAmountRef = useRef<IScrollAmount>(initialScrollAmount);
  const [scrollAmount, setScrollAmount] = useState<IScrollAmount>(initialScrollAmount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetScrollAmount = useCallback(debounce(setScrollAmount, debounceUpdateDuration), [
    debounceUpdateDuration,
  ]);

  useEffectOnce(() => {
    function scrollHandler() {
      const newScrollAmount = {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      } satisfies IScrollAmount;
      scrollAmountRef.current = newScrollAmount;
      debouncedSetScrollAmount(newScrollAmount);
    }

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  return { scrollAmount, scrollAmountRef };
}
