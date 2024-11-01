export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProductList {
  total: number;
  items: IProduct[];
}

export type BasketProductItem = Pick<IProduct, 'id' | 'title' | 'price'>;

export interface IBasket {
  items: Map<BasketProductItem, number>;
  totalPrice: number;
}

export interface IOrder {
  payment: string,
  email: string,
  address: string,
  phone: string,
  total: number,
  items: string[]
}
