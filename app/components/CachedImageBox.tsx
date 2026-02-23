// app/components/CachedImageBox.tsx
import { Image as ExpoImage } from "expo-image";
import React from "react";
import { Text, View, type DimensionValue, type ImageSourcePropType } from "react-native";

type Props = {
  source?: ImageSourcePropType | string; // require(...) OR { uri } OR "https://..."
  uri?: string;                          // optional remote string
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
};

export default function CachedImage({
  source,
  uri,
  width = "100%",
  height = "100%",
  borderRadius = 0,
}: Props) {
  let resolved: any = undefined;

  // case 1: local require(...) or { uri: ... }
  if (source && typeof source !== "string") {
    resolved = source;
  }

  // case 2: string URL passed in uri
  if (!resolved && uri && typeof uri === "string") {
    resolved = { uri };
  }

  // case 3: source is string URL
  if (!resolved && typeof source === "string" && source.length > 5) {
    resolved = { uri: source };
  }

  const show = !!resolved;

  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "#EEE",
      }}
    >
      {show ? (
        <ExpoImage
          source={resolved}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          cachePolicy="disk"
        />
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>🖼️</Text>
          <Text style={{ marginTop: 4, fontSize: 12, opacity: 0.6 }}>
            No image
          </Text>
        </View>
      )}
    </View>
  );
}