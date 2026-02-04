// app/(tabs)/saved.tsx
import { getSaved, removeSaved, SavedProduct } from "@/src/lib/saved";
import { useFocusEffect } from "expo-router";
import React from "react";
import { FlatList, Image, Linking, Pressable, Text, View } from "react-native";

export default function SavedScreen() {
  const [items, setItems] = React.useState<SavedProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setLoading(true);
    const data = await getSaved();
    setItems(data);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  // ✅ Refresh when user switches back to this tab
  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [load])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }}>
        <Text style={{ fontSize: 20, fontWeight: "800", color: "#1F1F1F" }}>
          Saved
        </Text>
        <Text style={{ marginTop: 10, color: "#666" }}>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 66, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 20, fontWeight: "600", color: "#1F1F1F" }}>
        Saved
      </Text>
      <Text style={{ marginTop: 14, color: "#666" }}>
        Your saved picks are stored on this device.
      </Text>

      {items.length === 0 ? (
        <View style={{ marginTop: 18 }}>
          <Text style={{ color: "#444" }}>
            No saved items yet. Tap the bookmark on a product to add it here.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ marginTop: 14 }}
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 12, paddingBottom: 30 }}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.10)",
                borderRadius: 18,
                overflow: "hidden",
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flexDirection: "row", gap: 12, padding: 12 }}>
                <Image
                  source={{ uri: item.imageUrl || item.images?.[0] }}
                  style={{
                    width: 84,
                    height: 84,
                    borderRadius: 14,
                    backgroundColor: "#eee",
                  }}
                  resizeMode="cover"
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontWeight: "800", fontSize: 15, color: "#1F1F1F" }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text style={{ opacity: 0.65, marginTop: 3 }} numberOfLines={1}>
                    {item.brand} • {item.budget} • {item.price} {item.currency || "CAD"}
                  </Text>

                  {!!item.tag && (
                    <View
                      style={{
                        marginTop: 8,
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(230,164,180,0.25)",
                        paddingHorizontal: 10, // ✅ fixed spelling
                        paddingVertical: 5,
                        borderRadius: 999,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "600", color: "#2A2A2A" }}>
                        {item.tag}
                      </Text>
                    </View>
                  )}

                  <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                    <Pressable
                      onPress={async () => {
                        if (!item.affiliateUrl) return;
                        const can = await Linking.canOpenURL(item.affiliateUrl);
                        if (can) Linking.openURL(item.affiliateUrl);
                      }}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        backgroundColor: "#111", // ✅ make sure it's exactly this
                      }}
                      accessibilityRole="button"
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>Open</Text>
                    </Pressable>

                    <Pressable
                      onPress={async () => {
                        const next = await removeSaved(item.id);
                        setItems(next);
                      }}
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.12)",
                        backgroundColor: "#fff",
                      }}
                      accessibilityRole="button"
                    >
                      <Text style={{ color: "#111", fontWeight: "700" }}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
