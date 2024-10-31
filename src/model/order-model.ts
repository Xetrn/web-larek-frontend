import { EventEmitter } from '../components/base/events';
import {
	IOrder,
	IOrderAPI,
	IOrderForm,
	OrderFormStatus,
	OrderResponse,
} from '../types';

interface IOrderModel extends IOrderForm {
	createOrder(order: IOrder): Promise<OrderResponse>;
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

	createOrder(order: IOrder): Promise<OrderResponse> {
		return this.api.createOrder(order);
	}
}
