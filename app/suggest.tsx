// app/suggest.tsx
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

import MenuSheet from "./components/MenuSheet";
import TopNav from "./components/TopNav";

const BG = "#FAF7F4";
const CARD = "#FFFFFF";
const TEXT = "#1F1F1F";
const SUB = "rgba(31,31,31,0.68)";
const BORDER = "rgba(0,0,0,0.08)";

type Budget = "all" | "$" | "$$" | "$$$";
type Category =
  | "all"
  | "skincare"
  | "haircare"
  | "clothing"
  | "shoes"
  | "bags"
  | "accessories";
type Concern = "all" | string;

function cap(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
function norm(s?: string) {
  return (s ?? "").toLowerCase();
}

function getProductCategory(p: Product): string {
  const anyP: any = p as any;
  return norm(anyP.category || anyP.type || anyP.group || "");
}

function getProductBudget(p: Product): Budget {
  const b = (p as any).budget ?? "all";
  if (b === "$" || b === "$$" || b === "$$$") return b;
  return "all";
}

function getProductConcernText(p: Product): string {
  const anyP: any = p as any;
  const tags = Array.isArray(anyP.tags) ? anyP.tags.join(" ") : "";
  const concernsArr = Array.isArray(anyP.concerns) ? anyP.concerns.join(" ") : "";
  const concern = norm(anyP.concern || "");
  return [p.name, anyP.brand, anyP.description, tags, concernsArr, concern]
    .map((x) => norm(String(x ?? "")))
    .join(" ");
}

function scoreProduct(p: Product, category: Category, concern: Concern, budget: Budget) {
  let score = 0;

  if (category !== "all") {
    const pc = getProductCategory(p);
    if (pc.includes(category)) score += 4;
    else score -= 2;
  }

  if (budget !== "all") {
    const pb = getProductBudget(p);
    if (pb === budget) score += 3;
    else score -= 1;
  }

  if (concern !== "all") {
    const text = getProductConcernText(p);
    const kw = norm(concern);
    if (kw && text.includes(kw)) score += 4;
  }

  if ((p.brand ?? "").length > 0) score += 0.2;
  return score;
}

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
        backgroundColor: active ? TEXT : CARD,
        borderWidth: 1,
        borderColor: active ? TEXT : BORDER,
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontWeight: "700", color: active ? "#F7F1F1" : TEXT, fontSize: 12 }}>
        {label}
      </Text>
    </Pressable>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <View
      style={{
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 999,
        backgroundColor: "rgba(230, 164, 181, 0.52)",
        borderWidth: 1,
        borderColor: "rgba(230,164,180,0.22)",
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "800", color: TEXT }}>{text}</Text>
    </View>
  );
}

