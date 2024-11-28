import { EventEmitter } from "../components/base/events";

export class CatalogModel implements ICatalogModel {
    #products: IProduct[];
    _events: EventEmitter;

    constructor(events: EventEmitter) {
        this._events = events;
        this.#products = [];
    }

    getProducts(): IProduct[] {
        return this.#products; // get all products from catalog
    }

    setProducts(products: IProduct[]) {
        this.#products = products;
        this._events.emit('changeCatalogData', this.#products);
    }
}