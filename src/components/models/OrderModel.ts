import { CartItem, Order } from "../../types";
import { EventEmitter } from "../base/events";
import { Actions } from "../../utils/constants";

interface IOrderModel {
    items: Map<string, CartItem>;
    orderInfo: Omit<Order, 'items' | 'total'>;
    addItem(item: CartItem): void;    
    removeItem(id: string): void;
}

export class OrderModel implements IOrderModel {
    items: Map<string, CartItem> = new Map();
    orderInfo: Omit<Order, 'items' | 'total'> = {
        payment: "",
        email: "",
        address: "",
        phone: "",
    }
    private events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this.events = events
    }

    addItem(item: CartItem) {
        if (!this.items.has(item.id)) {
            this.items.set(item.id, item);
            this.events.emit(Actions.CART_CHANGE, this.items);
        }
    }
    
    removeItem(id: string) {
        if (this.items.has(id)) {
            this.items.delete(id);
            this.events.emit(Actions.CART_CHANGE, this.items);
        }
    }
}