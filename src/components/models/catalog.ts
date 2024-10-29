import { Item } from '../../types';
import { EventEmitter } from '../base/events';

interface ICatalogModel {
	items: Item[];
	setItems(items: Item[]): void;
	getProduct(id: string): Item;
}

export class CatalogModel implements ICatalogModel {
	items: Item[] | null = null;
	_events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	setItems(items: Item[]): void {
		this.items = items;
		this._events?.emit('catalog-model:set-items');
	}

	getProduct(id: string): Item | undefined {
		if (!this.items) return;
		return this.items.find((item) => item.id === id);
	}
}
