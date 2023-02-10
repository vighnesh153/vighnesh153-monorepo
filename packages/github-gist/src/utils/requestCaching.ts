const cache: Record<string, unknown> = {};

export function setCache(key: string, value: unknown): void {
  cache[key] = value;
}

export function getCache(key: string): unknown | null {
  return cache[key] ?? null;
}
