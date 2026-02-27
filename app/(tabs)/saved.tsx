// app/(tabs)/saved.tsx
import { getSaved, removeSaved, type SavedProduct, updateSavedNote } from "@/src/lib/saved";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Linking, Modal, Pressable, Text, TextInput, View } from "react-native";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

export default function SavedScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [items, setItems] = React.useState<SavedProduct[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [noteOpen, setNoteOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState("");

  const EmptySaved = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Saved</Text>
      <Text style={{ marginTop: 6, opacity: 0.7, textAlign: "center" }}>
        Your saved picks are stored on this device.
      </Text>

      <Text style={{ marginTop: 28, opacity: 0.75, textAlign: "center" }}>
        No saved items yet. Tap the bookmark on a product to add it here.
      </Text>
    </View>
  );

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSaved();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  function openNoteEditor(item: SavedProduct) {
    setActiveId(item.id);
    setDraft(item.note ?? "");
    setNoteOpen(true);
  }

  async function saveNote() {
    if (!activeId) return;
    const next = await updateSavedNote(activeId, draft.trim());
    setItems(next);
    setNoteOpen(false);
    setActiveId(null);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F4" }}>
      <TopNav
        title="Saved"
        onMenuPress={() => setMenuOpen(true)}
        // It’s a tab screen → typically no back button:
        // If your TopNav shows back by default, make sure showBack={false} exists in TopNav props.
        // If not supported, just leave it out.
        showBack={false as any}
      />

      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: "Home", onPress: () => router.push("/(tabs)") },
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          // { label: "Products", onPress: () => router.push("/products") },
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          // { label: "Saved", onPress: () => router.push("/(tabs)/saved") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <FlatList
        style={{ flex: 1 }}
        data={items}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={!loading ? <EmptySaved /> : null}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 110,
          flexGrow: items.length === 0 ? 1 : 0,
        }}
        renderItem={({ item }) => {
          const note = (item.note ?? "").trim();

          return (
            <View style={{ backgroundColor: "white", borderRadius: 16, padding: 12, marginBottom: 12 }}>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: item.imageUrl || "https://via.placeholder.com/150" }}
                  style={{ width: 72, height: 72, borderRadius: 12 }}
                />

                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600" }} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={{ opacity: 0.7, marginTop: 4 }} numberOfLines={1}>
                    {item.brand} • {item.budget}
                  </Text>

                  <Text style={{ marginTop: 6, opacity: 0.85 }} numberOfLines={2}>
                    {note ? `📝 ${note}` : "📝 Add a note (gift idea, try later, etc.)"}
                  </Text>

                  <View style={{ flexDirection: "row", marginTop: 10, flexWrap: "wrap" }}>
                    <View style={{ marginRight: 12, marginBottom: 6 }}>
                      <Pressable
                        onPress={() => {
                          if (item.affiliateUrl) Linking.openURL(item.affiliateUrl);
                        }}
                      >
                        <Text style={{ fontWeight: "600" }}>Open</Text>
                      </Pressable>
                    </View>

                    <View style={{ marginRight: 12, marginBottom: 6 }}>
                      <Pressable onPress={() => openNoteEditor(item)}>
                        <Text style={{ fontWeight: "600" }}>{note ? "Edit note" : "Add note"}</Text>
                      </Pressable>
                    </View>

                    <View style={{ marginRight: 12, marginBottom: 6 }}>
                      <Pressable
                        onPress={async () => {
                          const next = await removeSaved(item.id);
                          setItems(next);
                        }}
                      >
                        <Text style={{ fontWeight: "600", opacity: 0.7 }}>Remove</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Fixed footer */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
          alignItems: "center",
        }}
      >
        <View style={{ height: 2, width: 70, backgroundColor: "#DDD", marginBottom: 12 }} />
        <Text style={{ fontSize: 12, opacity: 0.6 }}>
          © {new Date().getFullYear()} Style & Beauty • We may earn commission from links.
        </Text>
      </View>

      {/* Note modal */}
      <Modal visible={noteOpen} animationType="slide" transparent>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "flex-end" }}>
          <View style={{ backgroundColor: "white", padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>Add a note</Text>

            <TextInput
              value={draft}
              onChangeText={setDraft}
              placeholder="Example: Gift idea / good for winter / try later"
              multiline
              style={{
                marginTop: 12,
                minHeight: 90,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.15)",
                borderRadius: 14,
                padding: 12,
                textAlignVertical: "top",
              }}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 14 }}>
              <Pressable
                onPress={() => {
                  setNoteOpen(false);
                  setActiveId(null);
                }}
                style={{ marginRight: 12 }}
              >
                <Text style={{ fontWeight: "700", opacity: 0.7 }}>Cancel</Text>
              </Pressable>

              <Pressable onPress={saveNote}>
                <Text style={{ fontWeight: "700" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}