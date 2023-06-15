import { useEffect, useRef } from 'react';

export type UseKeyPressKey =
  | 'CapsLock'
  | 'Shift'
  | 'Enter'
  | 'Escape'
  | 'Tab'
  | 'Control'
  | 'Alt'
  | 'Meta'
  | 'Backspace'
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '0'
  | '!'
  | '@'
  | '#'
  | '$'
  | '%'
  | '^'
  | '&'
  | '*'
  | '('
  | ')'
  | '_'
  | '-'
  | '+'
  | '='
  | '~'
  | '`'
  | '['
  | '{'
  | '}'
  | ']'
  | '|'
  | '\\'
  | ' '
  | '<'
  | ','
  | '>'
  | '.'
  | '?'
  | '/'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type UseKeyPressAction = 'keyup' | 'keydown' | 'keypress';

export interface UseKeyPressProps {
  action?: UseKeyPressAction;
  keys: UseKeyPressKey[];
  target?: Window | Element;
  onEvent: (action: UseKeyPressAction, key: UseKeyPressKey) => void;
  addEventListenerOptions?: AddEventListenerOptions;
}

export function useKeyPress(props: UseKeyPressProps) {
  const { action = 'keydown', target = null, addEventListenerOptions, keys, onEvent } = props;

  const addEventListenerOptionsRef = useRef(addEventListenerOptions);
  addEventListenerOptionsRef.current = addEventListenerOptions;

  const onEventWrapper: EventListener = (e) => {
    const event = e as KeyboardEvent;
    if (keys.includes(event.key as UseKeyPressKey)) {
      onEvent(action, event.key as UseKeyPressKey);
    }
  };
  const onEventRef = useRef(onEventWrapper);
  onEventRef.current = onEventWrapper;

  useEffect(() => {
    const nnTarget = target ?? window;
    const callback: EventListener = (e) => onEventRef.current(e);
    nnTarget.addEventListener(action, callback, addEventListenerOptionsRef.current);
    return () => nnTarget.removeEventListener(action, callback);
  }, [target, action]);
}
