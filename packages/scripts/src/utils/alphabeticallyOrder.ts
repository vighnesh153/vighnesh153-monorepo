/**
 * Alphabetically orders the object
 */
export function alphabeticallyOrder<T extends { [key: string]: any }>(props: T) {
  return Object.keys(props).sort().reduce((obj, key: keyof T) => {
    obj[key] = props[key];
    return obj;
  }, {} as T);
}
