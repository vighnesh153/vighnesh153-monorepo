export function dpr(): number {
  try {
    return window.devicePixelRatio ?? 1;
  } catch {
    return 1;
  }
}
