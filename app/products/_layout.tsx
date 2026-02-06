// //app/products/_layout.tsx
// import { Stack } from "expo-router";

// export default function ProductsLayout() {
//   return (
//     <Stack>
//       <Stack.Screen
//         name="index"
//         options={{
//           title: "Products",
//           headerShown: true, // keep or set false if you want no native header on list too
//         }}
//       />
//       <Stack.Screen
//         name="[slug]"
//         options={{
//           headerShown: false, // hide native header on detail
//         }}
//       />
//     </Stack>
//   );
// }

// app/products/_layout.tsx
import { Stack } from "expo-router";

export default function ProductsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[slug]" options={{ headerShown: false }} />
    </Stack>
  );
}
