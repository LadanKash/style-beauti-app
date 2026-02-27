// app/suggest.tsx
import { useRouter } from "expo-router";
import React from "react";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { Image as ExpoImage } from "expo-image";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

import MenuSheet from "./components/MenuSheet";
import TopNav from "./components/TopNav";



// --- theme tokens (keep local so we never depend on missing Brand keys)
const BG = "#FAF7F4";
const CARD = "#FFFFFF";
const TEXT = "#1F1F1F";
const SUB = "rgba(31,31,31,0.68)";
const BORDER = "rgba(0,0,0,0.08)";

// brand pinks (safe)
const PRIMARY = "#D97C96";                 // strong
const PRIMARY_SOFT = "#E6A4B4";            // soft
const PRIMARY_SOFT_BG = "rgba(217,124,150,0.18)";
const PRIMARY_BORDER = "rgba(217,124,150,0.28)";
const ACCENT_SOFT = "#F7D5DD";             // very light pink

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

type SuggestProfile = {
  category: Category;
  budget: Budget;
  concern: Concern;
  updatedAt: number;
};

const PROFILE_KEY = "stylebeauty:suggestProfile:v1";

function cap(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
function norm(s?: string) {
  return (s ?? "").toLowerCase();
}

/** deterministic 0..1 number based on seed + key */
function hashToUnit(seed: number, key: string) {
  let h = 2166136261;
  const s = `${seed}:${key}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
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

  // tiny boost for “more complete” items
  if ((p.brand ?? "").length > 0) score += 0.2;
  if (((p as any).imageUrl ?? "").length > 0) score += 0.2;

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
        backgroundColor: "rgba(217,124,150,0.40)",
        borderWidth: 1,
        borderColor: PRIMARY_BORDER,
      }}
    >
      <Text style={{ fontSize: 12, fontWeight: "800", color: TEXT }}>{text}</Text>
    </View>
  );
}

type PillVariant = "secondary" | "primary" | "outline";

function PillButton({
  title,
  subtitle,
  onPress,
  variant = "secondary",
  disabled = false,
}: {
  title: string;
  subtitle?: string;
  onPress: () => void;
  variant?: PillVariant;
  disabled?: boolean;
}) {
  const isPrimary = variant === "primary";
  const isOutline = variant === "outline";

  const bgBase = disabled
    ? "rgba(0,0,0,0.03)"
    : isPrimary
      ? PRIMARY
      : isOutline
        ? ACCENT_SOFT
        : "rgba(0,0,0,0.04)";

  const borderBase = disabled
    ? "rgba(0,0,0,0.06)"
    : isPrimary
      ? PRIMARY
      : isOutline
        ? PRIMARY_BORDER
        : "rgba(0,0,0,0.06)";

  const titleColor = disabled ? "rgba(31,31,31,0.35)" : isPrimary ? "#fff" : TEXT;
  const subColor = disabled ? "rgba(31,31,31,0.30)" : isPrimary ? "rgba(255,255,255,0.85)" : SUB;

  const bgPressed = disabled
    ? bgBase
    : isPrimary
      ? PRIMARY_SOFT
      : isOutline
        ? PRIMARY_SOFT_BG
        : "rgba(0,0,0,0.08)";

  return (
    <Pressable
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => ({
        flex: 1,
        paddingVertical: 12,
        borderRadius: 16,
        alignItems: "center",
        borderWidth: 1,
        borderColor: borderBase,
        backgroundColor: pressed ? bgPressed : bgBase,
        transform: [{ scale: pressed ? 0.98 : 1 }],
        opacity: disabled ? 0.9 : pressed ? 0.98 : 1,
      })}
    >
      <Text style={{ fontWeight: "800", color: titleColor }}>{title}</Text>
      {!!subtitle && <Text style={{ fontSize: 12, color: subColor, marginTop: 2 }}>{subtitle}</Text>}
    </Pressable>
  );
}

function OfflineBadge() {
  return (
    <View
      style={{
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: "rgba(0,0,0,0.04)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        marginTop: 10,
      }}
    >
      <Text style={{ fontWeight: "900", color: TEXT }}>Offline mode</Text>
      <Text style={{ marginTop: 4, color: SUB, fontSize: 12 }}>
        Saved content works. Images may be unavailable offline.
      </Text>
    </View>
  );
}

function ImageBox({ uri, isOnline }: { uri?: string; isOnline: boolean }) {
  const show = !!uri;

  return (
    <View
      style={{
        width: 86,
        height: 86,
        borderRadius: 18,
        backgroundColor: "rgba(0,0,0,0.03)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {show ? (
        <ExpoImage
          source={{ uri }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          cachePolicy="disk"
        />
      ) : (
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>🌐</Text>
          <Text
            style={{
              marginTop: 4,
              fontSize: 10,
              color: "rgba(31,31,31,0.55)",
              textAlign: "center",
            }}
          >
            {isOnline ? "No image" : "Offline"}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function SuggestScreen() {

  const router = useRouter();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const contentMaxWidth = isTablet ? 900 : 520;
  const cardMaxWidth = isTablet ? 700 : 500;
  const numColumns = isTablet ? 2 : 1;

  // ...rest of your state/effects

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [category, setCategory] = React.useState<Category>("all");
  const [budget, setBudget] = React.useState<Budget>("all");
  const [concern, setConcern] = React.useState<Concern>("all");

  const [seed, setSeed] = React.useState(0);
  const [showPersonalize, setShowPersonalize] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);

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

  const hasProfile = category !== "all" || budget !== "all" || concern !== "all";

  // network state
  React.useEffect(() => {
    const unsub = NetInfo.addEventListener((state) => {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    });
    return () => unsub();
  }, []);

  // load profile
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(PROFILE_KEY);
        if (!alive) return;
        if (raw) {
          const p = JSON.parse(raw) as SuggestProfile;
          if (p?.category) setCategory(p.category);
          if (p?.budget) setBudget(p.budget);
          if (p?.concern) setConcern(p.concern);
        }
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);

  // persist profile
  React.useEffect(() => {
    (async () => {
      const profile: SuggestProfile = { category, budget, concern, updatedAt: Date.now() };
      try {
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      } catch {}
    })();
  }, [category, budget, concern]);

  // load products
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
      .map((p) => {
        const base = scoreProduct(p, category, concern, budget);

        // if no profile, boost items with image/brand slightly so starter list looks better
        const imgBoost = ((p as any).imageUrl ?? "").length > 0 ? 0.4 : 0;
        const brandBoost = (p.brand ?? "").length > 0 ? 0.2 : 0;
        const starterBoost = hasProfile ? 0 : imgBoost + brandBoost;

        const key = String((p as any).id ?? (p as any).slug ?? p.name);
        const rand = hashToUnit(seed, key);
        const jitter = (rand - 0.5) * 0.2;

        return { p, s: base + starterBoost + jitter, r: rand };
      })
      .sort((a, b) => (b.s !== a.s ? b.s - a.s : b.r - a.r));

    // If personalized, keep it “curated”
    const filtered = scored.filter((x) => (!hasProfile ? true : x.s >= 4));
    const pool = filtered.length ? filtered : scored;
    return pool.slice(0, 6).map((x) => x.p);
  }, [products, category, concern, budget, seed, hasProfile]);

  const summaryLine = React.useMemo(() => {
    if (!hasProfile) return "Starter picks — personalize for better recommendations";
    const parts: string[] = [];
    if (category !== "all") parts.push(cap(category));
    if (concern !== "all") parts.push(cap(String(concern)));
    if (budget !== "all") parts.push(`Budget ${budget}`);
    return `Personalized for you: ${parts.join(" • ")}`;
  }, [hasProfile, category, concern, budget]);

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
    if (r.length === 0) r.push("Popular pick");
    return r.slice(0, 2);
  };

  const openWhy = (p: Product) => {
    const r = reasonsFor(p);
    Alert.alert(
      "Why this pick?",
      r.map((x) => `• ${x}`).join("\n") +
        `\n\nBased on your Style Profile: ${category === "all" ? "Any category" : cap(category)}, ` +
        `${concern === "all" ? "Any concern" : cap(String(concern))}, ` +
        `${budget === "all" ? "Any budget" : budget}.`
    );
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
          title="Smart Picks"
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
          title="Smart Picks"
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
        title="Smart Picks"
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
          { label: "Find my routine", onPress: () => router.push("/(tabs)/routine") },
          { label: "Saved routines", onPress: () => router.push("/(tabs)/saved-routines") },
          { label: "Disclosure", onPress: () => router.push("/disclosure") },
          { label: "Privacy", onPress: () => router.push("/privacy") },
        ]}
      />

      <FlatList
         data={picks}
         numColumns={numColumns}
         key={numColumns}
        keyExtractor={(p) => String((p as any).id ?? (p as any).slug ?? p.name)}
        contentContainerStyle={{ padding: 14, paddingBottom: 28 }}
        ListHeaderComponent={
          <View style={{ alignSelf: "center", width: "100%", maxWidth: contentMaxWidth }}>
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
                  <Text style={{ fontWeight: "900", fontSize: 16, color: TEXT }}>Your Style Profile</Text>
                  <Text style={{ marginTop: 6, color: SUB, lineHeight: 19 }}>{summaryLine}</Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      backgroundColor: PRIMARY_SOFT_BG,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: PRIMARY_BORDER,
                    }}
                  >
                    <Text style={{ fontWeight: "800", color: TEXT }}>{picks.length}</Text>
                  </View>
                  <Text style={{ marginTop: 6, fontSize: 12, color: "rgba(31,31,31,0.55)" }}>picks</Text>
                </View>
              </View>

              {!isOnline && <OfflineBadge />}

              {/* Buttons: Shuffle light, Personalize strong */}
              <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
                <PillButton
                  title="Shuffle"
                  subtitle="New picks"
                  onPress={() => setSeed((v) => v + 1)}
                  variant="secondary"
                />
                <PillButton
                  title={showPersonalize ? "Hide" : "Personalize"}
                  subtitle="Update preferences"
                  onPress={() => setShowPersonalize((v) => !v)}
                  variant="primary"
                />
              </View>

              {/* Buttons: Reset light, How it works light pink */}
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <PillButton title="Reset" subtitle="Clear profile" onPress={reset} variant="secondary" />
                <PillButton
                  title="How it works"
                  subtitle="Why these picks"
                  onPress={() =>
                    Alert.alert(
                      "How Smart Picks works",
                      "We create a short list of top picks based on your Style Profile (category, concern, budget). You can shuffle to refresh and personalize anytime."
                    )
                  }
                  variant="outline"
                />
              </View>
            </View>

            {showPersonalize && (
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
                <Text style={{ fontWeight: "900", color: TEXT }}>Personalize your recommendations</Text>
                <Text style={{ marginTop: 6, color: SUB }}>
                  Choose what you care about — we’ll curate the top picks for you.
                </Text>

                <Text style={{ marginTop: 12, color: SUB, fontWeight: "800" }}>Category</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                  {categories.map((c) => (
                    <Chip
                      key={c.key}
                      label={c.label}
                      active={category === c.key}
                      onPress={() => setCategory(c.key)}
                    />
                  ))}
                </View>

                <Text style={{ marginTop: 2, color: SUB, fontWeight: "800" }}>Budget</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                  {budgets.map((b) => (
                    <Chip
                      key={b.key}
                      label={b.label}
                      active={budget === b.key}
                      onPress={() => setBudget(b.key)}
                    />
                  ))}
                </View>

                <Text style={{ marginTop: 2, color: SUB, fontWeight: "800" }}>Concern</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                  {concerns.map((c) => (
                    <Chip
                      key={String(c.key)}
                      label={c.label}
                      active={concern === c.key}
                      onPress={() => setConcern(c.key)}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const reasons = reasonsFor(item);
          const img = (item as any).imageUrl as string | undefined;

          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/products/[slug]",
                  params: { slug: (item as any).slug ?? (item as any).id },
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
                <ImageBox uri={img} isOnline={isOnline} />

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

                  <View
                    style={{
                      marginTop: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable onPress={() => openWhy(item)} style={{ paddingVertical: 6, paddingRight: 8 }}>
                      <Text style={{ fontSize: 12, fontWeight: "900", color: TEXT }}>Why this pick?</Text>
                      <Text style={{ fontSize: 11, color: "rgba(31,31,31,0.55)" }}>Tap to see reasons</Text>
                    </Pressable>

                    <View
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        backgroundColor: PRIMARY_SOFT,
                        borderWidth: 1,
                        borderColor: PRIMARY_BORDER,
                      }}
                    >
                      <Text style={{ fontWeight: "900", color: TEXT, fontSize: 12 }}>View</Text>
                    </View>
                  </View>

                  <Text style={{ marginTop: 8, fontSize: 11, color: "rgba(31,31,31,0.5)" }}>
                    We may earn commission from links.
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}