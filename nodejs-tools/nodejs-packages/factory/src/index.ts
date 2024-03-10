export function createFactory<TFunction extends () => TReturn, TReturn>(factoryFunction: TFunction): TFunction {
  return factoryFunction;
}

export function createSingletonFactory<T>(factoryFunction: () => T): () => T {
  let returnValue: T | null = null;
  return function () {
    if (returnValue === null) {
      returnValue = factoryFunction();
    }
    return returnValue;
  };
}
