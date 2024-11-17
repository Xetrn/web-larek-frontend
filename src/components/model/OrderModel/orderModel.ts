import { IOrder, IOrderAPI, IProduct } from '../../../types';
import {
  emailRegex,
  Events,
  orderErrors,
  phoneRegex,
} from '../../../utils/constants';
import { EventEmitter } from '../../base/events';
import { IOrderModel, OrderModelDependencies } from './orderModel.types';

export class OrderModel implements IOrderModel {
  private api: IOrderAPI;
  private events: EventEmitter;
  order: IOrder;

  constructor({ api, events }: OrderModelDependencies) {
    this.api = api;
    this.events = events;
    this.reset();
    this.events.on(Events.ORDER_CREATE, this.setProducts);
  }

  createOrder() {
    return this.api.createOrder(this.order);
  }

  updateOrderInputs(options: Partial<Omit<IOrder, 'items' | 'total'>>) {
    this.order = { ...this.order, ...options };
  }

  validateAddressForm(): string | null {
    const { address, payment } = this.order;

    if (!payment) return orderErrors.payment;
    if (!address) return orderErrors.address;

    return null;
  }

  validateContactsForm(): string | null {
    const { email, phone } = this.order;

    if (!email) return orderErrors.email.empty;
    if (!emailRegex.test(email)) return orderErrors.email.invalid;

    if (!phone) return orderErrors.phone.empty;
    if (!phoneRegex.test(phone)) return orderErrors.phone.invalid;

    return null;
  }

  reset() {
    this.order = {
      payment: null,
      email: '',
      phone: '',
      address: '',
      total: 0,
      items: [],
    };
  }

  private setProducts = (products: IProduct[]) => {
    this.order.items = products.map((product) => product.id);
    this.order.total = products.reduce(
      (acc, product) => acc + product.price,
      0
    );
  };
}
