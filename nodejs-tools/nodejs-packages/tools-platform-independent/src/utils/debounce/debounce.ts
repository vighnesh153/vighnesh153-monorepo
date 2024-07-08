/**
 * Creates a debounced version of a function
 *
 * @param fn - Function to be debounced
 * @param [milliseconds=1000] - Duration of debounce
 */
export function debounce<Args, T extends Array<Args>, U>(
  fn: (...args: T) => U,
  milliseconds = 1000
): (...args: T) => void {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;
  return (...args: T): void => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, milliseconds);
  };
}
