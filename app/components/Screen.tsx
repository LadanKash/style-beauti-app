// components/Screen.tsx
// components/Screen.tsx
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: React.ReactNode;
};

export default function Screen({ children }: ScreenProps) {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#F7F2EE" }}
    >
      {children}
    </SafeAreaView>
  );
}
