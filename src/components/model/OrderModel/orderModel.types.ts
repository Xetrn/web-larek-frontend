import { IOrder, IOrderAPI, IOrderResult } from '../../../types';
import { EventEmitter } from '../../base/events';

export interface IOrderModel {
  order: IOrder;
  createOrder(): Promise<IOrderResult>;
  updateOrderInputs(options: Partial<Omit<IOrder, 'items' | 'total'>>): void;
  getOrderInputs(): IOrder;
  validateAddressForm(): string | null;
  validateContactsForm(): string | null;
  reset(): void;
}

export interface OrderModelDependencies {
  api: IOrderAPI;
  events: EventEmitter;
}
