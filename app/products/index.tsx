
// // //add big image
// //app/products/index.tsx
// import { useRouter } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

// import ProductCard from "@/src/components/ProductCard";
// import type { Product } from "@/src/data/products";
// import { fetchProducts } from "@/src/data/products.api";

// export default function ProductsScreen() {
//   const router = useRouter();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchProducts()
//       .then(setProducts)
//       .catch(() => setError("Failed to load products"))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <View style={{ flex: 1, padding: 18, backgroundColor: "#F7F7F7" }}>
//       {loading ? (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <ActivityIndicator />
//           <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading products...</Text>
//         </View>
//       ) : error ? (
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <Text style={{ fontWeight: "600" }}>{error}</Text>
//           <Text style={{ marginTop: 6, opacity: 0.7 }}>
//             Check your internet + that products.json is accessible.
//           </Text>
//         </View>
//       ) : (
//         <FlatList
//           data={products}
//           keyExtractor={(item) => item.id}
//           contentContainerStyle={{ gap: 14, paddingBottom: 22 }}
//           ListHeaderComponent={
//             <View style={{ marginBottom: 14 }}>
//               <Image
//                 source={require("@/assets/products/hero.png")}
//                 style={{ width: "100%", height: 250, borderRadius: 18 }}
//                 resizeMode="cover"
//               />
//               <Text style={{ fontSize: 24, fontWeight: "500", marginTop: 12 }}>
//                 Products
//               </Text>
//               <Text style={{ opacity: 0.65, marginTop: 6 }}>
//                 Curated skincare, beauty, and style picks.
//               </Text>
//             </View>
//           }
//           renderItem={({ item }) => (
//             <ProductCard
//               product={item}
//               onPress={() => router.push(`/products/${item.slug}`)}
//             />
//           )}
//         />
//       )}
//     </View>
//   );
// }


// app/products/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

import ProductCard from "@/src/components/ProductCard";
import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

export default function ProductsScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const Footer = (
    <View style={{ paddingVertical: 14, alignItems: "center" }}>
      <Text style={{ fontSize: 12, color: "#6B7280" }}>
        © 2026 Style & Beauty • We may earn commission from links.
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <TopNav
        title="Products"
        showBack
        onBackPress={() => router.back()}
        onMenuPress={() => setMenuOpen(true)}
      />

      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: "Home", onPress: () => router.push("/(tabs)") },
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Products", onPress: () => {} },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Saved", onPress: () => router.push("/(tabs)/saved") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading products...</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 18 }}>
          <Text style={{ fontWeight: "600" }}>{error}</Text>
          <Text style={{ marginTop: 6, opacity: 0.7, textAlign: "center" }}>
            Check your internet + that products.json is accessible.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ paddingHorizontal: 18 }}
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 14, paddingBottom: 18, paddingTop: 14 }}
          ListHeaderComponent={
            <View style={{ marginBottom: 14 }}>
              <Image
                source={require("@/assets/products/hero.png")}
                style={{ width: "100%", height: 250, borderRadius: 18 }}
                resizeMode="cover"
              />
              <Text style={{ fontSize: 24, fontWeight: "600", marginTop: 12, color: "#111827" }}>
                Products
              </Text>
              <Text style={{ opacity: 0.65, marginTop: 6, color: "#374151" }}>
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
          ListFooterComponent={Footer}
        />
      )}
    </View>
  );
}
