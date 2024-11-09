import {
	ContactsForm,
	OrderErrorResponse,
	OrderSuccessResponse,
	OrderForm,
} from '../../types/data/order';
import { IShopApi } from '../../types/interface/api';

if (!localStorage['order']) {
	localStorage['order'] = JSON.stringify({
		payment: 'online',
		address: null,
	});
}

if (!localStorage['contacts']) {
	localStorage['contacts'] = JSON.stringify({
		phone: null,
		email: null,
	});
}

export class Order {
	static get order(): OrderForm {
		return JSON.parse(localStorage['order']);
	}

	static set order(data: OrderForm) {
		localStorage['order'] = JSON.stringify(data);
	}

	static get contacts(): ContactsForm {
		return JSON.parse(localStorage['contacts']);
	}

	static set contacts(data: ContactsForm) {
		localStorage['contacts'] = JSON.stringify(data);
	}

	static async createOrder(
		api: IShopApi,
		productIds: string[],
		total: number
	): Promise<OrderSuccessResponse | OrderErrorResponse> {
		return await api.createOrder({
			payment: this.order.payment,
			email: this.contacts.email,
			address: this.order.address,
			phone: this.contacts.phone,
			total: total,
			items: productIds,
		});
	}
}
