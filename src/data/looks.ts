// src/data/looks.ts

export type LookItem = {
  productId: string; // must match Product.id
  label?: string;    // role in the look (e.g., "Coat", "Boots", "Bag")
};

export type Look = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string; // hero image for the look
  items: LookItem[];
};



export const LOOKS: Look[] = [
  {
    id: "winter-glow",
    title: "Clinique Glow Routine",
    subtitle: "Hydration + soft makeup",
    imageUrl: "https://stylebeauti.com/onboarding/clinique-neck.jpeg",
    items: [
      { productId: "p1", label: "Firming Treatment" },
      { productId: "p2", label: "Hydration Cream" },
      { productId: "p3", label: "Eye Brightening" },
    ],
  },

  {
    id: "winter-fashion-1",
    title: "Winter Outfit",
    subtitle: "Cozy layers + accessories",
    imageUrl: "https://stylebeauti.com/onboarding/cozyboots-model.jpeg",
    items: [
      { productId: "p12", label: "Coat" },
      { productId: "p22", label: "Boots" },
      { productId: "p30", label: "Bag" },
    ],
  },

  {
    id: "winter-fashion-2",
    title: "Winter Outfit",
    subtitle: "Cozy layers + accessories",
    imageUrl: "https://stylebeauti.com/onboarding/cozyboots-model.jpeg",
    items: [
      { productId: "p10", label: "Coat" },
      { productId: "p20", label: "Boots" },
      { productId: "p34", label: "Bag" },
    ],
  },

  {
    id: "winter-fashion-3",
    title: "Winter Outfit",
    subtitle: "Cozy layers + accessories",
    imageUrl: "https://stylebeauti.com/onboarding/cozyboots-model.jpeg",
    items: [
      { productId: "p26", label: "Coat" },
      { productId: "p34", label: "Boots" },
      { productId: "p54", label: "Bag" },
    ],
  },
];


