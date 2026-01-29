//2
import type { ImageSourcePropType } from "react-native";

export type List = {
  id: string;
  title: string;
  coverImage: ImageSourcePropType;
};

export type PostProduct = {
  id: string;
  title: string;
  coverImage: ImageSourcePropType;
  rating: number;
  price: string;
  affiliateUrl: string;
};

export type Post = {
  id: string;
  listId: string;
  caption: string;
  image: ImageSourcePropType;
  products: PostProduct[];
};

/* ----------------------------------------
   Lists (Idea Lists)
----------------------------------------- */
export const lists: List[] = [
  {
    id: "l1",
    title: "Winter Skincare",
    coverImage: require("../../assets/posts/post-winter.jpeg"),
  },
  {
    id: "l2",
    title: "Spring Refresh",
    coverImage: require("../../assets/posts/post-spring.png"),
  },
  {
    id: "l3",
    title: "Summer Glow",
    coverImage: require("../../assets/posts/post-summer.jpeg"),
  },
];

/* ----------------------------------------
   Posts (each post belongs to a listId)
----------------------------------------- */
export const posts: Post[] = [
  {
    id: "p1",
    listId: "l1",
    caption: "Glowy winter routine",
    // ✅ FIXED: use post-winter.jpeg (NOT list-winter.jpeg)
    image: require("../../assets/posts/post-winter.jpeg"),
    products: [
      {
        id: "pp1",
        title: "Clinique Smart Repair Face & Neck Cream",
        coverImage: require("../../assets/products/clinique-neck.jpeg"),
        rating: 4.6,
        price: "$106.00 CAD",
        affiliateUrl: "https://amzn.to/3Lp8pxS",
      },
      {
        id: "pp2",
        title: "Winter Snow Mini Ankle Boots",
        coverImage: require("../../assets/products/cozyboots.jpeg"),
        rating: 4.5,
        price: "$35.99 CAD",
        affiliateUrl: "https://amzn.to/4k52TNT",
      },
    ],
  },

  {
    id: "p2",
    listId: "l2",
    caption: "Fresh spring",
    image: require("../../assets/posts/post-spring.png"),
    products: [
      {
        id: "pp10",
        title: "Calvin Klein Belted Rain Jacket",
        coverImage: require("../../assets/products/jacket-front.jpeg"),
        rating: 4.7,
        price: "$132.79 CAD",
        affiliateUrl: "https://amzn.to/49XFqui",
      },
    ],
  },

  {
    id: "p3",
    listId: "l3",
    caption: "Summer glow essentials",
    image: require("../../assets/posts/post-summer.jpeg"),
    products: [
      {
        id: "pp20",
        title: "Michael Kors Elyse High Pump",
        coverImage: require("../../assets/products/mk-elyse-pump.jpeg"),
        rating: 4.8,
        price: "$129.33 CAD",
        affiliateUrl: "https://amzn.to/4pVouJy",
      },
    ],
  },
];



