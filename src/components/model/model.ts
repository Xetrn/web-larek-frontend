import { IEvents } from '../base/events';
import { IProduct } from '../../types';
import { MODEL_EVENTS } from '../../utils/constants';

export class Model {
	private _events: IEvents;
	private _basketProducts: Map<string, IProduct> = new Map();
	private _catalog: IProduct[];

	constructor(events: IEvents) {
		this._events = events;
	}

	set catalog(catalog: IProduct[]) {
		this._catalog = catalog;

		this._events.emit(MODEL_EVENTS.PRODUCTS_UPDATED, this._catalog);
	}

	get catalog() {
		return this._catalog;
	}

	addProduct(product: IProduct) {
		// this._events.emit(MODEL_EVENTS.PRODUCTS_UPDATED, product)

		this._basketProducts.set(product.id, product);
	}

	removeProduct(product: IProduct) {
		this._events.emit(MODEL_EVENTS.PRODUCTS_UPDATED, product)

		this._basketProducts.delete(product.id);
	}

	isProductInBasket(product: IProduct) : boolean {
		return this._basketProducts.has(product.id);
	}

	getProductById(id: string) {
		return this._catalog.find((product) => product.id === id);
	}

	getBasketProducts() {
		return [...this._basketProducts.values()];
	}

	clearBasket() {
		this._events.emit(MODEL_EVENTS.CLEAR_BASKET);

		this._basketProducts = new Map();
	}

	getBasketPrice() {
		// добавить проверку на цену "Бесценно"

		if (this._basketProducts.size === 0) {
			return 0;
		}

		return [...this._basketProducts.values()].reduce((acc, product) => acc + product.price, 0);
	}
}
