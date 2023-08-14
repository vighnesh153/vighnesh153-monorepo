import { BrowserFileCache } from './BrowserFileCache';
import { IFileCache } from './IFileCache';
import { InMemoryFileCache } from './InMemoryFileCache';

export const fileCache: IFileCache = process.env.NODE_ENV === 'test' ? new InMemoryFileCache() : new BrowserFileCache();
