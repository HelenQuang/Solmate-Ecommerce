const products = [
  {
    name: "Beauty & The Beast",
    image: [
      "/ProductsImg/Bracelets/beautybeast1.png",
      "/ProductsImg/Bracelets/beautybeast2.png",
      "/ProductsImg/Bracelets/beautybeast3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 39.5,
    countInStock: 4,
    rating: 4.5,
    numReviews: 6,
  },
  {
    name: "Cinderella Bracelets",
    image: [
      "/ProductsImg/Bracelets/cinderella1.png",
      "/ProductsImg/Bracelets/cinderella2.png",
      "/ProductsImg/Bracelets/cinderella3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 49.5,
    countInStock: 6,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Couple Bracelets",
    image: [
      "/ProductsImg/Bracelets/couple1.png",
      "/ProductsImg/Bracelets/couple2.png",
      "/ProductsImg/Bracelets/couple3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 47.5,
    countInStock: 9,
    rating: 4.5,
    numReviews: 7,
  },
  {
    name: "Fantasia Bracelets",
    image: [
      "/ProductsImg/Bracelets/fantasia1.png",
      "/ProductsImg/Bracelets/fantasia2.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 42.5,
    countInStock: 4,
    rating: 4,
    numReviews: 8,
  },
  {
    name: "Frozen Bracelets",
    image: [
      "/ProductsImg/Bracelets/frozen1.png",
      "/ProductsImg/Bracelets/frozen2.png",
      "/ProductsImg/Bracelets/frozen3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 40.5,
    countInStock: 9,
    rating: 4.5,
    numReviews: 5,
  },
  {
    name: "Phoenix Bracelets",
    image: [
      "/ProductsImg/Bracelets/phoenix1.png",
      "/ProductsImg/Bracelets/phoenix2.png",
      "/ProductsImg/Bracelets/phoenix3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 43.5,
    countInStock: 9,
    rating: 5,
    numReviews: 7,
  },
  {
    name: "Seashell Bracelets",
    image: [
      "/ProductsImg/Bracelets/seashell1.png",
      "/ProductsImg/Bracelets/seashell2.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 41.5,
    countInStock: 0,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: "Snowwhite Bracelets",
    image: [
      "/ProductsImg/Bracelets/snowwhite1.png",
      "/ProductsImg/Bracelets/snowwhite2.png",
      "/ProductsImg/Bracelets/snowwhite3.png",
    ],
    description:
      "The elegant silver bracelet with a touch of stone and silver tag",
    category: "bracelets",
    price: 43.5,
    countInStock: 9,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Fantasia Earings",
    image: [
      "/ProductsImg/Earings/fantasia1.png",
      "/ProductsImg/Earings/fantasia2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 28.9,
    countInStock: 7,
    rating: 5,
    numReviews: 5,
  },
  {
    name: "Charming Earings",
    image: [
      "/ProductsImg/Earings/charming1.png",
      "/ProductsImg/Earings/charming2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 33.5,
    countInStock: 7,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: "Frozen Earings",
    image: [
      "/ProductsImg/Earings/frozen1.png",
      "/ProductsImg/Earings/frozen2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 31.5,
    countInStock: 5,
    rating: 5,
    numReviews: 6,
  },
  {
    name: "Heart Earings",
    image: [
      "/ProductsImg/Earings/heart1.png",
      "/ProductsImg/Earings/heart2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 29.5,
    countInStock: 9,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Lucky Charm Earings",
    image: [
      "/ProductsImg/Earings/luckycharm1.png",
      "/ProductsImg/Earings/luckycharm2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 32.6,
    countInStock: 9,
    rating: 4.5,
    numReviews: 7,
  },
  {
    name: "Radiance Of Joy Earings",
    image: [
      "/ProductsImg/Earings/radianceofjoy1.png",
      "/ProductsImg/Earings/radianceofjoy2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 27.8,
    countInStock: 3,
    rating: 4.5,
    numReviews: 7,
  },
  {
    name: "Rose Earings",
    image: ["/ProductsImg/Earings/rose1.png", "/ProductsImg/Earings/rose2.png"],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 29.8,
    countInStock: 0,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Universe Earings",
    image: [
      "/ProductsImg/Earings/universe1.png",
      "/ProductsImg/Earings/universe2.png",
    ],
    description: "The elegant silver earings with a touch of stone",
    category: "earings",
    price: 32.7,
    countInStock: 7,
    rating: 5,
    numReviews: 6,
  },
  {
    name: "Sunflower Necklace",
    image: [
      "/ProductsImg/Necklaces/sunflower1.png",
      "/ProductsImg/Necklaces/sunflower2.png",
    ],
    description: "The elegant silver necklece with a touch of stone",
    category: "necklaces",
    price: 29.7,
    countInStock: 5,
    rating: 4,
    numReviews: 6,
  },
  {
    name: "Embrace Necklace",
    image: [
      "/ProductsImg/Necklaces/embrace1.png",
      "/ProductsImg/Necklaces/embrace2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 37.8,
    countInStock: 9,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Charming Necklace",
    image: [
      "/ProductsImg/Necklaces/charming1.png",
      "/ProductsImg/Necklaces/charming2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 34.5,
    countInStock: 6,
    rating: 4,
    numReviews: 2,
  },
  {
    name: "Dream Catcher Necklace",
    image: [
      "/ProductsImg/Necklaces/dreamcatcher1.png",
      "/ProductsImg/Necklaces/dreamcatcher2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 37.5,
    countInStock: 9,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: "Fantasia Necklace",
    image: [
      "/ProductsImg/Necklaces/fantasia1.png",
      "/ProductsImg/Necklaces/fantasia2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 39.5,
    countInStock: 0,
    rating: 5,
    numReviews: 4,
  },
  {
    name: "Frozen Necklace",
    image: [
      "/ProductsImg/Necklaces/frozen1.png",
      "/ProductsImg/Necklaces/frozen2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 34.8,
    countInStock: 6,
    rating: 5,
    numReviews: 7,
  },
  {
    name: "Heart Necklace",
    image: [
      "/ProductsImg/Necklaces/heart1.png",
      "/ProductsImg/Necklaces/heart2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 39.3,
    countInStock: 6,
    rating: 4.5,
    numReviews: 3,
  },
  {
    name: "Timeless Necklace",
    image: [
      "/ProductsImg/Necklaces/timeless1.png",
      "/ProductsImg/Necklaces/timeless2.png",
    ],
    description: "The elegant silver necklace with a touch of stone",
    category: "necklaces",
    price: 37.3,
    countInStock: 6,
    rating: 5,
    numReviews: 4,
  },
  {
    name: "Princess Ring",
    image: [
      "/ProductsImg/Rings/princess1.png",
      "/ProductsImg/Rings/princess2.png",
    ],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 32.5,
    countInStock: 12,
    rating: 4.5,
    numReviews: 7,
  },
  {
    name: "Berry Ring",
    image: ["/ProductsImg/Rings/berry1.png", "/ProductsImg/Rings/berry2.png"],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 33.5,
    countInStock: 4,
    rating: 4.5,
    numReviews: 9,
  },
  {
    name: "Aura Ring",
    image: ["/ProductsImg/Rings/aura1.png", "/ProductsImg/Rings/aura2.png"],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 38.9,
    countInStock: 4,
    rating: 5,
    numReviews: 7,
  },
  {
    name: "Bow Ring",
    image: ["/ProductsImg/Rings/bow1.png", "/ProductsImg/Rings/bow2.png"],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 32.5,
    countInStock: 6,
    rating: 5,
    numReviews: 9,
  },
  {
    name: "Cinderella Ring",
    image: [
      "/ProductsImg/Rings/cinderella1.png",
      "/ProductsImg/Rings/cinderella2.png",
    ],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 37.8,
    countInStock: 4,
    rating: 4.5,
    numReviews: 4,
  },
  {
    name: "Fatasia Ring",
    image: [
      "/ProductsImg/Rings/fantasia1.png",
      "/ProductsImg/Rings/fantasia2.png",
    ],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 38.5,
    countInStock: 4,
    rating: 5,
    numReviews: 3,
  },
  {
    name: "Twinkle Star Ring",
    image: ["/ProductsImg/Rings/star1.png", "/ProductsImg/Rings/star2.png"],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 39.2,
    countInStock: 4,
    rating: 5,
    numReviews: 7,
  },
  {
    name: "Timeless Ring",
    image: [
      "/ProductsImg/Rings/timeless1.png",
      "/ProductsImg/Rings/timeless2.png",
    ],
    description: "The elegant silver ring with a touch of stone",
    category: "rings",
    price: 38.5,
    countInStock: 0,
    rating: 4.5,
    numReviews: 5,
  },
];

export default products;
