import { RefObject, useEffect } from 'react';

import { useRequestAnimationFrameState } from './useRequestAnimationFrameState';

export interface State {
  x: number;
  y: number;
}

/**
 * tracks an HTML element's scroll position
 * @param ref
 */
export function useScrollAmount(ref: RefObject<HTMLElement | undefined>): State {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('`useScroll` expects a single ref argument.');
    }
  }

  const [state, setState] = useRequestAnimationFrameState<State>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handler() {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    }

    ref.current?.addEventListener('scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      ref.current?.removeEventListener('scroll', handler);
    };
  }, [ref, setState]);

  return state;
}
