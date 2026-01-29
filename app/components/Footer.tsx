import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: Math.max(insets.bottom, 12),
        paddingTop: 10,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: "rgba(0,0,0,0.06)",
        backgroundColor: "white",
      }}
    >
      <Text style={{ fontSize: 12, color: "#6B6B6B", textAlign: "center" }}>
        © {new Date().getFullYear()} Style & Beauty • We may earn commission from links.
      </Text>
    </View>
  );
}
