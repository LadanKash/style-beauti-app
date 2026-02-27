// app/onboarding.tsx
import { Brand } from "@/constants/theme";
import { theme } from "@/src/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

type Step = {
  title: string;
  subtitle: string;
  bullets: { title: string; desc: string }[];
};

const KEY = "sb_onboarded";

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // const params = useLocalSearchParams<{ mode?: string }>();
  // const isInfo = params.mode === "info"; 
const params = useLocalSearchParams<{ mode?: string | string[] }>();

const mode = Array.isArray(params.mode) ? params.mode[0] : params.mode;
const isInfo = mode === "info";


  const steps: Step[] = useMemo(
    () => [
      {
        title: "Welcome to Style & Beauty",
        subtitle: "Your personal beauty guide — curated, quick, and trusted.",
        bullets: [
          { title: "Curated", desc: "Only the best picks — no endless scrolling." },
          { title: "Personal", desc: "Matched to your needs, taste, and budget." },
          { title: "Quick", desc: "Find what fits in seconds and shop in one tap." },
        ],
      },
      {
        title: "We help you choose with confidence",
        subtitle: "No fake reviews. No overwhelm. Just clear recommendations.",
        bullets: [
          { title: "Busy-friendly", desc: "Perfect if you don’t have time to research." },
          { title: "Style + beauty", desc: "Skincare, beauty, and clothing picked with care." },
          { title: "Budget-smart", desc: "We show $ / $$ / $$$ options — you decide." },
        ],
      },
      {
        title: "Transparent affiliate links",
        subtitle: "You never pay more — we may earn a commission if you buy.",
        bullets: [
          { title: "No extra cost", desc: "Same price for you, always." },
          { title: "Trusted retailers", desc: "We link to official stores when possible." },
          { title: "Save favorites", desc: "Beauty and style picks saved anytime." },
        ],
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const step = steps[index];
  const isLast = index === steps.length - 1;

  //  onboarding after first time 
  useEffect(() => {
    (async () => {
      try {
        const done = (await AsyncStorage.getItem(KEY)) === "true";
        if (done && !isInfo) router.replace("/(tabs)");
      } catch {}
    })();
  }, [router, isInfo]);

  // const goHome = () => router.replace("/(tabs)");
  const goHome = () => {
  if (router.canGoBack()) router.back();
  else router.replace("/(tabs)");
};

  const handleFinish = async () => {
    if (isInfo) {

      goHome();
      return;
    }

    // onboarding: mark done, then go routine
    try {
      await AsyncStorage.setItem(KEY, "true");
    } catch {}
    router.replace("/(tabs)/routine");
  };

  const handleSkip = async () => {
    if (isInfo) {
      // How it works
      goHome();
      return;
    }

    try {
      await AsyncStorage.setItem(KEY, "true");
    } catch {}
    router.replace("/(tabs)/routine");
  };

  const handleTopBack = () => {
    //  back
    if (router.canGoBack()) router.back();
    else goHome();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5DFDC" }}>
      {/* Top bar */}
      <View
        style={{
          paddingTop: Math.max(8, insets.top ? 0 : 8),
          paddingHorizontal: 18,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={handleTopBack}
          hitSlop={12}
          style={{ paddingVertical: 8, paddingHorizontal: 8 }}
        >
          <Text style={{ fontSize: 14, color: "#6B6B6B", opacity: 0.75 }}>
            ← Back
          </Text>
        </Pressable>

        <Pressable
          onPress={handleSkip}
          hitSlop={12}
          style={{ paddingVertical: 8, paddingHorizontal: 8 }}
        >
          <Text style={{ fontSize: 14, color: "#6B6B6B", opacity: 0.75 }}>
            Skip
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 28 }}>
        <View
          style={{
            backgroundColor: "#F7F7F4",
            borderRadius: 28,
            padding: 18,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.06)",
          }}
        >
          {/* Hero */}
          <View
            style={{
              width: "100%",
              aspectRatio: 1.25,
              borderRadius: 22,
              marginBottom: 14,
              overflow: "hidden",
            }}
          >
            <Image
              source={require("../assets/products/hero.png")}
              style={{
                width: "100%",
                height: "120%",
                transform: [{ translateY: -2 }],
              }}
              resizeMode="cover"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#E6A4B4",
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 999,
              }}
            >
              <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>
                Style & Beauty
              </Text>
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6 }}>
              Step {index + 1} of {steps.length}
            </Text>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "400", marginBottom: 8 }}>
            {step.title}
          </Text>
          <Text style={{ fontSize: 16, opacity: 0.75, marginBottom: 16 }}>
            {step.subtitle}
          </Text>

          <View style={{ gap: 12 }}>
            {step.bullets.map((b) => (
              <View key={b.title} style={{ flexDirection: "row", gap: 10 }}>
                <View
                  style={{
                    marginTop: 7,
                    height: 10,
                    width: 10,
                    borderRadius: 999,
                    backgroundColor: "#E6A4B4",
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "500", marginBottom: 2 }}>
                    {b.title}
                  </Text>
                  <Text style={{ opacity: 0.7 }}>{b.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View
            style={{
              marginTop: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", gap: 8 }}>
              {steps.map((_, i) => (
                <View
                  key={i}
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 999,
                    backgroundColor:
                      i === index ? "#E6A4B4" : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </View>

            <View style={{ flexDirection: "row", gap: 10 }}>
              {index > 0 && (
                <Pressable
                  onPress={() => setIndex((v) => v - 1)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 999,
                    backgroundColor: "rgba(0,0,0,0.06)",
                  }}
                >
                  <Text style={{ fontWeight: "700" }}>Back</Text>
                </Pressable>
              )}

              {!isLast ? (
                <Pressable
                  onPress={() => setIndex((v) => v + 1)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 999,
                    backgroundColor: Brand.primary,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "800" }}>
                    Continue
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleFinish}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 999,
                    backgroundColor: Brand.primary,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "800" }}>
                    {isInfo ? "Done" : "Find my routine"}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          <Text style={{ marginTop: 12, fontSize: 12, opacity: 0.55, color: theme.text }}>
            Affiliate disclosure: We may earn commission from some links.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}