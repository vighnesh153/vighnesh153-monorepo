export interface IFileCache {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: (key: string, value: unknown) => Promise<void>;
}
