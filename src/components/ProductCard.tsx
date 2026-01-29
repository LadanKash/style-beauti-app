import type { Product } from "@/src/data/products";
import React, { useMemo, useState } from "react";
import type { ImageSourcePropType } from "react-native";
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
  const cardW = Math.round(Dimensions.get("window").width - 48);

  const imgH = 390;

  const images = useMemo<ImageSourcePropType[]>(
    () => (product.images ?? []).slice(0, 2),
    [product.images]
  );

  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / cardW);
    if (i !== index) setIndex(i);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.12)",
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      {/* Swipe 2 images */}
      <View>
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => `${product.id}-img-${i}`}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <Image
              source={item}
              style={{ width: cardW, height: imgH }}
              resizeMode="cover"
            />
          )}
        />

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
        <Text style={{ fontWeight: "700", fontSize: 16 }} numberOfLines={1}>
          {product.name}
        </Text>

        <Text style={{ opacity: 0.6, marginTop: 3 }} numberOfLines={1}>
          {product.brand} • {product.budget}
          {typeof product.price === "number" ? ` • ${product.price} ${product.currency ?? ""}` : ""}
        </Text>

        {!!product.description && (
          <Text style={{ opacity: 0.65, marginTop: 8 }} numberOfLines={2}>
            {product.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
