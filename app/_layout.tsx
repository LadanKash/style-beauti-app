// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <Stack screenOptions={{ headerShown: false }} />
//     </SafeAreaProvider>
//   );
// }


// app/_layout.tsx
// app/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Keep splash visible while fonts load
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
      {/* your routes */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}

