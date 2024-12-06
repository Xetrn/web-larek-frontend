import { Model } from './Model';
import {
	IAppState,
	IOrder,
	IProduct,
	FormErrors,
	IOrderForm,
} from '../../types/index';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class AppState extends Model<IAppState> {
	basket: IProduct[] = [];
	catalog: IProduct[];
	formErrors: FormErrors = {};
	order: IOrder = {
		total: 0,
		items: [],
		payment: '',
		address: '',
		email: '',
		phone: '',
	};

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed');
	}

	addOrderID(item: IProduct) {
		this.order.items.push(item.id);
	}

	removeOrderID(item: IProduct) {
		const index = this.order.items.indexOf(item.id);
		if (index >= 0) {
			this.order.items.splice(index, 1);
		}
	}

	addToBasket(item: IProduct) {
		this.basket.push(item);
	}

	removeBasket(item: IProduct) {
		const index = this.basket.indexOf(item);
		if (index >= 0) {
			this.basket.splice(index, 1);
		}
	}

	clearBasket() {
		this.basket = [];
		this.order.items = [];
	}

	getTotal() {
		return this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrderForm()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateContactsForm()) {
			this.events.emit('order:ready', this.order);
		}
	}

	containsProduct(item: IProduct) {
		return this.basket.includes(item);
	}

	validateOrderForm() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		if (!this.order.payment) {
			errors.address = 'Необходимо выбрать способ оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateContactsForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	get isEmpty(): boolean {
		return this.basket.length === 0;
	}
}