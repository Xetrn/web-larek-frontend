import { Product } from "../../types/types";
import { EventEmitter, IEvents } from "../base/events";

interface IProductsModel {
    items: Product[];
    setItems(items: Product[]): void;
    getProduct(id: string): Product;
}

export class CatalogModel implements IProductsModel{
    items: Product[] | null = null;
    _events: IEvents | null = null;

    constructor(events: EventEmitter) {
        this._events = events
    }

    setItems(items: Product[]): void {
        this.items = items;
        this._events.emit("catalog:change", items);
    }

    getProduct(id: string): Product | undefined {
        return this.items.find((item: Product) => item.id === id)
    }
}