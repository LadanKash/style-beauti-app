
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { products, type Product } from "../../src/data/products";
import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

/* ---------------- TYPES ---------------- */
type CategoryFilter = "all" | Product["category"];
type BudgetFilter = "all" | Product["budget"];
type ConcernFilter = "all" | string;

/* ---------------- CHIP ---------------- */
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
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: active ? "#E6A4B4" : "white",
        borderWidth: 1,
        borderColor: active ? "#E6A4B4" : "rgba(43, 42, 42, 0.12)",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "700",
          color: active ? "white" : "rgba(43, 42, 42, 0.75)",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* ---------------- SCREEN ---------------- */
export default function ExploreScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [category, setCategory] = useState<CategoryFilter>("all");
  const [budget, setBudget] = useState<BudgetFilter>("all");
  const [concern, setConcern] = useState<ConcernFilter>("all");
  const [query, setQuery] = useState("");

  const allConcerns = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.concerns.forEach((c) => set.add(c)));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return products.filter((p) => {
      const matchCategory = category === "all" || p.category === category;
      const matchBudget = budget === "all" || p.budget === budget;
      const matchConcern = concern === "all" || p.concerns.includes(concern);

      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);

      return matchCategory && matchBudget && matchConcern && matchQuery;
    });
  }, [category, budget, concern, query]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
      <TopNav
        title="Explore"
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
    { label: "Products", onPress: () => router.push("/products") },
    { label: "Find my routine", onPress: () => router.push("/routine") },
    { label: "Disclosure", onPress: () => router.push("/disclosure") },
    { label: "Privacy", onPress: () => router.push("/privacy") },
  ]}
/>


      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search product, brand, concern…"
              placeholderTextColor="rgba(55, 55, 55, 0.35)"
              style={{
                backgroundColor: "white",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.1)",
              }}
            />

            <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
              Category
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["all", "skincare", "haircare", "clothing", "bags", "accessories"].map(
                (c) => (
                  <Chip
                    key={c}
                    label={c === "all" ? "All" : c}
                    active={category === c}
                    onPress={() => setCategory(c as CategoryFilter)}
                  />
                )
              )}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>
              Budget
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {["all", "$", "$$", "$$$"].map((b) => (
                <Chip
                  key={b}
                  label={b}
                  active={budget === b}
                  onPress={() => setBudget(b as BudgetFilter)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>
              Concern
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {allConcerns.slice(0, 6).map((c) => (
                <Chip
                  key={c}
                  label={c === "all" ? "All" : c.replace("-", " ")}
                  active={concern === c}
                  onPress={() => setConcern(c)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
              Showing {filtered.length} products
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const image = item.images?.[0];

          return (
            <Pressable
              onPress={() => router.push(`/products/${item.slug}`)}
              style={{
                backgroundColor: "white",
                marginHorizontal: 16,
                marginBottom: 14,
                borderRadius: 22,
                padding: 12,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    width: 90,
                    height: 120,
                    borderRadius: 16,
                    overflow: "hidden",
                    backgroundColor: "#eee",
                  }}
                >
                  {!!image && (
                    <Image
                      source={image}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  )}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: "#6B6B6B" }}>
                    {item.brand}
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "#2A2A2A",
                      marginVertical: 4,
                    }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ fontSize: 13, color: "#4B5563" }}>
                    ${item.price} {item.currency ?? "CAD"} • {item.budget}
                  </Text>

                  {!!item.tag && (
                    <View
                      style={{
                        marginTop: 6,
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(230,164,180,0.25)",
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 999,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "500", color: "#2A2A2A" }}>
                        {item.tag}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
