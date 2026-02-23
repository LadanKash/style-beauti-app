//src/data/ts looks.api.ts
export type LookItem = { productId: string; label?: string };

export type Look = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  items: LookItem[];
};

export async function fetchLooks(): Promise<Look[]> {
  const url = `https://www.stylebeauti.com/looks.json?v=${Date.now()}`;
  const res = await fetch(url);
  const text = await res.text();

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);

  const data = JSON.parse(text);
  const list = Array.isArray(data) ? data : Array.isArray(data?.looks) ? data.looks : [];

  return list.filter((l: any) => l?.id && l?.title && l?.imageUrl);
}
