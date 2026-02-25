// app/(tabs)/index.tsx
import { Brand } from '@/constants/theme'; // adjust path
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Page from "../components/Page";

<Pressable
  style={{
    backgroundColor: Brand.primary,
  }}
>
  
</Pressable>
const KEY = "sb_onboarded";
const HERO = require("../../assets/products/hero.png");

export default function Home() {
  const router = useRouter();
  const [onboarded, setOnboarded] = React.useState<boolean | null>(null);

  const loadOnboarding = React.useCallback(() => {
    let alive = true;

    (async () => {
      try {
        const done = (await AsyncStorage.getItem(KEY)) === "true";
        if (alive) setOnboarded(done);
      } catch {
        if (alive) setOnboarded(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  useFocusEffect(loadOnboarding);

  const onGetStarted = () => {
    if (onboarded === null) return;
    router.push(onboarded ? "/(tabs)/explore" : "/onboarding" );
  };

  const goSuggest = () => {
    router.push("/suggest");
  };
  const resetOnboarding = async () => {
    await AsyncStorage.removeItem(KEY);
    setOnboarded(false);
  };

  return (
    <Page backgroundColor="#FAF7F4" title="Style & Beauty">
      <View style={{ padding: 24, paddingTop: 18 }}>
        <Text
          style={{
            fontSize: 34,
            color: "#2A2A2A",
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          Style & Beauty
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#4B5563",
            fontWeight: "400",
            lineHeight: 22,
            marginBottom: 16,
          }}
        >
          Personalized beauty routines & curated style guidance. Discover beauty,
          skincare, and clothing picks that fit your needs — curated with clarity,
          trust, and any budget in mind. ✨
        </Text>

        <Image
          source={HERO}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 22,
            marginBottom: 18,
          }}
          resizeMode="cover"
        />

        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Pressable
            onPress={goSuggest}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.04)",
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.08)",
              opacity: onboarded === null ? 0.6 : 1,
            }}
          >
            <Text style={{ color: "#2A2A2A", fontWeight: "700", fontSize: 16 }}>
              {/* ✨ AI Suggest */}
              AI Suggest
            </Text>
          </Pressable>

          <Pressable
            onPress={onGetStarted}
            style={{
              flex: 1,
              backgroundColor: "#D97C96",
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 999,
              alignItems: "center",
              opacity: onboarded === null ? 0.6 : 1,
            }}
          >
            <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
              {onboarded ? "Explore" : "Find My Routine"}
            </Text>
          </Pressable>
        </View>

        <Pressable onPress={resetOnboarding} style={{ marginTop: 16 }}>
          <Text
            style={{
              textDecorationLine: "underline",
              opacity: 0.7,
              color: "#6B6B6B",
            }}
          >
            Reset onboarding
          </Text>
        </Pressable>
      </View>
    </Page>
  );
}
