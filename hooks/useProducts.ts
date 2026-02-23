import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import * as React from "react";

export function useProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        if (mounted) setProducts(data);
      } catch (e: any) {
        if (mounted) setError(e?.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { products, loading, error };
}
