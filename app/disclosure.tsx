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
          {label: "How it works", onPress: () => router.push({ pathname: "/onboarding", params: { mode: "info" } })},
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          // { label: "Products", onPress: () => router.push("/products") },
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine")},
          // { label: "Saved", onPress: () => router.push("/(tabs)/saved") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => {} },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <ScrollView
  style={{ flex: 1 }}
  contentContainerStyle={{ padding: 24, paddingBottom: 24 }}
>
  <Text style={{ fontSize: 28, fontWeight: "500", marginBottom: 16, color: "#2A2A2A" }}>
    Affiliate Disclosure
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginBottom: 12 }}>
    Style & Beauty is a curated shopping platform that helps users discover skincare,
    haircare, clothing, accessories, and beauty-related products.
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginBottom: 12 }}>
    Some links on this website may be affiliate links. This means that if you click a link
    and make a purchase, we may earn a small commission — at no extra cost to you.
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginBottom: 12 }}>
    We aim to recommend products we genuinely believe may be helpful and a good fit for our users.
    Affiliate partnerships do not influence our product selection, content, or the price you pay.
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginBottom: 12 }}>
    Style & Beauty is an independent platform. Unless clearly stated, content is not sponsored.
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginBottom: 12 }}>
    Prices, availability, and product details are provided by third-party retailers and may change
    at any time. If you have questions, feel free to contact us.
  </Text>

  <Text style={{ fontSize: 15, lineHeight: 24, color: "#4B5563", marginTop: 8, textAlign: "center" }}>
    Last updated: February 2026
  </Text>
</ScrollView>


      {/* FOOTER FIXED AT BOTTOM */}
      <View
        style={{
          alignItems: "center",
          paddingVertical: 12,
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          backgroundColor: "#FAF7F4",
        }}
      >
        <Text style={{ fontSize: 12, opacity: 0.55 }}>
          Affiliate disclosure: We may earn commission from some links.
        </Text>
      </View>

    </View>
  );
}
   