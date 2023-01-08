import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import { useOnUnmount } from './useOnUnmount';

/**
 * creates setState method which only updates after `requestAnimationFrame`
 *
 * @param initialState
 */
export function useRequestAnimationFrameState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useOnUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRafState];
}
