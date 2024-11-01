/**
 * Use to validate the types
 *
 * Usage:
 *
 * ```ts
 * assertType<Equals<number, number>>; // no error
 *
 * assertType<Equals<number, string>>; // error
 * ```
 */
export function assertType<T extends true>() {}

export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;
