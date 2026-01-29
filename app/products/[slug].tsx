// import * as Linking from "expo-linking";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo, useState } from "react";
// import { Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";

// import { products } from "../../src/data/products";
// import MenuSheet from "../components/MenuSheet";
// import TopNav from "../components/TopNav";

// const W = Dimensions.get("window").width;
// const PLACEHOLDER = require("../../assets/placeholders/post-winter.jpg");

// export default function ProductPage() {
//   const router = useRouter();
//   const { slug } = useLocalSearchParams<{ slug: string }>();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const product = products.find((p) => p.slug === slug);

//   const images = useMemo(() => {
//     const arr = product?.images ?? [];
//     return arr.length ? arr : [PLACEHOLDER];
//   }, [product]);

//   if (!product) {
//     return (
//       <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
//         <TopNav showBack onBackPress={() => router.back()} onMenuPress={() => setMenuOpen(true)} />
//         <View style={{ padding: 20 }}>
//           <Text style={{ color: "#2A2A2A" }}>Product not found</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
//       {/* ✅ NAVBAR */}
//       <TopNav
//         showBack
//         onBackPress={() => router.back()}
//         onMenuPress={() => setMenuOpen(true)}
//       />

//       {/* ✅ MENU */}
//       <MenuSheet
//         visible={menuOpen}
//         onClose={() => setMenuOpen(false)}
//         items={[
//           { label: "Home", onPress: () => router.push("/(tabs)") },
//           { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
//           { label: "Products", onPress: () => router.push("/(tabs)/explore") },
//           { label: "Find my routine", onPress: () => router.push("/onboarding") },
//           { label: "Disclosure", onPress: () => router.push("/disclosure") },
//           { label: "Privacy", onPress: () => router.push("/privacy") },
//         ]}
//       />

//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* ✅ IMAGES */}
//         <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
//           {images.map((img, index) => (
//             <Image
//               key={index}
//               source={img}
//               style={{ width: W, height: 320 }}
//               resizeMode="cover"
//             />
//           ))}
//         </ScrollView>

//         {/* ✅ CONTENT */}
//         <View style={{ padding: 20 }}>
//           <Text style={{ fontSize: 14, color: "#454343", letterSpacing: 0.2 }}>
//             {product.brand}
//           </Text>

//           {/* Title should be DARK (premium), not grey */}
//           <Text
//             style={{
//               fontSize: 24,
//               color: "#4B5563",
//               fontWeight: "400",
//               marginTop: 6,
//               marginBottom: 10,
//               letterSpacing: -0.4,
//               lineHeight: 34,
//             }}
//           >
//             {product.name}
//           </Text>

//           <Text style={{ fontSize: 18, color: "#6B6B6B", fontWeight: "500", marginBottom: 12 }}>
//             ${product.price} {product.currency ?? "CAD"}
//           </Text>

//           {!!product.tag && (
//             <View
//               style={{
//                 alignSelf: "flex-start",
//                 backgroundColor: "rgba(230,164,180,0.25)",
//                 paddingHorizontal: 12,
//                 paddingVertical: 6,
//                 borderRadius: 999,
//                 marginBottom: 12,
//               }}
//             >
//               <Text style={{ fontWeight: "700", color: "#2A2A2A" }}>{product.tag}</Text>
//             </View>
//           )}

//           <Text style={{ fontSize: 15, lineHeight: 22, color: "#4B5563" }}>
//             {product.description}
//           </Text>

//           {/* Concerns */}
//           <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
//             {product.concerns.map((c) => (
//               <View
//                 key={c}
//                 style={{
//                   paddingHorizontal: 10,
//                   paddingVertical: 5,
//                   borderRadius: 999,
//                   backgroundColor: "white",
//                   borderWidth: 1,
//                   borderColor: "rgba(0,0,0,0.08)",
//                 }}
//               >
//                 <Text style={{ fontSize: 12, color: "#2A2A2A" }}>
//                   {c.replace("-", " ")}
//                 </Text>
//               </View>
//             ))}
//           </View>

//           {/* CTA */}
//           <Pressable
//             onPress={() => Linking.openURL(product.affiliateUrl)}
//             style={{
//               marginTop: 24,
//               backgroundColor: "#E6A4B4",
//               paddingVertical: 16,
//               borderRadius: 999,
//               alignItems: "center",
//             }}
//           >
//             <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
//               Shop now
//             </Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }



// app/products/[slug].tsx
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { products } from "@/src/data/products";
import Page from "../components/Page";

const PLACEHOLDER = require("../../assets/placeholders/post-winter.jpg");

export default function ProductPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const imgH = isTablet ? 520 : 420;

  const product = products.find((p) => p.slug === slug);

  const images = useMemo(() => {
    const arr = product?.images ?? [];
    const safe = arr.length ? arr : [PLACEHOLDER];
    return safe.slice(0, 2); // ✅ only 2 images
  }, [product]);

  if (!product) {
    return (
      <Page title="Product">
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#2A2A2A" }}>Product not found</Text>
        </View>
      </Page>
    );
  }

  return (
    <Page backgroundColor="#F7F7F4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ✅ IMAGES */}
        {isTablet ? (
          <View style={{ flexDirection: "row", backgroundColor: "white" }}>
            {images.map((img, i) => (
              <View key={i} style={{ width: width / 2, height: imgH }}>
                <Image
                  source={img}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        ) : (
          <MobileAutoCarousel images={images} width={width} height={imgH} />
        )}

        {/* ✅ CONTENT */}
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 14, color: "#454343", letterSpacing: 0.2 }}>
            {product.brand}
          </Text>

          <Text
            style={{
              fontSize: 24,
              color: "#2A2A2A",
              fontWeight: "400",
              marginTop: 6,
              marginBottom: 10,
              letterSpacing: -0.4,
              lineHeight: 34,
            }}
          >
            {product.name}
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#6B6B6B",
              fontWeight: "400",
              marginBottom: 12,
            }}
          >
            ${product.price} {product.currency ?? "CAD"}
          </Text>

          {!!product.tag && (
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "rgba(230,164,180,0.25)",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: "700", color: "#2A2A2A" }}>
                {product.tag}
              </Text>
            </View>
          )}

          <Text style={{ fontSize: 15, lineHeight: 22, color: "#4B5563" }}>
            {product.description}
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 14,
            }}
          >
            {product.concerns.map((c) => (
              <View
                key={c}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 999,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                <Text style={{ fontSize: 12, color: "#2A2A2A" }}>
                  {c.replaceAll("-", " ")}
                </Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => Linking.openURL(product.affiliateUrl)}
            style={{
              marginTop: 24,
              backgroundColor: "#E6A4B4",
              paddingVertical: 16,
              borderRadius: 999,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
              Shop now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Page>
  );
}

/** ✅ Put this OUTSIDE ProductPage (bottom of file) */
function MobileAutoCarousel({
  images,
  width,
  height,
}: {
  images: any[];
  width: number;
  height: number;
}) {
  const listRef = useRef<FlatList<any>>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length]);

  const onMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => `img-${i}`}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image
              source={item}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* dots */}
      {images.length > 1 ? (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                backgroundColor:
                  i === index ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.25)",
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
