export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export interface IProduct {
  total: number;
  items: IProduct[];
}

export interface IOrder {
  payment: string,
  email: string,
  address: string,
  phone: string,
  total: number,
  items: string[]
}
