// app/lists/[listId].tsx
import { lists, posts } from "@/src/data/lists";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import CachedImage from "../components/CachedImageBox";
import Page from "../components/Page";

export default function ListDetail() {
  const { listId } = useLocalSearchParams<{ listId: string }>();
  const router = useRouter();

  const list = useMemo(() => lists.find((l) => l.id === listId), [listId]);
  const filtered = useMemo(
    () => posts.filter((p) => p.listId === listId),
    [listId]
  );

  return (
    <Page title={list?.title ?? "List"} showBack>
      <View style={{ flex: 1, padding: 14 }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12 }}
          contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/posts/${item.id}`)}
              style={{
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#eee",
              }}
            >
              <CachedImage source={item.image} height={180} />

              <View style={{ padding: 10 }}>
                <Text numberOfLines={2} style={{ fontWeight: "500" }}>
                  {item.caption}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>
    </Page>
  );
}
