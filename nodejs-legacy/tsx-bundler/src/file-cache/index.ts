import { BrowserFileCache } from "./BrowserFileCache.ts";
import { IFileCache } from "./IFileCache.ts";
import { InMemoryFileCache } from "./InMemoryFileCache.ts";

export const fileCache: IFileCache = process.env.NODE_ENV === "test"
  ? new InMemoryFileCache()
  : new BrowserFileCache();
