import { EventEmitter } from '../base/events';
import { Product } from '../../types/product';

export class Model {
	private _events: EventEmitter;
	private _basketProducts: Map<string,Product> = new Map();
	private _catalog: Product[];

	constructor(catalog: Product[], events: EventEmitter) {
		this._events = events;
		this._catalog = catalog;
	}

	addProduct(product: Product) {
		this._basketProducts.set(product.id, product);
	}

	removeProduct(product: Product) {
		this._basketProducts.delete(product.id);
	}

	getBasketProducts() {
		return [...this._basketProducts.values()];
	}

	clearBasket() {
		this._basketProducts = new Map();
		this._events.emit('model-clear-basket');
	}

	getBasketPrice() {
		// добавить проверку на цену "Бесценно"

		if (this._basketProducts.size === 0) {
			return 0;
		}

		return [...this._basketProducts.values()].reduce((acc, product) => acc + parseInt(product.price), 0);
	}
}
