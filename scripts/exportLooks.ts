// scripts/exportLooks.ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { LOOKS, type Look } from "../src/data/looks";

// If your imageUrl is already full https://... this keeps it.
// If later you use "/images/..." it will convert to full URL.
const SITE_URL = "https://www.stylebeauti.com";

const buildUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const output = LOOKS.map((l: Look) => ({
  id: l.id,
  title: l.title,
  subtitle: l.subtitle ?? "",
  imageUrl: buildUrl(l.imageUrl),
  items: (l.items ?? []).map((it) => ({
    productId: it.productId,
    label: it.label ?? "",
  })),
}));

mkdirSync(join(process.cwd(), "public"), { recursive: true });

const filePath = join(process.cwd(), "public", "looks.json");
writeFileSync(filePath, JSON.stringify(output, null, 2), "utf8");

console.log("✅ Wrote", output.length, "looks to", filePath);
