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
        id: "pp11",
        title: "Calvin Klein Wool Blend Coat",
        coverImage: require("../../assets/products/coatbrown-front.jpeg"),
        rating: 4.6,
        price: "$212.00 CAD",
        affiliateUrl: "https://amzn.to/4sKB15l",
      },

           {
        id: "pp35",
        title: "chelsea boots",
        coverImage: require("../../assets/products/chelsea-boots-front.jpeg"),
        rating: 4.6,
        price: "$106.00 CAD",
        affiliateUrl: "https://amzn.to/4sKB15l",
      },
      {
        id: "pp33",
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

       {
        id: "pp26",
        title: "heymoments pants",
        coverImage: require("../../assets/products/heymoments-pants-model.jpeg"),
        rating: 4.7,
        price: "$29.99 CAD",
        affiliateUrl: "https://amzn.to/45ofG7W",
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
        price: "$0.0 CAD",
        affiliateUrl: "https://amzn.to/49XFqui",
      },
         {
        id: "pp66",
        title: "Pointed knee high boots",
        coverImage: require("../../assets/products/pointed-knee-high-boots-product.jpg"),
        rating: 4.7,
        price: "$79.79 CAD",
        affiliateUrl: "https://amzn.to/4qCfwRW",
      },
    ],
  },

  {
    id: "p3",
    listId: "l3",
    caption: "Summer glow",
    image: require("../../assets/posts/post-summer.png"),
    products: [
  
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



// //src/data/lists.ts
// import type { ImageSourcePropType } from "react-native";

// export type List = {
//   id: string;
//   title: string;
//   coverImage: ImageSourcePropType;
// };

// export type PostProduct = {
//   id: string;
//   title: string;
//   coverImage: ImageSourcePropType;
//   rating: number;
//   price: string;
//   affiliateUrl: string;
// };

// export type Post = {
//   id: string;
//   listId: string;
//   caption: string;
//   image: ImageSourcePropType;
//   products: PostProduct[];
// };

// /* ----------------------------------------
//    Lists (Idea Lists)
// ----------------------------------------- */
// export const lists: List[] = [

//   {
//     id: "l1",
//     title: "Winter Collection",
//     coverImage: require("../../assets/posts/post-winter.jpeg"),
//   },
//   {
//     id: "l2",
//     title: "Spring Refresh",
//     coverImage: require("../../assets/posts/post-spring.png"),
//   },
//   {
//     id: "l3",
//     title: "Summer Glow",
//     coverImage: require("../../assets/posts/post-summer.png"),
//   },

//     {
//     id: "l4",
//     title: "Autumn Collection",
//     coverImage: require("../../assets/posts/post-autumn.png"),
//   },

//     {
//     id: "l5",
//     title: "Skincare collection",
//     coverImage: require("../../assets/posts/post-skincare.png"),
//   },
// ];

// /* ----------------------------------------
//    Posts (each post belongs to a listId)
// ----------------------------------------- */
// export const posts: Post[] = [
//   {
//     id: "p1",
//     listId: "l1",
//     caption: "Glowy winter routine",
//     // use post-winter.jpeg 
//     image: require("../../assets/posts/post-winter.jpeg"),
//     products: [
    
//           {
//         id: "pp11",
//         title: "Calvin Klein Wool Blend Coat",
//         coverImage: require("../../assets/products/coatbrown-front.jpeg"),
//         rating: 4.6,
//         price: "$212.00 CAD",
//         affiliateUrl: "https://amzn.to/4sKB15l",
//       },

//            {
//         id: "pp56",
//         title: "Wool Sweater",
//         coverImage: require("../../assets/products/arach-crewneck-sweater-model.jpeg"),
//         rating: 4.6,
//         price: "$45.99 CAD",
//         affiliateUrl: "https://amzn.to/4rHZ3wJ",
//       },

//            {
//         id: "pp88",
//         title: "zeagoo turtleneck sweater",
//         coverImage: require("../../assets/products/zeagoo-turtleneck-sweater-model.jpg"),
//         rating: 4.6,
//         price: "$49.99 CAD",
//         affiliateUrl: "https://amzn.to/4sKB15l",
//       },

//            {
//         id: "pp35",
//         title: "chelsea boots",
//         coverImage: require("../../assets/products/chelsea-boots-front.jpeg"),
//         rating: 4.6,
//         price: "$106.00 CAD",
//         affiliateUrl: "https://amzn.to/4sKB15l",
//       },
//       {
//         id: "pp33",
//         title: "Winter Snow Mini Ankle Boots",
//         coverImage: require("../../assets/products/cozyboots.jpeg"),
//         rating: 4.5,
//         price: "$35.99 CAD",
//         affiliateUrl: "https://amzn.to/4k52TNT",
//       },
//     ],
//   },

//   {
//     id: "p2",
//     listId: "l2",
//     caption: "Spring",
//     image: require("../../assets/posts/post-spring.png"),
//     products: [
//       {
//         id: "pp10",
//         title: "Michael Kors XS Carry All Jet Set Travel Tote",
//         coverImage: require("../../assets/products/mk-jetset-model.jpeg"),
//         rating: 4.7,
//         price: "$132.79 CAD",
//         affiliateUrl: "https://amzn.to/49TW0u2",
//       },

//        {
//         id: "pp110",
//         title: "adidas run",
//         coverImage: require("../../assets/products/adidas-run-70s-model.jpg"),
//         rating: 4.7,
//         price: "$95.00 CAD",
//         affiliateUrl: "https://amzn.to/3MNZWVA",
//       },

//        {
//         id: "pp95",
//         title: "abardsion long sleeve tee",
//         coverImage: require("../../assets/products/abardsion-long-sleeve-tee-model.jpg"),
//         rating: 4.7,
//         price: "$24.79 CAD",
//         affiliateUrl: "https://amzn.to/40pvMuS",
//       },
//        {
//         id: "pp26",
//         title: "heymoments pants",
//         coverImage: require("../../assets/products/heymoments-pants-model.jpeg"),
//         rating: 4.7,
//         price: "$29.99 CAD",
//         affiliateUrl: "https://amzn.to/45ofG7W",
//       },
//     ],
//   },

//     {
//     id: "p3",
//     listId: "l4",
//     caption: "Autumn ",
//     image: require("../../assets/posts/post-autumn.png"),
//     products: [
//       {
//         id: "pp83",
//         title: "levis ribcage bell bottom",
//         coverImage: require("../../assets/products/levis-ribcage-bell-bottom-model.jpg"),
//         rating: 4.7,
//         price: "$72.50 CAD",
//         affiliateUrl: "https://amzn.to/4cF3cwS",
//       },

//          {
//         id: "pp30",
//         title: "Calvin Klein Belted Rain Jacket",
//         coverImage: require("../../assets/products/jacket-front.jpeg"),
//         rating: 4.7,
//         price: "$0.0 CAD",
//         affiliateUrl: "https://amzn.to/49XFqui",
//       },
//          {
//         id: "pp66",
//         title: "Pointed knee high boots",
//         coverImage: require("../../assets/products/pointed-knee-high-boots-product.jpg"),
//         rating: 4.7,
//         price: "$79.79 CAD",
//         affiliateUrl: "https://amzn.to/4qCfwRW",
//       },
//     ],
//   },

//   {
//     id: "p3",
//     listId: "l3",
//     caption: "Summer glow",
//     image: require("../../assets/posts/post-summer.png"),
//     products: [
//       {
//         id: "pp20",
//         title: "Rayban erika",
//         coverImage: require("../../assets/products/rayban-erika-front-model.jpg"),
//         rating: 4.8,
//         price: "$168.33 CAD",
//         affiliateUrl: "https://amzn.to/4alnZmy",
//       },
//          {
//         id: "pp76",
//         title: "kitten heel sandals",
//         coverImage: require("../../assets/products/kitten-heel-sandals-model.jpg"),
//         rating: 4.8,
//         price: "$129.33 CAD",
//         affiliateUrl: "https://amzn.to/4kMeyRO",
//       },
//          {
//         id: "pp79",
//         title: "oxzksnkey halter top",
//         coverImage: require("../../assets/products/oxzksnkey-halter-top-model.jpeg"),
//         rating: 4.8,
//         price: "$55.79 CAD",
//         affiliateUrl: "https://amzn.to/4kNF4dz",
//       },
//          {
//         id: "pp98",
//         title: "pleated bermuda shorts black",
//         coverImage: require("../../assets/products/pleated-bermuda-shorts-model.jpg"),
//         rating: 4.8,
//         price: "$29.98 CAD",
//         affiliateUrl: "https://amzn.to/4rWI3Ts",
//       },
//     ],
//   },

//      {
//     id: "p5",
//     listId: "l5",
//     caption: "Skincare",
//     image: require("../../assets/posts/post-skincare.png"),
//     products: [
//         {
//         id: "pp1",
//         title: "Clinique Smart Repair Face & Neck Cream",
//         coverImage: require("../../assets/products/clinique-neck.jpeg"),
//         rating: 4.6,
//         price: "$106.00 CAD",
//         affiliateUrl: "https://amzn.to/3Lp8pxS",
//       },

//              {
//         id: "pp49",
//         title: "clinique pop plush",
//         coverImage: require("../../assets/products/clinique-pop-plush.jpg"),
//         rating: 4.6,
//         price: "$35.00 CAD",
//         affiliateUrl: "https://amzn.to/4r3r8hN",
//       },
//       {
//         id: "pp10",
//         title: "Clinique Even Better Makeup SPF 15",
//         coverImage: require("../../assets/products/clinique-even-better-model.jpeg"),
//         rating: 4.7,
//         price: "$52.00 CAD",
//         affiliateUrl: "https://amzn.to/YOUR_LINK",
//       },
//     ],
//   },
// ];

