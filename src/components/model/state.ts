import { IOrder } from '../../types/order';
import { Model } from '../base/model';
import { IProduct } from '../../types/product';
import { IAppState } from '../../types/appState';

type messageError = Partial<Record<keyof IOrder, string>>;
interface IValid {
	phone: string;
	email: string;
	address: string;
	payment: string;
}

export class AppState extends Model<IAppState> {
	catalog: IProduct[];
	selectedProducts: IProduct[] = [];
	preview: string | null;
	order: IOrder = this.getOrder();
	messageError: messageError = {};

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed');
	}

	setCardPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToBasket(item: IProduct) {
		this.selectedProducts.push(item);
	}

	removeFromBasket(items: IProduct) {
		this.selectedProducts = this.selectedProducts.filter((item) => item.id !== items.id);
	}

	getTotalBasketPrice() {
		let total = 0;
		this.selectedProducts.forEach((item) => {
			total = total + item.price;
		});

		return total;
	}

	getCountCardBasket() {
		return this.selectedProducts.length;
	}

	getOrder(): IOrder {
		return {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	inBasket(): void {
		this.order.items = this.selectedProducts.map((items) => items.id);
	}

	clearBasket(): void {
		this.selectedProducts = [];
	}

	clearOrder(): void {
		this.order = this.getOrder();
	}

	resetSelected(): void {
		this.catalog.forEach((items) => {
			items.inBasket = false;
		});
	}

	validateOrder(): boolean {
		const errors: typeof this.messageError = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}

		this.messageError = errors;

		this.eventEmitter.emit('orderErr:change', this.messageError);

		return Object.keys(errors).length === 0;
	}

	validateContact(): boolean {
		const errors: typeof this.messageError = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.messageError = errors;
		this.eventEmitter.emit('contactErr:change', this.messageError);

		return Object.keys(errors).length === 0;
	}

	setOrderInput(field: keyof IValid, value: string) {
		this.order[field] = value;
		if (!this.validateOrder()) {
			return;
		}
		if (!this.validateContact()) {
			return;
		}
	}
}
