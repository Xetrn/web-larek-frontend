import { Model } from './base/Model';
import { IProduct, IUser, IAppState, IOrderForm, FormErrors } from '../types';

export class Product extends Model<IProduct> {
	id: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

export type CatalogChange = {
	catalog: Product[];
};

export class AppState extends Model<IAppState> {
	basket: Product[] = [];
	basketTotal: number;
	catalog: Product[];
	order: IUser = {
		payment: '',
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	preview: string;
	formErrors: FormErrors = {};

	setBasket(item: Product) {
		if (item) {
			this.basket.push(item);
		}
	}

	clearBasket() {
		this.basket.forEach((el) => {
			this.emitChanges('basket:delete-item', el);
		});
	}

	getBasket() {
		return this.basket;
	}

	removeFromBasket(id: string) {
		this.basket = this.basket.filter((el) => el.id !== id);
	}

	setCatalog(items: Product[]) {
		this.catalog = items;
		this.emitChanges('catalog:changed', { catalog: this.catalog });
	}

	clearOrder() {
		this.order.payment = '';
		this.order.email = '';
		this.order.phone = '';
		this.order.address = '';
		this.order.total = 0;
		this.order.items = [];
	}

	setItems(item: IProduct) {
		if (typeof item.price !== 'number') {
			return;
		}
		this.order.items.push(item.id);
	}
	
	checkCard(id: string) {
		if (this.basket.length) {
			return this.basket.some((el) => el.id === id);
		}
		return false;
	}
	
	setPreview(item: Product) {
		this.preview = item.id;
		this.emitChanges('preview:open', item);
	}

	getTotal() {
		let number = 0;
		this.basket.map((item) => {
			number = number + item.price;
			return number;
		});
		return number;
	}

	getBasketNumber() {
		return this.basket.length;
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		this.order.total = this.getTotal();
		this.validateOrder();
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}