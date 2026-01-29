import ProductCard from "@/src/components/ProductCard";
import { products, type Product } from "@/src/data/products";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";

import Page from "../components/Page";

type QuizCategory = Product["category"];
type QuizBudget = "any" | Product["budget"];

type QuizState = {
  category?: QuizCategory;
  concern?: string;
  budget?: QuizBudget;
};

function Chip({
  active,
  disabled,
  label,
  onPress,
}: {
  active: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: active ? "rgba(230,164,180,0.95)" : "rgba(0,0,0,0.12)",
        backgroundColor: active ? "rgba(230,164,180,0.35)" : "white",
        opacity: disabled ? 0.35 : 1,
      }}
    >
      <Text style={{ fontWeight: "500", color: "#2A2A2A", textTransform: "capitalize" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function RoutineQuiz() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const [step, setStep] = useState(1);
  const [quiz, setQuiz] = useState<QuizState>({ budget: "any" });

  const isAny = !quiz.budget || quiz.budget === "any";

  const concernsForCategory = useMemo(() => {
    if (!quiz.category) return [];
    const set = new Set<string>();

    products
      .filter((p) => p.category === quiz.category)
      .forEach((p) => (p.concerns ?? []).forEach((c) => set.add(c)));

    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [quiz.category]);

  const availableBudgets = useMemo(() => {
    const set = new Set<Product["budget"]>();
    if (!quiz.category || !quiz.concern) return set;

    products
      .filter((p) => p.category === quiz.category && p.concerns.includes(quiz.concern!))
      .forEach((p) => set.add(p.budget));

    return set;
  }, [quiz.category, quiz.concern]);

  const matches = useMemo(() => {
    if (!quiz.category || !quiz.concern) return [];
    return products.filter((p) => {
      const okCategory = p.category === quiz.category;
      const okConcern = p.concerns.includes(quiz.concern!);
      const okBudget = isAny ? true : p.budget === quiz.budget;
      return okCategory && okConcern && okBudget;
    });
  }, [quiz.category, quiz.concern, quiz.budget, isAny]);

  const reset = () => {
    setQuiz({ budget: "any" });
    setStep(1);
  };

  const QuizCard = (
    <View
      style={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.10)",
        borderRadius: 24,
        padding: 18,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
        <Text style={{ opacity: 0.6, fontWeight: "500" }}>Step {step} of 3</Text>
        <Pressable onPress={reset}>
          <Text style={{ opacity: 0.6, fontWeight: "500" }}>Reset</Text>
        </Pressable>
      </View>

      {step === 1 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#2A2A2A" }}>
            What are you shopping for?
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.65 }}>Choose a category.</Text>

          <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {(["skincare", "haircare", "clothing", "bags", "accessories"] as QuizCategory[]).map(
              (cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  active={quiz.category === cat}
                  onPress={() =>
                    setQuiz({
                      category: cat,
                      concern: undefined,
                      budget: "any",
                    })
                  }
                />
              )
            )}
          </View>

          <Pressable
            onPress={() => setStep(2)}
            disabled={!quiz.category}
            style={{
              marginTop: 18,
              backgroundColor: quiz.category ? "#E6A4B4" : "rgba(230,164,180,0.35)",
              paddingVertical: 14,
              borderRadius: 999,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "900" }}>Continue</Text>
          </Pressable>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#2A2A2A" }}>
            What’s your main concern?
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.65 }}>Pick one.</Text>

          <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {concernsForCategory.map((c) => (
              <Chip
                key={c}
                label={c.replaceAll("-", " ")}
                active={quiz.concern === c}
                onPress={() =>
                  setQuiz((q) => ({
                    ...q,
                    concern: c,
                    budget: "any",
                  }))
                }
              />
            ))}
          </View>

          <View style={{ marginTop: 18, flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => setStep(1)}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.12)",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600" }}>Back</Text>
            </Pressable>

            <Pressable
              onPress={() => setStep(3)}
              disabled={!quiz.concern}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 999,
                backgroundColor: quiz.concern ? "#E6A4B4" : "rgba(230,164,180,0.35)",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>Continue</Text>
            </Pressable>
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "#2A2A2A" }}>
            What’s your budget?
          </Text>
          <Text style={{ marginTop: 6, opacity: 0.65 }}>Choose a price range.</Text>

          <View style={{ marginTop: 14, flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            <Chip
              label="Any"
              active={isAny}
              onPress={() => setQuiz((q) => ({ ...q, budget: "any" }))}
            />

            {(["$", "$$", "$$$"] as Product["budget"][]).map((b) => {
              const disabled = !!quiz.category && !!quiz.concern && !availableBudgets.has(b);
              return (
                <Chip
                  key={b}
                  label={b}
                  active={!isAny && quiz.budget === b}
                  disabled={disabled}
                  onPress={() => setQuiz((q) => ({ ...q, budget: b }))}
                />
              );
            })}
          </View>

          <Text style={{ marginTop: 10, opacity: 0.65 }}>
            Tip: choose $ / $$ / $$$ to filter, or Any to see all.
          </Text>

          <View style={{ marginTop: 18, flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => setStep(2)}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.12)",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600" }}>Back</Text>
            </Pressable>

            <Pressable
              onPress={() => setStep(4)}
              disabled={!quiz.category || !quiz.concern}
              style={{
                flex: 1,
                paddingVertical: 14,
                borderRadius: 999,
                backgroundColor:
                  quiz.category && quiz.concern ? "#E6A4B4" : "rgba(230,164,180,0.35)",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "500" }}>See results</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  const ResultsCard = (
    <View
      style={{
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.10)",
        borderRadius: 24,
        padding: 18,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", color: "#2A2A2A" }}>Results</Text>
        <View
          style={{
            backgroundColor: "rgba(230,164,180,0.25)",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontWeight: "900", color: "#2A2A2A" }}>
            {step === 4 ? matches.length : 0}
          </Text>
        </View>
      </View>

      {step !== 4 ? (
        <Text style={{ opacity: 0.65 }}>Complete the quiz to see your matches here.</Text>
      ) : matches.length === 0 ? (
        <View>
          <Text style={{ opacity: 0.65, marginBottom: 12 }}>
            No exact matches yet. Try a different budget or concern.
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={() => setStep(2)}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.12)",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Change concern</Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/products")}
              style={{
                flex: 1,
                paddingVertical: 12,
                borderRadius: 999,
                backgroundColor: "#E6A4B4",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>Browse all</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          {matches.slice(0, 3).map((p) => (
            <Pressable
              key={p.id}
              onPress={() => router.push(`/products/${p.slug}`)}
              style={{
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.10)",
                borderRadius: 18,
                padding: 12,
                backgroundColor: "white",
              }}
            >
              <Text style={{ opacity: 0.65, marginBottom: 4 }}>
                {p.brand} • {p.budget}
              </Text>
              <Text style={{ fontWeight: "900", color: "#2A2A2A" }}>{p.name}</Text>
              <Text style={{ opacity: 0.65, marginTop: 6 }} numberOfLines={2}>
                {p.description}
              </Text>
            </Pressable>
          ))}

          <Pressable
            onPress={() => router.push("/products")}
            style={{
              marginTop: 6,
              backgroundColor: "#2A2A2A",
              paddingVertical: 12,
              borderRadius: 999,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>See all products</Text>
          </Pressable>
        </View>
      )}

      <Text style={{ marginTop: 14, fontSize: 12, opacity: 0.6 }}>
        Affiliate disclosure: We may earn commission from some links.
      </Text>
    </View>
  );

  return (
    <Page>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
        {/* ✅ This header is now safely BELOW the TopNav */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 26, fontWeight: "600", color: "#2A2A2A" }}>
              Find my routine
            </Text>
            <Text style={{ marginTop: 6, opacity: 0.7 }}>
              Answer 3 quick questions — we’ll recommend products that match your needs and budget.
            </Text>
          </View>

          <Pressable onPress={() => router.push("/products")}>
            <Text style={{ fontWeight: "500", color: "#2A2A2A" }}>Browse →</Text>
          </Pressable>
        </View>

        {isWide ? (
          <View style={{ flexDirection: "row", gap: 14 }}>
            <View style={{ flex: 1 }}>{QuizCard}</View>
            <View style={{ width: 360 }}>{ResultsCard}</View>
          </View>
        ) : (
          <>
            {QuizCard}
            {ResultsCard}

            {step === 4 && matches.length > 0 ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: "500", marginBottom: 10, color: "#2A2A2A" }}>
                  Recommended products
                </Text>

                <FlatList
                  data={matches}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
                  renderItem={({ item }) => (
                    <ProductCard
                      product={item}
                      onPress={() => router.push(`/products/${item.slug}`)}
                    />
                  )}
                />
              </View>
            ) : null}
          </>
        )}
      </ScrollView>
    </Page>
  );
}

