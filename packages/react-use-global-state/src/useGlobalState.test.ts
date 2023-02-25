import { beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { sleep } from '@vighnesh153/utils';
import { useGlobalState } from './useGlobalState';
import { forgetGlobalState } from './notifications';

describe('useGlobalState hook tests', () => {
  beforeEach(() => forgetGlobalState());

  it('should have same return signature like useState hook', () => {
    const { result } = renderHook(() => useGlobalState(`${Math.random()}`, 42));

    const [counter, setCounter] = result.current;

    expect(counter).toBe(42);
    expect(typeof setCounter).toBe('function');
  });

  it('should update the state using the setState function', () => {
    const { result } = renderHook(() => useGlobalState(`${Math.random()}`, 42));

    const [, setCounter] = result.current;

    act(() => {
      setCounter(100);
    });

    const [counter] = result.current;

    expect(counter).toBe(100);
  });

  it('should use the previous value when instantiating the hook again', () => {
    const identifier = `${Math.random()}`;

    // first instantiation
    renderHook(() => useGlobalState(identifier, 42));

    // second instantiation
    const { result } = renderHook(() => useGlobalState(identifier, 22));

    const [counter] = result.current;
    expect(counter).toBe(42);
  });

  it('should update all other subscribers of the hook if any one of them publishes a new value', async () => {
    const id = `${Math.random()}`;
    const { result: r1 } = renderHook(() => useGlobalState<number>(id));
    const { result: r2 } = renderHook(() => useGlobalState<number>(id));
    const { result: r3 } = renderHook(() => useGlobalState<number>(id));

    act(() => {
      r2.current[1](500);
    });

    // adding some buffer because state is updated in nextTicks
    await sleep(5);

    expect(r1.current[0]).toBe(500);
    expect(r2.current[0]).toBe(500);
    expect(r3.current[0]).toBe(500);
  });
});
