import { iProduct } from '../../types/data/data';
import { iCardModel } from '../../types/models/i-card-model';
import { EventEmitter } from '../base/events';
import { LarekApi } from '../api';

export class CardModel implements iCardModel {
	private _product: iProduct;
	private readonly _events: EventEmitter;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	get product(): iProduct {
		return this._product;
	}

	get events(): EventEmitter {
		return this._events;
	}

	// Вынести в апи
	async getCard(id: string): Promise<object> {
		return LarekApi.get('/product' + '/' + id);
	}
	buyProduct(): void {
		throw new Error('Method not implemented.');
	}
	deleteProduct(): void {
		throw new Error('Method not implemented.');
	}
}
