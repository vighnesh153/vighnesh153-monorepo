export function inProduction<T>(callback: () => T): T {
  if (process.env.NODE_ENV === 'test') {
    return undefined as T;
  }
  return callback();
}
