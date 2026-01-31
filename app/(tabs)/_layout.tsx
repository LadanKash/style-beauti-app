
// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#2B2B2B",
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
//         name="lists"
//         options={{
//           title: "Lists",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="list-outline" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

//2
// import { Ionicons } from "@expo/vector-icons";
// import Fontisto from '@expo/vector-icons/Fontisto';
// import { Tabs } from "expo-router";
// <Fontisto name="home" size={24} color="black" />


// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,

//         // ✅ set BOTH active + inactive so color is always defined/visible
//         tabBarActiveTintColor: "#2B2B2B",
//         tabBarInactiveTintColor: "#8E8E93",

//         // ✅ force a clear background so icons don’t blend in
//         tabBarStyle: { backgroundColor: "#FFFFFF" },
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
//         name="lists"
//         options={{
//           title: "Lists",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="list" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }



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

      <Tabs.Screen
        name="lists"
        options={{
          title: "Lists",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
