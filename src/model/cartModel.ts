import { ICartModel } from '../types/ICartModel';
import { EventEmitter } from '../components/base/events';

export class CartModel implements ICartModel {
    items: string[]
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this._events = events;
    }

    add(id: string) {
        this.items.push(id);
        this._events.emit('cart:add');
    }

    remove(id: string) {
        this.items = this.items.filter((item) => item !== id);
        this._events.emit('cart:remove');
    }

    clear(): void {
        this.items = [];
        this._events.emit('cart:clear');
    }

    get total(): number {
        return 0;
    }
}