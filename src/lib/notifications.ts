// src/lib/notifications.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const KEY = "sb:reminders:v1";
const IDS_KEY = "sb:reminder-ids:v1";

export type ReminderMode = "routine" | "outfit" | "saved";

export type ReminderSettings = {
  mode: ReminderMode;
  category?: string | null;
  morningEnabled: boolean;
  morningHour: number;
  morningMinute: number;
  nightEnabled: boolean;
  nightHour: number;
  nightMinute: number;
};

export const DEFAULT_REMINDERS: ReminderSettings = {
  mode: "routine",
  category: null,
  morningEnabled: true,
  morningHour: 8,
  morningMinute: 0,
  nightEnabled: true,
  nightHour: 21,
  nightMinute: 30,
};

export async function ensureNotificationPermission() {
  const perm = await Notifications.getPermissionsAsync();
  if (perm.status === "granted") return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.status === "granted";
}

export async function loadReminderSettings(): Promise<ReminderSettings> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as ReminderSettings) : DEFAULT_REMINDERS;
}

export async function saveReminderSettings(s: ReminderSettings) {
  await AsyncStorage.setItem(KEY, JSON.stringify(s));
}

// Only ONE messageFor
function messageFor(settings: ReminderSettings, when: "morning" | "night") {
  const cat = (settings.category || "").toLowerCase();

  if (cat === "skincare" || cat === "haircare") {
    return when === "morning"
      ? {
          title: "Morning routine ✨",
          body: "Quick check-in: complete your steps & track progress.",
        }
      : {
          title: "Night routine 🌙",
          body: "Don’t forget your routine before bed.",
        };
  }

  if (
    cat === "clothing" ||
    cat === "shoes" ||
    cat === "bags" ||
    cat === "accessories"
  ) {
    return when === "morning"
      ? {
          title: "Today’s outfit 👗",
          body: "Pick a look from your saved items & collections.",
        }
      : {
          title: "Closet refresh 👜",
          body: "Review saved picks and add notes for later.",
        };
  }

  return when === "morning"
    ? {
        title: "Saved picks ⭐",
        body: "Open Style & Beauty to see your saved items.",
      }
    : {
        title: "Quick check-in ⭐",
        body: "Review your saved picks and notes.",
      };
}

async function cancelPreviousReminderIds() {
  const raw = await AsyncStorage.getItem(IDS_KEY);
  const ids: string[] = raw ? JSON.parse(raw) : [];
  await Promise.all(
    ids.map((id) => Notifications.cancelScheduledNotificationAsync(id))
  );
  await AsyncStorage.removeItem(IDS_KEY);
}

export async function applyReminders(settings: ReminderSettings) {
  const ok = await ensureNotificationPermission();
  if (!ok) return { ok: false as const, reason: "permission-denied" as const };

  await cancelPreviousReminderIds();

  const ids: string[] = [];

  if (settings.morningEnabled) {
    const m = messageFor(settings, "morning");

    const trigger: Notifications.DailyTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: settings.morningHour,
      minute: settings.morningMinute,
    };

    const id = await Notifications.scheduleNotificationAsync({
      content: { title: m.title, body: m.body },
      trigger,
    });

    ids.push(id);
  }

  if (settings.nightEnabled) {
    const n = messageFor(settings, "night");

    const trigger: Notifications.DailyTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: settings.nightHour,
      minute: settings.nightMinute,
    };

    const id = await Notifications.scheduleNotificationAsync({
      content: { title: n.title, body: n.body },
      trigger,
    });

    ids.push(id);
  }

  await AsyncStorage.setItem(IDS_KEY, JSON.stringify(ids));
  await saveReminderSettings(settings);

  return { ok: true as const };
}

