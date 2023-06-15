import { describe, expect, it } from 'vitest';
import { createNotificationIfAbsent, forgetGlobalState } from './notifications';

describe('notifications tests', () => {
  it('should create a notification', () => {
    const notification = createNotificationIfAbsent(Math.random().toString());

    expect(notification).not.toBeNull();
  });

  it('should not create a new notification for the same identifier', () => {
    const identifier = Math.random().toString();
    const notification1 = createNotificationIfAbsent(identifier);
    const notification2 = createNotificationIfAbsent(identifier);

    expect(notification1).toBe(notification2);
  });

  it('should create a different notification for a different identifier', () => {
    const notification1 = createNotificationIfAbsent(Math.random().toString());
    const notification2 = createNotificationIfAbsent(Math.random().toString());

    expect(notification1).not.toBe(notification2);
  });

  it('should forget all notifications', () => {
    const identifier1 = Math.random().toString();
    const identifier2 = Math.random().toString();
    const identifier3 = Math.random().toString();

    const notification1 = createNotificationIfAbsent(identifier1);
    const notification2 = createNotificationIfAbsent(identifier2);
    const notification3 = createNotificationIfAbsent(identifier3);

    forgetGlobalState();

    const notification4 = createNotificationIfAbsent(identifier1);
    const notification5 = createNotificationIfAbsent(identifier2);
    const notification6 = createNotificationIfAbsent(identifier3);

    expect(notification1).not.toBe(notification4);
    expect(notification2).not.toBe(notification5);
    expect(notification3).not.toBe(notification6);
  });

  it('should allow to forget specific notifications', () => {
    const identifier1 = Math.random().toString();
    const identifier2 = Math.random().toString();
    const identifier3 = Math.random().toString();

    const notification1 = createNotificationIfAbsent(identifier1);
    const notification2 = createNotificationIfAbsent(identifier2);
    const notification3 = createNotificationIfAbsent(identifier3);

    forgetGlobalState([identifier1, identifier3]);

    const notification4 = createNotificationIfAbsent(identifier1);
    const notification5 = createNotificationIfAbsent(identifier2);
    const notification6 = createNotificationIfAbsent(identifier3);

    expect(notification1).not.toBe(notification4);
    expect(notification2).toBe(notification5);
    expect(notification3).not.toBe(notification6);
  });
});
