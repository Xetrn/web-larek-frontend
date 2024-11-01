import { Product } from "../../types";
import { EventEmitter } from "../base/events";
import { Actions } from "../../utils/constants";

interface IProductsModel {
    items: Product[];
    set(items: Product[]): void;    
    getProduct(id: string): Product;
}

export class ProductsModel implements IProductsModel {
    items: Product[] | null = null;
    private events: EventEmitter | null = null;

    constructor(events: EventEmitter) {
        this.events = events
    }

    set(items: Product[]) {
        this.items = items;
        this.events.emit(Actions.CATALOG_CHANGE, items)
    }

    getProduct(id: string): Product {
        return this.items.find((product: Product) => product.id === id);
    }
}