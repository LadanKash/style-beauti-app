// app/privacy.tsx
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import MenuSheet from "./components/MenuSheet";
import TopNav from "./components/TopNav";

export default function Privacy() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF7F4" }}>
      <TopNav
        title="Privacy"
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
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => {} },
        ]}
      />

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: "500", marginBottom: 16 }}>
          Privacy Policy
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 16, color: "#4B5563" }}>
          Your privacy is important to us. This page explains how information is handled on Style & Beauty.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
          Information We Collect
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          We do not require users to create an account or submit personal information to browse this app.
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          We do not use analytics tools to track users in the app.
        </Text>
      </ScrollView>
    </View>
  );
}
