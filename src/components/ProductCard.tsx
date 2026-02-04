// import type { Product } from "@/src/data/products";
// import React, { useMemo, useState } from "react";
// import type { ImageSourcePropType } from "react-native";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
//   Pressable,
//   Text,
//   View,
// } from "react-native";

// type Props = {
//   product: Product;
//   onPress: () => void;
// };

// export default function ProductCard({ product, onPress }: Props) {
//   const cardW = Math.round(Dimensions.get("window").width - 48);

//   const imgH = 390;

//   const images = useMemo<ImageSourcePropType[]>(
//     () => (product.images ?? []).slice(0, 2),
//     [product.images]
//   );

//   const [index, setIndex] = useState(0);

//   const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const x = e.nativeEvent.contentOffset.x;
//     const i = Math.round(x / cardW);
//     if (i !== index) setIndex(i);
//   };

//   return (
//     <Pressable
//       onPress={onPress}
//       style={{
//         borderWidth: 1,
//         borderColor: "rgba(0,0,0,0.12)",
//         borderRadius: 18,
//         overflow: "hidden",
//         backgroundColor: "white",
//       }}
//     >
//       {/* Swipe 2 images */}
//       <View>
//         <FlatList
//           data={images}
//           horizontal
//           pagingEnabled
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(_, i) => `${product.id}-img-${i}`}
//           onScroll={onScroll}
//           scrollEventThrottle={16}
//           renderItem={({ item }) => (
//             <Image
//               source={item}
//               style={{ width: cardW, height: imgH }}
//               resizeMode="cover"
//             />
//           )}
//         />

//         {/* Dots */}
//         {images.length > 1 ? (
//           <View
//             style={{
//               position: "absolute",
//               bottom: 10,
//               left: 0,
//               right: 0,
//               flexDirection: "row",
//               justifyContent: "center",
//               gap: 6,
//             }}
//           >
//             {images.map((_, i) => (
//               <View
//                 key={`${product.id}-dot-${i}`}
//                 style={{
//                   width: 7,
//                   height: 7,
//                   borderRadius: 99,
//                   backgroundColor:
//                     i === index ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.22)",
//                 }}
//               />
//             ))}
//           </View>
//         ) : null}
//       </View>

//       {/* Text */}
//       <View style={{ padding: 14 }}>
//         <Text style={{ fontWeight: "700", fontSize: 16 }} numberOfLines={1}>
//           {product.name}
//         </Text>

//         <Text style={{ opacity: 0.6, marginTop: 3 }} numberOfLines={1}>
//           {product.brand} • {product.budget}
//           {typeof product.price === "number" ? ` • ${product.price} ${product.currency ?? ""}` : ""}
//         </Text>

//         {!!product.description && (
//           <Text style={{ opacity: 0.65, marginTop: 8 }} numberOfLines={2}>
//             {product.description}
//           </Text>
//         )}
//       </View>
//     </Pressable>
//   );
// }


// src/components/ProductCard.tsx
// src/components/ProductCard.tsx
// after appstore err

import type { Product } from "@/src/data/products";
import { isSaved, toggleSaved } from "@/src/lib/saved";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    Text,
    View,
} from "react-native";

type Props = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: Props) {
  const screenW = Dimensions.get("window").width;

  // ✅ keep “mobile card” size even on web/iPad
  const maxCardWidth = 430;
  const cardW = Math.round(Math.min(screenW - 32, maxCardWidth));
  const imgH = 260;

  const images = useMemo(() => {
    const arr = (product.images ?? []).filter(Boolean);
    return arr.slice(0, 2);
  }, [product.images]);

  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / cardW);
    if (i !== index) setIndex(i);
  };

  // ✅ Saved state
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    isSaved(product.id).then((v) => {
      if (alive) setSaved(v);
    });
    return () => {
      alive = false;
    };
  }, [product.id]);

const onToggleSaved = async () => {
  const nowSaved = await toggleSaved({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    concerns: product.concerns,
    price: product.price,
    currency: product.currency,
    budget: product.budget,
    description: product.description,
    affiliateUrl: product.affiliateUrl,
    tag: product.tag,
    imageUrl: product.imageUrl,
    images: product.images,
  });
  setSaved(nowSaved);
};


  return (
    <Pressable
      onPress={onPress}
      style={{
        alignSelf: "center",
        width: "100%",
        maxWidth: maxCardWidth,
        backgroundColor: "white",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.10)",
        overflow: "hidden",
      }}
    >
      {/* Images */}
      <View style={{ width: "100%" }}>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(url, i) => `${product.id}-img-${i}-${url}`}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item: url }) => (
            <Image
              source={{ uri: url }}
              style={{ width: cardW, height: imgH, backgroundColor: "#eee" }}
              resizeMode="cover"
            />
          )}
        />

        {/* ✅ Save button overlay (stops card press) */}
        <Pressable
          onPress={(e: any) => {
            // Prevent triggering the card onPress
            e?.stopPropagation?.();
            onToggleSaved();
          }}
          onPressIn={(e: any) => e?.stopPropagation?.()}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 40,
            height: 40,
            borderRadius: 999,
            backgroundColor: "rgba(255,255,255,0.95)",
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.10)",
            alignItems: "center",
            justifyContent: "center",
          }}
          accessibilityRole="button"
          accessibilityLabel={saved ? "Remove from saved" : "Save item"}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={20}
            color={saved ? "#111" : "#2B2B2B"}
          />
        </Pressable>

        {/* Dots */}
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
                key={`${product.id}-dot-${i}`}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 99,
                  backgroundColor:
                    i === index ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.22)",
                }}
              />
            ))}
          </View>
        ) : null}
      </View>

      {/* Text */}
      <View style={{ padding: 14 }}>
        <Text
          style={{ fontWeight: "800", fontSize: 16, color: "#1F1F1F" }}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text style={{ opacity: 0.65, marginTop: 3 }} numberOfLines={1}>
          {product.brand} • {product.budget}
          {typeof product.price === "number" && product.price > 0
            ? ` • ${product.price} ${product.currency || "CAD"}`
            : ""}
        </Text>

        {!!product.tag && (
          <View
            style={{
              marginTop: 8,
              alignSelf: "flex-start",
              backgroundColor: "rgba(230,164,180,0.25)",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "600", color: "#2A2A2A" }}>
              {product.tag}
            </Text>
          </View>
        )}

        {!!product.description && (
          <Text style={{ opacity: 0.65, marginTop: 8 }} numberOfLines={2}>
            {product.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
