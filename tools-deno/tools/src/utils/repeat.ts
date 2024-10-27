/**
 * Repeats the callback for a specified number of times
 *
 * @param times
 * @param callback
 */
export function repeat(times: number, callback: (count: number) => void): void {
  for (let i = 0; i < times; i++) {
    callback(i + 1);
  }
}
