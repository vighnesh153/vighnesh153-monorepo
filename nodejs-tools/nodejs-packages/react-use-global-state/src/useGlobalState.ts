import { useEffect, useState } from 'react';
import { createNotificationIfAbsent } from './notifications';

/**
 * Create global state using hooks
 *
 * @param identifier
 * @param initialState
 */
export function useGlobalState<T>(
  identifier: string,
  initialState?: T
): readonly [T | undefined, (updatedState: T) => void] {
  const notification = createNotificationIfAbsent<T | undefined>(identifier, initialState);
  const [state, setState] = useState(notification.getLatestPublishedData() ?? initialState);

  // Publish changes
  useEffect(() => {
    if (state !== notification.getLatestPublishedData()) {
      notification.publish(state);
    }
  }, [notification, state]);

  // Subscribe to changes
  useEffect(() => {
    const { unsubscribe } = notification.subscribe(setState);
    return unsubscribe;
  }, [notification]);

  return [state, (updatedState: T) => setState(updatedState)] as const;
}
