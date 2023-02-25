import { describe, expect, it, vi } from 'vitest';
import { Notification } from './notification';
import { sleep } from '../sleep';

describe('Helpers > Notification tests', () => {
  it('should not crash on instantiation', () => {
    expect(() => new Notification()).not.toThrow();
  });

  it('should publish the data to the subscriber', async () => {
    const notification = new Notification<number>();
    const mockFn = vi.fn();

    notification.subscribe(mockFn);
    notification.publish(123);

    await sleep(10);

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(123);
  });

  it('should publish data to all subscribers', async () => {
    const notification = new Notification<number>();
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const mockFn3 = vi.fn();

    notification.subscribe(mockFn1);
    notification.subscribe(mockFn2);
    notification.subscribe(mockFn3);
    notification.publish(123);

    await sleep(10);

    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn1).toBeCalledWith(123);

    expect(mockFn2).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledWith(123);

    expect(mockFn3).toBeCalledTimes(1);
    expect(mockFn3).toBeCalledWith(123);
  });

  it('should only publish data to active subscribers', async () => {
    const notification = new Notification<number>();
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();
    const mockFn3 = vi.fn();

    notification.subscribe(mockFn1);
    const { unsubscribe: unsubscribe2 } = notification.subscribe(mockFn2);
    notification.subscribe(mockFn3);

    unsubscribe2();

    notification.publish(123);

    await sleep(10);

    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn1).toBeCalledWith(123);

    expect(mockFn2).not.toBeCalled();

    expect(mockFn3).toBeCalledTimes(1);
    expect(mockFn3).toBeCalledWith(123);
  });

  it('should invoke the subscription function with the latest data', async () => {
    const notification = new Notification<number>({ notifyOnSubscribe: true });
    const mockFn1 = vi.fn();
    const mockFn2 = vi.fn();

    notification.subscribe(mockFn1);

    // No data published as of now
    expect(mockFn1).not.toBeCalled();

    notification.publish(123);
    await sleep(10);

    // data published once
    expect(mockFn1).toBeCalledTimes(1);
    expect(mockFn1).toBeCalledWith(123);

    notification.subscribe(mockFn2);

    // invoked with most recently published data
    expect(mockFn2).toBeCalledTimes(1);
    expect(mockFn2).toBeCalledWith(123);
  });
});
