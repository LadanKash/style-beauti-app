
// app/(tabs)/saved-routines.tsx
import { theme } from "@/src/constants/theme";
import {
  deleteRoutine,
  getRoutines,
  type SavedRoutine,
} from "@/src/storage/routines";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

export default function SavedRoutinesScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [routines, setRoutines] = React.useState<SavedRoutine[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    setLoading(true);
    const list = await getRoutines();
    setRoutines(list);
    setLoading(false);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, [load])
  );

  const onDelete = (id: string) => {
    Alert.alert("Delete routine?", "This will remove it from your phone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteRoutine(id);
          setRoutines(await getRoutines());
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TopNav
        title="Saved routines"
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
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          {
            label: "Saved routines",
            onPress: () => router.push("/(tabs)/saved-routines"),
          },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <ScrollView contentContainerStyle={{ padding: 14, gap: 12 }}>
        {loading ? (
          <Text style={{ opacity: 0.7 }}>Loading…</Text>
        ) : routines.length === 0 ? (
          <Text style={{ opacity: 0.7 }}>
            No saved routines yet. Go to “Find my routine” and tap “Save this
            routine”.
          </Text>
        ) : (
          routines.map((r) => (
            <View
              key={r.id}
              style={{
                backgroundColor: theme.surface,
                borderRadius: 18,
                padding: 14,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <Text style={{ fontWeight: "600", fontSize: 16 }} numberOfLines={1}>
                {r.name}
              </Text>

              <Text style={{ opacity: 0.7, marginTop: 6 }}>
                {r.productIds.length} items •{" "}
                {new Date(r.createdAt).toLocaleDateString()}
              </Text>

              <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                {/* Open */}
                <Pressable
                  onPress={() => router.push(`/saved/${r.id}`)}
                  style={{
                    flex: 1,
                    backgroundColor: theme.accent,
                    paddingVertical: 12,
                    borderRadius: 999,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Ionicons name="eye-outline" size={18} color="#fff" />
                    <Text style={{ color: "#fff", fontWeight: "800" }}>Open</Text>
                  </View>
                </Pressable>

                {/* Delete */}
                <Pressable
                  onPress={() => onDelete(r.id)}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.12)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="trash-outline" size={18} color="#111" />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}