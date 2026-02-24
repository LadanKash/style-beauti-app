// import type { Product } from "@/src/data/products";
// import { fetchProducts } from "@/src/data/products.api";
// import * as React from "react";

// export function useProducts() {
//   const [products, setProducts] = React.useState<Product[]>([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState<string | null>(null);

//   React.useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         // const data = await fetchProducts();
//         const data = await fetchProducts({ forceRefresh: true });
//         if (mounted) setProducts(data);
//       } catch (e: any) {
//         if (mounted) setError(e?.message || "Failed to load products");
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return { products, loading, error };
// }

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import * as React from "react";

export function useProducts() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async (opts?: { forceRefresh?: boolean }) => {
    try {
      opts?.forceRefresh ? setRefreshing(true) : setLoading(true);
      setError(null);
      const data = await fetchProducts({ forceRefresh: !!opts?.forceRefresh });
      setProducts(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load products");
    } finally {
      opts?.forceRefresh ? setRefreshing(false) : setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await load();
    })();
    return () => {
      mounted = false;
    };
  }, [load]);

  const refresh = React.useCallback(() => load({ forceRefresh: true }), [load]);

  return { products, loading, refreshing, error, refresh };
}