export default function SuggestScreen() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [category, setCategory] = React.useState<Category>("all");
  const [budget, setBudget] = React.useState<Budget>("all");
  const [concern, setConcern] = React.useState<Concern>("all");
  const [seed, setSeed] = React.useState(0);

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "skincare", label: "Skincare" },
    { key: "haircare", label: "Haircare" },
    { key: "clothing", label: "Clothing" },
    { key: "shoes", label: "Shoes" },
    { key: "bags", label: "Bags" },
    { key: "accessories", label: "Accessories" },
  ];

  const budgets: { key: Budget; label: string }[] = [
    { key: "all", label: "All" },
    { key: "$", label: "$" },
    { key: "$$", label: "$$" },
    { key: "$$$", label: "$$$" },
  ];

  const concerns: { key: Concern; label: string }[] = [
    { key: "all", label: "All" },
    { key: "hydration", label: "Hydration" },
    { key: "dark spots", label: "Dark Spots" },
    { key: "wrinkles", label: "Wrinkles" },
    { key: "firmness", label: "Firmness" },
    { key: "frizz", label: "Frizz" },
    { key: "shine", label: "Shine" },
  ];

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (alive) setProducts(data);
      } catch (e: any) {
        if (alive) setError(e?.message || "Failed to load products");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const picks = React.useMemo(() => {
    const scored = products
      .map((p) => ({ p, s: scoreProduct(p, category, concern, budget) }))
      .sort((a, b) => {
        if (b.s !== a.s) return b.s - a.s;
        const ax = (Number(String(a.p.id).slice(-4)) || 0) + seed;
        const bx = (Number(String(b.p.id).slice(-4)) || 0) + seed;
        return bx - ax;
      });

    const filtered = scored.filter((x) => {
      if (category === "all" && budget === "all" && concern === "all") return true;
      return x.s >= 4;
    });

    return (filtered.length ? filtered : scored).slice(0, 6).map((x) => x.p);
  }, [products, category, concern, budget, seed]);

  const summaryLine = React.useMemo(() => {
    const parts: string[] = [];
    if (category !== "all") parts.push(cap(category));
    if (concern !== "all") parts.push(cap(String(concern)));
    if (budget !== "all") parts.push(`Budget ${budget}`);
    return parts.length ? parts.join(" • ") : "Curated picks based on your taste";
  }, [category, concern, budget]);

  const reasonsFor = (p: Product) => {
    const r: string[] = [];
    if (category !== "all") {
      const pc = getProductCategory(p);
      if (pc.includes(category)) r.push(`Matches ${cap(category)}`);
    }
    if (concern !== "all") {
      const text = getProductConcernText(p);
      if (text.includes(norm(concern))) r.push(`Good for ${cap(String(concern))}`);
    }
    if (budget !== "all") {
      const pb = getProductBudget(p);
      if (pb === budget) r.push(`Fits ${budget} budget`);
    }
    return r.slice(0, 2);
  };

  const reset = () => {
    setCategory("all");
    setBudget("all");
    setConcern("all");
    setSeed((v) => v + 1);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: BG }}>
        <TopNav
          title="AI Suggest"
          showBack
          onBackPress={() => router.back()}
          onMenuPress={() => setMenuOpen(true)}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
          <Text style={{ marginTop: 10, color: SUB }}>Loading…</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: BG }}>
        <TopNav
          title="AI Suggest"
          showBack
          onBackPress={() => router.back()}
          onMenuPress={() => setMenuOpen(true)}
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
          <Text style={{ fontWeight: "900", color: TEXT }}>Couldn’t load products</Text>
          <Text style={{ marginTop: 8, color: SUB, textAlign: "center" }}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <TopNav
        title="AI Suggest"
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
          { label: "Inspiration Looks", onPress: () => router.push("/looks") },
          { label: "Collection", onPress: () => router.push("/lists") },
          { label: "Find my routine", onPress: () => router.push("/routine") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <FlatList
        data={picks}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={{ padding: 14, paddingBottom: 28 }}
        ListHeaderComponent={
          <View style={{ alignSelf: "center", width: "100%", maxWidth: 520 }}>
            <View
              style={{
                backgroundColor: CARD,
                borderRadius: 24,
                padding: 16,
                borderWidth: 1,
                borderColor: BORDER,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                  <Text style={{ fontWeight: "800", fontSize: 16, color: TEXT }}>Your picks</Text>
                  <Text style={{ marginTop: 6, color: SUB, lineHeight: 19 }}>{summaryLine}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      backgroundColor: "rgba(230,164,180,0.18)",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "rgba(230,164,180,0.22)",
                    }}
                  >
                    <Text style={{ fontWeight: "800", color: TEXT }}>{picks.length}</Text>
                  </View>
                  <Text style={{ marginTop: 6, fontSize: 12, color: "rgba(31,31,31,0.55)" }}>
                    curated
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
                <Pressable
                  onPress={() => setSeed((v) => v + 1)}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 16,
                    backgroundColor: "rgba(0,0,0,0.04)",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.06)",
                  }}
                >
                  <Text style={{ fontWeight: "800", color: TEXT }}>Shuffle</Text>
                  <Text style={{ fontSize: 12, color: SUB, marginTop: 2 }}>New picks</Text>
                </Pressable>

                <Pressable
                  onPress={reset}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 16,
                    backgroundColor: "rgba(230,164,180,0.18)",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(230,164,180,0.22)",
                  }}
                >
                  <Text style={{ fontWeight: "800", color: TEXT }}>Reset</Text>
                  <Text style={{ fontSize: 12, color: SUB, marginTop: 2 }}>Start fresh</Text>
                </Pressable>
              </View>
            </View>

            <View
              style={{
                marginTop: 12,
                backgroundColor: CARD,
                borderRadius: 24,
                padding: 16,
                borderWidth: 1,
                borderColor: BORDER,
              }}
            >
              <Text style={{ fontWeight: "800", color: TEXT }}>Filters</Text>
              <Text style={{ marginTop: 6, color: SUB }}>
                Keep it simple — we’ll curate the top 6 picks.
              </Text>

              <Text style={{ marginTop: 12, color: SUB, fontWeight: "800" }}>Category</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                {categories.map((c) => (
                  <Chip key={c.key} label={c.label} active={category === c.key} onPress={() => setCategory(c.key)} />
                ))}
              </View>

              <Text style={{ marginTop: 2, color: SUB, fontWeight: "800" }}>Budget</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                {budgets.map((b) => (
                  <Chip key={b.key} label={b.label} active={budget === b.key} onPress={() => setBudget(b.key)} />
                ))}
              </View>

              <Text style={{ marginTop: 2, color: SUB, fontWeight: "800" }}>Concern</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                {concerns.map((c) => (
                  <Chip key={c.key} label={c.label} active={concern === c.key} onPress={() => setConcern(c.key)} />
                ))}
              </View>

              <Text style={{ marginTop: 10, fontWeight: "800", color: TEXT }}>Top picks</Text>
              <Text style={{ marginTop: 4, color: SUB }}>Tap a product to open it.</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          const reasons = reasonsFor(item);
          const img = (item as any).imageUrl;

          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/products/[slug]",
                  params: { slug: (item as any).slug ?? item.id },
                })
              }
              style={{
                alignSelf: "center",
                width: "100%",
                maxWidth: 500,
                backgroundColor: CARD,
                borderRadius: 22,
                padding: 14,
                borderWidth: 1,
                borderColor: BORDER,
                marginTop: 12,
              }}
            >
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View
                  style={{
                    width: 86,
                    height: 86,
                    borderRadius: 18,
                    backgroundColor: "rgba(0,0,0,0.03)",
                    borderWidth: 1,
                    borderColor: "rgba(0,0,0,0.06)",
                    overflow: "hidden",
                  }}
                >
                  {img ? (
                    <Image source={{ uri: img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                  ) : null}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "900", color: TEXT, fontSize: 14 }} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={{ marginTop: 6, color: SUB, fontSize: 12 }} numberOfLines={1}>
                    {item.brand ? `${item.brand} • ` : ""}
                    {(item as any).budget ? `${(item as any).budget} • ` : ""}
                    Check price from retailer
                  </Text>

                  {reasons.length > 0 && (
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                      {reasons.map((r) => (
                        <Badge key={r} text={r} />
                      ))}
                    </View>
                  )}

                  <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 11, color: "rgba(31,31,31,0.5)" }}>
                      We may earn commission from links.
                    </Text>

                    <View
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        backgroundColor: "rgba(230,164,180,0.18)",
                        borderWidth: 1,
                        borderColor: "rgba(230,164,180,0.22)",
                      }}
                    >
                      <Text style={{ fontWeight: "900", color: TEXT, fontSize: 12 }}>View</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}