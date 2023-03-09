export type BurgerList = {
  name: string;
  price: number;
};

export type OrderCart = {
  id: string;
  name: string;
  quantity: number;
  totalPrice: number | string;
  unitPrice: string;
  size: string;
  promoApplied?: boolean;
};
