function getRandomId() {
  return Math.random().toString(16).slice(2);
}

export interface NotificationsOptions {
  /**
   * if calling notification.subscribe() should immediately invoke it with the latest data
   */
  notifyOnSubscribe?: boolean;
}

/**
 * Create a notification stream and get notified when a new event occurs
 */
export class Notification<T> {
  /**
   * Holds the latest published data
   * @private
   */
  private latestPublishedData: T | null = null;

  /**
   * Stores all the subscriptions
   * @private
   */
  private callbacks: Record<string, (data: T) => void> = {};

  constructor(private options: NotificationsOptions = { notifyOnSubscribe: false }) {}

  getLatestPublishedData() {
    return this.latestPublishedData;
  }

  /**
   * Publish new value to the subscribers
   * @param data
   */
  publish(data: T): void {
    this.latestPublishedData = data;
    Object.values(this.callbacks).forEach((cb) => {
      setTimeout(() => {
        cb(data);
      }, 0);
    });
  }

  /**
   * Get notified when a new event is published in this stream
   * @param callback
   */
  subscribe(callback: (data: T) => void): { unsubscribe: () => void } {
    const identifier = `${getRandomId()}-${getRandomId()}`;
    this.callbacks[identifier] = callback;
    if (this.options.notifyOnSubscribe && this.latestPublishedData !== null) {
      callback(this.latestPublishedData);
    }
    return {
      unsubscribe: () => delete this.callbacks[identifier],
    };
  }
}
