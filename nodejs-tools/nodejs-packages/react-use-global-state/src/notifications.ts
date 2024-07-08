import { not, Notification } from '@vighnesh153/tools-platform-independent';

let notifications: Record<string, Notification<unknown>> = {};

/**
 * Creates a notification corresponding to an identifier. If a notification was already
 * created for an identifier, it will be returned instead
 *
 * @param identifier
 * @param seedData
 * @internal
 */
export function createNotificationIfAbsent<T>(identifier: string, seedData?: T): Notification<T> {
  if (not(Object.hasOwn(notifications, identifier))) {
    notifications[identifier] = new Notification<T>({ notifyOnSubscribe: true });
    notifications[identifier].publish(seedData);
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
