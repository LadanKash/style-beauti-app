//app/components/page.tsx
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Footer from "./Footer";
import MenuSheet from "./MenuSheet";
import TopNav from "./TopNav";

type Props = {
  title?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  showBack?: boolean; 
};

export default function Page({
  title,
  children,
  backgroundColor = "#F7F7F4",
  showBack,
}: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const autoBack = router.canGoBack();
  const finalShowBack = typeof showBack === "boolean" ? showBack : autoBack;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <TopNav
        title={title}
        showBack={finalShowBack}
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
          { label: "Inspiration Looks", onPress: () => router.push("/(tabs)/looks") },
          { label: "Collection", onPress: () => router.push("/(tabs)/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      {/* Content takes remaining space */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* Footer always at bottom */}
      <Footer />
    </View>
  );
}
