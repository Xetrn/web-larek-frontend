import { IEventEmitter } from "../../types"
import { EventEmitter } from "../base/events";

interface IProduct {
    id: string;
    title: string;
}

interface ICatalogModel {
    items: IProduct [];
    setItems(items: IProduct[]): void;
    getProduct(id: string): IProduct; 
}

export class CatalogModel implements ICatalogModel {
    items: IProduct[] = [];
    _events: EventEmitter | null = null;

    constructor(private events: EventEmitter) {
        this._events = events;
    }

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getProduct(id: string): IProduct | null {
        return this.items.find(item => item.id === id) || null;
    }
}