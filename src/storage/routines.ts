// src/storage/routines.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RoutineAnswers = {
  category: string;
  concern: string;
  budget: string;
};

export type SavedRoutine = {
  id: string;
  name: string;
  createdAt: number;
  answers: RoutineAnswers;
  productIds: string[];
};

const KEY = "@stylebeauty:routines:v1";

export async function getRoutines(): Promise<SavedRoutine[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export async function saveRoutine(routine: SavedRoutine) {
  const list = await getRoutines();
  const next = [routine, ...list.filter((r) => r.id !== routine.id)];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function deleteRoutine(id: string) {
  const list = await getRoutines();
  const next = list.filter((r) => r.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function getRoutineById(id: string) {
  const list = await getRoutines();
  return list.find((r) => r.id === id) ?? null;
}