//products that i have to add
//   {
//     id: "p11",
//     slug: "calvin-klein-wool-blend-coat",
//     name: "Calvin Klein Wool Blend Coat",
//     brand: "Calvin Klein",
//     description: "A classic tailored coat in a soft wool-blend — designed to elevate everyday looks with easy elegance.",
//     price: 212.00,
//     currency: "CAD",
//     budget: "$$",
//     category: "clothing",
//     concerns: ["winter", "classic", "workwear"],
//     tag: "Firmness + Hydration",
//     images: [
//       require( "../../assets/products/coatbrown-front.jpeg"),
//       require( "../../assets/products/coatbrown-back.jpeg")
//     ],
//     affiliateUrl: "https://amzn.to/4sKB15l"
//   }, 
//   {
//     id: "p12",
//     slug: "calvin-klein-belted-rain-jacket",
//     name: "Calvin Klein Belted Rain Jacket",
//     brand: "Calvin Klein",
//     description: "A sleek belted rain jacket with a removable hood — polished style for unpredictable weather.",
//     price: 186.00,
//     currency: "CAD",
//     budget: "$$",
//     category: "clothing",
//     concerns: ["rain", "classic", "everyday"],
//     tag: "All-weather chic",
//     images: [
//       require( "../../assets/products/jacket-front.jpeg"),
//       require( "../../assets/products/jacket-back.jpeg")
//     ],
//     affiliateUrl: "https://amzn.to/49XFqui"
//   }, 
//   {
//   id: "p13",
//   slug: "swarovski-april-birthstone-pendant",
//   name: "Swarovski April Birthstone Pendant Necklace",
//   brand: "Swarovski",
//   description: "A refined Swarovski pendant featuring a clear square-cut crystal inspired by April’s birthstone, designed to add timeless sparkle and everyday elegance.",
//   price: 89.00,
//   currency: "CAD",
//   budget: "$$",
//   category: "accessories",
//   concerns: ["jewelry", "gift", "everyday wear"],
//   tag: "Timeless sparkle",
//   images: [
//     require("../../assets/products/swarovski-april.jpeg"),
//     require("../../assets/products/swarovski-april-model.jpeg")
//   ],
//   affiliateUrl: "https://amzn.to/3M5lEE7"
// },
// {
//   id: "p14",
//   slug: "michael-kors-xs-jet-set-travel-tote",
//   name: "Michael Kors XS Carry All Jet Set Travel Tote",
//   brand: "Michael Kors",
//   description: "A compact Michael Kors tote crafted for everyday elegance, featuring a structured silhouette, zip closure, and lightweight design for effortless style on the go.",
//   price: 179.00,
//   currency: "CAD",
//   budget: "$$",
//   category: "bags",
//   concerns: ["everyday use", "organization", "travel"],
//   tag: "Everyday classic",
//   images: [
//     require("../../assets/products/mk-jetset.jpeg"),
//     require("../../assets/products/mk-jetset-model.jpeg")
//   ],
//   affiliateUrl: "https://amzn.to/49TW0u2"
// },
// {
//   id: "p19",
//   slug: "clinique-even-better-makeup-spf15",
//   name: "Clinique Even Better Makeup SPF 15",
//   brand: "Clinique",
//   description: "Medium-coverage foundation that evens skin tone, helps reduce dark spots, and protects with SPF 15 for a naturally radiant finish.",
//   price: 52.00,
//   currency: "CAD",
//   budget: "$$",
//   category: "skincare",
//   concerns: ["dark-spots", "uneven-tone", "coverage"],
//   tag: "Even tone + SPF",
//   images: [
//     require("../../assets/products/clinique-even-better.jpeg"),
//     require("../../assets/products/clinique-even-better-model.jpeg"),
//   ],
//   affiliateUrl: "https://amzn.to/YOUR_LINK"
// },
// {
//   id: "p28",
//   slug: "dream-pairs-platform-mini-winter-boots",
//   name: "DREAM PAIRS Platform Mini Winter Boots",
//   brand: "DREAM PAIRS",
//   description:
//     "Cozy platform mini snow boots crafted in soft suede with plush faux-fur lining and a cushioned memory foam insole for warmth, comfort, and everyday winter wear.",
//   price: 54.99,
//   currency: "CAD",
//   budget: "$",
//   category: "clothing",
//   concerns: ["warmth", "winter", "comfort", "outdoor"],
//   tag: "Winter essential",
//   images: [
//     require("../../assets/products/dreampairs-mini.jpeg"),
//     require("../../assets/products/dreampairs-mini-model.jpeg")
//   ],
//   affiliateUrl: "https://amzn.to/3ZAB5ak"
// },
// {
//   id: "p29",
//   slug: "bellroy-tokyo-wonder-tote-15l",
//   name: "Bellroy Tokyo Wonder Tote (15L)",
//   brand: "Bellroy",
//   description:
//     "A sleek everyday tote with smart internal organization, a padded 16-inch laptop sleeve, and a wide zip opening, crafted from durable water-resistant materials.",
//   price: 179.00,
//   currency: "CAD",
//   budget: "$$",
//   category: "bags",
//   concerns: ["work essentials", "laptop carry", "travel", "organization"],
//   tag: "Modern work tote",
//   images: [
//     require("../../assets/products/bellroy-tokyo-laptop.jpeg"),
//     require("../../assets/products/bellroy-tokyo-tote-model.jpeg")
//   ],
//   affiliateUrl: "https://amzn.to/3LLXCho"
// },
// ];
