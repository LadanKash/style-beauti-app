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
          // { label: "Products", onPress: () => router.push("/products") },
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          // { label: "Saved", onPress: () => router.push("/(tabs)/saved") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => {} },
        ]}
      />

      {/*  CONTENT (fills the screen, footer stays pinned) */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 24, paddingBottom: 24 }}
      >
        <Text style={{ fontSize: 28, fontWeight: "500", marginBottom: 16, color: "#2A2A2A" }}>
          Privacy Policy
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 16, color: "#4B5563" }}>
          Your privacy is important to us. This page explains how information is
          handled on Style & Beauty.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Information We Collect
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Users are not required to create an account or submit personal
          information to browse this website.
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Style & Beauty does not currently collect analytics data, personal
          information, or visitor tracking data directly.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Affiliate Links & Third-Party Sites
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Some links on this website are affiliate links. When you click an
          affiliate link, you may be redirected to a third-party retailer’s
          website. These retailers may collect data according to their own
          privacy policies.
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Style & Beauty does not control and is not responsible for the privacy
          practices, content, or policies of third-party websites.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Cookies
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Style & Beauty does not currently use cookies or tracking technologies
          directly. However, third-party affiliate partners or retailers may use
          cookies or similar technologies to track referrals and purchases in
          accordance with their own privacy policies.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Data Security
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          We take reasonable steps to maintain the safety and integrity of our
          website. However, no online service can guarantee complete security.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Children's Privacy
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          Style & Beauty is not directed toward children under the age of 13 and
          does not knowingly collect personal information from children.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Policy Updates
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 14, color: "#4B5563" }}>
          This Privacy Policy may be updated from time to time. Updates will be
          posted on this page with the revised effective date.
        </Text>

        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10, color: "#111827" }}>
          Contact
        </Text>

        <Text style={{ fontSize: 15, lineHeight: 22, marginBottom: 0, color: "#4B5563" }}>
          If you have questions about this Privacy Policy, you may contact us
          through the website.
        </Text>
      </ScrollView>

      {/*  FOOTER pinned to bottom */}
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
          © 2026 Style & Beauty • We may earn commission from links.
        </Text>
      </View>
    </View>
  );
}

