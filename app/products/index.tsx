
// //add big image
// import { useRouter } from "expo-router";
// import React from "react";
// import { FlatList, Image, Text, View } from "react-native";

// import ProductCard from "@/src/components/ProductCard";
// import { products } from "@/src/data/products";

// export default function ProductsScreen() {
//   const router = useRouter();

//   return (
//     <View style={{ flex: 1, padding: 18, backgroundColor: "#F7F7F7" }}>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ gap: 14, paddingBottom: 22 }}
//         ListHeaderComponent={
//           <View style={{ marginBottom: 14 }}>
//             <Image
//               source={require("@/assets/products/hero.png")}
//               style={{ width: "100%", height: 250, borderRadius: 18 }}
//               resizeMode="cover"
//             />
//             <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 12 }}>
//               Products
//             </Text>
//             <Text style={{ opacity: 0.65, marginTop: 6 }}>
//               Curated skincare, beauty, and style picks.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <ProductCard
//             product={item}
//             onPress={() => router.push(`/products/${item.slug}`)}
//           />
//         )}
//       />
//     </View>
//   );
// }


import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import ProductCard from "@/src/components/ProductCard";
import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

export default function ProductsScreen() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, padding: 18, backgroundColor: "#F7F7F7" }}>
      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontWeight: "700" }}>{error}</Text>
          <Text style={{ marginTop: 6, opacity: 0.7 }}>
            Check your internet + that products.json is accessible.
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 14, paddingBottom: 22 }}
          ListHeaderComponent={
            <View style={{ marginBottom: 14 }}>
              <Image
                source={require("@/assets/products/hero.png")}
                style={{ width: "100%", height: 250, borderRadius: 18 }}
                resizeMode="cover"
              />
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 12 }}>
                Products
              </Text>
              <Text style={{ opacity: 0.65, marginTop: 6 }}>
                Curated skincare, beauty, and style picks.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => router.push(`/products/${item.slug}`)}
            />
          )}
        />
      )}
    </View>
  );
}
