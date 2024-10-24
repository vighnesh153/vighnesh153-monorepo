import { IFileCache } from "./IFileCache.ts";

export class InMemoryFileCache implements IFileCache {
  private fileCache: Record<string, unknown> = {};

  async getItem<T>(key: string) {
    return (this.fileCache[key] as T) ?? null;
  }

  async setItem(key: string, value: unknown) {
    this.fileCache[key] = value;
  }
}
