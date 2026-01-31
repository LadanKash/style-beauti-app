export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  concerns: string[];
  price: number;
  currency: string;
  budget: string;
  description: string;
  affiliateUrl: string;
  tag: string;
  imageUrl: string;
  images?: string[];
};

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    `https://style-beauty.vercel.app/products.json?v=${Date.now()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to load products");
  }

  return res.json();
}

