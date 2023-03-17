import { not } from '../not';

const validate = (step: number, start: number, end: number) => {
  if (not(Number.isInteger(start))) {
    throw new Error(`Expected "start" to be an integer, but found "${start}"`);
  }
  if (not(Number.isInteger(end))) {
    throw new Error(`Expected "end" to be an integer, but found "${end}"`);
  }
  if (not(Number.isInteger(step))) {
    throw new Error(`Expected "step" to be an integer, but found "${step}"`);
  }
  if (step === 0) {
    throw new Error(`Expected "step" to be non-zero, found "0"`);
  }
  if (start < end && step < 0) {
    throw new Error(`Expected "step" to be positive if "start" is less than "end"`);
  }
  if (start > end && step > 0) {
    throw new Error(`Expected "step" to be negative if "start" is greater than "end"`);
  }
};

/**
 * Returns a random integer between start and end
 *
 * <strong>Note</strong>: This is not cryptographically strong
 * and shouldn't be used in systems that demand high security.
 *
 * @param start - beginning of the range
 * @param end - end of the range
 * @param step - increment or decrement for the numbers in range
 */
export function randomInteger(start: number, end: number, step = 1): number {
  validate(step, start, end);

  const count = Math.floor((end - start) / step) + 1;
  return start + Math.floor(Math.random() * count) * step;
}
