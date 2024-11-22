import { IOrder, IOrderResult } from '../../../types';
import { EventEmitter } from '../../base/events';
import {
  AddressFormView,
  ContactFormView,
  OrderSuccessView,
} from '../../view/order';

export interface IOrderModel {
  createOrder(): Promise<IOrderResult>;
  reset(): void;
  updateOrderInputs(options: Partial<Omit<IOrder, 'items' | 'total'>>): void;
  getOrderInputs(): IOrder;
  validateAddressForm(): string | null;
  validateContactsForm(): string | null;
}

export interface IOrderPresenterDependencies {
  orderModel: IOrderModel;
  events: EventEmitter;
  orderSuccessView: OrderSuccessView;
  addressFormView: AddressFormView;
  contactFormView: ContactFormView;
}
