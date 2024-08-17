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
  let timeout: unknown = null;
  return (...args: T): void => {
    if (timeout) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, milliseconds);
  };
}
