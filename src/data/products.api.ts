// // src/data/products.api.ts
// import type { Product } from "./products";

// function toStr(v: any) {
//   return typeof v === "string" ? v : v == null ? "" : String(v);
// }

// function toNum(v: any) {
//   const n = typeof v === "number" ? v : Number(v);
//   return Number.isFinite(n) ? n : 0;
// }

// function toArrStr(v: any) {
//   if (Array.isArray(v)) return v.map((x) => toStr(x)).filter(Boolean);
//   return [];
// }

// function normalizeOne(p: any): Product {
//   const imageUrl = toStr(p.imageUrl || p.image || p.thumbnail || "");
//   const images = toArrStr(p.images);

//   const safeImages = images.length ? images : imageUrl ? [imageUrl] : [];

//   return {
//     id: toStr(p.id || p._id || p.slug || p.name),
//     slug: toStr(p.slug || ""),
//     name: toStr(p.name || ""),
//     brand: toStr(p.brand || "Generic"),
//     category: toStr(p.category || "skincare"),
//     concerns: toArrStr(p.concerns),

//     showPriceCTA: p.showPriceCTA ?? true, 

//     price: toNum(p.price),
//     currency: toStr(p.currency || "CAD"),
//     budget: toStr(p.budget || "$$"),
//     description: toStr(p.description || ""),
//     affiliateUrl: toStr(p.affiliateUrl || p.url || ""),
//     tag: toStr(p.tag || ""),
//     imageUrl,
//     images: safeImages,
//   };
// }


// export async function fetchProducts(): Promise<Product[]> {
//   const url = `https://www.stylebeauti.com/products.json?v=${Date.now()}`;

//   // IMPORTANT: In Expo/RN types, `cache` is not supported here.
//   const res = await fetch(url);

//   const text = await res.text();

//   if (!res.ok) {
//     throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
//   }

//   const data = JSON.parse(text);

//   // supports either: [ ... ] OR { products: [ ... ] }
//   const list = Array.isArray(data)
//     ? data
//     : Array.isArray(data?.products)
//       ? data.products
//       : [];

//   const isValidProduct = (p: Product) => !!(p.id && p.slug && p.name);

//   return list.map(normalizeOne).filter(isValidProduct);
// }


// src/data/products.api.ts /offline
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Product } from "./products";
import localProducts from "./products.local.json";

function toStr(v: any) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function toNum(v: any) {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toArrStr(v: any) {
  if (Array.isArray(v)) return v.map((x) => toStr(x)).filter(Boolean);
  return [];
}

function normalizeOne(p: any): Product {
  const imageUrl = toStr(p.imageUrl || p.image || p.thumbnail || "");
  const images = toArrStr(p.images);

  const safeImages = images.length ? images : imageUrl ? [imageUrl] : [];

  return {
    id: toStr(p.id || p._id || p.slug || p.name),
    slug: toStr(p.slug || ""),
    name: toStr(p.name || ""),
    brand: toStr(p.brand || "Generic"),
    category: toStr(p.category || "skincare"),
    concerns: toArrStr(p.concerns),

    showPriceCTA: p.showPriceCTA ?? true,

    price: toNum(p.price),
    currency: toStr(p.currency || "CAD"),
    budget: toStr(p.budget || "$$"),
    description: toStr(p.description || ""),
    affiliateUrl: toStr(p.affiliateUrl || p.url || ""),
    tag: toStr(p.tag || ""),
    imageUrl,
    images: safeImages,
  };
}

function parseList(data: any): any[] {
  // supports either: [ ... ] OR { products: [ ... ] }
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : [];
  return list;
}

function normalizeList(rawList: any[]): Product[] {
  const isValidProduct = (p: Product) => !!(p.id && p.slug && p.name);
  return rawList.map(normalizeOne).filter(isValidProduct);
}

const CACHE_KEY = "products_cache_v1";
const CACHE_TS_KEY = "products_cache_ts_v1";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// ✅ Your live URL (keep the one you already use)
function productsUrl() {
  return `https://www.stylebeauti.com/products.json?v=${Date.now()}`;
}

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

async function fetchOnlineNormalized(): Promise<Product[]> {
  const res = await fetch(productsUrl());
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = JSON.parse(text);
  const list = parseList(data);
  return normalizeList(list);
}

/**
 * Offline-first products:
 * 1) local bundled JSON (always)
 * 2) cached JSON (if exists)
 * 3) online fetch (if possible) -> updates cache
 *
 * Returns best available list; throws ONLY if everything is empty.
 */
export async function fetchProducts(opts?: {
  forceRefresh?: boolean;
  maxAgeMs?: number;
}): Promise<Product[]> {
  const forceRefresh = opts?.forceRefresh ?? false;
  const maxAgeMs = opts?.maxAgeMs ?? ONE_DAY_MS;

  // 1) Local fallback (normalize anyway, safe)
  const localRaw = parseList(localProducts as any);
  const local = normalizeList(localRaw);

  // 2) Cache
  const cached = await readCache();
  const base = cached?.length ? cached : local;

  // If we have something to show, never fail the screen.
  // We only try online refresh when needed.
  const fresh = await isCacheFresh(maxAgeMs);
  const shouldTryOnline = forceRefresh || !fresh || !cached?.length;

  if (!shouldTryOnline) {
    if (base.length) return base;
    // no cache + no local (rare)
    throw new Error("No products available offline.");
  }

  try {
    const online = await fetchOnlineNormalized();
    if (online.length) {
      await writeCache(online);
      return online;
    }
    // online returned empty -> use base
    if (base.length) return base;
    throw new Error("No products available (empty online + offline).");
  } catch (e) {
    // online failed -> use base
    if (base.length) return base;
    // if literally nothing exists
    throw e instanceof Error ? e : new Error("Failed to load products");
  }
}