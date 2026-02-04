// // app/components/MenuSheet.tsx
// import React, { useEffect, useRef } from "react";
// import {
//   Animated,
//   Modal,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// type Item = { label: string; onPress: () => void };

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   items?: Item[];
//   side?: "left" | "right";
//   width?: number;
// };

// export default function MenuSheet({
//   visible,
//   onClose,
//   items = [],
//   side = "right",
//   width = 280,
// }: Props) {
//   const insets = useSafeAreaInsets();

//   const translateX = useRef(
//     new Animated.Value(side === "right" ? width : -width)
//   ).current;

//   useEffect(() => {
//     Animated.timing(translateX, {
//       toValue: visible ? 0 : side === "right" ? width : -width,
//       duration: 220,
//       useNativeDriver: true,
//     }).start();
//   }, [visible, side, width, translateX]);

//   return (
//     <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
//       <Pressable style={styles.overlay} onPress={onClose}>
//         <Pressable style={{ flex: 1 }} onPress={() => {}}>
//           <Animated.View
//             style={[
//               styles.panel,
//               {
//                 width,
//                 paddingTop: insets.top + 26, // ✅ notch-safe
//                 transform: [{ translateX }],
//               },
//               side === "right" ? { right: 0 } : { left: 0 },
//             ]}
//           >
//             {items.map((item, i) => (
//               <Pressable
//                 key={`${item.label}-${i}`}
//                 onPress={() => {
//                   onClose();
//                   item.onPress();
//                 }}
//                 style={[styles.row, i !== items.length - 1 && styles.rowBorder]}
//               >
//                 <Text style={styles.label}>{item.label}</Text>
//               </Pressable>
//             ))}

//             <View style={{ flex: 1 }} />
//             <Text style={styles.footer}>Style & Beauty</Text>
//           </Animated.View>
//         </Pressable>
//       </Pressable>
//     </Modal>
//   );
// }

// const styles = StyleSheet.create({
//   overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.25)" },

//   panel: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     backgroundColor: "#fdfdfd",
//     paddingHorizontal: 18,
//     paddingBottom: 18,
//     borderTopLeftRadius: 18,
//     borderBottomLeftRadius: 18,
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOpacity: 0.12,
//         shadowRadius: 20,
//         shadowOffset: { width: 0, height: 12 },
//       },
//       android: { elevation: 10 },
//     }),
//   },

//   row: { paddingVertical: 16 },
//   rowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.06)" },

//   label: { fontSize: 16, fontWeight: "400", color: "#2A2A2A" },
//   footer: { fontSize: 12, color: "#9CA3AF" },
// });



// app/components/MenuSheet.tsx
// app/components/MenuSheet.tsx
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Item = { label: string; onPress: () => void };

type Props = {
  visible: boolean;
  onClose: () => void;
  items?: Item[];
  side?: "left" | "right";
  width?: number;
};

export default function MenuSheet({
  visible,
  onClose,
  items = [],
  side = "right",
  width = 280,
}: Props) {
  const insets = useSafeAreaInsets();

  const translateX = useRef(
    new Animated.Value(side === "right" ? width : -width)
  ).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : side === "right" ? width : -width,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, side, width, translateX]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent
    >
      <View style={styles.root}>
        {/* Backdrop (BELOW the panel) */}
        <Pressable style={styles.overlay} onPress={onClose} />

        {/* Panel (FORCED ABOVE overlay) */}
        <Animated.View
          style={[
            styles.panel,
            {
              width,
              paddingTop: insets.top + 26,
              transform: [{ translateX }],
            },
            side === "right" ? styles.right : styles.left,
          ]}
        >
          {items.map((item, i) => (
            <Pressable
              key={`${item.label}-${i}`}
              onPress={() => {
                onClose();
                item.onPress();
              }}
              style={[styles.row, i !== items.length - 1 && styles.rowBorder]}
            >
              <Text style={styles.label}>{item.label}</Text>
            </Pressable>
          ))}

          <View style={{ flex: 1 }} />
          <Text style={styles.footer}>Style & Beauty</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
    zIndex: 1,
  },

  panel: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 18,
    paddingBottom: 18,
    zIndex: 2, // ✅ ensures panel is ABOVE overlay
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
      },
      android: { elevation: 10 },
    }),
  },

  right: {
    right: 0,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },

  left: {
    left: 0,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },

  row: { paddingVertical: 16 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.06)" },

  label: { fontSize: 16, fontWeight: "400", color: "#2A2A2A" },
  footer: { fontSize: 12, color: "#9CA3AF" },
});
