// app/(tabs)/explore.tsx
import { Ionicons } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import { isSaved, toggleSaved } from "@/src/lib/saved";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

import { Brand } from '@/constants/theme'; // adjust path

<Pressable
  style={{
    backgroundColor: Brand.primary,
  }}
>

</Pressable>

type Filter = "all" | string;

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: active ? Brand.primary : "#FFFFFF",
        borderWidth: 1,
        borderColor: active ? Brand.primary : "rgba(43,42,42,0.12)",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          color: active ? "#FFFFFF" : "rgba(43,42,42,0.75)",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function ProductImage({ uri }: { uri?: string }) {
  const [failed, setFailed] = useState(false);
  const show = !!uri && !failed;

  return (
    <View
      style={{
        width: 92,
        height: 92,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#EEE",
      }}
    >
      {show ? (
        <ExpoImage
          source={{ uri }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          cachePolicy="disk"
          onError={() => setFailed(true)}
        />
      ) : null}
    </View>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [err, setErr] = useState("");

  const [category, setCategory] = useState<Filter>("all");
  const [budget, setBudget] = useState<Filter>("all");
  const [concern, setConcern] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(true);

  const mountedRef = useRef(true);

  // network state
  useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refreshSavedMap = useCallback(async (list: Product[]) => {
    const pairs = await Promise.all(
      list.map(async (p) => [p.id, await isSaved(p.id)] as const)
    );
    const next: Record<string, boolean> = {};
    pairs.forEach(([id, ok]) => (next[id] = ok));
    if (mountedRef.current) setSavedMap(next);
  }, []);

  const loadProducts = useCallback(
    async (opts?: { forceRefresh?: boolean }) => {
      const forceRefresh = !!opts?.forceRefresh;

      try {
        forceRefresh ? setRefreshing(true) : setLoading(true);
        setErr("");

        const list = await fetchProducts({ forceRefresh });

        if (!mountedRef.current) return;
        setProducts(list);

        // saved map (don’t block UI too long, but keep correct)
        await refreshSavedMap(list);
      } catch (e: any) {
        if (!mountedRef.current) return;
        setErr(e?.message || "Failed to load products");
      } finally {
        if (!mountedRef.current) return;
        forceRefresh ? setRefreshing(false) : setLoading(false);
      }
    },
    [refreshSavedMap]
  );

  // initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Prefetch images when online so they appear offline later
  useEffect(() => {
    if (!isOnline) return;
    if (!products.length) return;

    const uris = products
      .map((p) => p.imageUrl || p.images?.[0])
      .filter(Boolean)
      .slice(0, 60) as string[];

    if (uris.length) ExpoImage.prefetch(uris);
  }, [products, isOnline]);

  const allConcerns = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.concerns || []).forEach((c) => set.add(c)));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory = category === "all" || p.category === category;
      const matchBudget = budget === "all" || p.budget === budget;
      const matchConcern = concern === "all" || (p.concerns || []).includes(concern);

      const matchQuery =
        !q ||
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q);

      return matchCategory && matchBudget && matchConcern && matchQuery;
    });
  }, [products, category, budget, concern, query]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
      <TopNav
        title="Explore"
        showBack={false}
        onBackPress={() => router.back()}
        onMenuPress={() => setMenuOpen(true)}
      />

      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: "Home", onPress: () => router.push("/(tabs)") },
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshing={refreshing}
        onRefresh={() => loadProducts({ forceRefresh: true })}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search product, brand, concern…"
              placeholderTextColor="rgba(55,55,55,0.35)"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.10)",
              }}
            />

            <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>Category</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["all", "skincare", "haircare", "clothing", "shoes", "bags", "accessories"].map((c) => (
                <Chip
                  key={c}
                  label={c === "all" ? "All" : c}
                  active={category === c}
                  onPress={() => setCategory(c)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Budget</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["all", "$", "$$", "$$$"].map((b) => (
                <Chip
                  key={b}
                  label={b === "all" ? "All" : b}
                  active={budget === b}
                  onPress={() => setBudget(b)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Concern</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {allConcerns.slice(0, 8).map((c) => (
                <Chip
                  key={c}
                  label={c === "all" ? "All" : c.replace(/-/g, " ")}
                  active={concern === c}
                  onPress={() => setConcern(c)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
              {loading ? "Loading products…" : err ? `Error: ${err}` : `Showing ${filtered.length} products`}
              {!isOnline ? " • Offline" : ""}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const image = item.imageUrl || item.images?.[0];
          const saved = !!savedMap[item.id];

          return (
            <Pressable
              onPress={() => router.push(`/products/${item.slug}`)}
              style={{
                backgroundColor: "#FFFFFF",
                marginHorizontal: 16,
                marginBottom: 14,
                borderRadius: 22,
                padding: 12,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <ProductImage uri={image} />

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600", fontSize: 15, color: "#1F1F1F" }} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={{ fontSize: 12, color: "#6B6B6B", marginTop: 3 }} numberOfLines={1}>
                    {item.brand} • {item.budget} • Check price from retailer
                  </Text>

                  {!!item.tag && (
                    <View
                      style={{
                        marginTop: 6,
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(230, 164, 181, 0.82)",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "700", color: "#2A2A2A" }}>{item.tag}</Text>
                    </View>
                  )}
                </View>

                <Pressable
                  onPress={async (e: any) => {
                    e.stopPropagation?.();

                    const payload = {
                      id: item.id,
                      slug: item.slug,
                      name: item.name,
                      brand: item.brand ?? "",
                      category: item.category ?? "",
                      concerns: item.concerns ?? [],
                      price: typeof (item as any).price === "number" ? (item as any).price : 0,
                      currency: (item as any).currency ?? "CAD",
                      budget: item.budget ?? "",
                      description: item.description ?? "",
                      affiliateUrl: item.affiliateUrl ?? "",
                      tag: item.tag ?? "",
                      imageUrl: image ?? "",
                      images: item.images ?? (image ? [image] : []),
                      showPriceCTA: (item as any).showPriceCTA ?? true,
                    };

                    const nextIsSaved = await toggleSaved(payload as any);
                    setSavedMap((m) => ({ ...m, [item.id]: nextIsSaved }));
                  }}
                  hitSlop={10}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.10)",
                    backgroundColor: "white",
                  }}
                >
                  <Ionicons
                    name={saved ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={saved ? Brand.primary : "rgba(43,42,42,0.7)"}
                  />
                </Pressable>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

