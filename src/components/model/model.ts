import { EventEmitter } from '../base/events';
import { IProduct } from '../../types';

export class Model {
	private _events: EventEmitter;
	private _basketProducts: Map<string, IProduct> = new Map();
	private _catalog: IProduct[];

	constructor(events: EventEmitter) {
		this._events = events;
	}

	set catalog(catalog: IProduct[]) {
		this._catalog = catalog;

		console.log('this._catalog');
		this._events.emit('CARDS', this._catalog);
	}

	get catalog() {
		return this._catalog;
	}

	addProduct(product: IProduct) {
		this._basketProducts.set(product.id, product);
	}

	removeProduct(product: IProduct) {
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

		return [...this._basketProducts.values()].reduce((acc, product) => acc + product.price, 0);
	}
}
