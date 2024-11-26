import { EventEmitter } from "../components/base/events";

export class BasketModel implements IBasketModel {
    _events: EventEmitter | null = null;
    #products: IProduct[] = [];

    constructor(events: EventEmitter) {
        this._events = events;
    }

    add(product: IProduct) {
        this.#products[this.#products.length] = product;
    }

    getProductLength() {
        return  this.#products.length;
    }

    remove(product: IProduct) {
        this.#products = this.#products.filter((prod) => prod.id !== product.id);
        this._events.emit('renderBasket', this.#products);
        product.inBasket = false;
    }

    clear() {
        this.#products.forEach((product) => product.inBasket = false);
        this.#products = [];
    }

    getProducts() {
        return this.#products; 
    }
}