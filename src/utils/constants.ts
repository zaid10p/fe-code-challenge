import { BurgerList } from "./types";

export const BURGER_LIST: BurgerList[] = [
  {
    name: "Hamburger",
    price: 5,
  },
  {
    name: "Cheesse burger",
    price: 6,
  },
  {
    name: "Chilli cheeseburger",
    price: 8,
  },
];

export const Sizes = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
};

export const PriceFactor = {
  [Sizes.SMALL]: 0.7,
  [Sizes.MEDIUM]: 1,
  [Sizes.LARGE]: 1.3,
};

export const DiscountCodes = [
  { code: "disc10", percent: 0.1 },
  { code: "disc20", percent: 0.2 },
];
