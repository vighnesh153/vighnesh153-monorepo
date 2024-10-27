export {};

// Inspiration: https://stackoverflow.com/a/69429093/8822610
declare global {
  // deno-lint-ignore no-var
  var cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    delete: (name: string) => Promise<void>;
  };
}
