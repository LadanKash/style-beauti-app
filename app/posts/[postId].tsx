////corect final
// import { posts } from "@/src/data/lists";
// import * as Linking from "expo-linking";
// import { useLocalSearchParams } from "expo-router";
// import React from "react";
// import { FlatList, Image, Pressable, Text, View } from "react-native";
// import Page from "../components/Page";

// /* ----------------------------------------
//    Seasonal fallback images (must exist!)
// ----------------------------------------- */
// const PLACEHOLDERS: Record<string, any> = {
//   l1: require("../../assets/posts/post-winter.jpeg"),
//   l2: require("../../assets/posts/post-spring.png"),
//   l3: require("../../assets/posts/post-summer.jpeg"),
// };

// const fallbackImage = (listId?: string) =>
//   PLACEHOLDERS[listId ?? "l1"] ?? PLACEHOLDERS.l1;

// /* ----------------------------------------
//    Screen
// ----------------------------------------- */
// export default function PostDetail() {
//   const { postId } = useLocalSearchParams<{ postId: string }>();
//   const post = posts.find((p) => p.id === postId);

//   if (!post) {
//     return (
//       <Page title="Post">
//         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//           <Text>Post not found</Text>
//         </View>
//       </Page>
//     );
//   }

//   return (
//     <Page title={post.caption}>
//       <View style={{ flex: 1 }}>
//         {/* 🔝 Hero image */}
//         <Image
//           source={post.image ?? fallbackImage(post.listId)}
//           style={{ width: "100%", height: 320 }}
//           resizeMode="cover"
//         />

//         <View style={{ padding: 14 }}>
//           <Text style={{ fontSize: 16, fontWeight: "500" }}>
//             {post.caption}
//           </Text>

//           <Text
//             style={{
//               marginTop: 14,
//               marginBottom: 10,
//               fontSize: 18,
//               fontWeight: "500",
//             }}
//           >
//             Shop this photo
//           </Text>

//           {/* 🛍 Products */}
//           <FlatList
//             data={post.products}
//             keyExtractor={(item) => item.id}
//             contentContainerStyle={{ gap: 12, paddingBottom: 30 }}
//             renderItem={({ item }) => (
//               <View
//                 style={{
//                   flexDirection: "row",
//                   gap: 12,
//                   backgroundColor: "#fff",
//                   borderRadius: 16,
//                   borderWidth: 1,
//                   borderColor: "#eee",
//                   padding: 12,
//                   alignItems: "center",
//                 }}
//               >
//                 <Image
//                   source={item.coverImage ?? fallbackImage(post.listId)}
//                   style={{ width: 70, height: 70, borderRadius: 12 }}
//                   resizeMode="cover"
//                 />

//                 <View style={{ flex: 1 }}>
//                   <Text numberOfLines={2} style={{ fontWeight: "500" }}>
//                     {item.title}
//                   </Text>
//                   <Text style={{ marginTop: 6, opacity: 0.7 }}>
//                     ⭐ {item.rating.toFixed(1)}
//                   </Text>
//                   <Text style={{ marginTop: 6, fontWeight: "500" }}>
//                     {item.price}
//                   </Text>
//                 </View>

//                 <Pressable
//                   onPress={() => Linking.openURL(item.affiliateUrl)}
//                   style={{
//                     width: 45,
//                     height: 45,
//                     borderRadius: 27,
//                     backgroundColor: "#E6A4B4",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Text style={{ fontSize: 20, fontWeight: "600" }}>+</Text>
//                 </Pressable>
//               </View>
//             )}
//           />
//         </View>
//       </View>
//     </Page>
//   );
// }


import { posts } from "@/src/data/lists";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import Page from "../components/Page";

export default function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <Page showBack>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Post not found</Text>
        </View>
      </Page>
    );
  }

  return (
    <Page title={post.caption} showBack>
      <View style={{ flex: 1 }}>
        {/* TOP IMAGE */}
        <Image
          source={post.image}
          style={{ width: "100%", height: 320 }}
          resizeMode="cover"
        />

        <View style={{ padding: 14 }}>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {post.caption}
          </Text>

          <Text
            style={{
              marginTop: 14,
              marginBottom: 10,
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Shop this photo
          </Text>

          <FlatList
            data={post.products}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12, paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "#eee",
                  padding: 12,
                  alignItems: "center",
                }}
              >
                <Image
                  source={item.coverImage}
                  style={{ width: 70, height: 70, borderRadius: 12 }}
                  resizeMode="cover"
                />

                <View style={{ flex: 1 }}>
                  <Text numberOfLines={2} style={{ fontWeight: "500" }}>
                    {item.title}
                  </Text>
                  <Text style={{ marginTop: 6, opacity: 0.7 }}>
                    ⭐ {item.rating.toFixed(1)}
                  </Text>
                  <Text style={{ marginTop: 6, fontWeight: "500" }}>
                    {item.price}
                  </Text>
                </View>

                <Pressable
                  onPress={() => Linking.openURL(item.affiliateUrl)}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 22.5,
                    backgroundColor: "#E6A4B4",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>+</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </Page>
  );
}
