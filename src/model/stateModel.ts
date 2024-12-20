import { IOrder } from '../types/IOrder';
import { Model } from '../components/base/model';
import { IState } from '../types/IState';
import { IProduct } from '../types/IProduct';

type MessageError = Partial<Record<keyof IOrder, string>>;

interface IValid {
	phone: string;
	email: string;
	address: string;
	payment?: string;
}

export class AppState extends Model<IState> {
	catalog: IProduct[] = [];
	preview: string | null = null;
	order: IOrder = this.getOrder();
	messageError: MessageError = {};

	setCatalog(items: IProduct[]): void {
		this.catalog = items;
		this.emitChanges('items:changed');
	}

	setCardPreview(item: IProduct): void {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	addToCart(item: IProduct): void {
		this.order.items.push(item.id.toString());
	}

	removeFromCart(item: IProduct): void {
		this.order.items = this.order.items.filter(
			(orderItem) => orderItem !== item.id.toString()
		);
	}

	getCartTotal(): number {
		return this.order.items.reduce((total, itemId) => {
			const product = this.catalog.find((product) => product.id === itemId);
			return total + (product?.price || 0);
		}, 0);
	}

	getCount(): number {
		return this.order.items.length;
	}

	getOrder(): IOrder {
		return {
			payment: undefined,
			address: '',
			email: '',
			phone: '',
			items: [],
			total: 0,
		};
	}

	getCart(): void {
		this.order.items;
	}

	clearCart(): void {
		this.order.items = [];
	}

	clearOrder(): void {
		this.order = this.getOrder();
	}

	resetSelected(): void {
		this.clearCart();
	}

	validateOrder(): boolean {
		const errors: MessageError = {};
		if (!this.order.address) {
			errors.address = 'Укажите адрес доставки';
		}
		if (!this.order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		this.setMessageError(errors, 'orderError:change');
		return this.isValid(errors);
	}

	validateContact(): boolean {
		const errors: MessageError = {};
		if (!this.order.email) {
			errors.email = 'Укажите почту';
		}
		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		}
		this.setMessageError(errors, 'userDataError:change');
		return this.isValid(errors);
	}

	setOrderInput(field: keyof IValid, value: string): void {
		this.order[field] = value;
		if (this.validateOrder() && this.validateContact()) {
			return;
		}
	}

	private setMessageError(errors: MessageError, event: string): void {
		this.messageError = errors;
		this.eventEmitter.emit(event, this.messageError);
	}

	private isValid(errors: MessageError): boolean {
		return Object.keys(errors).length === 0;
	}
}