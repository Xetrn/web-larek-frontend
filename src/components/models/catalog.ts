import { ICatalogModel, IProduct } from '../../types';
import { EventEmitter } from '../base/events';

export class CatalogModel implements ICatalogModel {
	items: IProduct[] | null = null;
	_events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	setItems(items: IProduct[]): void {
		this.items = items;
		this._events.emit('catalog-model:set-items', items);
	}

	getProduct(id: string): IProduct | undefined {
		if (!this.items) return;
		return this.items.find((item) => item.id === id);
	}
}
