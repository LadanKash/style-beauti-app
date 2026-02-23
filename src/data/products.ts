// src/data/products.ts

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  concerns: string[];
  price: number;
  showPriceCTA?: boolean;
  currency: string;
  budget: string;
  description: string;
  affiliateUrl: string;
  tag: string;
  imageUrl: string;
  images: string[];
};

export const products: Product[] = [
  // ...
];
