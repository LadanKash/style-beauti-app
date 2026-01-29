// // components/TopNav.tsx
// import React from "react";
// import { Pressable, Text, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// type Props = {
//   title?: string;
//   showBack?: boolean;
//   onBackPress?: () => void;
//   onMenuPress?: () => void;
// };

// export default function TopNav({
//   title = "Style & Beauty",
//   showBack = false,
//   onBackPress,
//   onMenuPress,
// }: Props) {
//   const insets = useSafeAreaInsets(); // ✅ inside component

//   return (
//     <View
//   style={{
//     paddingTop: insets.top,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(0,0,0,0.06)",
//   }}
// >
//   <View
//     style={{
//       height: 48,          // ✅ same as Explore
//       paddingHorizontal: 12,
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "space-between",
//     }}
//   >

//         <Pressable
//           onPress={showBack ? onBackPress : undefined}
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             alignItems: "center",
//             justifyContent: "center",
//             opacity: showBack ? 1 : 0,
//           }}
//           hitSlop={10}
//         >
//           <Text style={{ fontSize: 20 }}>←</Text>
//         </Pressable>

//         <View style={{ flex: 1, alignItems: "center" }}>
//           <Text style={{ fontSize: 16, fontWeight: "700", color: "#2A2A2A" }}>
//             {title}
//           </Text>
//           <Text style={{ fontSize: 12, color: "#6B6B6B", marginTop: 2 }}>
//             Trusted picks • fast
//           </Text>
//         </View>

//         <Pressable
//           onPress={onMenuPress}
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           hitSlop={10}
//         >
//           <Text style={{ fontSize: 22 }}>☰</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }


import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
};

export default function TopNav({
  title = "Style & Beauty",
  showBack = false,
  onBackPress,
  onMenuPress,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.06)",
      }}
    >
      <View
        style={{
          height: 48,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Back */}
        <Pressable
          onPress={showBack ? onBackPress : undefined}
          style={{
            width: 44, // slightly bigger touch area
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            opacity: showBack ? 1 : 0,
          }}
          hitSlop={12}
        >
          <Text style={{ fontSize: 22, lineHeight: 22 }}>←</Text>
        </Pressable>

        {/* Title */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#2A2A2A" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, color: "#6B6B6B", marginTop: 2 }}>
            Trusted picks • fast
          </Text>
        </View>

        {/* Menu */}
        <Pressable
          onPress={onMenuPress}
          style={{
            width: 44, // bigger touch area
            height: 44,
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
          }}
          hitSlop={12}
        >
          {/* bigger icon without increasing navbar height */}
          <Text style={{ fontSize: 26, lineHeight: 26 }}>☰</Text>
        </Pressable>
      </View>
    </View>
  );
}
