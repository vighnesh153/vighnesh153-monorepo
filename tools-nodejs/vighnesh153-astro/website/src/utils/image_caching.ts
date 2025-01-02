import { milliseconds } from "@vighnesh153/tools";
import localforage from "localforage";

const defaultCacheTtl = milliseconds({ years: 1 });

const imageStore = localforage.createInstance({
  name: "vighnesh153-images",
});

const imageTtlStore = localforage.createInstance({
  name: "vighnesh153-images-ttl",
});

export type CacheImageOptions = {
  ttlMillis?: number;
};

export async function cacheImage(
  networkUri: string,
  cacheKey: string,
  { ttlMillis = defaultCacheTtl }: CacheImageOptions = {},
): Promise<string> {
  return navigator.locks.request(`images-${cacheKey}`, async () => {
    const existingImage = await getImageObjUrl(cacheKey);
    if (existingImage !== null) {
      return existingImage;
    }

    return new Promise(async (resolve, reject) => {
      const blob = await fetch(networkUri).then((res) => res.blob());

      const reader = new FileReader();
      reader.onload = () => {
        const objectUrl = reader.result as string;

        imageStore.setItem(cacheKey, objectUrl).then(async () => {
          resolve(objectUrl);
          await imageTtlStore.setItem(cacheKey, Date.now() + ttlMillis);
        });
      };

      try {
        reader.readAsDataURL(blob);
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function getImageObjUrl(cacheKey: string): Promise<string | null> {
  const ttl = await imageTtlStore.getItem(cacheKey);
  if (typeof ttl !== "number") {
    // either ttl doesn't exist or is corrupted for this cache key
    return null;
  }

  if (ttl < Date.now()) {
    // Cache expired
    return null;
  }

  const maybeImageObjUrl = await imageStore.getItem(cacheKey);
  if (typeof maybeImageObjUrl === "string") {
    return maybeImageObjUrl;
  }

  // imageObjUrl is corrupted
  return null;
}

export async function cleanupExpiredImages() {
  const imageKeys = await imageStore.keys();
  const ttlKeys = await imageTtlStore.keys();

  for (const key of new Set([...imageKeys, ...ttlKeys])) {
    const objUrl = await imageStore.getItem(key);
    const ttl = await imageTtlStore.getItem(key);
    if (
      typeof objUrl !== "string" || typeof ttl !== "number" || ttl < Date.now()
    ) {
      await imageStore.removeItem(key);
      await imageTtlStore.removeItem(key);
    }
  }
}
