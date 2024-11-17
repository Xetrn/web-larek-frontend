import {
  IOrder,
  IOrderAPI,
  OrderFormStatus,
  PaymentMethod,
} from '../../../types';
import { IOrderModel } from './orderModel.types';

export class OrderModel implements IOrderModel {
  status: OrderFormStatus;
  order: IOrder;
  isValid: boolean;
  error: string;

  constructor(private api: IOrderAPI) {
    this.reset();
  }

  createOrder(order: IOrder) {
    return this.api.createOrder(order);
  }

  reset() {
    this.status = OrderFormStatus.ADDRESS;
    this.order = {
      payment: PaymentMethod.ONLINE,
      email: '',
      phone: '',
      address: '',
      total: 0,
      items: [],
    };
  }
}
