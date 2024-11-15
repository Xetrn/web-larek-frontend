import { OrderData } from '../../types';
import { EventEmitter } from '../base/events';

export class Order {
	private payment: OrderData['payment'];
	private address: OrderData['address'];
	constructor(private events: EventEmitter) {
		this.events.on('choosedParamsOrder', this.setOrderParams.bind(this));
	}
	setOrderParams(data: OrderData) {
		this.payment = data.payment;
		this.address = data.address;
	}
	getPayment() {
		return this.payment;
	}
	getAddress() {
		return this.address;
	}
}
