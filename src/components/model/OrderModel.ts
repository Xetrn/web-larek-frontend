import { Model } from "../base/Model";
import { LarekAPI } from "../../service/larek-api";
import { IOrder, IOrderResult, IValidationResult } from "../../types/order";
import { IEvents } from "../base/events";

interface IOrderModel {
  order: IOrder;
  validatePayment(): void;
  validateContacts(): void;
  createOrder(): Promise<void>;
  clearOrder(): void;
}

export class OrderModel extends Model<IOrder> implements IOrderModel {
  order: IOrder = { payment: '', email: '', address: '', phone: '', total: 0, items: [] };

  constructor(private api: LarekAPI, events: IEvents) {
    super({}, events);
  }

  validatePayment(): void {
    let isValid = true;
    let errorMessage = '';
  
    if (!this.order.payment) {
      isValid = false;
      errorMessage = 'Не выбран способ оплаты';
    } else if (!this.order.address.trim()) {
      isValid = false;
      errorMessage = 'Необходимо указать адрес';
    }
  
    const validationResult: IValidationResult = { isValid, errorMessage };
    this.events.emit('errors:change', validationResult);
  }

  validateContacts(): void {
    let isValid = true;
    let errorMessage = '';
  
    if (!this.order.email.trim()) {
      isValid = false;
      errorMessage = 'Необходимо указать почту';
    } else if (!this.order.phone.trim()) {
      isValid = false;
      errorMessage = 'Необходимо указать телефон';
    }
  
    const validationResult: IValidationResult = { isValid, errorMessage };
    this.events.emit('errors:change', validationResult);
  }

  async createOrder(): Promise<void> {
    try {
      const orderResult: IOrderResult = await this.api.orderProducts(this.order);
      this.events.emit('order:success', { total: orderResult.total });
      this.clearOrder();
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
    }
  }
  
  clearOrder(): void {
    this.order = { payment: '', email: '', address: '', phone: '', total: 0, items: [] };
  }
}
