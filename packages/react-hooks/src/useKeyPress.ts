import { useEffect, useRef } from 'react';

export interface UseKeyPressProps {
  action?: 'keyup' | 'keydown' | 'keypress';
  key: 'ArrowDown' | 'ArrowUp' | 'ArrowLeft' | 'ArrowRight';
  target?: Window | Element;
  onEvent: (action: NonNullable<UseKeyPressProps['action']>, key: NonNullable<UseKeyPressProps['key']>) => void;
  addEventListenerOptions?: AddEventListenerOptions;
}

export function useKeyPress(props: UseKeyPressProps) {
  const { action = 'keypress', target = null, addEventListenerOptions, key, onEvent } = props;

  const addEventListenerOptionsRef = useRef(addEventListenerOptions);
  addEventListenerOptionsRef.current = addEventListenerOptions;

  const onEventWrapper: EventListener = (e) => {
    const event = e as KeyboardEvent;
    if (event.key === key) {
      onEvent(action, key);
    }
  };
  const onEventRef = useRef(onEventWrapper);
  onEventRef.current = onEventWrapper;

  useEffect(() => {
    const nnTarget = target ?? window;
    const callback = onEventRef.current;
    nnTarget.addEventListener(action, callback, addEventListenerOptionsRef.current);
    return () => nnTarget.removeEventListener(action, callback);
  }, [target, action]);
}
