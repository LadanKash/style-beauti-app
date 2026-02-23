// app/reminders.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, Platform, Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  DEFAULT_REMINDERS,
  applyReminders,
  loadReminderSettings,
  type ReminderSettings,
} from "@/src/lib/notifications";

const BG = "#F7F7F4";
const CARD = "#FFFFFF";
const TEXT = "#1F1F1F";
const SUB = "rgba(31,31,31,0.68)";
const PINK = "#E6A4B4";

function toDate(hour: number, minute: number) {
  const d = new Date();
  d.setHours(hour);
  d.setMinutes(minute);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

function fmt(hour: number, minute: number) {
  const h = String(hour).padStart(2, "0");
  const m = String(minute).padStart(2, "0");
  return `${h}:${m}`;
}

function normalizeParam(v: string | string[] | undefined) {
  if (!v) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

export default function RemindersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string | string[] }>();
  const paramCategory = normalizeParam(params.category);

  const [s, setS] = React.useState<ReminderSettings>({
    ...DEFAULT_REMINDERS,
    category: paramCategory ?? null,
  });

  const [showMorningPicker, setShowMorningPicker] = React.useState(false);
  const [showNightPicker, setShowNightPicker] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const saved = await loadReminderSettings();
      const category = paramCategory ?? saved.category ?? null;
      setS({ ...saved, category });
    })();
  }, [paramCategory]);

  const save = async () => {
    const res = await applyReminders(s);
    if (!res.ok) {
      Alert.alert(
        "Notifications disabled",
        "Please allow notifications in Settings to enable reminders."
      );
      return;
    }
    Alert.alert("Saved", "Your reminders are set.");
    router.back();
  };

  const categoryLabel = s.category
    ? s.category.charAt(0).toUpperCase() + s.category.slice(1)
    : "All categories";

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: BG }}
    >
      <View style={{ flex: 1, paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: TEXT }}>
          Reminders
        </Text>

        <Text style={{ marginTop: 6, color: SUB }}>
          Notifications adapt to your category:{" "}
          <Text style={{ fontWeight: "700" }}>{categoryLabel}</Text>
        </Text>

        {/* Morning */}
        <View
          style={{
            marginTop: 14,
            backgroundColor: CARD,
            borderRadius: 18,
            padding: 14,
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
            <Text style={{ fontWeight: "600", color: TEXT }}>
              Morning reminder
            </Text>
            <Switch
              value={s.morningEnabled}
              onValueChange={(v) => setS((p) => ({ ...p, morningEnabled: v }))}
            />
          </View>

          <Pressable
            onPress={() => s.morningEnabled && setShowMorningPicker(true)}
            style={{
              marginTop: 10,
              paddingVertical: 12,
              borderRadius: 12,
              backgroundColor: "rgba(230,164,180,0.15)",
              alignItems: "center",
              opacity: s.morningEnabled ? 1 : 0.5,
            }}
          >
            <Text style={{ fontWeight: "600", color: TEXT }}>
              Time: {fmt(s.morningHour, s.morningMinute)}
            </Text>
          </Pressable>

          {showMorningPicker && (
            <DateTimePicker
              value={toDate(s.morningHour, s.morningMinute)}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_event, date) => {
                setShowMorningPicker(false);
                if (!date) return;

                setS((p) => ({
                  ...p,
                  morningHour: date.getHours(),
                  morningMinute: date.getMinutes(),
                }));
              }}
            />
          )}
        </View>

        {/* Night */}
        <View
          style={{
            marginTop: 12,
            backgroundColor: CARD,
            borderRadius: 18,
            padding: 14,
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
            <Text style={{ fontWeight: "600", color: TEXT }}>
              Night reminder
            </Text>
            <Switch
              value={s.nightEnabled}
              onValueChange={(v) => setS((p) => ({ ...p, nightEnabled: v }))}
            />
          </View>

          <Pressable
            onPress={() => s.nightEnabled && setShowNightPicker(true)}
            style={{
              marginTop: 10,
              paddingVertical: 12,
              borderRadius: 12,
              backgroundColor: "rgba(230,164,180,0.15)",
              alignItems: "center",
              opacity: s.nightEnabled ? 1 : 0.5,
            }}
          >
            <Text style={{ fontWeight: "700", color: TEXT }}>
              Time: {fmt(s.nightHour, s.nightMinute)}
            </Text>
          </Pressable>

          {showNightPicker && (
            <DateTimePicker
              value={toDate(s.nightHour, s.nightMinute)}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(_event, date) => {
                setShowNightPicker(false);
                if (!date) return;

                setS((p) => ({
                  ...p,
                  nightHour: date.getHours(),
                  nightMinute: date.getMinutes(),
                }));
              }}
            />
          )}
        </View>

        {/* Save */}
        <Pressable
          onPress={save}
          style={{
            marginTop: 14,
            backgroundColor: PINK,
            paddingVertical: 14,
            borderRadius: 999,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
            Save reminders
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 10, alignItems: "center" }}
        >
          <Text style={{ color: SUB, fontWeight: "600" }}>Cancel</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}