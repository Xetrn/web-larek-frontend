import { EventEmitter } from "../base/events";

interface IBasketModel {
    items: Map<string, number>;
    add(id: string): void;
    remove(id: string): void;
}

export class BasketModel implements IBasketModel {
    items: Map<string, number> = new Map();
    _events: EventEmitter | null = null;

    constructor(protected events: EventEmitter) {
        this._events = events
    }
    
    add(id: string): void {
        if (!this.items.has(id)) this.items.set(id, 0);
        this.items.set(id, this.items.get(id)! + 1);
        this._changed();
    }

    remove(id: string): void {
        if (!this.items.has(id)) return;
        if (this.items.get(id)! > 0) {
            this.items.set(id, this.items.get(id)! - 1);
            if (this.items.get(id) === 0) this.items.delete(id);
        }
        this._changed();
    }

    protected _changed() {
        this.events.emit('basket:change', {items: Array.from(this.items.keys())});
    }
}