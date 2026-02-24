// app/looks/[id].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { fetchLooks, type Look } from "@/src/data/looks.api";
import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

type LookItemView = { product: Product; label?: string };

export default function LookDetailScreen() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [looks, setLooks] = React.useState<Look[]>([]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // ✅ Hooks must be ABOVE any early return
  const look = React.useMemo(() => looks.find((l) => l.id === id), [looks, id]);

  const productById = React.useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((p) => map.set(p.id, p));
    return map;
  }, [products]);

  const items: LookItemView[] = React.useMemo(() => {
    if (!look) return [];
    return (look.items || [])
      .map((li) => {
        const p = productById.get(li.productId);
        return p ? { product: p, label: li.label } : null;
      })
      .filter(Boolean) as LookItemView[];
  }, [look, productById]);

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // fetch both in parallel
        const [looksData, productsData] = await Promise.all([
          fetchLooks(),
          fetchProducts(),
        ]);

        if (!alive) return;
        setLooks(looksData);
        setProducts(productsData);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message || "Failed to load data");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // ✅ Now early returns are safe
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAF7F4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
        <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAF7F4",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <Text style={{ fontWeight: "700" }}>Couldn’t load data</Text>
        <Text style={{ marginTop: 6, opacity: 0.7, textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );
  }

  if (!look) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAF7F4",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Look not found.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F4" }}>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerTransparent: true,
          headerTintColor: "#2B2B2B",
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* HERO */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: look.imageUrl }}
            style={{ width: "100%", height: 320 }}
            resizeMode="cover"
          />

          {/* overlay title */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              padding: 16,
              backgroundColor: "rgba(250,247,244,0.78)",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "800" }}>{look.title}</Text>
            {!!look.subtitle && (
              <Text style={{ marginTop: 4, opacity: 0.75 }}>{look.subtitle}</Text>
            )}
          </View>
        </View>

        {/* CONTENT */}
        <View style={{ padding: 16 }}>
          <Text style={{ marginTop: 8, fontSize: 14, fontWeight: "700", opacity: 0.7 }}>
            Items in this look
          </Text>

          {items.map(({ product, label }) => (
            <Pressable
              key={product.id}
              onPress={() => product.affiliateUrl && Linking.openURL(product.affiliateUrl)}
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                padding: 12,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={{ width: 56, height: 56, borderRadius: 12 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={{ fontWeight: "700" }} numberOfLines={1}>
                  {label ? `${label}: ` : ""}
                  {product.name}
                </Text>
                <Text style={{ marginTop: 3, opacity: 0.7 }} numberOfLines={1}>
                  {product.brand} • {product.budget}
                </Text>
              </View>
            </Pressable>
          ))}

          {items.length === 0 && (
            <Text style={{ marginTop: 12, opacity: 0.7 }}>
              No products matched for this look yet (check productId values).
            </Text>
          )}
        </View>

        <View style={{ marginTop: 30, marginBottom: 15, alignItems: "center" }}>
          <View style={{ height: 2, width: 70, backgroundColor: "#DDD", marginBottom: 12 }} />
          <Text style={{ fontSize: 12, opacity: 0.5 }}>
            © 2026 Style & Beauty • We may earn commission from links.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

