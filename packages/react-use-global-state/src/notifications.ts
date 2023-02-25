import { not, Notification } from '@vighnesh153/utils';

let notifications: Record<string, Notification<unknown>> = {};

/**
 *
 * @param identifier
 * @internal
 */
export function createNotificationIfAbsent<T>(identifier: string): Notification<T> {
  if (not(Object.hasOwn(notifications, identifier))) {
    notifications[identifier] = new Notification<T>({ notifyOnSubscribe: true });
  }
  return notifications[identifier] as Notification<T>;
}

/**
 * Delete the global state for the provided identifiers. If identifiers are not provided,
 * it cleans up all the global state for all identifiers
 *
 * @param identifiers
 */
export function forgetGlobalState(identifiers?: string[]): void {
  if (identifiers === undefined) {
    notifications = {};
  } else {
    identifiers.forEach((identifier) => {
      delete notifications[identifier];
    });
  }
}
