import { PriceFactor } from "./constants";

export const getPrice = (price = 0, size: string) =>
  (price * PriceFactor[size]).toFixed(2);

export const randomId = function () {
  return Math.random()
    .toString(36)
    .substring(2, 10 + 2);
};
