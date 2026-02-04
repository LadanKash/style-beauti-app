// src/data/products.ts
// src/data/products.ts

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;      // "skincare" | "haircare" | ...
  concerns: string[];    // ["hydration", "wrinkles"]
  price: number;
  currency: string;      // "CAD"
  budget: string;        // "$" | "$$" | "$$$"
  description: string;
  affiliateUrl: string;
  tag: string;
  imageUrl: string;      // main image URL
  images: string[];      // gallery image URLs
};

