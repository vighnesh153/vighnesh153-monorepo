export function dpr(): number {
  try {
    return globalThis.devicePixelRatio ?? 1;
  } catch {
    return 1;
  }
}
