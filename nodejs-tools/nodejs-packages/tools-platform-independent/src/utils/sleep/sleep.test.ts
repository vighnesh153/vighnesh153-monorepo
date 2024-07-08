import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest';
import { sleep } from './sleep';

async function flushPromises() {
  return Promise.resolve(setTimeout);
}

describe('"sleep" tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should sleep for the specified duration', async () => {
    const mockFn = vi.fn();

    sleep(6000).then(mockFn);

    // after 0 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(2000);
    await flushPromises();

    // after 2000 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(2000);
    await flushPromises();

    // after 4000 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(3000);
    await flushPromises();

    // after 7000 ms
    expect(mockFn).toBeCalledTimes(1);
  });
});
