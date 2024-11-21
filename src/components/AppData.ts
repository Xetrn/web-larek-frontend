import { Model } from './base/Model';
import { FormValidationErrors, AppState, Order, OrderForm, Product } from '../types';
import { ProductModel } from './Product';


export type CatalogChangeEvent = {
	catalog: Product[];
};

export const defaultOrder: Order = {
	payment: 'card',
	email: '',
	phone: '',
	address: '',
	total: 0,
	items: [],
};

export class AppStateModel extends Model<AppState> {
	basket: Product[] = [];
	catalog: Product[];
	order: Order = defaultOrder;
	preview: string | null;
	formErrors: FormValidationErrors = {};

	formOrder() {
		this.order.items = this.basket.map((item) => item.id);
	}

	clearBasket() {
		this.basket.forEach((basketItem) => {
			const catalogItem = this.catalog.find(
				(catalogItem) => catalogItem.id === basketItem.id
			);
			if (catalogItem) {
				catalogItem.isInCart = false;
			}
		});
		this.basket = [];
	}
	clearOrder() {
		this.order = {
			payment: 'card',
			email: '',
			phone: '',
			address: '',
			total: 0,
			items: [],
		};
	}

	getOrderTotal() {
		this.order.total = this.order.items.reduce(
			(a, c) => a + this.catalog.find((it) => it.id === c).price,
			0
		);
	}
	getBasketTotal() {
		return this.basket.reduce((total, product) => total + product.price, 0);
	}

	setCatalog(items: Product[]) {
		this.catalog = items.map((item) => new ProductModel(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: Product) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToCart(item: Product) {
		this.basket.push(item);
	}

	setOrderField(field: keyof OrderForm, value: string) {
		this.order[field] = value;
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		this.formErrors = errors;
		this.events.emit('form:changeValid', this.formErrors);
		console.log(Object.keys(errors).length);
		return Object.keys(errors).length === 0;
	}
}
