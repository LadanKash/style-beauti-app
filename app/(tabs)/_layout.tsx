
// import { theme } from "@/src/constants/theme";
// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <Stack
//         screenOptions={{
//           headerStyle: { backgroundColor: theme.background },
//           headerTitleStyle: { fontWeight: "700" },
//           headerTintColor: theme.text,
//         }}
//       >
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="lists/[listId]" options={{ title: "Idea List" }} />
//         <Stack.Screen name="posts/[postId]" options={{ title: "Shop this photo" }} />
//       </Stack>
//     </SafeAreaProvider>
//   );
// }



// import { Stack } from "expo-router";
// import React from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <Stack screenOptions={{ headerShown: false }} />
//     </SafeAreaProvider>
//   );
// }

//2 with footer list
// // app/(tabs)/_layout.tsx
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="index"
//         options={{ title: "Home" }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{ title: "Explore" }}
//       />
//       <Tabs.Screen
//         name="routine"
//         options={{ title: "Routine" }}
//       />
//     </Tabs>

//   );
// }


import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="routine" options={{ title: "Routine" }} />
    </Tabs>
  );
}
 