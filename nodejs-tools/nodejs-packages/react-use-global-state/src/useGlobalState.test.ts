import { act, renderHook } from '@testing-library/react';
import { sleep } from '@vighnesh153/tools-platform-independent';
import { useGlobalState } from './useGlobalState';
import { forgetGlobalState } from './notifications';

describe('useGlobalState hook tests', () => {
  beforeEach(() => forgetGlobalState());

  it('should return initial value when not updated', () => {
    const { result } = renderHook(() => useGlobalState('counter', 42));

    expect(result.current[0]).toBe(42);
  });

  it('should update the state using the setState function', async () => {
    const { result } = renderHook(() => useGlobalState('counter', 42));

    act(() => {
      const [counter = 0, setCounter] = result.current;
      setCounter(counter + 1);
    });

    expect(result.current[0]).toBe(43);
  });

  it('should use the previous value when instantiating the hook again', async () => {
    const useMultipleHooks = () => {
      const [counter1, setCounter1] = useGlobalState('counter', 42);
      const [counter2, setCounter2] = useGlobalState('counter', 1000);

      return { counter1, counter2, setCounter1, setCounter2 };
    };
    const { result } = renderHook(() => useMultipleHooks());

    expect(result.current.counter1).toBe(42);
    expect(result.current.counter2).toBe(42);
  });

  it('should update all other subscribers of the hook if any one of them publishes a new value', async () => {
    const useMultipleHooks = () => {
      const [counter1, setCounter1] = useGlobalState('counter', 42);
      const [counter2, setCounter2] = useGlobalState('counter', 43);
      const [counter3, setCounter3] = useGlobalState('counter', 44);

      return { counter1, counter2, counter3, setCounter1, setCounter2, setCounter3 };
    };
    const { result } = renderHook(() => useMultipleHooks());

    act(() => {
      result.current.setCounter2(69);
    });

    // adding some buffer because state is updated in nextTicks
    await sleep(1_000);

    expect(result.current.counter1).toBe(69);
    expect(result.current.counter2).toBe(69);
    expect(result.current.counter3).toBe(69);
  });
});
