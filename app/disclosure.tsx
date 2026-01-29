// app/disclosure.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MenuSheet from "./components/MenuSheet";
import TopNav from "./components/TopNav";

export default function Disclosure() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F4" }}>
      <TopNav
        title="Disclosure"
        showBack
        onBackPress={() => router.back()}
        onMenuPress={() => setMenuOpen(true)}
      />

      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: "Home", onPress: () => router.push("/(tabs)") },
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Products", onPress: () => router.push("/products") },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Disclosure", onPress: () => {} },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "500", marginBottom: 16, color: "#2A2A2A" }}>
          Affiliate Disclosure
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, color: "#4B5563", marginBottom: 14 }}>
          Style & Beauty is a curated shopping platform designed to help users discover skincare,
          haircare, clothing, accessories, and beauty products that fit their needs and preferences.
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, color: "#4B5563" }}>
          Transparency and trust are important to us. If you have any questions about our affiliate
          partnerships, feel free to contact us.
        </Text>
      </ScrollView>
    </View>
  );
}
