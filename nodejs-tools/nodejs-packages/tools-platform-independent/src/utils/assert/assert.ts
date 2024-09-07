import { not } from '../not';

export function assert(condition: unknown, message = 'Assertion failed'): asserts condition {
  if (not(condition)) {
    throw new Error(message);
  }
}
