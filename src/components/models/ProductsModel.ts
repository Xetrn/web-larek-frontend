import { Product } from "../../types";
import { EventEmitter } from "../base/events";

interface IProductsModel {
    items: Product[];
    set(items: Product[]): void;    
    getProduct(id: string): Product;
}

export class ProductsModel implements IProductsModel {
    items: Product[] | null = null;
    _events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this._events = events
    }

    set(items: Product[]) {
        this.items = items;
        this._events.emit("catalog:change", items)
    }

    getProduct(id: string): Product {
        return this.items.find((product: Product) => product.id === id);
    }
}