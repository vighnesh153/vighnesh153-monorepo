let cache: Record<string, unknown> = {};

export function getCache(key: string): unknown | null {
  return cache[key] ?? null;
}

/**
 * @param keys=ALL_KEYS
 */
export function resetCache(keys?: string[]): void {
  if (Array.isArray(keys)) {
    keys.forEach((key) => delete cache[key]);
  } else {
    cache = {};
  }
}

export function setCache(key: string, value: unknown): void {
  cache[key] = value;
}
