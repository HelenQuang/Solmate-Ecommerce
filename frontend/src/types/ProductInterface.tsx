export enum categoryEnum {
  bracelets = "bracelets",
  earing = "earings",
  necklaces = "necklaces",
  rings = "rings",
}

export interface ProductInterface {
  _id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  numReviews: number;
}
