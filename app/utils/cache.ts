// cache.ts

type Cache<T> = { [key: string]: T | undefined }; // Define a generic cache type

// In-memory cache object (generic)
const cache: Cache<unknown> = {};

/**
 * Retrieve a cached item by its key.
 * @param key The key to identify the cached item.
 * @returns The cached item if it exists, otherwise undefined.
 */
export const getFromCache = <T>(key: string): T | undefined => {
  return cache[key] as T | undefined;
};

/**
 * Store an item in the cache with a specific key.
 * @param key The key to store the item under.
 * @param value The value to store in the cache.
 */
export const setInCache = <T>(key: string, value: T): void => {
  cache[key] = value;
};

/**
 * Remove an item from the cache by its key.
 * @param key The key to identify the item to remove.
 */
export const removeFromCache = (key: string): void => {
  delete cache[key];
};

/**
 * Clear the entire cache.
 */
export const clearCache = (): void => {
  for (const key in cache) {
    delete cache[key];
  }
};
