
// //2
// app/(tabs)/explore.tsx
// app/(tabs)/explore.tsx
// import { useRouter } from "expo-router";
// import React, { useEffect, useMemo, useState } from "react";
// import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

// import type { Product } from "@/src/data/products";
// import { fetchProducts } from "@/src/data/products.api";

// import MenuSheet from "../components/MenuSheet";
// import TopNav from "../components/TopNav";

// type CategoryFilter = "all" | string;
// type BudgetFilter = "all" | string;
// type ConcernFilter = "all" | string;

// function Chip({
//   label,
//   active,
//   onPress,
// }: {
//   label: string;
//   active: boolean;
//   onPress: () => void;
// }) {
//   return (
//     <Pressable
//       onPress={onPress}
//       style={{
//         paddingVertical: 10,
//         paddingHorizontal: 14,
//         borderRadius: 999,
//         backgroundColor: active ? "#E6A4B4" : "white",
//         borderWidth: 1,
//         borderColor: active ? "#E6A4B4" : "rgba(43, 42, 42, 0.12)",
//       }}
//     >
//       <Text
//         style={{
//           fontSize: 13,
//           fontWeight: "600",
//           color: active ? "white" : "rgba(43, 42, 42, 0.75)",
//           textTransform: "capitalize",
//         }}
//       >
//         {label}
//       </Text>
//     </Pressable>
//   );
// }



// export default function ExploreScreen() {
//   const router = useRouter();

//   const [menuOpen, setMenuOpen] = useState(false);

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState<string>("");

//   const [category, setCategory] = useState<CategoryFilter>("all");
//   const [budget, setBudget] = useState<BudgetFilter>("all");
//   const [concern, setConcern] = useState<ConcernFilter>("all");
//   const [query, setQuery] = useState("");

//   useEffect(() => {
//     let alive = true;
//     setLoading(true);
//     setErr("");

//     fetchProducts()
//       .then((list) => {
//         if (!alive) return;
//         setProducts(list);
//       })
//       .catch((e: any) => {
//         if (!alive) return;
//         setErr(e?.message || "Failed to load products");
//       })
//       .finally(() => {
//         if (!alive) return;
//         setLoading(false);
//       });

//     return () => {
//       alive = false;
//     };
//   }, []);

//   const allConcerns = useMemo(() => {
//     const set = new Set<string>();
//     products.forEach((p) => (p.concerns || []).forEach((c) => set.add(c)));
//     return ["all", ...Array.from(set)];
//   }, [products]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();

//     return products.filter((p) => {
//       const matchCategory = category === "all" || p.category === category;
//       const matchBudget = budget === "all" || p.budget === budget;
//       const matchConcern = concern === "all" || (p.concerns || []).includes(concern);

//       const matchQuery =
//         !q ||
//         (p.name || "").toLowerCase().includes(q) ||
//         (p.brand || "").toLowerCase().includes(q) ||
//         (p.description || "").toLowerCase().includes(q);

//       return matchCategory && matchBudget && matchConcern && matchQuery;
//     });
//   }, [products, category, budget, concern, query]);

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
//       <TopNav
//         title="Explore"
//         showBack
//         onBackPress={() => router.back()}
//         onMenuPress={() => setMenuOpen(true)}
//       />

//       <MenuSheet
//         visible={menuOpen}
//         onClose={() => setMenuOpen(false)}
//         items={[
//           { label: "Home", onPress: () => router.push("/(tabs)") },
//           { label: "Explore", onPress: () => router.push("/(tabs)/explore") },
//           { label: "Products", onPress: () => router.push("/products") },
//           { label: "Find my routine", onPress: () => router.push("/routine") },
//           { label: "Disclosure", onPress: () => router.push("/disclosure") },
//           { label: "Privacy", onPress: () => router.push("/privacy") },
//         ]}
//       />

//             <FlatList
//         data={filtered}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 40 }}
//         ListHeaderComponent={
//           <View style={{ padding: 16 }}>
//             <TextInput
//               value={query}
//               onChangeText={setQuery}
//               placeholder="Search product, brand, concern…"
//               placeholderTextColor="rgba(55, 55, 55, 0.35)"
//               style={{
//                 backgroundColor: "white",
//                 borderRadius: 16,
//                 paddingHorizontal: 16,
//                 paddingVertical: 12,
//                 marginBottom: 14,
//                 borderWidth: 1,
//                 borderColor: "rgba(0,0,0,0.1)",
//               }}
//             />

//             <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>Category</Text>
//             <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
//               {["all", "skincare", "haircare", "clothing", "bags", "accessories"].map((c) => (
//                 <Chip
//                   key={c}
//                   label={c === "all" ? "All" : c}
//                   active={category === c}
//                   onPress={() => setCategory(c)}
//                 />
//               ))}
//             </View>

//             <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Budget</Text>
//             <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
//               {["all", "$", "$$", "$$$"].map((b) => (
//                 <Chip
//                   key={b}
//                   label={b === "all" ? "All" : b}
//                   active={budget === b}
//                   onPress={() => setBudget(b)}
//                 />
//               ))}
//             </View>

//             <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Concern</Text>
//             <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
//               {allConcerns.slice(0, 8).map((c) => (
//                 <Chip
//                   key={c}
//                   label={c === "all" ? "All" : c.replace(/-/g, " ")}
//                   active={concern === c}
//                   onPress={() => setConcern(c)}
//                 />
//               ))}
//             </View>

