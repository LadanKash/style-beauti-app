import { lists } from "@/src/data/lists";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Page from "../components/Page";

export default function ListsTab() {
  return (
    <Page title="Idea Lists">
    <View style={{ flex: 1, padding: 14 }}>
      <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>
        Idea Lists
      </Text>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        renderItem={({ item }) => (

<Pressable
  onPress={() => router.push(`/lists/${item.id}`)}
  
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
  source={item.coverImage} 
  style={{ width: "100%", height: 120 }}
  resizeMode="cover"
/>


  <View style={{ padding: 10 }}>
    <Text style={{ fontWeight: "500" }}>{item.title}</Text>
  </View>
</Pressable>


        )}
      />
    </View>
    </Page>
  );
}
