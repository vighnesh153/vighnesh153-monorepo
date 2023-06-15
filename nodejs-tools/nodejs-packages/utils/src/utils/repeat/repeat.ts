/**
 * Repeats the callback, count number of times
 *
 * @param count
 * @param callback
 */
export function repeat(count: number, callback: () => void): void {
  for (let i = 0; i < count; i++) {
    callback();
  }
}
