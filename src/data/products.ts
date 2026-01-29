import type { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency?: string;
  budget: "$" | "$$" | "$$$";
  category: "skincare" | "haircare" | "clothing" | "bags" | "accessories";
  concerns: string[];
  tag?: string;
  images?: ImageSourcePropType[];  
  affiliateUrl: string;
};



export const products: Product[] = [
  {
    id: "p1",
    slug: "clinique-smart-repair-face-neck-cream",
    name: "Clinique Smart Repair Face & Neck Cream",
    brand: "Clinique",
    description: "Lifted, firmer, youthful-looking skin — a silky cream that visibly smooths lines and restores firmness for face and neck.",
    price: 106.00,
    currency: "CAD",
    budget: "$$",
    category: "skincare",
    concerns: ["hydration", "wrinkles", "firmness"],
    tag: "Firmness + Hydration",
   images: [
  require("../../assets/products/clinique-neck.jpeg"),
  require("../../assets/products/clinique-neck-model.png"),
],
    affiliateUrl: "https://amzn.to/3Lp8pxS"
  }, 
  {
    id: "p2",
    slug: "clinique-all-about-eyes",
    name: "Clinique All About Eyes",
    brand: "Clinique",
    description: "Bright, smooth, refreshed eyes — a lightweight eye cream that hydrates and helps reduce the look of dark circles and puffiness.",
    price: 51.00,
    currency: "CAD",
    budget: "$$",
    category: "skincare",
    concerns: ["dark-circles", "puffiness", "eye-wrinkles", ],
    tag: "Brightening + Smooth",
    images: [
       require("../../assets/products/clinique-eyes.jpeg"),
       require("../../assets/products/clinique-eyes-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/4sBEQtz"
  },
    {
    id: "p3",
    slug: "clinique-smart-repair-face-cream",
    name: "Clinique Smart Repair Face Cream",
    brand: "Clinique",
    description: "Lifted, firmer, youthful-looking skin — a silky cream that visibly smooths lines and restores firmness for face.",
    price: 102.00,
    currency: "CAD",
    budget: "$$",
    category: "skincare",
    concerns: ["hydration", "wrinkles", "firmness"],
    tag: "Firmness + Hydration",
    images: [
      require( "../../assets/products/clinique-face.jpeg"),
      require( "../../assets/products/clinique-face-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/49fJK7Y"
  }, 
  {
    id: "p4",
    slug: "hairtamin-vegan-gummies",
    name: "HAIRtamin Vegan Hair Gummies",
    brand: "HAIRtamin",
    description: "Nourish your hair from the inside out — delicious vegan gummies designed to support thicker, shinier, healthier-looking hair.",
    price: 106.00,
    currency: "CAD",
    budget: "$$",
    category: "haircare",
    concerns: ["frizz", "shine", "breakage", "thinning", "scalp"],
    tag: "Thicker-looking hair",
    images: [
      require( "../../assets/products/hairtamin.jpeg"),
      require( "../../assets/products/hairtamin-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/4pzIj9h"
  }, 
  {
    id: "p5",
    slug: "kerastase-genesis-homme-serum",
    name: "Kérastase Genesis Homme Fortifying Serum",
    brand: "Kérastase",
    description: "A lightweight daily serum designed to help reduce breakage-related hair fall and support stronger-looking hair.",
    price: 95.00,
    currency: "CAD",
    budget: "$$",
    category: "haircare",
    concerns: ["thinning", "breakage", "scalp"],
    tag: "Thicker-looking hair",
    images: [
      require( "../../assets/products/genesis-serum.jpeg"),
      require( "../../assets/products/genesis-serum-model.jpg")
    ],
    affiliateUrl: "https://amzn.to/3YDlczE"
  }, 
  {
    id: "p6",
    slug: "kerastase-elixir-ultime-hair-oil",
    name: "Kérastase Elixir Ultime Hair Oil",
    brand: "Kérastase",
    description: "A versatile hair oil that boosts shine, smooths frizz, and adds a polished finish on all hair types.",
    price: 46.00,
    currency: "CAD",
    budget: "$$",
    category: "haircare",
    concerns: ["shine", "frizz", "smoothness"],
    tag: "Shine + Smooth",
    images: [
      require( "../../assets/products/shineoil.jpeg"),
      require( "../../assets/products/shineoil-model.jpg")
    ],
    affiliateUrl: "https://amzn.to/4qdmptv"
  }, 
  {
    id: "p7",
    slug: "swarovski-attract-stud-earrings",
    name: "Swarovski Attract Stud Earrings",
    brand: "Swarovski",
    description: "Elegant crystal studs — a refined everyday piece and a beautiful gift.",
    price: 63.0,
    currency: "CAD",
    budget: "$$",
    category: "accessories",
    concerns: ["minimal", "everyday", "gift"],
    tag: "Minimal sparkle",
    images: [
      require( "../../assets/products/earring.jpeg"),
      require( "../../assets/products/earring-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/4pNyhBw"
  }, 
  {
    id: "p8",
    slug: "swarovski-crystal-jewelry-set",
    name: "Swarovski Crystal Necklace & Earrings Set",
    brand: "Swarovski",
    description: "A classic set featuring a radiant pendant necklace and matching studs for effortless sophistication.",
    price: 138.25,
    currency: "CAD",
    budget: "$$",
    category: "accessories",
    concerns: ["elegant", "gift", "evening"],
    tag: "Minimal sparkle",
    images: [
      require( "../../assets/products/necklace.jpeg"),
      require( "../../assets/products/necklace-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/49Wg2Fj"
  }, 
  {
    id: "p9",
    slug: "winter-snow-ankle-boots",
    name: "Winter Snow Mini Ankle Boots",
    brand: "Generic",
    description: "Fur-lined slip-on boots designed to keep your feet warm and comfortable on cold winter days.",
    price: 35.99,
    currency: "CAD",
    budget: "$$",
    category: "clothing",
    concerns: ["winter", "warmth", "everyday"],
    tag: "Warm + Cozy",
    images: [
      require( "../../assets/products/cozyboots.jpeg"),
      require( "../../assets/products/cozyboots-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/4k52TNT"
  }, 
  {
    id: "p10",
    slug: "jw-pei-hana-faux-suede-tote",
    name: "JW PEI Hana Faux Suede Tote",
    brand: "JW PEI",
    description: "A chic, structured tote with a soft faux suede finish — perfect for daily essentials.",
    price: 186.00,
    currency: "CAD",
    budget: "$$",
    category: "bags",
    concerns: ["modern", "chic", "everyday"],
    tag: "Firmness + Hydration",
    images: [
      require( "../../assets/products/jwsac.jpeg"),
      require( "../../assets/products/jwsac-model.jpeg")
    ],
    affiliateUrl: "https://amzn.to/3LSuLIb"
  }, 
  {
    id: "p11",
    slug: "calvin-klein-wool-blend-coat",
    name: "Calvin Klein Wool Blend Coat",
    brand: "Calvin Klein",
    description: "A classic tailored coat in a soft wool-blend — designed to elevate everyday looks with easy elegance.",
    price: 212.00,
    currency: "CAD",
    budget: "$$",
    category: "clothing",
    concerns: ["winter", "classic", "workwear"],
    tag: "Firmness + Hydration",
    images: [
      require( "../../assets/products/coatbrown-front.jpeg"),
      require( "../../assets/products/coatbrown-back.jpeg")
    ],
    affiliateUrl: "https://amzn.to/4sKB15l"
  }, 
  {
    id: "p12",
    slug: "calvin-klein-belted-rain-jacket",
    name: "Calvin Klein Belted Rain Jacket",
    brand: "Calvin Klein",
    description: "A sleek belted rain jacket with a removable hood — polished style for unpredictable weather.",
    price: 132.79,
    currency: "CAD",
    budget: "$$",
    category: "clothing",
    concerns: ["rain", "classic", "everyday"],
    tag: "All-weather chic",
    images: [
      require( "../../assets/products/jacket-front.jpeg"),
      require( "../../assets/products/jacket-back.jpeg")
    ],
    affiliateUrl: "https://amzn.to/49XFqui"
  }, 
  {
  id: "p13",
  slug: "swarovski-april-birthstone-pendant",
  name: "Swarovski April Birthstone Pendant Necklace",
  brand: "Swarovski",
  description: "A refined Swarovski pendant featuring a clear square-cut crystal inspired by April’s birthstone, designed to add timeless sparkle and everyday elegance.",
  price: 89.00,
  currency: "CAD",
  budget: "$$",
  category: "accessories",
  concerns: ["jewelry", "gift", "everyday wear"],
  tag: "Timeless sparkle",
  images: [
    require("../../assets/products/swarovski-april.jpeg"),
    require("../../assets/products/swarovski-april-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/3M5lEE7"
},
{
  id: "p14",
  slug: "michael-kors-xs-jet-set-travel-tote",
  name: "Michael Kors XS Carry All Jet Set Travel Tote",
  brand: "Michael Kors",
  description: "A compact Michael Kors tote crafted for everyday elegance, featuring a structured silhouette, zip closure, and lightweight design for effortless style on the go.",
  price: 179.00,
  currency: "CAD",
  budget: "$$",
  category: "bags",
  concerns: ["everyday use", "organization", "travel"],
  tag: "Everyday classic",
  images: [
    require("../../assets/products/mk-jetset.jpeg"),
    require("../../assets/products/mk-jetset-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/49TW0u2"
},
{
  id: "p15",
  slug: "kate-spade-madison-pochette",
  name: "Kate Spade Madison Collection Pochette",
  brand: "Kate Spade New York",
  description: "A sleek Kate Spade pochette crafted in durable Saffiano leather, finished with a gold-tone chain and zip closure — perfect for day-to-night essentials.",
  price: 123.95,
  currency: "CAD",
  budget: "$$",
  category: "bags",
  concerns: ["everyday use", "organization", "evening wear"],
  tag: "Day to night",
  images: [
    require("../../assets/products/katespade-madison.jpeg"),
    require("../../assets/products/katespade-madison-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4bRCfWr"
},
{
  id: "p16",
  slug: "dream-pairs-platform-mini-boots",
  name: "DREAM PAIRS Platform Mini Winter Boots",
  brand: "DREAM PAIRS",
  description: "Cozy platform mini boots crafted in soft suede with plush faux-fur lining, designed to keep you warm, comfortable, and stylish all winter long.",
  price: 54.99,
  currency: "CAD",
  budget: "$",
  category: "clothing",
  concerns: ["warmth", "comfort", "winter wear", "slip resistance"],
  tag: "Winter essential",
  images: [
    require("../../assets/products/dreampairs-mini.jpeg"),
    require("../../assets/products/dreampairs-mini-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/3ZAB5ak"
},
{
  id: "p17",
  slug: "clinique-even-better-makeup-foundation",
  name: "Clinique Even Better Makeup Foundation SPF 15",
  brand: "Clinique",
  description: "A lightweight Clinique foundation with medium coverage and SPF 15, designed to visibly even skin tone and reduce the look of dark spots over time.",
  price: 48.00,
  currency: "CAD",
  budget: "$$",
  category: "skincare",
  concerns: ["uneven tone", "dark spots", "hydration", "sun protection"],
  tag: "Even skin tone",
  images: [
    require("../../assets/products/clinique-evenbetter.jpeg"),
    require("../../assets/products/clinique-evenbetter-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4k3WbaU"
},
{
  id: "p18",
  slug: "prettygarden-wide-leg-dress-pants",
  name: "PRETTYGARDEN Womens Wide Leg Dress Pants",
  brand: "PRETTYGARDEN",
  description: "Flowy high-waisted wide-leg pants designed for effortless comfort and a polished business-casual look, perfect for work or everyday wear.",
  price: 77.17,
  currency: "CAD",
  budget: "$",
  category: "clothing",
  concerns: ["comfort", "workwear", "everyday wear", "fit"],
  tag: "Business casual",
  images: [
    require("../../assets/products/prettygarden-pants.jpeg"),
    require("../../assets/products/prettygarden-pants-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/45vPJDo"
},
{
  id: "p19",
  slug: "clinique-even-better-makeup-spf15",
  name: "Clinique Even Better Makeup SPF 15",
  brand: "Clinique",
  description: "Medium-coverage foundation that evens skin tone, helps reduce dark spots, and protects with SPF 15 for a naturally radiant finish.",
  price: 52.00,
  currency: "CAD",
  budget: "$$",
  category: "skincare",
  concerns: ["dark-spots", "uneven-tone", "coverage"],
  tag: "Even tone + SPF",
  images: [
    require("../../assets/products/clinique-even-better.jpeg"),
    require("../../assets/products/clinique-even-better-model.jpeg"),
  ],
  affiliateUrl: "https://amzn.to/YOUR_LINK"
},
{
  id: "p20",
  slug: "michael-kors-elyse-high-pump",
  name: "Michael Kors Elyse High Pump",
  brand: "Michael Kors",
  description: "Elegant suede high-heel pumps designed with a sleek pointed toe and slim stiletto heel, perfect for elevating both work and evening looks.",
  price: 129.33,
  currency: "CAD",
  budget: "$$",
  category: "clothing",
  concerns: ["elegance", "formal wear", "evening style"],
  tag: "Modern glamour",
  images: [
    require("../../assets/products/mk-elyse-pump.jpeg"),
    require("../../assets/products/mk-elyse-pump-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4pVouJy"
},
{
  id: "p21",
  slug: "osprey-arcane-large-day-backpack",
  name: "Osprey Arcane Large Day Backpack",
  brand: "Osprey",
  description: "A sleek, minimalist everyday backpack designed for comfort and organization, featuring a padded laptop sleeve and durable materials for daily use.",
  price: 147.59,
  currency: "CAD",
  budget: "$$",
  category: "bags",
  concerns: ["work essentials", "travel", "organization", "comfort"],
  tag: "Everyday carry",
  images: [
    require("../../assets/products/osprey-arcane.jpeg"),
    require("../../assets/products/osprey-arcane-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4rb97xI"
},
{
  id: "p22",
  slug: "heymoments-wide-leg-tie-waist-pants",
  name: "Heymoments Wide Leg Tie-Waist Pants",
  brand: "Heymoments",
  description:
    "Lightweight, high-waisted wide leg pants with an adjustable tie waist and side pockets. Soft, breathable fabric for all-day comfort with an effortlessly chic look.",
  price: 29.99,
  currency: "CAD",
  budget: "$",
  category: "clothing",
  concerns: ["comfort", "breathable", "everyday wear"],
  tag: "Comfy + Chic",
  images: [
    require("../../assets/products/heymoments-pants.jpeg"),
    require("../../assets/products/heymoments-pants-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/45ofG7W"
},
{
  id: "p23",
  slug: "swarovski-attract-trilogy-drop-earrings",
  name: "Attract Trilogy Crystal Drop Earrings",
  brand: "Swarovski",
  description: "Elegant drop earrings featuring three sparkling clear crystals in a rhodium-plated setting — timeless, refined, and perfect for both everyday wear and special occasions.",
  price: 119.00,
  currency: "CAD",
  budget: "$$",
  category: "accessories",
  concerns: ["elegant", "gift-idea", "formal", "everyday"],
  tag: "Timeless Sparkle",
  images: [
    require("../../assets/products/swarovski-earrings.jpeg"),
    require("../../assets/products/swarovski-earrings-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/49YIvcp"
},
{
  id: "p24",
  slug: "skechers-uno-stand-on-air-womens",
  name: "Skechers Uno – Stand On Air Sneakers",
  brand: "Skechers",
  description: "A stylish everyday sneaker featuring Air-Cooled Memory Foam cushioning and a visible air midsole for lightweight comfort and modern street style.",
  price: 82.47,
  currency: "CAD",
  budget: "$$",
  category: "clothing",
  concerns: ["walking", "comfort", "everyday wear"],
  tag: "All-day comfort",
  images: [
    require("../../assets/products/skechers-uno.jpg"),
    require("../../assets/products/skechers-uno-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4abzyh4"
},
{
  id: "p25",
  slug: "aisicoo-pointed-toe-stiletto-pumps",
  name: "Pointed Toe Stiletto High Heel Pumps",
  brand: "Aisicoo",
  description: "Elegant slip-on stiletto pumps featuring a pointed toe and chic patchwork design, ideal for parties, events, and polished outfits.",
  price: 79.37,
  currency: "CAD",
  budget: "$",
  category: "clothing",
  concerns: ["party", "formal", "evening"],
  tag: "Elegant heels",
  images: [
    require("../../assets/products/aisicoo-heels.jpeg"),
    require("../../assets/products/aisicoo-heels-model.png")
  ],
  affiliateUrl: "https://amzn.to/4pYqqkH"
},
{
  id: "p26",
  slug: "clinique-touch-base-for-eyes-canvas-light",
  name: "Clinique Touch Base for Eyes (Canvas Light)",
  brand: "Clinique",
  description:
    "Long-lasting cream eyeshadow + primer that helps resist creasing, fading, and smudging—safe for sensitive eyes.",
  price: 28.05,
  currency: "CAD",
  budget: "$",
  category: "skincare",
  concerns: ["sensitive-eyes", "primer", "crease-resistance", "long-wear"],
  tag: "Eyeshadow + Primer",
  images: [
    require("../../assets/products/clinique-touchbase.jpeg"),
    require("../../assets/products/clinique-touchbase-model.jpeg"),
  ],
  affiliateUrl: "https://amzn.to/49TCzBg"
},
{
  id: "p27",
  slug: "clinique-even-better-light-reflecting-primer",
  name: "Clinique Even Better Light Reflecting Face Primer",
  brand: "Clinique",
  description:
    "Lightweight face primer with Vitamin C and Hyaluronic Acid that hydrates, smooths, and boosts radiance for a glowing complexion.",
  price: 25.20,
  currency: "CAD",
  budget: "$",
  category: "skincare",
  concerns: ["radiance", "hydration", "primer", "dull-skin"],
  tag: "Glow + Hydration",
  images: [
    
    require("../../assets/products/clinique-even-better.jpeg"),
    require("../../assets/products/clinique-even-better-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/49GSfco"
},
{
  id: "p28",
  slug: "dream-pairs-platform-mini-winter-boots",
  name: "DREAM PAIRS Platform Mini Winter Boots",
  brand: "DREAM PAIRS",
  description:
    "Cozy platform mini snow boots crafted in soft suede with plush faux-fur lining and a cushioned memory foam insole for warmth, comfort, and everyday winter wear.",
  price: 54.99,
  currency: "CAD",
  budget: "$",
  category: "clothing",
  concerns: ["warmth", "winter", "comfort", "outdoor"],
  tag: "Winter essential",
  images: [
    require("../../assets/products/dreampairs-mini.jpeg"),
    require("../../assets/products/dreampairs-mini-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/3ZAB5ak"
},
{
  id: "p29",
  slug: "bellroy-tokyo-wonder-tote-15l",
  name: "Bellroy Tokyo Wonder Tote (15L)",
  brand: "Bellroy",
  description:
    "A sleek everyday tote with smart internal organization, a padded 16-inch laptop sleeve, and a wide zip opening, crafted from durable water-resistant materials.",
  price: 179.00,
  currency: "CAD",
  budget: "$$",
  category: "bags",
  concerns: ["work essentials", "laptop carry", "travel", "organization"],
  tag: "Modern work tote",
  images: [
    require("../../assets/products/bellroy-tokyo-laptop.jpeg"),
    require("../../assets/products/bellroy-tokyo-tote-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/3LLXCho"
},
{
  id: "p30",
  slug: "bellroy-toiletry-kit-plus",
  name: "Bellroy Toiletry Kit Plus",
  brand: "Bellroy",
  description:
    "A spacious toiletry pouch with smart internal organization, a magnetic toothbrush shelf, and water-resistant materials—perfect for longer trips and larger essentials.",
  price: 89.00,
  currency: "CAD",
  budget: "$$",
  category: "bags",
  concerns: ["travel", "organization", "toiletries", "water-resistant"],
  tag: "Travel essential",
  images: [
    require("../../assets/products/bellroy-toiletry-plus.jpeg"),
    require("../../assets/products/bellroy-toiletry-plus-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4acQCTZ"
},
{
  id: "p31",
  slug: "keen-waterproof-winter-boots",
  brand: "KEEN",
  name: "KEEN Waterproof Winter Boots",
  category: "clothing",
  concerns: ["winter", "outdoor", "warmth"],
  price: 219.99,
  currency: "CAD",
  budget: "$$",
   tag: "Winter essential",
  description: "A reliable waterproof winter boot built for warmth and traction on snowy days.",
  affiliateUrl: "https://amzn.to/4qWKAMG",
  images: [
    require("../../assets/products/keen-brown.jpeg"),
    require("../../assets/products/keen-black.jpeg")
    ],
},
{
  id: "p32",
  slug: "showkoo-expandable-luggage-set",
  brand: "SHOWKOO",
  name: "SHOWKOO Expandable Luggage Set",
  category: "accessories",
  concerns: ["travel", "organization", "durable"],
  price: 219.99,
  currency: "CAD",
  budget: "$$",
  tag: "Travel essential",
  description: "A durable, expandable luggage set designed for smooth rolling and easy organization with a clean modern look.",
  affiliateUrl: "https://amzn.to/4qq5KD4",
  images: [
    require("../../assets/products/luggages.jpeg"),
    require("../../assets/products/luggages-model.jpeg")
    ],
},
{
  id: "p33",
  slug: "womens-chelsea-ankle-boots-winter-fur-lined",
  name: "Women's Chelsea Ankle Boots",
  brand: "Generic",
  description:
    "Waterproof winter Chelsea ankle boots with a smooth PU leather upper and warm faux fur lining. Designed for easy slip-on wear with elastic side panels and pull loops. Non-slip rubber sole provides stability and comfort for all-day wear in cold and wet conditions.",
  price: 62.99,
  currency: "CAD",
  budget: "$$",
  category: "clothing",
  concerns: ["cold-weather", "slip-resistance", "comfort"],
  tag: "Winter Chelsea Boots",
  images: [
    require("../../assets/products/chelsea-boots-front.jpeg"),
    require("../../assets/products/chelsea-boots-model.jpeg")
  ],
  affiliateUrl: "https://amzn.to/4q8mbmU"
}
];
