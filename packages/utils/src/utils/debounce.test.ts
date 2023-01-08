import { debounce } from './debounce';

describe('Helpers > debounce tests', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  it('should invoke the function after debounce delay', () => {
    const originalFn = jest.fn();
    const debounceTime = 1000;
    const debouncedFn = debounce(originalFn, debounceTime);

    debouncedFn();

    expect(originalFn).not.toBeCalled();

    // Adding 10ms as buffer
    jest.advanceTimersByTime(debounceTime + 10);

    expect(originalFn).toBeCalled();
  });

  it('should invoke the function only once if called repeatedly', () => {
    const originalFn = jest.fn();
    const debounceTime = 1000;
    const debouncedFn = debounce(originalFn, debounceTime);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Adding 10ms as buffer
    jest.advanceTimersByTime(debounceTime + 10);

    expect(originalFn).toBeCalledTimes(1);
  });

  it('should invoke the function again if the previous invoke completed', () => {
    const originalFn = jest.fn();
    const debounceTime = 1000;
    const debouncedFn = debounce(originalFn, debounceTime);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Adding 10ms as buffer
    jest.advanceTimersByTime(debounceTime + 10);

    debouncedFn();
    debouncedFn();

    // Adding 10ms as buffer
    jest.advanceTimersByTime(debounceTime + 10);

    expect(originalFn).toBeCalledTimes(2);
  });
});
