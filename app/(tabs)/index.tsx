import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Page from "../components/Page";

const KEY = "sb_onboarded";
const HERO = require("../../assets/products/hero.png");

export default function Home() {
  const router = useRouter();

  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const done = (await AsyncStorage.getItem(KEY)) === "true";
        setOnboarded(done);
      } catch {
        setOnboarded(false);
      }
    })();
  }, []);

  const onGetStarted = () => {
    if (onboarded === null) return;
    if (onboarded) router.push("/(tabs)/explore");
    else router.push("/onboarding");
  };

  return (
    <Page backgroundColor="#FAF7F4" title="Style & Beauty">
      {/* Page content */}
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
          Your personal style & beauty shopper. Discover beauty, skincare, and
          clothing picks that fit your needs — curated with clarity, trust, and
          any budget in mind. ✨
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

        <Pressable
          onPress={onGetStarted}
          style={{
            backgroundColor: "#E6A4B4",
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 999,
            alignSelf: "flex-start",
            opacity: onboarded === null ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
            {onboarded ? "Explore" : "Get started"}
          </Text>
        </Pressable>

        <Pressable
          onPress={async () => {
            await AsyncStorage.removeItem(KEY);
            setOnboarded(false);
          }}
          style={{ marginTop: 16 }}
        >
          <Text
            style={{
              textDecorationLine: "underline",
              opacity: 0.7,
              color: "#6B6B6B",
            }}
          >
            Reset onboarding (dev)
          </Text>
        </Pressable>
      </View>
    </Page>
  );
}
