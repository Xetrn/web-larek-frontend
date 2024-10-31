import { CartItem } from "../../types";
import { EventEmitter } from "../base/events";

interface ICartModel {
    items: Map<string, CartItem>;
    add(item: CartItem): void;    
    remove(id: string): void;
}

export class CartModel implements ICartModel {
    items: Map<string, CartItem> = new Map();
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this._events = events
    }

    add(item: CartItem) {
        if (!this.items.has(item.id)) {
            this.items.set(item.id, item);
            this._events.emit("cart:change", this.items);
        }
    }
    
    remove(id: string) {
        if (this.items.has(id)) {
            this.items.delete(id);
            this._events.emit("cart:change", this.items);
        }
    }
}