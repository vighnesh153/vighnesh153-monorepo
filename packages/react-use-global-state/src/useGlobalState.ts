/**
 *
 * @param identifier
 * @param initialState
 */
export function useGlobalState<T>(identifier: string, initialState?: T) {
  return { identifier, initialState };
}
