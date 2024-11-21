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

		this._events.emit(MODEL_EVENTS.FETCHED_CATALOG, this._catalog);
	}

	get catalog() {
		return this._catalog;
	}

	addProduct(product: IProduct) {
		this._basketProducts.set(product.id, product);

		this._events.emit(MODEL_EVENTS.ADD_TO_BASKET);
	}

	removeProduct(productID: string) {
		this._basketProducts.delete(productID);

		this._events.emit(MODEL_EVENTS.REMOVE_FROM_BASKET);
	}

	isProductInBasket(id: string) : boolean {
		return this._basketProducts.has(id);
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
		if (this._basketProducts.size === 0) {
			return 0;
		}

		return [...this._basketProducts.values()].reduce((acc, product) => acc + product.price, 0);
	}
}
