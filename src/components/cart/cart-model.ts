import { iCartProduct, iProduct } from '../../types/data/data';
import { iCartModel } from '../../types/models/i-cart-model';
import { EventEmitter } from '../base/events';

export class CartModel implements iCartModel {
	_products: iCartProduct[];
	_total: number;
	_events: EventEmitter;

	constructor(events: EventEmitter) {
		this._events = events;
		this._products = [];
		this._total = 0;
	}

	get events(): EventEmitter {
		return this._events;
	}

	get products(): iCartProduct[] {
		return this._products;
	}

	get total(): number {
		return this._total;
	}

	clear() {
		this._products = [];
		this._total = 0;
	}

	add(card: iCartProduct): void {
		this._products.push(card);
		this._total += card.price;
	}

	remove(idToRemove: string): void {
		this._total -= this.products.find(
			(card: iCartProduct) => card.id === idToRemove
		).price;

		this._products = this._products.filter(
			(card: iCartProduct) => card.id !== idToRemove
		);
	}
}
