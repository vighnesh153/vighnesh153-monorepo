import { useRef } from 'react';
import { useEffectOnce } from './useEffectOnce';

/**
 * calls callback on component unmount
 * @param fn
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useOnUnmount(fn: () => any): void {
  const fnRef = useRef(fn);

  // update the ref each render so if it changes the newest callback will be invoked
  fnRef.current = fn;

  useEffectOnce(() => () => fnRef.current());
}
