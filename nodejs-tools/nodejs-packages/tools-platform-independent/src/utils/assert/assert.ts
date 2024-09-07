import { not } from '../not';

export function assert(condition: boolean, message = 'Assertion failed') {
  if (not(condition)) {
    throw new Error(message);
  }
}
