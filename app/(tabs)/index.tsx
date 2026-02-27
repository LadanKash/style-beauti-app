// app/(tabs)/index.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import Page from "../components/Page";

const ONBOARD_KEY = "sb_onboarded";
const HOW_KEY = "sb_howitworks_seen";

const HERO = require("../../assets/products/hero.png");

export default function Home() {
  const router = useRouter();

  const [onboarded, setOnboarded] = React.useState<boolean | null>(null);
  const [howSeen, setHowSeen] = React.useState(false);

  // Load flags when screen focuses
  useFocusEffect(
    React.useCallback(() => {
      let alive = true;

      (async () => {
        try {
          const done = (await AsyncStorage.getItem(ONBOARD_KEY)) === "true";
          const seen = (await AsyncStorage.getItem(HOW_KEY)) === "true";

          if (alive) {
            setOnboarded(done);
            setHowSeen(seen);
          }
        } catch {
          if (alive) {
            setOnboarded(false);
            setHowSeen(false);
          }
        }
      })();

      return () => {
        alive = false;
      };
    }, [])
  );

  const goSuggest = () => {
    router.push("/suggest");
  };

  const goRoutine = () => {
    if (onboarded === null) return;

    if (!onboarded) {
      router.replace("/onboarding");
      return;
    }

    router.push("/(tabs)/routine");
  };

  const goHowItWorks = async () => {
    try {
      await AsyncStorage.setItem(HOW_KEY, "true");
      setHowSeen(true);
    } catch {}

    router.push({
      pathname: "/onboarding",
      params: { mode: "info" },
    });
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
          trust, and any budget in mind.
        </Text>

        <View
          style={{
            width: "100%",
            aspectRatio: 1.1,
            borderRadius: 22,
            marginBottom: 18,
            overflow: "hidden",
          }}
        >
          <Image
            source={HERO}
            style={{
              width: "100%",
              height: "110%",
              transform: [{ translateY: 12 }],
            }}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
          }}
        >
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
            <Text
              style={{
                color: "#2A2A2A",
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              AI Suggest
            </Text>
          </Pressable>

          <Pressable
            onPress={goRoutine}
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
            <Text
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              Find Your Routine
            </Text>
          </Pressable>
        </View>

        {/* Show only one time */}
        {!howSeen && (
          <Pressable
            onPress={goHowItWorks}
            style={{
              marginTop: 14,
              alignSelf: "center",
              paddingVertical: 6,
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#6B6B6B",
                opacity: 0.8,
                textDecorationLine: "underline",
                fontWeight: "500",
              }}
            >
              How it works
            </Text>
          </Pressable>
        )}

      </View>
    </Page>
  );
}
