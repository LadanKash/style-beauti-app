// app/_layout.tsx
// // // app/_layout.tsx

// import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     ...Ionicons.font,
//   });

//   useEffect(() => {
//     if (loaded) SplashScreen.hideAsync();
//   }, [loaded]);

//   if (!loaded) return null;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(tabs)" />
//       <Stack.Screen name="onboarding" />
//       <Stack.Screen name="products" />
//       <Stack.Screen name="routine" />
//       <Stack.Screen name="disclosure" />
//       <Stack.Screen name="privacy" />
//     </Stack>
//   );
// }


import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    ...Ionicons.font,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />

      {/* Keep only special flows you truly need to configure */}
      <Stack.Screen name="onboarding" />

      {/* IMPORTANT:
          Do NOT manually register filesystem routes like:
          products, routine, disclosure, privacy
          Expo Router will pick them up automatically.
      */}
    </Stack>
  );
}
