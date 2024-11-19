export interface IOrder {
  payment: string,
  email: string,
  address: string,
  phone: string,
  total: number,
  items: string[]
}

export interface IOrderResult {
  id: string;
  total: number;
}
