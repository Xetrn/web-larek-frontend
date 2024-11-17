import { IOrder, IOrderAPI, IOrderResult, IProduct } from '../../../types';
import { EventEmitter } from '../../base/events';

export interface IOrderModel {
  order: IOrder;
  createOrder(): Promise<IOrderResult>;
  updateOrderInputs(options: Partial<Omit<IOrder, 'items' | 'total'>>): void;
  validateAddressForm(): string | null;
  validateContactsForm(): string | null;
  reset(): void;
}

export interface OrderModelDependencies {
  api: IOrderAPI;
  events: EventEmitter;
}

export type SetProductsProps = {
  products: IProduct[];
  total: number;
};
