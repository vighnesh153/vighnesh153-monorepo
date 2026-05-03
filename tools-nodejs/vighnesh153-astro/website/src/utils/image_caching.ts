import { milliseconds } from "@vighnesh153/tools";
import localforage from "localforage";

const defaultCacheTtl = milliseconds({ years: 1 });

// Single store for both the data and the TTL metadata
const imageStore = localforage.createInstance({
  name: "vighnesh153-images-cache",
});

export type CacheImageOptions = {
  ttlMillis?: number;
};

// Define the shape of our stored data
type CachedRecord = {
  cacheKey: string;
  blob: Blob;
  expiry: number;
};

export async function cacheImage(
  networkUri: string,
  cacheKey: string,
  { ttlMillis = defaultCacheTtl }: CacheImageOptions = {},
): Promise<string> {
  // Defensive check in case navigator.locks is unsupported in the environment
  if (!navigator.locks) {
    return fetchAndCache(networkUri, cacheKey, ttlMillis);
  }

  return navigator.locks.request(`images-${cacheKey}`, async () => {
    return fetchAndCache(networkUri, cacheKey, ttlMillis);
  });
}

// Extracted core logic for clarity
async function fetchAndCache(
  networkUri: string,
  cacheKey: string,
  ttlMillis: number,
): Promise<string> {
  const existingImage = await getImageObjUrl(cacheKey);
  if (existingImage !== null) {
    return existingImage;
  }

  // 1. Fetch data safely
  const response = await fetch(networkUri);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const blob = await response.blob();

  // 2. Store both Blob and Expiry atomically in a single operation
  const record: CachedRecord = {
    cacheKey,
    blob,
    expiry: Date.now() + ttlMillis,
  };
  await imageStore.setItem(cacheKey, record);

  // 3. Return an Object URL (Fast, zero string-encoding overhead)
  return URL.createObjectURL(blob);
}

async function getImageObjUrl(cacheKey: string): Promise<string | null> {
  const record = await imageStore.getItem<CachedRecord>(cacheKey);

  if (!record) {
    return null;
  }

  if (record.expiry < Date.now()) {
    // Cache expired: remove it lazily to free up space immediately
    await imageStore.removeItem(cacheKey);
    return null;
  }

  return URL.createObjectURL(record.blob);
}

export async function cleanupExpiredImages(): Promise<void> {
  // Delete old instances
  await localforage.dropInstance({ name: "vighnesh153-images" });
  await localforage.dropInstance({ name: "vighnesh153-images-ttl" });

  const now = Date.now();
  const keysToDelete: string[] = [];

  // Iterate is much faster for scanning the whole DB than sequentially getting by key
  await imageStore.iterate((record: CachedRecord, key: string) => {
    if (!record || typeof record.expiry !== "number" || record.expiry < now) {
      keysToDelete.push(key);
    }
  });

  // Delete all expired keys concurrently
  if (keysToDelete.length > 0) {
    await Promise.all(keysToDelete.map((key) => imageStore.removeItem(key)));
  }
}
