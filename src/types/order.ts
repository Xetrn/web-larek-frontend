export enum PaymentMethod {
  ONLINE = 'online',
  CASH = 'cash',
}

export interface IOrderAddress {
  payment: PaymentMethod;
  address: string;
}

export interface IOrderContacts {
  email: string;
  phone: string;
}

export interface IOrder extends IOrderAddress, IOrderContacts {
  total: number;
  items: string[];
}

export interface IOrderResult {
  id: string;
  total: number;
}
