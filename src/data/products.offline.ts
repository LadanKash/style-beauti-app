// src/data/products.offline.ts
import type { Product } from "@/src/data/products";
import localProducts from "@/src/data/products.local.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "products_cache_v1";
const CACHE_TS_KEY = "products_cache_ts_v1";

const PRODUCTS_URL = "https://stylebeauti.com/products.json";
// const PRODUCTS_URL = "https://www.stylebeauti.com/products.json";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function safeJSON<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function readCache(): Promise<Product[] | null> {
  const raw = await AsyncStorage.getItem(CACHE_KEY);
  return safeJSON<Product[]>(raw);
}

async function writeCache(products: Product[]) {
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(products));
  await AsyncStorage.setItem(CACHE_TS_KEY, String(Date.now()));
}

async function isCacheFresh(maxAgeMs: number) {
  const tsRaw = await AsyncStorage.getItem(CACHE_TS_KEY);
  const ts = tsRaw ? Number(tsRaw) : 0;
  if (!ts || Number.isNaN(ts)) return false;
  return Date.now() - ts < maxAgeMs;
}

export async function getProductsOfflineFirst(opts?: {
  forceRefresh?: boolean;
  maxAgeMs?: number;
}): Promise<Product[]> {
  const forceRefresh = opts?.forceRefresh ?? false;
  const maxAgeMs = opts?.maxAgeMs ?? ONE_DAY_MS;

  const local = (localProducts as unknown as Product[]) ?? [];
  const cached = await readCache();
  const base = cached?.length ? cached : local;

  const fresh = await isCacheFresh(maxAgeMs);
  const shouldTryOnline = forceRefresh || !fresh || !cached?.length;

  if (!shouldTryOnline) return base;

  try {
    const res = await fetch(PRODUCTS_URL, { cache: "no-store" });
    if (!res.ok) return base;

    const online = (await res.json()) as Product[];
    if (Array.isArray(online) && online.length) {
      await writeCache(online);
      return online;
    }
    return base;
  } catch {
    return base;
  }
}