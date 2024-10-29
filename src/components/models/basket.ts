import { EventEmitter } from '../base/events';

interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
}

export class BasketModel implements IBasketModel {
	items: Map<string, number> = new Map();
	_events: EventEmitter | null = null;

	constructor(events: EventEmitter) {
		this._events = events;
	}

	add(id: string) {
		if (!this.items.has(id)) this.items.set(id, 0);

		this.items.set(id, this.items.get(id) + 1);
		this._events.emit('basket-model:add');
	}

	remove(id: string) {
		if (!this.items.has(id)) return; // пропускаем если нет
		if (this.items.get(id) > 0) {
			this.items.set(id, this.items.get(id) - 1);
			if (this.items.get(id) === 0) this.items.delete(id);
		}
		this._events.emit('basket-model:remove');
	}
}
