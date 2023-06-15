import { DeepReadonly } from 'ts-essentials';

/**
 * Deep freezes the object passed to it
 *
 * @param value - value to be frozen
 */
export function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (value === null) return null as DeepReadonly<T>;

  if (Array.isArray(value)) {
    value.forEach((item) => Object.isFrozen(item) || deepFreeze(item));
  } else if (typeof value === 'object') {
    Object.values(value).forEach((item) => Object.isFrozen(item) || deepFreeze(item));
  }

  return Object.freeze(value) as DeepReadonly<T>;
}
