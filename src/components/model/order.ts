import {
	ContactsForm,
	OrderErrorResponse,
	OrderSuccessResponse,
	PaymentForm,
} from '../../types/data/order';
import { IShopApi } from '../../types/interface/api';

if (!localStorage['payment']) {
	localStorage['payment'] = JSON.stringify({
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
	static get payment(): PaymentForm {
		return JSON.parse(localStorage['payment']);
	}

	static set payment(data: PaymentForm) {
		localStorage['payment'] = JSON.stringify(data);
	}

	static get contacts(): ContactsForm {
		return JSON.parse(localStorage['contacts']);
	}

	static set contacts(data: ContactsForm) {
		localStorage['contacts'] = JSON.stringify(data);
	}

	static async createOrder(
		api: IShopApi,
		productIds: string[]
	): Promise<OrderSuccessResponse | OrderErrorResponse> {
		return await api.createOrder({
			payment: this.payment.payment,
			email: this.contacts.email,
			address: this.payment.address,
			phone: this.contacts.phone,
			total: productIds.length,
			items: productIds,
		});
	}
}
