// // components/Page.tsx
// import { useRouter } from "expo-router";
// import React from "react";
// import { View } from "react-native";
// import MenuSheet from "./MenuSheet";
// import TopNav from "./TopNav";

// type Props = {
//   title?: string;
//   children: React.ReactNode;
//   backgroundColor?: string;
//   showBack?: boolean; // optional override
// };

// export default function Page({
//   title,
//   children,
//   backgroundColor = "#F7F7F4",
//   showBack,
// }: Props) {
//   const router = useRouter();
//   const [menuOpen, setMenuOpen] = React.useState(false);

//   // ✅ default behavior like Explore:
//   // show back automatically if router can go back
//   const autoBack = router.canGoBack();
//   const finalShowBack = typeof showBack === "boolean" ? showBack : autoBack;

//   return (
//     <View style={{ flex: 1, backgroundColor }}>
//       <TopNav
//         title={title}
//         showBack={finalShowBack}
//         onBackPress={() => router.back()}
//         onMenuPress={() => setMenuOpen(true)}
//       />

//       <MenuSheet
//         visible={menuOpen}
//         onClose={() => setMenuOpen(false)}
//         items={[
//           { label: "Home", onPress: () => router.push("/(tabs)") },
//           { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
//           { label: "Products", onPress: () => router.push("/products") },
//           { label: "Find my routine", onPress: () => router.push("/routine") },
//           { label: "Disclosure", onPress: () => router.push("/disclosure") },
//           { label: "Privacy", onPress: () => router.push("/privacy") },
//         ]}
//       />

//       {children}
//     </View>
//   );
// }

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
  showBack?: boolean; // optional override
};

export default function Page({
  title,
  children,
  backgroundColor = "#F7F7F4",
  showBack,
}: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // ✅ default behavior like Explore:
  // show back automatically if router can go back
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
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Products", onPress: () => router.push("/products") },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      {/* ✅ Content takes remaining space */}
      <View style={{ flex: 1 }}>{children}</View>

      {/* ✅ Footer always at bottom */}
      <Footer />
    </View>
  );
}
