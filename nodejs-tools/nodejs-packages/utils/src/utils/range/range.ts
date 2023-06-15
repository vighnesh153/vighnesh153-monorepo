const validateStep = (step: number, start: number, end: number) => {
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
 * Generate a range of numbers
 *
 * @param start - start of the range
 * @param end - end of the range
 * @param step - difference between elements of the range
 */
export function* range(start: number, end: number, step = 1): Generator<number> {
  validateStep(step, start, end);

  const isRangeReverse = step < 0;
  for (let i = start; isRangeReverse ? i >= end : i <= end; i += step) {
    yield i;
  }
}
