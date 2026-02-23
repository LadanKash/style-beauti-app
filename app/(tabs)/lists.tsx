//app/(tabs)/lists.tsx
// // app/(tabs)/lists.tsx
// import { lists } from "@/src/data/lists";
// import { router } from "expo-router";
// import React from "react";
// import { FlatList, Pressable, Text, View } from "react-native";
// import CachedImage from "../components/CachedImageBox";
// import Page from "../components/Page";

// export default function ListsTab() {
//   return (
//     <Page title="Idea Lists">
//       <View style={{ flex: 1, padding: 14 }}>
//         <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>
//           Collection
//         </Text>

//         <FlatList
//           data={lists}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           columnWrapperStyle={{ gap: 12 }}
//           contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
//           renderItem={({ item }) => (
//             <Pressable
//               onPress={() => router.push(`/lists/${item.id}`)}
//               style={{
//                 flex: 1,
//                 borderRadius: 16,
//                 overflow: "hidden",
//                 backgroundColor: "#fff",
//                 borderWidth: 1,
//                 borderColor: "#eee",
//               }}
//             >
//               <CachedImage source={item.coverImage} height={120} />

//               <View style={{ padding: 10 }}>
//                 <Text style={{ fontWeight: "500" }}>{item.title}</Text>
//               </View>
//             </Pressable>
//           )}
//         />
//       </View>
//     </Page>
//   );
// }

// app/(tabs)/lists.tsx
import { lists } from "@/src/data/lists";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import CachedImage from "../components/CachedImageBox";
import Page from "../components/Page";


const SITE = "https://stylebeauti.com";
function abs(u: any) {
  // only fix strings like "/onboarding/x.jpg"
  if (typeof u === "string" && u.startsWith("/")) return `${SITE}${u}`;
  return u;
}

export default function ListsTab() {
  return (
    <Page title="Idea Lists">
      <View style={{ flex: 1, padding: 14 }}>
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 12 }}>
          Collection
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
            
              <CachedImage source={abs(item.coverImage)} height={120} />

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