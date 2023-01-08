export interface UseIsIOSProps {
  defaultIsIOS?: boolean;
}

export function useIsIOS({ defaultIsIOS = false }: UseIsIOSProps = {}) {
  try {
    return typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return defaultIsIOS;
  }
}