//             <Text style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
//               {loading ? "Loading products…" : err ? `Error: ${err}` : `Showing ${filtered.length} products`}
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const image = item.imageUrl || item.images?.[0];

//           return (
//             <Pressable
//               onPress={() => router.push(`/products/${item.slug}`)}
//               style={{
//                 backgroundColor: "white",
//                 marginHorizontal: 16,
//                 marginBottom: 14,
//                 borderRadius: 22,
//                 padding: 12,
//                 borderWidth: 1,
//                 borderColor: "rgba(0,0,0,0.08)",
//               }}
//             >
//               <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
//                 <View
//                   style={{
//                     width: 92,
//                     height: 92,
//                     borderRadius: 18,
//                     overflow: "hidden",
//                     backgroundColor: "#eee",
//                   }}
//                 >
//                   {image ? (
//                     <Image
//                       source={{ uri: image }}
//                       style={{ width: "100%", height: "100%" }}
//                       resizeMode="cover"
//                     />
//                   ) : null}
//                 </View>

//                 <View style={{ flex: 1 }}>
//                   <Text style={{ fontWeight: "800", fontSize: 15, color: "#1F1F1F" }} numberOfLines={1}>
//                     {item.name}
//                   </Text>

//                   <Text style={{ fontSize: 12, color: "#6B6B6B", marginTop: 3 }} numberOfLines={1}>
//                     {item.brand} • {item.budget} • {item.price} {item.currency || "CAD"}
//                   </Text>

//                   {!!item.tag && (
//                     <View
//                       style={{
//                         marginTop: 6,
//                         alignSelf: "flex-start",
//                         backgroundColor: "rgba(230,164,180,0.25)",
//                         paddingHorizontal: 10,
//                         paddingVertical: 5,
//                         borderRadius: 999,
//                       }}
//                     >
//                       <Text style={{ fontSize: 12, fontWeight: "600", color: "#2A2A2A" }}>
//                         {item.tag}
//                       </Text>
//                     </View>
//                   )}
//                 </View>
//               </View>
//             </Pressable>
//           );
//         }}
//       />
//     </View>
//   );
// }

import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";

import type { Product } from "@/src/data/products";
import { fetchProducts } from "@/src/data/products.api";

import MenuSheet from "../components/MenuSheet";
import TopNav from "../components/TopNav";

type Filter = "all" | string;

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
          fontWeight: "700",
          color: active ? "#FFFFFF" : "rgba(43,42,42,0.75)",
          textTransform: "capitalize",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function ExploreScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [category, setCategory] = useState<Filter>("all");
  const [budget, setBudget] = useState<Filter>("all");
  const [concern, setConcern] = useState<Filter>("all");
  const [query, setQuery] = useState("");

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

  const allConcerns = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => (p.concerns || []).forEach((c) => set.add(c)));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products.filter((p) => {
      const matchCategory = category === "all" || p.category === category;
      const matchBudget = budget === "all" || p.budget === budget;
      const matchConcern = concern === "all" || (p.concerns || []).includes(concern);

      const matchQuery =
        !q ||
        (p.name || "").toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q);

      return matchCategory && matchBudget && matchConcern && matchQuery;
    });
  }, [products, category, budget, concern, query]);

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F7F4" }}>
      <TopNav
        title="Explore"
        showBack={false}
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

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={
          <View style={{ padding: 16 }}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search product, brand, concern…"
              placeholderTextColor="rgba(55,55,55,0.35)"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 14,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.10)",
              }}
            />

            <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>Category</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["all", "skincare", "haircare", "clothing", "bags", "accessories"].map((c) => (
                <Chip
                  key={c}
                  label={c === "all" ? "All" : c}
                  active={category === c}
                  onPress={() => setCategory(c)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Budget</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {["all", "$", "$$", "$$$"].map((b) => (
                <Chip
                  key={b}
                  label={b === "all" ? "All" : b}
                  active={budget === b}
                  onPress={() => setBudget(b)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.6, marginVertical: 8 }}>Concern</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {allConcerns.slice(0, 8).map((c) => (
                <Chip
                  key={c}
                  label={c === "all" ? "All" : c.replace(/-/g, " ")}
                  active={concern === c}
                  onPress={() => setConcern(c)}
                />
              ))}
            </View>

            <Text style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
              {loading ? "Loading products…" : err ? `Error: ${err}` : `Showing ${filtered.length} products`}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const image = item.imageUrl || item.images?.[0];

          return (
            <Pressable
              onPress={() => router.push(`/products/${item.slug}`)}
              style={{
                backgroundColor: "#FFFFFF",
                marginHorizontal: 16,
                marginBottom: 14,
                borderRadius: 22,
                padding: 12,
                borderWidth: 1,
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: 18,
                    overflow: "hidden",
                    backgroundColor: "#EEE",
                  }}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  ) : null}
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "900", fontSize: 15, color: "#1F1F1F" }} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={{ fontSize: 12, color: "#6B6B6B", marginTop: 3 }} numberOfLines={1}>
                    {item.brand} • {item.budget} • {item.price} {item.currency || "CAD"}
                  </Text>

                  {!!item.tag && (
                    <View
                      style={{
                        marginTop: 6,
                        alignSelf: "flex-start",
                        backgroundColor: "rgba(230,164,180,0.25)",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 999,
                      }}
                    >
                      <Text style={{ fontSize: 12, fontWeight: "800", color: "#2A2A2A" }}>
                        {item.tag}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

