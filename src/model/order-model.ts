import { EventEmitter } from '../components/base/events';
import {
  IOrder,
  IOrderAPI,
  OrderFormStatus,
  OrderResponseSuccess,
} from '../types';

interface IOrderModel {
  status: OrderFormStatus;
  order: IOrder;
  isValid: boolean;
  error: string;
  createOrder(order: IOrder): Promise<OrderResponseSuccess>;
}

export class OrderModel implements IOrderModel {
  status: OrderFormStatus;
  order: IOrder;
  isValid: boolean;
  error: string;

  constructor(private api: IOrderAPI, private events: EventEmitter) {
    this.status = 'address';
    this.order = {
      payment: 'online',
      email: '',
      phone: '',
      address: '',
      total: 0,
      items: [],
    };
  }

  createOrder(order: IOrder): Promise<OrderResponseSuccess> {
    return this.api.createOrder(order);
  }
}
