/**
 * Sleeps for the provided duration
 * @param ms
 */
export function sleep(ms = 1000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
