import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest';
import { sleep } from './sleep';

describe('Helpers > sleep tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // TODO
  it.todo('should sleep for the specified duration', async () => {
    const mockFn = vi.fn();

    sleep(6000).then(mockFn);

    // 0 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(2000);

    // 2000 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(2000);

    // 4000 ms
    expect(mockFn).not.toBeCalled();
    vi.advanceTimersByTime(3000);

    // 7000 ms
    expect(mockFn).toBeCalledTimes(1);
  });
});
