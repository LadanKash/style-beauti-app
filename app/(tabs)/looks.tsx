// app/(tabs)/looks.tsx
// app/(tabs)/looks.tsx
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from "react-native";

import { fetchLooks, type Look } from "@/src/data/looks.api";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

export default function LooksTabScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [looks, setLooks] = React.useState<Look[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const menuItems = React.useMemo(
    () => [
      { label: "Home", onPress: () => router.push("/") },
      { label: "Explore", onPress: () => router.push("/explore") },
      // { label: "Products", onPress: () => router.push("/products") },
      { label: "Inspiration Looks", onPress: () => router.push("/looks") },
      { label: "Collection", onPress: () => router.push("/lists") },
      { label: "Find my routine", onPress: () => router.push("/routine") },
      { label: "Saved routines", onPress: () => router.push("/saved-routines") },
      { label: "Disclosure", onPress: () => router.push("/disclosure") },
      { label: "Privacy", onPress: () => router.push("/privacy") },
    ],
    [router]
  );

  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchLooks();
        if (alive) setLooks(data);
      } catch (e: any) {
        if (alive) setError(e?.message || "Failed to load looks");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F4" }}>
      <TopNav
        title="Inspiration Looks"
        showBack={false}
        onBackPress={() => router.back()}
        onMenuPress={() => setMenuOpen(true)}
      />

      {/* THIS is what makes hamburger open the menu */}
      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        side="right"
        width={300}
      />

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading Inspiration Looks…</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
          <Text style={{ fontWeight: "800" }}>Looks failed to load</Text>
          <Text style={{ marginTop: 8, opacity: 0.7, textAlign: "center" }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          data={looks}
          keyExtractor={(l) => l.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: "/looks/[id]", params: { id: item.id } })}
              style={({ pressed }) => [
                {
                  backgroundColor: "white",
                  borderRadius: 24,
                  overflow: "hidden",
                  marginBottom: 14,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                  opacity: pressed ? 0.98 : 1,
                },
              ]}
            >
              <Image source={{ uri: item.imageUrl }} style={{ width: "100%", height: 180 }} resizeMode="cover" />
              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
                {!!item.subtitle && <Text style={{ marginTop: 4, opacity: 0.7 }}>{item.subtitle}</Text>}
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}