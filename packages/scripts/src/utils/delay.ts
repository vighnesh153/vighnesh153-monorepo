/**
 * Adds a delay
 */
export async function delay(ms: number = 1000) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
