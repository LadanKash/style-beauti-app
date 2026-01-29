import ProductCard from "@/src/components/ProductCard";
import { products } from "@/src/data/products";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Text, View } from "react-native";
import Page from "../components/Page";

export default function ProductsIndexPage() {
  const router = useRouter();

  const data = useMemo(() => products, []);

  return (
    <Page>
    <View style={{ flex: 1, backgroundColor: "#F7F7F4", paddingHorizontal: 24, paddingTop: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 12, color: "#2A2A2A" }}>
        Products
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 14, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/products/${item.slug}`)}  // opens your [slug].tsx
          />
        )}
      />
    </View>
    </Page>
  );
}
