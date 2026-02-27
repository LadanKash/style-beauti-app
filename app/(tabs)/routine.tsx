// app/routine/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";
import { getRoutines, saveRoutine } from "@/src/storage/routines";

import { Brand } from "@/constants/theme";
import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

function Chip({
  label,
  active,
  onPress,
  wide = false,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  wide?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: active ? Brand.primary : "#FFFFFF",
        borderWidth: 1,
        borderColor: active ? Brand.primary : "rgba(43,42,42,0.12)",
        minWidth: wide ? 220 : undefined, 
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "800",
          color: active ? "#FFFFFF" : "rgba(43,42,42,0.80)",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const FOOTER_H = 52;

export default function RoutineIndex() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const [resultsY, setResultsY] = useState(0);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [category, setCategory] = useState<string | null>(null);
  const [concern, setConcern] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);

  // iPad / tablet sizing
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // const CONTENT_MAX = isTablet ? 920 : 520; // overall page width
  // const QUIZ_MAX = isTablet ? 720 : 520; // quiz + results card width

  const CONTENT_MAX = isTablet ? 1100 : 520;
  const QUIZ_MAX = isTablet ? 900 : 520;

  

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");

    fetchProducts()
      .then((list) => {
        if (!alive) return;
        setProducts(list);
      })
      .catch((e: any) => {
        if (!alive) return;
        setErr(e?.message || "Failed to load products");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const step = useMemo(() => {
    if (!category) return 1;
    if (!concern) return 2;
    if (!budget) return 3;
    return 4;
  }, [category, concern, budget]);

  const allConcernsForCategory = useMemo(() => {
    if (!category) return [];
    const set = new Set<string>();
    products
      .filter((p: any) => p.category === category)
      .forEach((p: any) => (p.concerns || []).forEach((c: string) => set.add(c)));
    return Array.from(set).slice(0, 18);
  }, [products, category]);

  const results = useMemo(() => {
    if (!category || !concern || !budget) return [];
    return products
      .filter((p: any) => p.category === category)
      .filter((p: any) => (p.concerns || []).includes(concern))
      .filter((p: any) => p.budget === budget)
      .slice(0, 12);
  }, [products, category, concern, budget]);

  const reset = () => {
    setCategory(null);
    setConcern(null);
    setBudget(null);
  };

  const goContinue = () => {
    if (step === 1 && !category) return;
    if (step === 2 && !concern) return;
    if (step === 3 && !budget) return;

    if (step >= 3) {
      scrollRef.current?.scrollTo({
        y: Math.max(resultsY - 16, 0),
        animated: true,
      });
    }
  };

  const goBack = () => {
    if (step === 2) return setConcern(null);
    if (step === 3) return setBudget(null);
    setBudget(null);
  };

  const onSaveRoutine = async () => {
    if (!category || !concern || !budget) return;

    if (results.length === 0) {
      Alert.alert("No matches", "Try another concern or budget, then save.");
      return;
    }

    const name = `${category} • ${concern} • ${budget}`;

    const routine = {
      id: String(Date.now()),
      name,
      createdAt: Date.now(),
      answers: { category, concern, budget },
      productIds: results.map((p: any) => p.id),
    };

    try {
      await saveRoutine(routine);

      const list = await getRoutines();
      console.log("Saved routines:", list);

      Alert.alert("Saved", "Your routine was saved to your phone.", [
        {
          text: "Set reminders",
          onPress: () =>
            router.push(
              `/reminders?category=${encodeURIComponent(category ?? "")}`
            ),
        },
        { text: "OK" },
      ]);
    } catch (e: any) {
      Alert.alert("Save failed", e?.message || "Couldn’t save routine.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
      <TopNav
        title="Style & Beauty"
        showBack
        onBackPress={() => router.back()}
        onMenuPress={() => setMenuOpen(true)}
      />

      <MenuSheet
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={[
          { label: "Home", onPress: () => router.push("/(tabs)") },
         {label: "How it works", onPress: () => router.push({ pathname: "/onboarding", params: { mode: "info" } })},
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

<ScrollView
  ref={scrollRef}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    padding: 14,
    paddingBottom: 14 + FOOTER_H + 20,
  }}
>
  {/* Main responsive page container */}
  <View style={{ alignSelf: "center", width: "100%", maxWidth: CONTENT_MAX }}>
    {/* Header (full width, centered) */}
    <View style={{ alignSelf: "center", width: "100%", maxWidth: CONTENT_MAX }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: "#1F1F1F" }}>
            Find my routine
          </Text>
          <Text
            style={{
              marginTop: 6,
              opacity: 0.72,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            Answer 3 quick questions — we’ll recommend products that match your needs and budget.
          </Text>
        </View>

        <Pressable
          onPress={() => router.push("/(tabs)/explore")}
          style={{ paddingTop: 10 }}
        >
          <Text style={{ fontWeight: "500", color: "#1F1F1F" }}>Browse →</Text>
        </Pressable>
      </View>
    </View>

    {/* Two-column layout on iPad, stacked on phone */}
    <View
      style={{
        marginTop: 16,
        flexDirection: isTablet ? "row" : "column",
        gap: 20,
        alignSelf: "center",
        width: "100%",
      }}
    >
      {/* LEFT: Quiz */}
      <View
        style={{
          flex: isTablet ? 1 : undefined,
          alignSelf: "center",
          width: "100%",
          maxWidth: isTablet ? Math.floor((CONTENT_MAX - 20) / 2) : QUIZ_MAX,
        }}
      >
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.08)",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ opacity: 0.6, fontWeight: "700" }}>
              Step {Math.min(step, 3)} of 3
            </Text>

            <Pressable onPress={reset}>
              <Text style={{ fontWeight: "500", opacity: 0.7 }}>Reset</Text>
            </Pressable>
          </View>

          {step === 1 && (
            <>
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1F1F1F",
                }}
              >
                What are you shopping for?
              </Text>
              <Text style={{ marginTop: 6, opacity: 0.7 }}>
                Choose a category.
              </Text>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {["skincare", "haircare", "clothing", "bags", "shoes", "accessories"].map(
                  (c) => (
                    <Chip
                      key={c}
                      label={c.charAt(0).toUpperCase() + c.slice(1)}
                      active={category === c}
                      wide={isTablet}
                      onPress={() => {
                        setCategory(c);
                        setConcern(null);
                        setBudget(null);
                      }}
                    />
                  )
                )}
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1F1F1F",
                }}
              >
                What’s your main concern?
              </Text>
              <Text style={{ marginTop: 6, opacity: 0.7 }}>Pick one.</Text>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {allConcernsForCategory.map((c) => (
                  <Chip
                    key={c}
                    label={c.replace(/-/g, " ")}
                    active={concern === c}
                    wide={isTablet}
                    onPress={() => {
                      setConcern(c);
                      setBudget(null);
                    }}
                  />
                ))}
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: "500",
                  color: "#1F1F1F",
                }}
              >
                What’s your budget?
              </Text>
              <Text style={{ marginTop: 6, opacity: 0.7 }}>
                Choose a price range.
              </Text>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {["$", "$$", "$$$"].map((b) => (
                  <Chip
                    key={b}
                    label={b}
                    active={budget === b}
                    wide={isTablet}
                    onPress={() => setBudget(b)}
                  />
                ))}
              </View>

              <Text style={{ marginTop: 10, opacity: 0.7 }}>
                Tip: choose $ / $$ / $$$ to filter.
              </Text>
            </>
          )}

          {/* Buttons */}
          <View style={{ marginTop: 16, flexDirection: "row", gap: 12 }}>
            {step > 1 && step <= 3 && (
              <Pressable
                onPress={goBack}
                style={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "rgba(0,0,0,0.12)",
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "600", color: "#1F1F1F" }}>Back</Text>
              </Pressable>
            )}

            <Pressable
              onPress={goContinue}
              disabled={
                (step === 1 && !category) ||
                (step === 2 && !concern) ||
                (step === 3 && !budget)
              }
              style={{
                flex: 1,
                backgroundColor: Brand.primary,
                borderRadius: 999,
                paddingVertical: 14,
                alignItems: "center",
                opacity:
                  (step === 1 && !category) ||
                  (step === 2 && !concern) ||
                  (step === 3 && !budget)
                    ? 0.5
                    : 1,
              }}
            >
              <Text style={{ fontWeight: "700", color: "#FFFFFF", fontSize: 16 }}>
                {step < 3 ? "Continue" : "See results"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* RIGHT: Results */}
      <View
        style={{
          flex: isTablet ? 1 : undefined,
          alignSelf: "center",
          width: "100%",
          maxWidth: isTablet ? Math.floor((CONTENT_MAX - 20) / 2) : QUIZ_MAX,
        }}
      >
        <View
          onLayout={(e) => setResultsY(e.nativeEvent.layout.y)}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 24,
            padding: 16,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0.08)",
            marginTop: isTablet ? 0 : 14, // stacked layout spacing
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Results</Text>
            <View
              style={{
                backgroundColor: "rgba(230,164,180,0.22)",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
              }}
            >
              <Text style={{ fontWeight: "700" }}>
                {loading ? "…" : results.length}
              </Text>
            </View>
          </View>

          {err ? (
            <Text style={{ marginTop: 10, color: "#B00020" }}>{err}</Text>
          ) : !category || !concern || !budget ? (
            <Text style={{ marginTop: 10, opacity: 0.7 }}>
              Complete the quiz to see your matches here.
            </Text>
          ) : results.length === 0 ? (
            <Text style={{ marginTop: 10, opacity: 0.7 }}>
              No matches found — try another concern or budget.
            </Text>
          ) : (
            <View style={{ marginTop: 12, gap: 10 }}>
              <Pressable
                onPress={onSaveRoutine}
                style={{
                  backgroundColor: "#E6A4B4",
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                  Save this routine
                </Text>
              </Pressable>

              {results.map((p: any) => (
                <Pressable
                  key={p.id}
                  onPress={() => router.push(`/products/${p.slug}`)}
                  style={{
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.08)",
                    borderRadius: 18,
                    padding: 12,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Text style={{ fontWeight: "700" }} numberOfLines={1}>
                    {p.name}
                  </Text>
                  <Text style={{ opacity: 0.7, marginTop: 4 }} numberOfLines={1}>
                    {p.brand} • {p.budget} • Check price from retailer
                  </Text>
                </Pressable>
              ))}

              <Pressable
                onPress={() => router.push("/products")}
                style={{
                  marginTop: 4,
                  backgroundColor: "#1F1F1F",
                  paddingVertical: 14,
                  borderRadius: 999,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                  See all products
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  </View>
</ScrollView>

      {/* Fixed Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: FOOTER_H,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F7F4",
          borderTopWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Text style={{ fontSize: 12, color: "#6B6B6B" }}>
          © 2026 Style & Beauty • We may earn commission from links.
        </Text>
      </View>
    </View>
  );
}