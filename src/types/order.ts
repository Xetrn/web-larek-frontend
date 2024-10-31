export type PaymentMethod = 'online' | 'cash';
export type OrderFormStatus = 'address' | 'contacts';

export type OrderResponseSuccess = {
  id: string;
  total: number;
};

export type OrderResponseError = {
  error: string;
};

export interface IOrder {
  payment: PaymentMethod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}
