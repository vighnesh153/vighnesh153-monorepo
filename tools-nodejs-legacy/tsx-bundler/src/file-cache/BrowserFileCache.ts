import localForage from "localforage";
import { IFileCache } from "./IFileCache.ts";

export class BrowserFileCache implements IFileCache {
  private fileCache = localForage.createInstance({
    name: "fileCache_v2",
  });

  constructor() {
    // delete old db
    localForage.dropInstance({ name: "fileCache" });
  }

  async getItem<T>(key: string) {
    return this.fileCache.getItem<T>(key);
  }

  async setItem(key: string, value: unknown) {
    await this.fileCache.setItem(key, value);
  }
}
