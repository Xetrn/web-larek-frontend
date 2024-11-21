import { IEvents } from '../base/events';
import { IOrder, IProduct } from '../../types';
import { ERRORS, MODEL_EVENTS } from '../../utils/constants';

export class Model {
	private _events: IEvents;
	private _basketProducts: Map<string, IProduct> = new Map();
	private _catalog: IProduct[];

	private _paymentSystem: string;
	private _address: string;
	private _email: string;
	private _phone: string;

	constructor(events: IEvents) {
		this._events = events;
	}

	set catalog(catalog: IProduct[]) {
		this._catalog = catalog;
		this._events.emit(MODEL_EVENTS.FETCHED_CATALOG, this._catalog);
	}

	getProductById(id: string) {
		return this._catalog.find((product) => product.id === id);
	}

	addProduct(product: IProduct) {
		this._basketProducts.set(product.id, product);
		this._events.emit(MODEL_EVENTS.ADD_TO_BASKET);
	}

	removeProduct(productID: string) {
		this._basketProducts.delete(productID);
		this._events.emit(MODEL_EVENTS.REMOVE_FROM_BASKET);
	}

	isProductInBasket(id: string): boolean {
		return this._basketProducts.has(id);
	}

	getBasketProducts() {
		return [...this._basketProducts.values()];
	}

	getBasketProductsCount() {
		return this._basketProducts.size;
	}

	clearBasket() {
		this._basketProducts = new Map();
	}

	getBasketPrice() {
		if (this._basketProducts.size === 0) {
			return 0;
		}
		return [...this._basketProducts.values()].reduce((acc, product) => acc + product.price, 0);
	}

	validateOrder(paymentSystem: string, address: string) {
		const errors = this._validatePaymentAndAddress(paymentSystem, address);
		this._events.emit(MODEL_EVENTS.ORDER_VALIDATED, {
			paymentSystem: this._paymentSystem,
			errorMessages: errors.join('. '),
		});
	}

	validateContacts(email: string, phone: string) {
		const errors = this._validateEmailAndPhone(email, phone);
		this._events.emit(MODEL_EVENTS.CONTACTS_VALIDATED, { errorMessages: errors.join('. ') });
	}

	getOrderData(): IOrder {
		return {
			payment: this._paymentSystem,
			address: this._address,
			email: this._email,
			phone: this._phone,
			items: [...this._basketProducts.keys()],
			total: this.getBasketPrice(),
		};
	}

	private _validatePaymentAndAddress(paymentSystem: string, address: string): string[] {
		const errors: string[] = [];

		if (paymentSystem !== 'card' && paymentSystem !== 'cash') {
			errors.push(ERRORS.EMPTY_PAYMENT_METHOD);
		} else {
			this._paymentSystem = paymentSystem;
		}

		if (address.length === 0) {
			errors.push(ERRORS.EMPTY_ADDRESS);
		} else {
			this._address = address;
		}

		return errors;
	}

	private _validateEmailAndPhone(email: string, phone: string): string[] {
		const errors: string[] = [];

		if (email.length === 0) {
			errors.push(ERRORS.EMPTY_EMAIL);
		} else {
			this._email = email;
		}

		if (phone.length === 0) {
			errors.push(ERRORS.EMPTY_PHONE);
		} else {
			this._phone = phone;
		}

		return errors;
	}
}
