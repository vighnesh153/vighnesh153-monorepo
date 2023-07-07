# @vighnesh153/react-use-global-state

[![npm](https://img.shields.io/npm/dt/@vighnesh153/react-use-global-state)](https://img.shields.io/npm/dt/@vighnesh153/react-use-global-state)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/react-use-global-state)](https://img.shields.io/bundlephobia/minzip/@vighnesh153/react-use-global-state)
[![npm (scoped)](https://img.shields.io/npm/v/@vighnesh153/-version)](https://www.npmjs.com/package/@vighnesh153/-version)
[![GitHub](https://img.shields.io/github/license/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/vighnesh153/vighnesh153-monorepo)](https://github.com/vighnesh153/vighnesh153-monorepo/issues)

A lightweight library (around `1KB` minified), which allows you to create a global state using a ReactJS hook. The API
of the hook is similar to the `useState` hook with minor differences.

Use this library as an alternative to popular state management solutions like `Redux`, `MobX`, etc. because you don't
need to create any providers or action creators or any boilerplate code for creating a global state. You can even use
this in place of the ReactJS's builtin `Context` API

## Installation

```bash
npm install @vighnesh153/react-use-global-state
```

## Usage

```jsx
import { useGlobalState } from '@vighnesh153/react-use-global-state';

const Counter = ({ adder }) => {
  const [count, setCount] = useGlobalState('count', 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + adder)}>Add {adder}</button>
    </div>
  );
};

const App = () => {
  return (
    <div>
      {/** Count state will be same for all counters **/}
      <Counter adder={1} />
      <Counter adder={2} />
      <Counter adder={3} />
    </div>
  );
};
```

## Cleaning up (in your tests)

To remove the global state from memory, you can make use of the `forgetGlobalState` function which will clean all the
global pieces of state. It also accepts an array of identifiers (strings) to only forget those global state pieces.

```tsx
import { forgetGlobalState } from '@vighnesh153/react-use-global-state';

describe('Your component tests', () => {
  // forgets all identifier states
  beforeEach(() => {
    forgetGlobalState();
  });

  // forgets those global state pieces that were marked with any one of these identifiers
  beforeEach(() => {
    forgetGlobalState(['counter', 'user', 'auth']);
  });
});
```

## Performance

Any change in the state would just render the consumer components (and their children components) and not the entire
application as you can see in the following example.

In the following example, we have the global render time in the `<App />` component and all the counter cards are
children of the `<App />` component.

- Adding a new counter re-renders the `<App />` component because the logic of the count of counters is in the `<App />`
  component
- Adding `1` to any of the counters only re-renders the consumers of the count state (in this case, only the cards)

![Counters Gif](https://i.imgur.com/hyP7VWe.gif)

## Why you should use this library?

- Size: `1KB` minified
- Zero external dependencies
- Modern hook-based state management instead of the traditional redux-like, provider-consumer approaches
- No need of wrapping components with a long chain of Providers as there is no Provider-Consumer pattern in this hook

## Best practices

- Try to keep the states very minimal. That way, to avoid re-rendering of big component trees with every minor change in
  the state
- Although there is no restriction on how you want to use this, my recommendation would be to create a wrapper hook
  around you piece of state and add some utility functions in the hook to update the state. This lets you encapsulate
  your business logic for this piece of state in the hook, and you won't have to pass the `identifier` everytime as it
  will be done for you by the hook.

```jsx
const useUser = (userId, initialValue) => {
  const [user, setUser] = useGlobalState(`user_${userId}`, initialValue || {});

  const changeName = useCallback(
    (newName) => {
      setUser({ ...user, name: newName });
    },
    [user]
  );

  const changeAge = useCallback(
    (newAge) => {
      setUser({ ...user, age: newAge });
    },
    [user]
  );

  return { user, changeName, changeAge };
};
```

## How does this hook work?

- This hooks makes use of the provided `identifier` to identify which global state you want to access.
- When you change the state for an `identifier`, the new data gets published in a stream and all the components which
  are making use of the same `identifier` will get notified about the updates
