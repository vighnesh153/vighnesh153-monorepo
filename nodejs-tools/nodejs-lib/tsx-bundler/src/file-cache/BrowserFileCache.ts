import localForage from 'localforage';
import { IFileCache } from './IFileCache';

export class BrowserFileCache implements IFileCache {
  private fileCache = localForage.createInstance({
    name: 'fileCache',
  });

  async getItem<T>(key: string) {
    return this.fileCache.getItem<T>(key);
  }

  async setItem(key: string, value: unknown) {
    await this.fileCache.setItem(key, value);
  }
}
