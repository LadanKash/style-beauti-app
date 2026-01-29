// import { lists, posts } from "@/src/data/lists";
// import { useLocalSearchParams, useRouter } from "expo-router";

// import React from "react";
// import { FlatList, Image, Pressable, Text, View } from "react-native";

// export default function ListDetail() {
//   const { listId } = useLocalSearchParams<{ listId: string }>();
//   const list = lists.find((l) => l.id === listId);
//   const filtered = posts.filter((p) => p.listId === listId);
//   const router = useRouter();
//   return (
//     <View style={{ flex: 1, padding: 14 }}>
//       <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 10 }}>
//         {list?.title ?? "List"}
//       </Text>

//       <FlatList
//         data={filtered}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         columnWrapperStyle={{ gap: 12 }}
//         contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
//      renderItem={({ item }) => (
//   <Pressable
//     onPress={() => router.push(`/posts/${item.id}`)}
//     style={{
//       flex: 1,
//       borderRadius: 16,
//       overflow: "hidden",
//       backgroundColor: "#fff",
//       borderWidth: 1,
//       borderColor: "#eee",
//     }}
//   >
//    <Image
//   source={item.image} // ✅ local require
//   style={{ width: "100%", height: 180 }}
//   resizeMode="cover"
// />

//     <View style={{ padding: 10 }}>
//       <Text numberOfLines={2} style={{ fontWeight: "500" }}>
//         {item.caption}
//       </Text>
//     </View>
//   </Pressable>
// )}

//       />
//     </View>
//   );
// }


import { lists, posts } from "@/src/data/lists";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
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
              <Image
                source={item.image}
                style={{ width: "100%", height: 180 }}
                resizeMode="cover"
              />

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
