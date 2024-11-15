import { FinalOrderData } from '../../types';
import { Api } from '../base/api';
import { EventEmitter } from '../base/events';
import { Basket } from '../models/Basket';
import { Contact } from '../models/Contact';
import { Order } from '../models/Order';

export class AppController {
	constructor(
		private basket: Basket,
		private order: Order,
		private contact: Contact,
		private events: EventEmitter,
		private api: Api
	) {
		this.events.on('sendOrderData', () => this.sendOrderData());
	}

	private sendOrderData() {
		const requestData: FinalOrderData = {
			total: this.basket.getTotalPrice(),
			items: this.basket.getIds(),
			payment: this.order.getPayment(),
			address: this.order.getAddress(),
			email: this.contact.getEmail(),
			phone: this.contact.getPhone(),
		};
		this.postOrderData(requestData);
	}

	private async postOrderData(data: FinalOrderData) {
		try {
			const response = await this.api.post('/order', data);

			if (response) {
				this.events.emit('renderSuccess', response);
				this.setDefaultValue();
			}
		} catch (error) {
			console.error('Error placing order:', error);
		}
	}

	private setDefaultValue() {
		this.basket.deleteAllItems();
		document.querySelector('.header__basket-counter').innerHTML = `0`;
	}
}
