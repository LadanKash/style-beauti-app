// app/saved/[id].tsx
import { theme } from "@/src/constants/theme";
import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import { deleteRoutine, getRoutineById } from "@/src/storage/routines";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

const CARD_MAX = 520;

export default function SavedRoutineDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [err, setErr] = React.useState("");
  const [routineName, setRoutineName] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState<number>(Date.now());
  const [items, setItems] = React.useState<Product[]>([]);

  const load = React.useCallback(async () => {
    setLoading(true);
    setErr("");

    try {
      const routine = await getRoutineById(String(id));
      if (!routine) {
        setErr("Saved routine not found.");
        setLoading(false);
        return;
      }

      setRoutineName(routine.name);
      setCreatedAt(routine.createdAt);

      const all = await fetchProducts();
      const picked = routine.productIds
        .map((pid) => all.find((p) => p.id === pid))
        .filter(Boolean) as Product[];

      setItems(picked);
    } catch (e: any) {
      setErr(e?.message || "Failed to load saved routine.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  React.useEffect(() => {
    load();
  }, [load]);

  const onDelete = async () => {
    Alert.alert("Delete routine?", "This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteRoutine(String(id));
          router.back();
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TopNav
        title="Saved routine"
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
          { label: "Look", onPress: () => router.push("/looks") },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Saved", onPress: () => router.push("/(tabs)/saved") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: 30 }}>
        <View style={{ alignSelf: "center", width: "100%", maxWidth: CARD_MAX }}>
          {/* Header card */}
          <View
            style={{
              backgroundColor: theme.surface,
              borderRadius: 18,
              padding: 14,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18 }} numberOfLines={2}>
              {routineName || "Saved routine"}
            </Text>

            <Text style={{ opacity: 0.7, marginTop: 6 }}>
              {items.length} items • {new Date(createdAt).toLocaleDateString()}
            </Text>

            <Pressable
              onPress={onDelete}
              style={{
                marginTop: 12,
                backgroundColor: "#1F1F1F",
                paddingVertical: 12,
                borderRadius: 999,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Delete routine</Text>
            </Pressable>
          </View>

          {loading ? (
            <Text style={{ marginTop: 14, opacity: 0.7 }}>Loading…</Text>
          ) : err ? (
            <Text style={{ marginTop: 14, color: "#B00020" }}>{err}</Text>
          ) : (
            <View style={{ marginTop: 14, gap: 12 }}>
              {items.map((p) => (
                <Pressable
                  key={p.id}
                  onPress={() => router.push(`/products/${p.slug}`)}
                  style={{
                    backgroundColor: theme.surface,
                    borderRadius: 18,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.08)",
                  }}
                >
                  {!!p.imageUrl && (
                    <Image
                      source={{ uri: p.imageUrl }}
                      style={{
                        width: "100%",
                        height: 260, // BIG image (change 220-320 if you want)
                        backgroundColor: "rgba(0,0,0,0.03)",
                      }}
                      resizeMode="cover"
                    />
                  )}

                  <View style={{ padding: 14 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16 }} numberOfLines={2}>
                      {p.name}
                    </Text>

                    <Text style={{ marginTop: 6, opacity: 0.75 }} numberOfLines={1}>
                      {p.brand} • {p.budget} • Check price from retailer
                    </Text>

                    {!!p.description && (
                      <Text style={{ marginTop: 10, opacity: 0.8 }} numberOfLines={3}>
                        {p.description}
                      </Text>
                    )}

                    <View
                      style={{
                        marginTop: 12,
                        backgroundColor: theme.accent,
                        paddingVertical: 12,
                        borderRadius: 999,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "600" }}>Open product</Text>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={{ marginTop: 14, opacity: 0.55 }}>
            Affiliate disclosure: We may earn commission from some links.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}