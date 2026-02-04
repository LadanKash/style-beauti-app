// app/routine/index.tsx
// app/routine/index.tsx
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: active ? "#E6A4B4" : "#FFFFFF",
        borderWidth: 1,
        borderColor: active ? "#E6A4B4" : "rgba(43,42,42,0.12)",
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
    return 4; // finished
  }, [category, concern, budget]);

  const allConcernsForCategory = useMemo(() => {
    if (!category) return [];
    const set = new Set<string>();
    products
      .filter((p) => p.category === category)
      .forEach((p) => (p.concerns || []).forEach((c) => set.add(c)));
    return Array.from(set).slice(0, 18);
  }, [products, category]);

  const results = useMemo(() => {
    if (!category || !concern || !budget) return [];
    return products
      .filter((p) => p.category === category)
      .filter((p) => (p.concerns || []).includes(concern))
      .filter((p) => p.budget === budget)
      .slice(0, 12);
  }, [products, category, concern, budget]);

  const reset = () => {
    setCategory(null);
    setConcern(null);
    setBudget(null);
  };

  const canNextFromStep1 = !!category;
  const canNextFromStep2 = !!concern;
  const canNextFromStep3 = !!budget;

  const goContinue = () => {
    // Step flow: 1 -> 2 -> 3 -> scroll to results
    if (step === 1 && !canNextFromStep1) return;
    if (step === 2 && !canNextFromStep2) return;
    if (step === 3 && !canNextFromStep3) return;

    // When budget selected (step 3), show results by scrolling
    if (step >= 3) {
      scrollRef.current?.scrollTo({ y: Math.max(resultsY - 16, 0), animated: true });
    }
  };

  const goBack = () => {
    if (step === 2) {
      setConcern(null);
      return;
    }
    if (step === 3) {
      setBudget(null);
      return;
    }
    // step 4 or later
    setBudget(null);
  };

  const CARD_MAX = 520;

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
          { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
          { label: "Products", onPress: () => router.push("/products") },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <ScrollView ref={scrollRef} contentContainerStyle={{ padding: 14, paddingBottom: 80 }}>
        <View style={{ alignSelf: "center", width: "100%", maxWidth: CARD_MAX }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 28, fontWeight: "600", color: "#1F1F1F" }}>
                Find my routine
              </Text>
              <Text style={{ marginTop: 6, opacity: 0.72, fontSize: 14, lineHeight: 20 }}>
                Answer 3 quick questions — we’ll recommend products that match your needs and budget.
              </Text>
            </View>

            <Pressable onPress={() => router.push("/(tabs)/explore")} style={{ paddingTop: 10 }}>
              <Text style={{ fontWeight: "800", color: "#1F1F1F" }}>Browse →</Text>
            </Pressable>
          </View>

          {/* Quiz Card */}
          <View
            style={{
              marginTop: 16,
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ opacity: 0.6, fontWeight: "800" }}>
                Step {Math.min(step, 3)} of 3
              </Text>

              <Pressable onPress={reset}>
                <Text style={{ fontWeight: "800", opacity: 0.7 }}>Reset</Text>
              </Pressable>
            </View>

            {/* STEP 1: Category */}
            {step === 1 && (
              <>
                <Text style={{ marginTop: 12, fontSize: 22, fontWeight: "500", color: "#1F1F1F" }}>
                  What are you shopping for?
                </Text>
                <Text style={{ marginTop: 6, opacity: 0.7 }}>Choose a category.</Text>

                <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {["skincare", "haircare", "clothing", "bags", "accessories"].map((c) => (
                    <Chip
                      key={c}
                      label={c.charAt(0).toUpperCase() + c.slice(1)}
                      active={category === c}
                      onPress={() => {
                        setCategory(c);
                        setConcern(null);
                        setBudget(null);
                      }}
                    />
                  ))}
                </View>
              </>
            )}

            {/* STEP 2: Concern */}
            {step === 2 && (
              <>
                <Text style={{ marginTop: 12, fontSize: 22, fontWeight: "500", color: "#1F1F1F" }}>
                  What’s your main concern?
                </Text>
                <Text style={{ marginTop: 6, opacity: 0.7 }}>Pick one.</Text>

                <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {allConcernsForCategory.map((c) => (
                    <Chip
                      key={c}
                      label={c.replace(/-/g, " ")}
                      active={concern === c}
                      onPress={() => {
                        setConcern(c);
                        setBudget(null);
                      }}
                    />
                  ))}
                </View>
              </>
            )}

            {/* STEP 3: Budget */}
            {step === 3 && (
              <>
                <Text style={{ marginTop: 12, fontSize: 22, fontWeight: "900", color: "#1F1F1F" }}>
                  What’s your budget?
                </Text>
                <Text style={{ marginTop: 6, opacity: 0.7 }}>Choose a price range.</Text>

                <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                  {["$", "$$", "$$$"].map((b) => (
                    <Chip key={b} label={b} active={budget === b} onPress={() => setBudget(b)} />
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
                  <Text style={{ fontWeight: "900", color: "#1F1F1F" }}>Back</Text>
                </Pressable>
              )}

              <Pressable
                onPress={goContinue}
                disabled={(step === 1 && !canNextFromStep1) || (step === 2 && !canNextFromStep2) || (step === 3 && !canNextFromStep3)}
                style={{
                  flex: 1,
                  backgroundColor:
                    (step === 1 && canNextFromStep1) || (step === 2 && canNextFromStep2) || (step === 3 && canNextFromStep3)
                      ? "#E6A4B4"
                      : "rgba(230,164,180,0.35)",
                  borderRadius: 999,
                  paddingVertical: 14,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "900", color: "#FFFFFF", fontSize: 16 }}>
                  {step < 3 ? "Continue" : "See results"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Results */}
          <View
            onLayout={(e) => setResultsY(e.nativeEvent.layout.y)}
            style={{
              marginTop: 14,
              backgroundColor: "#FFFFFF",
              borderRadius: 24,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Results</Text>
              <View
                style={{
                  backgroundColor: "rgba(230,164,180,0.22)",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Text style={{ fontWeight: "900" }}>{loading ? "…" : results.length}</Text>
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
                {results.map((p) => (
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
                      {p.brand} • {p.budget} • {p.price} {p.currency || "CAD"}
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
                  <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>See all products</Text>
                </Pressable>
              </View>
            )}

            <Text style={{ marginTop: 12, opacity: 0.55 }}>
              Affiliate disclosure: We may earn commission from some links.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
