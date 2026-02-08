// //src/data/products.api.ts
// src/data/products.api.ts
// src/data/products.api.ts
import type { Product } from "./products";

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

    showPriceCTA: p.showPriceCTA ?? true, // ✅ ADD THIS

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

// function normalizeOne(p: any): Product {
//   const imageUrl = toStr(p.imageUrl || p.image || p.thumbnail || "");
//   const images = toArrStr(p.images);

//   // if images missing but imageUrl exists, put it as first image
//   const safeImages = images.length ? images : imageUrl ? [imageUrl] : [];

//   return {
//     id: toStr(p.id || p._id || p.slug || p.name),
//     slug: toStr(p.slug || ""),
//     name: toStr(p.name || ""),
//     brand: toStr(p.brand || "Generic"),
//     category: toStr(p.category || "skincare"),
//     concerns: toArrStr(p.concerns),
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

export async function fetchProducts(): Promise<Product[]> {
  const url = `https://www.stylebeauti.com/products.json?v=${Date.now()}`;

  // IMPORTANT: In Expo/RN types, `cache` is not supported here.
  const res = await fetch(url);

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = JSON.parse(text);

  // supports either: [ ... ] OR { products: [ ... ] }
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
      ? data.products
      : [];

  const isValidProduct = (p: Product) => !!(p.id && p.slug && p.name);

  return list.map(normalizeOne).filter(isValidProduct);
}
