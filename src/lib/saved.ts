import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "stylebeauty:saved:v1";

export type SavedProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  concerns: string[];
  price: number;
  currency: string;
  budget: string;
  description: string;
  affiliateUrl: string;
  tag: string;
  imageUrl: string;
  images: string[];
};

async function read(): Promise<SavedProduct[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function write(items: SavedProduct[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(items));
}

export async function getSaved(): Promise<SavedProduct[]> {
  return read();
}

export async function isSaved(id: string): Promise<boolean> {
  const items = await read();
  return items.some((x) => x.id === id);
}

export async function toggleSaved(item: SavedProduct): Promise<boolean> {
  const items = await read();
  const exists = items.some((x) => x.id === item.id);
  const next = exists ? items.filter((x) => x.id !== item.id) : [item, ...items];
  await write(next);
  return !exists;
}

export async function removeSaved(id: string): Promise<SavedProduct[]> {
  const items = await read();
  const next = items.filter((x) => x.id !== id);
  await write(next);
  return next;
}
