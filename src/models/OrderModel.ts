import { OrderForm } from '../types';
import { EventEmitter } from '../components/base/events';

export class OrderModel {
	public order: OrderForm | null = null;
	private _events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	createOrder(order: OrderForm): void {
		this.order = order;
	}

	getOrder(): OrderForm | null {
		return this.order;
	}

	clearOrder(): void {
		this.order = null;
	}
}
