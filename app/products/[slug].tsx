// app/products/[slug].tsx
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
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

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import Page from "../components/Page";

const PLACEHOLDER_URL = "https://stylebeauti.com/placeholders/post-winter.jpg"; // optional: host this image in Next/public

export default function ProductPage() {
  // const { slug } = useLocalSearchParams<{ slug: string }>();
  const params = useLocalSearchParams<{ slug?: string | string[] }>();
const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;



  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const imgH = isTablet ? 520 : 420;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  // const product = useMemo(
  //   () => products.find((p) => p.slug === slug),
  //   [products, slug]
  // );
const product = useMemo(
  () => (slug ? products.find((p) => p.slug === slug) : undefined),
  [products, slug]
);



  // const images = useMemo(() => {
  //   const arr = product?.images ?? [];
  //   // const safe = arr.length ? arr : [PLACEHOLDER_URL];
  //   const safe = arr.length ? arr : [];

  //   return safe.slice(0, 2); // only 2 images
  // }, [product]);
const images = useMemo(() => {
  const arr = product?.images ?? [];
  const safe = arr.length ? arr : [product?.imageUrl || PLACEHOLDER_URL].filter(Boolean);
  return safe.slice(0, 2);
}, [product]);




  if (loading) {
    return (
      <Page title="Product">
        <View style={{ padding: 20, alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, opacity: 0.7 }}>Loading product...</Text>
        </View>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Product">
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#2A2A2A", fontWeight: "400" }}>{error}</Text>
          <Text style={{ marginTop: 6, opacity: 0.7 }}>
            Make sure products.json is reachable.
          </Text>
        </View>
      </Page>
    );
  }

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
            {images.map((url, i) => (
              <View key={`${product.id}-img-${i}`} style={{ width: width / 2, height: imgH }}>
                <Image
                  source={{ uri: url }}
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
              fontSize: 22,
              color: "#454343",
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
              <Text style={{ fontWeight: "600", color: "#2A2A2A" }}>
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
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
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
  images: string[];
  width: number;
  height: number;
}) {
  const listRef = useRef<FlatList<string>>(null);
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
        keyExtractor={(url, i) => `${i}-${url}`}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item: url }) => (
          <View style={{ width, height }}>
            <Image
              source={{ uri: url }}
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
