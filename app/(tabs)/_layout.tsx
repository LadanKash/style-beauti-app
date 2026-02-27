// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2B2B2B",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "rgba(0,0,0,0.08)",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      {/*  Routine tab  */}
      <Tabs.Screen
        name="routine"
        options={{
          title: "Routine",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="looks"
        options={{
          title: "Inspiration",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Hide these from footer but keep routes accessible */}
      <Tabs.Screen name="saved-routines" options={{ href: null }} />
      <Tabs.Screen name="lists" options={{ href: null }} />
    </Tabs>
  );
}

// // app/(tabs)/_layout.tsx
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#2B2B2B",
//         tabBarInactiveTintColor: "#8E8E93",
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopColor: "rgba(0,0,0,0.08)",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="search-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="routine"
//         options={{
//           title: "Routine",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="sparkles-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="looks"
//         options={{
//           title: "Inspiration",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="star-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="saved"
//         options={{
//           title: "Saved",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="bookmark-outline" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* Hidden routes but accessible */}
//       <Tabs.Screen name="saved-routines" options={{ href: null }} />
//       <Tabs.Screen name="lists" options={{ href: null }} />
//     </Tabs>
//   );
// }