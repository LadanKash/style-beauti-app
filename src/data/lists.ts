//src/data/lists.ts
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
    title: "Winter Collection",
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
    coverImage: require("../../assets/posts/post-summer.png"),
  },

      {
    id: "l4",
    title: "Autumn Collection",
    coverImage: require("../../assets/posts/post-autumn.png"),
  },

    {
    id: "l5",
    title: "Skincare collection",
    coverImage: require("../../assets/posts/post-skincare.png"),
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
    // use post-winter.jpeg 
    image: require("../../assets/posts/post-winter.jpeg"),
    products: [
    
          {
        id: "pp2",
        title: "Calvin Klein Wool Blend Coat",
        coverImage: require("../../assets/products/coatbrown-front.jpeg"),
        rating: 4.6,
        price: "$106.00 CAD",
        affiliateUrl: "https://amzn.to/4sKB15l",
      },
      {
        id: "pp3",
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
    caption: "Spring",
    image: require("../../assets/posts/post-spring.png"),
    products: [
      {
        id: "pp10",
        title: "Michael Kors XS Carry All Jet Set Travel Tote",
        coverImage: require("../../assets/products/mk-jetset-model.jpeg"),
        rating: 4.7,
        price: "$132.79 CAD",
        affiliateUrl: "https://amzn.to/49TW0u2",
      },
    ],
  },

    {
    id: "p4",
    listId: "l4",
    caption: "Autumn ",
    image: require("../../assets/posts/post-autumn.png"),
    products: [
      {
        id: "pp30",
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
    caption: "Summer glow",
    image: require("../../assets/posts/post-summer.png"),
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

     {
    id: "p5",
    listId: "l5",
    caption: "Skincare",
    image: require("../../assets/posts/post-skincare.png"),
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
        id: "pp10",
        title: "Clinique Even Better Makeup SPF 15",
        coverImage: require("../../assets/products/clinique-even-better-model.jpeg"),
        rating: 4.7,
        price: "$52.00 CAD",
        affiliateUrl: "https://amzn.to/YOUR_LINK",
      },
    ],
  },
];



